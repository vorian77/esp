import { dbESPAPI } from '$server/dbESP'
import { HTMLMETHOD } from '$utils/types'
import { getEnvVar } from '$server/env'

export async function load({ locals, params }) {
	return {
		formDefns: [],
		docsStatus: await getDocsStatus()
	}

	async function getDocsStatus() {
		const responsePromise = await dbESPAPI(HTMLMETHOD.GET, 'ws_cm_ssr_elg_list', {})
		const response = await responsePromise.json()
		return response.data
	}
}
