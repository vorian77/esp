import { State } from '$comps/app/types.state.svelte'

import {
	DataObj,
	DataObjCardinality,
	DataRecordStatus,
	DataRow,
	DataRows,
	DataObjSaveMode
} from '$lib/components/dataObj/types.dataObj.svelte'
import { Validation, ValidationStatus, ValidityErrorLevel } from '$comps/form/types.validation'
import {
	type DataRecord,
	EligibilityType,
	getArray,
	getValueData,
	ParmsValuesFormList,
	PropDataType,
	recordValueGet,
	recordValueGetData,
	recordValueSet,
	ValidityError,
	valueHasChanged
} from '$utils/types'
import { Field, FieldAccess, FieldClassType } from '$comps/form/field.svelte'
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
	fieldChange: boolean = $state(false)
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
				const dataObjId = field.rawFieldEmbedList.embedDataObjId
				const node = this.getNode(dataObjId)
				if (node) field.embedData.rowsSave = node.getDataSave()
			})
			return data
		} else {
			error(500, {
				file: FILENAME,
				function: 'DataManager.getDataSave',
				msg: `No root node defined.`
			})
		}
	}
	getFieldChange() {
		return this.fieldChange
	}

	getFieldValidity(dataObjId: string, row: number, field: Field) {
		return this.getNode(dataObjId)?.getFieldValidity(row, field)
	}
	getFieldValue(dataObjId: string, row: number, field: Field): any {
		return this.getNode(dataObjId)?.getFieldValue(row, field)
	}

	getValue(dataObjId: string, row: number, propName: string): any {
		return this.getNode(dataObjId)?.valueGet(row, propName)
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
		return this.getNode(dataObjId)?.valueGet(row, 'id')
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

	async init(dataObj: DataObj) {
		this.reset()
		await this.nodeAdd(dataObj)
	}

	isStatusChanged() {
		return this.objStatus.isChanged()
	}
	isStatusValid() {
		return this.objStatus.isValid()
	}
	isStatusValidNode(dataObjId: string) {
		const dmObjStatus = this.objStatus // trigger status change
		return this.getNode(dataObjId)?.objStatus.isValid()
	}

	async nodeAdd(dataObj: DataObj) {
		const newNode = new DataManagerNode(this.sm, dataObj)
		await newNode.initDataObjItemChanges()
		newNode.initDataObjValidate()
		this.nodes.set(dataObj.raw.id, newNode)
		this.setStatus()
	}
	reset() {
		this.resetStatus()
		this.nodes = new Map<string, DataManagerNode>()
	}

	resetStatus() {
		this.objStatus.reset()
	}
	async setFieldValueAsync(
		dataObjId: string,
		row: number,
		field: Field,
		value: any,
		fCallback?: Function
	) {
		const node = this.getNode(dataObjId)
		if (node) {
			await node.setFieldValAsync(row, field, value)
			this.setFieldValuePost(node, row, field, fCallback)
			if (fCallback) await fCallback(this, dataObjId, row, field)
		}
	}

	setFieldValuePost(node: DataManagerNode, row: number, field: Field, fCallback?: Function) {
		this.setStatus()
		this.fieldChange = !this.fieldChange
	}

	setFieldValueSync(
		dataObjId: string,
		row: number,
		field: Field,
		value: any,
		fCallback?: Function
	) {
		const node = this.getNode(dataObjId)
		if (node) {
			node.setFieldValProcess(row, field, value)
			this.setFieldValuePost(node, row, field, fCallback)
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
	}

	filterList(filter: string) {
		const search = filter.toLowerCase()
		let filteredIds: string[] = []
		const records: DataRecord[] = [...this.recordsDisplay, ...this.recordsHidden]
		records.filter((record) => {
			this.dataObj.fields.forEach((field) => {
				const key = field.getValueKey()
				const dataType = field.colDO.colDB.codeDataType
				const value = recordValueGet(record, key)
				switch (dataType) {
					case PropDataType.bool:
						if ((value && search === 'true') || (!value && search === 'false'))
							filteredIds.push(record.id)
						break

					case PropDataType.date:
						const date = new Date(value)
						const filterDate = new Date(filter)
						if (date.toDateString() === filterDate.toDateString()) {
							filteredIds.push(record.id)
						}
						break

					case PropDataType.int16:
					case PropDataType.int32:
					case PropDataType.int64:
						if (value.toString().includes(search)) {
							filteredIds.push(record.id)
						}
						break

					case PropDataType.str:
						if (value.toString().toLowerCase().includes(search)) {
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
		dataRecords.forEach((record, i) => {
			let newRecord: DataRecord = {}
			Object.entries(record).forEach(([key, value]) => {
				if (![null, undefined].includes(value)) {
					newRecord[key] = getValueData(value)
				}
			})
			const oldStatus = this.dataObj.data.rowsRetrieved.getRowStatusById(record.id)
			rowsSave.push(new DataRow(oldStatus ? oldStatus : DataRecordStatus.preset, newRecord))
		})
		return rowsSave
	}

	getFieldValidity(row: number, field: Field) {
		return row < this.recordsDisplay.length
			? this.fieldsValidity.valueGet(this.valueGet(row, 'id'), field.getValueKey())
			: undefined
	}
	getFieldValue(row: number, field: Field) {
		return this.valueGet(row, field.getValueKey())
	}

	initDataObjData(dataObj: DataObj) {
		dataObj.isDetailPreset =
			dataObj.data.cardinality === DataObjCardinality.detail &&
			dataObj.data.rowsRetrieved.getDetailRowStatusIs(DataRecordStatus.preset)

		dataObj.saveMode =
			dataObj.data.cardinality === DataObjCardinality.detail &&
			dataObj.data.rowsRetrieved.hasRecord()
				? dataObj.data.rowsRetrieved.getDetailRowStatusIs(DataRecordStatus.preset)
					? DataObjSaveMode.insert
					: DataObjSaveMode.update
				: DataObjSaveMode.any

		// format data
		let recordsClone: DataRecord[] = []
		dataObj.data.rowsRetrieved.getRows().forEach((dataRow, i) => {
			if (dataRow.status === DataRecordStatus.inserted) {
				dataRow.status = DataRecordStatus.update
			}

			// set preset
			if (!dataRow.record.id) {
				dataRow.status = DataRecordStatus.preset
				const id = 'preset_' + i
				dataRow.record.id = id
				this.fieldsChanged.valueSet(id, 'id', true)
			}

			if (dataRow.status !== DataRecordStatus.delete) {
				recordsClone.push({ ...dataRow.record })
			}
		})

		// set link items
		const linkItemFields = dataObj.fields.filter((f) => f.colDO.linkItemsSource)
		linkItemFields.forEach((f) => {
			const items = recordValueGet(dataObj.data.itemsFields, f.getValueKey())
			if (items) f.linkItems?.setRawItems(getArray(items))
		})

		this.recordsDisplay = recordsClone
		this.fieldsChanged = new FieldValues()
		this.fieldsValidity = new FieldValues()
		return dataObj
	}

	async initDataObjItemChanges() {
		for (const [row, record] of this.recordsDisplay.entries()) {
			for (const f of this.dataObj.fields) {
				await this.setFieldItemChanged(row, f, recordValueGetData(record, f.getValueKey()))
			}
		}
	}

	initDataObjValidate() {
		const validityErrorLevel =
			this.dataObj.raw.isInitialValidationSilent ||
			this.dataObj.data.rowsRetrieved.getDetailRowStatusIs(DataRecordStatus.preset)
				? ValidityErrorLevel.silent
				: ValidityErrorLevel.warning

		this.recordsDisplay.forEach((record, row) => {
			this.dataObj.fields.forEach((f) => {
				const v: Validation = f.validate(
					row,
					recordValueGetData(record, f.getValueKey()),
					validityErrorLevel
				)
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

	async setFieldItemChanged(row: number, field: Field, value: any) {
		return await field.processItemChanges(this.sm, row, value, this)
	}

	async setFieldValAsync(row: number, field: Field, value: any) {
		this.setFieldValProcess(row, field, value)
		await this.setFieldItemChanged(row, field, value)
	}

	setFieldValProcess(row: number, field: Field, value: any) {
		const recordId = this.valueGet(row, 'id')
		const key = field.getValueKey()
		this.valueSet(row, key, value)
		this.setFieldValDataChanged(recordId, key, value)
		this.setFieldValDataValidity(row, recordId, field)
		if (this.dataObj.raw.listReorderColumn && this.dataObj.embedField) {
			const reorderColumn = this.dataObj.raw.listReorderColumn
			this.recordsDisplay.sort((a, b) => a[reorderColumn] - b[reorderColumn])
		}
	}

	setFieldValDataChanged(recordId: string, key: string, value: any) {
		const valueInitial = this.dataObj.data.rowsRetrieved.getRowValueById(recordId, key)
		const hasChanged = valueHasChanged(valueInitial, value)
		if (hasChanged) {
			this.fieldsChanged.valueSet(recordId, key, hasChanged)
		} else {
			this.fieldsChanged.valueDrop(recordId, key)
		}
	}

	setFieldValDataValidity(row: number, recordId: string, field: Field) {
		const v: Validation = field.validate(
			row,
			this.valueGet(row, field.getValueKey()),
			ValidityErrorLevel.warning
		)
		v.validityFields.forEach(({ fieldName, validity }) => {
			this.fieldsValidity.valueSet(recordId, fieldName, validity)
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
					f.getValueKey() === this.dataObj.raw.listReorderColumn
				) {
					if (f.colDO.rawfieldEmbedDetailEligibility) {
						const elig = f.colDO.rawfieldEmbedDetailEligibility
						elig.nodes.forEach((node) => {
							if (
								[EligibilityType.eligibilityExpr, EligibilityType.eligibilityManual].includes(
									node.codeEligibilityType
								)
							) {
								// const propName = elig.getPropName(node.id)
								const propName = 'nodeValues.' + node.name + '.valueBoolean'
								newStatus.update(this.setStatusField(recordId, propName))
							}
						})
					} else {
						newStatus.update(this.setStatusField(recordId, f.getPropName()))
					}
				}
			})
		})
		this.objStatus = newStatus
		return newStatus
	}

	setStatusField(recordId: string, key: string) {
		const newStatus = new DataObjStatus()

		// changed
		const isChanged = this.fieldsChanged.valueExists(recordId, key) || false
		newStatus.setChanged(isChanged)

		// valid
		const validity = this.fieldsValidity.valueGet(recordId, key)
		newStatus.setValid(validity === undefined || validity.error === ValidityError.none)

		return newStatus
	}

	valueGet(row: number, key: string) {
		return row < this.recordsDisplay.length
			? recordValueGet(this.recordsDisplay[row], key)
			: undefined
	}
	valueSet(row: number, key: string, value: any) {
		if (row < this.recordsDisplay.length) {
			this.recordsDisplay[row] = recordValueSet(this.recordsDisplay[row], key, value)
		}
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
	valueDrop(recordId: string, key: string) {
		this.values = this.values.filter((v) => v.recordId !== recordId || v.fieldName !== key)
	}
	valueExists(recordId: string, key: string) {
		const isExists =
			this.values.findIndex((v) => v.recordId === recordId && v.fieldName === key) > -1
		return isExists
	}
	valueGet(recordId: string, key: string) {
		const value = this.values.find((v) => v.recordId === recordId && v.fieldName === key)
		return value ? value.value : undefined
	}
	valueSet(recordId: string, key: string, value: any) {
		const valueIdx = this.values.findIndex((v) => v.recordId === recordId && v.fieldName === key)
		if (valueIdx > -1) {
			this.values[valueIdx].value = value
		} else {
			this.values.push(new FieldValue(recordId, key, value))
		}
	}
}
