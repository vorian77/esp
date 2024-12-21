import { Field, FieldClassType, FieldEmbedType, PropsField, PropsFieldRaw } from '$comps/form/field'
import { arrayOfClass, required, strRequired } from '$utils/types'
import { DataObjActionField } from '$comps/dataObj/types.dataObjActionField.svelte'
import {
	RawDataObjPropDisplayEmbedListConfig,
	RawDataObjPropDisplayEmbedListEdit,
	RawDataObjPropDisplayEmbedListSelect
} from '$comps/dataObj/types.rawDataObj'

const FILENAME = '$comps/form/fieldEmbed.ts'

export class FieldEmbed extends Field {
	// dataObjParentId: string
	embedDataObjId: string
	// embedParentId: string
	// embedType: FieldEmbedType
	constructor(props: PropsFieldRaw, embedType: FieldEmbedType) {
		super(props)
		const clazz = `${FILENAME}.FieldEmbed`
		this.classType = FieldClassType.embed
		// this.dataObjParentId = strRequired(props.dataObj.raw.id, clazz, 'dataObjIdParent')
		this.embedDataObjId = strRequired(props.propRaw?.fieldEmbed?.id, clazz, 'embedDataObjId')
		// this.embedParentId = strRequired(
		// 	props.dataObj.data.rowsRetrieved.getDetailRecordValue('id'),
		// 	clazz,
		// 	'embedParentId'
		// )
		// this.embedType = embedType
	}

	async init(props: PropsField) {
		const clazz = `${FILENAME}.init`
	}
}
export class FieldEmbedListConfig extends FieldEmbed {
	actionsFieldModal: DataObjActionField[]
	raw: RawDataObjPropDisplayEmbedListConfig
	constructor(props: PropsFieldRaw) {
		const clazz = 'FieldEmbedListConfig'
		super(props, FieldEmbedType.listConfig)
		this.raw = required(props.propRaw.fieldEmbedListConfig, clazz, 'raw')
		this.actionsFieldModal = arrayOfClass(
			DataObjActionField,
			props.propRaw.fieldEmbedListConfig?.rawActionsFieldModal
		)
	}
}

export class FieldEmbedListEdit extends FieldEmbed {
	raw: RawDataObjPropDisplayEmbedListEdit
	constructor(props: PropsFieldRaw) {
		const clazz = 'FieldEmbedListEdit'
		super(props, FieldEmbedType.listEdit)
		this.raw = required(props.propRaw.fieldEmbedListEdit, clazz, 'raw')
	}
}

export class FieldEmbedListSelect extends FieldEmbed {
	actionsFieldModal: DataObjActionField[]
	raw: RawDataObjPropDisplayEmbedListSelect
	constructor(props: PropsFieldRaw) {
		const clazz = 'FieldEmbedListSelect'
		super(props, FieldEmbedType.listSelect)
		this.raw = required(props.propRaw.fieldEmbedListSelect, clazz, 'raw')
		this.actionsFieldModal = arrayOfClass(
			DataObjActionField,
			props.propRaw.fieldEmbedListSelect?.rawActionsFieldModal
		)
	}
}
