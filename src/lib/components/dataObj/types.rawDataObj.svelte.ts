import { State } from '$comps/app/types.appState.svelte'
import {
	arrayOfClass,
	Attr,
	booleanOrDefault,
	booleanOrFalse,
	booleanRequired,
	classOptional,
	CodeAction,
	DataObjCardinality,
	DataObjData,
	DataObjSort,
	DataObjType,
	debug,
	FieldEmbedType,
	getArray,
	getDataRecordValueKey,
	isNumber,
	memberOfEnum,
	memberOfEnumIfExists,
	memberOfEnumOrDefault,
	nbrOrDefault,
	nbrOptional,
	nbrRequired,
	override,
	ParmsValuesType,
	required,
	strOptional,
	strRequired,
	valueOrDefault,
	MethodResult
} from '$utils/types'
import {
	DataObjComponent,
	DataObjListEditPresetType,
	DataObjProcessType,
	type DataRecord
} from '$comps/dataObj/types.dataObj.svelte'
import {
	UserAction,
	UserActionConfirm,
	UserActionShow,
	UserActionTrigger
} from '$comps/other/types.userAction.svelte'
import {
	DbTable,
	DbTableQueryGroup,
	QuerySource,
	QuerySourceRaw,
	QuerySourceTableRaw,
	QuerySourceType
} from '$lib/query/types.query'
import { clientQueryExpr } from '$lib/query/queryManagerClient'
import { FieldAccess, FieldColumnItem } from '$comps/form/field.svelte'
import { type ColumnsDefsSelect } from '$comps/grid/grid'
import { TokenApiQueryDataTree, TokenApiQueryType } from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/dataObj/types.rawDataObj.ts'

export class RawDataObj {
	attrsAccessGroup: DataObjAttrsAccessGroup
	codeCardinality: DataObjCardinality
	codeComponent: DataObjComponent
	codeDataObjType: DataObjType
	codeDoQueryType?: DataObjQueryType
	codeDoRenderPlatform?: DataObjRenderPlatform
	codeListEditPresetType?: DataObjListEditPresetType
	crumbs: string[] = []
	description?: string
	header: string
	id: string
	isInitialValidationSilent: boolean
	isListEdit: boolean
	isListSuppressFilterSort: boolean
	isListSuppressSelect: boolean
	isRetrieveReadonly: boolean
	listReorderColumn?: string
	name: string
	ownerId: string
	processType?: DataObjProcessType
	rawActions: RawDataObjAction[] = []
	rawPropsDisplay: RawDataObjPropDisplay[] = []
	rawPropsRepParmItems: RawDataObjPropDB[] = []
	rawPropsSaveInsert: RawDataObjPropDB[] = []
	rawPropsSaveUpdate: RawDataObjPropDB[] = []
	rawPropsSelect: RawDataObjPropDB[] = []
	rawPropsSelectPreset: RawDataObjPropDB[] = []
	rawPropsSort: RawDataObjPropDB[] = []
	rawQuerySource: QuerySourceRaw
	subHeader?: string
	tableGroup: DbTableQueryGroup
	constructor(obj: any) {
		const clazz = `${obj.name}.RawDataObj`
		obj = valueOrDefault(obj, {})
		this.attrsAccessGroup = classOptional(DataObjAttrsAccessGroup, obj._attrsAccessGroup)
		this.codeCardinality = memberOfEnum(
			obj._codeCardinality,
			clazz,
			'codeCardinality',
			'DataObjCardinality',
			DataObjCardinality
		)
		this.codeComponent = memberOfEnum(
			obj._codeComponent,
			clazz,
			'codeComponent',
			'DataObjComponent',
			DataObjComponent
		)
		this.codeDataObjType = memberOfEnum(
			obj._codeDataObjType,
			clazz,
			'codeDataObjType',
			'DataObjType',
			DataObjType
		)
		this.codeDoQueryType = memberOfEnumIfExists(
			obj._codeDoQueryType,
			clazz,
			'codeDoQueryType',
			'DataObjQueryType',
			DataObjQueryType
		)
		this.codeDoRenderPlatform = memberOfEnumIfExists(
			obj._codeDoRenderPlatform,
			clazz,
			'codeDoRenderPlatform',
			'DataObjRenderPlatform',
			DataObjRenderPlatform
		)
		this.codeListEditPresetType = memberOfEnumIfExists(
			obj._codeListEditPresetType,
			clazz,
			'codeListEditPresetType',
			'DataObjListEditPresetType',
			DataObjListEditPresetType
		)
		this.crumbs = this.initCrumbs(obj._propsCrumb)
		this.description = strOptional(obj.description, clazz, 'description')
		this.header = strRequired(obj.header, clazz, 'header')
		this.id = strRequired(obj.id, clazz, 'id')
		this.isInitialValidationSilent = booleanOrDefault(obj.isInitialValidationSilent, false)
		this.isListEdit = booleanRequired(obj.isListEdit, clazz, 'isListEdit')
		this.isListSuppressFilterSort = booleanOrDefault(obj.isListSuppressFilterSort, false)
		this.isListSuppressSelect = booleanOrDefault(obj.isListSuppressSelect, false)
		this.isRetrieveReadonly = booleanOrDefault(obj.isRetrieveReadonly, false)
		this.listReorderColumn = strOptional(obj._listReorderColumn, clazz, '_listReorderColumn')
		this.name = strRequired(obj.name, clazz, 'name')
		this.ownerId = strRequired(obj._ownerId, clazz, '_ownerId')
		this.processType = memberOfEnumIfExists(
			obj._processType,
			clazz,
			'processType',
			'DataObjProcessType',
			DataObjProcessType
		)
		this.rawActions = arrayOfClass(RawDataObjAction, obj._actionGroup?._dataObjActions)
		this.rawQuerySource = new QuerySourceRaw(obj._querySource)
		this.subHeader = strOptional(obj.subHeader, clazz, 'subHeader')

		/* dependent properties */
		this.tableGroup = new DbTableQueryGroup(this.rawQuerySource._tables)
		this.rawPropsDisplay = this.initProps(obj._propsDisplay, RawDataObjPropDisplay)
		this.rawPropsSaveInsert = this.initProps(obj._propsSaveInsert, RawDataObjPropDB)
		this.rawPropsSaveUpdate = this.initProps(obj._propsSaveUpdate, RawDataObjPropDB)
		this.rawPropsSelect = this.initProps(obj._propsSelect, RawDataObjPropDB)
		this.rawPropsSelectPreset = this.initProps(obj._propsSelectPreset, RawDataObjPropDB)
		this.rawPropsSort = this.initProps(obj._propsSort, RawDataObjPropDB)
		this.setFirstVisible(this.rawPropsDisplay)
	}

