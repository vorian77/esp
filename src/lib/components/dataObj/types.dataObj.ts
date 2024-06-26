import { State, StateActionProxy } from '$comps/app/types.appState'
import { apiFetch, ApiFunction } from '$routes/api/api'
import {
	booleanOrFalse,
	debug,
	getArray,
	memberOfEnum,
	memberOfEnumOrDefault,
	nbrOptional,
	nbrRequired,
	required,
	ResponseBody,
	strOptional,
	strRequired,
	ValidityField,
	valueHasChanged,
	valueOrDefault,
	arrayOfClasses,
	booleanRequired
} from '$utils/types'
import {
	RawDataObj,
	RawDataObjActionField,
	RawDataObjParent,
	RawDataObjPropDisplay,
	RawDataObjTable
} from '$comps/dataObj/types.rawDataObj'
import {
	Validation,
	ValidationStatus,
	Validity,
	ValidityError,
	ValidityErrorLevel
} from '$comps/form/types.validation'
import { Field, FieldAccess, FieldColor, FieldElement, RawFieldProps } from '$comps/form/field'
import { FieldCheckbox } from '$comps/form/fieldCheckbox'
import {
	FieldEmbedListConfig,
	FieldEmbedListEdit,
	FieldEmbedListSelect
} from '$comps/form/fieldEmbed'
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
import {
	TokenAppDoActionFieldType,
	TokenAppDoActionConfirmType,
	TokenApiQueryData
} from '$utils/types.token'
import { PropSortDir } from '$comps/dataObj/types.rawDataObj'
import { getEnhancement } from '$enhance/crud/_crud'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/dataObj/types.dataObj.ts'

export class DataObj {
	actionsField: DataObjActionField[] = []
	actionsQueryFunctions: DataObjActionQueryFunction[] = []
	data: DataObjData
	dataFieldsChanged: FieldValues = new FieldValues()
	dataFieldValidities: FieldValues = new FieldValues()
	dataItems: DataRecord = {}
	dataRecordsDisplay: DataRecord[] = []
	dataRecordsHidden: DataRecord[] = []
	fields: Field[] = []
	raw: RawDataObj
	rootTable?: DBTable
	saveMode: DataObjSaveMode = DataObjSaveMode.any
	constructor(rawDataObj: RawDataObj, data: DataObjData) {
		const clazz = 'DataObj'
		rawDataObj = valueOrDefault(rawDataObj, {})
		this.raw = rawDataObj
		this.data = new DataObjData(this.raw.codeCardinality)
		this.fields = this.initFields(rawDataObj.rawPropsDisplay, data)

		/* dependent properties */
		this.rootTable =
			this.raw.tables && this.raw.tables.length > 0
				? new DBTable(rawDataObj.tables[0].table)
				: undefined
	}

	static async init(state: State, rawDataObj: RawDataObj, data: DataObjData) {
		const dataObj = new DataObj(rawDataObj, data)
		await enhanceCustomFields(dataObj.fields)
		dataObj.actionsQueryFunctions = await getActionQueryFunctions(rawDataObj.actionsQuery)
		initActionsField()
		await initParmDataItems(state, dataObj)
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
		async function initParmDataItems(state: State, dataObj: DataObj) {
			const parms = dataObj.fields.filter((f) => f instanceof FieldParm) as FieldParm[]
			if (parms.length > 0) {
				const repUserId = state.dataQuery.valueGet('listRecordIdParent')
				if (repUserId) {
					const result: ResponseBody = await apiFetch(
						ApiFunction.dbEdgeGetRepParmItems,
						new TokenApiQueryData({ parms: { repUserId } })
					)
					if (result.success) {
						for (const parm of parms) {
							await parm.setDataItems(result.data)
						}
					}
				}
			}
		}
	}

	initFields(propsRaw: RawDataObjPropDisplay[], data: DataObjData) {
		let fields: Field[] = []
		let firstVisible = propsRaw.findIndex((f) => typeof f.orderDisplay === 'number')
		propsRaw.forEach((propRaw: RawDataObjPropDisplay, idx) => {
			fields.push(DataObj.initField(propRaw, firstVisible === idx, fields, data))
		})
		return fields
	}

