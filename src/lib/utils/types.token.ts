import {
	booleanOrFalse,
	booleanRequired,
	CodeAction,
	CodeActionType,
	DataObj,
	DataObjData,
	DataObjSort,
	type DataRecord,
	DataRecordStatus,
	DataRow,
	debug,
	getArray,
	memberOfEnum,
	memberOfEnumIfExists,
	MethodResult,
	MethodResultError,
	nbrRequired,
	Node,
	NodeObjComponent,
	ParmsValues,
	ParmsValuesFormList,
	required,
	strRequired,
	User,
	UserParmItemSave,
	valueOrDefault
} from '$utils/types'
import { UserAction } from '$comps/other/types.userAction.svelte'
import {
	QueryManagerSource,
	QuerySourceRaw,
	type RawDataList
} from '$lib/queryClient/types.queryClient'
import { apiFetchFunction, ApiFunction } from '$routes/api/api'
import { UserActionConfirmContent } from '$comps/other/types.userAction.svelte'
import { State, StateParms, StateTriggerToken } from '$comps/app/types.state.svelte'
import { App } from '$comps/app/types.app.svelte'
import { AppRowActionType } from '$comps/app/types.app.svelte'
import { type ColumnsDefsSelect } from '$comps/grid/grid'
import { getLocalTimeZone, today } from '@internationalized/date'
import { error } from '@sveltejs/kit'

const FILENAME = '$comps/types.token.ts'

export type FunctionModalReturn = (modalReturn: TokenAppModalReturn) => void

export class NavDestinationNode {
	nodeId: string
	dataId: string
	constructor(nodeId: string, dataId: string) {
		const clazz = 'NavDestinationNode'
		this.nodeId = strRequired(nodeId, clazz, 'nodeId')
		this.dataId = strRequired(dataId, clazz, 'dataId')
	}
}

export enum NavDestinationType {
	back = 'back',
	home = 'home',
	nodeBack = 'nodeBack'
}

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
		this.sourceQueryData = valueOrDefault(obj.sourceQueryData, {})
		this.sourceQuerySource = required(obj.sourceQuerySource, clazz, 'sourceQuerySource')
	}
}

export class TokenApiQueryData {
	attrAccessFilter: string = ''
	dataTab: DataObjData
	dataTree: TokenApiQueryDataTree
	dbExpr?: string
	node?: Node
	rawDataList: RawDataList = []
	record: DataRecord
	system: DataRecord
	user: User
	constructor(data: any) {
		data = valueOrDefault(data, {})
		this.dataTab = this.dataSet(data, 'dataTab', new DataObjData())
		this.dataTree = this.dataSet(data, 'dataTree', [])
		this.dbExpr = this.dataSet(data, 'dbExpr', '')
		this.node = this.dataSet(data, 'node', undefined)
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
	dataUpdate(dataObjId: string, dataRow: DataRow) {
		this.record = dataRow.record
		const level = this.dataTree.levels.find((l) => l.dataObjId === dataObjId)
		if (level) level.dataRow = dataRow
	}
	getParms() {
		return this.dataTab ? this.dataTab.getParms() : {}
	}
}
export class TokenApiQueryDataTree {
	levels: TokenApiQueryDataTreeLevel[] = []
	constructor(levels: TokenApiQueryDataTreeLevel[] = []) {
		this.levels = levels.map((levelRaw) => {
			return TokenApiQueryDataTreeLevel.load(levelRaw)
		})
	}

	addLevel(dataRow: DataRow, dataObjId: string, tableName: string, nodeName: string | undefined) {
		this.levels.push(new TokenApiQueryDataTreeLevel(dataRow, dataObjId, tableName, nodeName))
	}

	getDataRow(
		accessType: string = TokenApiQueryDataTreeAccessType.index,
		parm: string | number = 0
	) {
		switch (accessType) {
			case TokenApiQueryDataTreeAccessType.index:
				let indexBackCnt = typeof parm === 'number' ? parm : parseInt(parm)
				let indexBack = 0
				for (let i = this.levels.length - 1; i > -1; i--) {
					if (this.levels[i].dataRow.status !== DataRecordStatus.preset) {
						if (indexBack === indexBackCnt) {
							return new MethodResult(this.levels[i].dataRow)
						} else {
							indexBack++
						}
					}
				}
				break

			case TokenApiQueryDataTreeAccessType.node:
				const level = this.levels.find((l) => l.nodeName === parm)
				if (level) return new MethodResult(level.dataRow)
				break

			case TokenApiQueryDataTreeAccessType.table:
				for (let i = this.levels.length - 1; i > -1; i--) {
					if (this.levels[i].tableName === parm) {
						return new MethodResult(this.levels[i].dataRow)
					}
				}
				break
		}
		return new MethodResult({
			error: {
				file: FILENAME,
				function: 'TokenApiQueryDataTree.getDataRow',
				msgSystem: `Unable to find dataRow for accessType: ${accessType} - parm: ${parm} - levels: ${JSON.stringify(
					this.levels.map((l, index) => {
						return {
							dataObjId: l.dataObjId,
							index,
							node: l.nodeName,
							table: l.tableName
						}
					})
				)}`,
				msgUser: `Unable to find dataRow for accessType: ${accessType}`
			}
		})
	}

