<script lang="ts">
	import { CodeActionType, ContextKey, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { State, StatePacket, StateTarget } from '$comps/app/types.appState.svelte'
	import { TokenAppDoActionConfirmType } from '$utils/types.token'
	import { AppLevel, AppLevelCrumb, AppLevelRowStatus } from '$comps/app/types.app.svelte'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import NavCrumbs from '$comps/nav/NavCrumbs.svelte'
	import NavRow from '$comps/nav/NavRow.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/nav/NavApp.svelte'

	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')

	const back = () => {
		sm.change({
			confirmType: TokenAppDoActionConfirmType.statusChanged,
			packet: new StatePacket({
				actionType: CodeActionType.navBack
			}),
			target: StateTarget.feature
		})
	}
</script>

<div id="layout-app" class="flex justify-between items-center p-3 border-b">
	<div class="flex items-center">
		<button class="mr-2 flex-none" onclick={back}>
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

		<div class="flex-grow">
			<NavCrumbs />
		</div>
	</div>

	<div class="flex-none">
		<NavRow />
	</div>
</div>
