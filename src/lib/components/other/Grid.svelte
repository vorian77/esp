<script lang="ts">
	import { onMount } from 'svelte'
	import {
		ComponentUtil,
		createGrid,
		type CellClickedEvent,
		type CellEditingStartedEvent,
		type ColDef,
		type FilterChangedEvent,
		type GridApi,
		type GridOptions,
		type GridParams,
		type GridReadyEvent,
		type IRowNode,
		type ISelectCellEditorParams,
		type Module,
		type NewValueParams,
		type RowNode,
		type RowNodeSelectedEvent,
		type SelectionChangedEvent,
		type ValueGetterParams,
		type ValueSetterParams
	} from 'ag-grid-community'
	import 'ag-grid-community/styles/ag-grid.css'
	import 'ag-grid-community/styles/ag-theme-quartz.css'
	import { GridManagerOptions } from '$comps/other/grid'
	import {
		DataObj,
		DataObjData,
		DataObjEmbedType,
		DataObjMode,
		DataObjSort,
		DataObjSortItem,
		ParmsValuesType,
		ParmsUser,
		ParmsUserParmType,
		required,
		strRequired
	} from '$utils/types'
	import { StatePacket, StatePacketAction } from '$comps/app/types.appState'
	import {
		TokenAppDoActionConfirmType,
		TokenAppModalMultiSelect,
		TokenAppModalReturnType
	} from '$utils/types.token'
	import { ParmsValues } from '$utils/types'
	import { PropDataType } from '$comps/dataObj/types.rawDataObj'
	import { FieldAccess, FieldColor, FieldElement } from '$comps/form/field'
	import { State, StateSurfaceModal, StateLayoutStyle } from '$comps/app/types.appState'
	import { sortInit, sort } from '$comps/form/formList'
	import GridFilter from '$comps/other/GridFilter.svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/other/ListBox.svelte'

	export let options: GridOptions

	let columnDefs: ColDef[]
	let dataObjId = ''
	let eGui: HTMLDivElement
	let fCallbackFilter: Function
	let fCallbackUpdateValue: Function
	let grid: GridApi
	let isListHideFilter = false
	let isSelect = false
	let isSelectMulti = false
	let listFilterText = ''
	let listReorderColumn: string
	let rowCountFiltered: number
	let rowData: any[]
	let style = ''

	function onCellValueChanged(event: NewValueParams) {
		const recordId = event.data.id
		const fieldName = event.colDef.field
		const newVal = event.data[fieldName]
		fCallbackUpdateValue(recordId, fieldName, newVal)
	}

	onMount(() => {
		console.log('Grid.onMount:', { options })
		// set options
		columnDefs = options.columnDefs
		fCallbackFilter = options.fCallbackFilter
		fCallbackUpdateValue = options.fCallbackUpdateValue
		isListHideFilter = options.isListHideFilter
		isSelect = options.isSelect
		isSelectMulti = options.isSelectMulti
		listFilterText = options.listFilterText
		listReorderColumn = options.listReorderColumn
		setGridColumnsProp(columnDefs, '', 'rowDrag', listReorderColumn ? true : false)
		rowData = options.rowData

		const gridOptions = {
			columnDefs,
			defaultColDef: {
				flex: 1
			},
			onCellClicked: options.onCellClicked,
			onCellValueChanged,
			onRowDragEnd,
			onRowDragMove,
			onSelectionChanged: options.onSelectionChanged,
			rowData,
			rowSelection: isSelect && isSelectMulti ? 'multiple' : 'single',
			rowDragManaged: options.listReorderColumn ? true : false
		}
		grid = createGrid(eGui, gridOptions)

		// set data
		grid.setGridOption('columnDefs', columnDefs)
		grid.setGridOption('rowData', rowData)
		setFilter(listFilterText)

		return () => {
			grid.destroy()
		}
	})

	function onRowDragEnd(event: RowDragEndEvent) {
		rowData.forEach((row, idx) => {
			row[listReorderColumn] = idx
			fCallbackUpdateValue(row.id, listReorderColumn, idx)
		})
		grid?.setGridOption('rowData', rowData)
	}

	function onRowDragMove(event: RowDragMoveEvent) {
		let movingNode = event.node
		let overNode = event.overNode
		let rowNeedsToMove = movingNode !== overNode

		if (rowNeedsToMove) {
			let movingData = movingNode.data
			let overData = overNode!.data

			let fromIndex = rowData.indexOf(movingData)
			let toIndex = rowData.indexOf(overData)

			let newStore = rowData.slice()
			moveInArray(newStore, fromIndex, toIndex)

			rowData = newStore
			grid?.clearFocusedCell()
		}

		function moveInArray(arr: any[], fromIndex: number, toIndex: number) {
			let element = arr[fromIndex]
			arr.splice(fromIndex, 1)
			arr.splice(toIndex, 0, element)
		}
	}

	function setGridColumnsProp(
		columns: Record<number | string, any>[],
		field: string,
		prop: string,
		value: any
	) {
		let columnIdx: number
		if (field === '') {
			// first visible field
			columnIdx = columns.findIndex((c) => c.hide === false)
		} else {
			columnIdx = columns.findIndex((c) => c.field === field)
		}
		if (columnIdx > -1) {
			columns[columnIdx][prop] = value
		}
	}
	function setFilter(listFilterText: string) {
		grid.setGridOption('quickFilterText', listFilterText)
		rowCountFiltered = grid.getDisplayedRowCount()
		if (fCallbackFilter) fCallbackFilter(listFilterText)
	}
</script>

<GridFilter
	{isListHideFilter}
	{isSelect}
	{listFilterText}
	{rowCountFiltered}
	{rowData}
	{setFilter}
/>
<div bind:this={eGui} {style} class="ag-theme-quartz h-full" />
<!-- style:height="100%" -->

<DataViewer header="rowData" data={rowData} />
