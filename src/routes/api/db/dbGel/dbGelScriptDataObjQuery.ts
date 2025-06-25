import {
	FieldEmbed,
	FieldEmbedListConfig,
	FieldEmbedListEdit,
	FieldEmbedListSelect
} from '$comps/form/fieldEmbed'
import { type RawDataList, ScriptExePost } from '$lib/queryClient/types.queryClient'
import { dbQueryExpr } from '$server/types.queryServer'
import { getDataObjById, getDataObjByName } from '$routes/api/db/dbGel/dbGelQueries'
import { getRawDataObjDynamic } from '$routes/api/db/dbGel/dbGelScriptDyn'
import { GelQuery } from '$routes/api/db/dbGel/dbGelScriptQuery'
import { Script } from '$routes/api/db/dbScript'
import {
	DataObjCardinality,
	DataObjData,
	DataObjDataPropName,
	DataRecordStatus,
	DataRow,
	DataRows,
	debug,
	MethodResult,
	ParmsValuesType,
	RawDataObj,
	required,
	strRequired
} from '$utils/types'
import {
	TokenApiDbDataObjSource,
	TokenApiId,
	TokenApiQueryData,
	TokenApiQueryType
} from '$utils/types.token'
import { FieldEmbedType } from '$utils/utils.sys'
import { ScriptGroupGelDataObj } from '$routes/api/db/dbGel/dbGelScriptDataObj'
import { error } from '@sveltejs/kit'

const FILENAME = '/$routes/api/db/dbGel/dbGelScriptDataObjQuery.ts'

export class ScriptGroupGelDataObjQuery extends ScriptGroupGelDataObj {
	constructor(obj: any) {
		super(obj)
	}
	async queryPre(): Promise<MethodResult> {
		const clazz = `${FILENAME}.queryBuild`
		let result: MethodResult
		const dataObjSource = required(this.querySource.dataObjSource, clazz, 'dataObjSource')

		// get rawDataObj
		result = await getRawDataObj(dataObjSource, this.queryData)
		if (result.error) return result
		let rawDataObj: RawDataObj = required(result.data, clazz, 'rawDataObj')
		this.queryData.dataTab.rawDataObj = rawDataObj

		// set default queryOwnerSys
		this.queryData.dataTab?.parms.valueSetIfMissing(
			ParmsValuesType.queryOwnerSys,
			rawDataObj.ownerId
		)

		debug('dbGelScriptDataObjQuery.queryPre', 'queryData.node', this.queryData.node)

		if (this.queryType !== TokenApiQueryType.save && this.queryData.node) {
			if (this.queryData.node.codeQueryType === TokenApiQueryType.preset) {
				this.queryType = TokenApiQueryType.preset
			} else if (this.queryData.node.codeQueryType === TokenApiQueryType.retrieve) {
				this.queryType = TokenApiQueryType.retrieve
			} else if (this.queryData.node.codeQueryType === TokenApiQueryType.retrievePreset) {
				const expr = `SELECT ${rawDataObj.tableGroup.getTableObj(0)} FILTER ${rawDataObj.rawQuerySource.exprFilter}`
				const evalExprContext = `${this.evalExprContext} - RetrievePreset`
				result = await dbQueryExpr({
					expr,
					evalExprContext,
					queryData: this.queryData,
					querySource: this.querySource
				})
				if (result.error) return result
				const currData: RawDataList = result.data
				this.queryType = currData.length > 0 ? TokenApiQueryType.retrieve : TokenApiQueryType.preset
			}
		}

		// queries
		const query = new GelQuery({
			evalExprContext: this.evalExprContext,
			queryData: this.queryData,
			querySource: this.querySource,
			rawDataObj
		})
		return await this.queryBuilScripts(query, this.queryType)
	}

