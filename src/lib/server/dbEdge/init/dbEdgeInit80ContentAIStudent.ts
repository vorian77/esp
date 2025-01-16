import { InitDb } from '$server/dbEdge/init/types.init'
import { ListOrdered } from 'lucide-svelte'

export function initContentAIStudent(init: InitDb) {
	initStudent(init)
	initCsf(init)
	initCsfCohort(init)
	initCsfCohortAttdStudent(init)
	initCsfDocument(init)
	initCsfJobPlacement(init)
	initCsfNote(init)
	initCsfSchoolPlacement(init)
}

function initStudent(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter:
			'.owner in (SELECT sys_user::SysUser FILTER .userName = <user,str,userName>).userTypes.owner',
		header: 'Students',
		name: 'data_obj_cm_student_list',
		owner: 'sys_ai_old',
		subHeader: 'All students.',
		tables: [
			{ index: 0, table: 'CmClient' },
			{ columnParent: 'person', indexParent: 0, index: 1, table: 'SysPerson' }
		],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'firstName',
				orderCrumb: 10,
				orderSort: 20,
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 1
			},
			{
				codeAccess: 'readOnly',
				columnName: 'lastName',
				orderCrumb: 20,
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 1
			},
			{
				codeAccess: 'readOnly',
				columnName: 'email',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 1
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_element_str',
				isDisplayable: true,
				orderDefine: 60,
				orderDisplay: 60,
				exprCustom: `(SELECT app_cm::CmCsfCohort FILTER .csf.client = app_cm::CmClient).cohort.name`,
				headerAlt: 'Cohorts',
				indexTable: 0,
				nameCustom: '_cohorts'
			}
			// {
			// 	codeAccess: 'readOnly',
			// 	columnName: 'agencyId',
			// 	isDisplayable: true,
			// 	orderDisplay: 70,
			// 	orderDefine: 70,
			// 	headerAlt: 'Group',
			// 	indexTable: 0
			// }
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		header: 'Student',
		name: 'data_obj_cm_student_detail',
		owner: 'sys_ai_old',
		tables: [
			{ index: 0, table: 'CmClient' },
			{ columnParent: 'person', indexParent: 0, index: 1, table: 'SysPerson' }
		],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 15,
				indexTable: 0,
				isDisplayable: false,
				isExcludeUpdate: true,
				linkExprSave: '(SELECT sys_core::SysSystem Filter .id = (<parms,uuid,appSystemId>))',
				linkTable: 'SysSystem'
			},
			{
				codeFieldElement: 'customHeader',
				columnName: 'custom_element',
				customElement: { label: 'Personal' },
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 25,
				orderDefine: 25
			},
			{
				columnName: 'firstName',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 1
			},
			{
				codeAccess: 'optional',
				columnName: 'middleName',
				isDisplayable: true,
				orderDisplay: 35,
				orderDefine: 35,
				indexTable: 1
			},
			{
				columnName: 'lastName',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 1
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'date',
				columnName: 'birthDate',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 1
			},
			{
				codeAccess: 'optional',
				columnName: 'agencyId',
				isDisplayable: true,
				orderDisplay: 55,
				orderDefine: 55,
				headerAlt: 'Group',
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 56,
				orderDefine: 56
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 57,
				orderDefine: 57
			},
			{
				codeAccess: 'optional',
				columnName: 'school',
				isDisplayable: true,
				orderDisplay: 58,
				orderDefine: 58,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeHighestEducation',
				isDisplayable: true,
				orderDisplay: 59,
				orderDefine: 59,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmName: 'ct_cm_highest_education',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeGender',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 1,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmName: 'ct_sys_person_gender',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeRace',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 1,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmName: 'ct_sys_person_race',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeEthnicity',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 1,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmName: 'ct_sys_person_ethnicity',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'hasDriversLicense',
				exprPreset: '(SELECT false)',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 81,
				orderDefine: 81
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 82,
				orderDefine: 82
			},
			{
				codeFieldElement: 'customHeader',
				columnName: 'custom_element',
				customElement: { label: 'Contact' },
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 115,
				orderDefine: 115
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'tel',
				columnName: 'phoneMobile',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 1
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'tel',
				columnName: 'phoneAlt',
				isDisplayable: true,
				orderDisplay: 125,
				orderDefine: 125,
				indexTable: 1
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'email',
				columnName: 'email',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 1
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 135,
				orderDefine: 135
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 138,
				orderDefine: 138
			},
			{
				codeAccess: 'optional',
				columnName: 'addr1',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140,
				indexTable: 1
			},
			{
				codeAccess: 'optional',
				columnName: 'addr2',
				isDisplayable: true,
				orderDisplay: 150,
				orderDefine: 150,
				indexTable: 1
			},
			{
				codeAccess: 'optional',
				columnName: 'city',
				isDisplayable: true,
				orderDisplay: 160,
				orderDefine: 160,
				indexTable: 1
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeState',
				isDisplayable: true,
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
				isDisplayable: true,
				orderDisplay: 180,
				orderDefine: 180,
				indexTable: 1
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 185,
				orderDefine: 185
			},
			{
				codeFieldElement: 'customHeader',
				columnName: 'custom_element',
				customElement: { label: 'Other' },
				isDisplayable: true,
				orderDisplay: 190,
				orderDefine: 190,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 210,
				orderDefine: 210,
				indexTable: 1
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})
	init.addTrans('sysNodeObjProgram', {
		codeIcon: 'UsersRound',
		codeNodeType: 'program',
		dataObj: 'data_obj_cm_student_list',
		header: 'Students',
		name: 'node_obj_cm_student_list',
		orderDefine: 30,
		owner: 'sys_ai_old'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'UsersRound',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_cm_student_detail',
		header: 'Student',
		name: 'node_obj_cm_student_detail',
		orderDefine: 10,
		owner: 'sys_ai_old',
		parentNodeName: 'node_obj_cm_student_list'
	})
}

