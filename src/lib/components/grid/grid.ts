import { State } from '$comps/app/types.state.svelte'
import {
	type ColDef,
	type GridApi,
	type ICellEditorComp,
	type ICellEditorParams,
	type ICellRendererComp,
	type ICellRendererParams,
	type IDateComp,
	type IDateParams,
	type KeyCreatorParams,
	type ValueFormatterParams,
	type ValueGetterParams,
	type ValueParserParams,
	type ValueSetterParams
} from 'ag-grid-community'
import { AllEnterpriseModule, LicenseManager, ModuleRegistry } from 'ag-grid-enterprise'
import {
	arrayOfClass,
	booleanOrFalse,
	DataObjSort,
	DataObjStyle,
	type DataRecord,
	evalExprRecord,
	getArray,
	getValueData,
	getValueDisplay,
	MethodResult,
	PropLinkItems,
	required,
	strRequired,
	valueOrDefault
} from '$utils/types'
import { FieldColumnItem } from '$comps/form/field.svelte'
import { error } from '@sveltejs/kit'

ModuleRegistry.registerModules([AllEnterpriseModule])
LicenseManager.setLicenseKey(
	'Using_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-081793}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{App_Factory}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{AppFactory}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{AppFactory}_need_to_be_licensed___{AppFactory}_has_been_granted_a_Deployment_License_Add-on_for_{1}_Production_Environment___This_key_works_with_{AG_Charts_and_AG_Grid}_Enterprise_versions_released_before_{22_October_2026}____[v3]_[0102]_MTc5MjYyMzYwMDAwMA==f89caf094cb11618e16362eee6ba2375'
)

const FILENAME = '$comps/other/grid.ts'

export function addGridParm(data: DataRecord, propertyList: string[], value: string) {
	let currentObj = data
	propertyList.forEach((property, i) => {
		if (i < propertyList.length - 1) {
			if (!Object.hasOwn(data, property)) currentObj[property] = {}
			currentObj = currentObj[property]
		} else {
			currentObj[property] = value
		}
	})
}

export type ColumnsDefsSelect = {
	field: string
	flex?: number
	headerName: string
	hide?: boolean
}[]

class SelectCellRenderer implements ICellRendererComp {
	eGui!: HTMLDivElement

	init(params: ICellRendererParams) {
		const clazz = `${FILENAME}.SelectCellRenderer`
		const linkItems: PropLinkItems = params.colDef?.context?.linkItems
		const eGui = (this.eGui = document.createElement('div'))
		eGui.style.overflow = 'hidden'
		eGui.style.textOverflow = 'ellipsis'

		const fieldName = params?.colDef?.field
		if (fieldName) {
			let valueDisplay = ''
			const valueData = params.data[fieldName]

			if (valueData) {
				if (Array.isArray(valueData)) {
					const linkItems: PropLinkItems = params.colDef?.context?.linkItems
					if (linkItems) {
						valueDisplay = linkItems.getDisplayValueListRecords(valueData)
					}
				} else {
					valueDisplay = getValueDisplay(valueData)
				}
			}
			eGui.append(valueDisplay)
		}
	}

	getGui() {
		return this.eGui
	}

