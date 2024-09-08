import * as Sentry from '@sentry/sveltekit'

Sentry.init({
	dsn: 'https://cf41cf7f70214be6be23fa4a38cfd0e2@o4505108602945536.ingest.us.sentry.io/4505108606156800',

	// We recommend adjusting this value in production, or using tracesSampler
	// for finer control
	tracesSampleRate: 1.0,

	// Optional: Initialize Session Replay:
	integrations: [Sentry.replayIntegration()],
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1.0
})

const myErrorHandler = ({ error, event }) => {
	console.error('An error occurred on the client side:', error, event)
}

export const handleError = Sentry.handleErrorWithSentry(myErrorHandler)

// or alternatively, if you don't have a custom error handler:
// export const handleError = handleErrorWithSentry();
