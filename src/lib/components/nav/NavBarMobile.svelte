<script lang="ts">
	import { State, StatePacket, StatePacketAction } from '$comps/app/types.appState'
	import { TokenAppDoActionConfirmType } from '$utils/types.token'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import { NodeType } from '$utils/types'

	const FILENAME = '$routes/nav/NavBarMobile.svelte'
	const DEFAULT_APP_NAME = 'The App Factory'

	export let state: State
	export let goHome: Function
	export let toggleNavBarDrawer: Function

	let appName = ''

	$: if (state) appName = state?.user?.org?.appName

	function back() {
		state.update({
			packet: new StatePacket({
				action: StatePacketAction.navBack,
				confirmType: TokenAppDoActionConfirmType.objectChanged
			})
		})
	}
</script>

<nav class="h-12 flex flex-row justify-between bg-white border-b p-3 mb-2">
	<div class={state?.nodeType === NodeType.home ? 'hidden' : ''}>
		<button class="mr-4" on:click={back}>
			<Icon
				props={new IconProps({
					name: 'ArrowLeft',
					clazz: 'mt-0.5',
					isNav: true,
					size: 20,
					strokeWidth: 2
				})}
			/>
		</button>
	</div>

	<p class="mr-3 text-black" on:click={goHome}>
		{appName ? appName : DEFAULT_APP_NAME}
	</p>

	<div class="flex">
		<Icon
			props={new IconProps({
				isNav: true,
				name: 'menu',
				onClick: toggleNavBarDrawer,
				size: 20,
				strokeWidth: 2
			})}
		/>
	</div>
</nav>
