import { ApiResult } from '$routes/api/api'
import {
	TokenApiDbDataObjSource,
	TokenApiId,
	TokenApiQuery,
	TokenApiQueryData,
	TokenApiQueryType
} from '$utils/types.token'
import {
	debug,
	debugData,
	DataObj,
	DataObjData,
	DataObjEmbedType,
	DataObjDataField,
	DataObjProcessType,
	DataRecordStatus,
	DataRow,
	DataRows,
	DBTable,
	formatDateTime,
	getArray,
	required,
	strRequired,
	DataObjCardinality
} from '$utils/types'
import {
	PropDataSourceValue,
	PropDataType,
	RawDataObj,
	RawDataObjPropDB
} from '$comps/dataObj/types.rawDataObj'
import { Query } from '$routes/api/dbEdge/dbEdgeQuery'
import type { DataRecord } from '$utils/types'
import { queryMultiple } from '$routes/api/dbEdge/dbEdgeExecute'
import { getDataObjById, getDataObjByName } from '$routes/api/dbEdge/dbEdgeUtilities'
import { evalExpr } from '$routes/api/dbEdge/dbEdgeGetVal'
import type { RawDataList } from '$routes/api/dbEdge/types.dbEdge'
import { ScriptExePost, ScriptGroup } from '$routes/api/dbEdge/dbEdgeScript'
import { getRawDataObjDynamic } from '$routes/api/dbEdge/dbEdgeProcessDynDO'
import { error } from '@sveltejs/kit'

const FILENAME = 'server/dbEdgeQueryProcess.ts'

export async function processDataObj(token: TokenApiQuery) {
	const queryData = TokenApiQueryData.load(token.queryData)
	let rawDataObj = await getRawDataObj(token.dataObjSource, queryData)

	// expression
	if (token.queryType === TokenApiQueryType.expression) {
		const expr = strRequired(
			rawDataObj.exprObject,
			`${FILENAME}.${rawDataObj.name}.processDataObj.expression`,
			'rawDataObj.exprObject'
		)
		return new ApiResult(true, await executeExpr(expr, queryData))
	}

	// queries
	const query = new Query(rawDataObj)
	let scriptGroup = new ScriptGroup()
	let returnData = new DataObjData(rawDataObj)

	await processDataObjQuery(token.queryType, query, queryData, scriptGroup, returnData)
	return processDataObjExecute(queryData, scriptGroup, returnData)
}

async function processDataObjQuery(
	queryType: TokenApiQueryType,
	query: Query,
	queryData: TokenApiQueryData,
	scriptGroup: ScriptGroup,
	returnData: DataObjData
) {
	switch (queryType) {
		case TokenApiQueryType.preset:
			returnData.fields = await DataObjDataField.init(query.rawDataObj, queryData, getRawDataObj)
			query.setProcessRow(
				new ProcessRowSelectPreset(query.rawDataObj.rawPropsSelect, DataRecordStatus.preset)
			)
			scriptGroup.addScriptPreset(query, queryData)
			scriptGroup.addScriptDataItems(query, queryData, query.rawDataObj.rawPropsSelect)
			break

		case TokenApiQueryType.retrieve:
			returnData.fields = await DataObjDataField.init(query.rawDataObj, queryData, getRawDataObj)
			query.setProcessRow(
				new ProcessRowSelect(query.rawDataObj.rawPropsSelect, DataRecordStatus.retrieved)
			)
			scriptGroup.addScriptPresetListEdit(query, queryData)
			scriptGroup.addScriptRetrieve(query, queryData)
			scriptGroup.addScriptDataItems(query, queryData, query.rawDataObj.rawPropsSelect)
			break

		case TokenApiQueryType.save:
			returnData.fields = queryData?.dataTab?.fields
			query.setProcessRow(
				new ProcessRowUpdate(query.rawDataObj.rawPropsSelect, queryData.dataTab?.rowsSave)
			)
			scriptGroup.addScriptSave(query, queryData)
			scriptGroup.addScriptDataItems(query, queryData, query.rawDataObj.rawPropsSelect)
			break

		default:
			error(500, {
				file: FILENAME,
				function: 'processQuery.processDataObjQuery',
				message: `No case defined for row TokenApiDbQueryType: ${queryType}`
			})
	}
	// embedded fields
	const EMBED_QUERY_TYPES = [TokenApiQueryType.retrieve, TokenApiQueryType.save]
	if (EMBED_QUERY_TYPES.includes(queryType)) {
		for (let i = 0; i < returnData.fields.length; i++) {
			const field = returnData.fields[i]
			queryData.dataTab = field.data
			await processDataObjQuery(
				queryType,
				new Query(field.data.rawDataObj, field),
				queryData,
				scriptGroup,
				field.data
			)
		}
	}
}

