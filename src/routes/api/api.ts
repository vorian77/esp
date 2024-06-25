import { Token } from '$utils/types.token'
import { type DataObjData, type DataRecord, required } from '$utils/types'
import { RawDataObj } from '$comps/dataObj/types.rawDataObj'
import {
	TokenApiDbDataObjSource,
	TokenApiQuery,
	TokenApiQueryData,
	TokenApiQueryType
} from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '$routes/api/api.ts'

export enum ApiFunction {
	dbEdgeGetDataObjActionField = 'dbEdgeGetDataObjActionField',
	dbEdgeGetDataObjId = 'dbEdgeGetDataObjId',
	dbEdgeGetNodesBranch = 'dbEdgeGetNodesBranch',
	dbEdgeGetNodesLevel = 'dbEdgeGetNodesLevel',
	dbEdgeGetRepParmItems = 'dbEdgeGetRepParmItems',
	dbEdgeProcessDataObj = 'dbEdgeProcessDataObj',
	dbEdgeProcessExpression = 'dbEdgeProcessExpression',
	dbEdgeGetTableColumns = 'dbEdgeGetTableColumns',
	dbEdgeGetUser = 'dbEdgeGetUser',
	dbEdgeInit = 'dbEdgeInit',
	sendText = 'sendText'
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
