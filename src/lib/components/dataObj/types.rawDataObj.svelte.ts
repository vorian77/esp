import { State } from '$comps/app/types.appState.svelte'
import {
	arrayOfClass,
	booleanOrDefault,
	booleanOrFalse,
	booleanRequired,
	CodeAction,
	DataObjCardinality,
	DataObjData,
	DataObjSort,
	DataObjTable,
	DataObjType,
	DBTable,
	debug,
	getArray,
	getDataRecordValueKey,
	isNumber,
	memberOfEnum,
	memberOfEnumIfExists,
	memberOfEnumOrDefault,
	memberOfEnumList,
	nbrOrDefault,
	nbrOptional,
	nbrRequired,
	classOptional,
	ObjAttr,
	override,
	ParmsValuesType,
	required,
	ResponseBody,
	strOptional,
	strRequired,
	User,
	valueOrDefault
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
import { queryDataPre } from '$comps/app/types.appQuery'
import {
	Field,
	FieldAccess,
	FieldColor,
	FieldColumnItem,
	FieldEmbedType
} from '$comps/form/field.svelte'
import { type ColumnsDefsSelect } from '$comps/grid/grid'
import { apiFetchFunction, ApiFunction } from '$routes/api/api'
import { TokenApiFetchError, TokenApiQueryData, TokenApiQueryType } from '$utils/types.token'
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
	exprFilter?: string
	exprSort?: string
	exprWith?: string
	header: string
	id: string
	isInitialValidationSilent: boolean
	isListEdit: boolean
	isListSuppressFilterSort: boolean
	isListSuppressSelect: boolean
	isRetrieveReadonly: boolean
	listEditPresetExpr?: string
	listReorderColumn?: string
	name: string
	ownerId: string
	processType?: DataObjProcessType
	queryRiders: RawDataObjQueryRider[] = []
	rawActions: RawDataObjAction[] = []
	rawParent?: RawDataObjParent
	rawPropsDisplay: RawDataObjPropDisplay[] = []
	rawPropsRepParmItems: RawDataObjPropDB[] = []
	rawPropsSaveInsert: RawDataObjPropDB[] = []
	rawPropsSaveUpdate: RawDataObjPropDB[] = []
	rawPropsSelect: RawDataObjPropDB[] = []
	rawPropsSelectPreset: RawDataObjPropDB[] = []
	rawPropsSort: RawDataObjPropDB[] = []
	subHeader?: string
	tables: DataObjTable[] = []
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
		this.exprFilter = strOptional(obj.exprFilter, clazz, 'exprFilter')
		this.exprSort = strOptional(obj.exprSort, clazz, 'exprSort')
		this.exprWith = strOptional(obj.exprWith, clazz, 'exprWith')
		this.header = strRequired(obj.header, clazz, 'header')
		this.id = strRequired(obj.id, clazz, 'id')
		this.isInitialValidationSilent = booleanOrDefault(obj.isInitialValidationSilent, false)
		this.isListEdit = booleanRequired(obj.isListEdit, clazz, 'isListEdit')
		this.isListSuppressFilterSort = booleanOrDefault(obj.isListSuppressFilterSort, false)
		this.isListSuppressSelect = booleanOrDefault(obj.isListSuppressSelect, false)
		this.isRetrieveReadonly = booleanOrDefault(obj.isRetrieveReadonly, false)
		this.listEditPresetExpr = strOptional(obj.listEditPresetExpr, clazz, 'listEditPresetExpr')
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
		this.queryRiders = arrayOfClass(RawDataObjQueryRider, obj._queryRiders)
		this.rawActions = arrayOfClass(RawDataObjAction, obj._actionGroup?._dataObjActions)
		this.subHeader = strOptional(obj.subHeader, clazz, 'subHeader')
		this.tables = this.initTables(obj._tables)

		/* dependent properties */
		this.rawParent = classOptional(RawDataObjParent, obj._parent)

		this.rawPropsDisplay = arrayOfClass(RawDataObjPropDisplay, obj._propsDisplay, this.tables)
		this.setFirstVisible(this.rawPropsDisplay)
		this.rawPropsSaveInsert = this.initProps(obj._propsSaveInsert)
		this.rawPropsSaveUpdate = this.initProps(obj._propsSaveUpdate)
		this.rawPropsSelect = this.initProps(obj._propsSelect)
		this.rawPropsSelectPreset = this.initProps(obj._propsSelectPreset)
		this.rawPropsSort = this.initProps(obj._propsSort)
	}

	initCrumbs(crumbFields: any) {
		crumbFields = getArray(crumbFields)
		let list: string[] = []
		crumbFields.forEach((cf: any) => {
			list.push(cf._nameCustom || cf._name)
		})
		return list
	}
	initProps(rawProps: any[]) {
		rawProps = getArray(rawProps)
		rawProps = this.initPropsSignatureLink(rawProps, 'createdBy')
		rawProps = this.initPropsSignatureLink(rawProps, 'modifiedBy')
		return arrayOfClass(RawDataObjPropDB, rawProps, this.tables)
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
	initTables(obj: any) {
		let newTables: DataObjTable[] = []
		const rawTables = getArray(obj)
		rawTables.forEach((rawTable: any, index: number) => {
			newTables.push(new DataObjTable(rawTable, newTables))
		})
		newTables.forEach((t) => {
			t.setChildren(newTables)
		})
		return newTables
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
	addPropDisplay(rawProp: any, tables: DataObjTable[]) {
		this.rawPropsDisplay.push(new RawDataObjPropDisplay(valueOrDefault(rawProp, {}), tables))
	}
	addPropSelect(rawProp: any, tables: DataObjTable[]) {
		this.rawPropsSelect.push(new RawDataObjPropDB(valueOrDefault(rawProp, {}), tables))
	}
	addPropSort(rawProp: any, tables: DataObjTable[]) {
		this.rawPropsSort.push(new RawDataObjPropDB(valueOrDefault(rawProp, {}), tables))
	}
	build() {
		return this
	}
}

export class RawDataObjParent {
	_columnName: string
	_columnIsMultiSelect: boolean
	_embedType?: FieldEmbedType
	_filterExpr?: string
	_table: DBTable
	constructor(obj: RawDataObjParent) {
		obj = valueOrDefault(obj, {})
		const clazz = 'RawDataObjParent'
		this._columnName = strRequired(obj._columnName, clazz, '_columnName')
		this._columnIsMultiSelect = booleanRequired(
			obj._columnIsMultiSelect,
			clazz,
			'_columnIsMultiSelect'
		)
		this._embedType = memberOfEnumOrDefault(
			obj._embedType,
			clazz,
			'_embedType',
			'DataObjEmbedType',
			FieldEmbedType,
			FieldEmbedType.listEdit
		)
		this._filterExpr = strOptional(obj._filterExpr, clazz, '_filterExpr')
		this._table = new DBTable(obj._table)
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
	constructor(obj: any, tables: DataObjTable[]) {
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
		if (Array.isArray(tables) && tables.length > 0 && this.indexTable > 0) {
			this.propNamePrefixType = PropNamePrefixType.table
			this.propNamePrefixTypeId = tables[this.indexTable].table.name
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
	constructor(obj: any, tables: DataObjTable[]) {
		super(obj, tables)
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
			tables
		)
	}
	getChildTableTraversal(propName: string, indexTable: number, tables: DataObjTable[]) {
		let value = ''
		if (propName && tables.length > 0 && indexTable > -1) {
			if (tables[indexTable].traversalFromRoot) value = tables[indexTable].traversalFromRoot
			if (tables[indexTable].isTableExtension) value += `[IS ${tables[indexTable].table.object}]`
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
	constructor(obj: any, tables: DataObjTable[]) {
		super(obj, tables)
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

export class RawDataObjQueryRider {
	_codeFunction?: string
	_codeQueryType: string
	_codeTriggerTiming: string
	_codeType: string
	_codeUserDestination?: string
	_codeUserMsgDelivery?: string
	expr?: string
	functionParmValue?: string
	userMsg?: string
	constructor(obj: any) {
		const clazz = 'RawDataObjQueryRider'
		obj = valueOrDefault(obj, {})
		this._codeFunction = obj._codeFunction
		this._codeQueryType = strRequired(obj._codeQueryType, clazz, '_codeQueryType')
		this._codeTriggerTiming = strRequired(obj._codeTriggerTiming, clazz, '_codeTriggerTiming')
		this._codeType = strRequired(obj._codeType, clazz, '_codeType')
		this._codeUserDestination = obj._codeUserDestination
		this._codeUserMsgDelivery = obj._codeUserMsgDelivery
		this.expr = obj.expr
		this.functionParmValue = obj.functionParmValue
		this.userMsg = obj.userMsg
	}
}

export class RawDataObjTable {
	_columnParent?: string
	_columnsId: string[] = []
	exprFilterUpdate?: string
	index: number
	indexParent?: number
	isTableExtension: boolean
	_table: DBTable
	constructor(obj: any) {
		const clazz = 'RawDataObjTable'
		obj = valueOrDefault(obj, {})
		this._columnParent = strOptional(obj._columnParent, clazz, '_columnParent')
		this._columnsId = obj._columnsId
		this.exprFilterUpdate = obj.exprFilterUpdate
		this.index = nbrRequired(obj.index, clazz, 'index')
		this.indexParent = nbrOptional(obj.indexParent, clazz, 'indexParent')
		this.isTableExtension = booleanOrDefault(obj.isTableExtension, false)
		this._table = new DBTable(obj._table)
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
	table?: DBTable
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
		this.table = classOptional(DBTable, obj._table)
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

	async retrieve(sm: State, fieldValue: string | undefined) {
		// parms
		let { dataTab, dataTree } = queryDataPre(sm, new DataObjData(), TokenApiQueryType.retrieve)
		dataTab.parms.valueSet(ParmsValuesType.itemsParmValue, this.source.parmValue)
		dataTab.parms.valueSet(ParmsValuesType.itemsParmValueList, this.source.parmValueList)
		dataTab.parms.valueSet(ParmsValuesType.propLinkItemsValueCurrent, fieldValue)
		dataTab.parms.valueSet(ParmsValuesType.propLinkItemsSourceRaw, this.source.raw)

		// retrieve
		const result = await apiFetchFunction(
			ApiFunction.dbGelGetLinkItems,
			new TokenApiFetchError(
				FILENAME,
				'retrieve',
				`Error retrieving LinkItemsSource: ${this.source.name}`
			),
			new TokenApiQueryData({ dataTab, tree: dataTree, user: sm.user })
		)
		this.setRawItems(required(result.data, `${FILENAME}.PropLinkItems.retrieve`, 'rawItems'))
	}

	setRawItems(rawItems: DataRecord[]) {
		this.rawItems = rawItems
	}
}

export class PropLinkItemsSource {
	displayIdSeparator: string
	exprFilter: string
	exprProps: string
	exprSort: string
	exprWith?: string
	name: string
	parmValue?: string
	parmValueList: string[] = []
	props: PropLinkItemsSourceProp[] = []
	raw: any
	table?: DBTable
	constructor(obj: any) {
		const clazz = 'PropLinkItemsSource'
		obj = valueOrDefault(obj, {})
		this.displayIdSeparator = valueOrDefault(obj.displayIdSeparator, ' ')
		this.exprFilter = valueOrDefault(obj.exprFilter, '')
		this.exprSort = valueOrDefault(obj.exprSort, '')
		this.exprWith = valueOrDefault(obj.exprWith, '')
		this.name = strRequired(obj.name, clazz, 'name')
		this.parmValue = obj._parmValue || obj._codeAttrType
		this.parmValueList = getArray(obj._parmValueList)
		this.props = arrayOfClass(PropLinkItemsSourceProp, obj._props)
		this.raw = obj
		this.table = classOptional(DBTable, obj._table)

		// derived
		let props = ''
		let display = ''
		this.props.forEach((p: PropLinkItemsSourceProp) => {
			if (display) display += '++' + this.displayIdSeparator
			display += p.expr

			if (props) props += ', '
			props += `${p.key} := ${p.expr}`
		})
		this.exprProps = `{ data := .id, display := ${display}, ${props} }`
	}

	getExprSelect(isCompilation: boolean, currVal: string | string[]) {
		let expr = ''
		let filter = this.exprFilter ? `(${this.exprFilter})` : ''

		if (filter) {
			let currValFilter = ''
			if (Array.isArray(currVal)) {
				if (currVal.length > 0) {
					currValFilter = `.id IN <uuid>{${currVal.map((v: string) => `'${v}'`).join(',')}}`
				}
			} else if (currVal) {
				currValFilter = `.id = <uuid>'${currVal}'`
			}
			if (currValFilter) filter += ` UNION ${currValFilter}`
		}

		const sort =
			this.exprSort ||
			this.getSortProps().reduce((sort, prop) => {
				if (sort) sort += ' THEN '
				return (sort += `.${prop.key}`)
			}, '')

		expr = this.exprWith ? `${this.exprWith} ` : ''
		expr += `SELECT ${this.table?.object}`
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

	getSortProps() {
		return this.props
			.filter((prop) => isNumber(prop.orderSort))
			.sort((a, b) => a.orderSort! - b.orderSort!)
	}

	getTableObj() {
		return this.table ? this.table.object : undefined
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
						message: `No case defined for codeAttrAccessType: ${codeAttrAccessType}`
					})
			}
		})
	}
	eval(attrsRequestor: ObjAttr[]) {
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
	attr: ObjAttr
	constructor(obj: any) {
		const clazz = 'DataObjAttrsAccessForbidden'
		super(obj)
		obj = valueOrDefault(obj, {})
		this.attr = new ObjAttr(obj._attr)
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
	attr: ObjAttr
	constructor(obj: any) {
		const clazz = 'DataObjAttrsAccessRequired'
		super(obj)
		obj = valueOrDefault(obj, {})
		this.attr = new ObjAttr(obj._attr)
	}
	eval(attrsRequestor: ObjAttr[]) {}
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
