import { State } from '$comps/app/types.appState.svelte'
import { userActionError } from '$comps/other/types.userAction.svelte'
import { apiFetchFunction, ApiFunction } from '$routes/api/api'
import {
	TokenApiFetchError,
	TokenApiQueryData,
	TokenAppStateTriggerAction
} from '$utils/types.token'
import { CodeActionType, DataObjData, type DataRecord, strRequired } from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/actions/actionsClassUtils.ts'

export default async function action(sm: State, parms: TokenAppStateTriggerAction) {
	const actionType = parms.codeAction.actionType
	switch (actionType) {
		case CodeActionType.dbexpression:
			await processDbExpr(sm, parms.data.value)
			break

		case CodeActionType.none:
			break

		default:
			error(500, {
				file: FILENAME,
				function: 'default',
				message: `No case defined for ationType: ${actionType}`
			})
	}
}

const processDbExpr = async (sm: State, parms: DataRecord) => {
	const dbExpr = strRequired(
		parms.expr,
		userActionError(FILENAME, CodeActionType.dbexpression),
		'expr'
	)

	let exprParms: DataRecord = {
		dataTab: parms.dataTab ? parms.dataTab : new DataObjData(),
		dbExpr,
		user: sm.user
	}
	if (parms.dataTree) exprParms.tree = parms.dataTree

	return await apiFetchFunction(
		ApiFunction.dbGelProcessExpression,
		new TokenApiFetchError(FILENAME, 'processDbExpr', `Error executing DB expression: ${dbExpr}`),
		new TokenApiQueryData(exprParms)
	)
}
