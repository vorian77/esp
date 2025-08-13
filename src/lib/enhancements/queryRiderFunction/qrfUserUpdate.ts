import { State } from '$comps/app/types.state.svelte'
import { MethodResult } from '$utils/types'
import { QueryRider, QueryRiderTriggerTiming } from '$lib/queryClient/types.queryClientRider'
import { TokenApiQueryData } from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/queryRiderFunctions/qrfUserUpdate.ts'

export async function qrfUserUpdate(
	sm: State,
	queryRider: QueryRider,
	queryData: TokenApiQueryData
): Promise<MethodResult> {
	if (queryRider.codeTriggerTiming === QueryRiderTriggerTiming.post) {
		return sm.userCurrReset()
	}
	return new MethodResult(queryData)
}