	initCrumbs(crumbFields: any) {
		crumbFields = getArray(crumbFields)
		let list: string[] = []
		crumbFields.forEach((cf: any) => {
			list.push(cf._nameCustom || cf._name)
		})
		return list
	}
	initProps(rawProps: any[], fClass: any) {
		rawProps = getArray(rawProps)
		rawProps = this.initPropsSignatureLink(rawProps, 'createdBy')
		rawProps = this.initPropsSignatureLink(rawProps, 'modifiedBy')
		return arrayOfClass(fClass, rawProps, this.tableGroup)
	}

	initPropsSignatureLink(rawProps: any[], propName: string) {
		rawProps.forEach((p) => {
			if (p._propName === propName) {
				p.exprCustom = `(SELECT DETACHED sys_user::SysUser FILTER .id = <user,uuid,id>)`
				p.exprPreset = `(SELECT DETACHED sys_user::SysUser FILTER .id = <user,uuid,id>)`
				p.exprSave = '(SELECT DETACHED sys_user::SysUser FILTER .id = <user,uuid,id>)'
				p._link = {
					_columns: [{ _name: 'person' }, { _name: 'fullName' }],
					_table: { hasMgmt: false, mod: 'sys_user', name: 'SysUser' }
				}
			}
		})
		return rawProps
	}

	static initTableGroup(rawDataObj: RawDataObj) {
		rawDataObj.tableGroup = new DbTableQueryGroup(rawDataObj.rawQuerySource._tables)
	}

	setFirstVisible(rawPropsDisplay: RawDataObjPropDisplay[]) {
		let idx = rawPropsDisplay.findIndex((p) => p.isDisplay)
		if (idx > -1) rawPropsDisplay[idx].isFirstVisible = true
	}
}
export class RawDataObjAction {
	action: UserAction
	codeColor: string
	isListRowAction: boolean
	constructor(obj: any) {
		const clazz = 'RawDataObjAction'
		obj = valueOrDefault(obj, {})
		this.action = new UserAction(new RawUserAction(obj._action))
		this.codeColor = obj._codeColor
		this.isListRowAction = booleanOrFalse(obj.isListRowAction)
	}
}

export class RawDataObjDyn extends RawDataObj {
	constructor(obj: any) {
		super(obj)
	}
	addPropDisplay(rawProp: any, tableGroup: DbTableQueryGroup) {
		this.rawPropsDisplay.push(new RawDataObjPropDisplay(valueOrDefault(rawProp, {}), tableGroup))
	}
	addPropSelect(rawProp: any, tableGroup: DbTableQueryGroup) {
		this.rawPropsSelect.push(new RawDataObjPropDB(valueOrDefault(rawProp, {}), tableGroup))
	}
	addPropSort(rawProp: any, tableGroup: DbTableQueryGroup) {
		this.rawPropsSort.push(new RawDataObjPropDB(valueOrDefault(rawProp, {}), tableGroup))
	}
	build() {
		return this
	}
}

