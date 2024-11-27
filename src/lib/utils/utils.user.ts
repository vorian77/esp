import { get } from 'svelte/store'
import { localStorageStore } from '@skeletonlabs/skeleton'
import { User } from '$utils/types'
import { apiFetch, ApiFunction } from '$routes/api/api'
import { TokenApiUserId } from '$utils/types.token'
import { error, type Cookies } from '@sveltejs/kit'

const FILENAME = '$utils/utils.user.ts'

export let appStoreUser = localStorageStore('appStoreUser', {})

export function userGet() {
	const rawUser = get(appStoreUser)
	return rawUser && Object.keys(rawUser).length > 0 ? new User(rawUser) : undefined
}

export async function userInit(userId: string) {
	const token = new TokenApiUserId(userId)
	const rawUser = await userInitData(token, ApiFunction.dbEdgeGetUser)
	appStoreUser.set(rawUser)
	return new User(rawUser)
}

async function userInitData(token: TokenApiUserId, api: ApiFunction) {
	const result = await apiFetch(api, token)
	if (result.success) {
		return result.data
	} else {
		error(500, {
			file: 'utils.user.ts',
			function: 'userInitData',
			message: `Unable to retrieve data for user: ${token.userId} - api: ${api}`
		})
	}
}

export function userLogout() {
	appStoreUser.set({})
	localStorage.clear()
}

export async function userRetrieve(token: TokenApiUserId, cookies: Cookies, fGetUser: Function) {
	const user: any = await fGetUser(token)
	if (user) {
		if (Object.hasOwn(user, 'id')) {
			setCookie('session_id', token.userId)
			setCookie('session_user', 'abc')
		}
		return user
	} else {
		error(500, {
			file: FILENAME,
			function: 'getUser',
			message: `Unable to get user: ${token.userId}`
		})
	}

	function setCookie(name: string, data: string) {
		cookies.set(name, data, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true
		})
	}
}

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
