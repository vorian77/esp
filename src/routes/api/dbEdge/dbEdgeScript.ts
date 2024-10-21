import { required } from '$lib/utils/utils'
import {
	DataObjCardinality,
	DataObjEmbedType,
	DataObjData,
	DataObjListEditPresetType,
	DataRecordStatus,
	debug,
	strRequired
} from '$utils/types'
import type { DataRecord, DataRow } from '$utils/types'
import { TokenApiQueryData } from '$utils/types.token'
import { RawDataObjPropDB } from '$comps/dataObj/types.rawDataObj'
import { Query, QueryParent } from '$routes/api/dbEdge/dbEdgeQuery'
import { evalExpr } from '$routes/api/dbEdge/dbEdgeGetVal'
import { error } from '@sveltejs/kit'

const FILENAME = '/$routes/api/dbEdge/dbEdgeScript.ts'

export class ScriptGroup {
	scripts: Script[] = []
	scriptSegmentLoop = 'FOR item IN json_array_unpack(data) UNION ('
	constructor() {}
	addScript(
		query: Query,
		queryData: TokenApiQueryData,
		exePost: ScriptExePost,
		config: [string, DataRecord?][],
		dataRows: DataRow[] = []
	) {
		const script = new Script(query, queryData, exePost, dataRows)
		config.forEach((item) => {
			script.addItem(item[0], item[1])
		})
		script.build()
		this.scripts.push(script)
		return script
	}

