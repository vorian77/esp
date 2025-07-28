import { State } from '$comps/app/types.state.svelte'
import { strRequired, valueOrDefault } from '$utils/utils.model'
import { debug, MethodResult } from '$utils/types'
import { TokenApiQueryData } from '$utils/types.token'
import { dbQueryExpr } from '$server/types.queryServer'
import {
	QueryRider,
	QueryRiderAction,
	QueryRiderRaw
} from '$lib/queryClient/types.queryClientRider'
import { error } from '@sveltejs/kit'

const FILENAME = '/$lib/server/types.queryRiderServer.ts'

export class QueryRiderServer extends QueryRider {
	expr?: string
	constructor(obj: QueryRiderRaw) {
		const clazz = 'QueryRider'
		obj = valueOrDefault(obj, {})
		super(obj)
		this.expr = obj.expr
	}
	async exe(queryData: TokenApiQueryData, sm: State | undefined): Promise<MethodResult> {
		let result: MethodResult
		switch (this.codeQueryAction) {
			case QueryRiderAction.dbExpr:
				const evalExprContext = 'QueryRiderServer.exe.dbExpr'
				const expr = strRequired(this.expr, FILENAME, 'rider.expr')
				result = await dbQueryExpr({ expr, evalExprContext, queryData })
				if (result.error) return result
				break

			default:
				return new MethodResult({
					error: {
						file: FILENAME,
						function: 'QueryRiderServer.exe',
						msg: `No case defined for codeQueryAction: ${this.codeQueryAction}`
					}
				})
		}
		return new MethodResult(queryData)
	}
}
