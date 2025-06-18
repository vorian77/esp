import { strRequired } from '$utils/utils.model'
import { arrayOfClass, getArray } from '$utils/utils.array'
import { valueOrDefault, memberOfEnum } from '$utils/utils.model'
import exp from 'constants'
import type { Method } from 'axios'

const FILENAME = '/$utils/utils.sys.ts'

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

	doExpr = 'doExpr',

	doListDetailEdit = 'doListDetailEdit',
	doListDetailNew = 'doListDetailNew',
	doListDownload = 'doListDownload',
	doListSelfRefresh = 'doListSelfRefresh',
	doListSelfSave = 'doListSelfSave',
	doOpen = 'doOpen',
	doOpenCustom = 'doOpenCustom',
	doSaveCancel = 'doSaveCancel',

	embedShell = 'embedShell',

	// modal
	modalCancel = 'modalCancel',
	modalDone = 'modalDone',
	modalOpenEmbedFieldLevel = 'modalOpenEmbedFieldLevel',
	modalOpenEmbedFieldTree = 'modalOpenEmbedFieldTree',
	modalOpenSelect = 'modalOpenSelect',

	// nav
	navDestination = 'navDestination',
	navNode = 'navNode',
	navPage = 'navPage',
	navRow = 'navRow',
	navSelectList = 'navNodeSelect',
	navTab = 'navTab',
	openDataObjDrawer = 'openDataObjDrawer',
	openDataObjModal = 'openDataObjModal',
	openNode = 'openNode',

	// utils

	// shared
	none = 'none', // nav, utils,
	page = 'page' // auth, nav,
}

export function compareValues(
	value1: any,
	value2: any,
	codeDataType: PropDataType,
	codeOp: PropOp
): MethodResult {
	let expr = `${getValueType(value1, codeDataType)} ${getOp(codeOp)} ${getValueType(value2, codeDataType)}`
	let evalResult = eval(expr)
	return new MethodResult(evalResult)

	function getOp(op: PropOp) {
		switch (op) {
			case PropOp.greaterThan:
				return '>'
			case PropOp.greaterThanOrEqual:
				return '>='
			case PropOp.lessThan:
				return '<'
			case PropOp.lessThanOrEqual:
				return '<='
			case PropOp.notNull:
				return '!== null'
			case PropOp.null:
				return '=== null'
			case PropOp.equal:
				return '==='
			case PropOp.notEqual:
				return '!=='
		}
	}
	function getValueType(value: any, codeDataType: PropDataType): string {
		if (value === null || value === undefined) return value
		switch (codeDataType) {
			case PropDataType.str:
				return `'${value}'`
			default:
				return value
		}
	}
}

export function compareValuesRecord(
	record: DataRecord,
	key: string,
	codeDataType: PropDataType,
	codeOp: PropOp,
	value2: any
): MethodResult {
	const value1 = getDataRecordValueKey(record, key)
	return compareValues(value1, value2, codeDataType, codeOp)
}

export enum ContextKey {
	cancelForm = 'cancelForm',
	dataManager = 'dataManager',
	stateManager = 'stateManager'
}

export type DataRecord = Record<string, any>

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

export function getDataRecordKey(record: DataRecord, key: string) {
	for (const [k, v] of Object.entries(record)) {
		if (k.endsWith(key)) {
			return k
		}
	}
	return undefined
}

export function getDataRecordValueKey(record: DataRecord, key: string) {
	const recordKey = getDataRecordKey(record, key)
	return recordKey ? record[recordKey] : undefined
}
export function getDataRecordValueKeyData(record: DataRecord, key: string) {
	return getValueData(getDataRecordValueKey(record, key))
}
export function getDataRecordValueKeyDisplay(record: DataRecord, key: string) {
	return getValueDisplay(getDataRecordValueKey(record, key))
}

export function getDbExprRaw(exprWith: string | undefined, exprCustom: string | undefined) {
	exprWith = exprWith ? exprWith.trim() : ''
	exprWith = exprWith ? 'WITH\n' + exprWith : ''
	exprCustom = exprCustom ? exprCustom.trim() : ''
	return exprWith ? exprWith + ' ' + exprCustom : exprCustom
}

export function getValueData(value: any) {
	if (Array.isArray(value)) {
		let valueReturn: string[] = []
		value.forEach((v) => {
			valueReturn.push(getValueData(v))
		})
		return valueReturn
	} else {
		return isPlainObject(value) ? (Object.hasOwn(value, 'data') ? value.data : value) : value
	}
}

