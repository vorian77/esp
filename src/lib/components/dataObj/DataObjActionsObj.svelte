<script lang="ts">
	import { DataObj, DataObjMode, DataObjSaveMode, DataObjStatus } from '$utils/types'
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
		StateProps,
		StateSurfaceEmbedShell
	} from '$comps/app/types.appState.svelte'
	import { TokenAppDo, TokenAppDoActionConfirmType } from '$utils/types.token'
	import { flip } from 'svelte/animate'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/dataObj/DataObjActions.svelte'

	let { stateProps = $bindable() }: StateProps = $props()

	let actions: DataObjActionField[]
	let isEditing: boolean = false

	let dataObj = $state(stateProps.dataObj)

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
				stateProps.state.objStatus.changed() &&
				!dataObj.fieldEmbed
		)
	}

	function isTriggeredEnable(action: DataObjActionField) {
		const tg = new DataObjActionFieldTriggerGroup()
		tg.addStatus(stateProps.state, dataObj, action.codeActionFieldTriggerEnable, true)
		return tg.isTriggered()
	}
	function isTriggeredShow(action: DataObjActionField) {
		const tg = new DataObjActionFieldTriggerGroup()
		action.actionFieldShows.forEach((show) => {
			tg.addStatus(stateProps.state, dataObj, show.codeTriggerShow, show.isRequired)
		})
		return tg.isTriggered()
	}
	async function onClick(action: DataObjActionField) {
		await action.trigger(stateProps.state, dataObj)
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
				on:click={() => onClick(action)}
			>
				{action.header}
			</button>
		</div>
	{/each}
</div>

<!-- <DataViewer header="stateType" data={state.tempStateType} /> -->
<!-- class="btn btn-action w-full text-white bg-{action.codeColor}" -->
