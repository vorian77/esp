import { Field, PropsField, PropsFieldRaw } from '$comps/form/field'
import {
	arrayOfClass,
	DataObj,
	DataObjDataField,
	DataObjEmbedType,
	DataObjStatus,
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
import { State, StatePacketAction } from '$comps/app/types.appState'
import { error } from '@sveltejs/kit'

const FILENAME = '$comps/form/fieldEmbed.ts'

export class FieldEmbed extends Field {
	dataObj?: DataObj
	embedParentId?: string
	embedType?: DataObjEmbedType
	constructor(props: PropsFieldRaw) {
		super(props)
	}
	getStatus(dataObjForm: DataObj, recordId: string) {
		if (this.dataObj) {
			return this.dataObj.setStatus()
		} else {
			error(500, {
				file: FILENAME,
				function: 'getStatusListEdit',
				message: `No data object defined for FieldEmbedListEdit: ${this.colDO.propName}`
			})
		}
	}
	async initDataObj(props: PropsField, embedType: DataObjEmbedType) {
		const clazz = `${FILENAME}.FieldEmbed`
		this.embedParentId = strRequired(
			props.dataObj.data.rowsRetrieved.getDetailRecordValue('id'),
			clazz,
			'embedParentId'
		)
		this.embedType = embedType
		let dataField: DataObjDataField = props.dataObj.data.getField(this.colDO.propName)
		if (dataField) {
			this.dataObj = await DataObj.init(props.state, dataField.data)
			this.dataObj.objData = dataField.data
			this.dataObj.data.parms.valueSetList(
				ParmsValuesType.listIds,
				dataField.data.rowsRetrieved.dataRows
			)
			this.dataObj.setIsListEmbed()
		} else {
			error(500, {
				file: FILENAME,
				function: 'initDataObj',
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
		super(props)
		this.raw = required(props.propRaw.fieldEmbedListConfig, clazz, 'raw')
		this.actionsFieldModal = arrayOfClass(
			DataObjActionField,
			props.propRaw.fieldEmbedListConfig?.rawActionsFieldModal
		)
	}
	async init(props: PropsField) {
		await this.initDataObj(props, DataObjEmbedType.listConfig)
		if (this.dataObj) {
			this.dataObj.actionsFieldEmbedSet(StatePacketAction.doEmbedListConfigEdit, this)
			this.dataObj.actionsFieldEmbedSet(StatePacketAction.doEmbedListConfigNew, this)
		}
	}
}

export class FieldEmbedListEdit extends FieldEmbed {
	raw: RawDataObjPropDisplayEmbedListEdit
	constructor(props: PropsFieldRaw) {
		const clazz = 'FieldEmbedListEdit'
		super(props)
		this.raw = required(props.propRaw.fieldEmbedListEdit, clazz, 'raw')
	}
	async init(props: PropsField) {
		await this.initDataObj(props, DataObjEmbedType.listEdit)
	}
}

export class FieldEmbedListSelect extends FieldEmbed {
	actionsFieldModal: DataObjActionField[]
	raw: RawDataObjPropDisplayEmbedListSelect
	constructor(props: PropsFieldRaw) {
		const clazz = 'FieldEmbedListSelect'
		super(props)
		this.raw = required(props.propRaw.fieldEmbedListSelect, clazz, 'raw')
		this.actionsFieldModal = arrayOfClass(
			DataObjActionField,
			props.propRaw.fieldEmbedListSelect?.rawActionsFieldModal
		)
	}
	async init(props: PropsField) {
		await this.initDataObj(props, DataObjEmbedType.listSelect)
		if (this.dataObj) {
			this.dataObj.actionsFieldEmbedSet(StatePacketAction.doEmbedListSelect, this)
		}
	}
}
