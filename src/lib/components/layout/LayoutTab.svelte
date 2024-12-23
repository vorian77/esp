<script lang="ts">
	import { ContextKey, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { AppLevel, AppLevelRowStatus } from '$comps/app/types.app.svelte'
	import {
		State,
		StatePacket,
		StatePacketAction,
		StateTarget
	} from '$comps/app/types.appState.svelte'
	import { TokenAppDoActionConfirmType, TokenAppTab } from '$utils/types.token'
	import { DataRecordStatus } from '$utils/types'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'
	import { innerHeight } from 'svelte/reactivity/window'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/layout/LayoutTab.svelte'

	let { parms }: DataRecord = $props()
	let dm: DataManager = required(getContext(ContextKey.dataManager), FILENAME, 'dataManager')
	let stateApp: State = required(getContext(ContextKey.stateApp), FILENAME, 'stateApp')

	let currLevel: AppLevel = $derived(stateApp.app.getCurrLevel())
	let dataObj: DataObj = $derived(dm.getDataObj(parms.dataObjId))

	let elContent: HTMLDivElement
	let elContentTopY: number = $state()

	$effect(() => {
		elContentTopY = Math.ceil(elContent.getBoundingClientRect().top)
	})

	let isHideChildTabs = $derived(
		dataObj?.data.rowsRetrieved.hasRecord() &&
			(dataObj.data.rowsRetrieved.getDetailRowStatusIs(DataRecordStatus.preset) ||
				dm.isStatusChanged() ||
				!dm.isStatusValid())
	)

	function onClick(index: number) {
		stateApp.change({
			confirmType: TokenAppDoActionConfirmType.statusChanged,
			packet: new StatePacket({
				action: StatePacketAction.navTab,
				token: new TokenAppTab({ app: stateApp.app, index })
			}),
			target: StateTarget.feature
		})
	}

	const classItemCurrent =
		'inline-flex items-center rounded-md bg-gray-200 px-4 py-2 text-sm font-normal text-gray-900'
	const classItemNotCurrent =
		'inline-flex items-center rounded-md px-4 py-2 text-sm font-normal text-gray-900 hover:bg-gray-200'
</script>

<!-- <DataViewer header="isHideChildTabs" data={isHideChildTabs} /> -->

{#if currLevel && dataObj}
	<div
		id="layout-tab"
		class="h-full max-h-full flex flex-col border rounded-md p-4"
		bind:this={elContent}
		style={`max-height: ${innerHeight.current - elContentTopY - 30}px;`}
	>
		{#if currLevel.tabs.length > 1}
			<div class="p-3 bg-neutral-50 hidden sm:block rounded-md mb-4">
				{#each currLevel.tabs as tab, idx}
					{@const name = 'tab' + idx}
					{@const isCurrent = idx === currLevel.tabIdxCurrent}
					{@const hidden = isHideChildTabs && !isCurrent}
					{@const label = tab.label || dataObj.raw.header}
					{@const classItem = isCurrent ? classItemCurrent : classItemNotCurrent}

					<button {name} {hidden} class={classItem} onclick={() => onClick(idx)}>
						{label}
					</button>
				{/each}
			</div>

			<div class="sm:hidden flex items-center justify-between gap-4 px-2 mb-4">
				<div class="grow">
					<select
						aria-label="Select a tab"
						class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-sm text-nav outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2"
						name="select-tabs"
						id="select-tabs"
						onchange={(event) => onClick(Number(event.currentTarget.value))}
					>
						{#each currLevel.tabs as tab, idx}
							{@const label = tab.label || dataObj.raw.header}
							<option value={idx} selected={idx === currLevel.tabIdxCurrent}>
								{label}
							</option>
						{/each}
					</select>
				</div>
			</div>
		{/if}

		<LayoutContent {parms} />
	</div>
{/if}
