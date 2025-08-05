import { InitDb } from '$server/dbGel/init/types.init'
import { EvalExprCustomComposite, NodeType } from '$utils/types'
import { ExprTokenItemParmModifier } from '$utils/utils.evalParserDb'

// backlink
// .##csfCohort[is app_cm::CmCsfCohortAttd].cohortAttd.id`,

export function initPreDataObjFieldItem(init: InitDb) {
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter: `.isGlobalResource = true UNION .ownerSys.id = <tree,uuid,SysSystem.id>`,
		name: 'il_sys_app_header_order_name',
		ownerSys: 'sys_system',
		table: 'SysAppHeader'
	})

	/* sys-code */
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter: '.codeType.name = <parms,str,itemsParmValue>',
		exprSort: '.order',
		name: 'il_sys_code_order_index_by_codeType_name',
		ownerSys: 'sys_system',
		table: 'SysCode'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter: '.codeType.name = <parms,str,itemsParmValue>',
		name: 'il_sys_code_order_name_by_codeType_name',
		ownerSys: 'sys_system',
		table: 'SysCode'
	})

	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'header', 'Header', '.header', true, 0]],
		exprFilter: '.codeType.name = <parms,str,itemsParmValue>',
		exprSort: '.order',
		name: 'il_sys_code_header_order_index_by_codeType_name',
		ownerSys: 'sys_system',
		table: 'SysCode'
	})

	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter:
			'.codeType.name = <parms,str,itemsParmValue> AND .ownerSys.id = <parms,uuid,systemIdQuerySource>',
		exprSort: '.order',
		name: 'il_sys_code_order_index_by_codeType_name_system',
		ownerSys: 'sys_system',
		table: 'SysCode'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter:
			'.codeType.name = <parms,str,itemsParmValue> AND .ownerSys.id = <parms,uuid,systemIdQuerySource>',
		name: 'il_sys_code_order_name_by_codeType_name_system',
		ownerSys: 'sys_system',
		table: 'SysCode'
	})

	/* code family - system */
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter:
			'<parms,str,itemsParmValue> IN .codeTypeFamily.name AND .ownerSys.id = <parms,uuid,systemIdQuerySource>',
		exprSort: '.order',
		name: 'il_sys_code_family_group_order_index_by_codeType_name_system',
		ownerSys: 'sys_system',
		table: 'SysCode'
	})

	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'header', 'Header', '.header', true, 0]],
		exprFilter: `.id IN (SELECT sys_core::SysCode FILTER .id = <parms,uuid,itemsParmValue>).codeTypeFamily.id`,
		name: 'il_sys_code_family_by_code',
		ownerSys: 'sys_system',
		table: 'SysCodeType'
	})

	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter:
			'.codeTypeFamily.parent.name = <parms,str,itemsParmValue> AND .ownerSys.id = <parms,uuid,systemIdQuerySource>',
		name: 'il_sys_code_family_order_name_by_codeType_name_system',
		ownerSys: 'sys_system',
		table: 'SysCode'
	})

	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter: '.codeType.id = <tree,uuid,SysCodeType.id>',
		name: 'il_sys_code_order_name_by_codeType_id',
		ownerSys: 'sys_system',
		table: 'SysCode'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter:
			'.ownerSys.id = <tree,uuid,SysSystem.id> AND .codeType.id = <parms,uuid,itemsParmValue>',
		exprFilterExcept: `SELECT sys_core::SysCode FILTER .id = <tree,uuid,[${ExprTokenItemParmModifier.optional}]SysCode.id>`,
		name: 'il_sys_code_parent',
		ownerSys: 'sys_system',
		table: 'SysCode'
	})

	/* code action */
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter: `.isGlobalResource = true UNION .ownerSys.id = <tree,uuid,SysSystem.id>`,
		name: 'il_sys_codeAction_order_name',
		ownerSys: 'sys_system',
		table: 'SysCodeAction'
	})

	/* code type */
	init.addTrans('sysDataObjFieldListItems', {
		exprFilter:
			'.id = (SELECT sys_core::SysSystem FILTER .id = <tree,uuid,SysSystem.id>).typesCodeType.id',
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_codeType_typesCodeType',
		ownerSys: 'sys_system',
		table: 'SysCodeType'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_codeType_order_name',
		ownerSys: 'sys_system',
		table: 'SysCodeType'
	})

	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_column_order_name',
		ownerSys: 'sys_system',
		table: 'SysColumn'
	})

	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_data_obj_action_group_order_name',
		ownerSys: 'sys_system',
		table: 'SysDataObjActionGroup'
	})

	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, '_column', 'Column', '.column.name', true, 0]],
		exprFilter: `.id IN (SELECT sys_core::SysDataObj FILTER .id = <tree,uuid,SysDataObj.id>).columns.id`,
		name: 'il_sys_data_obj_columns_order_name',
		ownerSys: 'sys_system',
		table: 'SysDataObjColumn'
	})

	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_data_obj_field_embed_list_config_order_name',
		ownerSys: 'sys_system',
		table: 'SysDataObjFieldEmbedListConfig'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_data_obj_field_embed_list_edit_order_name',
		ownerSys: 'sys_system',
		table: 'SysDataObjFieldEmbedListEdit'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_data_obj_field_embed_list_select_order_name',
		ownerSys: 'sys_system',
		table: 'SysDataObjFieldEmbedListSelect'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_data_obj_field_list_items_order_name',
		ownerSys: 'sys_system',
		table: 'SysDataObjFieldListItems'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprFilter: '.codeDataObjType.name = <parms,str,itemsParmValue> ',
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_data_obj_by_type',
		ownerSys: 'sys_system',
		table: 'SysDataObj'
	})

	init.addTrans('sysDataObjFieldListItems', {
		exprFilter: `.ownerSys.id = <tree,uuid,SysSystem.id>`,
		name: 'il_sys_elig_sys',
		ownerSys: 'sys_system',
		props: [[0, 'header', 'Header', '.header ?? .name', true, 0]],
		table: 'SysEligibility'
	})

	init.addTrans('sysDataObjFieldListItems', {
		props: [
			[
				0,
				'recipient',
				'Recipient',
				'[IS sys_user::SysUser].person.fullName ?? [IS sys_core::SysObjAttr].header ?? [IS sys_core::SysObjAttr].name',
				true,
				0
			]
		],
		exprFilter: `.id IN <attrsAction,oaa_sys_msg_send,object;user>`,
		name: 'il_sys_msg_recipients_system',
		ownerSys: 'sys_system',
		table: 'ObjRoot'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter: `.id IN ((SELECT sys_migr::SysMigrTargetTable FILTER .id = <tree,uuid,SysMigrTargetTable.id>).table.columns.id)`,
		exprFilterExcept: `.id IN ((SELECT sys_migr::SysMigrTargetTable FILTER .id = <tree,uuid,SysMigrTargetTable.id>).columns.column.id)`,
		name: 'il_sys_migr_target_table_column_order_name',
		ownerSys: 'sys_system',
		table: 'SysColumn'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprFilter: '.codeNodeType.name = <parms,str,itemsParmValue> ',
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_node_obj_by_node_type',
		ownerSys: 'sys_system',
		table: 'SysNodeObj'
	})

	/* sys-objAttr */
	init.addTrans('sysDataObjFieldListItems', {
		props: [
			[0, '_type', 'Type', '.codeAttrType.header', true, 0],
			[1, 'header', 'Header', '.header', true, 1]
		],
		displayIdSeparator: '-',
		exprFilter: `<${EvalExprCustomComposite.evalCustomCompositeObjAttrMulti}>`,
		name: 'il_sys_obj_attr_type_multi',
		ownerSys: 'sys_system',
		table: 'SysObjAttr'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'header', 'Header', '.header', true, 0]],
		exprFilter: `<${EvalExprCustomComposite.evalCustomCompositeObjAttrSingle}>`,
		name: 'il_sys_obj_attr_type_single',
		ownerSys: 'sys_system',
		table: 'SysObjAttr'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'header', 'Header', '.header', true, 0]],
		exprFilter: `<${EvalExprCustomComposite.evalCustomCompositeObjAttrSingle}> AND .name like 'moedStaff%'`,
		name: 'il_sys_obj_attr_type_single_msg_receive',
		ownerSys: 'sys_system',
		table: 'SysObjAttr'
	})

	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_org',
		ownerSys: 'sys_system',
		table: 'SysOrg'
	})

	init.addTrans('sysDataObjFieldListItems', {
		exprFilter:
			'.id IN (SELECT sys_core::SysSystem FILTER .id = <user,uuidList,systemIds>).ownerOrg.id',
		props: [[0, 'org', 'Organization', '.header', true, 0]],
		name: 'il_sys_organization_by_user',
		ownerSys: 'sys_system',
		table: 'SysOrg'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Organization', '.name', true, 0]],
		exprFilter: '.roles.name = <parms,str,itemsParmValue>',
		name: 'il_sys_role_org_by_codeName',
		ownerSys: 'sys_system',
		table: 'SysOrg'
	})
	init.addTrans('sysDataObjFieldListItems', {
		displayIdSeparator: ' >> ',
		name: 'il_sys_system_all',
		ownerSys: 'sys_system',
		props: [
			[0, 'org', 'Organization', '.ownerOrg.header', true, 0],
			[1, 'systemAppName', 'System', '.appName', true, 1]
		],
		table: 'SysSystem'
	})
	init.addTrans('sysDataObjFieldListItems', {
		displayIdSeparator: ' >> ',
		exprFilter: '.ownerOrg.id = <tree,uuid,SysOrg.id>',
		name: 'il_sys_system_by_org',
		ownerSys: 'sys_system',
		props: [
			[0, 'org', 'Organization', '.ownerOrg.header', true, 0],
			[1, 'systemAppName', 'System', '.appName', true, 1]
		],
		table: 'SysSystem'
	})
	init.addTrans('sysDataObjFieldListItems', {
		displayIdSeparator: ' >> ',
		exprFilter: '.id IN <user,uuidList,systemIds>',
		name: 'il_sys_system_by_user',
		ownerSys: 'sys_system',
		props: [
			[0, 'org', 'Organization', '.ownerOrg.header', true, 0],
			[1, 'systemAppName', 'System', '.appName', true, 1]
		],
		table: 'SysSystem'
	})
	init.addTrans('sysDataObjFieldListItems', {
		displayIdSeparator: ' >> ',
		name: 'il_sys_table_order_name',
		ownerSys: 'sys_system',
		props: [
			[0, 'org', 'System', '.ownerSys.header ?? .ownerSys.name', true, 0],
			[1, 'table', 'Table', '.header ?? .name', true, 1]
		],
		table: 'SysTable'
	})
	init.addTrans('sysDataObjFieldListItems', {
		displayIdSeparator: ' >> ',
		name: 'il_sys_user',
		ownerSys: 'sys_system',
		props: [
			[0, '_firstName', 'First Name', '.person.firstName', true, 1],
			[1, '_lastName', 'Last Name', '.person.lastName', true, 0],
			[2, '_name', 'Name', `'(' ++ .name ++ ')'`, true, undefined]
		],
		table: 'SysUser'
	})
	init.addTrans('sysDataObjFieldListItems', {
		displayIdSeparator: ' >> ',
		exprFilter: '.userTypes.tags.name = <parms,str,itemsParmValue>',
		name: 'il_sys_user_by_tag_type',
		ownerSys: 'sys_system',
		props: [
			[0, '_firstName', 'First Name', '.person.firstName', true, 1],
			[1, '_lastName', 'Last Name', '.person.lastName', true, 0],
			[2, '_name', 'Name', `'(' ++ .name ++ ')'`, true, undefined]
		],
		table: 'SysUser'
	})

	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_user_action_order_name',
		ownerSys: 'sys_system',
		table: 'SysUserAction'
	})

	init.addTrans('sysDataObjFieldListItems', {
		exprFilter: `.isGlobalResource = true UNION .ownerSys.id = <tree,uuid,SysSystem.id>`,
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_user_action',
		ownerSys: 'sys_system',
		table: 'SysUserAction'
	})

	init.addTrans('sysDataObjFieldListItems', {
		exprFilter: `.id IN (<tree,uuid,SysOrg.id> UNION (SELECT DETACHED sys_user::SysUser FILTER .id = <tree,uuid,SysUser.id,undefined>).org.id)`,
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_user_org',
		ownerSys: 'sys_system',
		table: 'SysOrg'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprFilter: `.id IN (SELECT DETACHED sys_user::SysUser FILTER .id = <tree,uuid,SysUser.id,undefined>).systems.id`,
		props: [[0, 'name', 'Name', '.name', true, 0]],
		name: 'il_sys_user_system',
		ownerSys: 'sys_system',
		table: 'SysSystem'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter: `sys_core::SysObj IN (SELECT 
			(sys_core::SysObj[is sys_core::SysOrg]) UNION
			(SELECT (sys_core::SysObj[is sys_core::SysNodeObj]) FILTER .codeNodeType.name = '${NodeType.nodeApp}')
			)`,
		name: 'il_sys_user_type_resource',
		ownerSys: 'sys_system',
		table: 'SysObj'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'userType', 'User Type', '.header', true, 0]],
		exprFilter: `.isSelfSignup = true`,
		name: 'il_sys_user_type_self_signup',
		ownerSys: 'sys_system',
		table: 'SysUserType'
	})

	/* application */
	init.addTrans('sysDataObjFieldListItems', {
		exprFilter: `.cohortId = <parms,uuid,itemsParmValue>`,
		props: [[0, '_date', 'Date', 'std::to_str(<cal::local_date>.date)', true, 0]],
		name: 'il_cm_cohort_attd_cohort_ic',
		ownerSys: 'sys_app_cm',
		table: 'CmCohortAttd'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprFilter: `.cohortId = ((SELECT app_cm::CmCsfCohort FILTER .id = <tree,uuid,CmCsfCohort.id>).cohort.id)`,
		exprFilterExcept: `SELECT (SELECT app_cm::CmCsfCohortAttd FILTER .csfCohort.id = <tree,uuid,CmCsfCohort.id>).cohortAttd`,
		props: [[0, '_date', 'Date', 'std::to_str(<cal::local_date>.date)', true, 0]],
		name: 'il_cm_cohort_attd_cohort_tree',
		ownerSys: 'sys_app_cm',
		table: 'CmCohortAttd'
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
		exprFilter: `.ownerSys.id = <parms,uuid,systemIdQuerySource>`,
		name: 'il_cm_cohort_long_by_name',
		ownerSys: 'sys_app_cm',
		table: 'CmCohort'
	})
	init.addTrans('sysDataObjFieldListItems', {
		props: [[0, 'name', 'Name', '.name', true, 0]],
		exprFilter: `(.csf.id IN <tree,uuidList,CmClientServiceFlow.id> AND .codeStatus = (SELECT sys_core::getCode('ct_cm_sf_eligibility_status', <parms,str,status>))).cohort.course)`,
		name: 'il_cm_course_by_csfId_status',
		ownerSys: 'sys_app_cm',
		table: 'CmCsfCohort'
	})

	init.addTrans('sysDataObjFieldListItems', {
		exprFilter: `.ownerSys.id = <parms,uuid,systemIdQuerySource>`,
		name: 'il_cm_program',
		ownerSys: 'sys_app_cm',
		props: [[0, 'header', 'Header', '.header ?? .name', true, 0]],
		table: 'CmProgram'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprFilter: `.ownerSys.id = <parms,uuid,systemIdQuerySource>`,
		exprFilterExcept: `SELECT (SELECT app_cm::CmCsfEligibility FILTER .csf.id = <tree,uuid,CmClientServiceFlow.id>).cmProgram`,
		name: 'il_cm_program_eligibility',
		ownerSys: 'sys_app_cm',
		props: [[0, 'header', 'Header', '.header ?? .name', true, 0]],
		table: 'CmProgram'
	})
	init.addTrans('sysDataObjFieldListItems', {
		exprFilter: `.ownerSys.id = <parms,uuid,systemIdQuerySource>`,
		name: 'il_cm_site',
		ownerSys: 'sys_app_cm',
		props: [[0, 'header', 'Header', '.header ?? .name', true, 0]],
		table: 'CmSite'
	})
}
