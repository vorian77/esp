import { State } from '$comps/app/types.appState.svelte'
import {
	arrayOfClass,
	booleanRequired,
	CodeAction,
	CodeActionClass,
	CodeActionType,
	getArray,
	memberOfEnum,
	memberOfEnumIfExists,
	memberOfEnumOrDefault,
	required,
	ResponseBody,
	strRequired,
	ToastType,
	UserPrefType,
	valueOrDefault
} from '$utils/types'
import { apiFetch, ApiFunction } from '$routes/api/api'
import {
	RawDataObj,
	RawDataObjAction,
	RawDataObjPropDisplay,
	RawDataObjPropDisplayItemChange,
	RawDataObjQueryRider,
	RawDataObjTable
} from '$comps/dataObj/types.rawDataObj.svelte'
import { UserAction } from '$comps/other/types.userAction.svelte'
import {
	Field,
	FieldAccess,
	FieldColor,
	FieldColumnItem,
	FieldElement,
	PropsFieldInit,
	PropsFieldCreate,
	FieldItemChange
} from '$comps/form/field.svelte'
import {
	FieldEmbed,
	FieldEmbedListConfig,
	FieldEmbedListEdit,
	FieldEmbedListSelect
} from '$comps/form/fieldEmbed'
import { FieldCheckbox } from '$comps/form/fieldCheckbox'
import { FieldChips } from '$comps/form/fieldChips'
import { FieldEmbedShell } from '$comps/form/fieldEmbedShell'
import {
	FieldCustomActionButton,
	FieldCustomActionLink,
	FieldCustomHeader,
	FieldCustomHTML,
	FieldCustomText
} from '$comps/form/fieldCustom'
import { GridSettings } from '$comps/grid/grid'
import { FieldInput } from '$comps/form/fieldInput'
import { FieldFile } from '$comps/form/fieldFile'
import { FieldParm } from '$comps/form/fieldParm'
import { FieldRadio } from '$comps/form/fieldRadio'
import { FieldTagDetails, FieldTagRow, FieldTagSection } from '$comps/form/fieldTag'
import { FieldSelect } from '$comps/form/fieldSelect'
import { FieldTextarea } from '$comps/form/fieldTextarea'
import { FieldToggle } from '$comps/form/fieldToggle'
import {
	TokenApiQueryDataTree,
	TokenApiQueryType,
	TokenApiUserPref,
	TokenAppStateTriggerAction
} from '$utils/types.token'
import { PropSortDir } from '$comps/dataObj/types.rawDataObj.svelte'
import { qrfFileStorage } from '$enhance/queryRiderFunctions/qrfFileStorage'
import { qrfUserUpdate } from '$enhance/queryRiderFunctions/qrfUserUpdate'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/dataObj/types.dataObj.svelte.ts'

export type DataItems = Record<string, { data: string; display: string }[]>

export class DataObj {
	actionsFieldListRowActionIdx: number = -1
	data: DataObjData = $state(new DataObjData())
	dataItems: DataItems = {}
	embedField?: FieldEmbed
	fCallbackUserAction?: Function
	fields: Field[] = []
	isMobileMode: boolean = false
	queryRiders: DataObjQueryRiders
	raw: RawDataObj
	rootTable?: DBTable
	saveMode: DataObjSaveMode = DataObjSaveMode.any
	treeLevelIdx: number = 0
	userActions: DataObjAction[] = $state([])
	userGridSettings: GridSettings
	constructor(data: DataObjData) {
		const clazz = 'DataObj'
		this.data = data
		this.raw = required(data.rawDataObj, clazz, 'rawDataObj')

		/* dependent properties */
		this.queryRiders = new DataObjQueryRiders(this.raw.queryRiders)
		this.rootTable =
			this.raw.tables && this.raw.tables.length > 0
				? new DBTable(this.raw.tables[0].table)
				: undefined
		this.userGridSettings = new GridSettings(this.raw.id)
	}

