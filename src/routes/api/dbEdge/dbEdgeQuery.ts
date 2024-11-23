import { nbrOrDefault, valueOrDefault } from '$lib/utils/utils'
import {
	booleanRequired,
	classOptional,
	DataObjDataField,
	DataObjEmbedType,
	DBTable,
	debug,
	memberOfEnumOrDefault,
	ParmsValuesType,
	required,
	strOptional,
	strRequired
} from '$utils/types'
import type { DataRecord, DataRow } from '$utils/types'
import { isNumber } from 'lodash-es'
import {
	PropDataSourceValue,
	PropDataType,
	PropLinkItemsSource,
	PropNamePrefixType,
	RawDataObj,
	RawDataObjParent,
	RawDataObjPropDB
} from '$comps/dataObj/types.rawDataObj'
import { TokenApiQueryData } from '$utils/types.token'
import {
	ExprToken,
	getValDB,
	evalExpr,
	evalExprTokens,
	getUUID
} from '$routes/api/dbEdge/dbEdgeGetVal'
import { ProcessRow } from '$routes/api/dbEdge/dbEdgeProcess'
import { Script, ScriptExePost } from '$routes/api/dbEdge/dbEdgeScript'
import { error } from '@sveltejs/kit'

const FILENAME = '/$routes/api/dbEdge/dbEdgeQuery.ts'

