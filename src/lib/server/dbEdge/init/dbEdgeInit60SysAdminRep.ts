import { sectionHeader } from '$server/dbEdge/init/dbEdgeInit200Utilities10'
import {
	addDataObj,
	addDataObjFieldEmbedListSelect
} from '$server/dbEdge/init/dbEdgeInit200Utilities20DataObj'
import { addNodeProgramObj } from '$server/dbEdge/init/dbEdgeInit200Utilities50Other'

export async function initSysAdminRep() {
	sectionHeader('Admin - Report')
	await initFieldListSelectAnalytics()
	await initAnalytic()
	await initAnalyticParm()
	await initAnalyticStatus()
	await initRep()
	await initRepParm()
	await initRepEl()
	await initRepUser()
}

async function initFieldListSelectAnalytics() {
	sectionHeader('Field List Select - Analytics')
	await addDataObj({
		actionFieldGroup: 'doag_embed_list_select',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: 'none',
		header: 'Select Analytics',
		name: 'dofls_sys_rep_analytic',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysAnalytic' }],
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

	await addDataObjFieldEmbedListSelect({
		actionFieldGroupModal: 'doag_dialog_footer_list',
		btnLabelComplete: 'Select Analytic(s)',
		dataObjList: 'dofls_sys_rep_analytic',
		name: 'fels_sys_rep_analytic',
		owner: 'sys_system_old'
	})
}

async function initAnalytic() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		exprFilter: '.owner.id = <tree,uuid,SysSystem.id>',
		header: 'Analytics',
		name: 'data_obj_sys_analytic_list',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysAnalytic' }],
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
				columnName: 'description',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Analytic',
		name: 'data_obj_sys_analytic_detail',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysAnalytic' }],
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
				columnName: 'header',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'description',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
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
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_analytic_list',
		header: 'Analytics',
		isHideRowManager: false,
		name: 'node_obj_sys_analytic_list',
		orderDefine: 10,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_system_object_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_analytic_detail',
		header: 'Analytic',
		isHideRowManager: false,
		name: 'node_obj_sys_analytic_detail',
		orderDefine: 10,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_analytic_list'
	})
}

async function initAnalyticParm() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		exprFilter:
			'.id IN (SELECT sys_rep::SysAnalytic FILTER .id = <tree,uuid,SysAnalytic.id>).parms.id',
		header: 'Parms',
		listReorderColumn: 'orderDefine',
		name: 'data_obj_sys_analytic_parm_list',
		owner: 'sys_system_old',
		parentColumn: 'parms',
		parentTable: 'SysAnalytic',
		tables: [{ index: 0, table: 'SysRepParm' }],
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
				isExcludeUpdate: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeDataType',
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeFieldElement',
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'description',
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				columnName: 'orderDefine',
				orderDefine: 70,
				indexTable: 0,
				isDisplayable: false
			},

			/* management */
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1010
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1020
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1030
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1040
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Parm',
		name: 'data_obj_sys_analytic_parm_detail',
		owner: 'sys_system_old',
		parentColumn: 'parms',
		parentTable: 'SysAnalytic',
		tables: [{ index: 0, table: 'SysRepParm' }],
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
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				columnName: 'header',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeDataType',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_db_col_data_type',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeFieldElement',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_field_element',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'description',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'fieldListItems',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,
				fieldListItems: 'il_sys_data_obj_field_list_items_order_name',
				indexTable: 0,
				linkTable: 'SysDataObjFieldListItems'
			},
			{
				codeAccess: 'optional',
				columnName: 'fieldListItemsParmName',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'linkTable',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 0,
				fieldListItems: 'il_sys_table_order_name',
				linkTable: 'SysTable'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isMultiSelect',
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
				columnName: 'orderDefine',
				orderDefine: 160,
				exprPreset: `(SELECT 1000)`,
				indexTable: 0,
				isDisplayable: false
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
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_analytic_parm_list',
		header: 'Parms',
		isHideRowManager: false,
		name: 'node_obj_sys_analytic_parm_list',
		orderDefine: 10,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_analytic_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_analytic_parm_detail',
		header: 'Parm',
		isHideRowManager: false,
		name: 'node_obj_sys_analytic_parm_detail',
		orderDefine: 10,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_analytic_parm_list'
	})
}

