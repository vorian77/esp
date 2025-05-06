import { getEnvVar } from '$server/env'

const FILENAME = '$routes/auth/[authType]/+page.server.ts'

export async function load({ params }) {
	return { environ: getEnvVar('environ'), authType: params.authType }
}
