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

const FILENAME = '/$enhance/actions/actionClassDoFieldAuth.ts'

const errorFunction = (codeActionType: CodeActionType) => `${FILENAME}.${codeActionType}`

export default async function action(parms: FCodeActionClass) {}
