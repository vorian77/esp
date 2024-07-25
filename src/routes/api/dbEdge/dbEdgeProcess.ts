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
	DataObjProcessType,
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
import { queryMultiple } from '$routes/api/dbEdge/dbEdgeExecute'
import { getDataObjById, getDataObjByName } from '$routes/api/dbEdge/dbEdgeUtilities'
import { evalExpr } from '$routes/api/dbEdge/dbEdgeGetVal'
import type { RawDataList } from '$routes/api/dbEdge/types.dbEdge'
import { ScriptExePost, ScriptGroup } from '$routes/api/dbEdge/dbEdgeScript'
import { getRawDataObjDynamic } from '$routes/api/dbEdge/dbEdgeProcessDynDO'
import { error } from '@sveltejs/kit'

const FILENAME = 'server/dbEdgeQueryProcess.ts'

export async function processDataObj(token: TokenApiQuery) {
	debug('processDataObj', 'queryType', token.queryType)
	const queryData = TokenApiQueryData.load(token.queryData)

	let { rawDataObj, returnRawData } = await getRawDataObj(token.dataObjSource, queryData)
	debug('processDataObj', 'rawDataObj.name', rawDataObj.name)

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

	let returnData = new DataObjData(rawDataObj.codeCardinality)
	// await initFields(rawDataObj, returnData)
	// debug('processDataObj', 'returnData.fields', returnData.fields)

	await processDataObjQuery(token.queryType, query, queryData, scriptGroup)
	return processDataObjExecute(query, scriptGroup, rawDataObj, returnRawData, queryData)
}

async function processDataObjQuery(
	queryType: TokenApiQueryType,
	query: Query,
	queryData: TokenApiQueryData,
	scriptGroup: ScriptGroup
) {
	switch (queryType) {
		case TokenApiQueryType.preset:
			query.setProcessRow(
				new ProcessRowSelectPreset(query.rawDataObj.rawPropsSelect, DataRecordStatus.preset)
			)
			scriptGroup.addScriptPreset(query, queryData)
			scriptGroup.addScriptDataItems(query, queryData, query.rawDataObj.rawPropsSelect)
			break

		case TokenApiQueryType.retrieve:
			query.setProcessRow(
				new ProcessRowSelect(query.rawDataObj.rawPropsSelect, DataRecordStatus.retrieved)
			)
			scriptGroup.addScriptRetrieve(query, queryData)
			scriptGroup.addScriptDataItems(query, queryData, query.rawDataObj.rawPropsSelect)

			// embed fields
			// embedFields = query.rawDataObj.rawPropsSelect.filter((prop) => {
			// 	return prop.fieldEmbed !== undefined
			// })
			// for (let i = 0; i < embedFields.length; i++) {
			// 	const fieldName = strRequired(
			// 		embedFields[i]?.propName,
			// 		'processDataObj.retrieve.embedFields.retrieve',
			// 		'embedFields[i]?.propName'
			// 	)
			// 	const dataObjId = strRequired(
			// 		embedFields[i]?.fieldEmbed?.id,
			// 		'processDataObj.retrieve.embedFields.retrieve',
			// 		'embedFields[i]?.fieldEmbed?.id'
			// 	)
			// 	let { rawDataObj, returnRawData } = await getRawDataObj(
			// 		new TokenApiDbDataObjSource({ dataObjId }),
			// 		queryData
			// 	)
			// 	returnData.addField(DataObjCardinality.list, fieldName, rawDataObj)

			// 	const embedQuery = new Query(rawDataObj)
			// 	scriptGroup.addScriptRetrieveItem(
			// 		embedQuery,
			// 		queryData,
			// 		ScriptExePost.fieldEmbed,
			// 		fieldName
			// 	)
			// 	if (embedQuery.rawDataObj.listEditPresetExpr) {
			// 		debug('processDataObj', `embedQuery.rawDataObj.listEditPresetExpr`, fieldName)
			// 		scriptGroup.addScriptPresetListEdit(embedQuery, queryData, fieldName)
			// 	}
			// }
			break

		case TokenApiQueryType.save:
			query.setProcessRow(new ProcessRowUpdate(query.rawDataObj.rawPropsSelect, queryData.dataSave))
			scriptGroup.addScriptSave(query, queryData)

			// embed fields
			embedFields = query.rawDataObj.rawPropsSelect.filter((prop) => {
				return prop.fieldEmbed !== undefined
			})
			debug('processDataObj', 'embedFields', embedFields)
			for (let i = 0; i < embedFields.length; i++) {
				// const fieldName = strRequired(
				// 	embedFields[i]?.propName,
				// 	'processDataObj.retrieve.embedFields.retrieve',
				// 	'embedFields[i]?.propName'
				// )
				// const dataObjId = strRequired(
				// 	embedFields[i]?.fieldEmbed?.id,
				// 	'processDataObj.retrieve.embedFields.retrieve',
				// 	'embedFields[i]?.fieldEmbed?.id'
				// )
				// let { rawDataObj, returnRawData } = await getRawDataObj(
				// 	new TokenApiDbDataObjSource({ dataObjId }),
				// 	queryData
				// )
				// returnData.addField(DataObjCardinality.list, fieldName, rawDataObj)
				// const embedQuery = new Query(rawDataObj)
				// 	scriptGroup.initScriptRetrieve(embedQuery, queryData, ScriptExePost.fieldEmbed, fieldName)
				//
				// if (embedQuery.rawDataObj.listEditPresetExpr) {
				// 	debug('processDataObj', `embedQuery.rawDataObj.listEditPresetExpr`, fieldName)
				// 		scriptGroup.initScriptPresetListEdit(embedQuery, queryData, fieldName)
				//
				// }
			}
			break

		default:
			error(500, {
				file: FILENAME,
				function: 'processQuery.processDataObjQuery',
				message: `No case defined for row TokenApiDbQueryType: ${queryType}`
			})
	}
}

