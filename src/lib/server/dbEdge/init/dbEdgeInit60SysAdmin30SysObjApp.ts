import { InitDb } from '$server/dbEdge/init/types.init'

export function initAdminSysObjApp(init: InitDb) {
	initFieldListSelectNodes(init)
	initApp(init)
	initAppHeader(init)
}

function initFieldListSelectNodes(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_embed_list_select',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeDataObjType: 'embed',
		exprFilter: `.codeNodeType = (SELECT sys_core::getCode('ct_sys_node_obj_type', 'program')) AND (.owner.id = <tree,uuid,SysSystem.id> UNION .isGlobalResource)`,
		header: 'Select Node(s)',
		name: 'dofls_sys_admin_sys_node',
		owner: 'sys_system_old',
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
				columnName: 'name',
				orderSort: 20,
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObjFieldEmbedListSelect', {
		actionGroupModal: 'doag_dialog_footer_list',
		btnLabelComplete: 'Select Node(s)',
		dataObjList: 'dofls_sys_admin_sys_node',
		name: 'fels_sys_node',
		owner: 'sys_system_old'
	})
}

function initApp(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		header: 'Apps',
		exprFilter: '.owner.id = <tree,uuid,SysSystem.id>',
		name: 'data_obj_sys_app_list',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysApp' }],
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
				orderDefine: 20,
				orderDisplay: 20,
				orderSort: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isGlobalResource',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'App',
		name: 'data_obj_sys_app_detail',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysApp' }],
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
				codeFieldElement: 'select',
				columnName: 'appHeader',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_app_header_order_name',
				linkTable: 'SysAppHeader'
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
				codeFieldElement: 'embedListSelect',
				columnName: 'nodes',
				headerAlt: 'Program Nodes',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				fieldEmbedListSelect: 'fels_sys_node',
				indexTable: 0,
				linkTable: 'SysNodeObj'
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
		dataObj: 'data_obj_sys_app_list',
		header: 'Apps',
		name: 'node_obj_sys_app_list',
		orderDefine: 25,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_admin_system_detail_obj'
	})

	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_sys_app_detail',
		header: 'App',
		name: 'node_obj_sys_app_detail',
		orderDefine: 10,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_app_list'
	})
}

function initAppHeader(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		header: 'App Headers',
		exprFilter: '.owner.id = <tree,uuid,SysSystem.id>',
		name: 'data_obj_sys_app_header_list',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysAppHeader' }],
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
				orderCrumb: 10,
				orderSort: 10,
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
				columnName: 'codeIcon',
				isDisplayable: true,
				orderDisplay: 35,
				orderDefine: 35,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isGlobalResource',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'orderDefine',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'App Header',
		name: 'data_obj_sys_app_header_detail',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysAppHeader' }],
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
				indexTable: 0,
				matchColumn: 'name'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeIcon',
				isDisplayable: true,
				orderDisplay: 55,
				orderDefine: 55,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_icon',
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
				codeFieldElement: 'number',
				columnName: 'orderDefine',
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
		dataObj: 'data_obj_sys_app_header_list',
		header: 'App Headers',
		name: 'node_obj_sys_app_header_list',
		orderDefine: 20,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_admin_system_detail_obj'
	})

	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_sys_app_header_detail',
		header: 'App Header',
		name: 'node_obj_sys_app_header_detail',
		orderDefine: 10,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_app_header_list'
	})
}
