import { SvelteMap } from 'svelte/reactivity'
import {
	DataObj,
	DataObjEmbedType,
	type DataRecord,
	DataRecordStatus,
	DataRows
} from '$lib/components/dataObj/types.dataObj.svelte'
import { Validation, ValidationStatus, ValidityErrorLevel } from '$comps/form/types.validation'
import { Validity, valueHasChanged } from '$utils/types'
import { Field, FieldAccess } from '$comps/form/field'
import { FieldEmbed } from '$comps/form/fieldEmbed'
// import { FieldEmbedShell } from '$comps/form/fieldEmbedShell'
// import { FieldInfo } from '$comps/form/fieldParm'
// import { Field, FieldAccess, FieldEmbed, FieldEmbedShell, FieldParm } from '$comps/form/types.field'
import { error } from '@sveltejs/kit'

const FILENAME = '$comps/dataObj/types.dataManager.svelte'

export class DataObjStatus {
	objHasChanged: boolean = $state(false)
	objValidToSave: boolean = $state(true)
	constructor() {}
	getStatus() {
		return { objHasChanged: this.objHasChanged, objValidToSave: this.objValidToSave }
	}
	isChanged() {
		return this.objHasChanged
	}
	isValid() {
		return this.objValidToSave
	}
	reset() {
		this.objHasChanged = false
		this.objValidToSave = true
	}
	setChanged(status: boolean) {
		this.objHasChanged = status
	}
	setValid(status: boolean) {
		this.objValidToSave = status
	}
	update(currentStatus: DataObjStatus) {
		this.objHasChanged = this.objHasChanged || currentStatus.objHasChanged
		this.objValidToSave = this.objValidToSave && currentStatus.objValidToSave
		return this
	}
}

export class DataManager {
	nodes: SvelteMap<string, DataManagerNode> = $state(new SvelteMap<string, DataManagerNode>())
	objStatus: DataObjStatus = $state(new DataObjStatus())
	value: number = $state(0)
	constructor() {}

	addNode(dataObj: DataObj) {
		this.nodes.set(dataObj.raw.id, new DataManagerNode(dataObj))
	}
	addNodeParent(dataObj: DataObj, dataObjIdParent: string) {
		this.addNode(dataObj)
		this.nodes.get(dataObj.raw.id)?.setParent(dataObjIdParent)
	}

	getDataObj(dataObjId: string): DataObj | undefined {
		return this.getNode(dataObjId)?.dataObj
	}

	getDataRecord(dataObjId: string, row: number): DataRecord | undefined {
		return this.getNode(dataObjId)?.recordsDisplay[row]
	}

	getDataSave() {
		let dataSave = new DataRows()

		// root data
		// this.data.rowsSave.setDataRows(setData(this))
		// dataSave.setDataRows(setData(this.node['0']?.dataObj))

		this.nodes.forEach((node) => {})

		// embedded fields
		// this.dataObj.fields.forEach((field: Field) => {
		// 	if (field instanceof FieldEmbed && field.dataObj) {
		// 		const idx = this.data.fields.findIndex((f) => f.embedFieldName === field.colDO.propName)
		// 		if (idx > -1) {
		// 			this.data.fields[idx].data.rowsSave.setDataRows(setData(field.dataObj))
		// 			this.data.fields[idx].data.parms.valueSet(
		// 				ParmsValuesType.embedParentId,
		// 				field.embedParentId
		// 			)
		// 			this.data.fields[idx].data.parms.valueSet(
		// 				ParmsValuesType.embedListSave,
		// 				field.embedType === DataObjEmbedType.listEdit
		// 			)
		// 		}
		// 	}
		// })

		// return this.data

		function setData(dataObj: DataObj) {
			// 	let fieldsParmValueNames: string[] = []
			// 	dataObj.fields.forEach((f) => {
			// 		if (f.isParmValue) {
			// 			const fieldParm: FieldParm = f
			// 			fieldParm.parmFields.forEach((f) => {
			// 				fieldsParmValueNames.push(f.colDO.propName)
			// 			})
			// 		}
			// 	})
			// 	let dataRows: DataRow[] = setDataRecords(
			// 		fieldsParmValueNames,
			// 		dataObj.data,
			// 		dataObj.dataRecordsDisplay
			// 	)
			// 	dataRows = dataRows.concat(
			// 		setDataRecords(fieldsParmValueNames, dataObj.data, dataObj.dataRecordsHidden)
			// 	)
			// 	return dataRows
			// }
			// function setDataRecords(
			// 	fieldsParmValueNames: string[],
			// 	dataCurrent: DataObjData,
			// 	dataRecords: DataRecord[]
			// ) {
			// 	let dataRows: DataRow[] = []
			// 	dataRecords.forEach((record) => {
			// 		let newRecord: DataRecord = {}
			// 		Object.entries(record).forEach(([key, value]) => {
			// 			if (![null, undefined].includes(value)) {
			// 				// don't included embedded fields
			// 				if (-1 === dataCurrent.fields.findIndex((f) => f.embedFieldName === key)) {
			// 					// don't include null or undefined values
			// 					if (fieldsParmValueNames.includes(key)) {
			// 						// <todo> temp parmValue
			// 						// newRecord.parmValue = record[key]
			// 						// delete newRecord[key]
			// 					} else {
			// 						newRecord[key] = value
			// 					}
			// 				}
			// 			}
			// 		})
			// 		const oldStatus = dataCurrent.rowsRetrieved.getRowStatusById(record.id)
			// 		dataRows.push(new DataRow(oldStatus ? oldStatus : DataRecordStatus.preset, newRecord))
			// 	})
			// return dataRows
		}
	}

