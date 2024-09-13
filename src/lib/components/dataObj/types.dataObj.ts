import { State, StatePacketAction } from '$comps/app/types.appState'
import {
	getArray,
	memberOfEnum,
	memberOfEnumOrDefault,
	required,
	strOptional,
	strRequired,
	valueHasChanged,
	valueOrDefault,
	booleanRequired
} from '$utils/types'
import {
	RawDataObj,
	RawDataObjActionField,
	RawDataObjPropDisplay,
	RawDataObjTable
} from '$comps/dataObj/types.rawDataObj'
import { DataObjActionField } from '$comps/dataObj/types.dataObjActionField'
import { Validation, ValidationStatus, ValidityErrorLevel } from '$comps/form/types.validation'
import { Field, FieldAccess, FieldColor, FieldElement, RawFieldProps } from '$comps/form/field'
import { FieldCheckbox } from '$comps/form/fieldCheckbox'
import { FieldChips } from '$comps/form/fieldChips'
import {
	FieldEmbed,
	FieldEmbedListConfig,
	FieldEmbedListEdit,
	FieldEmbedListSelect
} from '$comps/form/fieldEmbed'
import { FieldEmbedShell } from '$comps/form/fieldEmbedShell'
import {
	FieldCustomAction,
	FieldCustomActionButton,
	FieldCustomActionLink,
	FieldCustomHeader,
	FieldCustomText
} from '$comps/form/fieldCustom'
import { FieldInput } from '$comps/form/fieldInput'
import { FieldFile } from '$comps/form/fieldFile'
import { FieldParm } from '$comps/form/fieldParm'
import { FieldRadio } from '$comps/form/fieldRadio'
import { FieldTagRow, FieldTagSection } from '$comps/form/fieldTag'
import { FieldSelect } from '$comps/form/fieldSelect'
import { FieldTextarea } from '$comps/form/fieldTextarea'
import { FieldToggle } from '$comps/form/fieldToggle'
import { DataObjActionQuery, DataObjActionQueryFunction } from '$comps/app/types.appQuery'
import { TokenApiDbDataObjSource, TokenApiQueryData } from '$utils/types.token'
import { PropSortDir } from '$comps/dataObj/types.rawDataObj'
import { getEnhancement } from '$enhance/crud/_crud'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/dataObj/types.dataObj.ts'

export type DataItems = Record<string, { data: string; display: string }[]>

export class DataObj {
	actionsField: DataObjActionField[] = []
	actionsFieldListRowActionIdx: number = -1
	actionsQueryFunctions: DataObjActionQueryFunction[] = []
	data: DataObjData
	dataFieldsChanged: FieldValues = new FieldValues()
	dataFieldsValidity: FieldValues = new FieldValues()
	dataItems: DataItems = {}
	dataRecordsDisplay: DataRecord[] = []
	dataRecordsHidden: DataRecord[] = []
	fields: Field[] = []
	isListEmbed: boolean = false
	modes: DataObjMode[] = []
	objStatus: DataObjStatus = new DataObjStatus()
	raw: RawDataObj
	rootTable?: DBTable
	saveMode: DataObjSaveMode = DataObjSaveMode.any
	constructor(data: DataObjData) {
		const clazz = 'DataObj'
		this.data = data
		this.raw = required(data.rawDataObj, clazz, 'rawDataObj')

		/* dependent properties */
		this.rootTable =
			this.raw.tables && this.raw.tables.length > 0
				? new DBTable(this.raw.tables[0].table)
				: undefined
	}
	actionsFieldEmbedSet(action: StatePacketAction, field: FieldEmbed) {
		const field1 = this.actionsField.find((f) => f.codePacketAction === action)
		if (field1) {
			field1.setFieldEmbed(field)
		} else {
			error(500, {
				file: FILENAME,
				function: 'DataObj.actionsFieldEmbedSet',
				message: `Field for StatePacketAction: ${action} not found.`
			})
		}
	}
	actionsFieldTrigger(action: StatePacketAction, state: State) {
		const field2 = this.actionsField.find((f) => f.codePacketAction === action)
		if (field2) {
			field2.trigger(state, this)
		} else {
			error(500, {
				file: FILENAME,
				function: 'DataObj.actionsFieldTrigger',
				message: `Field for StatePacketAction: ${action} not found.`
			})
		}
	}
	export() {
		let data: string = ''
		let newRow: string = ''

		// get headers
		this.fields.forEach((f) => {
			if (f.colDO.isDisplayable && !f.colDO.colDB.isNonData) {
				const label = f.colDO.headerAlt ? f.colDO.headerAlt : f.colDO.label
				newRow += `${label},`
			}
		})
		data += `${newRow}\n`

		// get data
		this.dataRecordsDisplay.forEach((record, row) => {
			newRow = ''
			this.fields.forEach((f) => {
				if (f.colDO.isDisplayable && !f.colDO.colDB.isNonData) {
					const columnName = f.colDO.propName
					const value = [null, undefined].includes(record[columnName]) ? '' : record[columnName]
					newRow += `${value},`
				}
			})
			data += `${newRow}\n`
		})

		// download
		const blob = new Blob([data], { type: 'text/csv' })
		const url = URL.createObjectURL(blob)

		const link = document.createElement('a')
		link.href = url
		link.download = `${this.raw.header}.csv`
		link.click()

		URL.revokeObjectURL(url)
		alert(`"${this.raw.header}" has been downloaded!`)
	}

