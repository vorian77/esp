import {
	DataObjTable,
	type DataRecord,
	DataRow,
	DataRows,
	DBTable,
	debug,
	required,
	strRequired,
	valueOrDefault
} from '$utils/types'
import { TokenApiQueryData } from '$utils/types.token'
import { LinkSaveAction, Query, QueryParent } from '$routes/api/dbEdge/dbEdgeQuery'
import { error } from '@sveltejs/kit'

export class ScriptTypeSave {
	action: LinkSaveAction
	dataRows: DataRow[]
	exprData: string = ''
	exprSave: string = ''
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
	addItem(list: string, item: string, separator: string) {
		return list ? list + separator + '\n' + item : item
	}
	addItemComma(list: string, item: string) {
		return this.addItem(list, item, ',')
	}
	build(): string {
		return ''
	}

	getExprData() {
		const label = this.getLabelData(this.tableKey)
		const body = `(SELECT to_json($$${JSON.stringify(this.dataRows.map((row: DataRow) => row.record))}$$))`
		return `${label} := ${body}`
	}
	getExprSave() {
		let label = this.getLabelSave(this.tableKey)
		let exprCore = this.getExprSaveCore()
		let exprBody = this.getExprSaveBody(exprCore)
		let exprSave = `${label} := ${exprBody}`
		return exprSave
	}
	getExprSaveBody(exprCore: string) {
		return `(FOR item IN json_array_unpack(${this.getLabelData(this.tableKey)}) UNION (\n${exprCore}))`
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
	queryParent: QueryParent
	tableChild: DBTable
	constructor(obj: any) {
		const clazz = 'ScriptTypeSaveParent'
		super(obj)
		this.id = required(obj.dataRows[0].record.id, clazz, 'id')
		this.queryParent = required(obj.query.parent, clazz, 'parent')
		this.tableChild = required(obj.query.rawDataObj.tables[0].table, clazz, 'tableChild')
		this.tableKey = this.queryParent.table
	}
	build() {
		const label = this.getLabelData(this.tableKey)
		const exprUpdate = `UPDATE ${this.queryParent.table.object}`
		const exprFilter = `FILTER .id = <uuid>"${this.id}"`
		const exprProp = `SET {${this.queryParent.columnName} += ${this.getLabelSave(this.tableChild)}}`
		const expr = `${label} := (\n${exprUpdate}\n${exprFilter}\n${exprProp}\n)`
		return expr
	}
}

export class ScriptTypePrimary extends ScriptTypeSave {
	scriptParent?: ScriptTypeSaveParent
	constructor(obj: any) {
		const clazz = 'ScriptTypeSavePrimary'
		super(obj)
		this.scriptParent = obj.scriptParent
	}
	build() {
		let exprSave = this.getExprSave()
		let exprData = this.getExprData()
		let expr = 'WITH\n' + this.addItem(exprData, exprSave, ',\n')
		return expr
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
		const clazz = 'ScriptTypePrimary.getExprSaveCore'
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
			let props: string[] = query.getPropsPrimary(
				{
					action,
					indexTable: table.index,
					props:
						action === LinkSaveAction.INSERT
							? query.rawDataObj.rawPropsSaveInsert
							: query.rawDataObj.rawPropsSaveUpdate
				},
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
