import {
	State,
	StateNavLayout,
	StateParms,
	StateTriggerToken
} from '$comps/app/types.appState.svelte'
import {
	CodeAction,
	CodeActionType,
	DataManager,
	DataObj,
	DataObjAction,
	DataObjSaveMode,
	type DataRecord,
	getDataRecordValueKey,
	getDbExprRaw,
	memberOfEnum,
	MethodResult,
	required,
	strRequired,
	valueOrDefault
} from '$utils/types'
import { EvalParser, EvalParserToken, type EvalParserTokenParm } from '$utils/utils.evalParser'
import { Field, FieldClassType } from '$comps/form/field.svelte'
import { FieldEmbed } from '$comps/form/fieldEmbed'
import {
	NavDestinationType,
	TokenApiQueryType,
	TokenAppDoBase,
	TokenAppDoQuery,
	TokenAppNav,
	TokenAppStateTriggerAction,
	TokenAppUserActionConfirmType
} from '$utils/types.token'
import { RawUserAction } from '$comps/dataObj/types.rawDataObj.svelte'
import { clientQueryExpr } from '$lib/queryClient/types.queryClient'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/dataObj/types.userAction.ts'

export class EvalParserUserAction extends EvalParser {
	action: UserAction
	dataObj: DataObj
	sm: State
	constructor(obj: any) {
		const clazz = 'EvalParserUserAction'
		obj = valueOrDefault(obj, {})
		super({ exprRaw: obj.exprRaw })
		this.action = required(obj.action, clazz, 'action')
		this.dataObj = required(obj.dataObj, clazz, 'dataObj')
		this.sm = required(obj.sm, clazz, 'sm')
	}

	addToken(parm: EvalParserTokenParm): EvalParserToken {
		return new EvalParserToken(parm)
	}

	async evalTokenAsync(tokenRoot: EvalParserToken): Promise<MethodResult> {
		const clazz = 'EvalParserUserAction.evalToken'
		let isTriggered = false
		const dm: DataManager = required(this.sm.dm, clazz, 'state.dataManager')
		let dataRecord: DataRecord | undefined

		switch (tokenRoot.content) {
			case UserActionTrigger.always:
				return new MethodResult(true)

			case UserActionTrigger.expression:
				const evalExprContext = `${clazz}.expression`
				const expr = this.action.exprShowExpr
				if (expr) {
					let result: MethodResult = await this.action.dbExe(this.sm, evalExprContext, expr)
					if (result.error) return result
					const value = result.getResultExprValue()
					if (typeof value === 'boolean') {
						return new MethodResult(value)
					} else {
						return new MethodResult({
							error: {
								file: FILENAME,
								function: evalExprContext,
								msgSystem: `Expression does not evaluate to boolean: ${expr}`,
								msgUser: `Invalid expression.`
							}
						})
					}
				} else {
					return new MethodResult({
						error: {
							file: FILENAME,
							function: evalExprContext,
							msg: `No exprShowExpr defined for trigger: 'expression'`
						}
					})
				}

			case UserActionTrigger.detailPreset:
				return new MethodResult(this.dataObj.isDetailPreset)

			case UserActionTrigger.never:
				return new MethodResult(false)

			case UserActionTrigger.recordOwner:
				dataRecord = dm.getRecordsDisplayRow(this.dataObj.raw.id, 0)
				if (dataRecord && this.sm.user) {
					const recordOwner = getDataRecordValueKey(dataRecord, 'recordOwner')
					isTriggered = !recordOwner ? true : recordOwner === this.sm.user.personId
				} else {
					isTriggered = false
				}
				return new MethodResult(isTriggered)

			case UserActionTrigger.statusChanged:
				return new MethodResult(dm.isStatusChanged())

			case UserActionTrigger.statusValid:
				return new MethodResult(dm.isStatusValid())

			case UserActionTrigger.rootDataObj:
				return new MethodResult(!this.dataObj.embedField)

			case UserActionTrigger.saveModeInsert:
				return new MethodResult(this.dataObj.saveMode === DataObjSaveMode.insert)

			case UserActionTrigger.saveModeUpdate:
				return new MethodResult(this.dataObj.saveMode === DataObjSaveMode.update)

			default:
				error(500, {
					file: FILENAME,
					function: clazz,
					msg: `No case definded for UserActionTrigger: ${tokenRoot.content}.`
				})
		}
	}

	isToken(tokenContent: string): boolean {
		return Object.values(UserActionTrigger).includes(tokenContent as UserActionTrigger)
	}

	async isTriggered(): Promise<MethodResult> {
		if (this.exprRaw === '') return new MethodResult(true)
		const result: MethodResult = await this.getExprAsync()
		if (result.error) return result
		const exprParsed: string = result.data
		const isTriggered = eval(exprParsed)
		return new MethodResult(isTriggered)
	}
}

