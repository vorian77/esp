<script lang="ts">
	import { onMount } from 'svelte'
	import {
		createGrid,
		type CellClickedEvent,
		type CellEditingStartedEvent,
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
		type SelectionChangedEvent,
		type ValueGetterParams,
		type ValueSetterParams
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
	import GridFilter from '$comps/grid/GridFilter.svelte'
	import { error } from '@sveltejs/kit'

	const FILENAME = '$comps/form/AgGridSvelte.svelte'

	export let state: State
	export let dataObj: DataObj
	export let dataObjData: DataObjData

	console.log('AgGridGrid.dataObjData', dataObjData)

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

	let tempIsListEdit = false

	$: load(dataObjData)

	function load(data) {
		if (!dataObj.isListEmbed) dataObj.objData = data

		listSearchText = state.parmsUser.parmGet(dataObj.raw.id, ParmsUserParmType.listFilterText) || ''
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

	async function onCellClicked(event: CellClickedEvent) {
		const field = dataObj.fields.find((f) => f.colDO.propName === event.colDef.field)
		if (field) {
			// multi-select modal
			if (field.colDO.colDB.codeDataType === PropDataType.link && field.colDO.colDB.isMultiSelect) {
				await onCellClickedMultiSelect(event, field)
			}
		}
	}

	async function onCellClickedMultiSelect(event: CellClickedEvent, field: Field) {
		const fieldName = event.colDef.field
		const itemsKey = '_items_' + field.colDO.propName
		console.log('AgGridGrid.onCellClickedMultiSelect', { field })
		if (Object.hasOwn(dataObjData.items, itemsKey)) {
			const itemsCurrent = dataObjData.items[itemsKey]
			const itemsList = event.data[fieldName]
			state.update({
				packet: new StatePacket({
					action: StatePacketAction.selectMultiOpen,
					confirmType: TokenAppDoActionConfirmType.none,
					token: new TokenAppModalMultiSelect({
						fieldLabel: field.colDO.label,
						fModalClose,
						itemsCurrent,
						itemsList
					})
				})
			})
		}
		async function fModalClose(returnType: TokenAppModalReturnType, data?: ParmsValues) {
			console.log('AgGridGrid.fModalClose', { returnType, data })
			if (returnType === TokenAppModalReturnType.complete) {
				const rowNode = grid.getRowNode(event.data.id)
				const newPrice = Math.floor(Math.random() * 100000)
				rowNode.setDataValue(fieldName, newPrice.toString())
			}
		}
	}

	function onCellValueChanged(event: NewValueParams) {
		const fieldName = event.colDef.field
		const row = dataObj.dataRecordsDisplay.findIndex((record) => record.id === event.data.id)
		const field = dataObj.fields.find((f) => f.colDO.propName === fieldName)
		if (row > -1 && field) {
			const newVal = event.data[fieldName]
			console.log('onCellValueChanged', { fieldName, row, newVal })
			dataObj = dataObj.setFieldVal(row, field, newVal)
			state = state.setStatus()
		}
	}

	onMount(() => {
		const gridOptions = {
			columnDefs: null,
			defaultColDef: {
				flex: 1
			},
			getRowId: (params) => params.data.id,
			onCellClicked,
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
		if (dataObj.actionsFieldListRowActionIdx < 0 || dataObj.raw.isListEdit || tempIsListEdit) {
			return
		} else if (isSelect) {
			const selectedNodes = event.api.getSelectedNodes()
			state.parmsState.valueSet(
				ParmsValuesType.listRecordIdSelected,
				selectedNodes.map((node) => node.data.id)
			)
		} else {
			// const selectedRows = event.api.getSelectedRows()
			const record = grid.getSelectedRows()[0]
			if (record) {
				const action = dataObj.actionsField[dataObj.actionsFieldListRowActionIdx]
				dataObj.data.parms.valueSet(ParmsValuesType.listRecordIdCurrent, record.id)
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
		const fieldAccessEditable = [FieldAccess.optional, FieldAccess.required]

		dataObj.fields.forEach((f) => {
			let defn = {}
			const isEditable = dataObj.raw.isListEdit && fieldAccessEditable.includes(f.fieldAccess)

			// core
			defn.cellDataType = 'text'
			defn.onCellValueChanged = onCellValueChanged
			defn.editable = isEditable
			defn.field = f.colDO.propName
			defn.headerName = isEditable ? '✍️ ' + f.colDO.label : f.colDO.label
			defn.headerTooltip = f.placeHolder
			defn.hide = !f.colDO.isDisplayable
			defn.singleClickEdit = isEditable ? true : undefined

			switch (f.colDO.colDB.codeDataType) {
				case PropDataType.date:
					// defn.cellDataType = 'date'
					// defn.cellEditor = 'agDateCellEditor'
					break

				case PropDataType.float64:
				case PropDataType.int16:
				case PropDataType.int32:
				case PropDataType.int64:
					// defn.cellDataType = 'number'
					// defn.cellEditor = 'agNumberCellEditor'
					break

				case PropDataType.link:
					const itemsKey = '_items_' + f.colDO.propName
					if (Object.hasOwn(dataObjData.items, itemsKey)) {
						const items = dataObjData.items[itemsKey]
						if (f.colDO.colDB.isMultiSelect) {
							// defn.cellEditor = MultiSelectEditor
							// defn.cellRenderer = MultiSelectRenderer
							// defn.cellEditorPopup = true
							defn.editable = false
						} else {
							// defn.cellDataType = 'object'
							// defn.cellEditor = 'agSelectCellEditor'
							// defn.cellEditorParams = {
							// 	values: items.map((item) => item.display)
							// } as ISelectCellEditorParams
							// defn.valueGetter = (params: ValueGetterParams) => {
							// 	const id = params.data[f.colDO.propName]
							// 	const item = items.find((i) => i.data === id)
							// 	return item ? item.display : ''
							// }
							// defn.valueSetter = (params: ValueSetterParams) => {
							// 	const display = params.newValue
							// 	const item = items.find((i) => i.display === display)
							// 	if (item) {
							// 		params.data[f.colDO.propName] = item.data
							// 		return true
							// 	} else {
							// 		return false
							// 	}
							// }
						}
					} else {
						// error(500, {
						// 	file: FILENAME,
						// 	function: 'setGridColumns',
						// 	message: `No items found for link edit column: ${f.colDO.propName}`
						// })
					}
					break

				case PropDataType.str:
					defn.cellDataType = 'text'
					defn.cellEditor =
						f.fieldElement === FieldElement.textArea ? 'agLargeTextCellEditor' : 'agTextCellEditor'
					break

				default:
				// error(500, {
				// 	file: FILENAME,
				// 	function: 'setGridColumns',
				// 	message: `No case defined for PropDataType: ${f.colDO.colDB.codeDataType}`
				// })
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
		// recordsSearch(searchText, dataObj, fieldsDisplayable)
		state.parmsUser.parmSet(dataObj.raw.id, ParmsUserParmType.listFilterText, searchText)
	}

	function setGridDataSort() {
		listSortObj = sortInit(fieldsDisplayable)
		dataObj.dataRecordsDisplay = sort(listSortObj, dataObj.dataRecordsDisplay)
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

		dataObj.data.parms.valueSet(
			ParmsValuesType.listRecordIdList,
			dataRows.map((r: any) => r.id)
		)

		if (isSelect) {
			const selectedRecords = state.parmsState.valueGet(ParmsValuesType.listRecordIdSelected) || []
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

<GridFilter {dataObj} listFilterText={listSearchText} {setGridData} {isSelect} />

<div style="height: calc(100vh - 400px);">
	<div bind:this={eGui} style:height="100%" {style} class="ag-theme-quartz" />
</div>
