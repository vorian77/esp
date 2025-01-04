<script lang="ts">
	import { ContextKey, DataManager, type DataRecord, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { FieldCustomActionLink } from '$comps/form/fieldCustom'
	import { goto } from '$app/navigation'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/form/FormElCustomActionLink.svelte'

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)

	let dataRecord = $derived(dm.getRecordsDisplayRow(parms.dataObjId, 0))
	let field = $derived(parms.field) as FieldCustomActionLink
	let prefix = $derived(field.prefix ? field.prefix + ' ' : '')

	async function action() {
		alert('customLink')
		goto('/')
		// const enhancement = required(field.enhancement, FILENAME, 'field.enhancement')
		// await enhancement(sm, field, dataRecord)
	}
</script>

<!-- <a href="/" class="btn btn-action w-full text-sm">
	<p>{prefix}<span class="text-blue-500">{field.colDO.label}</span></p>
</a>
 -->

<div class="btn btn-action w-full text-sm" onclick={() => goto('/')}>
	<p>{prefix}<span class="text-blue-500">{field.colDO.label}</span></p>
</div>
