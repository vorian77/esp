import { State } from '$comps/app/types.appState.svelte'
import {
	userActionError,
	userActionStateChangeHomeAppForm,
	userActionStateChangeHomeDashboard
} from '$comps/other/types.userAction.svelte'
import { TokenAppStateTriggerAction } from '$utils/types.token'
import { CodeActionType, strRequired } from '$utils/types'
import { Token, TokenAppIndex, TokenAppNode, TokenAppRow, TokenAppTab } from '$utils/types.token'
import { goto } from '$app/navigation'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/actions/actionClassNav.ts'

export default async function action(sm: State, parms: TokenAppStateTriggerAction) {
	const actionType = parms.codeAction.actionType
	const token: Token = parms.data.token

	switch (actionType) {
		case CodeActionType.navBack:
			if (sm.app.getCurrLevelsLength() === 1) {
				userActionStateChangeHomeDashboard(sm, parms)
			} else {
				await sm.app.navBack(sm, 1)
				userActionStateChangeHomeAppForm(sm, parms)
			}
			break

		case CodeActionType.navCrumbs:
			if (token instanceof TokenAppIndex) {
				if (token.index === 0) {
					userActionStateChangeHomeDashboard(sm, parms)
				} else {
					await sm.app.navCrumbs(sm, token)
					userActionStateChangeHomeAppForm(sm, parms)
				}
			}
			break

		case CodeActionType.navHome:
			userActionStateChangeHomeDashboard(sm, parms)
			break

		case CodeActionType.navPage:
			const page = strRequired(parms.data.value, userActionError(FILENAME, actionType), 'page')
			goto(page)
			break

		case CodeActionType.navRow:
			await sm.app.rowUpdate(sm, token as TokenAppRow)
			userActionStateChangeHomeAppForm(sm, parms)
			break

		case CodeActionType.navTab:
			if (token instanceof TokenAppTab) {
				await token.app.navTab(sm, token)
				userActionStateChangeHomeAppForm(sm, parms)
			}
			break

		case CodeActionType.openNode:
			if (parms.isNewApp) sm.newApp()
			await sm.app.addTreeNode(sm, token as TokenAppNode)
			userActionStateChangeHomeAppForm(sm, parms)
			break

		default:
			error(500, {
				file: FILENAME,
				function: 'default',
				message: `No case defined for actionType: ${actionType}`
			})
	}
}
