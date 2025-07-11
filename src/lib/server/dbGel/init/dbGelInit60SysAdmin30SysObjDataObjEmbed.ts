import { InitDb } from '$server/dbGel/init/types.init'
export function initAdminSysObjDataObjEmbed(init: InitDb) {
	initDataObjFielEmbedListConfig(init)
	initDataObjFieldEmbedListEdit(init)
	initDataObjFieldEmbedListSelect(init)
}

function initDataObjFielEmbedListConfig(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		exprFilter: '.owner.id = <tree,uuid,SysSystem.id>',
		header: 'Embed List Configs',
		name: 'data_obj_sys_admin_data_obj_field_embed_list_config_list',
		owner: 'sys_system',
		tables: [{ index: 0, table: 'SysDataObjFieldEmbedListConfig' }],
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
				orderDisplay: 15,
				orderDefine: 15,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'actionGroupModal',
				orderCrumb: 10,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysDataObjActionGroup'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dataObjEmbed',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysDataObj'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dataObjModal',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysDataObj'
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		header: 'Embed List Config',
		name: 'data_obj_sys_admin_data_obj_field_embed_list_config_detail',
		owner: 'sys_system',
		tables: [{ index: 0, table: 'SysDataObjFieldEmbedListConfig' }],
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
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'actionGroupModal',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_data_obj_action_group_order_name'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeFieldElement: 'select',
				columnName: 'dataObjEmbed',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0,
				fieldListItems: 'il_sys_data_obj_by_type',
				fieldListItemsParmValue: 'embed'
			},
			{
				codeFieldElement: 'select',
				columnName: 'dataObjModal',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0,
				fieldListItems: 'il_sys_data_obj_by_type',
				fieldListItemsParmValue: 'embed'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100
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
		children: [{ node: 'node_obj_sys_admin_data_obj_field_embed_list_config_detail', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_sys_admin_data_obj_field_embed_list_config_list',
		header: 'Embed List Configs',
		name: 'node_obj_sys_admin_data_obj_field_embed_list_config_list',
		orderDefine: 90,
		owner: 'sys_system'
	})

	init.addTrans('sysNodeObj', {
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_sys_admin_data_obj_field_embed_list_config_detail',
		header: 'Config',
		name: 'node_obj_sys_admin_data_obj_field_embed_list_config_detail',
		orderDefine: 10,
		owner: 'sys_system'
	})
}

function initDataObjFieldEmbedListEdit(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		exprFilter: '.owner.id = <tree,uuid,SysSystem.id>',
		header: 'Embed List Edit',
		name: 'data_obj_sys_admin_data_obj_field_embed_list_edit_list',
		owner: 'sys_system',
		tables: [{ index: 0, table: 'SysDataObjFieldEmbedListEdit' }],
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
				columnName: 'dataObjEmbed',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysDataObj'
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		header: 'Embed List Edit',
		name: 'data_obj_sys_admin_data_obj_field_embed_list_edit_detail',
		owner: 'sys_system',
		tables: [{ index: 0, table: 'SysDataObjFieldEmbedListEdit' }],
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
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'dataObjEmbed',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_data_obj_by_type',
				fieldListItemsParmValue: 'embed'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
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
		children: [{ node: 'node_obj_sys_admin_data_obj_field_embed_list_edit_detail', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_sys_admin_data_obj_field_embed_list_edit_list',
		header: 'Embed List Edits',
		name: 'node_obj_sys_admin_data_obj_field_embed_list_edit_list',
		orderDefine: 100,
		owner: 'sys_system'
	})

	init.addTrans('sysNodeObj', {
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_sys_admin_data_obj_field_embed_list_edit_detail',
		header: 'Config',
		name: 'node_obj_sys_admin_data_obj_field_embed_list_edit_detail',
		orderDefine: 10,
		owner: 'sys_system'
	})
}

function initDataObjFieldEmbedListSelect(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		exprFilter: '.owner.id = <tree,uuid,SysSystem.id>',
		header: 'Embed List Selects',
		name: 'data_obj_sys_admin_data_obj_field_embed_list_select_list',
		owner: 'sys_system',
		tables: [{ index: 0, table: 'SysDataObjFieldEmbedListSelect' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'actionGroupModal',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysDataObjActionGroup'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'btnLabelComplete',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dataObjList',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysDataObj'
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		header: 'Embed List Select',
		name: 'data_obj_sys_admin_data_obj_field_embed_list_select_detail',
		owner: 'sys_system',
		tables: [{ index: 0, table: 'SysDataObjFieldEmbedListSelect' }],
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
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'actionGroupModal',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_data_obj_action_group_order_name'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				columnName: 'btnLabelComplete',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'dataObjList',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0,
				fieldListItems: 'il_sys_data_obj_by_type',
				fieldListItemsParmValue: 'embed'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100
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
		children: [{ node: 'node_obj_sys_admin_data_obj_field_embed_list_select_detail', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_sys_admin_data_obj_field_embed_list_select_list',
		header: 'Embed List Selects',
		name: 'node_obj_sys_admin_data_obj_field_embed_list_select_list',
		orderDefine: 110,
		owner: 'sys_system'
	})

	init.addTrans('sysNodeObj', {
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_sys_admin_data_obj_field_embed_list_select_detail',
		header: 'Config',
		name: 'node_obj_sys_admin_data_obj_field_embed_list_select_detail',
		orderDefine: 10,
		owner: 'sys_system'
	})
}
