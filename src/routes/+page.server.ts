import { getEnvVar } from '$server/env'

export async function load() {
	// todo - 241101 - for NavBar experiment
	return { system: { org_name: getEnvVar('ORG_NAME'), server_mode: getEnvVar('SERVER_MODE') } }
}
