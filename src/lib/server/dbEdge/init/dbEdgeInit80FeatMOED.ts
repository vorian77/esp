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
	addMOEDParticipant,
	addMOEDPartDataTest
} from '$server/dbEdge/init/dbEdgeInit200Utilities60OrgMOED'

export async function initFeatMOED() {
	sectionHeader('Init - MOED - Self-Service - Registration')
	await initTest()
	// await initReset()
	// await initStudent()
	// await initDocument()
	// await initParticipants()
}

export async function initTest() {
	sectionHeader('Reset-MOED')
	const reset = new ResetDb()
	reset.addStatement('delete org_moed::MoedPartData')
	await reset.execute()

	await addMOEDPartDataTest({
		header: 'header0',
		name: 'name0'
	})
}

export async function initReset() {
	sectionHeader('Reset-User')
	const reset = new ResetDb()
	reset.addStatement('delete org_moed::MoedParticipant')

	reset.delNodeObj('node_obj_moed_part_data_doc_detail')
	reset.delNodeObj('node_obj_moed_part_data_doc_list')
	reset.delNodeObj('node_obj_moed_part_detail')
	reset.delNodeObj('node_obj_moed_part_list')

	reset.delDataObj('data_obj_moed_part_data_doc_detail')
	reset.delDataObj('data_obj_moed_part_data_doc_list')
	reset.delDataObj('data_obj_moed_part_detail')
	reset.delDataObj('data_obj_moed_part_list')
	await reset.execute()
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
				linkExprSave: '(SELECT sys_core::SysSystem Filter .id = (<parms,uuid,userSystemId>))',
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
				orderDisplay: 190,
				orderDefine: 190
			},
			{
				codeAccess: 'optional',
				codeAlignmentAlt: 'center',
				codeFieldElement: 'radio',
				columnName: 'office',
				isDisplayable: true,
				orderDisplay: 200,
				orderDefine: 200,
				indexTable: 0,
				fieldListItems: 'il_sys_obj_subject_order_name',
				linkTable: 'SysObjSubject'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 210,
				orderDefine: 210
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

async function initDocument() {
	await addDataObj({
		owner: 'sys_moed_old',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_moed_part_data_doc_list',
		header: 'Documents',
		tables: [{ index: 0, table: 'MoedPartDoc' }],
		exprFilter: '.participant.id = <tree,uuid,MoedParticipant.id>',
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
				columnName: 'date',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeType',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkColumns: ['name']
			}
		]
	})

	await addDataObj({
		owner: 'sys_moed_old',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_moed_part_data_doc_detail',
		header: 'Document',
		tables: [{ index: 0, table: 'MoedPartDoc' }],
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
				columnName: 'participant',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave:
					'(SELECT org_moed::MoedParticipant FILTER .id = <tree,uuid,MoedParticipant.id>)',
				linkTable: 'MoedParticipant'
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
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
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
		dataObj: 'data_obj_moed_part_data_doc_list',
		header: 'Documents',
		isHideRowManager: false,
		name: 'node_obj_moed_part_data_doc_list',
		orderDefine: 10,
		owner: 'sys_moed_old',
		parentNodeName: 'node_obj_moed_part_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_moed_part_data_doc_detail',
		header: 'Document',
		isHideRowManager: false,
		name: 'node_obj_moed_part_data_doc_detail',
		orderDefine: 10,
		owner: 'sys_moed_old',
		parentNodeName: 'node_obj_moed_part_data_doc_list'
	})
}

async function initParticipants() {
	sectionHeader('Participants')
	await addMOEDParticipant({
		birthDate: '2003-05-19',
		firstName: 'John',
		lastName: 'Doe'
	})
}
