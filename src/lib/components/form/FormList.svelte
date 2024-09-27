<script lang="ts">
	import {
		State,
		StatePacket,
		StatePacketAction,
		StateSurfaceModalEmbed
	} from '$comps/app/types.appState'
	import {
		TokenAppDoActionConfirmType,
		TokenAppModalSelect,
		TokenAppModalReturnType
	} from '$utils/types.token'
	import {
		type CellClassParams,
		type CellClickedEvent,
		type GridApi,
		type ICellEditorParams,
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
	import { Field, FieldAccess, FieldColor, FieldElement } from '$comps/form/field'
	import { FieldParm } from '$comps/form/fieldParm'
	import { dndzone } from 'svelte-dnd-action'
	import { flip } from 'svelte/animate'
	import FormElement from '$comps/form/FormElement.svelte'
	import Grid from '$comps/grid/Grid.svelte'
	import {
		CellEditorSelect,
		cellEditorSelectorParmField,
		cellRendererSelectorParmField,
		getSelectedNodeIds,
		GridManagerOptions
	} from '$comps/grid/grid'
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
	let isSelect = state instanceof StateSurfaceModalEmbed
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

	function fGridCallbackUpdateValue(fieldName: string, data: DataRecord) {
		const row = dataObj.dataRecordsDisplay.findIndex((row) => row.id === data.id)
		const field = dataObj.fields.find((f) => f.colDO.propName === fieldName)
		if (row > -1 && field) {
			dataObj = dataObj.setFieldVal(row, field, data[fieldName])
			state = state.setStatus()
		}
	}

	function fGridCallbackFilter(gridApi: GridApi, filterText: string) {
		dataObjData.rowsRetrieved.syncFields(dataObj.dataRecordsDisplay, ['selected'])
		state.parmsState.valueSet(ParmsValuesType.listRecordIdSelected, getSelectedNodeIds(gridApi))
		state.parmsUser.parmSet(dataObj.raw.id, ParmsUserParmType.listFilterText, filterText)
	}

	async function onCellClicked(event: CellClickedEvent) {
		let field = dataObj.fields.find((f) => f.colDO.propName === event.colDef.field)
		if (field) {
			const fieldName = field.colDO.propName
			field = field instanceof FieldParm ? field.parmFields[event.rowIndex] : field
			if (field.colDO.hasItems) {
				const fieldLabel = field.colDO.label
				const itemsList = field.colDO.items
				const itemsCurrent = Array.isArray(event.data[fieldName])
					? event.data[fieldName]
					: [event.data[fieldName]] || []
				const isMultiSelect = field.colDO.colDB.isMultiSelect
				const rowNode = event.api.getRowNode(event.data.id)
				await onCellClickedSelect(
					fieldName,
					fieldLabel,
					itemsList,
					itemsCurrent,
					isMultiSelect,
					rowNode
				)
			}
		}
	}

	async function onCellClickedSelect(
		fieldName: string,
		fieldLabel: string,
		itemsList: FieldItem[],
		itemsCurrent: string[],
		isMultiSelect,
		rowNode: any
	) {
		itemsList = itemsList.map((item) => {
			return { display: item.display, id: item.data }
		})

		state.update({
			packet: new StatePacket({
				action: StatePacketAction.selectModalItemsOpen,
				confirmType: TokenAppDoActionConfirmType.none,
				token: new TokenAppModalSelect({
					fieldLabel,
					fModalClose,
					itemsCurrent,
					itemsList,
					isMultiSelect
				})
			})
		})

		async function fModalClose(returnType: TokenAppModalReturnType, returnData?: ParmsValues) {
			if (returnType === TokenAppModalReturnType.complete) {
				const parms: ParmsValues = returnData.data || undefined
				if (parms) {
					const newValue = parms[ParmsValuesType.listRecordIdSelected]

					// update dataObj
					let newData = { id: rowNode.data.id }
					newData[fieldName] = newValue
					fGridCallbackUpdateValue(fieldName, newData)

					// update grid rowNode
					rowNode.setDataValue(fieldName, newValue)
				}
			}
		}
	}

	async function onSelectionChanged(event: SelectionChangedEvent) {
		if (dataObj.actionsFieldListRowActionIdx < 0 || dataObj.raw.isListEdit) {
			return
		} else if (isSelect) {
			state.parmsState.valueSet(ParmsValuesType.listRecordIdSelected, getSelectedNodeIds(event.api))
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
			defn.editable = isEditable
			defn.field = f.colDO.propName
			defn.headerName = isEditable ? '✍️ ' + f.colDO.label : f.colDO.label
			defn.headerTooltip = f.placeHolder
			defn.hide = !f.colDO.isDisplayable
			defn.singleClickEdit = isEditable ? true : undefined

			if (f instanceof FieldParm) {
				defn.cellEditorSelector = cellEditorSelectorParmField
				defn.cellRendererSelector = cellRendererSelectorParmField
				defn.context = { parmFields: f.parmFields, state }
			} else {
				// data type
				switch (f.colDO.colDB.codeDataType) {
					case PropDataType.bool:
						defn.cellDataType = isEditable ? 'customBoolean' : 'customText'
						break

					case PropDataType.date:
						defn.cellDataType = 'customDateString'
						break

					case PropDataType.datetime:
						// <todo> - 240921 - text until proper custom data type is built
						defn.cellDataType = 'text'
						break

					case PropDataType.float64:
						defn.cellDataType =
							f.fieldElement === FieldElement.currency
								? 'customNumberCurrency'
								: f.fieldElement === FieldElement.percentage
									? 'customNumberPercentage'
									: 'customNumber'
						break

					case PropDataType.int16:
					case PropDataType.int32:
					case PropDataType.int64:
						defn.cellDataType = 'customNumberInt'
						break

					case PropDataType.json:
						defn.cellDataType = 'object'
						break

					case PropDataType.link:
						const itemsKey = '_items_' + f.colDO.propName
						if (Object.hasOwn(dataObjData.items, itemsKey)) {
							defn.editable = false
							defn.context = { items: dataObjData.items[itemsKey], state }
							defn.type = f.colDO.colDB.isMultiSelect ? 'ctSelectMulti' : 'ctSelectSingle'
						} else {
							defn.cellDataType = 'customText'
						}
						defn.cellStyle = {
							backgroundColor: f.fieldAccess === FieldAccess.required ? 'rgb(219,234,254)' : ''
						}
						break

					case PropDataType.str:
					case PropDataType.uuid:
						defn.cellDataType =
							f.fieldElement === FieldElement.textArea ? 'customTextLarge' : 'customText'
						break

					default:
						error(500, {
							file: FILENAME,
							function: 'setGridColumns',
							message: `No case defined for PropDataType: ${f.colDO.colDB.codeDataType}`
						})
				}
			}

			columnDefs.push(defn)
		})

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
		console.log('setGridDataValues:', { rowsDisplay: dataObj.dataRecordsDisplay, dataRows })

		dataObj.data.parms.valueSet(
			ParmsValuesType.listRecordIdList,
			dataRows.map((r: any) => r.id)
		)
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
			isSelectMulti: isSelect,
			listFilterText,
			listRecordIdSelected: state.parmsState.valueGet(ParmsValuesType.listRecordIdSelected) || [],
			listReorderColumn: dataObj.raw.listReorderColumn,
			listRowDisplayColumn: dataObj.raw.listRowDisplayColumn,
			onCellClicked,
			onSelectionChanged,
			rowData
		})
	}
</script>

{#if gridOptions}
	<div class="h-[70vh]">
		{#key gridOptions}
			<Grid options={gridOptions} />
		{/key}
		<!-- <DataViewer header="gridManager" data={gm.rowData} /> -->
	</div>
{/if}