	addScriptDataItems(query: Query, queryData: TokenApiQueryData, props: RawDataObjPropDB[]) {
		const isFilterCurrentValue = query.rawDataObj.codeCardinality === DataObjCardinality.detail
		return this.addScript(query, queryData, ScriptExePost.dataItems, [
			['propsSelectDataItems', { props, isFilterCurrentValue }],
			['script', { content: ['propsSelectDataItems'] }]
		])
	}
	addScriptExpression(query: Query, queryData: TokenApiQueryData) {
		const script = new Script(query, queryData, ScriptExePost.formatData)
		script.script = query.getExpression(queryData)
		this.scripts.push(script)
		return script
	}
	addScriptPreset(query: Query, queryData: TokenApiQueryData) {
		return this.addScript(query, queryData, ScriptExePost.formatData, [
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
		return this.addScript(query, queryData, ScriptExePost.processRowSelectPreset, [
			['setValue', { key: 'expr', value: listEditPresetExpr }],
			['propsListEditPresetInsert', { props: query.rawDataObj.rawPropsSelectPreset }],
			['script', { content: ['expr', 'propsListEditPresetInsert'] }]
		])
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

		return this.addScript(query, queryData, ScriptExePost.none, [
			// data
			['wrap', { key: 'data', open: `SELECT (`, value: listEditPresetExpr }],
			['wrap', { key: 'data', open: `data := (`, content: ['data'] }],
			['with', { key: 'data', content: ['data'] }],

			// loop
			['action', { type: 'INSERT', table: query.getTableObjRoot() }],
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

		return this.addScript(query, queryData, ScriptExePost.none, [
			// data
			['wrap', { key: 'data', open: `SELECT (`, value: listEditPresetExpr }],
			['wrap', { key: 'data', open: `data := (`, content: ['data'] }],
			['with', { key: 'data', content: ['data'] }],

			// loop
			['action', { type: 'INSERT', table: query.getTableObjRoot() }],
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

	addScriptRetrieve(query: Query, queryData: TokenApiQueryData) {
		if (query.rawDataObj.exprObject) {
			return this.addScriptExpression(query, queryData)
		} else {
			return this.addScriptRetrieveItem(query, queryData, ScriptExePost.formatData)
		}
	}
	addScriptRetrieveItem(query: Query, queryData: TokenApiQueryData, exePost: ScriptExePost) {
		return this.addScript(query, queryData, exePost, [
			['action', { type: 'SELECT', table: query.getTableObjRoot() }],
			['propsSelect', { props: query.rawDataObj.rawPropsSelect }],
			['filter'],
			['order'],
			['script', { content: ['action', 'propsSelect', 'filter', 'order'] }]
		])
	}

	addScriptSave(query: Query, queryData: TokenApiQueryData) {
		if (query?.field?.embedType === DataObjEmbedType.listSelect) {
			this.addScriptSaveListSelect(query, queryData)
		} else {
			const actions = []
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
				if (query.field && action == 'DELETE') return
				if (dataRows.length > 0) this.addScriptSaveItem(query, queryData, action, dataRows)
			})
		}
	}
	addScriptSaveItem(
		query: Query,
		queryData: TokenApiQueryData,
		action: string,
		dataRows: DataRow[]
	) {
		let config: [string, DataRecord?][] = []
		switch (action) {
			case 'DELETE':
				config = this.addScriptSaveDelete(query)
				break
			case 'INSERT':
				config = this.addScriptSaveInsert(query, queryData)
				break
			case 'UPDATE':
				config = this.addScriptSaveUpdate(query)
				break
			default:
				error(500, {
					file: FILENAME,
					function: 'Script.initScriptSaveItem',
					message: `No case defined for action: ${action}`
				})
		}
		if (config.length > 0) {
			this.addScript(query, queryData, ScriptExePost.formatData, config, dataRows)
		}
	}

	// prettier-ignore
	addScriptSaveDelete(query: Query): [string, DataRecord?][]{    
    return [
			['action', { type: 'DELETE', table: query.getTableObjRoot() }],
			['filter', { exprFilter: `.id = <uuid>item['id']` }],
			['wrap', { key: 'loop', open: this.scriptSegmentLoop, content: ['action', 'filter'] }],
			...this.addScriptSavePost(query)
		]
	}

	addScriptSaveInsert(query: Query, queryData: TokenApiQueryData): [string, DataRecord?][] {
		const clazz = 'ScriptGroup.addScriptSaveInsert'
		if (query.parent) {
			const recordsInsert = 'recordsInsert'
			const recordUpdate = 'recordUpdate'
			const op = query.parent.columnIsMultiSelect ? '+=' : ':='

			// query filter
			let exprFilter = ''
			if (query.parent.filterExpr) {
				exprFilter = query.parent.filterExpr
			} else {
				exprFilter = `.id = <tree,uuid,${query.parent.table.name}.id>`
			}

			return [
				// records insert
				['action', { type: 'INSERT', table: query.getTableObjRoot() }],
				['propsSave', { action: 'INSERT', props: query.rawDataObj.rawPropsSaveInsert }],
				['wrap', { key: 'loop', open: this.scriptSegmentLoop, content: ['action', 'propsSave'] }],
				['data'],
				['with', { content: ['data', 'loop'] }],
				['wrap', { key: recordsInsert, open: `${recordsInsert} := (`, content: ['with'] }],

				// record update
				['action', { type: 'UPDATE', table: query.parent.table.object }],
				['filter', { exprFilter }],
				[
					'wrap',
					{ key: 'propInsert', open: `${query.parent.columnName} ${op} (`, value: recordsInsert }
				],
				['wrap', { key: 'propInsert', open: 'SET {', content: ['propInsert'] }],
				[
					'wrap',
					{
						key: recordUpdate,
						open: `${recordUpdate} := (`,
						content: ['action', 'filter', 'propInsert']
					}
				],

				// return inserted records
				['action', { type: 'SELECT', table: recordsInsert }],
				['propsSelect', { props: query.rawDataObj.rawPropsSelect }],

				// script
				['with', { content: [recordsInsert, recordUpdate] }],
				['script', { content: ['with', 'action', 'propsSelect'] }]
			]
		} else {
			return [
				['action', { type: 'INSERT', table: query.getTableObjRoot() }],
				['propsSave', { action: 'INSERT', props: query.rawDataObj.rawPropsSaveInsert }],
				[
					'wrap',
					{ key: 'loop', open: this.scriptSegmentLoop, content: ['action', 'filter', 'propsSave'] }
				],
				...this.addScriptSavePost(query)
			]
		}
	}

	addScriptSaveListSelect(query: Query, queryData: TokenApiQueryData) {
		const clazz = 'ScriptGroup.addScriptSaveListSelect'
		const field = required(query.field, clazz, 'query.field')
		const parms = queryData.getParms()

		if (!parms.listRecordIdSelected) return

		return this.addScript(query, queryData, ScriptExePost.formatData, [
			// sub-table
			['action', { type: 'SELECT', table: field.embedTable.object }],
			['filter', { exprFilter: `.id IN <parms,uuidlist,listRecordIdSelected>` }],
			['wrap', { key: 'select', open: `:= (`, content: ['action', 'filter'] }],

			// embed-field
			['setValue', { key: 'fieldName', value: `${parms.embedFieldName}` }],
			['wrap', { key: 'set', open: `SET {`, content: ['fieldName', 'select'] }],

			// primary-table
			['action', { type: 'UPDATE', table: field.parentTable.object }],
			['filter', { exprFilter: `.id = <tree,uuid,${field.parentTable.name}.id>` }],

			// Records
			['wrap', { key: 'records', open: 'WITH Records := (', content: ['action', 'filter', 'set'] }],

			// select Records
			['action', { type: 'SELECT', table: field.embedTable.object }],
			['propsSelect', { props: query.rawDataObj.rawPropsSelect }],
			['filter', { exprFilter: `.id IN <parms,uuidlist,listRecordIdSelected>` }],

			// script
			['script', { content: ['records', 'action', 'propsSelect', 'filter'] }]
		])
	}

	// prettier-ignore
	addScriptSaveUpdate(query: Query): [string, DataRecord?][] {
		return [
			['action', { type: 'UPDATE', table: query.getTableObjRoot() }],
			['filter', { exprFilter: `.id = <uuid>item['id']` }],
			['propsSave', { action: 'UPDATE', props: query.rawDataObj.rawPropsSaveUpdate }],
			['wrap', { key: 'loop', open: this.scriptSegmentLoop, content: ['action', 'filter', 'propsSave'] }
			],
			...this.addScriptSavePost(query)
		]
	}

	addScriptSavePost(query: Query): [string, DataRecord?][] {
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
	script = ''
	constructor(
		query: Query,
		queryData: TokenApiQueryData,
		exePost: ScriptExePost,
		dataRows: DataRow[] = []
	) {
		const clazz = 'Script'
		this.dataRows = dataRows
		this.exePost = exePost
		this.query = query
		this.queryData = queryData
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
		let withValues: string[] = []
		const WITH_VALUES = 'withValues'

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
					element = this.query.getPropsListEditPresetInsert(parms, this.queryData)
					break

				case 'propsListEditPresetSave':
					element = this.query.getPropsListEditPresetSave(parms, this.queryData)
					break

				case 'propsSave':
					element = this.query.getPropsSave(parms, this.queryData, this.dataRows)
					break

				case 'propsSelect':
					element = this.query.getPropsSelect(parms, this.queryData)
					break

				case 'propsSelectDataItems':
					element = this.query.getPropsSelectDataItems(parms, this.queryData)
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
					element = this.buildCombineValues(values, item.getParm('content'), ',')
					element = this.addComponent(element, item.getParm('value'))
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

	evalExpr(dataRoot: DataObjData) {
		this.script = evalExpr(this.script, this.queryData)
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
