import { RawDataObjPropDB } from '$comps/dataObj/types.rawDataObj.svelte'
import {
	FieldEmbed,
	FieldEmbedListConfig,
	FieldEmbedListEdit,
	FieldEmbedListSelect
} from '$comps/form/fieldEmbed'
import {
	QuerySourceParent,
	type RawDataList,
	ScriptExePost
} from '$lib/queryClient/types.queryClient'
import { dbQueryExpr } from '$server/types.queryServer'
import { getDataObjById, getDataObjByName } from '$routes/api/db/dbGel/dbGelQueries'
import { ScriptGroup } from '$routes/api/db/dbScript'
import { getRawDataObjDynamic } from '$routes/api/db/dbGel/dbGelScriptDyn'
import { GelQuery, LinkSaveAction } from '$routes/api/db/dbGel/dbGelScriptQuery'
import {
	ScriptTypeSave,
	ScriptTypeSaveParent,
	ScriptTypeSavePrimary,
	ScriptTypeSavePrimaryCore,
	ScriptTypeSavePrimaryListSelectLinkBackward,
	ScriptTypeSavePrimaryListSelectLinkForward
} from '$routes/api/db/dbGel/dbGelScriptTypes'
import { type Config, Script, ScriptItem } from '$routes/api/db/dbScript'
import { evalExpr } from '$routes/api/db/dbScriptEval'
import {
	DataObjCardinality,
	DataObjData,
	DataObjDataPropName,
	DataObjListEditPresetType,
	DataObjQueryType,
	type DataRecord,
	DataRecordStatus,
	DataRow,
	DataRows,
	debug,
	getValueData,
	MethodResult,
	ParmsValuesType,
	RawDataObj,
	required,
	strRequired
} from '$utils/types'
import {
	TokenApiQueryDataTreeAccessType,
	TokenApiDbDataObjSource,
	TokenApiId,
	TokenApiQueryData,
	TokenApiQueryType
} from '$utils/types.token'
import { FieldEmbedType } from '$utils/utils.sys'
import { error } from '@sveltejs/kit'

const FILENAME = '/$routes/api/db/dbGel/dbGelScript.ts'

export class ScriptGroupGel extends ScriptGroup {}

export class ScriptGroupGelDataObj extends ScriptGroupGel {
	constructor(obj: any) {
		super(obj)
	}
	addScript(obj: any) {
		const clazz = 'addScript'
		let result: MethodResult = super.addScript(obj)
		if (result.error) return result
		const script: Script = result.data

		const config: Config = required(obj.config, clazz, 'config')
		config.forEach((item) => {
			script.addItem(item[0], item[1])
		})
		result = this.build(script)
		if (result.error) return result
		script.expr = result.data
		return new MethodResult(script)
	}

	addScriptNew(obj: any) {
		const clazz = 'addScriptNew'
		let result: MethodResult = super.addScript(obj)
		if (result.error) return result
		const script = result.data as Script

		script.expr = required(obj.expr, clazz, 'expr')
		return new MethodResult(script)
	}

	addScriptDataItems(query: GelQuery, props: RawDataObjPropDB[], record: DataRecord) {
		const clazz = 'getPropsSelectDataItems'
		let expr = ''

		props.forEach((prop) => {
			if (prop.linkItemsSource) {
				if (prop.linkItemsSource.parmValue) {
					query.queryData?.dataTab?.parms.valueSet(
						ParmsValuesType.itemsParmValue,
						prop.linkItemsSource.parmValue
					)
				}
				if (prop.linkItemsSource.parmValueList) {
					query.queryData?.dataTab?.parms.valueSet(
						ParmsValuesType.itemsParmValueList,
						prop.linkItemsSource.parmValueList
					)
				}

				let exprProp = `${prop.linkItemsSource.getExprSelect(true, getValueData(record[prop.propName]))}`
				let result: MethodResult = evalExpr({
					expr: exprProp,
					evalExprContext: this.evalExprContext,
					queryData: query.queryData,
					querySource: this.querySource
				})
				if (result.error) return result
				exprProp = result.data

				expr = query.addItemComma(expr, `${prop.propName} := ${exprProp}`)
			}
		})

		if (!expr) expr = `dummy:= <str>{}`
		expr = `SELECT {\n${expr}\n}`
		this.addScriptNew({
			dataRows: [],
			exePost: ScriptExePost.dataItems,
			expr,
			query
		})
	}

