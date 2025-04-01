import { State } from '$comps/app/types.appState.svelte'
import {
	type ColDef,
	type GridApi,
	type ICellEditorComp,
	type ICellEditorParams,
	type ICellRendererComp,
	type ICellRendererParams,
	type IDateComp,
	type IDateParams,
	type ValueFormatterParams,
	type ValueGetterParams,
	type ValueParserParams,
	type ValueSetterParams
} from 'ag-grid-community'
import { LicenseManager } from 'ag-grid-charts-enterprise'
import {
	arrayOfClass,
	booleanOrFalse,
	DataObj,
	DataObjSort,
	type DataRecord,
	getArray,
	ParmsValuesType,
	ParmsUser,
	ParmsUserDataType,
	PropLinkItems,
	required,
	strRequired,
	valueOrDefault
} from '$utils/types'
import { PropDataType } from '$comps/dataObj/types.rawDataObj.svelte'
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
	ctBoolean: {
		cellStyle: { display: 'flex', 'justify-content': 'center' }
	},
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
			const fieldName = required(params.colDef.field, FILENAME, 'params.colDef.field')
			const currentValue = params.data[fieldName]
			const linkItems: PropLinkItems = params.colDef.context.linkItems
			return linkItems.getDisplayValueList(currentValue)
		}
	},
	ctSelectSingle: {
		cellEditor: 'agRichSelectCellEditor',
		cellEditorParams: {
			values: (params: ValueGetterParams) => {
				const linkItems: PropLinkItems = params.colDef.context.linkItems
				return linkItems.getValuesSelect()
			}
		},
		keyCreator: (params: any) => params.value.data,
		valueFormatter: (params: ValueFormatterParams) => {
			const linkItems: PropLinkItems = params.colDef.context.linkItems
			return linkItems.getDisplayValueList(params.value)
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
	load(rawSettings: any, sm: State, dataObj: DataObj) {
		if (sm.user) this.idUser = sm.user.id
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
			let sortObj = new DataObjSort()
			if (dataObj.raw.listReorderColumn) {
				let sortFields = dataObj.fields.filter(
					(f) => f.colDO.isDisplayable && f.colDO.orderSort !== undefined
				)
				sortFields.sort((a, b) => a.colDO.orderSort! - b.colDO.orderSort!)
				sortFields.forEach((f, i) => {
					sortObj.addItem(f.colDO.propName, f.colDO.codeSortDir, i)
				})
				return sortObj
			}
			if (rawPref || rawPref?.sortItems.length > 0) {
				return sortObj.load(rawPref.sortItems)
			}
			return undefined
		}
		return this
	}
}

export class GridSettingsColumns {
	columns: GridSettingsColumnItem[] = []
	constructor(rawColumns: any | undefined = []) {
		const clazz = 'GridSettingsColumns'
		rawColumns = getArray(rawColumns)
		this.columns = arrayOfClass(GridSettingsColumnItem, rawColumns)
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
		this.visible = booleanOrFalse(obj.visible)
	}
}

export class GridManagerOptions {
	columnDefs: ColDef[]
	fCallbackFilter: Function
	fCallbackUpdateValue: Function
	isEmbed: boolean
	isPopup: boolean
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
		this.isEmbed = booleanOrFalse(obj.isEmbed)
		this.isPopup = booleanOrFalse(obj.isPopup)
		this.isSelectMulti = booleanOrFalse(obj.isSelectMulti)
		this.isSuppressFilterSort = booleanOrFalse(obj.isSuppressFilterSort)
		this.isSuppressSelect = booleanOrFalse(obj.isSuppressSelect)
		this.listReorderColumn = obj.listReorderColumn || ''
		this.onCellClicked = obj.onCellClicked
		this.onSelectionChanged = obj.onSelectionChanged
		this.parmStateSelectedIds = obj.parmStateSelectedIds || []
		this.rowData = required(obj.rowData, clazz, 'rowData')
		this.sortModel = valueOrDefault(obj.sortModel, new DataObjSort())
		this.userSettings = valueOrDefault(obj.userSettings, new GridSettings(''))
	}
}

enum GridAutoSizeStrategy {
	fitGridWidth = 'fitGridWidth'
}
