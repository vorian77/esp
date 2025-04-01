import { ApiFunction } from '$routes/api/api'
import { debug, getServerResponse } from '$utils/types'
import { getEnvVar } from '$server/env'
import { getLinkItems, processDataObj, processExpression } from '$routes/api/dbGel/dbGelProcess'
import {
	getDataObjActionGroup,
	getDataObjId,
	getFieldEmbedListSelect,
	getLinkItemsSource,
	getNodesSystemParents,
	getNode,
	getNodesChildren,
	getTableColumns,
	getUserByUserId,
	getUserPref,
	setUserPref
} from '$routes/api/dbGel/dbGelUtilities'
import { dbInit } from '$server/dbGel/init/dbGelInit'
import { sysSendText } from '$routes/api/apiTwilio'
import { error } from '@sveltejs/kit'

const FILENAME = '/routes/api/dbGel/server.ts'

export async function POST({ request }) {
	const requestData = await request.json()
	const { apiFunction, token } = requestData

	switch (apiFunction) {
		case ApiFunction.dbGelGetDataObjActionGroup:
			return getServerResponse(await getDataObjActionGroup(token))

		case ApiFunction.dbGelGetDataObjId:
			return getServerResponse(await getDataObjId(token))

		case ApiFunction.dbGelGetFieldEmbedListSelect:
			return getServerResponse(await getFieldEmbedListSelect(token))

		case ApiFunction.dbGelGetLinkItems:
			return getServerResponse(await getLinkItems(token))

		case ApiFunction.dbGelGetLinkItemsSource:
			return getServerResponse(await getLinkItemsSource(token))

		case ApiFunction.dbGelGetNode:
			return getServerResponse(await getNode(token))

		case ApiFunction.dbGelGetNodesSystemParents:
			return getServerResponse(await getNodesSystemParents(token))

		case ApiFunction.dbGelGetNodesChildren:
			return getServerResponse(await getNodesChildren(token))

		case ApiFunction.dbGelGetTableColumns:
			return getServerResponse(await getTableColumns(token))

		case ApiFunction.dbGelInit:
			await dbInit()
			return getServerResponse({})

		case ApiFunction.dbGelProcessDataObj:
			return getServerResponse(await processDataObj(token))

		case ApiFunction.dbGelProcessExpression:
			return getServerResponse(await processExpression(token))

		case ApiFunction.sysGetEnvDbBranch:
			return getServerResponse({ success: true, data: { dbBranch: getEnvVar('EDGEDB_BRANCH') } })

		case ApiFunction.sysSendText:
			return getServerResponse(await sysSendText(token))

		case ApiFunction.sysUserPrefGet:
			return getServerResponse(await getUserPref(token))

		case ApiFunction.sysUserPrefSet:
			return getServerResponse(await setUserPref(token))

		default:
			error(500, {
				file: FILENAME,
				function: 'POST',
				message: `No case defined for ApiFunction: ${apiFunction}`
			})
	}
}
