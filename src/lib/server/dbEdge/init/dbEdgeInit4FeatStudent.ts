import { sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { addColumn, addDataObj, addNodeProgramObj } from '$server/dbEdge/init/dbEdgeInitUtilities2'

export async function initFeatCMStudent() {
	sectionHeader('DataObject - CM-Student')
	await initStudent()
	await initCsf()
	await initCsfCohort()
	await initCsfCohortAttdStudent()
	await initCsfNote()
	await initCsfJobPlacement()
	await initCsfDocument()
}

async function initStudent() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner in (SELECT sys_user::SysUser FILTER .userName = <user,str,userName>).orgs',
		header: 'Students',
		name: 'data_obj_cm_student_list',
		owner: 'app_cm',
		subHeader: 'All students enrolled in any courses.',
		tables: [
			{ index: 0, table: 'CmClient' },
			{ columnParent: 'person', indexParent: 0, index: 1, table: 'SysPerson' }
		],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'firstName',
				orderCrumb: 10,
				orderSort: 20,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 1
			},
			{
				codeAccess: 'readOnly',
				columnName: 'lastName',
				orderCrumb: 20,
				orderSort: 10,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 1
			},
			{
				codeAccess: 'readOnly',
				columnName: 'email',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 1
			},
			{
				codeAccess: 'readOnly',
				columnName: 'agencyId',
				orderDisplay: 55,
				orderDefine: 55,

				headerAlt: 'Group',
				indexTable: 0
			}
		]
	})

	await addDataObj({
		owner: 'app_cm',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_student_detail',
		header: 'Student',
		table: 'CmClient',
		tables: [
			{ index: 0, table: 'CmClient' },
			{ columnParent: 'person', indexParent: 0, index: 1, table: 'SysPerson' }
		],
		actionFieldGroup: 'doag_detail',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeFieldElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'Personal' },
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 25,
				orderDefine: 25
			},
			{
				columnName: 'firstName',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 1
			},
			{
				codeAccess: 'optional',
				columnName: 'middleName',
				orderDisplay: 35,
				orderDefine: 35,
				indexTable: 1
			},
			{
				columnName: 'lastName',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 1
			},
			{
				codeFieldElement: 'date',
				columnName: 'birthDate',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 1
			},
			{
				columnName: 'agencyId',
				orderDisplay: 55,
				orderDefine: 55,
				headerAlt: 'Group',
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 56,
				orderDefine: 56
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 57,
				orderDefine: 57
			},
			{
				codeAccess: 'optional',
				columnName: 'school',
				orderDisplay: 58,
				orderDefine: 58,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeGender',
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 1,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_person_gender',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeRace',
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 1,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_person_race',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeEthnicity',
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 1,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_person_ethnicity',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 82,
				orderDefine: 82
			},
			{
				codeFieldElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'Contact' },
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 115,
				orderDefine: 115
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'tel',
				columnName: 'phoneMobile',
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 1
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'tel',
				columnName: 'phoneAlt',
				orderDisplay: 125,
				orderDefine: 125,
				indexTable: 1
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'email',
				columnName: 'email',
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 1
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 135,
				orderDefine: 135
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 138,
				orderDefine: 138
			},
			{
				codeAccess: 'optional',
				columnName: 'addr1',
				orderDisplay: 140,
				orderDefine: 140,
				indexTable: 1
			},
			{
				codeAccess: 'optional',
				columnName: 'addr2',
				orderDisplay: 150,
				orderDefine: 150,
				indexTable: 1
			},
			{
				codeAccess: 'optional',
				columnName: 'city',
				orderDisplay: 160,
				orderDefine: 160,
				indexTable: 1
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeState',
				orderDisplay: 170,
				orderDefine: 170,
				indexTable: 1,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_state',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				columnName: 'zip',
				orderDisplay: 180,
				orderDefine: 180,
				indexTable: 1
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 185,
				orderDefine: 185
			},
			{
				codeFieldElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'Other' },
				orderDisplay: 190,
				orderDefine: 190,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				orderDisplay: 210,
				orderDefine: 210,
				indexTable: 1
			},
			{
				columnName: 'owner',
				orderDefine: 215,
				indexTable: 0,
				isExcludeDisplayAlt: true,
				isExcludeUpdate: true,
				linkExprSave: '(SELECT sys_core::getOrg(<user,str,org.name>))',
				linkTable: 'SysOrg'
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_student_list',
		header: 'Students',
		name: 'node_obj_cm_student_list',
		orderDefine: 20,
		owner: 'app_cm',
		parentNodeName: 'node_pgm_cm_staff_provider'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_student_detail',
		header: 'Student',
		name: 'node_obj_cm_student_detail',
		orderDefine: 10,
		owner: 'app_cm',
		parentNodeName: 'node_obj_cm_student_list'
	})
}

