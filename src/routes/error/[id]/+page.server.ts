import { TokenApiId } from '$utils/types.token'
import { sysErrorGet } from '$routes/api/db/dbGel/dbGelQueries'

export async function load({ params }) {
	if (params.id !== '') {
		return await sysErrorGet(new TokenApiId(params.id))
	} else {
		return {}
	}
}
