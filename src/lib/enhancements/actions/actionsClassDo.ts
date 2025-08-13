import { AppLevel, AppLevelNode } from '$comps/app/types.app.svelte'
import { State } from '$comps/app/types.state.svelte'
import {
	actionErrorToken,
	userActionStateChangeTab,
	userActionNavDestination,
	userActionTreeNodeChildren
} from '$comps/other/types.userAction.svelte'
import {
	CodeAction,
	CodeActionClass,
	CodeActionType,
	DataObj,
	DataRecordStatus,
	MethodResult,
	ParmsValues,
	ParmsValuesType,
	required,
	strRequired
} from '$utils/types'
import { DbTableQueryGroup } from '$lib/queryClient/types.queryClient'
import {
	Token,
	TokenApiQueryType,
	TokenAppActionTrigger,
	TokenAppModalReturn,
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
			if (parentTab) {
				parentTab.dataObjParmsFormListParmSet(ParmsValuesType.listRecordIdCurrent, '')
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
				fModalReturnEmbedListConfig
			)
			break

		case CodeActionType.doEmbedListConfigNew:
			if (!(token instanceof TokenAppActionTrigger)) return actionErrorToken(actionType)
			await sm.openModalEmbedListConfig(
				token,
				TokenApiQueryType.preset,
				fModalReturnEmbedListConfig
			)
			break

		case CodeActionType.doEmbedListSelect:
			if (!(token instanceof TokenAppActionTrigger)) return actionErrorToken(actionType)
			return await sm.openModalEmbedListSelect(token, fModalReturneEmbedListSelect)

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

		case CodeActionType.doListDelete:
			if (token instanceof TokenAppActionTrigger) {
				// delete list
				currTab = sm.app.getCurrTab()
				const tableGroup: DbTableQueryGroup = required(
					currTab?.dataObj?.data?.rawDataObj?.tableGroup,
					`${FILENAME}.action.${actionType}`,
					'tableGroup'
				)
				const tableObj = strRequired(
					tableGroup.getTable(0)?.object,
					`${FILENAME}.action.${actionType}`,
					'table'
				)
				let exprFilter = strRequired(
					currTab?.dataObj?.data?.rawDataObj?.rawQuerySource?.exprFilter,
					`${FILENAME}.action.${actionType}`,
					'exprFilter'
				)
				exprFilter = exprFilter == 'none' ? '' : ` FILTER ${exprFilter}`
				const exprProcess = `DELETE ${tableObj}${exprFilter}`
				const evalExprContext = `${FILENAME}.action.${actionType}`
				await token.userAction.dbExe(sm, evalExprContext, exprProcess)

				// refresh list
				parmsAction.codeAction = CodeAction.init(
					CodeActionClass.ct_sys_code_action_class_do,
					CodeActionType.doListSelfRefresh
				)
				await action(sm, parmsAction)
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
			currTab = sm.app.getCurrTab()
			const dataObj: DataObj = required(
				currTab?.dataObj,
				`${FILENAME}.action.${actionType}`,
				'dataObj'
			)
			await dataObj.gridDownload(sm)
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

	async function fModalReturnEmbedListConfig(
		modalReturn: TokenAppModalReturn
	): Promise<MethodResult> {
		if (modalReturn.type === TokenAppModalReturnType.complete) {
			let result: MethodResult
			sm.app.virtualModalLevelRestore()
			currLevel = sm.app.getCurrLevel()
			if (currLevel) {
				currTab = currLevel.getCurrTab()
				result = await currTab.queryDataObj(sm, TokenApiQueryType.retrieve)
				if (result.error) return result
				await userActionStateChangeTab(sm, parmsAction)
			}
		}
		return new MethodResult()
	}

	async function fModalReturneEmbedListSelect(
		modalReturn: TokenAppModalReturn
	): Promise<MethodResult> {
		if (modalReturn.type === TokenAppModalReturnType.complete) {
			currLevel = sm.app.getCurrLevel()
			if (currLevel && modalReturn.parmsState && modalReturn.parmsFormList) {
				const embedFieldName = modalReturn.parmsState.valueGet(ParmsValuesType.embedFieldName)
				currTab = currLevel.getCurrTab()
				if (currTab && currTab.dataObj && embedFieldName) {
					const idx = currTab.dataObj.data.fields.findIndex(
						(f) => f.rawFieldEmbedList.embedPropName === embedFieldName
					)
					if (idx > -1) {
						currTab.dataObj.data.fields[idx].embedData.parmsFormList.valueSet(
							ParmsValuesType.isEmbedSaveWithParent,
							true
						)
						currTab.dataObj.data.fields[idx].embedData.parmsFormList.valueSet(
							ParmsValuesType.listIdsSelected,
							modalReturn.parmsFormList.data.listIdsSelected
						)
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
