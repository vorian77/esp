import e from '$lib/dbschema/edgeql-js'
import { client, sectionHeader } from '$routes/api/dbEdge/dbEdge'

export async function addMOEDPartDataTest(data: any) {
	sectionHeader(`addMOEDPartDataTest - ${data.Name}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			header: e.str,
			name: e.str
		},
		(p) => {
			return e.insert(e.org_moed.MoedPartData, {
				createdBy: CREATOR,
				header: p.header,
				modifiedBy: CREATOR,
				name: p.name,
				owner: e.sys_core.getSystemPrime('sys_moed_old')
			})
		}
	)
	return await query.run(client, data)
}

export async function addMOEDParticipant(data: any) {
	sectionHeader(`addMOEDParticipant - ${data.firstName} ${data.lastName}`)
	const CREATOR = e.sys_user.getRootUser()
	// const query = e.params(
	// 	{
	// 		// birthDate: e.str,
	// 		firstName: e.str,
	// 		lastName: e.str
	// 	},
	// 	(p) => {
	// 		return e.insert(e.org_moed.MoedParticipant, {
	// 			// birthDate: e.cal.to_local_date(p.birthDate),
	// 			createdBy: CREATOR,
	// 			firstName: p.firstName,
	// 			lastName: p.lastName,
	// 			modifiedBy: CREATOR,
	// 			name: p.lastName + '_' + p.firstName,
	// 			owner: e.sys_core.getSystemPrime('sys_moed_old')
	// 		})
	// 	}
	// )
	// return await query.run(client, data)
}
