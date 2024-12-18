import { InitDb } from '$server/dbEdge/init/types.init'
import { moedDataParticipant } from '$utils/utils.randomDataGenerator'

// export function initContentMOEDStudent(init: InitDb) {
// 	initDemoData()
// }
export function initContentMOEDStudent(init: InitDb) {
	// staff
	initStudent(init)
	initCsf(init)
	initCsfMsg(init)
	initCsfNote(init)
	initCsfDocument(init)
	initSubjects(init)

	// participant
	initTaskSsrApp(init)
	initTaskSsrDoc(init)
	initTaskSsrMsg(init)

	// demo data
	initDemoData()
	initParticipants(init)
	initParticipantServiceFlows(init)
	initParticipantDataDoc(init)
	initParticipantDataMsg(init)
	initParticipantData(init)

	// reports
	initAnalytic(init)
	initReport(init)
}

function initStudent(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: `.owner.id in <user,uuidlist,systemIds>`,
		header: 'Participants',
		name: 'data_obj_moed_part_list',
		owner: 'sys_moed_old',
		subHeader: 'Participants who have self-enrolled.',
		tables: [
			{ index: 0, table: 'MoedParticipant' },
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
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_detail',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		header: 'Participant',
		name: 'data_obj_moed_part_detail',
		owner: 'sys_moed_old',
		tables: [
			{ index: 0, table: 'MoedParticipant' },
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
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				isExcludeUpdate: true,
				linkExprSave: '(SELECT sys_core::SysSystem Filter .id = (<parms,uuid,appSystemId>))',
				linkTable: 'SysSystem'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40
			},
			{
				columnName: 'firstName',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 1
			},
			{
				columnName: 'lastName',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 1
			},
			{
				codeFieldElement: 'date',
				columnName: 'birthDate',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 1
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textHide',
				columnName: 'ssn',
				isDisplayable: true,
				orderDisplay: 75,
				orderDefine: 75,
				indexTable: 1
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
				columnName: 'phoneMobile',
				indexTable: 1,
				isDisplayable: true,
				orderDefine: 100,
				orderDisplay: 100
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'email',
				columnName: 'email',
				indexTable: 1,
				isDisplayable: true,
				orderDefine: 110,
				orderDisplay: 110
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeGender',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140,
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
				orderDisplay: 150,
				orderDefine: 150,
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
				orderDisplay: 160,
				orderDefine: 160,
				indexTable: 1,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmName: 'ct_sys_person_ethnicity',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeDisabilityStatus',
				isDisplayable: true,
				orderDisplay: 170,
				orderDefine: 170,
				indexTable: 1,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmName: 'ct_sys_person_disability_status',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 180,
				orderDefine: 180
			},

			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 200,
				orderDefine: 200
			},
			{
				codeAccess: 'optional',
				columnName: 'addr1',
				indexTable: 1,
				isDisplayable: true,
				orderDefine: 210,
				orderDisplay: 210
			},
			{
				codeAccess: 'optional',
				columnName: 'addr2',
				indexTable: 1,
				isDisplayable: true,
				orderDefine: 220,
				orderDisplay: 220
			},
			{
				codeAccess: 'optional',
				columnName: 'city',
				indexTable: 1,
				isDisplayable: true,
				orderDefine: 230,
				orderDisplay: 230
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeState',
				isDisplayable: true,
				orderDisplay: 240,
				orderDefine: 240,
				indexTable: 1,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmName: 'ct_sys_state',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				columnName: 'zip',
				indexTable: 1,
				isDisplayable: true,
				orderDefine: 250,
				orderDisplay: 250
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 290,
				orderDefine: 290
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 300,
				orderDefine: 300
			},
			{
				codeAccess: 'optional',
				codeAlignmentAlt: 'center',
				codeFieldElement: 'radio',
				columnName: 'office',
				isDisplayable: true,
				orderDisplay: 310,
				orderDefine: 310,
				indexTable: 0,
				fieldListItems: 'il_sys_obj_subject_order_name',
				linkTable: 'SysObjSubject'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 320,
				orderDefine: 320
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
		codeIcon: 'AppWindow',
		codeNodeType: 'program',
		dataObj: 'data_obj_moed_part_list',
		header: 'Participants',
		name: 'node_obj_moed_part_list',
		orderDefine: 10,
		owner: 'sys_moed_old'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_moed_part_detail',
		header: 'Participant',
		name: 'node_obj_moed_part_detail',
		orderDefine: 10,
		owner: 'sys_moed_old',
		parentNodeName: 'node_obj_moed_part_list'
	})
}

