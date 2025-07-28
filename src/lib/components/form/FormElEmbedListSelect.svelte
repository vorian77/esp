<script lang="ts">
	import {
		CodeAction,
		CodeActionClass,
		CodeActionType,
		ContextKey,
		DataObj,
		DataManager,
		NodeObjComponent,
		required
	} from '$utils/types'
	import { getContext } from 'svelte'
	import { Field } from '$comps/form/field.svelte'
	import { FieldEmbedListSelect } from '$comps/form/fieldEmbed'
	import Layout from '$comps/layout/RootLayoutApp.svelte'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'
	import FormLabel from '$comps/form/FormLabel.svelte'
	import Icon from '$comps/icon/Icon.svelte'
	import { IconProps } from '$comps/icon/types.icon'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElEmbeddedListSelect.svelte'

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)

	parms.isLabelbold = true

	let fieldEmbed = $derived(parms.field) as FieldEmbedListSelect
	let dataObjEmbed: DataObj = dm.getDataObj(fieldEmbed.rawFieldEmbedList.embedDataObjId)
	let iconProps = $state(
		new IconProps({
			name: 'SquareMousePointer',
			clazz: 'ml-1.5 mt-0.5',
			color: '#3b79e1',
			onclick: () =>
				dataObjEmbed.actionsFieldTrigger(
					sm,
					CodeAction.init(
						CodeActionClass.ct_sys_code_action_class_do,
						CodeActionType.doEmbedListSelect
					)
				),
			size: 18,
			strokeWidth: 2
		})
	)
</script>

<FormLabel {parms} {iconProps} />

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
