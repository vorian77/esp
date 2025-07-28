<script lang="ts">
	import { ContextKey, DataManager, type DataRecord, required, strRequired } from '$utils/types'
	import { getContext } from 'svelte'
	import { State } from '$comps/app/types.state.svelte'
	import { FieldCustomActionButton } from '$comps/form/fieldCustom'
	import {
		TokenApiQueryType,
		TokenAppDoCustom,
		TokenAppStateTriggerAction
	} from '$utils/types.token'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/form/FormElCustomActionButton.svelte'

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)

	let dataObj: DataObj = $derived(dm.getDataObj(parms.dataObjId))
	let dataRecord = $derived(dm.getRecordsDisplayRow(parms.dataObjId, 0))
	let fieldCustom = $derived(parms.field) as FieldCustomActionButton
	let disabled = $derived(!dm.isStatusValidNode(parms.dataObjId))

	async function action(): Promise<MethodResult> {
		sm.app.setTreeIdxCurrent(dataObj.treeLevelIdx)
		return await sm.triggerAction(
			new TokenAppStateTriggerAction({
				codeAction: fieldCustom.action.codeAction,
				data: {
					dataRecord: $state.snapshot(dataRecord),
					token: new TokenAppDoCustom({ fieldCustom })
				}
			})
		)
	}
</script>

<button
	class="w-full btn btn-action text-white"
	style:background-color={fieldCustom.fieldColor.color}
	{disabled}
	onclick={() => action()}
>
	{fieldCustom.colDO.label}
</button>
