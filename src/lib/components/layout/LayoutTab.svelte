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

	export let state: State
	export let component: string
	export let dataObj: DataObj
	export let dataObjData: DataObjData

	let currLevel: AppLevel | undefined

	let classContent = state.app.isMobileMode ? '-mt-4' : 'mt-4'

	$: currLevel = state.app.getCurrLevel()
	$: isHideChildTabs =
		dataObjData.rowsRetrieved.hasRecord() &&
		(dataObjData.rowsRetrieved.getDetailRowStatusIs(DataRecordStatus.preset) ||
			state.objStatus.changed() ||
			!state.objStatus.valid())

	async function onClick(index: number) {
		state.update({
			packet: new StatePacket({
				action: StatePacketAction.navTab,
				confirmType: TokenAppDoActionConfirmType.objectChanged,
				token: new TokenAppTab({ app: state.app, index })
			})
		})
	}

	const classItemCurrent =
		'inline-flex items-center rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900'
	const classItemNotCurrent =
		'inline-flex items-center rounded-md px-4 py-2 text-sm font-normal text-gray-900 hover:bg-gray-200 hover:text-gray-900'
</script>

<!-- <DataViewer header="isHideChildTabs" data={isHideChildTabs} /> -->

{#if currLevel}
	{#if currLevel.tabs.length > 1}
		<div class="p-2 bg-neutral-50 border-2 border-gray-300 rounded-md hidden md:block">
			{#each currLevel.tabs as tab, idx}
				{@const name = 'tab' + idx}
				{@const isCurrent = idx === currLevel.tabIdxCurrent}
				{@const hidden = isHideChildTabs && !isCurrent}
				{@const label = tab?.label || tab?.dataObj?.raw.header}
				{@const classItem = isCurrent ? classItemCurrent : classItemNotCurrent}

				<a href="#" {name} {hidden} class={classItem} on:click={() => onClick(idx)}>
					{label}
				</a>
			{/each}
		</div>
		<div class="md:hidden">
			Select a tab
			<div class="grid grid-cols-1">
				<select
					aria-label="Select a tab"
					class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
					name="select-tabs"
					id="select-tabs"
					on:change={(event) => onClick(Number(event.currentTarget.value))}
				>
					{#each currLevel.tabs as tab, idx}
						{@const label = tab?.label || tab?.dataObj?.raw.header}
						<option value={idx} selected={idx === currLevel?.tabIdxCurrent}>
							{label}
						</option>
					{/each}
				</select>
			</div>
		</div>
	{/if}

	{#if dataObj && dataObjData}
		<div class={classContent}>
			<LayoutContent bind:state {component} {dataObj} {dataObjData} on:formCancelled />
		</div>
	{/if}
{/if}
