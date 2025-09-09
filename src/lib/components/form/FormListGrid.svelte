<script lang="ts">
	import {
		type CellClassParams,
		type CellClickedEvent,
		type FilterChangedEvent,
		type GridApi,
		type ICellEditorParams,
		type NewValueParams,
		type PostSortRowsParams,
		type RowClickedEvent,
		type ValueGetterParams
	} from 'ag-grid-community'
	import { AllEnterpriseModule, LicenseManager, ModuleRegistry } from 'ag-grid-enterprise'
	import { State, StateSurfaceOverlay, StateTriggerToken } from '$comps/app/types.state.svelte'
	import {
		TokenAppModalDate,
		TokenAppModalSelect,
		TokenAppModalReturn,
		TokenAppModalReturnType,
		TokenAppStateTriggerAction,
		TokenAppUserActionConfirmType
	} from '$utils/types.token'
	import {
		CodeAction,
		CodeActionClass,
		CodeActionType,
		ContextKey,
		DataManager,
		DataObj,
		DataObjData,
		DataObjSort,
		DataObjType,
		type DataRecord,
		getArray,
		getValueDisplay,
		isPlainObjectEmpty,
		MethodResult,
		ParmsValues,
		ParmsValuesFormList,
		ParmsValuesType,
		PropDataType,
		required,
		recordValueGet,
		recordValueSet,
		strRequired,
		UserParmItemSource,
		UserParmItemType,
		recordValueGetDisplay
	} from '$utils/types'
	import { getContext } from 'svelte'
	import { Field, FieldAccess, FieldColor, FieldElement } from '$comps/form/field.svelte'
	import { FieldParm } from '$comps/form/fieldParm'
	import FormElement from '$comps/form/FormElement.svelte'
	import Grid from '$comps/grid/Grid.svelte'
	import {
		addGridParm,
		getFilteredNodeIds,
		getSelectedNodeIds,
		getStyles,
		GridManagerOptions,
		GridSettingsColumns,
		GridSettingsColumnItem
	} from '$comps/grid/grid'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	ModuleRegistry.registerModules([AllEnterpriseModule])
	LicenseManager.setLicenseKey(
		'Using_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-081793}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{App_Factory}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{AppFactory}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{AppFactory}_need_to_be_licensed___{AppFactory}_has_been_granted_a_Deployment_License_Add-on_for_{1}_Production_Environment___This_key_works_with_{AG_Charts_and_AG_Grid}_Enterprise_versions_released_before_{22_October_2026}____[v3]_[0102]_MTc5MjYyMzYwMDAwMA==f89caf094cb11618e16362eee6ba2375'
	)

	const FILENAME = '$comps/form/FormListGrid.svelte'

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)

	let dataObj: DataObj = $derived(dm.getDataObj(parms.dataObjId))
	let dataObjData = $derived(dataObj.data)
	let dataRecordsDisplay = $derived(dm.getRecordsDisplayList(parms.dataObjId))

	let gridApi: GridApi = $state()

	let isPopup = $derived(sm instanceof StateSurfaceOverlay)
	let gridOptions: GridManagerOptions | undefined = $state(undefined)

	let initParmsPromise = initParms()

	async function initParms(): Promise<MethodResult> {
		if (parms.dataObjId) {
			let result: MethodResult = await sm.userParmItemsAdd(parms.dataObjId, [
				new UserParmItemSource(
					UserParmItemType.listColumnsModel,
					(data: any) => {
						return data ? new GridSettingsColumns(data.columns) : new GridSettingsColumns()
					},
					(data: any) => {
						return data
					}
				),
				new UserParmItemSource(
					UserParmItemType.listFilterModel,
					(data: any) => {
						return data ? data : {}
					},
					(data: any) => {
						return {
							data
						}
					}
				),
				new UserParmItemSource(
					UserParmItemType.listFilterQuick,
					(data: any) => {
						return isPlainObjectEmpty(data) ? '' : data.data
					},
					(data: any) => {
						return {
							data
						}
					}
				),
				new UserParmItemSource(UserParmItemType.listSortModel, listSortModelGet, (data: any) => {
					return data
				})
			])
			if (result.error) return result
			gridOptions = dataObj
				? new GridManagerOptions({
						columnDefs: initGridColumns(),
						context: { formStyles: dataObj.raw.formStyles },
						dataObjId: parms.dataObjId,
						fCallbackFilter: fGridCallbackFilter,
						fCallbackUpdateValue: fGridCallbackUpdateValue,
						includeHiddenColumnsInQuickFilter: isPopup,
						isEmbed: !!dataObj.embedField,
						isPopup: isPopup,
						isSelectMulti: isPopup,
						isSuppressFilterSort: dataObj.raw.isListSuppressFilterSort,
						isSuppressSelect: dataObj.raw.isListSuppressSelect,
						listReorderColumn: dataObj.raw.listReorderColumn,
						onCellClicked,
						onRowClicked,
						onSelectionChanged,
						rowData: initGridData(),
						sortModel: dataObj.sortModel
					})
				: undefined
			return new MethodResult()
		} else {
			return new MethodResult()
		}
	}

	function listSortModelGet(data: any) {
		let sortObj = new DataObjSort()
		if (dataObj.raw.listReorderColumn) {
			let sortFields = dataObj.fields.filter(
				(f) => f.colDO.isDisplayable && f.colDO.orderSort !== undefined
			)
			sortFields.sort((a, b) => a.colDO.orderSort! - b.colDO.orderSort!)
			sortFields.forEach((f, i) => {
				sortObj.addItem(f.getValueKey(), f.colDO.codeSortDir, i)
			})
			return sortObj
		}
		if (data || data?.sortItems.length > 0) {
			return sortObj.load(data.sortItems)
		}
		return undefined
	}

	function fGridCallbackFilter(event: FilterChangedEvent) {
		dataObjData.rowsRetrieved.syncFields(dataRecordsDisplay, ['selected'])
		dataObj.parmsFormListParmSet(
			ParmsValuesType.listIdsSelected,
			getSelectedNodeIds(event.api, 'id')
		)
	}

	async function fGridCallbackUpdateValue(key: string, data: DataRecord) {
		const row = dataRecordsDisplay.findIndex((row) => row.id === data.id)
		const field = dataObj.fields.find((f) => f.getValueKey() === key)
		if (row > -1 && field) {
			const recordValue = recordValueGet(data, key)
			await dm.setFieldValueAsync(dataObj.raw.id, row, field, recordValue)
		} else {
			error(500, {
				file: FILENAME,
				function: 'fGridCallbackUpdateValue',
				msg: `Row not found for id: ${data.id}`
			})
		}
	}

	function initGridColumns() {
		let columnDefs: ColDef[] = []

		let fieldsSettings = sm.userParmGetOrDefault(
			dataObj.raw.id,
			UserParmItemType.listColumnsModel,
			undefined
		)
		fieldsSettings = fieldsSettings ? fieldsSettings.columns : []

		const fieldsCore = dataObj.fields.filter(
			(f) => f.colDO.isDisplayable || f.getValueKey() === 'id'
		)
		const fieldsNotInSettings =
			fieldsCore.filter((f) => {
				return !fieldsSettings.map((fs) => fs.colId).includes(f.getValueKey())
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
				const field = fieldsCore.find((f) => f.getValueKey() === fs.colId)
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
		const isEditable =
			dataObj.raw.isListEdit &&
			[FieldAccess.optional, FieldAccess.required].includes(field.fieldAccess)

		// core
		defn.editable = isEditable
		defn.field = field.getValueKey()

		defn.headerName = isEditable ? '✍️ ' + field.colDO.label : field.colDO.label
		defn.headerTooltip = field.placeHolder
		defn.singleClickEdit = isEditable ? true : undefined
		addGridParm(defn, ['context', 'cellStyle', 'text-align'], field.fieldAlignment)

		// fieldStyles
		addGridParm(defn, ['context', 'fieldStyles'], field.colDO.fieldStyles)
		defn.cellStyle = (params: CellClassParams) => {
			let styles = { ...params.colDef.context.cellStyle }
			const fieldStyles: GridStyle[] = getArray(params.colDef.context.fieldStyles)
			const result: MethodResult = getStyles(fieldStyles, { value: params.value })
			return result.error ? styles : { ...styles, ...result.data }
		}

		if (field instanceof FieldParm) {
			addGridParm(defn, ['context', 'parmFields'], field.parmFields)
			defn.cellDataType = 'object'
			defn.valueGetter = (params: ValueGetterParams) => {
				let valueDisplay = getValueDisplay(params.data.parmValue)
				valueDisplay = Array.isArray(valueDisplay) ? valueDisplay.join(', ') : valueDisplay
				return valueDisplay
			}
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

				case PropDataType.link:
					if (field.linkItems) {
						addGridParm(defn, ['context', 'dm'], dm)
						addGridParm(defn, ['context', 'linkItems'], field.linkItems)
						addGridParm(defn, ['context', 'sm'], sm)

						defn.editable = !field.colDO.colDB.isMultiSelect
						defn.type = field.colDO.colDB.isMultiSelect ? 'ctSelectMulti' : 'ctSelectSingle'
					} else {
						defn.cellDataType = 'customLink'
					}
					addGridParm(
						defn,
						['context', 'cellStyle', 'backgroundColor'],
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
						msg: `No case defined for PropDataType: ${field.colDO.colDB.codeDataType}`
					})
			}
		}
		return defn
	}

	function initGridData() {
		const dataRows = dataRecordsDisplay.map((record) => {
			let row = {}
			dataObj.fields.forEach((f) => {
				row = recordValueSet(row, f.getValueKey(), recordValueGet(record, f.getValueKey()))
			})
			return row
		})
		return dataRows
	}

	async function onCellClicked(event: CellClickedEvent) {
		const { api, data, colDef, rowIndex } = event
		const rowNode = api.getRowNode(data.id)
		const field = dataObj.fields.find((f) => f.getValueKey() === colDef.field)
		const fieldParm = field instanceof FieldParm ? field.parmFields[rowIndex] : undefined

		if (!fieldParm) return

		const valueRaw = recordValueGet(data, field.getValueKey())
		const fUpdateValue = async (valueSave: any) =>
			rowNode.setDataValue(field.getValueKey(), valueSave)

		await sm.openModalField(fieldParm, valueRaw, fUpdateValue)
	}

	async function onRowClicked(event: RowClickedEvent) {
		if (dataObj.actionsFieldListRowActionIdx < 0 || dataObj.raw.isListEdit) {
			return
		} else if (!isPopup) {
			const record = event.api.getSelectedRows()[0]
			if (record) {
				dataObj.data.parmsFormList = new ParmsValuesFormList({
					listIds: getFilteredNodeIds(event.api),
					listRecordIdCurrent: record.id
				})
				const doa = dataObj.userActions[dataObj.actionsFieldListRowActionIdx]
				doa.action.trigger(sm, dataObj)
			}
		}
	}
	function onSelectionChanged(event: SelectionChangedEvent) {
		dataObj.parmsFormListParmSet(
			ParmsValuesType.listIdsSelected,
			getSelectedNodeIds(event.api, 'id')
		)
	}
</script>

{#await initParmsPromise}
	Loading user parms...
{:then value}
	{#if gridOptions}
		<Grid bind:api={gridApi} options={gridOptions} {parms} />
	{/if}
{:catch error}
	<DataViewer header="promise-error" data={error} />
{/await}
