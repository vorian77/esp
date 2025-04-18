import { queryJsonMultiple } from '$routes/api/dbGel/dbGel'
import { ApiResult } from '$routes/api/api'
import {
	TokenApiId,
	TokenApiDbDataObjSource,
	TokenApiQuery,
	TokenApiQueryData,
	TokenApiQueryType
} from '$utils/types.token'
import {
	DBTable,
	debug,
	DataObjData,
	DataObjQueryRiderTriggerTiming,
	DataObjQueryRiders,
	type DataRecord,
	DataRecordStatus,
	DataRow,
	DataRows,
	formatDateTime,
	getArray,
	ParmsValuesType,
	required,
	strRequired,
	DataObjCardinality
} from '$utils/types'
import {
	DataObjQueryType,
	PropDataSourceValue,
	PropDataType,
	PropLinkItemsSource,
	PropNamePrefixType,
	RawDataObj,
	RawDataObjPropDB
} from '$comps/dataObj/types.rawDataObj.svelte'
import { Query } from '$routes/api/dbGel/dbGelQuery'
import { getDataObjById, getDataObjByName } from '$routes/api/dbGel/dbGelUtilities'
import { FieldEmbedType } from '$comps/form/field.svelte'
import {
	FieldEmbed,
	FieldEmbedListConfig,
	FieldEmbedListEdit,
	FieldEmbedListSelect
} from '$comps/form/fieldEmbed'
import { evalExpr, EvalExprContext } from '$routes/api/dbGel/dbGelGetVal'
import type { RawDataList } from '$routes/api/dbGel/types.dbGel'
import { Script, ScriptExePost, ScriptGroup } from '$routes/api/dbGel/dbGelScript'
import { getRawDataObjDynamic } from '$routes/api/dbGel/dbGelProcessDynDO'
import { error } from '@sveltejs/kit'

const FILENAME = 'server/dbGelQueryProcess.ts'

export async function getLinkItems(queryData: TokenApiQueryData) {
	const clazz = 'getFieldListItems'
	queryData = TokenApiQueryData.load(queryData)
	const propLinkItemsSource = new PropLinkItemsSource(
		required(
			queryData?.dataTab?.parms.valueGet(ParmsValuesType.propLinkItemsSourceRaw),
			clazz,
			'propLinkItems'
		)
	)

	let valueCurrent = queryData?.dataTab?.parms.valueGet(ParmsValuesType.propLinkItemsValueCurrent)
	let expr = propLinkItemsSource.getExprSelect(false, valueCurrent)

	const rawItems = await exeQueryMultiData(
		expr,
		queryData,
		new EvalExprContext(clazz, propLinkItemsSource.name)
	)
	return new ApiResult(true, { data: rawItems })
}

export async function processDataObj(token: TokenApiQuery) {
	const queryData = TokenApiQueryData.load(token.queryData)
	let rawDataObj = await getRawDataObj(token.dataObjSource, queryData)

	queryData.dataTab?.parms.valueSetIfMissing(ParmsValuesType.queryOwnerIdSystem, rawDataObj.ownerId)

	if (token.queryType !== TokenApiQueryType.save) {
		if (rawDataObj?.codeDoQueryType === DataObjQueryType.preset) {
			token.queryType = TokenApiQueryType.preset
		} else if (rawDataObj?.codeDoQueryType === DataObjQueryType.retrieve) {
			token.queryType = TokenApiQueryType.retrieve
		} else if (rawDataObj?.codeDoQueryType === DataObjQueryType.retrievePreset) {
			const exprFilter = rawDataObj.exprFilter
			const type = rawDataObj.tables[0].table.object
			const expr = `SELECT ${type} FILTER ${exprFilter}`

			const currentData = await exeQueryMultiData(
				expr,
				queryData,
				new EvalExprContext('processDataObj.retrievePreset', '')
			)

			token.queryType =
				currentData.length > 0 ? TokenApiQueryType.retrieve : TokenApiQueryType.preset
		}
	}

	// queries
	const query = new Query(rawDataObj)
	let scriptGroup = new ScriptGroup()
	let returnData = new DataObjData(rawDataObj)

	await processDataObjQuery(token.queryType, query, queryData, scriptGroup, returnData)
	return processDataObjExecute(scriptGroup, returnData)
}