export class UserAction {
	actionConfirms: UserActionConfirm[]
	codeAction: CodeAction
	codeConfirmType: TokenAppUserActionConfirmType
	exprAction: string
	exprEnable: string
	exprShow: string
	exprShowExpr: string
	exprWith: string
	header?: string
	name: string
	navDestination?: TokenAppNav
	constructor(rawAction: RawUserAction, sm: State | undefined = undefined) {
		const clazz = 'UserAction'
		this.actionConfirms = rawAction.actionConfirms
		this.codeAction = rawAction.codeAction
		this.codeConfirmType = rawAction.codeConfirmType
		this.exprAction = rawAction.exprAction
		this.exprEnable = rawAction.exprEnable
		this.exprShow = rawAction.exprShow
		this.exprShowExpr = rawAction.exprShowExpr
		this.exprWith = rawAction.exprWith
		this.header = rawAction.header
		this.name = rawAction.name
		this.navDestination = rawAction.navDestination
	}

	async dbExe(sm: State, evalExprContext: string, expr: string): Promise<MethodResult> {
		let exprCustom = getDbExprRaw(this.exprWith, expr)
		return await clientQueryExpr(evalExprContext, exprCustom, {}, sm)
	}

	async getConfirm(sm: State, dataObj: DataObj): Promise<MethodResult> {
		switch (this.codeConfirmType) {
			case TokenAppUserActionConfirmType.conditional:
				const confirms = this.actionConfirms
				for (let i = 0; i < confirms.length; i++) {
					const confirmAction = confirms[i]
					const parser = new EvalParserUserAction({
						action: this,
						dataObj,
						exprRaw: `<${confirmAction.codeTriggerConfirmConditional}>`,
						sm
					})
					let result: MethodResult = await parser.isTriggered()
					if (result.error) return result
					let isTriggered = result.data
					if (isTriggered) {
						return new MethodResult({
							codeConfirmType: confirmAction.codeConfirmType,
							confirm: confirmAction.confirm
						})
					}
				}
				return new MethodResult({
					error: {
						file: FILENAME,
						function: 'getConfirm',
						msg: `No conditional confirm found for triggers: ${confirms.map((c) => c.codeTriggerConfirmConditional).join()}.`
					}
				})

			default:
				return new MethodResult({
					codeConfirmType: this.codeConfirmType,
					confirm: new UserActionConfirmContent({
						codeConfirmType: this.codeConfirmType,
						codeTriggerConfirmConditional: UserActionTrigger.none
					})
				})
		}
	}

	static async getActionsDisplay(sm: State, dataObj: DataObj): Promise<MethodResult> {
		let actions: UserActionDisplay[] = []
		for (let i = 0; i < dataObj.userActions.length; i++) {
			const doa = dataObj.userActions[i]
			let action = doa.action
			if (action.name === 'ua_sys_save_detail') {
				action = action
			}
			let parser = new EvalParserUserAction({
				action,
				dataObj,
				exprRaw: action.exprShow,
				sm
			})
			let result: MethodResult = await parser.isTriggered()
			if (result.error) return result
			let isTriggered = result.data
			if (isTriggered) {
				let parser = new EvalParserUserAction({
					action: doa.action,
					dataObj,
					exprRaw: doa.action.exprEnable,
					sm
				})
				let result: MethodResult = await parser.isTriggered()
				if (result.error) return result
				isTriggered = result.data
				const actionDisplay = new UserActionDisplay(doa, !isTriggered)
				actions.push(actionDisplay)
			}
		}
		return new MethodResult(actions)
	}

	async trigger(sm: State, dataObj: DataObj): Promise<MethodResult> {
		const result: MethodResult = await this.getConfirm(sm, dataObj)
		if (result.error) return result
		const confirmData: {
			codeConfirmType: TokenAppUserActionConfirmType
			confirm: UserActionConfirmContent
		} = result.data
		return await sm.triggerAction(
			new TokenAppStateTriggerAction({
				codeAction: this.codeAction,
				codeConfirmType: confirmData.codeConfirmType,
				confirm: confirmData.confirm,
				data: {
					token: new TokenAppDoBase({
						userAction: this,
						dataObj
					})
				}
			})
		)
	}
}

export class UserActionConfirm {
	codeConfirmType: TokenAppUserActionConfirmType
	codeTriggerConfirmConditional: UserActionTrigger
	confirm: UserActionConfirmContent
	constructor(obj: any) {
		const clazz = 'UserActionConfirm'
		obj = valueOrDefault(obj, {})
		this.codeConfirmType = memberOfEnum(
			obj._codeConfirmType,
			clazz,
			'codeConfirmType',
			'TokenAppDoActionConfirmType',
			TokenAppUserActionConfirmType
		)
		this.codeTriggerConfirmConditional = memberOfEnum(
			obj._codeTriggerConfirmConditional,
			clazz,
			'codeTriggerConfirmConditional',
			'UserActionTriggerEnable',
			UserActionTrigger
		)
		this.confirm = new UserActionConfirmContent(obj)
	}
}

