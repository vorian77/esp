<script lang="ts">
	import { DataObj, DataObjCardinality } from '$utils/types'
	import { FieldToggle } from '$comps/form/fieldToggle'
	import { SlideToggle } from '@skeletonlabs/skeleton'
	import { PropDataType } from '$comps/dataObj/types.rawDataObj'
	import DataViewer from '$utils/DataViewer.svelte'

	export let dataObj: DataObj
	export let field: FieldToggle
	export let fieldValue: any
	export let setFieldVal: Function

	const classProps = dataObj.raw.codeCardinality === DataObjCardinality.detail ? '' : 'text-center'
	const classPropsLabel =
		dataObj.raw.codeCardinality === DataObjCardinality.detail ? 'mb-1' : 'mb-1 hidden'

	let selections = (function () {
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
	let valueToggle: boolean
	let valueDisplay: any

	$: {
		if (fieldValue === undefined || fieldValue === null) {
			fieldValue = field.presetTrue ? selections[0][0] : selections[1][0]
			setFieldVal(field.colDO.propName, fieldValue)
		}
		setToggle(fieldValue)
	}

	function onChange(event: Event) {
		const idx = selections.findIndex((s: any) => {
			return s[0] === fieldValue
		})
		const newValue = selections[(idx + 1) % 2][0]
		setToggle(newValue)
		setFieldVal(field.colDO.propName, newValue)
	}

	function setToggle(value: any) {
		valueToggle = value === selections[0][0]
		valueDisplay = valueToggle ? selections[0][1] : selections[1][1]
	}
</script>

<div class={classPropsLabel}>
	<legend>{field.colDO.label}</legend>
</div>

<div class={classProps}>
	<SlideToggle
		name={field.colDO.propName}
		bind:checked={valueToggle}
		on:change={onChange}
		active="bg-primary-500"
	>
		{#if field.valueShow}
			{valueDisplay}
		{/if}
	</SlideToggle>
</div>
