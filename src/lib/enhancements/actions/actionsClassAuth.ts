import { State } from '$comps/app/types.state.svelte'
import {
	CodeAction,
	CodeActionClass,
	CodeActionType,
	MethodResult,
	required,
	strRequired
} from '$utils/types'
import { userActionError } from '$comps/other/types.userAction.svelte'
import {
	TokenApiFetchMethod,
	TokenApiSysSendText,
	TokenAppStateTriggerAction
} from '$utils/types.token'
import { apiFetch, apiFetchFunction, ApiFunction } from '$routes/api/api'
import {
	AuthProcess,
	AuthProcessParm,
	AuthActionDB,
	AuthActionLogic,
	AuthActionNodeObj
} from '$enhance/actions/types.actionsClassAuth'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/actions/actionClassDoFieldAuth.ts'

let authProcess = new AuthProcess()

export default async function action(
	sm: State,
	parms: TokenAppStateTriggerAction
): Promise<MethodResult> {
	const clazz = `${FILENAME}.${parms.codeAction.actionType}`
	const actionType = parms.codeAction.actionType

	authProcess.reset(sm)

	switch (actionType) {
		case CodeActionType.resendCode:
			codeSend(authProcess)
			break

		case CodeActionType.setUserId:
			const valueSetUserId = strRequired(parms.data?.value, clazz, 'value')
			const userId = strRequired(
				valueSetUserId,
				userActionError(FILENAME, CodeActionType.setUserId),
				'userId'
			)

			await apiFetch('/', {
				method: TokenApiFetchMethod.post,
				formData: { session_id: userId }
			})

			return await sm.triggerAction(
				new TokenAppStateTriggerAction({
					codeAction: CodeAction.init(
						CodeActionClass.ct_sys_code_action_class_nav,
						CodeActionType.navPage
					),
					data: { value: '/home' }
				})
			)

		case CodeActionType.submit:
			const dataRecord = required(
				parms.data.dataRecord,
				userActionError(FILENAME, actionType),
				'dataRecord'
			)
			authProcess.parmsUpdate(dataRecord)
			const valueSubmit = strRequired(parms.data?.token?.fieldCustom?.value, clazz, 'value')
			switch (valueSubmit) {
				// login
				case 'auth_login':
					authProcess.addAction(AuthActionDB, {
						dbExpr: `WITH 
						password := <record,str,password>,
						name := <record,str,name>,
						SELECT sys_user::SysUser { userId := .id }
						FILTER .name = name AND .password = password AND .isActive = true`
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
						name := <record,str,name>,
						user := (
							UPDATE sys_user::SysUser 
							FILTER .name = name AND .isActive = true
							SET { password := password }
						)
						SELECT { userId := user.id }`,
						msgFail: 'We could not reset your password. Please see you system administrator.'
					})
					authProcess.addAction(AuthActionLogic, { logic: authActionLogicLogin })

				case 'auth_login_forgot_pw_confirm_mobile':
					authProcess.addAction(AuthActionDB, {
						dbExpr: `WITH 
							name := <record,str,name>,
							SELECT sys_user::SysUser { userId := .id }
							FILTER .name = name AND .isActive = true`,
						msgFail: 'We could not find an account with your Mobile Phone Number. Please try again.'
					})
					authProcess.addAction(AuthActionLogic, { logic: authActionLogicCodeSend })
					authProcess.addAction(AuthActionNodeObj, {
						nodeObjName: 'node_obj_auth_login_verify'
					})
					break

				// signup
				case 'auth_signup':
					authProcess.addAction(AuthActionDB, {
						dbExpr: `SELECT { isNew := NOT EXISTS (SELECT sys_user::SysUser FILTER .name = <record,str,name>) }`
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
							name := <record,str,name>,
							userType := <record,str,linkItems_userType>,
							_userType := (SELECT sys_user::SysUserType FILTER .id = <uuid>userType),
							user := (
  							INSERT sys_user::SysUser {
									createdBy := 	sys_user::getRootUser(),
									isActive := true,
									modifiedBy := 	sys_user::getRootUser(),
									ownerOrg := _userType.ownerOrg,
									password := password,
									person := (
										INSERT default::SysPerson {
											firstName := firstName,
											lastName := lastName
										}
									),
									systemDefault := _userType.selfSignupSystem,
									systems := _userType.selfSignupSystem,
									name := name,
									userTypes := _userType,
								}
							)
							SELECT { userId := user.id }`,
						msgFail: 'We could not create a user for you. Please see you system administrator.'
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
						name := <record,str,name>,
						userType := <record,str,linkItems_userType>,
						_user := (SELECT sys_user::SysUser FILTER .name = name),
						_userType := (SELECT sys_user::SysUserType FILTER .id = <uuid>userType) ?? _user.userTypes,
						user := (
							UPDATE sys_user::SysUser 
							FILTER .name = name AND .isActive = true
							SET { 
								password := password,
								person := (UPDATE default::SysPerson FILTER .id = _user.person.id SET { firstName := firstName, lastName := lastName })
								systemDefault := _userType.selfSignupSystem,
								systems := _userType.selfSignupSystem, 
								userTypes := _userType
							}
						)
						SELECT { userId := user.id }`,
						msgFail: 'We could not reset your password. Please see you system administrator.'
					})
					authProcess.addAction(AuthActionLogic, { logic: authActionLogicLogin })
					break

				default:
					return new MethodResult({
						error: {
							file: FILENAME,
							function: 'action-submit',
							msg: `No case defined for submit value: ${valueSubmit}`
						}
					})
			}
			break

		default:
			return new MethodResult({
				error: {
					file: FILENAME,
					function: 'action',
					msg: `No case defined for actionType: ${actionType}`
				}
			})
	}
	if (authProcess.actions.length > 0) await authProcess.execute()
	return new MethodResult()
}

async function authActionLogicCodeSend(
	authProcess: AuthProcess,
	authAction: AuthActionLogic
): Promise<MethodResult> {
	return codeSend(authProcess)
}

async function authActionLogicCodeVerify(authProcess: AuthProcess, authAction: AuthActionLogic) {
	const securityCodeSystem = authProcess
		.parmGetRequired(AuthProcessParm.securityCodeSystem)
		.toString()

	const securityCodeUser = authProcess.parmGetRequired(AuthProcessParm.securityCodeUser)
	if (securityCodeUser === '999999') new MethodResult(true) // todo - this should check if in dev mode
	if (securityCodeUser !== securityCodeSystem) {
		alert('The security code you entered is not correct. Please try again.')
		return new MethodResult(false)
	}
	return new MethodResult(true)
}

async function authActionLogicIsNew(authProcess: AuthProcess, authAction: AuthActionLogic) {
	if (!authProcess.parmsHas(AuthProcessParm.isNew)) {
		alert(authAction.msgFail)
		return new MethodResult(false)
	}

	const isNew = authProcess.parmGet(AuthProcessParm.isNew)
	const nodeObjName = isNew
		? 'node_obj_auth_signup_verify_mobile_insert'
		: 'node_obj_auth_signup_verify_mobile_update'
	authProcess.addAction(AuthActionLogic, { logic: authActionLogicCodeSend })
	authProcess.addAction(AuthActionNodeObj, { nodeObjName })

	return new MethodResult(true)
}

async function authActionLogicLogin(
	authProcess: AuthProcess,
	authAction: AuthActionLogic
): Promise<MethodResult> {
	const userId = authProcess.parmGet(AuthProcessParm.userId)

	if (!userId) {
		alert(authAction.msgFail)
		return new MethodResult({ success: false })
	}

	const sm = authProcess.getState()
	sm.storeDrawer.close()

	return await action(
		sm,
		new TokenAppStateTriggerAction({
			codeAction: CodeAction.init(
				CodeActionClass.ct_sys_code_action_class_do_auth,
				CodeActionType.setUserId
			),
			data: { value: userId }
		})
	)
}

export async function codeSend(authProcess: AuthProcess): Promise<MethodResult> {
	const min = 100000
	const max = 999999

	const securityCodeName = authProcess.parmGetRequired(AuthProcessParm.name)
	const securityCodeSystem = Math.floor(Math.random() * (max - min + 1)) + min
	authProcess.parmSet(AuthProcessParm.securityCodeSystem, securityCodeSystem)

	const sm = authProcess.getState()

	let returnValue: boolean = false
	if (sm.isDevMode) {
		console.log(`auth-securityCodeSystem: ${securityCodeSystem}`)
		returnValue = true
	} else {
		const result: MethodResult = await apiFetchFunction(
			ApiFunction.sysSendText,
			new TokenApiSysSendText(
				securityCodeName,
				`${securityCodeSystem} - AppFactory mobile phone number verification code.`
			)
		)
		returnValue = result.error === undefined
	}
	return new MethodResult(returnValue)
}
