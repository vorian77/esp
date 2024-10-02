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
import { Field, FieldAccess, FieldItem } from '$comps/form/field'
import { booleanOrFalse, type DataRecord, required, valueOrDefault } from '$utils/types'
import { PropDataType } from '$comps/dataObj/types.rawDataObj'
import { error } from '@sveltejs/kit'

const FILENAME = '$comps/other/grid.ts'

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
				const item = items.find((i: FieldItem) => i.data === id)
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
			const item = items.find((i: FieldItem) => i.data === currentValue)
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

export const getSelectedNodeIds = (gridApi: GridApi) => {
	let selectedNodes: string[] = []
	gridApi.forEachNode((node) => {
		if (node.isSelected()) selectedNodes.push(node.data.id)
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

export class GridManagerOptions {
	columnDefs: ColDef[]
	fCallbackFilter: Function
	fCallbackUpdateValue: Function
	isEmbed: boolean
	isHideFilter: boolean
	isSelect: boolean
	isSelectMulti: boolean
	isSuppressSelect: boolean
	listFilterText: string
	listRecordIdSelected: []
	listReorderColumn: string
	onCellClicked?: Function
	onSelectionChanged?: Function
	rowData: any[]
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'GridManagerOptions'
		this.columnDefs = required(obj.columnDefs, clazz, 'columnDefs')
		this.fCallbackFilter = obj.fCallbackFilter
		this.fCallbackUpdateValue = obj.fCallbackUpdateValue
		this.isEmbed = booleanOrFalse(obj.isEmbed, 'isEmbed')
		this.isHideFilter = booleanOrFalse(obj.isHideFilter, 'isHideFilter')
		this.isSelect = booleanOrFalse(obj.isSelect, 'isSelect')
		this.isSelectMulti = booleanOrFalse(obj.isSelectMulti, 'isSelectMulti')
		this.isSuppressSelect = booleanOrFalse(obj.isSuppressSelect, 'isSuppressSelect')
		this.listFilterText = valueOrDefault(obj.listFilterText, '')
		this.listRecordIdSelected = obj.listRecordIdSelected || []
		this.listReorderColumn = obj.listReorderColumn || ''
		this.onCellClicked = obj.onCellClicked
		this.onSelectionChanged = obj.onSelectionChanged
		this.rowData = required(obj.rowData, clazz, 'rowData')
	}
}
