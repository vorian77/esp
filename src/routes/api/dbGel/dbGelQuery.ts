import { nbrOrDefault, valueOrDefault } from '$lib/utils/utils'
import {
	booleanRequired,
	classOptional,
	DataObjCardinality,
	DataObjTable,
	DBTable,
	debug,
	isNumber,
	memberOfEnumOrDefault,
	ParmsValuesType,
	required,
	strOptional,
	strRequired
} from '$utils/types'
import type { DataRecord, DataRow, PropLink, PropLinkItemsSource } from '$utils/types'
import { FieldEmbedType } from '$comps/form/field.svelte'
import { FieldEmbed } from '$comps/form/fieldEmbed'
import {
	PropDataSourceValue,
	PropDataType,
	PropLinkItems,
	PropNamePrefixType,
	RawDataObj,
	RawDataObjParent,
	RawDataObjPropDB
} from '$comps/dataObj/types.rawDataObj.svelte'
import { TokenApiQueryData } from '$utils/types.token'
import {
	ExprToken,
	getValDB,
	evalExpr,
	evalExprTokens,
	getUUID
} from '$routes/api/dbGel/dbGelGetVal'
import { ProcessRow } from '$routes/api/dbGel/dbGelProcess'
import { Script, ScriptExePost } from '$routes/api/dbGel/dbGelScript'
import { error } from '@sveltejs/kit'

const FILENAME = '/$routes/api/dbGel/dbGelQuery.ts'

export class Query {
	fieldEmbed?: FieldEmbed
	parent?: QueryParent
	processRow?: ProcessRow
	rawDataObj: RawDataObj
	constructor(rawDataObj: RawDataObj, fieldEmbed?: FieldEmbed) {
		const clazz = 'Query'
		this.fieldEmbed = fieldEmbed
		this.rawDataObj = rawDataObj
		this.parent = classOptional(QueryParent, this.rawDataObj.rawParent)
		if (this.fieldEmbed && this.fieldEmbed.embedType === FieldEmbedType.listSelect) {
			this.parent = new QueryParent({
				_columnName: this.fieldEmbed.embedFieldNameRaw,
				_columnIsMultiSelect: true,
				_filterExpr: 'none',
				_table: this.fieldEmbed.parentTable
			})
		}
	}
	addItem(list: string, item: string, separator: string) {
		return list ? list + separator + '\n' + item : item
	}
	addItemComma(list: string, item: string) {
		return this.addItem(list, item, ',')
	}
	getFilter(queryData: TokenApiQueryData) {
		let filter = ''

		if (!this.rawDataObj.exprFilter) {
			filter = `.id = <tree,uuid,id>`
		} else if (this.rawDataObj.exprFilter?.toLowerCase() !== 'none') {
			filter = this.rawDataObj.exprFilter
		}

		const specialFilters: string[] = ['$ListSelectDisplayIds']
		const parms = valueOrDefault(queryData.dataTab?.parms.data, {})
		specialFilters.forEach((sf: string) => {
			if (Object.hasOwn(parms, sf)) {
				filter = this.addItem(filter, `.id in <uuid>{<parms,uuidList,${sf}>}`, 'AND')
			}
		})

		if (queryData.attrAccessFilter) {
			let parmAttributeAccessFilter = false
			let token = ParmsValuesType.attributeAccessFilter
			if (this.rawDataObj.exprFilter && this.rawDataObj.exprFilter.indexOf(token) > -1) {
				this.rawDataObj.exprFilter = this.rawDataObj.exprFilter.replaceAll(
					token,
					queryData.attrAccessFilter
				)
				parmAttributeAccessFilter = true
			}
			if (this.rawDataObj.exprWith && this.rawDataObj.exprWith.indexOf(token) > -1) {
				parmAttributeAccessFilter = true
			}
			if (!parmAttributeAccessFilter) {
				filter = filter ? queryData.attrAccessFilter + ' AND ' + filter : queryData.attrAccessFilter
			}
		}

		if (filter) filter = 'FILTER ' + filter
		return filter
	}
	getPropsListEditPresetInsert(parms: DataRecord) {
		const clazz = 'getPropsListEditPresetInsert'
		const props = required(parms.props, clazz, 'props') as RawDataObjPropDB[]
		let properties = ''

		props.forEach((propObj) => {
			const clazzProp = `${clazz}.${propObj.propName}`
			const propExpr = strRequired(propObj.exprPreset, clazzProp, 'expr')
			const prop = `${propObj.propName} := ${propExpr}`
			properties = this.addItemComma(properties, prop)
		})

		if (properties) properties = `{\n${properties}\n}`
		return properties
	}

