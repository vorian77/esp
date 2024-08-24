import { Field, RawFieldProps } from '$comps/form/field'
import {
	arrayOfClasses,
	DataObj,
	DataObjDataField,
	DataObjEmbedType,
	ParmsObjType,
	required
} from '$utils/types'
import { DataObjActionField } from '$comps/dataObj/types.dataObjActionField'
import {
	RawDataObjPropDisplayEmbedListConfig,
	RawDataObjPropDisplayEmbedListEdit,
	RawDataObjPropDisplayEmbedListSelect
} from '$comps/dataObj/types.rawDataObj'
import { TokenAppDoActionFieldType } from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '$comps/form/fieldEmbed.ts'

export class FieldEmbed extends Field {
	dataObj?: DataObj
	embedParentId?: string
	embedType?: DataObjEmbedType
	constructor(props: RawFieldProps) {
		super(props)
		const clazz = 'FieldEmbed'
	}
	async initDataObj(props: RawFieldProps, embedType: DataObjEmbedType) {
		this.embedParentId = props.data.rowsRetrieved.getDetailRecordValue('id')
		this.embedType = embedType
		let dataField: DataObjDataField = props.data.getField(props.propRaw.propName)
		if (dataField) {
			this.dataObj = await DataObj.init(props.state, dataField.data)
			this.dataObj.objData = dataField.data
			this.dataObj.setIsListEmbed()
		} else {
			error(500, {
				file: FILENAME,
				function: 'initDataObj',
				message: `No data field defined for FieldEmbed: ${props.propRaw.propName}`
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
	constructor(props: RawFieldProps) {
		const clazz = 'FieldEmbedListConfig'
		super(props)
		this.raw = required(props.propRaw.fieldEmbedListConfig, clazz, 'raw')
		this.actionsFieldModal = arrayOfClasses(
			DataObjActionField,
			props.propRaw.fieldEmbedListConfig?.rawActionsFieldModal
		)
	}
	static async init(props: RawFieldProps) {
		const field = new FieldEmbedListConfig(props)
		await field.initDataObj(props, DataObjEmbedType.listConfig)
		if (field.dataObj) {
			field.dataObj.actionsFieldEmbedSet(TokenAppDoActionFieldType.embedListConfigEdit, field)
			field.dataObj.actionsFieldEmbedSet(TokenAppDoActionFieldType.embedListConfigNew, field)
		}
		return field
	}
}

export class FieldEmbedListEdit extends FieldEmbed {
	raw: RawDataObjPropDisplayEmbedListEdit
	constructor(props: RawFieldProps) {
		const clazz = 'FieldEmbedListEdit'
		super(props)
		this.raw = required(props.propRaw.fieldEmbedListEdit, clazz, 'raw')
	}
	static async init(props: RawFieldProps) {
		const field = new FieldEmbedListEdit(props)
		await field.initDataObj(props, DataObjEmbedType.listEdit)
		return field
	}
	getStatus(dataObjForm: DataObj, recordId: string) {
		if (this.dataObj) {
			return this.dataObj.setStatus()
		} else {
			error(500, {
				file: FILENAME,
				function: 'getStatus',
				message: `No data object defined for FieldEmbedListEdit: ${this.colDO.propName}`
			})
		}
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
	static async init(props: RawFieldProps) {
		const field = new FieldEmbedListSelect(props)
		await field.initDataObj(props, DataObjEmbedType.listSelect)
		if (field.dataObj) {
			field.dataObj.actionsFieldEmbedSet(TokenAppDoActionFieldType.embedListSelect, field)
		}
		return field
	}
}