export class Query {
	field?: DataObjDataField
	parent?: QueryParent
	processRow?: ProcessRow
	rawDataObj: RawDataObj
	scriptOrder: string = ''
	constructor(rawDataObj: RawDataObj, field?: DataObjDataField) {
		const clazz = 'Query'
		this.field = field
		this.rawDataObj = rawDataObj
		this.parent = classOptional(QueryParent, this.rawDataObj.rawParent)
	}
	addItem(list: string, item: string, separator: string) {
		return list ? list + separator + '\n' + item : item
	}
	addItemComma(list: string, item: string) {
		return this.addItem(list, item, ',')
	}
	getExpression(queryData: TokenApiQueryData) {
		const expr = strRequired(this.rawDataObj.exprObject, 'Query.getExpression', 'exprObject')
		return evalExpr(expr, queryData)
	}
	getFilter(queryData: TokenApiQueryData) {
		let script = ''

		if (!this.rawDataObj.exprFilter) {
			script = `.id = <tree,uuid,id>`
		} else if (this.rawDataObj.exprFilter?.toLowerCase() !== 'none') {
			script = this.rawDataObj.exprFilter
		}

		const specialFilters: string[] = ['$ListSelectDisplayIds']
		const parms = valueOrDefault(queryData.dataTab?.parms.data, {})
		specialFilters.forEach((filter: string) => {
			if (Object.hasOwn(parms, filter)) {
				script = this.addItem(script, `.id in <uuid>{<parms,uuidList,${filter}>}`, 'AND')
			}
		})

		if (script) script = 'FILTER ' + script
		return script
	}
	getPropsListEditPresetInsert(parms: DataRecord, queryData: TokenApiQueryData) {
		const clazz = 'getPropsListEditPresetInsert'
		const props = required(parms.props, clazz, 'props') as RawDataObjPropDB[]
		let properties = ''

		props.forEach((propObj) => {
			const clazzProp = `${clazz}.${propObj.propName}`
			const propExpr = strRequired(
				propObj?.exprPreset
					? propObj.exprPreset
					: propObj?.link?.exprSave
						? propObj.link.exprSave
						: '',
				clazzProp,
				'expr'
			)
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
			const expr = strRequired(
				propObj?.exprPreset
					? propObj.exprPreset
					: propObj?.link?.exprSave
						? propObj.link.exprSave
						: '',
				clazzProp,
				'expr'
			)

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

	getPropsSave(parms: DataRecord, queryData: TokenApiQueryData, dataRows: DataRow[]) {
		let properties = ''
		const clazz = 'getPropsSave'
		const action = strRequired(parms.action, clazz, 'action') as LinkSaveAction
		const props = required(parms.props, clazz, 'props') as RawDataObjPropDB[]
		const isDelete = parms.isDelete ? parms.isDelete : false
		const isSet = action.toLowerCase() === 'update'
		const subObjGroup = new LinkSave(action, this.getTableRootObj())

		let fValues: Function[] = []
		const setValueFunction = (idx: number, f: Function) => {
			fValues[idx] = f
		}

		if (isDelete) return properties

		const getPropExpr = (propIdx: number, propObj: RawDataObjPropDB) => {
			let propExpr = ''
			const clazzProp = `${clazz}.${propObj.propName}`
			const expr = propObj?.link?.exprSave ? propObj.link.exprSave : ''

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

				switch (dataType) {
					case 'link':
						let propTable = strRequired(propObj.link?.table?.object, clazzProp, 'propTable')
						propTable = propTable === this.getTableRootObj() ? `DETACHED ${propTable}` : propTable
						let filter = ''

						if (propObj.isMultiSelect) {
							filter = `IN (<uuid>json_array_unpack(${item}))`
							setValueFunction(propIdx, (rawValue: any) => {
								const newVal =
									Array.isArray(rawValue) && rawValue.length > 0 ? rawValue : [getUUID()]
								return newVal
							})
						} else {
							filter = `= <uuid>${item}`
							setValueFunction(propIdx, (rawValue: any) => {
								return rawValue ? rawValue : getUUID()
							})
						}
						propExpr = `(SELECT ${propTable} FILTER .id ${filter})`
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

		// 1. build props, subObjGroup
		props.forEach((propObj, idx) => {
			if (!propObj.fieldEmbed) {
				const prop = `${propObj.propNameRaw} := ${getPropExpr(idx, propObj)}`

				if (propObj.indexTable === 0) {
					properties = this.addItemComma(properties, prop)
				} else {
					subObjGroup.addProp(propObj.indexTable!, prop)
				}

				dataRows.forEach((dataRow) => {
					// format values
					dataRow.record[propObj.propName] = fValues[idx](dataRow.getValue(propObj.propName))
				})
			}
		})

		// 2. add subObjGroup properties
		const set = isSet ? 'SET ' : ''
		if (properties)
			properties = `${set}{\n${this.addItemComma(properties, subObjGroup.getPropsUpdate(isSet, this.rawDataObj.tables))}}`
		debug('getPropsSave', 'properties', properties)
		return properties
	}

	getPropsSelect(parms: DataRecord, queryData: TokenApiQueryData) {
		const clazz = 'getPropsSelect'
		let properties = ''
		const props = required(parms.props, clazz, 'props') as RawDataObjPropDB[]
		const isSystemRoot = queryData?.dataTab?.parms.valueGet(ParmsValuesType.isSystemRoot) || false
		const processProps = (query: Query) => {
			props.forEach((prop) => {
				if (prop.codeDataSourceValue === PropDataSourceValue.edgeDB) {
					const newProperty = processPropsSelectItem(prop, query)
					properties = query.addItemComma(properties, newProperty)
				}
			})
		}

		// pre-processing
		if (isSystemRoot) {
			props.push(
				new RawDataObjPropDB(
					{
						_codeDataType: PropDataType.uuid,
						_propName: `_${ParmsValuesType.appSystemId}_`,
						exprCustom: '.owner.id'
					},
					this.rawDataObj.tables
				)
			)
		}

		// main
		processProps(this)
		if (!properties) properties = `dummy:= <str>{}`
		if (properties) properties = `{\n${properties}\n}`
		return properties

		function processPropsSelectItem(prop: RawDataObjPropDB, query: Query) {
			const propChildTableTraversal = prop.childTableTraversal
			const propDisplay = prop?.link?.propDisplay ? prop.link.propDisplay : ''
			const indexTable = nbrOrDefault(prop.indexTable, -1)
			let propValue = ''

			if (prop.codeDataType === PropDataType.link) {
				if (prop.exprCustom) {
					propValue = prop.exprCustom
				} else if (prop.link && prop.link.exprSelect) {
					propValue = prop.link.exprSelect
				} else {
					propValue = '.' + propChildTableTraversal
					if (propDisplay) {
						propValue += '.' + propDisplay
					} else {
						propValue += '.id'
					}
				}
			} else if (prop.exprCustom) {
				propValue = prop.exprCustom
			} else if (indexTable > 0) {
				// scalar - sub-table
				propValue = `(.${propChildTableTraversal})`
			} else {
				// scalar - root
			}

			propValue = propValue ? ` := ${propValue}` : ''
			const item = prop.propName + propValue
			return item
		}
	}

	getPropsSelectPreset(parms: DataRecord, queryData: TokenApiQueryData) {
		const clazz = 'getPropsSelectPreset'
		const props = required(parms.props, clazz, 'props') as RawDataObjPropDB[]
		let properties = ''

		props.forEach((prop) => {
			const expr = prop.link?.exprPreset
				? prop.link.exprPreset
				: prop.exprPreset
					? prop.exprPreset
					: ''
			let value = ''
			if (expr) {
				value = expr
			} else if (prop._linkItemsSource) {
				value = '<uuid>{}'
			}
			if (value) {
				properties = this.addItemComma(properties, `${prop.propName} := ${value}`)
			}
		})

		if (!properties) properties = `dummy:= <str>{}`
		properties = `SELECT {\n${properties}\n}`
		return properties
	}

	getPropsSelectDataItems(parms: DataRecord, queryData: TokenApiQueryData) {
		const clazz = 'getPropsSelectDataItems'
		const props = required(parms.props, clazz, 'props') as RawDataObjPropDB[]
		const isFilterCurrentValue = required(parms.isFilterCurrentValue, clazz, 'isFilterCurrentValue')

		let properties = ''

		props.forEach((prop) => {
			if (prop._linkItemsSource) {
				properties = this.addItemComma(
					properties,
					this.getPropsSelectDataItemsContent(prop, queryData, isFilterCurrentValue)
				)
			}
		})
		const script = properties ? `SELECT {\n${properties}\n}` : ''
		return script
	}

	getPropsSelectDataItemsContent(
		prop: RawDataObjPropDB,
		queryData: TokenApiQueryData,
		isFilterCurrentValue: boolean
	) {
		const clazz = 'getPropsSelectDataItemsContent'
		let script = new Script(this, queryData, ScriptExePost.formatData)
		const defn = new PropLinkItemsSource(prop._linkItemsSource)
		if (defn.parmName) queryData.dataTab?.parms.update({ itemsParmName: defn.parmName })

		// shape
		let shape = 'data := .id'
		defn.props.forEach((prop) => {
			shape += `, ${prop.key} := ${prop.expr}`
		})
		shape = `{${shape}}`

		// sort
		const sort = defn.getSortProps().reduce((sort, prop) => {
			if (sort) sort += ' THEN '
			return (sort += `.${prop.key}`)
		}, '')

		const filter = defn.exprFilter ? evalExpr(defn.exprFilter, queryData) : ''
		const orderBy = defn.exprSort ? `ORDER BY ${defn.exprSort}` : sort ? `ORDER BY ${sort}` : ''

		// table
		const dataObjTable = this.getTableRootObj()
		let table = defn.table?.object
		table = table === dataObjTable ? `DETACHED ${table}` : table

		// preset - script = `SELECT ${table} ${shapeCustom} ${filerCustom} ${orderCustom}`
		// retrieve - script = `(SELECT DISTINCT (SELECT ((SELECT ${table} FILTER ${filter}) UNION (currentValue)))${shape} ${orderBy})`

		if (defn.exprWith) {
			script.addItem('values', { withContent: defn.exprWith })
			script.addItem('with', { content: ['withContent'] })
		}
		script.addItem('values', { shape, orderBy })

		if (isFilterCurrentValue) {
			// core select
			script.addItem('action', { type: 'SELECT', table })
			if (filter) script.addItem('filter', { exprFilter: filter })
			script.addItem('wrap', { key: 'select0', open: '(', content: ['action', 'filter'] })

			// current value
			let currentValue = ''
			if (prop.codeDataType === PropDataType.link) {
				const linkDataType = prop.isMultiSelect ? 'uuidList' : 'uuid'
				currentValue = prop.childTableTraversal
					? `(SELECT ${table} FILTER .id = <record,${linkDataType},${prop.propName}>)`
					: '{}'
			} else {
				error(500, {
					file: FILENAME,
					function: 'getPropsSelectDataItemsContent',
					message: `No option defined for codeDataType: ${prop.codeDataType} for prop: ${prop.propName}.`
				})
			}

			script.addItem('values', { currentValue })
			script.addItem('wrap', { key: 'select1', open: 'UNION (', content: ['currentValue'] })

			// wrap selects
			script.addItem('wrap', { key: 'select2', open: 'SELECT (', content: ['select0', 'select1'] })

			// wrap distinct
			script.addItem('wrap', { key: 'body', open: 'SELECT DISTINCT (', content: ['select2'] })

			script.addItem('script', { content: ['body', 'shape', 'orderBy'] })
		} else {
			script.addItem('action', { type: 'SELECT', table })
			if (filter) script.addItem('filter', { exprFilter: filter })
			script.addItem('combine', { key: 'body', content: ['action', 'shape', 'filter', 'orderBy'] })
			script.addItem('script', { content: ['body'] })
		}
		script.build()
		script.script = `${`_items_${prop.propName}`} := (${script.script})`
		return script.script
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
