import { FieldDisplay, FieldAccess } from '$comps/form/field'
import {
	arrayOfClasses,
	debug,
	DataObj,
	DataObjActionField,
	memberOfEnum,
	required,
	valueOrDefault
} from '$utils/types'
import {
	RawDataObjPropDisplay,
	RawDataObjPropDisplayEmbedListConfig,
	RawDataObjPropDisplayEmbedListEdit,
	RawDataObjPropDisplayEmbedListSelect
} from '$comps/dataObj/types.rawDataObj'
import { strOptional, strRequired } from '$utils/utils'

export class FieldEmbed extends FieldDisplay {
	constructor(propRaw: RawDataObjPropDisplay, index: number, isFirstVisible: boolean) {
		const clazz = 'FieldEmbed'
		super(propRaw, index, isFirstVisible)
		this.fieldAccess = FieldAccess.optional
	}
}
export class FieldEmbedListConfig extends FieldEmbed {
	actionsFieldModal: DataObjActionField[]
	raw: RawDataObjPropDisplayEmbedListConfig
	constructor(propRaw: RawDataObjPropDisplay, index: number, isFirstVisible: boolean) {
		const clazz = 'FieldEmbedListConfig'
		super(propRaw, index, isFirstVisible)
		this.raw = required(propRaw.fieldEmbedListConfig, clazz, 'raw')
		this.actionsFieldModal = arrayOfClasses(
			DataObjActionField,
			propRaw.fieldEmbedListConfig?.rawActionsFieldModal
		)
	}
}

export class FieldEmbedListEdit extends FieldEmbed {
	raw: RawDataObjPropDisplayEmbedListEdit
	constructor(propRaw: RawDataObjPropDisplay, index: number, isFirstVisible: boolean) {
		const clazz = 'FieldEmbedListEdit'
		super(propRaw, index, isFirstVisible)
		this.raw = required(propRaw.fieldEmbedListEdit, clazz, 'raw')
	}
}

export class FieldEmbedListSelect extends FieldEmbed {
	actionsFieldModal: DataObjActionField[]
	raw: RawDataObjPropDisplayEmbedListSelect
	constructor(propRaw: RawDataObjPropDisplay, index: number, isFirstVisible: boolean) {
		const clazz = 'FieldEmbedListSelect'
		super(propRaw, index, isFirstVisible)
		this.raw = required(propRaw.fieldEmbedListSelect, clazz, 'raw')
		this.actionsFieldModal = arrayOfClasses(
			DataObjActionField,
			propRaw.fieldEmbedListSelect?.rawActionsFieldModal
		)
	}
}
