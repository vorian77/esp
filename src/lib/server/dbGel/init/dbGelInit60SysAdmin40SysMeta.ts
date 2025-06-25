import { InitDb } from '$server/dbGel/init/types.init'
import { initAdminSysMetaUserType } from '$server/dbGel/init/dbGelInit60SysAdmin40SysMetaUserType'

export function initAdminSysMeta(init: InitDb) {
	initAttribute(init)
	initCode(init)
	initFieldListSelectUserType(init)
	initSystem(init)
	initUser(init)
	initAdminSysMetaUserType(init)
}

function initAttribute(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		exprFilter: '.owner.id = <tree,uuid,SysSystem.id>',
		header: 'Attributes',
		name: 'data_obj_sys_admin_attribute_list_meta',
		owner: 'sys_system',
		tables: [{ index: 0, table: 'SysObjAttr' }],
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
				linkColumns: ['name'],
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 20,
				orderSort: 20,
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
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
		header: 'Attribute',
		name: 'data_obj_sys_admin_attribute_detail_meta',
		owner: 'sys_system',
		tables: [{ index: 0, table: 'SysObjAttr' }],
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
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeAttrType',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				fieldListItems: 'il_sys_attr_type_system'
			},
			{
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				columnName: 'header',
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

			/* address */
			{
				codeFieldElement: 'tagSection',
				codeColor: 'primary',
				columnName: 'custom_section_start',
				isDisplayable: true,
				orderDisplay: 200,
				orderDefine: 200,
				headerAlt: 'Address'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 210,
				orderDefine: 210
			},
			{
				codeAccess: 'optional',
				columnName: 'addr1',
				isDisplayable: true,
				orderDisplay: 220,
				orderDefine: 220,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'addr2',
				isDisplayable: true,
				orderDisplay: 230,
				orderDefine: 230,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 240,
				orderDefine: 240
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 250,
				orderDefine: 250
			},
			{
				codeAccess: 'optional',
				columnName: 'city',
				isDisplayable: true,
				orderDisplay: 260,
				orderDefine: 260,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeState',
				isDisplayable: true,
				orderDisplay: 270,
				orderDefine: 270,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name_system',
				fieldListItemsParmValue: 'ct_sys_state'
			},
			{
				codeAccess: 'optional',
				columnName: 'zip',
				isDisplayable: true,
				orderDisplay: 280,
				orderDefine: 280,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 290,
				orderDefine: 290
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 300,
				orderDefine: 300
			},
			{
				codeAccess: 'optional',
				columnName: 'phoneOffice',
				isDisplayable: true,
				orderDisplay: 310,
				orderDefine: 310,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'email',
				isDisplayable: true,
				orderDisplay: 320,
				orderDefine: 320,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'website',
				isDisplayable: true,
				orderDisplay: 330,
				orderDefine: 330,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 340,
				orderDefine: 340
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 600,
				orderDefine: 600
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

	init.addTrans('sysNodeObjAppObj', {
		children: [{ node: 'node_obj_sys_admin_attribute_detail_meta', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_sys_admin_attribute_list_meta',
		header: 'Attributes',
		name: 'node_obj_sys_admin_attribute_list_meta',
		orderDefine: 10,
		owner: 'sys_system'
	})
	init.addTrans('sysNodeObjAppObj', {
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_sys_admin_attribute_detail_meta',
		header: 'Attribute',
		name: 'node_obj_sys_admin_attribute_detail_meta',
		orderDefine: 10,
		owner: 'sys_system'
	})
}

function initCode(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		exprFilter: `.owner.id = <tree,uuid,SysSystem.id> AND .codeAttrType.id = <parms,uuid,selectListRecord._codeAttrTypeId>`,
		header: 'Codes',
		name: 'data_obj_sys_admin_code_list_meta',
		owner: 'sys_system',
		tables: [{ index: 0, table: 'SysCode' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'parent',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeType',
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysCodeType'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 20,
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'order',
				isDisplayable: true,
				orderDisplay: 55,
				orderDefine: 55,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'valueDecimal',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'valueInteger',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'valueString',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		header: 'Code',
		name: 'data_obj_sys_admin_code_detail_meta',
		owner: 'sys_system',
		tables: [{ index: 0, table: 'SysCode' }],
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
				columnName: 'isGlobalResource',
				exprPreset: `(SELECT false)`,
				indexTable: 0,
				isDisplayable: false,
				orderDisplay: 25,
				orderDefine: 25
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeType',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				itemChanges: [
					{
						codeItemChangeAction: 'retrieveSelect',
						codeOp: 'any',
						columns: ['parent'],
						orderDefine: 0
					}
				],
				fieldListItems: 'il_sys_codeType_meta'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'parent',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_code_parent'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'header',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'number',
				columnName: 'order',
				isDisplayable: true,
				orderDisplay: 95,
				orderDefine: 95,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'number',
				columnName: 'valueDecimal',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 0
			},
			{
				codeFieldElement: 'number',
				codeAccess: 'optional',
				columnName: 'valueInteger',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'valueString',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 160,
				orderDefine: 160
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'embedListSelect',
				columnName: 'codeTypeFamily',
				isDisplayable: true,
				orderDisplay: 170,
				orderDefine: 170,
				fieldEmbedListSelect: 'fels_sys_code_type_family',
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysCodeType'
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

	init.addTrans('sysNodeObjAppObj', {
		children: [{ node: 'node_obj_sys_admin_code_detail_meta', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_sys_admin_code_list_meta',
		header: 'Codes',
		name: 'node_obj_sys_admin_code_list_meta',
		orderDefine: 20,
		owner: 'sys_system'
	})
	init.addTrans('sysNodeObjAppObj', {
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_sys_admin_code_detail_meta',
		header: 'Code',
		name: 'node_obj_sys_admin_code_detail_meta',
		orderDefine: 10,
		owner: 'sys_system'
	})
}

function initFieldListSelectUserType(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_embed_list_select',
		codeCardinality: 'list',
		codeDataObjType: 'doEmbed',
		exprFilter: `.isGlobalResource UNION .owner.id = <parms,uuid,queryOwnerSys> UNION .owner IN (SELECT sys_core::SysSystem FILTER .id = <parms,uuid,queryOwnerSys>).systemParents`,
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

function initSystem(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list_edit_download',
		codeCardinality: 'list',
		exprFilter: '.id IN <user,uuidlist,systemIds>',
		header: 'Systems',
		name: 'data_obj_sys_admin_system_list_meta',
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

	init.addTrans('sysNodeObjApp', {
		children: [{ node: 'node_obj_select_list_attr_obj', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeApp',
		codeQueryOwnerType: 'queryOwnerTypeSystemRecord',
		dataObj: 'data_obj_sys_admin_system_list_meta',
		header: 'Systems',
		name: 'node_obj_sys_admin_system_list_meta',
		orderDefine: 10,
		owner: 'sys_system'
	})

	init.addTrans('sysNodeObjApp', {
		codeComponent: 'SelectList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		header: 'System Objects',
		name: 'node_obj_select_list_attr_obj',
		orderDefine: 10,
		owner: 'sys_system',
		selectListItems: 'il_sys_node_obj_config_by_system',
		selectListItemsHeader: 'Object Type'
	})
}

function initUser(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		exprFilter: `.owner.id = <tree,uuid,SysSystem.id> AND .codeAttrType.id = <parms,uuid,selectListRecord._codeAttrTypeId>`,
		header: 'Users',
		name: 'data_obj_sys_admin_user_list_meta',
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
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isActive',
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
		// exprFilter: `.id = <tree,uuid,SysObjAttr.id>`,
		header: 'User',
		name: 'data_obj_sys_admin_user_detail_meta',
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
				exprSave: `(SELECT sys_core::SysSystem FILTER .id = <tree,uuid,SysSystem.id>)`,
				indexTable: 0,
				isDisplayable: false,
				linkTable: 'SysOrg',
				orderDefine: 20
			},
			{
				columnName: 'orgs',
				exprSave: `(SELECT sys_core::SysSystem FILTER .id = <tree,uuid,SysSystem.id>).owner`,
				indexTable: 0,
				isDisplayable: false,
				linkTable: 'SysOrg',
				orderDefine: 30
			},
			{
				columnName: 'defaultOrg',
				exprSave: `(SELECT sys_core::SysSystem FILTER .id = <tree,uuid,SysSystem.id>).owner`,
				indexTable: 0,
				isDisplayable: false,
				linkTable: 'SysOrg',
				orderDefine: 40
			},
			{
				columnName: 'systems',
				exprSave: `(SELECT sys_core::SysSystem FILTER .id = <tree,uuid,SysSystem.id>)`,
				indexTable: 0,
				isDisplayable: false,
				linkTable: 'SysSystem',
				orderDefine: 50
			},
			{
				columnName: 'defaultSystem',
				exprSave: `(SELECT sys_core::SysSystem FILTER .id = <tree,uuid,SysSystem.id>)`,
				indexTable: 0,
				isDisplayable: false,
				linkTable: 'SysSystem',
				orderDefine: 60
			},
			{
				codeFieldElement: 'textHide',
				columnName: 'password',
				exprPreset: `(SELECT 'abc*$789!+_)')`,
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 70
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80
			},
			{
				columnName: 'firstName',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 1
			},
			{
				columnName: 'lastName',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 1
			},
			{
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isActive',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 0
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

	init.addTrans('sysNodeObjAppObj', {
		children: [{ node: 'node_obj_sys_admin_user_detail_meta', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_sys_admin_user_list_meta',
		header: 'Users',
		name: 'node_obj_sys_admin_user_list_meta',
		orderDefine: 30,
		owner: 'sys_system'
	})

	init.addTrans('sysNodeObjAppObj', {
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_sys_admin_user_detail_meta',
		header: 'User',
		name: 'node_obj_sys_admin_user_detail_meta',
		orderDefine: 10,
		owner: 'sys_system'
	})
}
