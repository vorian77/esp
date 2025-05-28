import {
	DataObjData,
	debug,
	getArray,
	MethodResult,
	ParmsValuesType,
	strRequired,
	valueOrDefault
} from '$utils/types'
import { TokenApiQuery } from '$utils/types.token'
import {
	QueryManager,
	QueryManagerSource,
	QuerySourceType
} from '$lib/queryClient/types.queryClient'
import { QueryRiders } from '$lib/queryClient/types.queryClientRider'
import { QueryRiderServer } from '$server/types.queryServerRider'
import { ScriptGroup } from '$routes/api/db/dbScript'
import { ScriptGroupGelDataObj } from '$routes/api/db/dbGel/dbGelScript'
import { ScriptGroupGelExpr } from '$routes/api/db/dbGel/dbGelScript'
import { evalExpr } from '$routes/api/db/dbScriptEval'
import { queryJsonMultiple } from '$routes/api/db/dbGel/dbGel'
import { error } from '@sveltejs/kit'

const FILENAME = '/$routes/api/db/queryServer.ts'

export async function dbQuery(tokenQuery: TokenApiQuery) {
	tokenQuery = new TokenApiQuery(tokenQuery)
	let qmc = new QueryManagerServer(tokenQuery)
	return await qmc.query()
}

export async function dbQueryExpr(obj: any): Promise<MethodResult> {
	obj = valueOrDefault(obj, {})
	const clazz = 'dbQueryExpr'
	const expr = strRequired(obj.expr, clazz, 'expr')
	const evalExprContext = strRequired(obj.evalExprContext, clazz, 'evalExprContext')
	const result: MethodResult = evalExpr({
		evalExprContext,
		expr,
		queryData: obj.queryData,
		querySource: obj.querySource
	})
	if (result.error) return result
	const exprEval = result.data
	return await queryJsonMultiple(exprEval)
}

export class QueryManagerServer extends QueryManager {
	dataReturn = new DataObjData()
	scriptGroup: ScriptGroup
	constructor(tokenQuery: TokenApiQuery) {
		super(tokenQuery)
		switch (tokenQuery.queryManagerSource) {
			case QueryManagerSource.gel:
				switch (this.querySource.querySourceType) {
					case QuerySourceType.dataObj:
						this.scriptGroup = new ScriptGroupGelDataObj(tokenQuery)
						break
					case QuerySourceType.expr:
						this.scriptGroup = new ScriptGroupGelExpr(tokenQuery)
						break

					default:
						error(500, {
							file: FILENAME,
							function: 'QueryManagerServer.constructor',
							msg: `No case defined for QueryManagerSource: ${this.tokenQuery.queryManagerSource} - QuerySourceType: ${this.querySource.querySourceType}`
						})
				}
				break
			default:
				error(500, {
					file: FILENAME,
					function: 'QueryManagerServer.constructor',
					msg: `No case defined for QueryManagerSource: ${tokenQuery.queryManagerSource}`
				})
		}
	}
	async queryExe(): Promise<MethodResult> {
		return await this.scriptGroup.queryExe()
	}

	async queryPre(): Promise<MethodResult> {
		let result = await this.scriptGroup.queryPre()
		if (result.error) return result
		this.queryRiders = new QueryRiders(
			QueryRiderServer,
			getArray(this.scriptGroup.queryData.dataTab.rawDataObj?.rawQuerySource.queryRidersRawServer)
		)
		return await super.queryPre()
	}
}
