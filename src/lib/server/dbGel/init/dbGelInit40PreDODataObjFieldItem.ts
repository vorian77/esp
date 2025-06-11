import { InitDb } from '$server/dbGel/init/types.init'

// backlink
// .##csfCohort[is app_cm::CmCsfCohortAttd].cohortAttd.id`,

export function initPreDataObjFieldItem(init: InitDb) {
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter: `.owner.id in <user,uuidlist,systemIds> UNION .isGlobalResource = true`,
		name: 'il_sys_app_header_order_name',
		owner: 'sys_system',
		table: 'SysAppHeader'
	})

	/* sys-code */
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter: '.codeType.name = <parms,str,itemsParmValue>',
		exprSort: '.order',
		name: 'il_sys_code_order_index_by_codeType_name',
		owner: 'sys_system',
		table: 'SysCode'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter: '.codeType.name = <parms,str,itemsParmValue>',
		name: 'il_sys_code_order_name_by_codeType_name',
		owner: 'sys_system',
		table: 'SysCode'
	})

	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'header', 'Header', '.header', true, 0]],
		exprFilter: '.codeType.name = <parms,str,itemsParmValue>',
		exprSort: '.order',
		name: 'il_sys_code_header_order_index_by_codeType_name',
		owner: 'sys_system',
		table: 'SysCode'
	})

	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter:
			'.codeType.name = <parms,str,itemsParmValue> AND .owner.id = <parms,uuid,queryOwnerSys>',
		exprSort: '.order',
		name: 'il_sys_code_order_index_by_codeType_name_system',
		owner: 'sys_system',
		table: 'SysCode'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter:
			'.codeType.name = <parms,str,itemsParmValue> AND .owner.id = <parms,uuid,queryOwnerSys>',
		name: 'il_sys_code_order_name_by_codeType_name_system',
		owner: 'sys_system',
		table: 'SysCode'
	})

	/* code family - system */
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter:
			'<parms,str,itemsParmValue> IN .codeTypeFamily.name AND .owner.id = <parms,uuid,queryOwnerSys>',
		exprSort: '.order',
		name: 'il_sys_code_family_group_order_index_by_codeType_name_system',
		owner: 'sys_system',
		table: 'SysCode'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter:
			'<parms,str,itemsParmValue> IN .codeTypeFamily.name AND .owner.id = <parms,uuid,queryOwnerSys>',
		name: 'il_sys_code_family_group_order_name_by_codeType_name_system',
		owner: 'sys_system',
		table: 'SysCode'
	})

	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter:
			'.codeTypeFamily.parent.name = <parms,str,itemsParmValue> AND .owner.id = <parms,uuid,queryOwnerSys>',
		exprSort: '.order',
		name: 'il_sys_code_family_order_index_by_codeType_name_system',
		owner: 'sys_system',
		table: 'SysCode'
	})

	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter:
			'.codeTypeFamily.parent.name = <parms,str,itemsParmValue> AND .owner.id = <parms,uuid,queryOwnerSys>',
		name: 'il_sys_code_family_order_name_by_codeType_name_system',
		owner: 'sys_system',
		table: 'SysCode'
	})

	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter: '.codeType.id = <tree,uuid,SysCodeType.id>',
		name: 'il_sys_code_order_name_by_codeType_id',
		owner: 'sys_system',
		table: 'SysCode'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter:
			'.owner.id = <tree,uuid,SysSystem.id> AND .codeType.id = <parms,uuid,itemsParmValue>',
		name: 'il_sys_code_parent',
		owner: 'sys_system',
		table: 'SysCode'
	})

	/* code action */
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter: '.codeType.parent.name = <parms,str,itemsParmValue>',
		name: 'il_sys_codeAction_order_name_by_codeType_name',
		owner: 'sys_system',
		table: 'SysCodeAction'
	})

	/* code type */
	init.addTrans('sysDataObjFieldListItems', {
		exprFilter:
			'.id = (SELECT sys_core::SysSystem FILTER .id = <tree,uuid,SysSystem.id>).typesCodeType.id',
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_codeType_meta',
		owner: 'sys_system',
		table: 'SysCodeType'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_codeType_order_name',
		owner: 'sys_system',
		table: 'SysCodeType'
	})

	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_column_order_name',
		owner: 'sys_system',
		table: 'SysColumn'
	})

	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_data_obj_action_group_order_name',
		owner: 'sys_system',
		table: 'SysDataObjActionGroup'
	})

	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, '_column', 'Column', '.column.name', true, 0]],
		exprFilter: `.id IN (SELECT sys_core::SysDataObj FILTER .id = <tree,uuid,SysDataObj.id>).columns.id`,
		name: 'il_sys_data_obj_columns_order_name',
		owner: 'sys_system',
		table: 'SysDataObjColumn'
	})

	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_data_obj_field_embed_list_config_order_name',
		owner: 'sys_system',
		table: 'SysDataObjFieldEmbedListConfig'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_data_obj_field_embed_list_edit_order_name',
		owner: 'sys_system',
		table: 'SysDataObjFieldEmbedListEdit'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_data_obj_field_embed_list_select_order_name',
		owner: 'sys_system',
		table: 'SysDataObjFieldEmbedListSelect'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_data_obj_field_list_items_order_name',
		owner: 'sys_system',
		table: 'SysDataObjFieldListItems'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprFilter: '.codeDataObjType.name = <parms,str,itemsParmValue> ',
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_data_obj_by_type',
		owner: 'sys_system',
		table: 'SysDataObj'
	})

	init.addTrans('sysDataObjFieldListItems', {
		props: [
			[0, 'objectType', 'Object Type', '.codeAttrType.header ?? .codeAttrType.name', true, 0],
			[
				1,
				'object',
				'Object',
				'[IS sys_core::ObjRootCore].header ?? [IS sys_user::SysUser].person.fullName ?? .name',
				true,
				1
			]
		],
		exprFilter: `.id IN <attrsAction,oaa_sys_msg_send,object;user>`,
		name: 'il_sys_msg_recipients_system',
		owner: 'sys_system',
		table: 'SysObjAttr'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter: `.id IN (SELECT (SELECT sys_migr::SysMigrTargetTable FILTER .id = <tree,uuid,SysMigrTargetTable.id>).table.columns.id)
		AND .id NOT IN (SELECT (SELECT sys_migr::SysMigrTargetTable FILTER .id = <tree,uuid,SysMigrTargetTable.id>).columns.column.id)`,
		name: 'il_sys_migr_target_table_column_order_name',
		owner: 'sys_system',
		table: 'SysColumn'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprFilter: '.codeNavType.name = <parms,str,itemsParmValue> ',
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_node_obj_by_nav_type',
		owner: 'sys_system',
		table: 'SysNodeObj'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_node_obj_order_name',
		owner: 'sys_system',
		table: 'SysNodeObj'
	})

	init.addTrans('sysDataObjFieldListItems', {
		exprFilter:
			'.id IN (SELECT sys_core::SysSystem FILTER .id = <parms,uuid,queryOwnerSys>).nodesConfig.id',
		props: [
			[0, '_codeAttrTypeName', 'Attribute Type', '.codeAttrType.header', true, 0],
			[1, '_codeAttrTypeId', 'Attribute Type Id', '.codeAttrType.id', false, null],
			[2, '_nodeObjId', 'Node Object Id', '.nodeObj.id', false, null]
		],
		name: 'il_sys_node_obj_config_by_system',
		owner: 'sys_system',
		table: 'SysNodeObjConfig'
	})

	/* sys-objAttr */
	init.addTrans('sysDataObjFieldListItems', {
		props: [
			[0, '_type', 'Type', '.codeAttrType.header', true, 0],
			[1, 'header', 'Header', '.header', true, 1]
		],
		displayIdSeparator: '-',
		exprFilter: `<evalObjAttrMulti>`,
		name: 'il_sys_obj_attr_type_multi',
		owner: 'sys_system',
		table: 'SysObjAttr'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'header', 'Header', '.header', true, 0]],
		exprFilter: `<evalObjAttrSingle>`,
		name: 'il_sys_obj_attr_type_single',
		owner: 'sys_system',
		table: 'SysObjAttr'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'header', 'Header', '.header', true, 0]],
		exprFilter: `<evalObjAttrSingle> AND .name like 'moedStaff%'`,
		name: 'il_sys_obj_attr_type_single_msg_receive',
		owner: 'sys_system',
		table: 'SysObjAttr'
	})

	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_org',
		owner: 'sys_system',
		table: 'SysOrg'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter: `.id IN (SELECT (SELECT sys_rep::SysRep FILTER .id = <tree,uuid,SysRep.id>).tables.table.columns.id)
		AND .id NOT IN (SELECT (SELECT sys_rep::SysRep FILTER .id = <tree,uuid,SysRep.id>).elements.column.id)`,
		name: 'il_sys_rep_el_table_column_order_name',
		owner: 'sys_system',
		table: 'SysColumn'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter: '.roles.name = <parms,str,itemsParmValue>',
		name: 'il_sys_role_org_by_codeName',
		owner: 'sys_system',
		table: 'SysOrg'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_system',
		owner: 'sys_system',
		table: 'SysSystem'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprFilter: '.id IN <user,uuidlist,systemIds>',
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_system_by_user',
		owner: 'sys_system',
		table: 'SysSystem'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_table_order_name',
		owner: 'sys_system',
		table: 'SysTable'
	})

	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter: `.id IN ((SELECT sys_core::SysObj [IS sys_core::SysNodeObj] FILTER .codeNodeType.name = 'taskTarget') UNION (SELECT sys_core::SysObj [IS sys_core::SysDataObj] FILTER .codeDataObjType.name = 'taskTarget')).id`,
		name: 'il_sys_task_obj',
		owner: 'sys_system',
		table: 'SysObj'
	})

	init.addTrans('sysDataObjFieldListItems', {
		props: [
			[0, '_firstName', 'First Name', '.person.firstName', true, 1],
			[1, '_lastName', 'Last Name', '.person.lastName', true, 0],
			[2, '_name', 'Name', `'(' ++ .name ++ ')'`, true, undefined]
		],
		name: 'il_sys_user',
		owner: 'sys_system',
		table: 'SysUser'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [
			[0, '_firstName', 'First Name', '.person.firstName', true, 1],
			[1, '_lastName', 'Last Name', '.person.lastName', true, 0],
			[2, '_name', 'Name', `'(' ++ .name ++ ')'`, true, undefined]
		],
		exprFilter: '.userTypes.tags.name = <parms,str,itemsParmValue>',
		name: 'il_sys_user_by_tag_type',
		owner: 'sys_system',
		table: 'SysUser'
	})

	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_user_action_order_name',
		owner: 'sys_system',
		table: 'SysUserAction'
	})

	init.addTrans('sysDataObjFieldListItems', {
		exprFilter: `.owner.id in <user,uuidlist,systemIds> UNION .isGlobalResource = true`,
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_user_action',
		owner: 'sys_system',
		table: 'SysUserAction'
	})

	init.addTrans('sysDataObjFieldListItems', {
		exprFilter: `.id IN (<tree,uuid,SysOrg.id> UNION (SELECT DETACHED sys_user::SysUser FILTER .id = <tree,uuid,SysUser.id,undefined>).orgs.id)`,
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_user_org',
		owner: 'sys_system',
		table: 'SysOrg'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprFilter: `.id IN (SELECT DETACHED sys_user::SysUser FILTER .id = <tree,uuid,SysUser.id,undefined>).systems.id`,
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_user_system',
		owner: 'sys_system',
		table: 'SysSystem'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter: `sys_core::SysObj IN (SELECT 
			(sys_core::SysObj[is sys_core::SysOrg]) UNION
			(SELECT (sys_core::SysObj[is sys_core::SysNodeObj]) FILTER .codeNodeType.name = 'program')
			)`,
		name: 'il_sys_user_type_resource',
		owner: 'sys_system',
		table: 'SysObj'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'userType', 'User Type', '.header', true, 0]],
		exprFilter: `.isSelfSignup = true`,
		name: 'il_sys_user_type_self_signup',
		owner: 'sys_system',
		table: 'SysUserType'
	})

	/* application */
	init.addTrans('sysDataObjFieldListItems', {
		exprFilter: `.cohortId = <parms,uuid,itemsParmValue>`,
		props: [[0, '_date', 'Date', 'std::to_str(<cal::local_date>.date)', true, 0]],
		name: 'il_cm_cohort_attd_cohort_ic',
		owner: 'sys_client_atlantic_impact',
		table: 'CmCohortAttd'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprFilter: `.cohortId = (SELECT app_cm::CmCsfCohort FILTER .id = <tree,uuid,CmCsfCohort.id>).cohort.id AND .id NOT IN (SELECT app_cm::CmCsfCohortAttd FILTER .csfCohort.id = <tree,uuid,CmCsfCohort.id>).cohortAttd.id`,
		props: [[0, '_date', 'Date', 'std::to_str(<cal::local_date>.date)', true, 0]],
		name: 'il_cm_cohort_attd_cohort_tree',
		owner: 'sys_client_atlantic_impact',
		table: 'CmCohortAttd'
	})

	init.addTrans('sysDataObjFieldListItems', {
		exprFilter: `.owner.id = <parms,uuid,queryOwnerSys>`,
		props: [[0, 'header', 'Header', '.header', true, 0]],
		name: 'il_cm_program',
		owner: 'sys_client_atlantic_impact',
		table: 'CmProgram'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [
			[
				0,
				'cohort',
				'Cohort',
				`.course.name ++ ' (' ++ .name ++ ')' ++ ' (' ++ std::to_str(<cal::local_date>.dateStart) ++ ')'`,
				true,
				0
			]
		],
		exprFilter: `.owner.id = <parms,uuid,queryOwnerSys>`,
		name: 'il_cm_cohort_long_by_name',
		owner: 'sys_client_atlantic_impact',
		table: 'CmCohort'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter: `(.csf.id IN <tree,uuidList,CmClientServiceFlow.id> AND .codeStatus = (SELECT sys_core::getCode('ct_cm_sf_eligibility_status', <parms,str,status>))).cohort.course)`,
		name: 'il_cm_course_by_csfId_status',
		owner: 'sys_client_atlantic_impact',
		table: 'CmCsfCohort'
	})
}
