import { State } from '$comps/app/types.appState.svelte'
import { TokenAppStateTriggerAction } from '$utils/types.token'
import { CodeActionType, MethodResult } from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/actions/actionsClassUtils.ts'

export default async function action(
	sm: State,
	parms: TokenAppStateTriggerAction
): Promise<MethodResult> {
	const actionType = parms.codeAction.actionType
	switch (actionType) {
		case CodeActionType.none:
			break

		default:
			return new MethodResult({
				error: {
					file: FILENAME,
					function: 'action',
					msg: `No case defined for actionType: ${actionType}`
				}
			})
	}
	return new MethodResult()
}
