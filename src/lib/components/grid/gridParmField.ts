import {
	type ICellEditorComp,
	type ICellEditorParams,
	type ICellRendererComp,
	type ICellRendererParams
} from 'ag-grid-community'
import { Field, FieldAccess } from '$comps/form/field.svelte'
import {
	type DataRecord,
	getArray,
	MethodResult,
	recordValueGet,
	recordValueGetDisplay,
	getValueDisplay,
	PropDataType,
	required
} from '$utils/types'
import { getValDb } from '$utils/utils.evalParserDb'
import { error } from '@sveltejs/kit'

const FILENAME = '$comps/other/gridParmField.ts'

export class CellEditorSelect implements ICellEditorComp {
	gui!: HTMLElement
	params!: ICellEditorParams
	currentValue: any

	init(params: ICellEditorParams) {
		const clazz = 'CellEditorSelect'
		this.params = params
		this.gui = document.createElement('button')
		// this.gui = document.createElement('div')

		this.currentValue = params.value[0]

		// let colDef: any = params.colDef
		// colDef.cellDataType = 'object'
		// params.api.setGridOption('columnDefs', colDef)
		// api.setGridOption('quickFilterText', listFilterQuick)

		// const parmFields = required(params?.colDef?.context.parmFields, clazz, 'parmFields')
		// const fieldName = recordValueGet(params.data, 'name')
		// const field = required(
		// 	parmFields.find((f: Field) => f.colDO.propName === fieldName),
		// 	clazz,
		// 	'field'
		// )

		// let style = 'width: 100%; border: 0; font-size: 14px;'
		// if (field.fieldAccess === FieldAccess.required) {
		// 	style += ' background-color: rgb(219,234,254);'
		// }

		this.gui.addEventListener('click', () => {
			console.log('CellEditorSelect clicked', { params })
			// Simple prompt (you can replace with custom modal)
			const userInput = prompt('Enter value:')
			if (userInput !== null) {
				// this.currentValue = userInput
				// Update grid
				// const parmFields = required(params?.colDef?.context.parmFields, clazz, 'parmFields')
				// const fieldName = recordValueGet(params.data, 'name')
				// const field = required(
				// 	parmFields.find((f: Field) => f.colDO.propName === fieldName),
				// 	clazz,
				// 	'field'
				// )
				const result = params.node.setDataValue('parmValue', this.currentValue)
				this.gui.innerHTML = getValueDisplay(this.currentValue)
			}
		})
		// this.gui.innerHTML = `<input id="${fieldName}" name="${fieldName}" type="text" style="${style}" readonly value="${getValueDisplay(params.value)}"/>`
		// this.gui.innerHTML = `<input id="${fieldName}" name="${fieldName}" type="text" style="${style}" readonly value="${params.value}"/>`
		this.gui.innerHTML = getValueDisplay(params.value)
	}

	getGui() {
		return this.gui
	}

	getValue() {
		let result: MethodResult = getValDb(PropDataType.uuid, undefined)
		if (result.error) return result
		return result.data.value
	}

	refresh(params: ICellEditorParams): boolean {
		// this.gui.innerHTML = `<input id="${params.colDef.field}" name="${params.colDef.field}" type="text" style="width: 100%; border: 0; font-size: 14px;" readonly value="${getValueDisplay(params.value)}"/>`
		const t = Date.now()
		this.gui.innerHTML = `${t}`
		return true
	}
}

export function cellEditorSelectorParmField(params: ICellEditorParams) {
	const codeDataType = recordValueGetDisplay(params.data, 'codeDataType')
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
		const fieldName = recordValueGet(params.data, 'name')
		const field = required(
			parmFields.find((f: Field) => f.colDO.propName === fieldName),
			clazz,
			'field'
		)

		let style = 'width: 100%; border: 0; font-size: 14px;'
		if (field.fieldAccess === FieldAccess.required) {
			style += ' background-color: rgb(219,234,254);'
		}

		// this.gui.innerHTML = `<input id="${fieldName}" name="${fieldName}" type="text" style="${style}" readonly value="${getValueDisplay(params.value)}"/>`
		this.gui.innerHTML = `<input id="${fieldName}" name="${fieldName}" type="text" style="${style}" readonly value="Renderer"/>`
	}

	getGui() {
		return this.gui
	}
	refresh(params: ICellRendererParams): boolean {
		return true
	}
}

export class CellRendererParmFieldDate implements ICellRendererComp {
	eGui!: HTMLSpanElement

	init(params: ICellRendererParams) {
		this.eGui = document.createElement('span')
		if (params.value !== '' || params.value !== undefined) {
			const imgForMood =
				params.value === 'Happy'
					? 'https://www.ag-grid.com/example-assets/smileys/happy.png'
					: 'https://www.ag-grid.com/example-assets/smileys/sad.png'
			this.eGui.innerHTML = `<img width="20px" src="${imgForMood}" />`
		}
	}

	getGui() {
		return this.eGui
	}

	refresh(params: ICellRendererParams): boolean {
		return false
	}
}

export class CellRendererParmFieldSelect implements ICellRendererComp {
	eGui!: HTMLSpanElement

	init(params: ICellRendererParams) {
		this.eGui = document.createElement('span')
		let valueData: any[] = getArray(params.data.parmValue)
		let valueDisplay = valueData
			.map((v: DataRecord) => {
				return v.display
			})
			.join(', ')

		// this.eGui.innerHTML = `Phyll Hall`
		console.log('CellRendererParmFieldSelect.init', { valueDisplay })
		this.eGui.innerHTML = `${valueDisplay}`
		// this.eGui.innerHTML = `Renderer`

		// const t = Date.now()
		// this.eGui.innerHTML = `${t}`
	}

	getGui() {
		return this.eGui
	}

	refresh(params: ICellRendererParams): boolean {
		return false
	}
}

export function cellRendererSelectorParmField(params: ICellRendererParams) {
	const codeDataType = recordValueGetDisplay(params.data, 'codeDataType')
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
				// component: CellRendererParmFieldDate
			}
		default:
			error(500, {
				file: FILENAME,
				function: `${FILENAME}.cellRendererSelectorParmField`,
				msg: `No case defined for PropDataType: ${codeDataType}`
			})
	}
}
