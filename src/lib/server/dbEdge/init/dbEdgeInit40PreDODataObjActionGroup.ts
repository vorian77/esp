import { InitDb } from '$server/dbEdge/init/types.init'

export function initPreDataObjActionGroups(init: InitDb) {
	init.addTrans('sysDataObjActionFieldGroup', {
		actionFieldItems: [['noa_save_detail', 0]],
		name: 'doag_auth_my_account',
		owner: 'sys_system_old'
	})

	/* base */
	init.addTrans('sysDataObjActionFieldGroup', {
		actionFieldItems: [
			['noa_save_detail', 0],
			['noa_save_cancel', 1],
			['noa_new_detail', 2],
			['noa_delete_detail', 3]
		],
		name: 'doag_detail',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionFieldGroup', {
		actionFieldItems: [
			['noa_save_list', 0],
			['noa_save_cancel', 1],
			['noa_new_detail_list', 2],
			['noa_edit_list', 3],
			['noa_download_grid', 4]
		],
		name: 'doag_list',
		owner: 'sys_system_old'
	})

	init.addTrans('sysDataObjActionFieldGroup', {
		actionFieldItems: [['noa_save_list_edit', 0]],
		name: 'doag_list_edit',
		owner: 'sys_system_old'
	})

	/* dialog */
	init.addTrans('sysDataObjActionFieldGroup', {
		actionFieldItems: [['noa_dialog_done', 0]],
		name: 'doag_dialog_footer_detail',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionFieldGroup', {
		actionFieldItems: [
			['noa_dialog_cancel', 0],
			['noa_dialog_done', 1]
		],
		name: 'doag_dialog_footer_list',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionFieldGroup', {
		actionFieldItems: [
			['noa_save_detail', 0],
			['noa_save_cancel', 1],
			['noa_new_detail_dialog_detail', 2],
			['noa_delete_detail', 3]
		],
		name: 'doag_dialog_form_detail',
		owner: 'sys_system_old'
	})

	/* embed */
	init.addTrans('sysDataObjActionFieldGroup', {
		actionFieldItems: [
			['noa_save_list', 0],
			['noa_save_cancel', 1],
			['noa_embed_list_config_new', 2],
			['noa_embed_list_config_edit', 3]
		],
		name: 'doag_embed_list_config',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionFieldGroup', {
		actionFieldItems: [
			['noa_save_list', 0],
			['noa_save_cancel', 1]
		],
		name: 'doag_embed_list_edit',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionFieldGroup', {
		actionFieldItems: [
			['noa_save_list', 0],
			['noa_save_cancel', 1],
			['noa_embed_list_edit_parm_value', 2]
		],
		name: 'doag_embed_list_edit_parm_value',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionFieldGroup', {
		actionFieldItems: [['noa_embed_list_select', 0]],
		name: 'doag_embed_list_select',
		owner: 'sys_system_old'
	})

	/* organizations-user */
	init.addTrans('sysDataObjActionFieldGroup', {
		actionFieldItems: [
			['noa_save_detail', 0],
			['noa_save_cancel', 1]
		],
		name: 'doag_detail_org_user',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionFieldGroup', {
		actionFieldItems: [
			['noa_edit_list', 0],
			['noa_download_grid', 1]
		],
		name: 'doag_list_org_user',
		owner: 'sys_system_old'
	})

	/* mobile */
	init.addTrans('sysDataObjActionFieldGroup', {
		actionFieldItems: [
			['noa_save_detail', 0],
			['noa_save_cancel', 1]
		],
		name: 'doag_detail_mobile_save',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionFieldGroup', {
		actionFieldItems: [
			['noa_save_detail', 0],
			['noa_save_cancel', 1],
			['noa_delete_detail', 2]
		],
		name: 'doag_detail_mobile_save_delete',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionFieldGroup', {
		actionFieldItems: [
			['noa_save_list', 0],
			['noa_save_cancel', 1],
			['noa_new_detail_list', 2],
			['noa_edit_list', 3]
		],
		name: 'doag_list_mobile',
		owner: 'sys_system_old'
	})

	/* report */
	init.addTrans('sysDataObjActionFieldGroup', {
		actionFieldItems: [
			['noa_refresh_list', 0],
			['noa_download_grid', 1]
		],
		name: 'doag_report_render',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionFieldGroup', {
		actionFieldItems: [
			['noa_save_detail', 0],
			['noa_save_cancel', 1]
		],
		name: 'doag_detail_report',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionFieldGroup', {
		actionFieldItems: [
			['noa_save_list', 0],
			['noa_save_cancel', 1],
			['noa_edit_list', 2]
		],
		name: 'doag_list_report',
		owner: 'sys_system_old'
	})

	/* specialty */
	init.addTrans('sysDataObjActionFieldGroup', {
		actionFieldItems: [
			['noa_save_detail', 0],
			['noa_save_cancel', 1],
			['noa_new_detail', 2],
			['noa_delete_detail', 3],
			['noa_migrate', 4]
		],
		name: 'doag_detail_migrate_define',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionFieldGroup', {
		actionFieldItems: [['noa_process_execute', 0]],
		name: 'doag_detail_migrate_process',
		owner: 'sys_system_old'
	})
}
