import { InitDb } from '$server/dbGel/init/types.init'

export function initPreUserAction(init: InitDb) {
	init.addTrans('sysUserAction', {
		codeAction: 'resendCode',
		name: 'ua_ca_sys_auth_resend_code',
		ownerSys: 'sys_system'
	})
	init.addTrans('sysUserAction', {
		codeAction: 'setUserId',
		name: 'ua_ca_sys_auth_set_user_id',
		ownerSys: 'sys_system'
	})
	init.addTrans('sysUserAction', {
		codeAction: 'submit',
		codeConfirmType: 'statusChanged',
		name: 'ua_ca_sys_auth_submit',
		ownerSys: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		actionConfirms: [
			{
				codeConfirmType: 'always',
				codeTriggerConfirmConditional: 'saveModeInsert',
				confirmButtonLabelConfirm: 'Confirm Discard',
				confirmMessage: 'Are you sure you want to discard your data?',
				confirmTitle: 'Discard Data'
			},
			{
				codeConfirmType: 'always',
				codeTriggerConfirmConditional: 'saveModeUpdate',
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
		ownerSys: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		actionConfirms: [
			{
				codeConfirmType: 'always',
				codeTriggerConfirmConditional: 'always',
				confirmButtonLabelConfirm: 'Confirm Delete',
				confirmMessage:
					'Are you sure you want to delete all the records in this list (this action cannot be reversed)?',
				confirmTitle: 'Delete ALL List Records'
			}
		],
		codeAction: 'doListDelete',
		codeConfirmType: 'conditional',
		exprShow: `!(<detailPreset> || <statusChanged>)`,
		header: 'Delete Records',
		name: 'ua_sys_delete_list',
		ownerSys: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		actionConfirms: [
			{
				codeConfirmType: 'statusChanged',
				codeTriggerConfirmConditional: 'always',
				confirmButtonLabelConfirm: 'Confirm Cancel',
				confirmMessage: 'Are you sure you want to discard your data?',
				confirmTitle: 'Cancel'
			}
		],
		codeAction: 'modalCancel',
		codeConfirmType: 'conditional',
		header: 'Cancel',
		name: 'ua_sys_dialog_cancel',
		ownerSys: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'modalDone',
		codeConfirmType: 'statusChanged',
		header: 'Done',
		name: 'ua_sys_dialog_done',
		ownerSys: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'doListDownload',
		codeConfirmType: 'statusChanged',
		exprShow: `!<statusChanged>`,
		header: 'Download',
		name: 'ua_sys_download_grid',
		ownerSys: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'doListDetailEdit',
		codeConfirmType: 'statusChanged',
		exprShow: `<never>`,
		header: 'Edit',
		name: 'ua_sys_edit_list',
		ownerSys: 'sys_system'
	})
	init.addTrans('sysUserAction', {
		codeAction: 'doEmbedListConfigEdit',
		codeConfirmType: 'statusChanged',
		exprShow: `<never>`,
		header: 'Edit',
		name: 'ua_sys_embed_list_config_edit',
		ownerSys: 'sys_system'
	})
	init.addTrans('sysUserAction', {
		codeAction: 'doEmbedListConfigNew',
		codeConfirmType: 'statusChanged',
		exprShow: `!(<detailPreset> || <statusChanged>)`,
		header: 'New',
		name: 'ua_sys_embed_list_config_new',
		ownerSys: 'sys_system'
	})
	init.addTrans('sysUserAction', {
		codeAction: 'doEmbedListEditParmValue',
		codeConfirmType: 'statusChanged',
		exprShow: `<never>`,
		header: 'Parameter Value',
		name: 'ua_sys_embed_list_edit_parm_value',
		ownerSys: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'doEmbedListSelect',
		codeConfirmType: 'statusChanged',
		exprShow: `<never>`,
		header: 'Edit',
		name: 'ua_sys_embed_list_select',
		ownerSys: 'sys_system'
	})

	/* migrate */
	init.addTrans('sysUserAction', {
		codeAction: 'doDetailMigrate',
		codeConfirmType: 'statusChanged',
		exprShow: `!<statusChanged>`,
		header: 'Migrate',
		name: 'ua_sys_migrate',
		ownerSys: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'openNodeFree',
		name: 'ua_ca_sys_nav_open_node_free',
		ownerSys: 'sys_system'
	})
	init.addTrans('sysUserAction', {
		codeAction: 'openNodeFreeAppCustom',
		name: 'ua_ca_sys_nav_open_node_free_custom',
		ownerSys: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'doDetailNew',
		codeConfirmType: 'statusChanged',
		exprShow: `!(<detailPreset> || <statusChanged>)`,
		header: 'New',
		name: 'ua_sys_new_detail',
		ownerSys: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'doDetailNew',
		codeConfirmType: 'statusChanged',
		exprShow: `!<statusChanged>`,
		header: 'New',
		name: 'ua_sys_new_detail_dialog_detail',
		ownerSys: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'doListDetailNew',
		codeConfirmType: 'statusChanged',
		exprShow: `!<statusChanged>`,
		header: 'New',
		name: 'ua_sys_new_detail_list',
		ownerSys: 'sys_system'
	})
	init.addTrans('sysUserAction', {
		codeAction: 'doDetailProcessExecute',
		header: 'Execute',
		name: 'ua_sys_process_execute',
		ownerSys: 'sys_system'
	})
	init.addTrans('sysUserAction', {
		codeAction: 'doListSelfRefresh',
		codeConfirmType: 'statusChanged',
		header: 'Refresh',
		name: 'ua_sys_refresh_list',
		ownerSys: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'doDetailSaveAs',
		codeConfirmType: 'statusChanged',
		exprShow: `!(<detailPreset> || <statusChanged>)`,
		header: 'Save As',
		name: 'ua_sys_save_as_detail',
		ownerSys: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'doSaveCancel',
		codeConfirmType: 'statusChanged',
		exprShow: `<detailPreset> || <statusChanged>`,
		header: 'Cancel Save',
		name: 'ua_sys_save_cancel_detail',
		navDestination: { codeDestinationType: 'back' },
		ownerSys: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'doSaveCancel',
		codeConfirmType: 'statusChanged',
		exprShow: `<rootDataObj> && <statusChanged>`,
		header: 'Cancel Save',
		name: 'ua_sys_save_cancel_list',
		navDestination: { codeDestinationType: 'back' },
		ownerSys: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'doDetailSave',
		exprEnable: `<statusValid>`,
		exprShow: `<detailPreset> || <statusChanged>`,
		header: 'Save',
		name: 'ua_sys_save_detail',
		ownerSys: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'doListSelfSave',
		exprEnable: `<statusValid>`,
		exprShow: `<rootDataObj> && <statusChanged>`,
		header: 'Save',
		name: 'ua_sys_save_list',
		ownerSys: 'sys_system'
	})

	init.addTrans('sysUserAction', {
		codeAction: 'doListSelfSave',
		exprEnable: `<statusValid>`,
		exprShow: `<statusChanged>`,
		header: 'Save',
		name: 'ua_sys_save_list_edit',
		ownerSys: 'sys_system'
	})
}
