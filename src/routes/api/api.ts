import { Token, TokenApiFetchError, TokenApiFetchMethod } from '$utils/types.token'
import { type DataRecord } from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = '$routes/api/api.ts'

export enum ApiFunction {
	dbGelGetDataObjActionGroup = 'dbGelGetDataObjActionGroup',
	dbGelGetDataObjId = 'dbGelGetDataObjId',
	dbGelGetFieldEmbedListSelect = 'dbGelGetFieldEmbedListSelect',
	dbGelGetLinkItems = 'dbGelGetLinkItems',
	dbGelGetLinkItemsSource = 'dbGelGetLinkItemsSource',
	dbGelGetNodesBranch = 'dbGelGetNodesBranch',
	dbGelGetNodesLevel = 'dbGelGetNodesLevel',
	dbGelProcessDataObj = 'dbGelProcessDataObj',
	dbGelProcessExpression = 'dbGelProcessExpression',
	dbGelGetTableColumns = 'dbGelGetTableColumns',
	dbGelInit = 'dbGelInit',
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
	tokenData: Token | undefined = undefined
) {
	server = `/api/${server}`
	let parms: DataRecord = { method }
	if (tokenData) parms.token = JSON.stringify(tokenData)
	const responsePromise: Response = await fetch(server, parms)
	const rtn = await responsePromise.json()
	if (rtn.success) {
		return rtn.data
	} else {
		error(500, {
			file: tokenError.fileName,
			function: tokenError.functionName,
			message: tokenError.message
		})
	}
}

export async function apiFetchFunction(
	apiFunction: ApiFunction,
	token: Token | undefined = undefined
) {
	let parms: DataRecord = { apiFunction }
	if (token) parms = { ...parms, token }
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
