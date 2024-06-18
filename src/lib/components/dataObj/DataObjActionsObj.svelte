<script lang="ts">
	import {
		DataObj,
		DataObjActionField,
		DataObjActionFieldConfirm,
		DataObjActionFieldTriggerEnable,
		DataObjSaveMode,
		DataObjStatus
	} from '$utils/types'
	import { State, StateMode, StatePacket, StatePacketComponent } from '$comps/app/types.appState'
	import {
		TokenAppDo,
		TokenAppDoActionConfirmType,
		TokenAppDoActionFieldType
	} from '$utils/types.token'
	import { flip } from 'svelte/animate'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/dataObj/DataObjActions.svelte'

	const animationDurationMs = 500

	export let state: State
	export let dataObj: DataObj

	let actions: DataObjActionField[]
	let isEditing: boolean = false
	let padding = ''
	let objStatus: DataObjStatus = state.objStatus
	let modes: StateMode[]

	$: load()
	$: {
		objStatus = state.objStatus
		load()
	}
	$: {
		modes = state.modes
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
				[TokenAppDoActionFieldType.detailSave, TokenAppDoActionFieldType.listSelfSave].includes(
					a.codeActionFieldType
				) && state.objStatus.changed()
		)
		padding = dataObj.actionsField.length > 0 ? 'mx-4' : ''
	}

	let isTriggeredEnable = function (action: DataObjActionField) {
		const tg = new TriggeredGroup()
		tg.addStatus(action.codeActionFieldTriggerEnable, true)
		const isTriggered = tg.isTriggered()
		return isTriggered
	}
	let isTriggeredShow = function (action: DataObjActionField) {
		const tg = new TriggeredGroup()
		action.actionFieldShows.forEach((show) => {
			tg.addStatus(show.codeTriggerShow, show.isRequired)
		})
		return tg.isTriggered()
	}

	function getConfirm(confirms: DataObjActionFieldConfirm[]) {
		switch (confirms.length) {
			case 0:
				return { confirmType: TokenAppDoActionConfirmType.none, confirm: undefined }
			case 1:
				return { confirmType: confirms[0].codeConfirmType, confirm: confirms[0].confirm }
			default:
				for (let i = 0; i < confirms.length; i++) {
					const confirmAction = confirms[i]
					const tg = new TriggeredGroup()
					tg.addStatus(confirmAction.codeTriggerConfirmConditional, true)
					if (tg.isTriggered()) {
						const confirmType = confirmAction.codeConfirmType
						const confirm = confirmAction.confirm
						return { confirmType, confirm }
					}
				}
				error(500, {
					file: FILENAME,
					function: 'getConfirm',
					message: `No conditional confirm found for triggers: ${confirms.map((c) => c.codeTriggerConfirmConditional).join()}.`
				})
		}
	}

	async function onClick(action: DataObjActionField) {
		const { confirmType, confirm } = getConfirm(action.actionFieldConfirms)
		state.update({
			packet: new StatePacket({
				component: StatePacketComponent.dataObj,
				confirm,
				confirmType,
				token: new TokenAppDo({
					actionType: action.codeActionFieldType,
					dataObj,
					state
				})
			})
		})
	}
	export class TriggeredGroup {
		statuses: TriggeredStatus[] = []
		constructor() {}

		addStatus(trigger: DataObjActionFieldTriggerEnable, isRequired: boolean) {
			let isTriggered = false
			let rowCount: number

			switch (trigger) {
				case DataObjActionFieldTriggerEnable.always:
					isTriggered = true
					break
				case DataObjActionFieldTriggerEnable.listReorder:
					isTriggered =
						dataObj.raw.listReorderColumn !== null &&
						dataObj.raw.listReorderColumn !== undefined &&
						dataObj.raw.listReorderColumn.length > 0 &&
						!state.modeActive(StateMode.ReorderOn) &&
						dataObj.data.dataRows.length > 1
					break
				case DataObjActionFieldTriggerEnable.listReorderCancel:
					isTriggered = state.modeActive(StateMode.ReorderOn)
					break
				case DataObjActionFieldTriggerEnable.never:
					isTriggered = false
					break
				case DataObjActionFieldTriggerEnable.notObjectChanged:
					isTriggered = !state.objStatus.changed()
					break
				case DataObjActionFieldTriggerEnable.notReorder:
					isTriggered = !state.modeActive(StateMode.ReorderOn)
					break
				case DataObjActionFieldTriggerEnable.objectChanged:
					isTriggered = state.objStatus.changed()
					break
				case DataObjActionFieldTriggerEnable.objectValidToSave:
					isTriggered = state.objStatus.valid()
					break
				case DataObjActionFieldTriggerEnable.parentObjectSaved:
					isTriggered = state.modeActive(StateMode.ParentObjectSaved)
					break
				case DataObjActionFieldTriggerEnable.saveModeInsert:
					isTriggered = dataObj.saveMode === DataObjSaveMode.insert
					break
				case DataObjActionFieldTriggerEnable.saveModeUpdate:
					isTriggered = dataObj.saveMode === DataObjSaveMode.update
					break
				default:
					error(500, {
						file: FILENAME,
						function: 'TriggeredGroup.addStatus',
						message: `No case definded for trigger: ${trigger}.`
					})
			}
			this.statuses.push(new TriggeredStatus(trigger, isTriggered, isRequired))
		}
		isTriggered() {
			const someRequiredNotTriggered = this.statuses.some((s) => s.isRequired && !s.isTriggered)
			const notRequiredCount = this.statuses.filter((s) => !s.isRequired).length
			const optionalIsTriggered =
				this.statuses.filter((s) => !s.isRequired).length === 0 ||
				this.statuses.some((s) => !s.isRequired && s.isTriggered)
			return !someRequiredNotTriggered && optionalIsTriggered
		}
	}
	class TriggeredStatus {
		isTriggered: boolean
		isRequired: boolean
		trigger: DataObjActionFieldTriggerEnable
		constructor(
			trigger: DataObjActionFieldTriggerEnable,
			isTriggered: boolean,
			isRequired: boolean
		) {
			this.isTriggered = isTriggered
			this.isRequired = isRequired
			this.trigger = trigger
		}
	}
</script>

<div class="flex flex-col {padding} -mr-0">
	{#if isEditing}
		<div>
			<p class="text-lg text-blue-600 mb-4">Editing...</p>
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
<!-- <DataViewer header="modes" data={state.modes} /> -->
<!-- class="btn w-full text-white bg-{action.codeColor}" -->
