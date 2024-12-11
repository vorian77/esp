<script lang="ts">
	import { FieldProps } from '$comps/form/field'
	import { DataObj, DataObjCardinality } from '$utils/types'
	import { FieldRadio } from '$comps/form/fieldRadio'
	import { FieldAccess, FieldAlignment } from '$comps/form/field'
	import FormLabel from '$comps/form/FormLabel.svelte'

	export let fp: FieldProps

	$: dataObj = fp.state.props.dataObj
	$: field = fp.field as FieldRadio
	$: fieldValue = fp.fieldValue
	$: dataItems = field.linkItemsSource
		? field.linkItemsSource.formatDataFieldColumnItem(fieldValue)
		: []
	$: row = fp.row

	$: classPropsLabel = dataObj.raw.codeCardinality === DataObjCardinality.detail ? '' : 'hidden'
	$: classFormat = field.isDisplayBlock ? 'block mb-2' : 'inline mr-7'
	$: classFieldSet =
		dataObj.raw.codeCardinality === DataObjCardinality.list
			? 'fieldsetList'
			: field.fieldAccess === FieldAccess.required
				? 'fieldsetDetailRequired'
				: 'fieldsetDetailOptional'
	$: classAlignment =
		field.fieldAlignment === FieldAlignment.left
			? ' text-left'
			: field.fieldAlignment === FieldAlignment.center
				? ' text-center'
				: field.fieldAlignment === FieldAlignment.justify
					? ' text-justify'
					: field.fieldAlignment === FieldAlignment.right
						? ' text-right'
						: ' text-left'

	if (field) field.isDisplayBlock = false

	function onChange(event: Event) {
		const target = event.currentTarget as HTMLInputElement
		fp.state.props?.fClosureSetVal(fp.row, fp.field, target.value)
	}
</script>

<FormLabel {fp} />

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
						on:click={onChange}
					/>
					{display}
				</div>
			{/each}
		{/if}
	</div>
</fieldset>
