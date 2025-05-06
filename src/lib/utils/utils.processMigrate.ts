import { DataObj } from '$utils/types'
import { State } from '$comps/app/types.appState.svelte'
import { ProcessMigrate } from '$utils/utils.process'
import { error } from '@sveltejs/kit'

const FILENAME = '$utils/utils.processMigrate.ts'

export async function migrate(sm: State, dataObj: DataObj) {
	const migrId = dataObj.data.rowsRetrieved.getDetailRecordValue('id')
	const process = new ProcessMigrate()
}
