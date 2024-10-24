import {
	booleanOrFalse,
	booleanRequired,
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
import { App } from '$comps/app/types.app'
import { AppRowActionType } from '$comps/app/types.app'
import { Node } from '$comps/app/types.node'
import { FieldItem } from '$comps/form/field'
import { FieldEmbed } from '$comps/form/fieldEmbed'
import { FieldEmbedShell } from '$comps/form/fieldEmbedShell'
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
	dataTab?: DataObjData
	record: DataRecord
	system: DataRecord
	tree: TokenApiQueryDataTree
	user: DataRecord
	constructor(data: any) {
		data = valueOrDefault(data, {})
		this.dataTab = this.dataSet(data, 'dataTab', undefined)
		this.record = this.dataSet(data, 'record', {})
		this.system = this.dataSet(data, 'system', {})
		this.tree = this.dataSet(data, 'tree', [])
		this.user = Object.hasOwn(data, 'user')
			? this.dataSet(data, 'user', {})
			: valueOrDefault(userGet(), {})
	}
	static load(currData: TokenApiQueryData) {
		const newData = new TokenApiQueryData(currData)
		newData.dataTab = currData.dataTab ? DataObjData.load(currData.dataTab) : undefined
		newData.tree = new TokenApiQueryDataTree(currData.tree.levels)
		return newData
	}
	dataSet(data: any, key: string, defaultVal: any) {
		return Object.hasOwn(data, key) && data !== undefined ? data[key] : defaultVal
	}
	getParms() {
		return this.dataTab ? this.dataTab.getParms() : {}
	}
	updateTableData(table: string, data: DataRecord) {
		this.record = data
		this.tree.upsertData(table, data)
	}
}
export class TokenApiQueryDataTree {
	levels: TokenApiQueryDataTreeLevel[] = []
	constructor(levels: Array<TokenApiQueryDataTreeLevel> = []) {
		this.levels = levels
	}

	getRecord(table: string | undefined = undefined) {
		const idx = table ? this.levels.findIndex((t) => t.table === table) : this.levels.length - 1
		const rtn = idx > -1 ? this.levels[idx].data : {}
		return rtn ? rtn : {}
	}

	getValue(table: string | undefined, fieldName: string) {
		const record = this.getRecord(table)
		return fieldName && record && Object.hasOwn(record, fieldName) ? record[fieldName] : undefined
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
	data: any
	idFeature: string
	idUser: string
	constructor(idUser: string, idFeature: string, data: any | undefined = undefined) {
		super()
		this.data = data
		this.idFeature = idFeature
		this.idUser = idUser
	}
}

export class TokenApp extends Token {
	constructor(obj: any) {
		const clazz = 'TokenApp'
		super()
	}
}

export class TokenAppDo extends TokenApp {
	dataObj: DataObj
	fieldEmbed?: FieldEmbed
	state: State
	constructor(obj: any) {
		const clazz = 'TokenAppDo'
		super(obj)
		this.dataObj = required(obj.dataObj, clazz, 'dataObj')
		this.fieldEmbed = obj.fieldEmbed
		this.state = required(obj.state, clazz, 'state')
	}
}

export enum TokenAppDoActionConfirmType {
	always = 'always',
	none = 'none',
	objectChanged = 'objectChanged',
	objectValidToContinue = 'objectValidToContinue'
}

export class TokenAppIndex extends TokenApp {
	index: number
	constructor(obj: any) {
		const clazz = 'TokenAppIndex'
		super(obj)
		this.index = required(obj.index, clazz, 'index')
	}
}

export class TokenAppModalDataObj extends TokenApp {
	dataObjName: string
	constructor(obj: any) {
		const clazz = 'TokenAppModalDataObj'
		super(obj)
		this.dataObjName = strRequired(obj.dataObjName, clazz, 'dataObjName')
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
	fieldLabel: string
	fModalClose: Function
	isMultiSelect: boolean
	itemsCurrent: FieldItem[]
	itemsList: FieldItem[]
	constructor(obj: any) {
		const clazz = 'TokenAppModalSelect'
		super(obj)
		this.fieldLabel = strRequired(obj.fieldLabel, clazz, 'fieldLabel')
		this.fModalClose = required(obj.fModalClose, clazz, 'fModalClose')
		this.isMultiSelect = booleanRequired(obj.isMultiSelect, clazz, 'isMultiSelect')
		this.itemsCurrent = required(obj.itemsCurrent, clazz, 'itemsCurrent')
		this.itemsList = required(obj.itemsList, clazz, 'itemsList')
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
	complete = 'complete',
	delete = 'delete'
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

export class TokenAppTreeNode extends TokenApp {
	node: Node
	constructor(obj: any) {
		const clazz = 'TokenAppTreeNode'
		super(obj)
		this.node = required(obj.node, clazz, 'node')
	}
}
export class TokenAppTreeNodeId extends TokenApp {
	nodeId: string
	constructor(obj: any) {
		const clazz = 'TokenAppTreeNodeId'
		super(obj)
		this.nodeId = strRequired(obj.nodeId, clazz, 'nodeId')
	}
}
