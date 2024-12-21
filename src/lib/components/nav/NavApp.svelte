<script lang="ts">
	import { ContextKey, required } from '$utils/types'
	import { getContext } from 'svelte'
	import {
		State,
		StatePacket,
		StatePacketAction,
		StateTarget
	} from '$comps/app/types.appState.svelte'
	import { TokenAppDoActionConfirmType } from '$utils/types.token'
	import { AppLevel, AppLevelCrumb, AppLevelRowStatus } from '$comps/app/types.app.svelte'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import NavCrumbs from '$comps/nav/NavCrumbs.svelte'
	import NavRow from '$comps/nav/NavRow.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/nav/NavApp.svelte'

	let stateApp: State = required(getContext(ContextKey.stateApp), FILENAME, 'stateApp')

	const back = () => {
		stateApp.change({
			confirmType: TokenAppDoActionConfirmType.statusChanged,
			packet: new StatePacket({
				action: StatePacketAction.navBack
			}),
			target: StateTarget.feature
		})
	}
</script>

<!-- <div id="layout-app" class="flex justify-between items-center p-2 mb-4 bg-neutral-50 rounded-md"> -->

<div id="layout-app" class="flex justify-between items-center border-b p-2 mb-4">
	<div class="flex items-center">
		<button class="mr-2 flex-none border-0 border-green-300" onclick={back}>
			<Icon
				props={new IconProps({
					name: 'ArrowLeft',
					clazz: 'mt-1',
					isNav: true,
					size: 20,
					strokeWidth: 2
				})}
			/>
		</button>

		<div class="flex-grow border-0 border-red-300">
			<NavCrumbs />
		</div>
	</div>

	<div class="flex-none">
		<NavRow />
	</div>
</div>
