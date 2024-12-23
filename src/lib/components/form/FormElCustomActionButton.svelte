<script lang="ts">
	import { ContextKey, DataManager, type DataRecord, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { State } from '$comps/app/types.appState.svelte'
	import { FieldCustomActionButton } from '$comps/form/fieldCustom'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/form/FormElCustomActionButton.svelte'

	let { parms }: DataRecord = $props()

	let dm: DataManager = required(getContext(ContextKey.dataManager), FILENAME, 'dataManager')
	let stateApp: State = required(getContext(ContextKey.stateApp), FILENAME, 'stateApp')

	let dashboardReset = getContext(ContextKey.dashboardReset)

	let dataRecord = $derived(dm.getRecordsDisplayRow(parms.dataObjId, 0))
	let disabled = $derived(!dm.isStatusValid())
	let field = $derived(parms.field) as FieldCustomActionButton

	async function action() {
		// if (dashboardReset) dashboardReset()
		const enhancement = required(field.enhancement, FILENAME, 'field.enhancement')
		await enhancement(stateApp, field, dataRecord)
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