	addScriptListPresetExpr(query: GelQuery) {
		if (!query.rawDataObj.rawQuerySource.listPresetExpr) return
		switch (query.rawDataObj.codeListPresetType) {
			case DataObjListEditPresetType.insert:
				return this.addScriptListPresetExprInsert(query)
			case DataObjListEditPresetType.insertSave:
				return this.addScriptListPresetExprInsertSave(query)
			default:
				error(500, {
					file: FILENAME,
					function: 'ScriptGroup.addScriptListPresetExpr',
					msg: `No case defined for codeListPresetType: ${query.rawDataObj.codeListPresetType}`
				})
		}
	}
	addScriptListPresetExprInsert(query: GelQuery) {
		const clazz = 'ScriptGroup.addScriptListPresetExprInsert'

		let result: MethodResult = evalExpr({
			expr: strRequired(query.rawDataObj.rawQuerySource.listPresetExpr, clazz, 'listPresetExpr'),
			evalExprContext: this.evalExprContext,
			queryData: query.queryData,
			querySource: this.querySource
		})
		if (result.error) return result

		const listPresetExpr = result.data
		return this.addScript({
			config: [
				['setValue', { key: 'expr', value: listPresetExpr }],
				['propsListPresetInsert', { props: query.rawDataObj.rawPropsSelectPreset }],
				['script', { content: ['expr', 'propsListPresetInsert'] }]
			],
			exePost: ScriptExePost.processRowSelectPreset,
			query
		})
	}

	addScriptListPresetExprInsertSave(query: GelQuery) {
		return query.parent
			? this.addScriptListPresetExprInsertSaveParentWith(query, query.parent)
			: this.addScriptListPresetExprInsertSaveParentWithOut(query)
	}
	addScriptListPresetExprInsertSaveParentWith(query: GelQuery, parent: QuerySourceParent) {
		const clazz = 'ScriptGroup.addScriptListPresetExprInsertSaveParentWith'
		const listPresetExpr = strRequired(
			query.rawDataObj.rawQuerySource.listPresetExpr,
			clazz,
			'listPresetExpr'
		)
		const recordsInsert = 'recordsInsert'
		const op = parent.columnIsMultiSelect ? '+=' : ':='
		const parms = query.queryData.getParms()
		const exprFilter = parent.filterExpr
			? parent.filterExpr
			: `.id = <tree,uuid,${parent.table.name}.id>`

		return this.addScript({
			config: [
				// data
				['wrap', { key: 'data', open: `SELECT (`, value: listPresetExpr }],
				['wrap', { key: 'data', open: `data := (`, content: ['data'] }],
				['with', { key: 'data', content: ['data'] }],

				// loop
				['action', { type: 'INSERT', table: query.getTableRootObj() }],
				['propsListEditPresetSave', { props: query.rawDataObj.rawPropsSelectPreset }],
				[
					'wrap',
					{
						key: 'loop',
						open: 'FOR item IN data UNION (',
						content: ['action', 'propsListEditPresetSave']
					}
				],

				// recordsInsert
				['wrap', { key: recordsInsert, open: `${recordsInsert} := (`, content: ['data', 'loop'] }],
				['with', { key: recordsInsert, content: [recordsInsert] }],

				// update
				['action', { type: 'UPDATE', table: parent.table.object }],
				['filter', { exprFilter }],
				['wrap', { key: 'propInsert', open: `${parent.columnName} ${op} (`, value: recordsInsert }],
				['wrap', { key: 'propInsert', open: 'SET {', content: ['propInsert'] }],

				// script
				['script', { content: [recordsInsert, 'action', 'filter', 'propInsert'] }]
			],
			exePost: ScriptExePost.none,
			query
		})
	}
	addScriptListPresetExprInsertSaveParentWithOut(query: GelQuery) {
		const clazz = 'ScriptGroup.addScriptListPresetExprInsertSaveParentWithOut'
		const listPresetExpr = strRequired(
			query.rawDataObj.rawQuerySource.listPresetExpr,
			clazz,
			'listPresetExpr'
		)
		const recordsInsert = 'recordsInsert'
		const parms = query.queryData.getParms()

		return this.addScript({
			config: [
				// data
				['wrap', { key: 'data', open: `SELECT (`, value: listPresetExpr }],
				['wrap', { key: 'data', open: `data := (`, content: ['data'] }],
				['with', { key: 'data', content: ['data'] }],

				// loop
				['action', { type: 'INSERT', table: query.getTableRootObj() }],
				['propsListEditPresetSave', { props: query.rawDataObj.rawPropsSelectPreset }],
				[
					'wrap',
					{
						key: 'loop',
						open: 'FOR item IN data UNION (',
						content: ['action', 'propsListEditPresetSave']
					}
				],

				// script
				['script', { content: ['data', 'loop'] }]
			],
			exePost: ScriptExePost.none,
			query
		})
	}

