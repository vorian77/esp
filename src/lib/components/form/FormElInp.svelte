<script lang="ts">
	import { FieldAlignment, FieldProps, FieldElement } from '$comps/form/field'
	import { FieldInput } from '$comps/form/fieldInput'
	import { FieldAccess } from '$comps/form/field'
	import { DataObjCardinality } from '$utils/types'
	import { PropDataType } from '$comps/dataObj/types.rawDataObj'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import DataViewer from '$utils/DataViewer.svelte'

	export let fp: FieldProps

	const setHidTextIcon = () => {
		field.setIconProps({
			name: field.inputTypeCurrent === 'password' ? 'Eye' : 'EyeOff',
			clazz: 'ml-1',
			onClick: onClickToggleHideText,
			size: 20
		})
	}
	const onClickToggleHideText = () => {
		field.inputTypeCurrent = field.inputTypeCurrent === 'password' ? 'text' : 'password'
		setHidTextIcon()
		field = field
	}

	$: dataObj = fp.dataObj
	$: field = fp.field as FieldInput
	$: if (field.fieldElement === FieldElement.textHide) {
		setHidTextIcon()
	}

	$: classPropsInput = dataObj.raw.codeCarfSetVal = DataObjCardinality.detail
		? 'input text-sm text-black ' + field.colorBackground
		: 'w-full border-none bg-transparent text-black'
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
		fp.fSetVal(fp.row, fp.field, target.value)
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
			fp.fSetVal(fp.row, fp.field, value)
		}
	}
</script>

<!-- <DataViewer header="element" data={field.element} /> -->
<!-- <DataViewer header="fieldAccess" data={field.fieldAccess} /> -->

<FormLabel {fp}>
	<input
		class={classPropsInput}
		hidden={field.fieldAccess === FieldAccess.hidden}
		id={field.colDO.propName}
		{max}
		{min}
		name={field.colDO.propName}
		on:change={onChange}
		on:dblclick={onDoubleClick}
		on:keyup={onChange}
		placeholder={dataObj.raw.codeCardinality === DataObjCardinality.detail || dataObj.raw.isListEdit
			? field.placeHolder
			: ''}
		readonly={field.fieldAccess === FieldAccess.readonly}
		{step}
		type={field.inputTypeCurrent ? field.inputTypeCurrent : field.FieldElement}
		value={fp.fieldValue}
	/>
</FormLabel>
