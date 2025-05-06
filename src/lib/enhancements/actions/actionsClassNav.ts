import {
	State,
	StateNavLayout,
	StateParms,
	StateTriggerToken
} from '$comps/app/types.appState.svelte'
import {
	userActionError,
	userActionStateChangeDataObj,
	userActionStateChangeRaw
} from '$comps/other/types.userAction.svelte'
import { TokenAppDoQuery, TokenAppStateTriggerAction } from '$utils/types.token'
import { CodeActionType, MethodResult, strRequired } from '$utils/types'
import { Token, TokenAppIndex, TokenAppNode, TokenAppRow, TokenAppTab } from '$utils/types.token'
import { goto } from '$app/navigation'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/actions/actionClassNav.ts'

export default async function action(
	sm: State,
	parmsAction: TokenAppStateTriggerAction
): Promise<MethodResult> {
	const actionType = parmsAction.codeAction.actionType
	const token: Token = parmsAction.data.token
	let result: MethodResult

	switch (actionType) {
		case CodeActionType.navBack:
			if (sm.app.getCurrLevelsLength() === 1) {
				await userActionStateChangeHomeDashboard(sm, parmsAction)
			} else {
				result = await sm.app.navBack(sm, 1)
				if (result.error) return result

				await userActionStateChangeDataObj(sm, parmsAction)
			}
			break

		case CodeActionType.navCrumbs:
			if (token instanceof TokenAppIndex) {
				if (token.index === 0) {
					await userActionStateChangeHomeDashboard(sm, parmsAction)
				} else {
					result = await sm.app.navCrumbs(sm, token)
					if (result.error) return result

					await userActionStateChangeDataObj(sm, parmsAction)
				}
			}
			break

		case CodeActionType.navHome:
			await userActionStateChangeHomeDashboard(sm, parmsAction)
			break

		case CodeActionType.navPage:
			goto(strRequired(parmsAction.data.value, userActionError(FILENAME, actionType), 'page'))
			break

		case CodeActionType.navRow:
			result = await sm.app.rowUpdate(sm, token as TokenAppRow)
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
				success: false,
				error: {
					file: FILENAME,
					function: 'default',
					msg: `No case defined for actionType: ${actionType}`
				}
			})
	}

	async function userActionStateChangeHomeDashboard(
		sm: State,
		parmsAction: TokenAppStateTriggerAction
	) {
		parmsAction.isMultiTree = true
		parmsAction.stateParms = new StateParms({ navLayout: StateNavLayout.layoutDashboard }, [
			StateTriggerToken.navDashboard
		])
		await userActionStateChangeRaw(sm, parmsAction)
	}

	return new MethodResult()
}
