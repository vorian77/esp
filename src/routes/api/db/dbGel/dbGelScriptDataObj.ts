import { PropLinkItemsSource, RawDataObjPropDB } from '$comps/dataObj/types.rawDataObj.svelte'
import { FieldEmbedListSelect } from '$comps/form/fieldEmbed.svelte'
import { QuerySourceParent, ScriptExePost } from '$lib/queryClient/types.queryClient'
import { GelQuery, LinkSaveAction } from '$routes/api/db/dbGel/dbGelScriptQuery'
import {
	ScriptTypeSave,
	ScriptTypeSaveParent,
	ScriptTypeSavePrimary,
	ScriptTypeSavePrimaryCore,
	ScriptTypeSavePrimaryListSelectLinkBackward,
	ScriptTypeSavePrimaryListSelectLinkForward
} from '$routes/api/db/dbGel/dbGelScriptTypes'
import { type Config, Script } from '$routes/api/db/dbScript'
import { evalExpr } from '$utils/utils.evalParserDb'
import {
	DataObjListEditPresetType,
	type DataRecord,
	DataRecordStatus,
	DataRow,
	debug,
	MethodResult,
	ParmsValues,
	ParmsValuesType,
	PropDataType,
	recordValueGetData,
	required,
	strRequired
} from '$utils/types'
import { TokenApiQueryDataTreeAccessType } from '$utils/types.token'
import { ScriptGroupGel } from '$routes/api/db/dbGel/dbGelScript'
import { getValDb } from '$utils/utils.evalParserDb'
import { error } from '@sveltejs/kit'

const FILENAME = '/$routes/api/db/dbGel/dbGelScriptDataObj.ts'

export class ScriptGroupGelDataObj extends ScriptGroupGel {
	constructor(obj: any) {
		super(obj)
	}
	async addScriptConfig(obj: any): Promise<MethodResult> {
		const clazz = 'addScriptConfig'
		let result: MethodResult = await this.addScript(obj)
		if (result.error) return result
		const script: Script = result.data

		const config: Config = required(obj.config, clazz, 'config')
		config.forEach((item) => {
			script.addItem(item[0], item[1])
		})
		result = await this.build(script)
		if (result.error) return result
		script.expr = result.data
		return new MethodResult(script)
	}

	async addScriptExpr(obj: any): Promise<MethodResult> {
		const clazz = 'addScriptExpr'
		let result: MethodResult = await this.addScript(obj)
		if (result.error) return result
		const script = result.data as Script

		script.expr = strRequired(obj.expr, clazz, 'expr')
		return new MethodResult(script)
	}

	async addScriptDataItems(
		query: GelQuery,
		linkItemsSource: PropLinkItemsSource,
		currentValue: any = undefined
	): Promise<MethodResult> {
		const clazz = 'addScriptDataItemsFields'
		let expr = ''

		const setParm = (
			parms: ParmsValues | undefined,
			parmType: ParmsValuesType,
			newValue: any,
			codeDataType: PropDataType
		) => {
			if (parms) {
				if (newValue) {
					parms.valueSet(parmType, newValue)
				} else {
					const result: MethodResult = getValDb(codeDataType, undefined)
					if (result.error) return result
					const defaultValue = result.data.value
					parms.valueSet(parmType, defaultValue)
				}
			}
		}

		setParm(
			query.queryData?.dataTab?.parms,
			ParmsValuesType.itemsParmValue,
			linkItemsSource.parmValue,
			PropDataType.uuid
		)
		setParm(
			query.queryData?.dataTab?.parms,
			ParmsValuesType.itemsParmValueList,
			linkItemsSource.parmValueList,
			PropDataType.uuidList
		)

		let exprProp = `${linkItemsSource.getExprSelect(true, currentValue)}`

		return await evalExpr({
			evalExprContext: this.evalExprContext,
			exprRaw: exprProp,
			queryData: query.queryData,
			querySource: this.querySource
		})
	}

