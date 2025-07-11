import { InitDb } from '$server/dbGel/init/types.init'

export function initAdminSysObjMigration(init: InitDb) {
	initMigr(init)
	initMigrSourceTable(init)
	initMigrSourceColumn(init)
	initMigrTargetTable(init)
	initMigrTargetColumn(init)
	initMigrProcess(init)
}

function initMigr(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		exprFilter: '.owner.id = <tree,uuid,SysSystem.id>',
		header: 'Migrations',
		name: 'data_obj_sys_admin_migr_list',
		owner: 'sys_system',
		tables: [{ index: 0, table: 'SysMigr' }],
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
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'description',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail_migrate_define',
		codeCardinality: 'detail',
		header: 'Migration',
		name: 'data_obj_sys_admin_migr_detail',
		owner: 'sys_system',
		tables: [{ index: 0, table: 'SysMigr' }],
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
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'description',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
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

	init.addTrans('sysNodeObj', {
		children: [{ node: 'node_obj_sys_admin_migr_detail', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_sys_admin_migr_list',
		header: 'Migrations',
		name: 'node_obj_sys_admin_migr_list',
		orderDefine: 140,
		owner: 'sys_system'
	})
	init.addTrans('sysNodeObj', {
		children: [
			{ node: 'node_obj_sys_admin_migr_source_table_list', order: 10 },
			{ node: 'node_obj_sys_admin_migr_target_table_list', order: 20 }
		],
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_sys_admin_migr_detail',
		header: 'Migration',
		name: 'node_obj_sys_admin_migr_detail',
		orderDefine: 10,
		owner: 'sys_system'
	})
}

function initMigrSourceTable(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		exprFilter:
			'.id IN (SELECT sys_migr::SysMigr FILTER .id = <tree,uuid,SysMigr.id>).tablesSource.id',
		header: 'Source Tables',
		name: 'data_obj_sys_admin_migr_source_table_list',
		owner: 'sys_system',
		parentColumn: 'tablesSource',
		parentTable: 'SysMigr',
		tables: [{ index: 0, table: 'SysMigrSourceTable' }],
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
				columnName: 'codeMigrSourceType',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'exprSelect',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		header: 'Source Table',
		name: 'data_obj_sys_admin_migr_source_table_detail',
		owner: 'sys_system',
		parentColumn: 'tablesSource',
		parentTable: 'SysMigr',
		tables: [{ index: 0, table: 'SysMigrSourceTable' }],
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
				codeFieldElement: 'select',
				columnName: 'codeMigrSourceType',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmValue: 'ct_sys_migr_source_type'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'exprSelect',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
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

	init.addTrans('sysNodeObj', {
		children: [{ node: 'node_obj_sys_admin_migr_source_table_detail', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_sys_admin_migr_source_table_list',
		header: 'Source Tables',
		name: 'node_obj_sys_admin_migr_source_table_list',
		orderDefine: 10,
		owner: 'sys_system'
	})

	init.addTrans('sysNodeObj', {
		children: [{ node: 'node_obj_sys_admin_migr_source_column_list', order: 10 }],
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_sys_admin_migr_source_table_detail',
		header: 'Source Table',
		name: 'node_obj_sys_admin_migr_source_table_detail',
		orderDefine: 10,
		owner: 'sys_system'
	})
}

function initMigrSourceColumn(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		exprFilter:
			'.id IN (SELECT sys_migr::SysMigrSourceTable FILTER .id = <tree,uuid,SysMigrSourceTable.id>).columns.id',
		header: 'Columns',
		name: 'data_obj_sys_admin_migr_source_column_list',
		owner: 'sys_system',
		parentColumn: 'columns',
		parentTable: 'SysMigrSourceTable',
		tables: [{ index: 0, table: 'SysMigrSourceColumn' }],
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
				columnName: 'codeDataType',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysCode'
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		header: 'Column',
		name: 'data_obj_sys_admin_migr_source_column_detail',
		owner: 'sys_system',
		parentColumn: 'columns',
		parentTable: 'SysMigrSourceTable',
		tables: [{ index: 0, table: 'SysMigrSourceColumn' }],
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
				codeFieldElement: 'select',
				columnName: 'codeDataType',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmValue: 'ct_db_col_data_type'
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
		children: [{ node: 'node_obj_sys_admin_migr_source_column_detail', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_sys_admin_migr_source_column_list',
		header: 'Columns',
		name: 'node_obj_sys_admin_migr_source_column_list',
		orderDefine: 10,
		owner: 'sys_system'
	})

	init.addTrans('sysNodeObj', {
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_sys_admin_migr_source_column_detail',
		header: 'Column',
		name: 'node_obj_sys_admin_migr_source_column_detail',
		orderDefine: 10,
		owner: 'sys_system'
	})
}

function initMigrTargetTable(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		exprFilter:
			'.id IN (SELECT sys_migr::SysMigr FILTER .id = <tree,uuid,SysMigr.id>).tablesTarget.id',
		header: 'Target Tables',
		listReorderColumn: 'orderDefine',
		name: 'data_obj_sys_admin_migr_target_table_list',
		owner: 'sys_system',
		parentColumn: 'tablesTarget',
		parentTable: 'SysMigr',
		tables: [{ index: 0, table: 'SysMigrTargetTable' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'table',
				orderCrumb: 10,
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isActive',
				isExcludeUpdate: true,
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isInitTable',
				isExcludeUpdate: true,
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

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		header: 'Target Table',
		name: 'data_obj_sys_admin_migr_target_table_detail',
		owner: 'sys_system',
		parentColumn: 'tablesTarget',
		parentTable: 'SysMigr',
		tables: [{ index: 0, table: 'SysMigrTargetTable' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeFieldElement: 'select',
				columnName: 'table',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				fieldListItems: 'il_sys_table_order_name'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isActive',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,

				exprPreset: `(SELECT true)`,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isInitTable',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,

				exprPreset: `(SELECT false)`,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				codeFieldElement: 'number',
				columnName: 'orderDefine',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				exprPreset: `(SELECT (count((SELECT sys_migr::SysMigr FILTER .id = <tree,uuid,SysMigr.id>).tablesTarget) + 1))`,
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

	init.addTrans('sysNodeObj', {
		children: [{ node: 'node_obj_sys_admin_migr_target_table_detail', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_sys_admin_migr_target_table_list',
		header: 'Target Tables',
		name: 'node_obj_sys_admin_migr_target_table_list',
		orderDefine: 20,
		owner: 'sys_system'
	})

	init.addTrans('sysNodeObj', {
		children: [{ node: 'node_obj_sys_admin_migr_target_column_list', order: 10 }],
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_sys_admin_migr_target_table_detail',
		header: 'Target Table',
		name: 'node_obj_sys_admin_migr_target_table_detail',
		orderDefine: 10,
		owner: 'sys_system'
	})
}

function initMigrTargetColumn(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		exprFilter:
			'.id IN (SELECT sys_migr::SysMigrTargetTable FILTER .id = <tree,uuid,SysMigrTargetTable.id>).columns.id',
		header: 'Columns',
		listReorderColumn: 'orderDefine',
		name: 'data_obj_sys_admin_migr_target_column_list',
		owner: 'sys_system',
		parentColumn: 'columns',
		parentTable: 'SysMigrTargetTable',
		tables: [{ index: 0, table: 'SysMigrTargetColumn' }],
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
				isExcludeUpdate: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysColumn'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isActive',
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'expr',
				isDisplayable: true,
				isExcludeUpdate: true,
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

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		header: 'Column',
		name: 'data_obj_sys_admin_migr_target_column_detail',
		owner: 'sys_system',
		parentColumn: 'columns',
		parentTable: 'SysMigrTargetTable',
		tables: [{ index: 0, table: 'SysMigrTargetColumn' }],
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
				fieldListItems: 'il_sys_migr_target_table_column_order_name'
			},
			{
				codeFieldElement: 'textArea',
				columnName: 'expr',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isActive',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				exprPreset: `(SELECT true)`,
				indexTable: 0
			},
			{
				codeFieldElement: 'number',
				columnName: 'orderDefine',
				orderDefine: 50,
				exprPreset: `(SELECT (count((SELECT sys_migr::SysMigrTargetTable FILTER .id = <tree,uuid,SysMigrTargetTable.id>).columns) + 1))`,
				indexTable: 0,
				isDisplayable: true
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
		children: [{ node: 'node_obj_sys_admin_migr_target_column_detail', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_sys_admin_migr_target_column_list',
		header: 'Columns',
		name: 'node_obj_sys_admin_migr_target_column_list',
		orderDefine: 10,
		owner: 'sys_system'
	})

	init.addTrans('sysNodeObj', {
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_sys_admin_migr_target_column_detail',
		header: 'Column',
		name: 'node_obj_sys_admin_migr_target_column_detail',
		orderDefine: 10,
		owner: 'sys_system'
	})
}

function initMigrProcess(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail_migrate_process',
		codeCardinality: 'detail',
		exprFilter: '.id = <parms,uuid,migrId>',
		header: 'Process - Migration',
		name: 'data_obj_process_sys_admin_migr',
		owner: 'sys_system',
		tables: [{ index: 0, table: 'SysMigr' }],
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
			},
			{
				codeAccess: 'readOnly',
				codeFieldElement: 'textArea',
				columnName: 'description',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			}
		]
	})
}
