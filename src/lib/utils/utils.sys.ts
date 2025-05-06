import { strRequired } from '$utils/utils.model'
import { apiFetchFunction, ApiFunction } from '$routes/api/api'
import { valueOrDefault, memberOfEnum } from '$utils/utils.model'

const FILENAME = '/$utils/utils.sys.ts'

export class Attr {
	codeAttrType: string
	id: string
	obj: string
	constructor(obj: any) {
		const clazz = 'Attr'
		obj = valueOrDefault(obj, {})
		this.codeAttrType = strRequired(obj._codeAttrType, clazz, 'codeAttrType')
		this.id = strRequired(obj.id, clazz, 'id')
		this.obj = strRequired(obj._obj, clazz, 'obj')
	}
}

export class AttrObjAction {
	codeAttrActionType: string
	id: string
	obj: string
	constructor(obj: any) {
		const clazz = 'AttrObjAction'
		obj = valueOrDefault(obj, {})
		this.codeAttrActionType = strRequired(obj._codeAttrActionType, clazz, 'codeAttrActionType')
		this.id = strRequired(obj.id, clazz, 'id')
		this.obj = strRequired(obj._obj, clazz, 'obj')
	}
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
	static init(actionClass: CodeActionClass, actionType: CodeActionType) {
		return new CodeAction({ _class: actionClass, _type: actionType })
	}
}

export enum CodeActionClass {
	ct_sys_code_action_class_custom = 'ct_sys_code_action_class_custom',
	ct_sys_code_action_class_do = 'ct_sys_code_action_class_do',
	ct_sys_code_action_class_do_auth = 'ct_sys_code_action_class_do_auth',
	ct_sys_code_action_class_modal = 'ct_sys_code_action_class_modal',
	ct_sys_code_action_class_nav = 'ct_sys_code_action_class_nav',
	ct_sys_code_action_class_utils = 'ct_sys_code_action_class_utils'
}

export enum CodeActionType {
	default = 'default',

	// auth
	authOpen = 'authOpen',
	resendCode = 'resendCode',
	setUserId = 'setUserId',
	submit = 'submit',

	// dataObj - custom
	doCustomAIAttdSheetSetAllFullClass = 'doCustomAIAttdSheetSetAllFullClass',
	doCustomAIAttdSheetReset = 'doCustomAIAttdSheetReset',

	doCustomSysMsgRootDetailSave = 'doCustomSysMsgRootDetailSave',
	doCustomSysMsgThreadDetailClose = 'doCustomSysMsgThreadDetailClose',
	doCustomSysMsgThreadDetailReply = 'doCustomSysMsgThreadDetailReply',
	doCustomSysMsgThreadDetailSend = 'doCustomSysMsgThreadDetailSend',
	doCustomSysMsgThreadListClose = 'doCustomSysMsgThreadListClose',
	doCustomSysMsgThreadListForward = 'doCustomSysMsgThreadListForward',
	doCustomSysMsgThreadListReply = 'doCustomSysMsgThreadListReply',

	doDetailMsgSetClosed = 'doDetailMsgSetClosed',
	doDetailMsgSetOpen = 'doDetailMsgSetOpen',

	// dataObj - system
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
	doOpenLink = 'doOpenLink',
	doSaveCancel = 'doSaveCancel',

	embedShell = 'embedShell',

	// modal
	modalCancel = 'modalCancel',
	modalDone = 'modalDone',
	modalOpenEmbedFieldLevel = 'modalOpenEmbedFieldLevel',
	modalOpenEmbedFieldTree = 'modalOpenEmbedFieldTree',
	modalOpenSelect = 'modalOpenSelect',

	// nav
	navBack = 'navBack',
	navCrumbs = 'navCrumbs',
	navHome = 'navHome',
	navPage = 'navPage',
	navRow = 'navRow',
	navTab = 'navTab',
	openDataObjDrawer = 'openDataObjDrawer',
	openDataObjModal = 'openDataObjModal',
	openNode = 'openNode',

	// utils

	// shared
	none = 'none', // nav, utils,
	page = 'page' // auth, nav,
}

