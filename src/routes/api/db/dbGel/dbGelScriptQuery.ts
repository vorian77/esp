import {
	PropDataSourceValue,
	RawDataObj,
	RawDataObjPropDB
} from '$comps/dataObj/types.rawDataObj.svelte'
import { FieldEmbed } from '$comps/form/fieldEmbed'
import { DbTable, QuerySource, QuerySourceParent, type RawDataList } from '$lib/query/types.query'
import { nbrOrDefault, valueOrDefault } from '$lib/utils/utils'
import {
	evalExpr,
	evalExprTokens,
	ExprElementToken,
	getUUID,
	getValDb
} from '$routes/api/db/dbScriptEval'
import {
	classOptional,
	DataObjCardinality,
	DataObjData,
	type DataRecord,
	DataRecordStatus,
	DataRow,
	DataRows,
	FieldEmbedType,
	formatDateTime,
	MethodResult,
	ParmsValuesType,
	PropDataType,
	PropLinkItemsSource,
	PropNamePrefixType,
	required,
	strRequired
} from '$utils/types'
import { TokenApiQueryData } from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '/$routes/api/dbGel/dbGelScriptDQuery.ts'

export class GelQuery {
	evelExprContext: string
	fieldEmbed?: FieldEmbed
	formatData?: FormatData
	parent?: QuerySourceParent
	queryData: TokenApiQueryData
	querySource: QuerySource
	rawDataObj: RawDataObj

	constructor(obj: any) {
		const clazz = 'GelQuery'
		obj = valueOrDefault(obj, {})
		this.evelExprContext = strRequired(obj.evalExprContext, clazz, 'evalExprContext')
		this.fieldEmbed = obj.fieldEmbed
		this.queryData = required(obj.queryData, clazz, 'queryData')
		this.querySource = required(obj.querySource, clazz, 'querySource')
		this.rawDataObj = required(obj.rawDataObj, clazz, 'rawDataObj')

		// derived
		this.parent = classOptional(QuerySourceParent, this.rawDataObj.rawQuerySource._parent)
		if (this.fieldEmbed && this.fieldEmbed.embedType === FieldEmbedType.listSelect) {
			this.parent = new QuerySourceParent({
				_columnName: this.fieldEmbed.embedFieldNameRaw,
				_columnIsMultiSelect: true,
				_filterExpr: 'none',
				_table: this.fieldEmbed.parentTable
			})
		}
	}

	initReturnData(
		rawDataObj: RawDataObj,
		queryData: TokenApiQueryData | undefined,
		fieldEmbed: FieldEmbed | undefined
	) {
		const clazz = 'initReturnData'
		const queryDataSource = required(queryData, clazz, 'queryData')
		const dataSource = fieldEmbed ? fieldEmbed.data : queryDataSource.dataTab
		let result: MethodResult = DataObjData.load(dataSource)
		if (result.error) {
			error(500, {
				file: FILENAME,
				function: 'GelQuery.initReturnData',
				msg: `Invalid dataSource`
			})
		}
		let returnData: DataObjData = result.data
		if (!returnData.rawDataObj) returnData.rawDataObj = rawDataObj
		returnData.reset()
		returnData.parms.update(queryDataSource.dataTab?.parms.valueGetAll())
		return returnData
	}

	addItem(list: string, item: string, separator: string) {
		return list ? list + separator + '\n' + item : item
	}
	addItemComma(list: string, item: string) {
		return this.addItem(list, item, ',')
	}

	dataFormat(rawDataList: RawDataList): DataRows {
		let dataRows: DataRows = new DataRows()
		if (this.formatData) dataRows = this.dataFormatData(rawDataList, this.formatData)
		return dataRows
	}
	dataFormatData(rawDataList: RawDataList, formatData: FormatData): DataRows {
		let dataRows: DataRows = new DataRows()
		rawDataList.forEach((record) => {
			let result: MethodResult = formatData.processRow(record)
			dataRows.add(result.data as DataRow)
		})
		return dataRows
	}
	dataFormatSetSelect(obj: DataRecord) {
		this.formatData = new FormatDataSelect(obj)
	}

