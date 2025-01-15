import { InitDb } from '$server/dbEdge/init/types.init'

export function initPreDataObjAction(init: InitDb) {
	/* delete */
	init.addTrans('sysDataObjActionField', {
		actionFieldConfirms: [
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
		actionFieldShows: [
			{ codeTriggerShow: 'notStatusChanged', isRequired: true },
			{ codeTriggerShow: 'saveModeInsert', isRequired: false },
			{ codeTriggerShow: 'saveModeUpdate', isRequired: false }
		],
		codeAction: { codeType: 'ct_sys_code_action_class_do_group_item', name: 'doDetailDelete' },
		codeActionFieldTriggerEnable: 'always',
		codeColor: 'error',
		header: 'Delete',
		isListRowAction: false,
		name: 'ua_delete_detail',
		owner: 'sys_system_old'
	})

	/* dialog */
	init.addTrans('sysDataObjActionField', {
		actionFieldConfirms: [
			{
				codeConfirmType: 'statusChanged',
				codeTriggerConfirmConditional: 'none',
				confirmButtonLabelConfirm: 'Confirm Cancel',
				confirmMessage: 'Are you sure you want to discard your data?',
				confirmTitle: 'Cancel'
			}
		],
		actionFieldShows: [{ codeTriggerShow: 'always', isRequired: true }],
		codeAction: { codeType: 'ct_sys_code_action_class_modal', name: 'modalCancel' },
		codeActionFieldTriggerEnable: 'always',
		header: 'Cancel',
		isListRowAction: false,
		name: 'ua_dialog_cancel',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionField', {
		actionFieldConfirms: [
			{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'always', isRequired: true }],
		codeAction: { codeType: 'ct_sys_code_action_class_modal', name: 'modalDone' },
		codeActionFieldTriggerEnable: 'always',
		header: 'Done',
		isListRowAction: false,
		name: 'ua_dialog_done',
		owner: 'sys_system_old'
	})

	/* edit */
	init.addTrans('sysDataObjActionField', {
		actionFieldConfirms: [
			{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'never', isRequired: true }],
		codeAction: { codeType: 'ct_sys_code_action_class_do_group_item', name: 'doListDetailEdit' },
		codeActionFieldTriggerEnable: 'always',
		header: 'Edit',
		isListRowAction: true,
		name: 'ua_edit_list',
		owner: 'sys_system_old'
	})

	/* embed */
	init.addTrans('sysDataObjActionField', {
		actionFieldConfirms: [
			{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'never', isRequired: true }],
		codeAction: {
			codeType: 'ct_sys_code_action_class_do_group_item',
			name: 'doEmbedListConfigEdit'
		},
		codeActionFieldTriggerEnable: 'always',
		header: 'Edit',
		isListRowAction: true,
		name: 'ua_embed_list_config_edit',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionField', {
		actionFieldConfirms: [
			{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [
			{ codeTriggerShow: 'notStatusChanged', isRequired: true },
			{ codeTriggerShow: 'statusValid', isRequired: true }
		],
		codeAction: {
			codeType: 'ct_sys_code_action_class_do_group_item',
			name: 'doEmbedListConfigNew'
		},
		codeActionFieldTriggerEnable: 'always',
		header: 'New',
		isListRowAction: false,
		name: 'ua_embed_list_config_new',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionField', {
		actionFieldConfirms: [
			{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'never', isRequired: true }],
		codeAction: {
			codeType: 'ct_sys_code_action_class_do_group_item',
			name: 'doEmbedListEditParmValue'
		},
		codeActionFieldTriggerEnable: 'always',
		header: 'Parameter Value',
		isListRowAction: true,
		name: 'ua_embed_list_edit_parm_value',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionField', {
		actionFieldConfirms: [
			{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'never', isRequired: true }],
		codeAction: { codeType: 'ct_sys_code_action_class_do_group_item', name: 'doEmbedListSelect' },
		codeActionFieldTriggerEnable: 'always',
		header: 'Edit',
		isListRowAction: true,
		name: 'ua_embed_list_select',
		owner: 'sys_system_old'
	})

	/* export */
	init.addTrans('sysDataObjActionField', {
		actionFieldConfirms: [
			{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'notStatusChanged', isRequired: true }],
		codeAction: { codeType: 'ct_sys_code_action_class_do_group_item', name: 'doListDownload' },
		codeActionFieldTriggerEnable: 'always',
		header: 'Download',
		isListRowAction: false,
		name: 'ua_download_grid',
		owner: 'sys_system_old'
	})

	/* new */
	init.addTrans('sysDataObjActionField', {
		actionFieldConfirms: [
			{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'notStatusChanged', isRequired: true }],
		codeAction: { codeType: 'ct_sys_code_action_class_do_group_item', name: 'doDetailNew' },
		codeActionFieldTriggerEnable: 'always',
		header: 'New',
		isListRowAction: false,
		name: 'ua_new_detail',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionField', {
		actionFieldConfirms: [
			{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'notStatusChanged', isRequired: true }],
		codeAction: { codeType: 'ct_sys_code_action_class_do_group_item', name: 'doDetailNew' },
		codeActionFieldTriggerEnable: 'always',
		header: 'New',
		isListRowAction: false,
		name: 'ua_new_detail_dialog_detail',
		owner: 'sys_system_old'
	})

	init.addTrans('sysDataObjActionField', {
		actionFieldConfirms: [
			{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'notStatusChanged', isRequired: true }],
		codeAction: { codeType: 'ct_sys_code_action_class_do_group_item', name: 'doListDetailNew' },
		codeActionFieldTriggerEnable: 'always',
		header: 'New',
		isListRowAction: false,
		name: 'ua_new_detail_list',
		owner: 'sys_system_old'
	})

	/* refresh */
	init.addTrans('sysDataObjActionField', {
		actionFieldConfirms: [
			{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'always', isRequired: true }],
		codeAction: { codeType: 'ct_sys_code_action_class_do_group_item', name: 'doListSelfRefresh' },
		codeActionFieldTriggerEnable: 'always',
		header: 'Refresh',
		isListRowAction: false,
		name: 'ua_refresh_list',
		owner: 'sys_system_old'
	})

	/* save */
	init.addTrans('sysDataObjActionField', {
		actionFieldConfirms: [
			{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'always', isRequired: true }],
		codeAction: { codeType: 'ct_sys_code_action_class_do_group_item', name: 'doDetailSaveAs' },
		codeActionFieldTriggerEnable: 'always',
		header: 'Save As',
		isListRowAction: false,
		name: 'ua_save_as_detail',
		owner: 'sys_system_old'
	})
	init.addTrans('sysDataObjActionField', {
		actionFieldConfirms: [{ codeConfirmType: 'none', codeTriggerConfirmConditional: 'none' }],
		actionFieldShows: [
			{ codeTriggerShow: 'statusChanged', isRequired: true },
			{ codeTriggerShow: 'saveModeInsert', isRequired: false },
			{ codeTriggerShow: 'saveModeUpdate', isRequired: false }
		],
		codeAction: { codeType: 'ct_sys_code_action_class_do_group_item', name: 'doDetailSave' },
		codeActionFieldTriggerEnable: 'statusValid',
		header: 'Save',
		isListRowAction: false,
		name: 'ua_save_detail',
		owner: 'sys_system_old'
	})

	init.addTrans('sysDataObjActionField', {
		actionFieldConfirms: [
			{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [
			{ codeTriggerShow: 'statusChanged', isRequired: true },
			{ codeTriggerShow: 'rootDataObj', isRequired: true }
		],
		codeAction: { codeType: 'ct_sys_code_action_class_do_group_item', name: 'doSaveCancel' },
		codeActionFieldTriggerEnable: 'always',
		header: 'Cancel Save',
		isListRowAction: false,
		name: 'ua_save_cancel',
		owner: 'sys_system_old'
	})

	init.addTrans('sysDataObjActionField', {
		actionFieldConfirms: [{ codeConfirmType: 'none', codeTriggerConfirmConditional: 'none' }],
		actionFieldShows: [
			{ codeTriggerShow: 'statusChanged', isRequired: true },
			{ codeTriggerShow: 'rootDataObj', isRequired: true }
		],
		codeAction: { codeType: 'ct_sys_code_action_class_do_group_item', name: 'doListSelfSave' },
		codeActionFieldTriggerEnable: 'statusValid',
		header: 'Save',
		isListRowAction: false,
		name: 'ua_save_list',
		owner: 'sys_system_old'
	})

	init.addTrans('sysDataObjActionField', {
		actionFieldConfirms: [{ codeConfirmType: 'none', codeTriggerConfirmConditional: 'none' }],
		actionFieldShows: [{ codeTriggerShow: 'statusChanged', isRequired: true }],
		codeAction: { codeType: 'ct_sys_code_action_class_do_group_item', name: 'doListSelfSave' },
		codeActionFieldTriggerEnable: 'statusValid',
		header: 'Save',
		isListRowAction: true,
		name: 'ua_save_list_edit',
		owner: 'sys_system_old'
	})

	/* special */
	init.addTrans('sysDataObjActionField', {
		actionFieldConfirms: [
			{ codeConfirmType: 'statusChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'notStatusChanged', isRequired: true }],
		codeAction: { codeType: 'ct_sys_code_action_class_do_group_item', name: 'doDetailMigrate' },
		codeActionFieldTriggerEnable: 'always',
		header: 'Migrate',
		isListRowAction: false,
		name: 'ua_migrate',
		owner: 'sys_system_old'
	})

	init.addTrans('sysDataObjActionField', {
		actionFieldConfirms: [{ codeConfirmType: 'none', codeTriggerConfirmConditional: 'none' }],
		actionFieldShows: [{ codeTriggerShow: 'always', isRequired: true }],
		codeAction: {
			codeType: 'ct_sys_code_action_class_do_group_item',
			name: 'doDetailProcessExecute'
		},
		codeActionFieldTriggerEnable: 'always',
		header: 'Execute',
		isListRowAction: false,
		name: 'ua_process_execute',
		owner: 'sys_system_old'
	})
}
