import { apiFetch, ApiFunction } from '$routes/api/api'
import { TokenApiId } from '$utils/types.token'
import { ResponseBody } from '$utils/types'
import { DataObj } from '$utils/types'
import { State } from '$comps/app/types.appState.svelte'
import { ProcessMigrate } from '$utils/utils.process'
import { error } from '@sveltejs/kit'

const FILENAME = '$utils/utils.processMigrate.ts'

export async function migrate(sm: State, dataObj: DataObj) {
	const migrId = dataObj.data.rowsRetrieved.getDetailRecordValue('id')
	const process = new ProcessMigrate()
}

async function getActions() {
	const name = 'doag_dialog_footer_detail'
	const result: ResponseBody = await apiFetch(
		ApiFunction.dbEdgeGetDataObjActionFieldGroup,
		new TokenApiId(name)
	)
	if (result.success) {
		return result.data
	} else {
		error(500, {
			file: FILENAME,
			function: 'getAction',
			message: `Error retrieving data object action field group: ${name}`
		})
	}
}
