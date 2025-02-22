import { InitDb } from '$server/dbEdge/init/types.init'
import { ParmsValuesType } from '$utils/types'

export function initContentMOEDCmApplicant(init: InitDb) {
	initDataDetail(init)
	initDataObjLists(init)
	initNodeObjsDefault(init)
	initNodeObjsTask(init)
	initTasks(init)
}

function initDataDetail(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		header: 'Applicant',
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
				exprSave: `(SELECT sys_core::SysSystem Filter .name = 'sys_moed_old')`,
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
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system_user',
				fieldListItemsParmValue: 'ct_sys_person_gender'
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
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system_user',
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
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system_user',
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
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system_user',
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
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system_user',
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
				attrAccess: true,
				codeAttrType: 'attr_moed_office',
				codeFieldElement: 'select',
				columnName: 'attributes',
				headerAlt: 'Office',
				isDisplayable: true,
				orderDisplay: 310,
				orderDefine: 310,
				indexTable: 1,
				fieldListItems: 'il_sys_attribute_order_header_by_attributeType_name'
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

	init.addTrans('dataObjColumnItemChangeBulk', [
		[
			'data_obj_moed_part_detail',
			[
				{
					fieldTrigger: 'codeGender',
					fieldTriggerTargets: [
						{
							codeValueTrigger: {
								codeType: 'ct_sys_person_gender',
								name: 'Prefer to self-identify',
								owner: 'sys_moed_old'
							},
							codeValueTypeTarget: 'none',
							codeValueTypeTrigger: 'code',
							column: 'genderSelfId',
							fieldAccess: 'required',
							op: 'equal',
							orderDefine: 0
						},
						{
							codeValueTrigger: {
								codeType: 'ct_sys_person_gender',
								name: 'Prefer to self-identify',
								owner: 'sys_moed_old'
							},
							codeValueTypeTarget: 'reset',
							codeValueTypeTrigger: 'code',
							column: 'genderSelfId',
							fieldAccess: 'hidden',
							op: 'notEqual',
							orderDefine: 1
						}
					]
				}
			]
		]
	])
}

