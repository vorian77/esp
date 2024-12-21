<script lang="ts">
	import { ContextKey, DataManager, type DataRecord, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { FieldCustomText } from '$comps/form/fieldCustom'
	import DataViewer from '$utils/DataViewer.svelte'

	let { parms }: DataRecord = $props()

	let field = $derived(parms.field) as FieldCustomText
	let classAlign = $derived(field.align ? 'text-' + field.align : 'text-left')
</script>

<div class={classAlign}>
	{field.colDO.label}
</div>
