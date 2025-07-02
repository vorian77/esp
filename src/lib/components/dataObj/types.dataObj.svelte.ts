import { State } from '$comps/app/types.appState.svelte'
import {
	PropSortDir,
	RawDataObj,
	RawDataObjAction,
	RawDataObjPropDB,
	RawDataObjPropDisplay,
	RawDataObjPropDisplayItemChange
} from '$comps/dataObj/types.rawDataObj.svelte'
import {
	Field,
	FieldAccess,
	FieldColor,
	FieldElement,
	FieldItemChange,
	PropsFieldCreate,
	PropsFieldInit
} from '$comps/form/field.svelte'
import { FieldCheckbox } from '$comps/form/fieldCheckbox'
import { FieldChips } from '$comps/form/fieldChips'
import {
	FieldCustomActionButton,
	FieldCustomActionLink,
	FieldCustomHeader,
	FieldCustomHTML,
	FieldCustomImage,
	FieldCustomText
} from '$comps/form/fieldCustom'
import {
	FieldEmbed,
	FieldEmbedListConfig,
	FieldEmbedListEdit,
	FieldEmbedListSelect,
	FieldEmbedShell
} from '$comps/form/fieldEmbed'
import { FieldFile } from '$comps/form/fieldFile'
import { FieldInput } from '$comps/form/fieldInput'
import { FieldParm } from '$comps/form/fieldParm'
import { FieldRadio } from '$comps/form/fieldRadio'
import { FieldSelect } from '$comps/form/fieldSelect'
import { FieldTagDetails, FieldTagRow, FieldTagSection } from '$comps/form/fieldTag'
import { FieldTextarea } from '$comps/form/fieldTextarea'
import { FieldToggle } from '$comps/form/fieldToggle'
import { UserAction } from '$comps/other/types.userAction.svelte'
import {
	CodeAction,
	type DataRecord,
	getArray,
	getDataRecordValueKey,
	memberOfEnum,
	memberOfEnumOrDefault,
	MethodResult,
	ParmsValues,
	required,
	setDataRecordValue,
	UserPrefType
} from '$utils/types'
import { TokenApiQueryType } from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/dataObj/types.dataObj.svelte.ts'

export type DataItems = Record<string, { data: string; display: string }[]>

export class DataObj {
	actionsFieldListRowActionIdx: number = -1
	data: DataObjData = $state(new DataObjData())
	dataItems: DataItems = {}
	embedField?: FieldEmbed
	fields: Field[] = []
	isDetailPreset: boolean = false
	raw: RawDataObj
	saveMode: DataObjSaveMode = DataObjSaveMode.any
	sortModel: DataObjSort
	treeLevelIdx: number = 0
	userActions: DataObjAction[] = $state([])
	constructor(data: DataObjData) {
		const clazz = 'DataObj'
		this.data = data
		this.raw = required(data.rawDataObj, clazz, 'rawDataObj')

		this.sortModel = this.initSortModel(this.raw.rawPropsSort)
	}

	async actionsFieldTrigger(sm: State, codeAction: CodeAction): Promise<MethodResult> {
		const userAction = this.userActions.find(
			(f) => f.action.codeAction.actionType === codeAction.actionType
		)
		if (userAction) {
			return userAction.action.trigger(sm, this)
		} else {
			return new MethodResult({
				error: {
					file: FILENAME,
					function: 'DataObj.actionsFieldTrigger',
					msg: `Could not find user action for codeAction: class: ${codeAction.actionClass} - type: ${codeAction.actionType}.`
				}
			})
		}
	}
	embedFieldSet(field: FieldEmbed) {
		this.embedField = field
	}

