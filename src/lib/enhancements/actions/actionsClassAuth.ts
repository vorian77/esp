import { State } from '$comps/app/types.appState.svelte'
import { CodeAction, CodeActionClass, CodeActionType, required, strRequired } from '$utils/types'
import { userActionError } from '$comps/other/types.userAction.svelte'
import { TokenApiSysSendText, TokenAppStateTriggerAction } from '$utils/types.token'
import type { DataRecord } from '$utils/types'
import { apiFetchFunction, ApiFunction } from '$routes/api/api'
import {
	AuthProcess,
	AuthProcessParm,
	AuthActionDB,
	AuthActionLogic,
	AuthActionDataObj
} from '$enhance/actions/types.actionsClassAuth'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/actions/actionClassDoFieldAuth.ts'

let authProcess = new AuthProcess()

export default async function action(sm: State, parms: TokenAppStateTriggerAction) {
	const actionType = parms.codeAction.actionType
	const value = parms.data.value
	authProcess.reset(sm)

	switch (actionType) {
		case CodeActionType.resendCode:
			codeSend(authProcess)
			break

		case CodeActionType.setUserId:
			const formData = new FormData()
			const userId = strRequired(
				value,
				userActionError(FILENAME, CodeActionType.setUserId),
				'userId'
			)
			formData.set('session_id', userId)
			const responsePromise: Response = await fetch('/', {
				method: 'POST',
				body: formData
			})
			await sm.triggerAction(
				new TokenAppStateTriggerAction({
					codeAction: CodeAction.init(
						CodeActionClass.ct_sys_code_action_class_nav,
						CodeActionType.navPage
					),
					data: { value: '/home' }
				})
			)
			break

		case CodeActionType.submit:
			const dataRecord = required(
				parms.data.dataRecord,
				userActionError(FILENAME, actionType),
				'dataRecord'
			)
			authProcess.parmsUpdate(dataRecord)
			switch (value) {
				// login
				case 'auth_login':
					authProcess.addAction(AuthActionDB, {
						dbExpr: `WITH 
						password := <record,str,password>,
						userName := <record,str,userName>,
						SELECT sys_user::SysUser { userId := .id }
						FILTER .userName = userName AND .password = password 
						`
					})
					authProcess.addAction(AuthActionLogic, {
						logic: authActionLogicLogin
					})
					break

				case 'auth_login_forgot_pw_code_verify':
					authProcess.addAction(AuthActionLogic, { logic: authActionLogicCodeVerify })
					authProcess.addAction(AuthActionDB, {
						dbExpr: `WITH
						password := <record,str,password>,
						userName := <record,str,userName>,
						user := (
							UPDATE sys_user::SysUser 
							FILTER .userName = userName
							SET { password := password }
						)
						SELECT { userId := user.id }`,
						msgFail: 'We could reset your password. Please see you system administrator.'
					})
					authProcess.addAction(AuthActionLogic, { logic: authActionLogicLogin })

				case 'auth_login_forgot_pw_confirm_mobile':
					authProcess.addAction(AuthActionDB, {
						dbExpr: `WITH 
							userName := <record,str,userName>,
							SELECT sys_user::SysUser { userId := .id }
							FILTER .userName = userName 
							`,
						msgFail: 'We could not find an account with your Mobile Phone Number. Please try again.'
					})
					authProcess.addAction(AuthActionLogic, { logic: authActionLogicCodeSend })
					authProcess.addAction(AuthActionDataObj, {
						dataObjName: 'data_obj_auth_login_verify'
					})
					break

				// signup
				case 'auth_signup':
					authProcess.addAction(AuthActionDB, {
						dbExpr: `SELECT { isNew := NOT EXISTS (SELECT sys_user::SysUser FILTER .userName = <record,str,userName>) }`
					})
					authProcess.addAction(AuthActionLogic, {
						logic: authActionLogicIsNew
					})
					break

				case 'auth_signup_confirm_code_verify_insert':
					authProcess.addAction(AuthActionLogic, { logic: authActionLogicCodeVerify })
					authProcess.addAction(AuthActionDB, {
						dbExpr: `WITH
							firstName := <record,str,firstName>,
							lastName := <record,str,lastName>,
							password := <record,str,password>,
							userName := <record,str,userName>,
							userType := <record,str,linkItems_userType>,
							_userTypes := (SELECT sys_user::SysUserType FILTER .id = <uuid>userType),
							user := (
  							INSERT sys_user::SysUser {
									createdBy := 	sys_user::getRootUser(),
									defaultOrg := _userTypes.owner.owner,
									defaultSystem := _userTypes.owner,
									modifiedBy := 	sys_user::getRootUser(),
									orgs := _userTypes.owner.owner,
									owner := _userTypes.owner.owner,
									password := password,
									person := (
										INSERT default::SysPerson {
											firstName := firstName,
											lastName := lastName
										}
									),
									systems := _userTypes.owner,
									userName := userName,
									userTypes := _userTypes,
								}
							)
							SELECT { userId := user.id }`,
						msgFail: 'We could create a user for you. Please see you system administrator.'
					})
					authProcess.addAction(AuthActionLogic, { logic: authActionLogicLogin })
					break

				case 'auth_signup_confirm_code_verify_update':
					authProcess.addAction(AuthActionLogic, { logic: authActionLogicCodeVerify })
					authProcess.addAction(AuthActionDB, {
						dbExpr: `WITH
						firstName := <record,str,firstName>,
						lastName := <record,str,lastName>,
						password := <record,str,password>,
						userName := <record,str,userName>,
						userType := <record,str,linkItems_userType>,
						_user := (SELECT sys_user::SysUser FILTER .userName = userName),
						_userTypes := (SELECT sys_user::SysUserType FILTER .id = <uuid>userType) ?? _user.userTypes,
						user := (
							UPDATE sys_user::SysUser 
							FILTER .userName = userName
							SET { 
								password := password, 
								userTypes := _userTypes,
								person := (UPDATE default::SysPerson FILTER .id = _user.person.id SET { firstName := firstName, lastName := lastName })
							}
						)
						SELECT { userId := user.id }`,
						msgFail: 'We could reset your password. Please see you system administrator.'
					})
					authProcess.addAction(AuthActionLogic, { logic: authActionLogicLogin })
					break

				default:
					error(500, {
						file: FILENAME,
						function: 'action-submit',
						message: `No case defined for submit value: ${value}`
					})
			}
			break

		default:
			error(500, {
				file: FILENAME,
				function: 'default',
				message: `No case defined for actionType: ${actionType}`
			})
	}

	if (authProcess.actions.length > 0) await authProcess.execute()
}

