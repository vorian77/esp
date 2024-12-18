import { InitDb } from '$server/dbEdge/init/types.init'
import { initAdminSysObjApp } from '$server/dbEdge/init/dbEdgeInit60SysAdmin30SysObjApp'
import { initAdminSysObjCode } from '$server/dbEdge/init/dbEdgeInit60SysAdmin30SysObjCode'
import { initAdminSysObjDataObj } from '$server/dbEdge/init/dbEdgeInit60SysAdmin30SysObjDataObj'
import { initAdminSysObjDataObjAction } from '$server/dbEdge/init/dbEdgeInit60SysAdmin30SysObjDataObjAction'
import { initAdminSysObjDataObjEmbed } from '$server/dbEdge/init/dbEdgeInit60SysAdmin30SysObjDataObjEmbed'
import { initAdminSysObjDB } from '$server/dbEdge/init/dbEdgeInit60SysAdmin30SysObjDB'
import { initAdminSysObjFieldItems } from '$server/dbEdge/init/dbEdgeInit60SysAdmin30SysObjDataObjFieldItmes'
import { initAdminSysObjMigration } from '$server/dbEdge/init/dbEdgeInit60SysAdmin30SysObjMigration'
import { initAdminSysObjNodeObj } from '$server/dbEdge/init/dbEdgeInit60SysAdmin30SysObjNodeObj'
import { initAdminSysObjRep } from '$server/dbEdge/init/dbEdgeInit60SysAdmin30SysObjRep'
import { initAdminSysObjTask } from '$server/dbEdge/init/dbEdgeInit60SysAdmin30SysObjTask'
import { initAdminSysObjWidget } from '$server/dbEdge/init/dbEdgeInit60SysAdmin30SysObjWidget'

export function initAdminSysObj(init: InitDb) {
	initSystemObject(init)
	initAdminSysObjApp(init)
	initAdminSysObjCode(init)
	initAdminSysObjDataObj(init)
	initAdminSysObjDataObjAction(init)
	initAdminSysObjDataObjEmbed(init)
	initAdminSysObjDB(init)
	initAdminSysObjFieldItems(init)
	initAdminSysObjMigration(init)
	initAdminSysObjNodeObj(init)
	initAdminSysObjRep(init)
	initAdminSysObjTask(init)
	initAdminSysObjWidget(init)
}

async function initSystemObject(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: 'none',
		header: 'Systems (Objects)',
		isListEdit: false,
		name: 'data_obj_sys_admin_system_list_obj',
		owner: 'sys_system_old',
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
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'System (Object)',
		name: 'data_obj_sys_admin_system_detail_obj',
		owner: 'sys_system_old',
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
		dataObj: 'data_obj_sys_admin_system_list_obj',
		header: 'Systems (Objects)',
		name: 'node_obj_sys_admin_system_list_obj',
		orderDefine: 30,
		owner: 'sys_system_old'
	})

	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_sys_admin_system_detail_obj',
		header: 'System (Object)',
		name: 'node_obj_sys_admin_system_detail_obj',
		orderDefine: 10,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_admin_system_list_obj'
	})
}
