import { State } from '$comps/app/types.state.svelte'
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
	FieldItemChangeManager,
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
	FieldEmbedDetailEligibility,
	FieldEmbedList,
	FieldEmbedListConfig,
	FieldEmbedListEdit,
	FieldEmbedListSelect,
	FieldEmbedShell
} from '$comps/form/fieldEmbed.svelte'
import { FieldFile } from '$comps/form/fieldFile'
import { FieldInput } from '$comps/form/fieldInput'
import { FieldParm } from '$comps/form/fieldParm'
import { FieldRadio } from '$comps/form/fieldRadio'
import { FieldSelect, FieldSelectOwner } from '$comps/form/fieldSelect'
import { FieldTagDetails, FieldTagRow, FieldTagSection } from '$comps/form/fieldTag'
import { FieldTextarea } from '$comps/form/fieldTextarea'
import { FieldToggle } from '$comps/form/fieldToggle'
import { UserAction } from '$comps/other/types.userAction.svelte'
import {
	CodeAction,
	type DataRecord,
	getArray,
	memberOfEnum,
	memberOfEnumOrDefault,
	MethodResult,
	ParmsValues,
	ParmsValuesFormList,
	type ParmsValuesFormListType,
	ParmsValuesType,
	recordValueGet,
	recordValueGetDisplay,
	required,
	recordValueSet,
	strRequired
} from '$utils/types'
import { TokenApiQueryType } from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/dataObj/types.dataObj.svelte.ts'

export type DataItems = Record<string, { data: string; display: string }[]>

export class DataObj {
	actionsFieldListRowActionIdx: number = -1
	data: DataObjData = $state(new DataObjData())
	dataItems: DataItems = {}
	embedField?: FieldEmbedList
	fields: Field[] = []
	isDetailPreset: boolean = false
	itemChangeManager: FieldItemChangeManager = $state(new FieldItemChangeManager())
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

	embedFieldSet(field: FieldEmbedList) {
		this.embedField = field
	}

	async gridDownload(sm: State) {
		let data: string = ''
		let fields: Field[] = []
		let newRow: string = ''

		// get headers
		this.fields.forEach((f) => {
			if (f.colDO.propName === 'id') return
			fields.push(f)
			const label = f.colDO.headerAlt ? f.colDO.headerAlt : f.colDO.label
			newRow += `${label},`
		})
		if (fields.length === 0) {
			alert('Download cancelled. No data to export.')
			return
		}
		data += `${newRow}\n`

		// get data
		const rowsRetrieved: DataRows = this.data.rowsRetrieved
		if (rowsRetrieved.dataRows.length === 0) {
			alert('Download cancelled. No data to export.')
			return
		}
		rowsRetrieved.dataRows.forEach((dataRow) => {
			const record = dataRow.record
			newRow = ''
			fields.forEach((f) => {
				newRow += `${recordValueGetDisplay(record, f.getValueKey())},`
			})
			data += `${newRow}\n`
		})

		sm.downloadContent(`${this.raw.header}.csv`, 'text/csv', data)
	}

	static async fieldsCreate(
		sm: State,
		dataObj: DataObj,
		queryType: TokenApiQueryType
	): Promise<MethodResult> {
		const clazz = 'DataObj.fieldsCreate'
		let fields: Field[] = []

		const propsFieldInit = new PropsFieldInit({
			data: dataObj.data,
			fields: dataObj.fields,
			sm
		})
		const rawDataObj = required(propsFieldInit.data.rawDataObj, clazz, 'rawDataObj')
		const rawPropsDisplay = rawDataObj.rawPropsDisplay

		// create fields
		for (let i = 0; i < rawPropsDisplay.length; i++) {
			const p: RawDataObjPropDisplay = rawPropsDisplay[i]
			if (!(queryType === TokenApiQueryType.preset && p.fieldEmbedListType)) {
				// init base
				let result: MethodResult = DataObj.fieldsCreateItem(propsFieldInit, p)
				if (result.error) return result
				const field: Field = result.data

				// init async
				result = await field.initAsync(propsFieldInit)
				if (result.error) return result

				fields.push(field)
			}
		}
		return new MethodResult(fields)
	}