async function initAnalyticStatus() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		exprFilter:
			'.id IN (SELECT sys_rep::SysAnalytic FILTER .id = <tree,uuid,SysAnalytic.id>).statuses.id',
		exprSort: '.codeStatus.order',
		header: 'Statuses',
		name: 'data_obj_sys_analytic_status_list',
		owner: 'sys_system_old',
		parentColumn: 'statuses',
		parentTable: 'SysAnalytic',
		tables: [{ index: 0, table: 'SysAnalyticStatus' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeStatus',
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'comment',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'expr',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Status',
		name: 'data_obj_sys_analytic_status_detail',
		owner: 'sys_system_old',
		parentColumn: 'statuses',
		parentTable: 'SysAnalytic',
		tables: [{ index: 0, table: 'SysAnalyticStatus' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeStatus',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_index_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_rep_analytic_status',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				columnName: 'comment',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
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
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_analytic_status_list',
		header: 'Statuses',
		isHideRowManager: false,
		name: 'node_obj_sys_analytic_status_list',
		orderDefine: 20,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_analytic_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_analytic_status_detail',
		header: 'Status',
		isHideRowManager: false,
		name: 'node_obj_sys_analytic_status_detail',
		orderDefine: 10,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_analytic_status_list'
	})
}

async function initRep() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		exprFilter: '.owner.id = <tree,uuid,SysSystem.id>',
		header: 'Reports',
		name: 'data_obj_sys_rep_list',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysRep' }],
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
				columnName: 'description',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Report',
		name: 'data_obj_sys_rep_detail',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysRep' }],
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
				columnName: 'header',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'actionFieldGroup',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0,
				fieldListItems: 'il_sys_data_obj_action_field_group_order_name',
				linkTable: 'SysDataObjActionFieldGroup'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'description',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeFieldElement: 'embedListConfig',
				columnName: 'tables',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				fieldEmbedListConfig: 'flec_data_obj_table',
				indexTable: 0,
				linkTable: 'SysDataObjTable'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'exprFilter',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,
				height: 2,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'exprObject',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,
				height: 2,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'exprSort',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120,
				height: 2,
				indexTable: 0
			},
			{
				codeFieldElement: 'embedListSelect',
				columnName: 'analytics',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130,
				fieldEmbedListSelect: 'fels_sys_rep_analytic',
				indexTable: 0,
				linkTable: 'SysAnalytic'
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
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_rep_list',
		header: 'Reports',
		isHideRowManager: false,
		name: 'node_obj_sys_rep_list',
		orderDefine: 150,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_system_object_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_rep_detail',
		header: 'Report',
		isHideRowManager: false,
		name: 'node_obj_sys_rep_detail',
		orderDefine: 10,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_rep_list'
	})
}

async function initRepEl() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		exprFilter: '.id IN (SELECT sys_rep::SysRep FILTER .id = <tree,uuid,SysRep.id>).elements.id',
		header: 'Elements',
		listReorderColumn: 'orderDefine',
		name: 'data_obj_sys_rep_element_list',
		owner: 'sys_system_old',
		parentColumn: 'elements',
		parentTable: 'SysRep',
		tables: [{ index: 0, table: 'SysRepEl' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeReportElementType',
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeDbDataSourceValue',
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isDisplay',
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDisplay: 35,
				orderDefine: 35,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isDisplayable',
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'description',
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeFieldElement',
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'column',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'nameCustom',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				columnName: 'orderDefine',
				orderDefine: 100,
				indexTable: 0,
				isDisplayable: false
			},

			/* management */
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1010
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1020
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1030
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1040
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Element',
		name: 'data_obj_sys_rep_el_detail',
		owner: 'sys_system_old',
		parentColumn: 'elements',
		parentTable: 'SysRep',
		tables: [{ index: 0, table: 'SysRepEl' }],
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
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20
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
				columnName: 'codeReportElementType',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_rep_element_type',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeDbDataSourceValue',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_field_source_value',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isDisplay',
				isDisplayable: true,
				orderDisplay: 55,
				orderDefine: 55,
				indexTable: 0
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isDisplayable',
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
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80
			},
			{
				codeAccess: 'optional',
				columnName: 'description',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeFieldElement',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_field_element',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_start',
				headerAlt: 'Column - Database',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 150,
				orderDefine: 150
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'column',
				isDisplayable: true,
				orderDisplay: 160,
				orderDefine: 160,
				indexTable: 0,
				fieldListItems: 'il_sys_rep_el_table_column_order_name',
				linkTable: 'SysColumn'
			},
			{
				codeAccess: 'optional',
				columnName: 'indexTable',
				isDisplayable: true,
				orderDisplay: 170,
				orderDefine: 170,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 180,
				orderDefine: 180
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 190,
				orderDefine: 190
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_start',
				headerAlt: 'Column - Expression',
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
				codeAccess: 'optional',
				columnName: 'nameCustom',
				isDisplayable: true,
				orderDisplay: 220,
				orderDefine: 220,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'header',
				isDisplayable: true,
				orderDisplay: 230,
				orderDefine: 230,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeDataType',
				isDisplayable: true,
				orderDisplay: 240,
				orderDefine: 240,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_db_col_data_type',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeAlignment',
				isDisplayable: true,
				orderDisplay: 250,
				orderDefine: 250,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_db_col_alignment',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 260,
				orderDefine: 260
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'exprCustom',
				isDisplayable: true,
				orderDisplay: 270,
				orderDefine: 270,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 280,
				orderDefine: 280
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_start',
				headerAlt: 'Sort',
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
				columnName: 'orderSort',
				isDisplayable: true,
				orderDisplay: 310,
				orderDefine: 310,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeSortDir',
				isDisplayable: true,
				orderDisplay: 320,
				orderDefine: 320,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_field_sort_dir',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 330,
				orderDefine: 330
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				isDisplayable: true,
				orderDisplay: 340,
				orderDefine: 340
			},
			{
				columnName: 'orderDefine',
				orderDefine: 350,
				exprPreset: `(SELECT 1000)`,
				indexTable: 0,
				isDisplayable: false
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
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_rep_element_list',
		header: 'Elements',
		isHideRowManager: false,
		name: 'node_obj_sys_rep_el_list',
		orderDefine: 20,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_rep_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_rep_el_detail',
		header: 'Element',
		isHideRowManager: false,
		name: 'node_obj_sys_rep_el_detail',
		orderDefine: 10,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_rep_el_list'
	})
}