function initCsf(init: InitDb) {
	init.addTrans('sysDataObj', {
		owner: 'sys_moed_old',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_moed_csf_list',
		header: 'Service Flows',
		tables: [{ index: 0, table: 'CmClientServiceFlow' }],
		exprFilter: '.client.id = <tree,uuid,MoedParticipant.id>',
		actionFieldGroup: 'doag_list',
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
				columnName: 'codeStatus',
				isDisplayable: true,
				orderDisplay: 55,
				orderDefine: 55,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateStartEst',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
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
				columnName: 'dateEndEst',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 80,
				orderDisplay: 80
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
		owner: 'sys_moed_old',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_moed_csf_detail',
		header: 'Service Flow',
		tables: [{ index: 0, table: 'CmClientServiceFlow' }],
		actionFieldGroup: 'doag_detail',
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
				linkExprSave:
					'(SELECT org_moed::MoedParticipant FILTER .id = <tree,uuid,MoedParticipant.id>)',
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
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
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
				codeFieldElement: 'select',
				columnName: 'codeStatus',
				isDisplayable: true,
				orderDisplay: 65,
				orderDefine: 65,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmName: 'ct_cm_service_flow_status',
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
				codeAccess: 'optional',
				codeFieldElement: 'date',
				columnName: 'dateStartEst',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'date',
				columnName: 'dateEndEst',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110
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
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
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
		dataObj: 'data_obj_moed_csf_list',
		header: 'Service Flows',
		name: 'node_obj_moed_csf_list',
		orderDefine: 10,
		owner: 'sys_moed_old',
		parentNodeName: 'node_obj_moed_part_detail'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_moed_csf_detail',
		header: 'Service Flow',
		name: 'node_obj_moed_csf_detail',
		orderDefine: 10,
		owner: 'sys_moed_old',
		parentNodeName: 'node_obj_moed_csf_list'
	})
}

function initCsfMsg(init: InitDb) {
	init.addTrans('sysDataObj', {
		owner: 'sys_moed_old',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_moed_csf_msg_list',
		header: 'Messages',
		tables: [{ index: 0, table: 'CmCsfMsg' }],
		exprFilter: '.csf.id = <tree,uuid,CmClientServiceFlow.id>',
		actionFieldGroup: 'doag_list',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
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
				columnName: 'codeStatus',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'sender',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				linkColumns: ['person', 'fullName']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'office',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'subject',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'msg',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		owner: 'sys_moed_old',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_moed_csf_msg_detail',
		header: 'Message',
		tables: [{ index: 0, table: 'CmCsfMsg' }],
		actionFieldGroup: 'doag_detail',
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
				columnName: 'sender',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_user_by_tag_type',
				fieldListItemsParmName: 'utt_role_moed_staff',
				linkTable: 'SysUser'
			},
			{
				columnName: 'subject',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeStatus',
				// exprPreset: `(SELECT assert_single((SELECT sys_core::SysCode FILTER .id = <uuid>"0bbab7c8-c0f4-11ee-9b77-e7fc1bb9b40e")))`,
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name',
				fieldListItemsParmName: 'ct_cm_msg_status',
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
				columnName: 'msg',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 200,
				orderDefine: 200
			},
			{
				codeAccess: 'readOnly',
				codeAlignmentAlt: 'center',
				codeFieldElement: 'radio',
				columnName: 'office',
				isDisplayable: true,
				orderDisplay: 210,
				orderDefine: 210,
				indexTable: 0,
				fieldListItems: 'il_sys_obj_subject_order_name',
				linkTable: 'SysObjSubject'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 220,
				orderDefine: 220
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
		dataObj: 'data_obj_moed_csf_msg_list',
		header: 'Messages',
		name: 'node_obj_moed_csf_msg_list',
		orderDefine: 10,
		owner: 'sys_moed_old',
		parentNodeName: 'node_obj_moed_csf_detail'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_moed_csf_msg_detail',
		header: 'Message',
		name: 'node_obj_moed_csf_msg_detail',
		orderDefine: 10,
		owner: 'sys_moed_old',
		parentNodeName: 'node_obj_moed_csf_msg_list'
	})
}

