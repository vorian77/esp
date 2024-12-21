<script lang="ts">
	import { ContextKey, DataManager, type DataRecord, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { FieldCustomHeader } from '$comps/form/fieldCustom'
	import DataViewer from '$utils/DataViewer.svelte'

	let { parms }: DataRecord = $props()

	let field = $derived(parms.field) as FieldCustomHeader
	let classMargin = $derived(field.isFirstVisible ? '' : field.isSubHeader ? '-mt-3' : 'mt-4 -mb-2')
	let classSize = $derived(field.isSubHeader ? 'h4' : field.size ? 'h' + field.size : 'h3')
	let classColor = $derived(field.isSubHeader ? 'text-zinc-400' : '')
	let classWeight = $derived(field.isSubHeader ? 'font-normal' : 'font-bold')
	let dynamicText = $derived(field.source && field.sourceKey ? ': ' + field.sourceKey : '')
</script>

<div class="{classMargin} {classSize} {classColor}">
	<p>
		{field.colDO.label}
		<span class={classWeight}>
			{dynamicText}
		</span>
	</p>
</div>
