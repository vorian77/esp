import {
	DataObjCardinality,
	DataObjData,
	DataObjListEditPresetType,
	DataObjQueryRiderTriggerTiming,
	DataObjQueryRiderType,
	DataObjQueryRiders,
	DataRecordStatus,
	debug,
	getArray,
	getDataRecordValueType,
	ParmsValuesType,
	required,
	strRequired
} from '$utils/types'
import { Field, FieldEmbedType, FieldValueType, PropsFieldCreate } from '$comps/form/field.svelte'
import type { DataObjTable, DataRecord, DataRow } from '$utils/types'
import { TokenApiQueryData, TokenApiQueryType } from '$utils/types.token'
import { RawDataObjPropDB } from '$comps/dataObj/types.rawDataObj.svelte'
import { LinkSaveAction, Query, QueryParent } from '$routes/api/dbGel/dbGelQuery'
import { evalExpr, EvalExprContext } from '$routes/api/dbGel/dbGelGetVal'
import { FieldEmbedListSelect } from '$comps/form/fieldEmbed'
import {
	ScriptTypeSave,
	ScriptTypeSaveParent,
	ScriptTypeSavePrimary,
	ScriptTypeSavePrimaryCore,
	ScriptTypeSavePrimaryListSelectLinkBackward,
	ScriptTypeSavePrimaryListSelectLinkForward
} from '$routes/api/dbGel/dbGelScriptTypes'
import { error } from '@sveltejs/kit'

const FILENAME = '/$routes/api/dbGel/dbGelScript.ts'

type Config = [string, DataRecord?][]

export class ScriptGroup {
	scriptSegmentLoop = 'FOR item IN json_array_unpack(data) UNION ('
	scripts: Script[] = []
	constructor() {}
	addScript(
		query: Query,
		queryType: TokenApiQueryType,
		queryData: TokenApiQueryData,
		exePost: ScriptExePost,
		config: Config,
		dataRows: DataRow[] = []
	) {
		const script = new Script(query, queryType, queryData, exePost, dataRows)
		config.forEach((item) => {
			script.addItem(item[0], item[1])
		})
		script.build()
		this.scripts.push(script)
		return script
	}
	addScriptNew(
		query: Query,
		queryType: TokenApiQueryType,
		queryData: TokenApiQueryData,
		exePost: ScriptExePost,
		dataRows: DataRow[] = [],
		expr: string
	) {
		let script = new Script(query, queryType, queryData, exePost, dataRows)
		script.script = expr
		this.scripts.push(script)
		return script
	}

	addScriptDataItems(
		query: Query,
		queryData: TokenApiQueryData,
		props: RawDataObjPropDB[],
		record: DataRecord
	) {
		const clazz = 'getPropsSelectDataItems'
		let expr = ''

		props.forEach((prop) => {
			if (prop.linkItemsSource) {
				if (prop.linkItemsSource.parmValue) {
					queryData?.dataTab?.parms.valueSet(
						ParmsValuesType.itemsParmValue,
						prop.linkItemsSource.parmValue
					)
				}
				if (prop.linkItemsSource.parmValueList) {
					queryData?.dataTab?.parms.valueSet(
						ParmsValuesType.itemsParmValueList,
						prop.linkItemsSource.parmValueList
					)
				}

				let propValueType: string | string[] | undefined = undefined
				if (prop.propNameRaw !== 'attrs') {
					propValueType = getDataRecordValueType(
						record[prop.propName],
						FieldValueType.data,
						prop.codeDataType,
						prop.isMultiSelect
					)
				}

				let propValue = `${prop.linkItemsSource.getExprSelect(true, propValueType)}`
				propValue = evalExpr(
					propValue,
					queryData,
					new EvalExprContext(clazz, query.rawDataObj.name)
				)
				expr = query.addItemComma(expr, `${prop.propName} := ${propValue}`)
			}
		})

		if (!expr) expr = `dummy:= <str>{}`
		expr = `SELECT {\n${expr}\n}`
		this.addScriptNew(
			query,
			TokenApiQueryType.retrieve,
			queryData,
			ScriptExePost.dataItems,
			[],
			expr
		)
	}