	static fieldsCreateItem(propsFieldInit: PropsFieldInit, propRaw: RawDataObjPropDisplay) {
		const clazz = 'DataObj.fieldsCreateItem'
		let newField: Field
		let parentDataObjId: string

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

			case FieldElement.embedDetailEligibility:
				newField = new FieldEmbedDetailEligibility(propsFieldInit, propRaw, props)
				break

			case FieldElement.embedListConfig:
				parentDataObjId = strRequired(propsFieldInit.data.rawDataObj?.id, clazz, 'dataObjId')
				newField = new FieldEmbedListConfig(parentDataObjId, propRaw, propsFieldInit.data)
				break

			case FieldElement.embedListEdit:
				parentDataObjId = strRequired(propsFieldInit.data.rawDataObj?.id, clazz, 'dataObjId')
				newField = new FieldEmbedListEdit(parentDataObjId, propRaw, propsFieldInit.data)
				break

			case FieldElement.embedListSelect:
				parentDataObjId = strRequired(propsFieldInit.data.rawDataObj?.id, clazz, 'dataObjId')
				newField = new FieldEmbedListSelect(parentDataObjId, propRaw, propsFieldInit.data)
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

			case FieldElement.selectOwnerOrg:
			case FieldElement.selectOwnerSys:
				newField = new FieldSelectOwner(props)
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

	static async fieldsCreateItemAsync(
		propsFieldInit: PropsFieldInit,
		propRaw: RawDataObjPropDisplay
	) {
		let result: MethodResult = DataObj.fieldsCreateItem(propsFieldInit, propRaw)
		if (result.error) return result
		const field: Field = result.data

		result = await field.initAsync(propsFieldInit)
		if (result.error) return result
		return new MethodResult(field)
	}

	getField(fieldNameRaw: string) {
		const field = this.fields.find((f) => f.colDO.propName === fieldNameRaw)
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

	initSortModel(rawPropsSort: RawDataObjPropDB[]) {
		const newSort = new DataObjSort()
		rawPropsSort.forEach((item, i) => {
			newSort.addItem(item.id, item.codeSortDir, i)
		})
		return newSort
	}

	static async load(
		sm: State,
		data: DataObjData,
		queryType: TokenApiQueryType = TokenApiQueryType.retrieve
	): Promise<MethodResult> {
		const clazz = 'DataObj.load'
		const rawDataObj = required(data.rawDataObj, clazz, 'rawDataObj')
		const dataObj = new DataObj(data)
		dataObj.data = data

		let result: MethodResult = await DataObj.fieldsCreate(sm, dataObj, queryType)
		if (result.error) return result
		dataObj.fields = result.data

		loadActionsField()
		DataObj.loadItemChangedTriggers(dataObj.fields)
		loadRetrieveReadonly(dataObj, queryType)

		return new MethodResult(dataObj)

		function loadActionsField() {
			dataObj.userActions = rawDataObj.rawActions.map((rawAction: RawDataObjAction) => {
				return new DataObjAction(rawAction)
			})
			dataObj.actionsFieldListRowActionIdx = dataObj.userActions.findIndex((f) => f.isListRowAction)
		}

		function loadRetrieveReadonly(dataObj: DataObj, queryType: TokenApiQueryType) {
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

	static loadItemChangedTriggers(fields: Field[]) {
		fields.forEach((field) => {
			field.colDO.itemChanges.forEach((target: RawDataObjPropDisplayItemChange) => {
				field.itemChanges.push(new FieldItemChange(target, fields))
			})
		})
	}

	parmsFormList(): any {
		return this.data ? this.data.parmsFormList : undefined
	}

	parmsFormListInit(parms: ParmsValuesFormListType) {
		if (this.data) this.data.parmsFormList = new ParmsValuesFormList(parms)
	}

	parmsFormListGet(parm: ParmsValuesType): any {
		return this.data ? this.data.parmsFormList.valueGet(parm) : undefined
	}

	parmsFormListSet(parm: ParmsValuesType, value: any) {
		this?.data.parmsFormList?.valueSet(parm, value)
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
	fields: FieldEmbedList[] = []
	itemsFields: DataRecord = {}
	itemsSelect: DataRecord[] = []
	parms: ParmsValues = new ParmsValues()
	parmsFormList: ParmsValues = new ParmsValues()
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
	getFieldEmbedData(field: FieldEmbedList | undefined): DataObjData {
		return field ? field.embedData : this
	}

	getFieldEmbedFields(field: FieldEmbedList | undefined): FieldEmbedList[] {
		const getData = (field: FieldEmbedList, fields: FieldEmbedList[]): DataObjData | undefined => {
			for (let i = 0; i < fields.length; i++) {
				let fieldCurrent = fields[i]
				if (fieldCurrent.colDO.id === field.colDO.id) return fieldCurrent.embedData
				const newData = getData(field, fieldCurrent.embedData.fields)
				if (newData) return newData
			}
		}

		if (!field) return this.fields
		const dataField = getData(field, this.fields)
		return dataField ? dataField.fields : []
	}

	getParms() {
		return this.parms.valueGetAll()
	}

	static load(source: DataObjData): MethodResult {
		if (source.rawDataObj) RawDataObj.initTableGroup(source.rawDataObj)
		const data = new DataObjData(source.rawDataObj)

		let result: MethodResult = FieldEmbedList.loadFields(source.fields, data)
		if (result.error) return result
		data.fields = result.data

		data.itemsFields = { ...source.itemsFields }
		data.itemsSelect = source.itemsSelect
		data.parms = ParmsValues.load(source.parms)
		data.parmsFormList = ParmsValuesFormList.load(source.parmsFormList)
		data.rowsRetrieved = DataRows.load(source.rowsRetrieved)
		data.rowsSave = DataRows.load(source.rowsSave)

		return new MethodResult(data)
	}

	reset() {
		this.rowsRetrieved.reset()
		this.fields.forEach((f) => {
			f.embedData.rowsRetrieved.reset()
		})
	}
	static reset(data: DataObjData) {
		data.rowsRetrieved.reset()
		data.fields.forEach((f) => {
			DataObjData.reset(f.embedData)
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
		return recordValueGet(this.record, key)
	}
	setValue(key: string, value: any) {
		this.record = recordValueSet(this.record, key, value)
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
	getRowsIds() {
		return this.getRows().map((row) => row.record.id)
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
