import {
	RawFieldEmbedDetailEligibility,
	RawFieldEmbedDetailEligibilityNode,
	RawFieldEmbedList,
	RawDataObj,
	RawDataObjPropDisplay
} from '$comps/dataObj/types.rawDataObj.svelte'
import {
	Field,
	FieldClassType,
	FieldElement,
	PropsFieldCreate,
	PropsFieldInit
} from '$comps/form/field.svelte'
import {
	arrayOfClass,
	DataManagerNode,
	DataObj,
	DataObjAction,
	DataObjData,
	FieldEmbedListType,
	getArray,
	MethodResult,
	RawDataObjAction,
	recordValueGet,
	required,
	strOptional,
	strRequired
} from '$utils/types'
import { TokenApiDbDataObjSource, TokenApiQueryData } from '$utils/types.token'
import { getDetailElements, DetailEl } from '$comps/form/types.detailElement'

import { error } from '@sveltejs/kit'

const FILENAME = '$comps/form/fieldEmbed.ts'

export class FieldEmbedDetail extends Field {
	constructor(props: PropsFieldCreate) {
		const clazz = `${FILENAME}.FieldEmbedDetail`
		super(props)
	}
}

export class FieldEmbedDetailEligibility extends FieldEmbedDetail {
	_rawField: RawFieldEmbedDetailEligibility
	elements: DetailEl[] = []
	constructor(
		propsFieldInit: PropsFieldInit,
		propRaw: RawDataObjPropDisplay,
		props: PropsFieldCreate
	) {
		//
		super(props)
		this._rawField = new RawFieldEmbedDetailEligibility(
			props.propRaw.rawfieldEmbedDetailEligibility?._objRaw
		)
		const propName = this._rawField.getPropName('08bfcd8a-6b50-11f0-ba11-c7a0fab21b40')
		const renderFields = this.initFields(propsFieldInit, propRaw)
		this.elements = getDetailElements(renderFields)
	}

	initFields(propsFieldInit: PropsFieldInit, propRaw: RawDataObjPropDisplay) {
		let fields: Field[] = []
		for (let i = 0; i < this._rawField.renderPropsRaw.length; i++) {
			const p: RawDataObjPropDisplay = this._rawField.renderPropsRaw[i]
			if (p.rawFieldElement === FieldElement.toggle) {
				p.rawfieldEmbedDetailEligibility = this._rawField
			}
			let result: MethodResult = DataObj.fieldsCreateItem(propsFieldInit, p)
			if (result.error) return fields
			const field: Field = result.data
			fields.push(field)
		}
		return fields
	}
}

export class FieldEmbedList extends Field {
	_parentPropRaw: RawDataObjPropDisplay
	embedData: DataObjData = new DataObjData()
	embedDataObj?: DataObj
	parentDataObjId: string
	rawFieldEmbedList: RawFieldEmbedList
	constructor(
		parentDataObjId: string,
		parentPropRaw: RawDataObjPropDisplay,
		embedData: DataObjData
	) {
		const clazz = `${FILENAME}.FieldEmbedList`
		super(new PropsFieldCreate({ propRaw: parentPropRaw }))
		this._parentPropRaw = required(parentPropRaw, clazz, 'parentPropRaw')
		this.classType = FieldClassType.embed
		this.parentDataObjId = parentDataObjId
		this.rawFieldEmbedList = required(parentPropRaw?.rawFieldEmbedList, clazz, 'FieldEmbedList')
		this.embedData = embedData
	}

	getActionsModal(actionsDb: any[]) {
		actionsDb = getArray(actionsDb)
		const acttionsModalRaw = arrayOfClass(RawDataObjAction, actionsDb)
		return arrayOfClass(DataObjAction, acttionsModalRaw)
	}

	static async getEmbedData(
		propRaw: RawDataObjPropDisplay,
		queryData: TokenApiQueryData,
		fGetRawDataObj: Function
	): Promise<MethodResult> {
		const clazz = `${FILENAME}.getEmbedData`
		// retrieve embedRawDataObj
		const rawFieldEmbedList = required(propRaw.rawFieldEmbedList, clazz, '')
		const embedDataObjId = strRequired(
			rawFieldEmbedList?.embedDataObjId,
			FILENAME,
			'embedDataObjId'
		)
		const detached =
			rawFieldEmbedList.embedTable.object === rawFieldEmbedList.parentTableRoot.object
				? 'DETACHED '
				: ''
		const exprFilter = `.id IN (SELECT ${detached}${rawFieldEmbedList.parentTableRoot.object} FILTER .id = <tree,uuid,treeAncestorValue.table.${rawFieldEmbedList.parentTableRoot.name}>).${rawFieldEmbedList.embedPropName}.id`

		let result: MethodResult = await fGetRawDataObj(
			new TokenApiDbDataObjSource({
				dataObjId: embedDataObjId,
				exprFilter
			}),
			queryData
		)
		if (result.error) return result
		const embedRawDataObj: RawDataObj = result.data
		const embedData = new DataObjData(embedRawDataObj)
		return new MethodResult(embedData)
	}

