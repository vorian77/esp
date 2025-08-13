<script lang="ts">
	import { Switch } from '@skeletonlabs/skeleton-svelte'
	import { FieldAccess } from '$comps/form/field.svelte'
	import { FieldToggle } from '$comps/form/fieldToggle'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import { ContextKey, DataManager, DataObjCardinality, required } from '$utils/types'
	import { getContext } from 'svelte'
	import DataViewer from '$utils/DataViewer.svelte'
	import { error } from '@sveltejs/kit'

	const FILENAME = '$comps/form/FormElToggle.svelte'

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)

	let dataObj = $derived(dm.getDataObj(parms.dataObjId))
	let field = $derived(parms.field) as FieldToggle
	let fieldValue = $derived(dm.getFieldValue(parms.dataObjId, parms.row, parms.field))
	let valueToggle: boolean = $derived(field.getValueBoolean(fieldValue))

	async function onChange(event: Event) {
		await dm.setFieldValueAsync(
			parms.dataObjId,
			parms.row,
			parms.field,
			field.getValueDb(valueToggle),
			field.callbackSetFieldValue
		)
	}

	// Handle the change in state when toggled.
	async function handleModeChange(checked: boolean) {
		valueToggle = checked
		console.log({ valueToggle })
		await dm.setFieldValueAsync(
			parms.dataObjId,
			parms.row,
			parms.field,
			field.getValueDb(valueToggle),
			field.callbackSetFieldValue
		)
	}
</script>

<!-- <DataViewer header="value" data={{ fieldValue, valueToggle }} /> -->

<div class={dataObj.raw.codeCardinality === DataObjCardinality.detail ? 'mb-1' : 'mb-1 hidden'}>
	<FormLabel {parms} />
</div>

<div class={dataObj.raw.codeCardinality === DataObjCardinality.detail ? '' : 'text-center'}>
	<Switch
		controlActive="bg-primary-500"
		bind:checked={valueToggle}
		name={field.getValueKey()}
		onCheckedChange={onChange}
	>
		{#snippet inactiveChild()}{/snippet}
		{#snippet activeChild()}{/snippet}
	</Switch>
</div>
