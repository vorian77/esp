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
	import LayoutDashboard from '$comps/layout/layoutDash/LayoutDashboard.svelte'
	import LayoutProcess from '$comps/layout/LayoutProcess.svelte'
	import LayoutTab from '$comps/layout/LayoutTab.svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/layout/RootLayoutApp.svelte'

	const componentsLayout: Record<StateComponentLayout, any> = {
		layoutApp: LayoutApp,
		layoutContent: LayoutContent,
		layoutDashboard: LayoutDashboard,
		layoutProcess: LayoutProcess,
		layoutTab: LayoutTab
	}

	let { sm }: { sm: State } = $props()
	let navLayout: StateComponentLayout = $derived(sm.navLayout)
	let navLayoutParms: DataRecord = $derived(sm.navLayoutParms)
	let Component = $state()

	setContext(ContextKey.stateManager, sm)

	let currTab: AppLevelTab | undefined
	let dataObj: DataObj | undefined
	let dataObjData: DataObjData | undefined
	let keyValue: boolean = $state(false)
	let parms: DataRecord = $state({})

	const setParms = (newParms: DataRecord) => {
		parms = newParms
	}

	$effect(() => {
		if (sm.consumeTriggerToken(StateTriggerToken.navLayout)) {
			Component = componentsLayout[navLayout]
			if (sm.consumeTriggerToken(StateTriggerToken.navLayoutParms)) {
				setParms(navLayoutParms)
			}
			keyValue = !keyValue
		}
	})

	$effect(() => {
		if (sm.consumeTriggerToken(StateTriggerToken.navLayoutParms)) {
			setParms(navLayoutParms)
			keyValue = !keyValue
		}
	})

	function setComponent() {
		Component = componentsLayout[sm.componentLayout]
		keyValue = !keyValue
	}
</script>

{#if Component}
	<div class="h-full max-h-full w-full">
		{#key keyValue}
			<Component {parms} />
		{/key}
	</div>
{/if}
