<script lang="ts">
	import { AppLevel, AppLevelTab } from '$comps/app/types.app.svelte'
	import { State, StateComponentLayout, StateTriggerToken } from '$comps/app/types.appState.svelte'
	import {
		ContextKey,
		DataObj,
		DataObjData,
		type DataRecord,
		required,
		ParmsValues
	} from '$utils/types'
	import { FieldClassType } from '$comps/form/field'
	import { getContext, setContext } from 'svelte'
	import LayoutApp from '$comps/layout/LayoutApp.svelte'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'
	import LayoutProcess from '$comps/layout/LayoutProcess.svelte'
	import LayoutTab from '$comps/layout/LayoutTab.svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/layout/RootLayoutApp.svelte'

	const componentsLayout: Record<string, any> = {
		layoutApp: LayoutApp,
		layoutContent: LayoutContent,
		layoutProcess: LayoutProcess,
		layoutTab: LayoutTab
	}

	let { sm }: { sm: State } = $props()
	let Component = $state()

	setContext(ContextKey.stateManager, sm)

	let currTab: AppLevelTab | undefined
	let dataObj: DataObj | undefined
	let dataObjData: DataObjData | undefined
	let keyValue: boolean = $state(false)
	let parms: DataRecord = $state({})

	$effect(() => {
		if (sm.consumeTriggerToken(StateTriggerToken.componentContentCustom)) {
			parms = { component: sm.componentContent }
			setComponent()
		}

		if (sm.consumeTriggerToken(StateTriggerToken.componentContentForm)) {
			const clazz = `${FILENAME}.updateObjectsForm`
			currTab = sm.app.getCurrTab()
			if (currTab && currTab.dataObj) {
				sm.dm.init(currTab.dataObj)
				currTab.dataObj.fields
					.filter((f) => f.classType === FieldClassType.embed)
					.forEach((f: FieldEmbed) => {
						sm.dm.nodeAdd(required(f.dataObjEmbed, clazz, 'f.dataObjEmbed'))
					})
				parms = { dataObjId: currTab.dataObj.raw.id, component: currTab.dataObj.raw.codeComponent }
				setComponent()
			}
		}
	})

	function setComponent() {
		// if (!sm.componentLayout) sm.componentLayout = StateComponentLayout.layoutContent
		Component = componentsLayout[sm.componentLayout]
		console.log('RootLayoutApp.svelte', Component)
		keyValue = !keyValue
	}
</script>

{#if Component}
	RootLayoutApp

	<div class="h-full max-h-full w-full">
		{#key keyValue}
			<Component {parms} />
		{/key}
	</div>
{/if}
