import e from '$db/gel/edgeql-js'
import { client, sectionHeader } from '$routes/api/dbGel/dbGel'
import { debug } from '$utils/types'

export async function MoedPBulkPart(params: any) {
	sectionHeader(`MOED Bulk - Participant`)
	const CREATOR = e.sys_user.getRootUser()
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.org_client_moed.MoedParticipant, {
				createdBy: CREATOR,
				idxDemo: e.cast(e.int64, i[0]),
				modifiedBy: CREATOR,
				person: e.insert(e.default.SysPerson, {
					addr1: e.cast(e.str, i[1]),
					birthDate: e.cal.to_local_date(e.cast(e.str, i[3])),
					city: e.cast(e.str, i[4]),
					codeDisabilityStatus: e.sys_core.getCodeSystem(
						'sys_client_moed',
						'ct_sys_person_disability_status',
						e.cast(e.str, i[5])
					),
					codeEthnicity: e.sys_core.getCodeSystem(
						'sys_client_moed',
						'ct_sys_person_ethnicity',
						e.cast(e.str, i[6])
					),
					codeGender: e.sys_core.getCodeSystem(
						'sys_client_moed',
						'ct_sys_person_gender',
						e.cast(e.str, i[7])
					),
					codePersonLivingArrangements: e.sys_core.getCodeSystem(
						'sys_client_moed',
						'ct_sys_person_living_arrangements',
						e.cast(e.str, i[8])
					),
					codeRace: e.sys_core.getCodeSystem(
						'sys_client_moed',
						'ct_sys_person_race',
						e.cast(e.str, i[9])
					),
					codeState: e.sys_core.getCodeSystem(
						'sys_client_moed',
						'ct_sys_state',
						e.cast(e.str, i[10])
					),
					email: e.cast(e.str, i[11]),
					firstName: e.cast(e.str, i[12]),
					lastName: e.cast(e.str, i[13]),
					phoneMobile: e.cast(e.str, i[14]),
					ssn: e.cast(e.str, i[15]),
					zip: e.cast(e.str, i[16])
				}),
				owner: e.sys_core.getSystemPrime('sys_client_moed')
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function MoedBulkCsf(params: any) {
	sectionHeader(`MOED Bulk - Service Flow`)
	const CREATOR = e.sys_user.getRootUser()
	const PROGRAM = e.assert_single(
		e.select(e.app_cm.CmProgram, (program) => ({
			filter_single: e.op(program.name, '=', 'cmp_moed_yo')
		}))
	)
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.app_cm.CmClientServiceFlow, {
				attrs: e.sys_core.getAttr('sys_client_moed', e.cast(e.str, i[4])),
				createdBy: CREATOR,
				modifiedBy: CREATOR,
				client: e.assert_single(
					e.select(e.org_client_moed.MoedParticipant, (part) => ({
						filter_single: e.op(part.idxDemo, '=', e.cast(e.int64, i[0]))
					}))
				),
				codeSfEnrollType: e.sys_core.getCodeSystem(
					'sys_client_moed',
					'ct_cm_sf_enroll_type',
					'Self-Registration'
				),
				codeSfOutcome: e.sys_core.getCodeSystem(
					'sys_client_moed',
					'ct_cm_sf_outcome',
					e.cast(e.str, i[6])
				),
				codeSfEligibilityStatus: e.sys_core.getCodeSystem(
					'sys_client_moed',
					'ct_cm_sf_eligibility_status',
					e.cast(e.str, i[5])
				),
				dateCreated: e.cal.to_local_date(e.cast(e.str, i[1])),
				dateStart: e.cal.to_local_date(e.cast(e.str, i[2])),
				dateEnd: e.cal.to_local_date(e.cast(e.str, i[3])),
				programCm: PROGRAM
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
							sf.client.is(e.org_client_moed.MoedParticipant).idxDemo,
							'=',
							e.cast(e.int64, i[0])
						)
					}))
				),
				codeType: e.sys_core.getCodeSystem(
					'sys_client_moed',
					'ct_cm_doc_type',
					e.cast(e.str, i[2])
				),
				dateIssued: e.cal.to_local_date(e.cast(e.str, i[1]))
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function MoedBulkDataMsg(params: any) {
	sectionHeader(`MOED Bulk Data - Message`)
	const CREATOR = e.sys_user.getRootUser()
	const SENDER = CREATOR.person
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_core.SysMsg, {
				attrs: e.sys_core.getAttr('sys_client_moed', e.cast(e.str, i[3])),
				attrsAccess: e.insert(e.sys_core.SysAttrAccess, {
					codeAttrAccessSource: e.sys_core.getCodeSystem(
						'sys_system',
						'ct_sys_attribute_access_source',
						'user'
					),
					codeAttrAccessType: e.sys_core.getCodeSystem(
						'sys_system',
						'ct_sys_attribute_access_type',
						'permitted'
					),
					codeAttrType: e.sys_core.getCodeSystem(
						'sys_app_cm',
						'ct_sys_attribute_type',
						'at_cm_sf_site'
					),
					createdBy: CREATOR,
					modifiedBy: CREATOR
				}),
				date: e.cal.to_local_date(e.cast(e.str, i[1])),
				sender: e.assert_single(
					e.select(e.org_client_moed.MoedParticipant, (part) => ({
						filter_single: e.op(part.idxDemo, '=', e.cast(e.int64, i[0]))
					})).person
				),
				subject: e.cast(e.str, i[2])
			})
		})
	})
	return await query.run(client, { data: params })
}