	static async init(state: State, data: DataObjData) {
		const clazz = 'DataObj.init'
		const rawDataObj = required(data.rawDataObj, clazz, 'rawDataObj')
		const dataObj = new DataObj(data)
		dataObj.fields = await dataObj.initFields(state, data, rawDataObj)
		enhanceCustomFields(dataObj.fields)
		dataObj.actionsQueryFunctions = await getActionQueryFunctions(rawDataObj.actionsQuery)
		initActionsField()
		return dataObj

		async function enhanceCustomFields(fields: Field[]) {
			for (const field of fields) {
				if (field instanceof FieldCustomAction) {
					await field.initEnhancement()
				}
			}
		}
		async function getActionQueryFunctions(actions: DataObjActionQuery[]) {
			let funcs: DataObjActionQueryFunction[] = []
			for (let i = 0; i < actions.length; i++) {
				const action = actions[i]
				funcs.push(new DataObjActionQueryFunction(action, await getEnhancement(action.name)))
			}
			return funcs
		}
		function initActionsField() {
			dataObj.actionsField = rawDataObj.rawActionsField.map((rawAction: RawDataObjActionField) => {
				return new DataObjActionField(rawAction, state)
			})
			dataObj.actionsFieldListRowActionIdx = dataObj.actionsField.findIndex(
				(f) => f.isListRowAction
			)
		}
	}
	async initFields(state: State, data: DataObjData, rawDataObj: RawDataObj) {
		let fields: Field[] = []
		const propsRaw = rawDataObj.rawPropsDisplay
		let firstVisible = propsRaw.findIndex((f) => f.isDisplayable)

		for (let i = 0; i < propsRaw.length; i++) {
			const prop: RawDataObjPropDisplay = propsRaw[i]
			fields.push(await DataObj.initField(state, prop, firstVisible === i, fields, this, data))
		}
		return fields
	}

