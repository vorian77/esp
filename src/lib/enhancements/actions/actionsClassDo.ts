import { AppLevel, AppLevelTab } from '$comps/app/types.app.svelte'
import { State, StateParms, StateTriggerToken } from '$comps/app/types.appState.svelte'
import {
	userActionStateChangeDataObj,
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
	TokenAppDo,
	TokenAppDoQuery,
	TokenAppModalReturnType,
	TokenAppStateTriggerAction
} from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/actions/actionClassDO.ts'

let currLevel: AppLevel | undefined
let currTab: AppLevelTab | undefined
let parentTab: AppLevelTab | undefined
let result: MethodResult

export default async function action(
	sm: State,
	parmsAction: TokenAppStateTriggerAction
): Promise<MethodResult> {
	const actionType = parmsAction.codeAction.actionType
	const token: Token = parmsAction.data.token
	let tokenAppDo: TokenAppDo
	const value = parmsAction.data.value

	const actionError = (msg: string) => {
		return new MethodResult({
			error: {
				file: FILENAME,
				function: `action.${actionType}`,
				msg
			}
		})
	}

	const actionErrorToken = () => {
		return actionError(`Invalid token type. Expected TokenAppDo.`)
	}

	switch (actionType) {
		case CodeActionType.doDetailDelete:
			result = await sm.app.saveDetail(sm, actionType)
			if (result.error) return result
			await userActionStateChangeDataObj(sm, parmsAction)
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
				await userActionStateChangeDataObj(sm, parmsAction)
			}
			break

		case CodeActionType.doDetailProcessExecute:
			// await migrate(state, token.dataObj)
			break

		case CodeActionType.doDetailSave:
			result = await sm.app.saveDetail(sm, actionType)
			if (result.error) return result
			await userActionStateChangeDataObj(sm, parmsAction)
			break

		case CodeActionType.doDetailSaveAs:
			if (!(token instanceof TokenAppDo)) return actionErrorToken()
			await sm.app.tabDuplicate(sm, token)
			await userActionStateChangeDataObj(sm, parmsAction)
			break

		case CodeActionType.doEmbedListConfigEdit:
			if (!(token instanceof TokenAppDo)) return actionErrorToken()
			return await sm.openModalEmbedListConfig(
				token,
				TokenApiQueryType.retrieve,
				fModalCloseUpdateEmbedListConfig
			)
			break

		case CodeActionType.doEmbedListConfigNew:
			if (!(token instanceof TokenAppDo)) return actionErrorToken()
			await sm.openModalEmbedListConfig(
				token,
				TokenApiQueryType.preset,
				fModalCloseUpdateEmbedListConfig
			)
			break

		case CodeActionType.doEmbedListSelect:
			if (!(token instanceof TokenAppDo)) return actionErrorToken()
			return await sm.openModalEmbedListSelect(token, fModalCloseUpdateEmbedListSelect)

		case CodeActionType.doExpr:
			if (token instanceof TokenAppDo) {
				if (token.userAction && token.userAction.exprAction) {
					const evalExprContext = `${FILENAME}.action.${actionType}`
					await token.userAction.dbExe(sm, evalExprContext, token.userAction.exprAction)
				}
			} else {
				return actionErrorToken()
			}
			break

		case CodeActionType.doListDetailEdit:
			if (!token) return actionErrorToken()
			result = await userActionTreeNodeChildren(sm, token, TokenApiQueryType.retrieve, parmsAction)
			if (result.error) return result
			break

		case CodeActionType.doListDetailEditNodeConfig:
			result = await sm.app.addTreeNodeChildrenTypeObjConfig(
				sm,
				token as TokenAppDo,
				TokenApiQueryType.retrieve
			)
			if (result.error) return result
			await userActionStateChangeDataObj(sm, parmsAction)
			return result

		case CodeActionType.doListDetailNew:
			if (!token) return actionErrorToken()
			result = await userActionTreeNodeChildren(sm, token, TokenApiQueryType.preset, parmsAction)
			if (result.error) return result
			break

		case CodeActionType.doListDetailNewNodeConfig:
			result = await sm.app.addTreeNodeChildrenTypeObjConfig(
				sm,
				token as TokenAppDo,
				TokenApiQueryType.preset
			)
			if (result.error) return result
			await userActionStateChangeDataObj(sm, parmsAction)
			return result

		case CodeActionType.doListDownload:
			parmsAction.stateParms = new StateParms({}, [StateTriggerToken.listDownload])
			await userActionStateChangeRaw(sm, parmsAction)
			break

		case CodeActionType.doListSelfRefresh:
			currTab = sm.app.getCurrTab()
			if (currTab && currTab.dataObj) {
				result = await currTab.queryDataObj(sm, TokenApiQueryType.retrieve)
				if (result.error) return result
				await userActionStateChangeDataObj(sm, parmsAction)
			}
			break

		case CodeActionType.doListSelfSave:
			result = await sm.app.saveList(sm)
			if (result.error) return result
			await userActionStateChangeDataObj(sm, parmsAction)
			break

		case CodeActionType.doOpen:
			if (!(token instanceof TokenAppDoQuery)) return actionErrorToken()
			if (!parmsAction.isMultiTree) sm.newApp()
			result = await sm.app.addTreeDataObj(sm, token)
			if (result.error) return result

			parmsAction.setMenuClose()
			await userActionStateChangeDataObj(sm, parmsAction)
			break

		case CodeActionType.doOpenLink:
			parmsAction.codeAction = CodeAction.init(
				CodeActionClass.ct_sys_code_action_class_do,
				CodeActionType.doOpen
			)
			parmsAction.data.token = new TokenAppDoQuery({
				dataObjName: value,
				queryType: TokenApiQueryType.autonomous
			})
			await action(sm, parmsAction)
			break

		case CodeActionType.doRetrieveData:
			currTab = sm.app.getCurrTab()
			if (currTab && currTab.dataObj) {
				return await currTab.queryData(sm, TokenApiQueryType.retrieve)
			} else {
				return actionError(`No current tab or data object found.`)
			}

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
							await userActionStateChangeDataObj(sm, parmsAction)
							break
						case DataRecordStatus.retrieved:
						case DataRecordStatus.update:
							result = await currTab.queryDataObj(sm, TokenApiQueryType.retrieve)
							if (result.error) return result
							await userActionStateChangeDataObj(sm, parmsAction)
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
	if (token instanceof TokenAppDo && token.userAction && token.userAction.navDestination) {
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
			await userActionStateChangeDataObj(sm, parmsAction)
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
			await userActionStateChangeDataObj(sm, parmsAction)
		}

		return new MethodResult()
	}

	return new MethodResult()
}
