import { ApiFunction } from '$routes/api/api'
import { debug, getServerResponse, getServerResponseMethod } from '$utils/types'
import { dbQuery } from '$server/types.queryServer'
import {
	getDataObjActionGroup,
	getDataObjId,
	getLinkItemsSource,
	getNodeByNodeId,
	getNodesChildren,
	sysErrorAdd,
	sysUserParmsGet,
	sysUserParmsSet
} from '$routes/api/db/dbGel/dbGelQueries'
import { dbInit } from '$server/dbGel/init/dbGelInit'
import { sysSendText } from '$routes/api/apiTwilio'
import { error } from '@sveltejs/kit'

const FILENAME = '/routes/api/dbGel/server.ts'

export async function POST({ cookies, request }) {
	const requestData = await request.json()
	const { apiFunction, token } = requestData

	switch (apiFunction) {
		case ApiFunction.dbGelGetDataObjActionGroup:
			return getServerResponseMethod(await getDataObjActionGroup(token))

		case ApiFunction.dbGelGetDataObjId:
			return getServerResponseMethod(await getDataObjId(token))

		case ApiFunction.dbGelGetLinkItemsSource:
			return getServerResponseMethod(await getLinkItemsSource(token))

		case ApiFunction.dbGelGetNodeByNodeId:
			return getServerResponseMethod(await getNodeByNodeId(token))

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
			return getServerResponseMethod(cookies.get('session_id') || '')

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
