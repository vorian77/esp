import {
	arrayOfClasses,
	booleanOrDefault,
	booleanOrFalse,
	booleanRequired,
	DataObjCardinality,
	DataObjTable,
	debug,
	getArray,
	memberOfEnum,
	memberOfEnumOrDefault,
	nbrOrDefault,
	nbrOptional,
	nbrRequired,
	classOptional,
	override,
	strOptional,
	strRequired,
	DBTable,
	valueOrDefault,
	memberOfEnumIfExists
} from '$utils/types'
import {
	DataObjActionFieldConfirm,
	DataObjActionFieldShow,
	DataObjActionFieldTriggerEnable,
	DataObjComponent,
	DataObjListEditPresetType,
	DataObjProcessType,
	type DataRecord
} from '$comps/dataObj/types.dataObj'
import { DataObjActionQuery } from '$comps/app/types.appQuery'
import { TokenAppDoActionFieldType } from '$utils/types.token'
import { FieldColor, FieldItem } from '$comps/form/field'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/dataObj/types.rawDataObj.ts'

export class RawDataObj {
	actionsQuery: DataObjActionQuery[] = []
	codeCardinality: DataObjCardinality
	codeComponent: DataObjComponent
	codeListEditPresetType?: DataObjListEditPresetType
	crumbs: string[] = []
	description?: string
	exprFilter?: string
	exprObject?: string
	exprSort?: string
	header: string
	id: string
	isListEdit: boolean
	isListHideSearch: boolean
	listEditPresetExpr?: string
	listReorderColumn?: string
	name: string
	processType?: string
	rawActionsField: RawDataObjActionField[] = []
	rawParent?: RawDataObjParent
	rawPropsDisplay: RawDataObjPropDisplay[] = []
	rawPropsDisplayParm: RawDataObjPropDisplay[] = []
	rawPropsRepParmItems: RawDataObjPropDB[] = []
	rawPropsSaveInsert: RawDataObjPropDB[] = []
	rawPropsSaveUpdate: RawDataObjPropDB[] = []
	rawPropsSelect: RawDataObjPropDB[] = []
	rawPropsSelectPreset: RawDataObjPropDB[] = []
	rawPropsSort: RawDataObjPropDB[] = []
	subHeader?: string
	tables: DataObjTable[] = []
	constructor(obj: any) {
		const clazz = 'RawDataObj'
		obj = valueOrDefault(obj, {})
		this.actionsQuery = arrayOfClasses(DataObjActionQuery, obj._actionsQuery)
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
		this.header = strRequired(obj.header, clazz, 'header')
		this.id = strRequired(obj.id, clazz, 'id')
		this.isListEdit = booleanRequired(obj.isListEdit, clazz, 'isListEdit')
		this.isListHideSearch = booleanOrDefault(obj.isListHideSearch, false)
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
		this.rawActionsField = arrayOfClasses(
			RawDataObjActionField,
			obj._actionFieldGroup?._actionFieldItems
		)
		this.setParent(obj._parent)
		this.rawPropsDisplay = arrayOfClasses(RawDataObjPropDisplay, obj._propsDisplay)
		this.subHeader = strOptional(obj.subHeader, clazz, 'subHeader')
		this.tables = this.initTables(obj._tables)

		/* dependent properties */
		this.rawPropsSaveInsert = this.initProps(obj._propsSaveInsert)
		this.rawPropsSaveUpdate = this.initProps(obj._propsSaveUpdate)
		this.rawPropsSelect = this.initProps(obj._propsSelect)
		this.rawPropsSelectPreset = this.initProps(obj._propsSelectPreset)
		this.rawPropsSort = this.initProps(obj._propsSort)
		this.rawPropsRepParmItems = this.initProps(obj._propsRepParmItems)
	}

