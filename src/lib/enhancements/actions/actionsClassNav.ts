import { State } from '$comps/app/types.appState.svelte'
import { AppLevel, AppLevelTab } from '$comps/app/types.app.svelte'
import {
	userActionError,
	userActionStateChangeDataObj,
	userActionStateChangeHomeDashboard,
	userActionNavDestination
} from '$comps/other/types.userAction.svelte'
import { CodeActionType, MethodResult, strRequired } from '$utils/types'
import {
	Token,
	TokenApiQueryType,
	TokenAppDoQuery,
	TokenAppNav,
	TokenAppNode,
	TokenAppRow,
	TokenAppStateTriggerAction,
	TokenAppTab
} from '$utils/types.token'
import { goto } from '$app/navigation'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/actions/actionClassNav.ts'

let currTab: AppLevelTab | undefined

export default async function action(
	sm: State,
	parmsAction: TokenAppStateTriggerAction
): Promise<MethodResult> {
	const actionType = parmsAction.codeAction.actionType
	const token: Token = parmsAction.data.token
	let result: MethodResult

	switch (actionType) {
		case CodeActionType.navDestination:
			await userActionNavDestination(sm, parmsAction, token as TokenAppNav)
			break

		case CodeActionType.navNode:
			currTab = sm.app.getCurrTab()
			if (currTab && currTab.isAlwaysRetrieveData) {
				result = await currTab.queryDataObj(sm, TokenApiQueryType.retrieve)
				if (result.error) return result
			}
			await userActionStateChangeDataObj(sm, parmsAction)
			break

		case CodeActionType.navPage:
			goto(strRequired(parmsAction.data.value, userActionError(FILENAME, actionType), 'page'))
			break

		case CodeActionType.navRow:
			result = await sm.app.navRow(sm, token as TokenAppRow)
			if (result.error) return result
			await userActionStateChangeDataObj(sm, parmsAction)
			break

		case CodeActionType.navTab:
			if (token instanceof TokenAppTab) {
				result = await token.app.navTab(sm, token)
				if (result.error) return result
				await userActionStateChangeDataObj(sm, parmsAction)
			}
			break

		case CodeActionType.openDataObjDrawer:
			const tokenDataObjDrawer = token as TokenAppDoQuery
			result = await sm.openDrawerDataObj(
				tokenDataObjDrawer.source,
				'bottom',
				'h-[70%]',
				undefined,
				tokenDataObjDrawer
			)
			if (result.error) return result

			parmsAction.setMenuClose()
			await userActionStateChangeDataObj(sm, parmsAction)
			break

		case CodeActionType.openDataObjModal:
			const tokenDataObjModal = token as TokenAppDoQuery
			result = await sm.openModalDataObj(tokenDataObjModal, async () =>
				userActionStateChangeHomeDashboard(sm, parmsAction)
			)
			if (result.error) return result

			parmsAction.setMenuClose()
			await userActionStateChangeDataObj(sm, parmsAction)
			break

		case CodeActionType.openNode:
			if (!parmsAction.isMultiTree) sm.newApp()
			result = await sm.app.addTreeNode(sm, token as TokenAppNode)
			if (result.error) return result

			parmsAction.setMenuClose()
			await userActionStateChangeDataObj(sm, parmsAction)
			break

		default:
			return new MethodResult({
				error: {
					file: FILENAME,
					function: 'default',
					msg: `No case defined for actionType: ${actionType}`
				}
			})
	}

	return new MethodResult()
}
