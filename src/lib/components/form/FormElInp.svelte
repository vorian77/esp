<script lang="ts">
	import {
		ContextKey,
		DataManager,
		DataObjCardinality,
		type DataRecord,
		getValueDisplay,
		PropDataType,
		required
	} from '$utils/types'
	import { getContext } from 'svelte'
	import { Field, FieldAlignment, FieldElement } from '$comps/form/field.svelte'
	import { FieldAccess } from '$comps/form/field.svelte'
	import { FieldInput } from '$comps/form/fieldInput'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import { maska, type MaskaDetail, type MaskInputOptions } from 'maska/svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElInp.svelte'

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)

	let field = $state(parms.field) as FieldInput
	let fieldValue = $derived(dm.getFieldValue(parms.dataObjId, parms.row, field))
	let fieldValueDisplay = $derived(getValueDisplay(fieldValue))
	let fieldInputType = $state(field.inputTypeCurrent || field.fieldElement)
	let iconProps: IconProps = $state(setIconProps())

	let classPropsInput = $derived.by(() => {
		let clazz =
			parms.dataObj.raw.codeCardinality === DataObjCardinality.detail
				? 'input text-sm text-black ' + field.getBackgroundColor(field.fieldAccess)
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

	let placeholder = $derived(
		parms.dataObj.raw.codeCardinality === DataObjCardinality.detail || parms.dataObj.raw.isListEdit
			? field.getPlaceholder(field.fieldAccess)
			: ''
	)

	async function onChange(event: Event) {
		const target = event.currentTarget as HTMLSelectElement
		await dm.setFieldValueAsync(parms.dataObjId, parms.row, field, target.value)
	}

	async function onDoubleClick(event: MouseEvent) {
		if (field.colDO.colDB.codeDataType === PropDataType.date) {
			const date = new Date()
			const year = date.getFullYear().toString()
			const dateMonth = date.getMonth() + 1
			const dateDay = date.getDate()
			const month = dateMonth < 10 ? '0' + dateMonth : dateMonth.toString()
			const day = dateDay < 10 ? '0' + dateDay : dateDay.toString()
			const value = year + '-' + month + '-' + day
			await dm.setFieldValueAsync(parms.dataObjId, parms.row, field, value)
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

	const imCurrency: MaskInputOptions = {
		preProcess: (val) => val.replace(/[$,]/g, ''),
		postProcess: (val) => {
			if (!val) return ''

			const sub = 3 - (val.includes('.') ? val.length - val.indexOf('.') : 0)

			return Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD'
			})
				.format(val)
				.slice(0, sub ? -sub : undefined)
		}
	}

	const imDate: MaskInputOptions = {
		mask: '####-##-##'
		// preProcess: (val) => val.replace(/[^0-9]/g, ''),
		// postProcess: (val) => {
		// 	if (!val) return ''

		// 	const sub = 10 - val.length

		// 	return val
		// 		.split('')
		// 		.map((c, i) => (i === 2 || i === 4 ? c + '/' : c))
		// 		.join('')
		// 		.slice(0, sub ? -sub : undefined)
		// }
	}

	const inputMask = $derived.by(() => {
		if (field.inputMask) {
			switch (field.inputMask) {
				case 'currency':
					return imCurrency
				case 'date':
					return '####-##-##'
				case 'phone':
					return '(###) ###-####'
				default:
					return field.inputMask
			}
		} else {
			return ''
		}
	})
	const onMaska = async (event: CustomEvent<MaskaDetail>) => {
		// console.log('FormElInp.svelte onMaska', {
		// 	masked: event.detail.masked,
		// 	unmasked: event.detail.unmasked,
		// 	completed: event.detail.completed
		// })
		const target = event.currentTarget as HTMLSelectElement
		await dm.setFieldValueAsync(parms.dataObjId, parms.row, field, event.detail.masked)
	}
</script>

<FormLabel {parms} {iconProps}>
	<input
		class={classPropsInput}
		hidden={field.fieldAccess === FieldAccess.hidden}
		id={field.getValueKey()}
		max={field.maxValue?.toString() || ''}
		min={field.minValue?.toString() || ''}
		name={field.getValueKey()}
		ondblclick={onDoubleClick}
		oninput={onChange}
		{placeholder}
		readonly={field.fieldAccess === FieldAccess.readonly}
		step={field.spinStep?.toString() || ''}
		type={fieldInputType || field.FieldElement}
		value={fieldValueDisplay}
	/>
</FormLabel>

<!-- <DataViewer header="fieldValueDisplay" data={fieldValueDisplay} /> -->
<!-- use:maska
data-maska={inputMask}
onmaska={onMaska} -->

<!-- <details>
	<summary>Money, via hooks (pre v3 variant)</summary>
	<input class="money" data-maska="0.99" data-maska-tokens="0:\d:multiple|9:\d:optional">
</details> -->
