import { ApiFunction } from '$routes/api/api'
import { debug, getServerResponse, getServerResponseMethod } from '$utils/types'
import { dbQuery } from '$routes/api/db/queryServer'
import {
	getDataObjActionGroup,
	getDataObjId,
	getLinkItemsSource,
	getNodesSystemParents,
	getNode,
	getNodesChildren,
	getUserPref,
	setUserPref,
	sysErrorAdd,
	sysErrorGet
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

		case ApiFunction.dbGelGetNode:
			return getServerResponseMethod(await getNode(token))

		case ApiFunction.dbGelGetNodesSystemParents:
			return getServerResponseMethod(await getNodesSystemParents(token))

		case ApiFunction.dbGelGetNodesChildren:
			return getServerResponseMethod(await getNodesChildren(token))

		case ApiFunction.dbGelInit:
			await dbInit()
			return getServerResponse({})

		case ApiFunction.dbQuery:
			return getServerResponse(await dbQuery(token))

		case ApiFunction.sysErrorAdd:
			return getServerResponseMethod(await sysErrorAdd(token))

		case ApiFunction.sysErrorGet:
			return getServerResponseMethod(await sysErrorGet(token))

		case ApiFunction.sysGetSessionId:
			return getServerResponseMethod(cookies.get('session_id'))

		case ApiFunction.sysSendText:
			return getServerResponse(await sysSendText(token))

		case ApiFunction.sysUserPrefGet:
			return getServerResponseMethod(await getUserPref(token))

		case ApiFunction.sysUserPrefSet:
			return getServerResponseMethod(await setUserPref(token))

		default:
			error(500, {
				file: FILENAME,
				function: 'POST',
				msg: `No case defined for ApiFunction: ${apiFunction}`
			})
	}
}
