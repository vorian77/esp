import { State } from '$comps/app/types.appState'
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
	RawDataObjParent,
	RawDataObjPropDisplay,
	RawDataObjTable
} from '$comps/dataObj/types.rawDataObj'
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
import { TokenAppDoActionFieldType, TokenAppDoActionConfirmType } from '$utils/types.token'
import { PropSortDir } from '$comps/dataObj/types.rawDataObj'
import { getEnhancement } from '$enhance/crud/_crud'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/dataObj/types.dataObj.ts'

export class DataObj {
	actionsField: DataObjActionField[] = []
	actionsQueryFunctions: DataObjActionQueryFunction[] = []
	data: DataObjData
	dataFieldsChanged: FieldValues = new FieldValues()
	dataFieldsValidity: FieldValues = new FieldValues()
	dataItems: DataRecord = {}
	dataRecordsDisplay: DataRecord[] = []
	dataRecordsHidden: DataRecord[] = []
	fields: Field[] = []
	isFieldChanged: boolean = false
	isListEmbedded: boolean = false
	objStatus: DataObjStatus = new DataObjStatus()
	raw: RawDataObj
	rootTable?: DBTable
	saveMode: DataObjSaveMode = DataObjSaveMode.any
	constructor(rawDataObj: RawDataObj, data: DataObjData) {
		const clazz = 'DataObj'
		rawDataObj = valueOrDefault(rawDataObj, {})
		this.raw = rawDataObj
		this.data = new DataObjData(this.raw.codeCardinality)

		/* dependent properties */
		this.rootTable =
			this.raw.tables && this.raw.tables.length > 0
				? new DBTable(rawDataObj.tables[0].table)
				: undefined
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

	static async init(state: State, rawDataObj: RawDataObj, data: DataObjData) {
		const dataObj = new DataObj(rawDataObj, data)
		dataObj.fields = await dataObj.initFields(state, rawDataObj.rawPropsDisplay, data)
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
			dataObj.actionsField = rawDataObj.rawActionsField.map((rawAction) => {
				return new DataObjActionField(rawAction, state)
			})
		}
	}
	async initFields(state: State, propsRaw: RawDataObjPropDisplay[], data: DataObjData) {
		let fields: Field[] = []
		let firstVisible = propsRaw.findIndex((f) => f.isDisplayable)

		for (let i = 0; i < propsRaw.length; i++) {
			const prop: RawDataObjPropDisplay = propsRaw[i]
			fields.push(await DataObj.initField(state, prop, firstVisible === i, fields, data))
		}
		return fields
	}

