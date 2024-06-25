import { required } from '$lib/utils/utils'
import {
	DataObjCardinality,
	DataObjData,
	DataObjListEditPresetType,
	DataRecordStatus,
	debug,
	strRequired
} from '$utils/types'
import type { DataRecord, DataRow } from '$utils/types'
import { TokenApiQueryData, TokenApiQueryType } from '$utils/types.token'
import { PropDataType, RawDataObjPropDB } from '$comps/dataObj/types.rawDataObj'
import { Query } from '$routes/api/dbEdge/dbEdgeQuery'
import { evalExpr } from '$routes/api/dbEdge/dbEdgeGetVal'
import { error } from '@sveltejs/kit'

const FILENAME = '/$routes/api/dbEdge/dbEdgeScript.ts'

export class ScriptGroup {
	query: Query
	queryData: TokenApiQueryData
	queryType: TokenApiQueryType
	scripts: Script[] = []
	scriptSegmentLoop = 'FOR item IN json_array_unpack(data) UNION ('
	constructor(queryType: TokenApiQueryType, query: Query, queryData: TokenApiQueryData) {
		const clazz = 'ScriptGroup'
		this.query = query
		this.queryType = queryType
		this.queryData = queryData

		switch (queryType) {
			case TokenApiQueryType.preset:
				this.scripts.push(this.initScriptPreset(query, queryData))
				break

			case TokenApiQueryType.retrieve:
				if (query.rawDataObj.exprObject) {
					this.scripts.push(this.initScriptExpression(query, queryData))
				} else {
					if (query.rawDataObj.listEditPresetExpr) {
						this.scripts.push(this.initScriptPresetListEdit(query, queryData))
					}
					this.scripts.push(this.initScriptRetrieve(query, queryData))
				}
				break

			case TokenApiQueryType.retrieveRepParmItems:
				this.scripts.push(
					this.initScriptDataItems(query, query.rawDataObj.rawPropsRepParmItems, queryData)
				)
				break

			case TokenApiQueryType.save:
				const actions = []
				const dataSave = required(this.queryData.dataSave, 'ScriptGroup', 'dataSave')
				let items: [string, DataRecordStatus[]][] = [
					['DELETE', [DataRecordStatus.delete]],
					['INSERT', [DataRecordStatus.preset]],
					['UPDATE', [DataRecordStatus.retrieved, DataRecordStatus.update]]
				]
				items.forEach((item) => {
					const action = item[0]
					const statuses = item[1]
					const dataRows = dataSave.dataRows.filter((row: DataRow) => statuses.includes(row.status))
					if (dataRows.length > 0) {
						this.scripts.push(this.initScriptSave(query, queryData, action, dataRows))
					}
				})
				break

			default:
				error(500, {
					file: FILENAME,
					function: 'dbEdgeTransaction.getScripts',
					message: `No case defined for queryType: ${queryType}`
				})
		}
	}
	initScript(
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
		return script
	}

	initScriptDataItems(
		query: Query,
		props: RawDataObjPropDB[],
		queryData: TokenApiQueryData,
		returnData: DataObjData | undefined = undefined
	) {
		const isFilterCurrentValue = query.rawDataObj.codeCardinality === DataObjCardinality.detail
		if (isFilterCurrentValue && returnData) queryData.recordSet(returnData.getDetailRecord())
		return this.initScript(query, queryData, ScriptExePost.formatData, [
			['propsSelectDataItems', { props, isFilterCurrentValue }],
			['script', { content: ['propsSelectDataItems'] }]
		])
	}
	initScriptExpression(query: Query, queryData: TokenApiQueryData) {
		const script = new Script(query, queryData, ScriptExePost.formatData)
		script.script = query.getExpression(queryData)
		return script
	}
	initScriptPreset(query: Query, queryData: TokenApiQueryData) {
		return this.initScript(query, queryData, ScriptExePost.formatData, [
			['propsSelectPreset', { props: query.rawDataObj.rawPropsSelectPreset }],
			['script', { content: ['propsSelectPreset'] }]
		])
	}
	initScriptPresetListEdit(query: Query, queryData: TokenApiQueryData) {
		switch (query.rawDataObj.codeListEditPresetType) {
			case DataObjListEditPresetType.insert:
				return this.initScriptPresetListEditInsert(query, queryData)
			case DataObjListEditPresetType.save:
				return this.initScriptPresetListEditSave(query, queryData)
			default:
				error(500, {
					file: FILENAME,
					function: 'ScriptGroup.initScriptPresetListEdit',
					message: `No case defined for codeListEditPresetType: ${query.rawDataObj.codeListEditPresetType}`
				})
		}
	}
	initScriptPresetListEditInsert(query: Query, queryData: TokenApiQueryData) {
		const clazz = 'ScriptGroup.initScriptPresetListEditInsert'
		const listEditPresetExpr = evalExpr(
			strRequired(query.rawDataObj.listEditPresetExpr, clazz, 'listEditPresetExpr'),
			queryData
		)
		return this.initScript(query, queryData, ScriptExePost.processRowSelectPreset, [
			['setValue', { key: 'expr', value: listEditPresetExpr }],
			['propsListEditPresetInsert', { props: query.rawDataObj.rawPropsSelectPreset }],
			['script', { content: ['expr', 'propsListEditPresetInsert'] }]
		])
	}

