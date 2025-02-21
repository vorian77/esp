import { State } from '$comps/app/types.appState.svelte'
import {
	DataObjData,
	DataObjQueryRider,
	DataObjQueryRiderTriggerTiming,
	DataRecordStatus
} from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/queryRiderFunctions/qrfUserUpdate.ts'

export async function qrfUserUpdate(
	sm: State,
	queryRider: DataObjQueryRider,
	dataQuery: DataObjData
): Promise<DataObjData> {
	if (
		dataQuery.rowsSave.getDetailRowStatusIs(DataRecordStatus.update) &&
		queryRider.codeTriggerTiming === DataObjQueryRiderTriggerTiming.post
	) {
		sm.resetUser(false)
	}
	return dataQuery
}
