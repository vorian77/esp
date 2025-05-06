<script lang="ts">
	import { FieldAccess, FieldValueType } from '$comps/form/field.svelte'
	import { FieldCheckbox } from '$comps/form/fieldCheckbox'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import { ContextKey, DataManager, DataObj, DataObjCardinality, required } from '$utils/types'
	import { getContext } from 'svelte'

	const FILENAME = '$comps/form/FormElInpCheckbox.svelte'

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)

	let dataObj: DataObj = $derived(dm.getDataObj(parms.dataObjId))
	let field = $derived(parms.field) as FieldCheckbox
	let fieldValue = $state(
		dm.getFieldValue(parms.dataObjId, parms.row, parms.field, FieldValueType.data)
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
		const value = event.target.value

		if (field.colDO.colDB.isMultiSelect) {
			const idx = dataItems.findIndex((i) => i.data === value)
			if (idx >= 0) {
				let newValues: string[] = []
				dataItems[idx].selected = !dataItems[idx].selected
				dataItems.forEach((i) => {
					if (i.selected) newValues.push(i.data)
				})
				await dm.setFieldValue(parms.dataObjId, parms.row, parms.field, newValues)
			}
		} else {
			await dm.setFieldValue(parms.dataObjId, parms.row, parms.field, !fieldValue)
		}
	}
</script>

<!-- <DataViewer header="dataItems" data={dataItems} /> -->

{#if field.colDO.colDB.isMultiSelect}
	<FormLabel {parms} />
	<fieldset class="text-sm space-y-2 {classFieldSet}">
		{#each dataItems as { data, display }, i (data)}
			<label class="flex gap-1.5 {i === 0 ? 'mt-3' : ''}">
				<input
					type="checkbox"
					bind:group={fieldValue}
					class="rounded-sm mt-0.5"
					name={field.colDO.propName}
					oninput={onInput}
					value={data}
				/>
				{display}
			</label>
		{/each}
	</fieldset>
{:else}
	<div class="flex gap-1.5">
		<FormLabel {parms} />
		<input
			type="checkbox"
			bind:checked={fieldValue}
			class="rounded-sm mt-0.5"
			name={field.colDO.propName}
			oninput={onInput}
		/>
	</div>
{/if}
