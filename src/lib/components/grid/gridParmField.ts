import {
	type ICellEditorComp,
	type ICellEditorParams,
	type ICellRendererComp,
	type ICellRendererParams
} from 'ag-grid-community'
import { Field, FieldAccess } from '$comps/form/field.svelte'
import { PropDataType } from '$comps/dataObj/types.rawDataObj.svelte'
import { type DataRecord, getDataRecordValueKey } from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = '$comps/other/gridParmField.ts'

export class CellEditorSelect implements ICellEditorComp {
	// dummy selector for modal select fields
	gui!: HTMLElement
	params!: ICellEditorParams

	init(params: ICellEditorParams) {
		this.params = params
		this.gui = document.createElement('div')

		let style = 'width: 100%; border: 0; font-size: 14px;'
		const fieldName = getDataRecordValueKey(params.data, 'name')
		const parmFields = params?.colDef?.context.parmFields
		if (parmFields) {
			const field = parmFields.find((f: Field) => f.colDO.propNameRaw === fieldName)
			if (field && field.fieldAccess === FieldAccess.required) {
				style += ' background-color: rgb(219,234,254);'
			}
		}
		const value = getSelectDisplayValue(
			params.data,
			params.value,
			params?.colDef?.context.parmFields
		)
		this.gui.innerHTML = `<input id="${fieldName}" name="${fieldName}" type="text" style="${style}" readonly value="${value}"/>`
	}

	getGui() {
		return this.gui
	}

	getValue() {
		return getDataRecordValueKey(this.params.data, 'parmValue')
	}

	afterGuiAttached() {}

	isPopup() {
		return false
	}
}

export function cellEditorSelectorParmField(params: ICellEditorParams) {
	const codeDataType = getDataRecordValueKey(params.data, 'codeDataType')

	switch (codeDataType) {
		case PropDataType.date:
			return {
				component: 'agDateStringCellEditor'
			}
		case PropDataType.uuid:
		case PropDataType.uuidList:
			return {
				component: CellEditorSelect
			}
		default:
			error(500, {
				file: FILENAME,
				function: `${FILENAME}.cellEditorSelectorParmField`,
				message: `No case defined for PropDataType: ${codeDataType}`
			})
	}
}

export class CellRendererParmField implements ICellRendererComp {
	gui!: HTMLElement
	params!: ICellRendererParams

	init(params: ICellRendererParams) {
		this.params = params
		this.gui = document.createElement('div')

		let style = 'width: 100%; border: 0; font-size: 14px;'
		const fieldName = getDataRecordValueKey(params.data, 'name')
		const parmFields = params?.colDef?.context.parmFields
		if (parmFields) {
			const field = parmFields.find((f: Field) => f.colDO.propNameRaw === fieldName)
			if (field && field.fieldAccess === FieldAccess.required) {
				style += ' background-color: rgb(219,234,254);'
			}
		}
		this.gui.innerHTML = `<input id="${fieldName}" name="${fieldName}" type="text" style="${style}" readonly value="${this.getDisplayValue(params)}"/>`
	}

	getDisplayValue(params: ICellRendererParams) {
		return params.value ? params.value : ''
	}

	getGui() {
		return this.gui
	}
	refresh(params: ICellRendererParams): boolean {
		return true
	}
}

export class CellRendererParmFieldDate extends CellRendererParmField {}

export class CellRendererParmFieldSelect extends CellRendererParmField {
	getDisplayValue(params: ICellRendererParams) {
		return getSelectDisplayValue(params.data, params.value, params?.colDef?.context.parmFields)
	}
}

export function cellRendererSelectorParmField(params: ICellRendererParams) {
	const codeDataType = getDataRecordValueKey(params.data, 'codeDataType')
	switch (codeDataType) {
		case PropDataType.date:
			return {
				component: CellRendererParmFieldDate
			}
		case PropDataType.uuid:
			return {
				component: CellRendererParmFieldSelect
			}
		case PropDataType.uuidList:
			return {
				component: CellRendererParmFieldSelect
			}
		default:
			error(500, {
				file: FILENAME,
				function: `${FILENAME}.cellRendererSelectorParmField`,
				message: `No case defined for PropDataType: ${codeDataType}`
			})
	}
}

function getSelectDisplayValue(paramsData: DataRecord, parmsValue: any, parmFields: Field[]) {
	let displayValue = ''
	const parmValue = getDataRecordValueKey(paramsData, 'parmValue')
	if (parmValue) {
		const parmFieldName = getDataRecordValueKey(paramsData, 'name')
		const field = parmFields.find((f: Field) => f.colDO.propNameRaw === parmFieldName)
		if (field && field.linkItems) {
			displayValue = field.linkItems.getDisplayValueList(parmsValue)
		}
	}
	return displayValue
}
