import {
	PropDataSourceValue,
	RawDataObj,
	RawDataObjPropDB
} from '$comps/dataObj/types.rawDataObj.svelte'
import { FieldEmbed } from '$comps/form/fieldEmbed'
import {
	DbTable,
	QuerySource,
	QuerySourceParent,
	type RawDataList
} from '$lib/queryClient/types.queryClient'
import { nbrOrDefault, valueOrDefault } from '$lib/utils/utils'
import { evalExpr, EvalValue, getUUID, getValDb } from '$utils/utils.evalParserDb'
import {
	classOptional,
	DataObjData,
	type DataRecord,
	DataRecordStatus,
	DataRow,
	DataRows,
	debug,
	FieldEmbedType,
	formatDateTime,
	MethodResult,
	ParmsValuesType,
	PropDataType,
	PropNamePrefixType,
	required,
	strRequired
} from '$utils/types'
import { TokenApiQueryData } from '$utils/types.token'
import { error } from '@sveltejs/kit'
import type { Method } from 'axios'

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

	async dataFormat(rawDataList: RawDataList): Promise<MethodResult> {
		let dataRows: DataRows = new DataRows()
		if (this.formatData) {
			let result: MethodResult = await this.dataFormatData(rawDataList, this.formatData)
			if (result.error) return result
			dataRows = result.data as DataRows
		}
		return new MethodResult(dataRows)
	}
	async dataFormatData(rawDataList: RawDataList, formatData: FormatData): Promise<MethodResult> {
		let dataRows: DataRows = new DataRows()
		for (const record of rawDataList) {
			let result: MethodResult = await formatData.processRow(record)
			if (result.error) return result
			dataRows.add(result.data as DataRow)
		}
		return new MethodResult(dataRows)
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
	getpropsListPresetInsert(parms: DataRecord) {
		const clazz = 'getpropsListPresetInsert'
		const props = required(parms.props, clazz, 'props') as RawDataObjPropDB[]
		let properties = ''

		props.forEach((propObj) => {
			const clazzProp = `${clazz}.${propObj.propName}`
			const exprPreset = strRequired(propObj.exprPreset, clazzProp, 'exprPreset')
			const propExpr = propObj.link
				? propObj.isLinkSignature
					? `{data := ${exprPreset}.id}`
					: `{data := ${exprPreset}}`
				: exprPreset

			const prop = `${propObj.propName} := ${propExpr}`
			properties = this.addItemComma(properties, prop)
		})

		if (properties) properties = `{\n${properties}\n}`
		return properties
	}

	async getPropsListPresetSave(
		parms: DataRecord,
		queryData: TokenApiQueryData
	): Promise<MethodResult> {
		const clazz = 'getPropsListPresetSave'
		const props = required(parms.props, clazz, 'props') as RawDataObjPropDB[]
		let properties = ''

		for (let propObj of props) {
			const clazzProp = `${clazz}.${propObj.propName}`
			const exprRaw = strRequired(propObj.exprPreset, clazzProp, 'exprRaw')

			let result: MethodResult = await evalExpr({
				evalExprContext: this.evelExprContext,
				exprRaw,
				queryData,
				querySource: this.querySource
			})
			if (result.error) return result
			const exprEvaluated: string = result.data
			const prop = `${propObj.propNameRaw} := ${exprEvaluated}`
			properties = this.addItemComma(properties, prop)
		}

		if (properties) properties = `{\n${properties}\n}`
		return new MethodResult(properties)
	}

	async getPropsSave(
		propsRaw: RawDataObjPropDB[],
		query: GelQuery,
		dataRows: DataRow[],
		parms: DataRecord
	): Promise<MethodResult> {
		const clazz = 'getPropsSave'
		let properties: string[] = []
		let fValues: Function[] = []
		const indexTable = required(parms.indexTable, clazz, 'indexTable')

		// 1. build props, subObjGroup
		const propsSave = propsRaw.filter((p) => p.indexTable === indexTable)
		for (let i = 0; i < propsSave.length; i++) {
			const p = propsSave[i]
			if (!p.fieldEmbed) {
				let result: MethodResult = await this.getPropsSavePropExpr(i, p, query, fValues)
				if (result.error) return result

				const propDB = `${p.propNameRaw} := ${result.data}`
				properties.push(propDB)

				// format values
				dataRows.forEach((dataRow) => {
					dataRow.record[p.propName] = fValues[i](dataRow.getValue(p.propName))
				})
			}
		}

		return new MethodResult(properties)
	}

	async getPropsSavePropExpr(
		propIdx: number,
		propObj: RawDataObjPropDB,
		query: GelQuery,
		fValues: Function[]
	): Promise<MethodResult> {
		const clazz = 'getPropsSavePropExpr'
		let propExpr = ''
		const clazzProp = `${clazz}.${propObj.propName}`

		let exprRaw =
			!query.rawDataObj.rawQuerySource.listPresetExpr && propObj.exprSave ? propObj.exprSave : ''

		const setValueFunction = (idx: number, f: Function) => {
			fValues[idx] = f
		}

		if (exprRaw) {
			let result: MethodResult = await evalExpr({
				evalExprContext: this.evelExprContext,
				exprRaw,
				queryData: query.queryData,
				querySource: this.querySource
			})
			if (result.error) return result
			const exprEvaluated: string = result.data
			setValueFunction(propIdx, (rawValue: any) => {
				return exprEvaluated && propObj.isSelfReference
					? 'DETACHED ' + exprEvaluated
					: exprEvaluated
			})
			propExpr = `${exprEvaluated}`
		} else {
			let item = `json_get(item, '${propObj.propName}')`

			let result: MethodResult = getValDb(propObj.codeDataType, undefined)
			if (result.error) return result
			const evalValue: EvalValue = result.data
			switch (evalValue.dataTypeDb) {
				case '<cal::local_date>':
				case '<datetime>':
				case '<float64>':
				case '<int16>':
				case '<int32>':
				case '<int64>':
					setValueFunction(propIdx, (rawValue: any) => {
						return rawValue === undefined || rawValue === null ? '' : rawValue.toString()
					})
					propExpr = `(SELECT ${evalValue.dataTypeDb}{} IF <str>${item} = '' ELSE ${evalValue.dataTypeDb}<str>${item})`
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

				default:
					setValueFunction(propIdx, (rawValue: any) => {
						return rawValue
					})
					propExpr = `${evalValue.dataTypeDb}${item}`
			}
		}
		return new MethodResult(propExpr)
	}

	getPropsSelect(parms: DataRecord) {
		const clazz = 'getPropsSelect'
		let properties = ''
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
				propValue = `.${propChildTableTraversal} ${prop.link.exprProps}`
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
				expr = `${expr} ${prop.link.exprProps}`
			}

			properties = this.addItemComma(properties, `${prop.propName} := ${expr}`)
		})

		if (!properties) properties = `dummy:= <str>{}`
		properties = `SELECT {\n${properties}\n}`
		return properties
	}

	getSort() {
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
	async evalExprCalc(expr: string, DataRecord: DataRecord, propNames: string[]) {
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
		let result: MethodResult = await evalExpr({
			evalExprContext: this.evalExprContext,
			exprRaw: newExpr,
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

	async prepRecord(recordRaw: DataRecord): Promise<MethodResult> {
		for (const prop of this.propsSelect) {
			if (prop.codeDataSourceValue === PropDataSourceValue.calculate && prop.exprCustom) {
				let result: MethodResult = await this.evalExprCalc(
					prop.exprCustom,
					recordRaw,
					this.propNames
				)
				if (result.error) return result
				recordRaw[prop.propName] = result.data
			}
		}
		return new MethodResult()
	}
	async processRow(recordRaw: DataRecord): Promise<MethodResult> {
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
	async processRow(recordRaw: DataRecord): Promise<MethodResult> {
		let result: MethodResult = await this.prepRecord(recordRaw)
		if (result.error) return result
		return this.processRowProps(recordRaw, this.status)
	}
	processRowProps(recordRaw: DataRecord, status: DataRecordStatus): MethodResult {
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
	async prepRecord(recordRaw: DataRecord) {
		let result: MethodResult = await super.prepRecord(recordRaw)
		if (result.error) return result
		return new MethodResult((recordRaw.id = `preset_${++this.rowIndex}`))
	}
}

class FormatDataUpdate extends FormatData {
	rowsSave: DataRows
	constructor(obj: any) {
		const clazz = 'FormatDataUpdate.constructor'
		super(obj)
		// const source = obj.source ? obj.source : new DataRows()
		this.rowsSave = obj.rowsSave
	}
	async processRow(recordRaw: DataRecord): Promise<MethodResult> {
		let result: MethodResult = await this.prepRecord(recordRaw)
		if (result.error) return result

		let newStatus: DataRecordStatus = DataRecordStatus.inserted
		const recordIdx = this.rowsSave.dataRows.findIndex(
			(dataRow) => dataRow.record.id === recordRaw.id
		)
		if (recordIdx > -1) {
			const oldStatus = this.rowsSave.dataRows[recordIdx].status
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