	static initField(
		propRaw: RawDataObjPropDisplay,
		isFirstVisible: boolean,
		fields: Field[],
		data: DataObjData
	) {
		let newField: Field
		const props = new RawFieldProps(propRaw, isFirstVisible, fields, data)

		if (typeof propRaw.orderDisplay !== 'number') {
			newField = new Field(props)
		} else {
			const element = memberOfEnum(
				propRaw.rawFieldElement,
				'DataObj',
				'element',
				'FieldElement',
				FieldElement
			)
			switch (element) {
				// input
				case FieldElement.date:
				case FieldElement.email:
				case FieldElement.number:
				case FieldElement.password:
				case FieldElement.tel:
				case FieldElement.text:
					newField = new FieldInput(props)
					break

				case FieldElement.checkbox:
					newField = new FieldCheckbox(props)
					break

				case FieldElement.customActionButton:
					newField = new FieldCustomActionButton(props)
					break

				case FieldElement.customActionLink:
					newField = new FieldCustomActionLink(props)
					break

				case FieldElement.customHeader:
					newField = new FieldCustomHeader(props)
					break

				case FieldElement.customText:
					newField = new FieldCustomText(props)
					break

				case FieldElement.embedListConfig:
					newField = new FieldEmbedListConfig(props)
					break

				case FieldElement.embedListEdit:
					newField = new FieldEmbedListEdit(props)
					break

				case FieldElement.embedListSelect:
					newField = new FieldEmbedListSelect(props)
					break

				case FieldElement.file:
					newField = new FieldFile(props)
					break

				case FieldElement.parm:
					newField = new FieldParm(props)
					break

				case FieldElement.radio:
					newField = new FieldRadio(props)
					break

				case FieldElement.select:
					newField = new FieldSelect(props)
					break

				case FieldElement.tagRow:
					newField = new FieldTagRow(props)
					break

				case FieldElement.tagSection:
					newField = new FieldTagSection(props)
					break

				case FieldElement.textArea:
					newField = new FieldTextarea(props)
					break

				case FieldElement.toggle:
					newField = new FieldToggle(props)
					break

				default:
					error(500, {
						file: FILENAME,
						function: 'initFields',
						message: `No case defined for field element: ${element}`
					})
			}
		}
		return newField
	}

	get objData() {
		const data = new DataObjData(this.raw.codeCardinality)
		setDataRecords(this.data, data, this.dataRecordsDisplay)
		setDataRecords(this.data, data, this.dataRecordsHidden)
		return data

		function setDataRecords(
			dataSource: DataObjData,
			dataReturn: DataObjData,
			dataRecords: DataRecord[]
		) {
			dataRecords.forEach((record) => {
				const dataRow = dataSource.getRow(record.id)
				const status = dataRow ? dataRow.status : DataRecordStatus.preset
				let newRecord: DataRecord = {}
				Object.entries(record).forEach(([key, value]) => {
					if (![null, undefined].includes(value)) newRecord[key] = value
				})
				dataReturn.addRow(status, newRecord)
			})
		}
	}

	set objData(dataSource: DataObjData) {
		this.saveMode =
			dataSource.cardinality === DataObjCardinality.detail && dataSource.hasRecord()
				? dataSource.getDetailStatusRecordIs(DataRecordStatus.preset)
					? DataObjSaveMode.insert
					: DataObjSaveMode.update
				: DataObjSaveMode.any

		// set data
		let recordsClone: DataRecord[] = []
		dataSource.dataRows.forEach((row) => {
			if (row.status !== DataRecordStatus.delete) {
				recordsClone.push({ ...row.record })
			}
		})
		this.dataRecordsDisplay = recordsClone
		this.dataFieldsChanged = new FieldValues()
		this.dataFieldValidities = new FieldValues()

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
	}

	getFieldDisplayByName(fieldName: string) {
		let field = this.fields.find((f) => f.colDO.propName === fieldName)
		if (field) return field

		// check parmValue
		field = this.fields.find((f) => f.colDO.propName === 'parmValue')
		if (field instanceof FieldParm) return field.getParmField(fieldName)

		return undefined
	}
	getStatusChanged() {
		return this.dataFieldsChanged.values.length > 0
	}

