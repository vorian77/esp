import { sectionHeader } from '$server/dbEdge/init/dbEdgeInit200Utilities10'
import {
	addDataObj,
	addDataObjFieldEmbedListConfig,
	addDataObjFieldEmbedListSelect
} from '$server/dbEdge/init/dbEdgeInit200Utilities20DataObj'
import { addNodeProgramObj } from '$server/dbEdge/init/dbEdgeInit200Utilities50Other'

export async function initAdminDataObj() {
	sectionHeader('SysAdmin - Data Object')

	await initDataObj()
	await initDataObjColumn()
}

async function initDataObj() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <tree,uuid,SysSystem.id>',
		header: 'Data Objects',
		name: 'data_obj_sys_admin_data_obj_list',
		owner: 'sys_system_old',
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
		owner: 'sys_system_old',
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
				linkExprSave: `(SELECT sys_core::SysSystem FILTER .id = <tree,uuid,SysSystem.id>)`,
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
				codeFieldElement: 'toggle',
				columnName: 'isSystemRootNode',
				isDisplayable: true,
				orderDisplay: 267,
				orderDefine: 267,
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
				indexTable: 0,
				linkTable: 'SysColumn'
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
				columnName: 'codeListEditPresetType',
				isDisplayable: true,
				orderDisplay: 300,
				orderDefine: 300,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_list_edit_preset_type',
				linkTable: 'SysCode'
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
				columnName: 'listEditPresetExpr',
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
		isHideRowManager: false,
		name: 'node_obj_sys_admin_data_obj_list',
		orderDefine: 60,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_system_object_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_detail',
		header: 'Data Object',
		isHideRowManager: false,
		name: 'node_obj_sys_admin_data_obj_detail',
		orderDefine: 10,
		owner: 'sys_system_old',
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
		owner: 'sys_system_old',
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

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Column',
		name: 'data_obj_sys_admin_data_obj_column_detail',
		owner: 'sys_system_old',
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
				indexTable: 0,
				linkTable: 'SysColumn'
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
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'columnBacklink',
				isDisplayable: true,
				orderDisplay: 305,
				orderDefine: 305,
				indexTable: 0,
				fieldListItems: 'il_sys_column_order_name',
				linkTable: 'SysColumn'
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
				orderDisplay: 415,
				orderDefine: 415,
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
				orderDisplay: 420,
				orderDefine: 420,
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
				orderDisplay: 425,
				orderDefine: 425,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_field_element',
				linkTable: 'SysCode'
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
				orderDisplay: 434,
				orderDefine: 434
			},
			{
				codeAccess: 'optional',
				columnName: 'headerAlt',
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
				fieldListItemsParmName: 'ct_sys_tailwind_color',
				linkTable: 'SysCode'
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
				codeFieldElement: 'toggle',
				columnName: 'isDisplayBlock',
				isDisplayable: true,
				orderDisplay: 444,
				orderDefine: 444,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 446,
				orderDefine: 446
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
				codeAccess: 'optional',
				codeFieldElement: 'embedListConfig',
				columnName: 'items',
				fieldEmbedListConfig: 'flec_data_obj_data_obj_column_item',
				indexTable: 0,
				isDisplayable: true,
				linkTable: 'SysDataObjColumnItem',
				orderDefine: 670,
				orderDisplay: 670
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
				fieldListItems: 'il_sys_data_obj_field_embed_list_select_order_name',
				indexTable: 0,
				isDisplayable: true,
				linkTable: 'SysDataObjFieldEmbedListSelect',
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
				codeFieldElement: 'customHeader',
				columnName: 'custom_element',
				customElement: { label: 'Embed Shell' },
				isDisplayable: true,
				orderDisplay: 740,
				orderDefine: 740,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'chips',
				columnName: 'customEmbedShellFields',
				fieldListItems: 'il_sys_data_obj_columns_order_name',
				indexTable: 0,
				isDisplayable: true,
				linkTable: 'SysDataObjColumn',
				orderDisplay: 750,
				orderDefine: 750
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
				linkTable: 'SysDataObjColumnLink'
			},
			{
				codeAccess: 'optional',
				columnName: 'linkExprSave',
				isDisplayable: true,
				orderDisplay: 920,
				orderDefine: 920,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'linkExprSelect',
				isDisplayable: true,
				orderDisplay: 930,
				orderDefine: 930,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'linkTable',
				isDisplayable: true,
				orderDisplay: 940,
				orderDefine: 940,
				indexTable: 0,
				fieldListItems: 'il_sys_table_order_name',
				linkTable: 'SysTable'
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
		isHideRowManager: false,
		name: 'node_obj_sys_admin_data_obj_column_list',
		orderDefine: 20,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_admin_data_obj_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_column_detail',
		header: 'Column',
		isHideRowManager: false,
		name: 'node_obj_sys_admin_data_obj_column_detail',
		orderDefine: 10,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_admin_data_obj_column_list'
	})
}
