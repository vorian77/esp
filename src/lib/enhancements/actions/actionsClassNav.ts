import { State, StateComponentLayout, StateTriggerToken } from '$comps/app/types.appState.svelte'
import {
	userActionError,
	userActionStateChangeDataObj,
	userActionStateChangeRaw
} from '$comps/other/types.userAction.svelte'
import { TokenAppDoQuery, TokenAppStateTriggerAction } from '$utils/types.token'
import { CodeActionType, strRequired } from '$utils/types'
import { Token, TokenAppIndex, TokenAppNode, TokenAppRow, TokenAppTab } from '$utils/types.token'
import { goto } from '$app/navigation'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/actions/actionClassNav.ts'

export default async function action(sm: State, parmsAction: TokenAppStateTriggerAction) {
	const actionType = parmsAction.codeAction.actionType
	const token: Token = parmsAction.data.token

	switch (actionType) {
		case CodeActionType.navBack:
			if (sm.app.getCurrLevelsLength() === 1) {
				await userActionStateChangeHomeDashboard(sm, parmsAction)
			} else {
				await sm.app.navBack(sm, 1)
				await userActionStateChangeDataObj(sm, parmsAction)
			}
			break

		case CodeActionType.navCrumbs:
			if (token instanceof TokenAppIndex) {
				if (token.index === 0) {
					await userActionStateChangeHomeDashboard(sm, parmsAction)
				} else {
					await sm.app.navCrumbs(sm, token)
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
			await sm.app.rowUpdate(sm, token as TokenAppRow)
			await userActionStateChangeDataObj(sm, parmsAction)
			break

		case CodeActionType.navTab:
			if (token instanceof TokenAppTab) {
				await token.app.navTab(sm, token)
				await userActionStateChangeDataObj(sm, parmsAction)
			}
			break

		case CodeActionType.openDataObjDrawer:
			const tokenDataObjDrawer = token as TokenAppDoQuery
			await sm.openDrawerDataObj(
				tokenDataObjDrawer.source,
				'bottom',
				'h-[70%]',
				undefined,
				tokenDataObjDrawer,
				true
			)
			await userActionStateChangeDataObj(sm, parmsAction)
			break

		case CodeActionType.openDataObjModal:
			const tokenDataObjModal = token as TokenAppDoQuery
			await sm.openModalDataObj(tokenDataObjModal, true, async () =>
				userActionStateChangeHomeDashboard(sm, parmsAction)
			)
			await userActionStateChangeDataObj(sm, parmsAction)
			break

		case CodeActionType.openNode:
			if (parmsAction.isNewApp) sm.newApp()
			await sm.app.addTreeNode(sm, token as TokenAppNode)
			await userActionStateChangeDataObj(sm, parmsAction)
			break

		default:
			error(500, {
				file: FILENAME,
				function: 'default',
				message: `No case defined for actionType: ${actionType}`
			})
	}

	async function userActionStateChangeHomeDashboard(
		sm: State,
		parmsAction: TokenAppStateTriggerAction
	) {
		await userActionStateChangeRaw(sm, parmsAction, {
			navLayout: StateComponentLayout.layoutDashboard,
			triggerTokens: [StateTriggerToken.navDashboard]
		})
	}
}
