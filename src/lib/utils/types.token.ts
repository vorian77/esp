import {
	booleanOrFalse,
	booleanRequired,
	CodeAction,
	CodeActionType,
	DataObj,
	DataObjAttrsAccessEval,
	DataObjRenderPlatform,
	DataObjData,
	DataObjSort,
	type DataRecord,
	DataRow,
	memberOfEnum,
	MethodResult,
	MethodResultError,
	nbrRequired,
	ParmsValues,
	required,
	strRequired,
	User,
	valueOrDefault
} from '$utils/types'
import { QueryManagerSource, QuerySourceRaw, type RawDataList } from '$lib/query/types.query'
import { RawDataObj } from '$comps/dataObj/types.rawDataObj.svelte'
import { apiError, apiFetchFunction, ApiFunction } from '$routes/api/api'
import { UserActionConfirmContent } from '$comps/other/types.userAction.svelte'
import { State, StateParms, StateTriggerToken } from '$comps/app/types.appState.svelte'
import { App } from '$comps/app/types.app.svelte'
import { AppRowActionType } from '$comps/app/types.app.svelte'
import { Node } from '$comps/app/types.node'
import { FieldColumnItem } from '$comps/form/field.svelte'
import { type ColumnsDefsSelect } from '$comps/grid/grid'
import { Process } from '$utils/utils.process'
import { error } from '@sveltejs/kit'

const FILENAME = '$comps/types.token.ts'

export class Token {
	constructor() {}
}

export class TokenApi extends Token {
	constructor() {
		super()
	}
}

export enum TokenApiBlobAction {
	delete = 'delete',
	list = 'list',
	none = 'none',
	upload = 'upload'
}

export class TokenApiError extends TokenApi {
	error: MethodResultError
	constructor(obj: any) {
		const clazz = 'TokenApiError'
		super()
		this.error = new MethodResultError(obj)
	}
}

export enum TokenApiFetchMethod {
	get = 'GET',
	post = 'POST'
}

export class TokenApiFileParmDelete extends TokenApi {
	urlOld: string
	constructor(obj: any) {
		super()
		const clazz = 'TokenApiFileParmDelete'
		obj = valueOrDefault(obj, {})
		this.urlOld = strRequired(obj.urlOld, clazz, 'oldUrl')
	}
}
export class TokenApiBlobParmUpload {
	file: File
	fileType: TokenApiBlobType
	key: string
	urlOld?: string
	constructor(obj: any) {
		const clazz = 'TokenApiBlobParmUpload'
		obj = valueOrDefault(obj, {})
		this.file = required(obj.file, clazz, 'file')
		this.fileType = memberOfEnum(
			obj.fileType,
			clazz,
			'fileType',
			'TokenApiFileType',
			TokenApiBlobType
		)
		this.key = strRequired(obj.key, clazz, 'key')
		this.urlOld = obj.urlOld
	}
}

export enum TokenApiBlobType {
	image = 'image',
	pdf = 'pdf'
}

export class TokenApiDataObjId extends TokenApi {
	dataObjName: string
	constructor(dataObjName: string) {
		const clazz = 'TokenApiDataObjId'
		super()
		this.dataObjName = dataObjName
	}
}

export class TokenApiDbDataObjSource {
	replacements: DataRecord
	sources: DataRecord
	typesReplace = ['exprFilter', 'parent']
	typesSource = ['dataObjId', 'dataObjName', 'rawDataObj']
	constructor(obj: any) {
		const clazz = 'TokenApiDbDataObjSource'
		this.replacements = valueOrDefault(obj?.replacements, {})
		this.sources = valueOrDefault(obj?.sources, {})
		this.updateReplacements(obj)
		this.updateSources(obj)
		required(
			Object.entries(this.sources).length > 0,
			clazz,
			`Missing at least one source: ${this.typesSource}`
		)
	}
	updateReplacements(obj: any) {
		obj = valueOrDefault(obj, {})
		this.typesReplace.forEach((key: string) => {
			if (Object.hasOwn(obj, key)) {
				if (obj[key]) this.replacements[key] = obj[key]
			}
		})
		return this
	}
	updateSources(obj: any) {
		obj = valueOrDefault(obj, {})
		this.typesSource.forEach((key: string) => {
			if (Object.hasOwn(obj, key)) {
				if (obj[key]) this.sources[key] = obj[key]
			}
		})
		return this
	}
}

