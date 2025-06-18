import { InitDb } from '$server/dbGel/init/types.init'

const FILENAME = '$server/dbGel/init/dbGelInit60SysAdmin20SysTools.ts'

export function initAdminSysTools(init: InitDb) {
	initError(init)
}

function initError(init: InitDb) {
	init.addTrans('sysDataObj', {
		owner: 'sys_system',

		codeCardinality: 'list',
		name: 'data_obj_sys_admin_tool_error_list',
		header: 'Errors',
		tables: [
			{ index: 0, table: 'SysError' },
			{ columnParent: 'user', indexParent: 0, index: 1, table: 'SysUser' },
			{ columnParent: 'person', indexParent: 1, index: 2, table: 'SysPerson' }
		],
		exprFilter: 'none',
		actionGroup: 'doag_list_edit_download',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				codeSortDir: 'desc',
				columnName: 'createdAt',
				indexTable: 0,
				isDisplayable: true,
				orderCrumb: 10,
				orderDefine: 20,
				orderDisplay: 20,
				orderSort: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isClosed',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'errStatus',
				isDisplayable: true,
				orderDisplay: 35,
				orderDefine: 35,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'errCode',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'errFile',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'errFunction',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'errMsgSystem',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'errMsgUser',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 1
			},
			{
				codeAccess: 'readOnly',
				columnName: 'firstName',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 2
			},
			{
				codeAccess: 'readOnly',
				columnName: 'lastName',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 2
			},
			{
				codeAccess: 'readOnly',
				columnName: 'email',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 2
			}
		]
	})

	init.addTrans('sysDataObj', {
		owner: 'sys_system',

		codeCardinality: 'detail',
		name: 'data_obj_sys_admin_tool_error_detail',
		header: 'Error',
		tables: [
			{ index: 0, table: 'SysError' },
			{ columnParent: 'user', indexParent: 0, index: 1, table: 'SysUser' },
			{ columnParent: 'person', indexParent: 1, index: 2, table: 'SysPerson' }
		],
		actionGroup: 'doag_detail_error',
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_start',
				headerAlt: 'Error',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isClosed',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeAccess: 'readOnly',
				columnName: 'errStatus',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 65,
				orderDefine: 65
			},
			{
				codeAccess: 'readOnly',
				columnName: 'errCode',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80
			},
			{
				codeAccess: 'readOnly',
				codeFieldElement: 'textArea',
				columnName: 'errMsgSystem',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90
			},
			{
				codeAccess: 'readOnly',
				codeFieldElement: 'textArea',
				columnName: 'errMsgUser',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_start',
				headerAlt: 'User',
				isDisplayable: true,
				orderDisplay: 200,
				orderDefine: 200
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 210,
				orderDefine: 210
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				indexTable: 1,
				isDisplayable: true,
				orderDisplay: 220,
				orderDefine: 220
			},
			{
				codeAccess: 'readOnly',
				columnName: 'firstName',
				indexTable: 2,
				isDisplayable: true,
				orderDisplay: 230,
				orderDefine: 230
			},
			{
				codeAccess: 'readOnly',
				columnName: 'lastName',
				indexTable: 2,
				isDisplayable: true,
				orderDisplay: 240,
				orderDefine: 240
			},
			{
				codeAccess: 'readOnly',
				columnName: 'email',
				indexTable: 2,
				isDisplayable: true,
				orderDisplay: 250,
				orderDefine: 250
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 260,
				orderDefine: 260
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 270,
				orderDefine: 270
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'note',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 400,
				orderDefine: 400
			}
		]
	})
	init.addTrans('sysNodeObjProgramObj', {
		children: [{ node: 'node_obj_sys_admin_tool_error_detail', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_sys_admin_tool_error_list',
		header: 'Errors',
		name: 'node_obj_sys_admin_tool_error_list',
		orderDefine: 50,
		owner: 'sys_system'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_sys_admin_tool_error_detail',
		header: 'Error',
		name: 'node_obj_sys_admin_tool_error_detail',
		orderDefine: 10,
		owner: 'sys_system'
	})
}
