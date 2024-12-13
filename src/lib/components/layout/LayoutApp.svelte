<script lang="ts">
	import { StateProps } from '$comps/app/types.appState.svelte'
	import LayoutTab from '$comps/layout/LayoutTab.svelte'
	import NavApp from '$comps/nav/NavApp.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/layout/LayoutApp.svelte'

	let { stateProps = $bindable() }: StateProps = $props()
</script>

<div id="layout-app" class="flex flex-col h-full max-h-full">
	<NavApp bind:stateProps />
	<LayoutTab bind:stateProps on:formCancelled />
</div>
