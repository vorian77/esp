<script lang="ts">
	import { ContextKey, DataManager, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { FieldEmbedListConfig } from '$comps/form/fieldEmbed'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElEmbeddedListConfig.svelte'

	let { parms }: DataRecord = $props()
	let dm: DataManager = required(getContext(ContextKey.dataManager), FILENAME, 'dataManager')

	let fieldEmbed = $derived(parms.field) as FieldEmbedListConfig
	let dataObjEmbed: DataObj = dm.getDataObj(fieldEmbed.embedDataObjId)
</script>

<FormLabel {parms} />

<div class="mt-4">
	<LayoutContent
		parms={{
			...parms,
			component: dataObjEmbed.raw.codeComponent,
			dataObj: dataObjEmbed,
			dataObjId: dataObjEmbed.raw.id
		}}
	/>
</div>

<!-- <DataViewer header="stateDisplay" data={stateDisplay} /> -->
