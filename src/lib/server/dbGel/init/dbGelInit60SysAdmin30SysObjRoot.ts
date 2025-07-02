import { InitDb } from '$server/dbGel/init/types.init'

export function initAdminSysObjRoot(init: InitDb) {
	initAttrObj(init)
	initAttrObjSimple(init)
}

function initAttrObj(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		exprFilter: '.owner.id = <tree,uuid,SysSystem.id>',
		header: 'Attributes',
		name: 'data_obj_admin_attr_obj_list',
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
		name: 'data_obj_admin_attr_obj_detail',
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

	init.addTrans('sysNodeObj', {
		children: [{ node: 'node_obj_admin_attr_obj_detail', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_admin_attr_obj_list',
		header: 'Attributes',
		name: 'node_obj_admin_attr_obj_list',
		orderDefine: 10,
		owner: 'sys_system'
	})
	init.addTrans('sysNodeObj', {
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_admin_attr_obj_detail',
		header: 'Attribute',
		name: 'node_obj_admin_attr_obj_detail',
		orderDefine: 10,
		owner: 'sys_system'
	})
}

async function initAttrObjSimple(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'SelectList',
		exprFilter: `.owner.id = <tree,uuid,SysSystem.id> AND .codeAttrType.id = <parms,uuid,selectListId>`,
		header: 'Attribute Objects',
		name: 'data_obj_admin_attr_obj_list_simple',
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
				columnName: 'name',
				indexTable: 0,
				isDisplayable: true,
				orderCrumb: 10,
				orderDisplay: 20,
				orderDefine: 20,
				orderSort: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				indexTable: 0,
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30
			}
		]
	})

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		header: 'Attribute Object',
		name: 'data_obj_admin_attr_obj_detail_simple',
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
				exprSave: `(SELECT sys_core::SysSystem FILTER .id = <parms,uuid,queryOwnerSys>)`,
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkTable: 'SysSystem'
			},
			{
				columnName: 'codeAttrType',
				exprSave: `(SELECT sys_core::SysCode FILTER .id = <tree,uuid,treeAncestorValue.table.SysNodeObjConfig.codeAttrType.data>)`,
				orderDefine: 30,
				indexTable: 0,
				isDisplayable: false,
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40
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
				orderDefine: 70,
				indexTable: 0
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
		children: [{ node: 'node_obj_admin_attr_obj_detail_simple', order: 10 }],
		codeComponent: 'FormList',
		codeIcon: 'settings2',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_admin_attr_obj_list_simple',
		header: 'Attribute Objects',
		isAlwaysRetrieveData: true,
		name: 'node_obj_admin_attr_obj_list_simple',
		orderDefine: 10,
		owner: 'sys_system'
	})

	init.addTrans('sysNodeObj', {
		codeComponent: 'FormDetail',
		codeIcon: 'AppWindow',
		codeNodeType: 'nodeAppObj',
		dataObj: 'data_obj_admin_attr_obj_detail_simple',
		header: 'Attribute Object',
		name: 'node_obj_admin_attr_obj_detail_simple',
		orderDefine: 10,
		owner: 'sys_system'
	})
}
