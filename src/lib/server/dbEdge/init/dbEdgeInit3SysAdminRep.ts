import { sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import {
	addDataObj,
	addDataObjFieldEmbedListSelect,
	addNodeProgramObj
} from '$server/dbEdge/init/dbEdgeInitUtilities2'

export async function initAdminSysRep() {
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
		owner: 'app_sys_rep',
		tables: [{ index: 0, table: 'SysAnalytic' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 10,
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
		owner: 'app_sys_rep'
	})
}

async function initAnalytic() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		exprFilter: '.owner.id = <tree,uuid,SysResource.id>',
		header: 'Analytics',
		name: 'data_obj_sys_analytic_list',
		owner: 'app_sys_rep',
		tables: [{ index: 0, table: 'SysAnalytic' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 10,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'description',
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
		owner: 'app_sys_rep',
		tables: [{ index: 0, table: 'SysAnalytic' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isExcludeDisplayAlt: true,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				columnName: 'name',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				columnName: 'header',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'description',
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_analytic_list',
		header: 'Analytics',
		name: 'node_obj_sys_analytic_list',
		orderDefine: 5,
		owner: 'app_sys_rep',
		parentNodeName: 'node_obj_sys_admin_resource_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_analytic_detail',
		header: 'Analytic',
		name: 'node_obj_sys_analytic_detail',
		orderDefine: 10,
		owner: 'app_sys_rep',
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
		owner: 'app_sys_rep',
		parentColumn: 'parms',
		parentTable: 'SysAnalytic',
		tables: [{ index: 0, table: 'SysRepParm' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isRequired',
				orderDisplay: 15,
				orderDefine: 15,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeParmType',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'description',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				columnName: 'orderDefine',
				orderSort: 10,
				orderDefine: 60,
				indexTable: 0,
				isExcludeDisplayAlt: true
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Parm',
		name: 'data_obj_sys_analytic_parm_detail',
		owner: 'app_sys_rep',
		parentColumn: 'parms',
		parentTable: 'SysAnalytic',
		tables: [{ index: 0, table: 'SysRepParm' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 20,
				orderDefine: 20
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isRequired',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				columnName: 'name',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				columnName: 'header',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeParmType',
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_rep_parm_type',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'description',
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 90,
				orderDefine: 90
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'fieldListItems',
				orderDisplay: 100,
				orderDefine: 100,
				fieldListItems: 'il_sys_data_obj_field_list_items_order_name',
				indexTable: 0,
				linkTable: 'SysDataObjFieldListItems'
			},
			{
				codeAccess: 'optional',
				columnName: 'fieldListItemsParmName',
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'linkTable',
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 0,
				fieldListItems: 'il_sys_table_order_name',
				linkTable: 'SysTable'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isMultiSelect',
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 140,
				orderDefine: 140
			},
			{
				columnName: 'orderDefine',
				orderDefine: 150,
				exprPreset: `(SELECT 1000)`,
				indexTable: 0,
				isExcludeDisplayAlt: true
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_analytic_parm_list',
		header: 'Parms',
		name: 'node_obj_sys_analytic_parm_list',
		orderDefine: 10,
		owner: 'app_sys_rep',
		parentNodeName: 'node_obj_sys_analytic_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_analytic_parm_detail',
		header: 'Parm',
		name: 'node_obj_sys_analytic_parm_detail',
		orderDefine: 10,
		owner: 'app_sys_rep',
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
		owner: 'app_sys_rep',
		parentColumn: 'statuses',
		parentTable: 'SysAnalytic',
		tables: [{ index: 0, table: 'SysAnalyticStatus' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeStatus',
				orderSort: 10,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'comment',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'expr',
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
		owner: 'app_sys_rep',
		parentColumn: 'statuses',
		parentTable: 'SysAnalytic',
		tables: [{ index: 0, table: 'SysAnalyticStatus' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeStatus',
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
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'expr',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_analytic_status_list',
		header: 'Statuses',
		name: 'node_obj_sys_analytic_status_list',
		orderDefine: 20,
		owner: 'app_sys_rep',
		parentNodeName: 'node_obj_sys_analytic_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_analytic_status_detail',
		header: 'Status',
		name: 'node_obj_sys_analytic_status_detail',
		orderDefine: 10,
		owner: 'app_sys_rep',
		parentNodeName: 'node_obj_sys_analytic_status_list'
	})
}

async function initRep() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		exprFilter: '.owner.id = <tree,uuid,SysResource.id>',
		header: 'Reports',
		name: 'data_obj_sys_rep_list',
		owner: 'app_sys_rep',
		tables: [{ index: 0, table: 'SysRep' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderCrumb: 10,
				orderSort: 10,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'description',
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
		owner: 'app_sys_rep',
		tables: [{ index: 0, table: 'SysRep' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'owner',
				orderDefine: 20,
				indexTable: 0,
				isExcludeDisplayAlt: true,
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
				linkTable: 'SysOrg'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				columnName: 'name',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				columnName: 'header',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'actionFieldGroup',
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0,
				fieldListItems: 'il_sys_data_obj_action_field_group_order_name',
				linkTable: 'SysDataObjActionFieldGroup'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'description',
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeFieldElement: 'embedListConfig',
				columnName: 'tables',
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
				orderDisplay: 100,
				orderDefine: 100,
				height: 2,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'exprObject',
				orderDisplay: 110,
				orderDefine: 110,
				height: 2,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'exprSort',
				orderDisplay: 120,
				orderDefine: 120,
				height: 2,
				indexTable: 0
			},
			{
				codeFieldElement: 'embedListSelect',
				columnName: 'analytics',
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
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_rep_list',
		header: 'Reports',
		name: 'node_obj_sys_rep_list',
		orderDefine: 95,
		owner: 'app_sys_rep',
		parentNodeName: 'node_obj_sys_admin_resource_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_rep_detail',
		header: 'Report',
		name: 'node_obj_sys_rep_detail',
		orderDefine: 10,
		owner: 'app_sys_rep',
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
		name: 'data_obj_sys_rep_el_list',
		owner: 'app_sys_rep',
		parentColumn: 'elements',
		parentTable: 'SysRep',
		tables: [{ index: 0, table: 'SysRepEl' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeReportElementType',
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeDbDataSourceValue',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isExcludeDisplayAlt',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'description',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeFieldElement',
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'orderDisplay',
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'column',
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'nameCustom',
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				columnName: 'orderDefine',
				orderSort: 10,
				orderDefine: 100,
				indexTable: 0,
				isExcludeDisplayAlt: true
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Element',
		name: 'data_obj_sys_rep_el_detail',
		owner: 'app_sys_rep',
		parentColumn: 'elements',
		parentTable: 'SysRep',
		tables: [{ index: 0, table: 'SysRepEl' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_start',
				orderDisplay: 20,
				orderDefine: 20
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeReportElementType',
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
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_field_source_value',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isExcludeDisplayAlt',
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 80,
				orderDefine: 80
			},
			{
				codeAccess: 'optional',
				columnName: 'description',
				orderDisplay: 90,
				orderDefine: 90,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeFieldElement',
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_field_element',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'number',
				columnName: 'orderDisplay',
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 120,
				orderDefine: 120
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				orderDisplay: 130,
				orderDefine: 130
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_start',
				headerAlt: 'Column - Database',
				orderDisplay: 140,
				orderDefine: 140
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 150,
				orderDefine: 150
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'column',
				orderDisplay: 160,
				orderDefine: 160,
				indexTable: 0,
				fieldListItems: 'il_sys_rep_el_table_column_order_name',
				linkTable: 'SysColumn'
			},
			{
				codeAccess: 'optional',
				columnName: 'indexTable',
				orderDisplay: 170,
				orderDefine: 170,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 180,
				orderDefine: 180
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				orderDisplay: 190,
				orderDefine: 190
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_start',
				headerAlt: 'Column - Expression',
				orderDisplay: 200,
				orderDefine: 200
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 210,
				orderDefine: 210
			},
			{
				codeAccess: 'optional',
				columnName: 'nameCustom',
				orderDisplay: 220,
				orderDefine: 220,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				columnName: 'header',
				orderDisplay: 230,
				orderDefine: 230,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeDataType',
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
				orderDisplay: 260,
				orderDefine: 260
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'exprCustom',
				orderDisplay: 270,
				orderDefine: 270,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				orderDisplay: 280,
				orderDefine: 280
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_start',
				headerAlt: 'Sort',
				orderDisplay: 290,
				orderDefine: 290
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 300,
				orderDefine: 300
			},
			{
				codeAccess: 'optional',
				columnName: 'orderSort',
				orderDisplay: 310,
				orderDefine: 310,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeSortDir',
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
				orderDisplay: 330,
				orderDefine: 330
			},
			{
				codeFieldElement: 'tagSection',
				columnName: 'custom_section_end',
				orderDisplay: 340,
				orderDefine: 340
			},
			{
				columnName: 'orderDefine',
				orderDefine: 350,
				exprPreset: `(SELECT 1000)`,
				indexTable: 0,
				isExcludeDisplayAlt: true
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_rep_el_list',
		header: 'Elements',
		name: 'node_obj_sys_rep_el_list',
		orderDefine: 20,
		owner: 'app_sys_rep',
		parentNodeName: 'node_obj_sys_rep_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_rep_el_detail',
		header: 'Element',
		name: 'node_obj_sys_rep_el_detail',
		orderDefine: 10,
		owner: 'app_sys_rep',
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
		owner: 'app_sys_rep',
		parentColumn: 'parms',
		parentTable: 'SysRep',
		tables: [{ index: 0, table: 'SysRepParm' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isRequired',
				orderDisplay: 15,
				orderDefine: 15,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeParmType',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				linkColumns: ['name']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'description',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				columnName: 'orderDefine',
				orderSort: 10,
				orderDefine: 60,
				indexTable: 0,
				isExcludeDisplayAlt: true
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Parm',
		name: 'data_obj_sys_rep_parm_detail',
		owner: 'app_sys_rep',
		parentColumn: 'parms',
		parentTable: 'SysRep',
		tables: [{ index: 0, table: 'SysRepParm' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 20,
				orderDefine: 20
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isRequired',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				columnName: 'name',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0
			},
			{
				columnName: 'header',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeParmType',
				orderDisplay: 60,
				orderDefine: 60,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_rep_parm_type',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 70,
				orderDefine: 70
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'textArea',
				columnName: 'description',
				orderDisplay: 80,
				orderDefine: 80,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 90,
				orderDefine: 90
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'fieldListItems',
				orderDisplay: 100,
				orderDefine: 100,

				fieldListItems: 'il_sys_data_obj_field_list_items_order_name',
				indexTable: 0,
				linkTable: 'SysDataObjFieldListItems'
			},
			{
				codeAccess: 'optional',
				columnName: 'fieldListItemsParmName',
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 0
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'linkTable',
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 0,
				fieldListItems: 'il_sys_table_order_name',
				linkTable: 'SysTable'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isMultiSelect',
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 140,
				orderDefine: 140
			},
			{
				columnName: 'orderDefine',
				orderDefine: 150,
				exprPreset: `(SELECT 1000)`,
				indexTable: 0,
				isExcludeDisplayAlt: true
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_rep_parm_list',
		header: 'Parms',
		name: 'node_obj_sys_rep_parm_list',
		orderDefine: 10,
		owner: 'app_sys_rep',
		parentNodeName: 'node_obj_sys_rep_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_rep_parm_detail',
		header: 'Parm',
		name: 'node_obj_sys_rep_parm_detail',
		orderDefine: 10,
		owner: 'app_sys_rep',
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
		owner: 'app_sys_rep',
		tables: [{ index: 0, table: 'SysRepUser' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isExcludeDisplayAlt: true,
				orderDefine: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'user',
				orderSort: 10,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0,
				linkColumns: ['person', 'fullName']
			},
			{
				codeAccess: 'readOnly',
				columnName: 'headerUser',
				orderDisplay: 30,
				orderDefine: 30,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'descriptionUser',
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
		owner: 'app_sys_rep',
		tables: [{ index: 0, table: 'SysRepUser' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				orderDefine: 10
			},
			{
				columnName: 'report',
				orderDefine: 20,
				indexTable: 0,
				isExcludeDisplayAlt: true,
				linkExprSave: `(SELECT sys_rep::SysRep FILTER .id = <tree,uuid,SysRep.id>)`,
				linkTable: 'SysRep'
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 30,
				orderDefine: 30
			},
			{
				codeFieldElement: 'select',
				columnName: 'user',
				orderDisplay: 40,
				orderDefine: 40,
				indexTable: 0,
				fieldListItems: 'il_sys_user',
				linkTable: 'SysUser'
			},
			{
				codeAccess: 'required',
				columnName: 'headerUser',
				orderDisplay: 50,
				orderDefine: 50,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 60,
				orderDefine: 60
			},
			{
				codeAccess: 'readOnly',
				codeFieldElement: 'textArea',
				columnName: 'descriptionUser',
				orderDisplay: 70,
				orderDefine: 70,
				indexTable: 0
			},
			{
				columnName: 'orderDefine',
				orderDefine: 80,
				exprPreset: `(SELECT 0)`,
				indexTable: 0,
				isExcludeDisplayAlt: true
			},

			/* management */
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				orderDisplay: 1000,
				orderDefine: 1000
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				orderDisplay: 1010,
				orderDefine: 1010,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				orderDisplay: 1020,
				orderDefine: 1020,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				orderDisplay: 1030,
				orderDefine: 1030,
				indexTable: 0
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				orderDisplay: 1040,
				orderDefine: 1040,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				orderDisplay: 1050,
				orderDefine: 1050
			}
		]
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_rep_user_list',
		header: 'Users',
		name: 'node_obj_sys_rep_user_list',
		orderDefine: 30,
		owner: 'app_sys_rep',
		parentNodeName: 'node_obj_sys_rep_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_rep_user_detail',
		header: 'User',
		name: 'node_obj_sys_rep_user_detail',
		orderDefine: 10,
		owner: 'app_sys_rep',
		parentNodeName: 'node_obj_sys_rep_user_list'
	})
}
