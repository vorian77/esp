import { DbTable, DbTableQuery, QuerySourceParent } from '$lib/queryClient/types.queryClient'
import { GelQuery, LinkSaveAction } from '$routes/api/db/dbGel/dbGelScriptQuery'
import {
	DataRecordStatus,
	DataRow,
	MethodResult,
	MethodResultError,
	ParmsValuesType,
	RawDataObj,
	required,
	strRequired,
	valueOrDefault
} from '$utils/types'
import type { Method } from 'axios'

export class ScriptTypeSave {
	action: LinkSaveAction
	dataRows: DataRow[]
	exprData: string = ''
	query: GelQuery
	tableKey: DbTable
	tables: DbTableQuery[] = []
	constructor(obj: any) {
		const clazz = 'ScriptTypeUpdateCore'
		obj = valueOrDefault(obj, {})
		this.action = required(obj.action, clazz, 'action')
		this.dataRows = required(obj.dataRows, clazz, 'dataRows')
		this.query = required(obj.query, clazz, 'query')
		this.tableKey = required(this.query.rawDataObj.tableGroup.getTable(0), clazz, 'tableChild')
		this.tables = required(this.query.rawDataObj.tableGroup.tables, clazz, 'tables')
	}
	static addItem(list: string, item: string, separator: string) {
		return list && item ? list + separator + '\n' + item : list || item
	}
	static addItemComma(list: string, item: string) {
		return ScriptTypeSave.addItem(list, item, ',')
	}
	async build(): Promise<MethodResult> {
		return new MethodResult('')
	}

	getExprData(label: string, dataRows: DataRow[]) {
		const body = `(SELECT to_json($$${JSON.stringify(dataRows.map((row: DataRow) => row.record))}$$))`
		return `${label} := ${body}`
	}
	async getExprSave(): Promise<MethodResult> {
		let label = this.getLabelSave(this.tableKey)
		let result: MethodResult = await this.getExprSaveCore()
		if (result.error) return result
		let exprCore = result.data

		let exprBody = this.getExprSaveBody(this.getLabelData(this.tableKey), exprCore)
		let exprSave = `${label} := ${exprBody}`
		return new MethodResult(exprSave)
	}
	getExprSaveBody(label: string, exprCore: string) {
		return `(FOR item IN json_array_unpack(${label}) UNION (\n${exprCore}))`
	}
	async getExprSaveCore(): Promise<MethodResult> {
		return new MethodResult('')
	}
	getLabelData(table: DbTable) {
		return `data_${table.name}`
	}
	getLabelSave(table: DbTable) {
		return `save_${table.name}`
	}
}

export class ScriptTypeSaveParent extends ScriptTypeSave {
	id: string
	isListSelect: boolean
	queryParent: QuerySourceParent
	tableChild: DbTable
	constructor(obj: any) {
		const clazz = 'ScriptTypeSaveParent'
		super(obj)
		const rawDataObj: RawDataObj = required(obj.query.rawDataObj, clazz, 'rawDataObj')
		this.id = required(obj.dataRows[0].record.id, clazz, 'id')
		this.isListSelect = required(obj.isListSelect, clazz, 'isListSelect	')
		this.queryParent = required(obj.query.parent, clazz, 'parent')
		this.tableChild = required(rawDataObj.tableGroup.getTable(0), clazz, 'tableChild')
		this.tableKey = this.queryParent.table
	}
	async build(): Promise<MethodResult> {
		const label = this.getLabelData(this.tableKey)
		const exprUpdate = `UPDATE ${this.queryParent.table.object}`
		const exprFilter = `FILTER .id = <uuid>"${this.id}"`
		const operator = this.isListSelect ? ':=' : '+='
		const exprProp = `SET {${this.queryParent.columnName} ${operator} ${this.getLabelSave(this.tableChild)}}`
		const expr = `${label} := (\n${exprUpdate}\n${exprFilter}\n${exprProp}\n)`
		return new MethodResult(expr)
	}
}

export class ScriptTypeSavePrimary extends ScriptTypeSave {
	constructor(obj: any) {
		const clazz = 'ScriptTypeSavePrimary'
		super(obj)
	}
	getExprPropsSelect() {
		const exprPropsSelect = this.query.getPropsSelect({
			props: this.query.rawDataObj.rawPropsSelect
		})
		let expr = `SELECT ${this.getLabelSave(this.tableKey)} \n${exprPropsSelect}`
		return expr
	}
}

