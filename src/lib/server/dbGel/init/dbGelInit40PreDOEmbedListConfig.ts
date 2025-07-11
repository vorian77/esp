import { InitDb } from '$server/dbGel/init/types.init'

export function initPreEmbedListConfig(init: InitDb) {
	initFieldListConfigDataObjAction(init)

	initFieldListConfigDataObjColumnLink(init)

	initFieldListConfigDataObjFieldListItemsProp(init)
	initFieldListConfigDataObjTable(init)

	initFieldListConfigUserActionConfirm(init)
}

async function initFieldListConfigDataObjAction(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeDataObjType: 'doEmbed',
		header: 'Data Object Actions',
		listReorderColumn: 'orderDefine',
		name: 'doflc_sys_admin_data_obj_action_list',
		owner: 'sys_system',
		tables: [{ index: 0, table: 'SysDataObjAction' }],
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
				linkColumns: ['name'],
				linkTable: 'SysUserAction'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeColor',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isListRowAction',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				columnName: 'orderDefine',
				orderDefine: 50,
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
		actionGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeDataObjType: 'doEmbed',
		header: 'Data Object Action',
		name: 'doflc_sys_admin_data_obj_action_detail',
		owner: 'sys_system',
		tables: [{ index: 0, table: 'SysDataObjAction' }],
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
				columnName: 'action',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				fieldListItems: 'il_sys_user_action_order_name'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeColor',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmValue: 'ct_sys_tailwind_color'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isListRowAction',
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
				columnName: 'orderDefine',
				orderDefine: 70,
				exprPreset: `(SELECT count((SELECT sys_core::SysDataObjAction FILTER .id IN ((SELECT sys_core::SysDataObjActionGroup FILTER .id = <parms,uuid,embedParentId>).dataObjActions.id))) + 1)`,
				indexTable: 0,
				isDisplayable: false
			},

			/* management */
			{
				codeFieldElement: 'tagDetails',
				columnName: 'custom_details_start',
				headerAlt: 'Meta',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1060,
				orderDefine: 1060
			},
			{
				codeFieldElement: 'tagDetails',
				columnName: 'custom_details_end',
				isDisplayable: true,
				orderDisplay: 1070,
				orderDefine: 1070
			}
		]
	})

	init.addTrans('sysDataObjFieldEmbedListConfig', {
		actionGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_sys_admin_data_obj_action_list',
		dataObjModal: 'doflc_sys_admin_data_obj_action_detail',
		name: 'flec_data_obj_action',
		owner: 'sys_system'
	})
}

async function initFieldListConfigDataObjColumnLink(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeDataObjType: 'doEmbed',
		exprFilter: `.id IN (SELECT sys_core::SysDataObjColumn FILTER .id = <parms,uuid,embedParentId>).linkColumns.id`,
		header: 'Data Object Link Columns',
		listReorderColumn: 'orderDefine',
		name: 'doflc_sys_admin_data_obj_column_link_list',
		owner: 'sys_system',
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
				linkColumns: ['name'],
				linkTable: 'SysColumn'
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
		actionGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeDataObjType: 'doEmbed',
		header: 'Data Object Link Column',
		name: 'doflc_sys_admin_data_obj_column_link_detail',
		owner: 'sys_system',
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
				fieldListItems: 'il_sys_column_order_name'
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
				codeFieldElement: 'tagDetails',
				columnName: 'custom_details_start',
				headerAlt: 'Meta',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1060,
				orderDefine: 1060
			},
			{
				codeFieldElement: 'tagDetails',
				columnName: 'custom_details_end',
				isDisplayable: true,
				orderDisplay: 1070,
				orderDefine: 1070
			}
		]
	})

	init.addTrans('sysDataObjFieldEmbedListConfig', {
		actionGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_sys_admin_data_obj_column_link_list',
		dataObjModal: 'doflc_sys_admin_data_obj_column_link_detail',
		name: 'flec_data_obj_column_link',
		owner: 'sys_system'
	})
}

async function initFieldListConfigDataObjFieldListItemsProp(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeDataObjType: 'doEmbed',
		header: 'Props',
		name: 'doflc_sys_admin_data_obj_field_list_items_prop_list',
		owner: 'sys_system',
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
		actionGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeDataObjType: 'doEmbed',
		header: 'Prop',
		name: 'doflc_sys_admin_data_obj_field_list_items_prop_detail',
		owner: 'sys_system',
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
		actionGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_sys_admin_data_obj_field_list_items_prop_list',
		dataObjModal: 'doflc_sys_admin_data_obj_field_list_items_prop_detail',
		name: 'flec_data_obj_field_list_items_prop',
		owner: 'sys_system'
	})
}

async function initFieldListConfigDataObjTable(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeDataObjType: 'doEmbed',
		header: 'Data Object - Tables',
		name: 'doflc_sys_admin_data_obj_table_list',
		owner: 'sys_system',
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
				linkColumns: ['name'],
				linkTable: 'SysTable'
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
				linkColumns: ['name'],
				linkTable: 'SysColumn'
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
		actionGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeDataObjType: 'doEmbed',
		header: 'Data Object - Table',
		name: 'doflc_sys_admin_data_obj_table_detail',
		owner: 'sys_system',
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
				fieldListItems: 'il_sys_table_order_name'
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
				codeFieldElement: 'tagDetails',
				columnName: 'custom_details_start',
				headerAlt: 'Meta',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1060,
				orderDefine: 1060
			},
			{
				codeFieldElement: 'tagDetails',
				columnName: 'custom_details_end',
				isDisplayable: true,
				orderDisplay: 1070,
				orderDefine: 1070
			}
		]
	})

	init.addTrans('sysDataObjFieldEmbedListConfig', {
		actionGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_sys_admin_data_obj_table_list',
		dataObjModal: 'doflc_sys_admin_data_obj_table_detail',
		name: 'flec_data_obj_table',
		owner: 'sys_system'
	})
}

async function initFieldListConfigUserActionConfirm(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeDataObjType: 'doEmbed',
		header: 'User Action - Confirms',
		name: 'doflc_sys_admin_user_action_confirm_list',
		owner: 'sys_system',
		tables: [{ index: 0, table: 'SysUserActionConfirm' }],
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
		actionGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeDataObjType: 'doEmbed',
		header: 'User Action - Confirm',
		name: 'doflc_sys_admin_user_action_confirm_detail',
		owner: 'sys_system',
		tables: [{ index: 0, table: 'SysUserActionConfirm' }],
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
				fieldListItemsParmValue: 'ct_sys_user_action_confirm_type'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeTriggerConfirmConditional',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmValue: 'ct_sys_user_action_confirm_type'
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
				codeFieldElement: 'tagDetails',
				columnName: 'custom_details_start',
				headerAlt: 'Meta',
				isDisplayable: true,
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 1010,
				orderDefine: 1010
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				isDisplayable: true,
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				isDisplayable: true,
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				isDisplayable: true,
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				isDisplayable: true,
				orderDisplay: 1050,
				orderDefine: 1050,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 1060,
				orderDefine: 1060
			},
			{
				codeFieldElement: 'tagDetails',
				columnName: 'custom_details_end',
				isDisplayable: true,
				orderDisplay: 1070,
				orderDefine: 1070
			}
		]
	})

	init.addTrans('sysDataObjFieldEmbedListConfig', {
		actionGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_sys_admin_user_action_confirm_list',
		dataObjModal: 'doflc_sys_admin_user_action_confirm_detail',
		name: 'flec_user_action_confirm',
		owner: 'sys_system'
	})
}
