import { InitDb } from '$server/dbEdge/init/types.init'

export function initAdminSysObjTask(init: InitDb) {
	initTask(init)
}

function initTask(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <tree,uuid,SysSystem.id>',
		header: 'Tasks',
		name: 'data_obj_sys_admin_task_list',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysTask' }],
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
				orderCrumb: 20,
				orderSort: 20,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeTaskType',
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isGlobalResource',
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'orderDefine',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 200,
				orderDisplay: 200
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Task',
		name: 'data_obj_sys_admin_task_detail',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysTask' }],
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
				linkExprSave: `(SELECT sys_core::SysSystem FILTER .id = <tree,uuid,SysSystem.id>)`,
				linkTable: 'SysSystem'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				columnName: 'header',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeTaskType',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_task_type',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isGlobalResource',
				exprPreset: '(SELECT false)',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
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
				codeFieldElement: 'textArea',
				columnName: 'description',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeIcon',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_icon',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeColorFrom',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_tailwind_color',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeColorTo',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_tailwind_color',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isAlwaysPinToDash',
				exprPreset: '(SELECT false)',
				indexTable: 0,
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
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 150,
				orderDefine: 150
			},
			{
				codeFieldElement: 'select',
				columnName: 'objectTask',
				isDisplayable: true,
				orderDisplay: 160,
				orderDefine: 160,
				indexTable: 0,
				fieldListItems: 'il_sys_task_obj',
				linkTable: 'SysObj'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeTaskStatusObj',
				isDisplayable: true,
				orderDisplay: 170,
				orderDefine: 170,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_task_status_obj',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'number',
				columnName: 'orderDefine',
				isDisplayable: true,
				orderDisplay: 180,
				orderDefine: 180,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 190,
				orderDefine: 190
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

	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_sys_admin_task_list',
		header: 'Tasks',
		name: 'node_obj_sys_admin_task_list',
		orderDefine: 180,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_admin_system_detail_obj'
	})

	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_sys_admin_task_detail',
		header: 'Task',
		name: 'node_obj_sys_admin_task_detail',
		orderDefine: 10,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_admin_task_list'
	})
}