import { AppLevel, AppLevelNode } from '$comps/app/types.app.svelte'
import { State, StateParms, StateTriggerToken } from '$comps/app/types.appState.svelte'
import {
	actionError,
	actionErrorToken,
	userActionStateChangeTab,
	userActionStateChangeRaw,
	userActionNavDestination,
	userActionTreeNodeChildren
} from '$comps/other/types.userAction.svelte'
import {
	CodeAction,
	CodeActionClass,
	CodeActionType,
	DataRecordStatus,
	MethodResult,
	ParmsValues,
	ParmsValuesType
} from '$utils/types'
import {
	Token,
	TokenApiQueryType,
	TokenAppActionTrigger,
	TokenAppModalReturnType,
	TokenAppStateTriggerAction
} from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/actions/actionClassDO.ts'

let currLevel: AppLevel | undefined
let currTab: AppLevelNode | undefined
let parentTab: AppLevelNode | undefined
let result: MethodResult

export default async function action(
	sm: State,
	parmsAction: TokenAppStateTriggerAction
): Promise<MethodResult> {
	const actionType = parmsAction.codeAction.actionType
	const token: Token = parmsAction.data.token
	const value = parmsAction.data.value

	switch (actionType) {
		case CodeActionType.doDetailDelete:
			result = await sm.app.saveDetail(sm, actionType)
			if (result.error) return result
			await userActionStateChangeTab(sm, parmsAction)
			break

		case CodeActionType.doDetailMigrate:
			// await migrate(sm, token.dataObj)
			break

		case CodeActionType.doDetailNew:
			parentTab = sm.app.getCurrTabParentTab()
			if (parentTab && parentTab.dataObj) {
				parentTab.dataObj.data.parms.valueSet(ParmsValuesType.listRecordIdCurrent, '')
			}
			currTab = sm.app.getCurrTab()
			if (currTab && currTab.dataObj) {
				result = await currTab.queryDataObj(sm, TokenApiQueryType.preset)
				if (result.error) return result
				await userActionStateChangeTab(sm, parmsAction)
			}
			break

		case CodeActionType.doDetailProcessExecute:
			// await migrate(state, token.dataObj)
			break

		case CodeActionType.doDetailSave:
			result = await sm.app.saveDetail(sm, actionType)
			if (result.error) return result
			await userActionStateChangeTab(sm, parmsAction)
			break

		case CodeActionType.doDetailSaveAs:
			if (!(token instanceof TokenAppActionTrigger)) return actionErrorToken(actionType)
			await sm.app.tabDuplicate(sm, token)
			await userActionStateChangeTab(sm, parmsAction)
			break

		case CodeActionType.doEmbedListConfigEdit:
			if (!(token instanceof TokenAppActionTrigger)) return actionErrorToken(actionType)
			return await sm.openModalEmbedListConfig(
				token,
				TokenApiQueryType.retrieve,
				fModalCloseUpdateEmbedListConfig
			)
			break

		case CodeActionType.doEmbedListConfigNew:
			if (!(token instanceof TokenAppActionTrigger)) return actionErrorToken(actionType)
			await sm.openModalEmbedListConfig(
				token,
				TokenApiQueryType.preset,
				fModalCloseUpdateEmbedListConfig
			)
			break

		case CodeActionType.doEmbedListSelect:
			if (!(token instanceof TokenAppActionTrigger)) return actionErrorToken(actionType)
			return await sm.openModalEmbedListSelect(token, fModalCloseUpdateEmbedListSelect)

		case CodeActionType.doExpr:
			if (token instanceof TokenAppActionTrigger) {
				if (token.userAction && token.userAction.exprAction) {
					const evalExprContext = `${FILENAME}.action.${actionType}`
					await token.userAction.dbExe(sm, evalExprContext, token.userAction.exprAction)
				}
			} else {
				return actionErrorToken(actionType)
			}
			break

		case CodeActionType.doListDetailEdit:
			if (!(token instanceof TokenAppActionTrigger)) return actionErrorToken(actionType)
			result = await userActionTreeNodeChildren(
				sm,
				actionType,
				token,
				TokenApiQueryType.retrieve,
				parmsAction
			)
			if (result.error) return result
			break

		case CodeActionType.doListDetailNew:
			if (!(token instanceof TokenAppActionTrigger)) return actionErrorToken(actionType)
			result = await userActionTreeNodeChildren(
				sm,
				actionType,
				token,
				TokenApiQueryType.preset,
				parmsAction
			)
			if (result.error) return result
			break

		case CodeActionType.doListDownload:
			parmsAction.stateParms = new StateParms({}, [StateTriggerToken.listDownload])
			await userActionStateChangeRaw(sm, parmsAction)
			break

		case CodeActionType.doListSelfRefresh:
			currTab = sm.app.getCurrTab()
			if (currTab && currTab.dataObj) {
				result = await currTab.queryDataObj(sm, TokenApiQueryType.retrieve)
				if (result.error) return result
				await userActionStateChangeTab(sm, parmsAction)
			}
			break

		case CodeActionType.doListSelfSave:
			result = await sm.app.saveList(sm)
			if (result.error) return result
			await userActionStateChangeTab(sm, parmsAction)
			break

		case CodeActionType.doSaveCancel:
			currLevel = sm.app.getCurrLevel()
			if (currLevel) {
				currTab = currLevel.getCurrTab()
				if (currTab && currTab.dataObj) {
					const status = currTab?.dataObj.data?.rowsRetrieved?.getDetailRowStatus()
					switch (status) {
						case DataRecordStatus.preset:
							result = await currTab.queryDataObj(sm, TokenApiQueryType.preset)
							if (result.error) return result
							await userActionStateChangeTab(sm, parmsAction)
							break
						case DataRecordStatus.retrieved:
						case DataRecordStatus.update:
							result = await currTab.queryDataObj(sm, TokenApiQueryType.retrieve)
							if (result.error) return result
							await userActionStateChangeTab(sm, parmsAction)
							break

						default:
							return new MethodResult({
								error: {
									file: FILENAME,
									function: `default.actionType: ${actionType}`,
									msg: `No case defined for DataRecordStatus: ${status} `
								}
							})
					}
				}
			}
			break

		default:
			return new MethodResult({
				error: {
					file: FILENAME,
					function: `default`,
					msg: `No case defined for actionType: ${actionType}`
				}
			})
	}

	// destination
	if (
		token instanceof TokenAppActionTrigger &&
		token.userAction &&
		token.userAction.navDestination
	) {
		await userActionNavDestination(sm, parmsAction, token.userAction.navDestination)
	}

	async function fModalCloseUpdateEmbedListConfig(
		returnType: TokenAppModalReturnType,
		data?: ParmsValues
	): Promise<MethodResult> {
		let result: MethodResult
		currLevel = sm.app.getCurrLevel()
		if (currLevel) {
			currTab = currLevel.getCurrTab()
			result = await currTab.queryDataObj(sm, TokenApiQueryType.retrieve)

			if (result.error) return result
			await userActionStateChangeTab(sm, parmsAction)
		}
		return new MethodResult()
	}

	async function fModalCloseUpdateEmbedListSelect(
		returnType: TokenAppModalReturnType,
		data?: ParmsValues
	): Promise<MethodResult> {
		if (returnType === TokenAppModalReturnType.complete) {
			currLevel = sm.app.getCurrLevel()
			if (currLevel) {
				const embedFieldName = data?.valueGet(ParmsValuesType.embedFieldName)
				currTab = currLevel.getCurrTab()
				if (currTab && currTab.dataObj && embedFieldName) {
					const idx = currTab.dataObj.data.fields.findIndex(
						(f) => f.embedFieldName === embedFieldName
					)
					if (idx > -1) {
						currTab.dataObj.data.fields[idx].data.parms.update(data?.valueGetAll())
						let result: MethodResult = await sm.app.saveList(sm)
						if (result.error) return result
					}
				}
			}
			await userActionStateChangeTab(sm, parmsAction)
		}

		return new MethodResult()
	}

	return new MethodResult()
}
