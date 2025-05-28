import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { purgeCss } from 'vite-plugin-tailwind-purgecss'
import { nodeLoaderPlugin } from '@vavite/node-loader/plugin'

/** @type {import('vite').userConfig} */
export default defineConfig(({ mode }) => {
	let plugins = [sveltekit(), purgeCss({ legacy: true, safelist: { greedy: [/^ag-/] } })]
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

// export default defineConfig({ plugins: [sveltekit(), nodeLoaderPlugin()] })
