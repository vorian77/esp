import { State, StatePacketAction } from '$comps/app/types.appState'
import {
	booleanRequired,
	getArray,
	memberOfEnum,
	memberOfEnumOrDefault,
	required,
	ResponseBody,
	strOptional,
	strRequired,
	UserPrefType,
	valueHasChanged,
	valueOrDefault
} from '$utils/types'
import { apiFetch, ApiFunction } from '$routes/api/api'
import {
	RawDataObj,
	RawDataObjActionField,
	RawDataObjPropDisplay,
	RawDataObjTable
} from '$comps/dataObj/types.rawDataObj'
import { DataObjActionField } from '$comps/dataObj/types.dataObjActionField'
import { Validation, ValidationStatus, ValidityErrorLevel } from '$comps/form/types.validation'
import {
	Field,
	FieldAccess,
	FieldColor,
	FieldItem,
	FieldElement,
	PropsField,
	PropsFieldRaw
} from '$comps/form/field'
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
import { evalExprTokensItems, ExprParmsItem } from '$routes/api/dbEdge/dbEdgeGetVal'
import { GridSettings } from '$comps/grid/grid'
import { FieldInput } from '$comps/form/fieldInput'
import { FieldFile } from '$comps/form/fieldFile'
import { FieldParm } from '$comps/form/fieldParm'
import { FieldRadio } from '$comps/form/fieldRadio'
import { FieldTagRow, FieldTagSection } from '$comps/form/fieldTag'
import { FieldSelect } from '$comps/form/fieldSelect'
import { FieldTextarea } from '$comps/form/fieldTextarea'
import { FieldToggle } from '$comps/form/fieldToggle'
import { DataObjActionQuery, DataObjActionQueryFunction } from '$comps/app/types.appQuery'
import { TokenApiDbDataObjSource, TokenApiQueryData, TokenApiUserPref } from '$utils/types.token'
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
	isMobileMode: boolean = false
	modes: DataObjMode[] = []
	objStatus: DataObjStatus = new DataObjStatus()
	raw: RawDataObj
	rootTable?: DBTable
	saveMode: DataObjSaveMode = DataObjSaveMode.any
	userGridSettings: GridSettings
	constructor(data: DataObjData) {
		const clazz = 'DataObj'
		this.data = data
		this.raw = required(data.rawDataObj, clazz, 'rawDataObj')

		/* dependent properties */
		this.userGridSettings = new GridSettings(this.raw.id)
		this.rootTable =
			this.raw.tables && this.raw.tables.length > 0
				? new DBTable(this.raw.tables[0].table)
				: undefined
	}
	actionsFieldEmbedSet(action: StatePacketAction, fieldEmbed: FieldEmbed) {
		const field = this.actionsField.find((f) => f.codePacketAction === action)
		if (field) {
			field.setFieldEmbed(fieldEmbed)
		} else {
			error(500, {
				file: FILENAME,
				function: 'DataObj.actionsFieldEmbedSet',
				message: `Field for StatePacketAction: ${action} not found.`
			})
		}
	}
	actionsFieldTrigger(packetAction: StatePacketAction, state: State) {
		const action = this.actionsField.find((f) => f.codePacketAction === packetAction)
		if (action) {
			action.trigger(state, this)
		} else {
			error(500, {
				file: FILENAME,
				function: 'DataObj.actionsFieldTrigger',
				message: `Field for StatePacketAction: ${packetAction} not found.`
			})
		}
	}

	getDataVal(record: DataRecord, propNameRaw: string, indexTable: number = 0) {
		const field = this.fields.find((f) => f.colDO.propNameRaw === propNameRaw)
		if (field) {
			return record[field.colDO.propName]
		} else {
			error(500, {
				file: FILENAME,
				function: 'getDataVal',
				message: `Field for propNameRaw: ${propNameRaw} not found.`
			})
		}
	}

	static async init(state: State, data: DataObjData) {
		const clazz = 'DataObj.init'
		const rawDataObj = required(data.rawDataObj, clazz, 'rawDataObj')
		const dataObj = new DataObj(data)
		dataObj.userGridSettings = await initPrefs(state, dataObj)

		// embedded fields
		for (let i = 0; i < data.fields.length; i++) {
			data.fields[i].dataObj = await DataObj.init(state, data.fields[i].data)
		}

		// actions
		dataObj.fields = dataObj.fieldsCreate(state, data, rawDataObj)
		await dataObj.fieldsInit(state, dataObj)

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
		async function initPrefs(state: State, dataObj: DataObj) {
			let rawSettings = {}
			if (state?.user?.prefIsActive(UserPrefType.remember_list_settings)) {
				// attempt to retrieve user preferences from DB
				const token = new TokenApiUserPref(state.user.id, dataObj.raw.id)
				const result: ResponseBody = await apiFetch(ApiFunction.sysGetUserPref, token)
				rawSettings =
					Object.hasOwn(result, 'data') && Object.hasOwn(result.data, 'data')
						? JSON.parse(result.data.data).data
						: {}
			}
			return dataObj.userGridSettings.load(rawSettings, state, dataObj)
		}
	}

	fieldsCreate(state: State, data: DataObjData, rawDataObj: RawDataObj) {
		let fields: Field[] = []
		let propsRaw = rawDataObj.rawPropsDisplay

		if (state.app.isMobileMode) {
			const mobileModeFilterElements = ['tagRow', 'tagSection']
			const mobileModeFilterProps = ['createdAt', 'createdBy', 'modifiedAt', 'modifiedBy']
			propsRaw = propsRaw.filter((f) => {
				return (
					!mobileModeFilterElements.includes(f.rawFieldElement || '') &&
					!mobileModeFilterProps.includes(f.propName)
				)
			})
		}

		let firstVisibleIdx = propsRaw.findIndex((f) => f.isDisplayable)

		// create fields
		propsRaw.forEach((p, idx) => {
			fields.push(DataObj.fieldsCreateItem(state, p, firstVisibleIdx === idx, fields, this, data))
		})
		return fields
	}

	static fieldsCreateItem(
		state: State,
		propRaw: RawDataObjPropDisplay,
		isFirstVisible: boolean,
		fields: Field[],
		dataObj: DataObj,
		data: DataObjData
	) {
		let newField: Field
		const props = new PropsFieldRaw({ data, dataObj, fields, isFirstVisible, propRaw, state })

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
			case FieldElement.currency:
			case FieldElement.date:
			case FieldElement.email:
			case FieldElement.number:
			case FieldElement.percentage:
			case FieldElement.tel:
			case FieldElement.text:
			case FieldElement.textHide:
				newField = new FieldInput(props)
				break

			case FieldElement.checkbox:
				newField = new FieldCheckbox(props)
				break

			case FieldElement.chips:
				newField = new FieldChips(props)
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

			case FieldElement.embedShell:
				newField = new FieldEmbedShell(props)
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
		return newField
	}

	async fieldsInit(state: State, dataObj: DataObj) {
		const props = new PropsField({ dataObj, state })
		for (let i = 0; i < dataObj.fields.length; i++) {
			const field: Field = dataObj.fields[i]
			await field.init(props)
		}
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
					this.data.fields[idx].data.parms.valueSet(
						ParmsValuesType.embedParentId,
						field.embedParentId
					)
					this.data.fields[idx].data.parms.valueSet(
						ParmsValuesType.embedListSave,
						field.embedType === DataObjEmbedType.listEdit
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
			dataRecords.forEach((record) => {
				let newRecord: DataRecord = {}
				Object.entries(record).forEach(([key, value]) => {
					if (![null, undefined].includes(value)) {
						// don't included embedded fields
						if (-1 === dataCurrent.fields.findIndex((f) => f.embedFieldName === key)) {
							// don't include null or undefined values
							if (fieldsParmValueNames.includes(key)) {
								// <todo> temp parmValue
								// newRecord.parmValue = record[key]
								// delete newRecord[key]
							} else {
								newRecord[key] = value
							}
						}
					}
				})
				const oldStatus = dataCurrent.rowsRetrieved.getRowStatusById(record.id)
				dataRows.push(new DataRow(oldStatus ? oldStatus : DataRecordStatus.preset, newRecord))
			})
			return dataRows
		}
	}

	set objData(dataSource: DataObjData) {
		this.saveMode =
			dataSource.cardinality === DataObjCardinality.detail && dataSource.rowsRetrieved.hasRecord()
				? dataSource.rowsRetrieved.getDetailRowStatusIs(DataRecordStatus.preset)
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
						// <todo> temp parmValue
						// record[parmFieldName] = record.parmValue
						// delete record.parmValue
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
		const validityErrorLevel =
			this.raw.isListEdit ||
			this.data.rowsRetrieved.getDetailRowStatusIs(DataRecordStatus.retrieved)
				? ValidityErrorLevel.warning
				: ValidityErrorLevel.none

		this.dataRecordsDisplay.forEach((record, row) => {
			this.fields.forEach((f) => {
				const v: Validation = f.validate(row, record[f.colDO.propName], validityErrorLevel)
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
		if (this.raw.listReorderColumn && this.isListEmbed) {
			const reorderColumn = this.raw.listReorderColumn
			this.dataRecordsDisplay.sort((a, b) => a[reorderColumn] - b[reorderColumn])
		}
		return this
	}
	setFieldValChanged(row: number, recordId: string, fieldName: string, value: any) {
		this.dataRecordsDisplay[row][fieldName] = value
		const valueInitial = this.data.rowsRetrieved.getRowValueById(recordId, fieldName)
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
		this.objStatus = newStatus
		return this.objStatus
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
	parms: ParmsValues = new ParmsValues()
	rawDataObj?: RawDataObj
	rowsRetrieved: DataRows = new DataRows()
	rowsSave: DataRows = new DataRows()
	constructor(rawDataObj?: RawDataObj) {
		const clazz = 'DataObjData'
		if (rawDataObj) this.init(rawDataObj)
	}

	getItemDisplayValue(items: FieldItem[], ids: any) {
		let display = ''
		if (!Array.isArray(ids)) ids = [ids]
		ids.forEach((id: string) => {
			const item = items.find((i: FieldItem) => i.data === id)
			if (item) display += display ? ',' + item.display : item.display
		})
		return display
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
		data.parms = ParmsValues.load(source.parms)
		data.rowsRetrieved = DataRows.load(source.rowsRetrieved)
		data.rowsSave = DataRows.load(source.rowsSave)
		return data
	}

	formatForGrid(fields: Field[]) {
		let gridData: DataRecord[] = []
		this.rowsRetrieved.getRows().forEach((dataRow) => {
			let record: DataRecord = {}
			fields.forEach((field) => {
				const fieldName = field.colDO.propName
				const data = dataRow.record.getValue(fieldName)
				const codeDataType = field.colDO.colDB.codeDataType
				const display =
					field.colDO.items.length > 0 ? this.getItemDisplayValue(field.colDO.items, data) : data
				record[fieldName] = { data, display }
			})
			gridData.push(record)
		})
		return gridData

		function getLinkDisplay(propName: String, data: any) {}
	}
	formatForSave(data: any) {}

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
		return this.parms.valueGetAll()
	}
	resetRowsRetrieved() {
		this.rowsRetrieved.reset()
		this.fields.forEach((f) => {
			f.data.resetRowsRetrieved()
		})
	}
}

export class DataObjDataField {
	columnBacklink?: string
	data: DataObjData
	dataObj?: DataObj
	embedFieldName: string
	embedFieldNameRaw: string
	embedTable: DBTable
	embedType: DataObjEmbedType
	parentTable: DBTable
	constructor(obj: any = {}) {
		const clazz = 'DataObjDataField'
		this.columnBacklink = strOptional(obj.columnBacklink, clazz, 'columnBacklink')
		this.embedFieldName = strRequired(obj.embedFieldName, clazz, 'embedFieldName')
		this.embedFieldNameRaw = strRequired(obj.embedFieldNameRaw, clazz, 'embedFieldNameRaw')
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
						exprFilter: `.id IN (SELECT ${parentTable.object} FILTER .id = <tree,uuid,${parentTable.name}.id>).${field.propNameRaw}.id`
					}),
					queryData
				)
				fields.push(
					new DataObjDataField({
						columnBacklink: field.columnBacklink,
						embedDataObjId,
						embedFieldName: field.propName,
						embedFieldNameRaw: field.propNameRaw,
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
		fields = getArray(fields)
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
	addItem(fieldName: string, direction: string | undefined, sortIndex: number) {
		this.sortItems.push(
			new DataObjSortItem(
				fieldName,
				direction?.toLowerCase() === 'asc' || !direction ? PropSortDir.asc : PropSortDir.desc,
				sortIndex
			)
		)
	}
	load(rawSortItems: any) {
		rawSortItems = getArray(rawSortItems)
		rawSortItems.forEach((item: DataObjSortItem) => {
			this.addItem(item.colId, item.sort, item.sortIndex)
		})
		return this
	}
}

export class DataObjSortItem {
	colId: string
	sort: PropSortDir
	sortIndex: number
	constructor(colId: string, sort: PropSortDir, sortIndex: number) {
		this.colId = colId
		this.sort = sort
		this.sortIndex = sortIndex
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
	getValue(key: string) {
		return getRecordValue(this.record, key)
	}
	setValue(key: string, value: any) {
		setRecordValue(this.record, key, value)
	}
}

export class DataRows {
	dataRows: DataRow[] = []
	constructor() {}
	add(newRow: DataRow) {
		this.dataRows.push(newRow)
	}
	getDetailRecordValue(key: string) {
		return this.getRowValue(0, key)
	}
	getDetailRow() {
		if (this.dataRows.length === 1) return this.dataRows[0]
		error(500, {
			file: FILENAME,
			function: 'DataRows.getDetailRow',
			message: `No detail row available.`
		})
	}
	getDetailRowStatusIs(status: DataRecordStatus) {
		return status === this.getRowStatus(0)
	}
	getRowById(id: string) {
		return this.dataRows.findIndex((dr) => dr.record.id === id)
	}
	getRowValue(row: number, key: string) {
		if (this.dataRows.length <= row) return undefined
		return this.dataRows[row].getValue(key)
	}
	getRowValueById(id: string, key: string) {
		const row = this.getRowById(id)
		if (row > -1) {
			return this.getRowValue(row, key)
		} else {
			error(500, {
				file: FILENAME,
				function: 'dataObjData.getRowValueById',
				message: `Cannot find row for recordId: ${id}`
			})
		}
	}
	getRowStatus(row: number) {
		return this.dataRows.length > row ? this.dataRows[row].status : undefined
	}
	getRowStatusById(id: string) {
		const row = this.getRowById(id)
		return row > -1 ? this.dataRows[row].status : undefined
	}
	getRows() {
		return this.dataRows
	}
	hasRecord() {
		return this.dataRows.length > 0 && Object.keys(this.dataRows[0].record).length > 0
	}
	static load(source: DataRows) {
		const dataRows = new DataRows()
		if (source) {
			source.dataRows.forEach((dataRow) => {
				dataRows.add(new DataRow(dataRow.status, dataRow.record))
			})
		}
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
		this.setRecordValue(0, key, value)
	}
	setRecordValue(row: number, key: string, value: any) {
		if (this.dataRows.length <= row) return
		return this.dataRows[row].setValue(key, value)
	}
	syncFields(source: DataRecord[], fields: string[]) {
		source.forEach((record) => {
			fields.forEach((fieldName) => {
				const row = this.dataRows.findIndex((r) => r.record.id === record.id)
				if (row > -1) this.dataRows[row].record[fieldName] = record[fieldName]
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

export function getRecordValue(record: DataRecord, key: string) {
	for (const [k, v] of Object.entries(record)) {
		if (k.endsWith(key)) {
			return v
		}
	}
	return undefined
}

export function setRecordValue(record: DataRecord, key: string, value: any) {
	for (const [k, v] of Object.entries(record)) {
		if (k.endsWith(key)) {
			record[k] = value
			return
		}
	}
}

export class ParmsUser {
	data: ParmsUserData[] = []
	constructor() {}
	parmGet(id: string, type: ParmsUserDataType) {
		let idx = this.data.findIndex((p) => p.id === id && p.type === type)
		return idx > -1 ? this.data[idx].value : undefined
	}
	parmSet(id: string, type: ParmsUserDataType, value: any) {
		let idx = this.data.findIndex((p) => p.id === id && p.type === type)
		if (idx > -1) {
			this.data[idx].value = value
		} else {
			this.data.push(new ParmsUserData(id, type, value))
		}
	}
	reset() {
		this.data = []
	}
}
export class ParmsUserData {
	id: string
	type: ParmsUserDataType
	value: any
	constructor(id: string, type: ParmsUserDataType, value: any) {
		this.id = id
		this.type = type
		this.value = value
	}
}
export enum ParmsUserDataType {
	listColumnsModel = 'listColumnsModel',
	listFilterModel = 'listFilterModel',
	listFilterQuick = 'listFilterQuick',
	listSortModel = 'listSortModel'
}

export class ParmsValues {
	data: DataRecord = {}
	constructor(data?: DataRecord) {
		this.data = valueOrDefault(data, {})
	}
	static load(parms: ParmsValues) {
		const newParms = new ParmsValues()
		if (parms) newParms.data = parms.data
		return newParms
	}
	update(data: DataRecord | undefined) {
		data = data ? data : {}
		Object.entries(data).forEach(([key, value]) => {
			this.data[key] = value
		})
	}
	updateList(listIds: string[], recordId: string, recordIdAlt: string = '') {
		this.valueSet(ParmsValuesType.listIds, listIds)
		this.valueSet(ParmsValuesType.listRecordIdCurrent, recordIdAlt ? recordIdAlt : recordId)
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

export enum ParmsValuesType {
	appSystemId = 'appSystemId',
	customProgramOwnerId = 'customProgramOwnerId',
	embedFieldName = 'embedFieldName',
	embedListSave = 'embedListSave',
	embedParentId = 'embedParentId',
	isMultiSelect = 'isMultiSelect',
	isSystemRoot = 'isSystemRoot',
	listIds = 'listIds',
	listIdsSelected = 'listIdsSelected',
	listItems = 'listItems',
	listItemsFieldDisplay = 'listItemsFieldDisplay',
	listItemsFieldId = 'listItemsFieldId',
	listLabel = 'listLabel',
	listRecordIdCurrent = 'listRecordIdCurrent'
}
