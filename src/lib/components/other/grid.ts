import { State } from '$comps/app/types.appState'
import {
	booleanOrFalse,
	DataObj,
	DataObjData,
	type DataRecord,
	required,
	valueOrDefault
} from '$utils/types'
import { type ColDef } from 'ag-grid-community'

const FILENAME = '$comps/other/grid.ts'

export class GridManagerOptions {
	columnDefs: ColDef[]
	fCallbackFilter: Function
	fCallbackUpdateValue: Function
	isListHideFilter: boolean
	isSelect: boolean
	isSelectMulti: boolean
	listFilterText: string
	listReorderColumn: string
	onCellClicked?: Function
	onSelectionChanged?: Function
	rowData: any[]
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'GridManagerOptions'
		this.columnDefs = required(obj.columnDefs, clazz, 'columnDefs')
		this.fCallbackFilter = obj.fCallbackFilter
		this.fCallbackUpdateValue = required(obj.fCallbackUpdateValue, clazz, 'fCallbackUpdateValue')
		this.isListHideFilter = booleanOrFalse(obj.isListHideFilter, 'isListHideFilter')
		this.isSelect = booleanOrFalse(obj.isSelect, 'isSelect')
		this.isSelectMulti = booleanOrFalse(obj.isSelectMulti, 'isSelectMulti')
		this.listFilterText = valueOrDefault(obj.listFilterText, '')
		this.listReorderColumn = obj.listReorderColumn
		this.onCellClicked = obj.onCellClicked
		this.onSelectionChanged = obj.onSelectionChanged
		this.rowData = required(obj.rowData, clazz, 'rowData')
	}
}
