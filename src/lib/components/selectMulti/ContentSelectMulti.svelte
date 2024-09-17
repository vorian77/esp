<script lang="ts">
	import { State } from '$comps/app/types.appState'
	import { DataObj, DataObjData } from '$utils/types'
	import Grid from '$comps/other/Grid.svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	export let state: State
	export let component: string
	export let dataObj: DataObj | undefined = undefined
	export let dataObjData: DataObjData | undefined = undefined

	const columnDefs = [
		{ field: 'make' },
		{ field: 'model' },
		{ field: 'price' },
		{ field: 'electric' },
		{ field: 'orderDisplay' }
	]

	let rowData = [
		{ make: 'Tesla', model: 'Model Y', price: 64950, electric: true, orderDisplay: 0 },
		{ make: 'Ford', model: 'F-Series', price: 33850, electric: false, orderDisplay: 1 },
		{ make: 'Toyota', model: 'Corolla', price: 29600, electric: false, orderDisplay: 2 }
	]

	console.log('ContentSelectMulti.state', state)
</script>

<div class="h-[60vh] border-1 flex flex-row">
	<div class="h-full w-2/5 flex flex-col">
		<h1>Available Values</h1>
		<div class="h-full border-2 bg-blue-200">
			<!-- <Grid bind:rowData {columnDefs} listReorderColumn={'orderDisplay'} /> -->
		</div>
	</div>
	<div class="w-1/5 border-1">
		<div class="flex flex-col h-full">
			<div class="h-full grid content-center justify-center gap-6">
				<button class="btn variant-filled-primary">Add &gt;</button>
				<button class="btn variant-filled-primary">Add All &gt;</button>
				<button class="btn variant-filled-primary mt-10">&lt; Remove</button>
				<button class="btn variant-filled-primary">&lt; Remove All</button>
			</div>
		</div>
	</div>
	<div class="h-full w-2/5 flex flex-col">
		<h1>Selected Values</h1>
		<div class="h-full border-2 bg-blue-200"></div>
	</div>
</div>

<!-- <DataViewer header="rowData" data={rowData} /> -->
