import { State } from '$comps/app/types.appState.svelte'
import { TokenApiQuery, TokenApiQueryData } from '$utils/types.token'
import {
	arrayOfClass,
	booleanOrDefault,
	booleanRequired,
	classOptional,
	DataObjData,
	type DataRecord,
	getArray,
	memberOfEnum,
	memberOfEnumOrDefault,
	nbrOptional,
	nbrRequired,
	MethodResult,
	required,
	strOptional,
	strRequired,
	valueOrDefault
} from '$utils/types'
import { FieldEmbedType } from '$utils/utils.sys'
import {
	QueryRiderRaw,
	QueryRiderTriggerTiming,
	QueryRiders
} from '$enhance/queryRider/types.queryRider'
import { TokenApiDbDataObjSource, TokenApiQuerySource, TokenApiQueryType } from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '/$lib/query/types.query.ts'

export class DbTable {
	hasMgmt: boolean
	mod: string
	name: string
	object: string
	constructor(obj: any) {
		const clazz = 'DbTable'
		obj = valueOrDefault(obj, {})
		this.hasMgmt = booleanRequired(obj.hasMgmt, clazz, 'hasMgmt')
		this.mod = strRequired(obj.mod, clazz, 'module')
		this.name = strRequired(obj.name, clazz, 'name')
		this.object = this.mod + '::' + this.name
	}
}
export class DbTableQuery {
	columnParent?: string
	columnsId: string[]
	exprFilterUpdate?: string
	index: number
	indexParent?: number
	indexesChildren: number[] = []
	isTableExtension: boolean
	isRoot: boolean
	parentObjTable?: DbTableQuery
	script: string = ''
	table: DbTable
	traversalFromRoot: string
	constructor(obj: QuerySourceTableRaw, tables: DbTableQuery[]) {
		const clazz = 'DbTableQuery'
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
		this.table = new DbTable(obj._table)
		this.traversalFromRoot =
			this.parentObjTable && this.columnParent
				? this.parentObjTable.traversalFromRoot
					? this.parentObjTable.traversalFromRoot + '.' + this.columnParent
					: this.columnParent
				: ''
	}
	setChildren(tables: DbTableQuery[]) {
		this.indexesChildren = tables
			.filter((table) => table.indexParent === this.index)
			.map((t) => t.index)
	}
}

export class DbTableQueryGroup {
	tables: DbTableQuery[] = []
	constructor(rawTables: QuerySourceTableRaw[]) {
		rawTables = getArray(rawTables)
		rawTables.forEach((t: any) => {
			this.tables.push(new DbTableQuery(t, this.tables))
		})
		this.tables.forEach((t) => {
			t.setChildren(this.tables)
		})
	}
	getTable(indexTable: number) {
		const tableQuery = this.getTableQuery(indexTable)
		return tableQuery ? tableQuery.table : undefined
	}
	getTableQuery(indexTable: number) {
		return this.tables.find((table) => table.index === indexTable)
	}
	getTableName(indexTable: number) {
		const tableQuery = this.getTableQuery(indexTable)
		return tableQuery ? tableQuery.table.name : ''
	}
	getTableObj(indexTable: number) {
		const tableQuery = this.getTableQuery(indexTable)
		return tableQuery ? tableQuery.table.object : ''
	}
}

export class QueryManager {
	isClient?: boolean
	queryData: TokenApiQueryData
	querySource: QuerySource
	sm?: State
	tokenQuery: TokenApiQuery
	constructor(tokenQuery: TokenApiQuery) {
		const clazz = `QueryManager.constructor`
		this.queryData = required(tokenQuery.queryData, clazz, 'tokenQuery.queryData')
		this.querySource = new QuerySource(tokenQuery.querySourceRaw)
		this.tokenQuery = tokenQuery
	}

	async query(): Promise<MethodResult> {
		// query-pre
		let result: MethodResult = await this.queryPre()
		if (result.error) return result
		this.queryData = result.data as TokenApiQueryData

		// query-execute
		result = await this.queryExe()
		if (result.error) return result
		this.queryData = result.data as TokenApiQueryData

		// query-post
		result = await this.queryPost()
		if (result.error) return result
		this.queryData = result.data as TokenApiQueryData

		// return-success
		return new MethodResult(this.queryData)
	}
	async queryExe(): Promise<MethodResult> {
		return new MethodResult(this.queryData)
	}
	async queryPost(): Promise<MethodResult> {
		const clazz = 'QueryManager.queryPost'
		return await this.querySource.queryRiders.exe(
			booleanRequired(this.isClient, clazz, 'isClient'),
			QueryRiderTriggerTiming.post,
			this.tokenQuery.queryType,
			this.queryData,
			this.sm
		)
	}
	async queryPre(): Promise<MethodResult> {
		const clazz = 'QueryManager.queryPre'
		return await this.querySource.queryRiders.exe(
			booleanRequired(this.isClient, clazz, 'isClient'),
			QueryRiderTriggerTiming.pre,
			this.tokenQuery.queryType,
			this.queryData,
			this.sm
		)
	}
}

export enum QueryManagerSource {
	gel = 'gel'
}

