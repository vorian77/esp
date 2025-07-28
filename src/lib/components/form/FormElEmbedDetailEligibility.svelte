<script lang="ts">
	import { State } from '$comps/app/types.state.svelte'
	import { ContextKey, DataManager, DataObj, type DataRecord, required } from '$utils/types'
	import { FieldEmbedDetailEligibility } from '$comps/form/fieldEmbed'
	import { getContext } from 'svelte'
	import FormDetailEl from '$comps/form/FormDetailEl.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '/$comps/form/FormElEmbedDetailEligibility.svelte'

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)
	let dataObj: DataObj = $derived(dm.getDataObj(parms.dataObjId))
	let fieldEligibility = $derived(parms.field) as FieldEmbedDetailEligibility

	let fieldHeader = $derived(fieldEligibility?.colDO?.rawfieldEmbedDetailEligibility?.header || '')
	let fieldDescription = $derived(
		fieldEligibility?.colDO?.rawfieldEmbedDetailEligibility?.description || ''
	)

	let classHeader = $derived(`label flex text-md font-bold mt-2`)
	let classDescription = $derived(`text-sm text-gray-500 `)
</script>

<div class="flex-grow overflow-y-auto rounded-md p-3 border">
	{#if fieldHeader || fieldDescription}
		<div class="mb-8">
			<div class={classHeader}>
				{fieldHeader}
			</div>
			<div class={classDescription}>
				{fieldDescription}
			</div>
		</div>
	{/if}

	{#if fieldEligibility.elements.length === 0}
		<div class="text-gray-500">No elements available.</div>
	{/if}
	{#each fieldEligibility.elements as el}
		<FormDetailEl {parms} {dataObj} {el} />
	{/each}
</div>
