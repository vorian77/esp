import { State } from '$comps/app/types.state.svelte'
import {
	arrayOfClass,
	booleanOrDefault,
	booleanOrFalse,
	booleanRequired,
	classOptional,
	CodeAction,
	DataObjCardinality,
	DataObjData,
	DataObjSort,
	DataObjType,
	type DataRecord,
	debug,
	FieldEmbedListType,
	FileStorage,
	getArray,
	getDbExprRaw,
	getValueData,
	isNumber,
	memberOfEnum,
	memberOfEnumIfExists,
	memberOfEnumOrDefault,
	nbrOrDefault,
	nbrOptional,
	nbrRequired,
	override,
	ParmsValuesType,
	PropDataType,
	recordValueGet,
	required,
	strOptional,
	strRequired,
	valueOrDefault,
	MethodResult
} from '$utils/types'
import { DataObjListEditPresetType, DataObjProcessType } from '$comps/dataObj/types.dataObj.svelte'
import { UserAction, UserActionConfirm } from '$comps/other/types.userAction.svelte'
import {
	DbTable,
	DbTableQueryGroup,
	QuerySource,
	QuerySourceRaw,
	QuerySourceType
} from '$lib/queryClient/types.queryClient'
import { clientQueryExpr } from '$lib/queryClient/types.queryClient'
import { FieldAccess, FieldColumnItem } from '$comps/form/field.svelte'

import { type ColumnsDefsSelect } from '$comps/grid/grid'
import { TokenAppNav, TokenAppUserActionConfirmType } from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/dataObj/types.rawDataObj.ts'

export class DataObjStyle {
	exprTrigger?: string
	styleProp: string
	styleValue: string
	constructor(obj: any) {
		const clazz = 'DataObjStyle'
		obj = valueOrDefault(obj, {})
		this.exprTrigger = strOptional(obj.exprTrigger, clazz, 'exprTrigger')
		this.styleProp = strRequired(obj.styleProp, clazz, 'styleProp')
		this.styleValue = strRequired(obj.styleValue, clazz, 'styleValue')
	}
}

export enum PropDataSourceValue {
	calculate = 'calculate',
	edgeDB = 'edgeDB'
}

export enum PropKeyType {
	custom = 'custom',
	expr = 'expr',
	exprCustom = 'exprCustom',
	link = 'link',
	linkItems = 'linkItems',
	table = 'table'
}

