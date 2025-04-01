import { InitDb } from '$server/dbGel/init/types.init'

export function initPreUserAction(init: InitDb) {
	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'none', codeTriggerConfirmConditional: 'none' }],
		actionShows: [{ codeTriggerShow: 'always', isRequired: true }],
		codeAction: 'resendCode',
		codeTriggerEnable: 'always',
		name: 'ua_ca_sys_auth_resend_code',
		owner: 'sys_system'
	})
	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'none', codeTriggerConfirmConditional: 'none' }],
		actionShows: [{ codeTriggerShow: 'always', isRequired: true }],
		codeAction: 'setUserId',
		codeTriggerEnable: 'always',
		name: 'ua_ca_sys_auth_set_user_id',
		owner: 'sys_system'
	})
	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }],
		actionShows: [{ codeTriggerShow: 'always', isRequired: true }],
		codeAction: 'submit',
		codeTriggerEnable: 'always',
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
		actionShows: [
			{ codeTriggerShow: 'notStatusChanged', isRequired: true },
			{ codeTriggerShow: 'saveModeInsert', isRequired: false },
			{ codeTriggerShow: 'saveModeUpdate', isRequired: false }
		],
		codeAction: 'doDetailDelete',
		codeTriggerEnable: 'always',
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
		actionShows: [{ codeTriggerShow: 'always', isRequired: true }],
		codeAction: 'modalCancel',
		codeTriggerEnable: 'always',
		header: 'Cancel',
		name: 'ua_sys_dialog_cancel',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }],
		actionShows: [{ codeTriggerShow: 'always', isRequired: true }],
		codeAction: 'modalDone',
		codeTriggerEnable: 'always',
		header: 'Done',
		name: 'ua_sys_dialog_done',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'none', codeTriggerConfirmConditional: 'none' }],
		actionShows: [{ codeTriggerShow: 'always', isRequired: true }],
		codeAction: 'doOpenLink',
		codeTriggerEnable: 'always',
		name: 'ua_ca_sys_do_open_link',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }],
		actionShows: [{ codeTriggerShow: 'notStatusChanged', isRequired: true }],
		codeAction: 'doListDownload',
		codeTriggerEnable: 'always',
		header: 'Download',
		name: 'ua_sys_download_grid',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }],
		actionShows: [{ codeTriggerShow: 'never', isRequired: true }],
		codeAction: 'doListDetailEdit',
		codeTriggerEnable: 'always',
		header: 'Edit',
		name: 'ua_sys_edit_list',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }],
		actionShows: [{ codeTriggerShow: 'never', isRequired: true }],
		codeAction: 'doEmbedListConfigEdit',
		codeTriggerEnable: 'always',
		header: 'Edit',
		name: 'ua_sys_embed_list_config_edit',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }],
		actionShows: [
			{ codeTriggerShow: 'notStatusChanged', isRequired: true },
			{ codeTriggerShow: 'statusValid', isRequired: true }
		],
		codeAction: 'doEmbedListConfigNew',
		codeTriggerEnable: 'always',
		header: 'New',
		name: 'ua_sys_embed_list_config_new',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }],
		actionShows: [{ codeTriggerShow: 'never', isRequired: true }],
		codeAction: 'doEmbedListEditParmValue',
		codeTriggerEnable: 'always',
		header: 'Parameter Value',
		name: 'ua_sys_embed_list_edit_parm_value',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }],
		actionShows: [{ codeTriggerShow: 'never', isRequired: true }],
		codeAction: 'doEmbedListSelect',
		codeTriggerEnable: 'always',
		header: 'Edit',
		name: 'ua_sys_embed_list_select',
		owner: 'sys_system'
	})

	/* migrate */
	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }],
		actionShows: [{ codeTriggerShow: 'notStatusChanged', isRequired: true }],
		codeAction: 'doDetailMigrate',
		codeTriggerEnable: 'always',
		header: 'Migrate',
		name: 'ua_sys_migrate',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }],
		actionShows: [{ codeTriggerShow: 'notStatusChanged', isRequired: true }],
		codeAction: 'doDetailNew',
		codeTriggerEnable: 'always',
		header: 'New',
		name: 'ua_sys_new_detail',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }],
		actionShows: [{ codeTriggerShow: 'notStatusChanged', isRequired: true }],
		codeAction: 'doDetailNew',
		codeTriggerEnable: 'always',
		header: 'New',
		name: 'ua_sys_new_detail_dialog_detail',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }],
		actionShows: [{ codeTriggerShow: 'notStatusChanged', isRequired: true }],
		codeAction: 'doListDetailNew',
		codeTriggerEnable: 'always',
		header: 'New',
		name: 'ua_sys_new_detail_list',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'none', codeTriggerConfirmConditional: 'none' }],
		actionShows: [{ codeTriggerShow: 'always', isRequired: true }],
		codeAction: 'doDetailProcessExecute',
		codeTriggerEnable: 'always',
		header: 'Execute',
		name: 'ua_sys_process_execute',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }],
		actionShows: [{ codeTriggerShow: 'always', isRequired: true }],
		codeAction: 'doListSelfRefresh',
		codeTriggerEnable: 'always',
		header: 'Refresh',
		name: 'ua_sys_refresh_list',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }],
		actionShows: [{ codeTriggerShow: 'always', isRequired: true }],
		codeAction: 'doDetailSaveAs',
		codeTriggerEnable: 'always',
		header: 'Save As',
		name: 'ua_sys_save_as_detail',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }],
		actionShows: [
			{ codeTriggerShow: 'statusChanged', isRequired: true },
			{ codeTriggerShow: 'rootDataObj', isRequired: true }
		],
		codeAction: 'doSaveCancel',
		codeTriggerEnable: 'always',
		header: 'Cancel Save',
		name: 'ua_sys_save_cancel',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'none', codeTriggerConfirmConditional: 'none' }],
		actionShows: [
			{ codeTriggerShow: 'statusChanged', isRequired: true },
			{ codeTriggerShow: 'saveModeInsert', isRequired: false },
			{ codeTriggerShow: 'saveModeUpdate', isRequired: false }
		],
		codeAction: 'doDetailSave',
		codeTriggerEnable: 'statusValid',
		header: 'Save',
		name: 'ua_sys_save_detail',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'none', codeTriggerConfirmConditional: 'none' }],
		actionShows: [
			{ codeTriggerShow: 'statusChanged', isRequired: true },
			{ codeTriggerShow: 'rootDataObj', isRequired: true }
		],
		codeAction: 'doListSelfSave',
		codeTriggerEnable: 'statusValid',
		header: 'Save',
		name: 'ua_sys_save_list',
		owner: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		actionConfirms: [{ codeConfirmType: 'none', codeTriggerConfirmConditional: 'none' }],
		actionShows: [{ codeTriggerShow: 'statusChanged', isRequired: true }],
		codeAction: 'doListSelfSave',
		codeTriggerEnable: 'statusValid',
		header: 'Save',
		name: 'ua_sys_save_list_edit',
		owner: 'sys_system'
	})
}
