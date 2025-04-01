import { InitDb } from '$server/dbGel/init/types.init'
import { ParmsValuesType } from '$utils/types'

export function initContentMOEDCm(init: InitDb) {
	initApplicant(init)
	initApplicantMsg(init)
	initCsf(init)
	initCsfNote(init)
	initCsfDocument(init)

	// reports
	initAnalytic(init)
	initReport(init)
}

function initApplicant(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: `.owner.name = 'sys_client_moed'`,
		header: 'Participants',
		name: 'data_obj_moed_part_list',
		owner: 'sys_client_moed',
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
		actionGroup: 'doag_detail',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		header: 'Participant',
		name: 'data_obj_moed_part_detail',
		owner: 'sys_client_moed',
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
				exprSave: `(SELECT sys_core::SysSystem FILTER .id = <parms,uuid,queryOwnerIdSystem>)`,
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				isExcludeUpdate: true,
				linkTable: 'SysSystem'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 45,
				orderDefine: 45
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
				headerAlt: 'Birth Date (yyyy-mm-dd)',
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
				codeFieldElement: 'select',
				columnName: 'codeGender',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140,
				indexTable: 1,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_sys_person_gender',
				itemChanges: [
					{
						codeAccess: 'required',
						codeItemChangeAction: 'none',
						codeItemChangeValueType: 'code',
						codeOp: 'equal',
						columns: ['genderSelfId'],
						orderDefine: 0,
						valueTriggerCodes: [
							{
								owner: 'sys_client_moed',
								codeType: 'ct_sys_person_gender',
								name: 'Prefer to self-identify'
							}
						]
					},
					{
						codeAccess: 'hidden',
						codeItemChangeAction: 'reset',
						codeItemChangeValueType: 'code',
						codeOp: 'notEqual',
						columns: ['genderSelfId'],
						orderDefine: 1,
						valueTriggerCodes: [
							{
								owner: 'sys_client_moed',
								codeType: 'ct_sys_person_gender',
								name: 'Prefer to self-identify'
							}
						]
					}
				]
			},
			{
				codeAccess: 'optional',
				columnName: 'genderSelfId',
				indexTable: 1,
				isDisplayable: true,
				orderDefine: 145,
				orderDisplay: 145
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeRace',
				isDisplayable: true,
				orderDisplay: 150,
				orderDefine: 150,
				indexTable: 1,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_sys_person_race'
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
				fieldListItemsParmValue: 'ct_sys_person_ethnicity'
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
				fieldListItemsParmValue: 'ct_sys_person_disability_status'
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
				codeFieldElement: 'select',
				columnName: 'codePersonLivingArrangements',
				isDisplayable: true,
				itemChanges: [
					{
						codeAccess: 'optional',
						codeItemChangeAction: 'none',
						codeOp: 'notEqual',
						columns: ['addr1', 'addr2', 'city', 'codeState', 'zip'],
						orderDefine: 0,
						valueTriggerCodes: [
							{
								owner: 'sys_client_moed',
								codeType: 'ct_sys_person_living_arrangements',
								name: 'I am currently homeless'
							}
						]
					},
					{
						codeAccess: 'hidden',
						codeOp: 'equal',
						codeItemChangeAction: 'reset',
						columns: ['addr1', 'addr2', 'city', 'codeState', 'zip'],
						orderDefine: 1,
						valueTriggerCodes: [
							{
								owner: 'sys_client_moed',
								codeType: 'ct_sys_person_living_arrangements',
								name: 'I am currently homeless'
							}
						]
					}
				],
				orderDisplay: 205,
				orderDefine: 205,
				indexTable: 1,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_sys_person_living_arrangements'
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
				fieldListItemsParmValue: 'ct_sys_state'
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
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 320,
				orderDefine: 320
			},

			/* management */
			{
				codeFieldElement: 'tagDetails',
				columnName: 'custom_details_start',
				headerAlt: 'Meta',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1060,
				orderDefine: 1060
			},
			{
				codeFieldElement: 'tagDetails',
				columnName: 'custom_details_end',
				isDisplayable: true,
				orderDisplay: 1070,
				orderDefine: 1070
			}
		]
	})

	init.addTrans('sysNodeObjProgram', {
		children: [{ node: 'node_obj_moed_part_detail', order: 10 }],
		codeIcon: 'AppWindow',
		codeNodeType: 'program',
		codeQueryOwnerType: 'queryOwnerTypeSystemApp',
		dataObj: 'data_obj_moed_part_list',
		header: 'Participants',
		name: 'node_obj_moed_part_list',
		orderDefine: 10,
		owner: 'sys_client_moed'
	})
	init.addTrans('sysNodeObjProgramObj', {
		children: [
			{ node: 'node_obj_moed_msg_list', order: 10 },
			{ node: 'node_obj_moed_csf_list', order: 20 }
		],
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_moed_part_detail',
		header: 'Participant',
		name: 'node_obj_moed_part_detail',
		orderDefine: 10,
		owner: 'sys_client_moed'
	})
}

