import { RepEl, RepUser } from '$comps/dataObj/types.rep'
import {
	debug,
	DataObjCardinality,
	DataObjComponent,
	DataObjTable,
	DataObjType
} from '$utils/types'
import { RawDataObj, RawDataObjDyn } from '$comps/dataObj/types.rawDataObj'
import { TokenApiDbDataObjSource, TokenApiQueryData } from '$utils/types.token'
import { PropDataType } from '$comps/dataObj/types.rawDataObj'
import { getReportUser } from '$routes/api/dbEdge/types.dbEdge'
import { error } from '@sveltejs/kit'

const FILENAME = '$routes/api/dbEdge/dbEdgeProcessDynDOReportRender.ts'
let fName = (functionName: string) => {
	return FILENAME + '.' + functionName
}

export async function dynDOReportRender(
	queryData: TokenApiQueryData,
	dataObjSource: TokenApiDbDataObjSource
) {
	const repUserData = await getReport(queryData)
	const repUser = new RepUser(repUserData)
	const rawDataObjDyn = getRawDataObj(repUser)

	addPropsDisplay(repUser, rawDataObjDyn.tables)
	addPropsSelect(repUser.report.elements, rawDataObjDyn.tables)
	addPropsSort(repUser.report.elementsSort, rawDataObjDyn.tables)
	addFilter(repUser, queryData)
	return rawDataObjDyn.build()

	function addFilter(repUser: RepUser, queryData: TokenApiQueryData) {
		let exprFilter = rawDataObjDyn.exprFilter
		repUser.parms.forEach((p) => {
			if (Array.isArray(p.parmValue) ? p.parmValue.length > 0 : p.parmValue) {
				queryData?.dataTab?.parms.valueSet(p.parm.name, p.parmValue)
				if (p.parm.exprFilter) {
					if (exprFilter) exprFilter = exprFilter + ' AND '
					exprFilter += p.parm.exprFilter
				}
			}
		})
		dataObjSource.replacements['exprFilter'] = exprFilter
	}

	function addPropsCommon(el: RepEl) {
		return {
			_link: el._link,
			_propName: el.nameCustom || el._column?.name,
			exprCustom: el.exprCustom,
			indexTable: el.indexTable,
			orderDefine: el.orderDisplay || el.orderDefine
		}
	}

	function addPropsDisplay(repUser: RepUser, tables: DataObjTable[]) {
		repUser.report.elements.forEach((el) => {
			rawDataObjDyn.addPropDisplay(
				{
					...addPropsCommon(el),
					_codeAccess: 'readOnly',
					_codeColor: 'black',
					_codeFieldElement: el._codeFieldElement,
					_codeSortDir: el._codeSortDir,
					_column: addPropsDisplayColumn(el),
					isDisplay: el.isDisplay,
					isDisplayable: el.isDisplayable,
					nameCustom: el.nameCustom,
					orderSort: el.orderSort
				},
				tables
			)
		})
	}
	function addPropsDisplayColumn(repEl: RepEl) {
		return {
			_codeAlignment: repEl._codeAlignment || repEl._column?._codeAlignment,
			_codeDataType: repEl._codeDataType || repEl._column?._codeDataType,
			header: repEl.header || repEl._column?.header,
			indexTable: repEl.indexTable,
			isMultiSelect: false,
			isNonData: false,
			name: repEl._column?.name || getFieldColumnCustomName(repEl._codeDataType)
		}
	}

	function addPropsSelect(elements: RepEl[], tables: DataObjTable[]) {
		elements.forEach((e) => {
			rawDataObjDyn.addPropSelect(
				{
					...addPropsCommon(e),
					_codeDataType: e._column?._codeDataType || e._codeDataType,
					_codeDbDataSourceValue: e._codeDbDataSourceValue,
					_codeSortDir: e._codeSortDir
				},
				tables
			)
		})
	}
	function addPropsSort(elementsSort: RepEl[], tables: DataObjTable[]) {
		elementsSort.forEach((e) => {
			rawDataObjDyn.addPropSort(
				{
					...addPropsCommon(e),
					_codeDataType: e._column?._codeDataType || e._codeDataType,
					_codeDbDataSourceValue: e._codeDbDataSourceValue,
					_codeSortDir: e._codeSortDir
				},
				tables
			)
		})
	}
}

function getFieldColumnCustomName(dataType: string | undefined) {
	if (!dataType) return undefined

	const f = fName('buildFieldExprColName')
	switch (dataType) {
		case PropDataType.bool:
			return 'custom_element_bool'

		case PropDataType.date:
			return 'custom_element_date'

		case PropDataType.float64:
			return 'custom_element_float'

		case PropDataType.int16:
		case PropDataType.int32:
		case PropDataType.int64:
			return 'custom_element_int'

		case PropDataType.str:
		case PropDataType.uuid:
			return 'custom_element_str'

		default:
			error(500, {
				file: FILENAME,
				function: f,
				message: `No case defined for PropDataType: ${dataType}`
			})
	}
}

function getRawDataObj(repUser: RepUser) {
	return new RawDataObjDyn({
		_actionFieldGroup: repUser.report.actionFieldGroup,
		_codeCardinality: DataObjCardinality.list,
		_codeComponent: DataObjComponent.FormList,
		_codeDataObjType: DataObjType.report,
		_tables: repUser.report.tables,
		description: repUser.descriptionUser || repUser.report.description,
		exprFilter: repUser.report.exprFilter,
		exprSort: repUser.report.exprSort,
		exprWith: repUser.report.exprWith,
		header: repUser.headerUser,
		id: repUser.report.id,
		isListEdit: false,
		isListSuppressSelect: true,
		name: repUser.report.name
	})
}

async function getReport(queryData: TokenApiQueryData) {
	const data = await getReportUser(queryData.dataTab?.parms.valueGet('listRecordIdCurrent'))
	return data[0]
}
