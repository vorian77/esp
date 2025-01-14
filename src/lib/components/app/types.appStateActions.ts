import { State } from '$comps/app/types.appState.svelte'
import { type DataRecord } from '$utils/types'
import { CodeActionClass, CodeActionType } from '$lib/utils/utils.sys'
import fActionsClassDoFieldAuth from '$enhance/actions/actionsClassDoFieldAuth'
import { error } from '@sveltejs/kit'

const FILENAME = '$comps/app/types.appStateActions.ts'

export class FCodeActionState {
	actionClass: CodeActionClass
	actionType: CodeActionType
	data: DataRecord
	constructor(actionClass: CodeActionClass, actionType: CodeActionType, data: DataRecord = {}) {
		this.actionClass = actionClass
		this.actionType = actionType
		this.data = data
	}
}
export class FCodeActionClass {
	sm: State
	actionType: CodeActionType
	data: DataRecord
	constructor(sm: State, actionType: CodeActionType, data: DataRecord = {}) {
		this.sm = sm
		this.actionType = actionType
		this.data = data
	}
}

const map = new Map<string, Function>()

// const keys = Object.keys(CodeActionClass)

for (const key of Object.keys(CodeActionClass)) {
	switch (key) {
		case CodeActionClass.ct_sys_code_action_class_do_embed:
		case CodeActionClass.ct_sys_code_action_class_do_group_item:
		case CodeActionClass.ct_sys_code_action_class_modal:
		case CodeActionClass.ct_sys_code_action_class_nav:
			console.log('no action for:', key)
			break
		case CodeActionClass.ct_sys_code_action_class_do_field_auth:
			// map.set(key, (await import('$enhance/actions/actionsClassDoFieldAuth')).default)
			break
		case CodeActionClass.ct_sys_code_action_class_utils:
			// map.set(key, (await import('$enhance/actions/actionsClassUtils')).default)
			break
		default:
			error(500, {
				file: FILENAME,
				function: 'load action classes',
				message: `No case defined for actionClass: ${key}`
			})
	}
}
console.log(FILENAME + '.map:', map)
export async function fActions(parms: FCodeActionState) {}
