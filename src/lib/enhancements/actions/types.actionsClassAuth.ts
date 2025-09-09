import { State, StateNavLayout, StateParms } from '$comps/app/types.state.svelte'
import { clientQueryExpr } from '$lib/queryClient/types.queryClient'
import type { DataRecord } from '$utils/types'
import {
	CodeAction,
	CodeActionClass,
	CodeActionType,
	MethodResult,
	recordValueSetForSave,
	required,
	strRequired
} from '$utils/types'
import { TokenApiId, TokenAppStateTriggerAction } from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/actions/types.actionsClassAuth.ts'

export class AuthAction {
	msgFail: string
	constructor(parms: DataRecord) {
		const clazz = 'AuthAction'
		this.msgFail = strRequired(
			parms.msgFail || 'There is a problem with the credentials you entered. Please try again.',
			clazz,
			'msgFail'
		)
	}
	async execute(authProcess: AuthProcess): Promise<MethodResult> {
		return new MethodResult({ success: false })
	}
}

export class AuthActionDB extends AuthAction {
	dbExpr: string
	constructor(parms: DataRecord) {
		const clazz = 'AuthActionDB'
		super(parms)
		this.dbExpr = strRequired(parms.dbExpr, clazz, 'dbExpr')
	}
	async execute(authProcess: AuthProcess): Promise<MethodResult> {
		let resultRecord: any = {}
		const evalExprContext = 'AuthActionDB.execute'

		const result: MethodResult = await clientQueryExpr(evalExprContext, this.dbExpr, {
			record: recordValueSetForSave(authProcess.parms)
		})
		if (result.error) return result

		resultRecord = result.getResultRawListValue()

		if (result.error || !resultRecord) {
			alert(this.msgFail)
			return new MethodResult({
				error: {
					file: FILENAME,
					function: 'AuthActionDB.execute',
					msg: `Could not execute dbExpr`
				}
			})
		}

		authProcess.parmsUpdate({ ...resultRecord })
		return new MethodResult()
	}
}

export class AuthActionNodeObj extends AuthAction {
	nodeObjName: string
	constructor(parms: DataRecord) {
		const clazz = 'AuthActionNodeObj'
		super(parms)
		this.nodeObjName = strRequired(parms.nodeObjName, clazz, 'nodeObjName')
	}
	async execute(authProcess: AuthProcess): Promise<MethodResult> {
		const sm = authProcess.getState()
		return await sm.triggerAction(
			new TokenAppStateTriggerAction({
				codeAction: CodeAction.init(
					CodeActionClass.ct_sys_code_action_class_nav,
					CodeActionType.openNodeFreeApp
				),
				data: { token: new TokenApiId(this.nodeObjName) },
				stateParms: new StateParms({ navLayout: StateNavLayout.layoutContent })
			})
		)
	}
}

export class AuthActionLogic extends AuthAction {
	logic: Function
	constructor(parms: DataRecord) {
		const clazz = 'AuthActionLogic'
		super(parms)
		this.logic = required(parms.logic, clazz, 'func')
	}
	async execute(authProcess: AuthProcess): Promise<MethodResult> {
		return await this.logic(authProcess, this)
	}
}

export class AuthProcess {
	actions: AuthAction[] = []
	parms: DataRecord = {}
	sm?: State
	constructor() {}
	addAction(actionClass: any, parms: DataRecord) {
		this.actions.push(new actionClass(parms))
	}
	async execute(): Promise<MethodResult> {
		while (this.actions.length > 0) {
			const action = this.actions.shift()
			if (!action) return new MethodResult()
			let result: MethodResult = await action.execute(this)
			if (result.error) return result
		}
		return new MethodResult()
	}

	getState() {
		if (this.sm) {
			return this.sm
		} else {
			error(500, {
				file: FILENAME,
				function: 'AuthProcess.getState',
				msg: `state manager not yet set`
			})
		}
	}
	parmGet(key: AuthProcessParm) {
		return this.parms[key]
	}
	parmSet(key: AuthProcessParm, value: any) {
		this.parms[key] = value
	}
	parmGetRequired(key: AuthProcessParm) {
		return required(this.parmGet(key), `AuthProcess.parmGetRequired: ${key}`, key)
	}
	parmsHas(key: AuthProcessParm) {
		return Object.hasOwn(this.parms, key)
	}
	parmsUpdate(data: DataRecord) {
		this.parms = { ...this.parms, ...data }
	}
	reset(sm: State) {
		this.sm = sm
		this.actions = []
	}
}

export enum AuthProcessParm {
	isNew = 'isNew',
	name = 'name',
	securityCodeSystem = 'securityCodeSystem',
	securityCodeUser = 'securityCodeUser',
	userId = 'userId'
}
