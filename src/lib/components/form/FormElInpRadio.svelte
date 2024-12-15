<script lang="ts">
	import { DataObj, DataObjCardinality } from '$utils/types'
	import { FieldRadio } from '$comps/form/fieldRadio'
	import { FieldAccess, FieldAlignment } from '$comps/form/field'
	import FormLabel from '$comps/form/FormLabel.svelte'

	let { parms }: DataRecord = $props()

	let dataObj = $derived(fp.stateApp.dataObj)
	let field = $derived(fp.field) as FieldRadio
	let fieldValue = $derived(fp.fieldValue)
	let dataItems = $derived(
		field.linkItemsSource ? field.linkItemsSource.formatDataFieldColumnItem(fieldValue) : []
	)
	let ow = $derived(fp.row)

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

	if (field) field.isDisplayBlock = false

	function onClick(event: Event) {
		const target = event.currentTarget as HTMLInputElement
		fp.stateApp.fSetVal(fp.row, fp.field, target.value)
	}
</script>

<FormLabel {parms} />

<fieldset id="input-radio-row-{row}" class={classFieldSet}>
	<div class="mt-3 {classAlignment}">
		{#if dataItems}
			{#each dataItems as { data, display }, index (data)}
				<div class="text-sm {classFormat} {index === 0 ? 'mt-4' : ''}">
					<input
						type="radio"
						name={field.colDO.propName + '-' + row}
						value={data}
						checked={fp.fieldValue == data}
						onclick={onClick}
					/>
					{display}
				</div>
			{/each}
		{/if}
	</div>
</fieldset>