	actionsFieldTrigger(sm: State, codeAction: CodeAction) {
		const doa = this.userActions.find(
			(f) => f.action.codeAction.actionType === codeAction.actionType
		)
		if (doa) {
			doa.action.trigger(sm, this)
		} else {
			error(500, {
				file: FILENAME,
				function: 'DataObj.actionsFieldTrigger',
				message: `Could not find user action for codeAction: class: ${codeAction.actionClass} - type: ${codeAction.actionType}.`
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
	) {
		const clazz = 'DataObj.init'
		const dataObj = new DataObj(data)
		dataObj.data = data
		dataObj.userGridSettings = await initPrefs(sm, dataObj)

		dataObj.fields = await dataObj.fieldsCreate(sm, dataObj, queryType)
		await dataObj.fieldsInit(sm, dataObj)

		const rawDataObj = required(data.rawDataObj, clazz, 'rawDataObj')
		initActionsField()

		initItemChangedTriggers(dataObj.fields)
		initRetrieveReadonly(dataObj, queryType)

		return dataObj

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
		async function initPrefs(sm: State, dataObj: DataObj) {
			let rawSettings = {}
			if (sm?.user?.prefIsActive(UserPrefType.remember_list_settings)) {
				// attempt to retrieve user preferences from DB
				const token = new TokenApiUserPref(sm.user.id, dataObj.raw.id)
				const result: ResponseBody = await apiFetch(ApiFunction.sysUserPrefGet, token)
				rawSettings =
					Object.hasOwn(result, 'data') && Object.hasOwn(result.data, 'data')
						? JSON.parse(result.data.data).data
						: {}
			}
			return dataObj.userGridSettings.load(rawSettings, sm, dataObj)
		}

		function initRetrieveReadonly(dataObj: DataObj, queryType: TokenApiQueryType) {
			if (
				dataObj.raw.isRetrieveReadonly &&
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

	async fieldsCreate(sm: State, dataObj: DataObj, queryType: TokenApiQueryType) {
		const clazz = 'DataObj.fieldsCreate'
		const rawDataObj = required(dataObj.data.rawDataObj, clazz, 'rawDataObj')
		const rawPropsDisplay = rawDataObj.rawPropsDisplay
		let fields: Field[] = []

		// create fields
		for (let i = 0; i < rawPropsDisplay.length; i++) {
			const p: RawDataObjPropDisplay = rawPropsDisplay[i]
			if (!(queryType === TokenApiQueryType.preset && p.fieldEmbed)) {
				fields.push(await DataObj.fieldsCreateItem(sm, dataObj, p, fields))
			}
		}
		return fields
	}

	static async fieldsCreateItem(
		sm: State,
		dataObj: DataObj,
		propRaw: RawDataObjPropDisplay,
		fields: Field[]
	) {
		let newField: Field

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
				newField = new FieldInput(new PropsFieldCreate({ propRaw, fields }))
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

			case FieldElement.customText:
				newField = new FieldCustomText(props)
				break

			case FieldElement.embedListConfig:
				newField = await FieldEmbed.initFieldClient(sm, props, dataObj, FieldEmbedListConfig)

				break

			case FieldElement.embedListEdit:
				newField = await FieldEmbed.initFieldClient(sm, props, dataObj, FieldEmbedListEdit)
				break

			case FieldElement.embedListSelect:
				newField = await FieldEmbed.initFieldClient(sm, props, dataObj, FieldEmbedListSelect)
				break

			case FieldElement.embedShell:
				newField = new FieldEmbedShell(new PropsFieldCreate({ propRaw, dataObj }))
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
				error(500, {
					file: FILENAME,
					function: 'initFields',
					message: `No case defined for field element: ${element}`
				})
		}
		return newField
	}

	async fieldsInit(sm: State, dataObj: DataObj) {
		const props = new PropsFieldInit({ dataObj, sm })
		for (let i = 0; i < dataObj.fields.length; i++) {
			const field: Field = dataObj.fields[i]
			await field.init(props)
		}
	}

	print() {
		alert('Print functionality for this object has not yet been implemented.')
	}
	setCallbackUserAction(fCallback: Function) {
		this.fCallbackUserAction = fCallback
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
export enum DataObjComponent {
	Home = 'Home',
	FormList = 'FormList',
	FormDetail = 'FormDetail',
	FormDetailRepConfig = 'FormDetailRepConfig',
	ProcessStatus = 'ProcessStatus',
	Tree = 'Tree'
}

export class DataObjData {
	cardinality?: DataObjCardinality
	fields: FieldEmbed[] = []
	items: DataRecord = {}
	parms: ParmsValues = new ParmsValues()
	rawDataObj?: RawDataObj
	rowsRetrieved: DataRows = new DataRows()
	rowsSave: DataRows = new DataRows()
	constructor(rawDataObj?: RawDataObj) {
		const clazz = 'DataObjData'
		if (rawDataObj) this.init(rawDataObj)
	}

	getItemDisplayValue(items: FieldColumnItem[], ids: any) {
		let display = ''
		if (!Array.isArray(ids)) ids = [ids]
		ids.forEach((id: string) => {
			const item = items.find((i: FieldColumnItem) => i.id === id)
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
		data.fields = FieldEmbed.initFieldsLoad(source.fields, data)
		data.items = { ...source.items }
		data.parms = ParmsValues.load(source.parms)
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
		return this.parms.valueGetAll()
	}
	resetRowsRetrieved() {
		this.rowsRetrieved.reset()
		this.fields.forEach((f) => {
			f.data.resetRowsRetrieved()
		})
	}
}

export enum DataObjListEditPresetType {
	insert = 'insert',
	save = 'save'
}

export enum DataObjProcessType {
	reportRender = 'reportRender'
}

export class DataObjQueryRiders {
	riders: DataObjQueryRider[]
	constructor(rawQueryRiders: RawDataObjQueryRider[]) {
		this.riders = arrayOfClass(DataObjQueryRider, rawQueryRiders)
	}
	async execute(
		queryTiming: DataObjQueryRiderTriggerTiming,
		queryType: TokenApiQueryType,
		sm: State,
		dataQuery: DataObjData
	) {
		for (let i = 0; i < this.riders.length; i++) {
			const rider = this.riders[i]
			if (rider.codeQueryType === queryType && rider.codeTriggerTiming === queryTiming) {
				switch (rider.codeType) {
					case DataObjQueryRiderType.appDestination:
						await rider.executeDestination(sm)
						break

					case DataObjQueryRiderType.customFunction:
						dataQuery = await rider.executeFunction(sm, dataQuery)
						break

					case DataObjQueryRiderType.databaseExpression:
						// executed on server
						break

					case DataObjQueryRiderType.userMessage:
						rider.executeMsg(sm)
						break

					default:
						error(500, {
							file: FILENAME,
							function: 'DataObjQueryRiders.execute',
							message: `No case defined for rider.codeType: ${rider.codeType}`
						})
				}
			}
		}
		return dataQuery
	}
}

export class DataObjQueryRider {
	codeFunction?: DataObjQueryRiderFunction
	codeQueryType: TokenApiQueryType
	codeTriggerTiming: DataObjQueryRiderTriggerTiming
	codeType: DataObjQueryRiderType
	codeUserDestination?: DataObjQueryRiderDestination
	codeUserMsgDelivery?: DataObjQueryRiderMsgDelivery
	expr?: string
	funct?: Function
	functionParmValue?: string
	userMsg?: string
	constructor(obj: RawDataObjQueryRider) {
		const clazz = 'DataObjQueryRider'
		obj = valueOrDefault(obj, {})
		this.codeFunction = memberOfEnumIfExists(
			obj._codeFunction,
			'codeFunction',
			clazz,
			'DataObjQueryRiderFunction',
			DataObjQueryRiderFunction
		)
		this.codeQueryType = memberOfEnum(
			obj._codeQueryType,
			clazz,
			'codeQueryType',
			'TokenApiQueryType',
			TokenApiQueryType
		)
		this.codeTriggerTiming = memberOfEnum(
			obj._codeTriggerTiming,
			clazz,
			'codeTriggerTiming',
			'DataObjQueryRiderTriggerTiming',
			DataObjQueryRiderTriggerTiming
		)
		this.codeType = memberOfEnum(
			obj._codeType,
			clazz,
			'codeType',
			'DataObjQueryRiderType',
			DataObjQueryRiderType
		)
		this.codeUserDestination = memberOfEnumIfExists(
			obj._codeUserDestination,
			'codeUserDestination',
			clazz,
			'DataObjQueryRiderDestination',
			DataObjQueryRiderDestination
		)
		this.codeUserMsgDelivery = memberOfEnumIfExists(
			obj._codeUserMsgDelivery,
			'codeUserMsgDelivery',
			clazz,
			'DataObjQueryRiderMsgDelivery',
			DataObjQueryRiderMsgDelivery
		)
		this.expr = obj.expr
		this.funct = this.getFunction(this.codeFunction)
		this.functionParmValue = obj.functionParmValue
		this.userMsg = obj.userMsg
	}

	async executeDestination(sm: State) {
		if (this.codeUserDestination) {
			switch (this.codeUserDestination) {
				case DataObjQueryRiderDestination.back:
					await sm.triggerAction(
						new TokenAppStateTriggerAction({
							codeAction: CodeAction.init(
								CodeActionClass.ct_sys_code_action_class_nav,
								CodeActionType.navBack
							)
						})
					)
					break
				case DataObjQueryRiderDestination.home:
					await sm.triggerAction(
						new TokenAppStateTriggerAction({
							codeAction: CodeAction.init(
								CodeActionClass.ct_sys_code_action_class_nav,
								CodeActionType.navHome
							)
						})
					)
					break
				default:
					error(500, {
						file: FILENAME,
						function: 'DataObjQueryRider.executeDestination',
						message: `No case defined for rider.codeUserDestination: ${this.codeUserDestination}`
					})
			}
		}
	}

	async executeExpr(sm: State, dataTab: DataObjData, dataTree: TokenApiQueryDataTree) {
		if (this.expr) {
			await sm.triggerAction(
				new TokenAppStateTriggerAction({
					codeAction: CodeAction.init(
						CodeActionClass.ct_sys_code_action_class_utils,
						CodeActionType.dbexpression
					),
					data: {
						value: {
							expr: this.expr,
							dataTab,
							dataTree
						}
					}
				})
			)
		}
	}

	async executeFunction(sm: State, dataQuery: DataObjData) {
		return this.funct ? await this.funct(sm, this, dataQuery) : dataQuery
	}

	executeMsg(sm: State) {
		if (this.userMsg && this.codeUserMsgDelivery) {
			switch (this.codeUserMsgDelivery) {
				case DataObjQueryRiderMsgDelivery.alert:
					alert(this.userMsg)
					break
				case DataObjQueryRiderMsgDelivery.toast:
					sm.openToast(ToastType.success, this.userMsg)
					break
				default:
					error(500, {
						file: FILENAME,
						function: 'DataObjQueryRider.executeMsg',
						message: `No case defined for rider.codeUserMsgDelivery: ${this.codeUserMsgDelivery}`
					})
			}
		}
	}

	getFunction(codeFunction: DataObjQueryRiderFunction | undefined) {
		if (!codeFunction) return undefined
		switch (codeFunction) {
			case DataObjQueryRiderFunction.qrfFileStorage:
				return qrfFileStorage

			case DataObjQueryRiderFunction.qrfUserUpdate:
				return qrfUserUpdate

			default:
				error(500, {
					file: FILENAME,
					function: 'DataObjQueryRider.getFunction',
					message: `No case defined for codeFunction: ${codeFunction}`
				})
		}
	}
}

export enum DataObjQueryRiderDestination {
	back = 'back',
	home = 'home'
}
export enum DataObjQueryRiderFunction {
	qrfFileStorage = 'qrfFileStorage',
	qrfUserUpdate = 'qrfUserUpdate'
}
export enum DataObjQueryRiderMsgDelivery {
	alert = 'alert',
	toast = 'toast'
}
export enum DataObjQueryRiderTriggerTiming {
	post = 'post',
	pre = 'pre'
}
export enum DataObjQueryRiderType {
	appDestination = 'appDestination',
	customFunction = 'customFunction',
	databaseExpression = 'databaseExpression',
	userMessage = 'userMessage'
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

export class DataObjTable {
	columnParent?: string
	columnsId: string[]
	exprFilterUpdate?: string
	index: number
	indexParent?: number
	indexesChildren: number[] = []
	isTableExtension: boolean
	isRoot: boolean
	parentObjTable?: DataObjTable
	script: string = ''
	table: DBTable
	traversalFromRoot: string
	constructor(obj: RawDataObjTable, tables: DataObjTable[]) {
		const clazz = 'DataObjTable'
		obj = valueOrDefault(obj, {})
		this.columnParent = obj._columnParent
		this.columnsId = getArray(obj._columnsId)
		this.exprFilterUpdate = obj.exprFilterUpdate
		this.index = required(obj.index, clazz, 'index')
		this.indexParent = obj.indexParent
		this.isRoot = this.index === 0
		this.isTableExtension = obj.isTableExtension
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
	setChildren(tables: DataObjTable[]) {
		this.indexesChildren = tables
			.filter((table) => table.indexParent === this.index)
			.map((t) => t.index)
	}
}

export enum DataObjType {
	default = 'default',
	embed = 'embed',
	report = 'report',
	taskPage = 'taskPage',
	taskTarget = 'taskTarget'
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
		return setRecordValue(this.record, key, value)
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
			message: `No detail row available.`
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
				message: `No detail record available.`
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

export function getRecordKey(record: DataRecord, key: string) {
	for (const [k, v] of Object.entries(record)) {
		if (k.endsWith(key)) return k
	}
	return undefined
}

export function getRecordValue(record: DataRecord, key: string) {
	const recordKey = getRecordKey(record, key)
	return recordKey ? record[recordKey] : undefined
}

export function setRecordValue(record: DataRecord, key: string, value: any) {
	const recordKey = getRecordKey(record, key)
	if (recordKey) record[recordKey] = value
	return recordKey
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
	hasOwn(key: string) {
		return Object.hasOwn(this.data, key)
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
	columnDefs = 'columnDefs',
	customProgramOwnerId = 'customProgramOwnerId',
	dbExpr = 'dbExpr',
	embedFieldName = 'embedFieldName',
	embedListSave = 'embedListSave',
	fieldListItems = 'fieldListItems',
	isMultiSelect = 'isMultiSelect',
	itemsParmValue = 'itemsParmValue',
	listIds = 'listIds',
	listIdsSelected = 'listIdsSelected',
	listRecordIdCurrent = 'listRecordIdCurrent',
	listSortModel = 'listSortModel',
	parentRecordId = 'parentRecordId',
	propLinkItemsSourceRaw = 'propLinkItemsSource',
	propLinkItemsValueCurrent = 'propLinkItemsValueCurrent',
	rowData = 'rowData',
	selectLabel = 'selectLabel'
}
