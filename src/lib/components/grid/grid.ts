import { State, StatePacketAction } from '$comps/app/types.appState'
import {
	type ColDef,
	type GridApi,
	type ICellEditorComp,
	type ICellEditorParams,
	type ICellRendererComp,
	type ICellRendererParams,
	type IDateComp,
	type IDateParams,
	type ValueGetterParams,
	type ValueParserParams,
	type ValueSetterParams
} from 'ag-grid-community'
import { LicenseManager } from 'ag-grid-charts-enterprise'
import { Field, FieldAccess, FieldColumnItem } from '$comps/form/field'
import {
	arrayOfClasses,
	booleanOrFalse,
	DataObj,
	DataObjSort,
	type DataRecord,
	getArray,
	ParmsValuesType,
	ParmsUser,
	ParmsUserDataType,
	required,
	strRequired,
	valueOrDefault
} from '$utils/types'
import { PropDataType } from '$comps/dataObj/types.rawDataObj'
import { error } from '@sveltejs/kit'

LicenseManager.setLicenseKey(
	'Using_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-069958}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{App_Factory}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{AppFactory}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{AppFactory}_need_to_be_licensed___{AppFactory}_has_been_granted_a_Deployment_License_Add-on_for_{1}_Production_Environment___This_key_works_with_{AG_Charts_and_AG_Grid}_Enterprise_versions_released_before_{22_October_2025}____[v3]_[0102]_MTc2MTA4NzYwMDAwMA==38662b93f270b810aa21446e810c2c8e'
)

const FILENAME = '$comps/other/grid.ts'

export type ColumnsDefsSelect = {
	field: string
	flex?: number
	headerName: string
	hide?: boolean
}[]

export const columnTypes = {
	// cellStyle: { 'background-color': 'orange' }
	ctBoolean: {},
	ctDateString: {},
	ctNumber: {
		cellEditor: 'agNumberCellEditor'
	},
	ctNumberCurrency: {
		cellEditor: 'agNumberCellEditor',
		precision: 2
	},
	ctNumberInt: {
		cellEditor: 'agNumberCellEditor'
	},
	ctNumberPercentage: {
		cellEditor: 'agNumberCellEditor'
	},
	ctSelectMulti: {
		cellEditor: 'agTextCellEditor',
		valueGetter: (params: ValueGetterParams) => {
			let display = ''
			const fieldName = required(params.colDef.field, FILENAME, 'params.colDef.field')
			const items = params.colDef.context.items
			const currentValue = params.data[fieldName]
			currentValue.forEach((id: string) => {
				const item = items.find((i: FieldColumnItem) => i.data === id)
				if (item) display += display ? ',' + item.display : item.display
			})
			return display
		}
	},
	ctSelectSingle: {
		cellEditor: 'agTextCellEditor',
		valueGetter: (params: ValueGetterParams) => {
			const fieldName = required(
				params.colDef.field,
				`${FILENAME}.valueGetter`,
				'params.colDef.field'
			)
			const items = params.colDef.context.items
			const currentValue = params.data[fieldName]
			const item = items.find((i: FieldColumnItem) => i.data === currentValue)
			return item ? item.display : ''
		},
		valueSetter: (params: ValueSetterParams) => {
			const fieldName = required(
				params.colDef.field,
				`${FILENAME}.valueSetter`,
				'params.colDef.field'
			)
			params.data[fieldName] = params.newValue[0] || ''
			return true
		}
	},
	ctText: {
		cellEditor: 'agTextCellEditor'
	},
	ctTextLarge: {
		cellEditor: 'agLargeTextCellEditor'
	}
}

export const getFilteredNodeIds = (gridApi: GridApi) => {
	let selectedNodes: string[] = []
	gridApi.forEachNodeAfterFilterAndSort((node) => {
		if (node.displayed) selectedNodes.push(node.data.id)
	})
	return selectedNodes
}

export const getSelectedNodeIds = (gridApi: GridApi, idKey: string) => {
	let selectedNodes: string[] = []
	gridApi.forEachNode((node) => {
		if (node.isSelected()) selectedNodes.push(node.data[idKey])
	})
	return selectedNodes
}

const isFalsy = (value: any) => [null, '', undefined].includes(value)
const isFalsyNumber = (value: any) => isFalsy(value) || Number.isNaN(value)