	static async initField(
		state: State,
		propRaw: RawDataObjPropDisplay,
		isFirstVisible: boolean,
		fields: Field[],
		dataObj: DataObj,
		data: DataObjData
	) {
		let newField: Field
		const props = new RawFieldProps(state, propRaw, isFirstVisible, fields, dataObj, data)

		const element = memberOfEnumOrDefault(
			propRaw.rawFieldElement,
			'DataObj',
			'element',
			'FieldElement',
			FieldElement,
			FieldElement.text
		)
		switch (element) {
			// input
			case FieldElement.date:
			case FieldElement.email:
			case FieldElement.number:
			case FieldElement.password:
			case FieldElement.tel:
			case FieldElement.text:
				newField = await FieldInput.init(props)
				break

			case FieldElement.checkbox:
				newField = await FieldCheckbox.init(props)
				break

			case FieldElement.chips:
				newField = await FieldChips.init(props)
				break

			case FieldElement.customActionButton:
				newField = await FieldCustomActionButton.init(props)
				break

			case FieldElement.customActionLink:
				newField = await FieldCustomActionLink.init(props)
				break

			case FieldElement.customHeader:
				newField = await FieldCustomHeader.init(props)
				break

			case FieldElement.customText:
				newField = await FieldCustomText.init(props)
				break

			case FieldElement.embedListConfig:
				newField = await FieldEmbedListConfig.init(props)
				break

			case FieldElement.embedListEdit:
				newField = await FieldEmbedListEdit.init(props)
				break

			case FieldElement.embedListSelect:
				newField = await FieldEmbedListSelect.init(props)
				break

			case FieldElement.embedShell:
				newField = await FieldEmbedShell.init(props)
				break

			case FieldElement.file:
				newField = await FieldFile.init(props)
				break

			case FieldElement.parm:
				newField = await FieldParm.init(props)
				break

			case FieldElement.radio:
				newField = await FieldRadio.init(props)
				break

			case FieldElement.select:
				newField = await FieldSelect.init(props)
				break

			case FieldElement.tagRow:
				newField = await FieldTagRow.init(props)
				break

			case FieldElement.tagSection:
				newField = await FieldTagSection.init(props)
				break

			case FieldElement.textArea:
				newField = await FieldTextarea.init(props)
				break

			case FieldElement.toggle:
				newField = await FieldToggle.init(props)
				break

			default:
				error(500, {
					file: FILENAME,
					function: 'initFields',
					message: `No case defined for field element: ${element}`
				})
		}
		return newField
	}

	get objData() {
		// root data
		this.data.rowsSave.setDataRows(setData(this))

		// embedded fields
		this.fields.forEach((field: Field) => {
			if (field instanceof FieldEmbed && field.dataObj) {
				const idx = this.data.fields.findIndex((f) => f.embedFieldName === field.colDO.propName)
				if (idx > -1) {
					this.data.fields[idx].data.rowsSave.setDataRows(setData(field.dataObj))
					this.data.fields[idx].data.parmsValues.valueSet(
						ParmsObjType.embedParentId,
						field.embedParentId
					)
				}
			}
		})

		return this.data

		function setData(dataObj: DataObj) {
			let fieldsParmValueNames: string[] = []
			dataObj.fields.forEach((f) => {
				if (f.isParmValue) {
					const fieldParm: FieldParm = f as FieldParm
					fieldParm.parmFields.forEach((f) => {
						fieldsParmValueNames.push(f.colDO.propName)
					})
				}
			})

			let dataRows: DataRow[] = setDataRecords(
				fieldsParmValueNames,
				dataObj.data,
				dataObj.dataRecordsDisplay
			)
			dataRows = dataRows.concat(
				setDataRecords(fieldsParmValueNames, dataObj.data, dataObj.dataRecordsHidden)
			)
			return dataRows
		}
		function setDataRecords(
			fieldsParmValueNames: string[],
			dataCurrent: DataObjData,
			dataRecords: DataRecord[]
		) {
			let dataRows: DataRow[] = []
			dataRecords.forEach((record, row) => {
				let newRecord: DataRecord = {}
				Object.entries(record).forEach(([key, value]) => {
					if (![null, undefined].includes(value)) {
						// don't included embedded fields
						if (-1 === dataCurrent.fields.findIndex((f) => f.embedFieldName === key)) {
							// don't include null or undefined values
							if (fieldsParmValueNames.includes(key)) {
								newRecord.parmValue = record[key]
								delete newRecord[key]
							} else {
								newRecord[key] = value
							}
						}
					}
				})
				const oldRow = dataCurrent.rowsRetrieved.getRow(record.id)
				dataRows.push(new DataRow(oldRow ? oldRow.status : DataRecordStatus.preset, newRecord))
			})
			return dataRows
		}
	}