	getPropsListEditPresetSave(parms: DataRecord, queryData: TokenApiQueryData) {
		const clazz = 'getPropsListEditPresetSave'
		const props = required(parms.props, clazz, 'props') as RawDataObjPropDB[]
		let properties = ''

		props.forEach((propObj) => {
			let propExpr = ''
			const clazzProp = `${clazz}.${propObj.propName}`
			const expr = strRequired(propObj.exprPreset, clazzProp, 'expr')

			if (expr) {
				const expressions: ExprToken[] = evalExprTokens(expr, queryData)
				if (expressions.length === 1) {
					const exprToken = expressions[0].dataItem
					const exprType = expressions[0].dataType
					const exprValue = expressions[0].valueFormatted

					propExpr = `${expr.replace(exprToken, exprValue)}`
				} else {
					propExpr = `${expr}`
				}
			}

			const prop = `${propObj.propNameRaw} := ${propExpr}`
			properties = this.addItemComma(properties, prop)
		})

		if (properties) properties = `{\n${properties}\n}`
		return properties
	}

	getPropsSave(
		propsRaw: RawDataObjPropDB[],
		query: Query,
		queryData: TokenApiQueryData,
		dataRows: DataRow[],
		parms: DataRecord
	) {
		let properties: string[] = []
		let fValues: Function[] = []
		const clazz = 'getPropsSave'
		const indexTable = required(parms.indexTable, clazz, 'indexTable')
		const action = strRequired(parms.action, clazz, 'action') as LinkSaveAction

		// 1. build props, subObjGroup
		propsRaw
			.filter((p) => p.indexTable === indexTable)
			.forEach((p, idx) => {
				if (!p.fieldEmbed) {
					const propDB = `${p.propNameRaw} := ${this.getPropsSavePropExpr(action, idx, p, query, queryData, fValues)}`
					properties.push(propDB)

					// format values
					dataRows.forEach((dataRow) => {
						dataRow.record[p.propName] = fValues[idx](dataRow.getValue(p.propName))
					})
				}
			})
		return properties
	}

	getPropsSavePropExpr(
		action: LinkSaveAction,
		propIdx: number,
		propObj: RawDataObjPropDB,
		query: Query,
		queryData: TokenApiQueryData,
		fValues: Function[]
	) {
		const clazz = 'getPropsSavePropExpr'
		let propExpr = ''
		const clazzProp = `${clazz}.${propObj.propName}`

		let expr = !query.rawDataObj.listEditPresetExpr && propObj.exprSave ? propObj.exprSave : ''

		const setValueFunction = (idx: number, f: Function) => {
			fValues[idx] = f
		}

		if (expr) {
			const expressions: ExprToken[] = evalExprTokens(expr, queryData)
			if (expressions.length === 1) {
				const exprToken = expressions[0].dataItem
				const exprType = expressions[0].dataType
				const exprValue = expressions[0].valueFormatted

				setValueFunction(propIdx, (rawValue: any) => {
					return exprValue && propObj.isSelfReference ? 'DETACHED ' + exprValue : exprValue
				})
				propExpr = `${expr.replace(exprToken, exprValue)}`
			} else {
				setValueFunction(propIdx, (rawValue: any) => {
					return rawValue
				})
				propExpr = `${expr}`
			}
		} else {
			let item = `json_get(item, '${propObj.propName}')`
			let { dataType } = getValDB(propObj.codeDataType, undefined)
			let propTable = strRequired(
				this.getTableObj(propObj.indexTable),
				clazzProp,
				'attrLink.table?.object'
			)

			switch (dataType) {
				case 'attribute':
					const attrLinkItemsSource: PropLinkItemsSource = required(
						propObj.linkItemsSource,
						clazzProp,
						'attrLinkItemsSource'
					)
					const attrTypes = attrLinkItemsSource.parmValueList.reduce(
						(acc, val) => acc + (acc ? ',' : '') + `"${val}"`,
						''
					)
					propTable = propTable === this.getTableRootObj() ? `DETACHED ${propTable}` : propTable
					const exprAttrsUneffected = attrTypes
						? `(SELECT .attrs FILTER .codeAttrType.name NOT IN {${attrTypes}})`
						: ''
					const exprAttrsNew = `(FOR attr IN json_array_unpack(item['linkItems_attrs']) UNION ((SELECT sys_core::SysAttr FILTER .id = <uuid>attr)))`

					propExpr =
						action === LinkSaveAction.INSERT
							? exprAttrsNew
							: exprAttrsUneffected
								? `(${exprAttrsUneffected} UNION ${exprAttrsNew})`
								: `(${exprAttrsNew})`
					propExpr = 'DISTINCT ' + propExpr

					setValueFunction(propIdx, (rawValue: any) => {
						return rawValue ? rawValue : getUUID()
					})
					break

				case 'link':
					let linkTable = ''

					if (propObj.linkItemsSource) {
						linkTable = strRequired(
							propObj.linkItemsSource.table?.object,
							clazzProp,
							'linkItemsSource.table'
						)
					} else if (propObj.link) {
						linkTable = strRequired(propObj.link?.table?.object, clazzProp, 'link.table')
					}

					linkTable = linkTable === this.getTableRootObj() ? `DETACHED ${linkTable}` : linkTable
					let filter = ''

					if (propObj.isMultiSelect) {
						filter = `IN (<uuid>json_array_unpack(${item}))`
						setValueFunction(propIdx, (rawValue: any) => {
							const newVal = Array.isArray(rawValue) && rawValue.length > 0 ? rawValue : [getUUID()]
							return newVal
						})
					} else {
						filter = `= <uuid>${item}`
						setValueFunction(propIdx, (rawValue: any) => {
							return rawValue ? rawValue : getUUID()
						})
					}
					propExpr = `(SELECT ${linkTable} FILTER .id ${filter})`
					break

				case '<cal::local_date>':
				case '<datetime>':
				case '<float64>':
				case '<int16>':
				case '<int32>':
				case '<int64>':
					setValueFunction(propIdx, (rawValue: any) => {
						return rawValue === undefined || rawValue === null ? '' : rawValue.toString()
					})
					propExpr = `(SELECT ${dataType}{} IF <str>${item} = '' ELSE ${dataType}<str>${item})`
					break

				default:
					setValueFunction(propIdx, (rawValue: any) => {
						return rawValue
					})
					propExpr = `${dataType}${item}`
			}
		}
		return propExpr
	}

