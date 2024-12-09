<script lang="ts">
	import { AppLevel, AppLevelCrumb, AppLevelRowStatus } from '$comps/app/types.app'
	import type { State } from '$comps/app/types.appState'
	import { StatePacket, StatePacketAction } from '$comps/app/types.appState'
	import { TokenAppDoActionConfirmType } from '$utils/types.token'
	import type { DataObj, DataObjData } from '$utils/types'
	import NavCrumbs from '$comps/app/NavCrumbs.svelte'
	import NavRow from '$comps/app/NavRow.svelte'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import LayoutTab from '$comps/layout/LayoutTab.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/layout/LayoutApp.svelte'

	export let state: State
	export let component: string
	export let dataObj: DataObj
	export let dataObjData: DataObjData

	let currLevel: AppLevel | undefined
	let crumbsList: Array<AppLevelCrumb> = []
	let rowStatus: AppLevelRowStatus | undefined

	$: currLevel = state.app.getCurrLevel()
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

<div class="flex justify-between p-2 bg-neutral-50 border-2 border-gray-300 rounded-md">
	<div id="lead">
		<div class="grid items-end">
			<div class="flex items-center">
				<a href="#" class="mr-4" on:click={back}>
					<Icon
						props={new IconProps({
							name: 'ArrowLeft',
							clazz: 'mt-1.5',
							isNav: true,
							strokeWidth: 2
						})}
					/>
				</a>
				<div>
					<NavCrumbs {state} {crumbsList} />
				</div>
			</div>
		</div>
	</div>

	<div id="trail" class="flex items-center">
		<NavRow {state} {rowStatus} />
	</div>
</div>

{#if currLevel}
	<div class="mt-4">
		<LayoutTab bind:state {component} {dataObj} {dataObjData} on:formCancelled />
	</div>
{/if}
