<script lang="ts">
	import { State } from '$comps/app/types.state.svelte'
	import { ContextKey, type DataRecord, ParmsValuesType, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { PropSortDir } from '$comps/dataObj/types.rawDataObj.svelte'
	import Grid from '$comps/grid/Grid.svelte'
	import { getSelectedNodeIds, GridManagerOptions } from '$comps/grid/grid'
	import { TokenAppModalSelect } from '$utils/types.token'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/selectMulti/GridSelect.svelte'

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let token: TokenAppModalSelect = $derived(
		sm.parmsState.valueGet(ParmsValuesType.tokenAppModalSelect)
	)
	let gridApi: GridApi = $state()
	let gridOptions = $state(
		new GridManagerOptions({
			columnDefs: token.columnDefs,
			isPopup: true,
			isSelectMulti: token.isMultiSelect,
			onSelectionChanged,
			rowData: token.rowData,
			sortModel: token.sortModel
		})
	)

	function onSelectionChanged(event: SelectionChangedEvent) {
		sm.parmsState.valueSet(ParmsValuesType.listIdsSelected, getSelectedNodeIds(event.api, 'id'))
	}
</script>

{#if gridOptions}
	<Grid bind:api={gridApi} options={gridOptions} />
{/if}