	preValidate(): boolean {
		let formStatus: ValidationStatus = ValidationStatus.valid
		let fieldValid: boolean

		this.dataRecordsDisplay.forEach((record) => {
			this.fields.forEach((f) => {
				const fieldName = f.colDO.propName
				if (f.fieldAccess !== FieldAccess.readonly && !f.colDO.colDB.isNonData) {
					fieldValid = true
					const valueCurrent = record[fieldName]
					const typeOf = typeof valueCurrent
					if (valueCurrent === undefined || valueCurrent === null || valueCurrent === '') {
						if (f.fieldAccess === FieldAccess.required) {
							formStatus = ValidationStatus.invalid
							fieldValid = false
							this.dataFieldValidities.valueSet(
								record.id,
								fieldName,
								new Validity(ValidityError.missingData, ValidityErrorLevel.silent)
							)
						}
					} else {
						const v: Validation = this.valueValidation(f, valueCurrent, record)
						if (v && v.status == ValidationStatus.invalid) {
							formStatus = ValidationStatus.invalid
							fieldValid = false
							this.dataFieldValidities.valueSet(record.id, fieldName, v.validityFields[0].validity)
						}
					}
					if (fieldValid) {
						this.dataFieldValidities.valueSet(record.id, fieldName, new Validity())
					}
				}
			})
		})
		return formStatus === ValidationStatus.valid
	}

	print() {
		alert('Print functionality for this object has not yet been implemented.')
	}

	/* user data manipulation */
	userSetFieldVal(row: number, field: Field, value: any) {
		const recordId = this.dataRecordsDisplay[row]['id']
		const fieldName = field.isParmValue ? 'parmValue' : field.colDO.propName
		this.valueSet(recordId, fieldName, value)

		// validate
		const v: Validation = this.valueValidation(field, value, this.dataRecordsDisplay[row])
		v.validityFields.forEach(({ fieldName, validity }) => {
			this.dataFieldValidities.valueSet(recordId, fieldName, validity)
		})
		this.dataFieldValidities = this.dataFieldValidities
	}

	valueSet(recordId: string, fieldName: string, userValue: any) {
		const recordRow = this.dataRecordsDisplay.findIndex((r) => r.id === recordId)
		if (recordRow > -1) {
			this.dataRecordsDisplay[recordRow][fieldName] = userValue
			const valueInitial = this.data.getValue(recordId, fieldName)
			const changed = valueHasChanged(valueInitial, userValue)
			if (changed) {
				this.dataFieldsChanged.valueSet(recordId, fieldName, true)
			} else {
				this.dataFieldsChanged.valueDrop(recordId, fieldName)
			}
		}
	}
	valueValidation(field: Field, userValue: any, dataRecord: DataRecord) {
		let vRtn: Validation | undefined

		// validate pre
		if (field.fValidatePre) {
			vRtn = field.fValidatePre(userValue, dataRecord)
			if (vRtn) return vRtn
		}

		// primary validate
		vRtn = this.valueValidationValidate(field, userValue)
		if (vRtn) return vRtn

		// validate post
		if (field.fValidatePost) {
			vRtn = field.fValidatePost(userValue, dataRecord)
			if (vRtn) return vRtn
		}

		// default
		return field.getValuationValid()
	}
	valueValidationValidate(field: Field, userValue: any) {
		// only validate access types that require validation
		if (![FieldAccess.required, FieldAccess.optional].includes(field.fieldAccess)) {
			return field.getValuationValid()
		}

		// optional & empty
		if (field.fieldAccess === FieldAccess.optional && !userValue) {
			return field.getValuationValid()
		}

		// required
		if ([null, undefined].includes(userValue)) {
			return field.getValuationInvalid(
				ValidityError.required,
				ValidityErrorLevel.warning,
				`"${field.colDO.label}" is required.`
			)
		}
		return undefined
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
		return data
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
	getRecordsList() {
		return this.dataRows.map((row) => row.record)
	}
	getRow(id: string) {
		const row = this.dataRows.findIndex((r) => r.record.id === id)
		return row > -1 ? this.dataRows[row] : undefined
	}
	getValue(recordId: string, key: string) {
		const recordIndex = this.dataRows.findIndex((r) => r.record.id === recordId)
		if (recordIndex > -1) return this.dataRows[recordIndex].record[key]
		error(500, {
			file: FILENAME,
			function: 'dataObjData.getValue',
			message: `Record id ${recordId} not found.`
		})
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
	}
	setValid(status: boolean) {
		this.objValidToSave = status
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
