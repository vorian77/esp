import { RepEl, RepUser } from '$comps/dataObj/types.rep'
import {
	debug,
	DataObjCardinality,
	DataObjComponent,
	DataObjType,
	MethodResult
} from '$utils/types'
import { DbTableQueryGroup } from '$lib/queryClient/types.queryClient'
import { RawDataObjDyn } from '$comps/dataObj/types.rawDataObj.svelte'
import { TokenApiDbDataObjSource, TokenApiQueryData } from '$utils/types.token'
import { PropDataType } from '$comps/dataObj/types.rawDataObj.svelte'
import { getReportUser } from '$routes/api/db/dbGel/types.dbGel'
import { error } from '@sveltejs/kit'

const FILENAME = '$routes/api/db/dbGel/dbGelScriptDynReportRender.ts'

let fName = (functionName: string) => {
	return FILENAME + '.' + functionName
}

export async function dynDOReportRender(
	queryData: TokenApiQueryData,
	dataObjSource: TokenApiDbDataObjSource
): Promise<MethodResult> {
	const repUserData = await getReport(queryData)
	const repUser = new RepUser(repUserData)
	const rawDataObjDyn = getRawDataObj(repUser)

	let result: MethodResult = addPropsDisplay(repUser, rawDataObjDyn.tableGroup)
	if (result.error) return result

	addPropsSelect(repUser.report.elements, rawDataObjDyn.tableGroup)
	addPropsSort(repUser.report.elementsSort, rawDataObjDyn.tableGroup)
	addFilter(repUser, queryData)

	const do1 = rawDataObjDyn.build()
	return new MethodResult(do1)

	function addFilter(repUser: RepUser, queryData: TokenApiQueryData) {
		let exprFilter = rawDataObjDyn.rawQuerySource.exprFilter
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
			id: el.id,
			indexTable: el.indexTable,
			orderDefine: el.orderDisplay || el.orderDefine
		}
	}

	function addPropsDisplay(repUser: RepUser, tableGroup: DbTableQueryGroup) {
		repUser.report.elements.forEach((el) => {
			let result: MethodResult = addPropsDisplayColumn(el)
			if (result.error) return result
			const _column = result.data as string

			rawDataObjDyn.addPropDisplay(
				{
					...addPropsCommon(el),
					_codeAccess: 'readOnly',
					_codeColor: 'black',
					_codeFieldElement: el._codeFieldElement,
					_codeSortDir: el._codeSortDir,
					_column,
					isDisplay: el.isDisplay,
					isDisplayable: el.isDisplayable,
					nameCustom: el.nameCustom,
					orderSort: el.orderSort
				},
				tableGroup
			)
		})
		return new MethodResult()
	}
	function addPropsDisplayColumn(repEl: RepEl) {
		let result: MethodResult = getFieldColumnCustomName(repEl._codeDataType)
		if (result.error) return result
		const customName: string | undefined = result.data

		return new MethodResult({
			_codeAlignment: repEl._codeAlignment || repEl._column?._codeAlignment,
			_codeDataType: repEl._codeDataType || repEl._column?._codeDataType,
			header: repEl.header || repEl._column?.header,
			indexTable: repEl.indexTable,
			isFormTag: false,
			isMultiSelect: false,
			name: repEl._column?.name || customName
		})
	}

	function addPropsSelect(elements: RepEl[], tableGroup: DbTableQueryGroup) {
		elements.forEach((e) => {
			rawDataObjDyn.addPropSelect(
				{
					...addPropsCommon(e),
					_codeDataType: e._column?._codeDataType || e._codeDataType,
					_codeDbDataSourceValue: e._codeDbDataSourceValue,
					_codeSortDir: e._codeSortDir
				},
				tableGroup
			)
		})
	}
	function addPropsSort(elementsSort: RepEl[], tableGroup: DbTableQueryGroup) {
		elementsSort.forEach((e) => {
			rawDataObjDyn.addPropSort(
				{
					...addPropsCommon(e),
					_codeDataType: e._column?._codeDataType || e._codeDataType,
					_codeDbDataSourceValue: e._codeDbDataSourceValue,
					_codeSortDir: e._codeSortDir
				},
				tableGroup
			)
		})
	}
}

function getFieldColumnCustomName(dataType: string | undefined) {
	const f = fName('buildFieldExprColName')
	let result = undefined

	if (!dataType) return new MethodResult(result)

	switch (dataType) {
		case PropDataType.bool:
			result = 'custom_element_bool'

		case PropDataType.date:
			result = 'custom_element_date'

		case PropDataType.float64:
			result = 'custom_element_float'

		case PropDataType.int16:
		case PropDataType.int32:
		case PropDataType.int64:
			result = 'custom_element_int'

		case PropDataType.str:
		case PropDataType.uuid:
			result = 'custom_element_str'

		default:
			result = new MethodResult({
				error: {
					file: FILENAME,
					function: f,
					msg: `No case defined for PropDataType: ${dataType}`
				}
			})
	}
	return new MethodResult(result)
}

function getRawDataObj(repUser: RepUser) {
	return new RawDataObjDyn({
		_actionGroup: repUser.report.actionGroup,
		_codeCardinality: DataObjCardinality.list,
		_codeComponent: DataObjComponent.FormList,
		_codeDataObjType: DataObjType.report,
		_ownerId: repUser.report.ownerId,
		_querySource: {
			_tables: repUser.report.tables,
			exprFilter: repUser.report.exprFilter,
			exprSort: repUser.report.exprSort,
			exprWith: repUser.report.exprWith
		},
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