function initCsf(init: InitDb) {
	init.addTrans('sysDataObj', {
		owner: 'sys_ai_old',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_client_service_flow_list',
		header: 'Service Flows',
		tables: [{ index: 0, table: 'CmClientServiceFlow' }],
		exprFilter: '.client.id = <tree,uuid,CmClient.id>',
		actionGroup: 'doag_list',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'serviceFlow',
				orderCrumb: 10,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['header']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeServiceFlowType',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateCreated',
				orderCrumb: 20,
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateStart',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateEnd',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 90,
				orderDisplay: 90
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeServiceFlowOutcome',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		owner: 'sys_ai_old',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_client_service_flow_detail',
		header: 'Service Flow',
		tables: [{ index: 0, table: 'CmClientServiceFlow' }],
		actionGroup: 'doag_detail',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'client',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave: '(SELECT app_cm::CmClient FILTER .id = <tree,uuid,CmClient.id>)',
				linkTable: 'CmClient'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeFieldElement: 'select',
				columnName: 'serviceFlow',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				fieldListItems: 'il_cm_service_flow',
				linkTable: 'CmServiceFlow'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeServiceFlowType',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name',
				fieldListItemsParmName: 'ct_cm_service_flow_type',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'date',
				columnName: 'dateCreated',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'date',
				columnName: 'dateStart',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'date',
				columnName: 'dateEnd',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeServiceFlowOutcome',
				isDisplayable: true,
				orderDisplay: 150,
				orderDefine: 150,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name',
				fieldListItemsParmName: 'ct_cm_service_flow_outcome',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 160,
				orderDefine: 160
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 170,
				orderDefine: 170,
				indexTable: 0
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_cm_client_service_flow_list',
		header: 'Service Flows',
		name: 'node_obj_cm_service_flow_list',
		orderDefine: 10,
		owner: 'sys_ai_old',
		parentNodeName: 'node_obj_cm_student_detail'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_cm_client_service_flow_detail',
		header: 'Service Flow',
		name: 'node_obj_cm_service_flow_detail',
		orderDefine: 10,
		owner: 'sys_ai_old',
		parentNodeName: 'node_obj_cm_service_flow_list'
	})
}

