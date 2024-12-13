<script lang="ts">
	import { AppLevel, AppLevelRowStatus } from '$comps/app/types.app'
	import {
		State,
		StatePacket,
		StatePacketAction,
		StateTarget
	} from '$comps/app/types.appState.svelte'
	import { TokenAppDoActionConfirmType, TokenAppTab } from '$utils/types.token'
	import { DataRecordStatus } from '$utils/types'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'
	import NavRow from '$comps/nav/NavRow.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/layout/LayoutTab.svelte'

	let { stateProps = $bindable() }: StateProps = $props()

	let currLevel = $state(stateProps.state.app.getCurrLevel()) as AppLevel
	let rowStatus = $state(stateProps.state.app.getRowStatus()) as AppLevelRowStatus

	let isHideChildTabs = $state(
		stateProps?.dataObjData.rowsRetrieved.hasRecord() &&
			(stateProps?.dataObjData.rowsRetrieved.getDetailRowStatusIs(DataRecordStatus.preset) ||
				stateProps.state.objStatus.changed() ||
				!stateProps.state.objStatus.valid())
	)

	async function onClick(index: number) {
		stateProps.change({
			confirmType: TokenAppDoActionConfirmType.objectChanged,
			packet: new StatePacket({
				action: StatePacketAction.navTab,
				token: new TokenAppTab({ app: state.app, index })
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

{#if currLevel}
	<div id="layout-tab" class="h-full max-h-full flex flex-col">
		{#if currLevel.tabs.length > 1}
			<div class="p-3 bg-neutral-50 hidden md:block rounded-md mb-4">
				{#each currLevel.tabs as tab, idx}
					{@const name = 'tab' + idx}
					{@const isCurrent = idx === currLevel.tabIdxCurrent}
					{@const hidden = isHideChildTabs && !isCurrent}
					{@const label = tab?.label || tab?.dataObj?.raw.header}
					{@const classItem = isCurrent ? classItemCurrent : classItemNotCurrent}

					<button {name} {hidden} class={classItem} onclick={() => onClick(idx)}>
						{label}
					</button>
				{/each}
			</div>

			<div class="md:hidden flex items-center justify-between gap-4 px-2 mb-4">
				<div class="grow">
					<select
						aria-label="Select a tab"
						class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-sm text-nav outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2"
						name="select-tabs"
						id="select-tabs"
						onchange={(event) => onClick(Number(event.currentTarget.value))}
					>
						{#each currLevel.tabs as tab, idx}
							{@const label = tab?.label || tab?.dataObj?.raw.header}
							<option value={idx} selected={idx === currLevel?.tabIdxCurrent}>
								{label}
							</option>
						{/each}
					</select>
				</div>
				<NavRow bind:stateProps {rowStatus} />
			</div>
		{/if}

		{#if stateProps.dataObj && stateProps.dataObjData}
			<LayoutContent bind:stateProps on:formCancelled />
		{/if}
	</div>
{/if}
