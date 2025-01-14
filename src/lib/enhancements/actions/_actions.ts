import { CodeActionClass, CodeActionType } from '$lib/utils/utils.sys'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/actions/_actions.ts'

export async function getEnhancement(actionClass: string) {
	switch (actionClass) {
		case CodeActionClass.ct_sys_code_action_class_do_field_auth:
		case 'auth':
			return (await import('$enhance/actions/actionAuth')).default

		case CodeActionClass.ct_sys_code_action_class_utils:
		case 'core':
			return (await import('$enhance/actions/actionCore')).default

		default:
			error(500, {
				file: FILENAME,
				function: 'getEnhancement',
				message: `No case defined for actionClass: ${actionClass}`
			})
	}
}