	initCrumbs(crumbFields: any) {
		crumbFields = getArray(crumbFields)
		let list: string[] = []
		crumbFields.forEach((cf: any) => {
			list.push(cf._name)
		})
		return list
	}
	initProps(source: any) {
		source = getArray(source)
		let newProps = arrayOfClasses(RawDataObjPropDB, source, this.tables)
		newProps = this.initPropsSignatureLink(newProps, 'createdBy')
		newProps = this.initPropsSignatureLink(newProps, 'modifiedBy')
		return newProps
	}
	initPropsSignatureLink(props: RawDataObjPropDB[], propName: string) {
		const idx = props.findIndex((f: any) => f.propName === propName)
		if (idx > -1) {
			props[idx].link = new PropLink({
				_columns: [{ _name: 'person' }, { _name: 'fullName' }],
				_table: { hasMgmt: false, mod: 'sys_user', name: 'SysUser' },
				exprPreset: `(SELECT DETACHED sys_user::SysUser FILTER .id = <user,uuid,id>).person.fullName`,
				exprSave: '(SELECT DETACHED sys_user::SysUser FILTER .id = <user,uuid,id>)',
				exprSelect: `(SELECT DETACHED sys_user::SysUser FILTER .id = <user,uuid,id>).person.fullName`
			})
		}
		return props
	}
	initTables(obj: any) {
		let newTables: DataObjTable[] = []
		const rawTables = getArray(obj)
		rawTables.forEach((rawTable: any, index: number) => {
			newTables.push(new DataObjTable(rawTable, newTables))
		})
		return newTables
	}
	setParent(obj: any) {
		this.rawParent = classOptional(RawDataObjParent, obj)
	}
}

export class RawDataObjActionField {
	actionFieldConfirms: DataObjActionFieldConfirm[]
	actionFieldShows: DataObjActionFieldShow[]
	codeActionFieldTriggerEnable: DataObjActionFieldTriggerEnable
	codeActionFieldType: TokenAppDoActionFieldType
	fieldColor: FieldColor
	header: string
	isListRowAction: boolean
	name: string
	constructor(obj: any) {
		const clazz = 'RawDataObjActionField'
		obj = valueOrDefault(obj._action, {})
		this.actionFieldConfirms = arrayOfClasses(DataObjActionFieldConfirm, obj._actionFieldConfirms)
		this.actionFieldShows = arrayOfClasses(DataObjActionFieldShow, obj._actionFieldShows)
		this.codeActionFieldTriggerEnable = memberOfEnum(
			obj._codeActionFieldTriggerEnable,
			clazz,
			'codeActionFieldTriggerEnable',
			'DataObjActionFieldTriggerEnable',
			DataObjActionFieldTriggerEnable
		)
		this.codeActionFieldType = memberOfEnum(
			obj._codeActionFieldType,
			clazz,
			'codeDbAction',
			'TokenAppDoActionType',
			TokenAppDoActionFieldType
		)
		this.fieldColor = new FieldColor(obj._codeColor, 'blue')
		this.header = strRequired(obj.header, clazz, 'header')
		this.isListRowAction = booleanOrFalse(obj.isListRowAction, 'isListRowAction')
		this.name = strRequired(obj.name, clazz, 'name')
	}
}

export class RawDataObjDyn extends RawDataObj {
	constructor(obj: any) {
		super(obj)
	}
	addPropDisplay(rawProp: any) {
		this.rawPropsDisplay.push(new RawDataObjPropDisplay(valueOrDefault(rawProp, {})))
	}
	addPropSelect(rawProp: any, tables: DataObjTable[]) {
		this.rawPropsSelect.push(new RawDataObjPropDB(valueOrDefault(rawProp, {}), tables))
	}
	addPropSelectRepParmItems(rawProp: any, tables: DataObjTable[]) {
		this.rawPropsRepParmItems.push(new RawDataObjPropDB(valueOrDefault(rawProp, {}), tables))
	}
	build() {
		return this
	}
}

