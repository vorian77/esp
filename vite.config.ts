import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { purgeCss } from 'vite-plugin-tailwind-purgecss'
import { nodeLoaderPlugin } from '@vavite/node-loader/plugin'
import { sentrySvelteKit } from '@sentry/sveltekit'

/** @type {import('vite').userConfig} */
export default defineConfig(({ mode }) => {
	let plugins = [sentrySvelteKit(), sveltekit(), purgeCss()]
	if (mode === 'development') {
		plugins.push(nodeLoaderPlugin())
	}
	return {
		build: {
			minify: false
		},
		plugins
	}
})
