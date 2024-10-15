import { createClient } from 'edgedb'
import e, { is } from '$lib/dbschema/edgeql-js'
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from '$env/static/private'
import { sectionHeader } from '$server/dbEdge/init/dbEdgeInit200Utilities10'

const client = createClient({
	instanceName: EDGEDB_INSTANCE,
	secretKey: EDGEDB_SECRET_KEY
})

export async function addOrg(data: any) {
	sectionHeader(`addOrg - ${data.name}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			name: e.str,
			header: e.optional(e.str)
		},
		(p) => {
			return e.insert(e.sys_core.SysOrg, {
				name: p.name,
				header: p.header,
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		}
	)
	return await query.run(client, data)
}
