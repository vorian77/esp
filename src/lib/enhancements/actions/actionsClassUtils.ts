import { State } from '$comps/app/types.appState.svelte'
import { userActionError } from '$comps/other/types.userAction.svelte'
import { apiFetchFunction, ApiFunction } from '$routes/api/api'
import { TokenApiQueryData, TokenAppStateTriggerAction } from '$utils/types.token'
import {
	CodeActionType,
	DataObjData,
	type DataRecord,
	ParmsValuesType,
	ResponseBody,
	strRequired
} from '$utils/types'
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

	const result: ResponseBody = await apiFetchFunction(
		ApiFunction.dbGelProcessExpression,
		new TokenApiQueryData(exprParms)
	)
	if (result.success) {
		return result.data
	} else {
		error(500, {
			file: FILENAME,
			function: 'processDbExpr',
			message: `Error executing DB expression: ${dbExpr}`
		})
	}
}
