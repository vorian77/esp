<script lang="ts">
	import { State } from '$comps/app/types.state.svelte'
	import { FieldCustomActionLink, TokenAppDoCustom } from '$comps/form/fieldCustom'
	import {
		ContextKey,
		DataManager,
		DataObj,
		type DataRecord,
		required,
		strRequired
	} from '$utils/types'
	import { TokenApiQueryType, TokenAppStateTriggerAction } from '$utils/types.token'
	import { getContext } from 'svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/form/FormElCustomActionLink.svelte'

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)

	let dataObj: DataObj = $derived(dm.getDataObj(parms.dataObjId))
	let dataRecord = $derived(dm.getRecordsDisplayRow(parms.dataObjId, 0))
	let fieldCustom = $derived(parms.field) as FieldCustomActionLink
	let prefix = $derived(fieldCustom.prefix ? fieldCustom.prefix + ' ' : '')

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

<div class="btn btn-action w-full text-sm" onclick={() => action()}>
	<p>{prefix}<span class="text-blue-500">{fieldCustom.colDO.label}</span></p>
</div>
