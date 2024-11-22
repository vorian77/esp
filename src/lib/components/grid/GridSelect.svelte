<script lang="ts">
	import { State } from '$comps/app/types.appState'
	import { DataObj, DataObjData, DataObjSort, ParmsValuesType } from '$utils/types'
	import { PropSortDir } from '$comps/dataObj/types.rawDataObj'
	import Grid from '$comps/grid/Grid.svelte'
	import { getSelectedNodeIds, GridManagerOptions } from '$comps/grid/grid'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/selectMulti/GridSelect.svelte'

	export let state: State
	export let component: string
	export let dataObj: DataObj | undefined = undefined
	export let dataObjData: DataObjData | undefined = undefined

	let gridApi: GridApi
	let gridOptions: GridManagerOptions

	const fieldId = state.parmsState.valueGet(ParmsValuesType.listItemsFieldId)
	const fieldDisplayName = state.parmsState.valueGet(ParmsValuesType.listItemsFieldDisplay)
	const fieldDisplayHeader = state.parmsState.valueGet(ParmsValuesType.listLabel)

	const columnDefs = [
		{ field: fieldId, headerName: 'Data', hide: true },
		{ field: fieldDisplayName, headerName: fieldDisplayHeader, flex: 1 }
	]

	const sortObj = new DataObjSort()
	sortObj.addItem('display', PropSortDir.asc, 0)

	gridOptions = new GridManagerOptions({
		columnDefs,
		idColumn: fieldId,
		isSelect: true,
		isSelectMulti: state.parmsState.valueGet(ParmsValuesType.isMultiSelect),
		onSelectionChanged,
		parmPrefSortModel: sortObj,
		parmStateSelectedIds: state.parmsState.valueGet(ParmsValuesType.listIdsSelected),
		rowData: state.parmsState.valueGet(ParmsValuesType.rowData)
	})

	function onSelectionChanged(event: SelectionChangedEvent) {
		state.parmsState.valueSet(ParmsValuesType.listIdsSelected, getSelectedNodeIds(event.api))
	}
</script>

<div class="h-[60vh]">
	{#if gridOptions}
		<Grid bind:api={gridApi} options={gridOptions} />
	{/if}
</div>

<!-- <DataViewer header="rowData" data={rowData} /> -->