	dataFormatSetSelectPreset(obj: DataRecord) {
		this.formatData = new FormatDataSelectPreset(obj)
	}

	dataFormatSetUpdate(obj: DataRecord) {
		this.formatData = new FormatDataUpdate(obj)
	}

	getFilter(queryData: TokenApiQueryData) {
		let filter = ''

		if (!this.rawDataObj.rawQuerySource.exprFilter) {
			filter = `.id = <tree,uuid,id>`
		} else if (this.rawDataObj.rawQuerySource.exprFilter?.toLowerCase() !== 'none') {
			filter = this.rawDataObj.rawQuerySource.exprFilter
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
			if (
				this.rawDataObj.rawQuerySource.exprFilter &&
				this.rawDataObj.rawQuerySource.exprFilter.indexOf(token) > -1
			) {
				this.rawDataObj.rawQuerySource.exprFilter =
					this.rawDataObj.rawQuerySource.exprFilter.replaceAll(token, queryData.attrAccessFilter)
				parmAttributeAccessFilter = true
			}
			if (
				this.rawDataObj.rawQuerySource.exprWith &&
				this.rawDataObj.rawQuerySource.exprWith.indexOf(token) > -1
			) {
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
				let result: MethodResult = evalExprTokens({
					evalExprContext: this.evelExprContext,
					expr,
					queryData,
					querySource: this.querySource
				})
				if (result.error) return result
				const expressions: ExprElementToken[] = result.data
				if (expressions.length === 1) {
					const exprToken = expressions[0].elRaw
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
		query: GelQuery,
		dataRows: DataRow[],
		parms: DataRecord
	) {
		const clazz = 'getPropsSave'
		let properties: string[] = []
		let fValues: Function[] = []
		const indexTable = required(parms.indexTable, clazz, 'indexTable')
		const action = strRequired(parms.action, clazz, 'action') as LinkSaveAction

		// 1. build props, subObjGroup
		propsRaw
			.filter((p) => p.indexTable === indexTable)
			.forEach((p, idx) => {
				if (!p.fieldEmbed) {
					const propDB = `${p.propNameRaw} := ${this.getPropsSavePropExpr(action, idx, p, query, fValues)}`
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
		query: GelQuery,
		fValues: Function[]
	) {
		const clazz = 'getPropsSavePropExpr'
		let propExpr = ''
		const clazzProp = `${clazz}.${propObj.propName}`

		let expr =
			!query.rawDataObj.rawQuerySource.listEditPresetExpr && propObj.exprSave
				? propObj.exprSave
				: ''

		const setValueFunction = (idx: number, f: Function) => {
			fValues[idx] = f
		}

		if (expr) {
			let result: MethodResult = evalExprTokens({
				evalExprContext: this.evelExprContext,
				expr,
				queryData: query.queryData,
				querySource: this.querySource
			})
			if (result.error) return result
			const expressions: ExprElementToken[] = result.data
			if (expressions.length === 1) {
				const exprToken = expressions[0].elRaw
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

			let result: MethodResult = getValDb(propObj.codeDataType, undefined)
			if (result.error) return result
			const { dataType, valueDB } = result.data

			let propTableObj = strRequired(
				this.rawDataObj.tableGroup.getTableObj(propObj.indexTable),
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
					propTableObj =
						propTableObj === this.getTableRootObj() ? `DETACHED ${propTableObj}` : propTableObj
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
							propObj.linkItemsSource.querySource.table?.object,
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

	getPropsSelect(parms: DataRecord) {
		const clazz = 'getPropsSelect'
		let properties = ''
		const isCardinalityDetail = this.rawDataObj.codeCardinality === DataObjCardinality.detail
		const props = required(parms.props, clazz, 'props') as RawDataObjPropDB[]
		const processProps = (query: GelQuery) => {
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

		function processPropsSelectItem(prop: RawDataObjPropDB, query: GelQuery) {
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

		if (this.rawDataObj.rawQuerySource.exprSort) {
			script = this.rawDataObj.rawQuerySource.exprSort
		} else {
			this.rawDataObj.rawPropsSort.forEach((prop) => {
				if (script) script += ' THEN '
				script += `.${prop.propName} ${prop.codeSortDir}`
			})
		}

		if (script) script = 'ORDER BY ' + script
		return script
	}

	getTableRootObj() {
		return this.rawDataObj.tableGroup.getTableObj(0)
	}
	setProcessRow(processRow: FormatData) {
		this.formatData = processRow
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
	table: DbTable
	traversalFromRoot: string
	constructor(obj: any, tables: ObjTable[]) {
		obj = valueOrDefault(obj, {})
		const clazz = 'ObjTable'
		this.columnParent = obj._columnParent
		this.index = required(obj.index, clazz, 'index')
		this.isRoot = this.index === 0
		this.parentObjTable =
			obj.indexParent > -1 ? tables.find((table) => table.index === obj.indexParent) : undefined
		this.table = new DbTable(obj._table)
		this.traversalFromRoot =
			this.parentObjTable && obj._columnParent
				? this.parentObjTable.traversalFromRoot
					? this.parentObjTable.traversalFromRoot + '.' + obj._columnParent
					: obj._columnParent
				: ''
	}
}

class FormatData {
	dummyQueryData: TokenApiQueryData = new TokenApiQueryData({})
	evalExprContext: string
	propNames: string[] = []
	propsSelect: RawDataObjPropDB[]
	querySource: QuerySource
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'FormatData.constructor'
		this.evalExprContext = strRequired(obj.evalExprContext, clazz, 'evalExprContext')
		this.propsSelect = required(obj.propsSelect, clazz, 'propsSelect')
		this.querySource = required(obj.querySource, clazz, 'querySource')

		// derived
		this.propNames = this.propsSelect.map((prop) => prop.propName)
	}
	evalExprCalc(expr: string, DataRecord: DataRecord, propNames: string[]) {
		const clazz = 'evalExprCalc'
		const regex = /\.\w+/g
		let newExpr = expr
		const iter = expr.matchAll(regex)
		for (const match of iter) {
			const key = match[0].substring(1)
			const propName = propNames.find((prop) => prop.endsWith(key))
			if (propName) {
				newExpr = newExpr.replace(`.${key}`, DataRecord[propName])
			}
		}
		let result: MethodResult = evalExpr({
			expr: newExpr,
			evalExprContext: this.evalExprContext,
			queryData: this.dummyQueryData,
			querySource: this.querySource
		})
		if (result.error) return result
		return new MethodResult(Function('return ' + result.data)())
	}

	formatDataForDisplay(prop: RawDataObjPropDB, propDataType: PropDataType, value: any) {
		switch (propDataType) {
			// scalar
			case PropDataType.bool:
			case PropDataType.date:
			case PropDataType.datetime:
			case PropDataType.float64:
			case PropDataType.int16:
			case PropDataType.int32:
			case PropDataType.int64:
			case PropDataType.str:
			case PropDataType.uuid:
				value = this.formatDataForDisplayScalar(propDataType, value)
				break

			// complex
			case PropDataType.json:
				// value = value && Object.entries(value).length > 0 ? value : undefined
				// no change
				break

			case PropDataType.attribute:
			case PropDataType.items:
			case PropDataType.link:
				if (value && Object.hasOwn(value, 'value')) value = value.value
				value = prop.isMultiSelect ? (value ? value : []) : value ? value : ''
				break

			case PropDataType.none:
				value = '{}'
				break

			default:
				error(500, {
					file: FILENAME,
					function: `formatDataForDisplay`,
					msg: `No case defined for prop: ${prop.propName} - propDataType: ${propDataType}`
				})
		}
		return value
	}
	formatDataForDisplayScalar(codeDataTypeField: PropDataType, value: any): any {
		switch (codeDataTypeField) {
			case PropDataType.bool:
				return ['', undefined, null].includes(value) ? false : value

			case PropDataType.datetime:
				return value ? formatDateTime(value) : ''

			default:
				return value || ['0', 0].includes(value) ? value : null
		}
	}

	prepRecord(recordRaw: DataRecord) {
		this.propsSelect.forEach((prop) => {
			if (prop.codeDataSourceValue === PropDataSourceValue.calculate && prop.exprCustom) {
				let result: MethodResult = this.evalExprCalc(prop.exprCustom, recordRaw, this.propNames)
				if (result.error) return result
				recordRaw[prop.propName] = result.data
			}
		})
		return new MethodResult()
	}
	processRow(recordRaw: DataRecord): MethodResult {
		return new MethodResult(new DataRow(DataRecordStatus.retrieved, recordRaw))
	}
}

class FormatDataSelect extends FormatData {
	status: DataRecordStatus
	constructor(obj: any) {
		const clazz = 'FormatDataSelect.constructor'
		obj = valueOrDefault(obj, {})
		super(obj)
		this.status = required(obj.status, clazz, 'status')
	}
	processRow(recordRaw: DataRecord) {
		let result: MethodResult = this.prepRecord(recordRaw)
		if (result.error) return result
		return this.processRowProps(recordRaw, this.status)
	}
	processRowProps(recordRaw: DataRecord, status: DataRecordStatus) {
		const clazz = 'FormatDataSelect.processRowProps'
		let recordReturn: DataRecord = {}
		this.propsSelect.forEach((prop) => {
			if (Object.hasOwn(recordRaw, prop.propName)) {
				recordReturn[prop.propName] = this.formatDataForDisplay(
					prop,
					prop.codeDataType,
					recordRaw[prop.propName]
				)
			} else {
				recordReturn[prop.propName] = this.formatDataForDisplay(prop, prop.codeDataType, undefined)
			}
		})
		return new MethodResult(new DataRow(status, recordReturn))
	}
}

class FormatDataSelectPreset extends FormatDataSelect {
	rowIndex: number = -1
	constructor(obj: any) {
		const clazz = 'FormatDataSelectPreset.constructor'
		super(obj)
	}
	prepRecord(recordRaw: DataRecord) {
		let result: MethodResult = super.prepRecord(recordRaw)
		if (result.error) return result
		return new MethodResult((recordRaw.id = `preset_${++this.rowIndex}`))
	}
}

class FormatDataUpdate extends FormatData {
	rowsSave: DataRow[]
	constructor(obj: any) {
		const clazz = 'FormatDataUpdate.constructor'
		super(obj)
		const source = obj.source ? obj.source : new DataRows()
		this.rowsSave = source.getRows()
	}
	processRow(recordRaw: DataRecord): MethodResult {
		let result: MethodResult = this.prepRecord(recordRaw)
		if (result.error) return result

		let newStatus: DataRecordStatus = DataRecordStatus.inserted
		const recordIdx = this.rowsSave.findIndex((dataRow) => dataRow.record.id === recordRaw.id)
		if (recordIdx > -1) {
			const oldStatus = this.rowsSave[recordIdx].status
			switch (oldStatus) {
				case DataRecordStatus.delete:
					newStatus = DataRecordStatus.delete
					break

				case DataRecordStatus.retrieved:
				case DataRecordStatus.update:
					newStatus = DataRecordStatus.update
					break

				default:
					return new MethodResult({
						success: false,
						error: {
							file: FILENAME,
							function: 'ProcessRowUpdate.processRow',
							msg: `No case defined for row status: ${oldStatus}`
						}
					})
			}
		}
		return this.processRowProps(recordRaw, newStatus)
	}
	processRowProps(recordReturn: DataRecord, status: DataRecordStatus): MethodResult {
		this.propsSelect.forEach((prop) => {
			if (prop.propNamePrefixType !== PropNamePrefixType.linkItems) {
				recordReturn[prop.propName] = this.formatDataForDisplay(
					prop,
					prop.codeDataType,
					recordReturn[prop.propName]
				)
			}
		})
		return new MethodResult(new DataRow(status, recordReturn))
	}
}