	async queryBuilScripts(query: GelQuery, queryType: TokenApiQueryType): Promise<MethodResult> {
		const clazz = 'queryBuilScripts'
		let result: MethodResult
		let fieldEmbedData: DataObjData = this.queryData.dataTab.getFieldEmbedData(
			query.fieldEmbed,
			this.evalExprContext
		)

		switch (queryType) {
			case TokenApiQueryType.preset:
				result = await this.queryBuilScriptsFields(fieldEmbedData, query)
				if (result.error) return result

				query.dataFormatSetSelectPreset({
					evalExprContext: this.evalExprContext,
					propsSelect: query.rawDataObj.rawPropsSelect,
					querySource: query.querySource,
					status: DataRecordStatus.preset
				})
				await this.addScriptPreset(query)
				break

			case TokenApiQueryType.retrieve:
				result = await this.queryBuilScriptsFields(fieldEmbedData, query)
				if (result.error) return result

				query.dataFormatSetSelect({
					evalExprContext: this.evalExprContext,
					propsSelect: query.rawDataObj.rawPropsSelect,
					querySource: query.querySource,
					status: DataRecordStatus.retrieved
				})
				await this.addScriptListPresetExpr(query)
				await this.addScriptRetrieve(query)
				break

			case TokenApiQueryType.save:
				fieldEmbedData.fields = this.queryData.dataTab.getFieldEmbedFields(
					query.fieldEmbed,
					this.evalExprContext
				)
				query.dataFormatSetUpdate({
					evalExprContext: this.evalExprContext,
					propsSelect: query.rawDataObj.rawPropsSelect,
					querySource: query.querySource,
					rowsSave: query.queryData.dataTab.rowsSave
				})
				result = await this.addScriptSave(query)
				if (result.error) return result
				break

			default:
				return new MethodResult({
					error: {
						file: FILENAME,
						function: 'processQuery.processDataObjQuery',
						msg: `No case defined for TokenApiDbQueryType: ${queryType}`
					}
				})
		}

		// embedded fields
		const EMBED_QUERY_TYPES = [TokenApiQueryType.retrieve, TokenApiQueryType.save]
		if (EMBED_QUERY_TYPES.includes(queryType)) {
			const recordStatus = fieldEmbedData.rowsRetrieved.getDetailRowStatus()
			for (let i = 0; i < fieldEmbedData.fields.length; i++) {
				const fieldEmbed: FieldEmbed = fieldEmbedData.fields[i]
				let queryTypeEmbed = queryType
				if (queryType === TokenApiQueryType.retrieve || recordStatus === DataRecordStatus.preset) {
					queryTypeEmbed = TokenApiQueryType.retrieve
				} else {
					// save && !preset > assume retrieve
					queryTypeEmbed = TokenApiQueryType.retrieve
					switch (fieldEmbed.embedType) {
						case FieldEmbedType.listConfig:
							queryTypeEmbed = TokenApiQueryType.save
							break

						case FieldEmbedType.listEdit:
							queryTypeEmbed = TokenApiQueryType.save
							break

						case FieldEmbedType.listSelect:
							if (fieldEmbed.data.parms.hasOwn('listIdsSelected')) {
								queryTypeEmbed = TokenApiQueryType.save
							}
							break

						default:
							return new MethodResult({
								error: {
									file: FILENAME,
									function: `processDataObjExecute.${clazz}`,
									msg: `No case defined for field.embedType: ${fieldEmbed.embedType}`
								}
							})
					}
				}

				let fieldQueryData = TokenApiQueryData.load(this.queryData)
				fieldQueryData.dataTab = fieldEmbed.data

				await this.queryBuilScripts(
					new GelQuery({
						evalExprContext: `${this.evalExprContext} - fieldEmbed: ${fieldEmbed.embedFieldNameRaw}`,
						fieldEmbed,
						queryData: fieldQueryData,
						querySource: this.querySource,
						rawDataObj: fieldEmbed.data.rawDataObj
					}),
					queryTypeEmbed
				)
			}
		}
		return new MethodResult()
	}

	async queryBuilScriptsFields(
		fieldEmbedData: DataObjData,
		query: GelQuery
	): Promise<MethodResult> {
		let result: MethodResult = await this.queryBuilScriptsFieldsEmbeded(
			query.rawDataObj,
			this.queryData
		)
		if (result.error) return result
		fieldEmbedData.fields = result.data
		return new MethodResult()
	}