function initApplicantMsg(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter:
			'(SELECT org_client_moed::MoedParticipant FILTER .id = <tree,uuid,MoedParticipant.id>).person IN (.sender UNION .recipients) AND NOT EXISTS .parent',
		header: 'Messages (Root)',
		name: 'data_obj_moed_msg_list_root',
		owner: 'sys_client_moed',
		tables: [{ index: 0, table: 'SysMsg' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				codeAlignmentAlt: 'center',
				columnName: 'custom_element_str',
				isDisplayable: true,
				orderDefine: 20,
				orderDisplay: 20,
				exprCustom: `NOT EXISTS .parent`,
				headerAlt: 'Is Root',
				nameCustom: 'isRoot'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'parent',
				isDisplayable: false,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				codeSortDir: 'DESC',
				columnName: 'date',
				headerAlt: 'Date (Demonstration Only)',
				indexTable: 0,
				isDisplayable: true,
				orderCrumb: 10,
				orderDefine: 50,
				orderDisplay: 50,
				orderSort: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'sender',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0,
				linkColumns: ['fullName']
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
				columnName: 'note',
				isDisplay: false,
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.parent.id = <tree,uuid,id>',
		header: 'Messages (Thread)',
		name: 'data_obj_moed_msg_list_child',
		owner: 'sys_client_moed',
		tables: [{ index: 0, table: 'SysMsg' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'parent',
				isDisplayable: true,
				orderDefine: 20,
				orderDisplay: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				codeSortDir: 'DESC',
				columnName: 'date',
				headerAlt: 'Date (Demonstration Only)',
				indexTable: 0,
				isDisplayable: true,
				orderCrumb: 10,
				orderDefine: 25,
				orderDisplay: 25,
				orderSort: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'sender',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkColumns: ['fullName']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'subject',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				isDisplay: false,
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail_msg',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Message',
		isRetrieveReadonly: true,
		name: 'data_obj_moed_msg_detail',
		owner: 'sys_client_moed',
		tables: [{ index: 0, table: 'SysMsg' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'custom_element_str',
				isDisplayable: false,
				orderDefine: 20,
				exprCustom: `.sender.id`,
				nameCustom: 'recordOwner'
			},
			{
				columnName: 'recipients',
				exprSave: `(SELECT org_client_moed::MoedParticipant FILTER .id = <tree,uuid,MoedParticipant.id>).person `,
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 30,
				linkTable: 'SysPerson'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40
			},
			{
				codeAccess: 'readOnly',
				codeAlignmentAlt: 'center',
				columnName: 'custom_element_str',
				isDisplayable: true,
				orderDefine: 50,
				orderDisplay: 50,
				exprCustom: `NOT EXISTS .parent`,
				headerAlt: 'isRoot',
				nameCustom: 'isRoot'
			},
			{
				codeFieldElement: 'date',
				columnName: 'date',
				exprPreset: `<fSysToday>`,
				headerAlt: 'Date (Demonstration Only)-Default',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			// {
			// 	codeAccess: 'readOnly',
			// 	columnName: 'createdAt',
			// 	isDisplayable: true,
			// 	orderDisplay: 40,
			// 	orderDefine: 40,
			// 	indexTable: 0
			// },
			{
				codeAccess: 'readOnly',
				columnName: 'sender',
				exprPreset: `(SELECT default::SysPerson FILTER .id = <user,uuid,personId>)`,
				exprSave: `(SELECT default::SysPerson FILTER .id = <user,uuid,personId>)`,
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				linkColumns: ['fullName'],
				linkTable: 'SysPerson'
			},
			{
				columnName: 'subject',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
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
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail_msg',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Message',
		isRetrieveReadonly: true,
		name: 'data_obj_moed_msg_detail_parent_reply',
		owner: 'sys_client_moed',
		tables: [{ index: 0, table: 'SysMsg' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'parent',
				// exprSave: `(SELECT DETACHED sys_core::SysMsg FILTER .id = <parms,uuid,${ParmsValuesType.parentRecordId}>)`,
				exprSave: `(SELECT DETACHED sys_core::SysMsg FILTER .id = <tree,uuid,${ParmsValuesType.treeAncestorValue}.0.id>)`,
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 15,
				linkTable: 'SysMsg'
			},
			{
				columnName: 'custom_element_str',
				isDisplayable: false,
				orderDefine: 20,
				exprCustom: `.sender.id`,
				nameCustom: 'recordOwner'
			},
			{
				columnName: 'recipients',
				exprSave: `(SELECT DETACHED sys_core::SysMsg FILTER .id = <tree,uuid,${ParmsValuesType.treeAncestorValue}.0.id>).sender`,
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 30,
				linkTable: 'SysPerson'
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
				columnName: 'date',
				exprPreset: `<fSysToday>`,
				headerAlt: 'Date (Demonstration Only) - Reply',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			// {
			// 	codeAccess: 'readOnly',
			// 	columnName: 'createdAt',
			// 	isDisplayable: true,
			// 	orderDisplay: 40,
			// 	orderDefine: 40,
			// 	indexTable: 0
			// },
			{
				codeAccess: 'readOnly',
				columnName: 'sender',
				exprPreset: `(SELECT default::SysPerson FILTER .id = <user,uuid,personId>)`,
				exprSave: `(SELECT default::SysPerson FILTER .id = <user,uuid,personId>)`,
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				linkColumns: ['fullName'],
				linkTable: 'SysPerson'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'subject',
				// exprPreset: `<parms,str,subject>`,
				exprPreset: `<tree,str,${ParmsValuesType.treeAncestorValue}.0.subject>`,
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130
			}
		]
	})

	init.addTrans('sysNodeObjProgramObj', {
		children: [{ node: 'node_obj_moed_msg_detail_old', order: 10 }],
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_moed_msg_list_root',
		header: 'Messages',
		isAlwaysRetrieveData: true,
		name: 'node_obj_moed_msg_list',
		orderDefine: 10,
		owner: 'sys_client_moed'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_moed_msg_detail',
		header: 'Message',
		name: 'node_obj_moed_msg_detail_old',
		orderDefine: 10,
		owner: 'sys_client_moed'
	})
}

function initCsf(init: InitDb) {
	init.addTrans('sysDataObj', {
		owner: 'sys_client_moed',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_moed_csf_list',
		header: 'Service Flows',
		tables: [{ index: 0, table: 'CmClientServiceFlow' }],
		exprFilter: '.client.id = <tree,uuid,MoedParticipant.id>',
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
				columnName: 'programCm',
				orderCrumb: 10,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['header']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'attrs',
				headerAlt: 'Site',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkColumns: ['header'],
				linkTable: 'SysAttr'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeSfEnrollType',
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
				columnName: 'codeSfEligibilityStatus',
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
				isDisplay: false,
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
				isDisplay: false,
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
				columnName: 'codeSfOutcome',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				isDisplay: false,
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		owner: 'sys_client_moed',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_moed_csf_detail',
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
				exprSave: `(SELECT org_client_moed::MoedParticipant FILTER .id = <tree,uuid,MoedParticipant.id>)`,
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkColumns: ['person', 'fullName'],
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
				columnName: 'programCm',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				fieldListItems: 'il_cm_program'
			},
			{
				codeFieldElement: 'select',
				columnName: 'attrs',
				headerAlt: 'Site',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_attr_obj_system_types',
				fieldListItemsParmValueList: ['at_cm_sf_site']
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeSfEnrollType',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_cm_sf_enroll_type'
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
				codeFieldElement: 'date',
				columnName: 'dateCreated',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'date',
				columnName: 'dateStartEst',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'date',
				columnName: 'dateEndEst',
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
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeSfEligibilityStatus',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_cm_sf_eligibility_status'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'date',
				columnName: 'dateStart',
				isDisplayable: true,
				orderDisplay: 150,
				orderDefine: 150,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'date',
				columnName: 'dateEnd',
				isDisplayable: true,
				itemChanges: [
					{
						codeAccess: 'required',
						codeItemChangeAction: 'none',
						codeOp: 'notNull',
						columns: ['codeSfOutcome'],
						orderDefine: 0
					},
					{
						codeAccess: 'hidden',
						codeOp: 'null',
						codeItemChangeAction: 'reset',
						columns: ['codeSfOutcome'],
						orderDefine: 1
					}
				],
				orderDisplay: 160,
				orderDefine: 160,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeSfOutcome',
				isDisplayable: true,
				orderDisplay: 170,
				orderDefine: 170,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_cm_sf_outcome'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 180,
				orderDefine: 180
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				isDisplayable: true,
				orderDisplay: 190,
				orderDefine: 190,
				indexTable: 0
			},

			/* management */
			{
				codeFieldElement: 'tagDetails',
				columnName: 'custom_details_start',
				headerAlt: 'Meta',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1060,
				orderDefine: 1060
			},
			{
				codeFieldElement: 'tagDetails',
				columnName: 'custom_details_end',
				isDisplayable: true,
				orderDisplay: 1070,
				orderDefine: 1070
			}
		]
	})
	init.addTrans('sysNodeObjProgramObj', {
		children: [{ node: 'node_obj_moed_csf_detail', order: 10 }],
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_moed_csf_list',
		header: 'Service Flows',
		name: 'node_obj_moed_csf_list',
		orderDefine: 20,
		owner: 'sys_client_moed'
	})
	init.addTrans('sysNodeObjProgramObj', {
		children: [
			{ node: 'node_obj_moed_csf_note_list', order: 10 },
			{ node: 'node_obj_moed_csf_doc_list', order: 20 }
		],
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_moed_csf_detail',
		header: 'Service Flow',
		name: 'node_obj_moed_csf_detail',
		orderDefine: 10,
		owner: 'sys_client_moed'
	})
}

function initCsfNote(init: InitDb) {
	init.addTrans('sysDataObj', {
		owner: 'sys_client_moed',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_moed_csf_note_list',
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
				codeSortDir: 'DESC',
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
		owner: 'sys_client_moed',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_moed_csf_note_detail',
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
				exprSave: `(SELECT app_cm::CmClientServiceFlow FILTER .id = <tree,uuid,CmClientServiceFlow.id>)`,
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkColumns: ['programCm', 'name'],
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
				fieldListItems: 'il_sys_code_order_name_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_cm_case_note_type'
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
				codeFieldElement: 'tagDetails',
				columnName: 'custom_details_start',
				headerAlt: 'Meta',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1060,
				orderDefine: 1060
			},
			{
				codeFieldElement: 'tagDetails',
				columnName: 'custom_details_end',
				isDisplayable: true,
				orderDisplay: 1070,
				orderDefine: 1070
			}
		]
	})
	init.addTrans('sysNodeObjProgramObj', {
		children: [{ node: 'node_obj_moed_csf_note_detail', order: 10 }],
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_moed_csf_note_list',
		header: 'Case Notes',
		name: 'node_obj_moed_csf_note_list',
		orderDefine: 20,
		owner: 'sys_client_moed'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_moed_csf_note_detail',
		header: 'Case Note',
		name: 'node_obj_moed_csf_note_detail',
		orderDefine: 10,
		owner: 'sys_client_moed'
	})
}

function initCsfDocument(init: InitDb) {
	init.addTrans('sysDataObj', {
		owner: 'sys_client_moed',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_moed_csf_doc_list',
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
				codeFieldElement: 'toggle',
				columnName: 'isVerifiedByCaseManager',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isVerifiedByCompliance',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 80,
				orderDisplay: 80
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Document',
		name: 'data_obj_moed_csf_doc_detail',
		owner: 'sys_client_moed',
		queryRiders: [
			{
				codeFunction: 'qrfFileStorage',
				codeQueryType: 'save',
				codeTriggerTiming: 'pre',
				codeType: 'customFunction',
				functionParmValue: 'file'
			}
		],
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
				exprSave: `(SELECT app_cm::CmClientServiceFlow FILTER .id = <tree,uuid,CmClientServiceFlow.id>)`,
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkColumns: ['programCm', 'name'],
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
				fieldListItemsParmValue: 'ct_cm_doc_type'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isVerifiedByCaseManager',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isVerifiedByCompliance',
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
				codeFieldElement: 'tagDetails',
				columnName: 'custom_details_start',
				headerAlt: 'Meta',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1060,
				orderDefine: 1060
			},
			{
				codeFieldElement: 'tagDetails',
				columnName: 'custom_details_end',
				isDisplayable: true,
				orderDisplay: 1070,
				orderDefine: 1070
			}
		]
	})
	init.addTrans('sysNodeObjProgramObj', {
		children: [{ node: 'node_obj_moed_csf_doc_detail', order: 10 }],
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_moed_csf_doc_list',
		header: 'Documents',
		name: 'node_obj_moed_csf_doc_list',
		orderDefine: 30,
		owner: 'sys_client_moed'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_moed_csf_doc_detail',
		header: 'Document',
		name: 'node_obj_moed_csf_doc_detail',
		orderDefine: 10,
		owner: 'sys_client_moed'
	})
}

