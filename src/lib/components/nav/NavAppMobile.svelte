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
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')

	let appName = sm?.user?.org?.appName || DEFAULT_APP_NAME

	const goHome = () => {
		sm.change({
			confirmType: TokenAppDoActionConfirmType.statusChanged,
			target: StateTarget.dashboard
		})
	}
</script>

<nav class="h-12 flex items-center bg-white p-3 gap-4 border-b">
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
