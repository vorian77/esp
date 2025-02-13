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
	getRecordValue,
	isNumber,
	memberOfEnum,
	memberOfEnumIfExists,
	memberOfEnumOrDefault,
	nbrOrDefault,
	nbrOptional,
	nbrRequired,
	classOptional,
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
import { DataObjActionQuery } from '$comps/app/types.appQuery'
import {
	Field,
	FieldAccess,
	FieldColor,
	FieldColumnItem,
	FieldEmbedType
} from '$comps/form/field.svelte'
import { type ColumnsDefsSelect } from '$comps/grid/grid'
import { apiFetch, ApiFunction } from '$routes/api/api'
import { TokenApiQueryData, TokenApiQueryType } from '$utils/types.token'
import { error } from '@sveltejs/kit'
import { University } from 'lucide-svelte'

const FILENAME = '/$comps/dataObj/types.rawDataObj.ts'

export class RawDataObj {
	actionsQuery: DataObjActionQuery[] = []
	codeCardinality: DataObjCardinality
	codeComponent: DataObjComponent
	codeDataObjType: DataObjType
	codeListEditPresetType?: DataObjListEditPresetType
	crumbs: string[] = []
	description?: string
	exprFilter?: string
	exprObject?: string
	exprSort?: string
	exprWith?: string
	header: string
	id: string
	isDetailRetrievePreset: boolean
	isInitialValidationSilent: boolean
	isListEdit: boolean
	isListSuppressFilterSort: boolean
	isListSuppressSelect: boolean
	listEditPresetExpr?: string
	listReorderColumn?: string
	name: string
	processType?: DataObjProcessType
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
		this.actionsQuery = arrayOfClass(DataObjActionQuery, obj._actionsQuery)
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
		this.exprObject = strOptional(obj.exprObject, clazz, 'exprObject')
		this.exprSort = strOptional(obj.exprSort, clazz, 'exprSort')
		this.exprWith = strOptional(obj.exprWith, clazz, 'exprWith')
		this.header = strRequired(obj.header, clazz, 'header')
		this.id = strRequired(obj.id, clazz, 'id')
		this.isDetailRetrievePreset = booleanOrDefault(obj.isDetailRetrievePreset, false)
		this.isInitialValidationSilent = booleanOrDefault(obj.isInitialValidationSilent, false)
		this.isListEdit = booleanRequired(obj.isListEdit, clazz, 'isListEdit')
		this.isListSuppressFilterSort = booleanOrDefault(obj.isListSuppressFilterSort, false)
		this.isListSuppressSelect = booleanOrDefault(obj.isListSuppressSelect, false)
		this.listEditPresetExpr = strOptional(obj.listEditPresetExpr, clazz, 'listEditPresetExpr')
		this.listReorderColumn = strOptional(obj._listReorderColumn, clazz, '_listReorderColumn')
		this.name = strRequired(obj.name, clazz, 'name')
		this.processType = memberOfEnumIfExists(
			obj._processType,
			clazz,
			'processType',
			'DataObjProcessType',
			DataObjProcessType
		)
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
			list.push(cf._name)
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

export enum PropNamePrefixType {
	custom = 'custom',
	expr = 'expr',
	exprCustom = 'exprCustom',
	link = 'link',
	linkItems = 'linkItems',
	table = 'table'
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
	_codeOp: string
	_codeValueTarget?: string
	_codeValueTrigger?: string
	_codeValueTypeTarget: string
	_codeValueTypeTrigger: string
	_column: string
	selectParmName?: string
	valueScalarTarget?: string
	valueScalarTrigger?: string
	constructor(obj: any) {
		const clazz = 'RawDataObjPropDisplayItemChange'
		obj = valueOrDefault(obj, {})
		this._codeAccess = obj._codeAccess
		this._codeOp = strRequired(obj._codeOp, clazz, '_codeOp')
		this._codeValueTarget = obj._codeValueTarget
		this._codeValueTrigger = obj._codeValueTrigger
		this._codeValueTypeTarget = strRequired(obj._codeValueTypeTarget, clazz, '_codeValueTypeTarget')
		this._codeValueTypeTrigger = strRequired(
			obj._codeValueTypeTrigger,
			clazz,
			'_codeValueTypeTrigger'
		)
		this._column = strRequired(obj._column, clazz, '_column')
		this.selectParmName = obj.selectParmName
		this.valueScalarTarget = obj.valueScalarTarget
		this.valueScalarTrigger = obj.valueScalarTrigger
	}
}

export class RawDataObjPropDisplayCustom {
	action?: UserAction
	actionAlertMsg?: string
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
		this.actionAlertMsg = strOptional(obj.actionAlertMsg, clazz, 'actionAlertMsg')
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
		debug('RawDataObjPropDisplayEmbedListSelect', 'initBtnComplete', { label, rawDataObjActions })
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
	actionAlertMsg?: string
	actionConfirms: UserActionConfirm[]
	actionShows: UserActionShow[]
	codeAction: CodeAction
	codeTriggerEnable: UserActionTrigger
	header?: string
	name: string
	constructor(obj: any) {
		const clazz = 'RawUserAction'
		obj = valueOrDefault(obj, {})
		this.actionAlertMsg = strOptional(obj.actionAlertMsg, clazz, 'actionAlertMsg')
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

export enum PropDataSourceValue {
	calculate = 'calculate',
	edgeDB = 'edgeDB'
}

export enum PropDataType {
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
	uuid = 'uuid',
	uuidList = 'uuidList'
}

export class PropLink {
	exprDisplay: string
	exprProps: string
	table?: DBTable
	constructor(obj: any) {
		const clazz = 'PropLink'
		obj = valueOrDefault(obj, {})
		const cols = getArray(obj._columns)
		this.exprDisplay = cols.reduce((acc: string, col: any) => {
			if (acc) acc += '.'
			acc += col._name
			return acc
		}, '')
		this.exprProps = `{ id, display := .${this.exprDisplay} }`
		if (!obj._table) {
			console.log(`Missing table for ${clazz} ${this.exprProps}`)
		}
		this.table = new DBTable(required(obj._table, clazz, 'table'))
	}
}

export class PropLinkItems {
	isRetrieved: boolean = false
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
				value += getRecordValue(record, prop.key)
			}
		})
		return value
	}

	getFieldValueIds(fieldValue: DataRecord | DataRecord[]) {
		const fieldValues: DataRecord[] = getArray(fieldValue)
		return fieldValues.map((v) => v.id)
	}

	getDataItemsFormatted(fieldValue: DataRecord | DataRecord[]) {
		const fieldValues: DataRecord[] = getArray(fieldValue)
		let fieldItems: FieldColumnItem[] = []
		this.rawItems.forEach((item) => {
			const fi = new FieldColumnItem(
				item.id,
				this.formatDataItemDisplay(item),
				fieldValues.includes(item.id)
			)
			fieldItems.push(fi)
		})
		return fieldItems
	}

	getDisplayValueList(idsCurrent: string | string[]) {
		const ids = getArray(idsCurrent)
		let values = ''
		this.rawItems.forEach((item) => {
			if (ids.includes(item.id)) {
				if (values) values += ', '
				values += this.formatDataItemDisplay(item)
			}
		})
		return values
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
			let row: DataRecord = { id: item.id }
			this.source.props.forEach((prop) => {
				row[prop.key] = getRecordValue(item, prop.key)
			})
			return row
		})
	}

	getValuesSelect() {
		let data = this.rawItems.map((item) => item.id)
		data.unshift('')
		return data
	}

	async retrieve(sm: State, fieldValue: string | undefined) {
		if (!this.isRetrieved) {
			// parms
			let { dataTab, dataTree } = queryDataPre(sm, new DataObjData(), TokenApiQueryType.retrieve)
			dataTab.parms.valueSet(ParmsValuesType.propLinkItemsValueCurrent, fieldValue)
			dataTab.parms.valueSet(ParmsValuesType.propLinkItemsSourceRaw, this.source.raw)
			// retrieve
			const result: ResponseBody = await apiFetch(
				ApiFunction.dbEdgeGetLinkItems,
				new TokenApiQueryData({ dataTab, tree: dataTree, user: sm.user })
			)
			if (result.success) {
				this.setRawItems(
					required(result.data.data, `${FILENAME}.PropLinkItems.retrieve`, 'rawItems')
				)
			} else {
				error(500, {
					file: FILENAME,
					function: 'retrieve',
					message: `Error retrieving LinkItemsSource: ${this.source.name}`
				})
			}
		}
	}

	setRawItems(rawItems: DataRecord[]) {
		this.rawItems = rawItems
		this.isRetrieved = true
	}
}

export class PropLinkItemsSource {
	displayIdSeparator: string
	exprFilter: string
	exprProps: string
	exprSort: string
	exprWith?: string
	name: string
	parmName?: string
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
		this.parmName = obj._parmName
		this.props = arrayOfClass(PropLinkItemsSourceProp, obj._props)
		this.raw = obj
		this.table = classOptional(DBTable, obj._table)

		let props = ''
		let display = ''
		this.props.forEach((p: PropLinkItemsSourceProp) => {
			if (display) display += '++' + this.displayIdSeparator
			display += p.expr

			if (props) props += ', '
			props += `${p.key} := ${p.expr}`
		})

		this.exprProps = `{ id, display := ${display}, ${props} }`
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

export enum PropSortDir {
	asc = 'asc',
	desc = 'desc'
}
