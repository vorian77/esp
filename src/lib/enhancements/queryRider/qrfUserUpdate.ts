import { State } from '$comps/app/types.appState.svelte'
import { DataObjData, DataRecordStatus, MethodResult } from '$utils/types'
import { QueryRider, QueryRiderTriggerTiming } from '$enhance/queryRider/types.queryRider'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/queryRiderFunctions/qrfUserUpdate.ts'

export async function qrfUserUpdate(
	sm: State,
	queryRider: QueryRider,
	dataQuery: DataObjData
): Promise<MethodResult> {
	if (
		dataQuery.rowsSave.getDetailRowStatusIs(DataRecordStatus.update) &&
		queryRider.codeTriggerTiming === QueryRiderTriggerTiming.post
	) {
		return sm.resetUser(false)
	}
	return new MethodResult(dataQuery)
}