async function authActionLogicCodeSend(authProcess: AuthProcess, authAction: AuthActionLogic) {
	return codeSend(authProcess)
}

async function authActionLogicCodeVerify(authProcess: AuthProcess, authAction: AuthActionLogic) {
	const securityCodeSystem = authProcess
		.parmGetRequired(AuthProcessParm.securityCodeSystem)
		.toString()
	const securityCodeUser = authProcess.parmGetRequired(AuthProcessParm.securityCodeUser)
	if (securityCodeUser !== securityCodeSystem) {
		alert('The security code you entered is not correct. Please try again.')
		return false
	}
	return true
}

async function authActionLogicIsNew(authProcess: AuthProcess, authAction: AuthActionLogic) {
	if (!authProcess.parmsHas(AuthProcessParm.isNew)) {
		alert(authAction.msgFail)
		return false
	}

	const isNew = authProcess.parmGet(AuthProcessParm.isNew)
	const dataObjName = isNew
		? 'data_obj_auth_signup_verify_mobile_insert'
		: 'data_obj_auth_signup_verify_mobile_update'
	authProcess.addAction(AuthActionLogic, { logic: authActionLogicCodeSend })
	authProcess.addAction(AuthActionDataObj, { dataObjName })

	return true
}

async function authActionLogicLogin(authProcess: AuthProcess, authAction: AuthActionLogic) {
	const userId = authProcess.parmGet(AuthProcessParm.userId)

	if (!userId) {
		alert(authAction.msgFail)
		return false
	}

	const sm = authProcess.getState()
	sm.storeDrawer.close()
	await sm.triggerAction(
		new TokenAppStateTriggerAction({
			codeAction: CodeAction.init(
				CodeActionClass.ct_sys_code_action_class_do_auth,
				CodeActionType.setUserId
			),
			data: { value: userId }
		})
	)

	return true
}

export async function codeSend(authProcess: AuthProcess) {
	const min = 100000
	const max = 999999

	const securityCodeUserName = authProcess.parmGetRequired(AuthProcessParm.userName)
	const securityCodeSystem = Math.floor(Math.random() * (max - min + 1)) + min
	authProcess.parmSet(AuthProcessParm.securityCodeSystem, securityCodeSystem)

	const sm = authProcess.getState()
	if (sm.isDevMode) {
		console.log(`auth-securityCodeSystem: ${securityCodeSystem}`)
	} else {
		await apiFetchFunction(
			ApiFunction.sysSendText,
			new TokenApiSysSendText(
				securityCodeUserName,
				`${securityCodeSystem} - The App Factory mobile phone number verification code.`
			)
		)
	}
	return true
}