	addScriptPreset(query: Query, queryData: TokenApiQueryData) {
		return this.addScript(query, TokenApiQueryType.preset, queryData, ScriptExePost.formatData, [
			['propsSelectPreset', { props: query.rawDataObj.rawPropsSelectPreset }],
			['script', { content: ['propsSelectPreset'] }]
		])
	}
	addScriptPresetListEdit(query: Query, queryData: TokenApiQueryData) {
		if (!query.rawDataObj.listEditPresetExpr) return
		switch (query.rawDataObj.codeListEditPresetType) {
			case DataObjListEditPresetType.insert:
				return this.addScriptPresetListEditInsert(query, queryData)
			case DataObjListEditPresetType.save:
				return this.addScriptPresetListEditSave(query, queryData)
			default:
				error(500, {
					file: FILENAME,
					function: 'ScriptGroup.addScriptPresetListEdit',
					message: `No case defined for codeListEditPresetType: ${query.rawDataObj.codeListEditPresetType}`
				})
		}
	}
	addScriptPresetListEditInsert(query: Query, queryData: TokenApiQueryData) {
		const clazz = 'ScriptGroup.addScriptPresetListEditInsert'
		const listEditPresetExpr = evalExpr(
			strRequired(query.rawDataObj.listEditPresetExpr, clazz, 'listEditPresetExpr'),
			queryData
		)
		return this.addScript(
			query,
			TokenApiQueryType.preset,
			queryData,
			ScriptExePost.processRowSelectPreset,
			[
				['setValue', { key: 'expr', value: listEditPresetExpr }],
				['propsListEditPresetInsert', { props: query.rawDataObj.rawPropsSelectPreset }],
				['script', { content: ['expr', 'propsListEditPresetInsert'] }]
			]
		)
	}

	addScriptPresetListEditSave(query: Query, queryData: TokenApiQueryData) {
		return query.parent
			? this.addScriptPresetListEditSaveParentWith(query, queryData, query.parent)
			: this.addScriptPresetListEditSaveParentWithOut(query, queryData)
	}
	addScriptPresetListEditSaveParentWith(
		query: Query,
		queryData: TokenApiQueryData,
		parent: QueryParent
	) {
		const clazz = 'ScriptGroup.addScriptPresetListEditSaveParentWith'
		const listEditPresetExpr = strRequired(
			query.rawDataObj.listEditPresetExpr,
			clazz,
			'listEditPresetExpr'
		)
		const recordsInsert = 'recordsInsert'
		const op = parent.columnIsMultiSelect ? '+=' : ':='
		const parms = queryData.getParms()
		const exprFilter = parent.filterExpr
			? parent.filterExpr
			: `.id = <tree,uuid,${parent.table.name}.id>`

		return this.addScript(query, TokenApiQueryType.save, queryData, ScriptExePost.none, [
			// data
			['wrap', { key: 'data', open: `SELECT (`, value: listEditPresetExpr }],
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
		])
	}
	addScriptPresetListEditSaveParentWithOut(query: Query, queryData: TokenApiQueryData) {
		const clazz = 'ScriptGroup.addScriptPresetListEditSaveParentWithOut'
		const listEditPresetExpr = strRequired(
			query.rawDataObj.listEditPresetExpr,
			clazz,
			'listEditPresetExpr'
		)
		const recordsInsert = 'recordsInsert'
		const parms = queryData.getParms()

		return this.addScript(query, TokenApiQueryType.save, queryData, ScriptExePost.none, [
			// data
			['wrap', { key: 'data', open: `SELECT (`, value: listEditPresetExpr }],
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
		])
	}

	async addScriptRetrieve(query: Query, queryData: TokenApiQueryData) {
		await queryData.setAttrsAccess(query.rawDataObj)
		return this.addScript(query, TokenApiQueryType.retrieve, queryData, ScriptExePost.formatData, [
			['with', { exprWith: query.rawDataObj.exprWith }],
			['action', { type: 'SELECT', table: query.getTableRootObj() }],
			['propsSelect', { props: query.rawDataObj.rawPropsSelect }],
			['filter'],
			['order'],
			['script', { content: ['with', 'action', 'propsSelect', 'filter', 'order'] }]
		])
	}

