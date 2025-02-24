<script lang="ts">
	import {
		State,
		StateSurfaceEmbedShell,
		StateSurfacePopupModalEmbed,
		StateTriggerToken
	} from '$comps/app/types.appState.svelte'
	import {
		TokenApiUserPref,
		TokenAppDo,
		TokenAppModalSelect,
		TokenAppModalReturnType,
		TokenAppStateTriggerAction,
		TokenAppUserActionConfirmType
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
		CodeAction,
		CodeActionClass,
		CodeActionType,
		ContextKey,
		DataManager,
		DataObj,
		DataObjData,
		DataObjType,
		type DataRecord,
		ParmsValues,
		ParmsValuesType,
		ParmsUser,
		ParmsUserDataType,
		required,
		type ResponseBody,
		strRequired
	} from '$utils/types'
	import { getContext } from 'svelte'
	import { PropDataType } from '$comps/dataObj/types.rawDataObj.svelte'
	import { Field, FieldAccess, FieldColor, FieldElement } from '$comps/form/field.svelte'
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
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	LicenseManager.setLicenseKey(
		'Using_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-069958}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{App_Factory}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{AppFactory}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{AppFactory}_need_to_be_licensed___{AppFactory}_has_been_granted_a_Deployment_License_Add-on_for_{1}_Production_Environment___This_key_works_with_{AG_Charts_and_AG_Grid}_Enterprise_versions_released_before_{22_October_2025}____[v3]_[0102]_MTc2MTA4NzYwMDAwMA==38662b93f270b810aa21446e810c2c8e'
	)

	const FILENAME = '$comps/form/FormListGrid.svelte'

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)

	let dataObj: DataObj = $derived(dm.getDataObj(parms.dataObjId))
	let dataObjData = $derived(dataObj.data)
	let dataRecordsDisplay = $derived(dm.getRecordsDisplayList(parms.dataObjId))

	let gridApi: GridApi = $state()
	let isSelect = $derived(sm instanceof StateSurfacePopupModalEmbed)

	$effect(() => {
		if (sm.consumeTriggerToken(StateTriggerToken.listDownload)) {
			;(async () => {
				await gridDownload()
			})()
		}
	})

	let gridOptions: GridManagerOptions | undefined = $state(
		dataObj
			? new GridManagerOptions({
					columnDefs: initGridColumns(),
					fCallbackFilter: fGridCallbackFilter,
					fCallbackUpdateValue: fGridCallbackUpdateValue,
					isEmbed: !!dataObj.embedField,
					isSelect,
					isSelectMulti: isSelect,
					isSuppressFilterSort: dataObj.raw.isListSuppressFilterSort,
					isSuppressSelect: dataObj.raw.isListSuppressSelect,
					listReorderColumn: dataObj.raw.listReorderColumn,
					onCellClicked,
					onSelectionChanged,
					parmStateSelectedIds: sm.parmsState.valueGet(ParmsValuesType.listIdsSelected),
					rowData: initGridData(),
					userSettings: dataObj?.userGridSettings
				})
			: undefined
	)

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

		sm.downloadContent(`${dataObj.raw.header}.csv`, 'text/csv', data)
	}

	function fGridCallbackFilter(event: FilterChangedEvent) {
		dataObjData.rowsRetrieved.syncFields(dataRecordsDisplay, ['selected'])
		sm.parmsState.valueSet(ParmsValuesType.listIdsSelected, getSelectedNodeIds(event.api, 'id'))
	}

	async function fGridCallbackUpdateValue(fieldName: string, data: DataRecord) {
		const row = dataRecordsDisplay.findIndex((row) => row.id === data.id)
		const field = dataObj.fields.find((f) => f.colDO.propName === fieldName)
		if (row > -1 && field) {
			await dm.setFieldValue(dataObj.raw.id, row, field, data[fieldName])
		} else {
			error(500, {
				file: FILENAME,
				function: 'fGridCallbackUpdateValue',
				message: `Row not found for id: ${data.id}`
			})
		}
	}

	function initGridColumns() {
		let columnDefs: ColDef[] = []
		const fieldsSettings =
			dataObj.userGridSettings.getPref(ParmsUserDataType.listColumnsModel)?.columns || []
		const fieldsCore = dataObj.fields.filter(
			(f) => f.colDO.isDisplayable || f.colDO.propName === 'id'
		)
		const fieldsNotInSettings =
			fieldsCore.filter((f) => {
				return !fieldsSettings.map((fs) => fs.colId).includes(f.colDO.propName)
			}).length > 0

		if (fieldsNotInSettings) {
			fieldsCore.forEach((f) => {
				let defn = initGridColumnsField(f)
				defn.hide = !f.colDO.isDisplayable || !f.colDO.isDisplay
				defn.flex = 1
				columnDefs.push(defn)
			})
		} else {
			const columnWidth = fieldsSettings.reduce(
				(acc, curr) => (acc + curr.visible ? curr.flex : 0),
				0
			)
			fieldsSettings.forEach((fs) => {
				const field = fieldsCore.find((f) => f.colDO.propName === fs.colId)
				if (field) {
					let defn = initGridColumnsField(field)
					defn.hide = !fs.visible
					defn.flex = defn.hide ? 0 : fs.flex / columnWidth
					columnDefs.push(defn)
				}
			})
		}
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
			defn.context = { parmFields: field.parmFields, sm }
		} else {
			// data type
			switch (field.colDO.colDB.codeDataType) {
				case PropDataType.bool:
					defn.cellDataType = isEditable ? 'customBoolean' : 'customText'
					// defnCellStyle.addStyle('display', 'flex')
					// defnCellStyle.addStyle('justify-content', 'center')
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
					defn.comparator = (valueA, valueB, nodeA, nodeB, isDescending) => valueA - valueB
					break

				case PropDataType.int16:
				case PropDataType.int32:
				case PropDataType.int64:
					defn.cellDataType = 'customNumberInt'
					defn.comparator = (valueA, valueB, nodeA, nodeB, isDescending) => valueA - valueB
					break

				case PropDataType.json:
					defn.cellDataType = 'object'
					break

				case PropDataType.attribute:
				case PropDataType.link:
					if (field.linkItems) {
						defn.context = { dm, linkItems: field.linkItems, sm }
						defn.editable = !field.colDO.colDB.isMultiSelect
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
		// defn.cellStyle = defnCellStyle.cellStyle
		return defn
	}

	function initGridData() {
		const fieldNames = dataObj.fields.map((f) => {
			return f.colDO.propName
		})
		const dataRows = dataRecordsDisplay.map((record) => {
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
		let rowNode = event.api.getRowNode(event.data.id)
		let field = dataObj.fields.find((f) => f.colDO.propName === event.colDef.field)
		let fieldParm = field instanceof FieldParm ? field.parmFields[event.rowIndex] : undefined
		let fieldProcess = fieldParm || field
		if (fieldProcess && fieldProcess.linkItems && fieldProcess.colDO.colDB.isMultiSelect) {
			await onCellClickedSelectItems()
		}

		async function onCellClickedSelectItems() {
			const fieldName = field.colDO.propName
			const listIdsSelected = Array.isArray(event.data[fieldName])
				? event.data[fieldName]
				: ['', null, undefined].includes(event.data[fieldName])
					? []
					: [event.data[fieldName]]
			const gridParms = fieldProcess.linkItems.getGridParms()

			await sm.triggerAction(
				new TokenAppStateTriggerAction({
					codeAction: CodeAction.init(
						CodeActionClass.ct_sys_code_action_class_modal,
						CodeActionType.modalOpenSelect
					),
					codeConfirmType: TokenAppUserActionConfirmType.none,
					data: {
						token: new TokenAppModalSelect({
							columnDefs: gridParms.columnDefs,
							fModalClose,
							isMultiSelect: fieldProcess.colDO.colDB.isMultiSelect,
							listIdsSelected,
							rowData: gridParms.rowData,
							selectLabel: fieldProcess.colDO.label,
							sortModel: gridParms.sortModel
						})
					}
				})
			)
		}

		async function fModalClose(returnType: TokenAppModalReturnType, returnData?: ParmsValues) {
			if (returnType === TokenAppModalReturnType.complete) {
				const parms: ParmsValues = returnData.data || undefined
				if (parms) {
					event.api.startEditingCell({
						rowIndex: event.rowIndex,
						colKey: event.colDef.field
					})
					const newValue = parms[ParmsValuesType.listIdsSelected]
					const fieldName = field.colDO.propName

					// <todo? - 250401 - temporarily use updateData vs setDataValue and manually trigger fGridCallbackUpdateValue
					// becuse of bug in setDataValue
					let data = event.data
					data[fieldName] = newValue
					rowNode?.updateData(data)
					fGridCallbackUpdateValue(fieldName, data)

					// rowNode.setDataValue(fieldName, newValue)
					event.api.stopEditing()
				}
			}
		}
	}

	async function onSelectionChanged(event: SelectionChangedEvent) {
		if (dataObj.actionsFieldListRowActionIdx < 0 || dataObj.raw.isListEdit) {
			return
		} else if (isSelect) {
			sm.parmsState.valueSet(ParmsValuesType.listIdsSelected, getSelectedNodeIds(event.api, 'id'))
		} else {
			const record = event.api.getSelectedRows()[0]
			if (record) {
				const doa = dataObj.userActions[dataObj.actionsFieldListRowActionIdx]
				dataObj.data.parms.valueSet(ParmsValuesType.listIds, getFilteredNodeIds(event.api))
				dataObj.data.parms.valueSet(ParmsValuesType.listRecordIdCurrent, record.id)
				doa.action.trigger(sm, dataObj)
			}
		}
	}
</script>

{#if gridOptions}
	<Grid bind:api={gridApi} options={gridOptions} {parms} />
{/if}
