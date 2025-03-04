import {
	DataObjTable,
	type DataRecord,
	DataRecordStatus,
	DataRow,
	DataRows,
	DBTable,
	debug,
	ParmsValuesType,
	required,
	strRequired,
	valueOrDefault
} from '$utils/types'
import { TokenApiQueryData } from '$utils/types.token'
import { LinkSaveAction, Query, QueryParent } from '$routes/api/dbGel/dbGelQuery'
import { error } from '@sveltejs/kit'

export class ScriptTypeSave {
	action: LinkSaveAction
	dataRows: DataRow[]
	exprData: string = ''
	query: Query
	queryData: TokenApiQueryData
	tableKey: DBTable
	tables: DataObjTable[] = []
	constructor(obj: any) {
		const clazz = 'ScriptTypeUpdateCore'
		obj = valueOrDefault(obj, {})
		this.action = required(obj.action, clazz, 'action')
		this.dataRows = required(obj.dataRows, clazz, 'dataRows')
		this.query = required(obj.query, clazz, 'query')
		this.queryData = required(obj.queryData, clazz, 'queryData')
		this.tableKey = required(obj.query.rawDataObj.tables[0].table, clazz, 'tableChild')
		this.tables = required(obj.query.rawDataObj.tables, clazz, 'tables')
	}
	static addItem(list: string, item: string, separator: string) {
		return list && item ? list + separator + '\n' + item : list || item
	}
	static addItemComma(list: string, item: string) {
		return ScriptTypeSave.addItem(list, item, ',')
	}
	build(): string {
		return ''
	}

	getExprData(label: string, dataRows: DataRow[]) {
		const body = `(SELECT to_json($$${JSON.stringify(dataRows.map((row: DataRow) => row.record))}$$))`
		return `${label} := ${body}`
	}
	getExprSave() {
		let label = this.getLabelSave(this.tableKey)
		let exprCore = this.getExprSaveCore()
		let exprBody = this.getExprSaveBody(this.getLabelData(this.tableKey), exprCore)
		let exprSave = `${label} := ${exprBody}`
		return exprSave
	}
	getExprSaveBody(label: string, exprCore: string) {
		return `(FOR item IN json_array_unpack(${label}) UNION (\n${exprCore}))`
	}
	getExprSaveCore(): string {
		return ''
	}
	getLabelData(table: DBTable) {
		return `data_${table.name}`
	}
	getLabelSave(table: DBTable) {
		return `save_${table.name}`
	}
}

export class ScriptTypeSaveParent extends ScriptTypeSave {
	id: string
	isListSelect: boolean
	queryParent: QueryParent
	tableChild: DBTable
	constructor(obj: any) {
		const clazz = 'ScriptTypeSaveParent'
		super(obj)
		this.id = required(obj.dataRows[0].record.id, clazz, 'id')
		this.isListSelect = required(obj.isListSelect, clazz, 'isListSelect	')
		this.queryParent = required(obj.query.parent, clazz, 'parent')
		this.tableChild = required(obj.query.rawDataObj.tables[0].table, clazz, 'tableChild')
		this.tableKey = this.queryParent.table
	}
	build() {
		const label = this.getLabelData(this.tableKey)
		const exprUpdate = `UPDATE ${this.queryParent.table.object}`
		const exprFilter = `FILTER .id = <uuid>"${this.id}"`
		const operator = this.isListSelect ? ':=' : '+='
		const exprProp = `SET {${this.queryParent.columnName} ${operator} ${this.getLabelSave(this.tableChild)}}`
		const expr = `${label} := (\n${exprUpdate}\n${exprFilter}\n${exprProp}\n)`
		return expr
	}
}

export class ScriptTypeSavePrimary extends ScriptTypeSave {
	constructor(obj: any) {
		const clazz = 'ScriptTypeSavePrimary'
		super(obj)
	}
	build() {
		return ''
	}
	getExprPropsSelect() {
		const exprPropsSelect = this.query.getPropsSelect(
			{ props: this.query.rawDataObj.rawPropsSelect },
			this.queryData
		)
		let expr = `SELECT ${this.getLabelSave(this.tableKey)} \n${exprPropsSelect}`
		return expr
	}

	getExprSaveCore(): string {
		return ''
	}
}

export class ScriptTypeSavePrimaryCore extends ScriptTypeSavePrimary {
	constructor(obj: any) {
		const clazz = 'ScriptTypeSavePrimaryCore'
		super(obj)
	}
	build() {
		let exprSave = this.getExprSave()
		let exprData = this.getExprData(this.getLabelData(this.tableKey), this.dataRows)
		let expr = 'WITH\n' + ScriptTypeSave.addItem(exprData, exprSave, ',\n')
		return expr
	}
	getExprSaveCore(): string {
		const clazz = 'ScriptTypeSavePrimaryCore.getExprSaveCore'
		let expr = ''
		const tables = this.tables

		if (tables.length > 0) {
			processTable(this.query, this.queryData, this.dataRows, this.action, tables[0], tables)
			expr = tables[0].script
		}

		function processTable(
			query: Query,
			queryData: TokenApiQueryData,
			dataRows: DataRow[],
			action: LinkSaveAction,
			table: DataObjTable,
			tables: DataObjTable[]
		) {
			// post-order traversal
			table.indexesChildren.forEach((i) => {
				processTable(query, queryData, dataRows, action, tables[i], tables)
			})

			// add props-primary
			let props: string[] = query.getPropsSave(
				{
					action,
					indexTable: table.index,
					props:
						action === LinkSaveAction.INSERT
							? query.rawDataObj.rawPropsSaveInsert
							: query.rawDataObj.rawPropsSaveUpdate
				},
				query,
				queryData,
				dataRows
			)

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
		}
		return expr
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
	tableParent: DBTable
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
		const parms = required(this.queryData?.dataTab?.parms, clazz, 'queryData.dataTab.parms')
		const listIds = parms.valueGet(ParmsValuesType.listIds)
		const listIdsSelected = parms.valueGet(ParmsValuesType.listIdsSelected)
		this.idsAdd = listIdsSelected.filter((id: string) => !listIds.includes(id))
		this.idsRemove = listIds.filter((id: string) => !listIdsSelected.includes(id))
		this.tableParent = required(this.query.fieldEmbed?.parentTable, clazz, 'tableParent')
	}
	build() {
		let exprAdd: string = this.buildExpr(BackwardLinkFilterType.union, this.idsAdd)
		let exprRemove: string = this.buildExpr(BackwardLinkFilterType.except, this.idsRemove)
		let expr = ScriptTypeSave.addItem(exprAdd, exprRemove, ',\n')
		if (expr) expr = `WITH\n${expr}`
		return expr
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
		const exprPropsSelect = this.query.getPropsSelect(
			{ props: this.query.rawDataObj.rawPropsSelect },
			this.queryData
		)

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
	build() {
		let label = this.getLabelSave(this.tableKey)
		let select = `(SELECT ${this.tableKey.object} FILTER .id IN <parms,uuidlist,listIdsSelected>)`
		return `WITH\n${label} := ${select}`
	}
}