	addScriptQueryRetrieveQueryRiders(
		query: Query,
		queryData: TokenApiQueryData,
		queryRiders: DataObjQueryRiders,
		queryType: TokenApiQueryType,
		codeTriggerTiming: DataObjQueryRiderTriggerTiming
	) {
		for (let i = 0; i < queryRiders.riders.length; i++) {
			const rider = queryRiders.riders[i]
			if (
				rider.codeQueryType === queryType &&
				rider.codeTriggerTiming === codeTriggerTiming &&
				rider.codeType === DataObjQueryRiderType.dbExpr &&
				rider.expr
			) {
				this.addScriptNew(
					query,
					TokenApiQueryType.none,
					queryData,
					ScriptExePost.none,
					[],
					rider.expr
				)
			}
		}
	}

	addScriptSave(query: Query, queryData: TokenApiQueryData) {
		const dataRowsSaved = required(queryData.dataTab?.rowsSave, 'ScriptGroup', 'dataSave')
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
				this.addScriptSaveItem(query, queryData, action, dataRows)
			}
		})
	}
	addScriptSaveItem(
		query: Query,
		queryData: TokenApiQueryData,
		action: string,
		dataRows: DataRow[]
	) {
		let config: Config = []
		let expr: string
		switch (action) {
			case 'DELETE':
				config = this.addScriptSaveDelete(query)
				break
			case 'INSERT':
				expr = this.addScriptSaveAction(query, queryData, dataRows, LinkSaveAction.INSERT)
				if (expr) {
					this.addScriptNew(
						query,
						TokenApiQueryType.save,
						queryData,
						ScriptExePost.formatData,
						dataRows,
						expr
					)
				}
				break
			case 'UPDATE':
				expr = this.addScriptSaveAction(query, queryData, dataRows, LinkSaveAction.UPDATE)
				if (expr) {
					this.addScriptNew(
						query,
						TokenApiQueryType.save,
						queryData,
						ScriptExePost.formatData,
						dataRows,
						expr
					)
				}
				break
			default:
				error(500, {
					file: FILENAME,
					function: 'Script.initScriptSaveItem',
					message: `No case defined for action: ${action}`
				})
		}
		if (config.length > 0) {
			this.addScript(
				query,
				TokenApiQueryType.save,
				queryData,
				ScriptExePost.formatData,
				config,
				dataRows
			)
		}
	}

	// prettier-ignore
	addScriptSaveDelete(query: Query): Config {    
	return [
		['action', { type: 'DELETE', table: query.getTableRootObj() }],
		['filter', { exprFilter: `.id = <uuid>item['id']` }],
		['wrap', { key: 'loop', open: this.scriptSegmentLoop, content: ['action', 'filter'] }],
		...this.addScriptSavePost(query)
	]
}

	addScriptSaveAction(
		query: Query,
		queryData: TokenApiQueryData,
		dataRows: DataRow[],
		action: LinkSaveAction
	): string {
		const clazz = 'ScriptGroup.addScriptSaveAction'
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
			scriptPrimary = new ScriptTypeSavePrimaryListSelectLinkBackward({
				action,
				dataRows: [queryData.tree.getDataRow(parentTableName)],
				query,
				queryData
			})
		} else {
			// parent
			if (query.parent) {
				let scriptParent = new ScriptTypeSaveParent({
					action,
					dataRows: [queryData.tree.getDataRow(query.parent.table.name)],
					isListSelect: isListSelectLinkForward,
					query,
					queryData
				})
				exprParent = scriptParent.build()
			}
			if (isListSelectLinkForward) {
				scriptPrimary = new ScriptTypeSavePrimaryListSelectLinkForward({
					action,
					dataRows,
					query,
					queryData
				})
			} else {
				scriptPrimary = new ScriptTypeSavePrimaryCore({
					action,
					dataRows,
					query,
					queryData
				})
			}
		}
		exprPrimary = scriptPrimary.build()
		let expr = exprParent ? ScriptTypeSave.addItem(exprPrimary, exprParent, ',\n') : exprPrimary
		return ScriptTypeSave.addItem(expr, scriptPrimary.getExprPropsSelect(), '\n')
	}

	addScriptSavePost(query: Query): Config {
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
}

