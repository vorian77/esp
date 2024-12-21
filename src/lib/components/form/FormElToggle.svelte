<script lang="ts">
	import { ContextKey, DataManager, DataObj, DataObjCardinality, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { FieldAccess } from '$comps/form/field'
	import { FieldToggle } from '$comps/form/fieldToggle'
	import { SlideToggle } from '@skeletonlabs/skeleton'
	import { PropDataType } from '$comps/dataObj/types.rawDataObj'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElToggle.svelte'

	let { parms }: DataRecord = $props()
	let dm: DataManager = required(getContext(ContextKey.dataManager), FILENAME, 'dataManager')

	let dataObj = $derived(dm.getDataObj(parms.dataObjId))
	let field = $derived(parms.field) as FieldCustomActionLink

	let selections = (() => {
		switch (field.colDO.colDB.codeDataType) {
			case PropDataType.int16:
				return [getValTrue(1), getValFalse(0)]

			case PropDataType.str:
				return [getValTrue('Yes'), getValFalse('No')]

			default:
				return [getValTrue(true), getValFalse(false)]
		}
		function getValFalse(dbValue: any) {
			return [dbValue, field.valueFalse ? field.valueFalse : dbValue]
		}
		function getValTrue(dbValue: any) {
			return [dbValue, field.valueTrue ? field.valueTrue : dbValue]
		}
	})()

	let fieldValue = $derived.by(() => {
		let fv = dm.getFieldValue(parms.dataObjId, parms.row, parms.field)
		if (fv === undefined || fv === null) {
			fv = field.presetTrue ? selections[0][0] : selections[1][0]
		}
		return fv
	})
	let valueToggle: boolean = $state()
	let valueDisplay: any = $state()
	setToggle(fieldValue)

	function onChange(event: Event) {
		const idx = selections.findIndex((s: any) => {
			return s[0] === fieldValue
		})
		const newValue = selections[(idx + 1) % 2][0]
		setToggle(newValue)
		dm.setFieldValue(parms.dataObjId, parms.row, parms.field, newValue)
	}

	function setToggle(value: any) {
		valueToggle = value === selections[0][0]
		valueDisplay = valueToggle ? selections[0][1] : selections[1][1]
	}
</script>

<div class={dataObj.raw.codeCardinality === DataObjCardinality.detail ? 'mb-1' : 'mb-1 hidden'}>
	<FormLabel {parms} />
</div>

<div class={dataObj.raw.codeCardinality === DataObjCardinality.detail ? '' : 'text-center'}>
	<SlideToggle
		name={field.colDO.propName}
		active="bg-primary-500"
		bind:checked={valueToggle}
		onclick={onChange}
		disabled={field.fieldAccess === FieldAccess.readonly}
	>
		{#if field.valueShow}
			{valueDisplay}
		{/if}
	</SlideToggle>
</div>
