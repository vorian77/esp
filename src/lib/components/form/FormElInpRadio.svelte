<script lang="ts">
	import { ContextKey, DataManager, DataObj, DataObjCardinality, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { FieldRadio } from '$comps/form/fieldRadio'
	import { FieldAccess, FieldAlignment } from '$comps/form/field.svelte'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElInpRadio.svelte'

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)
	let dataObj: DataObj = $derived(dm.getDataObj(parms.dataObjId))

	let field = $derived(parms.field) as FieldRadio
	let fieldValue = $derived(dm.getFieldValue(parms.dataObjId, parms.row, field))
	let dataItems = $derived(field.linkItems ? field.linkItems.getDataItemsAll(fieldValue) : [])

	let classPropsLabel = $derived(
		dataObj.raw.codeCardinality === DataObjCardinality.detail ? '' : 'hidden'
	)
	let classFormat = $derived(field.isDisplayBlock ? 'block mb-2' : 'inline mr-7')
	let classFieldSet = $derived(
		dataObj.raw.codeCardinality === DataObjCardinality.list
			? 'fieldsetList'
			: field.fieldAccess === FieldAccess.required
				? 'fieldsetDetailRequired'
				: 'fieldsetDetailOptional'
	)
	let classAlignment = $derived(
		field.fieldAlignment === FieldAlignment.left
			? ' text-left'
			: field.fieldAlignment === FieldAlignment.center
				? ' text-center'
				: field.fieldAlignment === FieldAlignment.justify
					? ' text-justify'
					: field.fieldAlignment === FieldAlignment.right
						? ' text-right'
						: ' text-left'
	)

	async function onClick(event: Event) {
		const target = event.currentTarget as HTMLInputElement
		let value = target.value
		if (field.colDO.colDB.isMultiSelect) value = value ? [value] : []
		await dm.setFieldValueAsync(parms.dataObjId, parms.row, parms.field, value)
	}
</script>

<FormLabel {parms} />

<fieldset id="input-radio-row-{parms.row}" class={classFieldSet}>
	<div class="mt-3 {classAlignment}">
		{#if dataItems}
			{#each dataItems as { data, display }, index (data)}
				<div class="text-sm {classFormat} {index === 0 ? 'mt-4' : ''}">
					<input
						type="radio"
						name={field.getValueKey() + '-' + parms.row}
						value={data}
						checked={fieldValue?.data === data}
						onclick={onClick}
					/>
					{display}
				</div>
			{/each}
		{/if}
	</div>
</fieldset>

<!-- <DataViewer header="fieldValue" data={fieldValue} /> -->
<!-- <DataViewer header="dataItems" data={dataItems} /> -->
