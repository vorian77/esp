<script lang="ts">
	import { DataObjCardinality } from '$utils/types'
	import { FieldElement, FieldProps } from '$comps/form/field'
	import { FieldSelect } from '$comps/form/fieldSelect'
	import { FieldAccess } from '$comps/form/field'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	export let fp: FieldProps

	$: dataObj = fp.dataObj
	$: field = fp.field as FieldSelect
	$: fieldId = 'field' + field.colDO.orderDefine
	$: fieldValue = fp.fieldValue
	$: setFieldVal = fp.setFieldVal

	$: classProps =
		dataObj.raw.codeCardinality === DataObjCardinality.detail
			? `select text-sm rounded-lg ${field.colorBackground}`
			: `select text-sm rounded-lg bg-white`
	$: classPropsLabel =
		dataObj.raw.codeCardinality === DataObjCardinality.detail ? 'mb-1' : 'mb-1 hidden'

	$: if (
		field?.colDO.items?.length === 1 &&
		!fieldValue &&
		field.fieldAccess === FieldAccess.required
	) {
		setFieldVal(field, field.colDO.items[0].data)
	}

	function onChange(event: Event) {
		const target = event.currentTarget as HTMLSelectElement
		setFieldVal(field, target.value)
	}
</script>

<FormLabel {fp}>
	<select
		class={classProps}
		name={field.colDO.propName}
		id={fieldId}
		disabled={field.fieldAccess == FieldAccess.readonly}
		on:change={onChange}
	>
		<option value={null} class="">Select an option...</option>
		{#if field.colDO.items}
			{#each field.colDO.items as { data: id, display: label }, index (id)}
				<option value={id} selected={id === fieldValue}>
					{label}
				</option>
			{/each}
		{/if}
	</select>
</FormLabel>

<!-- <DataViewer header="value" data={fieldValue} /> -->
<!-- <DataViewer header="items" data={field.items} /> -->

<style>
	select option {
		background: white;
		color: black;
	}
</style>
