<script lang="ts">
	import { DataObj } from '$utils/types'
	import { FieldCheckbox } from '$comps/form/fieldCheckbox'
	import { FieldAccess } from '$comps/form/field'
	import { DataObjCardinality, getArray } from '$utils/types'
	import DataViewer from '$utils/DataViewer.svelte'

	export let dataObj: DataObj
	export let field: FieldCheckbox
	export let fieldValue: any
	export let setFieldVal: Function

	const classFieldSet =
		dataObj.raw.codeCardinality === DataObjCardinality.list
			? 'fieldsetList'
			: field.colDO.fieldAccess === FieldAccess.required
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
				setFieldVal(field.colDO.propName, newValues)
			}
		} else {
			const idx = field.colDO.items.findIndex((i) => i.data === value)
			if (idx >= 0) {
				field.colDO.items[idx].selected = !field.colDO.items[idx].selected
				const newVal = field.colDO.items[idx].selected ? value : null
				setFieldVal(field.colDO.propName, newVal)
			}
		}
	}
</script>

<legend>{field.colDO.label}</legend>
<fieldset class={classFieldSet}>
	{#if field.colDO.items}
		{#each field.colDO.items as { data: id, display: label, selected }, i (id)}
			{@const itemName = field.colDO.propName + '.' + id}
			<div class="mt-1">
				<label for={field.colDO.propName} class="flex items-center space-x-2">
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
				</label>
			</div>
		{/each}
	{/if}
</fieldset>
<!-- <DataViewer header="items" data={field.items} /> -->
