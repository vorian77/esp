import { Field, FieldAccess } from '$comps/form/field'
import {
	debug,
	DataObj,
	DataObjActionField,
	memberOfEnum,
	required,
	valueOrDefault
} from '$utils/types'
import {
	RawDataObjPropDisplay,
	RawDataObjPropDisplayEmbedDetail,
	RawDataObjPropDisplayEmbedListConfig,
	RawDataObjPropDisplayEmbedListEdit,
	RawDataObjPropDisplayEmbedListSelect
} from '$comps/dataObj/types.rawDataObj'
import { strOptional, strRequired } from '$utils/utils'

export class FieldEmbed extends Field {
	constructor(propRaw: RawDataObjPropDisplay, index: number, isFirstVisible: boolean) {
		const clazz = 'FieldEmbed'
		super(propRaw, index, isFirstVisible)
		this.colDO.fieldAccess = FieldAccess.optional
	}
}

export class FieldEmbedDetail extends FieldEmbed {
	raw: RawDataObjPropDisplayEmbedDetail
	constructor(propRaw: RawDataObjPropDisplay, index: number, isFirstVisible: boolean) {
		const clazz = 'FieldEmbedDetail'
		super(propRaw, index, isFirstVisible)
		this.raw = required(propRaw.fieldEmbedDetail, clazz, 'raw')
	}
}

export class FieldEmbedListConfig extends FieldEmbed {
	raw: RawDataObjPropDisplayEmbedListConfig
	constructor(propRaw: RawDataObjPropDisplay, index: number, isFirstVisible: boolean) {
		const clazz = 'FieldEmbedListConfig'
		super(propRaw, index, isFirstVisible)
		this.raw = required(propRaw.fieldEmbedListConfig, clazz, 'raw')
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
	raw: RawDataObjPropDisplayEmbedListSelect
	constructor(propRaw: RawDataObjPropDisplay, index: number, isFirstVisible: boolean) {
		const clazz = 'FieldEmbedListSelect'
		super(propRaw, index, isFirstVisible)
		this.raw = required(propRaw.fieldEmbedListSelect, clazz, 'raw')
	}
}
