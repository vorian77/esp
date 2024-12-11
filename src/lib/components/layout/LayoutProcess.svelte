<script lang="ts">
	import type { State } from '$comps/app/types.appState'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/layout/LayoutProcess.svelte'

	export let state: State
</script>

<!-- <DataViewer header="objChanged" data={state?.objHasChanged} /> -->
{#if state?.props?.dataObj && state?.props?.dataObjData}
	<div class="mt-4">
		<LayoutContent bind:state on:formCancelled />
	</div>
{/if}