export class QuerySource {
	dataObjSource?: TokenApiDbDataObjSource
	exprCustom?: string
	exprFilter?: string
	exprSort?: string
	exprWith?: string
	exprUnions: string[] = []
	listEditPresetExpr?: string
	parent?: QuerySourceParent
	queryRiders: QueryRiders
	querySourceType: QuerySourceType
	table?: DbTable
	tableGroup: DbTableQueryGroup
	constructor(obj: QuerySourceRaw) {
		const clazz = 'QuerySource'
		obj = valueOrDefault(obj, {})
		this.dataObjSource = new TokenApiDbDataObjSource(obj.dataObjSource)
		this.exprCustom = obj.exprCustom
		this.exprFilter = obj.exprFilter
		this.exprSort = obj.exprSort
		this.exprWith = obj.exprWith
		this.exprUnions = obj.exprUnions
		this.listEditPresetExpr = obj.listEditPresetExpr
		this.parent = classOptional(QuerySourceParent, obj._parent)
		this.queryRiders = new QueryRiders(obj._queryRiders)
		this.querySourceType = memberOfEnum(
			obj.querySourceType,
			clazz,
			'querySourceType',
			'QuerySourceType',
			QuerySourceType
		)
		this.table = classOptional(DbTable, obj._table)
		this.tableGroup = new DbTableQueryGroup(obj._tables)
	}
}

export class QuerySourceRaw {
	dataObjSource?: TokenApiDbDataObjSource
	exprCustom?: string
	exprFilter?: string
	exprSort?: string
	exprWith?: string
	exprUnions: string[]
	listEditPresetExpr?: string
	querySourceType?: string
	_parent?: QuerySourceParentRaw
	_queryRiders: QueryRiderRaw[] = []
	_table?: DbTable
	_tables: QuerySourceTableRaw[] = []
	constructor(obj: any) {
		const clazz = 'QuerySourceRaw'
		obj = valueOrDefault(obj, {})
		this.dataObjSource = obj.dataObjSource
		this.exprCustom = obj.exprCustom
		this.exprFilter = obj.exprFilter
		this.exprSort = obj.exprSort
		this.exprWith = obj.exprWith
		this.exprUnions = getArray(obj.exprUnions)
		this.listEditPresetExpr = obj.listEditPresetExpr
		this.querySourceType = obj.querySourceType
		this._parent = classOptional(QuerySourceParentRaw, obj._parent)
		this._queryRiders = arrayOfClass(QueryRiderRaw, obj._queryRiders)
		this._table = classOptional(DbTable, obj._table)
		this._tables = getArray(obj._tables)
	}
}

export class QuerySourceParent {
	columnName: string
	columnIsMultiSelect: boolean
	filterExpr?: string
	table: DbTable
	constructor(obj: QuerySourceParentRaw) {
		const clazz = 'QueryParent'
		obj = valueOrDefault(obj, {})
		this.columnName = strRequired(obj._columnName, clazz, 'columnName')
		this.columnIsMultiSelect = booleanRequired(
			obj._columnIsMultiSelect,
			clazz,
			'columnIsMultiSelect'
		)
		this.filterExpr = strOptional(obj._filterExpr, clazz, 'filterExpr')
		this.table = new DbTable(required(obj._table, clazz, 'table'))
	}
}

export class QuerySourceParentRaw {
	_columnName: string
	_columnIsMultiSelect: boolean
	_embedType?: FieldEmbedType
	_filterExpr?: string
	_table: DbTable
	constructor(obj: QuerySourceParentRaw) {
		obj = valueOrDefault(obj, {})
		const clazz = 'QuerySourceParentRaw'
		this._columnName = strRequired(obj._columnName, clazz, '_columnName')
		this._columnIsMultiSelect = booleanRequired(
			obj._columnIsMultiSelect,
			clazz,
			'_columnIsMultiSelect'
		)
		this._embedType = memberOfEnumOrDefault(
			obj._embedType,
			clazz,
			'_embedType',
			'DataObjEmbedType',
			FieldEmbedType,
			FieldEmbedType.listEdit
		)
		this._filterExpr = strOptional(obj._filterExpr, clazz, '_filterExpr')
		this._table = new DbTable(obj._table)
	}
}

export class QuerySourceQueryRiderRaw {
	_codeFunction?: string
	_codeQueryType: string
	_codeTriggerTiming: string
	_codeType: string
	_codeUserDestination?: string
	_codeUserMsgDelivery?: string
	expr?: string
	functionParmValue?: string
	userMsg?: string
	constructor(obj: any) {
		const clazz = 'QuerySourceQueryRiderRaw'
		obj = valueOrDefault(obj, {})
		this._codeFunction = obj._codeFunction
		this._codeQueryType = strRequired(obj._codeQueryType, clazz, '_codeQueryType')
		this._codeTriggerTiming = strRequired(obj._codeTriggerTiming, clazz, '_codeTriggerTiming')
		this._codeType = strRequired(obj._codeType, clazz, '_codeType')
		this._codeUserDestination = obj._codeUserDestination
		this._codeUserMsgDelivery = obj._codeUserMsgDelivery
		this.expr = obj.expr
		this.functionParmValue = obj.functionParmValue
		this.userMsg = obj.userMsg
	}
}

export class QuerySourceTableRaw {
	_columnParent?: string
	_columnsId: string[] = []
	exprFilterUpdate?: string
	index: number
	indexParent?: number
	isTableExtension: boolean
	_table: DbTable
	constructor(obj: any) {
		const clazz = 'QuerySourceTableRaw'
		obj = valueOrDefault(obj, {})
		this._columnParent = strOptional(obj._columnParent, clazz, '_columnParent')
		this._columnsId = obj._columnsId
		this.exprFilterUpdate = obj.exprFilterUpdate
		this.index = nbrRequired(obj.index, clazz, 'index')
		this.indexParent = nbrOptional(obj.indexParent, clazz, 'indexParent')
		this.isTableExtension = booleanOrDefault(obj.isTableExtension, false)
		this._table = new DbTable(obj._table)
	}
}

export enum QuerySourceType {
	dataObj = 'dataObj',
	expr = 'expr'
}

export type RawDataList = DataRecord[]

export enum ScriptExePost {
	dataItems = 'dataItems',
	formatData = 'formatData',
	none = 'none',
	processRowSelectPreset = 'processRowSelectPreset'
}
