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
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)

	let dataObj = $derived(dm.getDataObj(parms.dataObjId))
	let field = $derived(parms.field) as FieldToggle
	let fieldValue = $derived(dm.getFieldValue(parms.dataObjId, parms.row, parms.field))
	let valueToggle: boolean = $state(field.getValueBoolean(fieldValue))

	async function onChange(event: Event) {
		const newValue = field.toggle(fieldValue)
		await dm.setFieldValue(parms.dataObjId, parms.row, parms.field, newValue)
		valueToggle = field.getValueBoolean(newValue)
	}
</script>

<div class={dataObj.raw.codeCardinality === DataObjCardinality.detail ? 'mb-1' : 'mb-1 hidden'}>
	<FormLabel {parms} />
</div>

<div class={dataObj.raw.codeCardinality === DataObjCardinality.detail ? '' : 'text-center'}>
	<SlideToggle
		active="bg-primary-500"
		bind:checked={valueToggle}
		name={field.colDO.propName}
		onclick={onChange}
		disabled={field.fieldAccess === FieldAccess.readonly}
	>
		{#if field.valueShow}
			{fieldValue}
		{/if}
	</SlideToggle>
</div>
