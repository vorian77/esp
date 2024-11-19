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
		StateSurfaceEmbedShell
	} from '$comps/app/types.appState'
	import { TokenAppDo, TokenAppDoActionConfirmType } from '$utils/types.token'
	import { flip } from 'svelte/animate'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/dataObj/DataObjActions.svelte'

	const animationDurationMs = 500

	export let state: State
	export let dataObj: DataObj

	let actions: DataObjActionField[]
	let isEditing: boolean = false
	let marginTop = ''
	let padding = ''
	let objStatus: DataObjStatus

	$: {
		objStatus = state.objStatus
		load()
	}

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
				state.objStatus.changed() &&
				!dataObj.isListEmbed
		)
		marginTop = state.app.isMobileMode ? 'mt-6' : ''
		padding =
			dataObj.actionsField.filter((a) => a.isShow).length > 0 && !state.app.isMobileMode
				? 'ml-4'
				: ''
	}

	let isTriggeredEnable = function (action: DataObjActionField) {
		const tg = new DataObjActionFieldTriggerGroup()
		tg.addStatus(state, dataObj, action.codeActionFieldTriggerEnable, true)
		return tg.isTriggered()
	}
	let isTriggeredShow = function (action: DataObjActionField) {
		const tg = new DataObjActionFieldTriggerGroup()
		action.actionFieldShows.forEach((show) => {
			tg.addStatus(state, dataObj, show.codeTriggerShow, show.isRequired)
		})
		return tg.isTriggered()
	}

	async function onClick(action: DataObjActionField) {
		await action.trigger(state, dataObj)
	}
</script>

<div class="flex flex-col mt-4 {marginTop} {padding}">
	{#if isEditing}
		<div>
			<p class="text-blue-600 mb-4">Editing...</p>
		</div>
	{/if}
	{#each actions as action (action.name)}
		<div class="mb-4" animate:flip={{ duration: animationDurationMs }}>
			<button
				class="w-full btn text-white"
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
<!-- class="btn w-full text-white bg-{action.codeColor}" -->
