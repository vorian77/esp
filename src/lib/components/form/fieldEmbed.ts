import { Field, FieldAccess, RawFieldProps } from '$comps/form/field'
import { arrayOfClasses, DataObjActionField, required } from '$utils/types'
import {
	RawDataObjPropDisplayEmbedListConfig,
	RawDataObjPropDisplayEmbedListEdit,
	RawDataObjPropDisplayEmbedListSelect
} from '$comps/dataObj/types.rawDataObj'

export class FieldEmbed extends Field {
	constructor(props: RawFieldProps) {
		super(props)
		const clazz = 'FieldEmbed'
		this.fieldAccess = FieldAccess.optional
	}
}
export class FieldEmbedListConfig extends FieldEmbed {
	actionsFieldModal: DataObjActionField[]
	raw: RawDataObjPropDisplayEmbedListConfig
	constructor(props: RawFieldProps) {
		const clazz = 'FieldEmbedListConfig'
		super(props)
		this.raw = required(props.propRaw.fieldEmbedListConfig, clazz, 'raw')
		this.actionsFieldModal = arrayOfClasses(
			DataObjActionField,
			props.propRaw.fieldEmbedListConfig?.rawActionsFieldModal
		)
	}
}

export class FieldEmbedListEdit extends FieldEmbed {
	raw: RawDataObjPropDisplayEmbedListEdit
	constructor(props: RawFieldProps) {
		const clazz = 'FieldEmbedListEdit'
		super(props)
		this.raw = required(props.propRaw.fieldEmbedListEdit, clazz, 'raw')
	}
}

export class FieldEmbedListSelect extends FieldEmbed {
	actionsFieldModal: DataObjActionField[]
	raw: RawDataObjPropDisplayEmbedListSelect
	constructor(props: RawFieldProps) {
		const clazz = 'FieldEmbedListSelect'
		super(props)
		this.raw = required(props.propRaw.fieldEmbedListSelect, clazz, 'raw')
		this.actionsFieldModal = arrayOfClasses(
			DataObjActionField,
			props.propRaw.fieldEmbedListSelect?.rawActionsFieldModal
		)
	}
}