export class TokenApiDbTableColumns {
	tableModule: string
	tableName: string
	constructor(tableModule: string, tableName: string) {
		const clazz = 'TokenApiDbTableColumns'
		this.tableModule = tableModule
		this.tableName = tableName
	}
}

export class TokenApiId extends TokenApi {
	id: string
	constructor(id: string) {
		const clazz = 'TokenApiId'
		super()
		this.id = id
	}
}

export class TokenApiIds extends TokenApi {
	ids: string[]
	constructor(ids: string[]) {
		const clazz = 'TokenApiIds'
		super()
		this.ids = ids
	}
}

export class TokenApiQuery extends TokenApi {
	evalExprContext: string
	queryData: TokenApiQueryData
	queryManagerSource: QueryManagerSource = QueryManagerSource.gel
	querySourceRaw: QuerySourceRaw
	queryType: TokenApiQueryType
	constructor(obj: any) {
		const clazz = 'TokenApiQuery'
		super()
		obj = valueOrDefault(obj, {})
		this.evalExprContext = strRequired(obj.evalExprContext, clazz, 'evalExprContext')
		this.queryData = TokenApiQueryData.load(obj.queryData)
		this.querySourceRaw = new QuerySourceRaw(obj.querySourceRaw)
		this.queryType = required(obj.queryType, clazz, 'queryType')
	}
}

export class TokenApiQuerySource extends TokenApi {
	evalExprContext: string
	queryType: TokenApiQueryType
	sm: State
	sourceQueryData: DataRecord
	sourceQuerySource: DataRecord
	constructor(obj: any) {
		const clazz = 'TokenApiQuerySource'
		obj = valueOrDefault(obj, {})
		super()
		this.evalExprContext = strRequired(obj.evalExprContext, clazz, 'evalExprContext')
		this.queryType = required(obj.queryType, clazz, 'queryType')
		this.sm = required(obj.sm, clazz, 'sm')
		this.sourceQueryData = required(obj.sourceQueryData, clazz, 'sourceQueryData')
		this.sourceQuerySource = required(obj.sourceQuerySource, clazz, 'sourceQuerySource')
	}
}

