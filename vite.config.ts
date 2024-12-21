import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { purgeCss } from 'vite-plugin-tailwind-purgecss'
import { nodeLoaderPlugin } from '@vavite/node-loader/plugin'
import { sentrySvelteKit } from '@sentry/sveltekit'

/** @type {import('vite').userConfig} */
export default defineConfig(({ mode }) => {
	let plugins = [
		sentrySvelteKit(),
		sveltekit(),
		purgeCss({ legacy: true, safelist: { greedy: [/^ag-/] } })
	]
	if (mode === 'development') {
		plugins.push(nodeLoaderPlugin())
	}
	// if (mode === 'development') {
	// 	const loaderPlugin: Promise<any> = Promise.resolve(nodeLoaderPlugin())
	// 	plugins = [loaderPlugin, ...plugins]
	// }

	return {
		build: {
			minify: false
		},
		plugins
	}
})

// export default defineConfig({ plugins: [sveltekit(), nodeLoaderPlugin()] })