	static async init(
		sm: State,
		data: DataObjData,
		queryType: TokenApiQueryType = TokenApiQueryType.retrieve
	): Promise<MethodResult> {
		const clazz = 'DataObj.init'
		const dataObj = new DataObj(data)
		dataObj.data = data

		const propsFieldInit = new PropsFieldInit({
			data: dataObj.data,
			fields: dataObj.fields,
			sm
		})

		let result: MethodResult = await dataObj.fieldsCreate(propsFieldInit, queryType)
		if (result.error) return result
		dataObj.fields = result.data

		result = await dataObj.fieldsInit(sm, dataObj)
		if (result.error) return result

		const rawDataObj = required(data.rawDataObj, clazz, 'rawDataObj')
		initActionsField()

		initItemChangedTriggers(dataObj.fields)
		initRetrieveReadonly(dataObj, queryType)

		return new MethodResult(dataObj)

		function initActionsField() {
			dataObj.userActions = rawDataObj.rawActions.map((rawAction: RawDataObjAction) => {
				return new DataObjAction(rawAction)
			})
			dataObj.actionsFieldListRowActionIdx = dataObj.userActions.findIndex((f) => f.isListRowAction)
		}
		function initItemChangedTriggers(fields: Field[]) {
			fields.forEach((field) => {
				field.colDO.itemChanges.forEach((target: RawDataObjPropDisplayItemChange) => {
					field.itemChanges.push(new FieldItemChange(target, fields))
				})
			})
		}

		function initRetrieveReadonly(dataObj: DataObj, queryType: TokenApiQueryType) {
			if (
				dataObj.raw.isFormReadonly &&
				[TokenApiQueryType.retrieve, TokenApiQueryType.save].includes(queryType)
			) {
				dataObj.fields.forEach((field) => {
					if ([FieldAccess.optional, FieldAccess.required].includes(field.fieldAccess)) {
						field.fieldAccess = FieldAccess.readonly
					}
				})
			}
		}
	}

	initSortModel(rawPropsSort: RawDataObjPropDB[]) {
		const newSort = new DataObjSort()
		rawPropsSort.forEach((item, i) => {
			newSort.addItem(item.id, item.codeSortDir, i)
		})
		return newSort
	}

	async fieldsCreate(
		propsFieldInit: PropsFieldInit,
		queryType: TokenApiQueryType
	): Promise<MethodResult> {
		const clazz = 'DataObj.fieldsCreate'
		const rawDataObj = required(propsFieldInit.data.rawDataObj, clazz, 'rawDataObj')
		const rawPropsDisplay = rawDataObj.rawPropsDisplay
		let fields: Field[] = []

		// create fields
		for (let i = 0; i < rawPropsDisplay.length; i++) {
			const p: RawDataObjPropDisplay = rawPropsDisplay[i]
			if (!(queryType === TokenApiQueryType.preset && p.fieldEmbed)) {
				let result: MethodResult = await DataObj.fieldsCreateItem(propsFieldInit, p)
				if (result.error) return result
				const field: Field = result.data
				fields.push(field)
			}
		}
		return new MethodResult(fields)
	}

	static async fieldsCreateItem(propsFieldInit: PropsFieldInit, propRaw: RawDataObjPropDisplay) {
		let newField: Field
		let result: MethodResult

		const props = new PropsFieldCreate({ propRaw })

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
				newField = new FieldInput(new PropsFieldCreate({ propRaw, fields: propsFieldInit.fields }))
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

			case FieldElement.customHTML:
				newField = new FieldCustomHTML(props)
				break

			case FieldElement.customImage:
				newField = new FieldCustomImage(props)
				break

			case FieldElement.customText:
				newField = new FieldCustomText(props)
				break

			case FieldElement.embedListConfig:
				result = await FieldEmbed.initFieldClient(propsFieldInit, props, FieldEmbedListConfig)
				if (result.error) return result
				newField = result.data
				break

			case FieldElement.embedListEdit:
				result = await FieldEmbed.initFieldClient(propsFieldInit, props, FieldEmbedListEdit)
				if (result.error) return result
				newField = result.data
				break

			case FieldElement.embedListSelect:
				result = await FieldEmbed.initFieldClient(propsFieldInit, props, FieldEmbedListSelect)
				if (result.error) return result
				newField = result.data
				break

			case FieldElement.embedShell:
				newField = new FieldEmbedShell(new PropsFieldCreate({ propRaw }))
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

			case FieldElement.tagDetails:
				newField = new FieldTagDetails(props)
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
				return new MethodResult({
					error: {
						file: FILENAME,
						function: 'DataObj.fieldsCreateItem',
						msg: `No case defined for field element: ${element}`
					}
				})
		}
		return new MethodResult(newField)
	}

	async fieldsInit(sm: State, dataObj: DataObj) {
		const props = new PropsFieldInit({ data: dataObj.data, dataObj, fields: dataObj.fields, sm })
		for (let i = 0; i < dataObj.fields.length; i++) {
			const field: Field = dataObj.fields[i]
			let result: MethodResult = await field.init(props)
			if (result.error) return result
		}
		return new MethodResult()
	}

	getField(fieldNameRaw: string) {
		const field = this.fields.find((f) => f.colDO.propNameRaw === fieldNameRaw)
		if (field) {
			return field
		} else {
			error(500, {
				file: FILENAME,
				function: 'DataObj.getField',
				msg: `Field ${fieldNameRaw} not found.`
			})
		}
	}

	print() {
		alert('Print functionality for this object has not yet been implemented.')
	}

	setTreeLevelIdx(idx: number) {
		this.treeLevelIdx = idx
	}
}