export class RawDataObjParent {
	_columnName: string
	_columnIsMultiSelect: boolean
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
		this._filterExpr = strOptional(obj._filterExpr, clazz, '_filterExpr')
		this._table = new DBTable(obj._table)
	}
}
export class RawDataObjPropDB {
	childTableTraversal: string
	codeDataSourceValue: PropDataSourceValue
	codeDataType: PropDataType
	codeSortDir?: string
	exprCustom?: string
	exprPreset?: string
	fieldEmbed?: RawDataObjPropDBFieldEmbed
	hasItems: boolean
	indexTable: number
	isMultiSelect: boolean
	isSelfReference: boolean
	link?: PropLink
	linkItemsDefn?: PropLinkItemsDefn
	propName: string
	constructor(obj: any, tables: DataObjTable[]) {
		const clazz = 'RawDataObjPropDB'
		obj = valueOrDefault(obj, {})
		this.codeDataSourceValue = memberOfEnum(
			obj._codeDbDataSourceValue,
			clazz,
			'codeDbDataSourceValue',
			'PropDataSourceValue',
			PropDataSourceValue
		)
		this.codeDataType = memberOfEnum(
			obj._codeDataType,
			clazz,
			'codeDataType',
			'PropDataType',
			PropDataType
		)
		this.codeSortDir = memberOfEnumOrDefault(
			obj._codeSortDir,
			clazz,
			'codeSortDir',
			'PropSortDir',
			PropSortDir,
			PropSortDir.asc
		)
		this.exprCustom = strOptional(obj.exprCustom, clazz, 'exprCustom')
		this.exprPreset = strOptional(obj.exprPreset, clazz, 'exprPreset')
		this.fieldEmbed = obj._fieldEmbedListConfig
			? new RawDataObjPropDBFieldEmbed(
					RawDataObjPropDBFieldEmbedType.listConfig,
					obj._fieldEmbedListConfig._dataObjEmbedId
				)
			: obj._fieldEmbedListEdit
				? new RawDataObjPropDBFieldEmbed(
						RawDataObjPropDBFieldEmbedType.listEdit,
						obj._fieldEmbedListEdit._dataObjEmbedId
					)
				: obj._fieldEmbedListSelect
					? new RawDataObjPropDBFieldEmbed(
							RawDataObjPropDBFieldEmbedType.listSelect,
							obj._fieldEmbedListSelect._dataObjListId
						)
					: undefined
		this.hasItems = booleanOrDefault(obj._hasItems, false)
		this.indexTable = nbrOrDefault(obj.indexTable, -1)
		this.isMultiSelect = booleanOrDefault(obj._isMultiSelect, false)
		this.isSelfReference = booleanOrDefault(obj._isSelfReference, false)
		this.link = classOptional(PropLink, obj._link)
		this.linkItemsDefn = classOptional(PropLinkItemsDefn, obj._linkItemsDefn)
		this.propName = strRequired(obj._propName, clazz, 'propName')

		/* dependent properties */
		this.childTableTraversal = this.getChildTableTraversal(this.propName, this.indexTable, tables)
	}
	getChildTableTraversal(propName: string, indexTable: number, tables: DataObjTable[]) {
		let value = ''
		if (propName && indexTable > -1) {
			if (tables[indexTable].traversalFromRoot) value = tables[indexTable].traversalFromRoot + '.'
			value += propName
		}
		return value
	}
}

export class RawDataObjPropDBFieldEmbed {
	id: string
	type: RawDataObjPropDBFieldEmbedType
	constructor(type: RawDataObjPropDBFieldEmbedType, dataObjId: string) {
		const clazz = 'RawDataObjPropDBFieldEmbed'
		this.id = dataObjId
		this.type = type
	}
}

export enum RawDataObjPropDBFieldEmbedType {
	listConfig = 'listConfig',
	listEdit = 'listEdit',
	listSelect = 'listSelect'
}

