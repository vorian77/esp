<script lang="ts">
	import { State } from '$comps/app/types.appState'
	import { DataObj, DataObjData, ParmsValuesType } from '$utils/types'
	import Grid from '$comps/grid/Grid.svelte'
	import { GridManagerOptions } from '$comps/grid/grid'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/selectMulti/GridSelecttMulti.svelte'

	export let state: State
	export let component: string
	export let dataObj: DataObj | undefined = undefined
	export let dataObjData: DataObjData | undefined = undefined

	const columnDefs = [
		{ field: 'id', headerName: 'ID', hide: false },
		{ field: 'display', headerName: 'Display' }
	]

	const items = state.parmsState.valueGet(ParmsValuesType.listRecordItems)
	let itemsCurrent = state.parmsState.valueGet(ParmsValuesType.listRecordIdSelected)

	const gridOptions = new GridManagerOptions({
		columnDefs,
		isListHideFilter: false,
		isSelect: true,
		isSelectMulti: true,
		listRecordIdSelected: itemsCurrent,
		onSelectionChanged,
		rowData: items
	})

	function onSelectionChanged(event: SelectionChangedEvent) {
		const selectedNodes = event.api.getSelectedNodes()
		state.parmsState.valueSet(
			ParmsValuesType.listRecordIdSelected,
			selectedNodes.map((node) => node.data.id)
		)
	}
</script>

<div class="h-[60vh]">
	{#if gridOptions}
		<Grid options={gridOptions} />
	{/if}
</div>

<!-- <DataViewer header="rowData" data={rowData} /> -->