export class PropLink {
	exprProps: string
	table?: DbTable
	constructor(obj: any) {
		const clazz = 'PropLink'
		obj = valueOrDefault(obj, {})
		const cols = getArray(obj._columns)
		const exprDisplayColumns = cols.reduce((acc: string, col: any) => {
			if (acc) acc += '.'
			acc += col._name
			return acc
		}, '')
		const exprDisplay = exprDisplayColumns
			? `.${exprDisplayColumns}`
			: obj._exprCustom
				? obj._exprCustom
				: `.id`
		this.exprProps = `{ data := .id, display := ${exprDisplay} }`
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
				value += recordValueGet(record, prop.key)
			}
		})
		return value
	}

	getDataItemsAll(fieldValue: DataRecord | DataRecord[]) {
		const records: DataRecord[] = getArray(fieldValue)
		const idsSelected = records.map((r) => r.data)
		let fieldItems: FieldColumnItem[] = []
		this.rawItems.forEach((item) => {
			fieldItems.push(
				new FieldColumnItem(
					item.data,
					this.formatDataItemDisplay(item),
					idsSelected.includes(item.data)
				)
			)
		})
		return fieldItems
	}

	getDisplayValueListIds(idsCurrent: string | string[]) {
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

	getDisplayValueListRecords(records: any[]) {
		records = getArray(records)
		const ids = records.map((r) => r.data)
		return this.getDisplayValueListIds(ids)
	}

	getValueDisplay(valueRaw: any | any[]) {
		const valueRawList = getArray(valueRaw)
		const ids = valueRawList.map((r) => r.data)
		let values = ''
		this.rawItems.forEach((item) => {
			if (ids.includes(item.data)) {
				if (values) values += ', '
				values += this.formatDataItemDisplay(item)
			}
		})
		return values
	}

	getValueIds(valueRaw: any | any[]) {
		const valueRawList = valueRaw ? getArray(valueRaw) : []
		const ids = valueRawList.map((r) => r.data)
		return ids
	}

	getValueRaw(valueDisplay: string | string[]) {
		if (Array.isArray(valueDisplay)) {
			const returnValues = this.rawItems.filter((item) => {
				return valueDisplay.includes(item.data)
			})
			return returnValues
		} else {
			const returnValue = this.rawItems.find((item) => {
				return item.data === valueDisplay
			})
			return returnValue || ''
		}
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
				row[prop.key] = recordValueGet(item, prop.key)
			})
			return row
		})
	}

	getValuesSelect() {
		const resetItem = { data: '', display: ' ', name: '' }
		return [null, ...this.rawItems]
	}

	async retrieve(sm: State, fieldValue: string | undefined = undefined): Promise<MethodResult> {
		const clazz = 'PropLinkItems.retrieve'
		const exprCustom = this.source.getExprSelect(false, fieldValue)

		const dataTab = new DataObjData()
		dataTab.parms.valueSet(ParmsValuesType.itemsParmValue, this.source.parmValue)
		dataTab.parms.valueSet(ParmsValuesType.itemsParmValueList, this.source.parmValueList)

		let result: MethodResult = await clientQueryExpr(clazz, exprCustom, { dataTab }, sm)
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
	header?: string
	name: string
	parmValue?: string
	parmValueList: string[]
	props: PropLinkItemsSourceProp[] = []
	querySource: QuerySource
	raw: any
	constructor(obj: any) {
		const clazz = 'PropLinkItemsSource'
		obj = valueOrDefault(obj, {})
		this.displayIdSeparator = valueOrDefault(obj.displayIdSeparator, ' ')
		this.header = strOptional(obj._header, clazz, 'header')
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
			if (p.isDisplayId) {
				if (display) {
					display += ' ++ '
					if (this.displayIdSeparator) display += `"${this.displayIdSeparator}" ++ `
				}
				display += p.expr
			}
			if (props) props += ', '
			props += `${p.key} := ${p.expr}`
		})
		this.exprProps = `{ data := .id, display := ${display}, ${props} }`
	}

	getExprSelect(isCompilation: boolean, currVal: string | string[] | undefined) {
		let exprSelect =
			this.querySource.exprUnions.length > 0
				? this.getExprSelectUnions()
				: this.getExprSelectBase(currVal)

		// assemble
		let expr = getDbExprRaw(this.querySource.exprWith, exprSelect)

		const exprSort =
			this.querySource.exprSort ||
			this.getSortProps().reduce((sort, prop) => {
				if (sort) sort += ' THEN '
				return (sort += `.${prop.key}`)
			}, '')

		if (isCompilation) {
			expr = `(${expr}) ${this.exprProps}`
			expr += exprSort ? ` ORDER BY ${exprSort}` : ''
			expr = `(SELECT ${expr})`
		} else {
			expr = `SELECT (${expr}) ${this.exprProps}`
			expr += exprSort ? ` ORDER BY ${exprSort}` : ''
		}

		return expr
	}

	getExprSelectBase(currVal: string | string[] | undefined) {
		if (!this.querySource.table?.object) {
			return `SELECT <str>{}`
		} else {
			let exprSelectTable = this.querySource.table.object
			// filterCore
			let filterCore = `SELECT ${exprSelectTable}`
			if (this.querySource.exprFilter) {
				filterCore += ` FILTER ${this.querySource.exprFilter}`
			}
			filterCore = `(${filterCore})`

			let filterExcept = this.querySource.exprFilterExcept
				? `(${this.querySource.exprFilterExcept})`
				: ''

			// filterCurrValue
			let filterCurrValue = ''
			if (currVal && Array.isArray(currVal) ? currVal.length > 0 : currVal) {
				let filterCurrValueIds = ''
				if (Array.isArray(currVal)) {
					if (currVal.length > 0) {
						filterCurrValueIds = `.id IN <uuid>{${currVal.map((v: string) => `'${v}'`).join(',')}}`
					}
				} else if (currVal) {
					filterCurrValueIds = `.id = <uuid>'${currVal}'`
				}
				filterCurrValue = `(SELECT ${exprSelectTable} FILTER ${filterCurrValueIds})`
			}

			let exprSelect = ''
			if (!(filterCore || filterExcept || filterCurrValue)) {
				exprSelect = `SELECT ${exprSelectTable}`
			} else if (!(filterExcept || filterCurrValue)) {
				exprSelect = filterCore
			} else {
				let filter = filterCore
				if (filterExcept) filter += ` EXCEPT ${filterExcept}`
				if (filterCurrValue) filter += ` UNION ${filterCurrValue}`
				if (filter) filter = `.id IN (SELECT DISTINCT (${filter})).id`
				exprSelect = `SELECT ${exprSelectTable} FILTER ${filter}`
			}
			return exprSelect
		}
	}

	getExprSelectUnions() {
		let exprUnions = ''
		this.querySource.exprUnions.forEach((item) => {
			if (exprUnions) exprUnions += ' UNION '
			exprUnions += `(${item})`
		})
		let exprSelect = `{ ${exprUnions} }`
		return exprSelect
	}

	getSortProps() {
		return this.props
			.filter((prop) => isNumber(prop.orderSort))
			.sort((a, b) => a.orderSort! - b.orderSort!)
	}

	getTableObj() {
		return this.querySource.table ? this.querySource.table.object : undefined
	}

	setParmValue(parmValue: any) {
		this.parmValue = getValueData(parmValue)
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

export class RawDataObj {
	codeCardinality: DataObjCardinality
	codeListPresetType?: DataObjListEditPresetType
	crumbs: string[] = []
	description?: string
	formStyles: DataObjStyle[]
	header: string
	id: string
	isFormReadonly: boolean
	isInitialValidationSilent: boolean
	isListEdit: boolean
	isListSuppressFilterSort: boolean
	isListSuppressSelect: boolean
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
		this.codeCardinality = memberOfEnum(
			obj._codeCardinality,
			clazz,
			'codeCardinality',
			'DataObjCardinality',
			DataObjCardinality
		)
		this.codeListPresetType = memberOfEnumIfExists(
			obj._codeListPresetType,
			clazz,
			'codeListPresetType',
			'DataObjListEditPresetType',
			DataObjListEditPresetType
		)
		this.crumbs = this.initCrumbs(obj._propsCrumb)
		this.description = strOptional(obj.description, clazz, 'description')
		this.formStyles = arrayOfClass(DataObjStyle, obj._formStyles)
		this.header = strRequired(obj.header, clazz, 'header')
		this.id = strRequired(obj.id, clazz, 'id')
		this.isFormReadonly = booleanOrDefault(obj.isRetrieveReadonly, false)
		this.isInitialValidationSilent = booleanOrDefault(obj.isInitialValidationSilent, false)
		this.isListEdit = booleanRequired(obj.isListEdit, clazz, 'isListEdit')
		this.isListSuppressFilterSort = booleanOrDefault(obj.isListSuppressFilterSort, false)
		this.isListSuppressSelect = booleanOrDefault(obj.isListSuppressSelect, false)
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
				p.isLinkSignature = true
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
		this.action = new UserAction(new RawUserAction({ ...obj._action, headerAlt: obj.headerAlt }))
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
		const propSelect = new RawDataObjPropDB(valueOrDefault(rawProp, {}), tableGroup)
		this.rawPropsSelect.push(propSelect)
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
	fieldEmbedListType?: FieldEmbedListType
	fieldEmbedShellFields: string[]
	hasItems: boolean
	id: string
	indexTable: number
	isLinkSignature: boolean
	link?: PropLink
	linkItemsSource?: PropLinkItemsSource = $state()
	propKeyType?: PropKeyType
	propKeyTypeId: string = ''
	propName: string
	propNameKey: string
	propNameKeyPrefix: string
	propNameKeySuffix: string
	rawFieldEmbedList?: RawFieldEmbedList
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
		this.hasItems = booleanOrDefault(obj._hasItems, false)
		this.id = strRequired(obj.id, clazz, 'id')
		this.indexTable = nbrOrDefault(obj.indexTable, -1)
		this.isLinkSignature = booleanOrDefault(obj.isLinkSignature, false)
		this.linkItemsSource = classOptional(PropLinkItemsSource, obj._linkItemsSource)
		this.propName = strRequired(obj._propName, clazz, 'propName')
		this.propNameKeyPrefix = valueOrDefault(obj.propNameKeyPrefix, '')
		this.propNameKeySuffix = valueOrDefault(obj.propNameKeySuffix, '')
		this.fieldEmbedShellFields = obj._fieldEmbedShellFields
			? obj._fieldEmbedShellFields.map((f: { _name: string }) => f._name)
			: []

		/* derived properties */
		this.setFieldEmbedList(
			RawFieldEmbedList,
			FieldEmbedListType.listConfig,
			obj._fieldEmbedListConfig,
			obj,
			tableGroup
		)
		this.setFieldEmbedList(
			RawFieldEmbedList,
			FieldEmbedListType.listEdit,
			obj._fieldEmbedListEdit,
			obj,
			tableGroup
		)
		this.setFieldEmbedList(
			RawFieldEmbedList,
			FieldEmbedListType.listSelect,
			obj._fieldEmbedListSelect,
			obj,
			tableGroup
		)
		if (obj._link?._columns?.length > 0 || obj._link?._table) this.link = new PropLink(obj._link)

		if (tableGroup.tables.length > 0 && this.indexTable > 0) {
			this.propKeyType = PropKeyType.table
			this.propKeyTypeId = tableGroup.tables[this.indexTable].table.name
		} else if (this.link) {
			this.propKeyType = PropKeyType.link
		} else if (this.linkItemsSource) {
			this.propKeyType = PropKeyType.linkItems
		} else if (this.exprCustom) {
			this.propKeyType = PropKeyType.exprCustom
		}
		this.propNameKey = this.getPropNameKey()
	}

	getPropNameKey() {
		let propNameKey = this.propKeyType
			? this.propKeyType +
				(this.propKeyTypeId ? '_' + this.propKeyTypeId : '') +
				'_' +
				this.propName
			: this.propName
		propNameKey = this.propNameKeyPrefix ? this.propNameKeyPrefix + '.' + propNameKey : propNameKey
		propNameKey = this.propNameKeySuffix ? propNameKey + '.' + this.propNameKeySuffix : propNameKey
		return propNameKey
	}

	setFieldEmbedList(
		fClassEmbed: any,
		fieldEmbedListType: FieldEmbedListType,
		objRawEmbed: any,
		obj: any,
		tableGroup: DbTableQueryGroup
	): any {
		if (objRawEmbed) {
			objRawEmbed._embedPropName = obj._propName
			objRawEmbed._embedTable = obj._link?._table
			objRawEmbed._parentColumnBackLink = obj._columnBacklink
			objRawEmbed._parentTableRoot = tableGroup.getTableRoot()?._rawObj
			this.rawFieldEmbedList = new fClassEmbed(objRawEmbed)
			this.fieldEmbedListType = fieldEmbedListType
		}
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
			this.propName,
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

export class RawDataObjPropDisplay extends RawDataObjProp {
	codeColor?: string
	colDB: RawDBColumn
	customCol?: RawDataObjPropDisplayCustom
	fieldStyles: DataObjStyle[]
	headerAlt?: string
	height?: number
	inputMaskAlt?: string
	isDisplay: boolean
	isDisplayable: boolean
	isDisplayBlock: boolean
	isFirstVisible: boolean = false
	isParmValue: boolean
	itemChanges: RawDataObjPropDisplayItemChange[]
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
		this.fieldStyles = arrayOfClass(DataObjStyle, obj._fieldStyles)
		this.headerAlt = strOptional(obj.headerAlt, clazz, 'headerAlt')
		this.height = nbrOptional(obj.height, clazz, 'height')
		this.inputMaskAlt = strOptional(obj.inputMaskAlt, clazz, 'inputMaskAlt')
		this.isDisplayable = booleanOrDefault(obj.isDisplayable, false)
		this.isDisplayBlock = booleanOrDefault(obj.isDisplayBlock, true)
		this.isParmValue = booleanOrDefault(obj.isParmValue, false)
		this.itemChanges = arrayOfClass(RawDataObjPropDisplayItemChange, obj._itemChanges)
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
	_codeItemChangeRecordStatus?: string
	_codeItemChangeTriggerType: string
	_codeItemChangeValueType?: string
	_codeOp?: string
	_columns: string[]
	_valueTargetIdAttribute?: string
	_valueTargetIdCode?: string
	_valueTriggerIdsAttribute: string[]
	_valueTriggerIdsCode: string[]
	retrieveParmKey?: string
	valueTargetScalar?: string
	valueTriggerExpr?: string
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
		this._codeItemChangeRecordStatus = obj._codeItemChangeRecordStatus
		this._codeItemChangeTriggerType = strRequired(
			obj._codeItemChangeTriggerType,
			clazz,
			'_codeItemChangeTriggerType'
		)
		this._codeItemChangeValueType = obj._codeItemChangeValueType
		this._codeOp = obj._codeOp
		this._columns = getArray(obj._columns)
		this._valueTargetIdAttribute = obj._valueTargetIdAttribute
		this._valueTargetIdCode = obj._valueTargetIdCode
		this._valueTriggerIdsAttribute = getArray(obj._valueTriggerIdsAttribute)
		this._valueTriggerIdsCode = getArray(obj._valueTriggerIdsCode)
		this.retrieveParmKey = obj.retrieveParmKey
		this.valueTargetScalar = obj.valueTargetScalar
		this.valueTriggerExpr = obj.valueTriggerExpr
		this.valueTriggerScalar = obj.valueTriggerScalar
	}
}

export class RawDataObjPropDisplayCustom {
	_customColCodeComponent?: string
	action?: UserAction
	customColActionValue?: string
	customColAlign?: string
	customColFile?: any
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
		this._customColCodeComponent = strOptional(
			obj._customColCodeComponent,
			clazz,
			'_customColCodeComponent'
		)
		if (obj._action) {
			this.action = new UserAction(new RawUserAction(obj._action))
		}
		this.customColActionValue = strOptional(obj.customColActionValue, clazz, 'customColActionValue')
		this.customColAlign = strOptional(obj.customColAlign, clazz, 'customColAlign')
		this.customColFile = classOptional(FileStorage, obj.customColFile)
		this.customColIsSubHeader = obj.customColIsSubHeader
		this.customColLabel = strOptional(obj.customColLabel, clazz, 'customColLabel')
		this.customColPrefix = strOptional(obj.customColPrefix, clazz, 'customColPrefix')
		this.customColRawHTML = strOptional(obj.customColRawHTML, clazz, 'customColRawHTML')
		this.customColSize = strOptional(obj.customColSize, clazz, 'customColSize')
		this.customColSource = strOptional(obj.customColSource, clazz, 'customColSource')
		this.customColSourceKey = strOptional(obj.customColSourceKey, clazz, 'customColSourceKey')
	}
}

