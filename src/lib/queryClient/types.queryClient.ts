import { State } from '$comps/app/types.state.svelte'
import {
	arrayOfClass,
	booleanOrDefault,
	booleanRequired,
	classOptional,
	DataObjData,
	type DataRecord,
	debug,
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
import { apiFetchFunction, ApiFunction } from '$routes/api/api'
import {
	TokenApiDbDataObjSource,
	TokenApiQuery,
	TokenApiQueryData,
	TokenApiQueryType
} from '$utils/types.token'
import { FieldEmbedListType } from '$utils/utils.sys'
import {
	QueryRiderRaw,
	QueryRiders,
	QueryRiderTriggerTiming
} from '$lib/queryClient/types.queryClientRider'
import { error } from '@sveltejs/kit'

const FILENAME = '/$lib/query/types.query.ts'

export async function clientQueryExpr(
	evalExprContext: string,
	exprCustom: string,
	sourceQueryData?: DataRecord,
	sm?: State
): Promise<MethodResult> {
	const clazz = 'clientQueryExpr'
	let result: MethodResult

	if (!sourceQueryData) sourceQueryData = {}
	if (sm) {
		sourceQueryData.dataTree = sm.appGetDataTree()
		sourceQueryData.user = sm.user
		if (sourceQueryData.dataTab) {
			sourceQueryData.dataTab.parms.update(sm.parmsState.valueGetAll())
			sourceQueryData.dataTab.parms.update(sm.parmsTrans.valueGetAll())
		}
	}
	const tokenQuery = new TokenApiQuery({
		evalExprContext: evalExprContext,
		querySourceRaw: { exprCustom, querySourceType: QuerySourceType.expr },
		queryType: QuerySourceType.expr,
		queryData: new TokenApiQueryData(sourceQueryData)
	})

	result = await apiFetchFunction(ApiFunction.dbQuery, tokenQuery)
	if (result.error) return result
	return new MethodResult(TokenApiQueryData.load(result.data))
}

export class DbTable {
	_rawObj: any
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
		this._rawObj = obj
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
	getTableRoot() {
		return this.getTable(0)
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
	queryData: TokenApiQueryData
	queryRiders?: QueryRiders
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

		// query-riders - pre exe
		if (this.queryRiders) {
			result = await this.queryRiders.exe(
				QueryRiderTriggerTiming.pre,
				this.tokenQuery.queryType,
				this.queryData,
				this.sm
			)
			if (result.error) return result
			this.queryData = result.data as TokenApiQueryData
		}

		// query-execute
		result = await this.queryExe()
		if (result.error) return result
		this.queryData = result.data as TokenApiQueryData

		// query-riders - post exe
		if (this.queryRiders) {
			result = await this.queryRiders.exe(
				QueryRiderTriggerTiming.post,
				this.tokenQuery.queryType,
				this.queryData,
				this.sm
			)
			if (result.error) return result
			this.queryData = result.data as TokenApiQueryData
		}

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
		return new MethodResult(this.queryData)
	}
	async queryPre(): Promise<MethodResult> {
		return new MethodResult(this.queryData)
	}
}

export enum QueryManagerSource {
	gel = 'gel'
}

export class QuerySource {
	dataObjSource?: TokenApiDbDataObjSource
	exprCustom?: string
	exprFilter?: string
	exprFilterExcept?: string
	exprSort?: string
	exprWith?: string
	exprUnions: string[] = []
	listPresetExpr?: string
	parent?: QuerySourceParent
	queryRidersRawClient: QueryRiderRaw[] = []
	queryRidersRawServer: QueryRiderRaw[] = []
	querySourceType: QuerySourceType
	table?: DbTable
	tableGroup: DbTableQueryGroup
	constructor(obj: QuerySourceRaw) {
		const clazz = 'QuerySource'
		this.dataObjSource = new TokenApiDbDataObjSource(obj.dataObjSource)
		this.exprCustom = obj.exprCustom
		this.exprFilter = obj.exprFilter
		this.exprFilterExcept = obj.exprFilterExcept
		this.exprSort = obj.exprSort
		this.exprWith = obj.exprWith
		this.exprUnions = obj.exprUnions
		this.listPresetExpr = obj.listPresetExpr
		this.parent = classOptional(QuerySourceParent, obj._parent)
		this.queryRidersRawClient = obj.queryRidersRawClient
		this.queryRidersRawServer = obj.queryRidersRawServer
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
	exprFilterExcept?: string
	exprSort?: string
	exprWith?: string
	exprUnions: string[]
	listPresetExpr?: string
	queryRidersRawClient: QueryRiderRaw[] = []
	queryRidersRawServer: QueryRiderRaw[] = []
	querySourceType?: string
	_parent?: QuerySourceParentRaw
	_table?: DbTable
	_tables: QuerySourceTableRaw[] = []
	constructor(obj: any) {
		const clazz = 'QuerySourceRaw'
		obj = valueOrDefault(obj, {})
		this.dataObjSource = obj.dataObjSource
		this.exprCustom = obj.exprCustom
		this.exprFilter = obj.exprFilter
		this.exprFilterExcept = obj.exprFilterExcept
		this.exprSort = obj.exprSort
		this.exprWith = obj.exprWith
		this.exprUnions = getArray(obj.exprUnions)
		this.listPresetExpr = obj.listPresetExpr
		this.queryRidersRawClient = arrayOfClass(QueryRiderRaw, obj._queryRidersClient)
		this.queryRidersRawServer = arrayOfClass(QueryRiderRaw, obj._queryRidersServer)
		this.querySourceType = obj.querySourceType
		this._parent = classOptional(QuerySourceParentRaw, obj._parent)
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
	_embedType?: FieldEmbedListType
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
			FieldEmbedListType,
			FieldEmbedListType.listEdit
		)
		this._filterExpr = strOptional(obj._filterExpr, clazz, '_filterExpr')
		this._table = new DbTable(obj._table)
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

export type RawDataList = DataRecord[]

export enum ScriptExePost {
	dataItemsFields = 'dataItemsFields',
	dataItemsSelect = 'dataItemsSelect',
	formatData = 'formatData',
	none = 'none',
	processRowSelectPreset = 'processRowSelectPreset'
}

export enum QuerySourceType {
	dataObj = 'dataObj',
	expr = 'expr'
}
