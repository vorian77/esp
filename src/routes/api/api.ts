import { goto } from '$app/navigation'
import {
	isPlainObject,
	MethodResult,
	MethodResultError,
	valueOrDefault,
	type DataRecord
} from '$utils/types'
import { Token, TokenApiError, TokenApiFetchMethod } from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '$routes/api/api.ts'

export enum ApiFunction {
	dbGelGetDataObjActionGroup = 'dbGelGetDataObjActionGroup',
	dbGelGetDataObjId = 'dbGelGetDataObjId',
	dbGelGetLinkItemsSource = 'dbGelGetLinkItemsSource',
	dbGelGetNodeByNodeId = 'dbGelGetNodeByNodeId',
	dbGelGetNodeByNodeName = 'dbGelGetNodeByNodeName',
	dbGelGetNodesChildren = 'dbGelGetNodesChildren',

	dbGelInit = 'dbGelInit',
	dbQuery = 'dbQuery',

	sysErrorAdd = 'sysErrorAdd',

	sysGetSessionId = 'sysGetSessionId',
	sysGetUserByUserId = 'sysGetUserByUserId',
	sysSendText = 'sysSendText',
	sysUserParmsGet = 'sysUserParmsGet',
	sysUserParmsSet = 'sysUserParmsSet'
}

export async function apiErrorCheck(methodResult: MethodResult) {
	if (methodResult.error) {
		// get session id
		let result: MethodResult = await apiFetchRaw('/api', {
			body: { apiFunction: ApiFunction.sysGetSessionId }
		})
		let _sessionId = isPlainObject(result.data) ? '' : result.data

		// save error to db
		const token = new TokenApiError({ ...methodResult.error, _sessionId })
		result = await apiFetchRaw('/api', {
			body: { apiFunction: ApiFunction.sysErrorAdd, token }
		})
		const errorId = result.data.id

		// redirect to error page
		goto(`/error/${errorId}`)
	}
}

export async function apiFetch(server: string, parms: DataRecord = {}) {
	const result: MethodResult = await apiFetchRaw(server, parms)
	await apiErrorCheck(result)
	return result
}

export async function apiFetchFunction(
	apiFunction: ApiFunction,
	token: Token | undefined = undefined
) {
	let init: DataRecord = { method: TokenApiFetchMethod.post }
	init.body = { apiFunction }
	if (token) init.body.token = token
	return await apiFetch('/api', init)
}

export async function apiFetchRaw(server: string, parms: DataRecord = {}) {
	parms = valueOrDefault(parms, {})
	let init: DataRecord = { method: parms.method || TokenApiFetchMethod.post }

	if (parms.hasOwnProperty('body')) {
		init.body = JSON.stringify(parms.body)
	}
	if (parms.hasOwnProperty('formData')) {
		const formData = new FormData()
		Object.keys(parms.formData).forEach((key) => {
			formData.set(key, parms.formData[key])
		})
		init.body = formData
	}
	if (parms.hasOwnProperty('headers')) {
		init.headers = parms.headers
	}

	try {
		const responsePromise: Response = await fetch(server, init)
		const response = await responsePromise.json()
		if (responsePromise.ok) {
			return response
		} else {
			return new MethodResult({
				error: new MethodResultError({
					code: response.code,
					file: response.file,
					function: response.function,
					message: response.message,
					msg: response.msg,
					msgSystem: response.msgSystem,
					msgUser: response.msgUser,
					status: responsePromise.status
				})
			})
		}
	} catch (err: any) {
		error(404, {
			file: FILENAME,
			function: 'apiFetchRaw',
			msg: `Unable to fetch from server: ${err.message}`
		})
	}
}