function initCsfCohort(init: InitDb) {
	init.addTrans('sysDataObj', {
		owner: 'sys_ai_old',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_csf_cohort_list',
		header: 'Cohorts',
		subHeader: "Student's course enrollments.",
		tables: [{ index: 0, table: 'CmCsfCohort' }],
		exprFilter: '.csf.id = <tree,uuid,CmClientServiceFlow.id>',
		actionGroup: 'doag_list',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'cohort',
				orderCrumb: 10,
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkExprSelect: `(.cohort.course.name ++ ' (' ++ .cohort.name ++ ')' ++ ' (' ++ std::to_str(<cal::local_date>.cohort.dateStart) ++ ')')`
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeStatus',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		owner: 'sys_ai_old',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_csf_cohort_detail',
		header: 'Cohort',
		tables: [{ index: 0, table: 'CmCsfCohort' }],
		actionGroup: 'doag_detail',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'csf',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave:
					'(SELECT app_cm::CmClientServiceFlow FILTER .id = <tree,uuid,CmClientServiceFlow.id>)',
				linkTable: 'CmClientServiceFlow'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeFieldElement: 'select',
				columnName: 'cohort',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				fieldListItems: 'il_cm_cohort_long_by_userName',
				linkTable: 'CmCohort'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeStatus',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name',
				fieldListItemsParmName: 'ct_cm_service_flow_status',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_cm_csf_cohort_list',
		header: 'Cohorts',
		name: 'node_obj_cm_csf_cohort_list',
		orderDefine: 10,
		owner: 'sys_ai_old',
		parentNodeName: 'node_obj_cm_service_flow_detail'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_cm_csf_cohort_detail',
		header: 'Cohort',
		name: 'node_obj_cm_csf_cohort_detail',
		orderDefine: 10,
		owner: 'sys_ai_old',
		parentNodeName: 'node_obj_cm_csf_cohort_list'
	})
}