async function initCsf() {
	await addDataObj({
		owner: 'app_cm',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_client_service_flow_list',
		header: 'Service Flows',
		tables: [{ index: 0, table: 'CmClientServiceFlow' }],
		exprFilter: '.client.id = <tree,uuid,CmClient.id>',
		actionFieldGroup: 'doag_list',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'serviceFlow',
				orderCrumb: 10,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['header']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeReferralType',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateReferral',
				orderCrumb: 20,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				columnName: 'dateStartEst',
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateStart',
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				columnName: 'dateEndEst',
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateEnd',
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeReferralEndType',
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 0
			}
		]
	})

	await addDataObj({
		owner: 'app_cm',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_client_service_flow_detail',
		header: 'Service Flow',
		tables: [{ index: 0, table: 'CmClientServiceFlow' }],
		actionFieldGroup: 'doag_detail',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'client',
				orderDefine: 20,
				indexTable: 0,
				isExcludeDisplayAlt: true,
				linkExprSave: '(SELECT app_cm::CmClient FILTER .id = <tree,uuid,CmClient.id>)',
				linkTable: 'CmClient'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeFieldElement: 'select',
				columnName: 'serviceFlow',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				fieldListItems: 'il_cm_service_flow',
				linkTable: 'CmServiceFlow'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeReferralType',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name',
				fieldListItemsParmName: 'ct_cm_service_flow_type',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'date',
				columnName: 'dateReferral',
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 80,
				orderDefine: 80
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'date',
				columnName: 'dateStartEst',
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'date',
				columnName: 'dateEndEst',
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 110,
				orderDefine: 110
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 120,
				orderDefine: 120
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'date',
				columnName: 'dateStart',
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'date',
				columnName: 'dateEnd',
				orderDisplay: 140,
				orderDefine: 140,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeReferralEndType',
				orderDisplay: 150,
				orderDefine: 150,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name',
				fieldListItemsParmName: 'ct_cm_service_flow_end_type',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 160,
				orderDefine: 160
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				orderDisplay: 170,
				orderDefine: 170,
				indexTable: 0
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_client_service_flow_list',
		header: 'Service Flows',
		name: 'node_obj_cm_service_flow_list',
		orderDefine: 10,
		owner: 'app_cm',
		parentNodeName: 'node_obj_cm_student_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_client_service_flow_detail',
		header: 'Service Flow',
		name: 'node_obj_cm_service_flow_detail',
		orderDefine: 10,
		owner: 'app_cm',
		parentNodeName: 'node_obj_cm_service_flow_list'
	})
}

