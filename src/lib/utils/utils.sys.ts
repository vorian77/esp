import { State } from '$comps/app/types.appState.svelte'
import { apiFetch, ApiFunction } from '$routes/api/api'
import { TokenApiUserId } from '$utils/types.token'
import { valueOrDefault, memberOfEnum } from '$utils/utils.model'

export async function adminDbReset(sm: State) {
	// <todo> - 240125
	const userId = sm.user!.id
	return await apiFetch(ApiFunction.dbEdgeInit, new TokenApiUserId(userId))
}

export function capitalizeFirstLetter(text: string) {
	return text.charAt(0).toUpperCase() + text.slice(1)
}

export class CodeAction {
	actionClass: CodeActionClass
	actionType: CodeActionType
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'CodeAction'
		this.actionClass = memberOfEnum(
			obj._class,
			clazz,
			'actionClass',
			'CodeActionClass',
			CodeActionClass
		)
		this.actionType = memberOfEnum(obj._type, clazz, 'actionType', 'CodeActionType', CodeActionType)
	}
}

export enum CodeActionType {
	// auth
	page = 'page',
	resendCode = 'resendCode',
	submit = 'submit',

	// dataObj - group item
	doDetailDelete = 'doDetailDelete',
	doDetailMigrate = 'doDetailMigrate',
	doDetailNew = 'doDetailNew',
	doDetailProcessExecute = 'doDetailProcessExecute',
	doDetailSave = 'doDetailSave',
	doDetailSaveAs = 'doDetailSaveAs',

	doEmbedListConfigEdit = 'doEmbedListConfigEdit',
	doEmbedListConfigNew = 'doEmbedListConfigNew',
	doEmbedListEditParmValue = 'doEmbedListEditParmValue',
	doEmbedListSelect = 'doEmbedListSelect',

	doListDetailEdit = 'doListDetailEdit',
	doListDetailNew = 'doListDetailNew',
	doListDownload = 'doListDownload',
	doListSelfRefresh = 'doListSelfRefresh',
	doListSelfSave = 'doListSelfSave',

	doOpen = 'doOpen',

	doSaveCancel = 'doSaveCancel',

	embedField = 'embedField',
	embedShell = 'embedShell',

	// modal
	modalCancel = 'modalCancel',
	modalDone = 'modalDone',
	modalEmbed = 'modalEmbed',
	modalSelectOpen = 'modalSelectOpen',
	modalSelectSurface = 'modalSelectSurface',

	// nav
	navBack = 'navBack',
	navCrumbs = 'navCrumbs',
	navMenuOpen = 'navMenuOpen',
	navRow = 'navRow',
	navTab = 'navTab',
	openNode = 'openNode',

	// utils
	dbexpression = 'dbexpression',

	// shared
	none = 'none' // nav, utils
}

export enum CodeActionClass {
	ct_sys_code_action_class_do_embed = 'ct_sys_code_action_class_do_embed',
	ct_sys_code_action_class_do_field_auth = 'ct_sys_code_action_class_do_field_auth',
	ct_sys_code_action_class_do_group_item = 'ct_sys_code_action_class_do_group_item',
	ct_sys_code_action_class_modal = 'ct_sys_code_action_class_modal',
	ct_sys_code_action_class_nav = 'ct_sys_code_action_class_nav',
	ct_sys_code_action_class_utils = 'ct_sys_code_action_class_utils'
}

export enum ContextKey {
	cancelForm = 'cancelForm',
	dashboardRefresh = 'dashboardReset',
	dataManager = 'dataManager',
	stateManager = 'stateManager',
	test = 'test'
}

export async function encrypt(text: string) {
	// let salt = bcrypt.genSaltSync(10)
	// let hash = bcrypt.hashSync(text, salt)
	// return hash
	return text
}

export enum FileProcessingMode {
	delete = 'delete',
	none = 'none',
	storage = 'storage',
	upload = 'upload'
}

export const isNumber = (value: any) => {
	if ([null, undefined, ''].includes(value)) return false
	return typeof value === 'number' || !isNaN(value)
}

export function valueHasChanged(vSource: any, vCurrent: any): boolean {
	if (typeof vSource == 'boolean' || typeof vCurrent === 'boolean') {
		return noVal(vSource) ? true : vSource !== vCurrent
	} else if (noVal(vSource)) {
		return !noVal(vCurrent)
	} else if (noVal(vCurrent)) {
		return !noVal(vSource)
	} else if (Array.isArray(vSource) || Array.isArray(vCurrent)) {
		if (!Array.isArray(vSource) || !Array.isArray(vCurrent)) return true
		return vSource.sort().toString() !== vCurrent.sort().toString()
	} else if (typeof vSource === 'object' || typeof vCurrent === 'object') {
		if (typeof vSource !== 'object' || typeof vCurrent !== 'object') return true
		if (Object.entries(vSource).length !== Object.entries(vCurrent).length) return true
		for (const [key, value] of Object.entries(vSource)) {
			if (!Object.hasOwn(vCurrent, key)) return true
			if (valueHasChanged(value, vCurrent[key])) return true
		}
		return false
	} else {
		return vCurrent.toString() !== vSource.toString()
	}

	function noVal(value: any) {
		return [undefined, null, ''].includes(value) || (Array.isArray(value) && value.length === 0)
	}
}

export enum ToastType {
	error = 'error',
	success = 'success',
	warning = 'warning'
}
