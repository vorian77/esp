import { join } from 'path'
import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import { skeleton } from '@skeletonlabs/tw-plugin'
import { tailwindThemeESP } from './tailwind-theme-esp'

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			colors: {
				nav: '#6B7280',
				'nav-hover': '#374151'
			}
		}
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				preset: ['skeleton'],
				custom: [tailwindThemeESP]
			}
		})
	]
} satisfies Config
