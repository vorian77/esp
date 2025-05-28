import { getEnvVar } from '$server/env'
import { MethodResult } from '$utils/utils.sys'
import type { Actions } from './$types'

const FILENAME = '$routes/+page.server.ts'

export async function load() {
	return { environ: getEnvVar('environ') }
}

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData()
		const session_id = formData.get('session_id')?.toString() || ''
		let result = {}
		try {
			cookies.set('session_id', session_id, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: true
			})
		} catch (error) {
			result = {
				error: {
					file: FILENAME,
					function: 'actions',
					msgSystem: `Unable to set session_id: ${session_id}`,
					msgUser: `Unable to set session id.`
				}
			}
		}
		return JSON.stringify(new MethodResult(result))
	}
} satisfies Actions
