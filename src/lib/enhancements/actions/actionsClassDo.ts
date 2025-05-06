import { AppLevel, AppLevelTab } from '$comps/app/types.app.svelte'
import { State, StateParms, StateTriggerToken } from '$comps/app/types.appState.svelte'
import {
	userActionStateChangeDataObj,
	userActionStateChangeRaw,
	userActionTreeNodeChildren
} from '$comps/other/types.userAction.svelte'
import {
	CodeAction,
	CodeActionClass,
	CodeActionType,
	DataRecordStatus,
	MethodResult,
	ParmsValues,
	ParmsValuesType,
	required
} from '$utils/types'
import {
	Token,
	TokenApiQueryType,
	TokenAppDo,
	TokenAppDoQuery,
	TokenAppModalReturnType,
	TokenAppStateTriggerAction
} from '$utils/types.token'
import { clientQueryExpr } from '$lib/query/queryManagerClient'

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
	const token: Token = required(parmsAction.data.token, FILENAME, 'token')
	const value = parmsAction.data.value
	let currRecordId: string

	switch (actionType) {
		case CodeActionType.doDetailDelete:
			result = await sm.app.saveDetail(sm, actionType)
			if (result.error) return result

			await userActionStateChangeDataObj(sm, parmsAction)
			break

		case CodeActionType.doDetailMsgSetClosed:
			alert('doDetailMsgSetClosed')
			break

		case CodeActionType.doDetailMsgSetOpen:
			currTab = sm.app.getCurrTab()
			if (currTab && currTab.dataObj) {
				currRecordId = currTab.getCurrRecordValue('id')
				if (currRecordId) {
					const evalExprContext = `${FILENAME}.action.${actionType}`
					const expr = `UPDATE sys_core::SysMsg FILTER .id = <uuid>'${currRecordId}' SET {isOpen := true}`
					result = await clientQueryExpr(expr, evalExprContext)
					if (result.error) return result

					// currTab.dataObj.data.rowsRetrieved.setDetailRecordValue('isReadDisplay', 'No')
					await userActionStateChangeDataObj(sm, parmsAction)
				}
			}
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
				result = await currTab.query(sm, TokenApiQueryType.preset)
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
			await sm.app.tabDuplicate(sm, token as TokenAppDo)
			await userActionStateChangeDataObj(sm, parmsAction)
			break

		case CodeActionType.doEmbedListConfigEdit:
			return await sm.openModalEmbedListConfig(
				token as TokenAppDo,
				TokenApiQueryType.retrieve,
				fModalCloseUpdateEmbedListConfig
			)
			break

		case CodeActionType.doEmbedListConfigNew:
			await sm.openModalEmbedListConfig(
				token as TokenAppDo,
				TokenApiQueryType.preset,
				fModalCloseUpdateEmbedListConfig
			)
			break

		case CodeActionType.doEmbedListSelect:
			return await sm.openModalEmbedListSelect(
				token as TokenAppDo,
				fModalCloseUpdateEmbedListSelect
			)
			break

		case CodeActionType.doListDetailEdit:
			await userActionTreeNodeChildren(sm, token, TokenApiQueryType.retrieve, parmsAction)
			break

		case CodeActionType.doListDetailNew:
			result = await userActionTreeNodeChildren(sm, token, TokenApiQueryType.preset, parmsAction)
			if (result.error) return result
			break

		case CodeActionType.doListDownload:
			parmsAction.stateParms = new StateParms({}, [StateTriggerToken.listDownload])
			await userActionStateChangeRaw(sm, parmsAction)
			break

		case CodeActionType.doListSelfRefresh:
			currTab = sm.app.getCurrTab()
			if (currTab && currTab.dataObj) {
				result = await currTab.query(sm, TokenApiQueryType.retrieve)
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
			if (!parmsAction.isMultiTree) sm.newApp()
			result = await sm.app.addTreeDataObj(sm, token as TokenAppDoQuery)
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

		case CodeActionType.doSaveCancel:
			currLevel = sm.app.getCurrLevel()
			if (currLevel) {
				currTab = currLevel.getCurrTab()
				if (currTab && currTab.dataObj) {
					const status = currTab?.dataObj.data?.rowsRetrieved?.getDetailRowStatus()
					switch (status) {
						case DataRecordStatus.preset:
							result = await currTab.query(sm, TokenApiQueryType.preset)
							if (result.error) return result

							await userActionStateChangeDataObj(sm, parmsAction)
							break
						case DataRecordStatus.retrieved:
						case DataRecordStatus.update:
							result = await currTab.query(sm, TokenApiQueryType.retrieve)
							if (result.error) return result

							await userActionStateChangeDataObj(sm, parmsAction)
							break

						default:
							return new MethodResult({
								success: false,
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
				success: false,
				error: {
					file: FILENAME,
					function: `default`,
					msg: `No case defined for actionType: ${actionType}`
				}
			})
	}

	async function fModalCloseUpdateEmbedListConfig(
		returnType: TokenAppModalReturnType,
		data?: ParmsValues
	): Promise<MethodResult> {
		let result: MethodResult
		currLevel = sm.app.getCurrLevel()
		if (currLevel) {
			currTab = currLevel.getCurrTab()
			result = await currTab.query(sm, TokenApiQueryType.retrieve)

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
