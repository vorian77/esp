<script lang="ts">
	import { FieldProps } from '$comps/form/field'
	import { FieldEmbedListSelect } from '$comps/form/fieldEmbed'
	import { TokenAppAction } from '$utils/types.token'
	import Layout from '$comps/layout/BaseLayout.svelte'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import Icon from '$comps/misc/Icon.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElEmbeddedListSelect.svelte'

	export let fp: FieldProps

	$: field = fp.field as FieldEmbedListSelect

	function openDialogIcon() {
		field.dataObj.actionsFieldTrigger(TokenAppAction.doEmbedListSelect, fp.state)
	}
</script>

<FormLabel {fp}>
	<button class="ml-1" on:click={() => openDialogIcon()}>
		<Icon name={'select'} width="28" height="28" fill={'#3b79e1'} />
	</button>
</FormLabel>

{#if fp}
	<div class="mt-4">
		<LayoutContent
			bind:state={fp.state}
			dataObj={fp.field.dataObj}
			dataObjData={fp.field.dataObj.data}
			on:formCancelled
		/>
	</div>
{/if}