export class DataObjAction {
	action: UserAction
	fieldColor: FieldColor
	isListRowAction: boolean
	constructor(rawAction: RawDataObjAction) {
		const clazz = 'DataObjAction'
		this.action = new UserAction(rawAction.action)
		this.fieldColor = new FieldColor(rawAction.codeColor, 'blue')
		this.isListRowAction = rawAction.isListRowAction
	}
}

export class DataObjActionProxy {
	action: CodeAction
	proxy: Function
	constructor(action: CodeAction, proxy: Function) {
		this.action = action
		this.proxy = proxy
	}
}

export enum DataObjCardinality {
	list = 'list',
	detail = 'detail'
}

export class DataObjData {
	cardinality?: DataObjCardinality
	fields: FieldEmbed[] = []
	itemsFields: DataRecord = {}
	itemsSelect: DataRecord[] = []
	parms: ParmsValues = new ParmsValues()
	rawDataObj?: RawDataObj
	rowsRetrieved: DataRows = new DataRows()
	rowsSave: DataRows = new DataRows()
	constructor(rawDataObj?: RawDataObj) {
		const clazz = 'DataObjData'
		if (rawDataObj) {
			this.cardinality = memberOfEnum(
				rawDataObj.codeCardinality,
				clazz,
				'cardinality',
				'DataObjCardinality',
				DataObjCardinality
			)
			this.rawDataObj = rawDataObj
		}
	}
	getFieldEmbedData(field: FieldEmbed | undefined, evalExprContext: string): DataObjData {
		if (!field) return this
		const embedData = this.getFieldEmbedDataExe(field, this.fields, evalExprContext)
		if (embedData) {
			return embedData
		} else {
			error(500, {
				file: FILENAME,
				function: 'dataObjData.getFieldEmbedData',
				msg: `Could not find field embed data for field: ${field.colDO.propNameRaw} in context: ${evalExprContext}`
			})
		}
	}

	private getFieldEmbedDataExe(
		field: FieldEmbed,
		fields: FieldEmbed[],
		evalExprContext: string
	): DataObjData | undefined {
		for (let i = 0; i < fields.length; i++) {
			let fieldCurrent = fields[i]
			if (fieldCurrent.colDO.id === field.colDO.id) return fieldCurrent.data
			const newData = this.getFieldEmbedDataExe(field, fieldCurrent.data.fields, evalExprContext)
			if (newData) return newData
		}
	}

	getFieldEmbedFields(field: FieldEmbed | undefined, evalExprContext: string): FieldEmbed[] {
		if (!field) return this.fields
		const dataField = this.getFieldEmbedDataExe(field, this.fields, evalExprContext)
		return dataField ? dataField.fields : []
	}

	getParms() {
		return this.parms.valueGetAll()
	}

