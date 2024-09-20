import {
	type ColDef,
	type ICellRendererComp,
	type ICellRendererParams,
	type ValueGetterParams,
	type ValueParserParams,
	type ValueSetterParams
} from 'ag-grid-community'
import { FieldItem } from '$comps/form/field'
import { booleanOrFalse, type DataRecord, required, valueOrDefault } from '$utils/types'

const FILENAME = '$comps/other/grid.ts'

// defn.cellStyle = { 'text-align': 'right' ,'background-color': 'green'}
// defn.type = ['numericColumn', 'rightAligned']

export const columnTypes = {
	ctBoolean: {
		// cellStyle: { 'background-color': 'thistle', 'vertical-align': 'middle' }
	},
	ctDateString: {
		cellStyle: { 'background-color': 'orange' }
	},
	ctNumber: {
		cellEditor: 'agNumberCellEditor'
		// cellStyle: { 'background-color': 'lightblue' }
	},
	ctNumberCurrency: {
		cellEditor: 'agNumberCellEditor',
		precision: 2
		// cellStyle: { 'background-color': 'lightgreen' }
	},
	ctNumberInt: {
		cellEditor: 'agNumberCellEditor'
		// cellStyle: { 'background-color': 'pink' }
	},
	ctNumberPercentage: {
		cellEditor: 'agNumberCellEditor'
		// cellStyle: { 'background-color': 'yellow' }
	},
	ctSelectMulti: {
		// cellStyle: { 'background-color': 'dodgerblue' },
		autoHeight: false,
		valueGetter: (params: ValueGetterParams) => {
			const fieldName = required(params.colDef.field, FILENAME, 'params.colDef.field')
			const items = params.colDef.context.items
			const ids = params.data[fieldName]
			let display = ''
			ids.forEach((id: string) => {
				const item = items.find((i: FieldItem) => i.data === id)
				if (item) display += display ? ',' + item.display : item.display
			})
			return display
		},
		wrapText: false
	},
	ctSelectSingle: {
		cellEditor: 'agSelectCellEditor',
		// cellStyle: { 'background-color': 'fuchsia' },
		valueGetter: (params: ValueGetterParams) => {
			const fieldName = required(params.colDef.field, FILENAME, 'params.colDef.field')
			const id = params.data[fieldName]
			const items = params.colDef.context.items
			const item = items.find((i: FieldItem) => i.data === id)
			return item ? item.display : ''
		},
		valueSetter: (params: ValueSetterParams) => {
			const display = params.newValue
			const item = params.colDef.context.items.find((i: FieldItem) => i.display === display)
			const fieldName = required(params.colDef.field, FILENAME, 'params.colDef.field')
			if (item) {
				params.data[fieldName] = item.data
				return true
			} else {
				params.data[fieldName] = ''
				return true
			}
		}
	},
	ctText: {
		cellEditor: 'agTextCellEditor'
		// cellStyle: { 'background-color': 'bisque' }
	},
	ctTextLarge: {
		cellEditor: 'agLargeTextCellEditor'
		// cellStyle: { 'background-color': 'honeydew' }
	}
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
	isListHideFilter: boolean
	isSelect: boolean
	isSelectMulti: boolean
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
		this.isListHideFilter = booleanOrFalse(obj.isListHideFilter, 'isListHideFilter')
		this.isSelect = booleanOrFalse(obj.isSelect, 'isSelect')
		this.isSelectMulti = booleanOrFalse(obj.isSelectMulti, 'isSelectMulti')
		this.listFilterText = valueOrDefault(obj.listFilterText, '')
		this.listRecordIdSelected = obj.listRecordIdSelected || []
		this.listReorderColumn = obj.listReorderColumn
		this.onCellClicked = obj.onCellClicked
		this.onSelectionChanged = obj.onSelectionChanged
		this.rowData = required(obj.rowData, clazz, 'rowData')
	}
}

export class ParmValueRendererText implements ICellRendererComp {
	eGui!: HTMLSpanElement

	init(params: ICellRendererParams) {
		this.eGui = document.createElement('span')
		if (params.value !== '' || params.value !== undefined) {
			// const imgForMood =
			// 	params.value === 'Happy'
			// 		? 'https://www.ag-grid.com/example-assets/smileys/happy.png'
			// 		: 'https://www.ag-grid.com/example-assets/smileys/sad.png'
			// this.eGui.innerHTML = `<img width="20px" src="${imgForMood}" />`
			this.eGui.innerHTML = `<input type="date" id="start" name="trip-start" value="2018-07-22" min="2018-01-01" max="2018-12-31" />`
		}
	}

	getGui() {
		return this.eGui
	}

	refresh(params: ICellRendererParams): boolean {
		return false
	}
}

export function cellRendererParmValue(params: ICellRendererParams<DataRecord>) {
	const rendText = {
		component: ParmValueRendererText,
		cellEditor: 'agDateCellEditor'
	}
	// const moodDetails = {
	// 		component: MoodRenderer,
	// };

	// const genderDetails = {
	// 		component: GenderRenderer,
	// 		params: { values: ["Male", "Female"] },
	// };
	if (params.data) {
		// if (params.data.type === "gender") return genderDetails;
		// else if (params.data.type === "mood") return moodDetails;
		return rendText
	}
	return undefined
}
