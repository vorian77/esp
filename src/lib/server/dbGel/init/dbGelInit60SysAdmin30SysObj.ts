import { InitDb } from '$server/dbGel/init/types.init'
import { initAdminSysObjApp } from '$server/dbGel/init/dbGelInit60SysAdmin30SysObjApp'
import { initAdminSysObjCode } from '$server/dbGel/init/dbGelInit60SysAdmin30SysObjCode'
import { initAdminSysObjDataObj } from '$server/dbGel/init/dbGelInit60SysAdmin30SysObjDataObj'
import { initAdminSysObjDataObjEmbed } from '$server/dbGel/init/dbGelInit60SysAdmin30SysObjDataObjEmbed'
import { initAdminSysObjDB } from '$server/dbGel/init/dbGelInit60SysAdmin30SysObjDB'
import { initAdminSysObjFieldItems } from '$server/dbGel/init/dbGelInit60SysAdmin30SysObjDataObjFieldItmes'
import { initAdminSysObjMigration } from '$server/dbGel/init/dbGelInit60SysAdmin30SysObjMigration'
import { initAdminSysObjNodeObj } from '$server/dbGel/init/dbGelInit60SysAdmin30SysObjNodeObj'
import { initAdminSysObjRep } from '$server/dbGel/init/dbGelInit60SysAdmin30SysObjRep'
import { initAdminSysObjTask } from '$server/dbGel/init/dbGelInit60SysAdmin30SysObjTask'
import { initAdminSysObjUserAction } from '$server/dbGel/init/dbGelInit60SysAdmin30SysObjUserAction'

export function initAdminSysObj(init: InitDb) {
	initSystemObject(init)
	initAdminSysObjApp(init)
	initAdminSysObjCode(init)
	initAdminSysObjDataObj(init)
	initAdminSysObjDataObjEmbed(init)
	initAdminSysObjDB(init)
	initAdminSysObjFieldItems(init)
	initAdminSysObjMigration(init)
	initAdminSysObjNodeObj(init)
	initAdminSysObjRep(init)
	initAdminSysObjTask(init)
	initAdminSysObjUserAction(init)
}

async function initSystemObject(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: 'none',
		header: 'Systems (Objects)',
		isListEdit: false,
		name: 'data_obj_sys_admin_system_list_obj',
		owner: 'sys_system',
		tables: [{ index: 0, table: 'SysSystem' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				indexTable: 0,
				isDisplayable: true,
				orderCrumb: 10,
				orderDisplay: 20,
				orderDefine: 20,
				orderSort: 20
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'System (Object)',
		name: 'data_obj_sys_admin_system_detail_obj',
		owner: 'sys_system',
		tables: [{ index: 0, table: 'SysSystem' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
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

	init.addTrans('sysNodeObjProgram', {
		children: [{ node: 'node_obj_sys_admin_system_detail_obj', order: 10 }],
		codeIcon: 'AppWindow',
		codeNodeType: 'program',
		codeQueryOwnerType: 'queryOwnerTypeSystemRecord',
		dataObj: 'data_obj_sys_admin_system_list_obj',
		header: 'Systems (Objects)',
		name: 'node_obj_sys_admin_system_list_obj',
		orderDefine: 40,
		owner: 'sys_system'
	})

	init.addTrans('sysNodeObjProgramObj', {
		children: [
			{ node: 'node_obj_sys_analytic_list', order: 10 },
			{ node: 'node_obj_sys_app_header_list', order: 20 },
			{ node: 'node_obj_sys_app_list', order: 30 },
			{ node: 'node_obj_sys_admin_code_type_list', order: 40 },
			{ node: 'node_obj_sys_admin_code_list', order: 50 },
			{ node: 'node_obj_sys_admin_code_action_list', order: 60 },
			{ node: 'node_obj_sys_admin_column_list', order: 70 },
			{ node: 'node_obj_sys_admin_data_obj_list', order: 80 },
			{ node: 'node_obj_sys_admin_data_obj_action_group_list', order: 90 },
			{ node: 'node_obj_sys_admin_data_obj_field_embed_list_config_list', order: 100 },
			{ node: 'node_obj_sys_admin_data_obj_field_embed_list_edit_list', order: 110 },
			{ node: 'node_obj_sys_admin_data_obj_field_embed_list_select_list', order: 120 },
			{ node: 'node_obj_sys_admin_data_obj_field_list_items_list', order: 130 },
			{ node: 'node_obj_sys_admin_node_obj_list', order: 140 },
			{ node: 'node_obj_sys_admin_migr_list', order: 150 },
			{ node: 'node_obj_sys_rep_list', order: 160 },
			{ node: 'node_obj_sys_admin_table_list', order: 170 },
			{ node: 'node_obj_sys_admin_task_list', order: 180 },
			{ node: 'node_obj_sys_admin_user_action_list', order: 190 }
		],
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_sys_admin_system_detail_obj',
		header: 'System (Object)',
		name: 'node_obj_sys_admin_system_detail_obj',
		orderDefine: 10,
		owner: 'sys_system'
	})
}
