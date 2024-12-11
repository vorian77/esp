<script lang="ts">
	import { FieldProps } from '$comps/form/field'
	import { DataObj } from '$utils/types'
	import { FieldCheckbox } from '$comps/form/fieldCheckbox'
	import { FieldAccess } from '$comps/form/field'
	import { DataObjCardinality, getArray } from '$utils/types'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	export let fp: FieldProps

	$: dataObj = fp.state.props.dataObj
	$: field = fp.field as FieldCheckbox
	$: fieldValue = fp.fieldValue
	$: dataItems = field.linkItemsSource
		? field.linkItemsSource.formatDataFieldColumnItem(fieldValue)
		: []

	$: classFieldSet =
		dataObj.raw.codeCardinality === DataObjCardinality.list
			? 'fieldsetList'
			: field.fieldAccess === FieldAccess.required
				? 'fieldsetDetailRequired'
				: 'fieldsetDetailOptional'

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
				fp.state.props?.fClosureSetVal(fp.row, fp.field, newValues)
			}
		} else {
			const idx = dataItems.findIndex((i) => i.data === value)
			if (idx >= 0) {
				dataItems[idx].selected = !dataItems[idx].selected
				const newVal = dataItems[idx].selected ? value : null
				fp.state.props?.fClosureSetVal(fp.row, fp.field, newVal)
			}
		}
	}
</script>

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
					bind:checked={selected}
					on:input={onInput}
				/>
				<p class="text-sm">{display}</p>
			</div>
		{/each}
	{/if}
</fieldset>

<!-- <DataViewer header="items" data={field.items} /> -->
