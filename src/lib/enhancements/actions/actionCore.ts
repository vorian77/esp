import { State } from '$comps/app/types.appState.svelte'
import { FieldCustomAction } from '$comps/form/fieldCustom'
import { apiFetch, ApiFunction } from '$routes/api/api'
import { TokenApiQueryData } from '$utils/types.token'
import { DataObjData, ParmsValuesType, ResponseBody } from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/actions/actionCore.ts'

export default async function action(stateApp: State, field: FieldCustomAction, data: any) {
	const type = field.type
	const value = field.value

	switch (type.toLowerCase()) {
		case 'dbexpression':
			await processDbExpr(stateApp, value)
			break

		case 'start':
			break

		default:
			error(500, {
				file: FILENAME,
				function: 'action-type',
				message: `No case defined for action type: ${type}`
			})
	}
}

const processDbExpr = async (stateApp: State, expr: string) => {
	const dataTab = new DataObjData()
	dataTab.parms.valueSet(ParmsValuesType.dbExpr, expr)
	const result: ResponseBody = await apiFetch(
		ApiFunction.dbEdgeProcessExpression,
		new TokenApiQueryData({ dataTab, user: stateApp.user })
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
