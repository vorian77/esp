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
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')

	let gridApi: GridApi = $state()
	let idColumn = $derived(sm.parmsState.valueGet(ParmsValuesType.gridColumnId))

	let gridOptions = $state(
		new GridManagerOptions({
			columnDefs: sm.parmsState.valueGet(ParmsValuesType.columnDefs),
			idColumn,
			isSelect: true,
			isSelectMulti: sm.parmsState.valueGet(ParmsValuesType.isMultiSelect),
			onSelectionChanged,
			parmStateSelectedIds: sm.parmsState.valueGet(ParmsValuesType.listIdsSelected),
			rowData: sm.parmsState.valueGet(ParmsValuesType.rowData),
			sortModel: sm.parmsState.valueGet(ParmsValuesType.listSortModel)
		})
	)

	function onSelectionChanged(event: SelectionChangedEvent) {
		sm.parmsState.valueSet(ParmsValuesType.listIdsSelected, getSelectedNodeIds(event.api, idColumn))
	}
</script>

{#if gridOptions}
	<Grid bind:api={gridApi} options={gridOptions} />
{/if}
