import { NavMenuData } from '$comps/nav/navMenu/types.navMenu.svelte'
import { MethodResult } from '$utils/types'
import { clientQueryExprOld } from '$lib/queryClient/types.queryClientManager'

const FILENAME = '/$lib/queryClient/queryClientTest.ts'

export async function queryClientTest(navMenuData: NavMenuData) {
	const evalExprContext = 'queryClientTest'
	const exprCustom = `SELECT sys_user::SysUser {id, name} FILTER .name = 'user_sys'`
	let result: MethodResult = await clientQueryExprOld(exprCustom, evalExprContext)
	console.log('queryClientTest.result:', result)
	return result
}
