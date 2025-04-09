import { getEnvVar } from '$server/env'
import type { Actions } from './$types'

export async function load({ params }) {
	return { environ: getEnvVar('environ'), authType: params.authType }
}

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData()
		const session_id = formData.get('session_id')?.toString() || ''

		cookies.set('session_id', session_id, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true
		})

		return { session_id: session_id }
	}
} satisfies Actions
