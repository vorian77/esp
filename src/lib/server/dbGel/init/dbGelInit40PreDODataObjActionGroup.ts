import { InitDb } from '$server/dbGel/init/types.init'

export function initPreDataObjActionGroup(init: InitDb) {
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_sys_save_detail', codeColor: 'primary', isListRowAction: false, orderDefine: 0 }
		],
		name: 'doag_auth_my_account',
		owner: 'sys_system'
	})

	/* base */
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_save_detail',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 0
			},
			{
				action: 'ua_sys_save_cancel',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 1
			},
			{ action: 'ua_sys_new_detail', codeColor: 'primary', isListRowAction: false, orderDefine: 2 },
			{ action: 'ua_sys_delete_detail', codeColor: 'error', isListRowAction: false, orderDefine: 3 }
		],
		name: 'doag_detail',
		owner: 'sys_system'
	})

	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_save_detail',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 0
			},
			{
				action: 'ua_sys_save_cancel',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 1
			},
			{ action: 'ua_sys_delete_detail', codeColor: 'error', isListRowAction: false, orderDefine: 2 }
		],
		name: 'doag_detail_error',
		owner: 'sys_system'
	})

	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_save_detail',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 0
			},
			{
				action: 'ua_sys_save_cancel',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 1
			},
			{ action: 'ua_sys_new_detail', codeColor: 'primary', isListRowAction: false, orderDefine: 2 }
		],
		name: 'doag_detail_task_record',
		owner: 'sys_system'
	})

	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_sys_save_list', codeColor: 'primary', isListRowAction: false, orderDefine: 0 },
			{
				action: 'ua_sys_save_cancel',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 1
			},
			{
				action: 'ua_sys_new_detail_list',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 2
			},
			{ action: 'ua_sys_edit_list', codeColor: 'primary', isListRowAction: true, orderDefine: 3 },
			{
				action: 'ua_sys_download_grid',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 4
			}
		],
		name: 'doag_list',
		owner: 'sys_system'
	})

	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_save_list_edit',
				codeColor: 'primary',
				isListRowAction: true,
				orderDefine: 0
			}
		],
		name: 'doag_list_edit',
		owner: 'sys_system'
	})

	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_sys_edit_list', codeColor: 'primary', isListRowAction: true, orderDefine: 0 },
			{
				action: 'ua_sys_download_grid',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 1
			}
		],
		name: 'doag_list_error',
		owner: 'sys_system'
	})

	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_sys_edit_list', codeColor: 'primary', isListRowAction: true, orderDefine: 0 }
		],
		name: 'doag_list_task',
		owner: 'sys_system'
	})

	/* dialog */
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_sys_dialog_done', codeColor: 'primary', isListRowAction: false, orderDefine: 0 }
		],
		name: 'doag_dialog_footer_detail',
		owner: 'sys_system'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_dialog_cancel',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 0
			},
			{ action: 'ua_sys_dialog_done', codeColor: 'primary', isListRowAction: false, orderDefine: 1 }
		],
		name: 'doag_dialog_footer_list',
		owner: 'sys_system'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_save_detail',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 0
			},
			{
				action: 'ua_sys_save_cancel',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 1
			},
			{
				action: 'ua_sys_new_detail_dialog_detail',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 2
			},
			{ action: 'ua_sys_delete_detail', codeColor: 'error', isListRowAction: false, orderDefine: 3 }
		],
		name: 'doag_dialog_form_detail',
		owner: 'sys_system'
	})

	/* embed */
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_sys_save_list', codeColor: 'primary', isListRowAction: false, orderDefine: 0 },
			{
				action: 'ua_sys_save_cancel',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 1
			},
			{
				action: 'ua_sys_embed_list_config_new',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 2
			},
			{
				action: 'ua_sys_embed_list_config_edit',
				codeColor: 'primary',
				isListRowAction: true,
				orderDefine: 3
			}
		],
		name: 'doag_embed_list_config',
		owner: 'sys_system'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_sys_save_list', codeColor: 'primary', isListRowAction: false, orderDefine: 0 },
			{ action: 'ua_sys_save_cancel', codeColor: 'primary', isListRowAction: false, orderDefine: 1 }
		],
		name: 'doag_embed_list_edit',
		owner: 'sys_system'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_sys_save_list', codeColor: 'primary', isListRowAction: false, orderDefine: 0 },
			{
				action: 'ua_sys_save_cancel',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 1
			},
			{
				action: 'ua_sys_embed_list_edit_parm_value',
				codeColor: 'primary',
				isListRowAction: true,
				orderDefine: 2
			}
		],
		name: 'doag_embed_list_edit_parm_value',
		owner: 'sys_system'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_embed_list_select',
				codeColor: 'primary',
				isListRowAction: true,
				orderDefine: 0
			}
		],
		name: 'doag_embed_list_select',
		owner: 'sys_system'
	})

	/* organizations-user */
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_save_detail',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 0
			},
			{ action: 'ua_sys_save_cancel', codeColor: 'primary', isListRowAction: false, orderDefine: 1 }
		],
		name: 'doag_detail_org_user',
		owner: 'sys_system'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_sys_edit_list', codeColor: 'primary', isListRowAction: true, orderDefine: 0 },
			{
				action: 'ua_sys_download_grid',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 1
			}
		],
		name: 'doag_list_org_user',
		owner: 'sys_system'
	})

	/* mobile */
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_save_detail',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 0
			},
			{ action: 'ua_sys_save_cancel', codeColor: 'primary', isListRowAction: false, orderDefine: 1 }
		],
		name: 'doag_detail_mobile_save',
		owner: 'sys_system'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_save_detail',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 0
			},
			{
				action: 'ua_sys_save_cancel',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 1
			},
			{ action: 'ua_sys_delete_detail', codeColor: 'error', isListRowAction: false, orderDefine: 2 }
		],
		name: 'doag_detail_mobile_save_delete',
		owner: 'sys_system'
	})

	/* report */
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_refresh_list',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 0
			},
			{
				action: 'ua_sys_download_grid',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 1
			}
		],
		name: 'doag_report_render',
		owner: 'sys_system'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_save_detail',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 0
			},
			{ action: 'ua_sys_save_cancel', codeColor: 'primary', isListRowAction: false, orderDefine: 1 }
		],
		name: 'doag_detail_report',
		owner: 'sys_system'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_sys_save_list', codeColor: 'primary', isListRowAction: false, orderDefine: 0 },
			{
				action: 'ua_sys_save_cancel',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 1
			},
			{ action: 'ua_sys_edit_list', codeColor: 'primary', isListRowAction: true, orderDefine: 2 }
		],
		name: 'doag_list_report',
		owner: 'sys_system'
	})

	/* migrate */
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_save_detail',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 0
			},
			{
				action: 'ua_sys_save_cancel',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 1
			},
			{ action: 'ua_sys_new_detail', codeColor: 'primary', isListRowAction: false, orderDefine: 2 },
			{
				action: 'ua_sys_delete_detail',
				codeColor: 'error',
				isListRowAction: false,
				orderDefine: 3
			},
			{ action: 'ua_sys_migrate', codeColor: 'primary', isListRowAction: false, orderDefine: 4 }
		],
		name: 'doag_detail_migrate_define',
		owner: 'sys_system'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_process_execute',
				codeColor: 'primary',
				isListRowAction: false,
				orderDefine: 0
			}
		],
		name: 'doag_detail_migrate_process',
		owner: 'sys_system'
	})
}