async function initCsfCohort() {
	await addDataObj({
		owner: 'app_cm_training',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_csf_cohort_list',
		header: 'Cohorts',
		subHeader: "Student's course enrollments.",
		tables: [{ index: 0, table: 'CmCsfCohort' }],
		exprFilter: '.csf.id = <tree,uuid,CmClientServiceFlow.id>',
		actionFieldGroup: 'doag_list',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'cohort',
				orderCrumb: 10,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkExprSelect: `(.cohort.course.name ++ ' (' ++ .cohort.name ++ ')' ++ ' (' ++ std::to_str(<cal::local_date>.cohort.dateStart) ++ ')')`
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeStatus',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateStart',
				orderCrumb: 20,
				orderSort: 10,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateEnd',
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0
			}
		]
	})

	await addDataObj({
		owner: 'app_cm_training',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_csf_cohort_detail',
		header: 'Cohort',
		tables: [{ index: 0, table: 'CmCsfCohort' }],
		actionFieldGroup: 'doag_detail',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'csf',
				orderDefine: 20,
				indexTable: 0,
				isExcludeDisplayAlt: true,
				linkExprSave:
					'(SELECT app_cm::CmClientServiceFlow filter.id = (<tree,uuid,CmClientServiceFlow.id>))',
				linktable: 'CmClientServiceFlow'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeFieldElement: 'select',
				columnName: 'cohort',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				fieldListItems: 'il_cm_cohort_by_userName',
				linkTable: 'CmCohort'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeStatus',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name',
				fieldListItemsParmName: 'ct_cm_service_flow_status',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'date',
				columnName: 'dateStart',
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'date',
				columnName: 'dateEnd',
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 80,
				orderDefine: 80
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_csf_cohort_list',
		header: 'Cohorts',
		name: 'node_obj_cm_csf_cohort_list',
		orderDefine: 10,
		owner: 'app_cm_training',
		parentNodeName: 'node_obj_cm_service_flow_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_csf_cohort_detail',
		header: 'Cohort',
		name: 'node_obj_cm_csf_cohort_detail',
		orderDefine: 10,
		owner: 'app_cm_training',
		parentNodeName: 'node_obj_cm_csf_cohort_list'
	})
}

