import {
	type ICellEditorComp,
	type ICellEditorParams,
	type ICellRendererComp,
	type ICellRendererParams
} from 'ag-grid-community'
import { Field, FieldAccess, FieldColumnItem } from '$comps/form/field'
import { PropDataType } from '$comps/dataObj/types.rawDataObj'
import { getRecordValue } from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = '$comps/other/gridParmField.ts'

export class CellEditorSelect implements ICellEditorComp {
	// dummy selector for modal select fields
	gui!: HTMLElement
	params!: ICellEditorParams

	init(params: ICellEditorParams) {
		this.params = params
	}

	getGui() {
		return this.gui
	}

	getValue() {
		return this.params.value
	}

	afterGuiAttached() {}

	isPopup() {
		return false
	}
}

export function cellEditorSelectorParmField(params: ICellEditorParams) {
	console.log('gridParmfields.cellEditorSelectorParmField', params)
	const codeDataType = getRecordValue(params.data, 'codeDataType')
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
	gui!: HTMLDivElement

	init(params: ICellRendererParams) {
		this.gui = document.createElement('div')

		let style = 'width: 100%; border: 0; font-size: 14px;'
		const fieldName = getRecordValue(params.data, 'name')
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
		return params.value
	}

	getGui() {
		return this.gui
	}
	refresh(params: ICellRendererParams): boolean {
		return false
	}
}

export class CellRendererParmFieldDate extends CellRendererParmField {
	getDisplayValue(params: ICellRendererParams) {
		return params.value ? params.value : ''
	}
}

export class CellRendererParmFieldSelect extends CellRendererParmField {
	getDisplayValue(params: ICellRendererParams) {
		if (params.value) {
			const parmFieldName = getRecordValue(params.data, 'name')
			const parmFields = params?.colDef?.context.parmFields
			const field = parmFields.find((f: Field) => f.colDO.propNameRaw === parmFieldName)
			const linkItemsSource = field.linkItemsSource
			return linkItemsSource.getDisplayValueList(params.value)
		}
		return ''
	}
}

export function cellRendererSelectorParmField(params: ICellRendererParams) {
	const codeDataType = getRecordValue(params.data, 'codeDataType')
	switch (codeDataType) {
		case PropDataType.date:
			return {
				component: CellRendererParmFieldDate
			}
		case PropDataType.uuid:
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
