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
import { Field, FieldClassType } from '$comps/form/field.svelte'
import { FieldEmbed } from '$comps/form/fieldEmbed'
import {
	NavDestinationType,
	Token,
	TokenApiQueryDataTree,
	TokenApiQueryType,
	TokenAppDo,
	TokenAppNav,
	TokenAppStateTriggerAction,
	TokenAppUserActionConfirmType
} from '$utils/types.token'
import { RawUserAction } from '$comps/dataObj/types.rawDataObj.svelte'
import { clientQueryExprOld } from '$lib/queryClient/types.queryClientManager'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/dataObj/types.userAction.ts'

export class UserAction {
	actionConfirms: UserActionConfirm[]
	actionShows: UserActionShow[]
	codeAction: CodeAction
	codeTriggerEnable: UserActionTrigger
	expr: string
	exprWith: string
	header?: string
	name: string
	navDestination?: TokenAppNav
	constructor(rawAction: RawUserAction, sm: State | undefined = undefined) {
		const clazz = 'UserAction'
		this.actionConfirms = rawAction.actionConfirms
		this.actionShows = rawAction.actionShows
		this.codeAction = rawAction.codeAction
		this.codeTriggerEnable = rawAction.codeTriggerEnable
		this.expr = rawAction.expr
		this.exprWith = rawAction.exprWith
		this.header = rawAction.header
		this.name = rawAction.name
		this.navDestination = rawAction.navDestination
	}

	async dbExe(sm: State, evalExprContext: string, expr: string): Promise<MethodResult> {
		// let exprCustom = this.exprWith ? 'WITH\n' + this.exprWith : ''
		// exprCustom = exprCustom ? exprCustom + ' ' + expr : expr

		let exprCustom = getDbExprRaw(this.exprWith, expr)
		const dataTree: TokenApiQueryDataTree = sm.app.getDataTree(TokenApiQueryType.retrieve)
		return await clientQueryExprOld(exprCustom, evalExprContext, { dataTree, user: sm.user }, sm)
	}

	async getConfirm(sm: State, dataObj: DataObj) {
		const confirms = this.actionConfirms
		switch (confirms.length) {
			case 0:
				return { codeConfirmType: TokenAppUserActionConfirmType.none, confirm: undefined }
			case 1:
				return { codeConfirmType: confirms[0].codeConfirmType, confirm: confirms[0].confirm }
			default:
				for (let i = 0; i < confirms.length; i++) {
					const confirmAction = confirms[i]
					const sg = new UserActionStatusGroup(this.exprWith)
					await sg.addStatus(sm, dataObj, confirmAction.codeTriggerConfirmConditional, true)
					if (sg.isTriggered()) {
						const codeConfirmType = confirmAction.codeConfirmType
						const confirm = confirmAction.confirm
						return { codeConfirmType, confirm }
					}
				}
				error(500, {
					file: 'UserAction',
					function: 'getConfirm',
					msg: `No conditional confirm found for triggers: ${confirms.map((c) => c.codeTriggerConfirmConditional).join()}.`
				})
		}
	}

	static async getActionsDisplay(sm: State, dataObj: DataObj) {
		let actions: UserActionDisplay[] = []
		for (let i = 0; i < dataObj.userActions.length; i++) {
			const doa = dataObj.userActions[i]
			let action = doa.action
			let sg = new UserActionStatusGroup(action.exprWith)
			for (let j = 0; j < action.actionShows.length; j++) {
				let actionShow = action.actionShows[j]
				await sg.addStatus(
					sm,
					dataObj,
					actionShow.codeTriggerShow,
					actionShow.isRequired,
					action,
					actionShow
				)
			}
			const isStatusShow = sg.isTriggered()
			if (isStatusShow) {
				sg = new UserActionStatusGroup(doa.action.exprWith)
				await sg.addStatus(sm, dataObj, doa.action.codeTriggerEnable, true)
				actions.push(new UserActionDisplay(doa, !sg.isTriggered()))
			}
		}
		return actions
	}

