import { InitDb } from '$server/dbGel/init/types.init'

export function initAdminOrgCustomer(init: InitDb) {
	initFieldListSelectUser(init)
	initFieldListSelectUserType(init)
	initNodeObjConfig(init)
	initOrg(init)
	initSystem(init)
	initUser(init)
	initUserType(init)
}

function initFieldListSelectUser(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_embed_list_select',
		codeCardinality: 'list',
		codeDataObjType: 'doEmbed',
		exprFilter: `.ownerOrg.id = <tree,uuid,SysOrg.id> UNION .id IN (SELECT sys_user::SysUserType FILTER .id = <tree,uuid,SysUserType.id>).users.id`,
		header: 'Select Users (Customer)',
		name: 'dofls_admin_user_org_customer',
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
				orderCrumb: 10,
				orderDefine: 20,
				orderDisplay: 20,
				orderSort: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'lastName',
				indexTable: 1,
				isDisplayable: true,
				orderCrumb: 20,
				orderDefine: 30,
				orderDisplay: 30,
				orderSort: 20
			},
			{
				codeAccess: 'readOnly',
				columnName: 'firstName',
				indexTable: 1,
				isDisplayable: true,
				orderCrumb: 30,
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
		dataObjList: 'dofls_admin_user_org_customer',
		name: 'fels_admin_user_org_customer',
		ownerSys: 'sys_system'
	})
}

function initFieldListSelectUserType(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_embed_list_select',
		codeCardinality: 'list',
		codeDataObjType: 'doEmbed',
		exprFilter: '.ownerOrg.id = <tree,uuid,SysOrg.id>',
		header: 'Select User Types',
		name: 'dofls_admin_user_type_org_customer',
		ownerSys: 'sys_system',
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
				columnName: 'name',
				indexTable: 0,
				isDisplayable: true,
				orderCrumb: 10,
				orderDefine: 30,
				orderDisplay: 30,
				orderSort: 20
			}
		]
	})

	init.addTrans('sysDataObjFieldEmbedListSelect', {
		actionGroupModal: 'doag_dialog_footer_list_select',
		btnLabelComplete: 'Select UserType(s)',
		dataObjList: 'dofls_admin_user_type_org_customer',
		name: 'fels_admin_user_type_org_customer',
		ownerSys: 'sys_system'
	})
}

function initNodeObjConfig(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list_edit_download',
		codeCardinality: 'list',
		exprFilter:
			'.id IN (SELECT sys_core::SysSystem FILTER .id = <tree,uuid,SysSystem.id>).nodesConfig.id',
		header: 'Object Types',
		name: 'data_obj_admin_node_obj_config_list_org_customer',
		ownerSys: 'sys_system',
		tables: [{ index: 0, table: 'SysNodeObjConfig' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeAttrType',
				isDisplayable: true,
				orderCrumb: 10,
				orderDisplay: 20,
				orderDefine: 20,
				orderSort: 10,
				indexTable: 0,
				linkColumns: ['header'],
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'custom_element_str',
				isDisplayable: true,
				orderDefine: 30,
				orderDisplay: 30,
				exprCustom: `.codeAttrType.name`,
				headerAlt: 'Name',
				nameCustom: 'codeAttrTypeName'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'nodeObj',
				orderDefine: 40,
				indexTable: 0,
				linkColumns: ['id'],
				linkTable: 'SysNodeObj'
			}
		]
	})

	init.addTrans('sysNodeObj', {
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeObjConfigList',
		dataObj: 'data_obj_admin_node_obj_config_list_org_customer',
		header: 'Object Types',
		name: 'node_obj_admin_node_obj_config_list_org_customer',
		orderDefine: 10,
		ownerSys: 'sys_system'
	})
}

function initOrg(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list_edit_download',
		codeCardinality: 'list',
		header: 'Organizations (Customer)',
		exprFilter:
			'.id IN (SELECT sys_core::SysSystem FILTER .id IN <user,uuidlist,systemIds>).ownerOrg.id',
		name: 'data_obj_admin_org_list_customer',
		ownerSys: 'sys_system',
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
				orderDisplay: 30,
				orderDefine: 30,
				orderSort: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail_save',
		codeCardinality: 'detail',
		header: 'Organization',
		name: 'data_obj_admin_org_detail_customer',
		ownerSys: 'sys_system',
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
				orderDisplay: 20,
				orderDefine: 20
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				columnName: 'header',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50
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
		children: [{ node: 'node_obj_admin_org_detail_customer', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeApp',
		dataObj: 'data_obj_admin_org_list_customer',
		header: 'Organizations (Customer)',
		name: 'node_obj_admin_org_list_customer',
		orderDefine: 10,
		ownerSys: 'sys_system'
	})
	init.addTrans('sysNodeObj', {
		children: [
			{ node: 'node_obj_admin_user_type_list_org_customer', order: 10 },
			{ node: 'node_obj_admin_user_list_org_customer', order: 20 },
			{ node: 'node_obj_admin_system_list_org_customer', order: 30 }
		],
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_admin_org_detail_customer',
		header: 'Organization',
		name: 'node_obj_admin_org_detail_customer',
		orderDefine: 10,
		ownerSys: 'sys_system'
	})
}

