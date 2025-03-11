import { InitDb } from '$server/dbGel/init/types.init'

export function initAdminSysObjNodeObj(init: InitDb) {
	initNodeObj(init)
}

function initNodeObj(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <tree,uuid,SysSystem.id>',
		header: 'Node Objects',
		listReorderColumn: 'orderDefine',
		name: 'data_obj_sys_admin_node_obj_list',
		owner: 'sys_system',
		tables: [{ index: 0, table: 'SysNodeObj' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeNavType',
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeNodeType',
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
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
				columnName: 'orderDefine',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 60
			},

			/* management */
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1010
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1020
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1030
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1040
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Node Object',
		name: 'data_obj_sys_admin_node_obj_detail',
		owner: 'sys_system',
		tables: [{ index: 0, table: 'SysNodeObj' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				exprSave: `(SELECT sys_core::SysSystem FILTER .id = <tree,uuid,SysSystem.id>)`,
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
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
				codeFieldElement: 'select',
				columnName: 'codeNavType',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmValue: 'ct_sys_node_obj_nav_type'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeNodeType',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmValue: 'ct_sys_node_obj_type'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeQueryOwnerType',
				isDisplayable: true,
				orderDisplay: 55,
				orderDefine: 55,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmValue: 'ct_sys_treae_leaf_id_type'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'parent',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0,
				fieldListItems: 'il_sys_node_obj_order_name'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isAlwaysRetrieveData',
				exprPreset: `(SELECT false)`,
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isDynamicChildrenSystemParents',
				exprPreset: `(SELECT false)`,
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isHideRowManager',
				exprPreset: `(SELECT false)`,
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isGlobalResource',
				exprPreset: `(SELECT false)`,
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120
			},
			{
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'header',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeIcon',
				isDisplayable: true,
				orderDisplay: 150,
				orderDefine: 150,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmValue: 'ct_sys_icon'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 160,
				orderDefine: 160
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 170,
				orderDefine: 170
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'dataObj',
				isDisplayable: true,
				orderDisplay: 180,
				orderDefine: 180,
				indexTable: 0,
				fieldListItems: 'il_sys_data_obj_by_type',
				fieldListItemsParmValue: 'default'
			},
			{
				codeAccess: 'optional',
				columnName: 'page',
				isDisplayable: true,
				orderDisplay: 190,
				orderDefine: 190,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 200,
				orderDefine: 200
			},
			{
				columnName: 'orderDefine',
				orderDefine: 210,
				exprPreset: `(SELECT (count((SELECT sys_core::SysNodeObj FILTER .owner.id = <tree,uuid,SysSystem.id>)) + 1))`,
				indexTable: 0,
				isDisplayable: false
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
		children: ['node_obj_sys_admin_node_obj_detail'],
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		data: [{ dataObj: 'data_obj_sys_admin_node_obj_list' }],
		header: 'Node Objects',
		name: 'node_obj_sys_admin_node_obj_list',
		orderDefine: 130,
		owner: 'sys_system'
	})

	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		data: [{ dataObj: 'data_obj_sys_admin_node_obj_detail' }],
		header: 'Node Object',
		name: 'node_obj_sys_admin_node_obj_detail',
		orderDefine: 10,
		owner: 'sys_system'
	})
}
