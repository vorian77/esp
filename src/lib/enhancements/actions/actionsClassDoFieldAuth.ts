import { State, StateCodeAction, StatePacket } from '$comps/app/types.appState.svelte'
import { FieldCustomAction } from '$comps/form/fieldCustom'
import type { DataRecord, ResponseBody } from '$utils/types'
import { CodeActionType, required, strRequired, userSetId } from '$utils/types'
import { apiFetch, ApiFunction } from '$routes/api/api'
import {
	TokenApiDbDataObjSource,
	TokenApiQuery,
	TokenApiQueryData,
	TokenApiQueryType,
	TokenApiSysSendText,
	TokenAppDataObjName
} from '$utils/types.token'
import { goto } from '$app/navigation'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/actions/actionClassDoFieldAuth.ts'
const errorFunction = (codeActionType: CodeActionType) => `${FILENAME}.${codeActionType}`

let verifyFrom = ''
let verifyData: DataRecord = {}
let authSecurityCodePhone = ''
let authSecurityCode = 0

export default async function action(parms: StateCodeAction) {
	const dataRecord = required(parms.data.dataRecord, errorFunction(parms.actionType), 'dataRecord')
	const value = strRequired(parms.data.value, errorFunction(parms.actionType), 'value')

	switch (parms.actionType) {
		case CodeActionType.page:
			await changeDataObj(parms.sm, value)
			break

		case CodeActionType.resendCode:
			sendCode(authSecurityCodePhone)
			break

		case CodeActionType.submit:
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
					await changeDataObj(parms.sm, 'data_obj_auth_verify_phone_mobile')
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
				message: `No case defined for actionType: ${parms.actionType}`
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
				parms.sm.storeDrawer.close()
				await userSetId(resultRecord['userId'])
				goto('/home')

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
					await changeDataObj(parms.sm, 'data_obj_auth_verify_phone_mobile')
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
	sm.changeProperties({
		packet: new StatePacket({
			actionType: CodeActionType.doOpen,
			token: new TokenAppDataObjName({
				dataObjName,
				queryType: TokenApiQueryType.preset
			})
		})
	})
}

async function sendCode(phoneMobile: string) {
	const min = 100000
	const max = 999999
	authSecurityCode = Math.floor(Math.random() * (max - min + 1)) + min
	authSecurityCodePhone = phoneMobile
	await apiFetch(
		ApiFunction.sysSendText,
		new TokenApiSysSendText(
			phoneMobile,
			`Mobile phone number verification code: ${authSecurityCode}`
		)
	)
}
