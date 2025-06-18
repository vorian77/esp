import { InitDb } from '$server/dbGel/init/types.init'

export function initPreUserAction(init: InitDb) {
	init.addTrans('sysUserAction', {
		codeAction: 'resendCode',
		name: 'ua_ca_sys_auth_resend_code',
		owner: 'sys_system'
	})
	init.addTrans('sysUserAction', {
		codeAction: 'setUserId',
		name: 'ua_ca_sys_auth_set_user_id',
		owner: 'sys_system'
	})
	init.addTrans('sysUserAction', {
		codeAction: 'submit',
		codeConfirmType: 'statusChanged',
		name: 'ua_ca_sys_auth_submit',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		actionConfirms: [
			{
				codeTriggerConfirmConditional: 'saveModeInsert',
				codeConfirmType: 'always',
				confirmButtonLabelConfirm: 'Confirm Discard',
				confirmMessage: 'Are you sure you want to discard your data?',
				confirmTitle: 'Discard Data'
			},
			{
				codeTriggerConfirmConditional: 'saveModeUpdate',
				codeConfirmType: 'always',
				confirmButtonLabelConfirm: 'Confirm Delete',
				confirmMessage:
					'Are you sure you want to delete this record (this action cannot be reversed)?',
				confirmTitle: 'Delete Record'
			}
		],

		codeAction: 'doDetailDelete',
		codeConfirmType: 'conditional',
		exprShow: `!(<detailPreset> || <statusChanged>)`,
		header: 'Delete',
		name: 'ua_sys_delete_detail',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		actionConfirms: [
			{
				codeConfirmType: 'statusChanged',
				codeTriggerConfirmConditional: 'none',
				confirmButtonLabelConfirm: 'Confirm Cancel',
				confirmMessage: 'Are you sure you want to discard your data?',
				confirmTitle: 'Cancel'
			}
		],
		codeAction: 'modalCancel',
		codeConfirmType: 'conditional',
		header: 'Cancel',
		name: 'ua_sys_dialog_cancel',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'modalDone',
		codeConfirmType: 'statusChanged',
		header: 'Done',
		name: 'ua_sys_dialog_done',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'doOpenCustom',
		name: 'ua_ca_sys_do_open_custom',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'doListDownload',
		codeConfirmType: 'statusChanged',
		exprShow: `!<statusChanged>`,
		header: 'Download',
		name: 'ua_sys_download_grid',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'doListDetailEdit',
		codeConfirmType: 'statusChanged',
		exprShow: `<never>`,
		header: 'Edit',
		name: 'ua_sys_edit_list',
		owner: 'sys_system'
	})
	init.addTrans('sysUserAction', {
		codeAction: 'doEmbedListConfigEdit',
		codeConfirmType: 'statusChanged',
		exprShow: `<never>`,
		header: 'Edit',
		name: 'ua_sys_embed_list_config_edit',
		owner: 'sys_system'
	})
	init.addTrans('sysUserAction', {
		codeAction: 'doEmbedListConfigNew',
		codeConfirmType: 'statusChanged',
		exprShow: `!(<detailPreset> || <statusChanged>)`,
		header: 'New',
		name: 'ua_sys_embed_list_config_new',
		owner: 'sys_system'
	})
	init.addTrans('sysUserAction', {
		codeAction: 'doEmbedListEditParmValue',
		codeConfirmType: 'statusChanged',
		exprShow: `<never>`,
		header: 'Parameter Value',
		name: 'ua_sys_embed_list_edit_parm_value',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'doEmbedListSelect',
		codeConfirmType: 'statusChanged',
		exprShow: `<never>`,
		header: 'Edit',
		name: 'ua_sys_embed_list_select',
		owner: 'sys_system'
	})

	/* migrate */
	init.addTrans('sysUserAction', {
		codeAction: 'doDetailMigrate',
		codeConfirmType: 'statusChanged',
		exprShow: `!<statusChanged>`,
		header: 'Migrate',
		name: 'ua_sys_migrate',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'doDetailNew',
		codeConfirmType: 'statusChanged',
		exprShow: `!(<detailPreset> || <statusChanged>)`,
		header: 'New',
		name: 'ua_sys_new_detail',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'doDetailNew',
		codeConfirmType: 'statusChanged',
		exprShow: `!<statusChanged>`,
		header: 'New',
		name: 'ua_sys_new_detail_dialog_detail',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'doListDetailNew',
		codeConfirmType: 'statusChanged',
		exprShow: `!<statusChanged>`,
		header: 'New',
		name: 'ua_sys_new_detail_list',
		owner: 'sys_system'
	})
	init.addTrans('sysUserAction', {
		codeAction: 'doDetailProcessExecute',
		header: 'Execute',
		name: 'ua_sys_process_execute',
		owner: 'sys_system'
	})
	init.addTrans('sysUserAction', {
		codeAction: 'doListSelfRefresh',
		codeConfirmType: 'statusChanged',
		header: 'Refresh',
		name: 'ua_sys_refresh_list',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'doDetailSaveAs',
		codeConfirmType: 'statusChanged',
		exprShow: `!(<detailPreset> || <statusChanged>)`,
		header: 'Save As',
		name: 'ua_sys_save_as_detail',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'doSaveCancel',
		codeConfirmType: 'statusChanged',
		exprShow: `<detailPreset> || <statusChanged>`,
		header: 'Cancel Save',
		name: 'ua_sys_save_cancel_detail',
		navDestination: { codeDestinationType: 'back' },
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'doSaveCancel',
		codeConfirmType: 'statusChanged',
		exprShow: `<rootDataObj> && <statusChanged>`,
		header: 'Cancel Save',
		name: 'ua_sys_save_cancel_list',
		navDestination: { codeDestinationType: 'back' },
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'doDetailSave',
		exprEnable: `<statusValid>`,
		exprShow: `<detailPreset> || <statusChanged>`,
		header: 'Save',
		name: 'ua_sys_save_detail',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'doListSelfSave',
		exprEnable: `<statusValid>`,
		exprShow: `<rootDataObj> && <statusChanged>`,
		header: 'Save',
		name: 'ua_sys_save_list',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'doListSelfSave',
		exprEnable: `<statusValid>`,
		exprShow: `<statusChanged>`,
		header: 'Save',
		name: 'ua_sys_save_list_edit',
		owner: 'sys_system'
	})
}
