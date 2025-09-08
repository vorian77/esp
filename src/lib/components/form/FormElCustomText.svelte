<script lang="ts">
	import { ContextKey, DataManager, type DataRecord, elementAppend, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { FieldCustomText } from '$comps/form/fieldCustom'
	import DataViewer from '$utils/DataViewer.svelte'

	let { parms }: DataRecord = $props()
	let field = $derived(parms.field) as FieldCustomText
	let classTW = $derived.by(() => {
		let elements = ''
		elements = elementAppend(elements, field.align ? 'text-' + field.align : 'text-left')
		elements = elementAppend(elements, field.isBold ? ' font-bold' : ' font-normal')
		return elements
	})
</script>

<div class={classTW}>
	{field.colDO.label}
</div>
