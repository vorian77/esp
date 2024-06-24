<script lang="ts">
	import { Field, FieldElement, FieldParmType, FieldProps } from '$comps/form/field'
	import { FieldInput } from '$comps/form/fieldInput'
	import FormElement from '$comps/form/FormElement.svelte'
	import { type DataRecord } from '$utils/types'
	import { RawDataObjPropDisplay } from '$comps/dataObj/types.rawDataObj'
	import { FieldParm } from '$comps/form/fieldParm'
	import DataViewer from '$utils/DataViewer.svelte'
	import { error } from '@sveltejs/kit'

	const FILENAME = '$comps/form/FormElParm.svelte'

	export let fp: FieldProps

	$: fp.field = initField(fp)

	function initField(fp: FieldProps) {
		// console.log('FormElParm.init.field:', fp.field)
		// if (fp.field.fieldElement === FieldElement.parm) {
		const fieldParm = fp.field as FieldParm
		// console.log('FormElParm.initField.fieldParm:', {
		// 	propName: fieldParm.colDO.propName,
		// 	fieldElement: fieldParm.fieldElement
		// })
		return fieldParm.getPropParm(fp)

		// }
	}
</script>

<div class="border-4">
	{#if fp.field}
		<FormElement
			bind:state={fp.state}
			dataObj={fp.dataObj}
			dataObjData={fp.dataObjData}
			field={fp.field}
			row={fp.row}
		/>
	{/if}
</div>
