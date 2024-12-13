<script lang="ts">
	import {
		State,
		StatePacket,
		StatePacketAction,
		StateTarget
	} from '$comps/app/types.appState.svelte'
	import { TokenAppDoActionConfirmType } from '$utils/types.token'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import { NodeType } from '$utils/types'

	const FILENAME = '$routes/nav/NavBarMobile.svelte'
	const DEFAULT_APP_NAME = 'The App Factory'

	let {
		goHome,
		state,
		toggleNavBarDrawer
	}: { goHome: Function; state: State; toggleNavBarDrawer: Function } = $props()

	let appName = state?.user?.org?.appName

	const back = () => {
		state.change({
			confirmType: TokenAppDoActionConfirmType.objectChanged,
			packet: new StatePacket({
				action: StatePacketAction.navBack
			}),
			target: StateTarget.feature
		})
	}
</script>

<nav class="h-12 flex flex-row justify-between bg-white border-b p-3 mb-2">
	<div class={state?.nodeType === NodeType.home ? 'hidden' : ''}>
		<button class="mr-4" onclick={back}>
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

	<p class="mr-3 text-black" onclick={goHome}>
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