async function initCsfCohortAttdStudent() {
	await addDataObj({
		owner: 'app_cm_training',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		exprFilter: '.csfCohort.id = <tree,uuid,CmCsfCohort.id>',
		name: 'data_obj_cm_csf_cohort_attd_student_list',
		header: 'Attendance Records',
		tables: [{ index: 0, table: 'CmCsfCohortAttd' }],
		actionFieldGroup: 'doag_list',
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'cohortAttd',
				orderCrumb: 10,
				orderSort: 10,
				orderDisplay: 20,
				orderDefine: 20,
				headerAlt: 'Date',
				indexTable: 0,
				linkColumns: ['date'],
				linkTable: 'CmCohortAttd'
			},
			{
				codeAccess: 'readOnly',
				codeAlignmentAlt: 'center',
				columnName: 'codeCmCohortAttdDuration',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'computedHours',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Attendance',
		name: 'data_obj_cm_csf_cohort_attd_student_detail',
		owner: 'app_cm_training',
		tables: [{ index: 0, table: 'CmCsfCohortAttd' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'csfCohort',
				orderDefine: 20,
				indexTable: 0,
				isExcludeDisplayAlt: true,
				linkExprSave: '(SELECT app_cm::CmCsfCohort FILTER .id = <tree,uuid,CmCsfCohort.id>)',
				linktable: 'CmCsfCohort'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeFieldElement: 'select',
				columnName: 'cohortAttd',
				orderDisplay: 40,
				orderDefine: 40,
				headerAlt: 'Date',
				indexTable: 0,
				fieldListItems: 'il_cm_cohort_attd_cohort',
				linkTable: 'CmCohortAttd'
			},
			{
				codeFieldElement: 'radio',
				codeAlignmentAlt: 'center',
				columnName: 'codeCmCohortAttdDuration',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name',
				fieldListItemsParmName: 'ct_cm_cohort_attd_duration',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'readOnly',
				codeFieldElement: 'number',
				columnName: 'computedHours',
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_csf_cohort_attd_student_list',
		header: 'Attendance Records',
		name: 'node_obj_cm_csf_cohort_attd_student_list',
		orderDefine: 10,
		owner: 'app_cm_training',
		parentNodeName: 'node_obj_cm_csf_cohort_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_csf_cohort_attd_student_detail',
		header: 'Attendance',
		name: 'node_obj_cm_csf_cohort_attd_student_detail',
		orderDefine: 10,
		owner: 'app_cm_training',
		parentNodeName: 'node_obj_cm_csf_cohort_attd_student_list'
	})
}

async function initCsfNote() {
	await addDataObj({
		owner: 'app_cm',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_csf_note_list',
		header: 'Case Notes',
		tables: [{ index: 0, table: 'CmCsfNote' }],
		exprFilter: '.csf.id = <tree,uuid,CmClientServiceFlow.id>',
		actionFieldGroup: 'doag_list',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				codeFieldElement: 'date',
				codeSortDir: 'desc',
				columnName: 'date',
				orderCrumb: 10,
				orderSort: 10,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeType',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			}
		]
	})

	await addDataObj({
		owner: 'app_cm',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_csf_note_detail',
		header: 'Case Note',
		tables: [{ index: 0, table: 'CmCsfNote' }],
		actionFieldGroup: 'doag_detail',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'csf',
				orderDefine: 20,
				indexTable: 0,
				isExcludeDisplayAlt: true,
				linkExprSave:
					'(SELECT app_cm::CmClientServiceFlow filter.id = (<tree,uuid,CmClientServiceFlow.id>))',
				linkTable: 'CmClientServiceFlow'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeFieldElement: 'date',
				columnName: 'date',
				orderSort: 10,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeType',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_cm_case_note_type',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_csf_note_list',
		header: 'Case Notes',
		name: 'node_obj_cm_csf_note_list',
		orderDefine: 20,
		owner: 'app_cm',
		parentNodeName: 'node_obj_cm_service_flow_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_csf_note_detail',
		header: 'Case Note',
		name: 'node_obj_cm_csf_note_detail',
		orderDefine: 10,
		owner: 'app_cm',
		parentNodeName: 'node_obj_cm_csf_note_list'
	})
}

async function initCsfJobPlacement() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		exprFilter: '.csf.id = <tree,uuid,CmClientServiceFlow.id>',
		header: 'Job Placements',
		name: 'data_obj_cm_csf_job_placement_list',
		owner: 'app_cm',
		tables: [{ index: 0, table: 'CmCsfJobPlacement' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateStart',
				orderCrumb: 10,
				orderSort: 10,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'employerName',
				orderCrumb: 20,
				orderSort: 20,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'title',
				orderCrumb: 30,
				orderSort: 30,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			}
		]
	})
	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Job Placement',
		name: 'data_obj_cm_csf_job_placement_detail',
		owner: 'app_cm',
		tables: [{ index: 0, table: 'CmCsfJobPlacement' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'csf',
				orderDefine: 20,
				indexTable: 0,
				isExcludeDisplayAlt: true,
				linkExprSave:
					'(SELECT app_cm::CmClientServiceFlow filter.id = (<tree,uuid,CmClientServiceFlow.id>))',
				linkTable: 'CmClientServiceFlow'
			},
			{
				codeFieldElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'Placement' },
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 40,
				orderDefine: 40
			},
			{
				codeFieldElement: 'date',
				columnName: 'dateStart',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				columnName: 'title',
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				columnName: 'employerName',
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 80,
				orderDefine: 80
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 90,
				orderDefine: 90
			},
			{
				codeAccess: 'optional',
				columnName: 'employerContactNameFirst',
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'employerContactNameLast',
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'employerContactEmail',
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 130,
				orderDefine: 130
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 140,
				orderDefine: 140
			},
			{
				codeFieldElement: 'number',
				columnName: 'wage',
				orderDisplay: 150,
				orderDefine: 150,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeWageType',
				orderDisplay: 160,
				orderDefine: 160,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_cm_job_wage_type',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'number',
				columnName: 'hoursPerWeek',
				orderDisplay: 170,
				orderDefine: 170,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeJobType',
				orderDisplay: 180,
				orderDefine: 180,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_cm_job_type',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codePlacementRelated',
				orderDisplay: 190,
				orderDefine: 190,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_cm_job_training_related',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 200,
				orderDefine: 200
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				orderDisplay: 210,
				orderDefine: 210,
				indexTable: 0
			},
			{
				codeFieldElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'Submission' },
				orderDisplay: 220,
				orderDefine: 220,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 230,
				orderDefine: 230
			},
			{
				codeFieldElement: 'select',
				columnName: 'staffAgency',
				orderDisplay: 240,
				orderDefine: 240,
				indexTable: 0,
				fieldListItems: 'il_sys_role_staff_by_codeName',
				fieldListItemsParmName: 'cm_training_role_staff_agency',
				linkTable: 'SysStaff'
			},
			{
				codeFieldElement: 'date',
				columnName: 'dateSubmitted',
				orderDisplay: 250,
				orderDefine: 250,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 260,
				orderDefine: 260
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_csf_job_placement_list',
		header: 'Job Placements',
		name: 'node_obj_cm_csf_job_placement_list',
		orderDefine: 30,
		owner: 'app_cm',
		parentNodeName: 'node_obj_cm_service_flow_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_csf_job_placement_detail',
		header: 'Job Placement',
		name: 'node_obj_cm_csf_job_placement_detail',
		orderDefine: 10,
		owner: 'app_cm',
		parentNodeName: 'node_obj_cm_csf_job_placement_list'
	})
}