export class RawFieldEmbedList {
	_objRaw: any
	embedDataObjId: string
	embedPropName: string
	embedTable: DbTable
	parentColumnBackLink?: string
	parentTableRoot: DbTable
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'RawFieldEmbedList'
		this._objRaw = obj
		this.embedDataObjId = strRequired(obj._dataObjEmbedId, clazz, '_dataObjIdEmbed')
		this.embedPropName = strRequired(obj._embedPropName, clazz, '_embedPropName')
		this.embedTable = new DbTable(obj._embedTable)
		this.parentColumnBackLink = strOptional(
			obj._parentColumnBackLink,
			clazz,
			'_parentColumnBackLink'
		)
		this.parentTableRoot = new DbTable(obj._parentTableRoot)
	}
}

export class RawDBColumn {
	codeDataType: PropDataType
	classProps?: string
	description?: string
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
		this.description = strOptional(obj.description, clazz, 'description')
		this.exprStorageKey = strOptional(obj.exprStorageKey, clazz, 'exprStorageKey')
		this.header = strRequired(obj.header, clazz, 'header')
		this.headerSide = strOptional(obj.headerSide, clazz, 'headerSide')
		this.inputMask = strOptional(obj.inputMask, clazz, 'inputMask')
		this.isFormTag = booleanOrFalse(obj.isFormTag)
		this.isMultiSelect = booleanOrDefault(obj.isMultiSelect, false)
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
	codeAction: CodeAction
	codeConfirmType: TokenAppUserActionConfirmType
	exprAction: string
	exprEnable: string
	exprShow: string
	exprShowExpr: string
	exprWith: string
	header?: string
	navDestination?: TokenAppNav
	name: string
	constructor(obj: any) {
		const clazz = 'RawUserAction'
		obj = valueOrDefault(obj, {})
		this.actionConfirms = arrayOfClass(UserActionConfirm, obj._actionConfirms)
		this.codeAction = new CodeAction(obj._codeAction)
		this.codeConfirmType = memberOfEnumOrDefault(
			obj._codeConfirmType,
			clazz,
			'codeConfirmType',
			'TokenAppUserActionConfirmType',
			TokenAppUserActionConfirmType,
			TokenAppUserActionConfirmType.none
		)
		this.exprAction = valueOrDefault(obj.exprAction, '')
		this.exprEnable = valueOrDefault(obj.exprEnable, `<always>`)
		this.exprShow = valueOrDefault(obj.exprShow, `<always>`)
		this.exprShowExpr = valueOrDefault(obj.exprShowExpr, '')
		this.exprWith = valueOrDefault(obj.exprWith, '')
		this.header = obj.headerAlt || obj.header
		this.name = strRequired(obj.name, clazz, 'name')
		this.navDestination = classOptional(TokenAppNav, obj._navDestination)
	}
}
