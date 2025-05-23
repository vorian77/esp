import { State } from '$comps/app/types.appState.svelte'
import { userActionTreeNodeChildren } from '$comps/other/types.userAction.svelte'
import { TokenApiQueryType, TokenAppDo, TokenAppStateTriggerAction } from '$utils/types.token'
import { CodeActionType, DataObj, MethodResult, required } from '$utils/types'
import { Token } from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/actions/actionClassCustom.ts'

export default async function action(
	sm: State,
	parmsAction: TokenAppStateTriggerAction
): Promise<MethodResult> {
	const actionType = parmsAction.codeAction.actionType
	const token: Token = parmsAction.data.token
	const tokenAppDo = token as TokenAppDo

	let dm = sm.dm
	let currTab = required(sm.app.getCurrTab(), FILENAME, 'currTab')
	let dataObj: DataObj = required(currTab.dataObj, FILENAME, 'dataObj')
	let result: MethodResult

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
			result = await sm.triggerActionDo(CodeActionType.doDetailSave, tokenAppDo.dataObj)
			if (result.error) return result
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
			result = await userActionTreeNodeChildren(sm, token, TokenApiQueryType.preset, parmsAction)
			if (result.error) return result
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
	return new MethodResult()
}
