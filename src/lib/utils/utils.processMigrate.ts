import { apiFetch, ApiFunction } from '$routes/api/api'
import { TokenApiId } from '$utils/types.token'
import { ResponseBody } from '$utils/types'
import { DataObj } from '$utils/types'
import { State } from '$comps/app/types.appState'
import { ProcessMigrate } from '$utils/utils.process'
import { error } from '@sveltejs/kit'

const FILENAME = '$utils/utils.processMigrate.ts'

export async function migrate(state: State, dataObj: DataObj) {
	const migrId = dataObj.data.rowsRetrieved.getDetailRecordValue('id')
	const process = new ProcessMigrate()
}

async function getActions() {
	const name = 'noa_dialog_done'
	const result: ResponseBody = await apiFetch(
		ApiFunction.dbEdgeGetDataObjActionField,
		new TokenApiId(name)
	)
	if (result.success) {
		return result.data
	} else {
		error(500, {
			file: FILENAME,
			function: 'getAction',
			message: `Error retrieving data object action field: ${name}`
		})
	}
}