export function getValueDisplay(value: any) {
	if ([null, undefined].includes(value)) return ''
	if (Array.isArray(value)) {
		let valueReturn: string[] = []
		value.forEach((v) => {
			valueReturn.push(getValueDisplay(v))
		})
		return valueReturn
	} else {
		return isPlainObject(value) ? (Object.hasOwn(value, 'display') ? value.display : value) : value
	}
}

export function hashString(idFeature: string | string[]): number {
	idFeature = getArray(idFeature)
	const str = idFeature
		.map((f) => {
			if (!f) {
				return ''
			} else {
				return f.toString().trim()
			}
		})
		.join('|')
	let hash = 0
	for (let i = 0; i < str.length; i++) {
		hash = (hash << 5) - hash + str.charCodeAt(i)
		hash |= 0 // Convert to 32-bit integer
	}
	return hash
}

export const isNumber = (value: any) => {
	return typeof value === 'number' && !isNaN(value)
}

export function isPlainObject(obj: any) {
	if (!obj || typeof obj !== 'object') return false
	if (obj.constructor === Object) return true
	if (Object.getPrototypeOf(obj) === null) return true
	if (Object.getPrototypeOf(obj) === Object.prototype) return true
	return false
}

export function isPlainObjectEmpty(obj: any) {
	return isPlainObject(obj) && Object.keys(obj).length === 0
}