function initSystem(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list_edit_download',
		codeCardinality: 'list',
		exprFilter: '.ownerOrg.id IN <tree,uuid,SysOrg.id>',
		header: 'Systems',
		name: 'data_obj_admin_system_list_org_customer',
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
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				codeFieldElement: 'toggle',
				columnName: 'custom_element_bool',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				exprCustom: `'Yes' IF EXISTS .file ELSE 'No'`,
				headerAlt: 'Logo Uploaded',
				nameCustom: 'hasFile'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'logoWidth',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'logoMarginRight',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail_save',
		codeCardinality: 'detail',
		header: 'System',
		name: 'data_obj_admin_system_detail_org_customer',
		ownerSys: 'sys_system',
		queryRiders: [
			{
				codeQueryAction: 'customFunction',
				codeQueryFunction: 'qrfFileStorage',
				codeQueryPlatform: 'client',
				codeQueryType: 'save',
				codeTriggerTiming: 'pre',
				parmValueStr: 'file'
			}
		],
		tables: [{ index: 0, table: 'SysSystem' }],
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
				columnName: 'appName',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'fileImage',
				columnName: 'file',
				isDisplayable: true,
				itemChanges: [
					{
						codeAccess: 'required',
						codeItemChangeAction: 'none',
						codeItemChangeTriggerType: 'itemChangeTypeOp',
						codeOp: 'notNull',
						columns: ['logoWidth', 'logoMarginRight'],
						orderDefine: 0
					},
					{
						codeAccess: 'hidden',
						codeItemChangeAction: 'reset',
						codeItemChangeTriggerType: 'itemChangeTypeOp',
						codeOp: 'null',
						columns: ['logoWidth', 'logoMarginRight'],
						orderDefine: 1
					}
				],
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0,
				width: 300
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80
			},
			{
				codeAccess: 'optional',
				columnName: 'logoWidth',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'logoMarginRight',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110
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
		children: [{ node: 'node_obj_admin_system_detail_org_customer', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_admin_system_list_org_customer',
		header: 'Systems',
		name: 'node_obj_admin_system_list_org_customer',
		orderDefine: 30,
		ownerSys: 'sys_system'
	})
	init.addTrans('sysNodeObj', {
		children: [{ node: 'node_obj_admin_node_obj_config_list_org_customer', order: 10 }],
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_admin_system_detail_org_customer',
		header: 'System',
		name: 'node_obj_admin_system_detail_org_customer',
		orderDefine: 10,
		ownerSys: 'sys_system'
	})
}

function initUser(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		exprFilter: '.ownerOrg.id = <tree,uuid,SysOrg.id>',
		header: 'Users',
		name: 'data_obj_admin_user_list_org_customer',
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
				columnName: 'isActive',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'lastName',
				indexTable: 1,
				isDisplayable: true,
				orderCrumb: 20,
				orderDefine: 40,
				orderDisplay: 40,
				orderSort: 20
			},
			{
				codeAccess: 'readOnly',
				columnName: 'firstName',
				indexTable: 1,
				isDisplayable: true,
				orderCrumb: 30,
				orderDefine: 50,
				orderDisplay: 50,
				orderSort: 30
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				headerAlt: 'Username',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		header: 'User',
		name: 'data_obj_admin_user_detail_org_customer',
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
				columnName: 'ownerOrg',
				exprSave: `(SELECT sys_core::SysOrg FILTER .id = <tree,uuid,SysOrg.id>)`,
				indexTable: 0,
				isDisplayable: false,
				linkTable: 'SysOrg',
				orderDefine: 20
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isActive',
				exprPreset: `(SELECT true)`,
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 0
			},
			{
				columnName: 'firstName',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 1
			},
			{
				columnName: 'lastName',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 1
			},
			{
				columnName: 'name',
				headerAlt: 'Username',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 150,
				orderDefine: 150
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'embedListSelect',
				columnName: 'userTypes',
				isDisplayable: true,
				orderDisplay: 200,
				orderDefine: 200,
				fieldEmbedListSelect: 'fels_admin_user_type_org_customer',
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysUserType'
			},
			{
				codeFieldElement: 'chips',
				columnName: 'systems',
				fieldListItems: 'il_sys_system_by_org',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 210,
				orderDefine: 210
			},
			{
				codeFieldElement: 'select',
				columnName: 'systemDefault',
				fieldListItems: 'il_sys_system_by_org',
				indexTable: 0,
				// todo: 250701 - unused, but kept for documentation on use of codeItemChangeTriggerType: 'itemChangeTypeRecordStatus'
				// itemChanges: [
				// 	{
				// 		codeAccess: 'required',
				// 		codeItemChangeAction: 'none',
				// 		codeItemChangeRecordStatus: 'retrieved',
				// 		codeItemChangeTriggerType: 'itemChangeTypeRecordStatus',
				// 		orderDefine: 0
				// 	},
				// 	{
				// 		codeAccess: 'hidden',
				// 		codeItemChangeAction: 'reset',
				// 		codeItemChangeRecordStatus: 'preset',
				// 		codeItemChangeTriggerType: 'itemChangeTypeRecordStatus',
				// 		orderDefine: 1
				// 	}
				// ],
				isDisplayable: true,
				orderDefine: 220,
				orderDisplay: 220
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
		children: [{ node: 'node_obj_admin_user_detail_org_customer', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_admin_user_list_org_customer',
		header: 'Users',
		name: 'node_obj_admin_user_list_org_customer',
		orderDefine: 30,
		ownerSys: 'sys_system'
	})

	init.addTrans('sysNodeObj', {
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_admin_user_detail_org_customer',
		header: 'User',
		name: 'node_obj_admin_user_detail_org_customer',
		orderDefine: 10,
		ownerSys: 'sys_system'
	})
}

