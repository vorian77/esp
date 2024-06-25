import { TokenApiQuery, TokenApiQueryType, TokenApiQueryData } from '$utils/types.token'
import { DataObjProcessType, DataObjTable, debug, valueOrDefault } from '$utils/types'
import {
	RawDataObj,
	RawDataObjPropDB,
	RawDataObjPropDisplay
} from '$comps/dataObj/types.rawDataObj'
import { DataObj } from '$utils/types'
import { dynDOReportParmItems } from '$routes/api/dbEdge/dbEdgeProcessDynDOReportParmItems'
import { dynDOReportRender } from '$routes/api/dbEdge/dbEdgeProcessDynDOReportRender'
import { error } from '@sveltejs/kit'

const FILENAME = '$routes/api/dbEdge/dbEdgeProcessDynamic.ts'

export async function getRawDataObjDynamic(
	processType: DataObjProcessType,
	queryData: TokenApiQueryData,
	source: any
) {
	if (!processType) return source

	switch (processType) {
		case DataObjProcessType.reportParmItems:
			return await dynDOReportParmItems(queryData)

		case DataObjProcessType.reportRender:
			return await dynDOReportRender(queryData, source)

		default:
			error(500, {
				file: FILENAME,
				function: 'processDynamicDO',
				message: `No case defined for DataObjDynamicProcessType: ${processType}`
			})
	}
}
