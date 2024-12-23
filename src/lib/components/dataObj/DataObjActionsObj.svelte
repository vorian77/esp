<script lang="ts">
	import {
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
	import {
		State,
		StatePacket,
		StatePacketAction,
		StateSurfaceEmbedShell
	} from '$comps/app/types.appState.svelte'
	import { TokenAppDo, TokenAppDoActionConfirmType } from '$utils/types.token'
	import { flip } from 'svelte/animate'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/dataObj/DataObjActions.svelte'

	let { parms }: DataRecord = $props()
	let stateApp: State = required(getContext(ContextKey.stateApp), FILENAME, 'stateApp')
	let dm: DataManager = required(getContext(ContextKey.dataManager), FILENAME, 'dataManager')
	let dataObj = $derived(dm.getDataObj(parms.dataObjId))

	let isShowing = $derived(dataObj.actionsField.some((a) => a.isShow(stateApp, dataObj)))

	let isEditing = $derived(
		dataObj.actionsField.some(
			(a: DataObjActionField) =>
				[StatePacketAction.doDetailSave, StatePacketAction.doListSelfSave].includes(
					a.codePacketAction
				) &&
				dm.isStatusChanged() &&
				!dataObj.fieldEmbed
		)
	)

	async function onClick(action: DataObjActionField) {
		await action.trigger(stateApp, dataObj)
	}
</script>

<!-- <DataViewer header="actions" data={dataObj.actionsField.map((a) => a.header)} /> -->

<hr class="my-4 sm:hidden" />

<div class="flex flex-row gap-3 justify-end sm:flex-col sm:justify-start {isShowing ? 'pl-4' : ''}">
	{#if isEditing}
		<p class="text-blue-500">Editing...</p>
	{/if}

	{#each dataObj?.actionsField as action (action.name)}
		{@const isDisabled = action.isDisabled(stateApp, dataObj)}
		{@const isShow = action.isShow(stateApp, dataObj)}

		<button
			class="w-full btn btn-action text-sm text-white {isShow ? '' : 'hidden'}"
			style:background-color={action.fieldColor.color}
			disabled={isDisabled}
			onclick={async () => onClick(action)}
		>
			{action.header}
		</button>
	{/each}
</div>
