import { State } from '$comps/app/types.appState.svelte'
import { arrayOfClass } from '$utils/utils.array'
import { memberOfEnum, memberOfEnumIfExists, strRequired, valueOrDefault } from '$utils/utils.model'
import {
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
	TokenAppStateTriggerAction
} from '$utils/types.token'
import { qrfFileStorage } from '$enhance/queryRider/qrfFileStorage'
import { qrfUserUpdate } from '$enhance/queryRider/qrfUserUpdate'
import { error } from '@sveltejs/kit'
import type { is } from '$db/gel/edgeql-js'

const FILENAME = '/$lib/queryClient/queryRider.ts'

export class QueryRider {
	codeFunction?: QueryRiderFunction
	codeQueryType: TokenApiQueryType
	codeTriggerTiming: QueryRiderTriggerTiming
	codeType: QueryRiderType
	codeUserDestination?: QueryRiderDestination
	codeUserMsgDelivery?: QueryRiderMsgDelivery
	expr?: string
	funct?: Function
	functionParmValue?: string
	userMsg?: string
	constructor(obj: QueryRiderRaw) {
		const clazz = 'QueryRider'
		obj = valueOrDefault(obj, {})
		this.codeFunction = memberOfEnumIfExists(
			obj._codeFunction,
			'codeFunction',
			clazz,
			'DataObjQueryRiderFunction',
			QueryRiderFunction
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
			'DataObjQueryRiderTriggerTiming',
			QueryRiderTriggerTiming
		)
		this.codeType = memberOfEnum(
			obj._codeType,
			clazz,
			'codeType',
			'DataObjQueryRiderType',
			QueryRiderType
		)
		this.codeUserDestination = memberOfEnumIfExists(
			obj._codeUserDestination,
			'codeUserDestination',
			clazz,
			'DataObjQueryRiderDestination',
			QueryRiderDestination
		)
		this.codeUserMsgDelivery = memberOfEnumIfExists(
			obj._codeUserMsgDelivery,
			'codeUserMsgDelivery',
			clazz,
			'DataObjQueryRiderMsgDelivery',
			QueryRiderMsgDelivery
		)
		this.expr = obj.expr
		this.functionParmValue = obj.functionParmValue

		let result: MethodResult = this.getFunction(this.codeFunction)
		if (result.error) {
			error(500, {
				file: FILENAME,
				function: 'constructor',
				msg: result?.error?.msgUser
			})
		}
		this.funct = result.data
		this.userMsg = obj.userMsg
	}

	async executeDestination(sm: State): Promise<MethodResult> {
		if (this.codeUserDestination) {
			switch (this.codeUserDestination) {
				case QueryRiderDestination.back:
					return await sm.triggerAction(
						new TokenAppStateTriggerAction({
							codeAction: CodeAction.init(
								CodeActionClass.ct_sys_code_action_class_nav,
								CodeActionType.navBack
							)
						})
					)
				case QueryRiderDestination.home:
					return await sm.triggerAction(
						new TokenAppStateTriggerAction({
							codeAction: CodeAction.init(
								CodeActionClass.ct_sys_code_action_class_nav,
								CodeActionType.navHome
							)
						})
					)
				default:
					return new MethodResult({
						success: false,
						error: {
							file: FILENAME,
							function: 'DataObjQueryRider.executeDestination',
							msg: `No case defined for rider.codeUserDestination: ${this.codeUserDestination}`
						}
					})
			}
		}
		return new MethodResult()
	}

	async executeFunction(sm: State, queryData: TokenApiQueryData): Promise<MethodResult> {
		return this.funct ? await this.funct(sm, this, queryData.dataTab) : new MethodResult(queryData)
	}

