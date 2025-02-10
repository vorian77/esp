import { InitDb } from '$server/dbEdge/init/types.init'

export function initAdminSysObjDataObjActionQuery(init: InitDb) {
	initDataObjActionsQuery(init)
}

function initDataObjActionsQuery(init: InitDb) {
	init.addTrans('sysDataObj', {
		actionGroup: 'doag_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter:
			'.id IN (SELECT sys_core::SysDataObj FILTER .id = <tree,uuid,SysDataObj.id>).actionsQuery.id',
		header: 'Data Object - Actions Query',
		name: 'data_obj_sys_admin_data_obj_action_query_list',
		owner: 'sys_system_old',
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

	init.addTrans('sysDataObj', {
		actionGroup: 'doag_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Data Object - Action Query',
		name: 'data_obj_sys_admin_data_obj_action_query_detail',
		owner: 'sys_system_old',
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
				codeAccess: 'optional',
				codeFieldElement: 'embedListConfig',
				columnName: 'parms',
				isDisplayable: true,
				orderDisplay: 30,
				orderDefine: 30,
				fieldEmbedListConfig: 'flec_data_obj_action_query_parm',
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysDataObjActionQueryParm'
			},
			{
				codeAccess: 'optional',
				codeFieldElement: 'embedListConfig',
				columnName: 'triggers',
				isDisplayable: true,
				orderDisplay: 40,
				orderDefine: 40,
				fieldEmbedListConfig: 'flec_data_obj_action_query_trigger',
				indexTable: 0,
				linkColumns: ['name'],
				linkTable: 'SysDataObjActionQueryTrigger'
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
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_sys_admin_data_obj_action_query_list',
		header: 'Query Actions',
		name: 'node_obj_sys_admin_data_obj_action_query_list',
		orderDefine: 30,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_admin_data_obj_detail'
	})

	init.addTrans('sysNodeObjProgramObj', {
		codeIcon: 'AppWindow',
		codeNodeType: 'program_object',
		dataObj: 'data_obj_sys_admin_data_obj_action_query_detail',
		header: 'Query Action',
		name: 'node_obj_sys_admin_data_obj_action_query_detail',
		orderDefine: 10,
		owner: 'sys_system_old',
		parentNodeName: 'node_obj_sys_admin_data_obj_action_query_list'
	})
}