	set objData(dataSource: DataObjData) {
		this.saveMode =
			dataSource.cardinality === DataObjCardinality.detail && dataSource.rowsRetrieved.hasRecord()
				? dataSource.rowsRetrieved.getDetailStatusRecordIs(DataRecordStatus.preset)
					? DataObjSaveMode.insert
					: DataObjSaveMode.update
				: DataObjSaveMode.any

		// set data
		let recordsClone: DataRecord[] = []
		const parmValueFields = this.fields.filter((f) => f.isParmValue) as FieldParm[]
		dataSource.rowsRetrieved.getRows().forEach((dataRow, rowIdx) => {
			if (dataRow.status !== DataRecordStatus.delete) {
				const record = dataRow.record
				// init parmValue
				parmValueFields.forEach((field) => {
					const parmFieldName = field.parmFields[rowIdx].colDO.propName
					if (!Object.hasOwn(record, parmFieldName)) {
						record[parmFieldName] = record.parmValue
						delete record.parmValue
					}
				})
				recordsClone.push({ ...record })
			}
		})
		this.dataRecordsDisplay = recordsClone
		this.dataFieldsChanged = new FieldValues()
		this.dataFieldsValidity = new FieldValues()

		// set data items
		Object.entries(dataSource.items).forEach(([key, value]) => {
			const fieldKey = key.replace('_items_', '')
			const fieldIndex = this.fields.findIndex((f) => f.colDO.propName === fieldKey)
			if (fieldIndex > -1) {
				this.fields[fieldIndex].colDO.items = value
			}
		})

		// update row status
		dataSource.rowsRetrieved.getRows().forEach((dataRow) => {
			if (dataRow.status === DataRecordStatus.inserted) {
				dataRow.status = DataRecordStatus.update
			}
		})

		this.data = dataSource
		this.preValidate()
	}

	getField(field: Field, row: number) {
		return field.isParmValue ? (field as FieldParm).parmFields[row] : field
	}

	modeAdd(mode: DataObjMode) {
		if (!this.modes.includes(mode)) this.modes.push(mode)
	}
	modeActive(mode: DataObjMode) {
		return this.modes.includes(mode)
	}
	modeDrop(mode: DataObjMode) {
		this.modes = this.modes.filter((m) => m !== mode)
	}
	modeReset() {
		this.modes = []
		this.fields.forEach((f) => {
			f.modeReset()
		})
	}
	preValidate() {
		const validityErrorLevel = this.raw.isListEdit
			? ValidityErrorLevel.warning
			: ValidityErrorLevel.none

		this.dataRecordsDisplay.forEach((record, row) => {
			this.fields.forEach((f) => {
				const field = this.getField(f, row)
				const v: Validation = field.validate(row, record[field.colDO.propName], validityErrorLevel)
				if (v.status === ValidationStatus.invalid) {
					this.dataFieldsValidity.valueSet(
						record.id,
						v.validityFields[0].fieldName,
						v.validityFields[0].validity
					)
				}
			})
		})
	}

	print() {
		alert('Print functionality for this object has not yet been implemented.')
	}

	setFieldVal(row: number, field: Field, value: any) {
		const recordId = this.dataRecordsDisplay[row].id
		this.setFieldValChanged(row, recordId, field.colDO.propName, value)
		this.setFieldValValidity(row, recordId, field)
		return this
	}
	setFieldValChanged(row: number, recordId: string, fieldName: string, value: any) {
		this.dataRecordsDisplay[row][fieldName] = value
		const valueInitial = this.data.rowsRetrieved.getValue(recordId, fieldName)
		const hasChanged = valueHasChanged(valueInitial, value)
		if (hasChanged) {
			this.dataFieldsChanged.valueSet(recordId, fieldName, hasChanged)
		} else {
			this.dataFieldsChanged.valueDrop(recordId, fieldName)
		}
	}
	setFieldValValidity(row: number, recordId: string, field: Field) {
		const v: Validation = field.validate(
			row,
			this.dataRecordsDisplay[row][field.colDO.propName],
			ValidityErrorLevel.warning
		)
		v.validityFields.forEach(({ fieldName, validity }) => {
			this.dataFieldsValidity.valueSet(recordId, fieldName, validity)
		})
		this.dataFieldsValidity = this.dataFieldsValidity
	}
	setIsListEmbed() {
		this.isListEmbed = true
	}
	setStatus() {
		let newStatus = new DataObjStatus()
		this.dataRecordsDisplay.forEach((r) => {
			const recordId = r.id
			this.fields.forEach((f) => {
				if (
					([FieldAccess.optional, FieldAccess.required].includes(f.fieldAccess) &&
						!f.colDO.colDB.isNonData) ||
					f.colDO.propName === this.raw.listReorderColumn
				) {
					const statusField = f.getStatus(this, recordId)
					newStatus = newStatus.update(statusField)
				}
			})
		})
		return newStatus
	}
}

