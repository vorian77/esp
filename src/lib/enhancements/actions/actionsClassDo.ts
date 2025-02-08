import { State, StateParms, StateTriggerToken } from '$comps/app/types.appState.svelte'
import {
	userActionStateChangeDataObj,
	userActionStateChangeRaw
} from '$comps/other/types.userAction.svelte'
import {
	CodeAction,
	CodeActionClass,
	CodeActionType,
	DataRecordStatus,
	memberOfEnum,
	ParmsValues,
	ParmsValuesType,
	required
} from '$utils/types'
import { AppLevel, AppLevelTab } from '$comps/app/types.app.svelte'
import { queryTypeTab } from '$comps/app/types.appQuery'
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

export default async function action(sm: State, parmsAction: TokenAppStateTriggerAction) {
	const actionType = parmsAction.codeAction.actionType
	const token: Token = required(parmsAction.data.token, FILENAME, 'token')
	const value = parmsAction.data.value

	switch (actionType) {
		case CodeActionType.doDetailDelete:
			await sm.app.saveDetail(sm, actionType, token as TokenAppDo)
			await userActionStateChangeDataObj(sm, parmsAction)
			break

		case CodeActionType.doDetailMigrate:
			// await migrate(sm, token.dataObj)
			break

		case CodeActionType.doDetailNew:
			parentTab = sm.app.getCurrTabParentTab()
			if (parentTab)
				parentTab.dataObj?.data?.parms.valueSet(ParmsValuesType.listRecordIdCurrent, '')
			await queryTypeTab(sm, sm.app.getCurrTab(), TokenApiQueryType.preset)
			await userActionStateChangeDataObj(sm, parmsAction)
			break

		case CodeActionType.doDetailProcessExecute:
			// await migrate(state, token.dataObj)
			break

		case CodeActionType.doDetailSave:
			if (await sm.app.saveDetail(sm, actionType, token as TokenAppDo)) {
				await userActionStateChangeDataObj(sm, parmsAction)
			}
			break

		case CodeActionType.doDetailSaveAs:
			await sm.app.tabDuplicate(sm, token as TokenAppDo)
			await userActionStateChangeDataObj(sm, parmsAction)
			break

		case CodeActionType.doEmbedListConfigEdit:
			await sm.openModalEmbedListConfig(
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
			await sm.openModalEmbedListSelect(token as TokenAppDo, fModalCloseUpdateEmbedListSelect)
			break

		case CodeActionType.doListDetailEdit:
			await sm.app.addTreeNodeChildren(sm, token as TokenAppDo, TokenApiQueryType.retrieve)
			await userActionStateChangeDataObj(sm, parmsAction)
			break

		case CodeActionType.doListDetailNew:
			await sm.app.addTreeNodeChildren(sm, token as TokenAppDo, TokenApiQueryType.preset)
			await userActionStateChangeDataObj(sm, parmsAction)
			break

		case CodeActionType.doListDownload:
			parmsAction.stateParms = new StateParms({}, [StateTriggerToken.listDownload])
			await userActionStateChangeRaw(sm, parmsAction)
			break

		case CodeActionType.doListSelfRefresh:
			await queryTypeTab(sm, sm.app.getCurrTab(), TokenApiQueryType.retrieve)
			await userActionStateChangeDataObj(sm, parmsAction)
			break

		case CodeActionType.doListSelfSave:
			const rtn = await sm.app.saveList(sm)
			await userActionStateChangeDataObj(sm, parmsAction)

			break

		case CodeActionType.doOpen:
			if (!parmsAction.isMultiTree) sm.newApp()
			await sm.app.addTreeDataObj(sm, token as TokenAppDoQuery)
			await userActionStateChangeDataObj(sm, parmsAction)
			break

		case CodeActionType.doOpenLink:
			const doOpenValues = value.trim().split(',')
			if (doOpenValues.length !== 2) {
				error(500, {
					file: FILENAME,
					function: 'doOpenLink',
					message: `Invalid value for doOpenLink: ${value}`
				})
			}
			parmsAction.codeAction = CodeAction.init(
				CodeActionClass.ct_sys_code_action_class_do,
				CodeActionType.doOpen
			)
			parmsAction.data.token = new TokenAppDoQuery({
				dataObjName: doOpenValues[0],
				queryType: memberOfEnum(
					doOpenValues[1],
					FILENAME,
					'queryType',
					'TokenApiQueryType',
					TokenApiQueryType
				)
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
							await queryTypeTab(sm, currTab, TokenApiQueryType.preset)
							await userActionStateChangeDataObj(sm, parmsAction)
							break
						case DataRecordStatus.retrieved:
						case DataRecordStatus.update:
							await queryTypeTab(sm, currTab, TokenApiQueryType.retrieve)
							await userActionStateChangeDataObj(sm, parmsAction)
							break
						default:
							error(500, {
								file: FILENAME,
								function: `default.actionType: ${actionType}`,
								message: `No case defined for DataRecordStatus: ${status} `
							})
					}
				}
			}
			break

		default:
			error(500, {
				file: FILENAME,
				function: 'default',
				message: `No case defined for actionType: ${actionType}`
			})
	}

	async function fModalCloseUpdateEmbedListConfig(
		returnType: TokenAppModalReturnType,
		data?: ParmsValues
	) {
		currLevel = sm.app.getCurrLevel()
		if (currLevel) {
			currTab = currLevel.getCurrTab()
			await queryTypeTab(sm, currTab, TokenApiQueryType.retrieve)
			await userActionStateChangeDataObj(sm, parmsAction)
		}
	}

	async function fModalCloseUpdateEmbedListSelect(
		returnType: TokenAppModalReturnType,
		data?: ParmsValues
	) {
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
						currTab.dataObj.data.fields[idx].data.parms.valueSet(
							ParmsValuesType.embedListSave,
							true
						)
						await sm.app.saveList(sm)
					}
				}
			}
			await userActionStateChangeDataObj(sm, parmsAction)
		}
	}
}
