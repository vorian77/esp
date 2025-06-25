import { getEnvVar } from '$server/env'

const FILENAME = '$routes/home/+layout.server.ts'

export async function load({ locals }) {
	const clazz = 'routes/home/+layout.server.ts'
	return { environ: getEnvVar('environ'), success: true }
}
