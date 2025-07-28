import { InitDb } from '$server/dbGel/init/types.init'

export function initAdminSysObjBuild(init: InitDb) {
	initConfig(init)
}

async function initConfig(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		exprFilter: '.id IN <user,uuidlist,systemIds>',
		header: 'Systems (Build)',
		isListEdit: true,
		name: 'data_obj_admin_system_list_build',
		ownerSys: 'sys_system',
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
				codeAccess: 'readOnly',
				columnName: 'appName',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 25,
				orderDefine: 25
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
				columnName: 'testCodeSingle',
				fieldListItems: 'il_sys_code_order_index_by_codeType_name',
				fieldListItemsParmValue: 'ct_cm_cohort_attd_duration',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 40,
				orderDisplay: 40
			},
			{
				codeAccess: 'optional',
				columnName: 'testCodeMulti',
				fieldListItems: 'il_sys_code_order_index_by_codeType_name',
				fieldListItemsParmValue: 'ct_cm_cohort_attd_duration',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 50,
				orderDisplay: 50
			},
			{
				codeAccess: 'optional',
				columnName: 'testDate',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'currency',
				columnName: 'testNumberFloat',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'testNumberInt',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'testText',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,
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
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		header: 'System (Config)',
		name: 'data_obj_admin_system_detail_build',
		ownerSys: 'sys_system',
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
		children: [{ node: 'node_obj_admin_system_detail_build', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeApp',
		dataObj: 'data_obj_admin_system_list_build',
		header: 'Systems (Build)',
		name: 'node_obj_admin_system_list_build',
		orderDefine: 20,
		ownerSys: 'sys_system'
	})

	init.addTrans('sysNodeObj', {
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_admin_system_detail_build',
		header: 'Organization',
		name: 'node_obj_admin_system_detail_build',
		orderDefine: 10,
		ownerSys: 'sys_system'
	})
}