	addScriptPreset(query: GelQuery) {
		return this.addScript({
			config: [
				['propsSelectPreset', { props: query.rawDataObj.rawPropsSelectPreset }],
				['script', { content: ['propsSelectPreset'] }]
			],
			exePost: ScriptExePost.formatData,
			query
		})
	}

	async addScriptRetrieve(query: GelQuery) {
		if (query.rawDataObj.rawQuerySource.exprUnions.length > 0) {
			return this.addScriptRetrieveUnions(query)
		} else {
			return this.addScriptRetrieveBase(query)
		}
	}

	async addScriptRetrieveBase(query: GelQuery) {
		return this.addScript({
			config: [
				['with', { exprWith: query.rawDataObj.rawQuerySource.exprWith }],
				['action', { type: 'SELECT', table: query.getTableRootObj() }],
				['propsSelect', { props: query.rawDataObj.rawPropsSelect }],
				['filter'],
				['order'],
				['script', { content: ['with', 'action', 'propsSelect', 'filter', 'order'] }]
			],
			exePost: ScriptExePost.formatData,
			query
		})
	}

	async addScriptRetrieveUnions(query: GelQuery) {
		let exprWith = query.rawDataObj.rawQuerySource.exprWith || ''
		exprWith = exprWith ? `WITH ${exprWith} \n` : ''

		let exprUnions = ''
		query.rawDataObj.rawQuerySource.exprUnions.forEach((item) => {
			if (exprUnions) exprUnions += ' UNION '
			exprUnions += `(${item})`
		})
		exprUnions = `SELECT { ${exprUnions} }`

		let propsSelect = query.getPropsSelect({ props: query.rawDataObj.rawPropsSelect })
		let exprSort = query.getSort()

		let expr = exprWith ? `WITH ${exprWith} \n` : ''
		expr += exprUnions + '\n'
		expr += propsSelect + '\n'
		expr += exprSort ? ` ${exprSort} \n` : ''

		this.addScriptNew({
			dataRows: [],
			exePost: ScriptExePost.formatData,
			expr,
			query
		})
	}