export class RawDataObjProp {
	codeAttrType?: string
	codeSortDir?: PropSortDir
	columnBacklink?: string
	exprCustom?: string
	exprPreset?: string
	exprSave?: string
	fieldEmbed?: RawDataObjPropDBFieldEmbed
	hasItems: boolean
	id: string
	indexTable: number
	link?: PropLink
	linkItemsSource?: PropLinkItemsSource = $state()
	propName: string
	propNamePrefixType?: PropNamePrefixType
	propNamePrefixTypeId: string = ''
	propNameRaw: string
	constructor(obj: any, tableGroup: DbTableQueryGroup) {
		obj = valueOrDefault(obj, {})
		const clazz = 'RawDataObjProp'
		this.codeAttrType = obj._codeAttrType
		this.codeSortDir = memberOfEnumOrDefault(
			obj._codeSortDir,
			clazz,
			'codeSortDir',
			'PropSortDir',
			PropSortDir,
			PropSortDir.asc
		)
		this.columnBacklink = obj._columnBacklink
		this.exprCustom = obj.exprCustom
		this.exprPreset = obj.exprPreset
		this.exprSave = obj.exprSave
		this.fieldEmbed = obj._fieldEmbedListConfig
			? new RawDataObjPropDBFieldEmbed(
					FieldEmbedType.listConfig,
					obj._fieldEmbedListConfig._dataObjEmbedId
				)
			: obj._fieldEmbedListEdit
				? new RawDataObjPropDBFieldEmbed(
						FieldEmbedType.listEdit,
						obj._fieldEmbedListEdit._dataObjEmbedId
					)
				: obj._fieldEmbedListSelect
					? new RawDataObjPropDBFieldEmbed(
							FieldEmbedType.listSelect,
							obj._fieldEmbedListSelect._dataObjListId
						)
					: undefined
		this.hasItems = booleanOrDefault(obj._hasItems, false)
		this.id = strRequired(obj.id, clazz, 'id')
		this.indexTable = nbrOrDefault(obj.indexTable, -1)
		this.link = classOptional(PropLink, obj._link)
		this.linkItemsSource = classOptional(PropLinkItemsSource, obj._linkItemsSource)
		this.propNameRaw = strRequired(obj._propName, clazz, 'propName')

		/* derived properties */
		if (tableGroup.tables.length > 0 && this.indexTable > 0) {
			this.propNamePrefixType = PropNamePrefixType.table
			this.propNamePrefixTypeId = tableGroup.tables[this.indexTable].table.name
		} else if (this.link) {
			this.propNamePrefixType = PropNamePrefixType.link
		} else if (this.linkItemsSource) {
			this.propNamePrefixType = PropNamePrefixType.linkItems
		} else if (this.exprCustom) {
			this.propNamePrefixType = PropNamePrefixType.exprCustom
		}
		this.propName = this.getPropNameDB()
	}
	setPropNamePrefixType(type: PropNamePrefixType, id: string = '') {
		this.propNamePrefixType = type
		this.propNamePrefixTypeId = id
	}
	getPropNameDB() {
		const propNameDB = this.propNamePrefixType
			? this.propNamePrefixType +
				(this.propNamePrefixTypeId ? '_' + this.propNamePrefixTypeId : '') +
				'_' +
				this.propNameRaw
			: this.propNameRaw
		return propNameDB
	}
}

export class RawDataObjPropDB extends RawDataObjProp {
	childTableTraversal: string
	codeDataSourceValue: PropDataSourceValue
	codeDataType: PropDataType
	isMultiSelect: boolean
	isSelfReference: boolean
	constructor(obj: any, tableGroup: DbTableQueryGroup) {
		super(obj, tableGroup)
		const clazz = 'RawDataObjPropDB'
		obj = valueOrDefault(obj, {})
		this.codeDataSourceValue = memberOfEnumOrDefault(
			obj._codeDbDataSourceValue,
			clazz,
			'codeDbDataSourceValue',
			'PropDataSourceValue',
			PropDataSourceValue,
			PropDataSourceValue.edgeDB
		)
		this.codeDataType = memberOfEnum(
			obj._codeDataType,
			clazz,
			'codeDataType',
			'PropDataType',
			PropDataType
		)
		this.isMultiSelect = booleanOrDefault(obj._isMultiSelect, false)
		this.isSelfReference = booleanOrDefault(obj._isSelfReference, false)

		/* dependent properties */
		this.childTableTraversal = this.getChildTableTraversal(
			this.propNameRaw,
			this.indexTable,
			tableGroup
		)
	}
	getChildTableTraversal(propName: string, indexTable: number, tableGroup: DbTableQueryGroup) {
		let value = ''
		if (tableGroup.tables.length > 0 && indexTable > -1) {
			if (tableGroup.tables[indexTable].traversalFromRoot)
				value = tableGroup.tables[indexTable].traversalFromRoot
			if (tableGroup.tables[indexTable].isTableExtension)
				value += `[IS ${tableGroup.tables[indexTable].table.object}]`
			if (value) value += '.'
			value += propName
		}
		return value
	}
}

export class RawDataObjPropDBFieldEmbed {
	id: string
	type: FieldEmbedType
	constructor(type: FieldEmbedType, dataObjId: string) {
		const clazz = 'RawDataObjPropDBFieldEmbed'
		this.id = dataObjId
		this.type = type
	}
}

