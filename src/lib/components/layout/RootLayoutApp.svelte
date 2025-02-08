<script lang="ts">
	import { State, StateNavLayout } from '$comps/app/types.appState.svelte'
	import { ContextKey } from '$utils/types'
	import { setContext } from 'svelte'
	import LayoutApp from '$comps/layout/LayoutApp.svelte'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'
	import LayoutDashboard from '$comps/layout/layoutDash/LayoutDashboard.svelte'
	import LayoutProcess from '$comps/layout/LayoutProcess.svelte'
	import LayoutTab from '$comps/layout/LayoutTab.svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/layout/RootLayoutApp.svelte'

	const componentsLayout: Record<StateNavLayout, any> = {
		layoutApp: LayoutApp,
		layoutContent: LayoutContent,
		layoutDashboard: LayoutDashboard,
		layoutProcess: LayoutProcess,
		layoutTab: LayoutTab
	}

	let { sm }: { sm: State } = $props()
	setContext(ContextKey.stateManager, sm)
	let Component = $derived(componentsLayout[sm.navLayout])
</script>

{#if Component}
	<div class="h-full max-h-full w-full">
		{#key sm.navLayoutParms}
			<Component parms={sm.navLayoutParms} />
		{/key}
	</div>
{/if}
