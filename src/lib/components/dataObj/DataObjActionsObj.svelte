<script lang="ts">
	import {
		ContextKey,
		DataManager,
		DataObj,
		DataObjMode,
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
	} from '$comps/dataObj/types.dataObjActionField'
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
	let dm: DataManager = required(getContext(ContextKey.dataManager), FILENAME, 'dataManager')
	let stateApp: State = required(getContext(ContextKey.stateApp), FILENAME, 'stateApp')

	let dataObj = $derived(dm.getDataObj(parms.dataObjId))
	let actions: DataObjActionField[] = $state([])
	let isEditing: boolean = $state(false)

	load()

	function load() {
		dataObj.actionsField.forEach((a) => {
			a.isDisabled = !isTriggeredEnable(a)
			a.isShow = isTriggeredShow(a)
		})
		actions = dataObj.actionsField.filter((a) => a.isShow)
		isEditing = dataObj.actionsField.some(
			(a: DataObjActionField) =>
				[StatePacketAction.doDetailSave, StatePacketAction.doListSelfSave].includes(
					a.codePacketAction
				) &&
				dm.isStatusChanged() &&
				!dataObj.fieldEmbed
		)
	}

	function isTriggeredEnable(action: DataObjActionField) {
		const tg = new DataObjActionFieldTriggerGroup()
		tg.addStatus(stateApp, dataObj, action.codeActionFieldTriggerEnable, true)
		return tg.isTriggered()
	}
	function isTriggeredShow(action: DataObjActionField) {
		const tg = new DataObjActionFieldTriggerGroup()
		action.actionFieldShows.forEach((show) => {
			tg.addStatus(stateApp, dataObj, show.codeTriggerShow, show.isRequired)
		})
		return tg.isTriggered()
	}

	const onClick = async (action: DataObjActionField) => {
		await action.trigger(stateApp, dataObj)
	}
</script>

<hr class="my-4 md:hidden" />

<div class="flex flex-row gap-2 justify-end md:flex-col md:justify-start md:px-3">
	{#if isEditing}
		<div>
			<p class="text-blue-600 mb-4">Editing...</p>
		</div>
	{/if}
	{#each actions as action (action.name)}
		<div class="">
			<button
				class="w-full btn btn-action text-sm text-white"
				style:background-color={action.fieldColor.color}
				disabled={action.isDisabled}
				onclick={onClick(action)}
			>
				{action.header}
			</button>
		</div>
	{/each}
</div>

<!-- <DataViewer header="stateType" data={state.tempStateType} /> -->
<!-- class="btn btn-action w-full text-white bg-{action.codeColor}" -->
