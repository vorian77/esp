<script lang="ts">
	import { State, StatePacket, StatePacketAction } from '$comps/app/types.appState'
	import { TokenAppDoActionConfirmType } from '$utils/types.token'
	import { AppLevel, AppLevelCrumb, AppLevelRowStatus } from '$comps/app/types.app'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import NavCrumbs from '$comps/nav/NavCrumbs.svelte'
	import NavRow from '$comps/nav/NavRow.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	export let state: State

	const FILENAME = '$comps/nav/NavApp.svelte'

	let crumbsList: Array<AppLevelCrumb> = []
	let rowStatus: AppLevelRowStatus | undefined

	$: crumbsList = state.app.getCrumbsList()
	$: rowStatus = state.app.getRowStatus()

	function back() {
		state.update({
			packet: new StatePacket({
				action: StatePacketAction.navBack,
				confirmType: TokenAppDoActionConfirmType.objectChanged
			})
		})
	}
</script>

<div
	id="layout-app"
	class="hidden md:flex justify-between items-center p-2 mb-4 bg-neutral-50 rounded-md"
>
	<div id="lead">
		<div class="grid items-end">
			<div class="flex items-center">
				<a href="#" class="mr-4" on:click={back}>
					<Icon
						props={new IconProps({
							name: 'ArrowLeft',
							clazz: '-mt-0.5',
							isNav: true,
							size: 20,
							strokeWidth: 2
						})}
					/>
				</a>
				<div class="hidden md:block">
					<NavCrumbs {state} {crumbsList} />
				</div>
			</div>
		</div>
	</div>

	<NavRow {state} {rowStatus} />
</div>