function initCsfCohortAttdStudent(init: InitDb) {
	init.addTrans('sysDataObj', {
		owner: 'sys_ai_old',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		exprFilter: '.csfCohort.id = <tree,uuid,CmCsfCohort.id>',
		name: 'data_obj_cm_csf_cohort_attd_student_list',
		header: 'Attendance Records',
		tables: [{ index: 0, table: 'CmCsfCohortAttd' }],
		actionGroup: 'doag_list',
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'cohortAttd',
				orderCrumb: 10,
				orderSort: 10,
				isDisplayable: true,
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
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'computedHours',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Attendance',
		name: 'data_obj_cm_csf_cohort_attd_student_detail',
		owner: 'sys_ai_old',
		tables: [{ index: 0, table: 'CmCsfCohortAttd' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'csfCohort',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave: '(SELECT app_cm::CmCsfCohort FILTER .id = <tree,uuid,CmCsfCohort.id>)',
				linkTable: 'CmCsfCohort'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeFieldElement: 'select',
				columnName: 'cohortAttd',
				isDisplayable: true,
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
				isDisplayable: true,
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
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_cm_csf_cohort_attd_student_list',
		header: 'Attendance Records',
		name: 'node_obj_cm_csf_cohort_attd_student_list',
		orderDefine: 10,
		owner: 'sys_ai_old',
		parentNodeName: 'node_obj_cm_csf_cohort_detail'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_cm_csf_cohort_attd_student_detail',
		header: 'Attendance',
		name: 'node_obj_cm_csf_cohort_attd_student_detail',
		orderDefine: 10,
		owner: 'sys_ai_old',
		parentNodeName: 'node_obj_cm_csf_cohort_attd_student_list'
	})
}

function initCsfNote(init: InitDb) {
	init.addTrans('sysDataObj', {
		owner: 'sys_ai_old',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_csf_note_list',
		header: 'Case Notes',
		tables: [{ index: 0, table: 'CmCsfNote' }],
		exprFilter: '.csf.id = <tree,uuid,CmClientServiceFlow.id>',
		actionGroup: 'doag_list',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				codeFieldElement: 'date',
				codeSortDir: 'desc',
				columnName: 'date',
				orderCrumb: 10,
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeType',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		owner: 'sys_ai_old',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_csf_note_detail',
		header: 'Case Note',
		tables: [{ index: 0, table: 'CmCsfNote' }],
		actionGroup: 'doag_detail',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'csf',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave:
					'(SELECT app_cm::CmClientServiceFlow FILTER .id = <tree,uuid,CmClientServiceFlow.id>)',
				linkTable: 'CmClientServiceFlow'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeFieldElement: 'date',
				columnName: 'date',
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeType',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_cm_case_note_type',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_cm_csf_note_list',
		header: 'Case Notes',
		name: 'node_obj_cm_csf_note_list',
		orderDefine: 20,
		owner: 'sys_ai_old',
		parentNodeName: 'node_obj_cm_service_flow_detail'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_cm_csf_note_detail',
		header: 'Case Note',
		name: 'node_obj_cm_csf_note_detail',
		orderDefine: 10,
		owner: 'sys_ai_old',
		parentNodeName: 'node_obj_cm_csf_note_list'
	})
}

function initCsfJobPlacement(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		exprFilter: '.csf.id = <tree,uuid,CmClientServiceFlow.id>',
		header: 'Job Placements',
		name: 'data_obj_cm_csf_job_placement_list',
		owner: 'sys_ai_old',
		tables: [{ index: 0, table: 'CmCsfJobPlacement' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateStart',
				orderCrumb: 10,
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'employerName',
				orderCrumb: 20,
				orderSort: 20,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'title',
				orderCrumb: 30,
				orderSort: 30,
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			}
		]
	})
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Job Placement',
		name: 'data_obj_cm_csf_job_placement_detail',
		owner: 'sys_ai_old',
		tables: [{ index: 0, table: 'CmCsfJobPlacement' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'csf',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave:
					'(SELECT app_cm::CmClientServiceFlow FILTER .id = <tree,uuid,CmClientServiceFlow.id>)',
				linkTable: 'CmClientServiceFlow'
			},
			{
				codeFieldElement: 'customHeader',
				columnName: 'custom_element',
				customElement: { label: 'Placement' },
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40
			},
			{
				codeFieldElement: 'date',
				columnName: 'dateStart',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				columnName: 'title',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				columnName: 'employerName',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeRetention',
				isDisplayable: true,
				orderDisplay: 75,
				orderDefine: 75,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmName: 'ct_cm_job_retention',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90
			},
			{
				codeAccess: 'optional',
				columnName: 'employerContactNameFirst',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'employerContactNameLast',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'tel',
				columnName: 'employerContactPhone',
				isDisplayable: true,
				orderDisplay: 115,
				orderDefine: 115,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'employerContactEmail',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140
			},
			{
				codeFieldElement: 'number',
				columnName: 'wage',
				isDisplayable: true,
				orderDisplay: 150,
				orderDefine: 150,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeWageType',
				isDisplayable: true,
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
				isDisplayable: true,
				orderDisplay: 170,
				orderDefine: 170,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeJobType',
				isDisplayable: true,
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
				isDisplayable: true,
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
				isDisplayable: true,
				orderDisplay: 200,
				orderDefine: 200
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 210,
				orderDefine: 210,
				indexTable: 0
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_cm_csf_job_placement_list',
		header: 'Job Placements',
		name: 'node_obj_cm_csf_job_placement_list',
		orderDefine: 30,
		owner: 'sys_ai_old',
		parentNodeName: 'node_obj_cm_service_flow_detail'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_cm_csf_job_placement_detail',
		header: 'Job Placement',
		name: 'node_obj_cm_csf_job_placement_detail',
		orderDefine: 10,
		owner: 'sys_ai_old',
		parentNodeName: 'node_obj_cm_csf_job_placement_list'
	})
}

