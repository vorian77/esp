<script lang="ts">
	import { onMount } from 'svelte'
	import {
		createGrid,
		type CellClickedEvent,
		type CellEditingStartedEvent,
		type CellEditingStoppedEvent,
		type ColDef,
		type FilterChangedEvent,
		type GetRowIdParams,
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
	import { columnTypes, dataTypeDefinitions, GridManagerOptions } from '$comps/grid/grid'
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
		TokenAppModalSelect,
		TokenAppModalReturnType
	} from '$utils/types.token'
	import { ParmsValues } from '$utils/types'
	import { PropDataType } from '$comps/dataObj/types.rawDataObj'
	import { FieldAccess, FieldColor, FieldElement } from '$comps/form/field'
	import { State, StateSurfaceModal } from '$comps/app/types.appState'
	import { sortInit, sort } from '$comps/form/formList'
	import GridFilter from '$comps/grid/GridFilter.svelte'
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
	let innerHeight = window.innterHeight
	let isEmbed: boolean
	let isHideFilter = false
	let isSelect = false
	let isSelectMulti = false
	let isSuppressSelect: boolean
	let listFilterText = ''
	let listReorderColumn: string
	let rowCountFiltered: number
	let rowCountSelected: number
	let rowData: any[]
	let style = ''
	let styleMaxHeight = ''

	$: if (eGui) {
		const rowCount = grid.getDisplayedRowCount()
		const { headerHeight, rowHeight } = grid.getSizesForCurrentTheme()
		const rowsMin = 3
		let rowsMax: number
		let rowsDisplay: number

		if (isEmbed) {
			rowsMax = 8
			rowsDisplay = rowCount < rowsMin ? rowsMin : rowCount > rowsMax ? rowsMax : rowCount
		} else {
			// const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
			const vh = innerHeight
			const gridY = eGui.getBoundingClientRect().y
			const footerH = 100
			rowsMax = Math.floor(((vh - gridY - footerH) * 0.85) / rowHeight)
			rowsDisplay = rowCount < rowsMin ? rowsMin : rowCount > rowsMax ? rowsMax : rowCount
		}
		const height = headerHeight + rowsDisplay * rowHeight + 9
		eGui.style.setProperty('height', `${height}px`)
	}

	function onCellValueChanged(event: NewValueParams) {
		if (fCallbackUpdateValue) fCallbackUpdateValue(event.colDef.field, event.data)
	}

	onMount(() => {
		// set options
		columnDefs = options.columnDefs
		fCallbackFilter = options.fCallbackFilter
		fCallbackUpdateValue = options.fCallbackUpdateValue
		isEmbed = options.isEmbed
		isHideFilter = options.isHideFilter || options.listReorderColumn !== ''
		isSelect = options.isSelect
		isSelectMulti = options.isSelectMulti
		isSuppressSelect = options.isSuppressSelect
		listFilterText = options.listFilterText
		listReorderColumn = options.listReorderColumn
		rowData = options.rowData

		if (isSelect) {
			columnDefs.unshift({
				checkboxSelection: true,
				headerCheckboxSelection: isSelectMulti,
				headerName: '',
				field: 'selected',
				maxWidth: 50,
				suppressMovable: true
			})
		}

		// derived columnDefs changes
		setGridColumnsProp(columnDefs, '', 'rowDrag', listReorderColumn ? true : false)
		styleMaxHeight = isHideFilter ? '100%' : 'calc(100% - 70px)'

		const gridOptions = {
			columnDefs,
			columnTypes,
			dataTypeDefinitions,
			defaultColDef: {
				flex: 1,
				sortable: !listReorderColumn
			},
			getRowId: (params: GetRowIdParams) => params.data.id || '',
			onCellClicked: options.onCellClicked,
			onCellValueChanged,
			onRowDragEnd,
			onRowDragMove,
			onSelectionChanged,
			rowData,
			rowSelection: isSuppressSelect
				? undefined
				: isSelect && isSelectMulti
					? 'multiple'
					: 'single',
			rowDragManaged: listReorderColumn ? true : false
			// stopEditingWhenCellsLoseFocus: false
		}
		grid = createGrid(eGui, gridOptions)

		if (isSelect) {
			if (isSelectMulti) {
				const selected: IRowNode[] = []
				const deselected: IRowNode[] = []
				grid.forEachNode((node) => {
					if (options.listRecordIdSelected.includes(node.data!.id)) {
						selected.push(node)
					} else {
						deselected.push(node)
					}
				})
				grid.setNodesSelected({ nodes: selected, newValue: true })
				grid.setNodesSelected({ nodes: deselected, newValue: false })
			} else {
				const selected = grid.getRowNode(options.listRecordIdSelected[0])
				if (selected) selected.setSelected(true)
			}
		}

		setFilter(listFilterText)

		return () => {
			grid.destroy()
		}
	})

	function onRowDragEnd(event: RowDragEndEvent) {
		if (fCallbackUpdateValue) {
			rowData.forEach((row, idx) => {
				fCallbackUpdateValue(listReorderColumn, { id: row.id, [listReorderColumn]: idx })
			})
		}
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
			grid.clearFocusedCell()
		}

		function moveInArray(arr: any[], fromIndex: number, toIndex: number) {
			let element = arr[fromIndex]
			arr.splice(fromIndex, 1)
			arr.splice(toIndex, 0, element)
		}
	}

	function onSelectionChanged(event: SelectionChangedEvent) {
		if (options.onSelectionChanged) options.onSelectionChanged(event)
		updateCounters()
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
		setFilterQuick(listFilterText)
		setFilterDeselect()
		updateCounters()
		if (fCallbackFilter) fCallbackFilter(grid, listFilterText)
	}
	function setFilterDeselect() {
		// deselect rows that are not displayed
		const deselected: IRowNode[] = []
		grid.forEachNode((rowNode, index) => {
			if (rowNode.selected && !rowNode.displayed) {
				deselected.push(rowNode)
			}
		})
		grid.setNodesSelected({ nodes: deselected, newValue: false })
	}
	function setFilterQuick(listFilterText: string) {
		grid.setGridOption('quickFilterText', listFilterText)
	}

	function updateCounters() {
		rowCountFiltered = grid.getDisplayedRowCount()
		if (options.isSelect) rowCountSelected = grid.getSelectedNodes().length
	}
</script>

<svelte:window bind:innerHeight />
<GridFilter {isHideFilter} {listFilterText} {rowCountFiltered} {rowCountSelected} {setFilter} />
<div bind:this={eGui} style:max-height={styleMaxHeight} {style} class="ag-theme-quartz h-full" />

<!-- <DataViewer header="rowCount" data={{ rowCountFiltered, rowCountSelected }} /> -->
<!-- <DataViewer header="columnDefs" data={columnDefs} /> -->
<!-- <DataViewer header="rowData" data={rowData} /> -->
