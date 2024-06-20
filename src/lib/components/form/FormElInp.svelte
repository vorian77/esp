<script lang="ts">
	import { FieldAlignment, FieldProps } from '$comps/form/field'
	import { FieldInput } from '$comps/form/fieldInput'
	import { FieldAccess } from '$comps/form/field'
	import { DataObjCardinality } from '$utils/types'
	import { PropDataType } from '$comps/dataObj/types.rawDataObj'
	import DataViewer from '$utils/DataViewer.svelte'
	import { input } from 'edgedb/dist/adapter.node'

	export let fp: FieldProps

	$: dataObj = fp.dataObj
	$: field = fp.field as FieldInput
	$: fieldValue = fp.fieldValue
	$: setFieldVal = fp.setFieldVal
	$: fieldType = {
		inputDate: 'date',
		inputEmail: 'email',
		inputNumber: 'number',
		inputText: 'text',
		inputNumber: 'number',
		inputPassword: 'password',
		inputText: 'text'
	}[field.fieldElement]

	$: classPropsInput =
		dataObj.raw.codeCardinality === DataObjCardinality.detail
			? 'input text-black ' + field.colorBackground
			: 'w-full border-none bg-transparent text-black'
	$: classPropsLabel = dataObj.raw.codeCardinality === DataObjCardinality.detail ? '' : 'hidden'
	$: classPropsInput +=
		field.fieldAlignment === FieldAlignment.left
			? ' text-left'
			: field.fieldAlignment === FieldAlignment.center
				? ' text-center'
				: field.fieldAlignment === FieldAlignment.justify
					? ' text-justify'
					: field.fieldAlignment === FieldAlignment.right
						? ' text-right'
						: ' text-left'

	$: min = field.minValue ? field.minValue.toString() : ''
	$: max = field.maxValue ? field.maxValue.toString() : ''
	$: step = field.spinStep ? field.spinStep : ''

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
<!-- <DataViewer header="fieldAccess" data={field.fieldAccess} /> -->

<label class="label" for={field.colDO.propName} hidden={field.fieldAccess == FieldAccess.hidden}>
	<span class={classPropsLabel}>{field.colDO.label}</span>
	<div>
		<input
			class={classPropsInput}
			hidden={field.fieldAccess == FieldAccess.hidden}
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
			readonly={field.fieldAccess == FieldAccess.readonly}
			{step}
			type={fieldType}
			value={fieldValue}
		/>
	</div>
</label>
