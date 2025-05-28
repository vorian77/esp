import { InitDb } from '$server/dbGel/init/types.init'

export function initContentAITask(init: InitDb) {
	initTaskCohortAttd(init)
	initTaskNewStudent(init)
}

function initTaskCohortAttd(init: InitDb) {
	init.addTrans('sysDataObjTask', {
		actionGroup: 'doag_detail_mobile_save',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		codeDataObjType: 'taskTarget',
		codeDoQueryType: 'preset',
		codeDoRenderPlatform: 'app',
		exprFilter: 'none',
		header: 'Cohort Attendance',
		name: 'data_obj_task_ai_cohort_attd',
		owner: 'sys_client_atlantic_impact',
		tables: [{ index: 0, table: 'CmCsfCohortAttd' }],
		fields: [
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 10,
				orderDefine: 10
			},
			{
				codeAlignmentAlt: 'left',
				codeFieldElement: 'select',
				columnName: 'custom_element_link',
				fieldListItems: 'il_cm_cohort_long_by_name',
				headerAlt: 'Cohort',
				isDisplayable: true,
				itemChanges: [
					{
						codeItemChangeAction: 'retrieveSelect',
						codeOp: 'any',
						columns: ['cohortAttd'],
						orderDefine: 0
					}
				],
				nameCustom: 'customCohort',
				orderDefine: 20,
				orderDisplay: 20
			},
			{
				codeFieldElement: 'select',
				columnName: 'cohortAttd',
				fieldListItems: 'il_cm_cohort_attd_cohort_ic',
				headerAlt: 'Attendance Date',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 30,
				orderDisplay: 30
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40
			}
		]
	})

	init.addTrans('sysTask', {
		codeIcon: 'ClipboardPen',
		codeRenderType: 'button',
		header: 'Cohort Attendance',
		isPinToDash: false,
		isGlobalResource: false,
		name: 'task_ai_cohort_attd',
		targetDataObj: 'data_obj_task_ai_cohort_attd',
		orderDefine: 20,
		owner: 'sys_client_atlantic_impact'
	})
}

