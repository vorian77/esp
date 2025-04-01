<script lang="ts">
	import {
		ContextKey,
		DataManager,
		DataObjCardinality,
		getArray,
		PropDataType,
		required
	} from '$utils/types'
	import { getContext } from 'svelte'
	import { FieldElement, FieldValueType } from '$comps/form/field.svelte'
	import { FieldSelect } from '$comps/form/fieldSelect'
	import { FieldAccess } from '$comps/form/field.svelte'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/form/FormElSelect.svelte'

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)

	let dataObj = $derived(dm.getDataObj(parms.dataObjId))
	let field = $derived(parms.field) as FieldSelect
	let fieldId = $derived('field-input-select-' + field.colDO.orderDefine)
	let fieldValue = $derived.by(() => {
		const value = dm.getFieldValue(parms.dataObjId, parms.row, parms.field, FieldValueType.data)
		return Array.isArray(value) ? value[0] : value
	})
	let dataItems = $derived(field.linkItems ? field.linkItems.getDataItemsAll(fieldValue) : [])

	let classProps = $derived(
		dataObj.raw.codeCardinality === DataObjCardinality.detail
			? `select text-sm rounded-lg ${field.getBackgroundColor(field.fieldAccess)}`
			: `select text-sm rounded-lg bg-white`
	)
	let classPropsLabel = $derived(
		dataObj.raw.codeCardinality === DataObjCardinality.detail ? 'mb-1' : 'mb-1 hidden'
	)

	async function onChange(event: Event) {
		const target = event.currentTarget as HTMLSelectElement
		let value = target.value
		if (field.colDO.colDB.isMultiSelect) value = value ? [value] : []
		await dm.setFieldValue(parms.dataObjId, parms.row, parms.field, value)
	}
</script>

<FormLabel {parms}>
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
<!-- <DataViewer header="dataItems" data={dataItems} /> -->

<style>
	select option {
		background: white;
		color: black;
	}
</style>
