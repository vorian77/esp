import { DataObjCardinality, DataObjComponent, DataObjTable, type DataRecord } from '$utils/types'
import { PropDataSourceValue, RawDataObjDyn } from '$comps/dataObj/types.rawDataObj'
import { TokenApiQueryData } from '$utils/types.token'
import { getReportUserParmItems } from '$routes/api/dbEdge/dbEdgeUtilities'
import { error } from '@sveltejs/kit'

const FILENAME = '$routes/api/dbEdge/dbEdgeProcessDynDOReportParmItems.ts'
let fName = (functionName: string) => {
	return FILENAME + '.' + functionName
}

export async function dynDOReportParmItems(queryData: TokenApiQueryData) {
	const data = await getData(queryData)
	const rawDataObjDyn = getRawDataObj(data)
	addPropsRepParmItems(data.parms, [])
	return rawDataObjDyn

	function addPropsRepParmItems(parms: any, tables: DataObjTable[]) {
		const f = fName('addPropsRepParmItems')
		parms.forEach((parms: any) => {
			const p = parms.parm
			rawDataObjDyn.addPropSelectRepParmItems(
				{
					_codeDataType: p._codeDataType,
					_codeDbDataSourceValue: PropDataSourceValue.edgeDB,
					_hasItems: true,
					_isMultiSelect: p.isMultiSelect,
					_linkItemsDefn: p._fieldListItems,
					_propName: p._propName
				},
				tables
			)
		})
	}
}

function getRawDataObj(data: any) {
	return new RawDataObjDyn({
		_codeCardinality: DataObjCardinality.list,
		_codeComponent: DataObjComponent.FormList,
		header: data._header,
		id: data.id,
		isListEdit: false,
		name: data._name
	})
}

async function getData(queryData: TokenApiQueryData) {
	const listRecordIdCurrent = queryData.dataTab?.parmsValues.valueGet('listRecordIdCurrent')
	const data = await getReportUserParmItems(listRecordIdCurrent)
	return data[0]
}