export class RawDataObjPropDisplay extends RawDataObjProp {
	codeColor?: string
	colDB: RawDBColumn
	customCol?: RawDataObjPropDisplayCustom
	fieldEmbedListConfig?: RawDataObjPropDisplayEmbedListConfig
	fieldEmbedListEdit?: RawDataObjPropDisplayEmbedListEdit
	fieldEmbedListSelect?: RawDataObjPropDisplayEmbedListSelect
	fieldEmbedShellFields: string[]
	headerAlt?: string
	height?: number
	inputMaskAlt?: string
	isDisplay: boolean
	isDisplayable: boolean
	isDisplayBlock: boolean
	isFirstVisible: boolean = false
	isParmValue: boolean
	itemChanges: RawDataObjPropDisplayItemChange[]
	items: FieldColumnItem[]
	label: string
	labelSide: string
	orderDefine: number
	orderSort?: number
	rawFieldAccess?: string
	rawFieldAlignmentAlt?: string
	rawFieldElement?: string
	width?: number
	constructor(obj: any, tableGroup: DbTableQueryGroup) {
		super(obj, tableGroup)
		const clazz = 'RawDataObjPropDisplay'
		obj = valueOrDefault(obj, {})
		this.codeColor = strOptional(obj._codeColor, clazz, 'codeColor')
		this.colDB = new RawDBColumn(obj._column)
		this.customCol = classOptional(RawDataObjPropDisplayCustom, obj._customCol)
		this.fieldEmbedListConfig = classOptional(
			RawDataObjPropDisplayEmbedListConfig,
			obj._fieldEmbedListConfig
		)
		this.fieldEmbedListEdit = classOptional(
			RawDataObjPropDisplayEmbedListEdit,
			obj._fieldEmbedListEdit
		)
		this.fieldEmbedListSelect = classOptional(
			RawDataObjPropDisplayEmbedListSelect,
			obj._fieldEmbedListSelect
		)
		this.fieldEmbedShellFields = obj._fieldEmbedShellFields
			? obj._fieldEmbedShellFields.map((f: { _name: string }) => f._name)
			: []
		this.headerAlt = strOptional(obj.headerAlt, clazz, 'headerAlt')
		this.height = nbrOptional(obj.height, clazz, 'height')
		this.inputMaskAlt = strOptional(obj.inputMaskAlt, clazz, 'inputMaskAlt')
		this.isDisplayable = booleanOrDefault(obj.isDisplayable, false)
		this.isDisplayBlock = booleanOrDefault(obj.isDisplayBlock, true)
		this.isParmValue = booleanOrDefault(obj.isParmValue, false)
		this.itemChanges = arrayOfClass(RawDataObjPropDisplayItemChange, obj._itemChanges)
		this.items = arrayOfClass(FieldColumnItem, obj._items)
		this.orderDefine = nbrRequired(obj.orderDefine, clazz, 'orderDefine')
		this.orderSort = nbrOptional(obj.orderSort, clazz, 'orderSort')
		this.rawFieldAccess = strRequired(
			this.colDB.isFormTag ? FieldAccess.none : obj._codeAccess || FieldAccess.required,
			clazz,
			'rawFieldAccess'
		)
		this.rawFieldAlignmentAlt = strOptional(obj._codeAlignmentAlt, clazz, 'rawFieldAlignmentAlt')
		this.rawFieldElement = strOptional(obj._codeFieldElement, clazz, 'rawFieldElement')
		this.width = nbrOptional(obj.width, clazz, 'width')

		/* dependent properties */
		this.isDisplay = booleanOrDefault(
			this.isDisplayable &&
				!(obj.isDisplay === false) &&
				this.rawFieldAccess !== FieldAccess.hidden &&
				!this.colDB.isFormTag,
			true
		)
		this.label = override(obj.headerAlt, this.colDB.header, clazz, 'label')
		this.labelSide = valueOrDefault(this.colDB.headerSide, this.label)
	}
}

export class RawDataObjPropDisplayItemChange {
	_codeAccess?: string
	_codeItemChangeAction: string
	_codeItemChangeValueType?: string
	_codeOp?: string
	_columns: string[]
	_valueTargetIdAttribute?: string
	_valueTargetIdCode?: string
	_valueTriggerIdsAttribute: string[]
	_valueTriggerIdsCode: string[]
	retrieveParmKey?: string
	valueTargetScalar?: string
	valueTriggerScalar?: string
	constructor(obj: any) {
		const clazz = 'RawDataObjPropDisplayItemChange'
		obj = valueOrDefault(obj, {})
		this._codeAccess = obj._codeAccess
		this._codeItemChangeAction = strRequired(
			obj._codeItemChangeAction,
			clazz,
			'_codeItemChangeAction'
		)
		this._codeItemChangeValueType = obj._codeItemChangeValueType
		this._codeOp = strRequired(obj._codeOp, clazz, '_codeOp')
		this._columns = getArray(obj._columns)
		this._valueTargetIdAttribute = obj._valueTargetIdAttribute
		this._valueTargetIdCode = obj._valueTargetIdCode
		this._valueTriggerIdsAttribute = getArray(obj._valueTriggerIdsAttribute)
		this._valueTriggerIdsCode = getArray(obj._valueTriggerIdsCode)
		this.retrieveParmKey = obj.retrieveParmKey
		this.valueTargetScalar = obj.valueTargetScalar
		this.valueTriggerScalar = obj.valueTriggerScalar
	}
}

export class RawDataObjPropDisplayCustom {
	action?: UserAction
	customColActionValue?: string
	customColAlign?: string
	customColIsSubHeader?: boolean
	customColLabel?: string
	customColPrefix?: string
	customColRawHTML?: string
	customColSize?: string
	customColSource?: string
	customColSourceKey?: string
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'RawDataObjPropDisplayCustom'
		if (obj._action) {
			this.action = new UserAction(new RawUserAction(obj._action))
		}
		this.customColActionValue = strOptional(obj.customColActionValue, clazz, 'customColActionValue')
		this.customColAlign = strOptional(obj.customColAlign, clazz, 'customColAlign')
		this.customColIsSubHeader = obj.customColIsSubHeader
		this.customColLabel = strOptional(obj.customColLabel, clazz, 'customColLabel')
		this.customColPrefix = strOptional(obj.customColPrefix, clazz, 'customColPrefix')
		this.customColRawHTML = strOptional(obj.customColRawHTML, clazz, 'customColRawHTML')
		this.customColSize = strOptional(obj.customColSize, clazz, 'customColSize')
		this.customColSource = strOptional(obj.customColSource, clazz, 'customColSource')
		this.customColSourceKey = strOptional(obj.customColSourceKey, clazz, 'customColSourceKey')
	}
}

