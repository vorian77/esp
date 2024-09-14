<script lang="ts">
	import { AppLevel, AppLevelCrumb, AppLevelRowStatus } from '$comps/app/types.app'
	import type { State } from '$comps/app/types.appState'
	import { StatePacket, StatePacketAction } from '$comps/app/types.appState'
	import { TokenApp, TokenAppDoActionConfirmType } from '$utils/types.token'
	import type { DataObj, DataObjData } from '$utils/types'
	import { AppBar, AppShell } from '@skeletonlabs/skeleton'
	import NavCrumbs from '$comps/app/NavCrumbs.svelte'
	import NavRow from '$comps/app/NavRow.svelte'
	import Icon from '$comps/misc/Icon.svelte'
	import LayoutTab from '$comps/layout/LayoutTab.svelte'
	import DataViewer from '$utils/DataViewer.svelte'
	import action from '$enhance/actions/actionAuth'

	const FILENAME = '$comps/Surface/LayoutApp.svelte'

	export let state: State
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

<!-- <DataViewer header="objChanged" data={state?.objHasChanged} /> -->

<AppShell slotSidebarLeft="w-0 md:w-52 h-full">
	<svelte:fragment slot="header">
		{@const hidden = crumbsList.length < 2 ? 'hidden' : ''}
		<AppBar background="bg-neutral-200 {hidden}" padding="p-3">
			<svelte:fragment slot="lead">
				<div class="grid items-end">
					<div class="flex">
						<button class="mr-4" on:click={back}>
							<Icon class="mt-0.5" name={'back'} width="1.5rem" height="1.5rem" fill={'#3b79e1'} />
						</button>

						<div>
							<NavCrumbs {state} {crumbsList} />
						</div>
					</div>
				</div>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<NavRow {state} {rowStatus} />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	{#if currLevel}
		<div class="mt-4">
			<LayoutTab bind:state {dataObj} {dataObjData} on:formCancelled />
		</div>
	{/if}
</AppShell>
