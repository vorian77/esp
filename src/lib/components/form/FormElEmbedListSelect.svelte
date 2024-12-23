<script lang="ts">
	import { ContextKey, DataManager, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { StatePacketAction } from '$comps/app/types.appState.svelte'
	import { Field } from '$comps/form/field'
	import { FieldEmbedListSelect } from '$comps/form/fieldEmbed'
	import Layout from '$comps/layout/RootLayoutApp.svelte'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElEmbeddedListSelect.svelte'

	let { parms }: DataRecord = $props()
	parms.isLabelbold = true

	let stateApp: State = required(getContext(ContextKey.stateApp), FILENAME, 'stateApp')
	let dm: DataManager = required(getContext(ContextKey.dataManager), FILENAME, 'dataManager')
	let fieldEmbed = $derived(parms.field) as FieldEmbedListSelect
	let dataObjEmbed: DataObj = dm.getDataObj(fieldEmbed.embedDataObjId)
	let iconProps = $state(
		new IconProps({
			name: 'SquareMousePointer',
			clazz: 'ml-1.5 mt-0.5',
			color: '#3b79e1',
			onclick: () =>
				dataObjEmbed.actionsFieldTrigger(StatePacketAction.doEmbedListSelect, stateApp),
			size: 18,
			strokeWidth: 2
		})
	)

	// function openDialogIcon() {
	// 	dataObjEmbed.actionsFieldTrigger(StatePacketAction.doEmbedListSelect, stateApp)
	// }
</script>

<FormLabel {parms} {iconProps} />

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
