import { createClient } from 'edgedb'
import e from '$lib/dbschema/edgeql-js'
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from '$env/static/private'
import { sectionHeader } from '$server/dbEdge/init/dbEdgeInit200Utilities10'

const client = createClient({
	instanceName: EDGEDB_INSTANCE,
	secretKey: EDGEDB_SECRET_KEY
})

export async function execute(query: string) {
	await client.execute(query)
}

export async function addMOEDParticipant(data: any) {
	sectionHeader(`addMOEDParticipant - ${data.firstName} ${data.lastName}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			birthDate: e.str,
			firstName: e.str,
			lastName: e.str
		},
		(p) => {
			return e.insert(e.org_moed.MoedParticipant, {
				birthDate: e.cal.to_local_date(p.birthDate),
				createdBy: CREATOR,
				firstName: p.firstName,
				lastName: p.lastName,
				modifiedBy: CREATOR,
				name: p.lastName + '_' + p.firstName,
				owner: e.sys_core.getSystemPrime('sys_moed_old')
			})
		}
	)
	return await query.run(client, data)
}