	getFieldData(dataObjId: string, row: number, field: Field) {
		const node = this.getNode(dataObjId)

		if (node) {
			const id = node.recordsDisplay[row]['id']
			const fieldName = field.colDO.propName
			const fieldValue = node.recordsDisplay[row][fieldName]
			const fieldValidity = node.fieldsValidity.valueGet(id, fieldName)
			return { fieldValue, fieldValidity }
		}
		error(500, {
			file: FILENAME,
			function: 'getFieldData',
			message: `Cannot get field value - dataObjId: ${dataObjId}, row: ${row}, field: ${field.colDO.propName}`
		})
	}
	getFieldNode(field: Field, node: DataManagerNode) {
		if (field instanceof FieldEmbed && field.dataObj) {
			return this.getNode(field.dataObj.raw.id)
		}
		return node
	}
	getFieldValidity(dataObjId: string, row: number, field: Field) {
		return this.getNode(dataObjId)?.getFieldValidity(row, field)
	}
	getFieldValue(dataObjId: string, row: number, field: Field) {
		return this.getNode(dataObjId)?.getFieldValue(row, field)
	}
	getNode(dataObjId: string): DataManagerNode | undefined {
		return dataObjId ? this.nodes.get(dataObjId) : undefined
	}
	getNodeRoot() {
		const iterator = this.nodes.entries()
		const mapEntry = iterator.next().value
		return mapEntry ? mapEntry[1] : undefined
	}
	getRowsRetrieved(dataObjId: string): DataRows | undefined {
		return this.getDataObj(dataObjId)?.data.rowsRetrieved
	}
	getStatus() {
		return this.objStatus.getStatus()
	}

	increment = () => {
		this.value++
		this.nodes.get('0')?.increment()
	}

	init(dataObj: DataObj) {
		this.objStatus.reset()
		this.nodes = new SvelteMap<string, DataManagerNode>()
		this.addNode(dataObj)
	}
	isStatusChanged() {
		return this.objStatus.isChanged()
	}
	isStatusValid() {
		return this.objStatus.isValid()
	}
	resetStatus() {
		this.objStatus.reset()
	}

	setFieldValue(dataObjId: string, row: number, field: Field, value: any) {
		const node = this.getNode(dataObjId)
		if (node) {
			node.setFieldVal(row, field, value)
			this.objStatus = this.setFieldValueStatus()
		}
	}
	setFieldValueStatus() {
		let newStatus = new DataObjStatus()

		const node = this.getNodeRoot()
		if (node) {
			let fields: [Field, string][] = node.dataObj.fields.map((f) => [f, node.dataObj.raw.id])
			while (fields.length > 0) {
				const field = fields.pop()
				// if (field instanceof FieldEmbedShell) {
				// 	// do nothing - status set in the embedded fields
				// } else if (field instanceof FieldEmbed) {
				// 	if (field.dataObj) {
				// 		fields = fields.concat(field.dataObj.fields.map((f) => [f, field?.dataObj?.raw.id!]))
				// 	}
				// } else if (field) {
				// 	const fieldNode = this.getNode(field[1])
				// 	if (fieldNode) {
				// 		// newStatus.update(fieldNode.getStatus(field))
				// 	}
				// }
			}
		}
		return newStatus
	}
}

export class DataManagerNode {
	dataObj: DataObj
	#parent?: string = $state('')
	fieldsChanged: FieldValues = $state(new FieldValues())
	fieldsValidity: FieldValues = $state(new FieldValues())
	recordsDisplay: DataRecord[] = $state([])
	recordsHidden: DataRecord[] = $state([])
	constructor(dataObj: DataObj, parentId?: string) {
		this.dataObj = dataObj
		this.setData()
	}
	get parent(): string | undefined {
		return this.#parent
	}
	set parent(dataObjId: string) {
		this.#parent = dataObjId
	}
	getFieldValidity(row: number, field: Field) {
		return this.fieldsValidity.valueGet(this.recordsDisplay[row].id, field.colDO.propName)
	}
	getFieldValue(row: number, field: Field) {
		return this.recordsDisplay[row][field.colDO.propName]
	}
	getStatus(field: Field) {
		let newStatus = new DataObjStatus()
		this.recordsDisplay.forEach((r) => {
			const recordId = r.id
			if (
				([FieldAccess.optional, FieldAccess.required].includes(field.fieldAccess) &&
					!field.colDO.colDB.isNonData) ||
				field.colDO.propName === this.dataObj.raw.listReorderColumn
			) {
				const statusField = field.getStatus(this, recordId)
				newStatus.update(statusField)
			}
		})
		return newStatus
	}

