<script lang="ts">
	import { type DataRecord } from '$utils/types'
	import LayoutTab from '$comps/layout/LayoutTab.svelte'
	import NavApp from '$comps/nav/NavApp.svelte'
	import DataViewer from '$utils/DataViewer.svelte'
	let { parms }: DataRecord = $props()
</script>

<div id="layout-app" class="flex flex-col h-full max-h-full">
	<NavApp />
	<LayoutTab {parms} />
</div>