export class RawDataObjPropDisplay {
	colDB: RawDBColumn
	codeSortDir?: PropSortDir
	customCol?: RawDataObjPropDisplayCustom
	fieldColor: FieldColor
	fieldEmbedListConfig?: RawDataObjPropDisplayEmbedListConfig
	fieldEmbedListEdit?: RawDataObjPropDisplayEmbedListEdit
	fieldEmbedListSelect?: RawDataObjPropDisplayEmbedListSelect
	fieldEmbedShellFields: string[]
	hasItems: boolean
	headerAlt?: string
	height?: number
	isDisplayable: boolean
	isDisplayBlock: boolean
	items: FieldItem[]
	label: string
	labelSide: string
	orderDefine: number
	orderSort?: number
	propName: string
	rawFieldAccess?: string
	rawFieldAlignmentAlt?: string
	rawFieldElement?: string
	width?: number
	constructor(obj: any) {
		const clazz = 'RawDataObjPropDisplay'
		obj = valueOrDefault(obj, {})
		this.colDB = new RawDBColumn(obj._column)
		this.codeSortDir = obj._codeSortDir
			? obj._codeSortDir === 'asc'
				? PropSortDir.asc
				: PropSortDir.desc
			: obj.orderSort
				? PropSortDir.asc
				: undefined
		this.customCol = classOptional(RawDataObjPropDisplayCustom, obj._customCol)
		this.fieldColor = new FieldColor(obj._codeColor, 'black')
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
		this.hasItems = booleanOrDefault(obj._hasItems, false)
		this.headerAlt = strOptional(obj.headerAlt, clazz, 'headerAlt')
		this.height = nbrOptional(obj.height, clazz, 'height')
		this.isDisplayable = booleanOrDefault(obj.isDisplayable, false)
		this.isDisplayBlock = booleanOrDefault(obj.isDisplayBlock, true)
		this.items = arrayOfClasses(FieldItem, obj._items)
		this.orderDefine = nbrRequired(obj.orderDefine, clazz, 'orderDefine')
		this.orderSort = nbrOptional(obj.orderSort, clazz, 'orderSort')
		this.propName = strRequired(obj._propName, clazz, 'propName')
		this.rawFieldAccess = strOptional(obj._codeAccess, clazz, 'rawFieldAccess')
		this.rawFieldAlignmentAlt = strOptional(obj._codeAlignmentAlt, clazz, 'rawFieldAlignmentAlt')
		this.rawFieldElement = strOptional(obj._codeFieldElement, clazz, 'rawFieldElement')
		this.width = nbrOptional(obj.width, clazz, 'width')

		/* dependent properties */
		this.label = override(obj.headerAlt, this.colDB.header, clazz, 'label')
		this.labelSide = valueOrDefault(this.colDB.headerSide, this.label)
	}
}
export class RawDataObjPropDisplayCustom {
	customColActionMethod?: string
	customColActionType?: string
	customColActionValue?: string
	customColAlign?: string
	customColCodeColor: FieldColor
	customColLabel?: string
	customColPrefix?: string
	customColSize?: string
	customColSource?: string
	customColSourceKey?: string
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'RawDataObjPropDisplayCustom'
		this.customColActionMethod = strOptional(
			obj.customColActionMethod,
			clazz,
			'customColActionMethod'
		)
		this.customColActionType = strOptional(obj.customColActionType, clazz, 'customColActionType')
		this.customColActionValue = strOptional(obj.customColActionValue, clazz, 'customColActionValue')
		this.customColAlign = strOptional(obj.customColAlign, clazz, 'customColAlign')
		this.customColCodeColor = new FieldColor(obj._customColCodeColor, 'blue')
		this.customColLabel = strOptional(obj.customColLabel, clazz, 'customColLabel')
		this.customColPrefix = strOptional(obj.customColPrefix, clazz, 'customColPrefix')
		this.customColSize = strOptional(obj.customColSize, clazz, 'customColSize')
		this.customColSource = strOptional(obj.customColSource, clazz, 'customColSource')
		this.customColSourceKey = strOptional(obj.customColSourceKey, clazz, 'customColSourceKey')
	}
}

