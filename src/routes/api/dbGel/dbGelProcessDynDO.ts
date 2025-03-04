import { TokenApiDbDataObjSource, TokenApiQueryData } from '$utils/types.token'
import { DataObjProcessType } from '$utils/types'
import { dynDOReportRender } from '$routes/api/dbGel/dbGelProcessDynDOReportRender'
import { error } from '@sveltejs/kit'

const FILENAME = '$routes/api/dbGel/dbGelProcessDynamic.ts'

export async function getRawDataObjDynamic(
	processType: DataObjProcessType | undefined,
	queryData: TokenApiQueryData,
	source: any,
	dataObjSource: TokenApiDbDataObjSource
) {
	if (!processType) return source

	switch (processType) {
		case DataObjProcessType.reportRender:
			return await dynDOReportRender(queryData, dataObjSource)

		default:
			error(500, {
				file: FILENAME,
				function: 'processDynamicDO',
				message: `No case defined for DataObjDynamicProcessType: ${processType}`
			})
	}
}
