import { InitDb } from '$server/dbGel/init/types.init'
import { PropDataType } from '$utils/types'

export function initContentMOEDCm(init: InitDb) {
	initObjAttr(init)

	// features
	initApplicant(init)
	initCsf(init)
	initCsfDocument(init)
	initCsfEligibility(init)
	initCsfNote(init)
}

function initObjAttr(init: InitDb) {
	init.addTrans('sysObjAttr', {
		code: 'at_cm_site',
		header: 'Eastside Office',
		name: 'site_moed_office_east',
		ownerSys: 'sys_client_baltimore_moed'
	})
	init.addTrans('sysObjAttr', {
		code: 'at_cm_site',
		header: 'Westside Office',
		name: 'site_moed_office_west',
		ownerSys: 'sys_client_baltimore_moed'
	})
	init.addTrans('sysObjAttr', {
		code: 'at_sys_msg_group',
		header: 'MOED Administrators',
		name: 'group_msg_moed_admin',
		ownerSys: 'sys_client_baltimore_moed'
	})
	init.addTrans('sysObjAttr', {
		code: 'at_sys_msg_group',
		header: 'Eastside Staff',
		name: 'group_msg_moed_staff_east',
		ownerSys: 'sys_client_baltimore_moed'
	})
	init.addTrans('sysObjAttr', {
		code: 'at_sys_msg_group',
		header: 'Westside Staff',
		name: 'group_msg_moed_staff_west',
		ownerSys: 'sys_client_baltimore_moed'
	})
	init.addTrans('sysObjAttr', {
		code: 'at_sys_msg_group',
		header: 'Eastside Youth Applicants',
		name: 'group_msg_moed_youth_applicants_east',
		ownerSys: 'sys_client_baltimore_moed'
	})
	init.addTrans('sysObjAttr', {
		code: 'at_sys_msg_group',
		header: 'Westside Youth Applicants',
		name: 'group_msg_moed_youth_applicants_west',
		ownerSys: 'sys_client_baltimore_moed'
	})
}

