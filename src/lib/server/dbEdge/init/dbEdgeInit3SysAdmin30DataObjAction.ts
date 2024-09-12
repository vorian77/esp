import { sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities10'
import {
	addDataObj,
	addDataObjFieldEmbedListConfig,
	addDataObjFieldEmbedListSelect
} from '$server/dbEdge/init/dbEdgeInitUtilities20DataObj'
import { addNodeProgramObj } from '$server/dbEdge/init/dbEdgeInitUtilities50Other'

export default async function init() {
	sectionHeader('SysAdmin - Data Object - Action')

	await initDataObjActionsQuery()
	await initDataObjActionField()
	await initDataObjActionFieldGroup()
}

async function initDataObjActionsQuery() {
	sectionHeader('Field List Config - DataObjActionQuery')

	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter:
			'.id IN (SELECT sys_core::SysDataObj FILTER .id = <tree,uuid,SysDataObj.id>).actionsQuery.id',
		header: 'Data Object - Actions Query',
		name: 'data_obj_sys_admin_data_obj_action_query_list',
		owner: 'app_sys_admin',
		parentColumn: 'actionsQuery',
		parentTable: 'SysDataObj',
		tables: [{ index: 0, table: 'SysDataObjActionQuery' }],
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
			}
		]
	})

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Data Object - Action Query',
		name: 'data_obj_sys_admin_data_obj_action_query_detail',
		owner: 'app_sys_admin',
		parentColumn: 'actionsQuery',
		parentTable: 'SysDataObj',
		tables: [{ index: 0, table: 'SysDataObjActionQuery' }],
		fields: [
			{
				columnName: 'id',
				indexTable: 0,
				isDisplayable: false,
				orderDefine: 10
			},
			{
				columnName: 'name',
				isDisplayable: true,
				orderDisplay: 20,
				orderDefine: 20,
				indexTable: 0
			},
			{
				codeFieldElement: 'embedListConfig',
				columnName: 'parms',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				fieldEmbedListConfig: 'flec_data_obj_action_query_parm',
				indexTable: 0,
				linkTable: 'SysDataObjActionQueryParm'
			},
			{
				codeFieldElement: 'embedListConfig',
				columnName: 'triggers',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				fieldEmbedListConfig: 'flec_data_obj_action_query_trigger',
				indexTable: 0,
				linkTable: 'SysDataObjActionQueryTrigger'
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
		dataObj: 'data_obj_sys_admin_data_obj_action_query_list',
		header: 'Query Actions',
		isHideRowManager: false,
		name: 'node_obj_sys_admin_data_obj_action_query_list',
		orderDefine: 30,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_data_obj_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_action_query_detail',
		header: 'Query Action',
		isHideRowManager: false,
		name: 'node_obj_sys_admin_data_obj_action_query_detail',
		orderDefine: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_data_obj_action_query_list'
	})
}

async function initDataObjActionField() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <tree,uuid,SysResource.id>',
		header: 'Field Actions',
		name: 'data_obj_sys_admin_data_obj_action_field_list',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjActionField' }],
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

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Field Action',
		name: 'data_obj_sys_admin_data_obj_action_field_detail',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjActionField' }],
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
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
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
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_start',
				isDisplayable: true,
				orderDisplay: 90,
				orderDefine: 90
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeActionFieldTriggerEnable',
				isDisplayable: true,
				orderDisplay: 100,
				orderDefine: 100,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_do_action_field_trigger',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'select',
				columnName: 'codeActionFieldType',
				isDisplayable: true,
				orderDisplay: 110,
				orderDefine: 110,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_token_action',
				linkTable: 'SysCode'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'select',
				columnName: 'codeColor',
				isDisplayable: true,
				orderDisplay: 120,
				orderDefine: 120,
				indexTable: 0,
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParmName: 'ct_sys_tailwind_color',
				linkTable: 'SysCode'
			},
			{
				codeFieldElement: 'toggle',
				columnName: 'isListRowAction',
				isDisplayable: true,
				orderDisplay: 130,
				orderDefine: 130,
				indexTable: 0
			},
			{
				codeFieldElement: 'tagRow',
				columnName: 'custom_row_end',
				isDisplayable: true,
				orderDisplay: 140,
				orderDefine: 140
			},
			{
				codeFieldElement: 'embedListConfig',
				columnName: 'actionFieldConfirms',
				isDisplayable: true,
				orderDisplay: 150,
				orderDefine: 150,
				fieldEmbedListConfig: 'flec_data_obj_action_field_confirm',
				indexTable: 0,
				linkTable: 'SysDataObjActionFieldConfirm'
			},
			{
				codeFieldElement: 'embedListConfig',
				columnName: 'actionFieldShows',
				isDisplayable: true,
				orderDisplay: 160,
				orderDefine: 160,
				fieldEmbedListConfig: 'flec_data_obj_action_field_show',
				indexTable: 0,
				linkTable: 'SysDataObjActionFieldShow'
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
		dataObj: 'data_obj_sys_admin_data_obj_action_field_list',
		header: 'Field Actions',
		isHideRowManager: false,
		name: 'node_obj_sys_admin_data_obj_action_field_list',
		orderDefine: 40,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_resource_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_action_field_detail',
		header: 'Config',
		isHideRowManager: false,
		name: 'node_obj_sys_admin_data_obj_action_field_detail',
		orderDefine: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_data_obj_action_field_list'
	})
}

async function initDataObjActionFieldGroup() {
	await addDataObj({
		actionFieldGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <tree,uuid,SysResource.id>',
		header: 'Field Action Groups',
		name: 'data_obj_sys_admin_data_obj_action_field_group_list',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjActionFieldGroup' }],
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

	await addDataObj({
		actionFieldGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Field Action Group',
		name: 'data_obj_sys_admin_data_obj_action_field_group_detail',
		owner: 'app_sys_admin',
		tables: [{ index: 0, table: 'SysDataObjActionFieldGroup' }],
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
				linkExprSave: `(SELECT sys_core::SysResource FILTER .id = <tree,uuid,SysResource.id>)`,
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
				codeFieldElement: 'embedListConfig',
				columnName: 'actionFieldItems',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				fieldEmbedListConfig: 'flec_data_obj_action_field_group_item',
				indexTable: 0,
				linkTable: 'SysDataObjActionFieldGroupItem'
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
		dataObj: 'data_obj_sys_admin_data_obj_action_field_group_list',
		header: 'Field Action Groups',
		isHideRowManager: false,
		name: 'node_obj_sys_admin_data_obj_action_field_group_list',
		orderDefine: 50,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_resource_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_action_field_group_detail',
		header: 'Config',
		isHideRowManager: false,
		name: 'node_obj_sys_admin_data_obj_action_field_group_detail',
		orderDefine: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_data_obj_action_field_group_list'
	})
}