export class TokenApiQueryData {
	attrAccessFilter: string = ''
	dataTab: DataObjData
	dataTree: TokenApiQueryDataTree
	dbExpr?: string
	rawDataList: RawDataList = []
	record: DataRecord
	system: DataRecord
	user: User
	constructor(data: any) {
		data = valueOrDefault(data, {})
		this.dataTab = this.dataSet(data, 'dataTab', new DataObjData())
		this.dataTree = this.dataSet(data, 'dataTree', [])
		this.dbExpr = this.dataSet(data, 'dbExpr', '')
		this.rawDataList = this.dataSet(data, 'rawDataList', [])
		this.record = this.dataSet(data, 'record', {})
		this.system = this.dataSet(data, 'system', {})
		this.user = this.dataSet(data, 'user', {})
	}
	static load(currData: TokenApiQueryData) {
		const newData = new TokenApiQueryData(currData)
		newData.attrAccessFilter = valueOrDefault(currData?.attrAccessFilter, '')
		let result: MethodResult = currData?.dataTab
			? DataObjData.load(currData.dataTab)
			: new MethodResult(new DataObjData())
		if (result.error) {
			error(500, {
				file: FILENAME,
				function: 'TokenApiQueryData.load',
				msg: `Invalid dataTab: ${currData.dataTab}`
			})
		}
		newData.dataTab = result.data as DataObjData
		newData.dataTree = new TokenApiQueryDataTree(currData.dataTree.levels)
		return newData
	}
	dataSet(data: any, key: string, defaultVal: any) {
		return data[key] === undefined ? defaultVal : data[key]
	}
	getParms() {
		return this.dataTab ? this.dataTab.getParms() : {}
	}
	async setAttrsAccess(rawDataObj: RawDataObj) {
		if (rawDataObj.attrsAccessGroup) {
			let attrAccessEval: DataObjAttrsAccessEval = rawDataObj.attrsAccessGroup.eval(this.user.attrs)
			if (attrAccessEval.permittedObjIds.length > 0) {
				this.setAttrsAccessFilter(
					attrAccessEval.isDenyAccess
						? '.id = <uuid>{}'
						: `.attrs.id IN (<uuid>{${attrAccessEval.permittedObjIds.reduce((filter, id) => {
								filter += filter ? ',' : ''
								filter += `"${id}"`
								return filter
							}, '')}})`
				)
			} else {
				if (
					rawDataObj?.rawQuerySource.exprWith &&
					rawDataObj?.rawQuerySource.exprWith?.indexOf('OR <attributeAccessFilter>') > -1
				) {
					this.setAttrsAccessFilter('')
				}
				if (
					rawDataObj?.rawQuerySource.exprWith &&
					rawDataObj?.rawQuerySource.exprWith?.indexOf('UNION <attributeAccessFilter>') > -1
				) {
					this.setAttrsAccessFilter('{}')
				}
			}
		} else {
			this.setAttrsAccessFilter('')
		}
	}
	setAttrsAccessFilter(filter: string) {
		this.attrAccessFilter = filter
	}

	updateTableData(table: string, dataRow: DataRow) {
		this.record = dataRow.record
		let idx = this.dataTree.levels.length - 1
		while (idx > -1) {
			if (this.dataTree.levels[idx].table === table) {
				this.dataTree.levels[idx].dataRow = dataRow
				idx = -1
			}
		}
	}
}
export class TokenApiQueryDataTree {
	levels: TokenApiQueryDataTreeLevel[] = []
	constructor(levels: TokenApiQueryDataTreeLevel[] = []) {
		this.levels = levels
	}

	addLevel(table: string, dataRow: DataRow) {
		this.levels.push(new TokenApiQueryDataTreeLevel(table, dataRow))
	}

	getDataRow(table: string | undefined = undefined) {
		const idx = table ? this.levels.findIndex((t) => t.table === table) : this.levels.length - 1
		return idx > -1 ? this.levels[idx].dataRow : undefined
	}

	getDataRowAncestor(ancestor: number) {
		const idx = this.levels.length - 1 - ancestor
		return idx > -1 ? this.levels[idx].dataRow : undefined
	}

	getValue(table: string | undefined, fieldName: string) {
		const dataRow = this.getDataRow(table)
		return fieldName && dataRow ? dataRow.getValue(fieldName) : undefined
	}

	setValue(table: string | undefined, fieldName: string, value: any) {
		const dataRow = this.getDataRow(table)
		if (fieldName && dataRow && Object.hasOwn(dataRow.record, fieldName)) {
			if (!dataRow.setValue(fieldName, value)) {
				error(500, {
					file: FILENAME,
					function: 'TokenApiQueryDataTree.setValue',
					msgSystem: `Field ${fieldName} not found in data tree - table: ${table}; record: ${JSON.stringify(
						dataRow?.record
					)}`,
					msgUser: `Field ${fieldName} not found in data tree - table: ${table}`
				})
			}
		}
	}

	setDataRow(level: number, dataRow: DataRow) {
		this.levels[level].dataRow = dataRow
	}
}

export class TokenApiQueryDataTreeLevel {
	dataRow: DataRow
	table: string
	constructor(table: string, dataRow: DataRow) {
		this.dataRow = dataRow
		this.table = table
	}
}

export enum TokenApiQueryType {
	autonomous = 'autonomous',
	none = 'none',
	preset = 'preset',
	retrieve = 'retrieve',
	save = 'save'
}