async function processDataObjQuery(
	queryType: TokenApiQueryType,
	query: Query,
	queryData: TokenApiQueryData,
	scriptGroup: ScriptGroup,
	returnData: DataObjData
) {
	const clazz = 'processDataObjQuery'
	switch (queryType) {
		case TokenApiQueryType.preset:
			returnData.fields = await processDataObjQueryEmbedFields(query.rawDataObj, queryData)
			query.setProcessRow(
				new ProcessRowSelectPreset(query.rawDataObj.rawPropsSelect, DataRecordStatus.preset)
			)
			scriptGroup.addScriptPreset(query, queryData)
			break

		case TokenApiQueryType.retrieve:
			returnData.fields = await processDataObjQueryEmbedFields(query.rawDataObj, queryData)
			query.setProcessRow(
				new ProcessRowSelect(query.rawDataObj.rawPropsSelect, DataRecordStatus.retrieved)
			)
			scriptGroup.addScriptPresetListEdit(query, queryData)
			await scriptGroup.addScriptRetrieve(query, queryData)
			break

		case TokenApiQueryType.save:
			returnData.fields = getArray(queryData?.dataTab?.fields)
			query.setProcessRow(
				new ProcessRowUpdate(query.rawDataObj.rawPropsSelect, queryData.dataTab?.rowsSave)
			)
			scriptGroup.addScriptSave(query, queryData)
			break

		default:
			error(500, {
				file: FILENAME,
				function: 'processQuery.processDataObjQuery',
				message: `No case defined for TokenApiDbQueryType: ${queryType}`
			})
	}
	// embedded fields
	const EMBED_QUERY_TYPES = [TokenApiQueryType.retrieve, TokenApiQueryType.save]
	if (EMBED_QUERY_TYPES.includes(queryType)) {
		const recordStatus = queryData.dataTab?.rowsRetrieved.getDetailRowStatus()
		for (let i = 0; i < returnData.fields.length; i++) {
			const field: FieldEmbed = returnData.fields[i]
			queryData.dataTab = field.data

			let queryTypeEmbed = queryType
			if (queryType === TokenApiQueryType.retrieve || recordStatus === DataRecordStatus.preset) {
				queryTypeEmbed = TokenApiQueryType.retrieve
			} else {
				// save && !preset > assume retrieve
				queryTypeEmbed = TokenApiQueryType.retrieve
				switch (field.embedType) {
					case FieldEmbedType.listConfig:
						queryTypeEmbed = TokenApiQueryType.save
						break

					case FieldEmbedType.listEdit:
						queryTypeEmbed = TokenApiQueryType.save
						break

					case FieldEmbedType.listSelect:
						if (queryData.dataTab?.parms.hasOwn('listIdsSelected')) {
							queryTypeEmbed = TokenApiQueryType.save
						}
						break

					default:
						error(500, {
							file: FILENAME,
							function: `processDataObjExecute.${clazz}`,
							message: `No case defined for field.embedType: ${field.embedType}`
						})
				}
			}

			const embedDataObjRaw = field.data.rawDataObj

			await processDataObjQuery(
				queryTypeEmbed,
				new Query(required(field.data.rawDataObj, clazz, 'field.data.rawDataObj'), field),
				queryData,
				scriptGroup,
				field.data
			)
		}
	}
}

async function processDataObjQueryEmbedFields(
	rawDataObjParent: RawDataObj,
	queryData: TokenApiQueryData
) {
	let fields: FieldEmbed[] = []
	for (let i = 0; i < rawDataObjParent.rawPropsDisplay.length; i++) {
		const propRaw = rawDataObjParent.rawPropsDisplay[i]
		let FieldEmbedClass: any = undefined
		if (propRaw.fieldEmbedListConfig) {
			FieldEmbedClass = FieldEmbedListConfig
		} else if (propRaw.fieldEmbedListEdit) {
			FieldEmbedClass = FieldEmbedListEdit
		} else if (propRaw.fieldEmbedListSelect) {
			FieldEmbedClass = FieldEmbedListSelect
		}
		if (FieldEmbedClass) {
			fields.push(
				await FieldEmbed.initFieldServer(
					rawDataObjParent,
					queryData,
					propRaw,
					FieldEmbedClass,
					getRawDataObj
				)
			)
		}
	}
	return fields
}

