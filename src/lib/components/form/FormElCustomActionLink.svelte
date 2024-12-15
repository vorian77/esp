<script lang="ts">
	import { ContextKey, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { FieldCustomActionLink } from '$comps/form/fieldCustom'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/form/FormElCustomActionLink.svelte'

	let { parms }: DataRecord = $props()
	let stateApp: State = required(getContext(ContextKey.stateApp), FILENAME, 'stateApp')
	let dm: DataManager = required(getContext(ContextKey.dataManager), FILENAME, 'dataManager')

	let dataRecord = $derived(dm.getDataRecord(parms.dataObjId, 0))
	let field = $derived(parms.field) as FieldCustomActionLink
	let prefix = $derived(field.prefix ? field.prefix + ' ' : '')

	const action = async () => {
		const enhancement = required(field.enhancement, FILENAME, 'field.enhancement')
		await enhancement(stateApp, field, DataRecord)
	}
</script>

<button class="btn btn-action w-full text-sm" onclick={action()}>
	<p>{prefix}<span class="text-blue-500">{field.colDO.label}</span></p>
</button>
