import { InitDb } from '$server/dbEdge/init/types.init'

export function initAdminConfig(init: InitDb) {
	initConfig(init)
}
async function initConfig(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: 'none',
		header: 'Systems (Config)',
		isListEdit: true,
		name: 'data_obj_sys_system_config_list',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysSystem' }],
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
				orderDisplay: 20,
				orderDefine: 20,
				orderSort: 20
			},
			{
				codeAccess: 'optional',
				columnName: 'testBool',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 30,
				orderDisplay: 30
			},
			{
				codeAccess: 'optional',
				columnName: 'testCodeMulti',
				fieldListItems: 'il_sys_code_order_index_by_codeType_name',
				fieldListItemsParmName: 'ct_cm_cohort_attd_duration',
				indexTable: 0,
				isDisplayable: true,
				linkTable: 'SysCode',
				orderDefine: 40,
				orderDisplay: 40
			},
			{
				codeAccess: 'optional',
				columnName: 'testCodeSingle',
				fieldListItems: 'il_sys_code_order_index_by_codeType_name',
				fieldListItemsParmName: 'ct_cm_cohort_attd_duration',
				indexTable: 0,
				isDisplayable: true,
				linkTable: 'SysCode',
				orderDefine: 50,
				orderDisplay: 50
			},
			{
				codeAccess: 'optional',
				columnName: 'testDate',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'currency',
				columnName: 'testNumberFloat',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'testNumberInt',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'testText',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'orderDefine',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 200,
				orderDisplay: 200
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'System (Config)',
		name: 'data_obj_sys_system_config_detail',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysSystem' }],
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
				orderDisplay: 30,
				orderDefine: 30,
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

	init.addTrans('sysNodeObjProgram', {
		codeIcon: 'AppWindow',
		dataObj: 'data_obj_sys_system_config_list',
		header: 'Systems (Config)',
		name: 'node_obj_sys_system_config_list',
		orderDefine: 20,
		owner: 'sys_system_old'
	})

	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		dataObj: 'data_obj_sys_system_config_detail',
		header: 'Organization',
		name: 'node_obj_sys_system_config_detail',
		orderDefine: 10,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_system_config_list'
	})
}