	async addScriptDataItemsFields(
		query: GelQuery,
		props: RawDataObjPropDB[],
		record: DataRecord
	): Promise<MethodResult> {
		const clazz = 'addScriptDataItemsFields'
		let expr = ''

		for (let prop of props) {
			if (prop.linkItemsSource) {
				let result: MethodResult = await this.addScriptDataItems(
					query,
					prop.linkItemsSource,
					recordValueGetData(record, prop.propNameKey)
				)
				if (result.error) return result
				let exprProp = result.data
				expr = query.addItemComma(expr, `${prop.propNameKey} := ${exprProp}`)
			}
		}

		if (!expr) expr = `dummy:= <str>{}`
		expr = `SELECT {\n${expr}\n}`
		await this.addScriptExpr({
			dataRows: [],
			exePost: ScriptExePost.dataItemsFields,
			expr,
			query
		})
		return new MethodResult()
	}

	async addScriptDataItemsSelectList(
		query: GelQuery,
		linkItemsSource: PropLinkItemsSource | undefined
	) {
		if (linkItemsSource) {
			let result: MethodResult = await this.addScriptDataItems(query, linkItemsSource)
			if (result.error) return result
			let expr = result.data || `dummy:= <str>{}`
			expr = expr = `SELECT {\n${expr}\n}`
			await this.addScriptExpr({
				dataRows: [],
				exePost: ScriptExePost.dataItemsSelect,
				expr,
				query
			})
		}
		return new MethodResult()
	}

	async addScriptListPresetExpr(query: GelQuery): Promise<MethodResult> {
		if (!query.rawDataObj.rawQuerySource.listPresetExpr) return new MethodResult()
		switch (query.rawDataObj.codeListPresetType) {
			case DataObjListEditPresetType.insert:
				return await this.addScriptListPresetExprInsert(query)
			case DataObjListEditPresetType.insertSave:
				return await this.addScriptListPresetExprInsertSave(query)
			default:
				error(500, {
					file: FILENAME,
					function: 'ScriptGroup.addScriptListPresetExpr',
					msg: `No case defined for codeListPresetType: ${query.rawDataObj.codeListPresetType}`
				})
		}
	}
	async addScriptListPresetExprInsert(query: GelQuery): Promise<MethodResult> {
		const clazz = 'ScriptGroup.addScriptListPresetExprInsert'

		let result: MethodResult = await evalExpr({
			evalExprContext: this.evalExprContext,
			exprRaw: strRequired(query.rawDataObj.rawQuerySource.listPresetExpr, clazz, 'listPresetExpr'),
			queryData: query.queryData,
			querySource: this.querySource
		})
		if (result.error) return result

		const listPresetExpr = result.data
		return await this.addScriptConfig({
			config: [
				['setValue', { key: 'expr', value: listPresetExpr }],
				['propsListPresetInsert', { props: query.rawDataObj.rawPropsSelectPreset }],
				['script', { content: ['expr', 'propsListPresetInsert'] }]
			],
			exePost: ScriptExePost.processRowSelectPreset,
			query
		})
	}

