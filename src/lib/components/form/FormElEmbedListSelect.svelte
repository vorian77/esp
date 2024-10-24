<script lang="ts">
	import { StatePacketAction } from '$comps/app/types.appState'
	import { FieldProps } from '$comps/form/field'
	import { FieldEmbedListSelect } from '$comps/form/fieldEmbed'
	import Layout from '$comps/layout/RootLayoutApp.svelte'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import Icon from '$comps/other/Icon.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElEmbeddedListSelect.svelte'
	let field: FieldEmbedListSelect
	export let fp: FieldProps

	function openDialogIcon() {
		fp.field.dataObj.actionsFieldTrigger(StatePacketAction.doEmbedListSelect, fp.state)
	}
</script>

<FormLabel {fp} bold={true}>
	<button class="ml-1" on:click={() => openDialogIcon()}>
		<Icon name={'select'} width="28" height="28" fill={'#3b79e1'} />
	</button>
</FormLabel>

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
