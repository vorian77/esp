import { RepEl, RepElColumn, RepUser, RepUserEl } from '$comps/dataObj/types.rep'
import {
	DataObj,
	DataObjCardinality,
	DataObjComponent,
	DataObjTable,
	debug,
	RepElementType,
	required,
	strRequired
} from '$utils/types'
import { RawDataObj, RawDataObjDyn } from '$comps/dataObj/types.rawDataObj'
import { TokenApiQueryData } from '$utils/types.token'
import { PropDataType } from '$comps/dataObj/types.rawDataObj'
import { getReportUser } from '$routes/api/dbEdge/types.dbEdge'
import { error } from '@sveltejs/kit'

const FILENAME = '$routes/api/dbEdge/dbEdgeProcessDynDOListReportRender.ts'
let fName = (functionName: string) => {
	return FILENAME + '.' + functionName
}

export async function dynDOListReportRender(rawDataObj: RawDataObj, queryData: TokenApiQueryData) {
	const repUserData = await getReport(queryData)
	const repUser = new RepUser(repUserData)
	const rawDataObjDyn = getRawDataObj(repUser)

	addPropsDisplay(repUser.elements)
	addPropsSelect(repUser.report.elements, rawDataObjDyn.tables)
	// addPropsSort()
	addFilter()
	return rawDataObjDyn.build()

	function addFilter() {
		rawDataObjDyn.exprFilter = 'none'
	}

	function addPropsDisplay(elements: RepUserEl[]) {
		const f = fName('addFieldsDisplay')
		elements.forEach((userE) => {
			const repE = userE.element
			rawDataObjDyn.addPropDisplay({
				_codeAccess: 'readOnly',
				_codeColor: 'black',
				_codeFieldElement: repE._codeFieldElement,
				_codeSortDir: repE._codeSortDir,
				_column: gePropColumn(repE),
				_hasItems: false,
				_propName: repE.nameCustom || repE._column?.name,
				nameCustom: repE.nameCustom,
				orderDisplay: repE.orderDisplay,
				orderSort: repE.orderSort
			})
		})
	}
	function addPropsSelect(elements: RepEl[], tables: DataObjTable[]) {
		const f = fName('addFieldsSelect')
		elements.forEach((e) => {
			rawDataObjDyn.addPropSelect(
				{
					_codeDataType: e._column?._codeDataType || e._codeDataType,
					_codeDbDataSourceValue: e._codeDbDataSourceValue,
					_codeSortDir: e._codeSortDir,
					_hasItems: false,
					_link: undefined,
					_linkItemsDefn: undefined,
					_propName: e.nameCustom || e._column?.name,
					exprCustom: e.exprCustom,
					indexTable: e.indexTable
				},
				tables
			)
		})
	}
}

function gePropColumn(repEl: RepEl) {
	const f = fName('gePropColumn')
	return {
		_codeAlignment: repEl._column?._codeAlignment || repEl._codeAlignment,
		_codeDataType: repEl._column?._codeDataType || repEl._codeDataType,
		header: repEl._column?.header || repEl.header,
		isExcludeDisplay: false,
		isMultiSelect: false,
		isNonData: false,
		name: repEl._column?.name || getFieldColumnCustomName(repEl._codeDataType)
	}
}

function getFieldColumnCustomName(dataType: string | undefined) {
	if (!dataType) return undefined

	const f = fName('buildFieldExprColName')
	switch (dataType) {
		case PropDataType.bool:
			return 'custom_select_bool'

		case PropDataType.float64:
			return 'custom_select_float'

		case PropDataType.int64:
			return 'custom_select_int'

		case PropDataType.str:
			return 'custom_select_str'

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
		_tables: repUser.report.tables,
		description: repUser.descriptionUser || repUser.report.description,
		exprFilter: repUser.report.exprFilter,
		exprSort: repUser.report.exprSort,
		header: repUser.headerUser,
		id: repUser.report.id,
		isAlwaysRetrieveData: true,
		isAlwaysRetrieveDataObject: true,
		isListEdit: false,
		name: repUser.report.name
	})
}

async function getReport(queryData: TokenApiQueryData) {
	const data = await getReportUser(queryData.parmsValueGet('listRecordIdCurrent'))
	return data[0]
}