export class RawDataObjPropDisplayEmbedListConfig {
	dataObjEmbedId: string
	dataObjModalId: string
	rawActionsFieldModal: RawDataObjActionField[]
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'RawDataObjPropDisplayEmbedListConfig'
		this.dataObjEmbedId = strRequired(obj._dataObjEmbedId, clazz, '_dataObjIdEmbed')
		this.dataObjModalId = strRequired(obj._dataObjModalId, clazz, '_dataObjIdModal')
		this.rawActionsFieldModal = arrayOfClasses(
			RawDataObjActionField,
			obj._actionFieldGroupModal._actionFieldItems
		)
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
	rawActionsFieldModal: RawDataObjActionField[]
	constructor(obj: any) {
		const clazz = 'RawDataObjPropDisplayEmbedListSelect'
		obj = valueOrDefault(obj, {})
		this.btnLabelComplete = this.initBtnComplete(
			clazz,
			obj.btnLabelComplete,
			obj._actionFieldGroupModal._actionFieldItems
		)
		this.dataObjListID = strRequired(obj._dataObjListId, clazz, '_dataObjId')
		this.rawActionsFieldModal = arrayOfClasses(
			RawDataObjActionField,
			obj._actionFieldGroupModal._actionFieldItems
		)
	}
	initBtnComplete(clazz: string, label: string | undefined, actions: RawDataObjActionField[] = []) {
		const btnLabelComplete = strOptional(label, clazz, 'btnLabelComplete')
		if (btnLabelComplete) {
			const actionDone = actions.find((action) => {
				return action.name === 'noa_dialog_done'
			})
			if (actionDone) actionDone.header = btnLabelComplete
		}
		return btnLabelComplete
	}
}

export class RawDataObjTable {
	_columnParent?: string
	index: number
	indexParent?: number
	_table: DBTable
	constructor(obj: any) {
		const clazz = 'RawDataObjTable'
		obj = valueOrDefault(obj, {})
		this._columnParent = strOptional(obj._columnParent, clazz, '_columnParent')
		this.index = nbrRequired(obj.index, clazz, 'index')
		this.indexParent = nbrOptional(obj.indexParent, clazz, 'indexParent')
		this._table = new DBTable(obj._table)
	}
}

export class RawDBColumn {
	codeDataType: string
	classProps?: string
	exprStorageKey?: string
	header: string
	headerSide?: string
	isMultiSelect: boolean
	isNonData: boolean
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
	togglePresetTrue?: boolean
	toggleValueFalse?: string
	toggleValueShow?: boolean
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
		this.isMultiSelect = booleanRequired(obj.isMultiSelect, clazz, 'isMultiSelect')
		this.isNonData = booleanRequired(obj.isNonData, clazz, 'isNonData')
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
		this.togglePresetTrue = booleanOrDefault(obj.togglePresetTrue, false)
		this.toggleValueFalse = strOptional(obj.toggleValueFalse, clazz, 'toggleValueFalse')
		this.toggleValueShow = booleanOrDefault(obj.toggleValueShow, false)
		this.toggleValueTrue = strOptional(obj.toggleValueTrue, clazz, 'toggleValueTrue')
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
	exprPreset?: string
	exprSave?: string
	exprSelect?: string
	propDisplay?: string
	table?: DBTable
	constructor(obj: any) {
		const clazz = 'PropLink'
		obj = valueOrDefault(obj, {})
		this.exprPreset = strOptional(obj.exprPreset, clazz, 'exprPreset')
		this.exprSave = strOptional(obj.exprSave, clazz, 'exprSave')
		this.exprSelect = strOptional(obj.exprSelect, clazz, 'exprSelect')
		this.propDisplay =
			Array.isArray(obj._columns) && obj._columns.length > 0
				? obj._columns.map((col: any) => col._name).join('.')
				: ''
		this.table = obj._table ? new DBTable(obj._table) : undefined
	}
}

export class PropLinkItemsDefn {
	exprFilter: string
	exprPropDisplay: string
	exprSort: string
	exprWith?: string
	parms: DataRecord
	table?: DBTable
	constructor(obj: any) {
		const clazz = 'PropLinkItemsDefn'
		obj = valueOrDefault(obj, {})
		this.exprFilter = valueOrDefault(obj.exprFilter, '')
		this.exprPropDisplay = strRequired(obj.exprPropDisplay, clazz, 'expProprDisplay')
		this.exprSort = valueOrDefault(obj.exprSort, '')
		this.exprWith = valueOrDefault(obj.exprWith, '')
		this.table = classOptional(DBTable, obj._table)
		this.parms = obj._fieldListItemsParmName
			? { fieldListItemsParmName: obj._fieldListItemsParmName }
			: {}
	}
}

export enum PropSortDir {
	asc = 'ASC',
	desc = 'DESC'
}
