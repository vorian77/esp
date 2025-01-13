import { type Handle, type HandleServerError, redirect } from '@sveltejs/kit'
import { getUserByUserId } from '$routes/api/dbEdge/dbEdgeUtilities'
import { getEnvVar } from '$server/env'
import { TokenApiUserId } from '$utils/types.token'
import * as Sentry from '@sentry/sveltekit'

const FILENAME = 'hooks.server'

Sentry.init({
	dsn: 'https://cf41cf7f70214be6be23fa4a38cfd0e2@o4505108602945536.ingest.us.sentry.io/4505108606156800',

	// We recommend adjusting this value in production, or using tracesSampler
	// for finer control
	tracesSampleRate: 1.0
})

const routesUnprotected = ['/about', '/auth', '/legalDisclosure', '/test']

// <todo> - 240206 - possible way to control user reload of a page
// function beforeNavigate(
// 	callback: (
// 		navigation: import('@sveltejs/kit').BeforeNavigate
// 	) => void
// ): void;

// handle - route
export const handle: Handle = async ({ event, resolve }) => {
	// const serverHandler: Handle = async ({ event, resolve }) => {

	if (event.url.pathname === '/') {
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
	console.log('hooks.server.sessionId:', sessionId)
	if (!sessionId) {
		status('redirect - no sessionId...')
		redirect(303, '/')
	}

	// get user info
	if (!event.locals.rawUser) {
		const rawUser = await getUserByUserId(new TokenApiUserId(sessionId))
		if (!rawUser) {
			status('redirect - invalid sessionId...')
			redirect(303, '/')
		}
		const dbBranch = getEnvVar('EDGEDB_BRANCH')
		event.locals.rawUser = { ...rawUser, dbBranch }
	}

	// security protected routes
	return await resolve(event)

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
