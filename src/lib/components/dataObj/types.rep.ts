import {
	arrayOfClasses,
	booleanOrDefault,
	booleanOrFalse,
	booleanRequired,
	classOptional,
	debug,
	memberOfEnum,
	memberOfEnumIfExists,
	nbrOptional,
	nbrRequired,
	RepElementType,
	strOptional,
	strRequired,
	valueOrDefault
} from '$utils/utils'
import { DBTable } from '$utils/types'
import { FieldAlignment, FieldElement } from '$comps/form/field'
import {
	PropDataSourceValue,
	PropDataType,
	PropLinkItemsDefn,
	PropSortDir,
	RawDataObjTable
} from '$comps/dataObj/types.rawDataObj'

const FILENAME = '$comps/report/types.report.ts'

export class RepAnalytic {
	description?: string
	header?: string
	name: string
	parms: RepParm[]
	statuses: RepAnalyticStatus[]
	constructor(obj: any) {
		const clazz = 'RepAnalytic'
		obj = valueOrDefault(obj, {})
		this.description = strOptional(obj.description, clazz, 'description')
		this.header = strOptional(obj.header, clazz, 'header')
		this.name = strRequired(obj.name, clazz, 'name')
		this.parms = arrayOfClasses(RepParm, obj.parms)
		this.statuses = arrayOfClasses(RepAnalyticStatus, obj.statuses)
	}
}

export class RepAnalyticStatus {
	codeStatus: RepAnalyticStatusType
	comment?: string
	expr?: string
	constructor(obj: any) {
		const clazz = 'ReportAnalyticStatus'
		obj = valueOrDefault(obj, {})
		this.codeStatus = memberOfEnum(
			obj._codeStatus,
			clazz,
			'codeStatus',
			'RepAnalyticStatusType',
			RepAnalyticStatusType
		)
		this.comment = strOptional(obj.comment, clazz, 'comment')
		this.expr = strOptional(obj.expr, clazz, 'expr')
	}
}

export enum RepAnalyticStatusType {
	awaiting_prerequisites = 'awaiting_prerequisites',
	high = 'high',
	medium = 'medium',
	met = 'met',
	not_met = 'not_met',
	pending = 'pending'
}

export class Rep {
	actionFieldGroup: any
	analytics: RepAnalytic[] = []
	description?: string
	elements: RepEl[]
	exprFilter?: string
	exprObject?: string
	exprSort?: string
	header?: string
	id: string
	name: string
	tables: RawDataObjTable[]
	constructor(obj: any) {
		const clazz = 'Rep'
		obj = valueOrDefault(obj, {})
		this.actionFieldGroup = obj._actionFieldGroup
		// this.analytics = getArrayOfModels(RepAnalytic, obj.analytics)
		this.description = strOptional(obj.description, clazz, 'description')
		this.elements = arrayOfClasses(RepEl, obj.elements)
		this.exprFilter = strOptional(obj.exprFilter, clazz, 'exprFilter')
		this.exprObject = strOptional(obj.exprObject, clazz, 'exprObject')
		this.exprSort = strOptional(obj.exprSort, clazz, 'exprSort')
		this.header = strOptional(obj.header, clazz, 'header')
		this.id = strRequired(obj.id, clazz, 'id')
		this.name = strRequired(obj.name, clazz, 'name')
		this.tables = arrayOfClasses(RawDataObjTable, obj.tables)
	}
}

