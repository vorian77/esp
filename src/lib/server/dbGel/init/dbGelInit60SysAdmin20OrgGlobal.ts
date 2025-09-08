import { InitDb } from '$server/dbGel/init/types.init'

export function initAdminOrgGlobal(init: InitDb) {
	initFieldListConfigAttrsAccess(init)
	initFieldListConfigAttrsAction(init)
	initFieldListConfigAttrsExpr(init)
	initFieldListConfigAttrsVirtual(init)
	initFieldListConfigNodesConfig(init)
	initFieldListItems(init)
	initFieldListSelectCodeType(init)
	initFieldListSelectSystem(init)
	initFieldListSelectUser(init)
	initFieldListSelectUserType(init)
	initNodeObjConfig(init)
	initOrg(init)
	initSystem(init)
	initUser(init)
	initUserType(init)
}

async function initFieldListItems(init: InitDb) {
	init.addTrans('sysDataObjFieldListItems', {
		props: [
			[0, 'org', 'Organization', '.ownerSys.ownerOrg.header', true, 0],
			[1, 'system', 'System', '.ownerSys.header', true, 1],
			[2, 'name', 'Name', '.name', true, 2]
		],
		exprFilter: `.codeType.name = <parms,str,itemsParmValue> 
		AND (.isGlobalResource 
		UNION .ownerSys.id = <tree,uuid,SysSystem.id>
		UNION .ownerSys IN (SELECT sys_core::SysSystem FILTER .id = <tree,uuid,SysSystem.id>).systemParents)`,
		name: 'il_sys_code_system_org_global',
		ownerSys: 'sys_system',
		table: 'SysCode'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [
			[0, 'org', 'Organization', '.ownerSys.ownerOrg.header', true, 0],
			[1, 'system', 'System', '.ownerSys.header', true, 1],
			[2, 'name', 'Name', '.name', true, 2]
		],
		exprFilter: `.isGlobalResource 
		UNION .ownerSys.id = <tree,uuid,SysSystem.id>
		UNION .ownerSys IN (SELECT sys_core::SysSystem FILTER .id = <tree,uuid,SysSystem.id>).systemParents`,
		name: 'il_sys_node_obj_system_org_global',
		ownerSys: 'sys_system',
		table: 'SysNodeObj'
	})
}

async function initFieldListConfigAttrsAccess(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeDataObjType: 'doEmbed',
		header: 'Attribute Accesses',
		name: 'doflc_admin_attrs_access_list',
		ownerSys: 'sys_system',
		tables: [{ index: 0, table: 'SysObjAttrAccess' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeAttrTypeAccess',
				indexTable: 0,
				isDisplayable: true,
				linkColumns: ['name'],
				linkTable: 'SysCode',
				orderCrumb: 10,
				orderDefine: 20,
				orderDisplay: 20,
				orderSort: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'obj',
				indexTable: 0,
				isDisplayable: true,
				linkColumns: ['name'],
				linkTable: 'SysObjAttr',
				orderCrumb: 20,
				orderDefine: 30,
				orderDisplay: 30,
				orderSort: 20
			}
		]
	})

	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeDataObjType: 'doEmbed',
		header: 'Attribute Access',
		name: 'doflc_admin_attrs_access_detail',
		ownerSys: 'sys_system',
		tables: [{ index: 0, table: 'SysObjAttrAccess' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeAttrTypeAccess',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmValue: 'ct_sys_obj_attr_access'
			},
			// {
			// 	codeFieldElement: 'select',
			// 	columnName: 'obj',
			// 	isDisplayable: true,
			// 	orderDisplay: 30,
			// 	orderDefine: 30,
			// 	indexTable: 0,
			// 	fieldListItems: 'il_sys_obj_attr_type_single'
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
	init.addTrans('sysDataObjFieldEmbedListConfig', {
		actionGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_admin_attrs_access_list',
		dataObjModal: 'doflc_admin_attrs_access_detail',
		name: 'flec_admin_attrs_access',
		ownerSys: 'sys_system'
	})
}

