import { Token, TokenApiFetchError, TokenApiFetchMethod } from '$utils/types.token'
import { type DataRecord } from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = '$routes/api/api.ts'

export enum ApiFunction {
	dbGelGetDataObjActionGroup = 'dbGelGetDataObjActionGroup',
	dbGelGetDataObjId = 'dbGelGetDataObjId',
	dbGelGetFieldEmbedListSelect = 'dbGelGetFieldEmbedListSelect',
	dbGelGetLinkItems = 'dbGelGetLinkItems',
	dbGelInit = 'dbGelInit',
	dbGelGetLinkItemsSource = 'dbGelGetLinkItemsSource',
	dbGelGetNode = 'dbGelGetNode',
	dbGelGetNodesChildren = 'dbGelGetNodesChildren',
	dbGelGetNodesSystemParents = 'dbGelGetNodesSystemParents',
	dbGelGetTableColumns = 'dbGelGetTableColumns',
	dbGelProcessDataObj = 'dbGelProcessDataObj',
	dbGelProcessExpression = 'dbGelProcessExpression',

	sysBlobUpload = 'sysBlobUpload',
	sysGetEnvDbBranch = 'sysGetEnvDbBranch',
	sysSendText = 'sysSendText',
	sysUserPrefGet = 'sysUserPrefGet',
	sysUserPrefSet = 'sysUserPrefSet'
}

export async function apiFetch(
	server: string,
	method: TokenApiFetchMethod,
	tokenError: TokenApiFetchError,
	components: DataRecord | undefined = undefined
) {
	let parms: DataRecord = { method }
	if (components) {
		if (Object.keys(components).includes('headers')) {
			parms.headers = components.headers
		}
		if (Object.keys(components).includes('formData')) {
			const formData = new FormData()
			Object.keys(components.formData).forEach((key) => {
				formData.set(key, components.formData[key])
			})
			parms.body = formData
		}
	}
	return await apiFetchData(server, parms, tokenError)
}

async function apiFetchData(server: string, parms: DataRecord, tokenError: TokenApiFetchError) {
	const responsePromise: Response = await fetch(server, parms)
	if (responsePromise.status < 400) {
		const result = await responsePromise.json()
		return result.data ? result.data : result
	} else {
		error(500, {
			file: tokenError.fileName,
			function: tokenError.functionName,
			message: JSON.stringify({
				httpStatus: responsePromise.status,
				httpStatusText: responsePromise.statusText,
				message: tokenError.message
			})
		})
	}
}

export async function apiFetchFunction(
	apiFunction: ApiFunction,
	tokenError: TokenApiFetchError,
	token: Token | undefined = undefined
) {
	let parms: DataRecord = { method: TokenApiFetchMethod.post }
	let body: DataRecord = { apiFunction }
	if (token) body.token = token
	parms.body = JSON.stringify(body)
	return await apiFetchData('/api', parms, tokenError)
}

export async function apiFetchFunctionRaw(
	apiFunction: ApiFunction,
	token: Token | undefined = undefined
) {
	let parms: DataRecord = { apiFunction }
	if (token) parms.token = token
	const responsePromise: Response = await fetch('/api', {
		method: 'POST',
		body: JSON.stringify(parms)
	})
	return await responsePromise.json()
}

export class ApiResult {
	data: DataRecord
	message?: string
	success: boolean
	constructor(success: boolean, data: DataRecord, message: string = '') {
		this.data = data
		this.message = message
		this.success = success
	}
}