	getPropsSelect(parms: DataRecord, queryData: TokenApiQueryData) {
		const clazz = 'getPropsSelect'
		let properties = ''
		const isCardinalityDetail = this.rawDataObj.codeCardinality === DataObjCardinality.detail
		const props = required(parms.props, clazz, 'props') as RawDataObjPropDB[]
		const processProps = (query: Query) => {
			props.forEach((prop) => {
				if (prop.codeDataSourceValue === PropDataSourceValue.edgeDB) {
					const newProperty = processPropsSelectItem(prop, query)
					properties = query.addItemComma(properties, newProperty)
				}
			})
		}

		// main
		processProps(this)
		if (!properties) properties = `dummy:= <str>{}`
		if (properties) properties = `{\n${properties}\n}`
		return properties

		function processPropsSelectItem(prop: RawDataObjPropDB, query: Query) {
			const propChildTableTraversal = prop.childTableTraversal
			const indexTable = nbrOrDefault(prop.indexTable, -1)
			let propValue = ''

			if (prop.linkItemsSource) {
				propValue = `.${propChildTableTraversal} ${prop.linkItemsSource.exprProps}`
			} else if (prop.link) {
				propValue = `.${propChildTableTraversal} {data := .id, display := .${prop.link.exprDisplay}}`
			} else if (prop.exprCustom) {
				propValue = prop.exprCustom
			} else if (indexTable > 0) {
				// scalar - sub-table
				propValue = `(.${propChildTableTraversal})`
			} else {
				// scalar - root
			}

			propValue = propValue ? ` := ${propValue}` : ''
			return prop.propName + propValue
		}
	}

	getPropsSelectPreset(parms: DataRecord, queryData: TokenApiQueryData) {
		const clazz = 'getPropsSelectPreset'
		const props = required(parms.props, clazz, 'props') as RawDataObjPropDB[]

		let properties = ''

		props.forEach((prop) => {
			const propChildTableTraversal = prop.childTableTraversal
			let expr = strRequired(prop.exprPreset, clazz, 'exprPreset')

			if (prop.linkItemsSource) {
				expr = `${expr} ${prop.linkItemsSource.exprProps}`
			} else if (prop.link) {
				expr = `${expr} {data := .id, display := .${prop.link.exprDisplay}}`
			}

			properties = this.addItemComma(properties, `${prop.propName} := ${expr}`)
		})

		if (!properties) properties = `dummy:= <str>{}`
		properties = `SELECT {\n${properties}\n}`
		return properties
	}