export class ScriptTypeSavePrimaryCore extends ScriptTypeSavePrimary {
	constructor(obj: any) {
		const clazz = 'ScriptTypeSavePrimaryCore'
		super(obj)
	}
	async build(): Promise<MethodResult> {
		let result: MethodResult = await this.getExprSave()
		if (result.error) return result
		let exprSave = result.data

		let exprData = this.getExprData(this.getLabelData(this.tableKey), this.dataRows)
		let expr = 'WITH\n' + ScriptTypeSave.addItem(exprData, exprSave, ',\n')
		return new MethodResult(expr)
	}

	async getExprSaveCore(): Promise<MethodResult> {
		const clazz = 'ScriptTypeSavePrimaryCore.getExprSaveCore'
		let expr = ''
		const tables = this.tables

		if (tables.length > 0) {
			let result: MethodResult = await processTable(
				this.query,
				this.dataRows,
				this.action,
				tables[0],
				tables
			)
			if (result.error) return result
			expr = tables[0].script
		}

		async function processTable(
			query: GelQuery,
			dataRows: DataRow[],
			action: LinkSaveAction,
			table: DbTableQuery,
			tables: DbTableQuery[]
		): Promise<MethodResult> {
			// post-order traversal
			for (let i of table.indexesChildren) {
				let result: MethodResult = await processTable(query, dataRows, action, tables[i], tables)
				if (result.error) return result
			}

			// add props-primary
			const propsRaw =
				action === LinkSaveAction.INSERT
					? query.rawDataObj.rawPropsSaveInsert
					: query.rawDataObj.rawPropsSaveUpdate
			let result: MethodResult = await query.getPropsSave(propsRaw, query, dataRows, {
				indexTable: table.index
			})
			if (result.error) return result
			let props: string[] = result.data

			// add props-links
			table.indexesChildren.forEach((i) => {
				const childTable = tables[i]
				if (childTable.script) {
					props.push(`${childTable.columnParent} := (${childTable.script})`)
				}
			})

			if (props.length > 0) {
				const propsList = props.join(',\n')
				switch (action) {
					case LinkSaveAction.INSERT:
						if (table.exprFilterUpdate) {
							table.script = `UPDATE ${table.table.object}\nFILTER ${table.exprFilterUpdate}\nSET {\n${propsList}\n}`
						} else {
							table.script = `INSERT ${table.table.object} {\n${propsList}\n}`
						}
						break
					case LinkSaveAction.UPDATE:
						const rootFilter = `.id = <uuid>item['id']`
						const rootTable = query.getTableRootObj()
						if (table.index === 0) {
							table.script = `UPDATE ${table.table.object}\nFILTER ${rootFilter}\nSET {\n${propsList}\n}`
						} else {
							const traversalFromRoot = table.traversalFromRoot
							const subTableFilter = `.id = (SELECT assert_single((SELECT ${table.table.object} FILTER .id = (SELECT DETACHED ${rootTable} FILTER ${rootFilter}).${traversalFromRoot}.id))).id`
							table.script = `UPDATE ${table.table.object}\nFILTER ${subTableFilter}\nSET {\n${propsList}\n}`
						}
						break
				}
			}
			return new MethodResult()
		}
		return new MethodResult(expr)
	}
}

enum BackwardLinkFilterType {
	union = 'UNION',
	except = 'EXCEPT'
}

