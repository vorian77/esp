<script lang="ts">
	import { DataObj } from '$utils/types'
	import { FieldAlignment } from '$comps/form/field'
	import { FieldInput } from '$comps/form/fieldInput'
	import { FieldAccess } from '$comps/form/field'
	import { DataObjCardinality } from '$utils/types'
	import { PropDataType } from '$comps/dataObj/types.rawDataObj'
	import DataViewer from '$utils/DataViewer.svelte'

	export let dataObj: DataObj
	export let field: FieldInput
	export let fieldValue: any
	export let setFieldVal: Function

	let classPropsInput =
		dataObj.raw.codeCardinality === DataObjCardinality.detail
			? 'input text-black ' + field.colorBackground
			: 'w-full border-none bg-transparent text-black'
	classPropsInput +=
		field.colDO.fieldAlignment === FieldAlignment.left
			? ' text-left'
			: field.colDO.fieldAlignment === FieldAlignment.center
				? ' text-center'
				: field.colDO.fieldAlignment === FieldAlignment.justify
					? ' text-justify'
					: field.colDO.fieldAlignment === FieldAlignment.right
						? ' text-right'
						: ' text-left'

	const classPropsLabel = dataObj.raw.codeCardinality === DataObjCardinality.detail ? '' : 'hidden'

	const min = field.minValue ? field.minValue.toString() : ''
	const max = field.maxValue ? field.maxValue.toString() : ''
	const step = field.spinStep ? field.spinStep : ''

	function onChange(event: Event) {
		const target = event.currentTarget as HTMLSelectElement
		setFieldVal(field.colDO.propName, target.value)
	}

	function onDoubleClick(event: MouseEvent) {
		if (field.colDO.colDB.codeDataType === PropDataType.date) {
			const date = new Date()
			const year = date.getFullYear().toString()
			const dateMonth = date.getMonth() + 1
			const dateDay = date.getDate()
			const month = dateMonth < 10 ? '0' + dateMonth : dateMonth.toString()
			const day = dateDay < 10 ? '0' + dateDay : dateDay.toString()
			const value = year + '-' + month + '-' + day
			setFieldVal(field.colDO.propName, value)
		}
	}
</script>

<!-- <DataViewer header="element" data={field.element} /> -->
<!-- <DataViewer header="fieldValue" data={fieldValue} /> -->

<label
	class="label"
	for={field.colDO.propName}
	hidden={field.colDO.fieldAccess == FieldAccess.hidden}
>
	<span class={classPropsLabel}>{field.colDO.label}</span>
	<div>
		<input
			class={classPropsInput}
			hidden={field.colDO.fieldAccess == FieldAccess.hidden}
			id={field.colDO.propName}
			{max}
			{min}
			name={field.colDO.propName}
			on:change={onChange}
			on:dblclick={onDoubleClick}
			on:keyup={onChange}
			placeholder={dataObj.raw.codeCardinality === DataObjCardinality.detail ||
			dataObj.raw.isListEdit
				? field.placeHolder
				: ''}
			readonly={field.colDO.fieldAccess == FieldAccess.readonly}
			{step}
			type={field.colDO.fieldElement}
			value={fieldValue}
		/>
	</div>
</label>
