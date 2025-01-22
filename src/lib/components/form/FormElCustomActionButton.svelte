<script lang="ts">
	import { ContextKey, DataManager, type DataRecord, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { State } from '$comps/app/types.appState.svelte'
	import { FieldCustomActionButton } from '$comps/form/fieldCustom'
	import { TokenAppStateTriggerAction } from '$utils/types.token'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/form/FormElCustomActionButton.svelte'

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)

	let dashboardReset = getContext(ContextKey.dashboardRefresh)

	let dataRecord = $derived(dm.getRecordsDisplayRow(parms.dataObjId, 0))
	let disabled = $derived(!dm.isStatusValidNode(parms.dataObjId))
	let field = $derived(parms.field) as FieldCustomActionButton

	async function action() {
		await sm.triggerAction(
			new TokenAppStateTriggerAction({
				codeAction: field.codeAction,
				dataRecord: $state.snapshot(dataRecord),
				value: field.value
			})
		)
	}
</script>

<button
	class="w-full btn btn-action text-white"
	style:background-color={field.colDO.fieldColor.color}
	{disabled}
	onclick={() => action()}
>
	{field.colDO.label}
</button>
