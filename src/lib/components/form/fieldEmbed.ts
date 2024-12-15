import { Field, PropsField, PropsFieldRaw } from '$comps/form/field'
import {
	arrayOfClass,
	DataObj,
	DataObjDataField,
	DataObjEmbedType,
	ParmsValuesType,
	required,
	strRequired
} from '$utils/types'
import { DataObjActionField } from '$comps/dataObj/types.dataObjActionField'
import {
	RawDataObjPropDisplayEmbedListConfig,
	RawDataObjPropDisplayEmbedListEdit,
	RawDataObjPropDisplayEmbedListSelect
} from '$comps/dataObj/types.rawDataObj'
import { error } from '@sveltejs/kit'

const FILENAME = '$comps/form/fieldEmbed.ts'

export class FieldEmbed extends Field {
	dataObj?: DataObj
	embedParentId: string
	embedType: DataObjEmbedType
	constructor(props: PropsFieldRaw, embedType: DataObjEmbedType) {
		super(props)
		const clazz = `${FILENAME}.FieldEmbed`
		this.embedParentId = strRequired(
			props.dataObj.data.rowsRetrieved.getDetailRecordValue('id'),
			clazz,
			'embedParentId'
		)
		this.embedType = embedType
	}

	async initDataObj(props: PropsField) {
		const clazz = `${FILENAME}.FieldEmbed`

		let dataField: DataObjDataField = props.dataObj.data.getField(this.colDO.propName)
		if (dataField) {
			this.dataObj = await props.dataObj.initEmbed(props.state, dataField.data, this)
			this.dataObj.objData = dataField.data
			this.dataObj.data.parms.valueSetList(
				ParmsValuesType.listIds,
				dataField.data.rowsRetrieved.dataRows
			)
		} else {
			error(500, {
				file: FILENAME,
				function: `${clazz}.initDataObj`,
				message: `No data field defined for FieldEmbed: ${this.colDO.propName}`
			})
		}
	}
	modeReset(): void {
		if (this.dataObj) this.dataObj.modeReset()
	}
}
export class FieldEmbedListConfig extends FieldEmbed {
	actionsFieldModal: DataObjActionField[]
	raw: RawDataObjPropDisplayEmbedListConfig
	constructor(props: PropsFieldRaw) {
		const clazz = 'FieldEmbedListConfig'
		super(props, DataObjEmbedType.listConfig)
		this.raw = required(props.propRaw.fieldEmbedListConfig, clazz, 'raw')
		this.actionsFieldModal = arrayOfClass(
			DataObjActionField,
			props.propRaw.fieldEmbedListConfig?.rawActionsFieldModal
		)
	}
	async init(props: PropsField) {
		await this.initDataObj(props)
	}
}

export class FieldEmbedListEdit extends FieldEmbed {
	raw: RawDataObjPropDisplayEmbedListEdit
	constructor(props: PropsFieldRaw) {
		const clazz = 'FieldEmbedListEdit'
		super(props, DataObjEmbedType.listEdit)
		this.raw = required(props.propRaw.fieldEmbedListEdit, clazz, 'raw')
	}
	async init(props: PropsField) {
		await this.initDataObj(props)
	}
}

export class FieldEmbedListSelect extends FieldEmbed {
	actionsFieldModal: DataObjActionField[]
	raw: RawDataObjPropDisplayEmbedListSelect
	constructor(props: PropsFieldRaw) {
		const clazz = 'FieldEmbedListSelect'
		super(props, DataObjEmbedType.listSelect)
		this.raw = required(props.propRaw.fieldEmbedListSelect, clazz, 'raw')
		this.actionsFieldModal = arrayOfClass(
			DataObjActionField,
			props.propRaw.fieldEmbedListSelect?.rawActionsFieldModal
		)
	}
	async init(props: PropsField) {
		await this.initDataObj(props)
	}
}