async function initFieldListConfigAttrsAction(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeDataObjType: 'doEmbed',
		header: 'Attribute Actions',
		name: 'doflc_admin_attrs_action_list',
		ownerSys: 'sys_system',
		tables: [{ index: 0, table: 'SysObjAttrAction' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeAttrTypeAction',
				indexTable: 0,
				isDisplayable: true,
				linkColumns: ['name'],
				linkTable: 'SysCode',
				orderCrumb: 10,
				orderDefine: 20,
				orderDisplay: 20,
				orderSort: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'obj',
				indexTable: 0,
				isDisplayable: true,
				linkColumns: ['name'],
				linkTable: 'SysObjAttr',
				orderCrumb: 20,
				orderDefine: 30,
				orderDisplay: 30,
				orderSort: 20
			}
		]
	})

	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeDataObjType: 'doEmbed',
		header: 'Attribute Action',
		name: 'doflc_admin_attrs_action_detail',
		ownerSys: 'sys_system',
		tables: [{ index: 0, table: 'SysObjAttrAction' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeAttrTypeAction',
				isDisplayable: true,
				orderDisplay: 2,
				orderDefine: 20,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmValue: 'ct_sys_obj_attr_action'
			},
			// {
			// 	codeAccess: 'optional',
			// 	codeFieldElement: 'textArea',
			// 	columnName: 'expr',
			// 	isDisplayable: true,
			// 	orderDisplay: 50,
			// 	orderDefine: 50,
			// 	indexTable: 0
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
	init.addTrans('sysDataObjFieldEmbedListConfig', {
		actionGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_admin_attrs_action_list',
		dataObjModal: 'doflc_admin_attrs_action_detail',
		name: 'flec_admin_attrs_action',
		ownerSys: 'sys_system'
	})
}