async function processDataObjExecute(
	queryData: TokenApiQueryData,
	scriptGroup: ScriptGroup,
	returnData: DataObjData
) {
	let scriptData: DataObjData
	for (let i = 0; i < scriptGroup.scripts.length; i++) {
		const script = scriptGroup.scripts[i]
		if (script.script) {
			script.evalExpr(returnData)
			const rawDataList = await executeQuery(script.script)
			scriptData = script?.query?.field ? script.query.field.data : returnData
			switch (script.exePost) {
				case ScriptExePost.dataItems:
					scriptData.items = rawDataList[0]
					break

				case ScriptExePost.formatData:
					if (script.query.processRow) formatData(scriptData, rawDataList, script.query.processRow)
					if (script.query.rawDataObj.codeCardinality === DataObjCardinality.detail) {
						queryData.recordSet(scriptData.rowsRetrieved.getDetailRecord())
					}
					break

				case ScriptExePost.none:
					break

				case ScriptExePost.processRowSelectPreset:
					const processRowListEdit = new ProcessRowSelectPreset(
						script.query.rawDataObj.rawPropsSelect,
						DataRecordStatus.preset
					)
					formatData(scriptData, rawDataList, processRowListEdit)
					break

				default:
					error(500, {
						file: FILENAME,
						function: 'processDataObjExecute',
						message: `No case defined for row script.exePost: ${script.exePost}`
					})
			}
		}
	}

	// return
	if (returnData.rowsRetrieved.getRows().length > 0) {
		debug(
			'processDataObjExecute',
			'executeQuery.row[0]',
			returnData.rowsRetrieved.getRows()[0].record
		)
	}
	return new ApiResult(true, { dataObjData: returnData })
}

async function executeExpr(expr: string, queryData: TokenApiQueryData) {
	const query = evalExpr(expr, queryData)
	return await executeQuery(query)
}

export async function executeQuery(query: string): Promise<RawDataList> {
	debug('executeQuery', 'query', query)
	return await queryMultiple(query)
}

function formatData(returnData: DataObjData, rawDataList: RawDataList, process: ProcessRow) {
	returnData.rowsRetrieved.reset()
	rawDataList.forEach((row) => {
		returnData.rowsRetrieved.add(process.processRow(row))
	})
}

function formatDataForDisplay(prop: RawDataObjPropDB, propDataType: PropDataType, value: any) {
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
			value = formatDataForDisplayScalar(propDataType, value)
			break

		// complex
		case PropDataType.json:
			// value = value && Object.entries(value).length > 0 ? value : undefined
			// no change
			break

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
				message: `No case defined for field: ${prop.propName} - propDataType: ${propDataType}`
			})
	}
	return value
}

function formatDataForDisplayScalar(codeDataTypeField: PropDataType, value: any): any {
	switch (codeDataTypeField) {
		case PropDataType.bool:
			return ['', undefined, null].includes(value) ? false : value

		case PropDataType.datetime:
			return value ? formatDateTime(value) : ''

		default:
			return value || ['0', 0].includes(value) ? value : null
	}
}

export async function getRepParmItems(token: TokenApiQueryData) {
	const queryData = TokenApiQueryData.load(token)
	const rawDataObj = await getRawDataObjDynamic(DataObjProcessType.reportParmItems, queryData, {})
	const query = new Query(rawDataObj)

	const scriptGroup = new ScriptGroup()
	scriptGroup.addScriptDataItems(query, queryData, query.rawDataObj.rawPropsRepParmItems)

	if (scriptGroup.scripts.length === 1) {
		const rawDataItems = await executeExpr(scriptGroup.scripts[0].script, queryData)
		return new ApiResult(true, rawDataItems[0])
	} else {
		error(500, {
			file: FILENAME,
			function: 'getRepParmItems',
			message: `Expected 1 script, found: ${scriptGroup.scripts.length}`
		})
	}
}

export async function getRawDataObj(
	dataObjSource: TokenApiDbDataObjSource,
	queryData: TokenApiQueryData
) {
	let dbDataObj: any
	let rawDataObj: RawDataObj

	if (Object.hasOwn(dataObjSource.sources, 'dataObjId')) {
		dbDataObj = await getDataObjById(dataObjSource.sources.dataObjId)
	} else if (Object.hasOwn(dataObjSource.sources, 'dataObjName')) {
		dbDataObj = await getDataObjByName(dataObjSource.sources.dataObjName)
	}
	rawDataObj = new RawDataObj(dbDataObj)
	rawDataObj = await getRawDataObjDynamic(rawDataObj.processType, queryData, rawDataObj)

	if (rawDataObj) {
		if (Object.hasOwn(dataObjSource.replacements, 'exprFilter')) {
			rawDataObj.exprFilter = dataObjSource.replacements.exprFilter
		}
		if (Object.hasOwn(dataObjSource.replacements, 'parent')) {
			rawDataObj.rawParent = dataObjSource.replacements.parent
		}

		return rawDataObj
	} else {
		error(500, {
			file: FILENAME,
			function: 'getRawDataObj',
			message: `Could not retrieve dataObj using sources: ${JSON.stringify(dataObjSource)}`
		})
	}
}

