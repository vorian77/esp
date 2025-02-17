<script lang="ts">
	import { ContextKey, DataManager, type DataRecord, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { State } from '$comps/app/types.appState.svelte'
	import { FieldCustomActionButton } from '$comps/form/fieldCustom'
	import { TokenAppDo, TokenAppStateTriggerAction } from '$utils/types.token'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/form/FormElCustomActionButton.svelte'

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)

	let dataObj: DataObj = $derived(dm.getDataObj(parms.dataObjId))
	let dataRecord = $derived(dm.getRecordsDisplayRow(parms.dataObjId, 0))
	let disabled = $derived(!dm.isStatusValidNode(parms.dataObjId))
	let field = $derived(parms.field) as FieldCustomActionButton

	async function action() {
		sm.app.setTreeLevelIdxCurrent(dataObj.treeLevelIdx)
		await sm.triggerAction(
			new TokenAppStateTriggerAction({
				actionAlertMsg: field.actionAlertMsg,
				codeAction: field.action.codeAction,
				data: {
					dataRecord: $state.snapshot(dataRecord),
					token: new TokenAppDo({
						actionType: field.action.codeAction.actionType,
						dataObj
					}),
					value: field.value
				},
				fCallback: dataObj.fCallbackUserAction
			})
		)
	}
</script>

<button
	class="w-full btn btn-action text-white"
	style:background-color={field.fieldColor.color}
	{disabled}
	onclick={() => action()}
>
	{field.colDO.label}
</button>
