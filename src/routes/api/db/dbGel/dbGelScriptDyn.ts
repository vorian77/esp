import { TokenApiDbDataObjSource, TokenApiQueryData } from '$utils/types.token'
import { DataObjProcessType, MethodResult } from '$utils/types'
import { dynDOReportRender } from '$routes/api/db/dbGel/dbGelScriptDynReportRender'
import { error } from '@sveltejs/kit'

const FILENAME = '$routes/api/db/dbGel/dbGelScriptDyn.ts'

export async function getRawDataObjDynamic(
	processType: DataObjProcessType | undefined,
	queryData: TokenApiQueryData,
	source: any,
	dataObjSource: TokenApiDbDataObjSource
): Promise<MethodResult> {
	if (!processType) return new MethodResult(source)

	switch (processType) {
		case DataObjProcessType.reportRender:
			return await dynDOReportRender(queryData, dataObjSource)

		default:
			return new MethodResult({
				success: false,
				error: {
					file: FILENAME,
					function: 'getRawDataObjDynamic',
					msg: `No case defined for DataObjProcessType: ${processType}`
				}
			})
	}
}
