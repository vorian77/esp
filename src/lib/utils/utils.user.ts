import { get } from 'svelte/store'
import { localStorageStore } from '@skeletonlabs/skeleton'
import { User } from '$utils/types'
import { apiFetch, ApiFunction } from '$routes/api/api'
import { TokenApiUserId } from '$utils/types.token'
import { error } from '@sveltejs/kit'

export let appStoreUser = localStorageStore('appStoreUser', {})

export function userGet() {
	const rawUser = get(appStoreUser)
	return rawUser && Object.keys(rawUser).length > 0 ? new User(rawUser) : undefined
}

export async function userInit(userId: string) {
	const token = new TokenApiUserId(userId)
	const rawUser = await userInitData(token, ApiFunction.dbEdgeGetUser)
	rawUser.resources_sys_app = await userInitData(token, ApiFunction.sysGetUserResourcesApp)
	rawUser.resources_sys_footer = await userInitData(token, ApiFunction.sysGetUserResourcesFooter)
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
