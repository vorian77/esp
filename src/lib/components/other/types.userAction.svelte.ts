import { State, StateTriggerToken } from '$comps/app/types.appState.svelte'
import {
	CodeAction,
	CodeActionType,
	DataManager,
	DataObj,
	DataObjSaveMode,
	debug,
	memberOfEnum,
	required,
	valueOrDefault
} from '$utils/types'
import {
	TokenAppDo,
	TokenAppStateTriggerAction,
	TokenAppUserActionConfirmType
} from '$utils/types.token'
import { FieldColor } from '$comps/form/field'
import { RawDataObjAction, RawUserAction } from '$comps/dataObj/types.rawDataObj'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/dataObj/types.userAction.ts'

export class UserAction {
	actionConfirms: UserActionConfirm[]
	actionShows: UserActionShow[]
	codeAction: CodeAction
	codeTriggerEnable: UserActionTrigger
	header: string
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
			sg.addStatus(sm, dataObj, show.codeTriggerShow, show.isRequired)
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
				token: new TokenAppDo({
					dataObj,
					sm
				})
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

export function userActionStateChange(
	sm: State,
	triggerTokens: StateTriggerToken[],
	parms: TokenAppStateTriggerAction
) {
	sm.change({ ...parms.data.state, triggerTokens })
}

export function userActionStateChangeHomeAppCustom(sm: State, parms: TokenAppStateTriggerAction) {
	userActionStateChange(
		sm,
		[StateTriggerToken.homeApp, StateTriggerToken.componentContentCustom],
		parms
	)
}

export function userActionStateChangeHomeAppForm(sm: State, parms: TokenAppStateTriggerAction) {
	userActionStateChange(
		sm,
		[StateTriggerToken.homeApp, StateTriggerToken.componentContentForm],
		parms
	)
}

export function userActionStateChangeHomeDashboard(sm: State, parms: TokenAppStateTriggerAction) {
	userActionStateChange(sm, [StateTriggerToken.homeDashboard], parms)
}

export class UserActionShow {
	codeTriggerShow: UserActionTrigger
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
	addStatus(sm: State, dataObj: DataObj, trigger: UserActionTrigger, isRequired: boolean) {
		const clazz = 'UserActionStatusGroup'
		let isTriggered = false

		const dm: DataManager = required(sm.dm, clazz, 'state.dataManager')

		switch (trigger) {
			case UserActionTrigger.always:
				isTriggered = true
				break
			case UserActionTrigger.never:
				isTriggered = false
				break
			case UserActionTrigger.notStatusChanged:
				isTriggered = !dm.isStatusChanged()
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
	never = 'never',
	none = 'none',
	notStatusChanged = 'notStatusChanged',
	statusChanged = 'statusChanged',
	objectValidToContinue = 'objectValidToContinue',
	statusValid = 'statusValid',
	rootDataObj = 'rootDataObj',
	saveMode = 'saveMode',
	saveModeInsert = 'saveModeInsert',
	saveModeUpdate = 'saveModeUpdate'
}