export class UserActionConfirmContent {
	buttonLabelCancel: string
	buttonLabelConfirm: string
	message: string
	title: string
	constructor(obj: any = {}) {
		const clazz = 'UserActionConfirmContent'
		obj = valueOrDefault(obj, {})
		this.buttonLabelCancel = valueOrDefault(obj.confirmButtonLabelCancel, 'Keep Editing')
		this.buttonLabelConfirm = valueOrDefault(obj.confirmButtonLabelConfirm, 'Discard Changes')
		this.message = valueOrDefault(
			obj.confirmMessage,
			'Are you sure you want to discard your changes?'
		)
		this.title = valueOrDefault(obj.confirmTitle, 'Discard Changes')
	}
}

export class UserActionDisplay {
	actionType: CodeActionType
	color: string
	header: string
	isStatusDisabled: boolean = $state(false)
	name: string
	constructor(obj: DataObjAction, isStatusDisabled: boolean) {
		const clazz = 'UserActionDisplay'
		this.actionType = obj.action.codeAction.actionType
		this.header = strRequired(obj.action.header, clazz, 'header')
		this.isStatusDisabled = isStatusDisabled
		this.color = strRequired(obj.fieldColor.color, clazz, 'color')
		this.name = strRequired(obj.action.name, clazz, 'name')
	}
	static getDataObjAction(ua: UserAction, doas: DataObjAction[]): DataObjAction | undefined {
		return doas.find((doa: DataObjAction) => doa.action.name === ua.name)
	}
}

export const userActionError = (filename: string, actionType: CodeActionType) =>
	`${filename}.${actionType}`

export async function userActionStateChange(sm: State, parmsAction: TokenAppStateTriggerAction) {
	await sm.changeUserAction(parmsAction)
}

export async function userActionNavDestination(
	sm: State,
	parmsAction: TokenAppStateTriggerAction,
	token: TokenAppNav
) {
	if (token) {
		if (token.codeDestinationType === NavDestinationType.home) {
			await userActionStateChangeHomeDashboard(sm, parmsAction)
		} else {
			const result: MethodResult = await sm.app.navDestination(sm, token)
			if (result.error) return result
			await userActionStateChangeTab(sm, parmsAction)
		}
	}
}

export async function userActionStateChangeRaw(sm: State, parmsAction: TokenAppStateTriggerAction) {
	await userActionStateChange(sm, parmsAction)
}

export async function userActionStateChangeTab(sm: State, parmsAction: TokenAppStateTriggerAction) {
	const clazz = 'userActionStateChangeTab'
	let navLayoutParms: DataRecord = { target: parmsAction.target }
	let currTab = sm.app.getCurrTab()
	if (currTab) {
		if (currTab.node) navLayoutParms.node = currTab.node
		if (currTab.dataObj) {
			sm.dm.init(currTab.dataObj)
			currTab.dataObj.fields
				.filter((f) => f.classType === FieldClassType.embed)
				.forEach((f: Field) => {
					if (f instanceof FieldEmbed) {
						sm.dm.nodeAdd(required(f.dataObjEmbed, clazz, 'f.dataObjEmbed'))
					}
				})
			navLayoutParms.dataObjId = currTab.dataObj.raw.id
		}
		parmsAction.updateStateParms({
			navContent: currTab.codeComponent,
			navLayoutParms
		})
	}
	await userActionStateChange(sm, parmsAction)
}

export async function userActionStateChangeHomeDashboard(
	sm: State,
	parmsAction: TokenAppStateTriggerAction
) {
	parmsAction.isMultiTree = true
	parmsAction.stateParms = new StateParms({ navLayout: StateNavLayout.layoutDashboard }, [
		StateTriggerToken.navDashboard
	])
	await userActionStateChangeRaw(sm, parmsAction)
}

export async function userActionTreeNodeChildren(
	sm: State,
	actionType: CodeActionType,
	token: TokenAppDoBase,
	queryType: TokenApiQueryType,
	parmsAction: TokenAppStateTriggerAction
): Promise<MethodResult> {
	let result: MethodResult = await sm.app.addTreeNodeChildren(sm, actionType, token, queryType)
	if (result.error) return result
	await userActionStateChangeTab(sm, parmsAction)
	return result
}

export enum UserActionTrigger {
	always = 'always',
	detailPreset = 'detailPreset',
	expression = 'expression',
	never = 'never',
	none = 'none',
	statusChanged = 'statusChanged',
	objectValidToContinue = 'objectValidToContinue',
	statusValid = 'statusValid',
	recordOwner = 'recordOwner',
	rootDataObj = 'rootDataObj',
	saveMode = 'saveMode',
	saveModeInsert = 'saveModeInsert',
	saveModeUpdate = 'saveModeUpdate'
}
