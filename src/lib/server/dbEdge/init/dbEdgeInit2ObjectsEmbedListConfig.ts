import { sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities10'
import {
	addDataObj,
	addDataObjFieldEmbedListConfig
} from '$server/dbEdge/init/dbEdgeInitUtilities20DataObj'

export async function initAdminSysEmbedListConfig() {
	sectionHeader('SysAdmin - Embed - List Config')

	await initFieldListConfigDataObjActionFieldConfirms()
	await initFieldListConfigDataObjActionFieldShows()

	await initFieldListConfigDataObjActionQueryParm()
	await initFieldListConfigDataObjActionQueryTrigger()

	await initFieldListConfigDataObjActionFieldGroupItem()

	await initFieldListConfigDataObjColumnItem()
	await initFieldListConfigDataObjColumnLink()
	await initFieldListConfigDataObjTable()
	await initFieldListConfigUserTypeResource()
}

async function initFieldListConfigDataObjActionFieldConfirms() {
	sectionHeader('Field Actions - Data Obj Action Field Confirm')

	await addDataObj({
		actionFieldGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		header: 'Data Object Action Field - Confirms',
		name: 'doflc_sys_admin_data_obj_action_field_confirm_list',
		owner: 'sys_app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjActionFieldConfirm' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeConfirmType',
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeTriggerConfirmConditional',
				orderSort: 20,
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysCode'
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Data Object Action Field - Confirm',
		name: 'doflc_sys_admin_data_obj_action_field_confirm_detail',
		owner: 'sys_app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjActionFieldConfirm' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeConfirmType',
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_action_field_confirm_type',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeTriggerConfirmConditional',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_action_field_confirm_type',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				columnName: 'confirmButtonLabelCancel',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'confirmButtonLabelConfirm',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'confirmMessage',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'confirmTitle',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})

	await addDataObjFieldEmbedListConfig({
		actionFieldGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_sys_admin_data_obj_action_field_confirm_list',
		dataObjModal: 'doflc_sys_admin_data_obj_action_field_confirm_detail',
		name: 'flec_data_obj_action_field_confirm',
		owner: 'sys_app_sys_admin'
	})
}

async function initFieldListConfigDataObjActionFieldShows() {
	sectionHeader('Field Actions - Data Obj Action Field Show')

	await addDataObj({
		actionFieldGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		header: 'Data Object Action Field - Shows',
		name: 'doflc_sys_admin_data_obj_action_field_show_list',
		owner: 'sys_app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjActionFieldShow' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeTriggerShow',
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isRequired',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Data Object Action Field - Show',
		name: 'doflc_sys_admin_data_obj_action_field_show_detail',
		owner: 'sys_app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjActionFieldShow' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeTriggerShow',
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_action_field_trigger',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isRequired',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})

	await addDataObjFieldEmbedListConfig({
		actionFieldGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_sys_admin_data_obj_action_field_show_list',
		dataObjModal: 'doflc_sys_admin_data_obj_action_field_show_detail',
		name: 'flec_data_obj_action_field_show',
		owner: 'sys_app_sys_admin'
	})
}

async function initFieldListConfigDataObjActionQueryParm() {
	sectionHeader('Field List Config - DataObjActionQueryParm')

	await addDataObj({
		actionFieldGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		header: 'Data Object Action Query - Parameters',
		name: 'doflc_sys_admin_data_obj_action_query_parm_list',
		owner: 'sys_app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjActionQueryParm' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'key',
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'value',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Data Object Action Query - Parameter',
		name: 'doflc_sys_admin_data_obj_action_query_parm_detail',
		owner: 'sys_app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjActionQueryParm' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20
			},
			{
				columnName: 'key',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				columnName: 'value',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})

	await addDataObjFieldEmbedListConfig({
		actionFieldGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_sys_admin_data_obj_action_query_parm_list',
		dataObjModal: 'doflc_sys_admin_data_obj_action_query_parm_detail',
		name: 'flec_data_obj_action_query_parm',
		owner: 'sys_app_sys_admin'
	})
}

async function initFieldListConfigDataObjActionQueryTrigger() {
	sectionHeader('Field List Config - DataObjActionQueryTrigger')

	await addDataObj({
		actionFieldGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		header: 'Data Object Action Query - Triggers',
		name: 'doflc_sys_admin_data_obj_action_query_trigger_list',
		owner: 'sys_app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjActionQueryTrigger' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeQueryType',
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeTriggerTiming',
				orderSort: 20,
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysCode'
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Data Object Action Query - Trigger',
		name: 'doflc_sys_admin_data_obj_action_query_trigger_detail',
		owner: 'sys_app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjActionQueryTrigger' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeQueryType',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_query_type',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeTriggerTiming',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_action_query_trigger_timing',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})

	await addDataObjFieldEmbedListConfig({
		actionFieldGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_sys_admin_data_obj_action_query_trigger_list',
		dataObjModal: 'doflc_sys_admin_data_obj_action_query_trigger_detail',
		name: 'flec_data_obj_action_query_trigger',
		owner: 'sys_app_sys_admin'
	})
}

async function initFieldListConfigDataObjActionFieldGroupItem() {
	sectionHeader('Field Action Group - Data Obj Action Field Group Item')

	await addDataObj({
		actionFieldGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		header: 'Action Field Items',
		listReorderColumn: 'orderDefine',
		name: 'doflc_sys_admin_data_obj_action_field_group_item_list',
		owner: 'sys_app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjActionFieldGroupItem' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'action',
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				columnName: 'orderDefine',
				orderDefine: 30,
				indexTable: 0,
				isDisplayable: false
			},

			/* management */
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1010
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1020
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1030
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1040
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Action Field Item',
		name: 'doflc_sys_admin_data_obj_action_field_group_item_detail',
		owner: 'sys_app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjActionFieldGroupItem' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeFieldElement: 'select',
				columnName: 'action',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				fieldListItems: 'il_sys_data_obj_action_field_order_name',
				linkTable: 'SysDataObjActionField'
			},
			{
				columnName: 'orderDefine',
				orderDefine: 30,
				exprPreset: `(SELECT count((SELECT sys_core::SysDataObjActionFieldGroupItem
					FILTER .id IN ((SELECT sys_core::SysDataObjActionFieldGroup FILTER .id = <parms,uuid,embedParentId>).actionFieldItems.id))) + 1)`,
				indexTable: 0,
				isDisplayable: false
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})

	await addDataObjFieldEmbedListConfig({
		actionFieldGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_sys_admin_data_obj_action_field_group_item_list',
		dataObjModal: 'doflc_sys_admin_data_obj_action_field_group_item_detail',
		name: 'flec_data_obj_action_field_group_item',
		owner: 'sys_app_sys_admin'
	})
}

async function initFieldListConfigDataObjColumnItem() {
	sectionHeader('Embed List Configs - SysDataObjColumnItem')

	await addDataObj({
		actionFieldGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		header: 'Items',
		name: 'doflc_sys_admin_data_obj_column_item_list',
		listReorderColumn: 'orderDefine',
		owner: 'sys_app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjColumnItem' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'display',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'data',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				columnName: 'orderDefine',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 40
			},

			/* management */
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1010
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1020
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1030
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1040
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Item',
		name: 'doflc_sys_admin_data_obj_column_item_detail',
		owner: 'sys_app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjColumnItem' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20
			},
			{
				columnName: 'display',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				columnName: 'data',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50
			},
			{
				columnName: 'orderDefine',
				orderDefine: 60,
				exprPreset: `(SELECT 1000)`,
				indexTable: 0,
				isDisplayable: false
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})

	await addDataObjFieldEmbedListConfig({
		actionFieldGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_sys_admin_data_obj_column_item_list',
		dataObjModal: 'doflc_sys_admin_data_obj_column_item_detail',
		name: 'flec_data_obj_data_obj_column_item',
		owner: 'sys_app_sys_admin'
	})
}

async function initFieldListConfigDataObjColumnLink() {
	sectionHeader('Data Object Column - Link')

	await addDataObj({
		actionFieldGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: `.id IN (SELECT sys_core::SysDataObjColumn FILTER .id = <parms,uuid,embedParentId>).linkColumns.id`,
		header: 'Data Object Link Columns',
		listReorderColumn: 'orderDefine',
		name: 'doflc_sys_admin_data_obj_column_link_list',
		owner: 'sys_app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjColumnLink' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'column',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				columnName: 'orderDefine',
				orderDefine: 30,
				indexTable: 0,
				isDisplayable: false
			},

			/* management */
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1010
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1020
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1030
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1040
			}
		]
	})
	await addDataObj({
		actionFieldGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Data Object Link Column',
		name: 'doflc_sys_admin_data_obj_column_link_detail',
		owner: 'sys_app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjColumnLink' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeFieldElement: 'select',
				columnName: 'column',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				fieldListItems: 'il_sys_column_order_name',
				linkTable: 'SysColumn'
			},
			{
				columnName: 'orderDefine',
				orderDefine: 30,
				exprPreset: `(SELECT 1000)`,
				indexTable: 0,
				isDisplayable: false
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})

	await addDataObjFieldEmbedListConfig({
		actionFieldGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_sys_admin_data_obj_column_link_list',
		dataObjModal: 'doflc_sys_admin_data_obj_column_link_detail',
		name: 'flec_data_obj_column_link',
		owner: 'sys_app_sys_admin'
	})
}

