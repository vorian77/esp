import { NavMenuData } from '$comps/nav/navMenu/types.navMenu.svelte'
import { MethodResult } from '$utils/types'
import { clientQueryExpr } from '$lib/query/queryManagerClient'

const FILENAME = '/$lib/queryClient/queryClientTest.ts'

export async function queryClientTest(navMenuData: NavMenuData) {
	const evalExprContext = 'queryClientTest'
	const exprCustom = `SELECT sys_user::SysUser {id, userName} FILTER .userName = 'user_sys'`
	let result: MethodResult = await clientQueryExpr(exprCustom, evalExprContext)
	console.log('queryClientTest.result:', result)
	return result
}
