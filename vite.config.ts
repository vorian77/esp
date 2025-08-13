import tailwindcss from '@tailwindcss/vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()]
})

// import { nodeLoaderPlugin } from '@vavite/node-loader/plugin'

// export default defineConfig({ plugins: [sveltekit(), nodeLoaderPlugin()] })

// /** @type {import('vite').userConfig} */
// export default defineConfig(({ mode }) => {
// 	let plugins = [tailwindcss(), sveltekit()]
// 	// if (mode === 'development') {
// 	// 	plugins.push(nodeLoaderPlugin())
// 	// }

// 	return {
// 		build: {
// 			minify: false
// 		},
// 		plugins
// 	}
// })