function initUserType(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		exprFilter: '.ownerOrg.id = <tree,uuid,SysOrg.id>',
		header: 'User Types',
		name: 'data_obj_admin_user_type_list_org_customer',
		ownerSys: 'sys_system',
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
				columnName: 'isSelfSignup',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		header: 'User Type',
		name: 'data_obj_admin_user_type_detail_org_customer',
		ownerSys: 'sys_system',
		tables: [{ index: 0, table: 'SysUserType' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'ownerOrg',
				exprSave: `(SELECT sys_core::SysOrg FILTER .id = <tree,uuid,SysOrg.id>)`,
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
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
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
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
				exprPreset: `(SELECT false)`,
				indexTable: 0,
				isDisplayable: false,
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_start',
				headerAlt: 'Self Service Signup',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100
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
				columnName: 'isSelfSignup',
				exprPreset: `(SELECT false)`,
				indexTable: 0,
				isDisplayable: true,
				itemChanges: [
					{
						codeAccess: 'required',
						codeItemChangeAction: 'setTargetValue',
						codeItemChangeTriggerType: 'itemChangeTypeOp',
						codeOp: 'true',
						columns: ['selfSignupSystem'],
						orderDefine: 0
					},
					{
						codeAccess: 'hidden',
						codeItemChangeAction: 'reset',
						codeItemChangeTriggerType: 'itemChangeTypeOp',
						codeOp: 'false',
						columns: ['selfSignupSystem'],
						orderDefine: 1
					}
				],
				orderDisplay: 120,
				orderDefine: 120
			},
			{
				codeFieldElement: 'select',
				columnName: 'selfSignupSystem',
				fieldListItems: 'il_sys_system_by_org',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 130,
				orderDisplay: 130
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 150,
				orderDefine: 150
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'embedListSelect',
				columnBacklink: 'userTypes',
				columnName: 'users',
				fieldEmbedListSelect: 'fels_admin_user_org_customer',
				indexTable: 0,
				isDisplayable: true,
				linkColumns: ['person', 'fullName'],
				linkTable: 'SysUser',
				orderDisplay: 200,
				orderDefine: 200
			},
			// todo - 250701 - requires updates to allow a modal to open a modal or tabbed embedded list
			// {
			// 	codeAccess: 'optional',
			// 	codeFieldElement: 'embedListConfig',
			// 	columnName: 'attrsVirtual',
			// 	fieldEmbedListConfig: 'flec_admin_attrs_virtual',
			// 	indexTable: 0,
			// 	isDisplayable: true,
			// 	linkTable: 'SysObjAttrVirtual',
			// 	orderDefine: 100
			// 	orderDisplay: 100,
			// },

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
		children: [{ node: 'node_obj_admin_user_type_detail_org_customer', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_admin_user_type_list_org_customer',
		header: 'User Types',
		name: 'node_obj_admin_user_type_list_org_customer',
		orderDefine: 40,
		ownerSys: 'sys_system'
	})

	init.addTrans('sysNodeObj', {
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_admin_user_type_detail_org_customer',
		header: 'User Type',
		name: 'node_obj_admin_user_type_detail_org_customer',
		orderDefine: 10,
		ownerSys: 'sys_system'
	})
}
