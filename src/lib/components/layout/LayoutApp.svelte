<script lang="ts">
	import { State } from '$comps/app/types.appState'
	import type { DataObj, DataObjData } from '$utils/types'
	import LayoutTab from '$comps/layout/LayoutTab.svelte'
	import NavApp from '$comps/nav/NavApp.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/layout/LayoutApp.svelte'

	export let state: State
	export let component: string
	export let dataObj: DataObj
	export let dataObjData: DataObjData

	let currLevel: AppLevel | undefined

	$: currLevel = state.app.getCurrLevel()
</script>

<div id="layout-app" class="flex flex-col h-full max-h-full">
	<NavApp {state} />

	{#if currLevel}
		<LayoutTab bind:state {component} {dataObj} {dataObjData} on:formCancelled />
	{/if}
</div>