	addScriptSave(query: GelQuery) {
		const dataQuery = this.queryData.dataTab.getFieldEmbedData(
			query.fieldEmbed,
			this.evalExprContext
		)
		const dataRowsSaved = required(dataQuery.rowsSave, 'ScriptGroup', 'dataQuery.rowsSave')
		let items: [string, DataRecordStatus[]][] = [
			['DELETE', [DataRecordStatus.delete]],
			['INSERT', [DataRecordStatus.preset]],
			['UPDATE', [DataRecordStatus.retrieved, DataRecordStatus.update]]
		]
		items.forEach((item) => {
			const action = item[0]
			const statuses = item[1]
			const dataRows = dataRowsSaved.dataRows.filter((row: DataRow) =>
				statuses.includes(row.status)
			)
			if (query.fieldEmbed && action == 'DELETE') return
			if (
				dataRows.length > 0 ||
				(query.fieldEmbed instanceof FieldEmbedListSelect && action == 'UPDATE')
			) {
				this.addScriptSaveItem(query, action, dataRows)
			}
		})
	}
	addScriptSaveItem(query: GelQuery, action: string, dataRows: DataRow[]): MethodResult {
		let config: Config = []
		let expr: string
		let result: MethodResult
		switch (action) {
			case 'DELETE':
				config = this.addScriptSaveDelete(query)
				break
			case 'INSERT':
				result = this.addScriptSaveAction(query, dataRows, LinkSaveAction.INSERT)
				if (result.error) return result
				expr = result.data
				if (expr) {
					this.addScriptNew({
						dataRows,
						exePost: ScriptExePost.formatData,
						expr,
						query
					})
				}
				break
			case 'UPDATE':
				result = this.addScriptSaveAction(query, dataRows, LinkSaveAction.UPDATE)
				if (result.error) return result
				expr = result.data
				if (expr) {
					this.addScriptNew({
						dataRows,
						exePost: ScriptExePost.formatData,
						expr,
						query
					})
				}
				break
			default:
				return new MethodResult({
					error: {
						file: FILENAME,
						function: 'Script.initScriptSaveItem',
						msg: `No case defined for action: ${action}`
					}
				})
		}
		if (config.length > 0) {
			this.addScript({
				config,
				dataRows,
				exePost: ScriptExePost.formatData,
				query
			})
		}
		return new MethodResult()
	}

	addScriptSaveAction(query: GelQuery, dataRows: DataRow[], action: LinkSaveAction): MethodResult {
		const clazz = 'ScriptGroup.addScriptSaveAction'
		let result: MethodResult
		let scriptPrimary: ScriptTypeSavePrimary
		const isListSelectLinkBackward =
			query.fieldEmbed instanceof FieldEmbedListSelect && query.fieldEmbed.columnBacklink
		const isListSelectLinkForward =
			query.fieldEmbed instanceof FieldEmbedListSelect && !query.fieldEmbed.columnBacklink
		let exprParent = ''
		let exprPrimary = ''

		if (isListSelectLinkBackward) {
			const parentTableName = strRequired(
				query.parent?.table.name,
				clazz,
				'query.parent.table.name'
			)
			result = query.queryData.dataTree.getDataRow(
				TokenApiQueryDataTreeAccessType.table,
				parentTableName
			)
			if (result.error) return result
			scriptPrimary = new ScriptTypeSavePrimaryListSelectLinkBackward({
				action,
				dataRows: [result.data],
				query
			})
		} else {
			// parent
			if (query.parent) {
				result = query.queryData.dataTree.getDataRow(
					TokenApiQueryDataTreeAccessType.table,
					query.parent.table.name
				)
				if (result.error) return result
				let scriptParent = new ScriptTypeSaveParent({
					action,
					dataRows: [result.data],
					isListSelect: isListSelectLinkForward,
					query
				})
				exprParent = scriptParent.build()
			}
			if (isListSelectLinkForward) {
				scriptPrimary = new ScriptTypeSavePrimaryListSelectLinkForward({
					action,
					dataRows,
					query
				})
			} else {
				scriptPrimary = new ScriptTypeSavePrimaryCore({
					action,
					dataRows,
					query
				})
			}
		}
		exprPrimary = scriptPrimary.build()
		let expr = exprParent ? ScriptTypeSave.addItem(exprPrimary, exprParent, ',\n') : exprPrimary
		return new MethodResult(ScriptTypeSave.addItem(expr, scriptPrimary.getExprPropsSelect(), '\n'))
	}

