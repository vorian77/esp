import { InitDb } from '$server/dbEdge/init/types.init'

export function initPreEmbedListConfig(init: InitDb) {
	initFieldListConfigDataObjActionFieldConfirms(init)
	initFieldListConfigDataObjActionFieldShows(init)

	initFieldListConfigDataObjActionQueryParm(init)
	initFieldListConfigDataObjActionQueryTrigger(init)

	initFieldListConfigDataObjActionFieldGroupItem(init)

	initFieldListConfigDataObjColumnItem(init)
	initFieldListConfigDataObjColumnLink(init)

	initFieldListConfigDataObjFieldListItemsProp(init)
	initFieldListConfigDataObjTable(init)
}

async function initFieldListConfigDataObjActionFieldConfirms(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionFieldGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeDataObjType: 'embed',
		header: 'Data Object Action Field - Confirms',
		name: 'doflc_sys_admin_data_obj_action_field_confirm_list',
		owner: 'sys_system_old',
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

	init.addTrans('sysDataObjEmbed', {
		actionFieldGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		codeDataObjType: 'embed',
		header: 'Data Object Action Field - Confirm',
		name: 'doflc_sys_admin_data_obj_action_field_confirm_detail',
		owner: 'sys_system_old',
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

	init.addTrans('sysDataObjFieldEmbedListConfig', {
		actionFieldGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_sys_admin_data_obj_action_field_confirm_list',
		dataObjModal: 'doflc_sys_admin_data_obj_action_field_confirm_detail',
		name: 'flec_data_obj_action_field_confirm',
		owner: 'sys_system_old'
	})
}

async function initFieldListConfigDataObjActionFieldShows(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionFieldGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeDataObjType: 'embed',
		header: 'Data Object Action Field - Shows',
		name: 'doflc_sys_admin_data_obj_action_field_show_list',
		owner: 'sys_system_old',
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

	init.addTrans('sysDataObjEmbed', {
		actionFieldGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		codeDataObjType: 'embed',
		header: 'Data Object Action Field - Show',
		name: 'doflc_sys_admin_data_obj_action_field_show_detail',
		owner: 'sys_system_old',
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

	init.addTrans('sysDataObjFieldEmbedListConfig', {
		actionFieldGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_sys_admin_data_obj_action_field_show_list',
		dataObjModal: 'doflc_sys_admin_data_obj_action_field_show_detail',
		name: 'flec_data_obj_action_field_show',
		owner: 'sys_system_old'
	})
}

async function initFieldListConfigDataObjActionQueryParm(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionFieldGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeDataObjType: 'embed',
		header: 'Data Object Action Query - Parameters',
		name: 'doflc_sys_admin_data_obj_action_query_parm_list',
		owner: 'sys_system_old',
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

	init.addTrans('sysDataObjEmbed', {
		actionFieldGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		codeDataObjType: 'embed',
		header: 'Data Object Action Query - Parameter',
		name: 'doflc_sys_admin_data_obj_action_query_parm_detail',
		owner: 'sys_system_old',
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

	init.addTrans('sysDataObjFieldEmbedListConfig', {
		actionFieldGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_sys_admin_data_obj_action_query_parm_list',
		dataObjModal: 'doflc_sys_admin_data_obj_action_query_parm_detail',
		name: 'flec_data_obj_action_query_parm',
		owner: 'sys_system_old'
	})
}

async function initFieldListConfigDataObjActionQueryTrigger(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionFieldGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeDataObjType: 'embed',
		header: 'Data Object Action Query - Triggers',
		name: 'doflc_sys_admin_data_obj_action_query_trigger_list',
		owner: 'sys_system_old',
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

	init.addTrans('sysDataObjEmbed', {
		actionFieldGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		codeDataObjType: 'embed',
		header: 'Data Object Action Query - Trigger',
		name: 'doflc_sys_admin_data_obj_action_query_trigger_detail',
		owner: 'sys_system_old',
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

	init.addTrans('sysDataObjFieldEmbedListConfig', {
		actionFieldGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_sys_admin_data_obj_action_query_trigger_list',
		dataObjModal: 'doflc_sys_admin_data_obj_action_query_trigger_detail',
		name: 'flec_data_obj_action_query_trigger',
		owner: 'sys_system_old'
	})
}

async function initFieldListConfigDataObjActionFieldGroupItem(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionFieldGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeDataObjType: 'embed',
		header: 'Action Field Items',
		listReorderColumn: 'orderDefine',
		name: 'doflc_sys_admin_data_obj_action_field_group_item_list',
		owner: 'sys_system_old',
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

	init.addTrans('sysDataObjEmbed', {
		actionFieldGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		codeDataObjType: 'embed',
		header: 'Action Field Item',
		name: 'doflc_sys_admin_data_obj_action_field_group_item_detail',
		owner: 'sys_system_old',
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

	init.addTrans('sysDataObjFieldEmbedListConfig', {
		actionFieldGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_sys_admin_data_obj_action_field_group_item_list',
		dataObjModal: 'doflc_sys_admin_data_obj_action_field_group_item_detail',
		name: 'flec_data_obj_action_field_group_item',
		owner: 'sys_system_old'
	})
}

async function initFieldListConfigDataObjColumnItem(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionFieldGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeDataObjType: 'embed',
		header: 'Items',
		name: 'doflc_sys_admin_data_obj_column_item_list',
		listReorderColumn: 'orderDefine',
		owner: 'sys_system_old',
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

	init.addTrans('sysDataObjEmbed', {
		actionFieldGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		codeDataObjType: 'embed',
		header: 'Item',
		name: 'doflc_sys_admin_data_obj_column_item_detail',
		owner: 'sys_system_old',
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

	init.addTrans('sysDataObjFieldEmbedListConfig', {
		actionFieldGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_sys_admin_data_obj_column_item_list',
		dataObjModal: 'doflc_sys_admin_data_obj_column_item_detail',
		name: 'flec_data_obj_data_obj_column_item',
		owner: 'sys_system_old'
	})
}

async function initFieldListConfigDataObjColumnLink(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionFieldGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeDataObjType: 'embed',
		exprFilter: `.id IN (SELECT sys_core::SysDataObjColumn FILTER .id = <parms,uuid,embedParentId>).linkColumns.id`,
		header: 'Data Object Link Columns',
		listReorderColumn: 'orderDefine',
		name: 'doflc_sys_admin_data_obj_column_link_list',
		owner: 'sys_system_old',
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
	init.addTrans('sysDataObjEmbed', {
		actionFieldGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		codeDataObjType: 'embed',
		header: 'Data Object Link Column',
		name: 'doflc_sys_admin_data_obj_column_link_detail',
		owner: 'sys_system_old',
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

	init.addTrans('sysDataObjFieldEmbedListConfig', {
		actionFieldGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_sys_admin_data_obj_column_link_list',
		dataObjModal: 'doflc_sys_admin_data_obj_column_link_detail',
		name: 'flec_data_obj_column_link',
		owner: 'sys_system_old'
	})
}

async function initFieldListConfigDataObjFieldListItemsProp(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionFieldGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeDataObjType: 'embed',
		header: 'Props',
		name: 'doflc_sys_admin_data_obj_field_list_items_prop_list',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysDataObjFieldListItemsProp' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'orderDefine',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 20,
				orderDisplay: 20,
				orderSort: 20
			},
			{
				codeAccess: 'readOnly',
				columnName: 'key',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 30,
				orderDisplay: 30
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 40,
				orderDisplay: 40
			},
			{
				codeAccess: 'readOnly',
				columnName: 'orderSort',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 50,
				orderDisplay: 50
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isDisplayId',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 60,
				orderDisplay: 60
			},
			{
				codeAccess: 'readOnly',
				columnName: 'expr',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 70,
				orderDisplay: 70
			}
		]
	})

	init.addTrans('sysDataObjEmbed', {
		actionFieldGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		codeDataObjType: 'embed',
		header: 'Prop',
		name: 'doflc_sys_admin_data_obj_field_list_items_prop_detail',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysDataObjFieldListItemsProp' }],
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
				columnName: 'orderDefine',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 30,
				orderDisplay: 30
			},
			{
				columnName: 'key',
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
				codeAccess: 'optional',
				columnName: 'orderSort',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 60,
				orderDisplay: 60
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isDisplayId',
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
			{
				columnName: 'expr',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObjFieldEmbedListConfig', {
		actionFieldGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_sys_admin_data_obj_field_list_items_prop_list',
		dataObjModal: 'doflc_sys_admin_data_obj_field_list_items_prop_detail',
		name: 'flec_data_obj_field_list_items_prop',
		owner: 'sys_system_old'
	})
}

async function initFieldListConfigDataObjTable(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionFieldGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeDataObjType: 'embed',
		header: 'Data Object - Tables',
		name: 'doflc_sys_admin_data_obj_table_list',
		owner: 'sys_system_old',
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
				columnName: 'isTableExtension',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'indexParent',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				headerAlt: 'Parent Table Index',
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'columnParent',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				headerAlt: 'Parent Table Column',
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'exprFilterUpdate',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObjEmbed', {
		actionFieldGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		codeDataObjType: 'embed',
		header: 'Data Object - Table',
		name: 'doflc_sys_admin_data_obj_table_detail',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysDataObjTable' }],
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
				columnName: 'index',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'table',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				fieldListItems: 'il_sys_table_order_name',
				linkTable: 'SysTable'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isTableExtension',
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
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeAccess: 'optional',
				columnName: 'indexParent',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				headerAlt: 'Parent Table Index',
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'columnParent',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				fieldListItems: 'il_sys_column_order_name',
				headerAlt: 'Parent Table Column',
				indexTable: 0,
				linkTable: 'SysColumn'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100
			},
			{
				codeAccess: 'optional',
				columnName: 'exprFilterUpdate',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 0
			},
			// {
			// 	codeAccess: 'optional',
			// 	codeFieldElement: 'embedListSelect',
			// 	columnName: 'columnsId',
			// 	isDisplayable: true,
			// 	orderDisplay: 110,
			// 	orderDefine: 110,
			// 	fieldEmbedListSelect: 'fels_sys_column',
			// 	indexTable: 0,
			// 	linkTable: 'SysColumn'
			// },

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

	init.addTrans('sysDataObjFieldEmbedListConfig', {
		actionFieldGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_sys_admin_data_obj_table_list',
		dataObjModal: 'doflc_sys_admin_data_obj_table_detail',
		name: 'flec_data_obj_table',
		owner: 'sys_system_old'
	})
}
