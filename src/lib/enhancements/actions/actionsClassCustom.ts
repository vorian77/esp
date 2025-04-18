import {
	State,
	StateNavLayout,
	StateParms,
	StateTriggerToken
} from '$comps/app/types.appState.svelte'
import {
	userActionError,
	userActionStateChangeDataObj,
	userActionStateChangeRaw,
	userActionTreeNodeChildren
} from '$comps/other/types.userAction.svelte'
import { AppLevel, AppLevelTab } from '$comps/app/types.app.svelte'
import {
	TokenApiQueryType,
	TokenAppDo,
	TokenAppDoQuery,
	TokenAppStateTriggerAction
} from '$utils/types.token'
import {
	CodeAction,
	CodeActionClass,
	CodeActionType,
	DataObj,
	DataManager,
	DataRow,
	required,
	strRequired
} from '$utils/types'
import { Token, TokenAppIndex, TokenAppNode, TokenAppRow, TokenAppTab } from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/actions/actionClassCustom.ts'

export default async function action(sm: State, parmsAction: TokenAppStateTriggerAction) {
	const actionType = parmsAction.codeAction.actionType
	const token: Token = parmsAction.data.token
	const tokenAppDo = token as TokenAppDo

	let dm = sm.dm
	let currTab = required(sm.app.getCurrTab(), FILENAME, 'currTab')
	let dataObj: DataObj = required(currTab.dataObj, FILENAME, 'dataObj')

	switch (actionType) {
		case CodeActionType.doCustomAIAttdSheetSetAllFullClass:
			// alert('Set all - full class - coming soon...')

			const field = dataObj.getField('codeCmCohortAttdDuration')
			const fieldNote = dataObj.getField('note')

			for (let idx = 0; idx < dataObj.data.rowsRetrieved.dataRows.length; idx++) {
				// await dm.setFieldValue(dataObj.raw.id, idx, field, 'c5a9eed0-ebc2-11ee-a369-173f8eb5fa89')
				await dm.setFieldValue(dataObj.raw.id, idx, fieldNote, `value row: ${idx}`)
			}
			console.log(
				'currTab.dataObj.data.rowsRetrieved.dataRows:',
				currTab.dataObj.data.rowsRetrieved.dataRows

				// currTab.dataObj.data.rowsRetrieved.dataRows.map(
				// 	(dataRow: DataRow) => dataRow.record.linkItems_codeCmCohortAttdDuration
				// )
			)
			break

		case CodeActionType.doCustomAIAttdSheetReset:
			alert('doCustomAIAttdSheetReset')
			break

		case CodeActionType.doCustomSysMsgRootDetailSave:
			await sm.triggerActionDo(CodeActionType.doDetailSave, tokenAppDo.dataObj)
			break

		case CodeActionType.doCustomSysMsgThreadDetailClose:
			alert('doCustomSysMsgThreadDetailClose')
			break

		case CodeActionType.doCustomSysMsgThreadDetailReply:
			alert('doCustomSysMsgThreadDetailReply')
			break

		case CodeActionType.doCustomSysMsgThreadDetailSend:
			alert('doCustomSysMsgThreadDetailSend')
			break

		case CodeActionType.doCustomSysMsgThreadListClose:
			alert('doCustomSysMsgThreadListClose')
			break

		case CodeActionType.doCustomSysMsgThreadListForward:
		case CodeActionType.doCustomSysMsgThreadListReply:
			await userActionTreeNodeChildren(sm, token, TokenApiQueryType.preset, parmsAction)
			break

		default:
			error(500, {
				file: FILENAME,
				function: 'default',
				message: `No case defined for actionType: ${actionType}`
			})
	}
}