async function processDataObjExecute(
	query: Query,
	scriptGroup: ScriptGroup,
	rawDataObj: RawDataObj,
	returnRawData: boolean,
	queryData: TokenApiQueryData,
	dataReturn: DataObjData = new DataObjData(rawDataObj.codeCardinality)
) {
	for (let i = 0; i < scriptGroup.scripts.length; i++) {
		const script = scriptGroup.scripts[i]
		if (script) {
			script.evalExpr()
			const rawDataList = await executeQuery(script.script)
			switch (script.exePost) {
				case ScriptExePost.dataItems:
					dataReturn.items = rawDataList[0]
					break

				case ScriptExePost.fieldEmbed:
					const fieldData = dataReturn.getFieldData(script.id)
					rawDataList.forEach((row) => {
						fieldData.addRow(DataRecordStatus.retrieved, row)
					})
					break

				case ScriptExePost.formatData:
					if (query.processRow) formatData(dataReturn, rawDataList, query.processRow)
					if (query.rawDataObj.codeCardinality === DataObjCardinality.detail) {
						queryData.recordSet(dataReturn.getDetailRecord())
					}
					break

				case ScriptExePost.none:
					break

				case ScriptExePost.processRowSelectPreset:
					const processRowListEdit = new ProcessRowSelectPreset(
						query.rawDataObj.rawPropsSelect,
						DataRecordStatus.preset
					)
					formatData(dataReturn, rawDataList, processRowListEdit)
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
	debugData('execute', 'data.dataRows.formatted.records', dataReturn.dataRows)
	if (dataReturn.dataRows.length > 0) {
		debug('execute', 'data.dataRows[0]', dataReturn.dataRows[0].record)
	}
	dataReturn = returnRawData ? { dataObjData: dataReturn, rawDataObj } : { dataObjData: dataReturn }
	return new ApiResult(true, dataReturn)
}

async function executeExpr(expr: string, queryData: TokenApiQueryData) {
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
		const rawDataItems = await executeQuery(scriptGroup.scripts[0].script)
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
		rawDataObj = await getRawDataObjDynamic(rawDataObj.processType, queryData, rawDataObj)
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
async function initFields(rawDataObj: RawDataObj, returnData: DataObjData) {
	let embedFields = rawDataObj.rawPropsSelect.filter((prop) => {
		return prop.fieldEmbed !== undefined
	})
	for (let i = 0; i < embedFields.length; i++) {
		const fieldName = strRequired(
			embedFields[i]?.propName,
			'processDataObj.retrieve.embedFields.retrieve',
			'embedFields[i]?.propName'
		)
		const dataObjId = strRequired(
			embedFields[i]?.fieldEmbed?.id,
			'processDataObj.retrieve.embedFields.retrieve',
			'embedFields[i]?.fieldEmbed?.id'
		)
		let { rawDataObj, returnRawData } = await getRawDataObj(
			new TokenApiDbDataObjSource({ dataObjId }),
			queryData
		)
		returnData.addField(DataObjCardinality.list, fieldName, rawDataObj)
	}
}
export async function processExpression(queryData: TokenApiQueryData) {
	queryData = TokenApiQueryData.load(queryData)
	return new ApiResult(true, executeExpr(queryData.parms.expr, queryData))
}

export class ProcessRow {
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
		return Function('return ' + newExpr)()
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
		dataReturn.addRow(status, recordReturn)
	}
}
