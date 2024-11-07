import { InitDb } from '$server/dbEdge/init/types.init'

export function initAdminOrg(init: InitDb) {
	initOrgSys(init)
	initOrgUser(init)
}

function initOrgSys(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		header: 'Organizations (System)',
		exprFilter: 'none',
		name: 'data_obj_sys_org_list_sys',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysOrg' }],
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
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Organization (System)',
		name: 'data_obj_sys_org_detail_sys',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysOrg' }],
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
		dataObj: 'data_obj_sys_org_list_sys',
		header: 'Organizations (System)',
		name: 'node_obj_sys_org_list_sys',
		orderDefine: 10,
		owner: 'sys_system_old'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		dataObj: 'data_obj_sys_org_detail_sys',
		header: 'Organization (System)',
		name: 'node_obj_sys_org_detail_sys',
		orderDefine: 10,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_org_list_sys'
	})
}

function initOrgUser(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_list_org_user',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		header: 'Organizations (User)',
		exprFilter: 'none',
		name: 'data_obj_sys_org_list_user',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysOrg' }],
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
				columnName: 'appName',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'logoFileName',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_detail_org_user',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Organization (User)',
		name: 'data_obj_sys_org_detail_user',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysOrg' }],
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
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'appName',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				matchColumn: 'name'
			},
			{
				codeAccess: 'optional',
				columnName: 'logoFileName',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0,
				matchColumn: 'name'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70
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
		dataObj: 'data_obj_sys_org_list_user',
		header: 'Organizations (User)',
		name: 'node_obj_sys_org_list_user',
		orderDefine: 10,
		owner: 'sys_system_old'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		dataObj: 'data_obj_sys_org_detail_user',
		header: 'Organization (User)',
		name: 'node_obj_sys_org_detail_user',
		orderDefine: 10,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_org_list_user'
	})
}
