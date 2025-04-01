import {
	State,
	StateNavContent,
	StateNavLayout,
	StateParms,
	StateTriggerToken
} from '$comps/app/types.appState.svelte'
import {
	CodeAction,
	CodeActionType,
	DataManager,
	DataObj,
	DataObjQueryRiderTriggerTiming,
	DataObjQueryRiderDestination,
	DataObjQueryRiderMsgDelivery,
	DataObjSaveMode,
	type DataRecord,
	debug,
	getDataRecordValueKey,
	memberOfEnum,
	memberOfEnumIfExists,
	required,
	strRequired,
	ToastType,
	valueOrDefault
} from '$utils/types'
import { Field, FieldClassType, FieldOp } from '$comps/form/field.svelte'
import { FieldEmbed } from '$comps/form/fieldEmbed'
import {
	Token,
	TokenApiQueryType,
	TokenAppDo,
	TokenAppStateTriggerAction,
	TokenAppUserActionConfirmType
} from '$utils/types.token'
import { RawDataObjAction, RawUserAction } from '$comps/dataObj/types.rawDataObj.svelte'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/dataObj/types.userAction.ts'

export class UserAction {
	actionConfirms: UserActionConfirm[]
	actionShows: UserActionShow[]
	codeAction: CodeAction
	codeTriggerEnable: UserActionTrigger
	header?: string
	isStatusDisabled: boolean = false
	isStatusShow: boolean = false
	name: string
	constructor(rawAction: RawUserAction, sm: State | undefined = undefined) {
		const clazz = 'UserAction'
		this.actionConfirms = rawAction.actionConfirms
		this.actionShows = rawAction.actionShows
		this.codeAction = rawAction.codeAction
		this.codeTriggerEnable = rawAction.codeTriggerEnable
		this.header = rawAction.header
		this.name = rawAction.name
	}
	getConfirm(sm: State, dataObj: DataObj) {
		const confirms = this.actionConfirms
		switch (confirms.length) {
			case 0:
				return { codeConfirmType: TokenAppUserActionConfirmType.none, confirm: undefined }
			case 1:
				return { codeConfirmType: confirms[0].codeConfirmType, confirm: confirms[0].confirm }
			default:
				for (let i = 0; i < confirms.length; i++) {
					const confirmAction = confirms[i]
					const sg = new UserActionStatusGroup()
					sg.addStatus(sm, dataObj, confirmAction.codeTriggerConfirmConditional, true)
					if (sg.isTriggered()) {
						const codeConfirmType = confirmAction.codeConfirmType
						const confirm = confirmAction.confirm
						return { codeConfirmType, confirm }
					}
				}
				error(500, {
					file: 'UserAction',
					function: 'getConfirm',
					message: `No conditional confirm found for triggers: ${confirms.map((c) => c.codeTriggerConfirmConditional).join()}.`
				})
		}
	}

	isDisabled(sm: State, dataObj: DataObj) {
		const sg = new UserActionStatusGroup()
		sg.addStatus(sm, dataObj, this.codeTriggerEnable, true)
		this.isStatusDisabled = !sg.isTriggered()
		return this.isStatusDisabled
	}
	isShow(sm: State, dataObj: DataObj) {
		const sg = new UserActionStatusGroup()
		this.actionShows.forEach((show) => {
			sg.addStatus(
				sm,
				dataObj,
				show.codeTriggerShow,
				show.isRequired,
				show.codeExprOp,
				show.exprField,
				show.exprValue
			)
		})
		this.isStatusShow = sg.isTriggered()
		return this.isStatusShow
	}

	async trigger(sm: State, dataObj: DataObj) {
		const { codeConfirmType, confirm } = this.getConfirm(sm, dataObj)
		await sm.triggerAction(
			new TokenAppStateTriggerAction({
				codeAction: this.codeAction,
				codeConfirmType,
				confirm,
				data: { token: new TokenAppDo({ actionType: this.codeAction.actionType, dataObj }) }
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

export const userActionError = (filename: string, actionType: CodeActionType) =>
	`${filename}.${actionType}`

export async function userActionStateChange(sm: State, parmsAction: TokenAppStateTriggerAction) {
	await sm.changeUserAction(parmsAction)
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

export async function userActionTreeNodeChildren(
	sm: State,
	token: Token,
	queryType: TokenApiQueryType,
	parmsAction: TokenAppStateTriggerAction
) {
	await sm.app.addTreeNodeChildren(sm, token as TokenAppDo, queryType)
	await userActionStateChangeDataObj(sm, parmsAction)
}

export class UserActionShow {
	codeExprOp?: FieldOp
	codeTriggerShow: UserActionTrigger
	exprField?: string
	exprValue?: string
	isRequired: boolean
	constructor(obj: any) {
		const clazz = 'UserActionShow'
		obj = valueOrDefault(obj, {})
		this.codeExprOp = memberOfEnumIfExists(obj._codeExprOp, 'codeExprOp', clazz, 'FieldOp', FieldOp)
		this.codeTriggerShow = memberOfEnum(
			obj._codeTriggerShow,
			clazz,
			'codeTriggerShow',
			'UserActionTriggerEnable',
			UserActionTrigger
		)
		this.exprField = obj.exprField
		this.exprValue = obj.exprValue
		this.isRequired = valueOrDefault(obj.isRequired, false)
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
	statuses: UserActionStatus[] = []
	constructor() {}
	addStatus(
		sm: State,
		dataObj: DataObj,
		trigger: UserActionTrigger,
		isRequired: boolean,
		codeExprOp: FieldOp | undefined = undefined,
		exprField: string | undefined = undefined,
		exprValue: string | undefined = undefined
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
				exprField = strRequired(exprField, clazz, 'exprField')
				codeExprOp = required(codeExprOp, clazz, 'codeExprOp')
				dataRecord = required(dm.getRecordsDisplayRow(dataObj.raw.id, 0), clazz, 'dataRecord')
				const currValue = getDataRecordValueKey(dataRecord!, exprField)
				switch (codeExprOp) {
					case FieldOp.equal:
						isTriggered = currValue === exprValue
						break

					case FieldOp.notEqual:
						isTriggered = currValue !== exprValue

					default:
						error(500, {
							file: FILENAME,
							function: 'UserActionStatusGroup.addStatus',
							message: `No case definded for codeExprOp: ${codeExprOp}.`
						})
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
					message: `No case definded for userActionTrigger: ${trigger}.`
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
