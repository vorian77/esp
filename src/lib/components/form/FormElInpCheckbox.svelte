<script lang="ts">
	import { FieldAccess } from '$comps/form/field.svelte'
	import { FieldCheckbox } from '$comps/form/fieldCheckbox'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import { ContextKey, DataManager, DataObj, DataObjCardinality, required } from '$utils/types'
	import { getContext } from 'svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElInpCheckbox.svelte'

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)

	let dataObj: DataObj = $derived(dm.getDataObj(parms.dataObjId))
	let field = $derived(parms.field) as FieldCheckbox

	let fieldValue = $derived(dm.getFieldValue(parms.dataObjId, parms.row, field))
	let fieldValueData = $derived(
		field.colDO.colDB.isMultiSelect ? fieldValue.map((fv) => fv.data) : fieldValue?.data
	)
	let dataItems = $derived(field.linkItems ? field.linkItems.getDataItemsAll(fieldValue) : [])

	let classFieldSet = $derived(
		dataObj.raw.codeCardinality === DataObjCardinality.list
			? 'fieldsetList'
			: field.fieldAccess === FieldAccess.required
				? 'fieldsetDetailRequired'
				: 'fieldsetDetailOptional'
	)

	async function onInput(event: Event) {
		let value = event.target.value
		const idx = dataItems.findIndex((i) => i.data === value)

		if (field.colDO.colDB.isMultiSelect) {
			if (idx >= 0) {
				let newValues: string[] = []
				dataItems[idx].selected = !dataItems[idx].selected
				dataItems.forEach((i) => {
					if (i.selected) {
						newValues.push(i.data)
					}
				})
				await dm.setFieldValueAsync(parms.dataObjId, parms.row, parms.field, newValues)
			}
		} else {
			const currentSelected = dataItems[idx].selected
			value = currentSelected ? null : value
			await dm.setFieldValueAsync(parms.dataObjId, parms.row, parms.field, value)
		}
	}
</script>

<!-- <DataViewer header="dataItems" data={dataItems} /> -->
<!-- <DataViewer header="fieldValueData" data={fieldValueData} /> -->

<FormLabel {parms} />
<fieldset class="text-sm space-y-2 {classFieldSet}">
	{#each dataItems as { data, display }, i (data)}
		<label class="flex gap-1.5 {i === 0 ? 'mt-3' : ''}">
			<input
				type="checkbox"
				bind:group={fieldValueData}
				class="rounded-sm mt-0.5"
				name={field.getValueKey()}
				oninput={onInput}
				value={data}
			/>
			{display}
		</label>
	{/each}
</fieldset>
