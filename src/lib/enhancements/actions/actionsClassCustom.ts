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

		case CodeActionType.doCustomSysMsgThreadDetailSend:
			alert('doCustomSysMsgThreadDetailSend')
			break

		case CodeActionType.doCustomSysMsgThreadReply:
			result = await userActionTreeNodeChildren(sm, token, TokenApiQueryType.preset, parmsAction)
			if (result.error) return result
			break

		case CodeActionType.doCustomSysMsgThreadListClose:
			alert('doCustomSysMsgThreadListClose')
			currTab = sm.app.getCurrTab()
			if (currTab && currTab.dataObj) {
				const currRecordId = currTab.getCurrRecordValue('id')
				if (currRecordId) {
					const evalExprContext = `${FILENAME}.action.${actionType}`
					const expr = `UPDATE sys_core::SysMsg FILTER .id = <uuid>'${currRecordId}' SET {isOpen := true}`
					// result = await clientQueryExpr(expr, evalExprContext)
					// return await clientQueryExpr(dbExpr, evalExprContext, {}, sm)
					// if (result.error) return result

					// currTab.dataObj.data.rowsRetrieved.setDetailRecordValue('isReadDisplay', 'No')
					// await userActionStateChangeDataObj(sm, parmsAction)
					return new MethodResult()
				}
			}
			break

		default:
			return new MethodResult({
				error: {
					file: FILENAME,
					function: 'default',
					msg: `No case defined for actionType: ${actionType}`
				}
			})
	}
	return new MethodResult()
}
