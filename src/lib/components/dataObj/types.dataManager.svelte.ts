import { State } from '$comps/app/types.appState.svelte'
import {
	DataObj,
	DataObjCardinality,
	type DataRecord,
	DataRecordStatus,
	DataRow,
	DataRows,
	DataObjSaveMode
} from '$lib/components/dataObj/types.dataObj.svelte'
import { Validation, ValidationStatus, ValidityErrorLevel } from '$comps/form/types.validation'
import { getArray, PropDataType, ValidityError, valueHasChanged } from '$utils/types'
import { Field, FieldAccess, FieldClassType, FieldElement } from '$comps/form/field.svelte'
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
	nodes: Map<string, DataManagerNode> = new Map<string, DataManagerNode>()
	objStatus: DataObjStatus = $state(new DataObjStatus())
	sm: State
	constructor(sm: State) {
		this.sm = sm
	}

	filterList(dataObjId: string, filter: string) {
		return this.getNode(dataObjId)?.filterList(filter)
	}

	getDataObj(dataObjId: string): DataObj | undefined {
		return this.getNode(dataObjId)?.dataObj
	}

	getDataSave() {
		const nodeRoot = this.getNodeRoot()
		if (nodeRoot) {
			let data = nodeRoot.dataObj.data
			data.rowsSave = nodeRoot.getDataSave()
			data.fields.forEach((field) => {
				const dataObjId = field.dataObjIdEmbed
				const node = this.getNode(dataObjId)
				if (node) field.data.rowsSave = node.getDataSave()
			})
			return data
		} else {
			error(500, {
				file: FILENAME,
				function: 'DataManager.getDataSave',
				message: `No root node defined.`
			})
		}
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
	getRecordId(dataObjId: string, row: number): string | undefined {
		return this.getNode(dataObjId)?.recordsDisplay[row].id
	}

	getRecordsDisplayList(dataObjId: string): DataRecord[] {
		return this.getNode(dataObjId)?.recordsDisplay || []
	}

	getRecordsDisplayListCount(dataObjId: string) {
		return this.getNode(dataObjId)?.recordsDisplay.length || 0
	}

	getRecordsDisplayRow(dataObjId: string, row: number): DataRecord | undefined {
		return this.getNode(dataObjId)?.recordsDisplay[row]
	}

	getStatus() {
		return this.objStatus.getStatus()
	}
	getStatusNode(dataObjId: string) {
		return this.getNode(dataObjId)?.objStatus.getStatus()
	}
	init(dataObj: DataObj) {
		this.reset()
		this.nodeAdd(dataObj)
	}
	isStatusChanged() {
		return this.objStatus.isChanged()
	}
	isStatusChangedNode(dataObjId: string) {
		return this.getNode(dataObjId)?.objStatus.isChanged()
	}
	isStatusValid() {
		return this.objStatus.isValid()
	}
	isStatusValidNode(dataObjId: string) {
		return this.getNode(dataObjId)?.objStatus.isValid()
	}
	nodeAdd(dataObj: DataObj) {
		this.nodes.set(dataObj.raw.id, new DataManagerNode(this.sm, dataObj))
		this.setStatus()
	}
	reset() {
		this.resetStatus()
		this.nodes = new Map<string, DataManagerNode>()
	}

	resetStatus() {
		this.objStatus.reset()
	}
	async setFieldValue(dataObjId: string, row: number, field: Field, value: any) {
		const node = this.getNode(dataObjId)
		if (node) {
			await node.setFieldVal(row, field, value)
			this.setStatus()
		}
	}
	setStatus() {
		let newStatus = new DataObjStatus()
		this.nodes.forEach((node) => {
			newStatus.update(node.setStatus())
		})
		this.objStatus = newStatus
	}
}

export class DataManagerNode {
	dataObj: DataObj
	fieldsChanged: FieldValues = $state(new FieldValues())
	fieldsValidity: FieldValues = $state(new FieldValues())
	objStatus: DataObjStatus = $state(new DataObjStatus())
	recordsDisplay: DataRecord[] = $state([])
	recordsHidden: DataRecord[] = $state([])
	sm: State
	constructor(sm: State, dataObj: DataObj) {
		this.dataObj = this.initDataObjData(dataObj)
		this.sm = sm
		this.initDataObjItemChanges()
		this.initDataObjValidate()
	}

	filterList(filter: string) {
		const search = filter.toLowerCase()
		let filteredIds: string[] = []
		const records: DataRecord[] = [...this.recordsDisplay, ...this.recordsHidden]
		records.filter((record) => {
			this.dataObj.fields.forEach((field) => {
				const propName = field.colDO.propName
				const dataType = field.colDO.colDB.codeDataType
				switch (dataType) {
					case PropDataType.bool:
						if (
							(record[propName] && search === 'true') ||
							(!record[propName] && search === 'false')
						)
							filteredIds.push(record.id)
						break

					case PropDataType.date:
						const date = new Date(record[propName])
						const filterDate = new Date(filter)
						if (date.toDateString() === filterDate.toDateString()) {
							filteredIds.push(record.id)
						}
						break

					case PropDataType.int16:
					case PropDataType.int32:
					case PropDataType.int64:
						if (record[propName].toString().includes(search)) {
							filteredIds.push(record.id)
						}
						break

					case PropDataType.str:
						if (record[propName].toString().toLowerCase().includes(search)) {
							filteredIds.push(record.id)
						}
						break

					default:
				}
			})
		})
		this.recordsDisplay = records.filter((r) => filteredIds.includes(r.id))
		this.recordsHidden = records.filter((r) => !filteredIds.includes(r.id))
	}

