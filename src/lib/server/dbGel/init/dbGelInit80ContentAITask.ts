import { InitDb } from '$server/dbGel/init/types.init'

export function initContentAITask(init: InitDb) {
	initTaskNewStudent(init)
}

function initTaskNewStudent(init: InitDb) {
	init.addTrans('sysDataObjTask', {
		actionGroup: 'doag_detail_mobile_save',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		codeDataObjType: 'taskTarget',
		codeDoQueryType: 'preset',
		codeDoRenderPlatform: 'app',
		exprFilter: 'none',
		header: 'New Student',
		name: 'data_obj_task_ai_new_student',
		owner: 'sys_client_atlantic_impact',
		// queryRiders: [
		// 	{
		// 		codeQueryType: 'save',
		// 		codeTriggerTiming: 'post',
		// 		codeType: 'appDestination',
		// 		codeUserDestination: 'home'
		// 	}
		// ],
		tables: [
			{ index: 0, table: 'CmClientServiceFlow' },
			{
				columnParent: 'client',
				indexParent: 0,
				index: 1,
				table: 'CmClient'
			},
			{
				columnParent: 'person',
				exprFilterUpdate: '.id = (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>).person.id',
				indexParent: 1,
				index: 2,
				table: 'SysPerson'
			},
			{
				columnParent: 'programCm',
				indexParent: 0,
				index: 3,
				table: 'CmProgram'
			}
			// {
			// 	columnParent: 'programCm',
			// 	indexParent: 0,
			// 	index: 4,
			// 	table: 'CmCsfCohort',
			// 	columnsId: ['name']
			// },
		],
		fields: [
			/* client */
			{
				columnName: 'owner',
				exprSave: `(SELECT sys_core::SysSystem FILTER .id = <parms,uuid,queryOwnerIdSystem>)`,
				orderDefine: 60,
				indexTable: 1,
				isDisplayable: false,
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

			/* Personal */
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
				indexTable: 2
			},
			{
				codeAccess: 'optional',
				columnName: 'middleName',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 2
			},
			{
				columnName: 'lastName',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140,
				indexTable: 2
			},
			{
				codeFieldElement: 'date',
				columnName: 'birthDate',
				isDisplayable: true,
				orderDisplay: 150,
				orderDefine: 150,
				indexTable: 2
			},
			{
				codeAccess: 'optional',
				columnName: 'agencyId',
				isDisplayable: true,
				orderDisplay: 160,
				orderDefine: 160,
				headerAlt: 'Group',
				indexTable: 1
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
				indexTable: 1
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeHighestEducation',
				isDisplayable: true,
				orderDisplay: 200,
				orderDefine: 200,
				indexTable: 1,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_cm_client_highest_education'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeGender',
				isDisplayable: true,
				orderDisplay: 210,
				orderDefine: 210,
				indexTable: 2,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_sys_person_gender'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeRace',
				isDisplayable: true,
				orderDisplay: 220,
				orderDefine: 220,
				indexTable: 2,
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
				indexTable: 2,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_sys_person_ethnicity'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'hasDriversLicense',
				exprPreset: `(SELECT false)`,
				indexTable: 1,
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

			/* Contact */
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
				indexTable: 2,
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
				indexTable: 2
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'email',
				columnName: 'email',
				indexTable: 2,
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
				indexTable: 2,
				isDisplayable: true,
				orderDefine: 370,
				orderDisplay: 370
			},
			{
				codeAccess: 'optional',
				columnName: 'addr2',
				indexTable: 2,
				isDisplayable: true,
				orderDefine: 380,
				orderDisplay: 380
			},
			{
				codeAccess: 'optional',
				columnName: 'city',
				indexTable: 2,
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
				indexTable: 2,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_sys_state'
			},
			{
				codeAccess: 'optional',
				columnName: 'zip',
				indexTable: 2,
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

			/* Service Flow */
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 500
			},
			{
				columnName: 'createdAt',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 510
			},
			{
				columnName: 'createdBy',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 520
			},
			{
				columnName: 'modifiedAt',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 530
			},
			{
				columnName: 'modifiedBy',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 540
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
				indexTable: 0,
				fieldListItems: 'il_cm_program'
			},
			{
				codeFieldElement: 'select',
				columnName: 'objAttrSfSite',
				isDisplayable: true,
				orderDisplay: 580,
				orderDefine: 580,
				indexTable: 0,
				fieldListItems: 'il_sys_attr_obj_system_type',
				fieldListItemsParmValue: 'attr_cm_sf_site'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeSfEnrollType',
				isDisplayable: true,
				orderDisplay: 590,
				orderDefine: 590,
				indexTable: 0,
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
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 630,
				orderDefine: 630
			},
			{
				codeAccess: 'optional',
				columnName: 'dateStart',
				indexTable: 0,
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
