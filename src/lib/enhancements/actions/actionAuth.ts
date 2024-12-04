import { State } from '$comps/app/types.appState'
import { FieldCustomAction } from '$comps/form/fieldCustom'
import type { DataRecord, ResponseBody } from '$utils/types'
import { debug, DataObjData, encrypt, ToastType, userInit } from '$utils/types'
import { apiFetch, ApiFunction } from '$routes/api/api'
import {
	TokenApiDbDataObjSource,
	TokenApiQuery,
	TokenApiQueryData,
	TokenApiQueryType,
	TokenApiSysSendText
} from '$utils/types.token'
import { goto } from '$app/navigation'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/actions/actionAuth.ts'

let verifyFrom = ''
let verifyData: DataRecord = {}
let authSecurityCodePhone = ''
let authSecurityCode = 0

export default async function action(state: State, field: FieldCustomAction, data: any) {
	const type = field.type
	const value = field.value

	switch (type) {
		case 'page':
			await state.openDrawerDataObj(
				'auth',
				'bottom',
				'h-[50%]',
				undefined,
				new TokenApiDbDataObjSource({ dataObjName: value }),
				TokenApiQueryType.preset
			)
			break

		case 'resend_code':
			sendCode(authSecurityCodePhone)
			break

		case 'submit':
			switch (value) {
				case 'data_obj_auth_login':
				case 'data_obj_auth_signup':
					await processDataObj(value, data)
					break

				case 'data_obj_auth_reset_password_account':
				case 'data_obj_auth_reset_password_login':
					verifyFrom = value
					verifyData = data
					await sendCode(data['userName'])
					await state.openDrawerDataObj(
						'auth',
						'bottom',
						'h-[50%]',
						undefined,
						new TokenApiDbDataObjSource({ dataObjName: 'data_obj_auth_verify_phone_mobile' }),
						TokenApiQueryType.preset
					)
					break

				case 'data_obj_auth_verify_phone_mobile':
					const securityCode = data['authSecurityCode']
					if (securityCode !== authSecurityCode.toString()) {
						alert('The security code you entered is not correct. Please try again.')
						return
					}
					// state.openToast(ToastType.success, 'Your account has been updated!')
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
				function: 'action',
				message: `No case defined for type: ${type}`
			})
	}

	async function processDataObj(dataObjName: string, data: any) {
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
				new TokenApiQueryData({ record: data })
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
				const userId = resultRecord['userId']
				const user = await userInit(userId)
				if (user && Object.hasOwn(user, 'id')) {
					state.storeDrawer.close()
					goto('/home')
				}
				break

			case 'data_obj_auth_signup':
				if (!Object.hasOwn(resultRecord, 'isNew')) {
					alert(msgFail)
					return
				}
				const isNew = resultRecord['isNew']
				if (isNew) {
					await processDataObj('data_obj_auth_signup_insert', data)
				} else {
					verifyFrom = 'data_obj_auth_signup_update'
					verifyData = data
					await sendCode(data['userName'])
					await state.openDrawerDataObj(
						'auth',
						'bottom',
						'h-[50%]',
						undefined,
						new TokenApiDbDataObjSource({ dataObjName: 'data_obj_auth_verify_phone_mobile' }),
						TokenApiQueryType.preset
					)
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
