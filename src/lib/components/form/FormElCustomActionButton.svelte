<script lang="ts">
	import { ContextKey, DataManager, type DataRecord, required } from '$utils/types'
	import { State } from '$comps/app/types.appState.svelte'
	import { FieldCustomActionButton } from '$comps/form/fieldCustom'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/form/FormElCustomActionButton.svelte'

	let { parms }: DataRecord = $props()

	let dm: DataManager = required(getContext(ContextKey.dataManager), 'FormElInput', 'dataManager')
	let stateApp: State = required(getContext(ContextKey.stateApp), FILENAME, 'stateApp')

	let dataRecord = $derived(dm.getDataRecord(parms.dataObjId, 0))
	let disabled = $derived(!(dm.isStatusChanged() && dm.isStatusValid()))
	let field: FieldCustomActionButton = $derived(parms.field)

	async function action() {
		const enhancement = required(field.enhancement, FILENAME, 'field.enhancement')
		await enhancement(stateApp, field, DataRecord)
	}
</script>

<button
	class="w-full btn btn-action text-white"
	style:background-color={field.colDO.fieldColor.color}
	{disabled}
	onclick={action()}
>
	{field.colDO.label}
</button>
