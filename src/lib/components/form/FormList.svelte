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
	import { Field, FieldAccess, FieldColor, FieldElement } from '$comps/form/field'
	import { FieldParm } from '$comps/form/fieldParm'
	import { dndzone } from 'svelte-dnd-action'
	import { flip } from 'svelte/animate'
	import Header from '$comps/form/FormListHeader.svelte'
	import FormElement from '$comps/form/FormElement.svelte'
	import AgGrid from '$comps/grid/AgGridGrid.svelte'
	import Grid from '$comps/grid/Grid.svelte'
	import { cellRendererParmValue, GridManagerOptions } from '$comps/grid/grid'
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

	function fGridCallbackUpdateValue(fieldName: string, data: DataRecord) {
		const row = dataObj.dataRecordsDisplay.findIndex((row) => row.id === data.id)
		const field = dataObj.fields.find((f) => f.colDO.propName === fieldName)
		if (row > -1 && field) {
			const newVal = data[fieldName]
			console.log('fGridCallbackUpdateValue', { fieldName, row, data })
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
		if (Object.hasOwn(dataObjData.items, itemsKey)) {
			const itemsList = dataObjData.items[itemsKey].map((item) => {
				return { display: item.display, id: item.data }
			})
			const itemsCurrent = event.data[fieldName]
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
			if (returnType === TokenAppModalReturnType.complete) {
				const parms: ParmsValues = data.data || undefined
				if (parms) {
					const rowId = event.data.id
					const newValue = parms[ParmsValuesType.listRecordIdSelected]

					// update dataObj
					fGridCallbackUpdateValue(fieldName, { id: rowId, newValue })

					// update grid
					const rowNode = event.api.getRowNode(rowId)
					rowNode.setDataValue(fieldName, newValue)
				}
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
			defn.editable = isEditable
			defn.field = f.colDO.propName
			defn.headerName = isEditable ? '✍️ ' + f.colDO.label : f.colDO.label
			defn.headerTooltip = f.placeHolder
			defn.hide = !f.colDO.isDisplayable
			defn.singleClickEdit = isEditable ? true : undefined

			if (f instanceof FieldParm) {
				// defn.cellRendererSelector = cellRendererParmValue
				defn.cellDataType = 'dateString'
				// defn.cellDataType = 'customTextLarge'
				// defn.cellDataType = () => {
				// 	return 'customTextLarge'
				// }
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
							const items = dataObjData.items[itemsKey]
							if (f.colDO.colDB.isMultiSelect) {
								// managed by onCellClickedMultiSelect
								// defn.cellDataType = 'customText'
								defn.context = { items }
								defn.type = 'ctSelectMulti'
								defn.editable = false
							} else {
								defn.type = 'ctSelectSingle'
								defn.cellEditorParams = {
									values: ['Select an option...', ...items.map((item) => item.display)]
								} as ISelectCellEditorParams
								defn.context = { items }
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
			isSelectMulti,
			listFilterText,
			listRecordIdSelected: state.parmsState.valueGet(ParmsValuesType.listRecordIdSelected) || [],
			listReorderColumn: dataObj.raw.listReorderColumn,
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
