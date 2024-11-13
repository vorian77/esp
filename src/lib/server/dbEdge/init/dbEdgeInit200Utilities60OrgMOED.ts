import e from '$lib/dbschema/edgeql-js'
import { client, sectionHeader } from '$routes/api/dbEdge/dbEdge'

export async function MoedParticipantsBulk(params: any) {
	sectionHeader(`MOED Participants`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.org_moed.MoedParticipant, {
				createdBy: CREATOR,
				idxDemo: e.cast(e.int64, i[0]),
				modifiedBy: CREATOR,
				office: e.assert_single(
					e.select(e.sys_core.SysObjSubject, (o) => ({
						filter_single: e.op(o.name, '=', e.cast(e.str, i[13]))
					}))
				),
				person: e.insert(e.default.SysPerson, {
					addr1: e.cast(e.str, i[1]),
					birthDate: e.cal.to_local_date(e.cast(e.str, i[3])),
					city: e.cast(e.str, i[4]),
					codeDisabilityStatus: e.sys_core.getCodeSystem(
						'sys_moed_old',
						'ct_sys_person_disability_status',
						e.cast(e.str, i[5])
					),
					codeEthnicity: e.sys_core.getCodeSystem(
						'sys_moed_old',
						'ct_sys_person_ethnicity',
						e.cast(e.str, i[6])
					),
					codeGender: e.sys_core.getCodeSystem(
						'sys_moed_old',
						'ct_sys_person_gender',
						e.cast(e.str, i[7])
					),
					codeRace: e.sys_core.getCodeSystem(
						'sys_moed_old',
						'ct_sys_person_race',
						e.cast(e.str, i[8])
					),
					codeState: e.sys_core.getCodeSystem('sys_moed_old', 'ct_sys_state', e.cast(e.str, i[9])),
					email: e.cast(e.str, i[10]),
					firstName: e.cast(e.str, i[11]),
					lastName: e.cast(e.str, i[12]),
					phoneMobile: e.cast(e.str, i[14]),
					ssn: e.cast(e.str, i[15]),
					zip: e.cast(e.str, i[16])
				}),
				owner: e.sys_core.getSystemPrime('sys_moed_old')
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function MoedCsfBulk(params: any) {
	sectionHeader(`MOED Referrals`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.app_cm.CmClientServiceFlow, {
				createdBy: CREATOR,
				modifiedBy: CREATOR,
				client: e.assert_single(
					e.select(e.org_moed.MoedParticipant, (part) => ({
						filter_single: e.op(part.idxDemo, '=', e.cast(e.int64, i[0]))
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
					e.cast(e.str, i[2])
				),
				dateReferral: e.cal.to_local_date(e.cast(e.str, i[1])),
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