	getSort(queryData: TokenApiQueryData) {
		let script = ''

		if (this.rawDataObj.exprSort) {
			script = this.rawDataObj.exprSort
		} else {
			this.rawDataObj.rawPropsSort.forEach((prop) => {
				if (script) script += ' THEN '
				script += `.${prop.propName} ${prop.codeSortDir}`
			})
		}

		if (script) script = 'ORDER BY ' + script
		return script
	}

	getTableObj(indexTable: number) {
		const table = this.rawDataObj.tables.find((table) => table.index === indexTable)
		return table ? table.table.object : ''
	}

	getTableRootName() {
		const rootTable = this.rawDataObj.tables.find((table) => table.isRoot)
		return rootTable ? rootTable.table.name : ''
	}
	getTableRootObj() {
		const rootTable = this.rawDataObj.tables.find((table) => table.isRoot)
		return rootTable ? rootTable.table.object : ''
	}
	setProcessRow(processRow: ProcessRow) {
		this.processRow = processRow
	}
}

export class QueryParent {
	columnName: string
	columnIsMultiSelect: boolean
	filterExpr?: string
	table: DBTable
	constructor(obj: RawDataObjParent) {
		const clazz = 'QueryParent'
		obj = valueOrDefault(obj, {})
		this.columnName = strRequired(obj._columnName, clazz, 'columnName')
		this.columnIsMultiSelect = booleanRequired(
			obj._columnIsMultiSelect,
			clazz,
			'columnIsMultiSelect'
		)
		this.filterExpr = strOptional(obj._filterExpr, clazz, 'filterExpr')
		this.table = new DBTable(required(obj._table, clazz, 'table'))
	}
}

export class LinkSave {
	action: LinkSaveAction
	rootTable: string
	props: LinkSaveProp[] = []
	constructor(action: LinkSaveAction, rootTable: string) {
		const clazz = 'LinkSave'
		this.action = action
		this.rootTable = rootTable
	}
	addProp(indexTable: number, propExpr: string) {
		let prop = this.props.find((prop) => prop.indexTable === indexTable)
		if (prop) {
			prop.addProp(propExpr)
		} else {
			this.props.push(new LinkSaveProp(indexTable, propExpr))
		}
	}
	getPropsUpdate(isUpdate: boolean, objTables: ObjTable[]) {
		const template = isUpdate
			? `[linkPropName] := (SELECT assert_single(([action] [objTable] FILTER .id = (SELECT DETACHED [rootTable] FILTER .id = <uuid>item['id']).[traversalFromRoot].id\nSET {\n[properties]\n})))`
			: `[linkPropName] := (INSERT [objTable] {\n[properties]\n})`
		let props = ''
		this.props.forEach((obj) => {
			props += obj.getProps(template, this.action, this.rootTable, objTables) + '\n'
		})
		return props
	}
}

export enum LinkSaveAction {
	INSERT = 'INSERT',
	UPDATE = 'UPDATE'
}

class LinkSaveProp {
	indexTable: number
	properties: string = ''
	constructor(indexTable: number, property: string) {
		const clazz = 'LinkSaveProp'
		this.indexTable = indexTable
		this.properties = property
	}
	addProp(property: string) {
		this.properties += ',\n' + property
	}
	getProps(template: string, action: string, rootTable: string, objTables: ObjTable[]) {
		return template
			.replace('[linkPropName]', objTables[this.indexTable].columnParent!)
			.replace('[action]', action)
			.replace('[objTable]', objTables[this.indexTable].table.object)
			.replace('[rootTable]', rootTable)
			.replace('[traversalFromRoot]', objTables[this.indexTable].traversalFromRoot)
			.replace('[properties]', this.properties)
	}
}

export class ObjTable {
	columnParent?: string
	index: number
	isRoot: boolean
	parentObjTable?: ObjTable
	table: DBTable
	traversalFromRoot: string
	constructor(obj: any, tables: ObjTable[]) {
		obj = valueOrDefault(obj, {})
		const clazz = 'ObjTable'
		this.columnParent = obj._columnParent
		this.index = required(obj.index, clazz, 'index')
		this.isRoot = this.index === 0
		this.parentObjTable =
			obj.indexParent > -1 ? tables.find((table) => table.index === obj.indexParent) : undefined
		this.table = new DBTable(obj._table)
		this.traversalFromRoot =
			this.parentObjTable && obj._columnParent
				? this.parentObjTable.traversalFromRoot
					? this.parentObjTable.traversalFromRoot + '.' + obj._columnParent
					: obj._columnParent
				: ''
	}
}