function getValueParser(params: ValueParserParams, isFalsy: Function) {
	return isFalsy(params.newValue) ? null : params.newValue
}
function getValueFormatter(params: any, isFalsy: Function) {
	if (isFalsy(params.value)) return ''
	return params.value
}

export const dataTypeDefinitions = {
	customBoolean: {
		baseDataType: 'boolean',
		columnTypes: ['ctBoolean'],
		extendsDataType: 'boolean'
	},
	customDateString: {
		baseDataType: 'dateString',
		columnTypes: ['ctDateString'],
		extendsDataType: 'dateString'
	},
	customNumber: {
		baseDataType: 'number',
		columnTypes: ['ctNumber', 'numericColumn'],
		extendsDataType: 'number',
		valueFormatter: (params: any) => getValueFormatter(params, isFalsyNumber),
		valueParser: (params: any) => getValueParser(params, isFalsyNumber)
	},
	customNumberCurrency: {
		baseDataType: 'number',
		columnTypes: ['ctNumberCurrency', 'numericColumn'],
		extendsDataType: 'number',
		valueFormatter: (params: any) =>
			getValueFormatter(params, isFalsyNumber) === ''
				? ''
				: '$' + params.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
		valueParser: (params: any) => getValueParser(params, isFalsyNumber)
	},
	customNumberInt: {
		baseDataType: 'number',
		columnTypes: ['ctNumberInt', 'numericColumn'],
		extendsDataType: 'number',
		valueFormatter: (params: any) =>
			getValueFormatter(params, isFalsyNumber) === '' ? '' : `${Math.round(params.value)}`,
		valueParser: (params: any) =>
			getValueParser(params, isFalsyNumber) === null ? null : Math.round(params.newValue)
	},
	customNumberPercentage: {
		baseDataType: 'number',
		columnTypes: ['ctNumberPercentage', 'numericColumn'],
		extendsDataType: 'number',
		valueFormatter: (params: any) =>
			getValueFormatter(params, isFalsyNumber) === '' ? '' : `${Math.round(params.value * 100)}%`,
		valueParser: (params: any) => getValueParser(params, isFalsyNumber)
	},
	customSelectMulti: {
		baseDataType: 'text',
		columnTypes: ['ctSelectMulti'],
		extendsDataType: 'text'
	},
	customSelectSingle: {
		baseDataType: 'object',
		columnTypes: ['ctSelectSingle'],
		extendsDataType: 'object'
	},
	customText: {
		baseDataType: 'text',
		columnTypes: ['ctText'],
		extendsDataType: 'text',
		valueFormatter: (params: any) => getValueFormatter(params, isFalsy),
		valueParser: (params: any) => getValueParser(params, isFalsy)
	},
	customTextLarge: {
		baseDataType: 'text',
		columnTypes: ['ctTextLarge'],
		extendsDataType: 'text',
		valueFormatter: (params: any) => getValueFormatter(params, isFalsy),
		valueParser: (params: any) => getValueParser(params, isFalsy)
	}
}

export class GridCellStyle {
	cellStyle: DataRecord = {}
	constructor() {}
	addStyle(property: string, value: string) {
		this.cellStyle[property] = value
	}
}

