import { InitDb } from '$server/dbGel/init/types.init'

const FILENAME = '$server/dbGel/init/dbGelInit80ContentAppApi.ts'

export function initContentAppApi(init: InitDb) {
	initApi(init)
	initApiTable(init)
}

function initApi(init: InitDb) {
	init.addTrans('sysDataObj', {
		ownerSys: 'sys_app_api',
		codeCardinality: 'list',
		name: 'data_obj_app_api_list',
		header: 'APIs',
		tables: [{ index: 0, table: 'SysApi' }],
		// exprFilter: `.ownerSys.id = <tree,uuid,SysSystem.id>`,
		exprFilter: `none`,
		actionGroup: 'doag_list',
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
				indexTable: 0,
				isDisplayable: true,
				orderCrumb: 10,
				orderDefine: 20,
				orderDisplay: 20,
				orderSort: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'description',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 30,
				orderDisplay: 30
			}
		]
	})

	init.addTrans('sysDataObj', {
		ownerSys: 'sys_app_api',
		codeCardinality: 'detail',
		name: 'data_obj_app_api_detail',
		header: 'API',
		tables: [{ index: 0, table: 'SysApi' }],
		actionGroup: 'doag_detail',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'ownerSys',
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
				orderDefine: 30,
				orderDisplay: 30
			},
			{
				columnName: 'name',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 40,
				orderDisplay: 40
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDefine: 50,
				orderDisplay: 50
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'description',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 60,
				orderDisplay: 60
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
		children: [{ node: 'node_obj_app_api_detail', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeApp',
		dataObj: 'data_obj_app_api_list',
		header: 'APIs',
		name: 'node_obj_app_api_list',
		orderDefine: 10,
		ownerSys: 'sys_app_api'
	})
	init.addTrans('sysNodeObj', {
		children: [{ node: 'node_obj_app_api_table_list', order: 10 }],
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_app_api_detail',
		header: 'API',
		name: 'node_obj_app_api_detail',
		orderDefine: 10,
		ownerSys: 'sys_app_api'
	})
}

function initApiTable(init: InitDb) {
	init.addTrans('sysDataObj', {
		ownerSys: 'sys_app_api',
		codeCardinality: 'list',
		exprFilter: '.id IN (SELECT sys_api::SysApi FILTER .id = <tree,uuid,SysApi.id>).tables.id',
		name: 'data_obj_app_api_table_list',
		header: 'Tables',
		tables: [{ index: 0, table: 'SysApiTable' }],
		actionGroup: 'doag_list',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isActive',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 20,
				orderDisplay: 20
			},
			{
				codeAccess: 'readOnly',
				columnName: 'apiTabRemoteName',
				indexTable: 0,
				isDisplayable: true,
				orderCrumb: 10,
				orderDefine: 30,
				orderDisplay: 30,
				orderSort: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'apiTabLocalMod',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 40,
				orderDisplay: 40
			},
			{
				codeAccess: 'readOnly',
				columnName: 'apiTabLocalName',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 50,
				orderDisplay: 50
			},
			{
				codeAccess: 'readOnly',
				columnName: 'description',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 60,
				orderDisplay: 60
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		header: 'Table',
		name: 'data_obj_app_api_table_detail',
		ownerSys: 'sys_app_api',
		parentColumn: 'tables',
		parentTable: 'SysApi',
		tables: [{ index: 0, table: 'SysApiTable' }],
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
				orderDefine: 30,
				orderDisplay: 30
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isActive',
				exprPreset: `(SELECT true)`,
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				columnName: 'apiTabRemoteName',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDefine: 60,
				orderDisplay: 60
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDefine: 70,
				orderDisplay: 70
			},
			{
				columnName: 'apiTabLocalMod',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				columnName: 'apiTabLocalName',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDefine: 100,
				orderDisplay: 100
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'description',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 110,
				orderDisplay: 110
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'fileData',
				columnName: 'file',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120,
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
		children: [{ node: 'node_obj_app_api_table_detail', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeApp',
		dataObj: 'data_obj_app_api_table_list',
		header: 'Tables',
		name: 'node_obj_app_api_table_list',
		orderDefine: 10,
		ownerSys: 'sys_app_api'
	})
	init.addTrans('sysNodeObj', {
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_app_api_table_detail',
		header: 'Table',
		name: 'node_obj_app_api_table_detail',
		orderDefine: 10,
		ownerSys: 'sys_app_api'
	})
}
