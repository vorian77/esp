<script lang="ts">
	import {
		ContextKey,
		DataManager,
		DataObjCardinality,
		type DataRecord,
		required
	} from '$utils/types'
	import { FieldAlignment, FieldElement } from '$comps/form/field'
	import { FieldInput } from '$comps/form/fieldInput'
	import { FieldAccess } from '$comps/form/field'
	import { PropDataType } from '$comps/dataObj/types.rawDataObj'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import { getContext } from 'svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	let { parms }: DataRecord = $props()
	let dm: DataManager = required(getContext(ContextKey.dataManager), 'FormElInput', 'dataManager')

	let dataObj = $state(dm.getDataObj(parms.dataObjId))
	let field: FieldInput = $state(parms.field)
	let fieldValue = $state(parms.fieldValue)
	let row = $state(parms.row)

	if (field.fieldElement === FieldElement.textHide) {
		setHideTextIcon()
	}

	let classPropsInput = $derived.by(() => {
		let clazz =
			dataObj.raw.codeCardinality === DataObjCardinality.detail
				? 'input text-sm text-black ' + field.colorBackground
				: 'w-full border-none bg-transparent text-black'
		clazz +=
			field.fieldAlignment === FieldAlignment.left
				? ' text-left'
				: field.fieldAlignment === FieldAlignment.center
					? ' text-center'
					: field.fieldAlignment === FieldAlignment.justify
						? ' text-justify'
						: field.fieldAlignment === FieldAlignment.right
							? ' text-right'
							: ' text-left'
		return clazz
	})

	let min = $derived(field.minValue ? field.minValue.toString() : '')
	let max = $derived(field.maxValue ? field.maxValue.toString() : '')
	let step = $derived(field.spinStep ? field.spinStep : '')

	function onChange(event: Event) {
		const target = event.currentTarget as HTMLSelectElement
		dm.setFieldValue(parms.dataObjId, row, field, target.value)
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
			dm.setFieldValue(parms.dataObjId, row, field, value)
		}
	}
	function setHideTextIcon() {
		field.setIconProps({
			name: field.inputTypeCurrent === 'password' ? 'Eye' : 'EyeOff',
			clazz: 'ml-1',
			onClick: onClickToggleHideText,
			size: 20
		})
	}
	function onClickToggleHideText() {
		field.inputTypeCurrent = field.inputTypeCurrent === 'password' ? 'text' : 'password'
		setHideTextIcon()
	}
</script>

<FormLabel {parms}>
	<input
		class={classPropsInput}
		hidden={field.fieldAccess === FieldAccess.hidden}
		id={field.colDO.propName}
		{max}
		{min}
		name={field.colDO.propName}
		onchange={onChange}
		ondblclick={onDoubleClick}
		oninput={onChange}
		placeholder={dataObj.raw.codeCardinality === DataObjCardinality.detail || dataObj.raw.isListEdit
			? field.placeHolder
			: ''}
		readonly={field.fieldAccess === FieldAccess.readonly}
		{step}
		type={field.inputTypeCurrent ? field.inputTypeCurrent : field.FieldElement}
		value={fieldValue}
	/>
</FormLabel>

<!-- <input bind:value={value} /> -->

<!-- onchange={() => onChange}
oninput={() => onChange}
ondblclick={() => onDoubleClick}
onkeyup={() => onChange} -->