async function initRepParm() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		exprFilter: '.id IN (SELECT sys_rep::SysRep FILTER .id = <tree,uuid,SysRep.id>).parms.id',
		header: 'Parms',
		listReorderColumn: 'orderDefine',
		name: 'data_obj_sys_rep_parm_list',
		owner: 'sys_system_old',
		parentColumn: 'parms',
		parentTable: 'SysRep',
		tables: [{ index: 0, table: 'SysRepParm' }],
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 10,
				orderDisplay: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeDataType',
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeFieldElement',
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'description',
				indexTable: 0,
				isDisplayable: true,
				isExcludeUpdate: true,
				orderDefine: 60,
				orderDisplay: 60
			},
			{
				codeAccess: 'readOnly',
				codeFieldElement: 'number',
				columnName: 'orderDefine',
				indexTable: 0,
				isDisplayable: true,
				orderDefine: 70,
				orderDisplay: 70
			},

			/* management */
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1010
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1020
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1030
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 1040
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Parm',
		name: 'data_obj_sys_rep_parm_detail',
		owner: 'sys_system_old',
		parentColumn: 'parms',
		parentTable: 'SysRep',
		tables: [{ index: 0, table: 'SysRepParm' }],
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
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				columnName: 'header',
				isDisplayable: true,
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeDataType',
				isDisplayable: true,
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_db_col_data_type',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeFieldElement',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_field_element',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 80,
				orderDefine: 80
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'description',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'fieldListItems',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,
				fieldListItems: 'il_sys_data_obj_field_list_items_order_name',
				indexTable: 0,
				linkTable: 'SysDataObjFieldListItems'
			},
			{
				codeAccess: 'optional',
				columnName: 'fieldListItemsParmName',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'linkTable',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 0,
				fieldListItems: 'il_sys_table_order_name',
				linkTable: 'SysTable'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isMultiSelect',
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
				columnName: 'orderDefine',
				orderDefine: 160,
				exprPreset: `(SELECT 1000)`,
				indexTable: 0,
				isDisplayable: false
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
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_rep_parm_list',
		header: 'Parms',
		isHideRowManager: false,
		name: 'node_obj_sys_rep_parm_list',
		orderDefine: 10,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_rep_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_rep_parm_detail',
		header: 'Parm',
		isHideRowManager: false,
		name: 'node_obj_sys_rep_parm_detail',
		orderDefine: 10,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_rep_parm_list'
	})
}

async function initRepUser() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		exprFilter: '.report.id = <tree,uuid,SysRep.id>',
		header: 'Users',
		name: 'data_obj_sys_rep_user_list',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysRepUser' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'user',
				orderSort: 10,
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['person', 'fullName']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'headerUser',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'descriptionUser',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'User',
		name: 'data_obj_sys_rep_user_detail',
		owner: 'sys_system_old',
		tables: [{ index: 0, table: 'SysRepUser' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'report',
				orderDefine: 20,
				indexTable: 0,
				isDisplayable: false,
				linkExprSave: `(SELECT sys_rep::SysRep FILTER .id = <tree,uuid,SysRep.id>)`,
				linkTable: 'SysRep'
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
				columnName: 'user',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				fieldListItems: 'il_sys_user',
				linkTable: 'SysUser'
			},
			{
				codeAccess: 'required',
				columnName: 'headerUser',
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
				codeAccess: 'readOnly',
				codeFieldElement: 'textArea',
				columnName: 'descriptionUser',
				isDisplayable: true,
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				columnName: 'orderDefine',
				orderDefine: 80,
				exprPreset: `(SELECT 0)`,
				indexTable: 0,
				isDisplayable: false
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
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_rep_user_list',
		header: 'Users',
		isHideRowManager: false,
		name: 'node_obj_sys_rep_user_list',
		orderDefine: 30,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_rep_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_rep_user_detail',
		header: 'User',
		isHideRowManager: false,
		name: 'node_obj_sys_rep_user_detail',
		orderDefine: 10,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_rep_user_list'
	})
}