	async addScriptListPresetExprInsertSave(query: GelQuery): Promise<MethodResult> {
		return query.parent
			? await this.addScriptListPresetExprInsertSaveParentWith(query, query.parent)
			: await this.addScriptListPresetExprInsertSaveParentWithOut(query)
	}
	async addScriptListPresetExprInsertSaveParentWith(
		query: GelQuery,
		parent: QuerySourceParent
	): Promise<MethodResult> {
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

		return await this.addScriptConfig({
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
	async addScriptListPresetExprInsertSaveParentWithOut(query: GelQuery): Promise<MethodResult> {
		const clazz = 'ScriptGroup.addScriptListPresetExprInsertSaveParentWithOut'
		const listPresetExpr = strRequired(
			query.rawDataObj.rawQuerySource.listPresetExpr,
			clazz,
			'listPresetExpr'
		)
		const recordsInsert = 'recordsInsert'
		const parms = query.queryData.getParms()

		return await this.addScriptConfig({
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

	async addScriptPreset(query: GelQuery): Promise<MethodResult> {
		return await this.addScriptConfig({
			config: [
				['propsSelectPreset', { props: query.rawDataObj.rawPropsSelectPreset }],
				['script', { content: ['propsSelectPreset'] }]
			],
			exePost: ScriptExePost.formatData,
			query
		})
	}

	async addScriptRetrieve(query: GelQuery) {
		if (query.rawDataObj.rawQuerySource.exprUnions.length === 0) {
			return await this.addScriptRetrieveBase(query)
		} else {
			return await this.addScriptRetrieveUnions(query)
		}
	}

	async addScriptRetrieveBase(query: GelQuery): Promise<MethodResult> {
		return await this.addScriptConfig({
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

	async addScriptRetrieveUnions(query: GelQuery): Promise<void> {
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

		await this.addScriptExpr({
			dataRows: [],
			exePost: ScriptExePost.formatData,
			expr,
			query
		})
	}

	async addScriptSave(query: GelQuery): Promise<MethodResult> {
		let result: MethodResult
		const dataQuery = this.queryData.dataTab.getFieldEmbedData(query.fieldEmbed)
		const dataRowsSaved = required(dataQuery.rowsSave, 'ScriptGroup', 'dataQuery.rowsSave')
		let items: [string, DataRecordStatus[]][] = [
			['DELETE', [DataRecordStatus.delete]],
			['INSERT', [DataRecordStatus.preset]],
			['UPDATE', [DataRecordStatus.retrieved, DataRecordStatus.update]]
		]
		for (let item of items) {
			const action = item[0]
			const statuses = item[1]
			const dataRows = dataRowsSaved.dataRows.filter((row: DataRow) =>
				statuses.includes(row.status)
			)
			if (query.fieldEmbed && action == 'DELETE') continue
			if (
				dataRows.length > 0 ||
				(query.fieldEmbed instanceof FieldEmbedListSelect && action == 'UPDATE')
			) {
				result = await this.addScriptSaveItem(query, action, dataRows)
				if (result.error) return result
			}
		}
		return new MethodResult()
	}

	async addScriptSaveItem(
		query: GelQuery,
		action: string,
		dataRows: DataRow[]
	): Promise<MethodResult> {
		let config: Config = []
		let expr: string
		let result: MethodResult
		switch (action) {
			case 'DELETE':
				config = await this.addScriptSaveItemDelete(query)
				break
			case 'INSERT':
				result = await this.addScriptSaveItemAction(query, dataRows, LinkSaveAction.INSERT)
				if (result.error) return result
				expr = result.data
				if (expr) {
					await this.addScriptExpr({
						dataRows,
						exePost: ScriptExePost.formatData,
						expr,
						query
					})
				}
				break
			case 'UPDATE':
				result = await this.addScriptSaveItemAction(query, dataRows, LinkSaveAction.UPDATE)
				if (result.error) return result
				expr = result.data
				if (expr) {
					await this.addScriptExpr({
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
			await this.addScriptConfig({
				config,
				dataRows,
				exePost: ScriptExePost.formatData,
				query
			})
		}
		return new MethodResult()
	}

	async addScriptSaveItemAction(
		query: GelQuery,
		dataRows: DataRow[],
		action: LinkSaveAction
	): Promise<MethodResult> {
		const clazz = 'ScriptGroup.addScriptSaveItemAction'
		let result: MethodResult
		let scriptPrimary: ScriptTypeSavePrimary
		const isListSelectLinkBackward =
			query.fieldEmbed instanceof FieldEmbedListSelect &&
			query.fieldEmbed.rawFieldEmbedList.parentColumnBackLink !== undefined
		const isListSelectLinkForward =
			query.fieldEmbed instanceof FieldEmbedListSelect &&
			query.fieldEmbed.rawFieldEmbedList.parentColumnBackLink === undefined
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
				result = await scriptParent.build()
				if (result.error) return result
				exprParent = result.data
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
		result = await scriptPrimary.build()
		if (result.error) return result
		exprPrimary = result.data

		let expr = exprParent ? ScriptTypeSave.addItem(exprPrimary, exprParent, ',\n') : exprPrimary
		return new MethodResult(ScriptTypeSave.addItem(expr, scriptPrimary.getExprPropsSelect(), '\n'))
	}

	// prettier-ignore
	async addScriptSaveItemDelete(query: GelQuery): Promise<Config> {
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

	async build(script: Script): Promise<MethodResult> {
		let values: DataRecord = {}
		const query: GelQuery = required(script.query, 'ScriptGroupDo.build', 'query')
		let result: MethodResult

		for (const item of script.items) {
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
					result = await query.getPropsListPresetSave(parms, script.scriptGroup.queryData)
					if (result.error) return result
					element = result.data
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
		}
		return new MethodResult(values.script)
	}

	buildCombineValues(
		script: Script,
		values: DataRecord,
		keys: string[] | undefined,
		separator = ''
	): string {
		let item = ''
		if (keys) {
			keys.forEach((key: string) => {
				if (values[key]) item = script.addComponent(item, values[key], separator)
			})
		}
		return item
	}
}
