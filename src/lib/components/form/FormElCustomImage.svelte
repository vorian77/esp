<script lang="ts">
	import { ContextKey, DataManager, type DataRecord, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { FieldCustomImage } from '$comps/form/fieldCustom'
	import DataViewer from '$utils/DataViewer.svelte'

	let { parms }: DataRecord = $props()

	let field = $derived(parms.field) as FieldCustomImage
	let classAlign = $derived(field.align ? 'text-' + field.align : 'text-left')
	let src = $derived(field.file?.url || '')
	let classJustify = $derived('justify-' + field.align)
</script>

<div class="flex {classJustify} items-center mt-0">
	<img class="w-{field.width}" {src} alt={field.alt} />
</div>
