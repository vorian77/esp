<script lang="ts">
	import { ContextKey, DataManager, DataObjCardinality, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { FieldElement } from '$comps/form/field.svelte'
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
	let fieldItems = $derived(
		field.linkItemsSource ? field.linkItemsSource.formatDataFieldColumnItem(fieldValue) : []
	)
	let fieldValue = $derived(dm.getFieldValue(parms.dataObjId, parms.row, parms.field))

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
		await dm.setFieldValue(parms.dataObjId, parms.row, parms.field, target.value)
	}

	async function onClick(event: Event) {
		if (field.linkItemsSource) field.linkItemsSource.retrieve(sm.user)
	}
</script>

<FormLabel {parms}>
	<select
		class={classProps}
		name={field.colDO.propName}
		id={fieldId}
		disabled={field.fieldAccess == FieldAccess.readonly}
		onchange={onChange}
		onclick={onClick}
	>
		<option value={null} class="">Select an option...</option>
		{#if fieldItems}
			{#each fieldItems as { id, display }, index (id)}
				<option value={id} selected={id === fieldValue}>
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
