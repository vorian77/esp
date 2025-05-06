<script lang="ts">
	import { State } from '$comps/app/types.appState.svelte'
	import { FieldCustomActionLink } from '$comps/form/fieldCustom'
	import { ContextKey, DataManager, DataObj, type DataRecord, required } from '$utils/types'
	import { TokenAppDo, TokenAppStateTriggerAction } from '$utils/types.token'
	import { getContext } from 'svelte'

	const FILENAME = '/$comps/form/FormElCustomActionLink.svelte'

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)

	let dataObj: DataObj = $derived(dm.getDataObj(parms.dataObjId))
	let dataRecord = $derived(dm.getRecordsDisplayRow(parms.dataObjId, 0))
	let field = $derived(parms.field) as FieldCustomActionLink
	let prefix = $derived(field.prefix ? field.prefix + ' ' : '')

	async function action(): Promise<MethodResult> {
		sm.app.setTreeLevelIdxCurrent(dataObj.treeLevelIdx)
		return await sm.triggerAction(
			new TokenAppStateTriggerAction({
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

<div class="btn btn-action w-full text-sm" onclick={() => action()}>
	<p>{prefix}<span class="text-blue-500">{field.colDO.label}</span></p>
</div>