export class RawDataObjPropDisplayEmbedListConfig {
	dataObjEmbedId: string
	dataObjModalId: string
	rawActionsModal: RawDataObjAction[]
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'RawDataObjPropDisplayEmbedListConfig'
		this.dataObjEmbedId = strRequired(obj._dataObjEmbedId, clazz, '_dataObjIdEmbed')
		this.dataObjModalId = strRequired(obj._dataObjModalId, clazz, '_dataObjIdModal')
		this.rawActionsModal = arrayOfClass(RawDataObjAction, obj._actionGroupModal._dataObjActions)
	}
}

export class RawDataObjPropDisplayEmbedListEdit {
	dataObjEmbedId: string
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'RawDataObjPropDisplayEmbedListEdit'
		this.dataObjEmbedId = strRequired(obj._dataObjEmbedId, clazz, 'dataObjEmbedId')
	}
}

export class RawDataObjPropDisplayEmbedListSelect {
	btnLabelComplete?: string
	dataObjListID: string
	rawActionsModal: RawDataObjAction[]
	constructor(obj: any) {
		const clazz = 'RawDataObjPropDisplayEmbedListSelect'
		obj = valueOrDefault(obj, {})
		this.dataObjListID = strRequired(obj._dataObjListId, clazz, '_dataObjId')
		this.rawActionsModal = arrayOfClass(RawDataObjAction, obj._actionGroupModal._dataObjActions)

		// dependent
		this.btnLabelComplete = this.initBtnComplete(clazz, obj.btnLabelComplete, this.rawActionsModal)
	}
	initBtnComplete(clazz: string, label: string | undefined, rawDataObjActions: RawDataObjAction[]) {
		const btnLabelComplete = strOptional(label, clazz, 'btnLabelComplete')
		if (btnLabelComplete) {
			const dataObjActionDone = rawDataObjActions.find((rdoa) => {
				return rdoa.action.name === 'ua_sys_dialog_done'
			})
			if (dataObjActionDone) dataObjActionDone.action.header = btnLabelComplete
		}
		return btnLabelComplete
	}
}

export class RawDBColumn {
	codeDataType: PropDataType
	classProps?: string
	exprStorageKey?: string
	header: string
	headerSide?: string
	inputMask?: string
	isFormTag: boolean
	isMultiSelect: boolean
	matchColumn?: string
	maxLength?: number
	maxValue?: number
	minLength?: number
	minValue?: number
	pattern?: string
	patternMsg?: string
	patternReplacement?: string
	placeHolder?: string
	rawFieldAlignment?: string
	spinStep?: string
	toggleContinueRequiresTrue: boolean
	togglePresetTrue: boolean
	toggleValueFalse?: string
	toggleValueShow: boolean
	toggleValueTrue?: string
	constructor(obj: any) {
		const clazz = 'RawDBColumn'
		obj = valueOrDefault(obj, {})
		this.codeDataType = memberOfEnum(
			obj._codeDataType,
			clazz,
			'codeDataType',
			'PropDataType',
			PropDataType
		)
		this.classProps = strOptional(obj.classProps, clazz, 'classProps')
		this.exprStorageKey = strOptional(obj.exprStorageKey, clazz, 'exprStorageKey')
		this.header = strRequired(obj.header, clazz, 'header')
		this.headerSide = strOptional(obj.headerSide, clazz, 'headerSide')
		this.inputMask = strOptional(obj.inputMask, clazz, 'inputMask')
		this.isFormTag = booleanOrFalse(obj.isFormTag)
		this.isMultiSelect = booleanRequired(obj.isMultiSelect, clazz, 'isMultiSelect')
		this.matchColumn = strOptional(obj.matchColumn, clazz, 'matchColumn')
		this.maxLength = nbrOptional(obj.maxLength, clazz, 'maxLength')
		this.maxValue = nbrOptional(obj.maxValue, clazz, 'maxValue')
		this.minLength = nbrOptional(obj.minLength, clazz, 'minLength')
		this.minValue = nbrOptional(obj.minValue, clazz, 'minValue')
		this.pattern = strOptional(obj.pattern, clazz, 'pattern')
		this.patternMsg = strOptional(obj.patternMsg, clazz, 'patternMsg')
		this.patternReplacement = strOptional(obj.patternReplacement, clazz, 'patternReplacement')
		this.placeHolder = strOptional(obj.placeHolder, clazz, 'placeHolder')
		this.rawFieldAlignment = strOptional(obj._codeAlignment, clazz, 'rawFieldAlignment')
		this.spinStep = strOptional(obj.spinStep, clazz, 'spinStep')
		this.toggleContinueRequiresTrue = booleanOrDefault(obj.toggleContinueRequiresTrue, false)
		this.togglePresetTrue = booleanOrDefault(obj.togglePresetTrue, false)
		this.toggleValueFalse = strOptional(obj.toggleValueFalse, clazz, 'toggleValueFalse')
		this.toggleValueShow = booleanOrDefault(obj.toggleValueShow, false)
		this.toggleValueTrue = strOptional(obj.toggleValueTrue, clazz, 'toggleValueTrue')
	}
}

