import { State, StatePacket, StatePacketComponent } from '$comps/app/types.appState'
import {
	DataObj,
	DataObjConfirm,
	DataObjMode,
	DataObjSaveMode,
	DataObjStatus,
	type DataRecord
} from '$utils/types'
import {
	TokenAppDo,
	TokenAppDoActionConfirmType,
	TokenAppDoActionFieldType
} from '$utils/types.token'
import {
	arrayOfClasses,
	getArray,
	memberOfEnum,
	memberOfEnumOrDefault,
	required,
	strOptional,
	strRequired,
	valueHasChanged,
	valueOrDefault,
	booleanRequired
} from '$utils/types'
import { Field, FieldAccess, FieldColor, FieldElement, RawFieldProps } from '$comps/form/field'
import { FieldEmbed } from '$comps/form/fieldEmbed'
import { RawDataObj, RawDataObjActionField } from '$comps/dataObj/types.rawDataObj'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/dataObj/types.dataObjActionField.ts'

export class DataObjActionField {
	actionFieldConfirms: DataObjActionFieldConfirm[]
	actionFieldShows: DataObjActionFieldShow[]
	codeActionFieldTriggerEnable: DataObjActionFieldTriggerEnable
	codeActionFieldType: TokenAppDoActionFieldType
	fieldEmbed?: FieldEmbed
	fieldColor: FieldColor
	header: string
	isDisabled: boolean = false
	isListRowAction: boolean
	isShow: boolean = false
	name: string
	constructor(rawAction: RawDataObjActionField, state: State | undefined = undefined) {
		const clazz = 'DataObjActionField'
		this.actionFieldConfirms = rawAction.actionFieldConfirms
		this.actionFieldShows = rawAction.actionFieldShows
		this.codeActionFieldTriggerEnable = rawAction.codeActionFieldTriggerEnable
		this.codeActionFieldType = rawAction.codeActionFieldType
		this.fieldColor = rawAction.fieldColor
		this.header = rawAction.header
		this.isListRowAction = rawAction.isListRowAction
		this.name = rawAction.name
	}
	getConfirm(state: State, dataObj: DataObj) {
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
					tg.addStatus(state, dataObj, confirmAction.codeTriggerConfirmConditional, true)
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
	setFieldEmbed(fieldEmbed: FieldEmbed) {
		this.fieldEmbed = fieldEmbed
	}
	async trigger(state: State, dataObj: DataObj) {
		const { confirmType, confirm } = this.getConfirm(state, dataObj)
		state.update({
			packet: new StatePacket({
				component: StatePacketComponent.dataObj,
				confirm,
				confirmType,
				token: new TokenAppDo({
					actionType: this.codeActionFieldType,
					dataObj,
					fieldEmbed: this.fieldEmbed,
					state
				})
			})
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
	listReorder = 'listReorder',
	listReorderCancel = 'listReorderCancel',
	never = 'never',
	none = 'none',
	notObjectChanged = 'notObjectChanged',
	notReorder = 'notReorder',
	objectChanged = 'objectChanged',
	objectValidToContinue = 'objectValidToContinue',
	objectValidToSave = 'objectValidToSave',
	parentObjectSaved = 'parentObjectSaved',
	rootDataObj = 'rootDataObj',
	saveMode = 'saveMode',
	saveModeInsert = 'saveModeInsert',
	saveModeUpdate = 'saveModeUpdate'
}
export class DataObjActionFieldTriggerGroup {
	statuses: DataObjActionFieldTriggerStatus[] = []
	constructor() {}
	addStatus(
		state: State,
		dataObj: DataObj,
		trigger: DataObjActionFieldTriggerEnable,
		isRequired: boolean
	) {
		let isTriggered = false
		let rowCount: number

		switch (trigger) {
			case DataObjActionFieldTriggerEnable.always:
				isTriggered = true
				break
			case DataObjActionFieldTriggerEnable.listReorder:
				isTriggered =
					![null, undefined, ''].includes(dataObj.raw.listReorderColumn) &&
					!dataObj.modeActive(DataObjMode.ReorderOn) &&
					dataObj.data.rowsRetrieved.length > 1
				break
			case DataObjActionFieldTriggerEnable.listReorderCancel:
				isTriggered =
					![null, undefined, ''].includes(dataObj.raw.listReorderColumn) &&
					dataObj.modeActive(DataObjMode.ReorderOn)
				break
			case DataObjActionFieldTriggerEnable.never:
				isTriggered = false
				break
			case DataObjActionFieldTriggerEnable.notObjectChanged:
				isTriggered = !state.objStatus.changed()
				break
			case DataObjActionFieldTriggerEnable.notReorder:
				isTriggered = !dataObj.modeActive(DataObjMode.ReorderOn)
				break
			case DataObjActionFieldTriggerEnable.objectChanged:
				isTriggered = state.objStatus.changed()
				break
			case DataObjActionFieldTriggerEnable.objectValidToSave:
				isTriggered = state.objStatus.valid()
				break
			case DataObjActionFieldTriggerEnable.parentObjectSaved:
				isTriggered = dataObj.modeActive(DataObjMode.ParentObjectSaved)
				break
			case DataObjActionFieldTriggerEnable.rootDataObj:
				isTriggered = !dataObj.isListEmbed
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