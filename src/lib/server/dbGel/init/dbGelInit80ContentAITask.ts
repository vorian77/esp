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
				isTableExtension: true,
				table: 'CmClient'
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
				columnParent: 'programCm',
				indexParent: 0,
				index: 3,
				table: 'CmProgram',
				columnsId: ['name']
			}
		],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 30
			},
			{
				columnName: 'programCm',
				exprSave: `(SELECT assert_single((SELECT app_cm::CmProgram FILTER .name = 'cmp_moed_yo')))`,
				orderDefine: 40,
				indexTable: 0,
				isDisplayable: false,
				linkColumns: ['name'],
				linkTable: 'CmProgram'
			},
			{
				codeFieldElement: 'select',
				columnName: 'objAttrSfSite',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_attr_obj_system_type',
				fieldListItemsParmValue: 'attr_cm_sf_site'
			},
			{
				columnName: 'codeSfEnrollType',
				exprPreset: `(SELECT assert_single((sys_core::getCode('ct_cm_sf_enroll_type', 'Self-Registration'))))`,
				orderDefine: 45,
				indexTable: 0,
				isDisplayable: false,
				isExcludeUpdate: true,
				linkColumns: ['name'],
				linkTable: 'SysCode'
			},
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
			{
				codeFieldElement: 'date',
				columnName: 'dateCreated',
				headerAlt: 'Application Date (yyyy-mm-dd)',
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
				headerAlt: 'Birth Date (yyyy-mm-dd)',
				isDisplayable: true,
				orderDisplay: 240,
				orderDefine: 240,
				indexTable: 2
			},

			{
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
				codeFieldElement: 'select',
				columnName: 'codeGender',
				isDisplayable: true,
				orderDisplay: 280,
				orderDefine: 280,
				indexTable: 2,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_sys_person_gender'
			},

			{
				codeFieldElement: 'select',
				columnName: 'codeRace',
				isDisplayable: true,
				orderDisplay: 300,
				orderDefine: 300,
				indexTable: 2,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_sys_person_race'
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
				fieldListItemsParmValue: 'ct_sys_person_ethnicity'
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
				fieldListItemsParmValue: 'ct_sys_person_disability_status'
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
				fieldListItemsParmValue: 'ct_sys_state'
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
