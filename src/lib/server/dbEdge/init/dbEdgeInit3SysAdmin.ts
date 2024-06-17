import { sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import {
	addDataObj,
	addDataObjFieldEmbedListConfig,
	addDataObjFieldEmbedListSelect,
	addNodeProgramObj
} from '$server/dbEdge/init/dbEdgeInitUtilities2'

export async function initAdminSys() {
	sectionHeader('SysAdmin')

	await initFieldListConfigDataObjActionFieldConfirms()
	await initFieldListConfigDataObjActionFieldShows()

	await initFieldListConfigDataObjActionQueryParm()
	await initFieldListConfigDataObjActionQueryTrigger()

	await initFieldListConfigDataObjActionFieldGroupItem()

	await initFieldListConfigDataObjColumnItem()
	await initFieldListConfigDataObjColumnLink()
	await initFieldListConfigDataObjTable()
	await initFieldListConfigUserTypeResource()

	await initFieldListSelectCodes()
	await initFieldListSelectColumns()

	await initResource()
	await initCodeType()
	await initCodeTypeCode()
	await initCode()
	await initDataObj()
	await initDataObjColumn()
	await initDataObjActionsQuery()

	await initColumn()
	await initDataObjActionField()
	await initDataObjActionFieldGroup()
	await initDataObjFielEmbedDetail()
	await initDataObjFielEmbedListConfig()
	await initDataObjFieldEmbedListEdit()
	await initDataObjFieldEmbedListSelect()
	await initDataObjFieldListItems()
	await initDataObjNodeObj()
	await initTable()

	await initUserType()
}

async function initFieldListConfigDataObjActionFieldConfirms() {
	sectionHeader('Field List Config - DataObjActionFieldConfirms')

	await addDataObj({
		actionFieldGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		header: 'Data Object Action Field - Confirms',
		name: 'doflc_sys_admin_data_obj_action_field_confirm_list',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjActionFieldConfirm' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeConfirmType',
				orderSort: 10,
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
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjActionFieldConfirm' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeConfirmType',
				orderSort: 10,
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
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'confirmButtonLabelConfirm',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'confirmMessage',
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'confirmTitle',
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
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
		owner: 'app_sys_admin'
	})
}

async function initFieldListConfigDataObjActionFieldShows() {
	sectionHeader('Field List Config - DataObjActionFieldShows')

	await addDataObj({
		actionFieldGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		header: 'Data Object Action Field - Shows',
		name: 'doflc_sys_admin_data_obj_action_field_show_list',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjActionFieldShow' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeTriggerShow',
				orderSort: 10,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isRequired',
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
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjActionFieldShow' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeTriggerShow',
				orderSort: 10,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_action_field_trigger',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isRequired',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
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
		owner: 'app_sys_admin'
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
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjActionQueryParm' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'key',
				orderSort: 10,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'value',
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
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjActionQueryParm' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'key',
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				columnName: 'value',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
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
		owner: 'app_sys_admin'
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
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjActionQueryTrigger' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeQueryType',
				orderSort: 10,
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
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjActionQueryTrigger' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeQueryType',
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_query_type',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeTriggerTiming',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_action_query_trigger_timing',
				linkTable: 'SysCode'
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
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
		owner: 'app_sys_admin'
	})
}

async function initFieldListConfigDataObjActionFieldGroupItem() {
	sectionHeader('Field List Config - DataObjActionFieldGroupItem')

	await addDataObj({
		actionFieldGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		header: 'Action Field Items',
		listReorderColumn: 'orderDefine',
		name: 'doflc_sys_admin_data_obj_action_field_group_item_list',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjActionFieldGroupItem' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'action',
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				columnName: 'orderDefine',
				orderSort: 10,
				orderDefine: 30,
				indexTable: 0
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Action field Item',
		name: 'doflc_sys_admin_data_obj_action_field_group_item_detail',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjActionFieldGroupItem' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'action',
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
					FILTER .id IN ((SELECT sys_core::SysDataObjActionFieldGroup FILTER .id = <parms,uuid,listRecordIdParent>).actions.id))) + 1)`,
				indexTable: 0
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
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
		owner: 'app_sys_admin'
	})
}

async function initFieldListConfigDataObjColumnItem() {
	sectionHeader('Field List Config - SysDataObjColumnItem')

	await addDataObj({
		actionFieldGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		header: 'Items',
		name: 'doflc_sys_admin_data_obj_column_item_list',
		listReorderColumn: 'orderDefine',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjColumnItem' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'display',
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'data',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				columnName: 'orderDefine',
				orderSort: 10,
				orderDefine: 40,
				indexTable: 0
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Item',
		name: 'doflc_sys_admin_data_obj_column_item_detail',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjColumnItem' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'display',
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				columnName: 'data',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				columnName: 'orderDefine',
				orderDefine: 40,

				exprPreset: `(SELECT 1000)`,
				indexTable: 0
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
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
		owner: 'app_sys_admin'
	})
}

async function initFieldListConfigDataObjColumnLink() {
	sectionHeader('Field List Config - DataObjColumn')

	await addDataObj({
		actionFieldGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: `.id IN (SELECT sys_core::SysDataObjColumn FILTER .id = <parms,uuid,listRecordIdParent>).linkColumns.id`,
		header: 'Data Object Link Columns',
		listReorderColumn: 'orderDefine',
		name: 'doflc_sys_admin_data_obj_column_link_list',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjColumnLink' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'column',
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				columnName: 'orderDefine',
				orderSort: 10,
				orderDefine: 30,
				indexTable: 0
			}
		]
	})
	await addDataObj({
		actionFieldGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Data Object Link Column',
		name: 'doflc_sys_admin_data_obj_column_link_detail',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjColumnLink' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeFieldElement: 'select',
				columnName: 'column',
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
				indexTable: 0
			},

			/* management */
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1000,
				orderDefine: 1000,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			}
		]
	})

	await addDataObjFieldEmbedListConfig({
		actionFieldGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_sys_admin_data_obj_column_link_list',
		dataObjModal: 'doflc_sys_admin_data_obj_column_link_detail',
		name: 'flec_data_obj_column_link',
		owner: 'app_sys_admin'
	})
}

async function initFieldListConfigDataObjTable() {
	sectionHeader('Field List Config - SysDataObjTable')

	await addDataObj({
		actionFieldGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		header: 'Data Object - Tables',
		listReorderColumn: 'index',
		name: 'doflc_sys_admin_data_obj_table_list',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjTable' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'index',
				orderSort: 10,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'table',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'indexParent',
				orderDisplay: 40,
				orderDefine: 40,
				headerAlt: 'Parent Table Index',
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'columnParent',
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
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjTable' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'index',
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'table',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				fieldListItems: 'il_sys_table_order_name',
				linkTable: 'SysTable'
			},
			{
				codeAccess: 'optional',
				columnName: 'indexParent',
				orderDisplay: 40,
				orderDefine: 40,

				headerAlt: 'Parent Table Index',
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'columnParent',
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
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
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
		owner: 'app_sys_admin'
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
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysUserTypeResource' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeUserTypeResource',
				orderSort: 10,
				orderDisplay: 10,
				orderDefine: 10,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'userTypeResource',
				orderSort: 20,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isAccessible',
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
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysUserTypeResource' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeUserTypeResource',
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
				orderDisplay: 30,
				orderDefine: 30,

				fieldListItems: 'il_sys_user_type_resource',
				indexTable: 0,
				linkTable: 'SysObj'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isAccessible',
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
		owner: 'app_sys_admin'
	})
}

async function initFieldListSelectCodes() {
	sectionHeader('Field List Select - Codes')
	await addDataObj({
		actionFieldGroup: 'doag_embed_list_select',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: 'none',
		header: 'Select Codes',
		name: 'dofls_sys_admin_sys_code',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysCode' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeType',
				orderSort: 10,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysCodeType'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderSort: 20,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			}
		]
	})

	await addDataObjFieldEmbedListSelect({
		actionFieldGroupModal: 'doag_dialog_footer_list',
		btnLabelComplete: 'Select Code(s)',
		dataObjList: 'dofls_sys_admin_sys_code',
		name: 'fels_sys_code',
		owner: 'app_sys_admin'
	})
}

async function initFieldListSelectColumns() {
	sectionHeader('Field List Select - Columns')
	await addDataObj({
		actionFieldGroup: 'doag_embed_list_select',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: 'none',
		header: 'Select Columns',
		name: 'dofls_sys_admin_sys_column',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysColumn' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 10,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			}
		]
	})

	await addDataObjFieldEmbedListSelect({
		actionFieldGroupModal: 'doag_dialog_footer_list',
		btnLabelComplete: 'Select Column(s)',
		dataObjList: 'dofls_sys_admin_sys_column',
		name: 'fels_sys_column',
		owner: 'app_sys_admin'
	})
}

async function initResource() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: 'none',
		header: 'Resources',
		name: 'data_obj_sys_admin_resource_list',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysResource' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 10,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Rsource',
		name: 'data_obj_sys_admin_resource_detail',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysResource' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isExcludeDisplayAlt: true,
				linkExprSave: `(SELECT sys_core::getOrg('System'))`,
				linkTable: 'SysOrg'
			},
			{
				columnName: 'name',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'header',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				matchColumn: 'name'
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_resource_list',
		header: 'Resources',
		name: 'node_obj_sys_admin_resource_list',
		orderDefine: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_pgm_sys_admin'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_resource_detail',
		header: 'Resource',
		name: 'node_obj_sys_admin_resource_detail',
		orderDefine: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_resource_list'
	})
}

async function initCodeType() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <tree,uuid,SysResource.id>',
		header: 'Code Types',
		name: 'data_obj_sys_admin_code_type_list',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysCodeType' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'parent',
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 10,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'order',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Code Type',
		name: 'data_obj_sys_admin_code_type_detail',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysCodeType' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isExcludeDisplayAlt: true,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'parent',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				fieldListItems: 'il_sys_codeType_order_name',
				linkTable: 'SysCodeType'
			},
			{
				columnName: 'name',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'header',
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'number',
				columnName: 'order',
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 80,
				orderDefine: 80
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_code_type_list',
		header: 'Code Types',
		name: 'node_obj_sys_admin_code_type_list',
		orderDefine: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_resource_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_code_type_detail',
		header: 'Code Type',
		name: 'node_obj_sys_admin_code_type_detail',
		orderDefine: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_code_type_list'
	})
}

async function initCodeTypeCode() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.codeType.id = <tree,uuid,SysCodeType.id>',
		header: 'Codes',
		name: 'data_obj_sys_admin_code_list_codeType',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysCode' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'parent',
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 20,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'valueDecimal',
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'valueInteger',
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'valueString',
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'order',
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Code',
		name: 'data_obj_sys_admin_code_detail_codeType',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysCode' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'codeType',
				orderDefine: 20,
				indexTable: 0,
				isExcludeDisplayAlt: true,
				linkExprSave: `(SELECT sys_core::SysCodeType FILTER .id = <tree,uuid,SysCodeType.id>)`,
				linkTable: 'SysCodeType'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeFieldElement: 'select',
				columnName: 'owner',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				fieldListItems: 'il_sys_resource_order_name',
				linkTable: 'SysResource'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'parent',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_code_parent',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				columnName: 'name',
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'header',
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 100,
				orderDefine: 100
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 110,
				orderDefine: 110
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'number',
				columnName: 'valueDecimal',
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 0
			},
			{
				codeFieldElement: 'number',
				codeAccess: 'optional',
				columnName: 'valueInteger',
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'valueString',
				orderDisplay: 140,
				orderDefine: 140,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'number',
				columnName: 'order',
				orderDisplay: 150,
				orderDefine: 150,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 160,
				orderDefine: 160
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_code_list_codeType',
		header: 'Codes',
		name: 'node_obj_sys_admin_code_list_codeType',
		orderDefine: 15,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_code_type_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_code_detail_codeType',
		header: 'Code',
		name: 'node_obj_sys_admin_code_detail_codeType',
		orderDefine: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_code_list_codeType'
	})
}

async function initCode() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <tree,uuid,SysResource.id>',
		header: 'Codes',
		name: 'data_obj_sys_admin_code_list',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysCode' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'parent',
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeType',
				orderSort: 10,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 20,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'valueDecimal',
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'valueInteger',
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'valueString',
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'order',
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Code',
		name: 'data_obj_sys_admin_code_detail',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysCode' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isExcludeDisplayAlt: true,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeType',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				fieldListItems: 'il_sys_codeType_order_name',
				linkTable: 'SysCodeType'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'parent',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_code_parent',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				columnName: 'name',
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'header',
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 100,
				orderDefine: 100
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 110,
				orderDefine: 110
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'number',
				columnName: 'valueDecimal',
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 0
			},
			{
				codeFieldElement: 'number',
				codeAccess: 'optional',
				columnName: 'valueInteger',
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'valueString',
				orderDisplay: 140,
				orderDefine: 140,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'number',
				columnName: 'order',
				orderDisplay: 150,
				orderDefine: 150,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 160,
				orderDefine: 160
			},
			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_code_list',
		header: 'Codes',
		name: 'node_obj_sys_admin_code_list',
		orderDefine: 15,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_resource_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_code_detail',
		header: 'Code',
		name: 'node_obj_sys_admin_code_detail',
		orderDefine: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_code_list'
	})
}

async function initColumn() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <tree,uuid,SysResource.id>',
		header: 'Columns',
		name: 'data_obj_sys_admin_column_list',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysColumn' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 10,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Column',
		name: 'data_obj_sys_admin_column_detail',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysColumn' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isExcludeDisplayAlt: true,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				columnName: 'name',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				columnName: 'header',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'headerSide',
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeDataType',
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_db_col_data_type',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeAlignment',
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_db_col_alignment',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				columnName: 'placeHolder',
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 100,
				orderDefine: 100
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_start',
				orderDisplay: 110,
				orderDefine: 110,
				headerAlt: 'Database'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 120,
				orderDefine: 120
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isExcludeDisplay',
				orderDisplay: 125,
				orderDefine: 125,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isExcludeInsert',
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isExcludeSelect',
				orderDisplay: 140,
				orderDefine: 140,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isExcludeUpdate',
				orderDisplay: 150,
				orderDefine: 150,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isNonData',
				exprPreset: `(SELECT false)`,
				indexTable: 0,
				orderDisplay: 160,
				orderDefine: 160
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isSelfReference',
				orderDisplay: 170,
				orderDefine: 170,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 180,
				orderDefine: 180
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				orderDisplay: 190,
				orderDefine: 190
			},
			{
				codeFieldElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'File' },
				orderDisplay: 200,
				orderDefine: 200,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'exprStorageKey',
				orderDisplay: 210,
				orderDefine: 210,
				indexTable: 0
			},
			{
				codeFieldElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'Link' },
				orderDisplay: 220,
				orderDefine: 220,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isMultiSelect',
				orderDisplay: 230,
				orderDefine: 230,
				indexTable: 0
			},
			{
				codeFieldElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'Numeric' },
				orderDisplay: 240,
				orderDefine: 240,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 250,
				orderDefine: 250
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'numeric',
				columnName: 'minValue',
				orderDisplay: 260,
				orderDefine: 260,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'numeric',
				columnName: 'maxValue',
				orderDisplay: 270,
				orderDefine: 270,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'spinStep',
				orderDisplay: 280,
				orderDefine: 280,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 290,
				orderDefine: 290
			},
			{
				codeFieldElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'String' },
				orderDisplay: 300,
				orderDefine: 300,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 310,
				orderDefine: 310
			},
			{
				codeAccess: 'optional',
				columnName: 'matchColumn',
				orderDisplay: 320,
				orderDefine: 320,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'numeric',
				columnName: 'minLength',
				orderDisplay: 330,
				orderDefine: 330,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'numeric',
				columnName: 'maxLength',
				orderDisplay: 340,
				orderDefine: 340,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 350,
				orderDefine: 350
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 360,
				orderDefine: 360
			},
			{
				codeAccess: 'optional',
				columnName: 'pattern',
				orderDisplay: 370,
				orderDefine: 370,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'patternMsg',
				orderDisplay: 380,
				orderDefine: 380,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'patternReplacement',
				orderDisplay: 390,
				orderDefine: 390,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 400,
				orderDefine: 400
			},
			{
				codeFieldElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'Toggle' },
				orderDisplay: 410,
				orderDefine: 410,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 420,
				orderDefine: 420
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'togglePresetTrue',
				orderDisplay: 430,
				orderDefine: 430,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'toggleValueShow',
				orderDisplay: 440,
				orderDefine: 440,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'toggleValueTrue',
				orderDisplay: 450,
				orderDefine: 450,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'toggleValueFalse',
				orderDisplay: 460,
				orderDefine: 460,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 470,
				orderDefine: 470
			},
			{
				codeFieldElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'Text Area' },
				orderDisplay: 480,
				orderDefine: 480,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'classProps',
				orderDisplay: 490,
				orderDefine: 490,
				indexTable: 0
			},
			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_column_list',
		header: 'Columns',
		name: 'node_obj_sys_admin_column_list',
		orderDefine: 17,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_resource_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_column_detail',
		header: 'Column',
		name: 'node_obj_sys_admin_column_detail',
		orderDefine: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_column_list'
	})
}

async function initDataObj() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <tree,uuid,SysResource.id>',
		header: 'Data Objects',
		name: 'data_obj_sys_admin_data_obj_list',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObj' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 10,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Data Object',
		name: 'data_obj_sys_admin_data_obj_detail',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObj' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isExcludeDisplayAlt: true,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 25,
				orderDefine: 25
			},
			{
				columnName: 'name',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeCardinality',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_cardinality',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeComponent',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_component',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 55,
				orderDefine: 55
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 57,
				orderDefine: 57
			},
			{
				codeAccess: 'optional',
				columnName: 'header',
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'subHeader',
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 75,
				orderDefine: 75
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'description',
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 85,
				orderDefine: 85
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'actionFieldGroup',
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0,
				fieldListItems: 'il_sys_data_obj_action_field_group_order_name',
				linkTable: 'SysDataObjActionFieldGroup'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'processType',
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_dynamic_process_type',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isAlwaysRetrieveData',
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isAlwaysRetrieveDataObject',
				orderDisplay: 115,
				orderDefine: 115,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 120,
				orderDefine: 120
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'exprFilter',
				orderDisplay: 125,
				orderDefine: 125,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'exprObject',
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'exprSort',
				orderDisplay: 140,
				orderDefine: 140,
				indexTable: 0
			},

			/* parent */
			{
				codeFieldElement: 'tagSection',
				codeColor: 'blue',
				columnName: 'custom_section_start',
				orderDisplay: 160,
				orderDefine: 160,
				headerAlt: 'Parent'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 170,
				orderDefine: 170
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'parentTable',
				orderDisplay: 180,
				orderDefine: 180,
				indexTable: 0,
				fieldListItems: 'il_sys_table_order_name',
				linkTable: 'SysTable'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'parentColumn',
				orderDisplay: 190,
				orderDefine: 190,
				indexTable: 0,
				fieldListItems: 'il_sys_column_order_name',
				linkTable: 'SysColumn'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 200,
				orderDefine: 200
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'parentFilterExpr',
				orderDisplay: 210,
				orderDefine: 210,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				orderDisplay: 220,
				orderDefine: 220
			},

			/* tables */
			{
				codeFieldElement: 'embedListConfig',
				columnName: 'tables',
				orderDisplay: 230,
				orderDefine: 230,
				fieldEmbedListConfig: 'flec_data_obj_table',
				indexTable: 0,
				linkTable: 'SysDataObjTable'
			},

			/* list */
			{
				codeFieldElement: 'tagSection',
				codeColor: 'blue',
				columnName: 'custom_section_start',
				orderDisplay: 240,
				orderDefine: 240,
				headerAlt: 'List'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 250,
				orderDefine: 250
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'listReorderColumn',
				orderDisplay: 260,
				orderDefine: 260,
				fieldListItems: 'il_sys_column_order_name',
				indexTable: 0,
				linkTable: 'SysColumn'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isListEdit',
				orderDisplay: 270,
				orderDefine: 270,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeListEditPresetType',
				orderDisplay: 280,
				orderDefine: 280,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_list_edit_preset_type',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 290,
				orderDefine: 290
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'listEditPresetExpr',
				orderDisplay: 300,
				orderDefine: 300,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				orderDisplay: 310,
				orderDefine: 310
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_list',
		header: 'Data Objects',
		name: 'node_obj_sys_admin_data_obj_list',
		orderDefine: 30,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_resource_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_detail',
		header: 'Data Object',
		name: 'node_obj_sys_admin_data_obj_detail',
		orderDefine: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_data_obj_list'
	})
}

async function initDataObjColumn() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter:
			'.id IN (SELECT sys_core::SysDataObj FILTER .id = <tree,uuid,SysDataObj.id>).columns.id',
		header: 'Columns',
		listReorderColumn: 'orderDefine',
		name: 'data_obj_sys_admin_data_obj_column_list',
		owner: 'app_sys_admin',
		parentColumn: 'columns',
		parentTable: 'SysDataObj',
		tables: [{ index: 0, table: 'SysDataObjColumn' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeFieldElement',
				orderCrumb: 10,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'column',
				orderCrumb: 20,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysColumn'
			},
			{
				columnName: 'orderDefine',
				orderSort: 10,
				orderDefine: 40,
				indexTable: 0,
				isExcludeDisplayAlt: true
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Column',
		name: 'data_obj_sys_admin_data_obj_column_detail',
		owner: 'app_sys_admin',
		parentColumn: 'columns',
		parentTable: 'SysDataObj',
		tables: [{ index: 0, table: 'SysDataObjColumn' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 20,
				orderDefine: 20
			},
			{
				codeFieldElement: 'select',
				columnName: 'column',
				orderDisplay: 30,
				orderDefine: 30,
				fieldListItems: 'il_sys_column_order_name',
				indexTable: 0,
				linkTable: 'SysColumn'
			},
			{
				codeAccess: 'optional',
				columnName: 'nameCustom',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 50,
				orderDefine: 50
			},

			/* Database */
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_start',
				orderDisplay: 100,
				orderDefine: 100,
				headerAlt: 'Database'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 110,
				orderDefine: 110
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeDbDataOp',
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_field_op',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeDbDataSourceValue',
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_field_source_value',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeSortDir',
				orderDisplay: 140,
				orderDefine: 140,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_field_sort_dir',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 160,
				orderDefine: 160
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 170,
				orderDefine: 170
			},
			{
				codeAccess: 'optional',
				columnName: 'orderCrumb',
				orderDisplay: 180,
				orderDefine: 180,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'orderDisplay',
				orderDisplay: 190,
				orderDefine: 190,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'orderSort',
				orderDisplay: 200,
				orderDefine: 200,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'orderDefine',
				orderDisplay: 210,
				orderDefine: 210,
				exprPreset: `(SELECT 1000)`,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 220,
				orderDefine: 220
			},

			{
				codeAccess: 'optional',
				columnName: 'exprCustom',
				orderDisplay: 230,
				orderDefine: 230,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'exprPreset',
				orderDisplay: 240,
				orderDefine: 240,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 250,
				orderDefine: 250
			},
			{
				codeAccess: 'optional',
				columnName: 'indexTable',
				orderDisplay: 270,
				orderDefine: 270,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'indexWith',
				orderDisplay: 280,
				orderDefine: 280,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 290,
				orderDefine: 290
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 300,
				orderDefine: 300
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isExcludeDisplayAlt',
				orderDisplay: 305,
				orderDefine: 305,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isExcludeInsert',
				orderDisplay: 310,
				orderDefine: 310,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isExcludeSelect',
				orderDisplay: 320,
				orderDefine: 320,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isExcludeUpdate',
				orderDisplay: 330,
				orderDefine: 330,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 340,
				orderDefine: 340
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				orderDisplay: 345,
				orderDefine: 345
			},

			/* Display element */
			{
				codeColor: 'blue',
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_start',
				orderDisplay: 400,
				orderDefine: 400,
				headerAlt: 'Display Element'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 410,
				orderDefine: 410
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeAccess',
				orderDisplay: 420,
				orderDefine: 420,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_field_access',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeAlignmentAlt',
				orderDisplay: 430,
				orderDefine: 430,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_db_col_alignment',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeFieldElement',
				orderDisplay: 440,
				orderDefine: 440,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_field_element',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 450,
				orderDefine: 450
			},
			{
				codeFieldElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'Custom' },
				orderDisplay: 460,
				orderDefine: 460,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 470,
				orderDefine: 470
			},
			/* Display element - custom */
			// {
			// 	codeColor: 'blue',
			// 	codeFieldElement: 'tagSection',
			// 	columnName: 'custom_section_start',
			// 	orderDisplay: 215, orderDefine: 215,
			// 	headerAlt: 'Custom'
			// },

			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'customColCodeType',
				orderDisplay: 490,
				orderDefine: 490,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_field_element_custom_type',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				columnName: 'customColLabel',
				orderDisplay: 500,
				orderDefine: 500,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'customColActionMethod',
				orderDisplay: 510,
				orderDefine: 510,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'customColActionType',
				orderDisplay: 520,
				orderDefine: 520,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 530,
				orderDefine: 530
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 540,
				orderDefine: 540
			},
			{
				codeAccess: 'optional',
				columnName: 'customColActionValue',
				orderDisplay: 550,
				orderDefine: 550,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'customColAlign',
				orderDisplay: 560,
				orderDefine: 560,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'customColCodeColor',
				orderDisplay: 565,
				orderDefine: 565,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_tailwind_color',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				columnName: 'customColPrefix',
				orderDisplay: 570,
				orderDefine: 570,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'customColSize',
				orderDisplay: 580,
				orderDefine: 580,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'customColSource',
				orderDisplay: 590,
				orderDefine: 590,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'customColSourceKey',
				orderDisplay: 600,
				orderDefine: 600,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 610,
				orderDefine: 610
			},
			{
				codeFieldElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'List Items' },
				orderDisplay: 620,
				orderDefine: 620,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 630,
				orderDefine: 630
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'fieldListItems',
				orderDisplay: 640,
				orderDefine: 640,
				fieldListItems: 'il_sys_data_obj_field_list_items_order_name',
				indexTable: 0,
				linkTable: 'SysDataObjFieldListItems'
			},
			{
				codeAccess: 'optional',
				columnName: 'fieldListItemsParmName',
				orderDisplay: 650,
				orderDefine: 650,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 660,
				orderDefine: 660
			},
			{
				codeFieldElement: 'embedListConfig',
				columnName: 'items',
				orderDisplay: 670,
				orderDefine: 670,
				fieldEmbedListConfig: 'flec_data_obj_data_obj_column_item',
				indexTable: 0,
				linkTable: 'SysDataObjColumnItem'
			},
			{
				codeFieldElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'List Embed' },
				orderDisplay: 680,
				orderDefine: 680,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 690,
				orderDefine: 690
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'fieldEmbedDetail',
				orderDisplay: 695,
				orderDefine: 695,
				fieldListItems: 'il_sys_data_obj_field_embed_detail_order_name',
				indexTable: 0,
				linkTable: 'SysDataObjFieldEmbedDetail'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'fieldEmbedListConfig',
				orderDisplay: 700,
				orderDefine: 700,
				fieldListItems: 'il_sys_data_obj_field_embed_list_config_order_name',
				indexTable: 0,
				linkTable: 'SysDataObjFieldEmbedListConfig'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'fieldEmbedListEdit',
				orderDisplay: 710,
				orderDefine: 710,
				fieldListItems: 'il_sys_data_obj_field_embed_list_edit_order_name',
				indexTable: 0,
				linkTable: 'SysDataObjFieldEmbedListEdit'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'fieldEmbedListSelect',
				orderDisplay: 720,
				orderDefine: 720,
				fieldListItems: 'il_sys_data_obj_field_embed_list_select_order_name',
				indexTable: 0,
				linkTable: 'SysDataObjFieldEmbedListSelect'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 730,
				orderDefine: 730
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 740,
				orderDefine: 740
			},
			{
				codeAccess: 'optional',
				columnName: 'headerAlt',
				orderDisplay: 750,
				orderDefine: 750,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeColor',
				orderDisplay: 760,
				orderDefine: 760,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_tailwind_color',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				columnName: 'height',
				orderDisplay: 770,
				orderDefine: 770,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isDisplayBlock',
				orderDisplay: 780,
				orderDefine: 780,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'width',
				orderDisplay: 790,
				orderDefine: 790,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 800,
				orderDefine: 800
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				orderDisplay: 810,
				orderDefine: 810
			},

			/* Link */
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_start',
				orderDisplay: 820,
				orderDefine: 830,
				headerAlt: 'Link'
			},
			{
				codeFieldElement: 'embedListConfig',
				columnName: 'linkColumns',
				orderDisplay: 840,
				orderDefine: 840,
				fieldEmbedListConfig: 'flec_data_obj_column_link',
				indexTable: 0,
				linkTable: 'SysDataObjColumnLink'
			},
			{
				codeAccess: 'optional',
				columnName: 'linkExprSave',
				orderDisplay: 890,
				orderDefine: 890,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'linkExprSelect',
				orderDisplay: 900,
				orderDefine: 900,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'linkTable',
				orderDisplay: 910,
				orderDefine: 910,
				indexTable: 0,
				fieldListItems: 'il_sys_table_order_name',
				linkTable: 'SysTable'
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				orderDisplay: 920,
				orderDefine: 920
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_column_list',
		header: 'Columns',
		name: 'node_obj_sys_admin_data_obj_column_list',
		orderDefine: 20,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_data_obj_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_column_detail',
		header: 'Column',
		name: 'node_obj_sys_admin_data_obj_column_detail',
		orderDefine: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_data_obj_column_list'
	})
}

async function initDataObjActionsQuery() {
	sectionHeader('Field List Config - DataObjActionQuery')

	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter:
			'.id IN (SELECT sys_core::SysDataObj FILTER .id = <tree,uuid,SysDataObj.id>).actionsQuery.id',
		header: 'Data Object - Actions Query',
		name: 'data_obj_sys_admin_data_obj_action_query_list',
		owner: 'app_sys_admin',
		parentColumn: 'actionsQuery',
		parentTable: 'SysDataObj',
		tables: [{ index: 0, table: 'SysDataObjActionQuery' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Data Object - Action Query',
		name: 'data_obj_sys_admin_data_obj_action_query_detail',
		owner: 'app_sys_admin',
		parentColumn: 'actionsQuery',
		parentTable: 'SysDataObj',
		tables: [{ index: 0, table: 'SysDataObjActionQuery' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'name',
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeFieldElement: 'embedListConfig',
				columnName: 'parms',
				orderDisplay: 30,
				orderDefine: 30,

				fieldEmbedListConfig: 'flec_data_obj_action_query_parm',
				indexTable: 0,
				linkTable: 'SysDataObjActionQueryParm'
			},
			{
				codeFieldElement: 'embedListConfig',
				columnName: 'triggers',
				orderDisplay: 40,
				orderDefine: 40,

				fieldEmbedListConfig: 'flec_data_obj_action_query_trigger',
				indexTable: 0,
				linkTable: 'SysDataObjActionQueryTrigger'
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_action_query_list',
		header: 'Query Actions',
		name: 'node_obj_sys_admin_data_obj_action_query_list',
		orderDefine: 30,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_data_obj_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_action_query_detail',
		header: 'Query Action',
		name: 'node_obj_sys_admin_data_obj_action_query_detail',
		orderDefine: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_data_obj_action_query_list'
	})
}

async function initDataObjActionField() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <tree,uuid,SysResource.id>',
		header: 'Field Actions',
		name: 'data_obj_sys_admin_data_obj_action_field_list',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjActionField' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 10,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Field Action',
		name: 'data_obj_sys_admin_data_obj_action_field_detail',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjActionField' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isExcludeDisplayAlt: true,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				columnName: 'name',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				columnName: 'header',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeFieldElement: 'embedListConfig',
				columnName: 'actionFieldConfirms',
				orderDisplay: 70,
				orderDefine: 70,
				fieldEmbedListConfig: 'flec_data_obj_action_field_confirm',
				indexTable: 0,
				linkTable: 'SysDataObjActionFieldConfirm'
			},
			{
				codeFieldElement: 'embedListConfig',
				columnName: 'actionFieldShows',
				orderDisplay: 80,
				orderDefine: 80,
				fieldEmbedListConfig: 'flec_data_obj_action_field_show',
				indexTable: 0,
				linkTable: 'SysDataObjActionFieldShow'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 90,
				orderDefine: 90
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeActionFieldTriggerEnable',
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_action_field_trigger',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeActionFieldType',
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_action_field_type',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeColor',
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_tailwind_color',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isListRowAction',
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 140,
				orderDefine: 140
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_action_field_list',
		header: 'Field Actions',
		name: 'node_obj_sys_admin_data_obj_action_field_list',
		orderDefine: 40,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_resource_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_action_field_detail',
		header: 'Config',
		name: 'node_obj_sys_admin_data_obj_action_field_detail',
		orderDefine: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_data_obj_action_field_list'
	})
}

async function initDataObjActionFieldGroup() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <tree,uuid,SysResource.id>',
		header: 'Field Action Groups',
		name: 'data_obj_sys_admin_data_obj_action_field_group_list',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjActionFieldGroup' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 10,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Field Action Group',
		name: 'data_obj_sys_admin_data_obj_action_field_group_detail',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjActionFieldGroup' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isExcludeDisplayAlt: true,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				columnName: 'name',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeFieldElement: 'embedListConfig',
				columnName: 'actionFieldItems',
				orderDisplay: 40,
				orderDefine: 40,

				fieldEmbedListConfig: 'flec_data_obj_action_field_group_item',
				indexTable: 0,
				linkTable: 'SysDataObjActionFieldGroupItem'
			},
			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_action_field_group_list',
		header: 'Field Action Groups',
		name: 'node_obj_sys_admin_data_obj_action_field_group_list',
		orderDefine: 50,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_resource_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_action_field_group_detail',
		header: 'Config',
		name: 'node_obj_sys_admin_data_obj_action_field_group_detail',
		orderDefine: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_data_obj_action_field_group_list'
	})
}

async function initDataObjFielEmbedDetail() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <tree,uuid,SysResource.id>',
		header: 'Embed Details',
		name: 'data_obj_sys_admin_data_obj_field_embed_detail_list',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjFieldEmbedDetail' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 10,
				orderDisplay: 15,
				orderDefine: 15,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dataObjEmbed',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkColumns: ['name']
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Embed Detail',
		name: 'data_obj_sys_admin_data_obj_field_embed_detail_detail',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjFieldEmbedDetail' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isExcludeDisplayAlt: true,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				columnName: 'name',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'dataObjEmbed',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_data_obj_order_name',
				linkTable: 'SysDataObj'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 60,
				orderDefine: 60
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_field_embed_detail_list',
		header: 'Embed Details',
		name: 'node_obj_sys_admin_data_obj_field_embed_detail_list',
		orderDefine: 55,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_resource_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_field_embed_detail_detail',
		header: 'Config',
		name: 'node_obj_sys_admin_data_obj_field_embed_detail_detail',
		orderDefine: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_data_obj_field_embed_detail_list'
	})
}

async function initDataObjFielEmbedListConfig() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <tree,uuid,SysResource.id>',
		header: 'Embed List Configs',
		name: 'data_obj_sys_admin_data_obj_field_embed_list_config_list',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjFieldEmbedListConfig' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 10,
				orderDisplay: 15,
				orderDefine: 15,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'actionFieldGroupModal',
				orderCrumb: 10,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dataObjEmbed',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dataObjModal',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				linkColumns: ['name']
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Embed List Config',
		name: 'data_obj_sys_admin_data_obj_field_embed_list_config_detail',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjFieldEmbedListConfig' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isExcludeDisplayAlt: true,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				columnName: 'name',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'actionFieldGroupModal',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_data_obj_action_field_group_order_name',
				linkTable: 'SysDataObjActionFieldGroup'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeFieldElement: 'select',
				columnName: 'dataObjEmbed',
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0,
				fieldListItems: 'il_sys_data_obj_order_name',
				linkTable: 'SysDataObj'
			},
			{
				codeFieldElement: 'select',
				columnName: 'dataObjModal',
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0,
				fieldListItems: 'il_sys_data_obj_order_name',
				linkTable: 'SysDataObj'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 100,
				orderDefine: 100
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_field_embed_list_config_list',
		header: 'Embed List Configs',
		name: 'node_obj_sys_admin_data_obj_field_embed_list_config_list',
		orderDefine: 60,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_resource_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_field_embed_list_config_detail',
		header: 'Config',
		name: 'node_obj_sys_admin_data_obj_field_embed_list_config_detail',
		orderDefine: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_data_obj_field_embed_list_config_list'
	})
}

async function initDataObjFieldEmbedListEdit() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <tree,uuid,SysResource.id>',
		header: 'Embed List Edit',
		name: 'data_obj_sys_admin_data_obj_field_embed_list_edit_list',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjFieldEmbedListEdit' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 10,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dataObjEmbed',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'parmValueColumnValue',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'parmValueColumnType',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				linkColumns: ['name']
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Embed List Edit',
		name: 'data_obj_sys_admin_data_obj_field_embed_list_edit_detail',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjFieldEmbedListEdit' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isExcludeDisplayAlt: true,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				columnName: 'name',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'dataObjEmbed',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_data_obj_order_name',
				linkTable: 'SysDataObj'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'parmValueColumnValue',
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0,
				fieldListItems: 'il_sys_column_order_name',
				linkTable: 'SysColumn'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'parmValueColumnType',
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0,
				fieldListItems: 'il_sys_column_order_name',
				linkTable: 'SysColumn'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 100,
				orderDefine: 100
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_field_embed_list_edit_list',
		header: 'Embed List Edits',
		name: 'node_obj_sys_admin_data_obj_field_embed_list_edit_list',
		orderDefine: 62,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_resource_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_field_embed_list_edit_detail',
		header: 'Config',
		name: 'node_obj_sys_admin_data_obj_field_embed_list_edit_detail',
		orderDefine: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_data_obj_field_embed_list_edit_list'
	})
}

async function initDataObjFieldEmbedListSelect() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <tree,uuid,SysResource.id>',
		header: 'Embed List Selects',
		name: 'data_obj_sys_admin_data_obj_field_embed_list_select_list',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjFieldEmbedListSelect' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 10,
				orderDisplay: 15,
				orderDefine: 15,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'actionFieldGroupModal',
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'btnLabelComplete',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dataObjList',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				linkColumns: ['name']
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Embed List Select',
		name: 'data_obj_sys_admin_data_obj_field_embed_list_select_detail',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjFieldEmbedListSelect' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isExcludeDisplayAlt: true,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				columnName: 'name',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'actionFieldGroupModal',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_data_obj_action_field_group_order_name',
				linkTable: 'SysDataObjActionFieldGroup'
			},
			{
				columnName: 'btnLabelComplete',
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'dataObjList',
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0,
				fieldListItems: 'il_sys_data_obj_order_name',
				linkTable: 'SysDataObj'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 80,
				orderDefine: 80
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_field_embed_list_select_list',
		header: 'Embed List Selects',
		name: 'node_obj_sys_admin_data_obj_field_embed_list_select_list',
		orderDefine: 64,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_resource_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_field_embed_list_select_detail',
		header: 'Config',
		name: 'node_obj_sys_admin_data_obj_field_embed_list_select_detail',
		orderDefine: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_data_obj_field_embed_list_select_list'
	})
}

async function initDataObjFieldListItems() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <tree,uuid,SysResource.id>',
		header: 'Field List Items',
		name: 'data_obj_sys_admin_data_obj_field_list_items_list',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjFieldListItems' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 10,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'table',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'exprPropDisplay',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'exprWith',
				orderDisplay: 55,
				orderDefine: 55,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'exprFilter',
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'exprSort',
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeDataTypeDisplay',
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeMask',
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0,
				linkColumns: ['name']
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Field List Item',
		name: 'data_obj_sys_admin_data_obj_field_list_items_detail',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjFieldListItems' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isExcludeDisplayAlt: true,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				columnName: 'name',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'table',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				fieldListItems: 'il_sys_table_order_name',
				linkTable: 'SysTable'
			},
			{
				columnName: 'exprPropDisplay',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'exprWith',
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'exprFilter',
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'exprSort',
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeDataTypeDisplay',
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_db_col_data_type',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeMask',
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_db_col_mask',
				linkTable: 'SysCode'
			},
			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_field_list_items_list',
		header: 'Field List Items',
		name: 'node_obj_sys_admin_data_obj_field_list_items_list',
		orderDefine: 70,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_resource_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_field_list_items_detail',
		header: 'Item',
		name: 'node_obj_sys_admin_data_obj_field_list_items_detail',
		orderDefine: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_data_obj_field_list_items_list'
	})
}

async function initDataObjNodeObj() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <tree,uuid,SysResource.id>',
		header: 'Node Objects',
		listReorderColumn: 'orderDefine',
		name: 'data_obj_sys_admin_node_obj_list',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysNodeObj' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeNavType',
				orderSort: 10,
				orderDisplay: 12,
				orderDefine: 12,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeNodeType',
				orderDisplay: 15,
				orderDefine: 15,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 20,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				columnName: 'orderDefine',
				orderDefine: 30,
				indexTable: 0,
				isExcludeDisplayAlt: true
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Node Object',
		name: 'data_obj_sys_admin_node_obj_detail',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysNodeObj' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isExcludeDisplayAlt: true,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeNavType',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_node_obj_nav_type',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeNodeType',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_node_obj_type',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'parent',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_node_obj_order_name',
				linkTable: 'SysNodeObj'
			},
			{
				columnName: 'name',
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'header',
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeIcon',
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_node_obj_icon',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'dataObj',
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0,
				fieldListItems: 'il_sys_data_obj_order_name',
				linkTable: 'SysDataObj'
			},
			{
				codeAccess: 'optional',
				columnName: 'page',
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0
			},
			{
				columnName: 'orderDefine',
				orderDefine: 110,
				exprPreset: `(SELECT (count((SELECT sys_core::SysNodeObj FILTER .owner.id = <tree,uuid,SysResource.id>)) + 1))`,
				indexTable: 0,
				isExcludeDisplayAlt: true
			},
			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_node_obj_list',
		header: 'Node Objects',
		name: 'node_obj_sys_admin_node_obj_list',
		orderDefine: 90,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_resource_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_node_obj_detail',
		header: 'Node Object',
		name: 'node_obj_sys_admin_node_obj_detail',
		orderDefine: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_node_obj_list'
	})
}

async function initTable() {
	// data objects
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <tree,uuid,SysResource.id>',
		header: 'Tables',
		name: 'data_obj_sys_admin_table_list',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysTable' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'mod',
				orderSort: 10,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderSort: 10,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Table',
		name: 'data_obj_sys_admin_table_detail',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysTable' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isExcludeDisplayAlt: true,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				columnName: 'mod',
				orderDisplay: 10,
				orderDefine: 10,
				indexTable: 0
			},
			{
				columnName: 'name',
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeFieldElement: 'embedListSelect',
				columnName: 'columns',
				orderDisplay: 30,
				orderDefine: 30,
				fieldEmbedListSelect: 'fels_sys_column',
				indexTable: 0,
				linkTable: 'SysColumn'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'hasMgmt',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_table_list',
		header: 'Tables',
		name: 'node_obj_sys_admin_table_list',
		orderDefine: 110,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_resource_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_table_detail',
		header: 'Table',
		name: 'node_obj_sys_admin_table_detail',
		orderDefine: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_table_list'
	})
}

async function initUserType() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <tree,uuid,SysResource.id>',
		header: 'User Types',
		name: 'data_obj_sys_admin_user_type_list',
		owner: 'app_sys_admin_user',
		tables: [{ index: 0, table: 'SysUserType' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'owner',
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'User Type',
		name: 'data_obj_sys_admin_user_type_detail',
		owner: 'app_sys_admin_user',
		tables: [{ index: 0, table: 'SysUserType' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isExcludeDisplayAlt: true,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				columnName: 'name',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeFieldElement: 'embedListConfig',
				columnName: 'userTypeResources',
				orderDisplay: 40,
				orderDefine: 40,

				fieldEmbedListConfig: 'flec_user_type_resource',
				indexTable: 0,
				linkTable: 'SysOrg'
			},
			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_user_type_list',
		header: 'User Types',
		name: 'node_obj_sys_admin_user_type_list',
		orderDefine: 120,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_resource_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_user_type_detail',
		header: 'User Type',
		name: 'node_obj_sys_admin_user_type_detail',
		orderDefine: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_user_type_list'
	})
}

async function initWidget() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <tree,uuid,SysResource.id>',
		header: 'Widgets',
		name: 'data_obj_sys_admin_widget_list',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysWidget' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 10,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Widget',
		name: 'data_obj_sys_admin_widget_detail',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysWidget' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isExcludeDisplayAlt: true,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				columnName: 'name',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'header',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_widget_list',
		header: 'Widgets',
		name: 'node_obj_sys_admin_widget_list',
		orderDefine: 130,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_resource_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_widget_detail',
		header: 'Widget',
		name: 'node_obj_sys_admin_widget_detail',
		orderDefine: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_widget_list'
	})
}
