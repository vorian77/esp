import { State } from '$comps/app/types.appState.svelte'
import { arrayOfClass } from '$utils/utils.array'
import { memberOfEnum, memberOfEnumIfExists, strRequired, valueOrDefault } from '$utils/utils.model'
import {
	classOptional,
	CodeAction,
	CodeActionClass,
	CodeActionType,
	debug,
	MethodResult,
	ToastType
} from '$utils/types'
import {
	TokenApiQueryData,
	TokenApiQueryType,
	TokenAppNav,
	TokenAppStateTriggerAction
} from '$utils/types.token'
import { qrfFileStorage } from '$enhance/queryRiderFunction/qrfFileStorage'
import { qrfUserUpdate } from '$enhance/queryRiderFunction/qrfUserUpdate'
import { error } from '@sveltejs/kit'

const FILENAME = '/$lib/queryClient/types.queryRiderClient.ts'

export class QueryRider {
	codeQueryAction: QueryRiderAction
	codeQueryPlatform: QueryRiderPlatform
	codeQueryType: TokenApiQueryType
	codeTriggerTiming: QueryRiderTriggerTiming
	parmValueStr?: string
	constructor(obj: QueryRiderRaw) {
		const clazz = 'QueryRider'
		obj = valueOrDefault(obj, {})
		this.codeQueryAction = memberOfEnum(
			obj._codeQueryAction,
			clazz,
			'codeQueryAction',
			'QueryRiderAction',
			QueryRiderAction
		)
		this.codeQueryPlatform = memberOfEnumIfExists(
			obj._codeQueryPlatform,
			'codeQueryPlatform',
			clazz,
			'QueryRiderPlatform',
			QueryRiderPlatform
		)
		this.codeQueryType = memberOfEnum(
			obj._codeQueryType,
			clazz,
			'codeQueryType',
			'TokenApiQueryType',
			TokenApiQueryType
		)
		this.codeTriggerTiming = memberOfEnum(
			obj._codeTriggerTiming,
			clazz,
			'codeTriggerTiming',
			'QueryRiderTriggerTiming',
			QueryRiderTriggerTiming
		)
		this.parmValueStr = obj.parmValueStr
	}
	async exe(queryData: TokenApiQueryData, sm: State | undefined): Promise<MethodResult> {
		return new MethodResult()
	}
}

export class QueryRiderClient extends QueryRider {
	codeQueryFunction?: QueryRiderFunction
	codeUserMsgDelivery?: QueryRiderMsgDelivery
	funct?: Function
	navDestination?: TokenAppNav
	userMsg?: string
	constructor(obj: QueryRiderRaw) {
		const clazz = 'QueryRider'
		obj = valueOrDefault(obj, {})
		super(obj)
		this.codeQueryFunction = memberOfEnumIfExists(
			obj._codeQueryFunction,
			'codeQueryFunction',
			clazz,
			'QueryRiderFunction',
			QueryRiderFunction
		)
		this.codeUserMsgDelivery = memberOfEnumIfExists(
			obj._codeUserMsgDelivery,
			'codeUserMsgDelivery',
			clazz,
			'QueryRiderMsgDelivery',
			QueryRiderMsgDelivery
		)
		this.navDestination = classOptional(TokenAppNav, obj._navDestination)
		this.userMsg = obj.userMsg

		let result: MethodResult = this.getFunction(this.codeQueryFunction)
		if (result.error) {
			error(500, {
				file: FILENAME,
				function: 'constructor',
				msg: result?.error?.msgUser
			})
		}
		this.funct = result.data
	}

	async exe(queryData: TokenApiQueryData, sm: State | undefined): Promise<MethodResult> {
		let result: MethodResult
		if (sm) {
			switch (this.codeQueryAction) {
				case QueryRiderAction.appDestination:
					return await this.exeDestination(sm)

				case QueryRiderAction.customFunction:
					result = await this.exeFunction(sm, queryData)
					if (result.error) return result
					queryData = result.data
					break

				case QueryRiderAction.userMsg:
					result = this.exeMsg(sm)
					if (result.error) return result
					break

				default:
					return new MethodResult({
						error: {
							file: FILENAME,
							function: 'QueryRiderClient.exe',
							msg: `No case defined for codeQueryAction: ${this.codeQueryAction}`
						}
					})
			}
			return new MethodResult(queryData)
		} else {
			return new MethodResult({
				error: {
					file: FILENAME,
					function: 'QueryRiderClient.exe',
					msg: `State manager not defined for codeQueryAction: ${this.codeQueryAction}`
				}
			})
		}
	}