export class DataObjActionProxy {
	action: StatePacketAction
	proxy: Function
	constructor(action: StatePacketAction, proxy: Function) {
		this.action = action
		this.proxy = proxy
	}
}

export enum DataObjCardinality {
	list = 'list',
	detail = 'detail'
}
export enum DataObjComponent {
	Home = 'Home',
	FormList = 'FormList',
	FormDetail = 'FormDetail',
	FormDetailRepConfig = 'FormDetailRepConfig',
	ProcessStatus = 'ProcessStatus',
	Tree = 'Tree'
}
export class DataObjConfirm {
	buttonLabelCancel: string
	buttonLabelConfirm: string
	message: string
	title: string
	constructor(obj: any = {}) {
		const clazz = 'DataObjConfirm'
		obj = valueOrDefault(obj, {})
		this.buttonLabelCancel = valueOrDefault(obj.confirmButtonLabelCancel, 'Keep Editing')
		this.buttonLabelConfirm = valueOrDefault(obj.confirmButtonLabelConfirm, 'Discard Changes')
		this.message = valueOrDefault(
			obj.confirmMessage,
			'Are you sure you want to discard your changes?'
		)
		this.title = valueOrDefault(obj.confirmTitle, 'Discard Changes')
	}
}

export class DataObjData {
	cardinality?: DataObjCardinality
	fields: DataObjDataField[] = []
	items: DataRecord = {}
	parmsState: ParmsValuesState = new ParmsValuesState()
	parmsValues: ParmsValues = new ParmsValues()
	rawDataObj?: RawDataObj
	rowsRetrieved: DataRows = new DataRows()
	rowsSave: DataRows = new DataRows()
	constructor(rawDataObj?: RawDataObj) {
		const clazz = 'DataObjData'
		if (rawDataObj) this.init(rawDataObj)
	}
	init(rawDataObj: RawDataObj) {
		const clazz = 'DataObjData'
		this.cardinality = memberOfEnum(
			rawDataObj.codeCardinality,
			clazz,
			'cardinality',
			'DataObjCardinality',
			DataObjCardinality
		)
		this.rawDataObj = rawDataObj
	}
	static load(source: DataObjData) {
		const data = new DataObjData(source.rawDataObj)
		data.fields = DataObjDataField.load(source.fields)
		data.items = { ...source.items }
		data.parmsState = ParmsValuesState.load(source.parmsState)
		data.parmsValues = ParmsValues.load(source.parmsValues)
		data.rowsRetrieved = DataRows.load(source.rowsRetrieved)
		data.rowsSave = DataRows.load(source.rowsSave)
		return data
	}
	getField(fieldName: string) {
		const field = this.fields.find((f) => f.embedFieldName === fieldName)
		if (field) {
			return field
		} else {
			error(500, {
				file: FILENAME,
				function: 'dataObjData.getField',
				message: `Field ${fieldName} not found.`
			})
		}
	}
	getParms() {
		return { ...this.parmsState.valueGetAll(), ...this.parmsValues.valueGetAll() }
	}
}

