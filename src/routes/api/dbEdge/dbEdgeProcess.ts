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
	RawDataObjParent,
	RawDataObjPropDB,
	RawDataObjPropDBFieldEmbedType
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

	let rawDataObj = await getRawDataObj(token.dataObjSource, queryData)
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
	await initFields(returnData, queryData, rawDataObj)

	await processDataObjQuery(token.queryType, query, queryData, scriptGroup, returnData)
	return processDataObjExecute(scriptGroup, queryData, returnData, rawDataObj)
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
			scriptGroup.addScriptPresetListEdit(query, queryData)
			scriptGroup.addScriptRetrieve(query, queryData)
			scriptGroup.addScriptDataItems(query, queryData, query.rawDataObj.rawPropsSelect)
			break

		case TokenApiQueryType.save:
			query.setProcessRow(new ProcessRowUpdate(query.rawDataObj.rawPropsSelect, queryData.dataSave))
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
	for (let i = 0; i < returnData.fields.length; i++) {
		const field = returnData.fields[i]
		queryData.dataSave = field.dataSave
		await processDataObjQuery(
			queryType,
			new Query(field.rawDataObj, field.fieldName),
			queryData,
			scriptGroup,
			field.data
		)
	}
}

async function processDataObjExecute(
	scriptGroup: ScriptGroup,
	queryData: TokenApiQueryData,
	returnData: DataObjData,
	rawDataObj: RawDataObj
) {
	let scriptData: DataObjData
	for (let i = 0; i < scriptGroup.scripts.length; i++) {
		const script = scriptGroup.scripts[i]
		if (script) {
			script.evalExpr()
			scriptData = script.query.fieldName
				? returnData.getFieldData(script.query.fieldName)
				: returnData
			const rawDataList = await executeQuery(script.script)
			switch (script.exePost) {
				case ScriptExePost.dataItems:
					scriptData.items = rawDataList[0]
					break

				case ScriptExePost.formatData:
					if (script.query.processRow) formatData(scriptData, rawDataList, script.query.processRow)
					if (script.query.rawDataObj.codeCardinality === DataObjCardinality.detail) {
						queryData.recordSet(scriptData.getDetailRecord())
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
	debugData('processDataObjExecute', 'data.dataRows.formatted.records', returnData.dataRows)
	if (returnData.dataRows.length > 0) {
		debug('processDataObjExecute', 'data.dataRows[0]', returnData.dataRows[0].record)
	}

	return new ApiResult(true, { dataObjData: returnData, rawDataObj })
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
	rawDataList.forEach((row) => {
		process.processRow(returnData, row)
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

async function initFields(
	returnData: DataObjData,
	queryData: TokenApiQueryData,
	rawDataObj: RawDataObj
) {
	for (let i = 0; i < rawDataObj.rawPropsSelect.length; i++) {
		const field = rawDataObj.rawPropsSelect[i]
		if (field.fieldEmbed) {
			const fieldName = field.propName
			const dataObjId = strRequired(
				field.fieldEmbed?.id,
				'initFields',
				'embedFields[i]?.fieldEmbed?.id'
			)
			debug('dbEdgeProcess.initFields: ' + fieldName, 'field', field)
			const rootTable = field?.link?.table ? field.link.table : undefined
			debug('dbEdgeProcess.initFields: ' + fieldName, 'rootTable', rootTable)

			// dataObjSource.replacements.parent

			let rawDataObj = await getRawDataObj(
				new TokenApiDbDataObjSource({
					dataObjId: strRequired(
						field.fieldEmbed?.id,
						'initFields',
						'embedFields[i]?.fieldEmbed?.id'
					),
					parent: new RawDataObjParent({
						_columnName: fieldName,
						_columnIsMultiSelect: field.isMultiSelect,
						_table: rootTable
					})
				}),
				queryData
			)

			// new TokenApiDbDataObjSource({
			// 	dataObjId: this.raw.dataObjEmbedId,
			// 	exprFilter: this.exprFilterEmbed
			// }),

			// new TokenApiDbDataObjSource({
			// 	dataObjId: this.raw.dataObjModalId,
			// 	parent: new RawDataObjParent({
			// 		_columnName: this.colDO.propName,
			// 		_columnIsMultiSelect: true,
			// 		_table: rootTable
			// 	})
			// }),

			switch (field.fieldEmbed?.type) {
				case RawDataObjPropDBFieldEmbedType.listConfig:
					rawDataObj.setParent({
						_columnName: fieldName,
						_columnIsMultiSelect: field.isMultiSelect,
						_filterExpr: `.id IN (SELECT ${rootTable.object} FILTER .id = <parms,uuid,listRecordIdParent>).${fieldName}.id`,
						_table: rootTable
					})
					break
				case RawDataObjPropDBFieldEmbedType.listEdit:
					break
				case RawDataObjPropDBFieldEmbedType.listSelect:
					break
				default:
					error(500, {
						file: FILENAME,
						function: 'initFields',
						message: `No dase defined for field.fieldEmbed?.type: ${field.fieldEmbed?.type}`
					})
			}
			debug('dbEdgeProcess.initFields: ' + fieldName, 'rawDataObj.parent', rawDataObj.rawParent)

			const dataSaveField = queryData?.dataSave?.fields.filter((f) => f.fieldName === fieldName)
			if (dataSaveField?.length === 1) {
				returnData.addFieldSave(fieldName, rawDataObj, dataSaveField[0].data)
			} else {
				returnData.addFieldInit(fieldName, rawDataObj)
			}
		}
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