export class TokenApiSysSendText extends TokenApi {
	phoneMobile: string
	message: string
	constructor(phoneMobile: string, message: string) {
		super()
		this.phoneMobile = phoneMobile
		this.message = message
	}
}

export class TokenApiUserId extends TokenApi {
	userId: string
	constructor(userId: string) {
		super()
		this.userId = userId
	}
}

export class TokenApiUserName extends TokenApi {
	userName: string
	constructor(userName: string) {
		super()
		this.userName = userName
	}
}

export class TokenApiUserPref extends TokenApi {
	idFeature: string
	idUser: string
	prefData: any
	constructor(idUser: string, idFeature: string, prefData: any | undefined = undefined) {
		super()
		this.idFeature = idFeature
		this.idUser = idUser
		this.prefData = prefData
	}
}

export class TokenApp extends Token {
	constructor(obj: any) {
		const clazz = 'TokenApp'
		super()
	}
}

export class TokenAppDo extends TokenApp {
	actionType: CodeActionType
	dataObj: DataObj
	constructor(obj: any) {
		const clazz = 'TokenAppDo'
		super(obj)
		this.actionType = required(obj.actionType, clazz, 'actionType')
		this.dataObj = required(obj.dataObj, clazz, 'dataObj')
	}
}

export class TokenAppDoQuery extends TokenApp {
	dataObjId?: string
	dataObjName?: string
	queryType: TokenApiQueryType
	renderPlatform: DataObjRenderPlatform
	source: string
	constructor(obj: any) {
		const clazz = 'TokenAppDo'
		super(obj)
		this.dataObjId = obj.dataObjId
		this.dataObjName = obj.dataObjName
		this.queryType = required(obj.queryType, clazz, 'queryType')
		/* todo: add specification of render platform */
		this.renderPlatform = required(
			obj.renderPlatform || DataObjRenderPlatform.app,
			clazz,
			'renderPlatform'
		)
		this.source = strRequired(this.dataObjId || this.dataObjName, clazz, 'dataObjId or dataObjName')
	}

	async getDataObjId() {
		if (this.dataObjId) {
			return this.dataObjId
		} else {
			const result: MethodResult = await apiFetchFunction(
				ApiFunction.dbGelGetDataObjId,
				new TokenApiId(this.dataObjName!)
			)
			return result.data.id
		}
	}
}

export class TokenAppIndex extends TokenApp {
	index: number
	constructor(obj: any) {
		const clazz = 'TokenAppIndex'
		super(obj)
		this.index = required(obj.index, clazz, 'index')
	}
}

export class TokenAppModalEmbedField extends TokenApp {
	dataObjSourceModal: TokenApiDbDataObjSource
	queryType: TokenApiQueryType
	constructor(obj: any) {
		const clazz = 'TokenAppModalEmbedField'
		super(obj)
		this.dataObjSourceModal = required(obj.dataObjSourceModal, clazz, 'dataObjSourceModal')
		this.queryType = required(obj.queryType, clazz, 'queryType')
	}
}

export class TokenAppModalSelect extends TokenApp {
	columnDefs: ColumnsDefsSelect
	fModalClose: Function
	isMultiSelect: boolean
	listIdsSelected: FieldColumnItem[]
	rowData: DataRecord[]
	selectLabel: string
	sortModel: DataObjSort
	constructor(obj: any) {
		const clazz = 'TokenAppModalSelect'
		super(obj)
		this.columnDefs = required(obj.columnDefs, clazz, 'columnDefs')
		this.fModalClose = required(obj.fModalClose, clazz, 'fModalClose')
		this.isMultiSelect = booleanRequired(obj.isMultiSelect, clazz, 'isMultiSelect')
		this.listIdsSelected = required(obj.listIdsSelected, clazz, 'listIdsSelected')
		this.rowData = required(obj.rowData, clazz, 'rowData')
		this.selectLabel = strRequired(obj.selectLabel, clazz, 'selectLabel')
		this.sortModel = required(obj.sortModel, clazz, 'sortModel')
	}
}