export class DataObjDataField {
	data: DataObjData
	embedFieldName: string
	embedRecordId?: string
	embedTable: DBTable
	embedType: DataObjEmbedType
	parentTable: DBTable
	constructor(obj: any = {}) {
		const clazz = 'DataObjDataField'
		this.embedFieldName = strRequired(obj.embedFieldName, clazz, 'embedFieldName')
		this.embedRecordId = strOptional(obj.embedRecordId, clazz, 'embedRecordId')
		this.embedTable = required(obj.embedTable, clazz, 'embedTable')
		this.embedType = memberOfEnum(
			obj.embedType,
			clazz,
			'embedType',
			'DataObjDataField',
			DataObjEmbedType
		)
		this.parentTable = new DBTable(obj.parentTable)

		// derived
		this.data = new DataObjData(
			required(obj.rawDataObj ? obj.rawDataObj : obj?.data?.rawDataObj, clazz, 'rawDataObj')
		)
	}
	static async init(
		rawDataObjParent: RawDataObj,
		queryData: TokenApiQueryData,
		fGetRawDataObj: Function
	) {
		let fields: DataObjDataField[] = []
		const parentTable =
			rawDataObjParent.tables.length > 0 ? rawDataObjParent.tables[0].table : undefined
		if (parentTable) {
			const FIELDTYPES = [
				DataObjEmbedType.listConfig,
				DataObjEmbedType.listEdit,
				DataObjEmbedType.listSelect
			]
			const embeds = rawDataObjParent.rawPropsSelect.filter(
				(prop) => prop.fieldEmbed && FIELDTYPES.includes(prop.fieldEmbed.type)
			)
			for (let i = 0; i < embeds.length; i++) {
				const field = embeds[i]
				const embedDataObjId = field?.fieldEmbed?.id
				const embedFieldName = field.propName
				const rawDataObj = await fGetRawDataObj(
					new TokenApiDbDataObjSource({
						dataObjId: embedDataObjId,
						exprFilter: `.id IN (SELECT ${parentTable.object} FILTER .id = <tree,uuid,${parentTable.name}.id>).${embedFieldName}.id`
					}),
					queryData
				)
				fields.push(
					new DataObjDataField({
						embedDataObjId,
						embedFieldName,
						embedTable: field?.link?.table,
						embedType: field?.fieldEmbed?.type,
						parentTable: parentTable,
						rawDataObj
					})
				)
			}
		}
		return fields
	}
	static load(fields: DataObjDataField[]) {
		return fields.map((field) => {
			const newField = new DataObjDataField({ ...field })
			newField.data = DataObjData.load(field.data)
			return newField
		})
	}
}

export enum DataObjEmbedType {
	listConfig = 'listConfig',
	listEdit = 'listEdit',
	listSelect = 'listSelect'
}

export enum DataObjListEditPresetType {
	insert = 'insert',
	save = 'save'
}

export enum DataObjMode {
	ParentObjectSaved = 'ParentObjectSaved'
}

export enum DataObjProcessType {
	reportParmItems = 'reportParmItems',
	reportRender = 'reportRender'
}

export class DataObjStatus {
	objHasChanged: boolean = false
	objValidToSave: boolean = true
	constructor() {}
	changed() {
		return this.objHasChanged
	}
	reset() {
		this.objHasChanged = false
		this.objValidToSave = true
	}
	setChanged(status: boolean) {
		this.objHasChanged = status
		return status
	}
	setValid(status: boolean) {
		this.objValidToSave = status
		return status
	}
	update(currentStatus: DataObjStatus) {
		this.objHasChanged = this.objHasChanged || currentStatus.objHasChanged
		this.objValidToSave = this.objValidToSave && currentStatus.objValidToSave
		return this
	}

	valid() {
		return this.objValidToSave
	}
}

export enum DataObjSaveMode {
	any = 'any',
	insert = 'insert',
	update = 'update'
}

export class DataObjSort {
	sortItems: DataObjSortItem[]
	constructor(sortItem: DataObjSortItem | undefined = undefined) {
		this.sortItems = sortItem ? [sortItem] : []
	}
	addItem(fieldName: string, direction: string | undefined) {
		this.sortItems.push(
			new DataObjSortItem(
				fieldName,
				direction?.toLowerCase() === 'asc' || !direction ? PropSortDir.asc : PropSortDir.desc
			)
		)
	}
}

export class DataObjSortItem {
	fieldName: string
	direction: PropSortDir
	constructor(fieldName: string, direction: PropSortDir) {
		this.fieldName = fieldName
		this.direction = direction
	}
}