async function initFieldListConfigAttrsExpr(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeDataObjType: 'doEmbed',
		header: 'Attribute Expressions',
		name: 'doflc_admin_attrs_expr_list',
		ownerSys: 'sys_system',
		tables: [{ index: 0, table: 'SysObjAttrExpr' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeAttrTypeAction',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'expr',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeDataObjType: 'doEmbed',
		header: 'Attribute Expression',
		name: 'doflc_admin_attrs_expr_detail',
		ownerSys: 'sys_system',
		tables: [{ index: 0, table: 'SysObjAttrExpr' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeAttrTypeAction',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmValue: 'ct_sys_obj_attr_action'
			},
			{
				codeFieldElement: 'textArea',
				columnName: 'expr',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
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
	init.addTrans('sysDataObjFieldEmbedListConfig', {
		actionGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_admin_attrs_expr_list',
		dataObjModal: 'doflc_admin_attrs_expr_detail',
		name: 'flec_admin_attrs_expr',
		ownerSys: 'sys_system'
	})
}

async function initFieldListConfigAttrsVirtual(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeDataObjType: 'doEmbed',
		header: 'Virtual Attributes',
		name: 'doflc_admin_attrs_virtual_list',
		ownerSys: 'sys_system',
		tables: [{ index: 0, table: 'SysObjAttrVirtual' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeAttrTypeAction',
				indexTable: 0,
				isDisplayable: true,
				linkColumns: ['name'],
				linkTable: 'SysCode',
				orderCrumb: 10,
				orderDefine: 20,
				orderDisplay: 20,
				orderSort: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'expr',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			}
		]
	})

	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeDataObjType: 'doEmbed',
		header: 'Virtual Attribute',
		name: 'doflc_admin_attrs_virtual_detail',
		ownerSys: 'sys_system',
		tables: [{ index: 0, table: 'SysObjAttrVirtual' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'embedListConfig',
				columnName: 'attrsAccess',
				fieldEmbedListConfig: 'flec_admin_attrs_access',
				indexTable: 0,
				isDisplayable: true,
				linkTable: 'SysObjAttrAccess',
				orderDefine: 20,
				orderDisplay: 20
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'embedListConfig',
				columnName: 'attrsAction',
				fieldEmbedListConfig: 'flec_admin_attrs_action',
				indexTable: 0,
				isDisplayable: true,
				linkTable: 'SysObjAttrAction',
				orderDefine: 30,
				orderDisplay: 30
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'expr',
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
	init.addTrans('sysDataObjFieldEmbedListConfig', {
		actionGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_admin_attrs_virtual_list',
		dataObjModal: 'doflc_admin_attrs_virtual_detail',
		name: 'flec_admin_attrs_virtual',
		ownerSys: 'sys_system'
	})
}

async function initFieldListConfigNodesConfig(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_embed_list_config',
		codeCardinality: 'list',
		codeDataObjType: 'doEmbed',
		header: 'Configuration Nodes',
		name: 'doflc_admin_nodes_config_list',
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
				indexTable: 0,
				isDisplayable: true,
				linkColumns: ['name'],
				linkTable: 'SysCode',
				orderCrumb: 10,
				orderDefine: 20,
				orderDisplay: 20,
				orderSort: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'nodeObj',
				indexTable: 0,
				isDisplayable: true,
				linkColumns: ['name'],
				linkTable: 'SysNodeObj',
				orderCrumb: 20,
				orderDefine: 30,
				orderDisplay: 30,
				orderSort: 20
			}
		]
	})

	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_dialog_form_detail',
		codeCardinality: 'detail',
		codeDataObjType: 'doEmbed',
		header: 'Configuration Node',
		name: 'doflc_admin_nodes_config_detail',
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
				codeFieldElement: 'select',
				columnName: 'codeAttrType',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				fieldListItems: 'il_sys_code_system_org_global',
				fieldListItemsParmValue: 'ct_sys_obj_attr_type'
			},
			{
				codeFieldElement: 'select',
				columnName: 'nodeObj',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				fieldListItems: 'il_sys_node_obj_system_org_global'
			}
		]
	})
	init.addTrans('sysDataObjFieldEmbedListConfig', {
		actionGroupModal: 'doag_dialog_footer_detail',
		dataObjEmbed: 'doflc_admin_nodes_config_list',
		dataObjModal: 'doflc_admin_nodes_config_detail',
		name: 'flec_admin_nodes_config',
		ownerSys: 'sys_system'
	})
}

function initFieldListSelectCodeType(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_embed_list_select',
		codeCardinality: 'list',
		codeDataObjType: 'doEmbed',
		exprFilter: `.isGlobalResource 
		UNION .ownerSys.id = <tree,uuid,SysSystem.id>
		UNION .ownerSys IN (SELECT sys_core::SysSystem FILTER .id = <tree,uuid,SysSystem.id>).systemParents`,
		header: 'Select Code Types(s)',
		name: 'dofls_admin_code_type_org_global',
		ownerSys: 'sys_system',
		tables: [{ index: 0, table: 'SysCodeType' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isGlobalResource',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 20,
				orderDisplay: 20
			},
			{
				codeAccess: 'readOnly',
				columnName: 'ownerSys',
				exprCustom: `.header ?? .name`,
				indexTable: 0,
				isDisplayable: true,
				linkTable: 'SysSystem',
				orderCrumb: 10,
				orderDefine: 30,
				orderDisplay: 30,
				orderSort: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				indexTable: 0,
				isDisplayable: true,
				orderCrumb: 10,
				orderDefine: 40,
				orderDisplay: 40,
				orderSort: 20
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 50,
				orderDisplay: 50
			}
		]
	})

	init.addTrans('sysDataObjFieldEmbedListSelect', {
		actionGroupModal: 'doag_dialog_footer_list_select',
		btnLabelComplete: 'Select Code Type(s)',
		dataObjList: 'dofls_admin_code_type_org_global',
		name: 'fels_admin_code_type_org_global',
		ownerSys: 'sys_system'
	})
}

