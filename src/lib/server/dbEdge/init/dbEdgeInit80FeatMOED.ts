import { InitDbObj } from '$server/dbEdge/init/types.init'
import { sectionHeader } from '$routes/api/dbEdge/dbEdge'
import {
	ResetDb,
	userSystems,
	userUserType,
	widgets
} from '$server/dbEdge/init/dbEdgeInit200Utilities10'
import { addDataObj } from '$server/dbEdge/init/dbEdgeInit200Utilities20DataObj'
import {
	addNodeProgram,
	addNodeProgramObj
} from '$server/dbEdge/init/dbEdgeInit200Utilities50Other'
import {
	addMOEDCSF,
	addMOEDParticipants,
	addMOEDPartDataTest,
	addMOEDStaff
} from '$server/dbEdge/init/dbEdgeInit200Utilities60OrgMOED'
import { moedDataParticipant } from '$utils/utils.randomDataGenerator'

export function initFeatMOED() {
	const init = new InitDbObj('MOED - Self-Service - Registration', initObjects)
	initReset(init)
	return init
}

function initReset(init: InitDbObj) {
	// records
	// init.reset.delTableRecords('sys_core::SysObjSubject')

	init.reset.addStatement(
		'delete app_cm::CmCsfData filter .csf.client in org_moed::MoedParticipant'
	)
	init.reset.addStatement(
		'delete app_cm::CmClientServiceFlow filter .client in org_moed::MoedParticipant'
	)
	init.reset.addStatement('delete org_moed::MoedParticipant')
	init.reset.addStatement(`delete sys_user::SysStaff filter 'moed_advocate' in .roles.name`)

	// nodes
	init.reset.delNodeObj('node_obj_moed_ssr_msg_detail')
	init.reset.delNodeObj('node_obj_moed_ssr_msg_list')

	init.reset.delNodeObj('node_obj_moed_ssr_doc_detail')
	init.reset.delNodeObj('node_obj_moed_ssr_doc_list')

	init.reset.delNodeObj('node_obj_moed_csf_doc_detail')
	init.reset.delNodeObj('node_obj_moed_csf_doc_list')
	init.reset.delNodeObj('node_obj_moed_csf_note_detail')
	init.reset.delNodeObj('node_obj_moed_csf_note_list')
	init.reset.delNodeObj('node_obj_moed_csf_msg_detail')
	init.reset.delNodeObj('node_obj_moed_csf_msg_list')
	init.reset.delNodeObj('node_obj_moed_csf_detail')
	init.reset.delNodeObj('node_obj_moed_csf_list')
	init.reset.delNodeObj('node_obj_moed_part_detail')
	init.reset.delNodeObj('node_obj_moed_part_list')

	// data objects
	init.reset.delDataObj('data_obj_moed_ssr_msg_detail')
	init.reset.delDataObj('data_obj_moed_ssr_msg_list')
	init.reset.delDataObj('data_obj_moed_ssr_doc_detail')
	init.reset.delDataObj('data_obj_moed_ssr_doc_list')
	init.reset.delDataObj('data_obj_moed_ssr_app')

	init.reset.delDataObj('data_obj_moed_csf_doc_detail')
	init.reset.delDataObj('data_obj_moed_csf_doc_list')
	init.reset.delDataObj('data_obj_moed_csf_note_detail')
	init.reset.delDataObj('data_obj_moed_csf_note_list')
	init.reset.delDataObj('data_obj_moed_csf_msg_detail')
	init.reset.delDataObj('data_obj_moed_csf_msg_list')
	init.reset.delDataObj('data_obj_moed_csf_detail')
	init.reset.delDataObj('data_obj_moed_csf_list')
	init.reset.delDataObj('data_obj_moed_part_detail')
	init.reset.delDataObj('data_obj_moed_part_list')
}

async function initObjects() {
	await initStudent()
	await initCsf()
	await initCsfMsg()
	await initCsfNote()
	await initCsfDocument()
	await initStaff()
	await initSSRmyApp()
	await initSSRmyDoc()
	await initSSRmyMsg()
	// await initParticipants()
	// await initReferrals()
}