	async initAsync(props: PropsFieldInit): Promise<MethodResult> {
		const dataField = props.data.fields.find(
			(f: FieldEmbedList) =>
				f.rawFieldEmbedList.embedPropName === this.rawFieldEmbedList.embedPropName
		)
		if (dataField) {
			let result: MethodResult = await DataObj.load(props.sm, dataField.embedData)
			if (result.error) return result
			this.embedDataObj = result.data as DataObj
			this.embedDataObj.embedFieldSet(this)
			return new MethodResult()
		} else {
			return new MethodResult({
				error: {
					file: FILENAME,
					function: 'initAsync',
					msg: `Unable to find embedfield: ${this.rawFieldEmbedList.embedPropName}`
				}
			})
		}
	}

	static loadFields(fieldsOld: FieldEmbedList[], dataObjDataParent: DataObjData): MethodResult {
		const clazz = `${FILENAME}.loadFields`
		let fieldsNew: FieldEmbedList[] = []

		if (dataObjDataParent.rawDataObj) {
			const parentRawDataObj = required(dataObjDataParent.rawDataObj, clazz, 'rawDataObjParent')

			fieldsOld.forEach((field) => {
				let FieldEmbedClass: any = undefined
				if (field.colDO.fieldEmbedListType) {
					if (field.colDO.fieldEmbedListType === FieldEmbedListType.listConfig) {
						FieldEmbedClass = FieldEmbedListConfig
					} else if (field.colDO.fieldEmbedListType === FieldEmbedListType.listEdit) {
						FieldEmbedClass = FieldEmbedListEdit
					} else if (field.colDO.fieldEmbedListType === FieldEmbedListType.listSelect) {
						FieldEmbedClass = FieldEmbedListSelect
					}

					let parentPropRaw = field._parentPropRaw
					parentPropRaw.rawFieldEmbedList = new RawFieldEmbedList(field.rawFieldEmbedList._objRaw)

					let result: MethodResult = DataObjData.load(field.embedData)
					if (result.error) return result
					const embedData = result.data

					const newField = new FieldEmbedClass(parentRawDataObj.id, parentPropRaw, embedData)
					fieldsNew.push(newField)
				}
			})
		}
		return new MethodResult(fieldsNew)
	}
}

export class FieldEmbedListConfig extends FieldEmbedList {
	actionsModal: DataObjAction[]
	dataObjModalId: string
	constructor(
		parentDataObjId: string,
		parentPropRaw: RawDataObjPropDisplay,
		embedData: DataObjData
	) {
		const clazz = 'FieldEmbedListConfig'
		super(parentDataObjId, parentPropRaw, embedData)
		this.actionsModal = this.getActionsModal(
			this.rawFieldEmbedList._objRaw._actionGroupModal._dataObjActions
		)
		this.dataObjModalId = strRequired(
			this.rawFieldEmbedList._objRaw._dataObjModalId,
			clazz,
			'_dataObjIdModal'
		)
	}
}

export class FieldEmbedListEdit extends FieldEmbedList {
	constructor(
		parentDataObjId: string,
		parentPropRaw: RawDataObjPropDisplay,
		embedData: DataObjData
	) {
		const clazz = 'FieldEmbedListEdit'
		super(parentDataObjId, parentPropRaw, embedData)
	}
}

export class FieldEmbedListSelect extends FieldEmbedList {
	actionsModal: DataObjAction[]
	btnLabelComplete?: string
	dataObjListID: string
	constructor(
		parentDataObjId: string,
		parentPropRaw: RawDataObjPropDisplay,
		embedData: DataObjData
	) {
		const clazz = 'FieldEmbedListSelect'
		super(parentDataObjId, parentPropRaw, embedData)
		this.actionsModal = this.getActionsModal(
			this.rawFieldEmbedList._objRaw._actionGroupModal._dataObjActions
		)
		this.dataObjListID = strRequired(
			this.rawFieldEmbedList._objRaw._dataObjListId,
			clazz,
			'_dataObjId'
		)

		// dependent
		this.btnLabelComplete = this.initBtnComplete(
			clazz,
			this.rawFieldEmbedList._objRaw.btnLabelComplete,
			this.actionsModal
		)
	}
	initBtnComplete(clazz: string, label: string | undefined, actionsModal: DataObjAction[]) {
		const btnLabelComplete = strOptional(label, clazz, 'btnLabelComplete')
		if (btnLabelComplete) {
			const dataObjActionDone = actionsModal.find((doa) => {
				return doa.action.name === 'ua_sys_dialog_done'
			})
			if (dataObjActionDone) dataObjActionDone.action.header = btnLabelComplete
		}
		return btnLabelComplete
	}
}

export class FieldEmbedShell extends Field {
	classType: FieldClassType = FieldClassType.embedShell
	fields: FieldEmbedList[] = []
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
	addField(field: FieldEmbedList) {
		this.fields.push(field)
	}

	async initAsync(props: PropsFieldInit): Promise<MethodResult> {
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