function initCsfNote(init: InitDb) {
	init.addTrans('sysDataObj', {
		owner: 'sys_moed_old',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_moed_csf_note_list',
		header: 'Case Notes',
		tables: [{ index: 0, table: 'CmCsfNote' }],
		exprFilter: '.csf.id = <tree,uuid,CmClientServiceFlow.id>',
		actionFieldGroup: 'doag_list',
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
		owner: 'sys_moed_old',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_moed_csf_note_detail',
		header: 'Case Note',
		tables: [{ index: 0, table: 'CmCsfNote' }],
		actionFieldGroup: 'doag_detail',
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
		dataObj: 'data_obj_moed_csf_note_list',
		header: 'Case Notes',
		name: 'node_obj_moed_csf_note_list',
		orderDefine: 20,
		owner: 'sys_moed_old',
		parentNodeName: 'node_obj_moed_csf_detail'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_moed_csf_note_detail',
		header: 'Case Note',
		name: 'node_obj_moed_csf_note_detail',
		orderDefine: 10,
		owner: 'sys_moed_old',
		parentNodeName: 'node_obj_moed_csf_note_list'
	})
}

function initCsfDocument(init: InitDb) {
	init.addTrans('sysDataObj', {
		owner: 'sys_moed_old',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_moed_csf_doc_list',
		header: 'Documents',
		tables: [{ index: 0, table: 'CmCsfDocument' }],
		exprFilter: '.csf.id = <tree,uuid,CmClientServiceFlow.id>',
		actionFieldGroup: 'doag_list',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateIssued',
				headerAlt: 'Date',
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
				orderDefine: 70,
				isDisplayable: true,
				orderDisplay: 70,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		owner: 'sys_moed_old',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_moed_csf_doc_detail',
		header: 'Document',
		tables: [{ index: 0, table: 'CmCsfDocument' }],
		actionFieldGroup: 'doag_detail',
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
				headerAlt: 'Date',
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
				fieldListItems: 'il_sys_code_family_order_name_by_codeType_name_system',
				fieldListItemsParmName: 'ct_cm_doc_type',
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
				codeAccess: 'optional',
				codeFieldElement: 'file',
				columnName: 'file',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0,
				width: 300
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
		dataObj: 'data_obj_moed_csf_doc_list',
		header: 'Documents',
		name: 'node_obj_moed_csf_doc_list',
		orderDefine: 30,
		owner: 'sys_moed_old',
		parentNodeName: 'node_obj_moed_csf_detail'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_moed_csf_doc_detail',
		header: 'Document',
		name: 'node_obj_moed_csf_doc_detail',
		orderDefine: 10,
		owner: 'sys_moed_old',
		parentNodeName: 'node_obj_moed_csf_doc_list'
	})
}

