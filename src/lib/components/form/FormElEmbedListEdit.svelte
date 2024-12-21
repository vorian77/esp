<script lang="ts">
	import FormLabel from '$comps/form/FormLabel.svelte'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElEmbeddedListSelect.svelte'

	let { parms }: DataRecord = $props()
</script>

<FormLabel {parms} />

{#if fp}
	<div class="mt-4">
		<!-- <LayoutContent
			bind:state={fp.state}
			component={fp.field.dataObj.raw.codeComponent}
			dataObj={fp.field.dataObj}
			dataObjData={fp.field.dataObj.data}

		/> -->
	</div>
{/if}

<!-- <DataViewer header="stateEmbedListEdit.objStatus" data={stateEmbed.objStatus} /> -->