function initCsfSchoolPlacement(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		exprFilter: '.csf.id = <tree,uuid,CmClientServiceFlow.id>',
		header: 'School Placements',
		name: 'data_obj_cm_csf_school_placement_list',
		owner: 'sys_ai_old',
		tables: [{ index: 0, table: 'CmCsfSchoolPlacement' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				codeFieldElement: 'date',
				codeSortDir: 'desc',
				columnName: 'date',
				orderCrumb: 10,
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'collegeName',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeCollegeStatus',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'collegeMajor',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'collegeGradYear',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'collegeGPA',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'School Placement',
		name: 'data_obj_cm_csf_school_placement_detail',
		owner: 'sys_ai_old',
		tables: [{ index: 0, table: 'CmCsfSchoolPlacement' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'csf',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave:
					'(SELECT app_cm::CmClientServiceFlow FILTER .id = <tree,uuid,CmClientServiceFlow.id>)',
				linkTable: 'CmClientServiceFlow'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeFieldElement: 'date',
				columnName: 'date',
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				columnName: 'collegeName',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeCollegeStatus',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_cm_college_status',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80
			},
			{
				columnName: 'collegeMajor',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				columnName: 'collegeGradYear',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'collegeGPA',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 200,
				orderDefine: 200,
				indexTable: 0
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_cm_csf_school_placement_list',
		header: 'School Placements',
		name: 'node_obj_cm_csf_school_placement_list',
		orderDefine: 40,
		owner: 'sys_ai_old',
		parentNodeName: 'node_obj_cm_service_flow_detail'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_cm_csf_school_placement_detail',
		header: 'School Placement',
		name: 'node_obj_cm_csf_school_placement_detail',
		orderDefine: 10,
		owner: 'sys_ai_old',
		parentNodeName: 'node_obj_cm_csf_school_placement_list'
	})
}

function initCsfDocument(init: InitDb) {
	init.addTrans('sysDataObj', {
		owner: 'sys_ai_old',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_csf_document_list',
		header: 'Documents',
		tables: [{ index: 0, table: 'CmCsfDocument' }],
		exprFilter: '.csf.id = <tree,uuid,CmClientServiceFlow.id>',
		actionGroup: 'doag_list',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeType',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateIssued',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				orderSort: 10,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateExpires',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isShareWithClient',
				exprCustom: `'Yes' IF .isShareWithClient ELSE 'No'`,
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				codeFieldElement: 'toggle',
				columnName: 'custom_element_bool',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				exprCustom: `'Yes' IF EXISTS .file ELSE 'No'`,
				headerAlt: 'Document Uploaded',
				nameCustom: 'hasFile'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				orderDefine: 70,
				isDisplayable: true,
				orderDisplay: 70,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		owner: 'sys_ai_old',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_csf_document_detail',
		header: 'Document',
		tables: [{ index: 0, table: 'CmCsfDocument' }],
		actionGroup: 'doag_detail',
		actionsQuery: [
			{
				name: 'qa_file_storage',
				parms: [{ key: 'imageField', value: 'file' }],
				triggers: [{ codeQueryType: 'save', codeTriggerTiming: 'pre' }]
			}
		],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'csf',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave:
					'(SELECT app_cm::CmClientServiceFlow FILTER .id = <tree,uuid,CmClientServiceFlow.id>)',
				linkTable: 'CmClientServiceFlow'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeFieldElement: 'date',
				columnName: 'dateIssued',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'date',
				columnName: 'dateExpires',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeType',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name_system',
				fieldListItemsParmName: 'ct_cm_doc_type',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isShareWithClient',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'file',
				columnName: 'file',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0,
				width: 300
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_cm_csf_document_list',
		header: 'Documents',
		name: 'node_obj_cm_csf_document_list',
		orderDefine: 50,
		owner: 'sys_ai_old',
		parentNodeName: 'node_obj_cm_service_flow_detail'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_cm_csf_document_detail',
		header: 'Document',
		name: 'node_obj_cm_csf_document_detail',
		orderDefine: 10,
		owner: 'sys_ai_old',
		parentNodeName: 'node_obj_cm_csf_document_list'
	})
}

// init.addTrans('sysNodeObjProgramObj', {
// 	codeIcon: 'AppWindow',
// 	dataObj: 'data_obj_cm_csf_job_placement_list',
// 	header: 'Job Placements',
// 	isHideRowManager: false,
// 	name: 'node_obj_cm_csf_job_placement_list',
// 	orderDefine: 30,
// 	owner: 'sys_ai_old',
// 	parentNodeName: 'node_obj_cm_service_flow_detail'
// })
// init.addTrans('sysNodeObjProgramObj', {
// 	codeIcon: 'AppWindow',
// 	dataObj: 'data_obj_cm_csf_job_placement_detail',
// 	header: 'Job Placement',
// 	isHideRowManager: false,
// 	name: 'node_obj_cm_csf_job_placement_detail',
// 	orderDefine: 10,
// 	owner: 'sys_ai_old',
// 	parentNodeName: 'node_obj_cm_csf_job_placement_list'
// })
