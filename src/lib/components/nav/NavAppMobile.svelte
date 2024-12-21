<script lang="ts">
	import { State, StateTarget } from '$comps/app/types.appState.svelte'
	import { ContextKey, required } from '$utils/types'
	import { TokenAppDoActionConfirmType } from '$utils/types.token'
	import { getContext } from 'svelte'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'

	const FILENAME = '$routes/nav/NavAppMobile.svelte'
	const DEFAULT_APP_NAME = 'The App Factory'

	let { toggleMobileMenuHide }: { toggleMobileMenuHide: Function } = $props()
	let stateApp: State = required(getContext(ContextKey.stateApp), FILENAME, 'stateApp')

	let appName = stateApp?.user?.org?.appName || DEFAULT_APP_NAME

	const goHome = () => {
		stateApp.change({
			confirmType: TokenAppDoActionConfirmType.statusChanged,
			target: StateTarget.dashboard
		})
	}
</script>

<nav class="h-12 flex items-center bg-white gap-4 border-b p-2 mb-2">
	<Icon
		props={new IconProps({
			isNav: true,
			name: 'menu',
			onclick: toggleMobileMenuHide,
			size: 20,
			strokeWidth: 2
		})}
	/>

	<p class="text-black" onclick={goHome}>
		{appName}
	</p>
</nav>