export class GridSettings {
	idFeature: string
	idUser?: string
	data: DataRecord = {}
	constructor(idFeature: string) {
		const clazz = 'GridSettings'
		this.idFeature = required(idFeature, clazz, 'idFeature')
		this.data[ParmsUserDataType.listColumnsModel] = new GridSettingsColumns()
		this.data[ParmsUserDataType.listFilterModel] = {}
		this.data[ParmsUserDataType.listFilterQuick] = ''
		this.data[ParmsUserDataType.listSortModel] = undefined
	}
	getPref(type: ParmsUserDataType) {
		return this.data[type]
	}
	setPref(type: ParmsUserDataType, value: any) {
		this.data[type] = value
	}
	load(rawSettings: any, state: State, dataObj: DataObj) {
		if (state.user) this.idUser = state.user.id
		rawSettings = valueOrDefault(rawSettings, {})
		const PREFS: [ParmsUserDataType, Function][] = [
			[ParmsUserDataType.listColumnsModel, initPrefsColumnsModel],
			[ParmsUserDataType.listFilterModel, initPrefsFilterModel],
			[ParmsUserDataType.listFilterQuick, initPrefsFilterQuick],
			[ParmsUserDataType.listSortModel, initPrefsSortModel]
		]
		PREFS.forEach((p) => {
			const parmType = p[0]
			const parmFunction = p[1]
			const rawPref = Object.hasOwn(rawSettings, parmType) ? rawSettings[parmType] : undefined
			this.data[parmType] = parmFunction(rawPref)
		})

		function initPrefsColumnsModel(rawPref: any) {
			return rawPref ? new GridSettingsColumns(rawPref.columns) : undefined
		}
		function initPrefsFilterModel(rawPref: any) {
			return rawPref ? rawPref : {}
		}
		function initPrefsFilterQuick(rawPref: any) {
			return rawPref ? rawPref : ''
		}
		function initPrefsSortModel(rawPref: any) {
			if (dataObj.raw.listReorderColumn) return initSort()
			if (rawPref || rawPref?.sortItems.length > 0) {
				let sortObj = new DataObjSort()
				return sortObj.load(rawPref.sortItems)
			}
			return undefined

			function initSort() {
				let sortFields = dataObj.fields.filter(
					(f) => f.colDO.isDisplayable && f.colDO.orderSort !== undefined
				)
				sortFields.sort((a, b) => a.colDO.orderSort! - b.colDO.orderSort!)
				sortFields.forEach((f, i) => {
					sortObj.addItem(f.colDO.propName, f.colDO.codeSortDir, i)
				})
				return sortObj
			}
		}
		return this
	}
}

export class GridSettingsColumns {
	columns: GridSettingsColumnItem[] = []
	constructor(rawColumns: any | undefined = []) {
		const clazz = 'GridSettingsColumns'
		rawColumns = getArray(rawColumns)
		this.columns = arrayOfClasses(GridSettingsColumnItem, rawColumns)
		this.setColumnFlex()
	}
	setColumnFlex() {
		let totalWidth = 0
		this.columns.forEach((col) => {
			totalWidth += col.actualWidth
		})
		if (totalWidth === 0) return
		this.columns.forEach((col) => {
			col.flex = col.actualWidth / totalWidth
		})
	}
}
export class GridSettingsColumnItem {
	actualWidth: number
	flex: number = 1
	colId: string
	visible: boolean
	constructor(obj: any) {
		const clazz = 'GridSettingsColumnItem'
		this.actualWidth = required(parseInt(obj.actualWidth), clazz, 'actualWidth')
		this.colId = strRequired(obj.colId, clazz, 'colId')
		this.visible = booleanOrFalse(obj.visible, 'visible')
	}
}

export class GridManagerOptions {
	columnDefs: ColDef[]
	fCallbackFilter: Function
	fCallbackUpdateValue: Function
	idColumn: string
	isEmbed: boolean
	isSelect: boolean
	isSelectMulti: boolean
	isSuppressFilterSort: boolean
	isSuppressSelect: boolean
	listReorderColumn: string
	onCellClicked?: Function
	onSelectionChanged?: Function
	parmStateSelectedIds: []
	rowData: any[]
	sortModel: DataObjSort
	userSettings: GridSettings
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'GridManagerOptions'
		this.columnDefs = required(obj.columnDefs, clazz, 'columnDefs')
		this.fCallbackFilter = obj.fCallbackFilter
		this.fCallbackUpdateValue = obj.fCallbackUpdateValue
		this.idColumn = valueOrDefault(obj.idColumn, 'id')
		this.isEmbed = booleanOrFalse(obj.isEmbed, 'isEmbed')
		this.isSelect = booleanOrFalse(obj.isSelect, 'isSelect')
		this.isSelectMulti = booleanOrFalse(obj.isSelectMulti, 'isSelectMulti')
		this.isSuppressFilterSort = booleanOrFalse(obj.isSuppressFilterSort, 'isSuppressFilterSort')
		this.isSuppressSelect = booleanOrFalse(obj.isSuppressSelect, 'isSuppressSelect')
		this.listReorderColumn = obj.listReorderColumn || ''
		this.onCellClicked = obj.onCellClicked
		this.onSelectionChanged = obj.onSelectionChanged
		this.parmStateSelectedIds = obj.parmStateSelectedIds || []
		this.rowData = required(obj.rowData, clazz, 'rowData')
		this.sortModel = valueOrDefault(obj.sortModel, new DataObjSort())
		this.userSettings = valueOrDefault(obj.userSettings, new GridSettings(''))
	}
}
