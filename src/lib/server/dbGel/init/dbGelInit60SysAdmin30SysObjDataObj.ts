import { InitDb } from '$server/dbGel/init/types.init'

export function initAdminSysObjDataObj(init: InitDb) {
	initDataObj(init)
	initDataObjColumn(init)
}

function initDataObj(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		exprFilter: '.owner.id = <tree,uuid,SysSystem.id>',
		header: 'Data Objects',
		name: 'data_obj_sys_admin_data_obj_list',
		owner: 'sys_system',
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

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		header: 'Data Object',
		name: 'data_obj_sys_admin_data_obj_detail',
		owner: 'sys_system',
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
				exprSave: `(SELECT sys_core::SysSystem FILTER .id = <tree,uuid,SysSystem.id>)`,
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkTable: 'SysSystem'
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
				codeFieldElement: 'radio',
				columnName: 'codeCardinality',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmValue: 'ct_sys_do_cardinality'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeDataObjType',
				isDisplayable: true,
				orderDisplay: 52,
				orderDefine: 52,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmValue: 'ct_sys_do_type'
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
				orderDisplay: 64,
				orderDefine: 64,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isInitialValidationSilent',
				isDisplayable: true,
				orderDisplay: 72,
				orderDefine: 72,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isFormReadonly',
				isDisplayable: true,
				orderDisplay: 74,
				orderDefine: 74,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 76,
				orderDefine: 76
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
				columnName: 'actionGroup',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0,
				fieldListItems: 'il_sys_data_obj_action_group_order_name'
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
				fieldListItemsParmValue: 'ct_sys_do_dynamic_process_type'
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
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'exprWith',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140,
				indexTable: 0
			},

			/* parent */
			{
				codeFieldElement: 'tagSection',
				codeColor: 'primary',
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
				fieldListItems: 'il_sys_table_order_name'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'parentColumn',
				isDisplayable: true,
				orderDisplay: 190,
				orderDefine: 190,
				indexTable: 0,
				fieldListItems: 'il_sys_column_order_name'
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
				codeAccess: 'optional',
				codeFieldElement: 'embedListConfig',
				columnName: 'tables',
				isDisplayable: true,
				orderDisplay: 230,
				orderDefine: 230,
				fieldEmbedListConfig: 'flec_data_obj_table',
				indexTable: 0
			},

			/* list */
			{
				codeFieldElement: 'tagSection',
				codeColor: 'primary',
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
				codeFieldElement: 'toggle',
				columnName: 'isListSuppressFilterSort',
				isDisplayable: true,
				orderDisplay: 260,
				orderDefine: 260,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isListSuppressSelect',
				isDisplayable: true,
				orderDisplay: 265,
				orderDefine: 265,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'listReorderColumn',
				isDisplayable: true,
				orderDisplay: 270,
				orderDefine: 270,
				fieldListItems: 'il_sys_column_order_name',
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isListEdit',
				isDisplayable: true,
				orderDisplay: 290,
				orderDefine: 290,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeListPresetType',
				isDisplayable: true,
				orderDisplay: 300,
				orderDefine: 300,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmValue: 'ct_sys_do_list_edit_preset_type'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 310,
				orderDefine: 310
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'listPresetExpr',
				isDisplayable: true,
				orderDisplay: 320,
				orderDefine: 320,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 330,
				orderDefine: 330
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

	init.addTrans('sysNodeObj', {
		children: [{ node: 'node_obj_sys_admin_data_obj_detail', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_sys_admin_data_obj_list',
		header: 'Data Objects',
		name: 'node_obj_sys_admin_data_obj_list',
		orderDefine: 60,
		owner: 'sys_system'
	})

	init.addTrans('sysNodeObj', {
		children: [{ node: 'node_obj_sys_admin_data_obj_column_list', order: 10 }],
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_sys_admin_data_obj_detail',
		header: 'Data Object',
		name: 'node_obj_sys_admin_data_obj_detail',
		orderDefine: 10,
		owner: 'sys_system'
	})
}

function initDataObjColumn(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		exprFilter:
			'.id IN (SELECT sys_core::SysDataObj FILTER .id = <tree,uuid,SysDataObj.id>).columns.id',
		header: 'Columns',
		listReorderColumn: 'orderDefine',
		name: 'data_obj_sys_admin_data_obj_column_list',
		owner: 'sys_system',
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
				columnName: 'isDisplayable',
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isDisplay',
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'column',
				orderCrumb: 10,
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysColumn'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeFieldElement',
				orderCrumb: 20,
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'orderDefine',
				orderDefine: 60,
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

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		header: 'Column',
		name: 'data_obj_sys_admin_data_obj_column_detail',
		owner: 'sys_system',
		parentColumn: 'columns',
		parentTable: 'SysDataObj',
		queryRiders: [
			{
				codeQueryAction: 'customFunction',
				codeQueryFunction: 'qrfFileStorage',
				codeQueryPlatform: 'client',
				codeQueryType: 'save',
				codeTriggerTiming: 'pre',
				parmValueStr: 'customColFile'
			}
		],
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
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isDisplay',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'column',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				fieldListItems: 'il_sys_column_order_name',
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'nameCustom',
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
				columnName: 'codeDbDataSourceValue',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmValue: 'ct_sys_do_field_source_value'
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
				fieldListItemsParmValue: 'ct_sys_do_field_sort_dir'
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
				codeAccess: 'optional',
				columnName: 'exprSave',
				isDisplayable: true,
				orderDisplay: 245,
				orderDefine: 245,
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
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'columnBacklink',
				isDisplayable: true,
				orderDisplay: 305,
				orderDefine: 305,
				indexTable: 0,
				fieldListItems: 'il_sys_column_order_name'
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
				codeColor: 'primary',
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
				orderDisplay: 415,
				orderDefine: 415,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmValue: 'ct_sys_do_field_access'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeAlignmentAlt',
				isDisplayable: true,
				orderDisplay: 420,
				orderDefine: 420,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmValue: 'ct_db_col_alignment'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeFieldElement',
				isDisplayable: true,
				orderDisplay: 425,
				orderDefine: 425,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmValue: 'ct_sys_do_field_element'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isDisplayBlock',
				isDisplayable: true,
				orderDisplay: 427,
				orderDefine: 427,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 430,
				orderDefine: 430
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 432,
				orderDefine: 432
			},
			{
				codeAccess: 'optional',
				columnName: 'headerAlt',
				isDisplayable: true,
				orderDisplay: 434,
				orderDefine: 434,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'inputMaskAlt',
				isDisplayable: true,
				orderDisplay: 436,
				orderDefine: 436,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeColor',
				isDisplayable: true,
				orderDisplay: 438,
				orderDefine: 438,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmValue: 'ct_sys_tailwind_color'
			},
			{
				codeAccess: 'optional',
				columnName: 'height',
				isDisplayable: true,
				orderDisplay: 440,
				orderDefine: 440,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'width',
				isDisplayable: true,
				orderDisplay: 442,
				orderDefine: 442,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 445,
				orderDefine: 445
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 450,
				orderDefine: 450
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 510,
				orderDefine: 510
			},

			/* Display element - custom */
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_start',
				isDisplayable: true,
				orderDisplay: 515,
				orderDefine: 515,
				headerAlt: 'Custom'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 517,
				orderDefine: 517
			},
			{
				codeAccess: 'optional',
				columnName: 'customColLabel',
				isDisplayable: true,
				orderDisplay: 520,
				orderDefine: 520,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'action',
				isDisplayable: true,
				orderDisplay: 522,
				orderDefine: 522,
				indexTable: 0,
				fieldListItems: 'il_sys_user_action'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 526,
				orderDefine: 526
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 530,
				orderDefine: 530
			},
			{
				codeAccess: 'optional',
				columnName: 'customColActionValue',
				isDisplayable: true,
				orderDisplay: 535,
				orderDefine: 535,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'customColAlign',
				isDisplayable: true,
				orderDisplay: 540,
				orderDefine: 540,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'customColIsSubHeader',
				isDisplayable: true,
				orderDisplay: 550,
				orderDefine: 550,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 555,
				orderDefine: 555
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 560,
				orderDefine: 560
			},
			{
				codeAccess: 'optional',
				columnName: 'customColPrefix',
				isDisplayable: true,
				orderDisplay: 565,
				orderDefine: 565,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'customColSize',
				isDisplayable: true,
				orderDisplay: 570,
				orderDefine: 570,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'customColSource',
				isDisplayable: true,
				orderDisplay: 575,
				orderDefine: 575,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'customColSourceKey',
				isDisplayable: true,
				orderDisplay: 580,
				orderDefine: 580,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 585,
				orderDefine: 585
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'customColRawHTML',
				isDisplayable: true,
				orderDisplay: 590,
				orderDefine: 590,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'file',
				columnName: 'customColFile',
				isDisplayable: true,
				orderDisplay: 595,
				orderDefine: 595,
				indexTable: 0,
				width: 200
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 600,
				orderDefine: 600
			},

			/* Display element - list items */
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_start',
				isDisplayable: true,
				orderDisplay: 620,
				orderDefine: 620,
				headerAlt: 'List Items'
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
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'fieldListItemsParmValue',
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
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 675,
				orderDefine: 675
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_start',
				isDisplayable: true,
				orderDisplay: 680,
				orderDefine: 680,
				headerAlt: 'List Embed'
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
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'fieldEmbedListEdit',
				isDisplayable: true,
				orderDisplay: 710,
				orderDefine: 710,
				fieldListItems: 'il_sys_data_obj_field_embed_list_edit_order_name',
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'fieldEmbedListSelect',
				fieldListItems: 'il_sys_data_obj_field_embed_list_select_order_name',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 720,
				orderDefine: 720
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 730,
				orderDefine: 730
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 735,
				orderDefine: 735
			},

			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_start',
				isDisplayable: true,
				orderDisplay: 740,
				orderDefine: 740,
				headerAlt: 'Embed Shell'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'chips',
				columnName: 'customEmbedShellFields',
				fieldListItems: 'il_sys_data_obj_columns_order_name',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 750,
				orderDefine: 750
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 755,
				orderDefine: 755,
				headerAlt: 'List Embed'
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
				orderDisplay: 900,
				orderDefine: 900,
				headerAlt: 'Link'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'embedListConfig',
				columnName: 'linkColumns',
				isDisplayable: true,
				orderDisplay: 910,
				orderDefine: 910,
				fieldEmbedListConfig: 'flec_data_obj_column_link',
				indexTable: 0,
				linkColumns: ['column', 'name'],
				linkTable: 'SysDataObjColumnLink'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'linkTable',
				isDisplayable: true,
				orderDisplay: 940,
				orderDefine: 940,
				indexTable: 0,
				fieldListItems: 'il_sys_table_order_name'
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 950,
				orderDefine: 950
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

	init.addTrans('sysNodeObj', {
		children: [{ node: 'node_obj_sys_admin_data_obj_column_detail', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_sys_admin_data_obj_column_list',
		header: 'Columns',
		name: 'node_obj_sys_admin_data_obj_column_list',
		orderDefine: 20,
		owner: 'sys_system'
	})

	init.addTrans('sysNodeObj', {
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_sys_admin_data_obj_column_detail',
		header: 'Column',
		name: 'node_obj_sys_admin_data_obj_column_detail',
		orderDefine: 10,
		owner: 'sys_system'
	})
}
