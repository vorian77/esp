import { getEnvVar } from '$server/env'
import { User } from '$utils/types'

export async function load({ locals }) {
	// <todo> - 241101 - temp - testing nav bar in dev mode only
	return { environ: getEnvVar('environ'), rawUser: locals.rawUser }
}