export class TokenAppModalReturn extends TokenApp {
	type: TokenAppModalReturnType
	data: any
	constructor(obj: any) {
		const clazz = 'TokenAppModalReturn'
		super(obj)
		this.type = required(obj.type, clazz, 'type')
		this.data = obj.data
	}
}
export enum TokenAppModalReturnType {
	cancel = 'cancel',
	close = 'close',
	complete = 'complete',
	delete = 'delete'
}
export class TokenAppNode extends TokenApp {
	node: Node
	queryType: TokenApiQueryType
	renderPlatform: DataObjRenderPlatform
	constructor(obj: any) {
		const clazz = 'TokenAppNode'
		super(obj)
		this.node = required(obj.node, clazz, 'node')
		this.queryType = required(obj.queryType, clazz, 'queryType')
		this.renderPlatform = required(obj.renderPlatform, clazz, 'renderPlatform')
	}
}
export class TokenAppProcess extends TokenApp {
	dataObjSource: TokenApiDbDataObjSource
	process: Process
	constructor(obj: any) {
		const clazz = 'TokenAppProcess'
		super(obj)
		this.dataObjSource = new TokenApiDbDataObjSource({
			dataObjName: strRequired(obj.dataObjNameProcess, clazz, 'dataObjNameProcess')
		})
		this.process = required(obj.process, clazz, 'process')
	}
}

export class TokenAppRow extends TokenApp {
	rowAction: AppRowActionType
	constructor(obj: any) {
		const clazz = 'TokenAppRow'
		super(obj)
		this.rowAction = required(obj.rowAction, clazz, 'rowAction')
	}
}

export class TokenAppStateTriggerAction extends TokenApp {
	codeAction: CodeAction
	codeConfirmType: TokenAppUserActionConfirmType
	confirm: UserActionConfirmContent
	data: DataRecord = {}
	fCallback: Function | undefined = undefined
	isMultiTree: boolean
	stateParms: StateParms
	transParms: ParmsValues
	constructor(obj: any) {
		const clazz = 'TokenAppStateTriggerAction'
		obj = valueOrDefault(obj, {})
		super(obj)
		this.codeAction = obj.codeAction
		this.codeConfirmType = obj.codeConfirmType || TokenAppUserActionConfirmType.none
		this.confirm = obj.confirm || new UserActionConfirmContent(obj)
		this.data = obj.data || {}
		this.fCallback = obj.fCallback
		this.isMultiTree = booleanOrFalse(obj.isMultiTree)
		this.stateParms = obj.stateParms || new StateParms({})
		this.transParms = new ParmsValues(obj.transParms)
	}
	setMenuClose() {
		this.updateStateParms({}, [StateTriggerToken.menuClose])
	}
	setTransParms(data: DataRecord) {
		this.transParms = new ParmsValues(data)
	}
	updateStateParms(parms: DataRecord, triggerTokens: StateTriggerToken[] = []) {
		for (const key in parms) {
			this.stateParms.data[key] = parms[key]
		}
		triggerTokens.forEach((triggerToken: StateTriggerToken) => {
			if (!this.stateParms.triggerTokens.find((tt) => tt === triggerToken)) {
				this.stateParms.triggerTokens.push(triggerToken)
			}
		})
	}
}

export class TokenAppTab extends TokenApp {
	app: App
	index: number
	constructor(obj: any) {
		const clazz = 'TokenAppTab'
		super(obj)
		this.app = required(obj.app, clazz, 'app')
		this.index = nbrRequired(obj.index, clazz, 'index')
	}
}

export class TokenAppUserAction {
	codeActionType: CodeActionType
	data: DataRecord
	sm: State
	constructor(sm: State, codeActionType: CodeActionType, data: DataRecord = {}) {
		this.codeActionType = codeActionType
		this.data = data
		this.sm = sm
	}
}

export enum TokenAppUserActionConfirmType {
	always = 'always',
	none = 'none',
	statusChanged = 'statusChanged',
	objectValidToContinue = 'objectValidToContinue'
}
