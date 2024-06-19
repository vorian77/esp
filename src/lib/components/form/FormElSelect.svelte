<script lang="ts">
	import { DataObjCardinality } from '$utils/types'
	import { FieldProps } from '$comps/form/field'
	import { FieldSelect } from '$comps/form/fieldSelect'
	import { FieldAccess } from '$comps/form/field'
	import DataViewer from '$utils/DataViewer.svelte'

	export let fp: FieldProps

	$: dataObj = fp.dataObj
	$: field = fp.field as FieldSelect
	$: fieldId = 'field' + field.index
	$: fieldValue = fp.fieldValue
	$: setFieldVal = fp.setFieldVal

	$: classProps =
		dataObj.raw.codeCardinality === DataObjCardinality.detail
			? `select rounded-lg ${field.colorBackground}`
			: `select rounded-lg bg-white`
	$: classPropsLabel =
		dataObj.raw.codeCardinality === DataObjCardinality.detail ? 'mb-1' : 'mb-1 hidden'

	$: if (
		field?.colDO.items?.length === 1 &&
		!fieldValue &&
		field.colDO.fieldAccess === FieldAccess.required
	) {
		setFieldVal(field.colDO.propName, field.colDO.items[0].data)
	}

	function onChange(event: Event) {
		const target = event.currentTarget as HTMLSelectElement
		setFieldVal(field.colDO.propName, target.value)
	}
</script>

<label for={fieldId} class="label">
	<span class={classPropsLabel}>{field.colDO.label}</span>
	<select
		class={classProps}
		name={field.colDO.propName}
		id={fieldId}
		disabled={field.colDO.fieldAccess == FieldAccess.readonly}
		on:change={onChange}
	>
		<option value={null}>Select an option...</option>
		{#if field.colDO.items}
			{#each field.colDO.items as { data: id, display: label }, index (id)}
				<option value={id} selected={id === fieldValue}>
					{label}
				</option>
			{/each}
		{/if}
	</select>
</label>

<!-- <DataViewer header="value" data={fieldValue} /> -->
<!-- <DataViewer header="items" data={field.items} /> -->

<style>
	select option {
		background: white;
		color: black;
	}
</style>
