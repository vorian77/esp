<script lang="ts">
	import { State } from '$comps/app/types.appState'
	import { DataObj, DataObjData, ParmsValuesType } from '$utils/types'
	import Grid from '$comps/grid/Grid.svelte'
	import { getSelectedNodeIds, GridManagerOptions } from '$comps/grid/grid'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/selectMulti/GridSelect.svelte'

	export let state: State
	export let component: string
	export let dataObj: DataObj | undefined = undefined
	export let dataObjData: DataObjData | undefined = undefined

	const columnDefs = [
		{ field: 'id', headerName: 'ID', hide: true },
		{ field: 'display', headerName: 'Display' }
	]

	const isMultiSelect = state.parmsState.valueGet(ParmsValuesType.isMultiSelect)
	const items = state.parmsState.valueGet(ParmsValuesType.listRecordItems)
	let itemsCurrent = state.parmsState.valueGet(ParmsValuesType.listRecordIdSelected)

	const gridOptions = new GridManagerOptions({
		columnDefs,
		isSelect: true,
		isSelectMulti: isMultiSelect,
		listRecordIdSelected: itemsCurrent,
		onSelectionChanged,
		rowData: items
	})

	function onSelectionChanged(event: SelectionChangedEvent) {
		state.parmsState.valueSet(ParmsValuesType.listRecordIdSelected, getSelectedNodeIds(event.api))
	}
</script>

<div class="h-[60vh]">
	{#if gridOptions}
		<Grid options={gridOptions} />
	{/if}
</div>

<!-- <DataViewer header="rowData" data={rowData} /> -->
