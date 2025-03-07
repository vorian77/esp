import { State } from '$comps/app/types.appState.svelte'
import { Field, FieldClassType, FieldEmbedType, PropsFieldCreate } from '$comps/form/field.svelte'
import {
	arrayOfClass,
	DataObj,
	DataObjAction,
	DataObjData,
	DBTable,
	required,
	strOptional,
	strRequired
} from '$utils/types'
import { RawDataObj, RawDataObjPropDisplay } from '$comps/dataObj/types.rawDataObj.svelte'
import { TokenApiDbDataObjSource, TokenApiQueryData } from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '$comps/form/fieldEmbed.ts'

export class FieldEmbed extends Field {
	columnBacklink?: string

	data: DataObjData = new DataObjData()
	dataObjEmbed?: DataObj
	dataObjIdEmbed: string
	dataObjIdParent: string
	embedFieldName: string
	embedFieldNameRaw: string
	embedTable: DBTable
	embedType: FieldEmbedType
	parentTable: DBTable
	constructor(
		rawDataObjParent: RawDataObj,
		propRawEmbed: RawDataObjPropDisplay,
		dataEmbed: DataObjData,
		embedType: FieldEmbedType
	) {
		const clazz = `${FILENAME}.FieldEmbed`
		super(new PropsFieldCreate({ propRaw: propRawEmbed }))
		this.columnBacklink = strOptional(propRawEmbed.columnBacklink, clazz, 'columnBacklink')

		this.classType = FieldClassType.embed
		this.embedType = embedType

		this.data = dataEmbed
		this.dataObjIdEmbed = strRequired(dataEmbed.rawDataObj?.id, clazz, 'dataObjIdEmbed')
		this.embedFieldName = strRequired(propRawEmbed.propName, clazz, 'embedFieldName')
		this.embedFieldNameRaw = strRequired(propRawEmbed.propNameRaw, clazz, 'embedFieldNameRaw')
		this.embedTable = new DBTable(FieldEmbed.getTable(dataEmbed.rawDataObj))

		this.dataObjIdParent = strRequired(rawDataObjParent.id, clazz, 'dataObjIdParent')
		this.parentTable = new DBTable(FieldEmbed.getTable(rawDataObjParent))
	}
	getFieldServer(data: DataObjData, fieldName: string) {
		return required(
			data.fields.find((field) => field.colDO.propName === fieldName),
			`${FILENAME}.getFieldServer`,
			'fieldServer'
		)
	}
	static getTable(rawDataObj?: RawDataObj) {
		if (rawDataObj && rawDataObj.tables) return rawDataObj.tables[0].table
		error(500, {
			file: FILENAME,
			function: 'getTable',
			message: `Cannot determine root table of dataObj: ${rawDataObj?.name}`
		})
	}

	static initField(
		rawDataObjParent: RawDataObj,
		propRaw: RawDataObjPropDisplay,
		dataEmbed: DataObjData,
		FieldEmbedClass: any
	) {
		return new FieldEmbedClass(rawDataObjParent, propRaw, dataEmbed)
	}

	static async initFieldClient(
		sm: State,
		propsRaw: PropsFieldCreate,
		dataObjParent: DataObj,
		FieldEmbedClass: any
	) {
		const clazz = `${FILENAME}.initFieldClient`
		const rawDataObjParent = required(dataObjParent.data.rawDataObj, clazz, 'rawDataObjParent')
		const fieldsEmbedded = required(dataObjParent.data.fields, clazz, 'fields')
		const fieldEmbedServer: FieldEmbed = required(
			fieldsEmbedded.find((p: FieldEmbed) => p.embedFieldNameRaw === propsRaw.propRaw.propNameRaw),
			clazz,
			'fieldEmbedServer'
		)
		const newField = FieldEmbed.initField(
			rawDataObjParent,
			propsRaw.propRaw,
			fieldEmbedServer.data,
			FieldEmbedClass
		)
		newField.dataObjEmbed = await DataObj.init(sm, newField.data)
		newField.dataObjEmbed.embedFieldSet(newField)
		return newField
	}

