import { InitDb } from '$server/dbGel/init/types.init'
import { head } from '@vercel/blob'

export function initAdminSysTools(init: InitDb) {
	initError(init)
	initFieldListSelectSystem(init)
	initFieldListSelectUserAll(init)
}

function initError(init: InitDb) {
	init.addTrans('sysDataObj', {
		ownerSys: 'sys_system',
		codeCardinality: 'list',
		name: 'data_obj_sys_admin_tool_error_list',
		header: 'Errors',
		tables: [
			{ index: 0, table: 'SysError' },
			{ columnParent: 'user', indexParent: 0, index: 1, table: 'SysUser' },
			{ columnParent: 'person', indexParent: 1, index: 2, table: 'SysPerson' }
		],
		exprFilter: 'none',
		actionGroup: 'doag_list_error',
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
		ownerSys: 'sys_system',
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
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeAccess: 'readOnly',
				columnName: 'errCode',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100
			},
			{
				codeAccess: 'readOnly',
				columnName: 'errFile',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110
			},
			{
				codeAccess: 'readOnly',
				columnName: 'errFunction',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130
			},
			{
				codeAccess: 'readOnly',
				codeFieldElement: 'textArea',
				columnName: 'errMsgSystem',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140
			},
			{
				codeAccess: 'readOnly',
				codeFieldElement: 'textArea',
				columnName: 'errMsgUser',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 150,
				orderDefine: 150
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 160,
				orderDefine: 160
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
	init.addTrans('sysNodeObj', {
		children: [{ node: 'node_obj_sys_admin_tool_error_detail', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeApp',
		dataObj: 'data_obj_sys_admin_tool_error_list',
		header: 'Errors',
		name: 'node_obj_sys_admin_tool_error_list',
		orderDefine: 1000,
		ownerSys: 'sys_system'
	})
	init.addTrans('sysNodeObj', {
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_sys_admin_tool_error_detail',
		header: 'Error',
		name: 'node_obj_sys_admin_tool_error_detail',
		orderDefine: 10,
		ownerSys: 'sys_system'
	})
}

function initFieldListSelectSystem(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_embed_list_select',
		codeCardinality: 'list',
		codeDataObjType: 'doEmbed',
		exprFilter: 'none',
		header: 'Select System(s)',
		name: 'dofls_admin_system',
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
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'appName',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObjFieldEmbedListSelect', {
		actionGroupModal: 'doag_dialog_footer_list_select',
		btnLabelComplete: 'Select System(s)',
		dataObjList: 'dofls_admin_system',
		name: 'fels_admin_system',
		ownerSys: 'sys_system'
	})
}

function initFieldListSelectUserAll(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_embed_list_select',
		codeCardinality: 'list',
		codeDataObjType: 'doEmbed',
		exprFilter: 'none',
		header: 'Select Users',
		name: 'dofls_sys_user',
		ownerSys: 'sys_system',
		tables: [
			{ index: 0, table: 'SysUser' },
			{ columnParent: 'person', indexParent: 0, index: 1, table: 'SysPerson' }
		],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'ownerOrg',
				indexTable: 0,
				isDisplayable: true,
				linkColumns: ['header'],
				linkTable: 'SysOrg',
				orderDefine: 20,
				orderDisplay: 20,
				orderSort: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'lastName',
				indexTable: 1,
				isDisplayable: true,
				orderDefine: 30,
				orderDisplay: 30,
				orderSort: 20
			},
			{
				codeAccess: 'readOnly',
				columnName: 'firstName',
				indexTable: 1,
				isDisplayable: true,
				orderDefine: 40,
				orderDisplay: 40,
				orderSort: 30
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				headerAlt: 'Username',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 50,
				orderDisplay: 50
			}
		]
	})

	init.addTrans('sysDataObjFieldEmbedListSelect', {
		actionGroupModal: 'doag_dialog_footer_list_select',
		btnLabelComplete: 'Select',
		dataObjList: 'dofls_sys_user',
		name: 'fels_sys_user',
		ownerSys: 'sys_system'
	})
}
