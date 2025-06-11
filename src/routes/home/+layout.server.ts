import { getEnvVar } from '$server/env'
import { debug, MethodResult } from '$utils/types'
import { RawUserAttr } from '$routes/home/types.rawUser'
import { TokenApiError, TokenApiId } from '$utils/types.token'
import { getUserByUserId } from '$routes/api/db/dbGel/dbGelQueries'
import { sysErrorAdd } from '$routes/api/db/dbGel/dbGelQueries'

const FILENAME = '$routes/home/+layout.server.ts'

export async function load({ locals }) {
	const clazz = 'routes/home/+layout.server.ts'
	let result: MethodResult = await getUserByUserId(new TokenApiId(locals.sessionId))
	if (result.error) return returnError(result)
	let rawUser: any = result.data

	rawUser.dbBranch = getEnvVar('GEL_BRANCH')

	const rawUserAttr = new RawUserAttr(rawUser)
	result = await rawUserAttr.setAttrs(rawUser)
	if (result.error) return returnError(result)
	rawUser = result.data

	// return
	return { success: true, rawUser }
}

async function returnError(result: MethodResult) {
	const token = new TokenApiError(result.error)
	const error: any = await sysErrorAdd(token)
	return { success: false, errorId: error.id }
}
