import { State } from '$comps/app/types.appState.svelte'
import { QueryManager } from '$lib/query/types.query'
import { QuerySourceType } from '$lib/query/types.query'
import {
	TokenApiQuery,
	TokenApiQueryData,
	TokenApiQuerySource,
	TokenApiQueryType
} from '$utils/types.token'
import { apiFetchFunction, ApiFunction } from '$routes/api/api'
import { type DataRecord, MethodResult, ParmsValuesType, required } from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/$lib/queryClient/queryManagerClient.ts'

export async function clientQueryExpr(
	exprCustom: string,
	evalExprContext: string,
	sourceQueryData?: DataRecord,
	sm?: State
): Promise<MethodResult> {
	const clazz = 'clientQueryExpr'

	const tokenQuerySource = new TokenApiQuerySource({
		evalExprContext,
		queryType: TokenApiQueryType.none,
		sm: sm || new State({}),
		sourceQueryData: sourceQueryData || {},
		sourceQuerySource: {
			exprCustom,
			querySourceType: QuerySourceType.expr
		}
	})

	let qmc = new QueryManagerClient(tokenQuerySource)
	if (qmc) {
		return await qmc.query()
	} else {
		return new MethodResult({
			success: false,
			error: {
				file: FILENAME,
				function: clazz,
				msg: `Unable to create QueryManagerClient`
			}
		})
	}
}

export class QueryManagerClient extends QueryManager {
	isClient = true
	constructor(tokenQuerySource: TokenApiQuerySource) {
		const clazz = `QueryManagerClient.constructor`
		const queryData = new TokenApiQueryData({
			...tokenQuerySource.sourceQueryData,
			user: tokenQuerySource.sm.user
		})
		const querySourceRaw = tokenQuerySource.sourceQuerySource
		const tokenQuery = new TokenApiQuery({
			evalExprContext: tokenQuerySource.evalExprContext,
			querySourceRaw,
			queryType: tokenQuerySource.queryType,
			queryData
		})
		super(tokenQuery)
		this.sm = required(tokenQuerySource.sm, clazz, 'parms.sm')
	}

	async queryExe(): Promise<MethodResult> {
		document.body.style.setProperty('cursor', 'wait', 'important')
		const result: MethodResult = await apiFetchFunction(ApiFunction.dbQuery, this.tokenQuery)
		document.body.style.setProperty('cursor', 'default')
		if (result.error) return result
		return new MethodResult(TokenApiQueryData.load(result.data))
	}

	async queryPre(): Promise<MethodResult> {
		if (this.sm) {
			this.queryData.dataTab.parms.update(this.sm.parmsState.valueGetAll())
			this.queryData.dataTab.parms.update(this.sm.parmsTrans.valueGetAll())
			this.queryData.dataTab.parms.valueSetIfMissing(ParmsValuesType.itemsParmValue, '')
		}
		return await super.queryPre()
	}
}
