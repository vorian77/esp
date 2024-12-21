<script lang="ts">
	import {
		ContextKey,
		DataManager,
		DataObjCardinality,
		type DataRecord,
		required
	} from '$utils/types'
	import { getContext } from 'svelte'
	import { FieldAlignment, FieldElement } from '$comps/form/field'
	import { FieldAccess } from '$comps/form/field'
	import { FieldInput } from '$comps/form/fieldInput'
	import { PropDataType } from '$comps/dataObj/types.rawDataObj'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import DataViewer from '$utils/DataViewer.svelte'
	import Icon from '$comps/icon/Icon.svelte'

	const FILENAME = '$comps/form/FormElInp.svelte'

	let { parms }: DataRecord = $props()

	let dm: DataManager = required(getContext(ContextKey.dataManager), FILENAME, 'dataManager')
	let field = $state(parms.field) as FieldInput
	let fieldValue = $derived(dm.getFieldValue(parms.dataObjId, parms.row, field))
	let fieldInputType = $state(field.inputTypeCurrent || field.fieldElement)
	let iconProps: IconProps = $state(setIconProps())

	let classPropsInput = $derived.by(() => {
		let clazz =
			parms.dataObj.raw.codeCardinality === DataObjCardinality.detail
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

	function onChange(event: Event) {
		const target = event.currentTarget as HTMLSelectElement
		dm.setFieldValue(parms.dataObjId, parms.row, field, target.value)
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
			dm.setFieldValue(parms.dataObjId, parms.row, field, value)
		}
	}
	function setIconProps() {
		let iconProps: IconProps = undefined
		let iconName =
			field.fieldElement === FieldElement.textHide
				? fieldInputType === 'password'
					? 'Eye'
					: 'EyeOff'
				: undefined
		if (iconName) {
			iconProps = new IconProps({
				name: iconName,
				clazz: 'ml-1',
				onclick: onClickToggleHideText,
				size: 20
			})
		}
		return iconProps
	}
	function onClickToggleHideText() {
		fieldInputType = fieldInputType === 'password' ? 'text' : 'password'
		iconProps = setIconProps()
	}
</script>

<!-- <button onclick={onClickToggleHideText}>Toggle</button> -->

<!-- <DataViewer header="inp.iconProps" data={iconProps?.name} />
<DataViewer header="fieldInputType" data={fieldInputType} /> -->

<FormLabel {parms} {iconProps}>
	<input
		class={classPropsInput}
		hidden={field.fieldAccess === FieldAccess.hidden}
		id={field.colDO.propName}
		max={field.maxValue?.toString() || ''}
		min={field.minValue?.toString() || ''}
		name={field.colDO.propName}
		ondblclick={onDoubleClick}
		oninput={onChange}
		placeholder={parms.dataObj.raw.codeCardinality === DataObjCardinality.detail ||
		parms.dataObj.raw.isListEdit
			? field.placeHolder
			: ''}
		readonly={field.fieldAccess === FieldAccess.readonly}
		step={field.spinStep?.toString() || ''}
		type={fieldInputType || field.FieldElement}
		value={fieldValue}
	/>
</FormLabel>
