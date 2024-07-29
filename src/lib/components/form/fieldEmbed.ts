import { State } from '$comps/app/types.appState'
import { Field, RawFieldProps } from '$comps/form/field'
import { arrayOfClasses, DataObj, DataObjActionField, DataObjData, required } from '$utils/types'
import {
	RawDataObjPropDisplayEmbedListConfig,
	RawDataObjPropDisplayEmbedListEdit,
	RawDataObjPropDisplayEmbedListSelect
} from '$comps/dataObj/types.rawDataObj'
import { error } from '@sveltejs/kit'

const FILENAME = '$comps/form/fieldEmbed.ts'

export class FieldEmbed extends Field {
	dataObj?: DataObj
	constructor(props: RawFieldProps) {
		super(props)
		const clazz = 'FieldEmbed'
	}
	async initDataObj(props: RawFieldProps) {
		let dataField = props.data.getField(props.propRaw.propName)
		if (dataField) {
			this.dataObj = await DataObj.init(props.state, dataField.rawDataObj, dataField.data)
			this.dataObj.objData = dataField.data
			this.dataObj.setIsListEmbedded()
		}
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
		const embedField = new FieldEmbedListConfig(props)
		await embedField.initDataObj(props)
		return embedField
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
		const embedField = new FieldEmbedListEdit(props)
		await embedField.initDataObj(props)
		return embedField
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
		const embedField = new FieldEmbedListSelect(props)
		await embedField.initDataObj(props)
		return embedField
	}
}
