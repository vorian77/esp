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
// const record = [
// 	'addr1',
// 	'addr2',
// 	'birthDate',
// 	'city',
// 	'codeDisabilityStatus',
// 	'codeEthnicity',
// 	'codeGender',
// 	'codeRace',
// 	'codeState',
// 	'email',
// 	'firstName',
// 	'lastName',
// 	'office',
// 	'phoneMobile',
// 	'ssn',
// 	'zip'
// ]
export async function addMOEDParticipants(params: any) {
	sectionHeader(`MOED Participants`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.org_moed.MoedParticipant, {
				createdBy: CREATOR,
				modifiedBy: CREATOR,
				person: e.insert(e.default.SysPerson, {
					addr1: e.cast(e.str, i[1]),
					birthDate: e.cal.to_local_date(e.cast(e.str, i[3])),
					firstName: e.cast(e.str, i[11]),
					lastName: e.cast(e.str, i[12])
				}),
				owner: e.sys_core.getSystemPrime('sys_moed_old')

				// codeReferralType: e.sys_core.getCodeSystem(
				// 	'sys_moed_old',
				// 	'ct_cm_service_flow_type',
				// 	'Walk in'
				// ),

				// serviceFlow: e.assert_single(
				// 	e.select(e.app_cm.CmServiceFlow, (flow) => ({
				// 		filter_single: e.op(flow.name, '=', 'sf_moed_self_service_reg')
				// 	}))
				// )
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function addMOEDParticipants1(data: any) {
	sectionHeader(`addMOEDParticipant - ${data.firstName} ${data.lastName}`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params(
		{
			addr1: e.optional(e.str),
			addr2: e.optional(e.str),
			birthDate: e.str,
			city: e.optional(e.str),
			codeDisabilityStatus: e.optional(e.str),
			codeEthnicity: e.optional(e.str),
			codeGender: e.optional(e.str),
			codeRace: e.optional(e.str),
			codeState: e.optional(e.str),
			email: e.optional(e.str),
			firstName: e.str,
			lastName: e.str,
			office: e.optional(e.str),
			phoneMobile: e.optional(e.str),
			ssn: e.optional(e.str),
			zip: e.optional(e.str)
		},
		(p) => {
			return e.insert(e.org_moed.MoedParticipant, {
				createdBy: CREATOR,
				modifiedBy: CREATOR,
				office: e.assert_single(
					e.select(e.sys_core.SysObjSubject, (subj) => ({
						filter_single: e.op(subj.name, '=', p.office)
					}))
				),

				owner: e.sys_core.getSystemPrime('sys_moed_old'),
				person: e.insert(e.default.SysPerson, {
					addr1: p.addr1,
					addr2: p.addr2,
					birthDate: e.cal.to_local_date(p.birthDate),
					city: p.city,
					codeDisabilityStatus: e.sys_core.getCodeSystem(
						'sys_moed_old',
						'ct_sys_person_disability_status',
						p.codeDisabilityStatus
					),
					codeEthnicity: e.sys_core.getCodeSystem(
						'sys_moed_old',
						'ct_sys_person_ethnicity',
						p.codeEthnicity
					),
					codeGender: e.sys_core.getCodeSystem(
						'sys_moed_old',
						'ct_sys_person_gender',
						p.codeGender
					),
					codeRace: e.sys_core.getCodeSystem('sys_moed_old', 'ct_sys_person_race', p.codeRace),
					codeState: e.sys_core.getCodeSystem('sys_moed_old', 'ct_sys_state', p.codeState),
					email: p.email,
					firstName: p.firstName,
					lastName: p.lastName,
					phoneMobile: p.phoneMobile,
					zip: p.zip
				}),
				ssn: p.ssn
			})
		}
	)
	return await query.run(client, data)
}

export async function addMOEDCSF(params: any) {
	sectionHeader(`MOED Referrals`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.app_cm.CmClientServiceFlow, {
				createdBy: CREATOR,
				modifiedBy: CREATOR,
				client: e.assert_single(
					e.select(e.org_moed.MoedParticipant, (part) => ({
						filter_single: e.op(
							e.op(part.person.firstName, '=', e.cast(e.str, i[0])),
							'and',
							e.op(part.person.lastName, '=', e.cast(e.str, i[1]))
						)
					}))
				),
				codeReferralType: e.sys_core.getCodeSystem(
					'sys_moed_old',
					'ct_cm_service_flow_type',
					'Walk in'
				),
				codeStatus: e.sys_core.getCodeSystem(
					'sys_moed_old',
					'ct_cm_service_flow_status',
					e.cast(e.str, i[3])
				),
				dateReferral: e.cal.to_local_date(e.cast(e.str, i[2])),
				serviceFlow: e.assert_single(
					e.select(e.app_cm.CmServiceFlow, (flow) => ({
						filter_single: e.op(flow.name, '=', 'sf_moed_self_service_reg')
					}))
				)
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function addMOEDStaff(params: any) {
	sectionHeader('MOED Staff')
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_user.SysStaff, {
				ownerOld: e.sys_core.getOrg('org_moed_old'),
				person: e.insert(e.default.SysPerson, {
					firstName: e.cast(e.str, i[0]),
					lastName: e.cast(e.str, i[1])
				}),
				roles: e.set(e.select(e.sys_core.getCode('ct_sys_role_staff', 'moed_advocate'))),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data: params })
}
