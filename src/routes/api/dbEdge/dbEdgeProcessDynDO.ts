import { TokenApiQuery, TokenApiQueryType, TokenApiQueryData } from '$utils/types.token'
import { DataObjProcessType, DataObjTable, debug, valueOrDefault } from '$utils/types'
import {
	RawDataObj,
	RawDataObjPropDB,
	RawDataObjPropDisplay
} from '$comps/dataObj/types.rawDataObj'
import { DataObj } from '$utils/types'
import { dynDOListReportRender } from '$routes/api/dbEdge/dbEdgeProcessDynDOListReportRender'
import { error } from '@sveltejs/kit'

const FILENAME = '$routes/api/dbEdge/dbEdgeProcessDynamic.ts'

export async function getRawDataObjDynamic(queryData: TokenApiQueryData, rawDataObj: RawDataObj) {
	if (!rawDataObj.processType) return rawDataObj

	switch (rawDataObj.processType) {
		case DataObjProcessType.listReportRender:
			return await dynDOListReportRender(rawDataObj, queryData)

		default:
			error(500, {
				file: FILENAME,
				function: 'processDynamicDO',
				message: `No case defined for DataObjDynamicProcessType: ${rawDataObj.processType} for DataObj: ${rawDataObj.name}`
			})
	}
}
