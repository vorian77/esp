import { InitDb } from '$server/dbGel/init/types.init'

export function initPreDataObjActionGroup(init: InitDb) {
	init.addTrans('sysDataObjActionGroup', {
		actions: [{ action: 'ua_sys_save_detail', codeColor: 'primary', orderDefine: 0 }],
		name: 'doag_auth_my_account',
		ownerSys: 'sys_system'
	})

	/* base */
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_save_detail',
				codeColor: 'primary',
				orderDefine: 0
			},
			{
				action: 'ua_sys_save_cancel_detail',
				codeColor: 'primary',
				orderDefine: 1
			},
			{ action: 'ua_sys_new_detail', codeColor: 'primary', orderDefine: 2 },
			{ action: 'ua_sys_delete_detail', codeColor: 'error', orderDefine: 3 }
		],
		name: 'doag_detail',
		ownerSys: 'sys_system'
	})

	init.addTrans('sysDataObjActionGroup', {
		actions: [],
		name: 'doag_detail_none',
		ownerSys: 'sys_system'
	})

	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_save_detail',
				codeColor: 'primary',
				orderDefine: 0
			},
			{
				action: 'ua_sys_save_cancel_detail',
				codeColor: 'primary',
				orderDefine: 1
			},
			{ action: 'ua_sys_delete_detail', codeColor: 'error', orderDefine: 2 }
		],
		name: 'doag_detail_error',
		ownerSys: 'sys_system'
	})

	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_save_detail',
				codeColor: 'primary',
				orderDefine: 0
			},
			{
				action: 'ua_sys_save_cancel_detail',
				codeColor: 'primary',
				orderDefine: 1
			}
		],
		name: 'doag_detail_save',
		ownerSys: 'sys_system'
	})

	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_save_detail',
				codeColor: 'primary',
				orderDefine: 0
			},
			{
				action: 'ua_sys_save_cancel_detail',
				codeColor: 'primary',
				orderDefine: 1
			},
			{ action: 'ua_sys_new_detail', codeColor: 'primary', orderDefine: 2 }
		],
		name: 'doag_detail_task_record',
		ownerSys: 'sys_system'
	})

	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_sys_save_list', codeColor: 'primary', orderDefine: 0 },
			{
				action: 'ua_sys_save_cancel_list',
				codeColor: 'primary',
				orderDefine: 1
			},
			{
				action: 'ua_sys_new_detail_list',
				codeColor: 'primary',
				orderDefine: 2
			},
			{ action: 'ua_sys_edit_list', codeColor: 'primary', isListRowAction: true, orderDefine: 3 },
			{
				action: 'ua_sys_download_grid',
				codeColor: 'primary',
				orderDefine: 4
			}
		],
		name: 'doag_list',
		ownerSys: 'sys_system'
	})

	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_sys_edit_list', codeColor: 'primary', isListRowAction: true, orderDefine: 0 }
		],
		name: 'doag_list_edit',
		ownerSys: 'sys_system'
	})

	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_sys_edit_list', codeColor: 'primary', isListRowAction: true, orderDefine: 0 },
			{
				action: 'ua_sys_download_grid',
				codeColor: 'primary',
				orderDefine: 1
			}
		],
		name: 'doag_list_edit_download',
		ownerSys: 'sys_system'
	})

	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_sys_edit_list', codeColor: 'primary', isListRowAction: true, orderDefine: 0 },
			{
				action: 'ua_sys_download_grid',
				codeColor: 'primary',
				orderDefine: 1
			},
			{ action: 'ua_sys_delete_list', codeColor: 'error', orderDefine: 2 }
		],
		name: 'doag_list_error',
		ownerSys: 'sys_system'
	})

	/* dialog */
	init.addTrans('sysDataObjActionGroup', {
		actions: [{ action: 'ua_sys_dialog_done', codeColor: 'black', orderDefine: 0 }],
		name: 'doag_dialog_footer_detail',
		ownerSys: 'sys_system'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_dialog_cancel',
				codeColor: 'gray',
				orderDefine: 0
			},
			{ action: 'ua_sys_dialog_select', codeColor: 'black', orderDefine: 1 }
		],
		name: 'doag_dialog_footer_list_select',
		ownerSys: 'sys_system'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_save_detail',
				codeColor: 'primary',
				orderDefine: 0
			},
			{
				action: 'ua_sys_save_cancel_detail',
				codeColor: 'primary',
				orderDefine: 1
			},
			{
				action: 'ua_sys_new_detail_dialog_detail',
				codeColor: 'primary',
				orderDefine: 2
			},
			{ action: 'ua_sys_delete_detail', codeColor: 'error', orderDefine: 3 }
		],
		name: 'doag_dialog_form_detail',
		ownerSys: 'sys_system'
	})

	/* embed */
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_sys_save_list', codeColor: 'primary', orderDefine: 0 },
			{
				action: 'ua_sys_save_cancel_list',
				codeColor: 'primary',
				orderDefine: 1
			},
			{
				action: 'ua_sys_embed_list_config_new',
				codeColor: 'primary',
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
		ownerSys: 'sys_system'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_sys_save_list', codeColor: 'primary', orderDefine: 0 },
			{
				action: 'ua_sys_save_cancel_list',
				codeColor: 'primary',
				orderDefine: 1
			}
		],
		name: 'doag_embed_list_edit',
		ownerSys: 'sys_system'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_sys_save_list', codeColor: 'primary', orderDefine: 0 },
			{
				action: 'ua_sys_save_cancel_list',
				codeColor: 'primary',
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
		ownerSys: 'sys_system'
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
		ownerSys: 'sys_system'
	})

	/* organizations-user */
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_save_detail',
				codeColor: 'primary',
				orderDefine: 0
			},
			{
				action: 'ua_sys_save_cancel_detail',
				codeColor: 'primary',
				orderDefine: 1
			}
		],
		name: 'doag_detail_org_user',
		ownerSys: 'sys_system'
	})

	/* mobile */
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_save_detail',
				codeColor: 'primary',
				orderDefine: 0
			},
			{
				action: 'ua_sys_save_cancel_detail',
				codeColor: 'primary',
				orderDefine: 1
			}
		],
		name: 'doag_detail_mobile_save',
		ownerSys: 'sys_system'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_save_detail',
				codeColor: 'primary',
				orderDefine: 0
			},
			{
				action: 'ua_sys_save_cancel_detail',
				codeColor: 'primary',
				orderDefine: 1
			},
			{ action: 'ua_sys_delete_detail', codeColor: 'error', orderDefine: 2 }
		],
		name: 'doag_detail_mobile_save_delete',
		ownerSys: 'sys_system'
	})

	/* report */
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_refresh_list',
				codeColor: 'primary',
				orderDefine: 0
			},
			{
				action: 'ua_sys_download_grid',
				codeColor: 'primary',
				orderDefine: 1
			}
		],
		name: 'doag_report_render',
		ownerSys: 'sys_system'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_save_detail',
				codeColor: 'primary',
				orderDefine: 0
			},
			{
				action: 'ua_sys_save_cancel_detail',
				codeColor: 'primary',
				orderDefine: 1
			}
		],
		name: 'doag_detail_report',
		ownerSys: 'sys_system'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{ action: 'ua_sys_save_list', codeColor: 'primary', orderDefine: 0 },
			{
				action: 'ua_sys_save_cancel_list',
				codeColor: 'primary',
				orderDefine: 1
			},
			{ action: 'ua_sys_edit_list', codeColor: 'primary', isListRowAction: true, orderDefine: 2 }
		],
		name: 'doag_list_report',
		ownerSys: 'sys_system'
	})

	/* migrate */
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_save_detail',
				codeColor: 'primary',
				orderDefine: 0
			},
			{
				action: 'ua_sys_save_cancel_detail',
				codeColor: 'primary',
				orderDefine: 1
			},
			{ action: 'ua_sys_new_detail', codeColor: 'primary', orderDefine: 2 },
			{
				action: 'ua_sys_delete_detail',
				codeColor: 'error',
				orderDefine: 3
			},
			{ action: 'ua_sys_migrate', codeColor: 'primary', orderDefine: 4 }
		],
		name: 'doag_detail_migrate_define',
		ownerSys: 'sys_system'
	})
	init.addTrans('sysDataObjActionGroup', {
		actions: [
			{
				action: 'ua_sys_process_execute',
				codeColor: 'primary',
				orderDefine: 0
			}
		],
		name: 'doag_detail_migrate_process',
		ownerSys: 'sys_system'
	})
}
