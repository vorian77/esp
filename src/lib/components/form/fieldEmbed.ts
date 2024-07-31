import { State, StateLayoutStyle } from '$comps/app/types.appState'
import { Field, RawFieldProps } from '$comps/form/field'
import {
	arrayOfClasses,
	DataObj,
	DataObjActionField,
	DataObjCardinality,
	DataObjMode,
	type DataRecord,
	required
} from '$utils/types'
import {
	RawDataObjPropDisplayEmbedListConfig,
	RawDataObjPropDisplayEmbedListEdit,
	RawDataObjPropDisplayEmbedListSelect
} from '$comps/dataObj/types.rawDataObj'
import {
	TokenApiDbDataObjSource,
	TokenApiQueryType,
	TokenAppDoActionFieldType,
	TokenAppDoActionConfirmType,
	TokenAppModalReturnType
} from '$utils/types.token'
import { RawDataObjParent } from '$comps/dataObj/types.rawDataObj'
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
	modeReset(): void {
		if (this.dataObj) this.dataObj.modeReset()
	}
}
export class FieldEmbedListConfig extends FieldEmbed {
	actionsFieldModal: DataObjActionField[]
	exprFilterEmbed: string = ''
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
		if (embedField.dataObj) {
			embedField.exprFilterEmbed = `.id IN (SELECT ${embedField.dataObj.rootTable?.object} FILTER .id = <parms,uuid,listRecordIdParent>).${embedField.colDO.propName}.id`
		}
		console.log('FieldEmbedListConfig.init', embedField)
		return embedField
	}

	openModalEdit(parms: any) {
		const state = required(parms.state, 'FormElEmbedListConfig.openModalEdit', 'state')
		this.openModal(state, TokenApiQueryType.retrieve)
	}

	openModalNew(parms: any) {
		const state = required(parms.state, 'FormElEmbedListConfig.openModalNew', 'state')
		this.openModal(state, TokenApiQueryType.preset)
	}

	openModal(state: State, queryType: TokenApiQueryType) {
		const rootTable = required(this.dataObj?.rootTable, `${FILENAME}.openModal`, 'rootTable')
		state.openModalEmbed(
			this.actionsFieldModal,
			DataObjCardinality.detail,
			new TokenApiDbDataObjSource({
				dataObjId: this.raw.dataObjEmbedId,
				exprFilter: this.exprFilterEmbed
			}),
			new TokenApiDbDataObjSource({
				dataObjId: this.raw.dataObjModalId,
				parent: new RawDataObjParent({
					_columnName: this.colDO.propName,
					_columnIsMultiSelect: true,
					_table: rootTable
				})
			}),
			StateLayoutStyle.overlayModalDetail,
			state.dataQuery.valueGetAll(),
			queryType,
			this.fUpdate
		)
	}
	fUpdate(returnType: TokenAppModalReturnType, value: any = undefined) {
		value = value ? value.valueGetIdList() : undefined
		// setStateEmbed(value ? value : [])
	}

	async updateCallback(obj: any) {
		if (obj.packet.token.action === TokenAppDoActionFieldType.listSelfSave) {
			// fieldValue = obj.packet.token.data.dataRows.map((r: any) => r.record.id)
		}
		// stateEmbed = stateEmbed.updateProperties(obj)
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