	// prettier-ignore
	addScriptSaveDelete(query: GelQuery): Config {
		return [
			['action', { type: 'DELETE', table: query.getTableRootObj() }],
			['filter', { exprFilter: `.id = <uuid>item['id']` }],
			['wrap', { key: 'loop', open: this.scriptSegmentLoop, content: ['action', 'filter'] }],
			...this.addScriptSavePost(query)
		]
	}

	addScriptSavePost(query: GelQuery): Config {
		return [
			['data'],
			['wrap', { key: 'records', open: 'Records := (', content: ['loop'] }],
			['with', { content: ['data', 'records'] }],

			['action', { type: 'SELECT', table: 'Records' }],
			['propsSelect', { props: query.rawDataObj.rawPropsSelect }],
			['order'],
			['script', { content: ['with', 'action', 'propsSelect', 'order'] }]
		]
	}

	build(script: Script): MethodResult {
		let values: DataRecord = {}
		const query: GelQuery = required(script.query, 'ScriptGroupDo.build', 'query')

		script.items.forEach((item: ScriptItem) => {
			const action = item.action
			const parms = item.parms
			const key = item.getParm('key') || action
			let element = ''

			switch (action) {
				case 'action':
					element = `${parms.type} ${parms.table}`
					break

				case 'combine':
					element = this.buildCombineValues(script, values, item.getParm('content'))
					break

				case 'data':
					element = `data := (SELECT to_json($$${JSON.stringify(script.dataRows.map((row: DataRow) => row.record))}$$))`
					break

				case 'filter':
					const exprFilter = item.getParm('exprFilter')
					element = exprFilter
						? `FILTER ${exprFilter}`
						: query.getFilter(script.scriptGroup.queryData)
					break

				case 'order':
					element = query.getSort()
					break

				case 'prop':
					if (Object.hasOwn(parms, 'content')) {
						element = this.buildCombineValues(script, values, item.getParm('content'))
					}
					if (Object.hasOwn(parms, 'value')) {
						element = item.getParm('value')
					}
					element = `${item.getParm('label')} := (${element})`
					break

				case 'propsListPresetInsert':
					element = query.getpropsListPresetInsert(parms)
					break

				case 'propsListEditPresetSave':
					element = query.getPropsListPresetSave(parms, script.scriptGroup.queryData)
					break

				case 'propsSelect':
					element = query.getPropsSelect(parms)
					break

				case 'propsSelectPreset':
					element = query.getPropsSelectPreset(parms, script.scriptGroup.queryData)
					break

				case 'script':
					element = this.buildCombineValues(script, values, item.getParm('content'))
					break

				case 'setValue':
					element = item.getParm('value')
					break

				case 'values':
					values = { ...values, ...parms }
					break

				case 'with':
					element = item.getParm('exprWith')
					if (element) {
						element = element.replaceAll(
							ParmsValuesType.attributeAccessFilter,
							script.scriptGroup.queryData.attrAccessFilter
						)
					}
					if (!element) {
						element = this.buildCombineValues(script, values, item.getParm('content'), ',')
						element = script.addComponent(element, item.getParm('value'))
					}
					if (element) element = `WITH\n${element}`
					break

				case 'wrap':
					let close = ''
					let open = item.getParm('open').trim().slice(-1)
					switch (open) {
						case '(':
							close = ')'
							break
						case '[':
							close = ']'
							break
						case '{':
							close = '}'
							break
						default:
							return new MethodResult({
								error: {
									file: FILENAME,
									function: 'Script.build.wrap',
									msg: `No case defined for open: ${open}`
								}
							})
					}

					element = script.addComponent(element, item.getParm('open'))
					element = script.addComponent(
						element,
						this.buildCombineValues(script, values, item.getParm('content'))
					)
					element = script.addComponent(element, item.getParm('value'))
					element = script.addComponent(element, close)
					break

				default:
					return new MethodResult({
						error: {
							file: FILENAME,
							function: 'Script.build',
							msg: `No case defined for action: ${action}`
						}
					})
			}
			if (element) values[key] = element
		})
		return new MethodResult(values.script)
	}

