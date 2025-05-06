<script lang="ts">
	import { FieldAccess, FieldValueType } from '$comps/form/field.svelte'
	import { FieldToggle } from '$comps/form/fieldToggle'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import { ContextKey, DataManager, DataObjCardinality, required } from '$utils/types'
	import { SlideToggle } from '@skeletonlabs/skeleton'
	import { getContext } from 'svelte'

	const FILENAME = '$comps/form/FormElToggle.svelte'

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)

	let dataObj = $derived(dm.getDataObj(parms.dataObjId))
	let field = $derived(parms.field) as FieldToggle
	let fieldValue = $derived(
		dm.getFieldValue(parms.dataObjId, parms.row, parms.field, FieldValueType.display)
	)
	let valueToggle: boolean = $state(field.getValueBoolean(fieldValue))

	async function onChange(event: Event) {
		await dm.setFieldValue(parms.dataObjId, parms.row, parms.field, field.getValueDb(valueToggle))
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
