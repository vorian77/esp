<script lang="ts">
	import {
		CodeAction,
		ContextKey,
		DataManager,
		DataObj,
		DataObjSaveMode,
		type DataRecord,
		required
	} from '$utils/types'
	import { getContext } from 'svelte'
	import {
		DataObjActionField,
		DataObjActionFieldConfirm,
		DataObjActionFieldTriggerEnable,
		DataObjActionFieldTriggerGroup,
		DataObjActionFieldTriggerStatus,
		DataObjActionFieldShow
	} from '$comps/dataObj/types.dataObjActionField.svelte'
	import { State, StatePacket, StateSurfaceEmbedShell } from '$comps/app/types.appState.svelte'
	import { TokenAppDo, TokenAppDoActionConfirmType } from '$utils/types.token'
	import { flip } from 'svelte/animate'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/dataObj/DataObjActions.svelte'

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)

	let dataObjId = $derived(parms?.dataObjId)
	let dataObj = $derived(dataObjId ? dm.getDataObj(dataObjId) : undefined)
	let isShowing = $derived(
		dataObjId ? dataObj.actionsField.some((a) => a.isShow(sm, dataObj)) : false
	)
	let isEditing = $derived(
		dataObjId
			? dataObj.actionsField.some(
					(a: DataObjActionField) =>
						[CodeAction.doDetailSave, CodeAction.doListSelfSave].includes(a.codeAction) &&
						dm.isStatusChanged() &&
						!dataObj.isFieldEmbed
				)
			: false
	)

	async function onClick(action: DataObjActionField) {
		await action.trigger(sm, dataObj)
	}
</script>

<!-- <DataViewer header="actions" data={dataObj.actionsField.map((a) => a.header)} /> -->

<div class=" flex flex-col {isShowing ? 'sm:pl-3' : 'hidden'}">
	<div class="my-2 sm:hidden">
		<hr />
	</div>

	{#if dataObj}
		<div class="flex flex-row justify-end gap-3 sm:flex-col">
			{#if isEditing}
				<p class="text-blue-500 self-center sm:self-start">Editing...</p>
			{/if}

			{#each dataObj?.actionsField as action (action.name)}
				{@const isDisabled = action.isDisabled(sm, dataObj)}
				{@const isShow = action.isShow(sm, dataObj)}

				<button
					class="btn btn-action text-sm text-white {isShow ? '' : 'hidden'}"
					style:background-color={action.fieldColor.color}
					disabled={isDisabled}
					onclick={async () => onClick(action)}
				>
					{action.header}
				</button>
			{/each}
		</div>
	{/if}
</div>
