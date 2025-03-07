import { apiFetchFunction, ApiFunction } from '$routes/api/api'
import { TokenApiFetchError, TokenApiId } from '$utils/types.token'
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
	return await apiFetchFunction(
		ApiFunction.dbGelGetDataObjActionGroup,
		new TokenApiFetchError(
			FILENAME,
			'getActions',
			`Error retrieving data object action field group: ${name}`
		),
		new TokenApiId(name)
	)
}