	initScriptPresetListEditSave(query: Query, queryData: TokenApiQueryData) {
		const clazz = 'ScriptGroup.initScriptPresetListEditSave'
		const listEditPresetExpr = evalExpr(
			strRequired(query.rawDataObj.listEditPresetExpr, clazz, 'listEditPresetExpr'),
			queryData
		)
		const recordsInsert = 'recordsInsert'
		const parent = required(query.parent, clazz, 'query.parent')
		const op = parent.columnIsMultiSelect ? '+=' : ':='
		const exprFilter = parent.filterExpr
			? parent.filterExpr
			: `.id = <uuid>'${queryData.parms.listRecordIdParent}'`

		// prettier-ignore
		return this.initScript(query, queryData, ScriptExePost.none, [
			// data
			['wrap', { key: 'data', open: `SELECT (`, value: listEditPresetExpr }],
			['wrap', { key: 'data', open: `data := (`, content: ['data'] }],
			['with', { key: 'data', content: ['data'] }],

			// loop
			['action', { type: 'INSERT', table: query.getTableObjRoot() }],
			['propsListEditPresetSave', { props: query.rawDataObj.rawPropsSelectPreset }],
			['wrap',{ key: 'loop', open: 'FOR item IN data UNION (', content: ['action', 'propsListEditPresetSave'] }],

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
	initScriptRetrieve(query: Query, queryData: TokenApiQueryData) {
		return this.initScript(query, queryData, ScriptExePost.formatData, [
			['action', { type: 'SELECT', table: query.getTableObjRoot() }],
			['propsSelect', { props: query.rawDataObj.rawPropsSelect }],
			['filter'],
			['order'],
			['script', { content: ['action', 'propsSelect', 'filter', 'order'] }]
		])
	}
	initScriptSave(query: Query, queryData: TokenApiQueryData, action: string, dataRows: DataRow[]) {
		let config: [string, DataRecord?][] = []
		switch (action) {
			case 'DELETE':
				config = this.initScriptSaveDelete(query)
				break
			case 'INSERT':
				config = this.initScriptSaveInsert(query, queryData)
				break
			case 'UPDATE':
				config = this.initScriptSaveUpdate(query)
				break
			default:
				error(500, {
					file: FILENAME,
					function: 'Script.initScriptUpdate',
					message: `No case defined for action: ${action}`
				})
		}
		return this.initScript(query, queryData, ScriptExePost.formatData, config, dataRows)
	}

	// prettier-ignore
	initScriptSaveDelete(query: Query): [string, DataRecord?][]{    
    return [
			['action', { type: 'DELETE', table: query.getTableObjRoot() }],
			['filter', { exprFilter: `.id = <uuid>item['id']` }],
			['wrap', { key: 'loop', open: this.scriptSegmentLoop, content: ['action', 'filter'] }],
			...this.initScriptSavePost(query)
		]
	}
	// prettier-ignore
	initScriptSaveInsert(query: Query, queryData: TokenApiQueryData): [string, DataRecord?][] {
		if (query.parent) {
			// embeded form
			const recordsInsert = 'recordsInsert'
			const recordUpdate = 'recordUpdate'
			const op = query.parent.columnIsMultiSelect ? '+=' : ':='
			const exprFilter = 
				query.parent && query.parent.filterExpr ? 
					query.parent.filterExpr : 
					`.id = <uuid>'${queryData.parms.listRecordIdParent}'`
						
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
				['wrap', {	key: 'propInsert', open: `${query.parent.columnName} ${op} (`, value: recordsInsert }],
				['wrap', { key: 'propInsert', open: 'SET {', content: ['propInsert'] }],
				['wrap', {	key: recordUpdate, open: `${recordUpdate} := (`,	content: ['action', 'filter', 'propInsert'] }],
				
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
				['wrap', {key: 'loop', open: this.scriptSegmentLoop, content: ['action', 'filter', 'propsSave'] }],
				...this.initScriptSavePost(query)
			]
		}
	}
	// prettier-ignore
	initScriptSaveUpdate(query: Query): [string, DataRecord?][] {
		return [
			['action', { type: 'UPDATE', table: query.getTableObjRoot() }],
			['filter', { exprFilter: `.id = <uuid>item['id']` }],
			['propsSave', { action: 'UPDATE', props: query.rawDataObj.rawPropsSaveUpdate }],
			['wrap', { key: 'loop', open: this.scriptSegmentLoop, content: ['action', 'filter', 'propsSave'] }],
			...this.initScriptSavePost(query)
		]
	}
	initScriptSavePost(query: Query): [string, DataRecord?][] {
		return [
			['data'],
			['wrap', { key: 'records', open: 'Records := (', content: ['loop'] }],
			['with', { content: ['data', 'records'] }],

			['action', { type: 'SELECT', table: 'Records' }],
			['propsSelect', { props: query.rawDataObj.rawPropsSelect }],
			['script', { content: ['with', 'action', 'propsSelect'] }]
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

				// case 'dataRecord':
				// 	element = `item := (SELECT to_json($$${JSON.stringify(this.dataRows[0].record)}$$))`
				// 	break

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
	formatData = 'formatData',
	none = 'none',
	processRowSelectPreset = 'processRowSelectPreset'
}
