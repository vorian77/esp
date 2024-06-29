import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { purgeCss } from 'vite-plugin-tailwind-purgecss'
import { nodeLoaderPlugin } from '@vavite/node-loader/plugin'

/** @type {import('vite').userConfig} */
export default defineConfig(({ mode }) => {
	let plugins = [sveltekit(), purgeCss()]
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
