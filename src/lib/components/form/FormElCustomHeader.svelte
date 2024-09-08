<script lang="ts">
	import { FieldProps } from '$comps/form/field'
	import { FieldCustomHeader } from '$comps/form/fieldCustom'
	import DataViewer from '$utils/DataViewer.svelte'

	export let fp: FieldProps

	$: field = fp.field as FieldCustomHeader
	$: classMargin = field.isFirstVisible ? '' : 'mt-4 -mb-2'
	$: classSize = field.size ? 'h' + field.size : 'h3'
	$: dynamicText = field.source && field.sourceKey ? ': ' + field.sourceKey : ''
</script>

<div class="{classMargin} {classSize}">
	<p>
		{field.colDO.label}
		<span class="font-semibold">
			{dynamicText}
		</span>
	</p>
</div>