function initFieldListSelectSystem(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_embed_list_select',
		codeCardinality: 'list',
		codeDataObjType: 'doEmbed',
		exprFilter: '.id NOT IN (SELECT sys_core::SysSystem FILTER .id = <tree,uuid,SysSystem.id>).id',
		header: 'Select Systems',
		name: 'dofls_admin_system_org_global',
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
				columnName: 'name',
				indexTable: 0,
				isDisplayable: true,
				orderCrumb: 20,
				orderDefine: 30,
				orderDisplay: 30,
				orderSort: 20
			}
		]
	})

	init.addTrans('sysDataObjFieldEmbedListSelect', {
		actionGroupModal: 'doag_dialog_footer_list_select',
		btnLabelComplete: 'Select System(s)',
		dataObjList: 'dofls_admin_system_org_global',
		name: 'fels_admin_system_org_global',
		ownerSys: 'sys_system'
	})
}

function initFieldListSelectUser(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_embed_list_select',
		codeCardinality: 'list',
		codeDataObjType: 'doEmbed',
		exprFilter: 'none',
		header: 'Select Users',
		name: 'dofls_admin_user_org_global',
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
		dataObjList: 'dofls_admin_user_org_global',
		name: 'fels_admin_user_org_global',
		ownerSys: 'sys_system'
	})
}

function initFieldListSelectUserType(init: InitDb) {
	init.addTrans('sysDataObjEmbed', {
		actionGroup: 'doag_embed_list_select',
		codeCardinality: 'list',
		codeDataObjType: 'doEmbed',
		exprFilter: 'none',
		header: 'Select User Types',
		name: 'dofls_admin_user_type_org_global',
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
		dataObjList: 'dofls_admin_user_type_org_global',
		name: 'fels_admin_user_type_org_global',
		ownerSys: 'sys_system'
	})
}

function initNodeObjConfig(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list_edit_download',
		codeCardinality: 'list',
		exprFilter: `.id IN (SELECT sys_core::getSystem('org_system', 'sys_system')).nodesConfig.id`,
		header: 'Object Types',
		name: 'data_obj_admin_node_obj_config_list_global',
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
		dataObj: 'data_obj_admin_node_obj_config_list_global',
		header: 'Object Types',
		name: 'node_obj_admin_node_obj_config_list_global',
		orderDefine: 10,
		ownerSys: 'sys_system'
	})
}

function initOrg(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		header: 'Organizations (Global)',
		exprFilter: 'none',
		name: 'data_obj_admin_org_list_global',
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
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		header: 'Organization',
		name: 'data_obj_admin_org_detail_global',
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
		children: [{ node: 'node_obj_admin_org_detail_global', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeApp',
		dataObj: 'data_obj_admin_org_list_global',
		header: 'Organizations (Global)',
		name: 'node_obj_admin_org_list_global',
		orderDefine: 10,
		ownerSys: 'sys_system'
	})
	init.addTrans('sysNodeObj', {
		children: [
			{ node: 'node_obj_admin_user_type_list_org_global', order: 10 },
			{ node: 'node_obj_admin_user_list_org_global', order: 20 },
			{ node: 'node_obj_admin_system_list_org_global', order: 30 }
		],
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_admin_org_detail_global',
		header: 'Organization',
		name: 'node_obj_admin_org_detail_global',
		orderDefine: 10,
		ownerSys: 'sys_system'
	})
}

