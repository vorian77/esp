import { TokenApiQueryType } from '$utils/types.token'
import { DataObjActionQueryTriggerTiming } from '$comps/app/types.appQuery'
import { State } from '$comps/app/types.appState.svelte'
import { error } from '@sveltejs/kit'
import { DataObjData, type DataRecord, DataRecordStatus } from '$utils/types'

const FILENAME = '/$enhance/crud/crudUserUpdate.ts'

export async function qaExecuteUserUpdate(
	queryActionName: string,
	sm: State,
	queryType: TokenApiQueryType,
	queryTiming: DataObjActionQueryTriggerTiming,
	table: string | undefined,
	dataTab: DataObjData,
	parms: DataRecord
): Promise<DataObjData> {
	if (
		dataTab.rowsSave.getDetailRowStatusIs(DataRecordStatus.update) &&
		queryTiming === DataObjActionQueryTriggerTiming.post
	) {
		sm.resetUser(false)
	}
	return dataTab
}
