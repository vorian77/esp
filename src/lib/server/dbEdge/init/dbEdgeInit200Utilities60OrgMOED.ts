import e from '$db/esdl/edgeql-js'
import { client, sectionHeader } from '$routes/api/dbEdge/dbEdge'
import { debug } from '$utils/types'

export async function MoedPBulkPart(params: any) {
	sectionHeader(`MOED Bulk - Participant`)
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

export async function MoedBulkCsf(params: any) {
	sectionHeader(`MOED Bulk - Service Flow`)
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
				codeServiceFlowType: e.sys_core.getCodeSystem(
					'sys_moed_old',
					'ct_cm_service_flow_type',
					'Walk in'
				),
				codeStatus: e.sys_core.getCodeSystem(
					'sys_moed_old',
					'ct_cm_service_flow_status',
					e.cast(e.str, i[4])
				),
				dateCreated: e.cal.to_local_date(e.cast(e.str, i[1])),
				dateStart: e.cal.to_local_date(e.cast(e.str, i[2])),
				dateEnd: e.cal.to_local_date(e.cast(e.str, i[3])),
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

export async function MoedBulkDataDoc(params: any) {
	sectionHeader(`MOED Bulk Data - Document`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.app_cm.CmCsfDocument, {
				createdBy: CREATOR,
				modifiedBy: CREATOR,
				csf: e.assert_single(
					e.select(e.app_cm.CmClientServiceFlow, (sf) => ({
						filter_single: e.op(
							sf.client.is(e.org_moed.MoedParticipant).idxDemo,
							'=',
							e.cast(e.int64, i[0])
						)
					}))
				),
				codeType: e.sys_core.getCodeSystem('sys_moed_old', 'ct_cm_doc_type', e.cast(e.str, i[2])),
				dateIssued: e.cal.to_local_date(e.cast(e.str, i[1]))
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function MoedBulkDataMsg(params: any) {
	sectionHeader(`MOED Bulk Data - Message`)
	debug('MOED Bulk Data - Documents', 'params', params)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.app_cm.CmCsfMsg, {
				createdBy: CREATOR,
				modifiedBy: CREATOR,
				csf: e.assert_single(
					e.select(e.app_cm.CmClientServiceFlow, (sf) => ({
						filter_single: e.op(
							sf.client.is(e.org_moed.MoedParticipant).idxDemo,
							'=',
							e.cast(e.int64, i[0])
						)
					}))
				),
				codeStatus: e.sys_core.getCode('ct_cm_msg_status', e.cast(e.str, i[2])),
				date: e.cal.to_local_date(e.cast(e.str, i[1])),
				office: e.assert_single(
					e.select(e.sys_core.SysObjSubject, (o) => ({
						filter_single: e.op(o.name, '=', e.cast(e.str, i[3]))
					}))
				),
				sender: CREATOR
			})
		})
	})
	return await query.run(client, { data: params })
}
