<script lang="ts">
	import { FieldProps } from '$comps/form/field'
	import { DataObj } from '$utils/types'
	import { FieldCheckbox } from '$comps/form/fieldCheckbox'
	import { FieldAccess } from '$comps/form/field'
	import { DataObjCardinality, getArray } from '$utils/types'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	let { fp = $bindable() }: FieldProps = $props()

	let dataObj = $derived(fp.stateProps.dataObj)
	let field = $derived(fp.field) as FieldCheckbox
	let fieldValue = $derived(fp.fieldValue)
	let dataItems = $derived(
		field.linkItemsSource ? field.linkItemsSource.formatDataFieldColumnItem(fieldValue) : []
	)

	let classFieldSet = $derived(
		dataObj.raw.codeCardinality === DataObjCardinality.list
			? 'fieldsetList'
			: field.fieldAccess === FieldAccess.required
				? 'fieldsetDetailRequired'
				: 'fieldsetDetailOptional'
	)

	function onInput(event: Event) {
		const target = event.currentTarget as HTMLInputElement
		const value = target.value

		if (field.colDO.colDB.isMultiSelect) {
			const idx = dataItems.findIndex((i) => i.data === value)
			if (idx >= 0) {
				let newValues: string[] = []
				dataItems[idx].selected = !dataItems[idx].selected
				dataItems.forEach((i) => {
					if (i.selected) newValues.push(i.data)
				})
				fp.stateProps.fSetVal(fp.row, fp.field, newValues)
			}
		} else {
			const idx = dataItems.findIndex((i) => i.data === value)
			if (idx >= 0) {
				dataItems[idx].selected = !dataItems[idx].selected
				const newVal = dataItems[idx].selected ? value : null
				fp.stateProps.fSetVal(fp.row, fp.field, newVal)
			}
		}
	}
</script>

<!-- bind:checked={selected}
bind:group={} -->

<FormLabel {fp} />

<fieldset class={classFieldSet}>
	{#if dataItems}
		{#each dataItems as { data, display, selected }, i (data)}
			{@const itemName = field.colDO.propName + '.' + data}
			<div class="mt-2 flex items-center space-x-2">
				<input
					type="checkbox"
					id={field.colDO.propName}
					name={itemName}
					class="rounded-sm{i === 0 ? 'mt-2' : ''}"
					value={data}
					oninput={() => onInput}
				/>
				<p class="text-sm">{display}</p>
			</div>
		{/each}
	{/if}
</fieldset>

<!-- <DataViewer header="items" data={field.items} /> -->
