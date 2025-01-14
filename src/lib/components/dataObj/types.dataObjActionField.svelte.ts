import { State, StatePacket, StateTarget } from '$comps/app/types.appState.svelte'
import {
	CodeAction,
	CodeActionType,
	CodeActionClass,
	DataManager,
	DataObj,
	DataObjConfirm,
	DataObjSaveMode,
	debug,
	required
} from '$utils/types'
import { TokenAppDo, TokenAppDoActionConfirmType } from '$utils/types.token'
import { memberOfEnum, valueOrDefault } from '$utils/types'
import { FieldColor } from '$comps/form/field'
import { RawDataObjActionField } from '$comps/dataObj/types.rawDataObj'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/dataObj/types.dataObjActionField.ts'

export class DataObjActionField {
	actionFieldConfirms: DataObjActionFieldConfirm[]
	actionFieldShows: DataObjActionFieldShow[]
	codeAction: CodeAction
	codeActionFieldTriggerEnable: DataObjActionFieldTriggerEnable
	fieldColor: FieldColor
	header: string
	isListRowAction: boolean
	isStatusDisabled: boolean = false
	isStatusShow: boolean = false
	name: string
	constructor(rawAction: RawDataObjActionField, sm: State | undefined = undefined) {
		const clazz = 'DataObjActionField'
		this.actionFieldConfirms = rawAction.actionFieldConfirms
		this.actionFieldShows = rawAction.actionFieldShows
		this.codeAction = rawAction.codeAction
		this.codeActionFieldTriggerEnable = rawAction.codeActionFieldTriggerEnable
		this.fieldColor = rawAction.fieldColor
		this.header = rawAction.header
		this.isListRowAction = rawAction.isListRowAction
		this.name = rawAction.name
	}
	getConfirm(sm: State, dataObj: DataObj) {
		const confirms = this.actionFieldConfirms
		switch (confirms.length) {
			case 0:
				return { confirmType: TokenAppDoActionConfirmType.none, confirm: undefined }
			case 1:
				return { confirmType: confirms[0].codeConfirmType, confirm: confirms[0].confirm }
			default:
				for (let i = 0; i < confirms.length; i++) {
					const confirmAction = confirms[i]
					const tg = new DataObjActionFieldTriggerGroup()
					tg.addStatus(sm, dataObj, confirmAction.codeTriggerConfirmConditional, true)
					if (tg.isTriggered()) {
						const confirmType = confirmAction.codeConfirmType
						const confirm = confirmAction.confirm
						return { confirmType, confirm }
					}
				}
				error(500, {
					file: FILENAME,
					function: 'getConfirm',
					message: `No conditional confirm found for triggers: ${confirms.map((c) => c.codeTriggerConfirmConditional).join()}.`
				})
		}
	}

	isDisabled(sm: State, dataObj: DataObj) {
		const tg = new DataObjActionFieldTriggerGroup()
		tg.addStatus(sm, dataObj, this.codeActionFieldTriggerEnable, true)
		this.isStatusDisabled = !tg.isTriggered()
		return this.isStatusDisabled
	}
	isShow(sm: State, dataObj: DataObj) {
		const tg = new DataObjActionFieldTriggerGroup()
		this.actionFieldShows.forEach((show) => {
			tg.addStatus(sm, dataObj, show.codeTriggerShow, show.isRequired)
		})
		this.isStatusShow = tg.isTriggered()
		return this.isStatusShow
	}

	async trigger(sm: State, dataObj: DataObj) {
		const { confirmType, confirm } = this.getConfirm(sm, dataObj)
		sm.change({
			confirm,
			confirmType,
			packet: new StatePacket({
				actionType: this.codeAction.actionType,
				token: new TokenAppDo({
					dataObj,
					sm
				})
			}),
			target: StateTarget.feature
		})
	}
}

export class DataObjActionFieldConfirm {
	codeConfirmType: TokenAppDoActionConfirmType
	codeTriggerConfirmConditional: DataObjActionFieldTriggerEnable
	confirm: DataObjConfirm
	constructor(obj: any) {
		const clazz = 'DataObjActionConfirm'
		obj = valueOrDefault(obj, {})
		this.codeConfirmType = memberOfEnum(
			obj._codeConfirmType,
			clazz,
			'codeConfirmType',
			'TokenAppDoActionConfirmType',
			TokenAppDoActionConfirmType
		)
		this.codeTriggerConfirmConditional = memberOfEnum(
			obj._codeTriggerConfirmConditional,
			clazz,
			'codeTriggerConfirmConditional',
			'DataObjActionTriggerRender',
			DataObjActionFieldTriggerEnable
		)
		this.confirm = new DataObjConfirm(obj)
	}
}
export enum DataObjActionFieldTriggerEnable {
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
export class DataObjActionFieldTriggerGroup {
	statuses: DataObjActionFieldTriggerStatus[] = []
	constructor() {}
	addStatus(
		sm: State,
		dataObj: DataObj,
		trigger: DataObjActionFieldTriggerEnable,
		isRequired: boolean
	) {
		const clazz = 'DataObjActionFieldTriggerGroup'
		let isTriggered = false

		const dm: DataManager = required(sm.dm, clazz, 'state.dataManager')

		switch (trigger) {
			case DataObjActionFieldTriggerEnable.always:
				isTriggered = true
				break
			case DataObjActionFieldTriggerEnable.never:
				isTriggered = false
				break
			case DataObjActionFieldTriggerEnable.notStatusChanged:
				isTriggered = !dm.isStatusChanged()
				break
			case DataObjActionFieldTriggerEnable.statusChanged:
				isTriggered = dm.isStatusChanged()
				break
			case DataObjActionFieldTriggerEnable.statusValid:
				isTriggered = dm.isStatusValid()
				break
			case DataObjActionFieldTriggerEnable.rootDataObj:
				isTriggered = !dataObj.embedField
				break
			case DataObjActionFieldTriggerEnable.saveModeInsert:
				isTriggered = dataObj.saveMode === DataObjSaveMode.insert
				break
			case DataObjActionFieldTriggerEnable.saveModeUpdate:
				isTriggered = dataObj.saveMode === DataObjSaveMode.update
				break
			default:
				error(500, {
					file: FILENAME,
					function: 'DataObjActionFieldTriggerGroup.addStatus',
					message: `No case definded for trigger: ${trigger}.`
				})
		}
		this.statuses.push(new DataObjActionFieldTriggerStatus(trigger, isTriggered, isRequired))
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
export class DataObjActionFieldTriggerStatus {
	isTriggered: boolean
	isRequired: boolean
	trigger: DataObjActionFieldTriggerEnable
	constructor(trigger: DataObjActionFieldTriggerEnable, isTriggered: boolean, isRequired: boolean) {
		this.isTriggered = isTriggered
		this.isRequired = isRequired
		this.trigger = trigger
	}
}

export class DataObjActionFieldShow {
	codeTriggerShow: DataObjActionFieldTriggerEnable
	isRequired: boolean
	constructor(obj: any) {
		const clazz = 'DataObjActionShow'
		obj = valueOrDefault(obj, {})
		this.codeTriggerShow = memberOfEnum(
			obj._codeTriggerShow,
			clazz,
			'codeTriggerShow',
			'DataObjActionTriggerRender',
			DataObjActionFieldTriggerEnable
		)
		this.isRequired = valueOrDefault(obj.isRequired, false)
	}
}