export enum ContextKey {
	cancelForm = 'cancelForm',
	dataManager = 'dataManager',
	stateManager = 'stateManager'
}

export async function encrypt(text: string) {
	// let salt = bcrypt.genSaltSync(10)
	// let hash = bcrypt.hashSync(text, salt)
	// return hash
	return text
}

// <todo> 241217 - placing this in FieldEmbed causes a circular reference
export enum FieldEmbedType {
	listConfig = 'listConfig',
	listEdit = 'listEdit',
	listSelect = 'listSelect'
}

export enum FileProcessingMode {
	delete = 'delete',
	none = 'none',
	storage = 'storage',
	upload = 'upload'
}

export class FileStorage {
	downloadUrl: string
	fileName: string
	fileType: string
	key: string
	url: string
	constructor(obj: any) {
		const clazz = 'FileStorage'
		obj = valueOrDefault(obj, {})
		this.downloadUrl = strRequired(obj.downloadUrl, clazz, 'downloadUrl')
		this.fileName = strRequired(obj.fileName, clazz, 'fileName')
		this.fileType = strRequired(obj.fileType, clazz, 'fileType')
		this.key = strRequired(obj.key, clazz, 'key')
		this.url = strRequired(obj.url, clazz, 'url')
	}
}

export function getColor(colorName: string) {
	const colorError = '#ef4444'
	const colorPrimary = '#60a5fa'
	const colorSecondary = '#22c55e'
	const colors = [
		['amber', '#b45309'],
		['defaultBorder', '#e5e7eb'],
		['black', '#000000'],
		['blue', colorPrimary],
		['error', colorError],
		['gray', '#e5e7eb'],
		['green', colorSecondary],
		['orange', '#f97316'],
		['primary', colorPrimary],
		['purple', '#d8b4fe'],
		['red', colorError],
		['secondary', colorSecondary],
		['white', '#FFFFFF'],
		['yellow', '#fde047']
	]
	const idx = colors.findIndex((c) => c[0] === colorName)
	return idx > -1 ? colors[idx][1] : ''
}

export const isNumber = (value: any) => {
	if ([null, undefined, ''].includes(value)) return false
	return typeof value === 'number' || !isNaN(value)
}

export function isObject(obj: any) {
	return typeof obj === 'object' && obj !== null && !Array.isArray(obj)
}

export class MethodResult {
	data: any
	error?: MethodResultError
	type = 'object'
	constructor(parms: any = undefined) {
		parms = valueOrDefault(parms, {})

		if (Object.hasOwn(parms, 'data') && Object.keys(parms).length === 1) {
			parms = parms.data
		}

		if (Array.isArray(parms)) {
			this.type = 'array'
			this.data = parms
		} else {
			if (Object.hasOwn(parms, 'error')) {
				this.error = new MethodResultError(parms.error)
				delete parms.error
			}

			if (Object.hasOwn(parms, 'data') && Object.keys(parms).length === 1) {
				// this.data = { ...parms.data }
				this.data = parms.data
			} else {
				if (typeof parms === 'object' && parms !== null && !Array.isArray(parms)) {
					// this.data = { ...parms }
					this.data = parms
				} else {
					this.data = parms
				}
			}
		}
	}
	getResultExpr() {
		return this.data.rawDataList ? this.data.rawDataList : undefined
	}
}

export class MethodResultError {
	code: string
	file: string
	function: string
	id?: string
	msgSystem: string
	msgUser: string
	status?: number
	userId?: string
	constructor(obj: any) {
		const clazz = 'MethodResultError'
		obj = valueOrDefault(obj, {})
		this.code = obj.code?.toString() || ''
		this.file = strRequired(obj.file, clazz, 'file')
		this.function = strRequired(obj.function, clazz, 'function')
		this.id = obj.id
		this.msgSystem = strRequired(obj.msgSystem || obj.msg || obj.message, clazz, 'msgSystem')
		this.msgUser = strRequired(obj.msgUser || obj.msg || 'unspecified', clazz, 'msgUser')
		this.status = obj.status
		this.userId = obj.userId
	}
}

export enum ToastType {
	error = 'error',
	success = 'success',
	warning = 'warning'
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