export class Script {
	dataRows: DataRow[]
	exePost: ScriptExePost
	items: ScriptItem[] = []
	query: Query
	queryData: TokenApiQueryData
	queryType: TokenApiQueryType
	script = ''
	constructor(
		query: Query,
		queryType: TokenApiQueryType,
		queryData: TokenApiQueryData,
		exePost: ScriptExePost,
		dataRows: DataRow[] = []
	) {
		const clazz = 'Script'
		this.dataRows = dataRows
		this.exePost = exePost
		this.query = query
		this.queryType = queryType
		this.queryData = TokenApiQueryData.load(queryData)
	}

	addItem(buildAction: string, parms: DataRecord = {}) {
		this.items.push(new ScriptItem(buildAction, parms))
	}
	addComponent(script: string, component: string, separator = '') {
		if (!script && !component) return ''
		if (script && !component) return script
		if (!script && component) return component
		return script + separator + '\n' + component
	}
	build() {
		let values: DataRecord = {}

		this.items.forEach((item: ScriptItem) => {
			const action = item.action
			const parms = item.parms
			const key = item.getParm('key') || action
			let element = ''

			switch (action) {
				case 'action':
					element = `${parms.type} ${parms.table}`
					break

				case 'combine':
					element = this.buildCombineValues(values, item.getParm('content'))
					break

				case 'data':
					element = `data := (SELECT to_json($$${JSON.stringify(this.dataRows.map((row: DataRow) => row.record))}$$))`
					break

				case 'filter':
					const exprFilter = item.getParm('exprFilter')
					element = exprFilter ? `FILTER ${exprFilter}` : this.query.getFilter(this.queryData)
					break

				case 'order':
					element = this.query.getSort(this.queryData)
					break

				case 'prop':
					if (Object.hasOwn(parms, 'content')) {
						element = this.buildCombineValues(values, item.getParm('content'))
					}
					if (Object.hasOwn(parms, 'value')) {
						element = item.getParm('value')
					}
					element = `${item.getParm('label')} := (${element})`
					break

				case 'propsListEditPresetInsert':
					element = this.query.getPropsListEditPresetInsert(parms)
					break

				case 'propsListEditPresetSave':
					element = this.query.getPropsListEditPresetSave(parms, this.queryData)
					break

				case 'propsSelect':
					element = this.query.getPropsSelect(parms, this.queryData)
					break

				case 'propsSelectPreset':
					element = this.query.getPropsSelectPreset(parms, this.queryData)
					break

				case 'script':
					element = this.buildCombineValues(values, item.getParm('content'))
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
							this.queryData.attrAccessFilter
						)
					}
					if (!element) {
						element = this.buildCombineValues(values, item.getParm('content'), ',')
						element = this.addComponent(element, item.getParm('value'))
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
							error(500, {
								file: FILENAME,
								function: 'Script.build.wrap',
								message: `No case defined for open: ${open}`
							})
					}

					element = this.addComponent(element, item.getParm('open'))
					element = this.addComponent(
						element,
						this.buildCombineValues(values, item.getParm('content'))
					)
					element = this.addComponent(element, item.getParm('value'))
					element = this.addComponent(element, close)
					break

				default:
					error(500, {
						file: FILENAME,
						function: 'Script.Build',
						message: `No case defined for action: ${action}`
					})
			}
			if (element) values[key] = element
		})

		this.script = values.script
	}

	buildCombineValues(values: DataRecord, keys: string[] | undefined, separator = '') {
		let item = ''
		if (keys) {
			keys.forEach((key: string) => {
				if (values[key]) item = this.addComponent(item, values[key], separator)
			})
		}
		return item
	}
}

export class ScriptItem {
	action: string
	parms: DataRecord
	constructor(action: string, parms: DataRecord = {}) {
		const clazz = 'ScriptItem'
		this.action = action
		this.parms = parms
	}
	getParm(key: string) {
		return Object.hasOwn(this.parms, key) ? this.parms[key] : undefined
	}
}

export enum ScriptExePost {
	dataItems = 'dataItems',
	formatData = 'formatData',
	none = 'none',
	processRowSelectPreset = 'processRowSelectPreset'
}
