import {
	State,
	StateNavLayout,
	StateParms,
	StateTriggerToken
} from '$comps/app/types.appState.svelte'
import { AppLevelNode } from '$comps/app/types.app.svelte'
import {
	actionErrorToken,
	getTokenNode,
	userActionStateChangeRaw,
	userActionError,
	userActionStateChangeTab,
	userActionNavDestination
} from '$comps/other/types.userAction.svelte'
import {
	CodeAction,
	CodeActionClass,
	CodeActionType,
	MethodResult,
	ParmsValuesType,
	required,
	strRequired
} from '$utils/types'
import {
	Token,
	TokenApiId,
	TokenApiQueryType,
	TokenAppDoCustom,
	TokenAppNav,
	TokenAppNode,
	TokenAppRow,
	TokenAppStateTriggerAction,
	TokenAppTab
} from '$utils/types.token'
import { goto } from '$app/navigation'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/actions/actionClassNav.ts'

let currTab: AppLevelNode | undefined

export default async function action(
	sm: State,
	parmsAction: TokenAppStateTriggerAction
): Promise<MethodResult> {
	const actionType = parmsAction.codeAction.actionType
	const token: Token = parmsAction.data.token
	let result: MethodResult
	let clazz = `${FILENAME}.${actionType}`

	switch (actionType) {
		case CodeActionType.navDestination:
			await userActionNavDestination(sm, parmsAction, token as TokenAppNav)
			break

		case CodeActionType.navNode:
			currTab = sm.app.getCurrTab()
			if (currTab && currTab.node.isAlwaysRetrieveData) {
				result = await currTab.queryDataObj(sm, TokenApiQueryType.retrieve)
				if (result.error) return result
			}
			await userActionStateChangeTab(sm, parmsAction)
			break

		case CodeActionType.navPage:
			goto(strRequired(parmsAction.data.value, userActionError(FILENAME, actionType), 'page'))
			break

		case CodeActionType.navRow:
			result = await sm.app.navRow(sm, token as TokenAppRow)
			if (result.error) return result
			await userActionStateChangeTab(sm, parmsAction)
			break

		case CodeActionType.navSelectList:
			currTab = sm.app.getCurrTab()
			if (currTab) {
				const selectListRecord = required(
					sm.parmsState.valueGet(ParmsValuesType.selectListRecord),
					clazz,
					'selectListRecord'
				)
				currTab.node.dataObjId = strRequired(selectListRecord._dataObjId, clazz, '_dataObjId')
				result = await currTab.queryDataObj(sm, TokenApiQueryType.retrieve)
				if (result.error) return result
				await userActionStateChangeTab(sm, parmsAction)
			}
			break

		case CodeActionType.navTab:
			if (token instanceof TokenAppTab) {
				result = await token.app.navTab(sm, token)
				if (result.error) return result
				await userActionStateChangeTab(sm, parmsAction)
			}
			break

		case CodeActionType.openDashboard:
			parmsAction.isMultiTree = true
			parmsAction.stateParms = new StateParms({ navLayout: StateNavLayout.layoutDashboard }, [
				StateTriggerToken.navDashboard
			])
			await userActionStateChangeRaw(sm, parmsAction)
			break

		case CodeActionType.openNode:
			if (!(token instanceof TokenAppNode)) return actionErrorToken(actionType)
			if (!parmsAction.isMultiTree) sm.newApp()
			result = await sm.app.treeNodeAdd(sm, token)
			if (result.error) return result

			parmsAction.updateStateParmsTokensMenuClose()
			await userActionStateChangeTab(sm, parmsAction)
			break

		case CodeActionType.openNodeFreeApp:
			if (!(token instanceof TokenApiId)) return actionErrorToken(actionType)
			result = await getTokenNode(actionType, token)
			if (result.error) return result

			parmsAction.codeAction = CodeAction.init(
				CodeActionClass.ct_sys_code_action_class_nav,
				CodeActionType.openNode
			)
			parmsAction.data.token = result.data as TokenAppNode

			await action(sm, parmsAction)
			break

		case CodeActionType.openNodeFreeAppCustom:
			if (!(token instanceof TokenAppDoCustom)) return actionErrorToken(actionType)
			parmsAction.codeAction = CodeAction.init(
				CodeActionClass.ct_sys_code_action_class_nav,
				CodeActionType.openNodeFreeApp
			)
			parmsAction.data.token = new TokenApiId(token.fieldCustom.value)
			parmsAction.stateParms = new StateParms({ navLayout: StateNavLayout.layoutContent })

			await action(sm, parmsAction)
			break

		case CodeActionType.openNodeFreeDrawer:
			if (!(token instanceof TokenApiId)) return actionErrorToken(actionType)
			result = await getTokenNode(actionType, token)
			if (result.error) return result

			result = await sm.openDrawerNode(result.data as TokenAppNode, 'bottom', 'h-[70%]', undefined)
			if (result.error) return result

			parmsAction.updateStateParmsTokensMenuClose()
			await userActionStateChangeTab(sm, parmsAction)
			break

		case CodeActionType.openNodeFreeModal:
			if (!(token instanceof TokenApiId)) return actionErrorToken(actionType)
			result = await getTokenNode(actionType, token)
			if (result.error) return result

			result = await sm.openModalNode(result.data as TokenAppNode, async () =>
				sm.triggerActionDashboard()
			)
			if (result.error) return result

			parmsAction.updateStateParmsTokensMenuClose()
			await userActionStateChangeTab(sm, parmsAction)
			break

		default:
			return new MethodResult({
				error: {
					file: FILENAME,
					function: 'action',
					msg: `No case defined for actionType: ${actionType}`
				}
			})
	}

	return new MethodResult()
}
