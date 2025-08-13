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
	import { FieldInputDate } from '$comps/form/fieldInputDate'
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

	let field = $state(parms.field) as FieldInputDate
	let fieldValue = $derived(dm.getFieldValue(parms.dataObjId, parms.row, field))
	let fieldValueDisplay = $derived(getValueDisplay(fieldValue))

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

	async function onChange(event: Event) {
		const target = event.currentTarget as HTMLSelectElement
		await dm.setFieldValueAsync(parms.dataObjId, parms.row, field, target.value)
	}

	async function onSingleClick(event: MouseEvent) {
		const fUpdateValue = async (valueSave: any) =>
			await dm.setFieldValueAsync(parms.dataObjId, parms.row, field, valueSave)
		await sm.openModalField(field, fieldValue, fUpdateValue)
	}
</script>

<FormLabel {parms}>
	<input
		class={classPropsInput}
		hidden={field.fieldAccess === FieldAccess.hidden}
		id={field.getValueKey()}
		name={field.getValueKey()}
		onclick={onSingleClick}
		{placeholder}
		readonly={true}
		type="input"
		value={fieldValueDisplay}
	/>
</FormLabel>

<!-- type={field.fieldElement} -->