function initTaskSsrApp(init: InitDb) {
	init.addTrans('sysDataObjTask', {
		actionFieldGroup: 'doag_detail_mobile_save',
		owner: 'sys_moed_old',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		codeDataObjType: 'task',
		exprFilter: '.client.person = (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>).person',
		isDetailRetrievePreset: true,
		name: 'data_obj_task_moed_ssr_app',
		header: 'My Application',
		tables: [
			{ index: 0, table: 'CmClientServiceFlow' },
			{
				columnParent: 'client',
				indexParent: 0,
				index: 1,
				isTableExtension: true,
				table: 'MoedParticipant'
			},
			{
				columnParent: 'person',
				exprFilterUpdate: '.id = (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>).person.id',
				indexParent: 1,
				index: 2,
				table: 'SysPerson',
				columnsId: ['firstName', 'lastName']
			},
			{
				columnParent: 'serviceFlow',
				indexParent: 0,
				index: 3,
				table: 'CmServiceFlow',
				columnsId: ['name']
			}
		],
		fields: [
			{
				codeFieldElement: 'customHeader',
				columnName: 'custom_element',
				customElement: { label: 'Enter your program eligibility information here:' },
				isDisplayable: true,
				orderDisplay: 10,
				orderDefine: 10,
				indexTable: 0
			},
			{
				codeFieldElement: 'customHeader',
				columnName: 'custom_element',
				customElement: {
					label: 'The blue colored fields are required and the white colored fields are optional.',
					isSubHeader: true
				},
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 30
			},
			{
				columnName: 'serviceFlow',
				orderDefine: 40,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave: `(SELECT assert_single((SELECT app_cm::CmServiceFlow FILTER .name = 'sf_moed_self_service_reg')))`,
				linkTable: 'CmServiceFlow'
			},
			{
				columnName: 'codeServiceFlowType',
				orderDefine: 45,
				indexTable: 0,
				isDisplayable: false,
				isExcludeUpdate: true,
				linkExprPreset: `(SELECT assert_single((SELECT sys_core::SysCode FILTER .codeType.name = 'ct_cm_service_flow_type' AND .name = 'Walk in')))`,
				linkTable: 'SysCode'
			},
			{
				columnName: 'idxDemo',
				exprPreset: `-100`,
				indexTable: 1,
				isDisplayable: false,
				orderDefine: 50
			},
			{
				columnName: 'owner',
				orderDefine: 60,
				indexTable: 1,
				isDisplayable: false,
				linkExprSave: `(SELECT sys_core::SysSystem FILTER .id = <user,uuid,system.id>)`,
				linkTable: 'SysSystem'
			},
			{
				columnName: 'createdBy',
				isDisplayable: false,
				orderDefine: 70,
				indexTable: 1
			},
			{
				columnName: 'modifiedBy',
				isDisplayable: false,
				orderDefine: 80,
				indexTable: 1
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeStatus',
				orderDefine: 200,
				orderDisplay: 200,
				indexTable: 0,
				isDisplayable: true,
				isExcludeUpdate: true,
				linkColumns: ['name'],
				linkExprPreset: `(SELECT assert_single((SELECT sys_core::SysCode FILTER .name = 'Application submitted')))`,
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'select',
				columnName: 'office',
				isDisplayable: true,
				orderDisplay: 210,
				orderDefine: 210,
				indexTable: 1,
				fieldListItems: 'il_sys_obj_subject_order_name',
				linkTable: 'SysObjSubject'
			},
			{
				codeFieldElement: 'date',
				columnName: 'dateCreated',
				headerAlt: 'Application Date',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 215,
				orderDefine: 215
			},
			{
				columnName: 'firstName',
				exprPreset: `<user,str,firstName>`,
				isDisplayable: true,
				orderDisplay: 220,
				orderDefine: 220,
				indexTable: 2
			},
			{
				columnName: 'lastName',
				exprPreset: `<user,str,lastName>`,
				isDisplayable: true,
				orderDisplay: 230,
				orderDefine: 230,
				indexTable: 2
			},
			{
				codeFieldElement: 'date',
				columnName: 'birthDate',
				isDisplayable: true,
				orderDisplay: 240,
				orderDefine: 240,
				indexTable: 2
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textHide',
				columnName: 'ssn',
				isDisplayable: true,
				orderDisplay: 250,
				orderDefine: 250,
				indexTable: 2
			},
			{
				codeAccess: 'optional',
				columnName: 'phoneMobile',
				indexTable: 2,
				isDisplayable: true,
				orderDefine: 260,
				orderDisplay: 260
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'email',
				columnName: 'email',
				indexTable: 2,
				isDisplayable: true,
				orderDefine: 270,
				orderDisplay: 270
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeGender',
				isDisplayable: true,
				orderDisplay: 280,
				orderDefine: 280,
				indexTable: 2,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmName: 'ct_sys_person_gender',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeRace',
				isDisplayable: true,
				orderDisplay: 300,
				orderDefine: 300,
				indexTable: 2,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmName: 'ct_sys_person_race',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeEthnicity',
				isDisplayable: true,
				orderDisplay: 310,
				orderDefine: 310,
				indexTable: 2,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmName: 'ct_sys_person_ethnicity',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeDisabilityStatus',
				isDisplayable: true,
				orderDisplay: 320,
				orderDefine: 320,
				indexTable: 2,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmName: 'ct_sys_person_disability_status',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				columnName: 'addr1',
				indexTable: 2,
				isDisplayable: true,
				orderDefine: 330,
				orderDisplay: 330
			},
			{
				codeAccess: 'optional',
				columnName: 'addr2',
				indexTable: 2,
				isDisplayable: true,
				orderDefine: 340,
				orderDisplay: 340
			},
			{
				codeAccess: 'optional',
				columnName: 'city',
				indexTable: 2,
				isDisplayable: true,
				orderDefine: 350,
				orderDisplay: 350
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeState',
				isDisplayable: true,
				orderDisplay: 360,
				orderDefine: 360,
				indexTable: 2,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmName: 'ct_sys_state',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				columnName: 'zip',
				indexTable: 2,
				isDisplayable: true,
				orderDefine: 370,
				orderDisplay: 370
			},

			/* management */
			{
				columnName: 'createdAt',
				isDisplayable: false,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				columnName: 'createdBy',
				isDisplayable: false,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				columnName: 'modifiedAt',
				isDisplayable: false,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				columnName: 'modifiedBy',
				isDisplayable: false,
				orderDefine: 1040,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysTask', {
		btnStyle: 'bg-gradient-to-b from-green-300 hover:from-pink-500 active:bg-violet-700',
		codeCategory: 'default',
		codeIcon: 'ClipboardPen',
		codeStatusObj: 'tso_moed_app',
		description: 'First step to my future.',
		exprStatus: `SELECT app_cm::CmClientServiceFlow
{ _codeStatus := .codeStatus.name, dateCreated, modifiedAt, _modifiedBy := .modifiedBy.person.fullName }
FILTER .client.person = (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>).person ORDER BY .modifiedAt DESC`,
		header: 'My Application',
		isPinToDash: true,
		isGlobalResource: false,
		name: 'task_moed_ssr_app',
		sourceDataObj: 'data_obj_task_moed_ssr_app',
		orderDefine: 10,
		owner: 'sys_moed_old'
	})
}

function initTaskSsrDoc(init: InitDb) {
	init.addTrans('sysDataObj', {
		owner: 'sys_moed_old',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_task_moed_ssr_doc_list',
		header: 'My Documents',
		tables: [{ index: 0, table: 'CmCsfDocument' }],
		exprFilter: '.csf.id = <uuid>"78527ffe-13c1-11ef-8756-4f224ba4fd90"',
		actionFieldGroup: 'doag_list_mobile',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateIssued',
				headerAlt: 'Date',
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
			}
			// {
			// 	codeAccess: 'readOnly',
			// 	columnName: 'note',
			// 	orderDefine: 70,
			// 	isDisplayable: true,
			// 	orderDisplay: 70,
			// 	indexTable: 0
			// }
		]
	})

	init.addTrans('sysDataObjTask', {
		actionFieldGroup: 'doag_detail_mobile_save_delete',
		actionsQuery: [
			{
				name: 'qa_file_storage',
				parms: [{ key: 'imageField', value: 'file' }],
				triggers: [{ codeQueryType: 'save', codeTriggerTiming: 'pre' }]
			}
		],
		owner: 'sys_moed_old',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		codeDataObjType: 'task',
		exprFilter:
			'.csf.client.person = (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>).person AND <parms,str,itemsParmName> IN .codeType.codeTypeFamily.name LIMIT 1',
		name: 'data_obj_task_moed_ssr_doc_detail',
		header: 'My Document',
		isDetailRetrievePreset: true,
		tables: [{ index: 0, table: 'CmCsfDocument' }],
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
					'(SELECT assert_single((SELECT app_cm::CmClientServiceFlow FILTER .client.person = (SELECT sys_user::SysUser FILTER .id = <uuid><user,uuid,id>).person)))',
				linkTable: 'CmClientServiceFlow'
			},
			{
				codeFieldElement: 'date',
				columnName: 'dateIssued',
				headerAlt: 'Date',
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
				fieldListItems: 'il_sys_code_family_group_order_name_by_codeType_name_system',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'file',
				columnName: 'file',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0,
				width: 300
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
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: false,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: false,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: false,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: false,
				orderDefine: 1040,
				indexTable: 0
			}
		]
	})
	init.addTrans('sysNodeObjTask', {
		codeIcon: 'AppWindow',
		codeNavType: 'task',
		codeNodeType: 'program',
		dataObj: 'data_obj_task_moed_ssr_doc_list',
		header: 'Documents',
		name: 'node_obj_task_moed_ssr_doc_list',
		orderDefine: 30,
		owner: 'sys_moed_old'
	})
	init.addTrans('sysNodeObjTask', {
		codeIcon: 'AppWindow',
		codeNavType: 'task',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_task_moed_ssr_doc_detail',
		header: 'Document',
		name: 'node_obj_task_moed_ssr_doc_detail',
		orderDefine: 10,
		owner: 'sys_moed_old',
		parentNodeName: 'node_obj_task_moed_ssr_doc_list'
	})

	init.addTrans('sysTask', {
		btnStyle: 'bg-gradient-to-b from-blue-300 hover:from-pink-500 active:bg-violet-700 ',
		codeCategory: 'default',
		codeIcon: 'ImageUp',
		codeStatusObj: 'tso_moed_app_doc',
		description: 'Step 2: to help speed up my application processing.',
		exprShow: `SELECT true IF EXISTS (SELECT app_cm::CmClientServiceFlow FILTER .client.person = (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>).person) ELSE false`,
		exprStatus: `SELECT sys_core::SysCodeType { 
  id, 
  name, 
  header,
  _uploaded := (SELECT true IF (SELECT count((SELECT app_cm::CmCsfDocument FILTER .csf.client.person = (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>).person AND sys_core::SysCodeType IN .codeType.codeTypeFamily))) > 0 ELSE false)}
FILTER .parent.name = 'ct_cm_doc_type' ORDER BY .order asc`,
		hasAltOpen: true,
		header: 'My Eligibility Documents',
		isPinToDash: true,
		isGlobalResource: false,
		name: 'task_moed_ssr_app_doc',
		sourceDataObj: 'data_obj_task_moed_ssr_doc_detail',
		orderDefine: 20,
		owner: 'sys_moed_old'
	})
}

