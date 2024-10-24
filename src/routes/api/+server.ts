import { ApiFunction } from '$routes/api/api'
import { TokenApiUserId } from '$utils/types.token'
import { debug, getServerResponse } from '$utils/types'
import {
	getRepParmItems,
	processDataObj,
	processExpression
} from '$routes/api/dbEdge/dbEdgeProcess'
import {
	getDataObjActionFieldGroup,
	getNodesBranch,
	getNodesLevel,
	getTableColumns,
	getUserByUserId,
	getUserPref,
	getUserResourcesApp,
	getUserResourcesFooter,
	setUserPref
} from '$routes/api/dbEdge/dbEdgeUtilities'
import { getDataObjId } from '$routes/api/dbEdge/dbEdgeUtilities'
import { dbEdgeInit } from '$server/dbEdge/init/dbEdgeInit'
import { sysSendText } from '$routes/api/apiTwilio'
import { error, type Cookies } from '@sveltejs/kit'

const FILENAME = '/routes/api/dbEdge/server.ts'

export async function POST({ request, cookies }) {
	const requestData = await request.json()
	const { apiFunction, token } = requestData

	switch (apiFunction) {
		case ApiFunction.dbEdgeGetDataObjActionFieldGroup:
			return getServerResponse(await getDataObjActionFieldGroup(token.id))

		case ApiFunction.dbEdgeGetDataObjId:
			return getServerResponse(await getDataObjId(token.dataObjName))

		case ApiFunction.dbEdgeGetNodesBranch:
			return getServerResponse(await getNodesBranch(token))

		case ApiFunction.dbEdgeGetNodesLevel:
			return getServerResponse(await getNodesLevel(token))

		case ApiFunction.dbEdgeGetRepParmItems:
			return getServerResponse(await getRepParmItems(token))

		case ApiFunction.dbEdgeGetTableColumns:
			return getServerResponse(await getTableColumns(token))

		case ApiFunction.dbEdgeGetUser:
			return getServerResponse(await getUser(token, cookies))

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

		case ApiFunction.sysGetUserResourcesApp:
			return getServerResponse(await getUserResourcesApp(token))

		case ApiFunction.sysGetUserResourcesFooter:
			return getServerResponse(await getUserResourcesFooter(token))

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

async function getUser(token: TokenApiUserId, cookies: Cookies) {
	const user: any = await getUserByUserId(token)
	if (user) {
		if (Object.hasOwn(user, 'id')) setCookie(cookies, token)
		return user
	} else {
		error(500, {
			file: FILENAME,
			function: 'getUser',
			message: `Unable to get user: ${token.userId}`
		})
	}

	// return getServerResponse(user)

	/*  
	<todo> 231130 - esp user record
	user_id: 170896,
		per_name_first: 'Phyllip',
		per_name_last: 'Hall',
		per_name_full: 'Phyllip Hall',
		initials: 'PH',
		org_id: 6761,
		user_type_list: '',
		user_types: [ 'student' ],
		header: 'Atlantic Impact Mobile',
		apps: [ '/home/cm' ],
		cm_ssr_disclosure: 1,
		cm_ssr_site: null,
		site: '',
		referral_id: -1,
		cm_ssr_submitted: null,
		status: 'Pending',
		time_stamp: '2023-11-30 07:53:29.205',
		root: '/home/cm',
	
		async function getUserESP() {
			const responsePromise = await dbESPAPI(HTMLMETHOD.GET, 'ws_cm_ssr_user', { userId })
			const response: ResponseBody = await responsePromise.json()
	
			if (!response.success) {
				throw error(500, {
					file: FILENAME,
					function: 'getUserESP',
					message: `Unable to retrieve user: ${userId}`
				})
			}
	
			// set user
			const user = response.data
	
			// array user types
			user.user_types = user.user_types.split(',')
	
			// apps
			if (user.apps === '') {
				throw error(500, {
					file: FILENAME,
					function: 'fetchUser',
					message: `No apps defined for user: ${user.per_name_full} id: ${user.user_id}`
				})
			}
			const appsList = user.apps.split(',')
			user.apps = appsList.map((app: string) => '/home/' + app)
			user.root = user.user_types.includes('admin') ? '/home' : user.apps[0]
	
	*/

	// <todo> 231008 - need to figure out how to set global current user
	// set global current user
	// await dbExecute(`set global sys_user::currentUserId := <uuid>"${user.id}"`)
	// set global currentUserId := <uuid>"9a2966ba-4e96-11ee-abc0-73f75479eb42";

	// const q = `select global sys_user::currentUser { fullName }`
	// const u = await dbSelectSingle(q)
	// console.log('global user:', u)
	// await getData('')
}

function setCookie(cookies: Cookies, token: TokenApiUserId) {
	cookies.set('session_id', token.userId, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: true
	})
}