export class RawUserAction {
	actionConfirms: UserActionConfirm[]
	actionShows: UserActionShow[]
	codeAction: CodeAction
	codeTriggerEnable: UserActionTrigger
	header?: string
	name: string
	constructor(obj: any) {
		const clazz = 'RawUserAction'
		obj = valueOrDefault(obj, {})
		this.actionConfirms = arrayOfClass(UserActionConfirm, obj._actionConfirms)
		this.actionShows = arrayOfClass(UserActionShow, obj._actionShows)
		this.codeAction = new CodeAction(obj._codeAction)
		this.codeTriggerEnable = memberOfEnum(
			obj._codeTriggerEnable,
			clazz,
			'codeTriggerEnable',
			'UserActionTrigger',
			UserActionTrigger
		)
		this.header = obj.header
		this.name = strRequired(obj.name, clazz, 'name')
	}
}

export class PropLink {
	exprDisplay: string
	exprProps: string
	table?: DbTable
	constructor(obj: any) {
		const clazz = 'PropLink'
		obj = valueOrDefault(obj, {})
		const cols = getArray(obj._columns)
		this.exprDisplay =
			cols.reduce((acc: string, col: any) => {
				if (acc) acc += '.'
				acc += col._name
				return acc
			}, '') || 'id'
		this.exprProps = `{ id, display := .${this.exprDisplay} }`
		this.table = classOptional(DbTable, obj._table)
	}
	getTableObj() {
		return this.table ? this.table.object : undefined
	}
}

export class PropLinkItems {
	rawItems: DataRecord[] = $state([])
	source: PropLinkItemsSource
	constructor(source: any) {
		const clazz = 'PropLinkItems'
		this.source = new PropLinkItemsSource(source)
	}

	formatDataItemDisplay(record: DataRecord) {
		let value = ''
		const displayIdSeparator = this.source.displayIdSeparator
		this.source.props.forEach((prop) => {
			if (prop.isDisplayId) {
				if (value) value += displayIdSeparator
				value += getDataRecordValueKey(record, prop.key)
			}
		})
		return value
	}

	getDataItemsAll(fieldValue: DataRecord | DataRecord[]) {
		const fieldValues: DataRecord[] = getArray(fieldValue)
		let fieldItems: FieldColumnItem[] = []
		this.rawItems.forEach((item) => {
			fieldItems.push(
				new FieldColumnItem(
					item.data,
					this.formatDataItemDisplay(item),
					fieldValues.includes(item.data)
				)
			)
		})
		return fieldItems
	}

	getDataItemsSelected(fieldValue: string | string[]) {
		if (Array.isArray(fieldValue)) {
			let fiMulti: FieldColumnItem[] = []
			fieldValue.forEach((id) => {
				const item = this.rawItems.find((i) => i.data === id)
				if (item) fiMulti.push(new FieldColumnItem(id, this.formatDataItemDisplay(item), true))
			})
			return fiMulti
		} else {
			const item = this.rawItems.find((i) => i.data === fieldValue)
			if (item) return new FieldColumnItem(fieldValue, this.formatDataItemDisplay(item), true)
		}
	}

	getDisplayValueList(idsCurrent: string | string[]) {
		const ids = getArray(idsCurrent)
		let values = ''
		this.rawItems.forEach((item) => {
			if (ids.includes(item.data)) {
				if (values) values += ', '
				values += this.formatDataItemDisplay(item)
			}
		})
		return values
	}

	getFieldValueIds(fieldValue: DataRecord | DataRecord[]) {
		const fieldValues: DataRecord[] = getArray(fieldValue)
		return fieldValues.map((v) => v.id)
	}

	getGridParms() {
		let columnDefs: ColumnsDefsSelect = [
			{
				field: 'id',
				headerName: 'ID',
				hide: true
			}
		]

		this.source.props.forEach((prop) => {
			columnDefs.push({
				field: prop.key,
				flex: 1,
				headerName: prop.header
			})
		})

		// rowData
		let rowData: DataRecord[] = this.getRowData()

		// rawSortObj
		let sortModel = new DataObjSort()
		this.source.getSortProps().forEach((prop, i) => {
			sortModel.addItem(prop.key, 'asc', i)
		})

		return { columnDefs, rowData, sortModel }
	}

	getRowData() {
		return this.rawItems.map((item) => {
			let row: DataRecord = { id: item.data }
			this.source.props.forEach((prop) => {
				row[prop.key] = getDataRecordValueKey(item, prop.key)
			})
			return row
		})
	}

	getValuesSelect() {
		let data = this.rawItems.map((item) => item.data)
		data.unshift('')
		return data
	}

	async retrieve(sm: State, fieldValue: string | undefined): Promise<MethodResult> {
		const clazz = 'PropLinkItems.retrieve'
		const exprCustom = this.source.getExprSelect(false, fieldValue)
		const queryType = TokenApiQueryType.retrieve

		const dataTab = new DataObjData()
		dataTab.parms.valueSet(ParmsValuesType.itemsParmValue, this.source.parmValue)
		dataTab.parms.valueSet(ParmsValuesType.itemsParmValueList, this.source.parmValueList)

		const dataTree: TokenApiQueryDataTree = sm.app.getDataTree(queryType)

		let result: MethodResult = await clientQueryExpr(
			exprCustom,
			clazz,
			{
				dataTab,
				dataTree
			},
			sm
		)
		if (result.error) return result
		this.setRawItems(required(result.data.rawDataList, clazz, 'rawItems'))
		return result
	}