function initTaskNewStudent(init: InitDb) {
	init.addTrans('sysDataObjTask', {
		actionGroup: 'doag_detail_task_record',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		codeDataObjType: 'taskTarget',
		codeDoQueryType: 'preset',
		codeDoRenderPlatform: 'app',
		exprFilter: 'none',
		header: 'New Student',
		name: 'data_obj_task_ai_new_student',
		owner: 'sys_client_atlantic_impact',
		tables: [
			{ index: 0, table: 'CmCsfCohort' },
			{
				columnParent: 'csf',
				indexParent: 0,
				index: 1,
				table: 'CmClientServiceFlow'
			},
			{
				columnParent: 'client',
				indexParent: 1,
				index: 2,
				table: 'CmClient'
			},
			{
				columnParent: 'person',
				indexParent: 2,
				index: 3,
				table: 'SysPerson'
			}
		],
		fields: [
			/* CmClient */
			{
				columnName: 'owner',
				exprSave: `(SELECT sys_core::SysSystem FILTER .id = <parms,uuid,queryOwnerSys>)`,
				orderDefine: 60,
				indexTable: 2,
				isDisplayable: false,
				linkTable: 'SysSystem'
			},
			{
				columnName: 'createdBy',
				isDisplayable: false,
				orderDefine: 70,
				indexTable: 2
			},
			{
				columnName: 'modifiedBy',
				isDisplayable: false,
				orderDefine: 80,
				indexTable: 2
			},

			/* SysPerson.personal */
			{
				codeFieldElement: 'tagSection',
				codeColor: 'primary',
				columnName: 'custom_section_start',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,
				headerAlt: 'Personal'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110
			},
			{
				columnName: 'firstName',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 3
			},
			{
				codeAccess: 'optional',
				columnName: 'middleName',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 3
			},
			{
				columnName: 'lastName',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140,
				indexTable: 3
			},
			{
				codeFieldElement: 'date',
				columnName: 'birthDate',
				isDisplayable: true,
				orderDisplay: 150,
				orderDefine: 150,
				indexTable: 3
			},
			{
				codeAccess: 'optional',
				columnName: 'agencyId',
				isDisplayable: true,
				orderDisplay: 160,
				orderDefine: 160,
				headerAlt: 'Group',
				indexTable: 2
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 170,
				orderDefine: 170
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 180,
				orderDefine: 180
			},
			{
				codeAccess: 'optional',
				columnName: 'school',
				isDisplayable: true,
				orderDisplay: 190,
				orderDefine: 190,
				indexTable: 2
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeHighestEducation',
				isDisplayable: true,
				orderDisplay: 200,
				orderDefine: 200,
				indexTable: 2,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_cm_client_highest_education'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeGender',
				isDisplayable: true,
				orderDisplay: 210,
				orderDefine: 210,
				indexTable: 3,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_sys_person_gender'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeRace',
				isDisplayable: true,
				orderDisplay: 220,
				orderDefine: 220,
				indexTable: 3,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_sys_person_race'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeEthnicity',
				isDisplayable: true,
				orderDisplay: 230,
				orderDefine: 230,
				indexTable: 3,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_sys_person_ethnicity'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'hasDriversLicense',
				exprPreset: `(SELECT false)`,
				indexTable: 2,
				isDisplayable: true,
				orderDisplay: 240,
				orderDefine: 240
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 250,
				orderDefine: 250
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 260,
				orderDefine: 260
			},

			/* SysPerson.contact */
			{
				codeFieldElement: 'tagSection',
				codeColor: 'primary',
				columnName: 'custom_section_start',
				isDisplayable: true,
				orderDisplay: 300,
				orderDefine: 300,
				headerAlt: 'Contact'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 310,
				orderDefine: 310
			},
			{
				columnName: 'phoneMobile',
				indexTable: 3,
				isDisplayable: true,
				orderDefine: 320,
				orderDisplay: 320
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'tel',
				columnName: 'phoneAlt',
				isDisplayable: true,
				orderDisplay: 330,
				orderDefine: 330,
				indexTable: 3
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'email',
				columnName: 'email',
				indexTable: 3,
				isDisplayable: true,
				orderDefine: 340,
				orderDisplay: 340
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 350,
				orderDefine: 350
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 360,
				orderDefine: 360
			},
			{
				codeAccess: 'optional',
				columnName: 'addr1',
				indexTable: 3,
				isDisplayable: true,
				orderDefine: 370,
				orderDisplay: 370
			},
			{
				codeAccess: 'optional',
				columnName: 'addr2',
				indexTable: 3,
				isDisplayable: true,
				orderDefine: 380,
				orderDisplay: 380
			},
			{
				codeAccess: 'optional',
				columnName: 'city',
				indexTable: 3,
				isDisplayable: true,
				orderDefine: 390,
				orderDisplay: 390
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeState',
				isDisplayable: true,
				orderDisplay: 400,
				orderDefine: 400,
				indexTable: 3,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_sys_state'
			},
			{
				codeAccess: 'optional',
				columnName: 'zip',
				indexTable: 3,
				isDisplayable: true,
				orderDefine: 410,
				orderDisplay: 410
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 420,
				orderDefine: 420
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 430,
				orderDefine: 430
			},

			/* CmClientServiceFlow */
			{
				columnName: 'id',
				indexTable: 1,
				isDisplayable: false,
				orderDefine: 500
			},
			{
				columnName: 'createdBy',
				indexTable: 1,
				isDisplayable: false,
				orderDefine: 510
			},
			{
				columnName: 'modifiedBy',
				indexTable: 1,
				isDisplayable: false,
				orderDefine: 520
			},
			{
				codeFieldElement: 'tagSection',
				codeColor: 'primary',
				columnName: 'custom_section_start',
				isDisplayable: true,
				orderDisplay: 550,
				orderDefine: 550,
				headerAlt: 'Service Flow'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 560,
				orderDefine: 560
			},
			{
				codeFieldElement: 'select',
				columnName: 'programCm',
				isDisplayable: true,
				orderDisplay: 570,
				orderDefine: 570,
				indexTable: 1,
				fieldListItems: 'il_cm_program'
			},
			{
				codeFieldElement: 'select',
				columnName: 'objAttrCmSite',
				isDisplayable: true,
				orderDisplay: 580,
				orderDefine: 580,
				indexTable: 1,
				fieldListItems: 'il_sys_obj_attr_type_single',
				fieldListItemsParmValue: 'at_cm_site'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeSfEnrollType',
				isDisplayable: true,
				orderDisplay: 590,
				orderDefine: 590,
				indexTable: 1,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_cm_sf_enroll_type'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 600,
				orderDefine: 610
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 620,
				orderDefine: 620
			},
			{
				codeFieldElement: 'date',
				columnName: 'dateCreated',
				indexTable: 1,
				isDisplayable: true,
				orderDisplay: 630,
				orderDefine: 630
			},
			{
				codeAccess: 'optional',
				columnName: 'dateStart',
				indexTable: 1,
				isDisplayable: true,
				orderDisplay: 640,
				orderDefine: 640
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 650,
				orderDefine: 650
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 660,
				orderDefine: 660
			},

			/* CmCsfCohort */
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 800
			},
			{
				columnName: 'createdBy',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 810
			},
			{
				columnName: 'modifiedBy',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 820
			},
			{
				codeFieldElement: 'tagSection',
				codeColor: 'primary',
				columnName: 'custom_section_start',
				isDisplayable: true,
				orderDisplay: 850,
				orderDefine: 850,
				headerAlt: 'Cohort'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 860,
				orderDefine: 860
			},
			{
				codeFieldElement: 'select',
				columnName: 'cohort',
				isDisplayable: true,
				orderDisplay: 870,
				orderDefine: 870,
				indexTable: 0,
				fieldListItems: 'il_cm_cohort_long_by_name'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeStatus',
				isDisplayable: true,
				orderDisplay: 880,
				orderDefine: 880,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_cm_sf_eligibility_status'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 890,
				orderDefine: 890
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 900,
				orderDefine: 900
			}
		]
	})

	init.addTrans('sysTask', {
		codeIcon: 'ClipboardPen',
		codeRenderType: 'button',
		header: 'New Student',
		isPinToDash: false,
		isGlobalResource: false,
		name: 'task_ai_new_student',
		targetDataObj: 'data_obj_task_ai_new_student',
		orderDefine: 10,
		owner: 'sys_client_atlantic_impact'
	})
}
