// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		rawUser: any
	}
	// interface PageData {}
	interface Error {
		code?: string
		file: string
		function: string
		message?: string
		msg?: string
		msgSystem?: string
		msgUser?: string
	}
	// interface Platform {}
}
