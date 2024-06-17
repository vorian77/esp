<script lang="ts">
	import { DataObj, DataObjCardinality } from '$utils/types'
	import { FieldRadio } from '$comps/form/fieldRadio'
	import { FieldAccess, FieldAlignment } from '$comps/form/field'

	export let dataObj: DataObj
	export let field: FieldRadio
	export let row: number
	export let fieldValue: any
	export let setFieldVal: Function

	const classPropsLabel = dataObj.raw.codeCardinality === DataObjCardinality.detail ? '' : 'hidden'

	field.isDisplayBlock = false
	const classFormat = field.isDisplayBlock ? 'block mb-2' : 'inline mr-7'

	const classFieldSet =
		dataObj.raw.codeCardinality === DataObjCardinality.list
			? 'fieldsetList'
			: field.colDO.fieldAccess === FieldAccess.required
				? 'fieldsetDetailRequired'
				: 'fieldsetDetailOptional'

	const classAlignment =
		field.colDO.fieldAlignment === FieldAlignment.left
			? ' text-left'
			: field.colDO.fieldAlignment === FieldAlignment.center
				? ' text-center'
				: field.colDO.fieldAlignment === FieldAlignment.justify
					? ' text-justify'
					: field.colDO.fieldAlignment === FieldAlignment.right
						? ' text-right'
						: ' text-left'

	function onChange(event: Event) {
		const target = event.currentTarget as HTMLInputElement
		let newValue: string | null = target.value === fieldValue ? null : target.value
		setFieldVal(field.colDO.propName, newValue)
	}
</script>

<legend class={classPropsLabel}>{field.colDO.label}</legend>
<fieldset id="input-radio-row-{row}" class={classFieldSet}>
	<div class="mt-3 {classAlignment}">
		{#if field.colDO.items}
			{#each field.colDO.items as { data: id, display: label }, index (id)}
				<label class="{classFormat} {index === 0 ? 'mt-4' : ''}">
					<input
						type="radio"
						name={field.colDO.propName + '-' + row}
						value={id}
						checked={fieldValue == id}
						on:click={onChange}
					/>
					{label}
				</label>
			{/each}
		{/if}
	</div>
</fieldset>
