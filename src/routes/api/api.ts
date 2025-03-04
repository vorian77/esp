import { Token } from '$utils/types.token'
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

export async function apiFetch(apiFunction: ApiFunction, token: Token | undefined = undefined) {
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
