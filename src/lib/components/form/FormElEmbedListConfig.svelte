<script lang="ts">
	import { ContextKey, DataManager, NodeObjComponent, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { FieldEmbedListConfig } from '$comps/form/fieldEmbed'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElEmbeddedListConfig.svelte'

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)

	let fieldEmbed = $derived(parms.field) as FieldEmbedListConfig
	let dataObjEmbed: DataObj = dm.getDataObj(fieldEmbed.rawFieldEmbedList.embedDataObjId)
</script>

<FormLabel {parms} />

<div class="h-80 border rounded-md">
	<LayoutContent
		parms={{
			...parms,
			navContent: NodeObjComponent.FormList,
			dataObj: dataObjEmbed,
			dataObjId: dataObjEmbed.raw.id
		}}
	/>
</div>

<!-- <DataViewer header="stateDisplay" data={stateDisplay} /> -->
