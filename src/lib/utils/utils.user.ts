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
	const result = await apiFetch(ApiFunction.dbEdgeGetUser, new TokenApiUserId(userId))
	if (result.success) {
		const rawUser = result.data
		appStoreUser.set(rawUser)
		return new User(rawUser)
	} else {
		error(500, {
			file: 'utils.user.ts',
			function: 'userInit',
			message: `Unable to initialize user: ${userId}`
		})
	}
}
