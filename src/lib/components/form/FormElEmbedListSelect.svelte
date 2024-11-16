<script lang="ts">
	import { StatePacketAction } from '$comps/app/types.appState'
	import { FieldProps } from '$comps/form/field'
	import { FieldEmbedListSelect } from '$comps/form/fieldEmbed'
	import Layout from '$comps/layout/RootLayoutApp.svelte'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElEmbeddedListSelect.svelte'
	let field: FieldEmbedListSelect
	export let fp: FieldProps

	$: {
		fp.setIsLabelBold(true)
		fp.field.setIconProps({
			name: 'SquareMousePointer',
			clazz: 'ml-1.5 mt-0.5',
			color: '#3b79e1',
			onClick: openDialogIcon,
			size: 18,
			strokeWidth: 2
		})
	}

	function openDialogIcon() {
		fp.field.dataObj.actionsFieldTrigger(StatePacketAction.doEmbedListSelect, fp.state)
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
