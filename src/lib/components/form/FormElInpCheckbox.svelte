<script lang="ts">
	import { FieldProps } from '$comps/form/field'
	import { DataObj } from '$utils/types'
	import { FieldCheckbox } from '$comps/form/fieldCheckbox'
	import { FieldAccess } from '$comps/form/field'
	import { DataObjCardinality, getArray } from '$utils/types'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	export let fp: FieldProps

	$: dataObj = fp.dataObj
	$: field = fp.field as FieldCheckbox
	$: fieldValue = fp.fieldValue
	$: setFieldVal = fp.setFieldVal

	$: classFieldSet =
		dataObj.raw.codeCardinality === DataObjCardinality.list
			? 'fieldsetList'
			: field.fieldAccess === FieldAccess.required
				? 'fieldsetDetailRequired'
				: 'fieldsetDetailOptional'

	$: if (field.colDO.colDB.isMultiSelect) {
		const vals = getArray(fieldValue)
		field.colDO.items.forEach((i) => (i.selected = vals.includes(i.data)))
	} else {
		field.colDO.items.forEach((i) => (i.selected = i.data === fieldValue))
	}

	function onInput(event: Event) {
		const target = event.currentTarget as HTMLInputElement
		const value = target.value

		if (field.colDO.colDB.isMultiSelect) {
			const idx = field.colDO.items.findIndex((i) => i.data === value)
			if (idx >= 0) {
				let newValues: string[] = []
				field.colDO.items[idx].selected = !field.colDO.items[idx].selected
				field.colDO.items.forEach((i) => {
					if (i.selected) newValues.push(i.data)
				})
				setFieldVal(field, newValues)
			}
		} else {
			const idx = field.colDO.items.findIndex((i) => i.data === value)
			if (idx >= 0) {
				field.colDO.items[idx].selected = !field.colDO.items[idx].selected
				const newVal = field.colDO.items[idx].selected ? value : null
				setFieldVal(field, newVal)
			}
		}
	}
</script>

<FormLabel {fp} />

<fieldset class={classFieldSet}>
	{#if field.colDO.items}
		{#each field.colDO.items as { data: id, display: label, selected }, i (id)}
			{@const itemName = field.colDO.propName + '.' + id}
			<div class="mt-1 flex items-center space-x-2">
				<input
					type="checkbox"
					id={field.colDO.propName}
					name={itemName}
					class="rounded-sm {i === 0 ? 'mt-2' : ''}"
					value={id}
					bind:checked={selected}
					on:input={onInput}
				/>
				<p class={i === 0 ? 'mt-2' : ''}>{label}</p>
			</div>
		{/each}
	{/if}
</fieldset>

<!-- <DataViewer header="items" data={field.items} /> -->
