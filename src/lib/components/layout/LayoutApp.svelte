<script lang="ts">
	import { type DataRecord } from '$utils/types'
	import LayoutTab from '$comps/layout/LayoutTab.svelte'
	import NavApp from '$comps/nav/NavApp.svelte'
	import DataViewer from '$utils/DataViewer.svelte'
	let { parms }: DataRecord = $props()
</script>

<div id="layout-app" class="h-full max-h-full flex flex-col">
	<NavApp />
	<LayoutTab {parms} />
</div>
