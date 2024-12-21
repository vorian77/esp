<script lang="ts">
	import { State } from '$comps/app/types.appState.svelte'
	import { ContextKey, type DataRecord, ParmsValuesType, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { PropSortDir } from '$comps/dataObj/types.rawDataObj'
	import Grid from '$comps/grid/Grid.svelte'
	import { getSelectedNodeIds, GridManagerOptions } from '$comps/grid/grid'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/selectMulti/GridSelect.svelte'

	let { parms }: DataRecord = $props()
	let stateApp: State = required(getContext(ContextKey.stateApp), FILENAME, 'stateApp')

	let gridApi: GridApi = $state()
	let idColumn = $derived(stateApp.parmsState.valueGet(ParmsValuesType.gridColumnId))

	let gridOptions = $state(
		new GridManagerOptions({
			columnDefs: stateApp.parmsState.valueGet(ParmsValuesType.columnDefs),
			idColumn,
			isSelect: true,
			isSelectMulti: stateApp.parmsState.valueGet(ParmsValuesType.isMultiSelect),
			onSelectionChanged,
			parmStateSelectedIds: stateApp.parmsState.valueGet(ParmsValuesType.listIdsSelected),
			rowData: stateApp.parmsState.valueGet(ParmsValuesType.rowData),
			sortModel: stateApp.parmsState.valueGet(ParmsValuesType.listSortModel)
		})
	)

	function onSelectionChanged(event: SelectionChangedEvent) {
		stateApp.parmsState.valueSet(
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
