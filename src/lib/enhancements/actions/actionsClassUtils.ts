import { State } from '$comps/app/types.appState.svelte'
import { apiFetch, ApiFunction } from '$routes/api/api'
import { TokenApiQueryData } from '$utils/types.token'
import {
	CodeActionType,
	DataObjData,
	type DataRecord,
	ParmsValuesType,
	ResponseBody,
	strRequired
} from '$utils/types'
import { type FCodeActionClass } from '$comps/app/types.appStateActions'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/actions/actionCore.ts'

const errorFunction = (codeActionType: CodeActionType) => `${FILENAME}.${codeActionType}`

export default async function action(parms: FCodeActionClass) {
	switch (parms.actionType) {
		case CodeActionType.dbexpression:
			const expr = strRequired(parms.data.value, errorFunction(parms.actionType), 'expr')
			await processDbExpr(parms.sm, expr)
			break

		case CodeActionType.none:
			break

		default:
			error(500, {
				file: FILENAME,
				function: 'default',
				message: `No case defined for codeActionType: ${parms.actionType}`
			})
	}
}

const processDbExpr = async (sm: State, expr: string) => {
	const dataTab = new DataObjData()
	dataTab.parms.valueSet(ParmsValuesType.dbExpr, expr)
	const result: ResponseBody = await apiFetch(
		ApiFunction.dbEdgeProcessExpression,
		new TokenApiQueryData({ dataTab, user: sm.user })
	)
	if (result.success) {
		return result.data
	} else {
		error(500, {
			file: FILENAME,
			function: 'processDbExpr',
			message: `Error executing DB expression: ${expr}`
		})
	}
}
