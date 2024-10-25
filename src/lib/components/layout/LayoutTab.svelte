<script lang="ts">
	import { AppLevel } from '$comps/app/types.app'
	import { State } from '$comps/app/types.appState'
	import { StatePacket, StatePacketAction } from '$comps/app/types.appState'
	import { TokenAppDoActionConfirmType, TokenAppTab } from '$utils/types.token'
	import { DataObj, DataObjData } from '$utils/types'
	import { DataRecordStatus } from '$utils/types'
	import { TabGroup, Tab } from '@skeletonlabs/skeleton'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/layout/LayoutTab.svelte'
	const navColor = '#3b79e1'

	export let state: State
	export let component: string
	export let dataObj: DataObj
	export let dataObjData: DataObjData

	let isHideChildTabs = false
	let currLevel: AppLevel | undefined

	$: currLevel = state.app.getCurrLevel()
	$: isHideChildTabs =
		dataObjData.rowsRetrieved.hasRecord() &&
		(dataObjData.rowsRetrieved.getDetailStatusRecordIs(DataRecordStatus.preset) ||
			state.objStatus.changed() ||
			!state.objStatus.valid())

	async function onClickTab(event: any) {
		state.update({
			packet: new StatePacket({
				action: StatePacketAction.navTab,
				confirmType: TokenAppDoActionConfirmType.objectChanged,
				token: new TokenAppTab({
					app: state.app,
					index: parseInt(event.target.value)
				})
			})
		})
	}
</script>

<!-- <DataViewer header="LayoutTab.state.objStatus" data={state.objStatus} /> -->
<!-- <DataViewer header="isHideChildTabs" data={isHideChildTabs} /> -->

{#if currLevel}
	<TabGroup active="underline underline-offset-8 border-1">
		{#each currLevel.tabs as tab, idx}
			{@const name = 'tab' + idx}
			{@const hidden = isHideChildTabs && idx !== currLevel.tabIdxCurrent}
			<div {hidden}>
				<Tab
					bind:group={currLevel.tabSet}
					{name}
					value={idx}
					{hidden}
					on:click={onClickTab}
					class="text-base {idx === currLevel.tabSet ? 'text-blue-600' : 'text-black'}"
				>
					{tab.label}
				</Tab>
			</div>
		{/each}

		<svelte:fragment slot="panel">
			{#if dataObj && dataObjData}
				<div class="mt-4">
					<LayoutContent bind:state {component} {dataObj} {dataObjData} on:formCancelled />
				</div>
			{/if}
		</svelte:fragment>
	</TabGroup>
{/if}
