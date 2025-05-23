import {
	booleanOrFalse,
	arrayOfClass,
	memberOfEnum,
	memberOfEnumOrDefault,
	memberOfEnumList,
	MethodResult,
	strOptional,
	strRequired,
	valueOrDefault
} from '$utils/utils'
import { DataObjData } from '$utils/types'

const FILENAME = '$comps/form/types.source.ts'

export class FormSource {
	processURL: string
	actionsMap: Record<FormSourceDBAction, number> = {
		delete: -1,
		insert: -1,
		select: -1,
		update: -1,
		upsert: -1
	}
	actions: Array<FormSourceActionAPI | FormSourceActionDirect> = []

	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.processURL = valueOrDefault(obj.processURL, '/api/form')

		// apis
		if (obj.apis) {
			this.actions = arrayOfClass(FormSourceActionAPI, obj.apis)
			// this.actions.forEach((a, i) => {
			// 	this.actionsMap[a.dbAction] = i
			// })
		}

		// db
		if (obj.directs) {
			const directs = arrayOfClass(FormSourceActionDirect, obj.directs)
			directs.forEach((d) => {
				const i = this.actions.push(d)
				// d.dbActions.forEach((action) => {
				// 	this.actionsMap[action] = i - 1
				// })
			})
		}
	}
}

export class FormSourceAction {
	target: FormSourceTarget
	type: FormSourceActionType
	items: Array<FormSourceItem>
	msgSuccess?: string
	msgFail?: string

	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.target = memberOfEnum(
			obj.target,
			'FormSourceAction',
			'target',
			'FormSourceTarget',
			FormSourceTarget
		)
		this.type = this.type = memberOfEnum(
			obj.type,
			'FormSourceAction',
			'type',
			'FormSourceActionType',
			FormSourceActionType
		)
		this.items = arrayOfClass(FormSourceItem, obj.items)
		this.msgSuccess = strOptional(obj.msgSuccess, 'FormSourceAction', 'msgSuccess')
		this.msgFail = strOptional(obj.msgFail, 'FormSourceAction', 'msgFail')
	}
}

export class FormSourceActionAPI extends FormSourceAction implements FormSourceAction {
	method: HTMLMETHOD
	url: string
	dbAction: FormSourceDBAction
	constructor(obj: any) {
		super(obj)
		obj = valueOrDefault(obj, {})
		this.method = memberOfEnum(
			obj.method,
			'FormSourceActionAPI',
			'method',
			'HTMLMETHOD',
			HTMLMETHOD
		)
		this.url = strRequired(obj.url, 'FormSourceActionAPI', 'url')
		this.dbAction = memberOfEnum(
			obj.dbAction,
			'FormSourceActionAPI',
			'dbAction',
			'FormSourceDBAction',
			FormSourceDBAction
		)
	}
}

export class FormSourceActionDirect extends FormSourceAction implements FormSourceAction {
	dbActions: FormSourceDBAction[]
	statement?: string
	singleTable?: string
	constructor(obj: any) {
		const clazz = 'FormSourceActionDirect'
		super(obj)
		obj = valueOrDefault(obj, {})
		this.dbActions = memberOfEnumList(
			clazz,
			'dbActions',
			obj.dbActions,
			'FormSourceDBAction',
			FormSourceDBAction
		)
		this.statement = strOptional(obj.statement, clazz, 'statement')
		this.singleTable = strOptional(obj.singleTable, clazz, 'singleTable')
	}
}

export class FormSourceItem {
	dbName: string
	source: FormSourceItemSource
	sourceKey: string
	dbDataType: FormSourceItemDataType
	dbIdentity: boolean
	dbAllowNull: boolean
	dbDelete: boolean
	dbInsert: boolean
	dbSelect: boolean
	dbUpdate: boolean
	dbWhere: boolean
	apiArg: boolean
	fieldName?: string
	value?: any

	constructor(obj: any) {
		const clazz = 'FormSourceItem'
		obj = valueOrDefault(obj, {})
		this.dbName = strRequired(obj.dbName, 'FormSourceItem', 'dbName')
		this.source = memberOfEnumOrDefault(
			obj.source,
			clazz,
			'source',
			'FormSourceItemSource',
			FormSourceItemSource,
			FormSourceItemSource.none
		)
		this.sourceKey = this.source ? valueOrDefault(obj.sourceKey, this.dbName) : ''
		this.dbDataType = memberOfEnumOrDefault(
			obj.dbDataType,
			clazz,
			'dbDataType',
			'FormSourceItemDataType',
			FormSourceItemDataType,
			''
		)
		this.dbIdentity = booleanOrFalse(obj.dbIdentity)
		this.dbAllowNull = booleanOrFalse(obj.dbAllowNull)
		this.dbDelete = booleanOrFalse(obj.dbDelete)
		this.dbInsert = booleanOrFalse(obj.dbInsert)
		this.dbSelect = booleanOrFalse(obj.dbSelect)
		this.dbUpdate = booleanOrFalse(obj.dbUpdate)
		this.dbWhere = booleanOrFalse(obj.dbWhere)
		this.apiArg = booleanOrFalse(obj.apiArg)
		this.fieldName = valueOrDefault(obj.fieldName, '')
	}
}

export function getServerResponse(parms: any) {
	return new Response(JSON.stringify(parms))
}
export function getServerResponseMethod(parms: any) {
	return getServerResponse(new MethodResult(parms))
}

export enum FormSourceDBAction {
	delete = 'delete',
	insert = 'insert',
	select = 'select',
	update = 'update',
	upsert = 'upsert'
}
export enum FormSourceItemDataType {
	date = 'date',
	datetime = 'datetime',
	dec = 'dec',
	int = 'int',
	raw = 'raw',
	string = 'string',
	subquery = 'subquery'
}
export enum FormSourceItemSource {
	env = 'env',
	data = 'data',
	form = 'form',
	literal = 'literal',
	none = 'none',
	system = 'system'
}
export enum FormSourceTarget {
	esp = 'esp'
}
export enum FormSourceActionType {
	api = 'api',
	direct = 'direct'
}
export enum HTMLMETHOD {
	DELETE = 'DELETE',
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT'
}
