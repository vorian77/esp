<script lang="ts">
	import { FieldProps } from '$comps/form/field'
	import { FieldCustomText } from '$comps/form/fieldCustom'
	import DataViewer from '$utils/DataViewer.svelte'

	export let fp: FieldProps

	$: field = fp.field as FieldCustomText
	$: classAlign = field.align ? 'text-' + field.align : 'text-left'
</script>

<div class={classAlign}>
	{field.colDO.label}
</div>