	setRawItems(rawItems: DataRecord[]) {
		this.rawItems = rawItems
	}
}

export class PropLinkItemsSource {
	displayIdSeparator: string
	exprProps: string
	name: string
	parmValue?: string
	parmValueList: string[] = []
	props: PropLinkItemsSourceProp[] = []
	querySource: QuerySource
	raw: any
	constructor(obj: any) {
		const clazz = 'PropLinkItemsSource'
		obj = valueOrDefault(obj, {})
		this.displayIdSeparator = valueOrDefault(obj.displayIdSeparator, ' ')
		this.name = strRequired(obj.name, clazz, 'name')
		this.parmValue = obj._parmValue || obj._codeAttrType
		this.parmValueList = getArray(obj._parmValueList)
		this.props = arrayOfClass(PropLinkItemsSourceProp, obj._props)
		this.raw = obj
		this.querySource = new QuerySource({
			...obj._querySource,
			querySourceType: QuerySourceType.expr
		})

		// derived
		let props = ''
		let display = ''
		this.props.forEach((p: PropLinkItemsSourceProp) => {
			if (display) {
				display += ' ++ '
				if (this.displayIdSeparator) display += `"${this.displayIdSeparator}" ++ `
			}
			display += p.expr

			if (props) props += ', '
			props += `${p.key} := ${p.expr}`
		})
		this.exprProps = `{ data := .id, display := ${display}, ${props} }`
	}

	getExprSelect(isCompilation: boolean, currVal: string | string[] | undefined) {
		let expr = ''
		let filter = this.querySource.exprFilter ? `(${this.querySource.exprFilter})` : ''

		if (filter && currVal) {
			let currValFilter = ''
			if (Array.isArray(currVal)) {
				if (currVal.length > 0) {
					currValFilter = `.id IN <uuid>{${currVal.map((v: string) => `'${v}'`).join(',')}}`
				}
			} else if (currVal) {
				currValFilter = `.id = <uuid>'${currVal}'`
			}
			if (currValFilter) filter += ` OR ${currValFilter}`
		}

		const sort =
			this.querySource.exprSort ||
			this.getSortProps().reduce((sort, prop) => {
				if (sort) sort += ' THEN '
				return (sort += `.${prop.key}`)
			}, '')

		expr = this.querySource.exprWith ? `${this.querySource.exprWith} ` : ''
		expr += `SELECT ${this.querySource.table?.object}`
		expr += filter ? ` FILTER ${filter}` : ''

		if (isCompilation) {
			expr = `(${expr}) ${this.exprProps}`
			expr += sort ? ` ORDER BY ${sort}` : ''
			expr = `(SELECT ${expr})`
		} else {
			expr = `SELECT (${expr}) ${this.exprProps}`
			expr += sort ? ` ORDER BY ${sort}` : ''
		}

		return expr
	}
	// getExprSelectUnions() {
	// 	async addScriptRetrieveUnions(query: GelQuery) {
	// 			let exprWith = query.rawDataObj.rawQuerySource.exprWith || ''
	// 			exprWith = exprWith ? `WITH ${exprWith} \n` : ''

	// 			let exprUnions = ''
	// 			query.rawDataObj.rawQuerySource.exprUnions.forEach((item) => {
	// 				if (exprUnions) exprUnions += ' UNION '
	// 				exprUnions += `(${item})`
	// 			})
	// 			exprUnions = `SELECT { ${exprUnions} }`

	// 			let propsSelect = query.getPropsSelect({ props: query.rawDataObj.rawPropsSelect })
	// 			let exprSort = query.getSort(query.queryData)

	// 			let expr = exprWith ? `WITH ${exprWith} \n` : ''
	// 			expr += exprUnions + '\n'
	// 			expr += propsSelect + '\n'
	// 			expr += exprSort ? ` ORDER BY ${exprSort} \n` : ''

	// 			this.addScriptNew({
	// 				dataRows: [],
	// 				exePost: ScriptExePost.formatData,
	// 				expr,
	// 				query
	// 			})
	// 		}
	// }

	getSortProps() {
		return this.props
			.filter((prop) => isNumber(prop.orderSort))
			.sort((a, b) => a.orderSort! - b.orderSort!)
	}

	getTableObj() {
		return this.querySource.table ? this.querySource.table.object : undefined
	}

	setParmValue(parmValue: string) {
		this.parmValue = parmValue
	}
}

export class PropLinkItemsSourceProp {
	expr: string
	header: string
	isDisplayId: boolean
	key: string
	orderSort?: number
	constructor(obj: any) {
		const clazz = 'PropLinkItemsSourceProp'
		obj = valueOrDefault(obj, {})
		this.expr = strRequired(obj.expr, clazz, 'expr')
		this.header = strRequired(obj.header, clazz, 'header')
		this.isDisplayId = booleanRequired(obj.isDisplayId, clazz, 'isDisplayId')
		this.key = strRequired(obj.key, clazz, 'key')
		this.orderSort = nbrOptional(obj.orderSort, clazz, 'orderSort')
	}
}