export class DataObjTable {
	columnParent?: string
	index: number
	isRoot: boolean
	parentObjTable?: DataObjTable
	table: DBTable
	traversalFromRoot: string
	constructor(obj: RawDataObjTable, tables: DataObjTable[]) {
		const clazz = 'DataObjTable'
		obj = valueOrDefault(obj, {})
		this.columnParent = obj._columnParent
		this.index = required(obj.index, clazz, 'index')
		this.isRoot = this.index === 0
		this.parentObjTable =
			typeof obj.indexParent === 'number' && obj.indexParent > -1
				? tables.find((table) => table.index === obj.indexParent)
				: undefined
		this.table = new DBTable(obj._table)
		this.traversalFromRoot =
			this.parentObjTable && this.columnParent
				? this.parentObjTable.traversalFromRoot
					? this.parentObjTable.traversalFromRoot + '.' + this.columnParent
					: this.columnParent
				: ''
	}
}

export type DataRecord = Record<string, any>

export enum DataRecordStatus {
	delete = 'delete',
	inserted = 'inserted',
	preset = 'preset',
	retrieved = 'retrieved',
	unknown = 'unknown',
	update = 'update'
}

export class DataRow {
	record: DataRecord = {}
	status: DataRecordStatus
	constructor(status: DataRecordStatus, record: DataRecord) {
		this.record = record
		this.status = status
	}
}

export class DataRows {
	dataRows: DataRow[] = []
	constructor() {}
	add(newRow: DataRow) {
		this.dataRows.push(newRow)
	}
	getDetailRecord() {
		if (this.dataRows.length > 0) return this.dataRows[0].record
		error(500, {
			file: FILENAME,
			function: 'DataRows.getDetailRecord',
			message: `No detail record available.`
		})
	}
	getDetailRecordValue(key: string) {
		if (!this.hasRecord()) return undefined
		return this.dataRows[0].record[key]
	}
	getDetailRow() {
		if (this.dataRows.length > 0) return this.dataRows[0]
		error(500, {
			file: FILENAME,
			function: 'DataRows.getDetailRecord',
			message: `No detail record available.`
		})
	}
	getDetailStatusRecordIs(status: DataRecordStatus) {
		if (this.dataRows.length < 1) return false
		return status === this.dataRows[0].status
	}
	getRow(id: string) {
		const row = this.dataRows.findIndex((r) => r.record.id === id)
		return row > -1 ? this.dataRows[row] : undefined
	}
	getRows() {
		return this.dataRows
	}
	getValue(recordId: string, key: string) {
		const row = this.dataRows.find((dr) => dr.record.id === recordId)
		if (row) {
			return row.record[key]
		} else {
			error(500, {
				file: FILENAME,
				function: 'dataObjData.getValue',
				message: `Row ${row} not found.`
			})
		}
	}
	hasRecord() {
		return this.dataRows.length > 0 && Object.keys(this.dataRows[0].record).length > 0
	}
	static load(source: DataRows) {
		const dataRows = new DataRows()
		source.dataRows.forEach((dataRow) => {
			dataRows.add(new DataRow(dataRow.status, dataRow.record))
		})
		return dataRows
	}
	reset() {
		this.dataRows = []
	}
	setDataRows(dataRows: DataRow[]) {
		this.dataRows = dataRows
	}
	setDetailRecord(record: DataRecord) {
		if (this.dataRows.length > 0) {
			this.dataRows[0].record = record
		}
	}
	setDetailRecordStatus(status: DataRecordStatus) {
		if (this.dataRows) {
			this.dataRows[0].status = status
		} else {
			error(500, {
				file: FILENAME,
				function: 'dataObjData.setDetailRecordStatus',
				message: `No detail record available.`
			})
		}
	}
	setDetailRecordValue(key: string, value: any) {
		if (!this.hasRecord()) return
		this.dataRows[0].record[key] = value
	}
	syncFields(source: DataRecord[], fields: string[]) {
		source.forEach((record) => {
			const id = record.id
			fields.forEach((fieldName) => {
				const val = record[fieldName]
				const row = this.dataRows.findIndex((r) => r.record.id === id)
				if (row > -1) this.dataRows[row].record[fieldName] = val
			})
		})
	}
}

