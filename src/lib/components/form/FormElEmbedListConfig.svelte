<script lang="ts">
	import { FieldEmbedListConfig } from '$comps/form/fieldEmbed'
	import { DataObjMode } from '$utils/types'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElEmbeddedListConfig.svelte'

	let { parms }: DataRecord = $props()

	let recordIdCurrent: string

	// $: {
	// 	let recordId = fp.dataRecord['id'] || ''
	// 	console.log('FormElEmbedListConfig.recordId', recordId)
	// 	if (recordId.startsWith('preset_')) recordId = ''
	// 	if (recordIdCurrent !== recordId) recordIdCurrent = recordId

	// 	const field = fp.field as FieldEmbedListConfig
	// 	const rows = field.dataObj?.data.rowsRetrieved.length
	// 	fp.setIsLabelBold(true)

	// 	const parentObjectSaved =
	// 		recordIdCurrent !== '' &&
	// 		fp.state.objStatus.objValidToSave &&
	// 		!fp.state.objStatus.objHasChanged
	// 	if (field.dataObj) {
	// 		if (parentObjectSaved) {
	// 			field.dataObj.modeAdd(DataObjMode.ParentObjectSaved)
	// 		} else {
	// 			field.dataObj.modeDrop(DataObjMode.ParentObjectSaved)
	// 		}
	// 	}
	// }
</script>

<FormLabel {parms} />
FormElEmbedListConfig

{#if fp}
	<!-- {#key recordIdCurrent}
		{recordIdCurrent} -->
	<div class="mt-4">
		<!-- <LayoutContent
			bind:state={fp.state}
			component={fp.field.dataObj.raw.codeComponent}
			dataObj={fp.field.dataObj}
			dataObjData={fp.field.dataObj.data}
			on:formCancelled
		/> -->
	</div>
	<!-- {/key} -->
{/if}

<!-- <DataViewer header="stateDisplay" data={stateDisplay} /> -->
