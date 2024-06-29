import {
	booleanOrFalse,
	DataObj,
	DataObjData,
	type DataRecord,
	memberOfEnum,
	nbrRequired,
	required,
	strOptional,
	strRequired,
	DBTable,
	userGet,
	valueOrDefault
} from '$utils/types'
import { State } from '$comps/app/types.appState'
import { AppRowActionType } from '$comps/app/types.app'
import { Node } from '$comps/app/types.node'
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

export class TokenApiDataObjId extends TokenApi {
	dataObjName: string
	constructor(dataObjName: string) {
		const clazz = 'TokenApiDataObjId'
		super()
		this.dataObjName = dataObjName
	}
}

export class TokenApiDbDataObjSource {
	replacements: DataRecord = {}
	sources: DataRecord = {}
	typesReplace = ['exprFilter', 'parent']
	typesSource = ['dataObjId', 'dataObjName', 'rawDataObj']
	constructor(obj: any) {
		const clazz = 'TokenApiDbDataObjSource'
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
				this.replacements[key] = obj[key]
			}
		})
		return this
	}
	updateSources(obj: any) {
		obj = valueOrDefault(obj, {})
		this.typesSource.forEach((key: string) => {
			if (Object.hasOwn(obj, key)) {
				this.sources[key] = obj[key]
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

export enum TokenApiFileAction {
	delete = 'delete',
	none = 'none',
	upload = 'upload'
}

export class TokenApiFileParm extends TokenApi {
	file?: File
	fileAction: TokenApiFileAction
	fileType?: TokenApiFileType
	key?: string
	constructor(obj: any) {
		super()
		const clazz = 'TokenApiFileParm'
		obj = valueOrDefault(obj, {})
		this.file = obj.file
		this.fileAction = required(obj.fileAction, clazz, 'fileAction')
		this.fileType = obj.fileType
		this.key = obj.key
	}
}

export enum TokenApiFileType {
	image = 'image',
	pdf = 'pdf'
}

export class TokenApiId extends TokenApi {
	id: string
	constructor(id: string) {
		const clazz = 'TokenApiId'
		super()
		this.id = id
	}
}

export class TokenApiQuery extends TokenApi {
	dataObjSource: TokenApiDbDataObjSource
	queryData: TokenApiQueryData
	queryType: TokenApiQueryType
	constructor(
		queryType: TokenApiQueryType,
		dataObjSource: TokenApiDbDataObjSource,
		queryData: TokenApiQueryData
	) {
		const clazz = 'TokenApiDb'
		super()
		this.dataObjSource = dataObjSource
		this.queryData = queryData
		this.queryType = queryType
	}
}

export class TokenApiQueryData {
	dataObjData: DataObjData | undefined
	dataSave: DataObjData | undefined
	parms: DataRecord
	record: DataRecord
	system: DataRecord
	tree: TokenApiQueryDataTree
	user: DataRecord
	constructor(data: any) {
		data = valueOrDefault(data, {})
		this.dataSave = this.dataSet(data, 'dataSave', undefined)
		this.dataObjData = this.dataSet(data, 'dataObjData', undefined)
		this.parms = this.dataSet(data, 'parms', {})
		this.record = this.dataSet(data, 'record', {})
		this.system = this.dataSet(data, 'system', {})
		this.tree = this.dataSet(data, 'tree', [])
		this.user = Object.hasOwn(data, 'user')
			? this.dataSet(data, 'user', {})
			: valueOrDefault(userGet(), {})
	}
	static load(currData: TokenApiQueryData) {
		const newData = new TokenApiQueryData(currData)
		if (currData.dataSave?.cardinality) {
			newData.dataSave = new DataObjData(currData.dataSave.cardinality)
			newData.dataSave = DataObjData.load(currData.dataSave)
		}
		newData.tree = new TokenApiQueryDataTree(currData.tree.levels)
		return newData
	}
	dataSet(data: any, key: string, defaultVal: any) {
		return Object.hasOwn(data, key) && data !== undefined ? data[key] : defaultVal
	}
	parmsUpsert(data: any) {
		if (!data) return
		if (!this.parms) this.parms = {}
		Object.entries(data).forEach(([key, value]) => {
			this.parms[key] = value
		})
	}
	parmsValueGet(key: string) {
		return Object.hasOwn(this.parms, key) ? this.parms[key] : undefined
	}
	parmsValueSet(key: string, value: any) {
		this.parms[key] = value
	}
	recordSet(data: DataRecord) {
		this.record = data
	}
}
export class TokenApiQueryDataTree {
	levels: TokenApiQueryDataTreeLevel[] = []
	constructor(levels: Array<TokenApiQueryDataTreeLevel> = []) {
		this.levels = levels
	}

	getFieldData(table: string | undefined, fieldName: string) {
		const record = this.getRecord(table)
		if (fieldName && record && Object.hasOwn(record, fieldName)) {
			return record[fieldName]
		} else {
			error(500, {
				file: FILENAME,
				function: 'TokenApiQueryDataTree.getFieldData',
				message: `Field ${fieldName} not found in data tree - table: ${table}; record: ${JSON.stringify(
					record
				)}`
			})
		}
	}

	getRecord(table: string | undefined = undefined) {
		const idx = table ? this.levels.findIndex((t) => t.table === table) : this.levels.length - 1
		const rtn = idx > -1 ? this.levels[idx].data : {}
		return rtn ? rtn : {}
	}

	setFieldData(table: string | undefined, fieldName: string, value: any) {
		const record = this.getRecord(table)
		if (fieldName && record && Object.hasOwn(record, fieldName)) {
			record[fieldName] = value
		} else {
			error(500, {
				file: FILENAME,
				function: 'TokenApiQueryDataTree.setFieldData',
				message: `Field ${fieldName} not found in data tree - table: ${table}; record: ${JSON.stringify(
					record
				)}`
			})
		}
	}

	upsertData(table: string | undefined, data: any) {
		if (table) {
			const idx = this.levels.findIndex((t) => t.table === table)
			if (idx >= 0) {
				this.levels[idx].data = data
			} else {
				this.levels.push(new TokenApiQueryDataTreeLevel(table, data))
			}
		}
	}
}

export class TokenApiQueryDataTreeLevel {
	data: DataRecord
	table: string
	constructor(table: string, data: DataRecord) {
		this.data = data
		this.table = table
	}
}

export enum TokenApiQueryType {
	expression = 'expression',
	preset = 'preset',
	retrieve = 'retrieve',
	retrieveRepParmItems = 'retrieveRepParmItems',
	save = 'save'
}

export class TokenApiSendText extends Token {
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

export class TokenApp extends Token {
	constructor() {
		super()
	}
}
export class TokenAppBack extends TokenApp {
	constructor() {
		super()
	}
}
export class TokenAppCrumbs extends TokenApp {
	crumbIdx: number
	constructor(crumbIdx: number) {
		super()
		this.crumbIdx = crumbIdx
	}
}
export class TokenAppDo extends TokenApp {
	actionType: TokenAppDoActionFieldType
	dataObj: DataObj
	state: State
	constructor(obj: any) {
		const clazz = 'TokenAppDo'
		super()
		this.actionType = required(obj.actionType, clazz, 'actionType')
		this.dataObj = required(obj.dataObj, clazz, 'dataObj')
		this.state = required(obj.state, clazz, 'state')
	}
}

export enum TokenAppDoActionConfirmType {
	always = 'always',
	none = 'none',
	objectChanged = 'objectChanged',
	objectValidToContinue = 'objectValidToContinue'
}

export enum TokenAppDoActionFieldType {
	back = 'back',

	detailDelete = 'detailDelete',
	detailMigrate = 'detailMigrate',
	detailNew = 'detailNew',
	detailProcessExecute = 'detailProcessExecute',
	detailSaveAs = 'detailSaveAs',
	detailSave = 'detailSave',
	detailSaveCancel = 'detailSaveCancel',

	dialogCancel = 'dialogCancel',
	dialogDone = 'dialogDone',
	dialogNext = 'dialogNext',
	dialogPrevious = 'dialogPrevious',

	embedListConfigEdit = 'embedListConfigEdit',
	embedListConfigNew = 'embedListConfigNew',
	embedListEditParmValue = 'embedListEditParmValue',
	embedListSelect = 'embedListSelect',

	listDetailEdit = 'listDetailEdit',
	listDetailNew = 'listDetailNew',

	listSelfDelete = 'listSelfDelete',
	listSelfEdit = 'listSelfEdit',
	listSelfNew = 'listSelfNew',
	listSelfReorder = 'listSelfReorder',
	listSelfReorderCancel = 'listSelfReorderCancel',
	listSelfRefresh = 'listSelfRefresh',
	listSelfSave = 'listSelfSave',

	none = 'none'
}

export class TokenAppDoName extends TokenApp {
	dataObjName: string
	constructor(dataObjName: string) {
		super()
		this.dataObjName = dataObjName
	}
}

export class TokenAppModalEmbed extends TokenApp {
	dataObjSourceEmbed: TokenApiDbDataObjSource
	dataObjSourceModal: TokenApiDbDataObjSource
	queryType: TokenApiQueryType
	constructor(obj: any) {
		const clazz = 'TokenAppDialog'
		super()
		this.dataObjSourceEmbed = required(obj.dataObjSourceEmbed, clazz, 'dataObjSourceEmbed')
		this.dataObjSourceModal = required(obj.dataObjSourceModal, clazz, 'dataObjSourceModal')
		this.queryType = required(obj.queryType, clazz, 'queryType')
	}
}
export class TokenAppModalReturn extends TokenApp {
	type: TokenAppModalReturnType
	data: any
	constructor(type: TokenAppModalReturnType, data: any) {
		super()
		this.type = type
		this.data = data
	}
}
export enum TokenAppModalReturnType {
	cancel = 'cancel',
	complete = 'complete',
	delete = 'delete'
}

export class TokenAppProcess extends TokenApp {
	dataObjSource: TokenApiDbDataObjSource
	process: Process
	constructor(process: Process, dataObjNameProcess: string) {
		super()
		this.dataObjSource = new TokenApiDbDataObjSource({ dataObjName: dataObjNameProcess })
		this.process = process
	}
}

export class TokenAppRow extends TokenApp {
	rowAction: AppRowActionType
	constructor(rowAction: AppRowActionType) {
		super()
		this.rowAction = rowAction
	}
}
export class TokenAppTab extends TokenApp {
	tabIdx: number
	constructor(tabIdx: number) {
		super()
		this.tabIdx = tabIdx
	}
}
export class TokenAppTreeNode extends TokenApp {
	node: Node
	constructor(node: Node) {
		super()
		this.node = node
	}
}
export class TokenAppTreeNodeId extends TokenApp {
	nodeId: string
	constructor(nodeId: string) {
		super()
		this.nodeId = nodeId
	}
}

export class TokenAppTreeReset extends TokenApp {
	constructor() {
		super()
	}
}

export class TokenAppTreeSetParent extends TokenApp {
	constructor() {
		super()
	}
}