	static initFieldsLoad(fields: FieldEmbed[], dataObjDataParent: DataObjData) {
		const clazz = `${FILENAME}.initFieldsLoad`
		let newFields: FieldEmbed[] = []
		if (dataObjDataParent.rawDataObj) {
			const rawDataObjParent = required(dataObjDataParent.rawDataObj, clazz, 'rawDataObjParent')
			fields.forEach((field) => {
				const propRawEmbed = required(
					dataObjDataParent.rawDataObj?.rawPropsDisplay.find((p) => {
						return p.propNameRaw === field.embedFieldNameRaw
					}),
					clazz,
					'propRawEmbed'
				)

				let FieldEmbedClass: any = undefined
				if (field.embedType === FieldEmbedType.listConfig) {
					FieldEmbedClass = FieldEmbedListConfig
				} else if (field.embedType === FieldEmbedType.listEdit) {
					FieldEmbedClass = FieldEmbedListEdit
				} else if (field.embedType === FieldEmbedType.listSelect) {
					FieldEmbedClass = FieldEmbedListSelect
				}

				newFields.push(
					FieldEmbed.initField(
						rawDataObjParent,
						propRawEmbed,
						DataObjData.load(field.data),
						FieldEmbedClass
					)
				)
			})
		}
		return newFields
	}

	static async initFieldServer(
		rawDataObjParent: RawDataObj,
		queryData: TokenApiQueryData,
		propRaw: RawDataObjPropDisplay,
		FieldEmbedClass: any,
		fGetRawDataObj: Function
	) {
		const clazz = `${FILENAME}.initFieldServer`
		const dataObjIdEmbed = strRequired(propRaw.fieldEmbed?.id, clazz, 'dataObjIdEmbed')
		const embedTable = propRaw.link?.getTableObj()
		const parentTable = this.getTable(rawDataObjParent)
		const detached = embedTable === parentTable.object ? 'DETACHED' : ''
		const rawDataObjEmbed = await fGetRawDataObj(
			new TokenApiDbDataObjSource({
				dataObjId: dataObjIdEmbed,
				exprFilter: `.id IN (SELECT ${detached} ${parentTable.object} FILTER .id = <tree,uuid,${parentTable.name}.id>).${propRaw.propNameRaw}.id`
			}),
			queryData
		)
		const dataEmbed = new DataObjData(rawDataObjEmbed)
		return FieldEmbed.initField(rawDataObjParent, propRaw, dataEmbed, FieldEmbedClass)
	}
}

export class FieldEmbedListConfig extends FieldEmbed {
	actionsModal: DataObjAction[]
	dataObjModalId: string
	constructor(
		rawDataObjParent: RawDataObj,
		propRawEmbed: RawDataObjPropDisplay,
		dataEmbed: DataObjData
	) {
		const clazz = 'FieldEmbedListConfig'
		super(rawDataObjParent, propRawEmbed, dataEmbed, FieldEmbedType.listConfig)
		this.actionsModal = arrayOfClass(
			DataObjAction,
			propRawEmbed.fieldEmbedListConfig?.rawActionsModal
		)
		this.dataObjModalId = strRequired(
			propRawEmbed.fieldEmbedListConfig?.dataObjModalId,
			clazz,
			'dataObjModalId'
		)
	}
}

export class FieldEmbedListEdit extends FieldEmbed {
	constructor(
		rawDataObjParent: RawDataObj,
		propRawEmbed: RawDataObjPropDisplay,
		dataEmbed: DataObjData
	) {
		const clazz = 'FieldEmbedListEdit'
		super(rawDataObjParent, propRawEmbed, dataEmbed, FieldEmbedType.listEdit)
	}
}

export class FieldEmbedListSelect extends FieldEmbed {
	actionsModal: DataObjAction[]
	btnLabelComplete?: string
	dataObjListID: string
	exprFilter: string
	constructor(
		rawDataObjParent: RawDataObj,
		propRawEmbed: RawDataObjPropDisplay,
		dataEmbed: DataObjData
	) {
		const clazz = 'FieldEmbedListSelect'
		super(rawDataObjParent, propRawEmbed, dataEmbed, FieldEmbedType.listSelect)
		this.actionsModal = arrayOfClass(
			DataObjAction,
			propRawEmbed.fieldEmbedListSelect?.rawActionsModal
		)
		this.btnLabelComplete = strOptional(
			propRawEmbed.fieldEmbedListSelect?.btnLabelComplete,
			clazz,
			'btnLabelComplete'
		)
		this.dataObjListID = strRequired(
			propRawEmbed.fieldEmbedListSelect?.dataObjListID,
			clazz,
			'dataObjListID'
		)
		this.exprFilter = `SELECT ${this.embedTable.object} FILTER .id IN <parms,uuidlist,listIdsSelected>`
	}
}
