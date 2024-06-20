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
		owner: 'app_sys_admin',
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
		owner: 'app_sys_admin',
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
		owner: 'app_sys_admin',
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
		owner: 'app_sys_admin',
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'action',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				columnName: 'orderDefine',
				orderSort: 10,
				orderDefine: 30,
				indexTable: 0,
				isDisplayable: false
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Action Field Item',
		name: 'doflc_sys_admin_data_obj_action_field_group_item_detail',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjActionFieldGroupItem' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'optional',
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
					FILTER .id IN ((SELECT sys_core::SysDataObjActionFieldGroup FILTER .id = <parms,uuid,listRecordIdParent>).actionFieldItems.id))) + 1)`,
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
				orderSort: 10,
				orderDefine: 40,
				indexTable: 0,
				isDisplayable: false
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'display',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				columnName: 'data',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				columnName: 'orderDefine',
				orderDefine: 40,
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
				orderSort: 10,
				orderDefine: 30,
				indexTable: 0,
				isDisplayable: false
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
		name: 'doflc_sys_admin_data_obj_table_list',
		owner: 'app_sys_admin',
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
		owner: 'app_sys_admin',
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
		owner: 'app_sys_admin',
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeType',
				orderSort: 10,
				isDisplayable: true,
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
				isDisplayable: true,
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 10,
				isDisplayable: true,
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				isDisplayable: true,
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave: `(SELECT sys_core::getOrg('System'))`,
				linkTable: 'SysOrg'
			},
			{
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'header',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				matchColumn: 'name'
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'parent',
				isDisplayable: true,
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
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'order',
				isDisplayable: true,
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'parent',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				fieldListItems: 'il_sys_codeType_order_name',
				linkTable: 'SysCodeType'
			},
			{
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'header',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'number',
				columnName: 'order',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'parent',
				isDisplayable: true,
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
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'valueDecimal',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'valueInteger',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'valueString',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'order',
				isDisplayable: true,
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'codeType',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave: `(SELECT sys_core::SysCodeType FILTER .id = <tree,uuid,SysCodeType.id>)`,
				linkTable: 'SysCodeType'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeFieldElement: 'select',
				columnName: 'owner',
				isDisplayable: true,
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
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_code_parent',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'header',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'number',
				columnName: 'valueDecimal',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 0
			},
			{
				codeFieldElement: 'number',
				codeAccess: 'optional',
				columnName: 'valueInteger',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'valueString',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'number',
				columnName: 'order',
				isDisplayable: true,
				orderDisplay: 150,
				orderDefine: 150,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 160,
				orderDefine: 160
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'parent',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeType',
				orderSort: 10,
				isDisplayable: true,
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
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'valueDecimal',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'valueInteger',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'valueString',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'order',
				isDisplayable: true,
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeType',
				isDisplayable: true,
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
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_code_parent',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'header',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'number',
				columnName: 'valueDecimal',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 0
			},
			{
				codeFieldElement: 'number',
				codeAccess: 'optional',
				columnName: 'valueInteger',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'valueString',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'number',
				columnName: 'order',
				isDisplayable: true,
				orderDisplay: 150,
				orderDefine: 150,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 160,
				orderDefine: 160
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				isDisplayable: true,
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 25,
				orderDefine: 25
			},
			{
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				columnName: 'header',
				isDisplayable: true,
				orderDisplay: 35,
				orderDefine: 35,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeDataType',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_db_col_data_type',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeAlignment',
				isDisplayable: true,
				orderDisplay: 45,
				orderDefine: 45,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_db_col_alignment',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 55,
				orderDefine: 55
			},
			{
				codeAccess: 'optional',
				columnName: 'headerSide',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'placeHolder',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_start',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,
				headerAlt: 'Database'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isExcludeInsert',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isExcludeSelect',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isExcludeUpdate',
				isDisplayable: true,
				orderDisplay: 150,
				orderDefine: 150,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isNonData',
				exprPreset: `(SELECT false)`,
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 160,
				orderDefine: 160
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isSelfReference',
				isDisplayable: true,
				orderDisplay: 170,
				orderDefine: 170,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 180,
				orderDefine: 180
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 190,
				orderDefine: 190
			},
			{
				codeFieldElement: 'customHeader',
				columnName: 'custom_element',
				customElement: { label: 'File' },
				isDisplayable: true,
				orderDisplay: 200,
				orderDefine: 200,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'exprStorageKey',
				isDisplayable: true,
				orderDisplay: 210,
				orderDefine: 210,
				indexTable: 0
			},
			{
				codeFieldElement: 'customHeader',
				columnName: 'custom_element',
				customElement: { label: 'Link' },
				isDisplayable: true,
				orderDisplay: 220,
				orderDefine: 220,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isMultiSelect',
				isDisplayable: true,
				orderDisplay: 230,
				orderDefine: 230,
				indexTable: 0
			},
			{
				codeFieldElement: 'customHeader',
				columnName: 'custom_element',
				customElement: { label: 'number' },
				isDisplayable: true,
				orderDisplay: 240,
				orderDefine: 240,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 250,
				orderDefine: 250
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'number',
				columnName: 'minValue',
				isDisplayable: true,
				orderDisplay: 260,
				orderDefine: 260,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'number',
				columnName: 'maxValue',
				isDisplayable: true,
				orderDisplay: 270,
				orderDefine: 270,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'spinStep',
				isDisplayable: true,
				orderDisplay: 280,
				orderDefine: 280,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 290,
				orderDefine: 290
			},
			{
				codeFieldElement: 'customHeader',
				columnName: 'custom_element',
				customElement: { label: 'String' },
				isDisplayable: true,
				orderDisplay: 300,
				orderDefine: 300,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 310,
				orderDefine: 310
			},
			{
				codeAccess: 'optional',
				columnName: 'matchColumn',
				isDisplayable: true,
				orderDisplay: 320,
				orderDefine: 320,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'number',
				columnName: 'minLength',
				isDisplayable: true,
				orderDisplay: 330,
				orderDefine: 330,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'number',
				columnName: 'maxLength',
				isDisplayable: true,
				orderDisplay: 340,
				orderDefine: 340,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 350,
				orderDefine: 350
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 360,
				orderDefine: 360
			},
			{
				codeAccess: 'optional',
				columnName: 'pattern',
				isDisplayable: true,
				orderDisplay: 370,
				orderDefine: 370,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'patternMsg',
				isDisplayable: true,
				orderDisplay: 380,
				orderDefine: 380,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'patternReplacement',
				isDisplayable: true,
				orderDisplay: 390,
				orderDefine: 390,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 400,
				orderDefine: 400
			},
			{
				codeFieldElement: 'customHeader',
				columnName: 'custom_element',
				customElement: { label: 'Toggle' },
				isDisplayable: true,
				orderDisplay: 410,
				orderDefine: 410,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 420,
				orderDefine: 420
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'togglePresetTrue',
				isDisplayable: true,
				orderDisplay: 430,
				orderDefine: 430,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'toggleValueShow',
				isDisplayable: true,
				orderDisplay: 440,
				orderDefine: 440,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'toggleValueTrue',
				isDisplayable: true,
				orderDisplay: 450,
				orderDefine: 450,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'toggleValueFalse',
				isDisplayable: true,
				orderDisplay: 460,
				orderDefine: 460,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 470,
				orderDefine: 470
			},
			{
				codeFieldElement: 'customHeader',
				columnName: 'custom_element',
				customElement: { label: 'Text Area' },
				isDisplayable: true,
				orderDisplay: 480,
				orderDefine: 480,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'classProps',
				isDisplayable: true,
				orderDisplay: 490,
				orderDefine: 490,
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 10,
				isDisplayable: true,
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 25,
				orderDefine: 25
			},
			{
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeCardinality',
				isDisplayable: true,
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
				isDisplayable: true,
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
				isDisplayable: true,
				orderDisplay: 55,
				orderDefine: 55
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 57,
				orderDefine: 57
			},
			{
				codeAccess: 'optional',
				columnName: 'header',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'subHeader',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 75,
				orderDefine: 75
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'description',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 85,
				orderDefine: 85
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'actionFieldGroup',
				isDisplayable: true,
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
				isDisplayable: true,
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
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isAlwaysRetrieveDataObject',
				isDisplayable: true,
				orderDisplay: 115,
				orderDefine: 115,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'exprFilter',
				isDisplayable: true,
				orderDisplay: 125,
				orderDefine: 125,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'exprObject',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'exprSort',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140,
				indexTable: 0
			},

			/* parent */
			{
				codeFieldElement: 'tagSection',
				codeColor: 'blue',
				columnName: 'custom_section_start',
				isDisplayable: true,
				orderDisplay: 160,
				orderDefine: 160,
				headerAlt: 'Parent'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 170,
				orderDefine: 170
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'parentTable',
				isDisplayable: true,
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
				isDisplayable: true,
				orderDisplay: 190,
				orderDefine: 190,
				indexTable: 0,
				fieldListItems: 'il_sys_column_order_name',
				linkTable: 'SysColumn'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 200,
				orderDefine: 200
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'parentFilterExpr',
				isDisplayable: true,
				orderDisplay: 210,
				orderDefine: 210,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 220,
				orderDefine: 220
			},

			/* tables */
			{
				codeFieldElement: 'embedListConfig',
				columnName: 'tables',
				isDisplayable: true,
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
				isDisplayable: true,
				orderDisplay: 240,
				orderDefine: 240,
				headerAlt: 'List'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 250,
				orderDefine: 250
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'listReorderColumn',
				isDisplayable: true,
				orderDisplay: 260,
				orderDefine: 260,
				fieldListItems: 'il_sys_column_order_name',
				indexTable: 0,
				linkTable: 'SysColumn'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isListHideSearch',
				isDisplayable: true,
				orderDisplay: 270,
				orderDefine: 270,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 275,
				orderDefine: 275
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 280,
				orderDefine: 280
			},

			{
				codeFieldElement: 'toggle',
				columnName: 'isListEdit',
				isDisplayable: true,
				orderDisplay: 285,
				orderDefine: 285,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeListEditPresetType',
				isDisplayable: true,
				orderDisplay: 290,
				orderDefine: 290,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_list_edit_preset_type',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 295,
				orderDefine: 295
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'listEditPresetExpr',
				isDisplayable: true,
				orderDisplay: 300,
				orderDefine: 300,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 310,
				orderDefine: 310
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeFieldElement',
				orderCrumb: 10,
				isDisplayable: true,
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
				isDisplayable: true,
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
				isDisplayable: false
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
				codeFieldElement: 'toggle',
				columnName: 'isDisplayable',
				isDisplayable: true,
				orderDisplay: 25,
				orderDefine: 25,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'column',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				fieldListItems: 'il_sys_column_order_name',
				indexTable: 0,
				linkTable: 'SysColumn'
			},
			{
				codeAccess: 'optional',
				columnName: 'nameCustom',
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

			/* Database */
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_start',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,
				headerAlt: 'Database'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeDbDataOp',
				isDisplayable: true,
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
				isDisplayable: true,
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
				isDisplayable: true,
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
				isDisplayable: true,
				orderDisplay: 160,
				orderDefine: 160
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 170,
				orderDefine: 170
			},
			{
				codeAccess: 'optional',
				columnName: 'orderCrumb',
				isDisplayable: true,
				orderDisplay: 180,
				orderDefine: 180,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'orderDisplay',
				isDisplayable: true,
				orderDisplay: 190,
				orderDefine: 190,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'orderSort',
				isDisplayable: true,
				orderDisplay: 200,
				orderDefine: 200,
				indexTable: 0
			},
			{
				columnName: 'orderDefine',
				orderDefine: 210,
				exprPreset: `(SELECT 1000)`,
				indexTable: 0,
				isDisplayable: false
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 220,
				orderDefine: 220
			},

			{
				codeAccess: 'optional',
				columnName: 'exprCustom',
				isDisplayable: true,
				orderDisplay: 230,
				orderDefine: 230,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'exprPreset',
				isDisplayable: true,
				orderDisplay: 240,
				orderDefine: 240,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 250,
				orderDefine: 250
			},
			{
				codeAccess: 'optional',
				columnName: 'indexTable',
				isDisplayable: true,
				orderDisplay: 270,
				orderDefine: 270,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'indexWith',
				isDisplayable: true,
				orderDisplay: 280,
				orderDefine: 280,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 290,
				orderDefine: 290
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 300,
				orderDefine: 300
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isExcludeInsert',
				isDisplayable: true,
				orderDisplay: 310,
				orderDefine: 310,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isExcludeSelect',
				isDisplayable: true,
				orderDisplay: 320,
				orderDefine: 320,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isExcludeUpdate',
				isDisplayable: true,
				orderDisplay: 330,
				orderDefine: 330,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 340,
				orderDefine: 340
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 345,
				orderDefine: 345
			},

			/* Display element */
			{
				codeColor: 'blue',
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_start',
				isDisplayable: true,
				orderDisplay: 400,
				orderDefine: 400,
				headerAlt: 'Display Element'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 410,
				orderDefine: 410
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeAccess',
				isDisplayable: true,
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
				isDisplayable: true,
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
				isDisplayable: true,
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
				isDisplayable: true,
				orderDisplay: 450,
				orderDefine: 450
			},
			{
				codeFieldElement: 'customHeader',
				columnName: 'custom_element',
				customElement: { label: 'Custom' },
				isDisplayable: true,
				orderDisplay: 460,
				orderDefine: 460,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 470,
				orderDefine: 470
			},
			/* Display element - custom */
			// {
			// 	codeColor: 'blue',
			// 	codeFieldElement: 'tagSection',
			// 	columnName: 'custom_section_start',
			// 	isDisplayable: true,
			//orderDisplay: 215,
			//orderDefine: 215,
			// 	headerAlt: 'Custom'
			// },
			{
				codeAccess: 'optional',
				columnName: 'customColLabel',
				isDisplayable: true,
				orderDisplay: 500,
				orderDefine: 500,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'customColActionMethod',
				isDisplayable: true,
				orderDisplay: 510,
				orderDefine: 510,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'customColActionType',
				isDisplayable: true,
				orderDisplay: 520,
				orderDefine: 520,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 530,
				orderDefine: 530
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 540,
				orderDefine: 540
			},
			{
				codeAccess: 'optional',
				columnName: 'customColActionValue',
				isDisplayable: true,
				orderDisplay: 550,
				orderDefine: 550,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'customColAlign',
				isDisplayable: true,
				orderDisplay: 560,
				orderDefine: 560,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'customColCodeColor',
				isDisplayable: true,
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
				isDisplayable: true,
				orderDisplay: 570,
				orderDefine: 570,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'customColSize',
				isDisplayable: true,
				orderDisplay: 580,
				orderDefine: 580,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'customColSource',
				isDisplayable: true,
				orderDisplay: 590,
				orderDefine: 590,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'customColSourceKey',
				isDisplayable: true,
				orderDisplay: 600,
				orderDefine: 600,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 610,
				orderDefine: 610
			},
			{
				codeFieldElement: 'customHeader',
				columnName: 'custom_element',
				customElement: { label: 'List Items' },
				isDisplayable: true,
				orderDisplay: 620,
				orderDefine: 620,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 630,
				orderDefine: 630
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'fieldListItems',
				isDisplayable: true,
				orderDisplay: 640,
				orderDefine: 640,
				fieldListItems: 'il_sys_data_obj_field_list_items_order_name',
				indexTable: 0,
				linkTable: 'SysDataObjFieldListItems'
			},
			{
				codeAccess: 'optional',
				columnName: 'fieldListItemsParmName',
				isDisplayable: true,
				orderDisplay: 650,
				orderDefine: 650,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 660,
				orderDefine: 660
			},
			{
				codeFieldElement: 'embedListConfig',
				columnName: 'items',
				isDisplayable: true,
				orderDisplay: 670,
				orderDefine: 670,
				fieldEmbedListConfig: 'flec_data_obj_data_obj_column_item',
				indexTable: 0,
				linkTable: 'SysDataObjColumnItem'
			},
			{
				codeFieldElement: 'customHeader',
				columnName: 'custom_element',
				customElement: { label: 'List Embed' },
				isDisplayable: true,
				orderDisplay: 680,
				orderDefine: 680,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 690,
				orderDefine: 690
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'fieldEmbedListConfig',
				isDisplayable: true,
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
				isDisplayable: true,
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
				isDisplayable: true,
				orderDisplay: 720,
				orderDefine: 720,
				fieldListItems: 'il_sys_data_obj_field_embed_list_select_order_name',
				indexTable: 0,
				linkTable: 'SysDataObjFieldEmbedListSelect'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 730,
				orderDefine: 730
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 740,
				orderDefine: 740
			},
			{
				codeAccess: 'optional',
				columnName: 'headerAlt',
				isDisplayable: true,
				orderDisplay: 750,
				orderDefine: 750,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeColor',
				isDisplayable: true,
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
				isDisplayable: true,
				orderDisplay: 770,
				orderDefine: 770,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isDisplayBlock',
				isDisplayable: true,
				orderDisplay: 780,
				orderDefine: 780,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'width',
				isDisplayable: true,
				orderDisplay: 790,
				orderDefine: 790,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 800,
				orderDefine: 800
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 810,
				orderDefine: 810
			},

			/* Link */
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_start',
				isDisplayable: true,
				orderDisplay: 820,
				orderDefine: 830,
				headerAlt: 'Link'
			},
			{
				codeFieldElement: 'embedListConfig',
				columnName: 'linkColumns',
				isDisplayable: true,
				orderDisplay: 840,
				orderDefine: 840,
				fieldEmbedListConfig: 'flec_data_obj_column_link',
				indexTable: 0,
				linkTable: 'SysDataObjColumnLink'
			},
			{
				codeAccess: 'optional',
				columnName: 'linkExprSave',
				isDisplayable: true,
				orderDisplay: 890,
				orderDefine: 890,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'linkExprSelect',
				isDisplayable: true,
				orderDisplay: 900,
				orderDefine: 900,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'linkTable',
				isDisplayable: true,
				orderDisplay: 910,
				orderDefine: 910,
				indexTable: 0,
				fieldListItems: 'il_sys_table_order_name',
				linkTable: 'SysTable'
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 920,
				orderDefine: 920
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				isDisplayable: true,
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeFieldElement: 'embedListConfig',
				columnName: 'parms',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,

				fieldEmbedListConfig: 'flec_data_obj_action_query_parm',
				indexTable: 0,
				linkTable: 'SysDataObjActionQueryParm'
			},
			{
				codeFieldElement: 'embedListConfig',
				columnName: 'triggers',
				isDisplayable: true,
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 10,
				isDisplayable: true,
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				columnName: 'header',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeActionFieldTriggerEnable',
				isDisplayable: true,
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
				isDisplayable: true,
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
				isDisplayable: true,
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
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140
			},
			{
				codeFieldElement: 'embedListConfig',
				columnName: 'actionFieldConfirms',
				isDisplayable: true,
				orderDisplay: 150,
				orderDefine: 150,
				fieldEmbedListConfig: 'flec_data_obj_action_field_confirm',
				indexTable: 0,
				linkTable: 'SysDataObjActionFieldConfirm'
			},
			{
				codeFieldElement: 'embedListConfig',
				columnName: 'actionFieldShows',
				isDisplayable: true,
				orderDisplay: 160,
				orderDefine: 160,
				fieldEmbedListConfig: 'flec_data_obj_action_field_show',
				indexTable: 0,
				linkTable: 'SysDataObjActionFieldShow'
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 10,
				isDisplayable: true,
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeFieldElement: 'embedListConfig',
				columnName: 'actionFieldItems',
				isDisplayable: true,
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 15,
				orderDefine: 15,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'actionFieldGroupModal',
				orderCrumb: 10,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dataObjEmbed',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dataObjModal',
				isDisplayable: true,
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'actionFieldGroupModal',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_data_obj_action_field_group_order_name',
				linkTable: 'SysDataObjActionFieldGroup'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeFieldElement: 'select',
				columnName: 'dataObjEmbed',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0,
				fieldListItems: 'il_sys_data_obj_order_name',
				linkTable: 'SysDataObj'
			},
			{
				codeFieldElement: 'select',
				columnName: 'dataObjModal',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0,
				fieldListItems: 'il_sys_data_obj_order_name',
				linkTable: 'SysDataObj'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dataObjEmbed',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'parmValueColumnValue',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'parmValueColumnType',
				isDisplayable: true,
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'dataObjEmbed',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_data_obj_order_name',
				linkTable: 'SysDataObj'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'parmValueColumnValue',
				isDisplayable: true,
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
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0,
				fieldListItems: 'il_sys_column_order_name',
				linkTable: 'SysColumn'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 15,
				orderDefine: 15,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'actionFieldGroupModal',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'btnLabelComplete',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dataObjList',
				isDisplayable: true,
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'actionFieldGroupModal',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_data_obj_action_field_group_order_name',
				linkTable: 'SysDataObjActionFieldGroup'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				columnName: 'btnLabelComplete',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'dataObjList',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0,
				fieldListItems: 'il_sys_data_obj_order_name',
				linkTable: 'SysDataObj'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
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
				columnName: 'exprPropDisplay',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'exprWith',
				isDisplayable: true,
				orderDisplay: 55,
				orderDefine: 55,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'exprFilter',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'exprSort',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeDataTypeDisplay',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeMask',
				isDisplayable: true,
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'table',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_table_order_name',
				linkTable: 'SysTable'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				columnName: 'exprPropDisplay',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'exprWith',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'exprFilter',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'exprSort',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeDataTypeDisplay',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_db_col_data_type',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeMask',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_db_col_mask',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeNavType',
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 12,
				orderDefine: 12,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeNodeType',
				isDisplayable: true,
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
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				columnName: 'orderDefine',
				orderDefine: 30,
				indexTable: 0,
				isDisplayable: false
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeNavType',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_node_obj_nav_type',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeNodeType',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_node_obj_type',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'parent',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0,
				fieldListItems: 'il_sys_node_obj_order_name',
				linkTable: 'SysNodeObj'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80
			},
			{
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'header',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeIcon',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_node_obj_icon',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'dataObj',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140,
				indexTable: 0,
				fieldListItems: 'il_sys_data_obj_order_name',
				linkTable: 'SysDataObj'
			},
			{
				codeAccess: 'optional',
				columnName: 'page',
				isDisplayable: true,
				orderDisplay: 150,
				orderDefine: 150,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 160,
				orderDefine: 160
			},
			{
				columnName: 'orderDefine',
				orderDefine: 170,
				exprPreset: `(SELECT (count((SELECT sys_core::SysNodeObj FILTER .owner.id = <tree,uuid,SysResource.id>)) + 1))`,
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'mod',
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'hasMgmt',
				isDisplayable: true,
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
		header: 'Table',
		name: 'data_obj_sys_admin_table_detail',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysTable' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				columnName: 'mod',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'hasMgmt',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeFieldElement: 'embedListSelect',
				columnName: 'columns',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				fieldEmbedListSelect: 'fels_sys_column',
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'owner',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				isDisplayable: true,
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeFieldElement: 'embedListConfig',
				columnName: 'userTypeResources',
				isDisplayable: true,
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				isDisplayable: true,
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
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'header',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
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
