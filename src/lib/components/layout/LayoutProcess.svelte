<script lang="ts">
	import type { State } from '$comps/app/types.appState'
	import type { DataObj, DataObjData } from '$utils/types'
	import LayoutContent from '$comps/layout/LayoutContent.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/Surface/LayoutProcess.svelte'

	export let state: State
	export let dataObj: DataObj
	export let dataObjData: DataObjData
</script>

<!-- <DataViewer header="objChanged" data={state?.objHasChanged} /> -->
{#if dataObj && dataObjData}
	<div class="mt-4">
		<LayoutContent bind:state {dataObj} {dataObjData} on:formCancelled />
	</div>
{/if}
