import { RawDataObj, RawDataObjPropDisplay } from '$comps/dataObj/types.rawDataObj.svelte'
import { Field, FieldClassType, PropsFieldCreate, PropsFieldInit } from '$comps/form/field.svelte'
import { DbTable } from '$lib/query/types.query'
import {
	arrayOfClass,
	DataObj,
	DataObjAction,
	DataObjData,
	FieldEmbedType,
	MethodResult,
	required,
	strOptional,
	strRequired
} from '$utils/types'
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
	embedTable: DbTable
	embedType: FieldEmbedType
	parentTable: DbTable
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
		this.embedTable = new DbTable(FieldEmbed.getTableRaw(dataEmbed.rawDataObj))

		this.dataObjIdParent = strRequired(rawDataObjParent.id, clazz, 'dataObjIdParent')
		this.parentTable = new DbTable(FieldEmbed.getTableRaw(rawDataObjParent))
	}
	getFieldServer(data: DataObjData, fieldName: string) {
		return required(
			data.fields.find((field) => field.colDO.propName === fieldName),
			`${FILENAME}.getFieldServer`,
			'fieldServer'
		)
	}
	static getTableRaw(rawDataObj?: RawDataObj) {
		const tableRoot = rawDataObj?.tableGroup?.getTable(0)
		if (tableRoot) return tableRoot
		error(500, {
			file: FILENAME,
			function: 'getTable',
			msg: `Cannot find root table of dataObj: ${rawDataObj?.name}`
		})
	}

	static initField(
		rawDataObjParent: RawDataObj,
		propRaw: RawDataObjPropDisplay,
		dataEmbed: DataObjData,
		FieldEmbedClass: any
	): MethodResult {
		return new MethodResult(new FieldEmbedClass(rawDataObjParent, propRaw, dataEmbed))
	}

	static async initFieldClient(
		propsFieldInit: PropsFieldInit,
		propsRaw: PropsFieldCreate,
		FieldEmbedClass: any
	): Promise<MethodResult> {
		const clazz = `${FILENAME}.initFieldClient`
		const rawDataObjParent = required(
			propsFieldInit.data.rawDataObj,
			clazz,
			'propsFieldInit.data.rawDataObj'
		)
		const fieldsEmbedded = required(propsFieldInit.data.fields, clazz, 'propsFieldInit.data.fields')
		const fieldEmbedServer: FieldEmbed = required(
			fieldsEmbedded.find((p: FieldEmbed) => p.embedFieldNameRaw === propsRaw.propRaw.propNameRaw),
			clazz,
			'fieldEmbedServer'
		)

		let result: MethodResult = FieldEmbed.initField(
			rawDataObjParent,
			propsRaw.propRaw,
			fieldEmbedServer.data,
			FieldEmbedClass
		)
		if (result.error) return result
		const newField: FieldEmbed = result.data

		result = await DataObj.init(propsFieldInit.sm, newField.data)
		if (result.error) return result
		newField.dataObjEmbed = result.data as DataObj

		newField.dataObjEmbed.embedFieldSet(newField)
		return new MethodResult(newField)
	}

	static initFieldsLoad(fields: FieldEmbed[], dataObjDataParent: DataObjData): MethodResult {
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

				let result: MethodResult = DataObjData.load(field.data)
				if (result.error) return result
				const fieldData: DataObjData = result.data

				result = FieldEmbed.initField(rawDataObjParent, propRawEmbed, fieldData, FieldEmbedClass)
				if (result.error) return result
				const newField: FieldEmbed = result.data
				newFields.push(newField)
			})
		}
		return new MethodResult(newFields)
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
		const parentTable = required(this.getTableRaw(rawDataObjParent), clazz, 'parentTable')
		const detached = embedTable === parentTable.object ? 'DETACHED' : ''

		let result: MethodResult = await fGetRawDataObj(
			new TokenApiDbDataObjSource({
				dataObjId: dataObjIdEmbed,
				exprFilter: `.id IN (SELECT ${detached} ${parentTable.object} FILTER .id = <tree,uuid,${parentTable.name}.id>).${propRaw.propNameRaw}.id`
			}),
			queryData
		)
		if (result.error) return result
		const rawDataObjEmbed = result.data as RawDataObj

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

export class FieldEmbedShell extends Field {
	classType: FieldClassType = FieldClassType.embedShell
	fields: FieldEmbed[] = []
	// stateShell: StateSurfaceEmbedShell
	constructor(props: PropsFieldCreate) {
		const clazz = 'FieldEmbedShell'
		super(props)
		const dataObj = required(props.parms.dataObj, clazz, 'dataObj')

		// this.stateShell = new StateSurfaceEmbedShell({
		// 	action: CodeActionType.embedShell,
		// 	dataObjState: dataObj,
		// 	embedField: this
		// })
	}
	addField(field: FieldEmbed) {
		this.fields.push(field)
	}

	async init(props: PropsFieldInit): Promise<MethodResult> {
		const EMBED_FIELD_TYPES = [FieldEmbedListConfig, FieldEmbedListEdit, FieldEmbedListSelect]
		props.fields.forEach((field) => {
			EMBED_FIELD_TYPES.forEach((type) => {
				if (field instanceof type) {
					this.addField(field)
				}
			})
		})
		// await this.stateShell.app.addLevelEmbedShellForm(this)
		return new MethodResult()
	}
}
