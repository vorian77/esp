import { ApiResult } from '$routes/api/api'
import {
	TokenApiDbDataObjSource,
	TokenApiQuery,
	TokenApiQueryData,
	TokenApiQueryType
} from '$utils/types.token'
import {
	debug,
	debugData,
	DataObj,
	DataObjData,
	DataRecordStatus,
	DataRow,
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
import { getDataObjById, getDataObjByName, queryMultiple } from '$routes/api/dbEdge/types.dbEdge'
import { evalExpr } from '$routes/api/dbEdge/dbEdgeGetVal'
import type { RawDataList } from '$routes/api/dbEdge/types.dbEdge'
import { ScriptExePost, ScriptGroup } from '$routes/api/dbEdge/dbEdgeScript'
import { getRawDataObjDynamic } from '$routes/api/dbEdge/dbEdgeProcessDynDO'
import { error } from '@sveltejs/kit'

const FILENAME = 'server/dbEdgeQueryProcessor.ts'

export async function processDataObj(token: TokenApiQuery) {
	debug('processDataObj', 'queryType', token.queryType)
	const queryData = TokenApiQueryData.load(token.queryData)

	let { rawDataObj, returnRawData } = await getRawDataObj(token.dataObjSource, queryData)
	debug('processDataObj', 'rawDataObj.name', rawDataObj.name)

	const query = new Query(rawDataObj)
	let scriptGroup: ScriptGroup

	switch (token.queryType) {
		case TokenApiQueryType.expression:
			const expr = strRequired(
				rawDataObj.exprObject,
				`${FILENAME}.${rawDataObj.name}.processDataObj.expression`,
				'rawDataObj.exprObject'
			)
			return new ApiResult(true, await executeExpr(expr, queryData))

		case TokenApiQueryType.preset:
			scriptGroup = new ScriptGroup(token.queryType, query, queryData)
			const processRowSelectPreset = new ProcessRowSelectPreset(
				query.rawDataObj.rawPropsSelect,
				DataRecordStatus.preset
			)
			return execute(
				query,
				scriptGroup,
				rawDataObj,
				returnRawData,
				queryData,
				processRowSelectPreset
			)

		case TokenApiQueryType.retrieve:
			scriptGroup = new ScriptGroup(token.queryType, query, queryData)
			const processRowSelect = new ProcessRowSelect(
				query.rawDataObj.rawPropsSelect,
				DataRecordStatus.retrieved
			)
			return execute(query, scriptGroup, rawDataObj, returnRawData, queryData, processRowSelect)

		case TokenApiQueryType.save:
			scriptGroup = new ScriptGroup(token.queryType, query, queryData)
			const processRowUpdate = new ProcessRowUpdate(
				query.rawDataObj.rawPropsSelect,
				queryData.dataSave
			)
			return execute(query, scriptGroup, rawDataObj, returnRawData, queryData, processRowUpdate)

		default:
			error(500, {
				file: FILENAME,
				function: 'processQuery',
				message: `No case defined for row TokenApiDbQueryType: ${token.queryType}`
			})
	}
}

async function execute(
	query: Query,
	scriptGroup: ScriptGroup,
	rawDataObj: RawDataObj,
	returnRawData: boolean,
	queryData: TokenApiQueryData,
	process: ProcessRow
) {
	const data = new DataObjData(rawDataObj.codeCardinality)

	for (let i = 0; i < scriptGroup.scripts.length; i++) {
		const script = scriptGroup.scripts[i]
		if (script) {
			const rawDataList = await executeQuery(script.script)
			switch (script.exePost) {
				case ScriptExePost.formatData:
					formatData(data, rawDataList, process)
					break
				case ScriptExePost.none:
					break
				case ScriptExePost.processRowSelectPreset:
					const processRowListEdit = new ProcessRowSelectPreset(
						query.rawDataObj.rawPropsSelect,
						DataRecordStatus.preset
					)
					formatData(data, rawDataList, processRowListEdit)
					break

				default:
					error(500, {
						file: FILENAME,
						function: 'execute',
						message: `No case defined for row script.exePost: ${script.exePost}`
					})
			}
		}
	}
	// Data Items
	const scriptDataItems = scriptGroup.initScriptDataItems(query, queryData, data)
	if (scriptDataItems.script) {
		const rawDataItems = await executeQuery(scriptDataItems.script)
		data.items = rawDataItems[0]
	}

	// return
	debugData('execute', 'data.dataRows.formatted.records', data.dataRows)
	let returnData = returnRawData ? { dataObjData: data, rawDataObj } : { dataObjData: data }
	return new ApiResult(true, returnData)
}
export async function executeExpr(expr: string, queryData: TokenApiQueryData) {
	const query = evalExpr(expr, queryData)
	return await executeQuery(query)
}

export async function executeQuery(query: string): Promise<RawDataList> {
	debug('executeQuery', 'query', query)
	return await queryMultiple(query)
}

function formatData(dataReturn: DataObjData, rawDataList: RawDataList, process: ProcessRow) {
	rawDataList.forEach((row) => {
		process.processRow(dataReturn, row)
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
			const valueSource = value
			value = !value || Object.entries(value).length === 0 ? '' : value
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
			// return value || ['0', 0].includes(value) ? value : ''
			return value || ['0', 0].includes(value) ? value : null
	}
}

async function getRawDataObj(dataObjSource: TokenApiDbDataObjSource, queryData: TokenApiQueryData) {
	let dbDataObj: any
	let rawDataObj: RawDataObj
	let returnRawData = false

	if (
		Object.hasOwn(dataObjSource.sources, 'rawDataObj') &&
		!dataObjSource.sources.rawDataObj.isAlwaysRetrieveDataObject
	) {
		rawDataObj = dataObjSource.sources.rawDataObj
	} else {
		returnRawData = true

		if (Object.hasOwn(dataObjSource.sources, 'dataObjId')) {
			dbDataObj = await getDataObjById(dataObjSource.sources.dataObjId)
		} else if (Object.hasOwn(dataObjSource.sources, 'dataObjName')) {
			dbDataObj = await getDataObjByName(dataObjSource.sources.dataObjName)
		}
		rawDataObj = new RawDataObj(dbDataObj)
		rawDataObj = await getRawDataObjDynamic(queryData, rawDataObj)
	}

	if (rawDataObj) {
		if (Object.hasOwn(dataObjSource.replacements, 'exprFilter')) {
			rawDataObj.exprFilter = dataObjSource.replacements.exprFilter
		}
		if (Object.hasOwn(dataObjSource.replacements, 'parent')) {
			rawDataObj.rawParent = dataObjSource.replacements.parent
		}

		return { rawDataObj, returnRawData }
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
	return new ApiResult(true, executeExpr(queryData.parms.expr, queryData))
}

class ProcessRow {
	propNames: string[] = []
	propsSelect: RawDataObjPropDB[]
	constructor(propsSelect: RawDataObjPropDB[]) {
		this.propNames = propsSelect.map((prop) => prop.propName)
		this.propsSelect = propsSelect
	}
	processRow(dataReturn: DataObjData, recordRaw: DataRecord) {
		this.propsSelect.forEach((prop) => {
			if (prop.codeDataSourceValue === PropDataSourceValue.calculate && prop.exprCustom) {
				recordRaw[prop.propName] = this.evalExpr(prop.exprCustom, recordRaw, this.propNames)
			}
		})
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
		return eval(newExpr)
	}
}

class ProcessRowSelect extends ProcessRow {
	status: DataRecordStatus
	constructor(propsSelect: RawDataObjPropDB[], status: DataRecordStatus) {
		super(propsSelect)
		this.status = status
	}
	processRow(dataReturn: DataObjData, recordRaw: DataRecord) {
		super.processRow(dataReturn, recordRaw)
		this.processRowProps(dataReturn, recordRaw, this.status)
	}
	processRowProps(dataReturn: DataObjData, recordRaw: DataRecord, status: DataRecordStatus) {
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
		dataReturn.addRow(status, recordReturn)
	}
}

class ProcessRowSelectPreset extends ProcessRowSelect {
	rowIndex: number = -1
	constructor(propsSelect: RawDataObjPropDB[], status: DataRecordStatus) {
		super(propsSelect, status)
	}
	processRow(dataReturn: DataObjData, recordRaw: DataRecord) {
		recordRaw.id = `preset_${++this.rowIndex}`
		super.processRow(dataReturn, recordRaw)
	}
}

class ProcessRowUpdate extends ProcessRow {
	dataSave: DataObjData
	constructor(propsSelect: RawDataObjPropDB[], dataSave: DataObjData | undefined) {
		const clazz = 'ProcessRowUpdate'
		super(propsSelect)
		this.dataSave = required(dataSave, clazz, 'dataSave')
	}
	processRow(dataReturn: DataObjData, recordRaw: DataRecord) {
		super.processRow(dataReturn, recordRaw)
		let newStatus: DataRecordStatus = DataRecordStatus.inserted
		const recordIdx = this.dataSave.dataRows.findIndex(
			(dataRow) => dataRow.record.id === recordRaw.id
		)
		if (recordIdx > -1) {
			const oldStatus = this.dataSave.dataRows[recordIdx].status
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
		this.processRowProps(dataReturn, recordRaw, newStatus)
	}
	processRowProps(dataReturn: DataObjData, recordReturn: DataRecord, status: DataRecordStatus) {
		const clazz = 'ProcessRowUpdate.processRowProps'
		this.propsSelect.forEach((prop) => {
			if (prop.codeDataType === PropDataType.link) {
				const recordKeyLink = '_' + prop.propName
				recordReturn[prop.propName] = recordReturn[recordKeyLink]
				delete recordReturn[recordKeyLink]
			}
			recordReturn[prop.propName] = formatDataForDisplay(
				prop,
				prop.codeDataType,
				recordReturn[prop.propName]
			)
		})
		dataReturn.addRow(status, recordReturn)
	}
}
