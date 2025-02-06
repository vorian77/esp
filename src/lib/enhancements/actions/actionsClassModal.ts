import { State } from '$comps/app/types.appState.svelte'
import { userActionStateChangeDataObj } from '$comps/other/types.userAction.svelte'
import { TokenAppStateTriggerAction } from '$utils/types.token'
import { CodeActionType } from '$utils/types'
import {
	Token,
	TokenApiQuery,
	TokenAppModalEmbedField,
	TokenAppModalSelect
} from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/actions/actionClassModal.ts'

export default async function action(sm: State, parms: TokenAppStateTriggerAction) {
	const actionType = parms.codeAction.actionType
	const token: Token = parms.data.token

	switch (actionType) {
		case CodeActionType.embedField:
			await sm.app.addLevelEmbedField(sm, token as TokenApiQuery)
			await userActionStateChangeDataObj(sm, parms)
			break

		case CodeActionType.embedShell:
			break

		case CodeActionType.modalEmbed:
			await sm.app.addLevelModalEmbedField(sm, token as TokenAppModalEmbedField)
			await userActionStateChangeDataObj(sm, parms)
			break

		case CodeActionType.modalSelectOpen:
			await sm.openModalSelect(token as TokenAppModalSelect)
			break

		default:
			error(500, {
				file: FILENAME,
				function: 'default',
				message: `No case defined for actionType: ${actionType}`
			})
	}
}
