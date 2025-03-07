import { InitDb } from '$server/dbGel/init/types.init'

export function initAdminOrgUser(init: InitDb) {
	initFieldListSelectOrg(init)
	initFieldListSelectSystem(init)
	initFieldListSelectUserType(init)

	initOrg(init)
	initSystem(init)
	initUser(init)
}

function initFieldListSelectOrg(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_embed_list_select',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeDataObjType: 'embed',
		exprFilter: `.id IN (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>).orgs.id`,
		header: 'Select Organization(s)',
		name: 'dofls_sys_admin_org_user_org',
		owner: 'sys_system',
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
				orderSort: 20,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObjFieldEmbedListSelect', {
		actionGroupModal: 'doag_dialog_footer_list',
		btnLabelComplete: 'Select Organization(s)',
		dataObjList: 'dofls_sys_admin_org_user_org',
		name: 'fels_sys_admin_org',
		owner: 'sys_system'
	})
}

function initFieldListSelectSystem(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_embed_list_select',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeDataObjType: 'embed',
		exprFilter: `.owner IN (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>).orgs`,
		header: 'Select System(s)',
		name: 'dofls_sys_admin_org_user_system',
		owner: 'sys_system',
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
				orderSort: 20,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObjFieldEmbedListSelect', {
		actionGroupModal: 'doag_dialog_footer_list',
		btnLabelComplete: 'Select System(s)',
		dataObjList: 'dofls_sys_admin_org_user_system',
		name: 'fels_sys_admin_system',
		owner: 'sys_system'
	})
}

function initFieldListSelectUserType(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_embed_list_select',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		codeDataObjType: 'embed',
		exprFilter: `.isGlobalResource UNION .owner.owner IN (SELECT sys_user::SysUser FILTER .id = <user,uuid,id>).orgs`,
		header: 'Select User Types',
		name: 'dofls_sys_sys_admin_user_type',
		owner: 'sys_system',
		tables: [{ index: 0, table: 'SysUserType' }],
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

	init.addTrans('sysDataObjFieldEmbedListSelect', {
		actionGroupModal: 'doag_dialog_footer_list',
		btnLabelComplete: 'Select UserType(s)',
		dataObjList: 'dofls_sys_sys_admin_user_type',
		name: 'fels_sys_sys_admin_user_type',
		owner: 'sys_system'
	})
}

function initOrg(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		header: 'Organizations (User)',
		exprFilter: 'none',
		name: 'data_obj_sys_admin_org_list_user',
		owner: 'sys_system',
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
				indexTable: 0,
				isDisplayable: true,
				orderCrumb: 10,
				orderDisplay: 10,
				orderDefine: 10,
				orderSort: 10
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Organization (User)',
		name: 'data_obj_sys_admin_org_detail_user',
		owner: 'sys_system',
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
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
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

	init.addTrans('sysNodeObjProgram', {
		children: ['node_obj_sys_admin_org_detail_user'],
		codeIcon: 'AppWindow',
		codeNodeType: 'program',
		data: [{ dataObj: 'data_obj_sys_admin_org_list_user' }],
		header: 'Organizations (User)',
		name: 'node_obj_sys_admin_org_list_user',
		orderDefine: 10,
		owner: 'sys_system'
	})
	init.addTrans('sysNodeObjProgramObj', {
		children: ['node_obj_sys_admin_system_list_user', 'node_obj_sys_admin_user_list_user'],
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		data: [{ dataObj: 'data_obj_sys_admin_org_detail_user' }],
		header: 'Organization (User)',
		name: 'node_obj_sys_admin_org_detail_user',
		orderDefine: 10,
		owner: 'sys_system'
	})
}

function initSystem(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		header: 'Systems',
		exprFilter: '.owner.id = <tree,uuid,SysOrg.id>',
		name: 'data_obj_sys_admin_system_list_user',
		owner: 'sys_system',
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
				orderDisplay: 0,
				orderDefine: 30,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'System',
		name: 'data_obj_sys_admin_system_detail_user',
		owner: 'sys_system',
		tables: [{ index: 0, table: 'SysSystem' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				exprSave: `(SELECT sys_core::SysOrg FILTER .id = <tree,uuid,SysOrg.id>)`,
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkTable: 'SysOrg'
			},
			{
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'header',
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

	init.addTrans('sysNodeObjProgramObj', {
		children: ['node_obj_sys_admin_system_detail_user'],
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		data: [{ dataObj: 'data_obj_sys_admin_system_list_user' }],
		header: 'Systems',
		name: 'node_obj_sys_admin_system_list_user',
		orderDefine: 10,
		owner: 'sys_system'
	})
	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		data: [{ dataObj: 'data_obj_sys_admin_system_detail_user' }],
		header: 'System',
		name: 'node_obj_sys_admin_system_detail_user',
		orderDefine: 10,
		owner: 'sys_system'
	})
}

function initUser(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <tree,uuid,SysOrg.id>',
		header: 'Users',
		name: 'data_obj_sys_admin_user_list_user',
		owner: 'sys_system',
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
				columnName: 'firstName',
				orderCrumb: 20,
				orderSort: 20,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 1
			},
			{
				codeAccess: 'readOnly',
				columnName: 'lastName',
				orderCrumb: 30,
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 1
			},
			{
				codeAccess: 'readOnly',
				columnName: 'userName',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'defaultOrg',
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysOrg'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'defaultSystem',
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysSystem'
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'User',
		name: 'data_obj_sys_admin_user_detail_user',
		owner: 'sys_system',
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
				columnName: 'owner',
				exprSave: `(SELECT sys_core::SysOrg FILTER .id = <tree,uuid,SysOrg.id>)`,
				indexTable: 0,
				isDisplayable: false,
				linkTable: 'SysOrg',
				orderDefine: 20
			},
			{
				codeFieldElement: 'textHide',
				columnName: 'password',
				exprPreset: `(SELECT 'abc*$789!+_)')`,
				indexTable: 0,
				isDisplayable: false,
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
				columnName: 'firstName',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 1
			},
			{
				columnName: 'lastName',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 1
			},
			{
				columnName: 'userName',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
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
				codeFieldElement: 'select',
				columnName: 'defaultOrg',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 0,
				fieldListItems: 'il_sys_user_org'
			},
			{
				codeFieldElement: 'select',
				columnName: 'defaultSystem',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 0,
				fieldListItems: 'il_sys_user_system'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'embedListSelect',
				columnName: 'orgs',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140,
				fieldEmbedListSelect: 'fels_sys_admin_org',
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysOrg'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'embedListSelect',
				columnName: 'systems',
				isDisplayable: true,
				orderDisplay: 150,
				orderDefine: 150,
				fieldEmbedListSelect: 'fels_sys_admin_system',
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysSystem'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'embedListSelect',
				columnName: 'userTypes',
				isDisplayable: true,
				orderDisplay: 160,
				orderDefine: 160,
				fieldEmbedListSelect: 'fels_sys_sys_admin_user_type',
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysUserType'
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
	init.addTrans('sysNodeObjProgramObj', {
		children: ['node_obj_sys_admin_user_detail_user'],
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		data: [{ dataObj: 'data_obj_sys_admin_user_list_user' }],
		header: 'Users',
		name: 'node_obj_sys_admin_user_list_user',
		orderDefine: 20,
		owner: 'sys_system'
	})

	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		data: [{ dataObj: 'data_obj_sys_admin_user_detail_user' }],
		header: 'User',
		name: 'node_obj_sys_admin_user_detail_user',
		orderDefine: 10,
		owner: 'sys_system'
	})
}