	static async initField(
		state: State,
		propRaw: RawDataObjPropDisplay,
		isFirstVisible: boolean,
		fields: Field[],
		data: DataObjData
	) {
		let newField: Field
		const props = new RawFieldProps(state, propRaw, isFirstVisible, fields, data)

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
		// determine embeded fields
		const FIELDTYPES = [FieldEmbedListEdit]
		const fieldsEmbedded = this.fields.filter((f) => FIELDTYPES.includes(f.constructor as any))
		const fieldsEmbeddedNames = fieldsEmbedded.map((f) => f.colDO.propName)

		// root data
		const data = setData(this.raw.codeCardinality, this, fieldsEmbeddedNames)

		// embedded fields
		fieldsEmbedded.forEach((field: any) => {
			if (field.dataObj) {
				console.log('DataObj.getObjData.field.dataRecordsDisplay', field.dataObj.dataRecordsDisplay)
				const fieldData = setData(field.dataObj.raw.codeCardinality, field.dataObj, [])
				data.fields.push(
					new DataObjDataField(field.colDO.propName, field.dataObj.raw, fieldData, undefined)
				)
			}
		})
		return data

		function setData(
			cardinality: DataObjCardinality,
			dataObjSource: DataObj,
			fieldsEmbeddedNames: string[]
		) {
			let data = new DataObjData(cardinality)
			let fieldsParmValueNames: string[] = []
			dataObjSource.fields.forEach((f) => {
				if (f.isParmValue) {
					const fieldParm: FieldParm = f as FieldParm
					fieldParm.parmFields.forEach((f) => {
						fieldsParmValueNames.push(f.colDO.propName)
					})
				}
			})

			setDataRecords(
				data,
				dataObjSource.data,
				fieldsParmValueNames,
				fieldsEmbeddedNames,
				dataObjSource.dataRecordsDisplay
			)
			setDataRecords(
				data,
				dataObjSource.data,
				fieldsParmValueNames,
				fieldsEmbeddedNames,
				dataObjSource.dataRecordsHidden
			)
			return data
		}
		function setDataRecords(
			dataReturn: DataObjData,
			dataSource: DataObjData,
			fieldsParmValueNames: string[],
			fieldsEmbeddedNames: string[],
			dataRecords: DataRecord[]
		) {
			dataRecords.forEach((record, row) => {
				let newRecord: DataRecord = {}
				Object.entries(record).forEach(([key, value]) => {
					if (![null, undefined].includes(value)) {
						// don't included embedded fields
						if (!fieldsEmbeddedNames.includes(key)) {
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
				const dataRow = dataSource.getRow(record.id)
				dataReturn.addRow(dataRow ? dataRow.status : DataRecordStatus.preset, newRecord)
			})
		}
	}

	set objData(dataSource: DataObjData) {
		const dataObjName = this.raw.name
		this.saveMode =
			dataSource.cardinality === DataObjCardinality.detail && dataSource.hasRecord()
				? dataSource.getDetailStatusRecordIs(DataRecordStatus.preset)
					? DataObjSaveMode.insert
					: DataObjSaveMode.update
				: DataObjSaveMode.any

		// set data
		let recordsClone: DataRecord[] = []
		const parmValueFields = this.fields.filter((f) => f.isParmValue) as FieldParm[]
		dataSource.dataRows.forEach((dataRow, rowIdx) => {
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
		this.setIsFieldChanged(false)

		// set data items
		Object.entries(dataSource.items).forEach(([key, value]) => {
			const fieldKey = key.replace('_items_', '')
			const fieldIndex = this.fields.findIndex((f) => f.colDO.propName === fieldKey)
			if (fieldIndex > -1) {
				this.fields[fieldIndex].colDO.items = value
			}
		})

		// update row status
		dataSource.dataRows.forEach((dataRow) => {
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
		const valueInitial = this.data.getValue(recordId, fieldName)
		if (fieldName === 'pvDateStart') {
			console.log('setFieldValChanged', { valueInitial, value })
		}
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
	setIsFieldChanged(status: boolean) {
		this.isFieldChanged = status
	}
	setIsListEmbedded() {
		this.isListEmbedded = true
	}
	setStatus() {
		let newStatus = new DataObjStatus()
		this.dataRecordsDisplay.forEach((r) => {
			const recordId = r.id
			this.fields.forEach((f) => {
				if (
					[FieldAccess.optional, FieldAccess.required].includes(f.fieldAccess) &&
					!f.colDO.colDB.isNonData
				) {
					const statusField = f.getStatus(this, recordId)
					newStatus = newStatus.update(statusField)
				}
			})
		})
		return newStatus
	}
}

export class DataObjActionField {
	actionFieldConfirms: DataObjActionFieldConfirm[]
	actionFieldShows: DataObjActionFieldShow[]
	codeActionFieldTriggerEnable: DataObjActionFieldTriggerEnable
	codeActionFieldType: TokenAppDoActionFieldType
	fProxy?: Function
	fieldColor: FieldColor
	header: string
	isDisabled: boolean = false
	isListRowAction: boolean
	isShow: boolean = false
	name: string
	constructor(rawAction: RawDataObjActionField, state: State | undefined = undefined) {
		const clazz = 'DataObjActionField'
		this.actionFieldConfirms = rawAction.actionFieldConfirms
		this.actionFieldShows = rawAction.actionFieldShows
		this.codeActionFieldTriggerEnable = rawAction.codeActionFieldTriggerEnable
		this.codeActionFieldType = rawAction.codeActionFieldType
		this.fProxy = state?.proxyGet(this.codeActionFieldType)
		this.fieldColor = rawAction.fieldColor
		this.header = rawAction.header
		this.isListRowAction = rawAction.isListRowAction
		this.name = rawAction.name
	}
	proxyExe(parms: any) {
		if (this.fProxy) {
			this.fProxy({
				...parms,
				actionType: this.codeActionFieldType,
				confirm: this.actionFieldConfirms ? this.actionFieldConfirms[0].confirm : undefined,
				confirmType: this.actionFieldConfirms
					? this.actionFieldConfirms[0].codeConfirmType
					: undefined
			})
		}
	}
}

export class DataObjActionFieldConfirm {
	codeConfirmType: TokenAppDoActionConfirmType
	codeTriggerConfirmConditional: DataObjActionFieldTriggerEnable
	confirm: DataObjConfirm
	constructor(obj: any) {
		const clazz = 'DataObjActionConfirm'
		obj = valueOrDefault(obj, {})
		this.codeConfirmType = memberOfEnum(
			obj._codeConfirmType,
			clazz,
			'codeConfirmType',
			'TokenAppDoActionConfirmType',
			TokenAppDoActionConfirmType
		)
		this.codeTriggerConfirmConditional = memberOfEnum(
			obj._codeTriggerConfirmConditional,
			clazz,
			'codeTriggerConfirmConditional',
			'DataObjActionTriggerRender',
			DataObjActionFieldTriggerEnable
		)
		this.confirm = new DataObjConfirm(obj)
	}
}

export enum DataObjActionFieldTriggerEnable {
	always = 'always',
	listReorder = 'listReorder',
	listReorderCancel = 'listReorderCancel',
	never = 'never',
	none = 'none',
	notObjectChanged = 'notObjectChanged',
	notReorder = 'notReorder',
	objectChanged = 'objectChanged',
	objectValidToContinue = 'objectValidToContinue',
	objectValidToSave = 'objectValidToSave',
	parentObjectSaved = 'parentObjectSaved',
	saveMode = 'saveMode',
	saveModeInsert = 'saveModeInsert',
	saveModeUpdate = 'saveModeUpdate'
}

export class DataObjActionFieldShow {
	codeTriggerShow: DataObjActionFieldTriggerEnable
	isRequired: boolean
	constructor(obj: any) {
		const clazz = 'DataObjActionShow'
		obj = valueOrDefault(obj, {})
		this.codeTriggerShow = memberOfEnum(
			obj._codeTriggerShow,
			clazz,
			'codeTriggerShow',
			'DataObjActionTriggerRender',
			DataObjActionFieldTriggerEnable
		)
		this.isRequired = valueOrDefault(obj.isRequired, false)
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
	cardinality: DataObjCardinality
	dataRows: DataRow[] = []
	fields: DataObjDataField[] = []
	items: DataRecord = {}
	constructor(cardinality: DataObjCardinality, data: any = undefined) {
		const clazz = 'DataObjData'
		this.cardinality = cardinality
	}
	static load(source: DataObjData) {
		const data = new DataObjData(source.cardinality)
		source.dataRows.forEach((row) => {
			data.dataRows.push(new DataRow(row.status, row.record))
		})
		data.items = { ...source.items }
		data.fields = source.fields.map((field) => {
			return new DataObjDataField(
				field.fieldName,
				field.rawDataObj,
				DataObjData.load(field.data),
				undefined
			)
		})
		return data
	}
	addFieldInit(fieldName: string, rawDataObj: RawDataObj) {
		const idx = this.fields.push(
			new DataObjDataField(
				fieldName,
				rawDataObj,
				new DataObjData(DataObjCardinality.list),
				undefined
			)
		)
		return this.fields[idx - 1]
	}
	addFieldSave(fieldName: string, rawDataObj: RawDataObj, dataSave: DataObjData) {
		const idx = this.fields.push(new DataObjDataField(fieldName, rawDataObj, undefined, dataSave))
		return this.fields[idx - 1]
	}
	addRow(status: DataRecordStatus, record: DataRecord, items: DataRecord = {}) {
		this.dataRows.push(new DataRow(status, record))
	}
	getDetailRecord() {
		if (this.dataRows.length > 0) return this.dataRows[0].record
		error(500, {
			file: FILENAME,
			function: 'dataObjData.getDetailRecord',
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
			function: 'dataObjData.getDetailRow',
			message: `No detail record available.`
		})
	}
	getDetailStatusRecord() {
		if (this.dataRows.length > 0) return this.dataRows[0].status
		error(500, {
			file: FILENAME,
			function: 'dataObjData.getDetailStatusRecord',
			message: `No detail record available.`
		})
	}
	getDetailStatusRecordIs(status: DataRecordStatus) {
		if (this.dataRows.length < 1) return false
		const statusRecord = this.getDetailStatusRecord()
		return statusRecord === status
	}
	getField(fieldName: string) {
		const field = this.fields.find((f) => f.fieldName === fieldName)
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
	getFieldData(fieldName: string): DataObjData {
		const field = this.getField(fieldName)
		if (field) {
			return field.data
		} else {
			error(500, {
				file: FILENAME,
				function: 'dataObjData.getFieldData',
				message: `Field ${fieldName} not found.`
			})
		}
	}
	getRecordsList() {
		return this.dataRows.map((row) => row.record)
	}
	getRow(id: string) {
		const row = this.dataRows.findIndex((r) => r.record.id === id)
		return row > -1 ? this.dataRows[row] : undefined
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
		if (this.dataRows.length === 0) return false
		return Object.keys(this.dataRows[0].record).length > 0
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

export class DataObjDataField {
	data: DataObjData
	dataSave: DataObjData
	fieldName: string
	rawDataObj: RawDataObj
	constructor(
		fieldName: string,
		rawDataObj: RawDataObj,
		data: DataObjData | undefined,
		dataSave: DataObjData | undefined
	) {
		this.data = data ? data : new DataObjData(dataSave!.cardinality)
		this.dataSave = dataSave ? dataSave : new DataObjData(data!.cardinality)
		this.fieldName = fieldName
		this.rawDataObj = rawDataObj
	}
}

export enum DataObjListEditPresetType {
	insert = 'insert',
	save = 'save'
}

export class DataObjParent {
	columnName: string
	columnIsMultiSelect: boolean
	filterExpr?: string
	table: DBTable
	constructor(obj: RawDataObjParent) {
		const clazz = 'DataObjParent'
		obj = valueOrDefault(obj, {})
		this.columnName = strRequired(obj._columnName, clazz, 'columnName')
		this.columnIsMultiSelect = booleanRequired(
			obj._columnIsMultiSelect,
			clazz,
			'columnIsMultiSelect'
		)
		this.filterExpr = strOptional(obj._filterExpr, clazz, 'filterExpr')
		this.table = new DBTable(required(obj._table, clazz, 'table'))
	}
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

export class MetaData {
	data: DataRecord = {}
	metaParmListRecordIdCurrent = 'listRecordIdCurrent'
	metaParmListRecordIdList = 'listRecordIdList'
	metaParmListRecordIdParent = 'listRecordIdParent'
	constructor(data: DataRecord = {}) {
		this.data = data
	}
	dataInit(parms: DataRecord) {
		this.data = parms
	}
	dataSave(parms: DataRecord) {
		Object.entries(parms).forEach(([key, value]) => {
			this.data[key] = value
		})
	}

	init(parms: DataRecord) {
		parms = valueOrDefault(parms, {})
		this.valueSet(
			this.metaParmListRecordIdCurrent,
			Object.hasOwn(parms, this.metaParmListRecordIdCurrent)
				? parms[this.metaParmListRecordIdCurrent]
				: ''
		)
		this.valueSet(
			this.metaParmListRecordIdList,
			Object.hasOwn(parms, this.metaParmListRecordIdList)
				? parms[this.metaParmListRecordIdList]
				: []
		)
	}
	initLevel(parms: DataRecord) {
		parms = valueOrDefault(parms, {})
		// idCurrent
		let idCurrent = Object.hasOwn(parms, this.metaParmListRecordIdCurrent)
			? parms[this.metaParmListRecordIdCurrent]
			: ''
		this.valueSet(this.metaParmListRecordIdCurrent, idCurrent)

		// idList
		let idList = Object.hasOwn(parms, this.metaParmListRecordIdList)
			? parms[this.metaParmListRecordIdList]
			: this.valueGet(this.metaParmListRecordIdList)
		this.valueSet(this.metaParmListRecordIdList, idList)
	}

	listSetParms(parms: DataRecord) {
		let idCurrent = this.valueGet(this.metaParmListRecordIdCurrent)
		let idList = this.valueGet(this.metaParmListRecordIdList)
		if (idCurrent && idList) {
			parms[this.metaParmListRecordIdCurrent] = idCurrent
			parms[this.metaParmListRecordIdList] = idList
		}
	}
	listUpdate(records: DataRow[] | undefined, recordId: string, recordIdAlt: string = '') {
		this.valueSetId(recordIdAlt ? recordIdAlt : recordId)
		this.valueSetList(records)
	}

	valueGet(key: string) {
		return this.data[key]
	}
	valueGetId() {
		return this.valueGet(this.metaParmListRecordIdCurrent)
	}
	valueGetIdList() {
		return getArray(this.valueGet(this.metaParmListRecordIdList))
	}
	valueGetAll() {
		return this.data
	}
	valueSet(key: string, value: any) {
		this.data[key] = value
	}
	valueSetId(id: string) {
		this.valueSet(this.metaParmListRecordIdCurrent, id)
	}
	valueSetList(dataRows: DataRow[] | undefined) {
		this.valueSet(
			this.metaParmListRecordIdList,
			dataRows ? dataRows.map((row) => row.record.id) : []
		)
	}
}