export class MethodResult {
	data: any
	error?: MethodResultError
	success = true
	type = 'object'
	constructor(parms: any = undefined) {
		parms = valueOrDefault(parms, {})

		if (Object.hasOwn(parms, 'success')) {
			this.success = parms.success
		}

		if (Object.hasOwn(parms, 'data') && Object.keys(parms).length === 1) {
			parms = parms.data
		}

		if (Array.isArray(parms)) {
			this.type = 'array'
			this.data = parms
		} else {
			if (Object.hasOwn(parms, 'error')) {
				this.success = false
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
	getResultExprValue() {
		const data = this.getResultExpr()
		return Array.isArray(data) && data.length > 0 ? data[0] : undefined
	}
}

export class MethodResultError {
	_sessionId?: string
	code: string
	file: string
	function: string
	id?: string
	msgSystem: string
	msgUser: string
	status?: number
	constructor(obj: any) {
		const clazz = 'MethodResultError'
		obj = valueOrDefault(obj, {})
		this._sessionId = obj._sessionId
		this.code = obj.code?.toString() || ''
		this.file = strRequired(obj.file, clazz, 'file')
		this.function = strRequired(obj.function, clazz, 'function')
		this.id = obj.id
		this.msgSystem = strRequired(obj.msgSystem || obj.msg || obj.message, clazz, 'msgSystem')
		this.msgUser = strRequired(obj.msgUser || obj.msg || 'unspecified', clazz, 'msgUser')
		this.status = obj.status
	}
}

export enum NodeObjComponent {
	Home = 'Home',
	FormList = 'FormList',
	FormDetail = 'FormDetail',
	FormDetailRepConfig = 'FormDetailRepConfig',
	ProcessStatus = 'ProcessStatus',
	SelectList = 'SelectList',
	Tree = 'Tree'
}

export class ObjAttr {
	codeAttrType: string
	id: string
	name: string
	constructor(rawObjAttr: RawObjAttr) {
		const clazz = 'ObjAttr'
		this.codeAttrType = strRequired(rawObjAttr._codeAttrType, clazz, 'codeAttrType')
		this.id = strRequired(rawObjAttr.id, clazz, 'id')
		this.name = strRequired(rawObjAttr.name, clazz, 'name')
	}
}

export class ObjAttrAccess extends ObjAttr {
	codeAttrTypeAccess: ObjAttrTypeAccess
	constructor(rawObjAttrAccess: RawObjAttrAccess) {
		rawObjAttrAccess = valueOrDefault(rawObjAttrAccess, {})
		const clazz = 'ObjAttrAccess'
		super(rawObjAttrAccess._obj)
		this.codeAttrTypeAccess = memberOfEnum(
			rawObjAttrAccess._codeAttrTypeAccess,
			clazz,
			'codeAttrTypeAccess',
			'ObjAttrAccessType',
			ObjAttrTypeAccess
		)
	}
}

export class ObjAttrAction extends ObjAttr {
	codeAttrTypeAction: string
	constructor(rawObjAttrAction: RawObjAttrAction) {
		rawObjAttrAction = valueOrDefault(rawObjAttrAction, {})
		super(rawObjAttrAction._obj)
		const clazz = 'ObjAttrAction'
		this.codeAttrTypeAction = strRequired(
			rawObjAttrAction._codeAttrTypeAction,
			clazz,
			'codeAttrTypeAction'
		)
	}
}

export class ObjAttrExpr {
	codeAttrTypeAction: string
	expr: string
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'ObjAttrExpr'
		this.codeAttrTypeAction = strRequired(obj._codeAttrTypeAction, clazz, 'codeAttrTypeAction')
		this.expr = strRequired(obj.expr, clazz, 'expr')
	}
}

export enum ObjAttrTypeAccess {
	allow = 'allow',
	deny = 'deny'
}

export class ObjAttrVirtual {
	attrsAccess: ObjAttrAccess[]
	attrsAction: ObjAttrAction[]
	expr: string
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'ObjAttrVirtual'
		this.expr = strRequired(obj.expr, clazz, 'expr')
		this.attrsAccess = arrayOfClass(ObjAttrAccess, obj._attrsAccess)
		this.attrsAction = arrayOfClass(ObjAttrAction, obj._attrsAction)
	}
}

export enum PropDataType {
	bool = 'bool',
	date = 'date',
	datetime = 'datetime',
	file = 'file',
	float64 = 'float64',
	int16 = 'int16',
	int32 = 'int32',
	int64 = 'int64',
	json = 'json',
	link = 'link',
	literal = 'literal',
	none = 'none',
	str = 'str',
	strList = 'strList',
	uuid = 'uuid',
	uuidList = 'uuidList'
}

export enum PropOp {
	any = 'any',
	equal = 'equal',
	greaterThan = 'greaterThan',
	greaterThanOrEqual = 'greaterThanOrEqual',
	lessThan = 'lessThan',
	lessThanOrEqual = 'lessThanOrEqual',
	notEqual = 'notEqual',
	notNull = 'notNull',
	null = 'null'
}

export class RawObjAttr {
	_codeAttrType: string
	id: string
	name: string
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'RawObjAttr'
		this._codeAttrType = strRequired(obj._codeAttrType, clazz, '_codeAttrType')
		this.id = strRequired(obj.id, clazz, 'id')
		this.name = strRequired(obj.name, clazz, 'name')
	}
}
export class RawObjAttrAccess {
	_codeAttrTypeAccess: ObjAttrTypeAccess
	_obj: RawObjAttr
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'RawObjAttrAccess'
		this._codeAttrTypeAccess = memberOfEnum(
			obj._codeAttrTypeAccess,
			clazz,
			'codeAttrAccessType',
			'ObjAttrAccessType',
			ObjAttrTypeAccess
		)
		this._obj = new RawObjAttr(obj._obj)
	}
}

export class RawObjAttrAction {
	_codeAttrTypeAction: string
	_obj: RawObjAttr
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'RawObjAttrAction'
		this._codeAttrTypeAction = strRequired(obj._codeAttrTypeAction, clazz, '_codeAttrTypeAction')
		this._obj = new RawObjAttr(obj._obj)
	}
}

export class RawObjAttrVirtual {
	_attrsAccess: RawObjAttrAccess[]
	_attrsAction: RawObjAttrAction[]
	expr: string
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'ObjAttrVirtual'
		this.expr = strRequired(obj.expr, clazz, 'expr')
		this._attrsAccess = arrayOfClass(RawObjAttrAccess, obj._attrsAccess)
		this._attrsAction = arrayOfClass(RawObjAttrAction, obj._attrsAction)
	}
}

export function setDataRecordValue(record: DataRecord, key: string, value: any) {
	const recordKey = getDataRecordKey(record, key)
	if (recordKey) record[recordKey] = value
	return recordKey
}

export function setDataRecordValuesForSave(record: DataRecord) {
	Object.entries(record).forEach(([key, value]) => {
		const isLink = Object.hasOwn(value, 'data')
		if (isLink) {
			let saveValue = value.data
			if (Array.isArray(saveValue)) {
				saveValue = saveValue.map((v) => {
					return v.data
				})
			}
			record[key] = saveValue
		}
	})
	return record
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
