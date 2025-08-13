import { strRequired } from '$utils/utils.model'
import { arrayOfClass, getArray } from '$utils/utils.array'
import { valueOrDefault, memberOfEnum } from '$utils/utils.model'

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

	doListDelete = 'doListDelete',
	doListDetailEdit = 'doListDetailEdit',
	doListDetailNew = 'doListDetailNew',
	doListDownload = 'doListDownload',
	doListSelfRefresh = 'doListSelfRefresh',
	doListSelfSave = 'doListSelfSave',
	doSaveCancel = 'doSaveCancel',

	embedShell = 'embedShell',

	// modal
	modalCancel = 'modalCancel',
	modalDone = 'modalDone',
	modalOpenEmbedFieldLevel = 'modalOpenEmbedFieldLevel',
	modalOpenEmbedFieldTree = 'modalOpenEmbedFieldTree',
	modalOpenDate = 'modalOpenDate',
	modalOpenSelect = 'modalOpenSelect',

	// nav
	navDestination = 'navDestination',
	navNode = 'navNode',
	navPage = 'navPage',
	navRow = 'navRow',
	navSelectList = 'navNodeSelect',
	navTab = 'navTab',
	openDashboard = 'openDashboard',

	openNode = 'openNode',
	openNodeFreeApp = 'openNodeFreeApp',
	openNodeFreeAppCustom = 'openNodeFreeAppCustom',
	openNodeFreeDrawer = 'openNodeFreeDrawer',
	openNodeFreeModal = 'openNodeFreeModal',

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
	const value1 = recordValueGet(record, key)
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

export enum EvalExprCustomComposite {
	evalCustomCompositeObjAttrMulti = `evalCustomCompositeObjAttrMulti`,
	evalCustomCompositeObjAttrSingle = `evalCustomCompositeObjAttrSingle`
}

export enum EvalExprCustomPreset {
	evalCustomPresetEligibility = `evalCustomPresetEligibility`
}

// <todo> 241217 - placing this in FieldEmbed causes a circular reference
export enum FieldEmbedListType {
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
	return !isNaN(value) && typeof value === 'number'
}

export const isString = (value: any) => {
	return typeof value === 'string'
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
	getResultRawList() {
		return this.data.rawDataList ? this.data.rawDataList : undefined
	}
	getResultRawListValue() {
		const data = this.getResultRawList()
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
	FormList = 'FormList',
	FormDetail = 'FormDetail',
	FormDetailRepConfig = 'FormDetailRepConfig',
	ProcessStatus = 'ProcessStatus'
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
	false = 'false',
	greaterThan = 'greaterThan',
	greaterThanOrEqual = 'greaterThanOrEqual',
	lessThan = 'lessThan',
	lessThanOrEqual = 'lessThanOrEqual',
	notEqual = 'notEqual',
	notNull = 'notNull',
	null = 'null',
	true = 'true'
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

export function recordHasKey(record: DataRecord, key: string): boolean {
	return Object.hasOwn(record, key)
}

export function recordKeyGet(record: DataRecord, key: string) {
	for (const [k, v] of Object.entries(record)) {
		if (k.endsWith(key)) {
			return k
		}
	}
	return undefined
}

export function recordValueGet(record: DataRecord, key: string): any {
	const keyItems = key.split('.')
	let current = record

	for (const keyItem of keyItems) {
		const foundKey = recordKeyGet(current, keyItem)
		if (!foundKey) return undefined
		current = current[foundKey]
	}

	return current
}

export function recordValueGetData(record: DataRecord, key: string) {
	return getValueData(recordValueGet(record, key))
}
export function recordValueGetDisplay(record: DataRecord, key: string) {
	return getValueDisplay(recordValueGet(record, key))
}

export function recordValueSet(record: DataRecord, key: string, value: any) {
	const newRecord = JSON.parse(JSON.stringify(record))

	const keyItems = key.split('.')
	let current = newRecord

	// Navigate/create path to the parent of final key
	for (let i = 0; i < keyItems.length - 1; i++) {
		const keyItem = keyItems[i]
		const existingKey = recordKeyGet(current, keyItem)

		if (existingKey) {
			// Use existing path
			if (typeof current[existingKey] !== 'object' || current[existingKey] === null) {
				current[existingKey] = {} // Replace non-object values
			}
			current = current[existingKey]
		} else {
			// Create new path with exact key name
			current[keyItem] = {}
			current = current[keyItem]
		}
	}

	// Set the final value
	const finalKey = keyItems[keyItems.length - 1]
	const existingFinalKey = recordKeyGet(current, finalKey)

	if (existingFinalKey) {
		current[existingFinalKey] = value
	} else {
		current[finalKey] = value
	}
	return newRecord
}

export function recordValueSetForSave(record: DataRecord) {
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
	info = 'info',
	success = 'success',
	warning = 'warning'
}

export function valueHasChanged(vSource: any, vCurrent: any): boolean {
	// Handle null/undefined cases first
	if (isNoValue(vSource) && isNoValue(vCurrent)) return false
	if (isNoValue(vSource) || isNoValue(vCurrent)) return true

	// Different types are always different
	if (typeof vSource !== typeof vCurrent) return true

	// Handle primitives
	if (typeof vSource !== 'object' || vSource === null || vCurrent === null) {
		return vSource !== vCurrent
	}

	// Handle arrays
	if (Array.isArray(vSource)) {
		if (!Array.isArray(vCurrent)) return true
		if (vSource.length !== vCurrent.length) return true
		return vSource.some((item, index) => valueHasChanged(item, vCurrent[index]))
	}

	// Handle dates
	if (vSource instanceof Date) {
		if (!(vCurrent instanceof Date)) return true
		return vSource.getTime() !== vCurrent.getTime()
	}

	// Handle RegExp
	if (vSource instanceof RegExp) {
		if (!(vCurrent instanceof RegExp)) return true
		return vSource.toString() !== vCurrent.toString()
	}

	// Handle plain objects
	if (vSource.constructor === Object && vCurrent.constructor === Object) {
		const sourceKeys = Object.keys(vSource)
		const currentKeys = Object.keys(vCurrent)

		// Different number of keys
		if (sourceKeys.length !== currentKeys.length) return true

		// Check if all keys and values match
		return sourceKeys.some((key) => {
			if (!Object.hasOwn(vCurrent, key)) return true
			return valueHasChanged(vSource[key], vCurrent[key])
		})
	}

	// For other object types, use strict equality
	return vSource !== vCurrent
}

function isNoValue(value: any): boolean {
	return (
		value === undefined ||
		value === null ||
		value === '' ||
		(Array.isArray(value) && value.length === 0)
	)
}

// Alternative: More comprehensive deep equality check
export function deepEqual(a: any, b: any): boolean {
	if (a === b) return true

	if (a == null || b == null) return false

	if (typeof a !== typeof b) return false

	if (typeof a !== 'object') return false

	if (Array.isArray(a)) {
		if (!Array.isArray(b) || a.length !== b.length) return false
		return a.every((item, index) => deepEqual(item, b[index]))
	}

	if (a instanceof Date && b instanceof Date) {
		return a.getTime() === b.getTime()
	}

	if (a instanceof RegExp && b instanceof RegExp) {
		return a.toString() === b.toString()
	}

	const keysA = Object.keys(a)
	const keysB = Object.keys(b)

	if (keysA.length !== keysB.length) return false

	return keysA.every((key) => Object.hasOwn(b, key) && deepEqual(a[key], b[key]))
}
