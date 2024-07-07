import { sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { addDataObjFieldItems } from '$server/dbEdge/init/dbEdgeInitUtilities2'

// backlink
// .##csfCohort[is app_cm::CmCsfCohortAttd].cohortAttd.id`,

export async function initPreDataObjFieldItem() {
	sectionHeader('DataObjFieldItem')
	await addDataObjFieldItems({
		exprFilter: `.cohortId = (SELECT app_cm::CmCsfCohort FILTER .id = <tree,uuid,CmCsfCohort.id>).cohort.id AND .id NOT IN (SELECT app_cm::CmCsfCohortAttd FILTER .csfCohort.id = <tree,uuid,CmCsfCohort.id>).cohortAttd.id`,
		exprPropDisplay: 'std::to_str(<cal::local_date>.date)',
		exprWith: ``,
		name: 'il_cm_cohort_attd_cohort',
		owner: 'app_cm',
		table: 'CmCohortAttd'
	})

	await addDataObjFieldItems({
		exprPropDisplay: '.header',
		name: 'il_cm_service_flow',
		owner: 'app_cm',
		table: 'CmServiceFlow'
	})
	await addDataObjFieldItems({
		exprPropDisplay: `.course.name ++ ' (' ++ .name ++ ')' ++ ' (' ++ std::to_str(<cal::local_date>.dateStart) ++ ')'`,
		exprFilter: `.owner IN (SELECT sys_user::SysUser FILTER .userName = <user,str,userName>).orgs`,
		name: 'il_cm_cohort_long_by_userName',
		owner: 'app_cm',
		table: 'CmCohort'
	})
	await addDataObjFieldItems({
		exprPropDisplay: `.name`,
		exprFilter: `.owner IN (SELECT sys_user::SysUser FILTER .userName = <user,str,userName>).orgs`,
		name: 'il_cm_cohort_short_by_userName',
		owner: 'app_cm',
		table: 'CmCohort'
	})
	await addDataObjFieldItems({
		exprPropDisplay: '.name',
		exprFilter: `(.csf.id IN <tree,uuidList,CmClientServiceFlow.id> AND .codeStatus = (SELECT sys_core::getCode('ct_cm_service_flow_status', <parms,str,status>))).cohort.course)`,
		name: 'il_cm_course_by_csfId_status',
		owner: 'app_cm',
		table: 'CmCsfCohort'
	})
	await addDataObjFieldItems({
		exprPropDisplay: '.name',
		exprFilter: '.codeType.id = <tree,uuid,SysCodeType.id>',
		name: 'il_sys_code_order_name_by_codeType_id',
		owner: 'app_sys',
		table: 'SysCode'
	})
	await addDataObjFieldItems({
		exprPropDisplay: '.name',
		exprFilter: '.codeType.name = <parms,str,fieldListItemsParmName>',
		exprSort: '.order',
		name: 'il_sys_code_order_index_by_codeType_name',
		owner: 'app_sys',
		table: 'SysCode'
	})
	await addDataObjFieldItems({
		exprPropDisplay: '.name',
		exprFilter: '.codeType.name = <parms,str,fieldListItemsParmName>',
		name: 'il_sys_code_order_name_by_codeType_name',
		owner: 'app_sys',
		table: 'SysCode'
	})
	await addDataObjFieldItems({
		exprPropDisplay: '.name',
		exprFilter: '.codeType = sys_core::SysCode.codeType',
		name: 'il_sys_code_parent',
		owner: 'app_sys',
		table: 'SysCode'
	})
	await addDataObjFieldItems({
		exprPropDisplay: '.name',
		name: 'il_sys_codeType_order_name',
		owner: 'app_sys',
		table: 'SysCodeType'
	})
	await addDataObjFieldItems({
		exprPropDisplay: `.name`,
		name: 'il_sys_column_order_name',
		owner: 'app_sys',
		table: 'SysColumn'
	})
	await addDataObjFieldItems({
		exprPropDisplay: `.name`,
		name: 'il_sys_data_obj_action_field_order_name',
		owner: 'app_sys',
		table: 'SysDataObjActionField'
	})
	await addDataObjFieldItems({
		exprPropDisplay: `.name`,
		name: 'il_sys_data_obj_action_field_group_order_name',
		owner: 'app_sys',
		table: 'SysDataObjActionFieldGroup'
	})

	await addDataObjFieldItems({
		exprPropDisplay: '.column.name',
		exprFilter: `.id IN (SELECT sys_core::SysDataObj FILTER .id = <tree,uuid,SysDataObj.id>).columns.id`,
		name: 'il_sys_data_obj_columns_order_name',
		owner: 'app_sys',
		table: 'SysDataObjColumn'
	})

	await addDataObjFieldItems({
		exprPropDisplay: `.name`,
		name: 'il_sys_data_obj_field_embed_list_config_order_name',
		owner: 'app_sys',
		table: 'SysDataObjFieldEmbedListConfig'
	})
	await addDataObjFieldItems({
		exprPropDisplay: `.name`,
		name: 'il_sys_data_obj_field_embed_list_edit_order_name',
		owner: 'app_sys',
		table: 'SysDataObjFieldEmbedListEdit'
	})
	await addDataObjFieldItems({
		exprPropDisplay: `.name`,
		name: 'il_sys_data_obj_field_embed_list_select_order_name',
		owner: 'app_sys',
		table: 'SysDataObjFieldEmbedListSelect'
	})
	await addDataObjFieldItems({
		exprPropDisplay: `.name`,
		name: 'il_sys_data_obj_field_list_items_order_name',
		owner: 'app_sys',
		table: 'SysDataObjFieldListItems'
	})
	await addDataObjFieldItems({
		exprPropDisplay: '.name',
		name: 'il_sys_data_obj_order_name',
		owner: 'app_sys',
		table: 'SysDataObj'
	})
	await addDataObjFieldItems({
		exprPropDisplay: '.name',
		exprFilter: `.id IN (SELECT (SELECT sys_migr::SysMigrTargetTable FILTER .id = <tree,uuid,SysMigrTargetTable.id>).table.columns.id)
		AND .id NOT IN (SELECT (SELECT sys_migr::SysMigrTargetTable FILTER .id = <tree,uuid,SysMigrTargetTable.id>).columns.column.id)`,
		name: 'il_sys_migr_target_table_column_order_name',
		owner: 'app_sys',
		table: 'SysColumn'
	})
	await addDataObjFieldItems({
		exprPropDisplay: '.name',
		name: 'il_sys_node_obj_order_name',
		owner: 'app_sys',
		table: 'SysNodeObj'
	})
	await addDataObjFieldItems({
		exprPropDisplay: '.name',
		name: 'il_sys_org_order_name',
		owner: 'app_sys',
		table: 'SysOrg'
	})
	await addDataObjFieldItems({
		exprPropDisplay: '.name',
		exprFilter: `.id IN (SELECT (SELECT sys_rep::SysRep FILTER .id = <tree,uuid,SysRep.id>).tables.table.columns.id)
		AND .id NOT IN (SELECT (SELECT sys_rep::SysRep FILTER .id = <tree,uuid,SysRep.id>).elements.column.id)`,
		name: 'il_sys_rep_el_table_column_order_name',
		owner: 'app_sys',
		table: 'SysColumn'
	})
	await addDataObjFieldItems({
		exprPropDisplay: '.name',
		name: 'il_sys_resource_order_name',
		owner: 'app_sys',
		table: 'SysResource'
	})
	await addDataObjFieldItems({
		exprPropDisplay: '.name',
		exprFilter: '.roles.name = <parms,str,fieldListItemsParmName>',
		name: 'il_sys_role_org_by_codeName',
		owner: 'app_sys',
		table: 'SysOrg'
	})
	await addDataObjFieldItems({
		exprPropDisplay: '.person.fullName',
		exprFilter: '.roles.name = <parms,str,fieldListItemsParmName>',
		exprSort: 'str_lower(.person.lastName) then str_lower(.person.firstName)',
		name: 'il_sys_role_staff_by_codeName',
		owner: 'app_sys',
		table: 'SysStaff'
	})
	await addDataObjFieldItems({
		exprPropDisplay: '.name',
		name: 'il_sys_table_order_name',
		owner: 'app_sys',
		table: 'SysTable'
	})
	await addDataObjFieldItems({
		exprPropDisplay: '.person.fullName',
		name: 'il_sys_user',
		owner: 'app_sys',
		table: 'SysUser'
	})

	await addDataObjFieldItems({
		exprPropDisplay: '.name',
		exprFilter: `sys_core::SysObj IN (SELECT 
			(sys_core::SysObj[is sys_core::SysOrg]) UNION
			(sys_core::SysObj[is sys_core::SysResource]) UNION
			(sys_core::SysObj[is sys_user::SysWidget]) UNION
			(SELECT (sys_core::SysObj[is sys_core::SysNodeObj]) FILTER .codeNodeType.name = 'program')
			)`,
		name: 'il_sys_user_type_resource',
		owner: 'app_sys',
		table: 'SysObj'
	})
}
