import { State, StateParms } from '$comps/app/types.appState.svelte'
import { CodeAction, CodeActionClass, CodeActionType, required, strRequired } from '$utils/types'
import { userActionError } from '$comps/other/types.userAction.svelte'
import {
	TokenApiDbDataObjSource,
	TokenApiQuery,
	TokenApiQueryData,
	TokenApiQueryType,
	TokenApiSysSendText,
	TokenAppDoQuery,
	TokenAppStateTriggerAction,
	TokenAppUserActionConfirmType
} from '$utils/types.token'
import type { DataRecord, ResponseBody } from '$utils/types'
import { apiFetch, ApiFunction } from '$routes/api/api'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/actions/actionClassDoFieldAuth.ts'

let verifyFrom = ''
let verifyData: DataRecord = {}
let authSecurityCodePhone = ''
let authSecurityCode = 0

export default async function action(sm: State, parms: TokenAppStateTriggerAction) {
	const actionType = parms.codeAction.actionType
	const value = parms.data.value

	switch (actionType) {
		case CodeActionType.resendCode:
			sendCode(authSecurityCodePhone)
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
			switch (value) {
				case 'data_obj_auth_login':
				case 'data_obj_auth_signup':
					await processDataObj(value, dataRecord)
					break

				case 'data_obj_auth_reset_password_account':
				case 'data_obj_auth_reset_password_login':
					verifyFrom = value
					verifyData = dataRecord
					await sendCode(dataRecord['userName'])
					await changeDataObj(sm, 'data_obj_auth_verify_phone_mobile')
					break

				case 'data_obj_auth_verify_phone_mobile':
					const securityCode = dataRecord['authSecurityCode']
					if (securityCode !== authSecurityCode.toString()) {
						alert('The security code you entered is not correct. Please try again.')
						return
					}
					await processDataObj(verifyFrom, verifyData)
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

	async function processDataObj(dataObjName: string, dataRecord: DataRecord) {
		const msgFail = 'Something is wrong with the credentials you entered. Please try again.'

		// encrypt password
		// if (Object.hasOwn(data, 'password')) {
		// 	const password = await encrypt(data['password'])
		// 	data['password'] = password
		// }

		// process
		const result: ResponseBody = await apiFetch(
			ApiFunction.dbEdgeProcessDataObj,
			new TokenApiQuery(
				TokenApiQueryType.expression,
				new TokenApiDbDataObjSource({ dataObjName }),
				new TokenApiQueryData({ record: dataRecord })
			)
		)

		const resultRecord = result.data[0]
		if (!result.success || !resultRecord) {
			alert(msgFail)
			return
		}

		switch (dataObjName) {
			case 'data_obj_auth_login':
			case 'data_obj_auth_reset_password_login':
			case 'data_obj_auth_signup_insert':
			case 'data_obj_auth_signup_update':
				if (!Object.hasOwn(resultRecord, 'userId')) {
					alert(msgFail)
					return
				}
				sm.storeDrawer.close()
				await sm.triggerAction(
					new TokenAppStateTriggerAction({
						codeAction: CodeAction.init(
							CodeActionClass.ct_sys_code_action_class_do_auth,
							CodeActionType.setUserId
						),
						data: { value: resultRecord['userId'] }
					})
				)
				break

			case 'data_obj_auth_signup':
				if (!Object.hasOwn(resultRecord, 'isNew')) {
					alert(msgFail)
					return
				}
				const isNew = resultRecord['isNew']
				if (isNew) {
					await processDataObj('data_obj_auth_signup_insert', dataRecord)
				} else {
					verifyFrom = 'data_obj_auth_signup_update'
					verifyData = dataRecord
					await sendCode(dataRecord['userName'])
					await changeDataObj(sm, 'data_obj_auth_verify_phone_mobile')
				}
				break

			default:
				error(500, {
					file: FILENAME,
					function: 'processDataObj',
					message: `No case defined for dataObjName: ${dataObjName}`
				})
		}
	}
}

async function changeDataObj(sm: State, dataObjName: string) {
	await sm.triggerAction(
		new TokenAppStateTriggerAction({
			codeAction: CodeAction.init(
				CodeActionClass.ct_sys_code_action_class_do,
				CodeActionType.doOpen
			),
			data: {
				token: new TokenAppDoQuery({
					dataObjName,
					queryType: TokenApiQueryType.preset
				})
			}
		})
	)
}

async function sendCode(phoneMobile: string) {
	const min = 100000
	const max = 999999
	authSecurityCode = Math.floor(Math.random() * (max - min + 1)) + min
	authSecurityCodePhone = phoneMobile
	console.log(`${authSecurityCode} - The App Factory mobile phone number verification code.`)
	// await apiFetch(
	// 	ApiFunction.sysSendText,
	// 	new TokenApiSysSendText(
	// 		phoneMobile,
	// 		`${authSecurityCode} - The App Factory mobile phone number verification code.`
	// 	)
	// )
}