export class RepEl {
	_codeAlignment?: FieldAlignment
	_codeDataType?: PropDataType
	_codeDbDataSourceValue?: PropDataSourceValue
	_codeFieldElement?: FieldElement
	_codeReportElementType?: RepElementType
	_codeSortDir?: PropSortDir
	_column?: RepElColumn
	description?: string
	exprCustom?: string
	header?: string
	indexTable?: number
	isDisplay: boolean
	isDisplayable: boolean
	nameCustom?: string
	orderDefine: number
	orderDisplay?: number
	orderSort?: number
	constructor(obj: any) {
		const clazz = 'RepEl'
		obj = valueOrDefault(obj, {})
		this._codeAlignment = memberOfEnumIfExists(
			obj._codeAlignment,
			clazz,
			'codeAlignment',
			'FieldAlignment',
			FieldAlignment
		)
		this._codeDataType = memberOfEnumIfExists(
			obj._codeDataType,
			clazz,
			'codeDataType',
			'PropDataType',
			PropDataType
		)
		this._codeDbDataSourceValue = memberOfEnum(
			obj._codeDbDataSourceValue,
			clazz,
			'_codeDbDataSourceValue',
			'PropDataSourceValue',
			PropDataSourceValue
		)
		this._codeFieldElement = memberOfEnumIfExists(
			obj._codeFieldElement,
			clazz,
			'codeFieldElement',
			'FieldElement',
			FieldElement
		)
		this._codeSortDir = memberOfEnumIfExists(
			obj._codeSortDir,
			clazz,
			'codeSortDir',
			'PropSortDir',
			PropSortDir
		)
		this._codeReportElementType = memberOfEnumIfExists(
			obj._codeType,
			clazz,
			'codeType',
			'RepElementType',
			RepElementType
		)
		this._column = obj._column ? new RepElColumn(obj._column) : undefined
		this.description = strOptional(obj.description, clazz, 'description')
		this.exprCustom = strOptional(obj.exprCustom, clazz, 'expr')
		this.header = strOptional(obj.header, clazz, 'header')
		this.indexTable = nbrOptional(obj.indexTable, clazz, 'indexTable')
		this.isDisplayable = booleanRequired(obj.isDisplayable, clazz, 'isDisplayable')
		this.nameCustom = strOptional(obj.nameCustom, clazz, 'name')
		this.orderDefine = nbrRequired(obj.orderDefine, clazz, 'orderDefine')
		this.orderDisplay = nbrOptional(obj.orderDisplay, clazz, 'orderDisplay')
		this.orderSort = nbrOptional(obj.orderSort, clazz, 'orderSort')
	}
}

export class RepElColumn {
	_codeAlignment: FieldAlignment
	_codeDataType: PropDataType
	header: string
	name: string
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'RepElColumn'
		this._codeAlignment = memberOfEnum(
			obj._codeAlignment,
			clazz,
			'codeAlignment',
			'FieldAlignment',
			FieldAlignment
		)
		this._codeDataType = memberOfEnum(
			obj._codeDataType,
			clazz,
			'codeDataType',
			'PropDataType',
			PropDataType
		)
		this.header = strRequired(obj.header, clazz, 'header')
		this.name = strRequired(obj.name, clazz, 'name')
	}
}

export class RepParm {
	codeDataType: PropDataType
	codeFieldElement: FieldElement
	description?: string
	fieldListItems?: PropLinkItemsDefn
	header: string
	isMultiSelect: boolean
	linkTable?: DBTable
	name: string
	constructor(obj: any) {
		const clazz = 'RepParm'
		obj = valueOrDefault(obj, {})
		this.codeDataType = memberOfEnum(
			obj._codeDataType,
			clazz,
			'codeDataType',
			'PropDataType',
			PropDataType
		)
		this.codeFieldElement = memberOfEnum(
			obj._codeFieldElement,
			clazz,
			'codeFieldElement',
			'FieldElement',
			FieldElement
		)
		this.description = strOptional(obj.description, clazz, 'description')
		this.fieldListItems = classOptional(PropLinkItemsDefn, obj._fieldListItems)
		this.header = strRequired(obj.header, clazz, 'header')
		this.isMultiSelect = booleanOrFalse(obj.isMultiSelect, 'isMultiSelect')
		this.linkTable = classOptional(DBTable, obj._linkTable)
		this.name = strRequired(obj.name, clazz, 'name')
	}
}

export class RepUser {
	analytics: RepAnalytic[] = []
	descriptionUser?: string
	elements: RepUserEl[] = []
	headerUser: string
	parms: RepUserParm[] = []
	report: Rep
	constructor(obj: any) {
		const clazz = 'Rep'
		obj = valueOrDefault(obj, {})
		// this.analytics = arrayOfClasses(obj.analytics, RepAnalytic)
		this.descriptionUser = strOptional(obj.descriptionUser, clazz, 'descriptionUser')
		this.elements = arrayOfClasses(RepUserEl, obj.elements)
		this.headerUser = strRequired(obj.headerUser, clazz, 'headerUser')
		this.parms = arrayOfClasses(RepUserParm, obj.parms)
		this.report = new Rep(obj.report)
	}
}

export class RepUserEl {
	element: RepEl
	isDisplay: boolean
	constructor(obj: any) {
		const clazz = 'RepUserEl'
		obj = valueOrDefault(obj, {})
		this.element = new RepEl(obj.element)
		this.isDisplay = booleanOrDefault(obj.isDisplay, true)
	}
}

export class RepUserParm {
	parm: RepParm
	parmValue: any
	constructor(obj: any) {
		const clazz = 'RepUserParm'
		obj = valueOrDefault(obj, {})
		this.parm = new RepParm(obj.parm)
		this.parmValue = obj.parmValue
	}
}