function initApplicant(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		exprFilter: `.ownerSys.name = 'sys_client_baltimore_moed'`,
		header: 'Participants',
		name: 'data_obj_moed_part_list',
		ownerSys: 'sys_client_baltimore_moed',
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
		codeCardinality: 'detail',
		header: 'Participant',
		name: 'data_obj_moed_part_detail',
		ownerSys: 'sys_client_baltimore_moed',
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
				codeFieldElement: 'selectOwnerSys',
				columnName: 'ownerSys',
				orderDefine: 20,
				orderDisplay: 20,
				indexTable: 0,
				isDisplayable: true,
				fieldListItems: 'il_sys_system_by_user'
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
						codeItemChangeTriggerType: 'itemChangeTypeOp',
						codeItemChangeValueType: 'code',
						codeOp: 'equal',
						columns: ['genderSelfId'],
						orderDefine: 0,
						valueTriggerCodes: [
							{
								ownerSys: 'sys_client_baltimore_moed',
								codeType: 'ct_sys_person_gender',
								name: 'Prefer to self-identify'
							}
						]
					},
					{
						codeAccess: 'hidden',
						codeItemChangeAction: 'reset',
						codeItemChangeTriggerType: 'itemChangeTypeOp',
						codeItemChangeValueType: 'code',
						codeOp: 'notEqual',
						columns: ['genderSelfId'],
						orderDefine: 1,
						valueTriggerCodes: [
							{
								ownerSys: 'sys_client_baltimore_moed',
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
						codeAccess: 'required',
						codeItemChangeAction: 'none',
						codeItemChangeTriggerType: 'itemChangeTypeOp',
						codeOp: 'notEqual',
						columns: ['addr1', 'city', 'codeState', 'zip'],
						orderDefine: 0,
						valueTriggerCodes: [
							{
								ownerSys: 'sys_client_baltimore_moed',
								codeType: 'ct_sys_person_living_arrangements',
								name: 'I am currently homeless'
							}
						]
					},
					{
						codeAccess: 'optional',
						codeItemChangeAction: 'none',
						codeItemChangeTriggerType: 'itemChangeTypeOp',
						codeOp: 'notEqual',
						columns: ['addr2'],
						orderDefine: 0,
						valueTriggerCodes: [
							{
								ownerSys: 'sys_client_baltimore_moed',
								codeType: 'ct_sys_person_living_arrangements',
								name: 'I am currently homeless'
							}
						]
					},
					{
						codeAccess: 'hidden',
						codeOp: 'equal',
						codeItemChangeAction: 'reset',
						codeItemChangeTriggerType: 'itemChangeTypeOp',
						columns: ['addr1', 'addr2', 'city', 'codeState', 'zip'],
						orderDefine: 1,
						valueTriggerCodes: [
							{
								ownerSys: 'sys_client_baltimore_moed',
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
				columnName: 'city',
				indexTable: 1,
				isDisplayable: true,
				orderDefine: 230,
				orderDisplay: 230
			},
			{
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

	init.addTrans('sysNodeObj', {
		children: [{ node: 'node_obj_moed_part_detail', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeApp',
		dataObj: 'data_obj_moed_part_list',
		header: 'Participants',
		name: 'node_obj_moed_part_list',
		orderDefine: 10,
		ownerSys: 'sys_client_baltimore_moed',
		systemQuerySource: 'sys_client_baltimore_moed'
	})
	init.addTrans('sysNodeObj', {
		children: [{ node: 'node_obj_moed_csf_list', order: 10 }],
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_moed_part_detail',
		header: 'Participant',
		name: 'node_obj_moed_part_detail',
		orderDefine: 10,
		ownerSys: 'sys_client_baltimore_moed'
	})
}

function initCsf(init: InitDb) {
	init.addTrans('sysDataObj', {
		ownerSys: 'sys_client_baltimore_moed',
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
				columnName: 'objAttrCmProgram',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				linkColumns: ['header'],
				linkTable: 'SysObjAttr'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeSfEnrollType',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysObjAttr'
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
				linkColumns: ['name'],
				linkTable: 'SysCode'
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
				linkColumns: ['name'],
				linkTable: 'SysCode'
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
		ownerSys: 'sys_client_baltimore_moed',
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
				exprSave: `(SELECT org_client_baltimore::MoedParticipant FILTER .id = <tree,uuid,MoedParticipant.id>)`,
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
				columnName: 'objAttrCmProgram',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				fieldListItems: 'il_sys_obj_attr_type_single',
				fieldListItemsParmValue: 'at_cm_program'
			},
			{
				codeFieldElement: 'select',
				columnName: 'objAttrCmSite',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_obj_attr_type_single',
				fieldListItemsParmValue: 'at_cm_site'
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
				itemChanges: [
					{
						codeAccess: 'required',
						codeItemChangeAction: 'none',
						codeItemChangeTriggerType: 'itemChangeTypeOp',
						codeItemChangeValueType: 'code',
						codeOp: 'equal',
						columns: ['dateStart'],
						orderDefine: 0,
						valueTriggerCodes: [
							{
								ownerSys: 'sys_client_baltimore_moed',
								codeType: 'ct_cm_sf_eligibility_status',
								name: 'Enrolled'
							}
						]
					},
					{
						codeAccess: 'readOnly',
						codeItemChangeAction: 'reset',
						codeItemChangeTriggerType: 'itemChangeTypeOp',
						codeItemChangeValueType: 'code',
						codeOp: 'notEqual',
						columns: ['dateStart'],
						orderDefine: 1,
						valueTriggerCodes: [
							{
								ownerSys: 'sys_client_baltimore_moed',
								codeType: 'ct_cm_sf_eligibility_status',
								name: 'Enrolled'
							}
						]
					},
					{
						codeAccess: 'required',
						codeItemChangeAction: 'none',
						codeItemChangeTriggerType: 'itemChangeTypeOp',
						codeItemChangeValueType: 'code',
						codeOp: 'equal',
						columns: ['dateEnd'],
						orderDefine: 0,
						valueTriggerCodes: [
							{
								ownerSys: 'sys_client_baltimore_moed',
								codeType: 'ct_cm_sf_eligibility_status',
								name: 'Rejected'
							}
						]
					},
					{
						codeAccess: 'readOnly',
						codeItemChangeAction: 'reset',
						codeItemChangeTriggerType: 'itemChangeTypeOp',
						codeItemChangeValueType: 'code',
						codeOp: 'notEqual',
						columns: ['dateEnd'],
						orderDefine: 1,
						valueTriggerCodes: [
							{
								ownerSys: 'sys_client_baltimore_moed',
								codeType: 'ct_cm_sf_eligibility_status',
								name: 'Rejected'
							}
						]
					}
				],
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
						codeItemChangeTriggerType: 'itemChangeTypeOp',
						codeOp: 'notNull',
						columns: ['codeSfOutcome'],
						orderDefine: 0
					},
					{
						codeAccess: 'hidden',
						codeOp: 'null',
						codeItemChangeAction: 'reset',
						codeItemChangeTriggerType: 'itemChangeTypeOp',
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
	init.addTrans('sysNodeObj', {
		children: [{ node: 'node_obj_moed_csf_detail', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_moed_csf_list',
		header: 'Service Flows',
		name: 'node_obj_moed_csf_list',
		orderDefine: 20,
		ownerSys: 'sys_client_baltimore_moed'
	})
	init.addTrans('sysNodeObj', {
		children: [
			{ node: 'node_obj_moed_csf_eligibility_list', order: 10 },
			{ node: 'node_obj_moed_csf_note_list', order: 20 },
			{ node: 'node_obj_moed_csf_doc_list', order: 30 }
		],
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_moed_csf_detail',
		header: 'Service Flow',
		name: 'node_obj_moed_csf_detail',
		orderDefine: 10,
		ownerSys: 'sys_client_baltimore_moed'
	})
}

function initCsfDocument(init: InitDb) {
	init.addTrans('sysDataObj', {
		ownerSys: 'sys_client_baltimore_moed',
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
				linkColumns: ['name'],
				linkTable: 'SysCode'
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
		header: 'Document',
		name: 'data_obj_moed_csf_doc_detail',
		ownerSys: 'sys_client_baltimore_moed',
		queryRiders: [
			{
				codeQueryAction: 'customFunction',
				codeQueryFunction: 'qrfFileStorage',
				codeQueryPlatform: 'client',
				codeQueryType: 'save',
				codeTriggerTiming: 'pre',
				parmValueStr: 'file'
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
				linkColumns: ['objAttrCmProgram', 'name'],
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
	init.addTrans('sysNodeObj', {
		children: [{ node: 'node_obj_moed_csf_doc_detail', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_moed_csf_doc_list',
		header: 'Documents',
		name: 'node_obj_moed_csf_doc_list',
		orderDefine: 30,
		ownerSys: 'sys_client_baltimore_moed'
	})
	init.addTrans('sysNodeObj', {
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_moed_csf_doc_detail',
		header: 'Document',
		name: 'node_obj_moed_csf_doc_detail',
		orderDefine: 10,
		ownerSys: 'sys_client_baltimore_moed'
	})
}

function initCsfEligibility(init: InitDb) {
	init.addTrans('sysEligibility', {
		description: 'This is the eligility form for MOED YO.',
		header: 'MOED YO Eligibility',
		name: 'elig_moed_csf_yo_eligibility',
		ownerSys: 'sys_client_baltimore_moed',
		nodes: [
			{
				codeEligibilityType: 'eligibilityManual',
				description: 'Description for Node 1 (manual).',
				header: 'Node 1 (manual)',
				name: 'node1',
				nodeId: 1,
				order: 10
			},
			{
				codeEligibilityType: 'eligibilityExpr',
				description: 'Has Social Security Number.',
				exprState: `(select exists((select app_cm::CmClientServiceFlow FILTER .id = <tree,uuid,CmClientServiceFlow.id> AND .client.person.ssn != '')))`,
				header: 'SSN',
				name: 'node2',
				nodeId: 2,
				order: 20
			},
			{
				codeEligibilityType: 'eligibilityGroupAnd',
				description: 'Description for Node 3 (Group - And).',
				header: 'Node 3 (Group - And)',
				name: 'node3',
				nodeId: 3,
				order: 30
			},
			{
				codeEligibilityType: 'eligibilityGroupOr',
				description: 'Description for Node 4 (Group - Or).',
				header: 'Node 4 (Group - Or)',
				name: 'node4',
				nodeId: 4,
				nodeIdParent: 3,
				order: 10
			},
			{
				codeEligibilityType: 'eligibilityManual',
				description: 'Description for Node 5 (manual).',
				header: 'Node 5 (manual)',
				name: 'node4',
				nodeId: 5,
				nodeIdParent: 4,
				order: 10
			},
			{
				codeEligibilityType: 'eligibilityExpr',
				description: 'Has 1 or more documents.',
				exprState: `(SELECT count((select app_cm::CmCsfDocument FILTER .csf.id = <tree,uuid,CmClientServiceFlow.id>)) > 0)`,
				header: 'Documents',
				name: 'node6',
				nodeId: 6,
				nodeIdParent: 4,
				order: 20
			},
			{
				codeEligibilityType: 'eligibilityGroupAnd',
				description: 'Description for Node 7 (Group - And).',
				header: 'Node 7 (Group - And)',
				name: 'node7',
				nodeId: 7,
				nodeIdParent: 3,
				order: 20
			},
			{
				codeEligibilityType: 'eligibilityManual',
				description: 'Description for Node 8 (manual).',
				header: 'Node 8 (manual)',
				name: 'node8',
				nodeId: 8,
				nodeIdParent: 7,
				order: 10
			},
			{
				codeEligibilityType: 'eligibilityExpr',
				description: 'Has 1 or more case notes.',
				exprState: `(SELECT count((select app_cm::CmCsfNote FILTER .csf.id = <tree,uuid,CmClientServiceFlow.id>)) > 0)`,
				header: 'Notes',
				name: 'node9',
				nodeId: 9,
				nodeIdParent: 7,
				order: 20
			}
		]
	})

	init.addTrans('sysDataObj', {
		ownerSys: 'sys_client_baltimore_moed',
		codeCardinality: 'list',
		name: 'data_obj_moed_csf_eligibility_list',
		header: 'Eligibilities',
		tables: [{ index: 0, table: 'CmCsfEligibility' }],
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
				columnName: 'objAttrCmProgram',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['header'],
				linkTable: 'SysObjAttr'
			}
		]
	})

	const eligibilityName = 'elig_moed_csf_yo_eligibility'
	init.addTrans('sysDataObj', {
		ownerSys: 'sys_client_baltimore_moed',
		codeCardinality: 'detail',
		name: 'data_obj_moed_csf_eligibility_detail',
		header: 'Eligibility',
		tables: [{ index: 0, table: 'CmCsfEligibility' }],
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
				linkColumns: ['objAttrCmProgram', 'name'],
				linkTable: 'CmClientServiceFlow'
			},
			{
				columnName: 'eligibility',
				exprSave: `(SELECT sys_core::getEligibility('${eligibilityName}'))`,
				orderDefine: 30,
				indexTable: 0,
				isDisplayable: false
			},
			{
				codeFieldElement: 'select',
				columnName: 'objAttrCmProgram',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_obj_attr_type_single',
				fieldListItemsParmValue: 'at_cm_program'
			},
			{
				codeAccess: 'readOnly',
				codeFieldElement: 'toggle',
				columnName: 'valueBoolean',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				headerAlt: 'Current Eligibility'
			},
			{
				codeFieldElement: 'embedDetailEligibility',
				columnName: 'nodeValues',
				fieldEmbedDetailEligibility: eligibilityName,
				exprPreset: `<${PropDataType.jsonCustomEligibility}>`,
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 70,
				orderDisplay: 70
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

	init.addTrans('sysNodeObj', {
		children: [{ node: 'node_obj_moed_csf_eligibility_detail', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_moed_csf_eligibility_list',
		header: 'Eligibilities',
		name: 'node_obj_moed_csf_eligibility_list',
		orderDefine: 30,
		ownerSys: 'sys_client_baltimore_moed'
	})
	init.addTrans('sysNodeObj', {
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_moed_csf_eligibility_detail',
		header: 'Eligibility',
		name: 'node_obj_moed_csf_eligibility_detail',
		orderDefine: 10,
		ownerSys: 'sys_client_baltimore_moed'
	})
}

function initCsfNote(init: InitDb) {
	init.addTrans('sysDataObj', {
		ownerSys: 'sys_client_baltimore_moed',
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
				linkColumns: ['name'],
				linkTable: 'SysCode'
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
		ownerSys: 'sys_client_baltimore_moed',
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
				linkColumns: ['objAttrCmProgram', 'name'],
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
	init.addTrans('sysNodeObj', {
		children: [{ node: 'node_obj_moed_csf_note_detail', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_moed_csf_note_list',
		header: 'Case Notes',
		name: 'node_obj_moed_csf_note_list',
		orderDefine: 20,
		ownerSys: 'sys_client_baltimore_moed'
	})
	init.addTrans('sysNodeObj', {
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_moed_csf_note_detail',
		header: 'Case Note',
		name: 'node_obj_moed_csf_note_detail',
		orderDefine: 10,
		ownerSys: 'sys_client_baltimore_moed'
	})
}
