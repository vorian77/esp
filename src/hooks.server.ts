import { redirect } from '@sveltejs/kit'

const FILENAME = 'hooks.server'

const routesUnprotected = ['/about', '/auth', '/legalDisclosure']

// <todo> - 240206 - possible way to control user reload of a page
// function beforeNavigate(
// 	callback: (
// 		navigation: import('@sveltejs/kit').BeforeNavigate
// 	) => void
// ): void;

export async function handle({ event, resolve }) {
	status(`url.pathname: ${event.url.pathname}`)

	if (event.url.pathname === '/') {
		if (event.cookies.get('session_id')) {
			status('root path - deleting cookie...')
			event.cookies.delete('session_id', { path: '/' })
		}
		status('resolving root path...')
		return await resolve(event)
	}

	if (event.url.pathname.startsWith('/logout')) {
		status('logout...')
		redirect(303, '/')
	}

	if (event.url.pathname.toLowerCase().startsWith('/api')) {
		status('api endpoint...')
		return await resolve(event)
	}

	if (
		routesUnprotected.findIndex((r) => r.toLowerCase() === event.url.pathname.toLowerCase()) >= 0
	) {
		status('unprotected route...')
		return await resolve(event)
	}

	// remaining routes require sessionId
	const sessionId = event.cookies.get('session_id')
	if (!sessionId) {
		status('redirect - no sessionId...')
		redirect(303, '/')
	}

	// get user info
	// <todo> 240127 - only retrieved for legal disclosure???
	// const user = await getUserByUserId(sessionId)
	// status(`retrieved user...`)
	// if (!user) {
	// 	status(`redirect - could not retrieve user: ${sessionId}`)
	// 	redirect(303, '/')
	// }

	// confirm legal disclosure
	// if (!user.cm_ssr_disclosure) {
	// status('redirect - not disclosed...')
	// 	throw redirect(303, '/legalDisclosure')
	// }

	// security protected routes
	return await resolve(event)

	function status(msg: string) {
		// console.log()
		// console.log(`${FILENAME}: ${msg}`)
	}
}

export const handleError = ({ error, event }) => {
	const message =
		error instanceof Error
			? error.message
			: 'Something unexpected happend. Please try again, or report the problem.'
	return {
		file: event.route.id || 'unknown',
		function: 'unknown',
		message
	}
}
