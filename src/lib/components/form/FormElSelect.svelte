<script lang="ts">
	import { DataObjCardinality } from '$utils/types'
	import { FieldElement } from '$comps/form/field'
	import { FieldSelect } from '$comps/form/fieldSelect'
	import { FieldAccess } from '$comps/form/field'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	let { parms }: DataRecord = $props()

	let dataObj = $derived(fp.stateApp.dataObj)
	let field = $derived(fp.field) as FieldSelect
	let fieldId = $derived('field-input-select-' + field.colDO.orderDefine)
	let fieldValue = $derived(fp.fieldValue)
	let dataItems = $derived(
		field.linkItemsSource ? field.linkItemsSource.formatDataFieldColumnItem(fieldValue) : []
	)

	let classProps = $derived(
		dataObj.raw.codeCardinality === DataObjCardinality.detail
			? `select text-sm rounded-lg ${field.colorBackground}`
			: `select text-sm rounded-lg bg-white`
	)
	let classPropsLabel = $derived(
		dataObj.raw.codeCardinality === DataObjCardinality.detail ? 'mb-1' : 'mb-1 hidden'
	)

	function onChange(event: Event) {
		const target = event.currentTarget as HTMLSelectElement
		fp.stateApp.fSetVal(fp.row, fp.field, target.value)
	}
</script>

<FormLabel {fp}>
	<select
		class={classProps}
		name={field.colDO.propName}
		id={fieldId}
		disabled={field.fieldAccess == FieldAccess.readonly}
		onchange={onChange}
	>
		<option value={null} class="">Select an option...</option>
		{#if dataItems}
			{#each dataItems as { data, display }, index (data)}
				<option value={data} selected={data === fieldValue}>
					{display}
				</option>
			{/each}
		{/if}
	</select>
</FormLabel>

<!-- <DataViewer header="fieldValue" data={fieldValue} /> -->
<!-- <DataViewer header="items" data={field.items} /> -->

<style>
	select option {
		background: white;
		color: black;
	}
</style>
