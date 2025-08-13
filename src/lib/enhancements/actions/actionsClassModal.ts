import { State } from '$comps/app/types.state.svelte'
import { userActionStateChangeTab } from '$comps/other/types.userAction.svelte'
import { TokenAppStateTriggerAction } from '$utils/types.token'
import { CodeActionType, MethodResult } from '$utils/types'
import {
	Token,
	TokenAppModalEmbedField,
	TokenAppModalDate,
	TokenAppModalSelect
} from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/actions/actionClassModal.ts'

export default async function action(
	sm: State,
	parms: TokenAppStateTriggerAction
): Promise<MethodResult> {
	const actionType = parms.codeAction.actionType
	const token: Token = parms.data.token
	let result: MethodResult

	switch (actionType) {
		case CodeActionType.embedShell:
			break

		case CodeActionType.modalOpenEmbedFieldLevel:
			result = await sm.app.addLevelEmbedFieldModal(sm, token as TokenAppModalEmbedField)
			if (result.error) return result
			await userActionStateChangeTab(sm, parms)
			break

		case CodeActionType.modalOpenEmbedFieldTree:
			result = await sm.app.addTreeEmbedFieldModal(sm, token as TokenAppModalEmbedField)
			if (result.error) return result
			await userActionStateChangeTab(sm, parms)
			break

		case CodeActionType.modalOpenDate:
			result = await sm.openModalDate(token as TokenAppModalDate)
			if (result.error) return result
			break

		case CodeActionType.modalOpenSelect:
			result = await sm.openModalSelect(token as TokenAppModalSelect)
			if (result.error) return result
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
	return new MethodResult()
}
