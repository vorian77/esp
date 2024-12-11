<script lang="ts">
	import { State } from '$comps/app/types.appState'
	import { ParmsValuesType } from '$utils/types'
	import { PropSortDir } from '$comps/dataObj/types.rawDataObj'
	import Grid from '$comps/grid/Grid.svelte'
	import { getSelectedNodeIds, GridManagerOptions } from '$comps/grid/grid'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/selectMulti/GridSelect.svelte'

	export let state: State

	let gridApi: GridApi
	let gridOptions: GridManagerOptions
	let idColumn = state.parmsState.valueGet(ParmsValuesType.gridColumnId)

	gridOptions = new GridManagerOptions({
		columnDefs: state.parmsState.valueGet(ParmsValuesType.columnDefs),
		idColumn,
		isSelect: true,
		isSelectMulti: state.parmsState.valueGet(ParmsValuesType.isMultiSelect),
		onSelectionChanged,
		parmStateSelectedIds: state.parmsState.valueGet(ParmsValuesType.listIdsSelected),
		rowData: state.parmsState.valueGet(ParmsValuesType.rowData),
		sortModel: state.parmsState.valueGet(ParmsValuesType.listSortModel)
	})

	function onSelectionChanged(event: SelectionChangedEvent) {
		state.parmsState.valueSet(
			ParmsValuesType.listIdsSelected,
			getSelectedNodeIds(event.api, idColumn)
		)
	}
</script>

<div class="h-[60vh]">
	{#if gridOptions}
		<Grid bind:api={gridApi} options={gridOptions} />
	{/if}
</div>

<!-- <DataViewer header="rowData" data={rowData} /> -->