function initTaskSsrMsg(init: InitDb) {
	init.addTrans('sysDataObj', {
		owner: 'sys_moed_old',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_task_moed_ssr_msg_list',
		header: 'My Messages',
		tables: [{ index: 0, table: 'CmCsfMsg' }],
		exprFilter: '.csf.id = <uuid>"78527ffe-13c1-11ef-8756-4f224ba4fd90"',
		actionFieldGroup: 'doag_list_mobile',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
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
				columnName: 'codeStatus',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'subject',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		owner: 'sys_moed_old',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_task_moed_ssr_msg_detail',
		header: 'My Message',
		tables: [{ index: 0, table: 'CmCsfMsg' }],
		actionFieldGroup: 'doag_detail',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			// {
			// 	columnName: 'csf',
			// 	orderDefine: 20,
			// 	indexTable: 0,
			// 	isDisplayable: false,
			// 	linkExprSave:
			// 		'(SELECT app_cm::CmClientServiceFlow FILTER .id = <tree,uuid,CmClientServiceFlow.id>)',
			// 	linkTable: 'CmClientServiceFlow'
			// },
			{
				codeFieldElement: 'date',
				columnName: 'date',
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			// {
			// 	codeFieldElement: 'select',
			// 	columnName: 'sender',
			// 	isDisplayable: true,
			// 	orderDisplay: 50,
			// 	orderDefine: 50,
			// 	indexTable: 0,
			// 	fieldListItems: 'il_sys_user_by_tag_type',
			// 	fieldListItemsParmName: 'utt_role_moed_staff',
			// 	linkTable: 'SysUser'
			// },
			{
				columnName: 'subject',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			// {
			// 	codeAccess: 'readOnly',
			// 	columnName: 'codeStatus',
			// 	// exprPreset: `(SELECT assert_single((SELECT sys_core::SysCode FILTER .id = <uuid>"0bbab7c8-c0f4-11ee-9b77-e7fc1bb9b40e")))`,
			// 	isDisplayable: true,
			// 	orderDisplay: 70,
			// 	orderDefine: 70,
			// 	indexTable: 0,
			// 	// fieldListItems: 'il_sys_code_order_index_by_codeType_name',
			// 	// fieldListItemsParmName: 'ct_cm_msg_status',
			// 	linkTable: 'SysCode',
			// 	linkColumns: ['name']
			// },
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'msg',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				codeAlignmentAlt: 'center',
				codeFieldElement: 'radio',
				columnName: 'office',
				isDisplayable: true,
				orderDisplay: 210,
				orderDefine: 210,
				indexTable: 0,
				fieldListItems: 'il_sys_obj_subject_order_name',
				linkTable: 'SysObjSubject'
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
	init.addTrans('sysNodeObjTask', {
		codeIcon: 'AppWindow',
		codeNavType: 'task',
		codeNodeType: 'program',
		dataObj: 'data_obj_task_moed_ssr_msg_list',
		header: 'My Messages',
		name: 'node_obj_task_moed_ssr_msg_list',
		orderDefine: 10,
		owner: 'sys_moed_old'
	})
	init.addTrans('sysNodeObjTask', {
		codeIcon: 'AppWindow',
		codeNavType: 'task',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_task_moed_ssr_msg_detail',
		header: 'Message',
		name: 'node_obj_task_moed_ssr_msg_detail',
		orderDefine: 10,
		owner: 'sys_moed_old',
		parentNodeName: 'node_obj_task_moed_ssr_msg_list'
	})

	init.addTrans('sysTask', {
		btnStyle: 'bg-gradient-to-b from-amber-300 hover:from-pink-500 active:bg-violet-700 ',
		codeCategory: 'default',
		codeIcon: 'Mail',
		codeStatusObj: 'tso_moed_app_msg',
		description: 'Have questions? Send messages to program staff.',
		exprShow: `SELECT true IF EXISTS (SELECT app_cm::CmClientServiceFlow FILTER .client.person = (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>).person) ELSE false`,
		header: 'My Messages',
		isPinToDash: true,
		isGlobalResource: false,
		name: 'task_moed_ssr_app_msg',
		sourceDataObj: 'node_obj_task_moed_ssr_msg_list',
		orderDefine: 30,
		owner: 'sys_moed_old'
	})
}

function initSubjects(init: InitDb) {
	init.addTrans('sysObjSubject', {
		codeType: 'cst_moed_office',
		header: 'Eastside YO Center - 1212 N. Wolfe St. - 410-732-2661',
		isGlobalResource: false,
		name: 'moedOfficeEastside',
		owner: 'sys_moed_old'
	})
	init.addTrans('sysObjSubject', {
		codeType: 'cst_moed_office',
		header: 'Westside YO Center - 1510 W. Laffayette Ave. -  410-545-6953',
		isGlobalResource: false,
		name: 'moedOfficeWestside',
		owner: 'sys_moed_old'
	})
}

function initDemoData() {
	moedDataParticipant.setData()
	console.log('moedDataParticipant.data', moedDataParticipant.data)
}

function initParticipants(init: InitDb) {
	init.addTrans('MoedPBulkPart', moedDataParticipant.data['participant'])
}

function initParticipantServiceFlows(init: InitDb) {
	init.addTrans('MoedBulkCsf', moedDataParticipant.data['serviceFlow'])
}

function initParticipantDataDoc(init: InitDb) {
	init.addTrans('MoedBulkDataDoc', moedDataParticipant.data['dataDoc'])
}

function initParticipantDataMsg(init: InitDb) {
	init.addTrans('MoedBulkDataMsg', moedDataParticipant.data['dataMsg'])
}

function initParticipantData(init: InitDb) {
	init.addTrans('MoedCmCsfDataBulk', [])
}

function initAnalytic(init: InitDb) {
	init.addTrans('sysAnalytic', {
		header: 'MOED Analytic - Self Service Registration',
		name: 'analytic_moed_self_serv_reg',
		owner: 'sys_moed_old',
		statuses: [
			{
				codeStatus: 'met',
				expr: '85'
			},
			{
				codeStatus: 'medium',
				expr: '70'
			},
			{
				codeStatus: 'high',
				expr: '0'
			}
		]
	})
}

function initReport(init: InitDb) {
	init.addTrans('sysRep', {
		actionFieldGroup: 'doag_report_render',
		exprFilter: '.client[IS org_moed::MoedParticipant].owner.id IN <user,uuidlist,systemIds>',
		// exprWith: `parts := (SELECT org_moed::MoedParticipant FILTER .owner.id IN <user,uuidlist,systemIds>)`,
		header: 'Self Service Registration - Student Status',
		name: 'report_moed_self_serv_student_status',
		owner: 'sys_moed_old',
		tables: [
			{ index: 0, table: 'CmClientServiceFlow' },
			{ columnParent: 'client', indexParent: 0, index: 1, table: 'CmClient' },
			{ columnParent: 'person', indexParent: 1, index: 2, table: 'SysPerson' }
		],
		elements: [
			{
				codeReportElementType: 'column',
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 0
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'firstName',
				indexTable: 2,
				isDisplay: true,
				isDisplayable: true,
				orderDefine: 10,
				orderDisplay: 10,
				orderSort: 20
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'lastName',
				indexTable: 2,
				isDisplay: true,
				isDisplayable: true,
				orderDefine: 20,
				orderDisplay: 20,
				orderSort: 10
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'birthDate',
				indexTable: 2,
				isDisplay: false,
				isDisplayable: true,
				orderDefine: 30,
				orderDisplay: 30
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'ssn',
				indexTable: 2,
				isDisplay: false,
				isDisplayable: true,
				orderDefine: 40,
				orderDisplay: 40
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'phoneMobile',
				indexTable: 2,
				isDisplay: false,
				isDisplayable: true,
				orderDefine: 50,
				orderDisplay: 50
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'email',
				indexTable: 2,
				isDisplay: false,
				isDisplayable: true,
				orderDefine: 60,
				orderDisplay: 60
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'codeGender',
				indexTable: 2,
				isDisplay: false,
				isDisplayable: true,
				linkColumns: ['name'],
				orderDefine: 70,
				orderDisplay: 70
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'codeRace',
				indexTable: 2,
				isDisplay: false,
				isDisplayable: true,
				linkColumns: ['name'],
				orderDefine: 80,
				orderDisplay: 80
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'codeEthnicity',
				indexTable: 2,
				isDisplay: false,
				isDisplayable: true,
				linkColumns: ['name'],
				orderDefine: 90,
				orderDisplay: 90
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'codeDisabilityStatus',
				indexTable: 2,
				isDisplay: false,
				isDisplayable: true,
				linkColumns: ['name'],
				orderDefine: 100,
				orderDisplay: 100
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'addr1',
				indexTable: 2,
				isDisplay: false,
				isDisplayable: true,
				orderDefine: 110,
				orderDisplay: 110
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'addr2',
				indexTable: 2,
				isDisplay: false,
				isDisplayable: true,
				orderDefine: 120,
				orderDisplay: 120
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'city',
				indexTable: 2,
				isDisplay: false,
				isDisplayable: true,
				orderDefine: 130,
				orderDisplay: 130
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'codeState',
				indexTable: 2,
				isDisplay: false,
				isDisplayable: true,
				linkColumns: ['name'],
				orderDefine: 140,
				orderDisplay: 140
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'zip',
				indexTable: 2,
				isDisplay: false,
				isDisplayable: true,
				orderDefine: 150,
				orderDisplay: 150
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'office',
				indexTable: 1,
				isDisplay: false,
				isDisplayable: true,
				linkColumns: ['name'],
				orderDefine: 160,
				orderDisplay: 160
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'codeStatus',
				indexTable: 0,
				isDisplay: true,
				isDisplayable: true,
				linkColumns: ['name'],
				orderDefine: 170,
				orderDisplay: 170
			},
			{
				codeFieldElement: 'date',
				codeReportElementType: 'column',
				columnName: 'dateCreated',
				indexTable: 0,
				isDisplay: true,
				isDisplayable: true,
				orderDefine: 180,
				orderDisplay: 180
			},
			{
				codeFieldElement: 'date',
				codeReportElementType: 'column',
				columnName: 'dateStart',
				indexTable: 0,
				isDisplay: true,
				isDisplayable: true,
				orderDefine: 190,
				orderDisplay: 190
			},
			{
				codeFieldElement: 'date',
				codeReportElementType: 'column',
				columnName: 'dateEnd',
				indexTable: 0,
				isDisplay: true,
				isDisplayable: true,
				orderDefine: 200,
				orderDisplay: 200
			},
			{
				codeAlignment: 'right',
				codeDataType: 'int64',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				exprCustom: `(SELECT count((SELECT app_cm::CmCsfDocument FILTER .csf = app_cm::CmClientServiceFlow)))`,
				header: 'Documents - Total',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'docCnt',
				orderDefine: 210,
				orderDisplay: 210
			},
			{
				codeAlignment: 'right',
				codeDataType: 'int64',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				exprCustom: `(SELECT count((SELECT app_cm::CmCsfMsg FILTER .csf = app_cm::CmClientServiceFlow)))`,
				header: 'Messages - Total',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'msgCnt',
				orderDefine: 220,
				orderDisplay: 220
			},
			{
				codeAlignment: 'right',
				codeDataType: 'int64',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				exprCustom: `(SELECT count((SELECT app_cm::CmCsfMsg FILTER .csf = app_cm::CmClientServiceFlow AND .codeStatus.name = 'Sent')))`,
				header: 'Messages - Sent',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'msgSentCnt',
				orderDefine: 230,
				orderDisplay: 230
			},
			{
				codeAlignment: 'right',
				codeDataType: 'int64',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				exprCustom: `(SELECT count((SELECT app_cm::CmCsfMsg FILTER .csf = app_cm::CmClientServiceFlow AND .codeStatus.name = 'Under review')))`,
				header: 'Messages - Under review',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'msgUrCnt',
				orderDefine: 240,
				orderDisplay: 240
			},
			{
				codeAlignment: 'right',
				codeDataType: 'int64',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				exprCustom: `(SELECT count((SELECT app_cm::CmCsfMsg FILTER .csf = app_cm::CmClientServiceFlow AND .codeStatus.name = 'Responded')))`,
				header: 'Messages - Responded',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'msgRespondedCnt',
				orderDefine: 250,
				orderDisplay: 250
			},
			{
				codeAlignment: 'right',
				codeDataType: 'int64',
				codeFieldElement: 'number',
				codeReportElementType: 'column',
				exprCustom: `(SELECT count((SELECT app_cm::CmCsfMsg FILTER .csf = app_cm::CmClientServiceFlow AND .codeStatus.name = 'Closed')))`,
				header: 'Messages - Closed',
				isDisplay: true,
				isDisplayable: true,
				nameCustom: 'msgClosedCnt',
				orderDefine: 260,
				orderDisplay: 260
			}
		]
	})
}

// values: ['Closed', 'Responded', 'Sent', 'Under review']
