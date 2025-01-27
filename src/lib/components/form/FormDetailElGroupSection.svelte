<script lang="ts">
	import { Field } from '$comps/form/field'
	import { DataObj, type DataRecord } from '$utils/types'
	import { DetailElField, DetailElGroupSection } from '$comps/form/types.detailElement'
	import FormDetailEl from '$comps/form/FormDetailEl.svelte'

	const FILENAME = '$comps/form/FormDetailElGroupSection.svelte'

	let {
		parms,
		dataObj,
		elSection
	}: { parms: DataRecord; dataObj: DataObj; elSection: DetailElGroupSection } = $props()
</script>

<fieldset class="p-3 mb-3 border" style:border-color={elSection.field.fieldColor.color}>
	{#if elSection.label}
		<legend class="text-lg font-medium">{elSection.label}</legend>
	{/if}

	{#each elSection.elements as el}
		<FormDetailEl {parms} {dataObj} {el} />
	{/each}
</fieldset>