async function initStudent() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: `.owner.id in <user,uuidList,systemIds>`,
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
				columnName: 'owner',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 20
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

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		header: 'Participant',
		isSystemRootNode: true,
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
				codeFieldElement: 'ssn',
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
	await addNodeProgram({
		codeIcon: 'application',
		dataObj: 'data_obj_moed_part_list',
		header: 'Participants',
		isHideRowManager: false,
		name: 'node_obj_moed_part_list',
		orderDefine: 10,
		owner: 'sys_moed_old'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_moed_part_detail',
		header: 'Participant',
		isHideRowManager: false,
		name: 'node_obj_moed_part_detail',
		orderDefine: 10,
		owner: 'sys_moed_old',
		parentNodeName: 'node_obj_moed_part_list'
	})
}

async function initCsf() {
	await addDataObj({
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
				columnName: 'codeReferralType',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateReferral',
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
				columnName: 'codeReferralEndType',
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

	await addDataObj({
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
				columnName: 'codeReferralType',
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
				columnName: 'dateReferral',
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
				columnName: 'codeReferralEndType',
				isDisplayable: true,
				orderDisplay: 150,
				orderDefine: 150,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmName: 'ct_cm_service_flow_end_type',
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
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_moed_csf_list',
		header: 'Service Flows',
		isHideRowManager: false,
		name: 'node_obj_moed_csf_list',
		orderDefine: 10,
		owner: 'sys_moed_old',
		parentNodeName: 'node_obj_moed_part_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_moed_csf_detail',
		header: 'Service Flow',
		isHideRowManager: false,
		name: 'node_obj_moed_csf_detail',
		orderDefine: 10,
		owner: 'sys_moed_old',
		parentNodeName: 'node_obj_moed_csf_list'
	})
}

async function initCsfMsg() {
	await addDataObj({
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
				columnName: 'parent',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
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

	await addDataObj({
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
				fieldListItems: 'il_sys_role_staff_by_codeName',
				fieldListItemsParmName: 'moed_advocate',
				linkTable: 'SysStaff'
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
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_moed_csf_msg_list',
		header: 'Messages',
		isHideRowManager: false,
		name: 'node_obj_moed_csf_msg_list',
		orderDefine: 10,
		owner: 'sys_moed_old',
		parentNodeName: 'node_obj_moed_csf_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_moed_csf_msg_detail',
		header: 'Message',
		isHideRowManager: false,
		name: 'node_obj_moed_csf_msg_detail',
		orderDefine: 10,
		owner: 'sys_moed_old',
		parentNodeName: 'node_obj_moed_csf_msg_list'
	})
}

async function initCsfNote() {
	await addDataObj({
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

	await addDataObj({
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
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_moed_csf_note_list',
		header: 'Case Notes',
		isHideRowManager: false,
		name: 'node_obj_moed_csf_note_list',
		orderDefine: 20,
		owner: 'sys_moed_old',
		parentNodeName: 'node_obj_moed_csf_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_moed_csf_note_detail',
		header: 'Case Note',
		isHideRowManager: false,
		name: 'node_obj_moed_csf_note_detail',
		orderDefine: 10,
		owner: 'sys_moed_old',
		parentNodeName: 'node_obj_moed_csf_note_list'
	})
}

async function initCsfDocument() {
	await addDataObj({
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

	await addDataObj({
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
				fieldListItems: 'il_sys_code_order_name_by_codeType_name_system',
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
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_moed_csf_doc_list',
		header: 'Documents',
		isHideRowManager: false,
		name: 'node_obj_moed_csf_doc_list',
		orderDefine: 30,
		owner: 'sys_moed_old',
		parentNodeName: 'node_obj_moed_csf_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_moed_csf_doc_detail',
		header: 'Document',
		isHideRowManager: false,
		name: 'node_obj_moed_csf_doc_detail',
		orderDefine: 10,
		owner: 'sys_moed_old',
		parentNodeName: 'node_obj_moed_csf_doc_list'
	})
}

async function initStaff() {
	await addMOEDStaff([
		['Tyshell', 'Oliver'],
		['Travis', 'Williams'],
		['Tynesha', 'Wilson'],
		['Burlington', 'Stone']
	])
}

async function initSSRmyApp() {
	await addDataObj({
		owner: 'sys_moed_old',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		exprFilter: '.id = <uuid>"78527ffe-13c1-11ef-8756-4f224ba4fd90"',
		// exprFilter: '.user.id = <user,uuid,id>',
		name: 'data_obj_moed_ssr_app',
		header: 'My Application',
		tables: [
			{ index: 0, table: 'CmClientServiceFlow' },
			{ columnParent: 'client', indexParent: 0, index: 1, table: 'MoedParticipant' },
			{ columnParent: 'person', indexParent: 1, index: 2, table: 'SysPerson' }
		],
		actionFieldGroup: 'doag_detail_retrieve_preset',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'user',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave: `(select sys_user::SysUser filter .id = <user,uuid,id>)`,
				linkTable: 'SysUser'
			},

			{
				codeFieldElement: 'customHeader',
				columnName: 'custom_element',
				customElement: { label: 'Enter your program eligibility information here:' },
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
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
				orderDisplay: 35,
				orderDefine: 35,
				indexTable: 0
			},

			{
				codeFieldElement: 'date',
				columnName: 'dateReferral',
				headerAlt: 'Application Date',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeStatus',
				orderDefine: 105,
				orderDisplay: 105,
				indexTable: 0,
				isDisplayable: true,
				linkColumns: ['name']
			},
			{
				columnName: 'firstName',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 2
			},
			{
				columnName: 'lastName',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 2
			},
			{
				codeFieldElement: 'date',
				columnName: 'birthDate',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 2
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'ssn',
				columnName: 'ssn',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140,
				indexTable: 2
			},
			{
				codeAccess: 'optional',
				columnName: 'phoneMobile',
				indexTable: 2,
				isDisplayable: true,
				orderDefine: 150,
				orderDisplay: 150
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'email',
				columnName: 'email',
				indexTable: 2,
				isDisplayable: true,
				orderDefine: 160,
				orderDisplay: 160
			},
			// {
			// 	codeAccess: 'optional',
			// 	codeFieldElement: 'select',
			// 	columnName: 'codeGender',
			// 	isDisplayable: true,
			// 	orderDisplay: 170,
			// 	orderDefine: 170,
			// 	indexTable: 2,
			// 	fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
			// 	fieldListItemsParmName: 'ct_sys_person_gender',
			// 	linkTable: 'SysCode'
			// },
			{
				columnName: 'codeGender',
				orderDefine: 170,
				orderDisplay: 170,
				indexTable: 2,
				isDisplayable: true,
				linkColumns: ['name']
			},
			// {
			// 	codeAccess: 'optional',
			// 	codeFieldElement: 'select',
			// 	columnName: 'codeRace',
			// 	isDisplayable: true,
			// 	orderDisplay: 180,
			// 	orderDefine: 180,
			// 	indexTable: 2,
			// 	fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
			// 	fieldListItemsParmName: 'ct_sys_person_race',
			// 	linkTable: 'SysCode'
			// },
			{
				columnName: 'codeRace',
				orderDefine: 180,
				orderDisplay: 180,
				indexTable: 2,
				isDisplayable: true,
				linkColumns: ['name']
			},
			// {
			// 	codeAccess: 'optional',
			// 	codeFieldElement: 'select',
			// 	columnName: 'codeEthnicity',
			// 	isDisplayable: true,
			// 	orderDisplay: 190,
			// 	orderDefine: 190,
			// 	indexTable: 2,
			// 	fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
			// 	fieldListItemsParmName: 'ct_sys_person_ethnicity',
			// 	linkTable: 'SysCode'
			// },
			{
				columnName: 'codeEthnicity',
				orderDefine: 180,
				orderDisplay: 190,
				indexTable: 2,
				isDisplayable: true,
				linkColumns: ['name']
			},
			// {
			// 	codeAccess: 'optional',
			// 	codeFieldElement: 'select',
			// 	columnName: 'codeDisabilityStatus',
			// 	isDisplayable: true,
			// 	orderDisplay: 200,
			// 	orderDefine: 200,
			// 	indexTable: 2,
			// 	fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
			// 	fieldListItemsParmName: 'ct_sys_person_disability_status',
			// 	linkTable: 'SysCode'
			// },
			{
				columnName: 'codeDisabilityStatus',
				orderDefine: 200,
				orderDisplay: 200,
				indexTable: 2,
				isDisplayable: true,
				linkColumns: ['name']
			},
			{
				codeAccess: 'optional',
				columnName: 'addr1',
				indexTable: 2,
				isDisplayable: true,
				orderDefine: 300,
				orderDisplay: 300
			},
			{
				codeAccess: 'optional',
				columnName: 'addr2',
				indexTable: 2,
				isDisplayable: true,
				orderDefine: 310,
				orderDisplay: 310
			},
			{
				codeAccess: 'optional',
				columnName: 'city',
				indexTable: 2,
				isDisplayable: true,
				orderDefine: 320,
				orderDisplay: 320
			},
			// {
			// 	codeAccess: 'optional',
			// 	codeFieldElement: 'select',
			// 	columnName: 'codeState',
			// 	isDisplayable: true,
			// 	orderDisplay: 330,
			// 	orderDefine: 330,
			// 	indexTable: 2,
			// 	fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
			// 	fieldListItemsParmName: 'ct_sys_state',
			// 	linkTable: 'SysCode'
			// },
			{
				columnName: 'codeState',
				orderDefine: 330,
				orderDisplay: 330,
				indexTable: 2,
				isDisplayable: true,
				linkColumns: ['name']
			},
			{
				codeAccess: 'optional',
				columnName: 'zip',
				indexTable: 2,
				isDisplayable: true,
				orderDefine: 340,
				orderDisplay: 340
			},
			// {
			// 	codeAccess: 'optional',
			// 	codeAlignmentAlt: 'center',
			// 	codeFieldElement: 'radio',
			// 	columnName: 'office',
			// 	isDisplayable: true,
			// 	orderDisplay: 350,
			// 	orderDefine: 350,
			// 	indexTable: 1,
			// 	fieldListItems: 'il_sys_obj_subject_order_name',
			// 	linkTable: 'SysObjSubject'
			// },
			{
				columnName: 'office',
				orderDefine: 350,
				orderDisplay: 350,
				indexTable: 1,
				isDisplayable: true,
				linkColumns: ['header']
			},

			/* management */
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
			}
		]
	})
}

async function initSSRmyDoc() {
	await addDataObj({
		owner: 'sys_moed_old',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_moed_ssr_doc_list',
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

	await addDataObj({
		owner: 'sys_moed_old',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_moed_ssr_doc_detail',
		header: 'My Document',
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
				fieldListItems: 'il_sys_code_order_name_by_codeType_name_system',
				fieldListItemsParmName: 'ct_cm_doc_type',
				linkTable: 'SysCode'
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
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_moed_ssr_doc_list',
		header: 'Documents',
		isHideRowManager: false,
		name: 'node_obj_moed_ssr_doc_list',
		orderDefine: 30,
		owner: 'sys_moed_old'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_moed_ssr_doc_detail',
		header: 'Document',
		isHideRowManager: false,
		name: 'node_obj_moed_ssr_doc_detail',
		orderDefine: 10,
		owner: 'sys_moed_old',
		parentNodeName: 'node_obj_moed_ssr_doc_list'
	})
}

async function initSSRmyMsg() {
	await addDataObj({
		owner: 'sys_moed_old',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_moed_ssr_msg_list',
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

	await addDataObj({
		owner: 'sys_moed_old',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_moed_ssr_msg_detail',
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
			// 	fieldListItems: 'il_sys_role_staff_by_codeName',
			// 	fieldListItemsParmName: 'moed_advocate',
			// 	linkTable: 'SysStaff'
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
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_moed_ssr_msg_list',
		header: 'My Messages',
		isHideRowManager: false,
		name: 'node_obj_moed_ssr_msg_list',
		orderDefine: 10,
		owner: 'sys_moed_old'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_moed_ssr_msg_detail',
		header: 'Message',
		isHideRowManager: false,
		name: 'node_obj_moed_ssr_msg_detail',
		orderDefine: 10,
		owner: 'sys_moed_old',
		parentNodeName: 'node_obj_moed_ssr_msg_list'
	})
}

/* subjects */
// await addUserTypeResourceSubject({
// 	codeType: 'cst_moed_office',
// 	header: 'MOED Westside',
// 	isGlobalResource: false,
// 	name: 'moedOfficeWestside',
// 	owner: 'sys_moed_old'
// })
// await addUserTypeResourceSubject({
// 	codeType: 'cst_moed_office',
// 	header: 'MOED Eastside',
// 	isGlobalResource: false,
// 	name: 'moedOfficeEastside',
// 	owner: 'sys_moed_old'
// })

async function initParticipants() {
	sectionHeader('Participants')

	const data = moedDataParticipant.data['students']
	await addMOEDParticipants(data)
}

async function initReferrals() {
	console.log(moedDataParticipant.data['referrals'])
	await addMOEDCSF(moedDataParticipant.data['referrals'])
}
