<script lang="ts">
	import {
		State,
		StatePacket,
		StatePacketAction,
		StateSurfaceModal,
		StateLayoutStyle
	} from '$comps/app/types.appState'
	import {
		TokenAppDoActionConfirmType,
		TokenAppModalMultiSelect,
		TokenAppModalReturnType
	} from '$utils/types.token'
	import {
		type CellClickedEvent,
		type NewValueParams,
		type SelectionChangedEvent
	} from 'ag-grid-community'
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
	import type { DataRecord } from '$utils/types'
	import { PropDataType } from '$comps/dataObj/types.rawDataObj'
	import { recordsSelectAll, sortInit, sort } from '$comps/form/formList'
	import { Field } from '$comps/form/field'
	import { FieldAccess, FieldColor, FieldElement } from '$comps/form/field'
	import { dndzone } from 'svelte-dnd-action'
	import { flip } from 'svelte/animate'
	import Header from '$comps/form/FormListHeader.svelte'
	import FormElement from '$comps/form/FormElement.svelte'
	import AgGrid from '$comps/form/AgGridGrid.svelte'
	import Grid from '$comps/other/Grid.svelte'
	import { GridManagerOptions } from '$comps/other/grid'
	import { onMount } from 'svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormList.svelte'
	const animationDurationMs = 300
	let dataHeightPadding = '400' //  <todo> 240314 - calc specific padding
	let dataHeight = `max-height: calc(100vh - ${dataHeightPadding}px);`

	export let state: State
	export let component: string
	export let dataObj: DataObj
	export let dataObjData: DataObjData

	let gridOptions: GridManagerOptions

	let fieldsDisplayable: Field[] = []
	let isSelect =
		state instanceof StateSurfaceModal && state.layoutStyle === StateLayoutStyle.overlayModalSelect
	let isSelectMulti = state instanceof StateSurfaceModal
	let listFilterText = ''
	let listSortObj: DataObjSort = new DataObjSort()
	let scrollToTop = () => {}

	$: load(dataObjData)

	function load(data: DataObjData) {
		if (!dataObj.isListEmbed) dataObj.objData = data

		listFilterText = state.parmsUser.parmGet(dataObj.raw.id, ParmsUserParmType.listFilterText) || ''
		listSortObj =
			state.parmsUser.parmGet(dataObj.raw.id, ParmsUserParmType.listSortObj) || new DataObjSort()

		// listEdit
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

		gridOptions = setGridOptions()
	}

	function fGridCallbackUpdateValue(rowId: string, fieldName: string, newVal: any) {
		const row = dataObj.dataRecordsDisplay.findIndex((record) => record.id === rowId)
		const field = dataObj.fields.find((f) => f.colDO.propName === fieldName)
		if (row > -1 && field) {
			console.log('fGridCallbackUpdateValue', { fieldName, field, row, newVal })
			dataObj = dataObj.setFieldVal(row, field, newVal)
			state = state.setStatus()
		}
	}

	function fGridCallbackFilter(filterText: string) {
		dataObjData.rowsRetrieved.syncFields(dataObj.dataRecordsDisplay, ['selected'])
		state.parmsUser.parmSet(dataObj.raw.id, ParmsUserParmType.listFilterText, filterText)
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

	async function onSelectionChanged(event: SelectionChangedEvent) {
		if (dataObj.actionsFieldListRowActionIdx < 0 || dataObj.raw.isListEdit) {
			return
		} else if (isSelect) {
			const selectedNodes = event.api.getSelectedNodes()
			state.parmsState.valueSet(
				ParmsValuesType.listRecordIdSelected,
				selectedNodes.map((node) => node.data.id)
			)
		} else {
			const record = event.api.getSelectedRows()[0]
			if (record) {
				const action = dataObj.actionsField[dataObj.actionsFieldListRowActionIdx]
				dataObj.data.parms.valueSet(ParmsValuesType.listRecordIdCurrent, record.id)
				action.trigger(state, dataObj)
			}
		}
	}

	function setGridColumns() {
		let columnDefs: ColDef[] = []
		fieldsDisplayable = dataObj.fields.filter((f) => f.colDO.isDisplayable)
		const fieldAccessEditable = [FieldAccess.optional, FieldAccess.required]

		dataObj.fields.forEach((f) => {
			let defn = {}
			const isEditable = dataObj.raw.isListEdit && fieldAccessEditable.includes(f.fieldAccess)

			// core
			defn.cellDataType = 'text'
			defn.editable = isEditable
			defn.field = f.colDO.propName
			defn.headerName = isEditable ? '✍️ ' + f.colDO.label : f.colDO.label
			defn.headerTooltip = f.placeHolder
			defn.hide = !f.colDO.isDisplayable
			defn.singleClickEdit = isEditable ? true : undefined

			switch (f.colDO.colDB.codeDataType) {
				case PropDataType.date:
					defn.cellDataType = 'date'
					defn.cellEditor = 'agDateCellEditor'
					break

				case PropDataType.float64:
				case PropDataType.int16:
				case PropDataType.int32:
				case PropDataType.int64:
					defn.cellDataType = 'number'
					defn.cellEditor = 'agNumberCellEditor'
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

		return columnDefs
	}

	function setGridData() {
		setGridDataSort()
		return setGridDataValues()
	}

	function setGridDataSort() {
		listSortObj = sortInit(fieldsDisplayable)
		dataObj.dataRecordsDisplay = sort(listSortObj, dataObj.dataRecordsDisplay)
		state.parmsUser.parmSet(dataObj.raw.id, ParmsUserParmType.listSortObj, listSortObj)
	}

	function setGridDataValues() {
		const dataRows = dataObj.dataRecordsDisplay.map((record) => {
			const row = {}
			dataObj.fields.forEach((f) => {
				row[f.colDO.propName] = record[f.colDO.propName]
			})
			return row
		})

		dataObj.data.parms.valueSet(
			ParmsValuesType.listRecordIdList,
			dataRows.map((r: any) => r.id)
		)

		// if (isSelect) {
		// 	const selectedRecords = state.parmsState.valueGet(ParmsValuesType.listRecordIdSelected) || []
		// 	const selected: IRowNode[] = []
		// 	const deselected: IRowNode[] = []
		// 	grid.forEachNode((node) => {
		// 		if (selectedRecords.includes(node.data!.id)) {
		// 			selected.push(node)
		// 		} else {
		// 			deselected.push(node)
		// 		}
		// 	})
		// 	grid.setNodesSelected({ nodes: selected, newValue: true })
		// 	grid.setNodesSelected({ nodes: deselected, newValue: false })
		// }
		return dataRows
	}

	function setGridOptions() {
		let columnDefs = setGridColumns()
		let rowData = setGridData()
		return new GridManagerOptions({
			columnDefs,
			fCallbackFilter: fGridCallbackFilter,
			fCallbackUpdateValue: fGridCallbackUpdateValue,
			isListHideFilter: dataObj.raw.isListHideSearch,
			isSelect,
			isSelectMulti,
			listFilterText,
			listReorderColumn: dataObj.raw.listReorderColumn,
			onCellClicked,
			onSelectionChanged,
			rowData
		})
	}
</script>

{#if gridOptions}
	<div class="h-[70vh]">
		<Grid options={gridOptions} />
		<!-- <DataViewer header="gridManager" data={gm.rowData} /> -->
	</div>
{/if}
