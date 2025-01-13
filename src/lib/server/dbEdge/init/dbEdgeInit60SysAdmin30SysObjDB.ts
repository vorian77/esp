import { InitDb } from '$server/dbEdge/init/types.init'

export function initAdminSysObjDB(init: InitDb) {
	initColumn(init)
	initTable(init)
}

function initColumn(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <tree,uuid,SysSystem.id>',
		header: 'Columns',
		name: 'data_obj_sys_admin_column_list',
		owner: 'sys_system_old',
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

	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Column',
		name: 'data_obj_sys_admin_column_detail',
		owner: 'sys_system_old',
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
				columnName: 'isFormTag',
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

	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_sys_admin_column_list',
		header: 'Columns',
		name: 'node_obj_sys_admin_column_list',
		orderDefine: 50,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_admin_system_detail_obj'
	})

	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_sys_admin_column_detail',
		header: 'Column',
		name: 'node_obj_sys_admin_column_detail',
		orderDefine: 10,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_admin_column_list'
	})
}

function initTable(init: InitDb) {
	// data objects
	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <tree,uuid,SysSystem.id>',
		header: 'Tables',
		name: 'data_obj_sys_admin_table_list',
		owner: 'sys_system_old',
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

	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Table',
		name: 'data_obj_sys_admin_table_detail',
		owner: 'sys_system_old',
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
				linkExprSave: `(SELECT sys_core::SysSystem FILTER .id = <tree,uuid,SysSystem.id>)`,
				linkTable: 'SysSystem'
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
				codeAccess: 'optional',
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

	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_sys_admin_table_list',
		header: 'Tables',
		name: 'node_obj_sys_admin_table_list',
		orderDefine: 160,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_admin_system_detail_obj'
	})

	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_sys_admin_table_detail',
		header: 'Table',
		name: 'node_obj_sys_admin_table_detail',
		orderDefine: 10,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_admin_table_list'
	})
}
