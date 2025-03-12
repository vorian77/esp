import {
	State,
	StateNavLayout,
	StateParms,
	StateTriggerToken
} from '$comps/app/types.appState.svelte'
import {
	userActionError,
	userActionStateChangeDataObj,
	userActionStateChangeRaw
} from '$comps/other/types.userAction.svelte'
import { AppLevel, AppLevelTab } from '$comps/app/types.app.svelte'
import { TokenAppDoQuery, TokenAppStateTriggerAction } from '$utils/types.token'
import { CodeActionType, DataObj, DataManager, DataRow, required, strRequired } from '$utils/types'
import { Token, TokenAppIndex, TokenAppNode, TokenAppRow, TokenAppTab } from '$utils/types.token'

import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/actions/actionClassCustom.ts'

export default async function action(sm: State, parmsAction: TokenAppStateTriggerAction) {
	const actionType = parmsAction.codeAction.actionType
	const token: Token = parmsAction.data.token

	let dm = sm.dm
	let currTab = required(sm.app.getCurrTab(), FILENAME, 'currTab')
	let dataObj: DataObj = required(currTab.dataObj, FILENAME, 'dataObj')

	switch (actionType) {
		case CodeActionType.doCustomAIAttdSheetSetAllFullClass:
			alert('Set all - full class - coming soon...')

			// const field = dataObj.getField('codeCmCohortAttdDuration')
			// const fieldNote = dataObj.getField('note')

			// for (let idx = 0; idx < dataObj.data.rowsRetrieved.dataRows.length; idx++) {
			// 	// await dm.setFieldValue(dataObj.raw.id, idx, field, 'c5a9eed0-ebc2-11ee-a369-173f8eb5fa89')
			// 	await dm.setFieldValue(
			// 		dataObj.raw.id,
			// 		idx,
			// 		fieldNote,
			// 		'c5a9eed0-ebc2-11ee-a369-173f8eb5fa89'
			// 	)
			// }
			// console.log(
			// 	'currTab.dataObj.data.rowsRetrieved.dataRows:',
			// 	currTab.dataObj.data.rowsRetrieved.dataRows

			// 	// currTab.dataObj.data.rowsRetrieved.dataRows.map(
			// 	// 	(dataRow: DataRow) => dataRow.record.linkItems_codeCmCohortAttdDuration
			// 	// )
			// )
			break

		case CodeActionType.doCustomAIAttdSheetReset:
			alert('Reset coming soon...')
			break

		default:
			error(500, {
				file: FILENAME,
				function: 'default',
				message: `No case defined for actionType: ${actionType}`
			})
	}
}