export class DBTable {
	hasMgmt: boolean
	mod: string
	name: string
	object: string
	constructor(obj: any) {
		const clazz = 'DBTable'
		obj = valueOrDefault(obj, {})
		this.hasMgmt = booleanRequired(obj.hasMgmt, clazz, 'hasMgmt')
		this.mod = strRequired(obj.mod, clazz, 'module')
		this.name = strRequired(obj.name, clazz, 'name')
		this.object = this.mod + '::' + this.name
	}
}

export class FieldValue {
	fieldName: string
	recordId: string
	value: any
	constructor(recordId: string, fieldName: string, value: any) {
		this.fieldName = fieldName
		this.recordId = recordId
		this.value = value
	}
}

export class FieldValues {
	values: FieldValue[] = []
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

export class ParmsUser {
	data: ParmsUserParm[] = []
	constructor() {}
	parmGet(id: string, type: ParmsUserParmType) {
		let idx = this.data.findIndex((p) => p.id === id && p.type === type)
		return idx > -1 ? this.data[idx].value : undefined
	}
	parmSet(id: string, type: ParmsUserParmType, value: any) {
		let idx = this.data.findIndex((p) => p.id === id && p.type === type)
		if (idx > -1) {
			this.data[idx].value = value
		} else {
			this.data.push(new ParmsUserParm(id, type, value))
		}
	}
	reset() {
		this.data = []
	}
}
export class ParmsUserParm {
	id: string
	type: ParmsUserParmType
	value: any
	constructor(id: string, type: ParmsUserParmType, value: any) {
		this.id = id
		this.type = type
		this.value = value
	}
}
export enum ParmsUserParmType {
	listSearchText = 'listSearchText',
	listSortObj = 'listSortObj'
}

export class ParmsValues {
	data: DataRecord = {}
	constructor(data?: DataRecord) {
		this.data = valueOrDefault(data, {})
	}
	dataUpdate(data: DataRecord) {
		data = valueOrDefault(data, {})
		Object.entries(data).forEach(([key, value]) => {
			this.data[key] = value
		})
	}
	static load(parms: ParmsValues) {
		const newParms = new ParmsValues()
		newParms.data = parms.data
		return newParms
	}
	valueGet(key: string) {
		return this.data[key]
	}
	valueGetAll() {
		let newParms: DataRecord = {}
		Object.entries(this.data).forEach(([key, value]) => {
			newParms[key] = value
		})
		return newParms
	}
	valueSet(key: string, value: any) {
		this.data[key] = value
	}
	valueSetDefault(key: string, parms: DataRecord, defaultValue: any) {
		this.valueSet(key, Object.hasOwn(parms, key) ? parms[key] : defaultValue)
	}
	valueSetList(key: string, dataRows?: DataRow[]) {
		this.valueSet(key, dataRows ? dataRows.map((row) => row.record.id) : [])
	}
}

export class ParmsValuesState extends ParmsValues {
	constructor(data?: DataRecord) {
		super(data)
	}
	initLevel(parms: DataRecord) {
		parms = valueOrDefault(parms, {})
		this.valueSetDefault(ParmsObjType.listRecordIdCurrent, parms, '')
		this.valueSetDefault(
			ParmsObjType.listRecordIdList,
			parms,
			this.valueGet(ParmsObjType.listRecordIdList)
		)
	}
	listUpdate(dataRows: DataRow[] | undefined, recordId: string, recordIdAlt: string = '') {
		this.valueSet(ParmsObjType.listRecordIdCurrent, recordIdAlt ? recordIdAlt : recordId)
		this.valueSetList(ParmsObjType.listRecordIdList, dataRows)
	}
	static load(parms: ParmsValuesState) {
		const newParms = new ParmsValuesState()
		newParms.data = parms.data
		return newParms
	}
	parmsUpdate(parms?: ParmsValuesState) {
		if (parms) {
			Object.entries(parms.data).forEach(([key, value]) => {
				this.data[key] = value
			})
		}
	}
}

export enum ParmsObjType {
	embedFieldName = 'embedFieldName',
	embedParentId = 'embedParentId',
	listRecordIdCurrent = 'listRecordIdCurrent',
	listRecordIdList = 'listRecordIdList',
	listRecordIdSelected = 'listRecordIdSelected'
}
