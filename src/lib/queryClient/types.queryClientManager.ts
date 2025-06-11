import { QueryManager } from '$lib/queryClient/types.queryClient'
import { QueryRiderClient, QueryRiders } from '$lib/queryClient/types.queryClientRider'
import { TokenApiQuery, TokenApiQueryData, TokenApiQuerySource } from '$utils/types.token'
import { apiFetchFunction, ApiFunction } from '$routes/api/api'
import { MethodResult, ParmsValuesType, required } from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/$lib/queryClient/querClientManager.ts'

export class QueryManagerClient extends QueryManager {
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

	async queryPost(): Promise<MethodResult> {
		if (this.queryData.dataTab.rawDataObj) {
			this.queryRiders = new QueryRiders(
				QueryRiderClient,
				this.queryData.dataTab.rawDataObj.rawQuerySource.queryRidersRawClient
			)
		}
		return await super.queryPost()
	}

	async queryPre(): Promise<MethodResult> {
		if (this.sm) {
			this.queryData.dataTab.parms.update(this.sm.parmsState.valueGetAll())
			this.queryData.dataTab.parms.update(this.sm.parmsTrans.valueGetAll())
		}
		if (this.queryData.dataTab.rawDataObj) {
			this.queryRiders = new QueryRiders(
				QueryRiderClient,
				this.queryData.dataTab.rawDataObj.rawQuerySource.queryRidersRawClient
			)
		}

		return await super.queryPre()
	}
}
