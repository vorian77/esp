import { State } from '$comps/app/types.appState.svelte'
import { CodeAction, CodeActionClass, CodeActionType, required, strRequired } from '$utils/types'
import {
	TokenApiQueryData,
	TokenApiQueryType,
	TokenAppDoQuery,
	TokenAppStateTriggerAction
} from '$utils/types.token'
import type { DataRecord, ResponseBody } from '$utils/types'
import { apiFetchFunctionRaw, ApiFunction } from '$routes/api/api'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/actions/types.actionsClassAuth.ts'

export class AuthAction {
	msgFail: string
	constructor(parms: DataRecord) {
		const clazz = 'AuthAction'
		this.msgFail = strRequired(
			parms.msgFail || 'Something is wrong with the credentials you entered. Please try again.',
			clazz,
			'msgFail'
		)
	}
	async execute(authProcess: AuthProcess): Promise<boolean> {
		return false
	}
}

export class AuthActionDB extends AuthAction {
	dbExpr: string
	constructor(parms: DataRecord) {
		const clazz = 'AuthActionDB'
		super(parms)
		this.dbExpr = strRequired(parms.dbExpr, clazz, 'dbExpr')
	}
	async execute(authProcess: AuthProcess): Promise<boolean> {
		let resultRecord: any = {}

		let exprParms: DataRecord = {
			dbExpr: this.dbExpr,
			record: authProcess.parms
		}

		const result: ResponseBody = await apiFetchFunctionRaw(
			ApiFunction.dbGelProcessExpression,
			new TokenApiQueryData(exprParms)
		)

		resultRecord = result.data.data[0]

		if (!result.success || !resultRecord) {
			alert(this.msgFail)
			return false
		}

		authProcess.parmsUpdate(resultRecord)
		return true
	}
}

export class AuthActionDataObj extends AuthAction {
	dataObjName: string
	constructor(parms: DataRecord) {
		const clazz = 'AuthActionDataObj'
		super(parms)
		this.dataObjName = strRequired(parms.dataObjName, clazz, 'dataObjName')
	}
	async execute(authProcess: AuthProcess): Promise<boolean> {
		const sm = authProcess.getState()
		await sm.triggerAction(
			new TokenAppStateTriggerAction({
				codeAction: CodeAction.init(
					CodeActionClass.ct_sys_code_action_class_do,
					CodeActionType.doOpen
				),
				data: {
					token: new TokenAppDoQuery({
						dataObjName: this.dataObjName,
						queryType: TokenApiQueryType.preset
					})
				}
			})
		)
		return true
	}
}

export class AuthActionLogic extends AuthAction {
	logic: Function
	constructor(parms: DataRecord) {
		const clazz = 'AuthActionLogic'
		super(parms)
		this.logic = required(parms.logic, clazz, 'func')
	}
	async execute(authProcess: AuthProcess): Promise<boolean> {
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
	async execute() {
		while (this.actions.length > 0) {
			const action = this.actions.shift()
			if (!action || !(await action.execute(this))) return
		}
	}
	getState() {
		if (this.sm) {
			return this.sm
		} else {
			error(500, {
				file: FILENAME,
				function: 'AuthProcess.getState',
				message: `state manager not yet set`
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
	securityCodeSystem = 'securityCodeSystem',
	securityCodeUser = 'securityCodeUser',
	userId = 'userId',
	userName = 'userName'
}