export async function processExpression(queryData: TokenApiQueryData) {
	queryData = TokenApiQueryData.load(queryData)
	return new ApiResult(true, executeExpr(queryData.getParms().expr, queryData))
}

export class ProcessRow {
	propNames: string[] = []
	propsSelect: RawDataObjPropDB[]
	constructor(propsSelect: RawDataObjPropDB[]) {
		this.propNames = propsSelect.map((prop) => prop.propName)
		this.propsSelect = propsSelect
	}
	evalExpr(expr: string, dataRecord: DataRecord, propNames: string[]) {
		const clazz = 'evalExpr'
		const regex = /\.\w+/g
		let newExpr = expr
		const iter = expr.matchAll(regex)
		for (const match of iter) {
			const key = match[0].substring(1)
			if (propNames.includes(key)) {
				newExpr = newExpr.replace(match[0], dataRecord[key])
			}
		}
		return Function('return ' + newExpr)()
	}
	prepRecord(recordRaw: DataRecord) {
		this.propsSelect.forEach((prop) => {
			if (prop.codeDataSourceValue === PropDataSourceValue.calculate && prop.exprCustom) {
				recordRaw[prop.propName] = this.evalExpr(prop.exprCustom, recordRaw, this.propNames)
			}
		})
	}
	processRow(recordRaw: DataRecord): DataRow {}
}

class ProcessRowSelect extends ProcessRow {
	status: DataRecordStatus
	constructor(propsSelect: RawDataObjPropDB[], status: DataRecordStatus) {
		super(propsSelect)
		this.status = status
	}
	processRow(recordRaw: DataRecord) {
		this.prepRecord(recordRaw)
		return this.processRowProps(recordRaw, this.status)
	}
	processRowProps(recordRaw: DataRecord, status: DataRecordStatus) {
		const clazz = 'ProcessRowSelect.processRowProps'
		let recordReturn: DataRecord = {}
		this.propsSelect.forEach((prop) => {
			const propName = prop.propName
			const recordKey = prop.codeDataType === PropDataType.link ? '_' + propName : propName
			if (Object.hasOwn(recordRaw, recordKey)) {
				recordReturn[propName] = formatDataForDisplay(prop, prop.codeDataType, recordRaw[recordKey])
				if (prop.hasItems) {
					const recordKeyItems = '_items' + recordKey
					if (Object.hasOwn(recordRaw, recordKeyItems)) {
						dataReturn.items[recordKeyItems] = getArray(recordRaw[recordKeyItems])
					}
				}
			} else {
				recordReturn[propName] = formatDataForDisplay(prop, prop.codeDataType, undefined)
			}
		})
		return new DataRow(status, recordReturn)
	}
}

class ProcessRowSelectPreset extends ProcessRowSelect {
	rowIndex: number = -1
	constructor(propsSelect: RawDataObjPropDB[], status: DataRecordStatus) {
		super(propsSelect, status)
	}
	prepRecord(recordRaw: DataRecord) {
		super.prepRecord(recordRaw)
		recordRaw.id = `preset_${++this.rowIndex}`
	}
}

class ProcessRowUpdate extends ProcessRow {
	rowsSave: DataRow[]
	constructor(propsSelect: RawDataObjPropDB[], source: DataRows) {
		const clazz = 'ProcessRowUpdate'
		super(propsSelect)
		this.rowsSave = source.getRows()
	}
	processRow(recordRaw: DataRecord) {
		this.prepRecord(recordRaw)
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
					error(500, {
						file: FILENAME,
						function: 'ProcessRowUpdate.processRow',
						message: `No case defined for row status: ${oldStatus}`
					})
			}
		}
		return this.processRowProps(recordRaw, newStatus)
	}
	processRowProps(recordReturn: DataRecord, status: DataRecordStatus) {
		this.propsSelect.forEach((prop) => {
			if (prop.codeDataType === PropDataType.link) {
				const recordKeyLink = '_' + prop.propName
				recordReturn[prop.propName] = recordReturn[recordKeyLink]
				delete recordReturn[recordKeyLink]
			}
			if (prop.codeDataType !== PropDataType.link) {
				recordReturn[prop.propName] = formatDataForDisplay(
					prop,
					prop.codeDataType,
					recordReturn[prop.propName]
				)
			}
		})
		return new DataRow(status, recordReturn)
	}
}