async function initCsfDocument() {
	await addDataObj({
		owner: 'app_cm',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_csf_document_list',
		header: 'Documents',
		tables: [{ index: 0, table: 'CmCsfDocument' }],
		exprFilter: '.csf.id = <tree,uuid,CmClientServiceFlow.id>',
		actionFieldGroup: 'doag_list',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateIssued',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeType',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isShareWithClient',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				columnName: 'note',
				orderDefine: 70,
				orderDisplay: 70,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'staffAgency',
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0,
				linkColumns: ['person', 'fullName']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateExpires',
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			}
		]
	})

	await addDataObj({
		owner: 'app_cm',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_csf_document_detail',
		header: 'Document',
		tables: [{ index: 0, table: 'CmCsfDocument' }],
		actionFieldGroup: 'doag_detail',
		actionsQuery: [
			{
				name: 'qa_file_storage',
				parms: [{ key: 'imageField', value: 'file' }],
				triggers: [
					{ codeQueryType: 'retrieve', codeTriggerTiming: 'post' },
					{ codeQueryType: 'save', codeTriggerTiming: 'pre' },
					{ codeQueryType: 'save', codeTriggerTiming: 'post' }
				]
			}
		],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'csf',
				orderDefine: 20,
				indexTable: 0,
				isExcludeDisplayAlt: true,
				linkExprSave:
					'(SELECT app_cm::CmClientServiceFlow filter.id = (<tree,uuid,CmClientServiceFlow.id>))',
				linkTable: 'CmClientServiceFlow'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeFieldElement: 'date',
				columnName: 'dateIssued',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeType',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_cm_doc_type',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isShareWithClient',
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'file',
				columnName: 'file',
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0,
				width: 300
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 100,
				orderDefine: 100
			},
			{
				codeFieldElement: 'select',
				columnName: 'staffAgency',
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 0,
				fieldListItems: 'il_sys_role_staff_by_codeName',
				fieldListItemsParmName: 'cm_training_role_staff_agency',
				linkTable: 'SysStaff'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'date',
				columnName: 'dateExpires',
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 130,
				orderDefine: 130
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_csf_document_list',
		header: 'Documents',
		name: 'node_obj_cm_csf_document_list',
		orderDefine: 40,
		owner: 'app_cm',
		parentNodeName: 'node_obj_cm_service_flow_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_csf_document_detail',
		header: 'Document',
		name: 'node_obj_cm_csf_document_detail',
		orderDefine: 10,
		owner: 'app_cm',
		parentNodeName: 'node_obj_cm_csf_document_list'
	})
}
