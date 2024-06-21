<script lang="ts">
	import { Field, FieldParmType, FieldProps } from '$comps/form/field'
	import { FieldInput } from '$comps/form/fieldInput'
	import FormElement from '$comps/form/FormElement.svelte'
	import { type DataRecord } from '$utils/types'
	import { RawDataObjPropDisplay } from '$comps/dataObj/types.rawDataObj'
	import DataViewer from '$utils/DataViewer.svelte'
	import { error } from '@sveltejs/kit'

	const FILENAME = '$comps/form/FormElParm.svelte'

	export let fp: FieldProps

	// let field: FieldInput

	$: dataRecord = fp.dataRecord

	$: state = fp.state
	$: dataObj = fp.dataObj
	$: dataObjData = fp.dataObjData
	$: field = getField(fp.field, fp.dataRecord, dataObj.fields)

	$: row = fp.row
	$: fieldListItems: dataRecord.fieldListItems
	$: fieldListItemsParmName = dataRecord.fieldListItemsParmName
	$: isMultiSelect = dataRecord.isMultiSelect
	$: isRequired = dataRecord.isRequired
	$: linkTable = dataRecord.linkTable
	$: parmType = dataRecord.codeParmType

	// $: {
	// 	const className = field.constructor.name
	// 	if (typeof className === 'string' && className !== '') {
	// 	}
	// 	console.log('FormElParm.className', className)
	// }

	function getField(field: Field, dataRecord: DataRecord, fields: Field[]) {
		// console.log('FormElParm.getField', { field, dataRecord })
		let propRaw: RawDataObjPropDisplay

		switch (dataRecord.codeParmType) {
			case FieldParmType.date:
			case FieldParmType.link:
				propRaw = new RawDataObjPropDisplay({
					_column: {
						_codeDataType: 'date',
						header: 'Birth Data',
						isMultiSelect: false,
						isNonData: false,
						rawFieldAlignment: 'left',
						togglePresetTrue: false,
						toggleValueShow: false
					},
					_propName: 'birthDate',
					fieldColor: { color: '#000000', name: 'black' },
					hasItems: false,
					items: [],
					label: 'Birth Date',
					labelSide: 'Birth Date',
					orderDisplay: field.colDO.orderDisplay,
					rawFieldAccess: 'readOnly',
					rawFieldElement: 'date'
				})
				return new FieldInput(propRaw, field.isFirstVisible, fields)
			default:
				error(500, {
					file: FILENAME,
					function: 'getField',
					message: `No case defined for field.codeParmType: ${dataRecord.codeParmType}`
				})
		}
	}
</script>

<div class="border-4">
	{#if field}
		<FormElement bind:state {dataObj} {dataObjData} {field} {row} />
	{/if}
</div>
