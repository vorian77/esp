import {
	FieldEmbedList,
	FieldEmbedListConfig,
	FieldEmbedListEdit,
	FieldEmbedListSelect
} from '$comps/form/fieldEmbed.svelte'
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
	ParmsValuesFormList,
	ParmsValuesType,
	RawDataObj,
	RawFieldEmbedList,
	required,
	strRequired,
	valueOrDefault
} from '$utils/types'
import {
	Token,
	TokenApiDbDataObjSource,
	TokenApiId,
	TokenApiQueryData,
	TokenApiQueryType,
	TokenApiQueryTypeAlt
} from '$utils/types.token'
import { FieldEmbedListType } from '$utils/utils.sys'
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

		if (this.queryType === TokenApiQueryType.retrieve && this.queryData?.node?.codeQueryTypeAlt) {
			if (this.queryData.node.codeQueryTypeAlt === TokenApiQueryTypeAlt.retrieveThenPreset) {
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
			} else if (this.queryData.node.codeQueryTypeAlt === TokenApiQueryTypeAlt.retrieveToPreset) {
				this.queryType = TokenApiQueryType.preset
			}
		}

		// queries
		const query = new GelQuery({
			evalExprContext: this.evalExprContext,
			queryData: this.queryData,
			querySource: this.querySource,
			rawDataObj
		})
		return await this.queryBuildScripts(query, this.queryType)
	}

	async queryBuildScripts(query: GelQuery, queryType: TokenApiQueryType): Promise<MethodResult> {
		const clazz = 'queryBuildScripts'
		let result: MethodResult
		let fieldEmbedData: DataObjData = this.queryData.dataTab.getFieldEmbedData(query.fieldEmbed)

		switch (queryType) {
			case TokenApiQueryType.preset:
				result = await this.queryBuildScriptsFields(fieldEmbedData, query)
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
				result = await this.queryBuildScriptsFields(fieldEmbedData, query)
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
				fieldEmbedData.fields = this.queryData.dataTab.getFieldEmbedFields(query.fieldEmbed)
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
			const recordStatusSave = query.queryData.dataTab.rowsSave.getDetailRowStatus()
			for (let i = 0; i < fieldEmbedData.fields.length; i++) {
				const fieldEmbedList: FieldEmbedList = fieldEmbedData.fields[i]

				let queryTypeEmbed =
					queryType === TokenApiQueryType.save &&
					fieldEmbedList.embedData.parmsFormList.valueGet(ParmsValuesType.isEmbedSaveWithParent)
						? TokenApiQueryType.save
						: TokenApiQueryType.retrieve
				if (
					queryTypeEmbed === TokenApiQueryType.save &&
					!(fieldEmbedList.embedData.rawDataObj instanceof RawDataObj)
				) {
					// preserve save data
					const parmsFormList: ParmsValuesFormList = fieldEmbedList.embedData.parmsFormList
					const rowsSave: DataRows = fieldEmbedList.embedData.rowsSave

					// create new embedData
					let result: MethodResult = await FieldEmbedList.getEmbedData(
						fieldEmbedList._parentPropRaw,
						this.queryData,
						getRawDataObj
					)
					if (result.error) return result
					let embedData: DataObjData = result.data
					fieldEmbedList.embedData = embedData

					// restore parms and rowsSave
					embedData.parmsFormList = parmsFormList
					embedData.rowsSave = rowsSave
				}
				let fieldQueryData = TokenApiQueryData.load(this.queryData)
				fieldQueryData.dataTab = fieldEmbedList.embedData

				await this.queryBuildScripts(
					new GelQuery({
						evalExprContext: `${this.evalExprContext} - embedList: ${fieldEmbedList.embedData.rawDataObj?.name}`,
						fieldEmbed: fieldEmbedList,
						queryData: fieldQueryData,
						querySource: this.querySource,
						rawDataObj: fieldEmbedList.embedData.rawDataObj
					}),
					queryTypeEmbed
				)
			}
		}
		return new MethodResult()
	}

	async queryBuildScriptsFields(data: DataObjData, query: GelQuery): Promise<MethodResult> {
		let result: MethodResult = await this.queryBuildScriptsFieldsEmbeded(
			query.rawDataObj,
			this.queryData
		)
		if (result.error) return result
		data.fields = result.data
		return new MethodResult()
	}

	async queryBuildScriptsFieldsEmbeded(rawDataObjParent: RawDataObj, queryData: TokenApiQueryData) {
		let fields: FieldEmbedList[] = []
		const parentDataObjId = strRequired(rawDataObjParent.id, FILENAME, 'rawDataObjParent.id')
		for (let i = 0; i < rawDataObjParent.rawPropsDisplay.length; i++) {
			const propRaw = rawDataObjParent.rawPropsDisplay[i]
			let FieldEmbedListClass: any = undefined
			if (propRaw.rawFieldEmbedList && propRaw.fieldEmbedListType) {
				if (propRaw.fieldEmbedListType === FieldEmbedListType.listConfig) {
					FieldEmbedListClass = FieldEmbedListConfig
				} else if (propRaw.fieldEmbedListType === FieldEmbedListType.listEdit) {
					FieldEmbedListClass = FieldEmbedListEdit
				} else if (propRaw.fieldEmbedListType === FieldEmbedListType.listSelect) {
					FieldEmbedListClass = FieldEmbedListSelect
				}

				if (FieldEmbedListClass) {
					let result: MethodResult = await FieldEmbedList.getEmbedData(
						propRaw,
						queryData,
						getRawDataObj
					)
					if (result.error) return result
					const embedData: DataObjData = result.data

					const fieldEmbed: FieldEmbedList = new FieldEmbedListClass(
						parentDataObjId,
						propRaw,
						embedData
					)
					fields.push(fieldEmbed)
				}
			}
		}
		return new MethodResult(fields)
	}

	async queryExeFormat(script: Script, rawDataList: RawDataList): Promise<MethodResult> {
		const clazz = 'ScriptGroupDo.queryExeFormat'
		const query: GelQuery = required(script.query, clazz, 'script.query')
		const scriptData: DataObjData = this.queryData.dataTab.getFieldEmbedData(query.fieldEmbed)
		let dataRows: DataRows = new DataRows()
		let result: MethodResult

		if (scriptData?.rawDataObj?.codeCardinality === DataObjCardinality.list) {
			scriptData.parmsFormList = new ParmsValuesFormList({
				listIds: scriptData.rowsRetrieved.getRowsIds()
			})
		}

		switch (script.exePost) {
			case ScriptExePost.dataItemsFields:
				this.queryExeFormatDataSet(
					this.queryData.dataTab,
					query.fieldEmbed?.rawFieldEmbedList.embedPropName,
					[[DataObjDataPropName.itemsField, rawDataList.length > 0 ? rawDataList[0] : []]]
				)
				break

			case ScriptExePost.dataItemsSelect:
				this.queryExeFormatDataSet(
					this.queryData.dataTab,
					query.fieldEmbed?.rawFieldEmbedList.embedPropName,
					[[DataObjDataPropName.itemsSelect, rawDataList.length > 0 ? rawDataList : []]]
				)
				break

			case ScriptExePost.formatData:
				result = await query.dataFormat(rawDataList)
				if (result.error) return result
				dataRows = result.data

				let dataRow: DataRow = new DataRow(DataRecordStatus.unknown, {})
				this.queryExeFormatDataSet(
					this.queryData.dataTab,
					query.fieldEmbed?.rawFieldEmbedList.embedPropName,
					[
						[DataObjDataPropName.rawDataObj, scriptData.rawDataObj],
						[DataObjDataPropName.rowsRetrieved, dataRows]
					]
				)

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

				this.queryExeFormatDataSet(
					this.queryData.dataTab,
					query.fieldEmbed?.rawFieldEmbedList.embedPropName,
					[
						[DataObjDataPropName.rawDataObj, scriptData.rawDataObj],
						[DataObjDataPropName.rowsRetrieved, dataRows]
					]
				)
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
		fieldEmbedName: string | undefined,
		dataItems: [DataObjDataPropName, any][]
	) {
		if (fieldEmbedName) {
			const idx = dataReturn.fields.findIndex(
				(field) => field.rawFieldEmbedList.embedPropName === fieldEmbedName
			)
			if (idx >= 0) {
				dataItems.forEach((item: [DataObjDataPropName, any]) => {
					const propName = item[0]
					const newData = item[1]
					dataReturn.fields[idx].embedData.setValue(propName, newData)
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
}

async function getRawDataObj(
	dataObjSource: TokenApiDbDataObjSource,
	queryData: TokenApiQueryData | undefined
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

	// add dynamic processing to rawDataObj
	if (queryData && rawDataObj.processType) {
		let result: MethodResult = await getRawDataObjDynamic(
			rawDataObj.processType,
			queryData,
			rawDataObj,
			dataObjSource
		)
		if (result.error) return result
		rawDataObj = result.data as RawDataObj
	}
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