async function initFieldListConfigDataObjTable() {
	sectionHeader('Field List Config - SysDataObjTable')

	await addDataObj({
		actionFieldGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		header: 'Data Object - Tables',
		name: 'doflc_sys_admin_data_obj_table_list',
		owner: 'sys_app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjTable' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'index',
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'table',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'indexParent',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				headerAlt: 'Parent Table Index',
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'columnParent',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				headerAlt: 'Parent Table Column',
				indexTable: 0,
				linkColumns: ['name']
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Data Object - Table',
		name: 'doflc_sys_admin_data_obj_table_detail',
		owner: 'sys_app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjTable' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'index',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'table',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				fieldListItems: 'il_sys_table_order_name',
				linkTable: 'SysTable'
			},
			{
				codeAccess: 'optional',
				columnName: 'indexParent',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,

				headerAlt: 'Parent Table Index',
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'columnParent',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,

				fieldListItems: 'il_sys_column_order_name',
				headerAlt: 'Parent Table Column',
				indexTable: 0,
				linkTable: 'SysColumn'
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})

	await addDataObjFieldEmbedListConfig({
		actionFieldGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_sys_admin_data_obj_table_list',
		dataObjModal: 'doflc_sys_admin_data_obj_table_detail',
		name: 'flec_data_obj_table',
		owner: 'sys_app_sys_admin'
	})
}

async function initFieldListConfigUserTypeResource() {
	sectionHeader('Field List Config - UserTypeResources')

	await addDataObj({
		actionFieldGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		header: 'User Type Resources',
		name: 'doflc_sys_admin_user_type_resource_list',
		owner: 'sys_app_sys_admin',
		tables: [{ index: 0, table: 'SysUserTypeResource' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeUserTypeResource',
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 10,
				orderDefine: 10,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'userTypeResource',
				orderSort: 20,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isAccessible',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'User Type Resource',
		name: 'doflc_sys_admin_user_type_resource_detail',
		owner: 'sys_app_sys_admin',
		tables: [{ index: 0, table: 'SysUserTypeResource' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeUserTypeResource',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_user_type_resource_type',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'select',
				columnName: 'userTypeResource',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,

				fieldListItems: 'il_sys_user_type_resource',
				indexTable: 0,
				linkTable: 'SysObj'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isAccessible',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			}
		]
	})

	await addDataObjFieldEmbedListConfig({
		actionFieldGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_sys_admin_user_type_resource_list',
		dataObjModal: 'doflc_sys_admin_user_type_resource_detail',
		name: 'flec_user_type_resource',
		owner: 'sys_app_sys_admin'
	})
}