	async queryExeFormat(script: Script, rawDataList: RawDataList): Promise<MethodResult> {
		const clazz = 'ScriptGroupDo.queryExeFormat'
		const query: GelQuery = required(script.query, clazz, 'script.query')
		const scriptData: DataObjData = this.queryData.dataTab.getFieldEmbedData(
			query.fieldEmbed,
			this.evalExprContext
		)
		let dataRows: DataRows = new DataRows()
		let result: MethodResult

		switch (script.exePost) {
			case ScriptExePost.dataItemsFields:
				this.queryExeFormatDataSet(this.queryData.dataTab, query.fieldEmbed?.embedFieldNameRaw, [
					[DataObjDataPropName.itemsField, rawDataList.length > 0 ? rawDataList[0] : []]
				])
				break

			case ScriptExePost.dataItemsSelect:
				this.queryExeFormatDataSet(this.queryData.dataTab, query.fieldEmbed?.embedFieldNameRaw, [
					[DataObjDataPropName.itemsSelect, rawDataList.length > 0 ? rawDataList : []]
				])
				break

			case ScriptExePost.formatData:
				result = await query.dataFormat(rawDataList)
				if (result.error) return result
				dataRows = result.data

				let dataRow: DataRow = new DataRow(DataRecordStatus.unknown, {})
				this.queryExeFormatDataSet(this.queryData.dataTab, query.fieldEmbed?.embedFieldNameRaw, [
					[DataObjDataPropName.rawDataObj, scriptData.rawDataObj],
					[DataObjDataPropName.rowsRetrieved, dataRows]
				])

				if (query.rawDataObj.codeCardinality === DataObjCardinality.detail) {
					dataRow = required(dataRows.getDetailRow(), clazz, 'dataRow')

					// set embedded parent tree records
					const dataObjId = strRequired(this.queryData.dataTab.rawDataObj?.id, clazz, 'dataObjId')
					this.queryData.dataUpdate(dataObjId, dataRow)
				}

				script.scriptGroup.queryData.dataTab?.parms.update(scriptData.parms.valueGetAll())

				// add dataItems - field
				result = await this.addScriptDataItemsFields(
					query,
					query.rawDataObj.rawPropsSelect,
					dataRow.record
				)
				if (result.error) return result
				break

			case ScriptExePost.none:
				break

			case ScriptExePost.processRowSelectPreset:
				result = await query.dataFormat(rawDataList)
				if (result.error) return result
				dataRows = result.data

				this.queryExeFormatDataSet(this.queryData.dataTab, query.fieldEmbed?.embedFieldNameRaw, [
					[DataObjDataPropName.rawDataObj, scriptData.rawDataObj],
					[DataObjDataPropName.rowsRetrieved, dataRows]
				])
				break

			default:
				return new MethodResult({
					error: {
						file: FILENAME,
						function: clazz,
						msg: `No case defined for row script.exePost: ${script.exePost}`
					}
				})
		}
		return new MethodResult(this.queryData)
	}

	queryExeFormatDataSet(
		dataReturn: DataObjData,
		fieldEmbedNameRaw: string | undefined,
		dataItems: [DataObjDataPropName, any][]
	) {
		if (fieldEmbedNameRaw) {
			const idx = dataReturn.fields.findIndex(
				(field) => field.embedFieldNameRaw === fieldEmbedNameRaw
			)
			if (idx >= 0) {
				dataItems.forEach((item: [DataObjDataPropName, any]) => {
					const propName = item[0]
					const newData = item[1]
					dataReturn.fields[idx].data.setValue(propName, newData)
				})
			}
		} else {
			dataItems.forEach((item: [DataObjDataPropName, any]) => {
				const propName = item[0]
				const newData = item[1]
				dataReturn.setValue(propName, newData)
			})
		}
	}

	async queryBuilScriptsFieldsEmbeded(rawDataObjParent: RawDataObj, queryData: TokenApiQueryData) {
		const clazz = `${FILENAME}.ScriptGroupGelDataObjQuery.queryBuilScriptsFieldsEmbeded`
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
				let result: MethodResult = await FieldEmbed.initFieldServer(
					rawDataObjParent,
					queryData,
					propRaw,
					FieldEmbedClass,
					getRawDataObj
				)
				if (result.error) return result
				const fieldEmbed: FieldEmbed = result.data
				fields.push(fieldEmbed)
			}
		}
		return new MethodResult(fields)
	}
}

async function getRawDataObj(
	dataObjSource: TokenApiDbDataObjSource,
	queryData: TokenApiQueryData
): Promise<MethodResult> {
	let dbDataObj: any
	let rawDataObj: RawDataObj

	if (Object.hasOwn(dataObjSource.sources, 'dataObjId')) {
		dbDataObj = await getDataObjById(new TokenApiId(dataObjSource.sources.dataObjId))
	} else if (Object.hasOwn(dataObjSource.sources, 'dataObjName')) {
		dbDataObj = await getDataObjByName(new TokenApiId(dataObjSource.sources.dataObjName))
	}

	// build rawDataObj
	rawDataObj = new RawDataObj(dbDataObj)
	let result: MethodResult = await getRawDataObjDynamic(
		rawDataObj.processType,
		queryData,
		rawDataObj,
		dataObjSource
	)
	if (result.error) return result
	rawDataObj = result.data as RawDataObj

	// update rawDataObj
	if (rawDataObj) {
		if (Object.hasOwn(dataObjSource.replacements, 'exprFilter')) {
			rawDataObj.rawQuerySource.exprFilter = dataObjSource.replacements.exprFilter
		}
		if (Object.hasOwn(dataObjSource.replacements, 'parent')) {
			rawDataObj.rawQuerySource._parent = dataObjSource.replacements.parent
		}
		return new MethodResult(rawDataObj)
	} else {
		return new MethodResult({
			error: {
				file: FILENAME,
				function: 'getRawDataObj',
				msg: `Could not retrieve dataObj using sources: ${JSON.stringify(dataObjSource)}`
			}
		})
	}
}