	static load(source: DataObjData): MethodResult {
		if (source.rawDataObj) RawDataObj.initTableGroup(source.rawDataObj)
		const data = new DataObjData(source.rawDataObj)

		let result: MethodResult = FieldEmbed.initFieldsLoad(source.fields, data)
		if (result.error) return result
		data.fields = result.data

		data.itemsFields = { ...source.itemsFields }
		data.itemsSelect = source.itemsSelect
		data.parms = ParmsValues.load(source.parms)
		data.rowsRetrieved = DataRows.load(source.rowsRetrieved)
		data.rowsSave = DataRows.load(source.rowsSave)
		return new MethodResult(data)
	}

	reset() {
		this.rowsRetrieved.reset()
		this.fields.forEach((f) => {
			f.data.rowsRetrieved.reset()
		})
	}
	static reset(data: DataObjData) {
		data.rowsRetrieved.reset()
		data.fields.forEach((f) => {
			DataObjData.reset(f.data)
		})
	}

	setValue(key: string, value: any) {
		switch (key) {
			case DataObjDataPropName.itemsField:
				this.itemsFields = value
				break

			case DataObjDataPropName.itemsSelect:
				this.itemsSelect = value
				break

			case DataObjDataPropName.rawDataObj:
				this.rawDataObj = value
				break

			case DataObjDataPropName.rowsRetrieved:
				this.rowsRetrieved.addRows(value.dataRows)
				break

			default:
				error(500, {
					file: FILENAME,
					function: 'DataObjData.setValue',
					msg: `No case defined for DataObjDataPropName: ${key}`
				})
		}
	}
}

export enum DataObjDataPropName {
	itemsField = 'itemsField',
	itemsSelect = 'itemsSelect',
	rawDataObj = 'rawDataObj',
	rowsRetrieved = 'rowsRetrieved'
}

export enum DataObjListEditPresetType {
	insert = 'insert',
	insertSave = 'insertSave'
}

export enum DataObjProcessType {
	reportRender = 'reportRender'
}

export enum DataObjSaveMode {
	any = 'any',
	insert = 'insert',
	update = 'update'
}

export class DataObjSort {
	sortItems: DataObjSortItem[] = []
	constructor() {}
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

export enum DataObjType {
	doDefault = 'doDefault',
	doEmbed = 'doEmbed'
}

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
		return getDataRecordValueKey(this.record, key)
	}
	setValue(key: string, value: any) {
		return setDataRecordValue(this.record, key, value)
	}
}

export class DataRows {
	dataRows: DataRow[] = []
	constructor() {}
	add(newRow: DataRow) {
		this.dataRows.push(newRow)
	}
	addRows(dataRows: DataRow[]) {
		this.dataRows = this.dataRows.concat(dataRows)
	}
	getDetailRecordValue(key: string) {
		return this.getRowValue(0, key)
	}
	getDetailRow() {
		if (this.dataRows.length === 1) return this.dataRows[0]
		error(500, {
			file: FILENAME,
			function: 'DataRows.getDetailRow',
			msg: `No detail row available.`
		})
	}
	getDetailRowStatus() {
		return this.getRowStatus(0)
	}
	getDetailRowStatusIs(status: DataRecordStatus) {
		return status === this.getRowStatus(0)
	}
	getRowById(id: string) {
		return this.dataRows.findIndex((dr) => dr.record.id === id)
	}
	getRowValue(row: number, key: string) {
		if (row < 0 || this.dataRows.length <= row) return undefined
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
				msg: `Cannot find row for recordId: ${id}`
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
	setDetailRecord(record: DataRecord) {
		if (this.dataRows.length > 0) this.dataRows[0].record = record
	}
	setDetailRecordStatus(status: DataRecordStatus) {
		if (this.dataRows) {
			this.dataRows[0].status = status
		} else {
			error(500, {
				file: FILENAME,
				function: 'dataObjData.setDetailRecordStatus',
				msg: `No detail record available.`
			})
		}
	}
	setDetailRecordValue(key: string, value: any) {
		this.setRecordValue(0, key, value)
	}
	setDetailDataRow(dataRow: DataRow) {
		if (this.dataRows.length > 0) this.dataRows[0] = dataRow
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