	async exeDestination(sm: State): Promise<MethodResult> {
		if (this.navDestination) {
			return await sm.triggerAction(
				new TokenAppStateTriggerAction({
					codeAction: CodeAction.init(
						CodeActionClass.ct_sys_code_action_class_nav,
						CodeActionType.navDestination
					),
					data: { token: this.navDestination }
				})
			)
		}
		return new MethodResult()
	}

	async exeFunction(sm: State, queryData: TokenApiQueryData): Promise<MethodResult> {
		return this.funct ? await this.funct(sm, this, queryData) : new MethodResult(queryData)
	}

	exeMsg(sm: State): MethodResult {
		if (this.userMsg && this.codeUserMsgDelivery) {
			switch (this.codeUserMsgDelivery) {
				case QueryRiderMsgDelivery.alert:
					alert(this.userMsg)
					break
				case QueryRiderMsgDelivery.toast:
					sm.openToast(ToastType.success, this.userMsg)
					break
				default:
					return new MethodResult({
						error: {
							file: FILENAME,
							function: 'DataObjQueryRider.executeMsg',
							msg: `No case defined for rider.codeUserMsgDelivery: ${this.codeUserMsgDelivery}`
						}
					})
			}
		}
		return new MethodResult()
	}

	getFunction(codeQueryFunction: QueryRiderFunction | undefined): MethodResult {
		if (!codeQueryFunction) return new MethodResult({ success: false })
		switch (codeQueryFunction) {
			case QueryRiderFunction.qrfFileStorage:
				return new MethodResult(qrfFileStorage)

			case QueryRiderFunction.qrfUserUpdate:
				return new MethodResult(qrfUserUpdate)

			default:
				return new MethodResult({
					error: {
						file: FILENAME,
						function: 'DataObjQueryRider.getFunction',
						msg: `No case defined for codeQueryFunction: ${codeQueryFunction}`
					}
				})
		}
	}
}

export class QueryRiderRaw {
	_codeQueryAction: string
	_codeQueryFunction?: string
	_codeQueryPlatform: string
	_codeQueryType: string
	_codeTriggerTiming: string
	_codeUserMsgDelivery?: string
	_navDestination?: any
	expr?: string
	parmValueStr?: string
	userMsg?: string
	constructor(obj: any) {
		const clazz = 'QueryRiderRaw'
		obj = valueOrDefault(obj, {})
		this._codeQueryAction = strRequired(obj._codeQueryAction, clazz, '_codeQueryAction')
		this._codeQueryFunction = obj._codeQueryFunction
		this._codeQueryPlatform = strRequired(obj._codeQueryPlatform, clazz, '_codeQueryPlatform')
		this._codeQueryType = strRequired(obj._codeQueryType, clazz, '_codeQueryType')
		this._codeTriggerTiming = strRequired(obj._codeTriggerTiming, clazz, '_codeTriggerTiming')
		this._codeUserMsgDelivery = obj._codeUserMsgDelivery
		this._navDestination = obj._navDestination
		this.expr = obj.expr
		this.parmValueStr = obj.parmValueStr
		this.userMsg = obj.userMsg
		debug('QueryRiderRaw', 'constructor.this', this)
	}
}

export class QueryRiders {
	riders: QueryRider[]
	constructor(QueryRiderClass: any, rawQueryRiders: QueryRiderRaw[]) {
		this.riders = arrayOfClass(QueryRiderClass, rawQueryRiders)
	}
	async exe(
		queryTiming: QueryRiderTriggerTiming,
		queryType: TokenApiQueryType,
		queryData: TokenApiQueryData,
		sm: State | undefined = undefined
	): Promise<MethodResult> {
		for (let i = 0; i < this.riders.length; i++) {
			const rider = this.riders[i]
			if (rider.codeQueryType === queryType && rider.codeTriggerTiming === queryTiming) {
				let result: MethodResult = await rider.exe(queryData, sm)
				if (result.error) return result
			}
		}
		return new MethodResult(queryData)
	}
}

export enum QueryRiderAction {
	appDestination = 'appDestination',
	customFunction = 'customFunction',
	dbExpr = 'dbExpr',
	userMsg = 'userMsg'
}
export enum QueryRiderFunction {
	qrfFileStorage = 'qrfFileStorage',
	qrfUserUpdate = 'qrfUserUpdate'
}
export enum QueryRiderMsgDelivery {
	alert = 'alert',
	toast = 'toast'
}
export enum QueryRiderPlatform {
	client = 'client',
	server = 'server'
}
export enum QueryRiderTriggerTiming {
	post = 'post',
	pre = 'pre'
}