function initDataObjLists(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeDataObjType: 'taskTarget',
		exprFilter: `.owner.name = 'sys_moed_old'`,
		header: 'Applicants',
		name: 'data_obj_moed_part_list',
		owner: 'sys_moed_old',
		subHeader: 'Applicants who have self-enrolled.',
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

	init.addTrans('sysDataObjTask', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeDataObjType: 'taskTarget',
		exprFilter: `.owner.name = 'sys_moed_old'`,
		header: 'Applicants - Open Applications',
		name: 'data_obj_task_moed_part_list_apps_open',
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
				codeAlignmentAlt: 'center',
				codeFieldElement: 'date',
				columnName: 'custom_element_date',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER .client = org_moed::MoedParticipant).dateCreated`,
				headerAlt: 'Application Date',
				nameCustom: 'customAppDate'
			},
			{
				codeAccess: 'readOnly',
				codeAlignmentAlt: 'right',
				codeFieldElement: 'number',
				columnName: 'custom_element_int',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				exprCustom: `(with 
  now := cal::to_local_date(datetime_current(), 'UTC') ,
  compare :=(select app_cm::CmClientServiceFlow FILTER .client = org_moed::MoedParticipant).dateCreated,
  dur := now - compare,
  SELECT std::duration_get(dur, 'day'))`,
				headerAlt: 'Days Open',
				nameCustom: 'customAppDaysOpen',
				pattern: '[-+]?[0-9]*[.,]?[0-9]+'
			},
			{
				codeAccess: 'readOnly',
				codeAlignmentAlt: 'left',
				columnName: 'custom_element_str',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER .client = org_moed::MoedParticipant).codeStatus.name`,
				headerAlt: 'Application Status',
				nameCustom: 'customAppStatus'
			}
		]
	})

	init.addTrans('sysDataObjTask', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeDataObjType: 'taskTarget',
		exprFilter: `.owner.name = 'sys_moed_old'`,
		header: 'Applicants - Open Messages',
		name: 'data_obj_task_moed_part_list_msgs_open',
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
				codeAlignmentAlt: 'center',
				codeFieldElement: 'date',
				columnName: 'custom_element_date',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER .client = org_moed::MoedParticipant).dateCreated`,
				headerAlt: 'Application Date',
				nameCustom: 'customAppDate'
			},
			{
				codeAccess: 'readOnly',
				codeAlignmentAlt: 'right',
				codeFieldElement: 'number',
				columnName: 'custom_element_int',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				exprCustom: `(with 
  now := cal::to_local_date(datetime_current(), 'UTC') ,
  compare :=(select app_cm::CmClientServiceFlow FILTER .client = org_moed::MoedParticipant).dateCreated,
  dur := now - compare,
  SELECT std::duration_get(dur, 'day'))`,
				headerAlt: 'Days Open',
				nameCustom: 'customAppDaysOpen',
				pattern: '[-+]?[0-9]*[.,]?[0-9]+'
			},
			{
				codeAccess: 'readOnly',
				codeAlignmentAlt: 'left',
				columnName: 'custom_element_str',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				exprCustom: `(SELECT app_cm::CmClientServiceFlow FILTER .client = org_moed::MoedParticipant).codeStatus.name`,
				headerAlt: 'Application Status',
				nameCustom: 'customAppStatus'
			}
		]
	})
}

function initNodeObjsDefault(init: InitDb) {
	init.addTrans('sysNodeObjProgram', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program',
		data: [{ dataObj: 'data_obj_moed_part_list' }],
		header: 'Applicants',
		isAlwaysRetrieveData: true,
		name: 'node_obj_moed_part_list',
		orderDefine: 10,
		owner: 'sys_moed_old'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		data: [{ dataObj: 'data_obj_moed_part_detail' }],
		header: 'Applicant',
		name: 'node_obj_moed_part_detail',
		orderDefine: 10,
		owner: 'sys_moed_old',
		parentNodeName: 'node_obj_moed_part_list'
	})
}

function initNodeObjsTask(init: InitDb) {
	init.addTrans('sysNodeObjTask', {
		codeIcon: 'AppWindow',
		codeNavType: 'task',
		codeNodeType: 'program',
		data: [{ dataObj: 'data_obj_task_moed_part_list_apps_open' }],
		header: 'Open Applications',
		name: 'node_obj_task_moed_part_list_apps_open',
		orderDefine: 10,
		owner: 'sys_moed_old'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		data: [{ dataObj: 'data_obj_moed_part_detail' }],
		header: 'Applicant',
		name: 'node_obj_task_moed_part_detail_apps_open',
		orderDefine: 10,
		owner: 'sys_moed_old',
		parentNodeName: 'node_obj_task_moed_part_list_apps_open'
	})

	init.addTrans('sysNodeObjTask', {
		codeIcon: 'AppWindow',
		codeNavType: 'task',
		codeNodeType: 'program',
		data: [{ dataObj: 'data_obj_task_moed_part_list_msgs_open' }],
		header: 'Open Applications',
		name: 'node_obj_task_moed_part_list_msgs_open',
		orderDefine: 10,
		owner: 'sys_moed_old'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		data: [{ dataObj: 'data_obj_moed_part_detail' }],
		header: 'Applicant',
		name: 'node_obj_task_moed_part_detail_msgs_open',
		orderDefine: 10,
		owner: 'sys_moed_old',
		parentNodeName: 'node_obj_task_moed_part_list_msgs_open'
	})
}

function initTasks(init: InitDb) {
	init.addTrans('sysTask', {
		codeCategory: 'default',
		codeIcon: 'Activity',
		codeRenderType: 'button',
		codeStatusObj: 'tso_data',
		exprStatus: `WITH 
  apps := (SELECT org_moed::MoedParticipant),
  msgs := (SELECT sys_core::SysMsg),
  docs := (SELECT app_cm::CmCsfDocument FILTER .csf.client IN org_moed::MoedParticipant),
  sfs := (SELECT app_cm::CmClientServiceFlow filter .client in org_moed::MoedParticipant)
    SELECT {
      appsCntOpen := {label := 'Open Applicantions', data := count(sfs FILTER .codeStatus.name not in {'Enrolled', 'Rejected'})},
    }`,
		header: 'Open Applications',
		isPinToDash: true,
		isGlobalResource: false,
		name: 'task_moed_part_apps_open',
		targetNodeObj: 'node_obj_task_moed_part_list_apps_open',
		orderDefine: 10,
		owner: 'sys_moed_old'
	})

	init.addTrans('sysTask', {
		codeCategory: 'default',
		codeIcon: 'Activity',
		codeRenderType: 'button',
		codeStatusObj: 'tso_data',
		exprStatus: `WITH 
  apps := (SELECT org_moed::MoedParticipant),
  msgs := (SELECT sys_core::SysMsg),
  docs := (SELECT app_cm::CmCsfDocument FILTER .csf.client IN org_moed::MoedParticipant),
  sfs := (SELECT app_cm::CmClientServiceFlow filter .client in org_moed::MoedParticipant)
    SELECT {
      msgsCntUnread := {label := 'Open Messages', data := count(msgs FILTER exists .attributes and not exists .readers)},
    }`,
		header: 'Open Messages',
		isPinToDash: true,
		isGlobalResource: false,
		name: 'task_moed_part_msgs_open',
		targetNodeObj: 'node_obj_task_moed_part_list_msgs_open',
		orderDefine: 20,
		owner: 'sys_moed_old'
	})
}
