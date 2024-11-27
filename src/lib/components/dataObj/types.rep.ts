import {
	arrayOfClass,
	booleanOrDefault,
	booleanOrFalse,
	booleanRequired,
	classOptional,
	debug,
	memberOfEnum,
	memberOfEnumIfExists,
	memberOfEnumOrDefault,
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
	PropLinkItemsSource,
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
		this.parms = arrayOfClass(RepParm, obj.parms)
		this.statuses = arrayOfClass(RepAnalyticStatus, obj.statuses)
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
	elementsSort: RepEl[]
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
		this.elements = arrayOfClass(RepEl, obj.elements)
		this.elementsSort = arrayOfClass(RepEl, obj.elementsSort)
		this.exprFilter = strOptional(obj.exprFilter, clazz, 'exprFilter')
		this.exprObject = strOptional(obj.exprObject, clazz, 'exprObject')
		this.exprSort = strOptional(obj.exprSort, clazz, 'exprSort')
		this.header = strOptional(obj.header, clazz, 'header')
		this.id = strRequired(obj.id, clazz, 'id')
		this.name = strRequired(obj.name, clazz, 'name')
		this.tables = arrayOfClass(RawDataObjTable, obj.tables)
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
	_link?: string
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
		this._codeDbDataSourceValue = memberOfEnumOrDefault(
			obj._codeDbDataSourceValue,
			clazz,
			'_codeDbDataSourceValue',
			'PropDataSourceValue',
			PropDataSourceValue,
			PropDataSourceValue.edgeDB
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
		this._link = obj._link
		this.description = strOptional(obj.description, clazz, 'description')
		this.exprCustom = strOptional(obj.exprCustom, clazz, 'expr')
		this.header = strOptional(obj.header, clazz, 'header')
		this.indexTable = nbrOptional(obj.indexTable, clazz, 'indexTable')
		this.isDisplay = booleanOrDefault(obj.isDisplay, true)
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
	exprFilter?: string
	header: string
	isMultiSelect: boolean
	isRequired: boolean
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
		this.exprFilter = strOptional(obj.exprFilter, clazz, 'exprFilter')
		this.header = strRequired(obj.header, clazz, 'header')
		this.isMultiSelect = booleanOrFalse(obj.isMultiSelect, 'isMultiSelect')
		this.isRequired = booleanRequired(obj.isRequired, clazz, 'isRequired')
		this.name = strRequired(obj.name, clazz, 'name')
	}
}

export class RepUser {
	analytics: RepAnalytic[] = []
	descriptionUser?: string
	headerUser: string
	parms: RepUserParm[] = []
	report: Rep
	constructor(obj: any) {
		const clazz = 'Rep'
		obj = valueOrDefault(obj, {})
		// this.analytics = arrayOfClass(obj.analytics, RepAnalytic)
		this.descriptionUser = strOptional(obj.descriptionUser, clazz, 'descriptionUser')
		this.headerUser = strRequired(obj.headerUser, clazz, 'headerUser')
		this.parms = arrayOfClass(RepUserParm, obj.parms)
		this.report = new Rep(obj.report)
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

export class RawPropLink {
	_columns: { _name: string }[]
	constructor(obj: any) {
		const clazz = 'RawPropLink'
		obj = valueOrDefault(obj, {})
		this._columns = obj._columns
	}
}
