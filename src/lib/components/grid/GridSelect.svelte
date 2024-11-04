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

	const columnDefs = [
		{ field: 'data', headerName: 'Data', hide: false },
		{ field: 'display', headerName: 'Display', flex: 1 }
	]

	const sortObj = new DataObjSort()
	sortObj.addItem('display', PropSortDir.asc, 0)

	const gridOptions = new GridManagerOptions({
		columnDefs,
		idColumn: state.parmsState.valueGet(ParmsValuesType.modalSelectIdField),
		isSelect: true,
		isSelectMulti: state.parmsState.valueGet(ParmsValuesType.isMultiSelect),
		onSelectionChanged,
		parmPrefSortModel: sortObj,
		parmStateSelectedIds: state.parmsState.valueGet(ParmsValuesType.listRecordIdSelected),
		rowData: state.parmsState.valueGet(ParmsValuesType.listRecordItems)
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
