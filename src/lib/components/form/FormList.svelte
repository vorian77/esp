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
		TokenAppDo,
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
	import 'ag-grid-charts-enterprise'
	import { LicenseManager } from 'ag-grid-charts-enterprise'
	import {
		DataObj,
		DataObjData,
		DataObjEmbedType,
		DataObjMode,
		type DataRecord,
		ParmsValues,
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
		getFilteredNodeIds,
		getSelectedNodeIds,
		GridCellStyle,
		GridManagerOptions,
		GridSettings,
		GridSettingsColumnItem
	} from '$comps/grid/grid'
	import {
		cellEditorSelectorParmField,
		cellRendererSelectorParmField
	} from '$comps/grid/gridParmField'
	import { onMount } from 'svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	LicenseManager.setLicenseKey(
		'Using_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-069958}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{App_Factory}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{AppFactory}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{AppFactory}_need_to_be_licensed___{AppFactory}_has_been_granted_a_Deployment_License_Add-on_for_{1}_Production_Environment___This_key_works_with_{AG_Charts_and_AG_Grid}_Enterprise_versions_released_before_{22_October_2025}____[v3]_[0102]_MTc2MTA4NzYwMDAwMA==38662b93f270b810aa21446e810c2c8e'
	)

	const FILENAME = '$comps/form/FormList.svelte'

	export let state: State
	export let component: string
	export let dataObj: DataObj
	export let dataObjData: DataObjData

	let elContent: HTMLDivElement
	let elContentTopY: number
	let gridApi: GridApi
	let gridOptions: GridManagerOptions
	let innerHeight: number
	let isSelect = state instanceof StateSurfaceModalEmbed
	let scrollToTop = () => {}

	onMount(() => {
		elContentTopY = Math.ceil(elContent.getBoundingClientRect().top)
	})

	$: load(dataObjData)

	$: if (state && state.packet) {
		let packet

		// gridDownload
		packet = state.consume(StatePacketAction.gridDownload)
		if (packet) {
			;(async () => {
				await gridDownload()
			})()
		}
	}

	async function gridDownload() {
		let data: string = ''
		let fields: Field[] = []
		let newRow: string = ''

		const columnState = gridApi.getColumnState()

		// get headers
		columnState.forEach((c) => {
			if (c.hide === false) {
				const field = dataObj.fields.find((f) => f.colDO.propName === c.colId)
				if (field) {
					fields.push(field)
					const label = field.colDO.headerAlt ? field.colDO.headerAlt : field.colDO.label
					newRow += `${label},`
				}
			}
		})
		if (fields.length === 0) {
			alert('Download cancelled. No data to export.')
			return
		}
		data += `${newRow}\n`

		// get data
		gridApi.forEachNodeAfterFilterAndSort((node) => {
			if (node.displayed) {
				newRow = ''
				fields.forEach((f) => {
					const value = [null, undefined].includes(node.data[f.colDO.propName])
						? ''
						: node.data[f.colDO.propName]
					newRow += `${value},`
				})
				data += `${newRow}\n`
			}
		})

		state.downloadContent(`${dataObj.raw.header}.csv`, 'text/csv', data)
	}

	function load(data: DataObjData) {
		if (!dataObj.fieldEmbed) dataObj.objData = data

		// listEdit
		if (dataObj.raw.isListEdit) {
			const presetRows = dataObj.data.rowsRetrieved
				.getRows()
				.filter((row) => row.record.id.startsWith('preset_'))
			presetRows.forEach((row) => {
				dataObj.dataFieldsChanged.valueSet(row.record.id + '_new', 'id', true)
			})
		}

		if (!dataObj.fieldEmbed) {
			state.setDataObjState(dataObj)
			state.setStatus()
			state = state
		}

		gridOptions = initGrid()
	}

	function fGridCallbackFilter(event: FilterChangedEvent) {
		dataObjData.rowsRetrieved.syncFields(dataObj.dataRecordsDisplay, ['selected'])
		state.parmsState.valueSet(ParmsValuesType.listIdsSelected, getSelectedNodeIds(event.api, 'id'))
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
			isEmbed: !!dataObj.fieldEmbed,
			isSelect,
			isSelectMulti: isSelect,
			isSuppressFilterSort: dataObj.raw.isListSuppressFilterSort,
			isSuppressSelect: dataObj.raw.isListSuppressSelect,
			listReorderColumn: dataObj.raw.listReorderColumn,
			onCellClicked,
			onSelectionChanged,
			parmStateSelectedIds: state.parmsState.valueGet(ParmsValuesType.listIdsSelected),
			rowData: initGridData(),
			userSettings: dataObj.userGridSettings
		})
	}

	function initGridColumns() {
		let columnDefs: ColDef[] = []
		const fieldsSettings =
			dataObj.userGridSettings.getPref(ParmsUserDataType.listColumnsModel)?.columns || []
		const fieldsCore = dataObj.fields.filter(
			(f) => f.colDO.isDisplayable || f.colDO.propName === 'id'
		)
		const fieldsGrid = fieldsCore.filter((f) => {
			return !fieldsSettings.map((fs) => fs.colId).includes(f.colDO.propName)
		})

		// config settings fields
		fieldsSettings.forEach((fs) => {
			const field = fieldsCore.find((f) => f.colDO.propName === fs.colId)
			if (field) {
				let defn = initGridColumnsField(field)
				defn.flex = fs.flex
				defn.hide = !fs.visible
				columnDefs.push(defn)
			}
		})

		// config new fields
		fieldsGrid.forEach((f) => {
			let defn = initGridColumnsField(f)
			defn.flex = 1
			defn.hide = !f.colDO.isDisplayable || !f.colDO.isDisplay
			columnDefs.push(defn)
		})
		return columnDefs
	}
	function initGridColumnsField(field: Field) {
		let defn = {}
		let defnCellStyle = new GridCellStyle()
		const isEditable =
			dataObj.raw.isListEdit &&
			[FieldAccess.optional, FieldAccess.required].includes(field.fieldAccess)

		// core
		defn.editable = isEditable
		defn.field = field.colDO.propName
		defn.headerName = isEditable ? '✍️ ' + field.colDO.label : field.colDO.label
		defn.headerTooltip = field.placeHolder
		defn.singleClickEdit = isEditable ? true : undefined
		defnCellStyle.addStyle('text-align', field.fieldAlignment)

		if (field instanceof FieldParm) {
			defn.cellEditorSelector = cellEditorSelectorParmField
			defn.cellRendererSelector = cellRendererSelectorParmField
			defn.context = { parmFields: field.parmFields, state }

			// if (field.linkItemsSource) {
			// 	defn.editable = false
			// 	defn.context = { linkItemsSource: field.linkItemsSource, state }
			// 	defn.context = { parmFields: field.parmFields, state }
			// 	defn.type = field.colDO.colDB.isMultiSelect ? 'ctSelectMulti' : 'ctSelectSingle'
			// }

			// field.parmFields[2].colDO.items = [
			// 	{ display: 'Item 1', id: '1' },
			// 	{ display: 'Item 2', id: '2' },
			// 	{ display: 'Item 3', id: '3' },
			// 	{ display: 'Item 4', id: '4' },
			// 	{ display: 'Item 5', id: '5' }
			// ]
			// field.parmFields[2].hasItems = true
			// defn.context = { items: dataObjData.items[itemsKey], state }

			// defn.editable = false
			// defn.type = field.colDO.colDB.isMultiSelect ? 'ctSelectMulti' : 'ctSelectSingle'
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
					if (field.linkItemsSource) {
						defn.editable = false
						defn.context = { linkItemsSource: field.linkItemsSource, state }
						defn.type = field.colDO.colDB.isMultiSelect ? 'ctSelectMulti' : 'ctSelectSingle'
					} else {
						defn.cellDataType = 'customText'
					}
					defnCellStyle.addStyle(
						'backgroundColor',
						field.fieldAccess === FieldAccess.required ? 'rgb(219,234,254)' : ''
					)
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
		defn.cellStyle = defnCellStyle.cellStyle
		return defn
	}

	function initGridData() {
		const fields = dataObj.fields.map((f) => {
			return f.colDO.propName
		})
		const dataRows = dataObj.dataRecordsDisplay.map((record) => {
			const row = {}
			dataObj.fields.forEach((f) => {
				row[f.colDO.propName] = record[f.colDO.propName]
			})
			return row
		})

		dataObj.data.parms.valueSet(
			ParmsValuesType.listIds,
			dataRows.map((r: any) => r.id)
		)

		return dataRows
	}

	async function onCellClicked(event: CellClickedEvent) {
		const rowNode = event.api.getRowNode(event.data.id)
		let field = dataObj.fields.find((f) => f.colDO.propName === event.colDef.field)
		let fieldParm = field instanceof FieldParm ? field.parmFields[event.rowIndex] : undefined
		let fieldProcess = fieldParm || field
		if (fieldProcess && fieldProcess.linkItemsSource) await onCellClickedSelectItems()

		async function onCellClickedSelectItems() {
			const fieldName = field.colDO.propName
			const listIdsSelected = Array.isArray(event.data[fieldName])
				? event.data[fieldName]
				: ['', null, undefined].includes(event.data[fieldName])
					? []
					: [event.data[fieldName]]
			const parms = fieldProcess.linkItemsSource.getGridParms()

			state.update({
				packet: new StatePacket({
					action: StatePacketAction.modalSelectOpen,
					confirmType: TokenAppDoActionConfirmType.none,
					token: new TokenAppModalSelect({
						columnDefs: parms.columnDefs,
						fModalClose,
						gridColumnId: 'data',
						isMultiSelect: fieldProcess.colDO.colDB.isMultiSelect,
						listIdsSelected,
						rowData: parms.rowData,
						selectLabel: fieldProcess.colDO.label,
						sortModel: parms.sortModel
					})
				})
			})
		}

		async function fModalClose(returnType: TokenAppModalReturnType, returnData?: ParmsValues) {
			if (returnType === TokenAppModalReturnType.complete) {
				const parms: ParmsValues = returnData.data || undefined
				if (parms) {
					const newValue = parms[ParmsValuesType.listIdsSelected]

					const fieldName = field.colDO.propName
					const multiLinkValue = { id: rowNode.data.id, [fieldName]: newValue }

					// update dataObj
					fGridCallbackUpdateValue(fieldName, multiLinkValue)

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
			state.parmsState.valueSet(
				ParmsValuesType.listIdsSelected,
				getSelectedNodeIds(event.api, 'id')
			)
		} else {
			const record = event.api.getSelectedRows()[0]
			if (record) {
				const action = dataObj.actionsField[dataObj.actionsFieldListRowActionIdx]
				dataObj.data.parms.valueSet(ParmsValuesType.listIds, getFilteredNodeIds(event.api))
				dataObj.data.parms.valueSet(ParmsValuesType.listRecordIdCurrent, record.id)
				action.trigger(state, dataObj)
			}
		}
	}
</script>

<svelte:window bind:innerHeight />

<div
	id="form-list"
	class="h-full max-h-full"
	style={`max-height: ${innerHeight - elContentTopY - 0}px;`}
	bind:this={elContent}
>
	{#if gridOptions}
		{#key gridOptions}
			<Grid bind:api={gridApi} options={gridOptions} />
		{/key}
	{/if}
</div>