export class ScriptTypeSavePrimaryListSelectLinkBackward extends ScriptTypeSavePrimary {
	columnBacklink: string
	columnEmbed: string
	idParent: string
	idsAdd: string[]
	idsRemove: string[]
	tableParent: DbTable
	constructor(obj: any) {
		super(obj)
		const clazz = 'ScriptTypeSavePrimaryListSelectLinkBackward'
		this.columnBacklink = strRequired(
			this.query.fieldEmbed?.columnBacklink,
			clazz,
			'columnBacklink'
		)
		this.columnEmbed = strRequired(this.query.fieldEmbed?.embedFieldNameRaw, clazz, 'columnEmbed')
		this.idParent = strRequired(
			this.dataRows.length > 0 ? this.dataRows[0].record.id : undefined,
			clazz,
			'idParent'
		)
		const parms = required(this.query.queryData?.dataTab?.parms, clazz, 'queryData.dataTab.parms')
		const listIds = parms.valueGet(ParmsValuesType.listIds)
		const listIdsSelected = parms.valueGet(ParmsValuesType.listIdsSelected)
		this.idsAdd = listIdsSelected.filter((id: string) => !listIds.includes(id))
		this.idsRemove = listIds.filter((id: string) => !listIdsSelected.includes(id))
		this.tableParent = required(this.query.fieldEmbed?.parentTable, clazz, 'tableParent')
	}
	async build(): Promise<MethodResult> {
		let exprAdd: string = this.buildExpr(BackwardLinkFilterType.union, this.idsAdd)
		let exprRemove: string = this.buildExpr(BackwardLinkFilterType.except, this.idsRemove)
		let expr = ScriptTypeSave.addItem(exprAdd, exprRemove, ',\n')
		if (expr) expr = `WITH\n${expr}`
		return new MethodResult(expr)
	}
	buildExpr(filterType: BackwardLinkFilterType, ids: string[]) {
		if (ids.length === 0) return ''
		const labelData = this.buildExprLabelData(filterType)
		const labelSave = this.buildExprLabelSave(filterType)
		let exprData = this.buildExprData(labelData, filterType, ids)
		let exprSaveCore = this.buildExprSaveCore(filterType)
		let exprSaveBody = this.getExprSaveBody(labelData, exprSaveCore)
		let exprSave = `${labelSave} := ${exprSaveBody}`
		return ScriptTypeSave.addItem(exprData, exprSave, ',\n')
	}
	buildExprData(label: string, filterType: BackwardLinkFilterType, ids: string[]) {
		const dataRows: DataRow[] = ids.map(
			(id: string) => new DataRow(DataRecordStatus.unknown, { id })
		)
		return this.getExprData(label, dataRows)
	}
	buildExprLabel(filterType: BackwardLinkFilterType, label: string) {
		return `${label}_${filterType}`
	}
	buildExprLabelData(filterType: BackwardLinkFilterType) {
		return this.buildExprLabel(filterType, this.getLabelData(this.tableKey))
	}

	buildExprLabelSave(filterType: BackwardLinkFilterType) {
		return this.buildExprLabel(filterType, this.getLabelSave(this.tableKey))
	}
	buildExprSaveCore(filterType: BackwardLinkFilterType): string {
		const exprUpdate = `  UPDATE ${this.tableKey.object}`
		const exprFilter = `  FILTER .id = <uuid>item['id']`
		const exprPropPrimary = `(SELECT ${this.tableKey.object} FILTER .id = <uuid>item['id']).${this.columnBacklink}`
		const exprPropUpdate = `(SELECT ${this.tableParent.object} FILTER .id = <uuid>"${this.idParent}")`
		const exprProp = `  SET {${this.columnBacklink} := DISTINCT(${exprPropPrimary} ${filterType} ${exprPropUpdate})}`
		const expr = `${exprUpdate}\n${exprFilter}\n${exprProp}\n`
		return expr
	}

	getExprPropsSelect() {
		const exprPropsSelect = this.query.getPropsSelect({
			props: this.query.rawDataObj.rawPropsSelect
		})

		const exprSelectAdd =
			this.idsAdd.length > 0
				? this.buildExprLabel(BackwardLinkFilterType.union, this.getLabelSave(this.tableKey))
				: ''
		const exprSelectRemove =
			this.idsRemove.length > 0
				? this.buildExprLabel(BackwardLinkFilterType.except, this.getLabelSave(this.tableKey))
				: ''
		const exprSelectList = `(SELECT ${this.tableParent.object} FILTER .id = <uuid>"${this.idParent}").${this.columnEmbed}`
		let exprSelect = ScriptTypeSave.addItem(exprSelectList, exprSelectAdd, ' UNION ')
		exprSelect = ScriptTypeSave.addItem(exprSelect, exprSelectRemove, ' EXCEPT ')
		exprSelect = `SELECT DISTINCT(${exprSelect})`
		const expr = `${exprSelect}\n${exprPropsSelect}`
		return expr
	}
}

export class ScriptTypeSavePrimaryListSelectLinkBackwardType extends ScriptTypeSave {
	constructor(obj: any) {
		super(obj)
		const clazz = 'ScriptTypeSavePrimaryListSelectLinkBackwardType'
	}
}

export class ScriptTypeSavePrimaryListSelectLinkForward extends ScriptTypeSavePrimary {
	constructor(obj: any) {
		super(obj)
	}
	async build(): Promise<MethodResult> {
		let label = this.getLabelSave(this.tableKey)
		let select = `(SELECT ${this.tableKey.object} FILTER .id IN <parms,uuidlist,listIdsSelected>)`
		return new MethodResult(`WITH\n${label} := ${select}`)
	}
}
