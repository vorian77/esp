<script lang="ts">
	import {
		CodeActionType,
		ContextKey,
		DataManager,
		DataObj,
		DataObjAction,
		DataObjSaveMode,
		type DataRecord,
		required
	} from '$utils/types'
	import { getContext } from 'svelte'
	import { State, StatePacket, StateSurfaceEmbedShell } from '$comps/app/types.appState.svelte'
	import { TokenAppDo, TokenAppUserActionConfirmType } from '$utils/types.token'
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
		dataObjId
			? dataObj.userActions.some((doa: DataObjAction) => doa.action.isShow(sm, dataObj))
			: false
	)
	let isEditing = $derived(
		dataObjId
			? dataObj.userActions.some(
					(doa: DataObjAction) =>
						[CodeActionType.doDetailSave, CodeActionType.doListSelfSave].includes(
							doa.action.codeAction.actionType
						) &&
						dm.isStatusChanged() &&
						!dataObj.isFieldEmbed
				)
			: false
	)

	async function onClick(doa: DataObjAction) {
		await doa.action.trigger(sm, dataObj)
	}
</script>

<div class=" flex flex-col {isShowing ? 'sm:pl-3' : 'hidden'}">
	<div class="my-2 sm:hidden">
		<hr />
	</div>

	{#if dataObj}
		<div class="flex flex-row justify-end gap-3 sm:flex-col">
			{#if isEditing}
				<p class="text-blue-500 self-center sm:self-start">Editing...</p>
			{/if}

			{#each dataObj.userActions as doa (doa.action.name)}
				{@const isDisabled = doa.action.isDisabled(sm, dataObj)}
				{@const isShow = doa.action.isShow(sm, dataObj)}
				<button
					class="btn btn-action text-sm text-white {isShow ? '' : 'hidden'}"
					style:background-color={doa.fieldColor.color}
					disabled={isDisabled}
					onclick={async () => onClick(doa)}
				>
					{doa.action.header}
				</button>
			{/each}
		</div>
	{/if}
</div>
