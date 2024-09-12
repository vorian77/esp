import { sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities10'
import { addDataObjActionField } from '$server/dbEdge/init/dbEdgeInitUtilities20DataObj'

export async function initPreDataObjAction() {
	sectionHeader('DataObjAction')

	/* delete */
	await addDataObjActionField({
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
			{ codeTriggerShow: 'notObjectChanged', isRequired: true },
			{ codeTriggerShow: 'saveModeInsert', isRequired: false },
			{ codeTriggerShow: 'saveModeUpdate', isRequired: false }
		],
		codeActionFieldType: 'doDetailDelete',
		codeActionFieldTriggerEnable: 'always',
		codeColor: 'red',
		header: 'Delete',
		isListRowAction: false,
		name: 'noa_delete_detail',
		owner: 'app_sys'
	})

	/* dialog */
	await addDataObjActionField({
		actionFieldConfirms: [
			{
				codeConfirmType: 'objectChanged',
				codeTriggerConfirmConditional: 'none',
				confirmButtonLabelConfirm: 'Confirm Cancel',
				confirmMessage: 'Are you sure you want to discard your data?',
				confirmTitle: 'Cancel'
			}
		],
		actionFieldShows: [{ codeTriggerShow: 'always', isRequired: true }],
		codeActionFieldType: 'modalCancel',
		codeActionFieldTriggerEnable: 'always',
		header: 'Cancel',
		isListRowAction: false,
		name: 'noa_dialog_cancel',
		owner: 'app_sys'
	})
	await addDataObjActionField({
		actionFieldConfirms: [
			{ codeConfirmType: 'objectChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'always', isRequired: true }],
		codeActionFieldTriggerEnable: 'always',
		codeActionFieldType: 'modalDone',
		header: 'Done',
		isListRowAction: false,
		name: 'noa_dialog_done',
		owner: 'app_sys'
	})

	/* edit */
	await addDataObjActionField({
		actionFieldConfirms: [
			{ codeConfirmType: 'objectChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'never', isRequired: true }],
		codeActionFieldType: 'doListDetailEdit',
		codeActionFieldTriggerEnable: 'always',
		header: 'Edit',
		isListRowAction: true,
		name: 'noa_edit_list',
		owner: 'app_sys'
	})

	/* embed */
	await addDataObjActionField({
		actionFieldConfirms: [
			{ codeConfirmType: 'objectChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'never', isRequired: true }],
		codeActionFieldType: 'doEmbedListConfigEdit',
		codeActionFieldTriggerEnable: 'parentObjectSaved',
		header: 'Edit',
		isListRowAction: true,
		name: 'noa_embed_list_config_edit',
		owner: 'app_sys'
	})
	await addDataObjActionField({
		actionFieldConfirms: [
			{ codeConfirmType: 'objectChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [
			{ codeTriggerShow: 'notObjectChanged', isRequired: true },
			{ codeTriggerShow: 'parentObjectSaved', isRequired: true }
		],
		codeActionFieldType: 'doEmbedListConfigNew',
		codeActionFieldTriggerEnable: 'parentObjectSaved',
		header: 'New',
		isListRowAction: false,
		name: 'noa_embed_list_config_new',
		owner: 'app_sys'
	})
	await addDataObjActionField({
		actionFieldConfirms: [
			{ codeConfirmType: 'objectChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'never', isRequired: true }],
		codeActionFieldType: 'doEmbedListEditParmValue',
		codeActionFieldTriggerEnable: 'parentObjectSaved',
		header: 'Parameter Value',
		isListRowAction: true,
		name: 'noa_embed_list_edit_parm_value',
		owner: 'app_sys'
	})
	await addDataObjActionField({
		actionFieldConfirms: [
			{ codeConfirmType: 'objectChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'never', isRequired: true }],
		codeActionFieldType: 'doEmbedListSelect',
		codeActionFieldTriggerEnable: 'always',
		header: 'Edit',
		isListRowAction: true,
		name: 'noa_embed_list_select',
		owner: 'app_sys'
	})

	/* export */
	await addDataObjActionField({
		actionFieldConfirms: [
			{ codeConfirmType: 'objectChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'notObjectChanged', isRequired: true }],
		codeActionFieldType: 'doExport',
		codeActionFieldTriggerEnable: 'always',
		header: 'Export',
		isListRowAction: false,
		name: 'noa_export',
		owner: 'app_sys'
	})

	/* new */
	await addDataObjActionField({
		actionFieldConfirms: [
			{ codeConfirmType: 'objectChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'notObjectChanged', isRequired: true }],
		codeActionFieldType: 'doDetailNew',
		codeActionFieldTriggerEnable: 'always',
		header: 'New',
		isListRowAction: false,
		name: 'noa_new_detail',
		owner: 'app_sys'
	})
	await addDataObjActionField({
		actionFieldConfirms: [
			{ codeConfirmType: 'objectChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'notObjectChanged', isRequired: true }],
		codeActionFieldType: 'doDetailNew',
		codeActionFieldTriggerEnable: 'always',
		header: 'New',
		isListRowAction: false,
		name: 'noa_new_detail_dialog_detail',
		owner: 'app_sys'
	})

	await addDataObjActionField({
		actionFieldConfirms: [
			{ codeConfirmType: 'objectChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'notObjectChanged', isRequired: true }],
		codeActionFieldType: 'doListDetailNew',
		codeActionFieldTriggerEnable: 'always',
		header: 'New',
		isListRowAction: false,
		name: 'noa_new_detail_list',
		owner: 'app_sys'
	})

	/* refresh */
	await addDataObjActionField({
		actionFieldConfirms: [
			{ codeConfirmType: 'objectChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'always', isRequired: true }],
		codeActionFieldType: 'doListSelfRefresh',
		codeActionFieldTriggerEnable: 'always',
		header: 'Refresh',
		isListRowAction: false,
		name: 'noa_refresh_list',
		owner: 'app_sys'
	})

	/* save */
	await addDataObjActionField({
		actionFieldConfirms: [
			{ codeConfirmType: 'objectChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'always', isRequired: true }],
		codeActionFieldType: 'doDetailSaveAs',
		codeActionFieldTriggerEnable: 'always',
		header: 'Save As',
		isListRowAction: false,
		name: 'noa_save_as_detail',
		owner: 'app_sys'
	})
	await addDataObjActionField({
		actionFieldConfirms: [{ codeConfirmType: 'none', codeTriggerConfirmConditional: 'none' }],
		actionFieldShows: [
			{ codeTriggerShow: 'objectChanged', isRequired: true },
			{ codeTriggerShow: 'saveModeInsert', isRequired: false },
			{ codeTriggerShow: 'saveModeUpdate', isRequired: false }
		],
		codeActionFieldType: 'doDetailSave',
		codeActionFieldTriggerEnable: 'objectValidToSave',
		header: 'Save',
		isListRowAction: false,
		name: 'noa_save_detail',
		owner: 'app_sys'
	})
	await addDataObjActionField({
		actionFieldConfirms: [
			{ codeConfirmType: 'objectChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'objectChanged', isRequired: true }],
		codeActionFieldType: 'doDetailSaveCancel',
		codeActionFieldTriggerEnable: 'always',
		header: 'Cancel Save',
		isListRowAction: false,
		name: 'noa_save_cancel',
		owner: 'app_sys'
	})

	await addDataObjActionField({
		actionFieldConfirms: [{ codeConfirmType: 'none', codeTriggerConfirmConditional: 'none' }],
		actionFieldShows: [
			{ codeTriggerShow: 'objectChanged', isRequired: true },
			{ codeTriggerShow: 'rootDataObj', isRequired: true }
		],
		codeActionFieldType: 'doListSelfSave',
		codeActionFieldTriggerEnable: 'objectValidToSave',
		header: 'Save',
		isListRowAction: false,
		name: 'noa_save_list',
		owner: 'app_sys'
	})

	await addDataObjActionField({
		actionFieldConfirms: [{ codeConfirmType: 'none', codeTriggerConfirmConditional: 'none' }],
		actionFieldShows: [{ codeTriggerShow: 'objectChanged', isRequired: true }],
		codeActionFieldType: 'doListSelfSave',
		codeActionFieldTriggerEnable: 'objectValidToSave',
		header: 'Save',
		isListRowAction: true,
		name: 'noa_save_list_edit',
		owner: 'app_sys'
	})

	/* special */
	await addDataObjActionField({
		actionFieldConfirms: [
			{ codeConfirmType: 'objectChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'notObjectChanged', isRequired: true }],
		codeActionFieldType: 'doDetailMigrate',
		codeActionFieldTriggerEnable: 'always',
		header: 'Migrate',
		isListRowAction: false,
		name: 'noa_migrate',
		owner: 'app_sys'
	})

	await addDataObjActionField({
		actionFieldConfirms: [{ codeConfirmType: 'none', codeTriggerConfirmConditional: 'none' }],
		actionFieldShows: [{ codeTriggerShow: 'always', isRequired: true }],
		codeActionFieldType: 'doDetailProcessExecute',
		codeActionFieldTriggerEnable: 'always',
		header: 'Execute',
		isListRowAction: false,
		name: 'noa_process_execute',
		owner: 'app_sys'
	})
}
