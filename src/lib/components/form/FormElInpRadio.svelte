<script lang="ts">
	import { ContextKey, DataManager, DataObj, DataObjCardinality, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { FieldRadio } from '$comps/form/fieldRadio'
	import { FieldAccess, FieldAlignment } from '$comps/form/field'
	import FormLabel from '$comps/form/FormLabel.svelte'

	let { parms }: DataRecord = $props()
	let dm: DataManager = required(getContext(ContextKey.dataManager), FILENAME, 'dataManager')
	let field = $derived(parms.field) as FieldRadio
	let fieldValue = $derived(dm.getFieldValue(parms.dataObjId, parms.row, parms.field))
	let dataObj: DataObj = $derived(dm.getDataObj(parms.dataObjId))

	let dataItems = $derived(
		field.linkItemsSource ? field.linkItemsSource.formatDataFieldColumnItem(fieldValue) : []
	)

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

	function onClick(event: Event) {
		const target = event.currentTarget as HTMLInputElement
		dm.setFieldValue(parms.dataObjId, parms.row, parms.field, target.value)
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
						name={field.colDO.propName + '-' + parms.row}
						value={data}
						checked={fieldValue == data}
						onclick={onClick}
					/>
					{display}
				</div>
			{/each}
		{/if}
	</div>
</fieldset>
