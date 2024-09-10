<script lang="ts">
	import {
		ComponentUtil,
		createGrid,
		type ColDef,
		type GridApi,
		type GridOptions,
		type GridParams,
		type GridReadyEvent,
		type IRowNode,
		type ISelectCellEditorParams,
		type Module,
		type NewValueParams,
		type RowNode,
		type RowSelectedEvent,
		type SelectionChangedEvent
	} from 'ag-grid-community'
	import 'ag-grid-community/styles/ag-grid.css'
	import 'ag-grid-community/styles/ag-theme-quartz.css'
	import {
		DataObj,
		DataObjData,
		DataObjEmbedType,
		DataObjMode,
		DataObjSort,
		DataObjSortItem,
		ParmsObjType,
		ParmsUser,
		ParmsUserParmType,
		required,
		strRequired
	} from '$utils/types'
	import { State, StateSurfaceModal, StateLayoutStyle } from '$comps/app/types.appState'
	import { recordsSearch, sortInit, sortUser } from '$comps/form/formList'
	import FormListSearch from '$comps/form/FormListSearch.svelte'
	import { onMount } from 'svelte'
	import { defineCodecGeneratorTuple } from 'edgedb/dist/reflection'

	export let state: State
	export let dataObj: DataObj
	export let dataObjData: DataObjData

	let dataRows: any[] = []
	let fieldsDisplayable: Field[] = []
	let eGui: HTMLDivElement
	let grid: GridApi
	let isActiveSort = false
	let isActiveFilter = false
	let isMounted = false
	let isSelect =
		state instanceof StateSurfaceModal && state.layoutStyle === StateLayoutStyle.overlayModalSelect
	let isSelectMulti = state instanceof StateSurfaceModal
	let listSearchText = ''
	let listSortObj: DataObjSort
	let style = ''

	let tempIsListEdit = true

	$: load(dataObjData)

	function load(data) {
		if (!dataObj.isListEmbed) dataObj.objData = data

		listSearchText = state.parmsUser.parmGet(dataObj.raw.id, ParmsUserParmType.listSearchText) || ''
		listSortObj =
			state.parmsUser.parmGet(dataObj.raw.id, ParmsUserParmType.listSortObj) || new DataObjSort()

		if (dataObj.raw.isListEdit) {
			const presetRows = dataObj.data.rowsRetrieved
				.getRows()
				.filter((row) => row.record.id.startsWith('preset_'))
			presetRows.forEach((row) => {
				dataObj.dataFieldsChanged.valueSet(row.record.id + '_new', 'id', true)
			})
		}

		if (!dataObj.isListEmbed) {
			state.setDataObjState(dataObj)
			state = state.setStatus()
		}

		if (isMounted) setGrid()
	}

	onMount(() => {
		const gridOptions = {
			columnDefs: null,
			defaultColDef: {
				flex: 1
			},
			getRowId: (params) => params.data.id,
			onFilterChanged,
			onRowDragEnd,
			onRowDragMove,
			onRowSelected,
			onSortChanged,
			rowData: null,
			rowDragManaged: dataObj.raw.listReorderColumn ? true : false,
			rowSelection: isSelect && isSelectMulti ? 'multiple' : 'single'
		}
		grid = createGrid(eGui, gridOptions)
		setGrid()
		isMounted = true

		return () => {
			grid.destroy()
		}
	})

	function onFilterChanged() {
		isActiveFilter = grid.isAnyFilterPresent()
		// suppress row drag if either sort or filter is active
		let suppressRowDrag = sortActive || filterActive
		console.log(
			'grid.sortActive = ' +
				isActiveSort +
				', filterActive = ' +
				isActiveFilter +
				', allowRowDrag = ' +
				suppressRowDrag
		)
		grid.setGridOption('suppressRowDrag', suppressRowDrag)
	}

	function onRowDragEnd(event: RowDragMoveEvent) {
		if (dataObj.raw.listReorderColumn) {
			const listReorderColumn = dataObj.raw.listReorderColumn
			const field = dataObj.fields.find((f) => f.colDO.propName === listReorderColumn)
			if (field) {
				dataObj.dataRecordsDisplay.forEach((record: DataRecord, rowOld) => {
					const id = record.id
					const rowNew = dataRows.findIndex((r) => r.id === id)
					if (rowNew > -1) dataObj = dataObj.setFieldVal(rowOld, field, rowNew)
				})
				state = state.setStatus()
			}
		}
	}

	function onRowDragMove(event: RowDragMoveEvent) {
		let movingNode = event.node
		let overNode = event.overNode
		let rowNeedsToMove = movingNode !== overNode

		if (rowNeedsToMove) {
			// the list of rows we have is data, not row nodes, so extract the data
			let movingData = movingNode.data
			let overData = overNode!.data

			let fromIndex = dataRows.indexOf(movingData)
			let toIndex = dataRows.indexOf(overData)

			let newStore = dataRows.slice()
			moveInArray(newStore, fromIndex, toIndex)

			dataRows = newStore
			grid.setGridOption('rowData', newStore)

			grid.clearFocusedCell()
		}

		function moveInArray(arr: any[], fromIndex: number, toIndex: number) {
			let element = arr[fromIndex]
			arr.splice(fromIndex, 1)
			arr.splice(toIndex, 0, element)
		}
	}

	async function onRowSelected(event: RowSelectedEvent) {
		if (dataObj.actionsFieldListRowActionIdx < 0 || dataObj.raw.is || tempIsListEdit) {
			return
		} else if (isSelect) {
			const selectedNodes = event.api.getSelectedNodes()
			state.parmsState.valueSet(
				ParmsObjType.listRecordIdSelected,
				selectedNodes.map((node) => node.data.id)
			)
		} else {
			const record = grid.getSelectedRows()[0]
			if (record) {
				const action = dataObj.actionsField[dataObj.actionsFieldListRowActionIdx]
				dataObj.data.parmsState.valueSet(ParmsObjType.listRecordIdCurrent, record.id)
				action.trigger(state, dataObj)
			}
		}
	}

	function onSortChanged() {
		let colState = grid.getColumnState() || []
		isActiveSort = colState.some((c) => c.sort)
		// suppress row drag if either sort or filter is active
		let suppressRowDrag = sortActive || filterActive
		console.log(
			'grid.sortActive = ' +
				isActiveSort +
				', filterActive = ' +
				isActiveFilter +
				', allowRowDrag = ' +
				suppressRowDrag
		)
		grid.setGridOption('suppressRowDrag', suppressRowDrag)
	}

	function setGrid() {
		setGridColumns()
		setGridData(listSearchText)
	}

	function setGridColumns() {
		fieldsDisplayable = dataObj.fields.filter((f) => f.colDO.isDisplayable)
		let columnDefs: ColDef[] = []

		dataObj.fields.forEach((f) => {
			let defn = {}

			// core
			defn.field = f.colDO.propName
			defn.headerName = f.colDO.label
			defn.hide = !f.colDO.isDisplayable

			// edit - select
			if (f.colDO.propName === 'header') {
				defn.cellEditor = 'agSelectCellEditor'
				defn.cellEditorParams = {
					values: ['Phyllip', 'Alonzo', 'Hall', 'Allen']
				} as ISelectCellEditorParams
				defn.editable = true
				defn.headerName = '✍️ ' + defn.headerName
				defn.onCellValueChanged = cellChanged
			}

			columnDefs.push(defn)
		})

		if (isSelect) {
			columnDefs.unshift({
				checkboxSelection: true,
				headerCheckboxSelection: true,
				headerName: '',
				field: 'selected',
				maxWidth: 50,
				suppressMovable: true
			})
		}
		if (dataObj.raw.listReorderColumn) setGridColumnsProp(columnDefs, '', 'rowDrag', true)
		grid.setGridOption('columnDefs', columnDefs)
	}

	function cellChanged(event: NewValueParams) {
		console.log('cellChanged.event:', event)
	}

	function setGridColumnsProp(columns: ColDef[], field: string, prop: string, value: any) {
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

	function setGridData(searchText: string) {
		setGridDataSearch(searchText)
		setGridDataSort()
		setGridDataValues()
	}

	function setGridDataSearch(searchText: string) {
		dataObjData.rowsRetrieved.syncFields(dataObj.dataRecordsDisplay, ['selected'])
		recordsSearch(searchText, dataObj, fieldsDisplayable)
		state.parmsUser.parmSet(dataObj.raw.id, ParmsUserParmType.listSearchText, searchText)
	}

	function setGridDataSort() {
		listSortObj = sortInit(fieldsDisplayable)
		dataObj.dataRecordsDisplay = sortUser(listSortObj, dataObj.dataRecordsDisplay)
		state.parmsUser.parmSet(dataObj.raw.id, ParmsUserParmType.listSortObj, listSortObj)
	}

	function setGridDataValues() {
		dataRows = dataObj.dataRecordsDisplay.map((record) => {
			const row = {}
			dataObj.fields.forEach((f) => {
				row[f.colDO.propName] = record[f.colDO.propName]
			})
			return row
		})
		grid.setGridOption('rowData', dataRows)

		dataObj.data.parmsState.valueSet(
			ParmsObjType.listRecordIdList,
			dataRows.map((r: any) => r.id)
		)

		if (isSelect) {
			const selectedRecords = state.parmsState.valueGet(ParmsObjType.listRecordIdSelected) || []
			const selected: IRowNode[] = []
			const deselected: IRowNode[] = []
			grid.forEachNode((node) => {
				if (selectedRecords.includes(node.data!.id)) {
					selected.push(node)
				} else {
					deselected.push(node)
				}
			})
			grid.setNodesSelected({ nodes: selected, newValue: true })
			grid.setNodesSelected({ nodes: deselected, newValue: false })
		}
	}
</script>

<FormListSearch {dataObj} {listSearchText} {setGridData} {isSelect} />

<div style="height: calc(100vh - 400px);">
	<div bind:this={eGui} style:height="100%" {style} class="ag-theme-quartz" />
</div>