	async trigger(sm: State, dataObj: DataObj): Promise<MethodResult> {
		const { codeConfirmType, confirm } = await this.getConfirm(sm, dataObj)
		return await sm.triggerAction(
			new TokenAppStateTriggerAction({
				codeAction: this.codeAction,
				codeConfirmType,
				confirm,
				data: {
					token: new TokenAppDo({
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
			await userActionStateChangeDataObj(sm, parmsAction)
		}
	}
}

export async function userActionStateChangeDataObj(
	sm: State,
	parmsAction: TokenAppStateTriggerAction
) {
	const clazz = 'userActionStateChangeDataObj'
	let currTab = sm.app.getCurrTab()
	if (currTab && currTab.dataObj) {
		sm.dm.init(currTab.dataObj)
		currTab.dataObj.fields
			.filter((f) => f.classType === FieldClassType.embed)
			.forEach((f: Field) => {
				if (f instanceof FieldEmbed) {
					sm.dm.nodeAdd(required(f.dataObjEmbed, clazz, 'f.dataObjEmbed'))
				}
			})
		parmsAction.updateStateParms({
			navContent: currTab.dataObj.raw.codeComponent,
			navLayoutParms: { dataObjId: currTab.dataObj.raw.id }
		})

		await userActionStateChange(sm, parmsAction)
	}
}

export async function userActionStateChangeRaw(sm: State, parmsAction: TokenAppStateTriggerAction) {
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
	token: Token,
	queryType: TokenApiQueryType,
	parmsAction: TokenAppStateTriggerAction
): Promise<MethodResult> {
	let result: MethodResult = await sm.app.addTreeNodeChildren(sm, token as TokenAppDo, queryType)
	if (result.error) return result
	await userActionStateChangeDataObj(sm, parmsAction)
	return result
}

export class UserActionShow {
	codeTriggerShow: UserActionTrigger
	expr?: UserActionShowExpr
	isRequired: boolean
	constructor(obj: any) {
		const clazz = 'UserActionShow'
		obj = valueOrDefault(obj, {})
		this.codeTriggerShow = memberOfEnum(
			obj._codeTriggerShow,
			clazz,
			'codeTriggerShow',
			'UserActionTriggerEnable',
			UserActionTrigger
		)
		this.expr =
			this.codeTriggerShow === UserActionTrigger.expression
				? new UserActionShowExpr(obj)
				: undefined
		this.isRequired = valueOrDefault(obj.isRequired, false)
	}
}
export class UserActionShowExpr {
	expr: string
	constructor(obj: any) {
		const clazz = 'UserActionShowExpr'
		obj = valueOrDefault(obj, {})
		this.expr = strRequired(obj.expr, clazz, 'expr')
	}
}

export class UserActionStatus {
	isTriggered: boolean
	isRequired: boolean
	trigger: UserActionTrigger
	constructor(trigger: UserActionTrigger, isTriggered: boolean, isRequired: boolean) {
		this.isTriggered = isTriggered
		this.isRequired = isRequired
		this.trigger = trigger
	}
}

export class UserActionStatusGroup {
	exprWith: string
	statuses: UserActionStatus[] = []
	constructor(exprWith: string) {
		this.exprWith = exprWith
	}
	async addStatus(
		sm: State,
		dataObj: DataObj,
		trigger: UserActionTrigger,
		isRequired: boolean,
		userAction: UserAction | undefined = undefined,
		userActionShow: UserActionShow | undefined = undefined
	) {
		const clazz = 'UserActionStatusGroup'
		let isTriggered = false
		const dm: DataManager = required(sm.dm, clazz, 'state.dataManager')
		let dataRecord: DataRecord | undefined

		switch (trigger) {
			case UserActionTrigger.always:
				isTriggered = true
				break

			case UserActionTrigger.expression:
				if (userAction && userActionShow) {
					const evalExprContext = `${clazz}.addStatus.expression`
					let result: MethodResult = await userAction.dbExe(
						sm,
						evalExprContext,
						strRequired(userActionShow.expr?.expr, clazz, 'show')
					)
					isTriggered = result.error ? false : valueOrDefault(result.getResultExprValue(), false)
				}
				break

			case UserActionTrigger.never:
				isTriggered = false
				break
			case UserActionTrigger.notRecordOwner:
				dataRecord = dm.getRecordsDisplayRow(dataObj.raw.id, 0)
				if (dataRecord && sm.user) {
					const recordOwner = getDataRecordValueKey(dataRecord, 'recordOwner')
					isTriggered = !recordOwner ? false : recordOwner !== sm.user.personId
				} else {
					isTriggered = false
				}
				break
			case UserActionTrigger.notStatusChanged:
				isTriggered = !dm.isStatusChanged()
				break
			case UserActionTrigger.recordOwner:
				dataRecord = dm.getRecordsDisplayRow(dataObj.raw.id, 0)
				if (dataRecord && sm.user) {
					const recordOwner = getDataRecordValueKey(dataRecord, 'recordOwner')
					isTriggered = !recordOwner ? true : recordOwner === sm.user.personId
				} else {
					isTriggered = false
				}
				break
			case UserActionTrigger.statusChanged:
				isTriggered = dm.isStatusChanged()
				break
			case UserActionTrigger.statusValid:
				isTriggered = dm.isStatusValid()
				break
			case UserActionTrigger.rootDataObj:
				isTriggered = !dataObj.embedField
				break
			case UserActionTrigger.saveModeInsert:
				isTriggered = dataObj.saveMode === DataObjSaveMode.insert
				break
			case UserActionTrigger.saveModeUpdate:
				isTriggered = dataObj.saveMode === DataObjSaveMode.update
				break
			default:
				error(500, {
					file: FILENAME,
					function: 'UserActionStatusGroup.addStatus',
					msg: `No case definded for userActionTrigger: ${trigger}.`
				})
		}
		this.statuses.push(new UserActionStatus(trigger, isTriggered, isRequired))
	}
	isTriggered() {
		const someRequiredNotTriggered = this.statuses.some((s) => s.isRequired && !s.isTriggered)
		const notRequiredCount = this.statuses.filter((s) => !s.isRequired).length
		const optionalIsTriggered =
			this.statuses.filter((s) => !s.isRequired).length === 0 ||
			this.statuses.some((s) => !s.isRequired && s.isTriggered)
		return !someRequiredNotTriggered && optionalIsTriggered
	}
}
export enum UserActionTrigger {
	always = 'always',
	expression = 'expression',
	never = 'never',
	none = 'none',
	notRecordOwner = 'notRecordOwner',
	notStatusChanged = 'notStatusChanged',
	statusChanged = 'statusChanged',
	objectValidToContinue = 'objectValidToContinue',
	statusValid = 'statusValid',
	recordOwner = 'recordOwner',
	rootDataObj = 'rootDataObj',
	saveMode = 'saveMode',
	saveModeInsert = 'saveModeInsert',
	saveModeUpdate = 'saveModeUpdate'
}