	refresh() {
		return false
	}
}

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
		cellRenderer: SelectCellRenderer,
		valueGetter: (params: ValueGetterParams) => {
			const fieldName = strRequired(params.colDef.field, FILENAME, 'params.colDef.field')
			const valueRaw = params.data[fieldName]
			return valueRaw
		}
	},
	ctSelectSingle: {
		cellEditor: 'agRichSelectCellEditor',
		cellEditorParams: {
			formatValue: (v: FieldColumnItem) => v?.display,
			parseValue: (v: FieldColumnItem) => v?.data,
			values: (params: ValueGetterParams) => {
				const linkItems: PropLinkItems = params.colDef?.context?.linkItems
				return linkItems ? linkItems.getValuesSelect() : []
			}
		},
		cellRenderer: SelectCellRenderer,
		valueGetter: (params: ValueGetterParams) => {
			const field = params.colDef.field
			const valueRaw = field ? params.data[field] : null
			const valueDisplay = getValueDisplay(valueRaw)
			return valueDisplay
		},
		valueSetter: (params: ValueSetterParams) => {
			const valueId = params.newValue
			const linkItems: PropLinkItems = params.colDef?.context?.linkItems
			const valueSave = linkItems.getValueRaw(valueId)
			if (params.colDef.field) {
				params.data[params.colDef.field] = valueSave

				return true
			}
			return false
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

export function getStyles(stylesSource: DataObjStyle[], data: DataRecord): MethodResult {
	let stylesReturn: DataRecord = {}
	stylesSource.forEach((style: DataObjStyle) => {
		if (style.exprTrigger) {
			if (style.exprTrigger === `<record,str,value> === 'Test'`) {
				console.log('Field.cellStyle.trigger:', { style, data })
			}
			let result: MethodResult = evalExprRecord({
				evalExprContext: 'Grid.getRowStyle',
				exprRaw: style.exprTrigger,
				data
			})
			if (result.error) return result
			const exprParsed: string = result.data
			const trigger = eval(exprParsed)
			if (trigger) stylesReturn[style.styleProp] = style.styleValue
		} else {
			stylesReturn[style.styleProp] = style.styleValue
		}
	})
	return new MethodResult(stylesReturn)
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
	return isFalsy(params.newValue) ? null : getValueData(params.newValue)
}
function getValueFormatter(params: any, isFalsy: Function) {
	return isFalsy(params.value) ? '' : getValueDisplay(params.value)
}

export const dataTypeDefinitions = {
	customBoolean: {
		baseDataType: 'boolean',
		columnTypes: ['ctBoolean'],
		extendsDataType: 'boolean'
	},
	customLink: {
		baseDataType: 'object',
		extendsDataType: 'object',
		valueFormatter: (params: any) => getValueFormatter(params, isFalsy),
		valueParser: (params: any) => getValueParser(params, isFalsy)
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
	context: DataRecord
	dataObjId: string | undefined
	fCallbackFilter: Function
	fCallbackUpdateValue: Function
	isEmbed: boolean
	isPopup: boolean
	isSelectMulti: boolean
	isSuppressFilterSort: boolean
	isSuppressSelect: boolean
	listReorderColumn: string
	onCellClicked?: Function
	onRowClicked?: Function
	onSelectionChanged?: Function
	rowData: any[]
	sortModel: DataObjSort
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'GridManagerOptions'
		this.columnDefs = required(obj.columnDefs, clazz, 'columnDefs')
		this.context = valueOrDefault(obj.context, {})
		this.dataObjId = valueOrDefault(obj.dataObjId, undefined)
		this.fCallbackFilter = obj.fCallbackFilter
		this.fCallbackUpdateValue = obj.fCallbackUpdateValue
		this.isEmbed = booleanOrFalse(obj.isEmbed)
		this.isPopup = booleanOrFalse(obj.isPopup)
		this.isSelectMulti = booleanOrFalse(obj.isSelectMulti)
		this.isSuppressFilterSort = booleanOrFalse(obj.isSuppressFilterSort)
		this.isSuppressSelect = booleanOrFalse(obj.isSuppressSelect)
		this.listReorderColumn = obj.listReorderColumn || ''
		this.onCellClicked = obj.onCellClicked
		this.onRowClicked = obj.onRowClicked
		this.onSelectionChanged = obj.onSelectionChanged
		this.rowData = required(obj.rowData, clazz, 'rowData')
		this.sortModel = valueOrDefault(obj.sortModel, new DataObjSort())
	}
}

enum GridAutoSizeStrategy {
	fitGridWidth = 'fitGridWidth'
}
