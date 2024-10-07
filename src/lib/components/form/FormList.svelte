<script lang="ts">
	import {
		State,
		StatePacket,
		StatePacketAction,
		StateSurfaceEmbedShell,
		StateSurfaceModalEmbed
	} from '$comps/app/types.appState'
	import {
		TokenApiUserPref,
		TokenAppDoActionConfirmType,
		TokenAppModalSelect,
		TokenAppModalReturnType
	} from '$utils/types.token'
	import {
		type CellClassParams,
		type CellClickedEvent,
		type FilterChangedEvent,
		type GridApi,
		type ICellEditorParams,
		type NewValueParams,
		type PostSortRowsParams,
		type SelectionChangedEvent
	} from 'ag-grid-community'
	import {
		DataObj,
		DataObjData,
		DataObjEmbedType,
		DataObjMode,
		DataObjSort,
		DataObjSortItem,
		type DataRecord,
		ParmsValuesType,
		ParmsUser,
		ParmsUserDataType,
		required,
		type ResponseBody,
		strRequired
	} from '$utils/types'
	import { PropDataType } from '$comps/dataObj/types.rawDataObj'
	import { Field, FieldAccess, FieldColor, FieldElement } from '$comps/form/field'
	import { FieldParm } from '$comps/form/fieldParm'
	import FormElement from '$comps/form/FormElement.svelte'
	import Grid from '$comps/grid/Grid.svelte'
	import {
		getSelectedNodeIds,
		GridManagerOptions,
		GridSettings,
		GridSettingsColumnItem
	} from '$comps/grid/grid'
	import {
		CellEditorSelect,
		cellEditorSelectorParmField,
		cellRendererSelectorParmField
	} from '$comps/grid/gridParmField'
	import { onMount } from 'svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'
	import { init } from '@sentry/sveltekit'

	const FILENAME = '$comps/form/FormList.svelte'

	export let state: State
	export let component: string
	export let dataObj: DataObj
	export let dataObjData: DataObjData

	let dataHeight = `max-height: calc(100vh - ${400}px);` //  <todo> 240314 - calc specific padding
	let gridOptions: GridManagerOptions
	let isSelect = state instanceof StateSurfaceModalEmbed
	let scrollToTop = () => {}

	$: load(dataObjData)

	function load(data: DataObjData) {
		if (!dataObj.isListEmbed) dataObj.objData = data

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
			state.setStatus()
			state = state
		}

		gridOptions = initGrid()
	}

	function fGridCallbackFilter(event: FilterChangedEvent) {
		dataObjData.rowsRetrieved.syncFields(dataObj.dataRecordsDisplay, ['selected'])
		state.parmsState.valueSet(ParmsValuesType.listRecordIdSelected, getSelectedNodeIds(event.api))
	}

	function fGridCallbackUpdateValue(fieldName: string, data: DataRecord) {
		const row = dataObj.dataRecordsDisplay.findIndex((row) => row.id === data.id)
		const field = dataObj.fields.find((f) => f.colDO.propName === fieldName)
		if (row > -1 && field) {
			dataObj = dataObj.setFieldVal(row, field, data[fieldName])
			if (state instanceof StateSurfaceEmbedShell) {
				state.stateRoot.fClosureSetStatus()
			} else {
				state.fClosureSetStatus()
			}
		} else {
			error(500, {
				file: FILENAME,
				function: 'fGridCallbackUpdateValue',
				message: `Row not found for id: ${data.id}`
			})
		}
	}

	function initGrid() {
		return new GridManagerOptions({
			columnDefs: initGridColumns(),
			fCallbackFilter: fGridCallbackFilter,
			fCallbackUpdateValue: fGridCallbackUpdateValue,
			isEmbed: dataObj.isListEmbed,
			isSelect,
			isSelectMulti: isSelect,
			isSuppressFilterSort: dataObj.raw.isListSuppressFilterSort,
			isSuppressSelect: dataObj.raw.isListSuppressSelect,
			listReorderColumn: dataObj.raw.listReorderColumn,
			onCellClicked,
			onSelectionChanged,
			parmStateSelectedIds: state.parmsState.valueGet(ParmsValuesType.listRecordIdSelected),
			rowData: initGridData(),
			userSettings: dataObj.userSettings
		})
	}

	function initGridColumns() {
		let columnDefs: ColDef[] = []
		const fieldsSettings =
			dataObj.userSettings.getPref(ParmsUserDataType.listColumnsModel)?.columns || []
		const fieldsDisplayable = dataObj.fields.filter((f) => f.colDO.isDisplayable)
		const fieldsDisplayableNew = fieldsDisplayable.filter((f) => {
			return !fieldsSettings.map((fs) => fs.colId).includes(f.colDO.propName)
		})

		// config settings fields
		fieldsSettings.forEach((fs) => {
			const field = fieldsDisplayable.find((f) => f.colDO.propName === fs.colId)
			if (field) {
				let defn = initGridColumnsField(field)
				defn.flex = fs.flex
				defn.hide = !fs.visible
				columnDefs.push(defn)
			}
		})

		// config new fields
		fieldsDisplayableNew.forEach((f) => {
			console.log('FormList.initGridColumns', f.colDO)
			let defn = initGridColumnsField(f)
			defn.flex = 1
			defn.hide = !f.colDO.isDisplayable || !f.colDO.isDisplay
			columnDefs.push(defn)
		})

		console.log('FormList.initGridColumns', columnDefs)
		return columnDefs
	}
	function initGridColumnsField(field: Field) {
		let defn = {}
		const isEditable =
			dataObj.raw.isListEdit &&
			[FieldAccess.optional, FieldAccess.required].includes(field.fieldAccess)

		// core
		defn.editable = isEditable
		defn.field = field.colDO.propName
		defn.headerName = isEditable ? '✍️ ' + field.colDO.label : field.colDO.label
		defn.headerTooltip = field.placeHolder
		defn.singleClickEdit = isEditable ? true : undefined

		if (field instanceof FieldParm) {
			defn.cellEditorSelector = cellEditorSelectorParmField
			defn.cellRendererSelector = cellRendererSelectorParmField
			defn.context = { parmFields: field.parmFields, state }
		} else {
			// data type
			switch (field.colDO.colDB.codeDataType) {
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
						field.fieldElement === FieldElement.currency
							? 'customNumberCurrency'
							: field.fieldElement === FieldElement.percentage
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
					const itemsKey = '_items_' + field.colDO.propName
					if (Object.hasOwn(dataObjData.items, itemsKey)) {
						defn.editable = false
						defn.context = { items: dataObjData.items[itemsKey], state }
						defn.type = field.colDO.colDB.isMultiSelect ? 'ctSelectMulti' : 'ctSelectSingle'
					} else {
						defn.cellDataType = 'customText'
					}
					defn.cellStyle = {
						backgroundColor: field.fieldAccess === FieldAccess.required ? 'rgb(219,234,254)' : ''
					}
					break

				case PropDataType.str:
				case PropDataType.uuid:
					defn.cellDataType =
						field.fieldElement === FieldElement.textArea ? 'customTextLarge' : 'customText'
					break

				default:
					error(500, {
						file: FILENAME,
						function: 'initGridColumns',
						message: `No case defined for PropDataType: ${field.colDO.colDB.codeDataType}`
					})
			}
		}
		return defn
	}

	function initGridData() {
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
					: ['', null, undefined].includes(event.data[fieldName])
						? []
						: [event.data[fieldName]]
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
					fGridCallbackUpdateValue(fieldName, { id: rowNode.data.id, [fieldName]: newValue })

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
</script>

{#if gridOptions}
	<!-- <DataViewer header="FormList.dataObj.objStatus" data={dataObj.objStatus} /> -->
	{#key gridOptions}
		<Grid options={gridOptions} />
	{/key}
	<!-- <DataViewer header="gridManager" data={gm.rowData} /> -->
{/if}
