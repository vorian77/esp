<script lang="ts">
	import { CodeAction, CodeActionClass, CodeActionType, ContextKey, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { AppLevel, AppLevelRowStatus } from '$comps/app/types.app.svelte'
	import { State, StateTriggerToken } from '$comps/app/types.appState.svelte'
	import {
		TokenAppTab,
		TokenAppStateTriggerAction,
		TokenAppUserActionConfirmType
	} from '$utils/types.token'
	import { DataRecordStatus } from '$utils/types'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/layout/LayoutTab.svelte'

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)

	let currLevel: AppLevel = $derived(sm.app.getCurrLevel())
	let dataObj: DataObj = $derived(dm.getDataObj(parms.dataObjId))

	let isHideChildTabs = $derived(
		dataObj?.data.rowsRetrieved.hasRecord() &&
			(dataObj.data.rowsRetrieved.getDetailRowStatusIs(DataRecordStatus.preset) ||
				dm.isStatusChanged() ||
				!dm.isStatusValid())
	)

	async function onClick(index: number): Promise<MethodResult> {
		return await sm.triggerAction(
			new TokenAppStateTriggerAction({
				codeAction: CodeAction.init(
					CodeActionClass.ct_sys_code_action_class_nav,
					CodeActionType.navTab
				),
				codeConfirmType: TokenAppUserActionConfirmType.statusChanged,
				data: { token: new TokenAppTab({ app: sm.app, index }) }
			})
		)
	}

	const classItemCurrent =
		'inline-flex items-center rounded-md bg-gray-300 px-4 py-2 text-sm font-normal text-gray-900'
	const classItemNotCurrent =
		'inline-flex items-center rounded-md px-4 py-2 text-sm font-normal text-gray-900 hover:bg-gray-300'
</script>

{#if currLevel}
	<div id="layout-tab" class="h-full flex flex-col">
		{#if currLevel.tabs.length > 1}
			<div class="p-3 sm:ml-1 mr-1 mt-1 bg-neutral-100 rounded-md">
				<div class="sm:hidden flex items-center justify-between gap-1">
					<span class="text-base text-nav">Tab</span>
					<select
						aria-label="Select a tab"
						class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-sm text-nav outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2"
						name="select-tabs"
						id="select-tabs"
						onchange={(event) => onClick(Number(event.currentTarget.value))}
					>
						{#each currLevel.tabs as tab, idx}
							{@const label = tab.node.label}
							{#if !tab.isVirtual}
								<option value={idx} selected={idx === currLevel.tabIdxCurrent}>
									{label}
								</option>
							{/if}
						{/each}
					</select>
				</div>

				<div class="hidden sm:block rounded-md">
					{#each currLevel.tabs as tab, idx}
						{@const name = 'tab' + idx}
						{@const isCurrent = idx === currLevel.tabIdxCurrent}
						{@const hidden = isHideChildTabs && !isCurrent}
						{@const label = tab.node.label}
						{@const classItem = isCurrent ? classItemCurrent : classItemNotCurrent}

						{#if !tab.isVirtual}
							<button {name} {hidden} class={classItem} onclick={() => onClick(idx)}>
								{label}
							</button>
						{/if}
					{/each}
				</div>
			</div>
		{/if}

		<LayoutContent {parms} />
	</div>
{/if}