	getValue(
		propName: string,
		accessType: string = TokenApiQueryDataTreeAccessType.index,
		parm: string | number = 0
	) {
		let result: MethodResult = this.getDataRow(accessType, parm)
		if (result.error) return undefined
		let dataRow: DataRow = result.data
		return dataRow.getValue(propName)
	}
}

export enum TokenApiQueryDataTreeAccessType {
	index = 'index',
	node = 'node',
	table = 'table'
}

export class TokenApiQueryDataTreeLevel {
	dataObjId: string
	dataRow: DataRow
	nodeName: string
	tableName: string
	constructor(
		dataRow: DataRow,
		dataObjId: string,
		tableName: string,
		nodeName: string | undefined
	) {
		const clazz = 'TokenApiQueryDataTreeLevel'
		this.dataObjId = strRequired(dataObjId, clazz, 'dataObjId')
		this.nodeName = valueOrDefault(nodeName, '')
		this.tableName = strRequired(tableName, clazz, 'tableName')

		// derived
		const dataRowRaw = required(dataRow, clazz, 'dataRow')
		this.dataRow = new DataRow(dataRowRaw.status, dataRowRaw.record)
	}

	static load(level: TokenApiQueryDataTreeLevel) {
		return new TokenApiQueryDataTreeLevel(
			level.dataRow,
			level.dataObjId,
			level.tableName,
			level.nodeName
		)
	}
}

export enum TokenApiQueryType {
	preset = 'preset',
	retrieve = 'retrieve',
	retrievePreset = 'retrievePreset',
	save = 'save'
}

export enum TokenApiQueryTypeAlt {
	retrieveThenPreset = 'retrieveThenPreset',
	retrieveToPreset = 'retrieveToPreset'
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

export class TokenApiUser extends TokenApi {
	name: string
	constructor(name: string) {
		super()
		this.name = name
	}
}

export class TokenApiUserParmsGet extends TokenApi {
	idFeature: number
	idUser: string
	constructor(idUser: string, idFeature: number) {
		super()
		this.idFeature = idFeature
		this.idUser = idUser
	}
}

export class TokenApiUserParmsSet extends TokenApi {
	items: UserParmItemSave[]
	constructor(items: UserParmItemSave[]) {
		super()
		this.items = items
	}
}

export class TokenApp extends Token {
	constructor(obj: any) {
		const clazz = 'TokenApp'
		super()
	}
}

export class TokenAppActionTrigger extends TokenApp {
	dataObj: DataObj
	userAction: UserAction
	constructor(obj: any) {
		const clazz = 'TokenAppActionTrigger'
		super(obj)
		this.dataObj = required(obj.dataObj, clazz, 'dataObj')
		this.userAction = required(obj.userAction, clazz, 'userAction')
	}
}

export class TokenAppDoQuery extends TokenApp {
	codeComponent: NodeObjComponent
	dataObjId?: string
	dataObjName?: string
	queryType: TokenApiQueryType
	source: string
	constructor(obj: any) {
		const clazz = 'TokenAppDoQuery'
		super(obj)
		this.codeComponent = memberOfEnum(
			obj.codeComponent,
			clazz,
			'codeComponent',
			'NodeObjComponent',
			NodeObjComponent
		)
		this.dataObjId = obj.dataObjId
		this.dataObjName = obj.dataObjName
		this.queryType = required(obj.queryType, clazz, 'queryType')

		// derived
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

export class TokenAppModalConfig extends TokenApp {
	type: TokenAppModalConfigType
	constructor(obj: any) {
		const clazz = 'TokenAppModalConfig'
		super(obj)
		this.type = memberOfEnum(
			obj.type,
			clazz,
			'type',
			'TokenAppModalConfigType',
			TokenAppModalConfigType
		)
	}
}

export class TokenAppModalConfigConfirm extends TokenAppModalConfig {
	fModalReturn?: FunctionModalReturn
	body: string
	buttonTextCancel: string
	buttonTextConfirm: string
	title: string
	constructor(obj: any) {
		const clazz = 'TokenAppModalConfigConfirm'
		super(obj)
		this.body = strRequired(obj.body, clazz, 'body')
		this.buttonTextCancel = strRequired(obj.buttonTextCancel, clazz, 'buttonTextCancel')
		this.buttonTextConfirm = strRequired(obj.buttonTextConfirm, clazz, 'buttonTextConfirm')
		this.fModalReturn = obj.fModalReturn
		this.title = strRequired(obj.title, clazz, 'title')
	}
}

export class TokenAppModalConfigDate extends TokenAppModalConfig {
	fModalReturn?: FunctionModalReturn
	date: any
	constructor(obj: any) {
		const clazz = 'TokenAppModalConfigDate'
		super(obj)
		this.date = required(obj.date, clazz, 'date')
		this.fModalReturn = obj.fModalReturn
	}
}

export enum TokenAppModalConfigType {
	confirm = 'confirm',
	date = 'date',
	layout = 'layout'
}

export class TokenAppModalEmbedField extends TokenApp {
	dataObjSourceModal: TokenApiDbDataObjSource
	listIdsSelected: string[]
	queryType: TokenApiQueryType
	constructor(obj: any) {
		const clazz = 'TokenAppModalEmbedField'
		super(obj)
		this.dataObjSourceModal = required(obj.dataObjSourceModal, clazz, 'dataObjSourceModal')
		this.listIdsSelected = getArray(obj.listIdsSelected)
		this.queryType = required(obj.queryType, clazz, 'queryType')
	}
}

export class TokenAppModal extends TokenApp {
	fModalReturn: FunctionModalReturn
	constructor(obj: any) {
		const clazz = 'TokenAppModal'
		super(obj)
		this.fModalReturn = required(obj.fModalReturn, clazz, 'fModalReturn')
	}
}

export class TokenAppModalDate extends TokenAppModal {
	date: string
	constructor(obj: any) {
		const clazz = 'TokenAppModalDate'
		super(obj)
		this.date = required(obj.date || today(getLocalTimeZone()).toString(), clazz, 'date')
	}
}

export class TokenAppModalSelect extends TokenAppModal {
	columnDefs: ColumnsDefsSelect
	isMultiSelect: boolean
	listIdsSelected: string[]
	rowData: DataRecord[]
	selectLabel: string
	sortModel: DataObjSort
	constructor(obj: any) {
		const clazz = 'TokenAppModalSelect'
		super(obj)
		this.columnDefs = required(obj.columnDefs, clazz, 'columnDefs')
		this.isMultiSelect = booleanRequired(obj.isMultiSelect, clazz, 'isMultiSelect')
		this.listIdsSelected = getArray(obj.listIdsSelected)
		this.rowData = required(obj.rowData, clazz, 'rowData')
		this.selectLabel = strRequired(obj.selectLabel, clazz, 'selectLabel')
		this.sortModel = required(obj.sortModel, clazz, 'sortModel')
	}
}

export class TokenAppModalReturn extends TokenApp {
	type: TokenAppModalReturnType
	parmsFormList?: ParmsValuesFormList
	parmsState?: ParmsValues
	constructor(obj: any) {
		const clazz = 'TokenAppModalReturn'
		super(obj)
		this.type = required(obj.type, clazz, 'type')
		this.parmsFormList = obj.parmsFormList
		this.parmsState = obj.parmsState
	}
}
export enum TokenAppModalReturnType {
	cancel = 'cancel',
	complete = 'complete'
}

export class TokenAppNav extends TokenApp {
	backCount: number
	codeDestinationType?: NavDestinationType
	nodeDestination?: string
	constructor(obj: any) {
		const clazz = 'TokenAppNav'
		super(obj)
		obj = valueOrDefault(obj, {})
		this.backCount = valueOrDefault(obj.backCount, 1)
		this.codeDestinationType = memberOfEnum(
			obj._codeDestinationType,
			clazz,
			'codeDestinationType',
			'NavDestinationType',
			NavDestinationType
		)
		this.nodeDestination = obj._nodeDestination
	}
}

export class TokenAppNode extends TokenApp {
	node: Node
	constructor(obj: any) {
		const clazz = 'TokenAppNode'
		super(obj)
		this.node = required(obj.node, clazz, 'node')
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
	target?: TokenAppStateTriggerActionTarget
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
		this.target =
			memberOfEnumIfExists(
				obj.target,
				'target',
				clazz,
				'TokenAppStateTriggerActionTarget',
				TokenAppStateTriggerActionTarget
			) || TokenAppStateTriggerActionTarget.node
		this.transParms = new ParmsValues(obj.transParms)
	}

	setTransParms(data: DataRecord) {
		this.transParms = new ParmsValues(data)
	}
	updateStateParmsData(parms: DataRecord) {
		for (const key in parms) {
			this.stateParms.data[key] = parms[key]
		}
	}
	updateStateParmsTokens(triggerTokens: StateTriggerToken[]) {
		triggerTokens.forEach((triggerToken: StateTriggerToken) => {
			if (!this.stateParms.triggerTokens.find((tt) => tt === triggerToken)) {
				this.stateParms.triggerTokens.push(triggerToken)
			}
		})
	}
	updateStateParmsTokensMenuClose() {
		this.updateStateParmsTokens([StateTriggerToken.menuClose])
	}
}

export enum TokenAppStateTriggerActionTarget {
	dataObj = 'dataObj',
	node = 'node'
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
	conditional = 'conditional',
	none = 'none',
	statusChanged = 'statusChanged',
	objectValidToContinue = 'objectValidToContinue'
}
