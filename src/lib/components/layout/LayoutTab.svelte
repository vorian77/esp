<script lang="ts">
	import { AppLevel, AppLevelCrumb, AppLevelRowStatus } from '$comps/app/types.app'
	import type { State } from '$comps/app/types.appState'
	import { StatePacket, StatePacketComponent } from '$comps/app/types.appState'
	import { TokenAppBack, TokenAppDoActionConfirmType, TokenAppTab } from '$utils/types.token'
	import type { DataObj, DataObjData } from '$utils/types'
	import { DataRecordStatus } from '$utils/types'
	import { AppBar, AppShell } from '@skeletonlabs/skeleton'
	import { TabGroup, Tab } from '@skeletonlabs/skeleton'
	import NavCrumbs from '$comps/app/NavCrumbs.svelte'
	import NavRow from '$comps/app/NavRow.svelte'
	import Icon from '$comps/misc/Icon.svelte'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/Surface/LayoutTab.svelte'

	export let state: State
	export let dataObj: DataObj
	export let dataObjData: DataObjData

	let currLevel: AppLevel | undefined
	let crumbsList: Array<AppLevelCrumb> = []
	let rowStatus: AppLevelRowStatus | undefined
	let isHideChildTabs = false

	$: currLevel = state.app.getCurrLevel()
	$: crumbsList = state.app.getCrumbsList()
	$: rowStatus = state.app.getRowStatus()
	$: isHideChildTabs =
		dataObjData.hasRecord() &&
		(dataObjData.getDetailStatusRecordIs(DataRecordStatus.preset) ||
			state.objStatus.changed() ||
			state.objStatus.changedEmbedded() ||
			!state.objStatus.valid())

	async function onClickTab(event: any) {
		state.update({
			packet: new StatePacket({
				component: StatePacketComponent.navTab,
				confirmType: TokenAppDoActionConfirmType.objectChanged,
				token: new TokenAppTab(parseInt(event.target.value))
			})
		})
	}

	function back() {
		state.update({
			packet: new StatePacket({
				component: StatePacketComponent.navBack,
				confirmType: TokenAppDoActionConfirmType.objectChanged,
				token: new TokenAppBack()
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
			<TabGroup>
				{#each currLevel.tabs as tab, idx}
					{@const name = 'tab' + idx}
					{@const hidden = isHideChildTabs && idx > 0}
					<div {hidden}>
						<Tab bind:group={currLevel.tabSet} {name} value={idx} {hidden} on:click={onClickTab}>
							{tab.label}
						</Tab>
					</div>
				{/each}

				<svelte:fragment slot="panel">
					{#if dataObj && dataObjData}
						<div class="mt-4">
							<LayoutContent bind:state {dataObj} {dataObjData} on:formCancelled />
						</div>
					{/if}
				</svelte:fragment>
			</TabGroup>
		</div>
	{/if}
</AppShell>
