import { TokenApiId } from '$utils/types.token'
import { sysErrorGet } from '$routes/api/db/dbGel/dbGelQueries'

export async function load({ params }) {
	const errorId = params.id
	if (errorId) {
		return await sysErrorGet(new TokenApiId(params.id))
	} else {
		return {}
	}
}
