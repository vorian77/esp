import { InitDb } from '$server/dbGel/init/types.init'

export function initSysAdminConfigNodes(init: InitDb) {
	initConfigNodes(init)
}

function initConfigNodes(init: InitDb) {
	init.addTrans('updateSystemNodesConfig', {
		name: 'sys_system',
		nodesConfig: [
			{ codeAttrType: 'at_app_api', node: 'node_obj_app_api_list' },
			{ codeAttrType: 'at_db_column', node: 'node_obj_sys_admin_column_list' },
			{ codeAttrType: 'at_db_table', node: 'node_obj_sys_admin_table_list' },
			{ codeAttrType: 'at_migr_migration', node: 'node_obj_sys_admin_migr_list' },
			{ codeAttrType: 'at_rep_report', node: 'node_obj_sys_rep_list' },
			{ codeAttrType: 'at_rep_analytic', node: 'node_obj_sys_analytic_list' },
			{ codeAttrType: 'at_sys_app', node: 'node_obj_sys_app_list' },
			{ codeAttrType: 'at_sys_app_header', node: 'node_obj_sys_app_header_list' },
			{ codeAttrType: 'at_sys_code', node: 'node_obj_admin_code_list_global' },
			{ codeAttrType: 'at_sys_code_action', node: 'node_obj_sys_admin_code_action_list' },
			{ codeAttrType: 'at_sys_code_type', node: 'node_obj_admin_code_type_list_global' },
			{ codeAttrType: 'at_sys_data_obj', node: 'node_obj_sys_admin_data_obj_list' },
			{
				codeAttrType: 'at_sys_data_obj_action_group',
				node: 'node_obj_sys_admin_data_obj_action_group_list'
			},
			{
				codeAttrType: 'at_sys_data_obj_field_embed_list_config',
				node: 'node_obj_sys_admin_data_obj_field_embed_list_config_list'
			},
			{
				codeAttrType: 'at_sys_data_obj_field_embed_list_edit',
				node: 'node_obj_sys_admin_data_obj_field_embed_list_edit_list'
			},
			{
				codeAttrType: 'at_sys_data_obj_field_embed_list_select',
				node: 'node_obj_sys_admin_data_obj_field_embed_list_select_list'
			},
			{
				codeAttrType: 'at_sys_data_obj_field_list_item',
				node: 'node_obj_sys_admin_data_obj_field_list_items_list'
			},
			{ codeAttrType: 'at_sys_node_obj', node: 'node_obj_sys_admin_node_obj_list' },
			{ codeAttrType: 'at_user_task', node: 'node_obj_sys_admin_task_list' },
			{ codeAttrType: 'at_user_user_action', node: 'node_obj_sys_admin_user_action_list' }
		]
	})
}
