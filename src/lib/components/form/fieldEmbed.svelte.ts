import { State } from '$comps/app/types.state.svelte'
import {
	RawFieldEmbedList,
	RawDataObj,
	RawDataObjPropDisplay
} from '$comps/dataObj/types.rawDataObj.svelte'
import {
	Field,
	FieldClassType,
	PropsFieldCreate,
	PropsFieldInit,
	FieldItemChangeManagerItem
} from '$comps/form/field.svelte'
import {
	arrayOfClass,
	DataManagerNode,
	DataObj,
	DataObjAction,
	DataObjData,
	DataObjStatus,
	type DataRecord,
	FieldEmbedListType,
	getArray,
	getValueData,
	MethodResult,
	RawDataObjAction,
	recordValueGet,
	required,
	strOptional,
	strRequired
} from '$utils/types'
import {
	Eligibility,
	type EligibilityNodeItem,
	EligibilityType
} from '$comps/form/types.Eligibility'
import {
	TokenApiDbDataObjSource,
	TokenApiId,
	TokenApiQueryData,
	TokenApiQueryDataTree,
	TokenApiQueryDataTreeAccessType
} from '$utils/types.token'
import { getDetailElements, DetailEl } from '$comps/form/types.detailElement'
import { FieldToggle } from '$comps/form/fieldToggle'
import { apiFetchFunction, ApiFunction } from '$routes/api/api'
import { error } from '@sveltejs/kit'

const FILENAME = '$comps/form/fieldEmbed.ts'

export class FieldEmbed extends Field {
	constructor(props: PropsFieldCreate) {
		const clazz = `${FILENAME}.FieldEmbed`
		super(props)
	}
}

export class FieldEmbedDetail extends FieldEmbed {
	constructor(props: PropsFieldCreate) {
		const clazz = `${FILENAME}.FieldEmbedDetail`
		super(props)
	}
}

export class FieldEmbedDetailEligibility extends FieldEmbedDetail {
	elements: DetailEl[] = $state([])
	eligibility?: Eligibility = $state()
	sm: State
	constructor(
		propsFieldInit: PropsFieldInit,
		propRaw: RawDataObjPropDisplay,
		props: PropsFieldCreate
	) {
		super(props)
		this.sm = propsFieldInit.sm
	}
	altProcessInitItemChange = async (dmn: DataManagerNode, row: number, record: DataRecord) => {
		if (this.eligibility) {
			await dmn.initDataObjItemChangesFields(row, record, this.eligibility.fields)
		}
	}
	altProcessSetStatus = (dmn: DataManagerNode, recordId: string, newStatus: DataObjStatus) => {
		const clazz = 'FieldEmbedDetailEligibility.altProcessSetStatus'
		if (this.eligibility) {
			this.eligibility.nodes.forEach((node) => {
				if (
					[EligibilityType.eligibilityExpr, EligibilityType.eligibilityManual].includes(
						node.codeEligibilityType
					)
				) {
					const propNameKey = strRequired(node.propNameKey, clazz, 'propNameKey')
					newStatus.update(dmn.setStatusField(recordId, propNameKey))
				}
			})
		}
	}

	altProcessSave = (valueData: any) => {
		let valueReturn: EligibilityNodeItem[] = []
		if (this.eligibility) {
			this.eligibility.nodes
				.filter((node) => node.codeEligibilityType === EligibilityType.eligibilityManual)
				.forEach((node) => {
					const value = recordValueGet(valueData, node.name)
					if (value !== undefined) {
						valueReturn.push(value)
					}
				})
		}
		return valueReturn
	}

	async initAsync(props: PropsFieldInit): Promise<MethodResult> {
		const getCsfId = (): MethodResult => {
			const dataTree: TokenApiQueryDataTree = props.sm.appGetDataTree(false)
			const id = dataTree.getValue(
				'id',
				TokenApiQueryDataTreeAccessType.table,
				'CmClientServiceFlow'
			)
			return id
				? new MethodResult(id)
				: new MethodResult({
						error: {
							file: FILENAME,
							function: 'FieldEmbedDetailEligibility.initAsync',
							msg: `Unable to find CmClientServiceFlow.id in DataTree.`
						}
					})
		}

		const setDataEligibility = async (csfId: string): Promise<MethodResult> => {
			let result: MethodResult = await apiFetchFunction(
				ApiFunction.dbGelGetEligibility,
				new TokenApiId(csfId)
			)
			if (result.error) return result
			const rawEligibility = result.data

			if (rawEligibility) {
				this.eligibility = new Eligibility({ ...rawEligibility, sm: this.sm })
				this.elements = getDetailElements(this.eligibility.fields)
			} else {
				this.elements = []
				this.eligibility = undefined
			}

			return new MethodResult()
		}

		// initAsync
		let result: MethodResult = getCsfId()
		if (result.error) return result
		const csfId: string = result.data
		if (csfId) {
			result = await setDataEligibility(csfId)
			if (result.error) return result
			if (this.eligibility) return await this.eligibility.retrieve(props, csfId)
		}
		return new MethodResult()
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
		const clazz = 'FieldEmbedList'
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
