import { type Handle, redirect } from '@sveltejs/kit'

const FILENAME = 'hooks.server'

// Sentry.init({
// 	dsn: 'https://cf41cf7f70214be6be23fa4a38cfd0e2@o4505108602945536.ingest.us.sentry.io/4505108606156800',

// 	// We recommend adjusting this value in production, or using tracesSampler
// 	// for finer control
// 	tracesSampleRate: 1.0
// })

const routesUnprotected = ['/about', '/api', '/auth', '/error']

// <todo> - 240206 - possible way to control user reload of a page
// function beforeNavigate(
// 	callback: (
// 		navigation: import('@sveltejs/kit').BeforeNavigate
// 	) => void
// ): void;

// handle - route
export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === '/' || startsWith('/auth')) {
		if (event.cookies.get('session_id')) {
			event.cookies.delete('session_id', { path: '/' })
			redirect(303, '/auth/login')
		} else {
			return await resolve(event)
		}
	}

	if (event.url.pathname.toLowerCase().startsWith('/api')) {
		status('api endpoint...')
		return await resolve(event)
	}

	if (
		routesUnprotected.findIndex((r) =>
			event.url.pathname.toLowerCase().startsWith(r.toLowerCase())
		) >= 0
	) {
		status('unprotected route...')
		return await resolve(event)
	}

	// remaining routes require sessionId
	const sessionId = event.cookies.get('session_id')
	if (sessionId) {
		event.locals.sessionId = sessionId
	} else {
		status('redirect - no sessionId...')
		redirect(303, '/')
	}

	// security protected routes
	return await resolve(event)

	function startsWith(route: string) {
		return event.url.pathname.toLowerCase().startsWith(route)
	}

	function status(msg: string) {
		// console.log()
		// console.log(`${FILENAME}: ${msg}`)
	}
}

// export const handle = sequence(Sentry.sentryHandle(), serverHandler)

// handle - error
// const serverErrorHandler: HandleServerError = async ({ error, event }) => {
// 	const message =
// 		error instanceof Error
// 			? error.message
// 			: 'Something unexpected happend. Please try again, or report the problem.'

// 	console.error('hooks.server.ErrorHandler:', message)

// 	return {
// 		file: event.route.id || 'unknown',
// 		function: 'unknown',
// 		message
// 	}
// }

// export const handleError = Sentry.handleErrorWithSentry(serverErrorHandler)