	executeMsg(sm: State): MethodResult {
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
						success: false,
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

	getFunction(codeFunction: QueryRiderFunction | undefined): MethodResult {
		if (!codeFunction) return new MethodResult({ success: false })
		switch (codeFunction) {
			case QueryRiderFunction.qrfFileStorage:
				return new MethodResult(qrfFileStorage)

			case QueryRiderFunction.qrfUserUpdate:
				return new MethodResult(qrfUserUpdate)

			default:
				return new MethodResult({
					success: false,
					error: {
						file: FILENAME,
						function: 'DataObjQueryRider.getFunction',
						msg: `No case defined for codeFunction: ${codeFunction}`
					}
				})
		}
	}
}

export class QueryRiderRaw {
	_codeFunction?: string
	_codeQueryType: string
	_codeTriggerTiming: string
	_codeType: string
	_codeUserDestination?: string
	_codeUserMsgDelivery?: string
	expr?: string
	functionParmValue?: string
	userMsg?: string
	constructor(obj: any) {
		const clazz = 'QueryRiderRaw'
		obj = valueOrDefault(obj, {})
		this._codeFunction = obj._codeFunction
		this._codeQueryType = strRequired(obj._codeQueryType, clazz, '_codeQueryType')
		this._codeTriggerTiming = strRequired(obj._codeTriggerTiming, clazz, '_codeTriggerTiming')
		this._codeType = strRequired(obj._codeType, clazz, '_codeType')
		this._codeUserDestination = obj._codeUserDestination
		this._codeUserMsgDelivery = obj._codeUserMsgDelivery
		this.expr = obj.expr
		this.functionParmValue = obj.functionParmValue
		this.userMsg = obj.userMsg
	}
}

export class QueryRiders {
	riders: QueryRider[]
	constructor(rawQueryRiders: QueryRiderRaw[]) {
		this.riders = arrayOfClass(QueryRider, rawQueryRiders)
	}
	async exe(
		isClient: boolean,
		queryTiming: QueryRiderTriggerTiming,
		queryType: TokenApiQueryType,
		queryData: TokenApiQueryData,
		sm: State | undefined = undefined
	): Promise<MethodResult> {
		for (let i = 0; i < this.riders.length; i++) {
			const rider = this.riders[i]
			if (rider.codeQueryType === queryType && rider.codeTriggerTiming === queryTiming) {
				let result: MethodResult = await this.exeRider(isClient, rider, queryData, sm)
				if (result.error) return result
			}
		}
		return new MethodResult(queryData)
	}
	async exeRider(
		isClient: boolean,
		rider: QueryRider,
		queryData: TokenApiQueryData,
		sm: State | undefined
	): Promise<MethodResult> {
		let result: MethodResult

		if (isClient) {
			if (sm) {
				switch (rider.codeType) {
					case QueryRiderType.appDestination:
						return await rider.executeDestination(sm)

					case QueryRiderType.customFunction:
						result = await rider.executeFunction(sm, queryData)
						if (result.error) return result
						queryData.dataTab = result.data
						break

					case QueryRiderType.userMsg:
						result = rider.executeMsg(sm)
						if (result.error) return result
						break
				}
				return new MethodResult(queryData)
			} else {
				return new MethodResult({
					success: false,
					error: {
						file: FILENAME,
						function: 'QueryRidersClient.exeRider',
						msg: `State manager not defined for client.rider.codeType: ${rider.codeType}`
					}
				})
			}
		} else {
			switch (rider.codeType) {
				case QueryRiderType.dbExpr:
					debug('Server.QueryRiderType.dbExpr', 'temp.TBD', rider.expr)
					// executed here
					// this.addScriptNew(
					// 	query,
					// 	TokenApiQueryType.none,
					// 	queryData,
					// 	ScriptExePost.none,
					// 	[],
					// 	rider.expr
					// )
					break
			}
			return new MethodResult(queryData)
		}
	}
}

export enum QueryRiderDestination {
	back = 'back',
	home = 'home'
}
export enum QueryRiderFunction {
	qrfFileStorage = 'qrfFileStorage',
	qrfUserUpdate = 'qrfUserUpdate'
}
export enum QueryRiderMsgDelivery {
	alert = 'alert',
	toast = 'toast'
}
export enum QueryRiderTriggerTiming {
	post = 'post',
	pre = 'pre'
}
export enum QueryRiderType {
	appDestination = 'appDestination',
	customFunction = 'customFunction',
	dbExpr = 'dbExpr',
	userMsg = 'userMsg'
}