function initSystem(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		header: 'Systems',
		exprFilter: '.ownerOrg.id = <tree,uuid,SysOrg.id>',
		name: 'data_obj_admin_system_list_org_global',
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
				orderDefine: 20,
				orderDisplay: 20,
				orderSort: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'appName',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 30,
				orderDisplay: 30
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		header: 'System',
		name: 'data_obj_admin_system_detail_org_global',
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
				codeFieldElement: 'embedListSelect',
				columnBacklink: 'systems',
				columnName: 'users',
				fieldEmbedListSelect: 'fels_sys_user',
				indexTable: 0,
				isDisplayable: true,
				linkColumns: ['person', 'fullName'],
				linkTable: 'SysUser',
				orderDisplay: 100,
				orderDefine: 100
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'embedListConfig',
				columnName: 'nodesConfig',
				fieldEmbedListConfig: 'flec_admin_nodes_config',
				indexTable: 0,
				isDisplayable: true,
				linkTable: 'SysNodeObjConfig',
				orderDefine: 110,
				orderDisplay: 110
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'embedListSelect',
				columnName: 'typesCodeType',
				fieldEmbedListSelect: 'fels_admin_code_type_org_global',
				indexTable: 0,
				isDisplayable: true,
				linkColumns: ['name'],
				linkTable: 'SysCodeType',
				orderDisplay: 120,
				orderDefine: 120
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'embedListSelect',
				columnName: 'systemParents',
				fieldEmbedListSelect: 'fels_admin_system_org_global',
				indexTable: 0,
				isDisplayable: true,
				linkColumns: ['name'],
				linkTable: 'SysSystem',
				orderDisplay: 130,
				orderDefine: 130
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
		children: [{ node: 'node_obj_admin_system_detail_org_global', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_admin_system_list_org_global',
		header: 'Systems',
		name: 'node_obj_admin_system_list_org_global',
		orderDefine: 10,
		ownerSys: 'sys_system'
	})
	init.addTrans('sysNodeObj', {
		children: [{ node: 'node_obj_admin_node_obj_config_list_global', order: 10 }],
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_admin_system_detail_org_global',
		header: 'System',
		name: 'node_obj_admin_system_detail_org_global',
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
		name: 'data_obj_admin_user_list_org_global',
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
		name: 'data_obj_admin_user_detail_org_global',
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
				fieldEmbedListSelect: 'fels_admin_user_type_org_global',
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysUserType'
			},
			{
				codeFieldElement: 'chips',
				columnName: 'systems',
				fieldListItems: 'il_sys_system_all',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 210,
				orderDefine: 210
			},
			{
				codeFieldElement: 'select',
				columnName: 'systemDefault',
				fieldListItems: 'il_sys_system_all',
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
		children: [{ node: 'node_obj_admin_user_detail_org_global', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_admin_user_list_org_global',
		header: 'Users',
		name: 'node_obj_admin_user_list_org_global',
		orderDefine: 30,
		ownerSys: 'sys_system'
	})

	init.addTrans('sysNodeObj', {
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_admin_user_detail_org_global',
		header: 'User',
		name: 'node_obj_admin_user_detail_org_global',
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
		name: 'data_obj_admin_user_type_list_org_global',
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
				columnName: 'isGlobalResource',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
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
		name: 'data_obj_admin_user_type_detail_org_global',
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
				isDisplayable: true,
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
				fieldEmbedListSelect: 'fels_admin_user_org_global',
				indexTable: 0,
				isDisplayable: true,
				linkColumns: ['person', 'fullName'],
				linkTable: 'SysUser',
				orderDisplay: 200,
				orderDefine: 200
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'embedListConfig',
				columnName: 'attrsAccess',
				fieldEmbedListConfig: 'flec_admin_attrs_access',
				indexTable: 0,
				isDisplayable: true,
				linkTable: 'SysObjAttrAccess',
				orderDefine: 210,
				orderDisplay: 210
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'embedListConfig',
				columnName: 'attrsExpr',
				fieldEmbedListConfig: 'flec_admin_attrs_expr',
				indexTable: 0,
				isDisplayable: true,
				linkTable: 'SysObjAttrExpr',
				orderDefine: 230,
				orderDisplay: 230
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
			// 	orderDefine: 100,
			// 	orderDisplay: 100
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
		children: [{ node: 'node_obj_admin_user_type_detail_org_global', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_admin_user_type_list_org_global',
		header: 'User Types',
		name: 'node_obj_admin_user_type_list_org_global',
		orderDefine: 40,
		ownerSys: 'sys_system'
	})

	init.addTrans('sysNodeObj', {
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_admin_user_type_detail_org_global',
		header: 'User Type',
		name: 'node_obj_admin_user_type_detail_org_global',
		orderDefine: 10,
		ownerSys: 'sys_system'
	})
}
