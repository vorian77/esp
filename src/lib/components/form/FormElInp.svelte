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
				? 'input text-sm text-black' + field.getBackgroundColor(field.fieldAccess)
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

	const imDate: MaskInputOptions = {
		// mask: '####-##-##'
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

	let inputMask = $derived(field.inputMaskAlt || field.inputMask || '')

	const onMaska = async (event: CustomEvent<MaskaDetail>) => {
		const valueMasked = {
			data: event.detail.unmasked, // raw for APIs/DB
			display: event.detail.masked // formatted for UI
		}

		await dm.setFieldValueAsync(parms.dataObjId, parms.row, field, valueMasked)
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
		{placeholder}
		readonly={field.fieldAccess === FieldAccess.readonly}
		step={field.spinStep?.toString() || ''}
		type={fieldInputType || field.FieldElement}
		value={fieldValueDisplay}
		use:maska={inputMask}
		onmaska={onMaska}
		inputmode={field.inputMaskType === 'currency' ? 'decimal' : undefined}
	/>
</FormLabel>
<!-- <DataViewer header="fieldValue" data={fieldValue} /> -->
