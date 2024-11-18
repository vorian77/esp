import { getEnvVar } from '$server/env'

export async function load() {
	return { environ: getEnvVar('environ') }
}
