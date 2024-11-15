<script lang="ts">
	import { FieldProps } from '$comps/form/field'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElEmbeddedListSelect.svelte'

	export let fp: FieldProps

	$: {
		fp.setIsLabelBold(true)
	}
</script>

<FormLabel {fp} />

{#if fp}
	<div class="mt-4">
		<LayoutContent
			bind:state={fp.state}
			component={fp.field.dataObj.raw.codeComponent}
			dataObj={fp.field.dataObj}
			dataObjData={fp.field.dataObj.data}
			on:formCancelled
		/>
	</div>
{/if}

<!-- <DataViewer header="stateEmbedListEdit.objStatus" data={stateEmbed.objStatus} /> -->
