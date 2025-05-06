import { DataObjData, debug, MethodResult, ParmsValuesType } from '$utils/types'
import { TokenApiQuery, TokenApiQueryData, TokenApiQueryType } from '$utils/types.token'
import {
	QueryManager,
	QueryManagerSource,
	QuerySource,
	QuerySourceRaw,
	QuerySourceType
} from '$lib/query/types.query'
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

export async function dbQueryExpr(
	expr: string,
	evalExprContext: string,
	queryData: TokenApiQueryData,
	querySource: QuerySource
): Promise<MethodResult> {
	const result: MethodResult = evalExpr({ evalExprContext, expr, queryData, querySource })
	if (result.error) return result
	const exprEval = result.data
	return await queryJsonMultiple(exprEval)
}

export class QueryManagerServer extends QueryManager {
	dataReturn = new DataObjData()
	isClient = false
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
		return await this.scriptGroup.query()
	}
}
