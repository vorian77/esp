import { InitDb } from '$server/dbEdge/init/types.init'

export function initAdminUser(init: InitDb) {
	initFieldListSelectResources(init)
	initFieldListSelectSystem(init)
	initFieldListSelectUser(init)
	initFieldListSelectUserType(init)
	initUserOrg(init)
	initUserType(init)
	initWidget(init)
}

function initFieldListSelectResources(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_embed_list_select',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: `.resource.owner.id in <user,uuidlist,systemIdList> OR .resource.isGlobalResource = true`,
		header: 'Select Resource(s)',
		name: 'dofls_sys_admin_sys_user_type_resource',
		owner: 'sys_system_old',
		tables: [
			{ index: 0, table: 'SysUserTypeResource' },
			{ columnParent: 'resource', indexParent: 0, index: 1, table: 'SysObj' }
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
				columnName: 'codeType',
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderSort: 20,
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 1
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 1
			}
		]
	})
	init.addTrans('sysDataObjFieldEmbedListSelect', {
		actionFieldGroupModal: 'doag_dialog_footer_list',
		btnLabelComplete: 'Select Resource(s)',
		dataObjList: 'dofls_sys_admin_sys_user_type_resource',
		name: 'fels_sys_admin_sys_user_type_resource',
		owner: 'sys_system_old'
	})
}

function initFieldListSelectSystem(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_embed_list_select',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: `.id in <user,uuidlist,systemIdList>`,
		header: 'Select System(s)',
		name: 'dofls_sys_admin_org_user_system',
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
				orderSort: 20,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObjFieldEmbedListSelect', {
		actionFieldGroupModal: 'doag_dialog_footer_list',
		btnLabelComplete: 'Select System(s)',
		dataObjList: 'dofls_sys_admin_org_user_system',
		name: 'fels_sys_admin_system',
		owner: 'sys_system_old'
	})
}

function initFieldListSelectUser(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_embed_list_select',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '<tree,uuid,SysSystem.id> IN .systems.id',
		header: 'Select Users',
		name: 'dofls_sys_sys_admin_user',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysUser' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'userName',
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
		actionFieldGroupModal: 'doag_dialog_footer_list',
		btnLabelComplete: 'Select User(s)',
		dataObjList: 'dofls_sys_sys_admin_user',
		name: 'fels_sys_sys_admin_user',
		owner: 'sys_system_old'
	})
}

function initFieldListSelectUserType(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_embed_list_select',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: 'none',
		header: 'Select User Types',
		name: 'dofls_sys_sys_admin_user_type',
		owner: 'sys_system_old',
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
		actionFieldGroupModal: 'doag_dialog_footer_list',
		btnLabelComplete: 'Select UserType(s)',
		dataObjList: 'dofls_sys_sys_admin_user_type',
		name: 'fels_sys_sys_admin_user_type',
		owner: 'sys_system_old'
	})
}

function initUserOrg(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <tree,uuid,SysOrg.id>',
		header: 'Users',
		name: 'data_obj_sys_admin_meta_user_list_org_user',
		owner: 'sys_system_old',
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
				orderCrumb: 10,
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 10,
				orderDefine: 10,
				indexTable: 1
			},
			{
				codeAccess: 'readOnly',
				columnName: 'userName',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'User',
		name: 'data_obj_sys_admin_meta_user_detail_org_user',
		owner: 'sys_system_old',
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
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave: `(SELECT sys_core::SysOrg FILTER .id = <tree,uuid,SysOrg.id>)`,
				linkTable: 'SysOrg'
			},
			{
				columnName: 'password',
				orderDefine: 25,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave: `(SELECT 'abc*$789!+_)')`,
				linkTable: 'SysOrg'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				columnName: 'firstName',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 1
			},
			{
				columnName: 'lastName',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 1
			},
			{
				columnName: 'userName',
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
				codeFieldElement: 'embedListSelect',
				columnName: 'systems',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				fieldEmbedListSelect: 'fels_sys_admin_system',
				indexTable: 0,
				linkTable: 'SysSystem'
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
		dataObj: 'data_obj_sys_admin_meta_user_list_org_user',
		header: 'Users',
		name: 'node_obj_sys_admin_meta_user_list_org_user',
		orderDefine: 10,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_org_detail_user'
	})

	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		dataObj: 'data_obj_sys_admin_meta_user_detail_org_user',
		header: 'User',
		name: 'node_obj_sys_admin_meta_user_detail_org_user',
		orderDefine: 10,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_admin_meta_user_list_org_user'
	})
}

function initUserType(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <tree,uuid,SysSystem.id>',
		header: 'User Types',
		name: 'data_obj_sys_admin_user_type_list',
		owner: 'sys_system_old',
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
				indexTable: 0,
				isDisplayable: true,
				orderCrumb: 10,
				orderDefine: 20,
				orderDisplay: 20,
				orderSort: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isGlobalResource',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'User Type',
		name: 'data_obj_sys_admin_user_type_detail',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysUserType' }],
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
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'header',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				matchColumn: 'name'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isGlobalResource',
				exprPreset: '(SELECT false)',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isSelfSignup',
				exprPreset: '(SELECT false)',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 65,
				orderDefine: 65
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeFieldElement: 'embedListSelect',
				columnBacklink: 'userTypes',
				columnName: 'users',
				fieldEmbedListSelect: 'fels_sys_sys_admin_user',
				indexTable: 0,
				isDisplayable: true,
				linkTable: 'SysUser',
				orderDisplay: 80,
				orderDefine: 80
			},
			{
				codeFieldElement: 'embedListSelect',
				columnName: 'resources',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				fieldEmbedListSelect: 'fels_sys_admin_sys_user_type_resource',
				indexTable: 0,
				linkTable: 'SysUserTypeResource'
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
		dataObj: 'data_obj_sys_admin_user_type_list',
		header: 'User Types',
		name: 'node_obj_sys_admin_user_type_list',
		orderDefine: 20,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_system_meta_detail'
	})

	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		dataObj: 'data_obj_sys_admin_user_type_detail',
		header: 'User Type',
		name: 'node_obj_sys_admin_user_type_detail',
		orderDefine: 10,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_admin_user_type_list'
	})
}

function initWidget(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <tree,uuid,SysSystem.id>',
		header: 'Widgets',
		name: 'data_obj_sys_admin_widget_list',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysWidget' }],
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
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isGlobalResource',
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Widget',
		name: 'data_obj_sys_admin_widget_detail',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysWidget' }],
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
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'header',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isGlobalResource',
				exprPreset: '(SELECT false)',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
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

	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		dataObj: 'data_obj_sys_admin_widget_list',
		header: 'Widgets',
		name: 'node_obj_sys_admin_widget_list',
		orderDefine: 180,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_system_object_detail'
	})

	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		dataObj: 'data_obj_sys_admin_widget_detail',
		header: 'Widget',
		name: 'node_obj_sys_admin_widget_detail',
		orderDefine: 10,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_admin_widget_list'
	})
}
