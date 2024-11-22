import {
	booleanOrFalse,
	booleanRequired,
	DataObj,
	DataObjData,
	type DataRecord,
	DataRow,
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

export enum TokenApiBlobAction {
	delete = 'delete',
	list = 'list',
	none = 'none',
	upload = 'upload'
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
		const clazz = 'TokenApiFileParmUpload'
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
	updateTableData(table: string, dataRow: DataRow) {
		this.record = dataRow.record
		this.tree.upsertData(table, dataRow)
	}
}
export class TokenApiQueryDataTree {
	levels: TokenApiQueryDataTreeLevel[] = []
	constructor(levels: TokenApiQueryDataTreeLevel[] = []) {
		this.levels = levels
	}

	getDataRow(table: string | undefined = undefined) {
		const idx = table ? this.levels.findIndex((t) => t.table === table) : this.levels.length - 1
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
					message: `Field ${fieldName} not found in data tree - table: ${table}; record: ${JSON.stringify(
						dataRow?.record
					)}`
				})
			}
		}
	}

	setDataRow(level: number, dataRow: DataRow) {
		this.levels[level].dataRow = dataRow
	}

	upsertData(table: string | undefined, dataRow: DataRow) {
		if (table) {
			const idx = this.levels.findIndex((t) => t.table === table)
			if (idx >= 0) {
				this.setDataRow(idx, dataRow)
			} else {
				this.levels.push(new TokenApiQueryDataTreeLevel(table, dataRow))
			}
		}
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
	idsSelected: FieldItem[]
	rowData: DataRecord[]
	constructor(obj: any) {
		const clazz = 'TokenAppModalSelect'
		super(obj)
		this.fieldLabel = strRequired(obj.fieldLabel, clazz, 'fieldLabel')
		this.fModalClose = required(obj.fModalClose, clazz, 'fModalClose')
		this.isMultiSelect = booleanRequired(obj.isMultiSelect, clazz, 'isMultiSelect')
		this.idsSelected = required(obj.idsSelected, clazz, 'idsSelected')
		this.rowData = required(obj.rowData, clazz, 'rowData')
	}
}

export class TokenAppModalSelectDataObj extends TokenAppModalSelect {
	dataObjSelectId: string
	constructor(obj: any) {
		const clazz = 'TokenAppModalSelectDataObj'
		super(obj)
		this.dataObjSelectId = strRequired(obj.dataObjSelectId, clazz, 'dataObjSelectId')
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
export class TokenAppNode extends TokenApp {
	node: Node
	constructor(obj: any) {
		const clazz = 'TokenAppNode'
		super(obj)
		this.node = required(obj.node, clazz, 'node')
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

export class TokenAppWidget extends TokenApp {
	action: string
	clazz: string
	dataObjName?: string
	nodeObjName?: string
	statusHeader?: string
	status?: string
	title: string
	constructor(obj: any) {
		const clazz = 'TokenAppWidget'
		super(obj)
		this.action = required(obj.action, clazz, 'action')
		this.clazz = required(obj.clazz, clazz, 'clazz')
		this.dataObjName = strOptional(obj.dataObjName, clazz, 'dataObjName')
		this.nodeObjName = strOptional(obj.nodeObjName, clazz, 'nodeObjName')
		this.statusHeader = obj.statusHeader
		this.status = obj.status
		this.title = required(obj.title, clazz, 'title')

		// derived
		strRequired(this.dataObjName || this.nodeObjName, clazz, 'dataObjName or nodeObjName')
	}
}