function initAnalytic(init: InitDb) {
	init.addTrans('sysAnalytic', {
		header: 'MOED Analytic - Self Service Registration',
		name: 'analytic_moed_self_serv_reg',
		owner: 'sys_client_moed',
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
		actionGroup: 'doag_report_render',
		exprFilter: '.client IN org_client_moed::MoedParticipant',
		header: 'Self Service Registration - Student Status',
		name: 'report_moed_self_serv_student_status',
		owner: 'sys_client_moed',
		tables: [
			{ index: 0, table: 'CmClientServiceFlow' },
			{ columnParent: 'client', indexParent: 0, index: 1, table: 'MoedParticipant' },
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
				columnName: 'genderSelfId',
				indexTable: 2,
				isDisplay: false,
				isDisplayable: true,
				orderDefine: 75,
				orderDisplay: 75
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
				columnName: 'attrs',
				header: 'Site',
				indexTable: 2,
				isDisplay: true,
				isDisplayable: true,
				linkColumns: ['header'],
				linkTable: 'SysAttr',
				orderDefine: 160,
				orderDisplay: 160
			},
			{
				codeFieldElement: 'text',
				codeReportElementType: 'column',
				columnName: 'codeSfEligibilityStatus',
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
			}
			// {
			// 	codeAlignment: 'right',
			// 	codeDataType: 'int64',
			// 	codeFieldElement: 'number',
			// 	codeReportElementType: 'column',
			// 	exprCustom: `(SELECT count((SELECT sys_core::SysMsg FILTER .csf = app_cm::CmClientServiceFlow)))`,
			// 	header: 'Messages - Total',
			// 	isDisplay: true,
			// 	isDisplayable: true,
			// 	nameCustom: 'msgCnt',
			// 	orderDefine: 220,
			// 	orderDisplay: 220
			// },
			// {
			// 	codeAlignment: 'right',
			// 	codeDataType: 'int64',
			// 	codeFieldElement: 'number',
			// 	codeReportElementType: 'column',
			// 	exprCustom: `(SELECT count((SELECT sys_core::SysMsg FILTER .csf = app_cm::CmClientServiceFlow AND .codeSfEligibilityStatus.name = 'Sent')))`,
			// 	header: 'Messages - Sent',
			// 	isDisplay: true,
			// 	isDisplayable: true,
			// 	nameCustom: 'msgSentCnt',
			// 	orderDefine: 230,
			// 	orderDisplay: 230
			// },
			// {
			// 	codeAlignment: 'right',
			// 	codeDataType: 'int64',
			// 	codeFieldElement: 'number',
			// 	codeReportElementType: 'column',
			// 	exprCustom: `(SELECT count((SELECT sys_core::SysMsg FILTER .csf = app_cm::CmClientServiceFlow AND .codeSfEligibilityStatus.name = 'Under review')))`,
			// 	header: 'Messages - Under review',
			// 	isDisplay: true,
			// 	isDisplayable: true,
			// 	nameCustom: 'msgUrCnt',
			// 	orderDefine: 240,
			// 	orderDisplay: 240
			// },
			// {
			// 	codeAlignment: 'right',
			// 	codeDataType: 'int64',
			// 	codeFieldElement: 'number',
			// 	codeReportElementType: 'column',
			// 	exprCustom: `(SELECT count((SELECT sys_core::SysMsg FILTER .csf = app_cm::CmClientServiceFlow AND .codeSfEligibilityStatus.name = 'replied')))`,
			// 	header: 'Messages - Replied',
			// 	isDisplay: true,
			// 	isDisplayable: true,
			// 	nameCustom: 'msgRepliedCnt',
			// 	orderDefine: 250,
			// 	orderDisplay: 250
			// },
			// {
			// 	codeAlignment: 'right',
			// 	codeDataType: 'int64',
			// 	codeFieldElement: 'number',
			// 	codeReportElementType: 'column',
			// 	exprCustom: `(SELECT count((SELECT sys_core::SysMsg FILTER .csf = app_cm::CmClientServiceFlow AND .codeSfEligibilityStatus.name = 'Closed')))`,
			// 	header: 'Messages - Closed',
			// 	isDisplay: true,
			// 	isDisplayable: true,
			// 	nameCustom: 'msgClosedCnt',
			// 	orderDefine: 260,
			// 	orderDisplay: 260
			// }
		]
	})
}
