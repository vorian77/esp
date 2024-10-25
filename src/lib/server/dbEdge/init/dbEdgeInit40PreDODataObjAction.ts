import { sectionHeader } from '$routes/api/dbEdge/dbEdge'
import { addDataObjActionField } from '$server/dbEdge/init/dbEdgeInit200Utilities20DataObj'

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
		codePacketAction: 'doDetailDelete',
		codeActionFieldTriggerEnable: 'always',
		codeColor: 'red',
		header: 'Delete',
		isListRowAction: false,
		name: 'noa_delete_detail',
		owner: 'sys_system_old'
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
		codePacketAction: 'modalCancel',
		codeActionFieldTriggerEnable: 'always',
		header: 'Cancel',
		isListRowAction: false,
		name: 'noa_dialog_cancel',
		owner: 'sys_system_old'
	})
	await addDataObjActionField({
		actionFieldConfirms: [
			{ codeConfirmType: 'objectChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'always', isRequired: true }],
		codeActionFieldTriggerEnable: 'always',
		codePacketAction: 'modalDone',
		header: 'Done',
		isListRowAction: false,
		name: 'noa_dialog_done',
		owner: 'sys_system_old'
	})

	/* edit */
	await addDataObjActionField({
		actionFieldConfirms: [
			{ codeConfirmType: 'objectChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'never', isRequired: true }],
		codePacketAction: 'doListDetailEdit',
		codeActionFieldTriggerEnable: 'always',
		header: 'Edit',
		isListRowAction: true,
		name: 'noa_edit_list',
		owner: 'sys_system_old'
	})

	/* embed */
	await addDataObjActionField({
		actionFieldConfirms: [
			{ codeConfirmType: 'objectChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'never', isRequired: true }],
		codePacketAction: 'doEmbedListConfigEdit',
		codeActionFieldTriggerEnable: 'parentObjectSaved',
		header: 'Edit',
		isListRowAction: true,
		name: 'noa_embed_list_config_edit',
		owner: 'sys_system_old'
	})
	await addDataObjActionField({
		actionFieldConfirms: [
			{ codeConfirmType: 'objectChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [
			{ codeTriggerShow: 'notObjectChanged', isRequired: true },
			{ codeTriggerShow: 'parentObjectSaved', isRequired: true }
		],
		codePacketAction: 'doEmbedListConfigNew',
		codeActionFieldTriggerEnable: 'parentObjectSaved',
		header: 'New',
		isListRowAction: false,
		name: 'noa_embed_list_config_new',
		owner: 'sys_system_old'
	})
	await addDataObjActionField({
		actionFieldConfirms: [
			{ codeConfirmType: 'objectChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'never', isRequired: true }],
		codePacketAction: 'doEmbedListEditParmValue',
		codeActionFieldTriggerEnable: 'parentObjectSaved',
		header: 'Parameter Value',
		isListRowAction: true,
		name: 'noa_embed_list_edit_parm_value',
		owner: 'sys_system_old'
	})
	await addDataObjActionField({
		actionFieldConfirms: [
			{ codeConfirmType: 'objectChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'never', isRequired: true }],
		codePacketAction: 'doEmbedListSelect',
		codeActionFieldTriggerEnable: 'always',
		header: 'Edit',
		isListRowAction: true,
		name: 'noa_embed_list_select',
		owner: 'sys_system_old'
	})

	/* export */
	await addDataObjActionField({
		actionFieldConfirms: [
			{ codeConfirmType: 'objectChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'notObjectChanged', isRequired: true }],
		codePacketAction: 'doExport',
		codeActionFieldTriggerEnable: 'always',
		header: 'Export',
		isListRowAction: false,
		name: 'noa_export',
		owner: 'sys_system_old'
	})

	/* new */
	await addDataObjActionField({
		actionFieldConfirms: [
			{ codeConfirmType: 'objectChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'notObjectChanged', isRequired: true }],
		codePacketAction: 'doDetailNew',
		codeActionFieldTriggerEnable: 'always',
		header: 'New',
		isListRowAction: false,
		name: 'noa_new_detail',
		owner: 'sys_system_old'
	})
	await addDataObjActionField({
		actionFieldConfirms: [
			{ codeConfirmType: 'objectChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'notObjectChanged', isRequired: true }],
		codePacketAction: 'doDetailNew',
		codeActionFieldTriggerEnable: 'always',
		header: 'New',
		isListRowAction: false,
		name: 'noa_new_detail_dialog_detail',
		owner: 'sys_system_old'
	})

	await addDataObjActionField({
		actionFieldConfirms: [
			{ codeConfirmType: 'objectChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'notObjectChanged', isRequired: true }],
		codePacketAction: 'doListDetailNew',
		codeActionFieldTriggerEnable: 'always',
		header: 'New',
		isListRowAction: false,
		name: 'noa_new_detail_list',
		owner: 'sys_system_old'
	})

	/* refresh */
	await addDataObjActionField({
		actionFieldConfirms: [
			{ codeConfirmType: 'objectChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'always', isRequired: true }],
		codePacketAction: 'doListSelfRefresh',
		codeActionFieldTriggerEnable: 'always',
		header: 'Refresh',
		isListRowAction: false,
		name: 'noa_refresh_list',
		owner: 'sys_system_old'
	})

	/* save */
	await addDataObjActionField({
		actionFieldConfirms: [
			{ codeConfirmType: 'objectChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'always', isRequired: true }],
		codePacketAction: 'doDetailSaveAs',
		codeActionFieldTriggerEnable: 'always',
		header: 'Save As',
		isListRowAction: false,
		name: 'noa_save_as_detail',
		owner: 'sys_system_old'
	})
	await addDataObjActionField({
		actionFieldConfirms: [{ codeConfirmType: 'none', codeTriggerConfirmConditional: 'none' }],
		actionFieldShows: [
			{ codeTriggerShow: 'objectChanged', isRequired: true },
			{ codeTriggerShow: 'saveModeInsert', isRequired: false },
			{ codeTriggerShow: 'saveModeUpdate', isRequired: false }
		],
		codePacketAction: 'doDetailSave',
		codeActionFieldTriggerEnable: 'objectValidToSave',
		header: 'Save',
		isListRowAction: false,
		name: 'noa_save_detail',
		owner: 'sys_system_old'
	})
	await addDataObjActionField({
		actionFieldConfirms: [
			{ codeConfirmType: 'objectChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [
			{ codeTriggerShow: 'objectChanged', isRequired: true },
			{ codeTriggerShow: 'rootDataObj', isRequired: true }
		],
		codePacketAction: 'doDetailSaveCancel',
		codeActionFieldTriggerEnable: 'always',
		header: 'Cancel Save',
		isListRowAction: false,
		name: 'noa_save_cancel',
		owner: 'sys_system_old'
	})

	await addDataObjActionField({
		actionFieldConfirms: [{ codeConfirmType: 'none', codeTriggerConfirmConditional: 'none' }],
		actionFieldShows: [
			{ codeTriggerShow: 'objectChanged', isRequired: true },
			{ codeTriggerShow: 'rootDataObj', isRequired: true }
		],
		codePacketAction: 'doListSelfSave',
		codeActionFieldTriggerEnable: 'objectValidToSave',
		header: 'Save',
		isListRowAction: false,
		name: 'noa_save_list',
		owner: 'sys_system_old'
	})

	await addDataObjActionField({
		actionFieldConfirms: [{ codeConfirmType: 'none', codeTriggerConfirmConditional: 'none' }],
		actionFieldShows: [{ codeTriggerShow: 'objectChanged', isRequired: true }],
		codePacketAction: 'doListSelfSave',
		codeActionFieldTriggerEnable: 'objectValidToSave',
		header: 'Save',
		isListRowAction: true,
		name: 'noa_save_list_edit',
		owner: 'sys_system_old'
	})

	/* special */
	await addDataObjActionField({
		actionFieldConfirms: [
			{ codeConfirmType: 'objectChanged', codeTriggerConfirmConditional: 'none' }
		],
		actionFieldShows: [{ codeTriggerShow: 'notObjectChanged', isRequired: true }],
		codePacketAction: 'doDetailMigrate',
		codeActionFieldTriggerEnable: 'always',
		header: 'Migrate',
		isListRowAction: false,
		name: 'noa_migrate',
		owner: 'sys_system_old'
	})

	await addDataObjActionField({
		actionFieldConfirms: [{ codeConfirmType: 'none', codeTriggerConfirmConditional: 'none' }],
		actionFieldShows: [{ codeTriggerShow: 'always', isRequired: true }],
		codePacketAction: 'doDetailProcessExecute',
		codeActionFieldTriggerEnable: 'always',
		header: 'Execute',
		isListRowAction: false,
		name: 'noa_process_execute',
		owner: 'sys_system_old'
	})
}