async function processDataObjExecute(scriptGroup: ScriptGroup, returnData: DataObjData) {
	const clazz = 'processDataObjExecute'
	let scriptData: DataObjData
	returnData.resetRowsRetrieved()
	while (scriptGroup.scripts.length > 0) {
		const script: Script = required(
			scriptGroup.scripts.shift(),
			clazz,
			'scriptGroup.scripts.shift()'
		)
		const expr = evalExpr(
			script.script,
			script.queryData,
			new EvalExprContext('processDataObjExecute', script.query.rawDataObj.name)
		)

		// sandwich data retrieval in pre/post query riders
		const queryRiders = new DataObjQueryRiders(script.query.rawDataObj.queryRiders)

		scriptGroup.addScriptQueryRetrieveQueryRiders(
			script.query,
			script.queryData,
			queryRiders,
			script.queryType,
			DataObjQueryRiderTriggerTiming.pre
		)

		const rawDataList = await exeQueryMulti(expr)

		scriptGroup.addScriptQueryRetrieveQueryRiders(
			script.query,
			script.queryData,
			queryRiders,
			script.queryType,
			DataObjQueryRiderTriggerTiming.post
		)

		scriptData = script?.query?.fieldEmbed ? script.query.fieldEmbed.data : returnData
		scriptData.parms.update(script.queryData.dataTab?.parms.valueGetAll())
		switch (script.exePost) {
			case ScriptExePost.dataItems:
				scriptData.items = rawDataList.length > 0 ? rawDataList[0] : []
				break

			case ScriptExePost.formatData:
				let dataRow: DataRow = new DataRow(DataRecordStatus.unknown, {})
				if (script.query.processRow) formatData(scriptData, rawDataList, script.query.processRow)

				if (script.query.rawDataObj.codeCardinality === DataObjCardinality.detail) {
					dataRow = required(scriptData.rowsRetrieved.getDetailRow(), clazz, 'dataRow')

					// set embedded parent tree records
					const rootTableName = script.query.getTableRootName()
					scriptGroup.scripts.forEach((script: Script) => {
						script.queryData.updateTableData(rootTableName, dataRow)
					})
				}

				// add dataItems
				script.queryData?.dataTab?.parms.update(scriptData.parms.valueGetAll())
				scriptGroup.addScriptDataItems(
					script.query,
					script.queryData,
					script.query.rawDataObj.rawPropsSelect,
					dataRow.record
				)
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

	// return
	if (returnData.rowsRetrieved.getRows().length > 0) {
		debug(
			'processDataObjExecute',
			`executeQuery.length: ${returnData.rowsRetrieved.getRows().length} - row[0]`,
			returnData.rowsRetrieved.getRows()[0].record
		)
	}
	return new ApiResult(true, { dataObjData: returnData })
}

async function exeQueryMulti(script: string): Promise<RawDataList> {
	debug('exeQueryMulti', 'query', script ? script : 'null/undefined script')
	return await queryJsonMultiple(script)
}

async function exeQueryMultiData(
	expr: string,
	queryData: TokenApiQueryData,
	context: EvalExprContext
) {
	const script = evalExpr(expr, queryData, context)
	return await exeQueryMulti(script)
}

function formatData(returnData: DataObjData, rawDataList: RawDataList, process: ProcessRow) {
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
				message: `No case defined for prop: ${prop.propName} - propDataType: ${propDataType}`
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

export async function getRawDataObj(
	dataObjSource: TokenApiDbDataObjSource,
	queryData: TokenApiQueryData
) {
	let dbDataObj: any
	let rawDataObj: RawDataObj

	if (Object.hasOwn(dataObjSource.sources, 'dataObjId')) {
		dbDataObj = await getDataObjById(new TokenApiId(dataObjSource.sources.dataObjId))
	} else if (Object.hasOwn(dataObjSource.sources, 'dataObjName')) {
		dbDataObj = await getDataObjByName(new TokenApiId(dataObjSource.sources.dataObjName))
	}
	const dataObjName = dbDataObj.name
	rawDataObj = new RawDataObj(dbDataObj)
	rawDataObj = await getRawDataObjDynamic(
		rawDataObj.processType,
		queryData,
		rawDataObj,
		dataObjSource
	)

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
	let result: RawDataList = []
	queryData = TokenApiQueryData.load(queryData)
	const dbExpr = strRequired(queryData.dbExpr, `${FILENAME}.processExpression`, 'dbExpr')
	result = await exeQueryMultiData(dbExpr, queryData, new EvalExprContext('processExpression', ''))
	return new ApiResult(true, { data: result })
}

export class ProcessRow {
	propNames: string[] = []
	propsSelect: RawDataObjPropDB[]
	dummyQueryData: TokenApiQueryData = new TokenApiQueryData({})
	constructor(propsSelect: RawDataObjPropDB[]) {
		this.propNames = propsSelect.map((prop) => prop.propName)
		this.propsSelect = propsSelect
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
		newExpr = evalExpr(newExpr, this.dummyQueryData, new EvalExprContext('ProcessRow', clazz))
		return Function('return ' + newExpr)()
	}

	prepRecord(recordRaw: DataRecord) {
		this.propsSelect.forEach((prop) => {
			if (prop.codeDataSourceValue === PropDataSourceValue.calculate && prop.exprCustom) {
				recordRaw[prop.propName] = this.evalExprCalc(prop.exprCustom, recordRaw, this.propNames)
			}
		})
	}
	processRow(recordRaw: DataRecord): DataRow {
		return new DataRow(DataRecordStatus.retrieved, recordRaw)
	}
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
			if (Object.hasOwn(recordRaw, prop.propName)) {
				recordReturn[prop.propName] = formatDataForDisplay(
					prop,
					prop.codeDataType,
					recordRaw[prop.propName]
				)
			} else {
				recordReturn[prop.propName] = formatDataForDisplay(prop, prop.codeDataType, undefined)
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
	constructor(propsSelect: RawDataObjPropDB[], source: DataRows | undefined = new DataRows()) {
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
			if (prop.propNamePrefixType === PropNamePrefixType.linkItems) {
				const recordKeyLink = '_' + prop.propName
				// recordReturn[prop.propName] = recordReturn[recordKeyLink]
				// delete recordReturn[recordKeyLink]
			} else {
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
