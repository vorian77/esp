import { QuerySource, type RawDataList, ScriptExePost } from '$lib/queryClient/types.queryClient'
import { queryJsonMultiple } from '$routes/api/db/dbGel/dbGel'
import { GelQuery } from '$routes/api/db/dbGel/dbGelScriptQuery'
import { evalExpr } from '$utils/utils.evalParserDb'
import {
	DataObjData,
	type DataRecord,
	DataRow,
	debug,
	MethodResult,
	required,
	strRequired,
	valueOrDefault
} from '$utils/types'
import { TokenApiQuery, TokenApiQueryData, TokenApiQueryType } from '$utils/types.token'

const FILENAME = '/$routes/api/db/dbScript.ts'

export type Config = [string, DataRecord?][]

export class Script {
	dataRows: DataRow[]
	evalExprContext: string
	exePost: ScriptExePost
	expr: string
	items: ScriptItem[] = []
	query?: GelQuery
	scriptGroup: ScriptGroup
	constructor(obj: any) {
		const clazz = 'Script.constructor'
		this.dataRows = valueOrDefault(obj.dataRows, [])
		this.evalExprContext = strRequired(obj.evalExprContext, clazz, 'evalExprContext')
		this.exePost = valueOrDefault(obj.exePost, ScriptExePost.none)
		this.expr = valueOrDefault(obj.expr, '')
		this.query = obj.query
		this.scriptGroup = required(obj.scriptGroup, clazz, 'scriptGroup')
	}
	addItem(buildAction: string, parms: DataRecord = {}): void {
		this.items.push(new ScriptItem(buildAction, parms))
	}
	addComponent(script: string, component: string, separator = ''): string {
		if (!script && !component) return ''
		if (script && !component) return script
		if (!script && component) return component
		return script + separator + '\n' + component
	}
}

class ScriptPlanItem {
	componentType: string
	postFix: string
	constructor(componentType: string, postFix: string) {
		this.componentType = componentType
		this.postFix = postFix
	}
}

export class ScriptGroup {
	evalExprContext: string
	queryData: TokenApiQueryData
	querySource: QuerySource
	queryType: TokenApiQueryType
	scripts: Script[] = []
	scriptSegmentLoop = 'FOR item IN json_array_unpack(data) UNION ('
	tokenQuery: TokenApiQuery
	constructor(tokenQuery: TokenApiQuery) {
		const clazz = 'ScriptGroup.constructor'
		this.evalExprContext = strRequired(
			tokenQuery.evalExprContext,
			clazz,
			'tokenQuery.evalExprContext'
		)
		this.queryData = required(tokenQuery.queryData, clazz, 'tokenQuery.queryData')
		this.querySource = new QuerySource(tokenQuery.querySourceRaw)
		this.queryType = tokenQuery.queryType
		this.tokenQuery = tokenQuery

		// derived
		DataObjData.reset(this.queryData.dataTab)
	}

	async addScript(obj: any): Promise<MethodResult> {
		const script = new Script({
			...obj,
			evalExprContext: this.evalExprContext,
			scriptGroup: this
		})
		this.scripts.push(script)
		return new MethodResult(script)
	}

	async queryExe(): Promise<MethodResult> {
		const clazz = 'ScriptGroup.queryExe'
		let result: MethodResult

		while (this.scripts.length > 0) {
			const script: Script = required(this.scripts.shift(), clazz, 'script')

			// eval script expr
			result = await evalExpr({
				evalExprContext: script.evalExprContext,
				exprRaw: script.expr,
				queryData: script.query?.queryData || this.queryData,
				querySource: this.querySource
			})
			if (result.error) return result
			const dbExpr: string = result.data

			// execute query
			result = await queryJsonMultiple(dbExpr)
			if (result.error) return result

			let rawDataList: RawDataList = result.data
			result = await this.queryExeFormat(script, rawDataList)
			if (result.error) return result

			// set return data
			this.queryData = result.data
		}

		// preview return data
		debug(
			'scriptGroup.queryExe',
			'dataReturnPreview',
			Array.isArray(this.queryData.dataTab.rowsRetrieved)
				? this.queryData.dataTab.rowsRetrieved.length > 0
					? this.queryData.dataTab.rowsRetrieved[0]
					: undefined
				: this.queryData.rawDataList
		)

		// return
		return new MethodResult(this.queryData)
	}

	async queryExeFormat(script: Script, rawDataList: RawDataList): Promise<MethodResult> {
		this.queryData.rawDataList = rawDataList
		return new MethodResult(this.queryData)
	}

	async queryPost(): Promise<MethodResult> {
		return new MethodResult(this.queryData)
	}

	async queryPre(): Promise<MethodResult> {
		return new MethodResult(this.queryData)
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
	getParm(key: string): any {
		return Object.hasOwn(this.parms, key) ? this.parms[key] : undefined
	}
}