	buildCombineValues(
		script: Script,
		values: DataRecord,
		keys: string[] | undefined,
		separator = ''
	) {
		let item = ''
		if (keys) {
			keys.forEach((key: string) => {
				if (values[key]) item = script.addComponent(item, values[key], separator)
			})
		}
		return item
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

		this.queryData.dataTab?.parms.valueSetIfMissing(
			ParmsValuesType.queryOwnerSys,
			rawDataObj.ownerId
		)

		if (this.queryType !== TokenApiQueryType.save) {
			if (rawDataObj.codeDoQueryType === DataObjQueryType.preset) {
				this.queryType = TokenApiQueryType.preset
			} else if (rawDataObj.codeDoQueryType === DataObjQueryType.retrieve) {
				this.queryType = TokenApiQueryType.retrieve
			} else if (rawDataObj.codeDoQueryType === DataObjQueryType.retrievePreset) {
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
				this.addScriptPreset(query)
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
				this.addScriptListPresetExpr(query)
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
				this.addScriptSave(query)
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
		let result: MethodResult = await this.scriptsBuildQueryEmbedFields(
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
		switch (script.exePost) {
			case ScriptExePost.dataItems:
				this.queryExeFormatDataSet(this.queryData.dataTab, query.fieldEmbed?.embedFieldNameRaw, [
					[DataObjDataPropName.items, rawDataList.length > 0 ? rawDataList[0] : []]
				])
				break

			case ScriptExePost.formatData:
				dataRows = query.dataFormat(rawDataList)
				let dataRow: DataRow = new DataRow(DataRecordStatus.unknown, {})
				this.queryExeFormatDataSet(this.queryData.dataTab, query.fieldEmbed?.embedFieldNameRaw, [
					[DataObjDataPropName.rawDataObj, scriptData.rawDataObj],
					[DataObjDataPropName.rowsRetrieved, dataRows]
				])

				if (query.rawDataObj.codeCardinality === DataObjCardinality.detail) {
					dataRow = required(dataRows.getDetailRow(), clazz, 'dataRow')

					// set embedded parent tree records
					const rootTableName = strRequired(
						query.rawDataObj.tableGroup.getTableName(0),
						clazz,
						'rootTableName'
					)

					this.queryData.updateTableData(rootTableName, dataRow)

					// this.scripts.forEach((script: Script) => {
					// 	script.scriptGroup.queryData.updateTableData(rootTableName, dataRow)
					// })
				}

				// add dataItems
				script.scriptGroup.queryData.dataTab?.parms.update(scriptData.parms.valueGetAll())
				this.addScriptDataItems(query, query.rawDataObj.rawPropsSelect, dataRow.record)
				break

			case ScriptExePost.none:
				break

			case ScriptExePost.processRowSelectPreset:
				dataRows = query.dataFormat(rawDataList)
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

	async scriptsBuildQueryEmbedFields(rawDataObjParent: RawDataObj, queryData: TokenApiQueryData) {
		const clazz = 'ScriptGroupDo.scriptsBuildQueryEmbedFields'
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

export class ScriptGroupGelExpr extends ScriptGroupGel {
	async queryPre(): Promise<MethodResult> {
		const clazz = `${FILENAME}.ScriptGroupGelExpr.queryBuild`
		return super.addScript({
			expr: strRequired(this.tokenQuery.querySourceRaw.exprCustom, clazz, 'exprCustom')
		})
	}
}

export async function getRawDataObj(
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
