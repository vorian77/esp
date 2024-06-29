import { TokenApiQueryType } from '$utils/types.token'
import { DataObjActionQueryTriggerTiming } from '$comps/app/types.appQuery'
import { State } from '$comps/app/types.appState'
import { error } from '@sveltejs/kit'
import { DataObjData, type DataRecord, DataRecordStatus } from '$utils/types'

const FILENAME = '/$enhance/crud/crudUserUpdate.ts'

export async function qaExecuteUserUpdate(
	queryActionName: string,
	state: State,
	queryType: TokenApiQueryType,
	queryTiming: DataObjActionQueryTriggerTiming,
	table: string | undefined,
	dataSave: DataObjData,
	parms: DataRecord
): Promise<DataObjData> {
	if (
		dataSave.getDetailStatusRecordIs(DataRecordStatus.update) &&
		queryTiming === DataObjActionQueryTriggerTiming.post
	) {
		state.resetUser(false)
	}
	return dataSave
}
