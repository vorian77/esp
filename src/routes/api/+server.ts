import { ApiFunction } from '$routes/api/api'
import { getEnvVar } from '$server/env'
import { RawUserAttr } from '$routes/home/types.rawUser'
import { debug, getServerResponse, getServerResponseMethod, MethodResult } from '$utils/types'
import { dbQuery } from '$server/types.queryServer'
import {
	getDataObjActionGroup,
	getDataObjId,
	getEligibility,
	getLinkItemsSource,
	getNodeByNodeId,
	getNodeByNodeName,
	getNodesChildren,
	sysErrorAdd,
	getUserByUserId,
	sysUserParmsGet,
	sysUserParmsSet
} from '$routes/api/db/dbGel/dbGelQueries'
import { TokenApiId } from '$utils/types.token'
import { dbInit } from '$server/dbGel/init/dbGelInit'
import { sysSendText } from '$routes/api/apiTwilio'
import { error } from '@sveltejs/kit'

const FILENAME = '/routes/api/dbGel/server.ts'

export async function POST({ cookies, request }) {
	const requestData = await request.json()
	const { apiFunction, token } = requestData
	let result: MethodResult

	switch (apiFunction) {
		case ApiFunction.dbGelGetDataObjActionGroup:
			return getServerResponseMethod(await getDataObjActionGroup(token))

		case ApiFunction.dbGelGetDataObjId:
			return getServerResponseMethod(await getDataObjId(token))

		case ApiFunction.dbGelGetEligibility:
			return getServerResponseMethod(await getEligibility(token))

		case ApiFunction.dbGelGetLinkItemsSource:
			return getServerResponseMethod(await getLinkItemsSource(token))

		case ApiFunction.dbGelGetNodeByNodeId:
			return getServerResponseMethod(await getNodeByNodeId(token))

		case ApiFunction.dbGelGetNodeByNodeName:
			return getServerResponseMethod(await getNodeByNodeName(token))

		case ApiFunction.dbGelGetNodesChildren:
			return getServerResponseMethod(await getNodesChildren(token))

		case ApiFunction.dbGelInit:
			await dbInit()
			return getServerResponse({})

		case ApiFunction.dbQuery:
			return getServerResponse(await dbQuery(token))

		case ApiFunction.sysErrorAdd:
			return getServerResponseMethod(await sysErrorAdd(token))

		case ApiFunction.sysGetSessionId:
			return getServerResponseMethod(getSessionId(cookies))

		case ApiFunction.sysGetUserByUserId:
			return getServerResponse(await getUser(cookies))

		case ApiFunction.sysSendText:
			return getServerResponse(await sysSendText(token))

		case ApiFunction.sysUserParmsGet:
			return getServerResponseMethod(await sysUserParmsGet(token))

		case ApiFunction.sysUserParmsSet:
			return getServerResponseMethod(await sysUserParmsSet(token))

		default:
			error(500, {
				file: FILENAME,
				function: 'POST',
				msg: `No case defined for ApiFunction: ${apiFunction}`
			})
	}
}

function getSessionId(cookies: any): string {
	return cookies.get('session_id') || ''
}

async function getUser(cookies: any): Promise<MethodResult> {
	const sessionId = getSessionId(cookies)
	let result: MethodResult = await getUserByUserId(new TokenApiId(sessionId))
	if (result.error) result
	let rawUser: any = result.data

	rawUser.dbBranch = getEnvVar('GEL_BRANCH')

	const rawUserAttr = new RawUserAttr(rawUser)
	result = await rawUserAttr.setAttrs(rawUser)
	if (result.error) return result
	return new MethodResult(result.data)
}