export class DataObjAttrsAccessGroup {
	attrsAccessForbidden: DataObjAttrsAccessForbidden[] = []
	attrsAccessPermitted: DataObjAttrsAccessPermitted[] = []
	attrsAccessRequired: DataObjAttrsAccessRequired[] = []
	constructor(rawAttrsAccess: any[]) {
		const clazz = 'DataObjAttrsAccessGroup'
		rawAttrsAccess = getArray(rawAttrsAccess)
		rawAttrsAccess.forEach((raa: any) => {
			const codeAttrAccessType = memberOfEnum(
				raa._codeAttrAccessType,
				clazz,
				'codeAttrAccessType',
				'DataObjAttrsAccessType',
				DataObjAttrsAccessType
			)
			switch (codeAttrAccessType) {
				case DataObjAttrsAccessType.forbidden:
					this.attrsAccessForbidden.push(new DataObjAttrsAccessForbidden(raa))
					break
				case DataObjAttrsAccessType.permitted:
					this.attrsAccessPermitted.push(new DataObjAttrsAccessPermitted(raa))
					break
				case DataObjAttrsAccessType.required:
					this.attrsAccessRequired.push(new DataObjAttrsAccessRequired(raa))
					break
				default:
					error(500, {
						file: FILENAME,
						function: 'DataObjAttrsAccessGroup.constructor',
						msg: `No case defined for codeAttrAccessType: ${codeAttrAccessType}`
					})
			}
		})
	}
	eval(attrsRequestor: Attr[]) {
		// forbidden
		if (
			this.attrsAccessForbidden.some((forbidden) => {
				return attrsRequestor.some((attr) => attr.id === forbidden.attr.id)
			})
		) {
			return new DataObjAttrsAccessEval(true)
		}

		// required
		if (
			!this.attrsAccessRequired.every((required) => {
				return attrsRequestor.some((attr) => attr.id === required.attr.id)
			})
		) {
			return new DataObjAttrsAccessEval(true)
		}

		// permitted
		let permittedIds: string[] = []
		attrsRequestor.forEach((attr) => {
			if (
				this.attrsAccessPermitted.some((permitted) => {
					return attr.codeAttrType === permitted.attrType
				})
			) {
				permittedIds.push(attr.id)
			}
		})
		return new DataObjAttrsAccessEval(false, permittedIds)
	}
}

export class DataObjAttrsAccess {
	codeAttrAccessSource: DataObjAttrsAccessSource
	constructor(obj: any) {
		const clazz = 'DataObjAttrsAccess'
		obj = valueOrDefault(obj, {})
		this.codeAttrAccessSource = memberOfEnum(
			obj._codeAttrAccessSource,
			clazz,
			'codeAttrAccessSource',
			'DataObjAttrsAccessSource',
			DataObjAttrsAccessSource
		)
	}
}
export class DataObjAttrsAccessForbidden extends DataObjAttrsAccess {
	attr: Attr
	constructor(obj: any) {
		const clazz = 'DataObjAttrsAccessForbidden'
		super(obj)
		obj = valueOrDefault(obj, {})
		this.attr = new Attr(obj._attr)
	}
}
export class DataObjAttrsAccessPermitted extends DataObjAttrsAccess {
	attrType: string
	constructor(obj: any) {
		const clazz = 'DataObjAttrsAccessPermitted'
		super(obj)
		obj = valueOrDefault(obj, {})
		this.attrType = strRequired(obj._codeAttrType, clazz, 'attrType')
	}
}
export class DataObjAttrsAccessRequired extends DataObjAttrsAccess {
	attr: Attr
	constructor(obj: any) {
		const clazz = 'DataObjAttrsAccessRequired'
		super(obj)
		obj = valueOrDefault(obj, {})
		this.attr = new Attr(obj._attr)
	}
	eval(attrsRequestor: Attr[]) {}
}

export class DataObjAttrsAccessEval {
	isDenyAccess: boolean
	permittedObjIds: string[]
	constructor(isDenyAccess: boolean, permittedObjIds: string[] = []) {
		const clazz = 'DataObjAttrsAccessEval'
		this.isDenyAccess = isDenyAccess
		this.permittedObjIds = permittedObjIds
	}
}

export enum DataObjAttrsAccessSource {
	environment = 'environment',
	user = 'user'
}

export enum DataObjAttrsAccessType {
	forbidden = 'forbidden',
	permitted = 'permitted',
	required = 'required'
}

export enum DataObjQueryType {
	preset = 'preset',
	retrieve = 'retrieve',
	retrievePreset = 'retrievePreset'
}

export enum DataObjRenderPlatform {
	app = 'app',
	drawerBottom = 'drawerBottom',
	modal = 'modal'
}

export enum PropDataSourceValue {
	calculate = 'calculate',
	edgeDB = 'edgeDB'
}

export enum PropDataType {
	attribute = 'attribute',
	bool = 'bool',
	date = 'date',
	datetime = 'datetime',
	file = 'file',
	float64 = 'float64',
	int16 = 'int16',
	int32 = 'int32',
	int64 = 'int64',
	items = 'items',
	json = 'json',
	link = 'link',
	literal = 'literal',
	none = 'none',
	str = 'str',
	strList = 'strList',
	uuid = 'uuid',
	uuidList = 'uuidList'
}

export enum PropNamePrefixType {
	custom = 'custom',
	expr = 'expr',
	exprCustom = 'exprCustom',
	link = 'link',
	linkItems = 'linkItems',
	table = 'table'
}

export enum PropSortDir {
	asc = 'asc',
	desc = 'desc'
}
