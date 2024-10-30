import { Token } from '$utils/types.token'
import { type DataRecord } from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = '$routes/api/api.ts'

export enum ApiFunction {
	dbEdgeGetDataObjActionFieldGroup = 'dbEdgeGetDataObjActionFieldGroup',
	dbEdgeGetDataObjId = 'dbEdgeGetDataObjId',
	dbEdgeGetNodeObjByName = 'dbEdgeGetNodeObjByName',
	dbEdgeGetNodesBranch = 'dbEdgeGetNodesBranch',
	dbEdgeGetNodesLevel = 'dbEdgeGetNodesLevel',
	dbEdgeGetRepParmItems = 'dbEdgeGetRepParmItems',
	dbEdgeProcessDataObj = 'dbEdgeProcessDataObj',
	dbEdgeProcessExpression = 'dbEdgeProcessExpression',
	dbEdgeGetTableColumns = 'dbEdgeGetTableColumns',
	dbEdgeGetUser = 'dbEdgeGetUser',
	dbEdgeInit = 'dbEdgeInit',
	sysGetUserPref = 'sysGetUserPref',
	sysGetUserResourcesApp = 'sysGetUserResourcesApp',
	sysGetUserResourcesFooter = 'sysGetUserResourcesFooter',
	sysSendText = 'sysSendText',
	sysSetUserPref = 'sysSetUserPref'
}

export async function apiFetch(apiFunction: ApiFunction, token: Token) {
	const responsePromise: Response = await fetch('/api', {
		method: 'POST',
		body: JSON.stringify({ apiFunction, token })
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
