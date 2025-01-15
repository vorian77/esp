import { InitDb } from '$server/dbEdge/init/types.init'

export function initPreDataObjActionGroup(init: InitDb) {
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_save_detail', codeColor: 'primary', isListRowAction: false, orderDefine: 0 }
		],
		name: 'doag_auth_my_account',
		owner: 'sys_system_old'
	})

	/* base */
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_save_detail', codeColor: 'primary', isListRowAction: false, orderDefine: 0 },
			{ action: 'ua_save_cancel', codeColor: 'primary', isListRowAction: false, orderDefine: 1 },
			{ action: 'ua_new_detail', codeColor: 'primary', isListRowAction: false, orderDefine: 2 },
			{ action: 'ua_delete_detail', codeColor: 'error', isListRowAction: false, orderDefine: 3 }
		],
		name: 'doag_detail',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_save_list', codeColor: 'primary', isListRowAction: false, orderDefine: 0 },
			{ action: 'ua_save_cancel', codeColor: 'primary', isListRowAction: false, orderDefine: 1 },
			{
				action: 'ua_new_detail_list',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 2
			},
			{ action: 'ua_edit_list', codeColor: 'primary', isListRowAction: true, orderDefine: 3 },
			{ action: 'ua_download_grid', codeColor: 'primary', isListRowAction: false, orderDefine: 4 }
		],
		name: 'doag_list',
		owner: 'sys_system_old'
	})

	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_save_list_edit', codeColor: 'primary', isListRowAction: true, orderDefine: 0 }
		],
		name: 'doag_list_edit',
		owner: 'sys_system_old'
	})

	/* dialog */
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_dialog_done', codeColor: 'primary', isListRowAction: false, orderDefine: 0 }
		],
		name: 'doag_dialog_footer_detail',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_dialog_cancel', codeColor: 'primary', isListRowAction: false, orderDefine: 0 },
			{ action: 'ua_dialog_done', codeColor: 'primary', isListRowAction: false, orderDefine: 1 }
		],
		name: 'doag_dialog_footer_list',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_save_detail', codeColor: 'primary', isListRowAction: false, orderDefine: 0 },
			{ action: 'ua_save_cancel', codeColor: 'primary', isListRowAction: false, orderDefine: 1 },
			{
				action: 'ua_new_detail_dialog_detail',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 2
			},
			{ action: 'ua_delete_detail', codeColor: 'error', isListRowAction: false, orderDefine: 3 }
		],
		name: 'doag_dialog_form_detail',
		owner: 'sys_system_old'
	})

	/* embed */
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_save_list', codeColor: 'primary', isListRowAction: false, orderDefine: 0 },
			{ action: 'ua_save_cancel', codeColor: 'primary', isListRowAction: false, orderDefine: 1 },
			{
				action: 'ua_embed_list_config_new',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 2
			},
			{
				action: 'ua_embed_list_config_edit',
				codeColor: 'primary',
				isListRowAction: true,
				orderDefine: 3
			}
		],
		name: 'doag_embed_list_config',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_save_list', codeColor: 'primary', isListRowAction: false, orderDefine: 0 },
			{ action: 'ua_save_cancel', codeColor: 'primary', isListRowAction: false, orderDefine: 1 }
		],
		name: 'doag_embed_list_edit',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_save_list', codeColor: 'primary', isListRowAction: false, orderDefine: 0 },
			{ action: 'ua_save_cancel', codeColor: 'primary', isListRowAction: false, orderDefine: 1 },
			{
				action: 'ua_embed_list_edit_parm_value',
				codeColor: 'primary',
				isListRowAction: true,
				orderDefine: 2
			}
		],
		name: 'doag_embed_list_edit_parm_value',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_embed_list_select',
				codeColor: 'primary',
				isListRowAction: true,
				orderDefine: 0
			}
		],
		name: 'doag_embed_list_select',
		owner: 'sys_system_old'
	})

	/* organizations-user */
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_save_detail', codeColor: 'primary', isListRowAction: false, orderDefine: 0 },
			{ action: 'ua_save_cancel', codeColor: 'primary', isListRowAction: false, orderDefine: 1 }
		],
		name: 'doag_detail_org_user',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_edit_list', codeColor: 'primary', isListRowAction: true, orderDefine: 0 },
			{ action: 'ua_download_grid', codeColor: 'primary', isListRowAction: false, orderDefine: 1 }
		],
		name: 'doag_list_org_user',
		owner: 'sys_system_old'
	})

	/* mobile */
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_save_detail', codeColor: 'primary', isListRowAction: false, orderDefine: 0 },
			{ action: 'ua_save_cancel', codeColor: 'primary', isListRowAction: false, orderDefine: 1 }
		],
		name: 'doag_detail_mobile_save',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_save_detail', codeColor: 'primary', isListRowAction: false, orderDefine: 0 },
			{ action: 'ua_save_cancel', codeColor: 'primary', isListRowAction: false, orderDefine: 1 },
			{ action: 'ua_delete_detail', codeColor: 'error', isListRowAction: false, orderDefine: 2 }
		],
		name: 'doag_detail_mobile_save_delete',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_save_list', codeColor: 'primary', isListRowAction: false, orderDefine: 0 },
			{ action: 'ua_save_cancel', codeColor: 'primary', isListRowAction: false, orderDefine: 1 },
			{
				action: 'ua_new_detail_list',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 2
			},
			{ action: 'ua_edit_list', codeColor: 'primary', isListRowAction: true, orderDefine: 3 }
		],
		name: 'doag_list_mobile',
		owner: 'sys_system_old'
	})

	/* report */
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_refresh_list', codeColor: 'primary', isListRowAction: false, orderDefine: 0 },
			{ action: 'ua_download_grid', codeColor: 'primary', isListRowAction: false, orderDefine: 1 }
		],
		name: 'doag_report_render',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_save_detail', codeColor: 'primary', isListRowAction: false, orderDefine: 0 },
			{ action: 'ua_save_cancel', codeColor: 'primary', isListRowAction: false, orderDefine: 1 }
		],
		name: 'doag_detail_report',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_save_list', codeColor: 'primary', isListRowAction: false, orderDefine: 0 },
			{ action: 'ua_save_cancel', codeColor: 'primary', isListRowAction: false, orderDefine: 1 },
			{ action: 'ua_edit_list', codeColor: 'primary', isListRowAction: true, orderDefine: 2 }
		],
		name: 'doag_list_report',
		owner: 'sys_system_old'
	})

	/* specialty */
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_save_detail', codeColor: 'primary', isListRowAction: false, orderDefine: 0 },
			{ action: 'ua_save_cancel', codeColor: 'primary', isListRowAction: false, orderDefine: 1 },
			{ action: 'ua_new_detail', codeColor: 'primary', isListRowAction: false, orderDefine: 2 },
			{ action: 'ua_delete_detail', codeColor: 'error', isListRowAction: false, orderDefine: 3 },
			{ action: 'ua_migrate', codeColor: 'primary', isListRowAction: false, orderDefine: 4 }
		],
		name: 'doag_detail_migrate_define',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_process_execute', codeColor: 'primary', isListRowAction: false, orderDefine: 0 }
		],
		name: 'doag_detail_migrate_process',
		owner: 'sys_system_old'
	})
}