	getDataSave() {
		let rowsSave: DataRows = new DataRows()
		rowsSave.addRows(this.getDataSaveRows(this.recordsDisplay))
		rowsSave.addRows(this.getDataSaveRows(this.recordsHidden))
		return rowsSave
	}

	getDataSaveRows(dataRecords: DataRecord[]) {
		let rowsSave: DataRow[] = []
		dataRecords.forEach((record) => {
			let newRecord: DataRecord = {}
			Object.entries(record).forEach(([key, value]) => {
				if (![null, undefined].includes(value)) {
					newRecord[key] = value
				}
			})
			const oldStatus = this.dataObj.data.rowsRetrieved.getRowStatusById(record.id)
			rowsSave.push(new DataRow(oldStatus ? oldStatus : DataRecordStatus.preset, newRecord))
		})
		return rowsSave
	}

	getFieldValidity(row: number, field: Field) {
		return row < this.recordsDisplay.length
			? this.fieldsValidity.valueGet(this.recordsDisplay[row].id, field.colDO.propName)
			: undefined
	}
	getFieldValue(row: number, field: Field) {
		return row < this.recordsDisplay.length
			? this.recordsDisplay[row][field.colDO.propName]
			: undefined
	}

	initDataObjData(dataObj: DataObj) {
		dataObj.saveMode =
			dataObj.data.cardinality === DataObjCardinality.detail &&
			dataObj.data.rowsRetrieved.hasRecord()
				? dataObj.data.rowsRetrieved.getDetailRowStatusIs(DataRecordStatus.preset)
					? DataObjSaveMode.insert
					: DataObjSaveMode.update
				: DataObjSaveMode.any

		// update row status
		dataObj.data.rowsRetrieved.getRows().forEach((dataRow) => {
			if (dataRow.status === DataRecordStatus.inserted) {
				dataRow.status = DataRecordStatus.update
			}
		})

		let recordsClone: DataRecord[] = []
		const linkItemFields = dataObj.fields.filter((f) => f.colDO.linkItemsSource)
		dataObj.data.rowsRetrieved.getRows().forEach((dataRow, rowIdx) => {
			if (dataRow.status !== DataRecordStatus.delete) {
				recordsClone.push({ ...dataRow.record })

				// set link items
				linkItemFields.forEach((f) => {
					const propName = f.colDO.propName
					const items = dataObj.data.items[propName]
					if (items) f.linkItems?.setRawItems(getArray(items))
				})
			}
		})

		// listEdit
		if (dataObj.raw.isListEdit) {
			const presetRows = dataObj.data.rowsRetrieved
				.getRows()
				.filter((row) => row.record.id.startsWith('preset_'))
			presetRows.forEach((row) => {
				this.fieldsChanged.valueSet(row.record.id + '_new', 'id', true)
			})
		}

		this.recordsDisplay = recordsClone
		this.fieldsChanged = new FieldValues()
		this.fieldsValidity = new FieldValues()

		return dataObj
	}

	initDataObjItemChanges() {
		this.recordsDisplay.forEach((record, row) => {
			this.dataObj.fields.forEach((f) => {
				this.setFieldItemChanged(row, f, record[f.colDO.propName])
			})
		})
	}

	initDataObjValidate() {
		const validityErrorLevel =
			this.dataObj.raw.isInitialValidationSilent ||
			this.dataObj.data.rowsRetrieved.getDetailRowStatusIs(DataRecordStatus.preset)
				? ValidityErrorLevel.silent
				: ValidityErrorLevel.warning

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

	setStatus() {
		let newStatus = new DataObjStatus()

		this.recordsDisplay.forEach((r) => {
			const recordId = r.id
			this.dataObj.fields.forEach((f) => {
				if (
					([FieldClassType.parm, FieldClassType.regular].includes(f.classType) &&
						[FieldAccess.optional, FieldAccess.required].includes(f.fieldAccess)) ||
					f.colDO.propName === this.dataObj.raw.listReorderColumn
				) {
					newStatus.update(this.setStatusField(recordId, f))
				}
			})
		})
		this.objStatus = newStatus
		return newStatus
	}

	setStatusField(recordId: string, field: Field) {
		const newStatus = new DataObjStatus()
		const propName = field.colDO.propName

		// changed
		const isChanged = this.fieldsChanged.valueExists(recordId, propName) || false
		newStatus.setChanged(isChanged)

		// valid
		const validity = this.fieldsValidity.valueGet(recordId, propName)
		newStatus.setValid(validity === undefined || validity.error === ValidityError.none)

		return newStatus
	}

	async setFieldVal(row: number, field: Field, value: any) {
		const recordId = this.recordsDisplay[row].id
		const fieldName = field.colDO.propName
		this.recordsDisplay[row][fieldName] = value
		this.setFieldValChanged(row, recordId, fieldName, value)
		this.setFieldValValidity(row, recordId, field)
		if (this.dataObj.raw.listReorderColumn && this.dataObj.embedField) {
			const reorderColumn = this.dataObj.raw.listReorderColumn
			this.recordsDisplay.sort((a, b) => a[reorderColumn] - b[reorderColumn])
		}
		await this.setFieldItemChanged(row, field, value)
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
	async setFieldItemChanged(row: number, field: Field, value: any) {
		await field.processItemChanges(this.sm, row, value, this)
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
	valueExists(recordId: string, fieldName: string) {
		const isExists =
			this.values.findIndex((v) => v.recordId === recordId && v.fieldName === fieldName) > -1
		return isExists
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
