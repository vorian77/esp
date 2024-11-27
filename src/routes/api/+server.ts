import { ApiFunction } from '$routes/api/api'
import { debug, getServerResponse, userRetrieve } from '$utils/types'
import {
	getFieldListItems,
	processDataObj,
	processExpression
} from '$routes/api/dbEdge/dbEdgeProcess'
import {
	getDataObjActionFieldGroup,
	getDataObjId,
	getFieldEmbedListSelect,
	getNodesBranch,
	getNodesLevel,
	getNodeObjByName,
	getTableColumns,
	getUserByUserId,
	getUserPref,
	setUserPref
} from '$routes/api/dbEdge/dbEdgeUtilities'
import { dbEdgeInit } from '$server/dbEdge/init/dbEdgeInit'
import { sysSendText } from '$routes/api/apiTwilio'
import { error } from '@sveltejs/kit'

const FILENAME = '/routes/api/dbEdge/server.ts'

export async function POST({ request, cookies }) {
	const requestData = await request.json()
	const { apiFunction, token } = requestData

	switch (apiFunction) {
		case ApiFunction.dbEdgeGetDataObjActionFieldGroup:
			return getServerResponse(await getDataObjActionFieldGroup(token))

		case ApiFunction.dbEdgeGetDataObjId:
			return getServerResponse(await getDataObjId(token))

		case ApiFunction.dbEdgeGetFieldEmbedListSelect:
			return getServerResponse(await getFieldEmbedListSelect(token))

		case ApiFunction.dbEdgeGetFieldListItems:
			return getServerResponse(await getFieldListItems(token))

		case ApiFunction.dbEdgeGetNodesBranch:
			return getServerResponse(await getNodesBranch(token))

		case ApiFunction.dbEdgeGetNodesLevel:
			return getServerResponse(await getNodesLevel(token))

		case ApiFunction.dbEdgeGetTableColumns:
			return getServerResponse(await getTableColumns(token))

		case ApiFunction.dbEdgeGetUser:
			return getServerResponse(await userRetrieve(token, cookies, getUserByUserId))

		case ApiFunction.dbEdgeInit:
			await dbEdgeInit()
			return getServerResponse({})

		case ApiFunction.dbEdgeProcessDataObj:
			return getServerResponse(await processDataObj(token))

		case ApiFunction.dbEdgeProcessExpression:
			return getServerResponse(await processExpression(token))

		case ApiFunction.sysSendText:
			return getServerResponse(await sysSendText(token))

		case ApiFunction.sysGetUserPref:
			return getServerResponse(await getUserPref(token))

		case ApiFunction.sysSetUserPref:
			return getServerResponse(await setUserPref(token))

		default:
			error(500, {
				file: FILENAME,
				function: 'POST',
				message: `No case defined for ApiFunction: ${apiFunction}`
			})
	}
}
