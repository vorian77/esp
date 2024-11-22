import { InitDb } from '$server/dbEdge/init/types.init'

// backlink
// .##csfCohort[is app_cm::CmCsfCohortAttd].cohortAttd.id`,

export function initPreDataObjFieldItem(init: InitDb) {
	/* code - general */
	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: '.name',
		exprFilter: '.codeType.name = <parms,str,itemsParmName>',
		exprSort: '.order',
		name: 'il_sys_code_order_index_by_codeType_name',
		owner: 'sys_system_old',
		table: 'SysCode'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: '.name',
		exprFilter: '.codeType.name = <parms,str,itemsParmName>',
		name: 'il_sys_code_order_name_by_codeType_name',
		owner: 'sys_system_old',
		table: 'SysCode'
	})

	/* code - system */
	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: '.name',
		exprFilter:
			'.codeType.name = <parms,str,itemsParmName> AND .owner.id = <parms,uuid,appSystemId>',
		exprSort: '.order',
		name: 'il_sys_code_order_index_by_codeType_name_system',
		owner: 'sys_system_old',
		table: 'SysCode'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: '.name',
		exprFilter:
			'.codeType.name = <parms,str,itemsParmName> AND .owner.id = <parms,uuid,appSystemId>',
		name: 'il_sys_code_order_name_by_codeType_name_system',
		owner: 'sys_system_old',
		table: 'SysCode'
	})

	/* other */
	init.addTrans('sysDataObjFieldListItems', {
		exprFilter: `.cohortId = (SELECT app_cm::CmCsfCohort FILTER .id = <tree,uuid,CmCsfCohort.id>).cohort.id AND .id NOT IN (SELECT app_cm::CmCsfCohortAttd FILTER .csfCohort.id = <tree,uuid,CmCsfCohort.id>).cohortAttd.id`,
		exprPropDisplay: 'std::to_str(<cal::local_date>.date)',
		exprWith: ``,
		name: 'il_cm_cohort_attd_cohort',
		owner: 'sys_ai_old',
		table: 'CmCohortAttd'
	})

	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: '.header',
		name: 'il_cm_service_flow',
		owner: 'sys_ai_old',
		table: 'CmServiceFlow'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: `.course.name ++ ' (' ++ .name ++ ')' ++ ' (' ++ std::to_str(<cal::local_date>.dateStart) ++ ')'`,
		exprFilter: `.owner IN (SELECT sys_user::SysUser FILTER .userName = <user,str,userName>).userTypes.owner`,
		name: 'il_cm_cohort_long_by_userName',
		owner: 'sys_ai_old',
		table: 'CmCohort'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: `.name`,
		exprFilter: `.owner IN (SELECT sys_user::SysUser FILTER .userName = <user,str,userName>).systems`,
		name: 'il_cm_cohort_short_by_userName',
		owner: 'sys_ai_old',
		table: 'CmCohort'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: '.name',
		exprFilter: `(.csf.id IN <tree,uuidList,CmClientServiceFlow.id> AND .codeStatus = (SELECT sys_core::getCode('ct_cm_service_flow_status', <parms,str,status>))).cohort.course)`,
		name: 'il_cm_course_by_csfId_status',
		owner: 'sys_ai_old',
		table: 'CmCsfCohort'
	})

	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: '.name',
		exprFilter: `.owner.id in <user,uuidlist,systemIdList> OR .isGlobalResource = true`,
		name: 'il_sys_app_header_order_name',
		owner: 'sys_system_old',
		table: 'SysAppHeader'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: '.name',
		exprFilter: '.codeType.id = <tree,uuid,SysCodeType.id>',
		name: 'il_sys_code_order_name_by_codeType_id',
		owner: 'sys_system_old',
		table: 'SysCode'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: '.name',
		exprFilter: '.codeType = sys_core::SysCode.codeType',
		name: 'il_sys_code_parent',
		owner: 'sys_system_old',
		table: 'SysCode'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: '.name',
		name: 'il_sys_codeType_order_name',
		owner: 'sys_system_old',
		table: 'SysCodeType'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: `.name`,
		name: 'il_sys_column_order_name',
		owner: 'sys_system_old',
		table: 'SysColumn'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: `.name`,
		name: 'il_sys_data_obj_action_field_order_name',
		owner: 'sys_system_old',
		table: 'SysDataObjActionField'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: `.name`,
		name: 'il_sys_data_obj_action_field_group_order_name',
		owner: 'sys_system_old',
		table: 'SysDataObjActionFieldGroup'
	})

	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: '.column.name',
		exprFilter: `.id IN (SELECT sys_core::SysDataObj FILTER .id = <tree,uuid,SysDataObj.id>).columns.id`,
		name: 'il_sys_data_obj_columns_order_name',
		owner: 'sys_system_old',
		table: 'SysDataObjColumn'
	})

	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: `.name`,
		name: 'il_sys_data_obj_field_embed_list_config_order_name',
		owner: 'sys_system_old',
		table: 'SysDataObjFieldEmbedListConfig'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: `.name`,
		name: 'il_sys_data_obj_field_embed_list_edit_order_name',
		owner: 'sys_system_old',
		table: 'SysDataObjFieldEmbedListEdit'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: `.name`,
		name: 'il_sys_data_obj_field_embed_list_select_order_name',
		owner: 'sys_system_old',
		table: 'SysDataObjFieldEmbedListSelect'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: `.name`,
		name: 'il_sys_data_obj_field_list_items_order_name',
		owner: 'sys_system_old',
		table: 'SysDataObjFieldListItems'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprFilter: '.codeDataObjType.name = <parms,str,itemsParmName> ',
		exprPropDisplay: '.name',
		name: 'il_sys_data_obj_order_name_by_dataObjtype',
		owner: 'sys_system_old',
		table: 'SysDataObj'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: '.name',
		exprFilter: `.id IN (SELECT (SELECT sys_migr::SysMigrTargetTable FILTER .id = <tree,uuid,SysMigrTargetTable.id>).table.columns.id)
		AND .id NOT IN (SELECT (SELECT sys_migr::SysMigrTargetTable FILTER .id = <tree,uuid,SysMigrTargetTable.id>).columns.column.id)`,
		name: 'il_sys_migr_target_table_column_order_name',
		owner: 'sys_system_old',
		table: 'SysColumn'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: '.name',
		name: 'il_sys_node_obj_order_name',
		owner: 'sys_system_old',
		table: 'SysNodeObj'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: '.header',
		name: 'il_sys_obj_subject_order_name',
		owner: 'sys_system_old',
		table: 'SysObjSubject'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: '.name',
		name: 'il_sys_org_order_name',
		owner: 'sys_system_old',
		table: 'SysOrg'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: '.name',
		exprFilter: `.id IN (SELECT (SELECT sys_rep::SysRep FILTER .id = <tree,uuid,SysRep.id>).tables.table.columns.id)
		AND .id NOT IN (SELECT (SELECT sys_rep::SysRep FILTER .id = <tree,uuid,SysRep.id>).elements.column.id)`,
		name: 'il_sys_rep_el_table_column_order_name',
		owner: 'sys_system_old',
		table: 'SysColumn'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: '.name',
		exprFilter: '.roles.name = <parms,str,itemsParmName>',
		name: 'il_sys_role_org_by_codeName',
		owner: 'sys_system_old',
		table: 'SysOrg'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: '.name',
		name: 'il_sys_system_order_name',
		owner: 'sys_system_old',
		table: 'SysSystem'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: '.name',
		name: 'il_sys_table_order_name',
		owner: 'sys_system_old',
		table: 'SysTable'
	})

	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: '.name',
		exprFilter: `.id IN ((SELECT sys_core::SysObj [IS sys_core::SysNodeObj] FILTER .codeNodeType.name = 'task') UNION (SELECT sys_core::SysObj [IS sys_core::SysDataObj] FILTER .codeDataObjType.name = 'task')).id`,
		name: 'il_sys_task_obj',
		owner: 'sys_system_old',
		table: 'SysObj'
	})

	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: '.person.fullName',
		name: 'il_sys_user',
		owner: 'sys_system_old',
		table: 'SysUser'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: '.person.fullName',
		exprFilter: '.userTypes.tags.name = <parms,str,itemsParmName>',
		name: 'il_sys_user_by_tag_type',
		owner: 'sys_system_old',
		table: 'SysUser'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprFilter: `.id IN (<tree,uuid,SysOrg.id> UNION (SELECT DETACHED sys_user::SysUser FILTER .id = <tree,uuid,SysUser.id,undefined>).orgs.id)`,
		exprPropDisplay: '.name',
		name: 'il_sys_user_org',
		owner: 'sys_system_old',
		table: 'SysOrg'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprPropDisplay: '.name',
		exprFilter: `sys_core::SysObj IN (SELECT 
			(sys_core::SysObj[is sys_core::SysOrg]) UNION
			(sys_core::SysObj[is sys_user::SysWidget]) UNION
			(SELECT (sys_core::SysObj[is sys_core::SysNodeObj]) FILTER .codeNodeType.name = 'program')
			)`,
		name: 'il_sys_user_type_resource',
		owner: 'sys_system_old',
		table: 'SysObj'
	})
}
