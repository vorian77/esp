import { getEnvVar } from '$server/env'

export async function load() {
	// <todo> - 241101 - temp - testing nav bar in dev mode only
	return { environ: getEnvVar('environ') }
}
