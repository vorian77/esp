import {
	type ICellEditorComp,
	type ICellEditorParams,
	type ICellRendererComp,
	type ICellRendererParams
} from 'ag-grid-community'
import { Field, FieldAccess } from '$comps/form/field.svelte'
import {
	type DataRecord,
	getDataRecordValueKey,
	getDataRecordValueKeyData,
	getDataRecordValueKeyDisplay,
	getValueDisplay,
	PropDataType,
	required
} from '$utils/types'
import { PropLinkItems } from '$comps/dataObj/types.rawDataObj.svelte'
import { error } from '@sveltejs/kit'

const FILENAME = '$comps/other/gridParmField.ts'

export class CellEditorSelect implements ICellEditorComp {
	// dummy selector for modal select fields
	gui!: HTMLElement
	params!: ICellEditorParams

	init(params: ICellEditorParams) {
		const clazz = 'CellEditorSelect'
		this.gui = document.createElement('div')
		this.params = params

		const parmFields = required(params?.colDef?.context.parmFields, clazz, 'parmFields')
		const fieldName = getDataRecordValueKey(params.data, 'name')
		const field = required(
			parmFields.find((f: Field) => f.colDO.propNameRaw === fieldName),
			clazz,
			'field'
		)

		let style = 'width: 100%; border: 0; font-size: 14px;'
		if (field.fieldAccess === FieldAccess.required) {
			style += ' background-color: rgb(219,234,254);'
		}

		this.gui.innerHTML = `<input id="${fieldName}" name="${fieldName}" type="text" style="${style}" readonly value="${getValueDisplay(params.value)}"/>`
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
	const codeDataType = getDataRecordValueKeyDisplay(params.data, 'codeDataType')

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
				msg: `No case defined for PropDataType: ${codeDataType}`
			})
	}
}

export class CellRendererParmField implements ICellRendererComp {
	gui!: HTMLElement
	params!: ICellRendererParams

	init(params: ICellRendererParams) {
		const clazz = 'CellRendererParmField'
		this.gui = document.createElement('div')
		this.params = params

		const parmFields = required(params?.colDef?.context.parmFields, clazz, 'parmFields')
		const fieldName = getDataRecordValueKey(params.data, 'name')
		const field = required(
			parmFields.find((f: Field) => f.colDO.propNameRaw === fieldName),
			clazz,
			'field'
		)

		let style = 'width: 100%; border: 0; font-size: 14px;'
		if (field.fieldAccess === FieldAccess.required) {
			style += ' background-color: rgb(219,234,254);'
		}

		this.gui.innerHTML = `<input id="${fieldName}" name="${fieldName}" type="text" style="${style}" readonly value="${getValueDisplay(params.value)}"/>`
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
		return getValueDisplay(params.value)
	}
}

export function cellRendererSelectorParmField(params: ICellRendererParams) {
	const codeDataType = getDataRecordValueKeyDisplay(params.data, 'codeDataType')
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
				msg: `No case defined for PropDataType: ${codeDataType}`
			})
	}
}