	increment() {
		// this.#parent = val.toString()
	}
	preValidate() {
		const validityErrorLevel =
			this.dataObj.raw.isListEdit ||
			this.dataObj.data.rowsRetrieved.getDetailRowStatusIs(DataRecordStatus.retrieved)
				? ValidityErrorLevel.warning
				: ValidityErrorLevel.none

		this.recordsDisplay.forEach((record, row) => {
			this.dataObj.fields.forEach((f) => {
				const v: Validation = f.validate(row, record[f.colDO.propName], validityErrorLevel)
				if (v.status === ValidationStatus.invalid) {
					this.fieldsValidity.valueSet(
						record.id,
						v.validityFields[0].fieldName,
						v.validityFields[0].validity
					)
				}
			})
		})
	}

	setData() {
		// set data
		let recordsClone: DataRecord[] = []
		// const parmValueFields: FieldParm[] = this.dataObj.fields.filter((f) => f.isParmValue)
		this.dataObj.data.rowsRetrieved.getRows().forEach((dataRow, rowIdx) => {
			if (dataRow.status !== DataRecordStatus.delete) {
				const record = dataRow.record
				// init parmValue
				// parmValueFields.forEach((field) => {
				// 	const parmFieldName = field.parmFields[rowIdx].colDO.propName
				// 	if (!Object.hasOwn(record, parmFieldName)) {
				// 		// <todo> temp parmValue
				// 		// record[parmFieldName] = record.parmValue
				// 		// delete record.parmValue
				// 	}
				// })
				recordsClone.push({ ...record })
			}
		})

		// listEdit
		if (this.dataObj.raw.isListEdit) {
			const presetRows = this.dataObj.data.rowsRetrieved
				.getRows()
				.filter((row) => row.record.id.startsWith('preset_'))
			presetRows.forEach((row) => {
				this.fieldsChanged.valueSet(row.record.id + '_new', 'id', true)
			})
		}

		this.recordsDisplay = recordsClone
		this.fieldsChanged = new FieldValues()
		this.fieldsValidity = new FieldValues()

		this.preValidate()
	}

	setParent(val: string) {
		this.#parent = val
	}
	setFieldVal(row: number, field: Field, value: any) {
		const recordId = this.recordsDisplay[row].id

		const fieldName = field.colDO.propName
		this.recordsDisplay[row][fieldName] = value

		this.setFieldValChanged(row, recordId, fieldName, value)
		this.setFieldValValidity(row, recordId, field)
		if (this.dataObj.raw.listReorderColumn && this.dataObj.fieldEmbed) {
			const reorderColumn = this.dataObj.raw.listReorderColumn
			this.recordsDisplay.sort((a, b) => a[reorderColumn] - b[reorderColumn])
		}
		return this
	}
	setFieldValChanged(row: number, recordId: string, fieldName: string, value: any) {
		const valueInitial = this.dataObj.data.rowsRetrieved.getRowValueById(recordId, fieldName)
		const hasChanged = valueHasChanged(valueInitial, value)
		if (hasChanged) {
			this.fieldsChanged.valueSet(recordId, fieldName, hasChanged)
		} else {
			this.fieldsChanged.valueDrop(recordId, fieldName)
		}
	}
	setFieldValValidity(row: number, recordId: string, field: Field) {
		const v: Validation = field.validate(
			row,
			this.recordsDisplay[row][field.colDO.propName],
			ValidityErrorLevel.warning
		)
		v.validityFields.forEach(({ fieldName, validity }) => {
			this.fieldsValidity.valueSet(recordId, fieldName, validity)
		})
	}
}

export class FieldValue {
	fieldName: string
	recordId: string
	value: any = $state()
	constructor(recordId: string, fieldName: string, value: any) {
		this.fieldName = fieldName
		this.recordId = recordId
		this.value = value
	}
}

export class FieldValues {
	values: FieldValue[] = $state([])
	constructor() {}
	valueDrop(recordId: string, fieldName: string) {
		this.values = this.values.filter((v) => v.recordId !== recordId || v.fieldName !== fieldName)
	}
	valueGet(recordId: string, fieldName: string) {
		const value = this.values.find((v) => v.recordId === recordId && v.fieldName === fieldName)
		return value ? value.value : undefined
	}
	valueSet(recordId: string, fieldName: string, value: any) {
		const valueIdx = this.values.findIndex(
			(v) => v.recordId === recordId && v.fieldName === fieldName
		)
		if (valueIdx > -1) {
			this.values[valueIdx].value = value
		} else {
			this.values.push(new FieldValue(recordId, fieldName, value))
		}
	}
}
