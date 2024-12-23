<script lang="ts">
	import {
		ContextKey,
		DataManager,
		DataObjCardinality,
		type DataRecord,
		required
	} from '$utils/types'
	import { getContext } from 'svelte'
	import { FieldEmbedListEdit } from '$comps/form/fieldEmbed'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElEmbedListEdit.svelte'

	let { parms }: DataRecord = $props()
	let dm: DataManager = required(getContext(ContextKey.dataManager), FILENAME, 'dataManager')
	let fieldEmbed = $derived(parms.field) as FieldEmbedListEdit
	let dataObjEmbed: DataObj = dm.getDataObj(fieldEmbed.embedDataObjId)
</script>

<FormLabel {parms} />

<div class="h-80">
	<LayoutContent
		parms={{
			...parms,
			component: dataObjEmbed.raw.codeComponent,
			dataObj: dataObjEmbed,
			dataObjId: dataObjEmbed.raw.id
		}}
	/>
</div>

<!-- {#if fp}
	<div class="h-80">
		<LayoutContent
			bind:state={fp.state}
			component={fp.field.dataObj.raw.codeComponent}
			dataObj={fp.field.dataObj}
			dataObjData={fp.field.dataObj.data}

		/>
	</div>
{/if} -->

<!-- <DataViewer header="stateEmbedListEdit.objStatus" data={stateEmbed.objStatus} /> -->
