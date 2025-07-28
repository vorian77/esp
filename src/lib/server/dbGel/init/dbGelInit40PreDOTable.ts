import { InitDb } from '$server/dbGel/init/types.init'

export function initPreTable(init: InitDb) {
	init.addTrans('tablesBulk', [
		// default
		['sys_system', 'default', 'SysPerson', false],
		['sys_system', 'default', 'SysError', false],

		// sys_db
		['sys_system', 'sys_db', 'SysColumn', true],
		['sys_system', 'sys_db', 'SysTable', true],

		// sys_core
		['sys_system', 'sys_core', 'ObjRoot', false],
		['sys_system', 'sys_core', 'SysCode', true],
		['sys_system', 'sys_core', 'SysCodeAction', true],
		['sys_system', 'sys_core', 'SysCodeType', true],
		['sys_system', 'sys_core', 'SysDataObj', true],
		['sys_system', 'sys_core', 'SysDataObjAction', true],
		['sys_system', 'sys_core', 'SysDataObjActionGroup', true],
		['sys_system', 'sys_core', 'SysDataObjColumn', true],
		['sys_system', 'sys_core', 'SysDataObjColumnItemChange', true],
		['sys_system', 'sys_core', 'SysDataObjColumnLink', true],
		['sys_system', 'sys_core', 'SysDataObjFieldEmbedListConfig', true],
		['sys_system', 'sys_core', 'SysDataObjFieldEmbedListEdit', true],
		['sys_system', 'sys_core', 'SysDataObjFieldEmbedListSelect', true],
		['sys_system', 'sys_core', 'SysDataObjFieldListItems', true],
		['sys_system', 'sys_core', 'SysDataObjFieldListItemsProp', false],
		['sys_system', 'sys_core', 'SysDataObjFieldLink', true],
		['sys_system', 'sys_core', 'SysDataObjFieldLinkJoin', true],
		['sys_system', 'sys_core', 'SysDataObjQueryRider', true],
		['sys_system', 'sys_core', 'SysDataObjTable', true],
		['sys_system', 'sys_core', 'SysEligibility', true],
		['sys_system', 'sys_core', 'SysEligibilityNode', true],
		['sys_system', 'sys_core', 'SysMsg', true],
		['sys_system', 'sys_core', 'SysNodeObj', true],
		['sys_system', 'sys_core', 'SysNodeObjAction', false],
		['sys_system', 'sys_core', 'SysNodeObjChild', false],
		['sys_system', 'sys_core', 'SysNodeObjConfig', false],
		['sys_system', 'sys_core', 'SysObj', true],
		['sys_system', 'sys_core', 'SysObjAttr', true],
		['sys_system', 'sys_core', 'SysObjAttrAccess', true],
		['sys_system', 'sys_core', 'SysObjAttrAction', true],
		['sys_system', 'sys_core', 'SysObjAttrEnt', true],
		['sys_system', 'sys_core', 'SysObjAttrExpr', true],
		['sys_system', 'sys_core', 'SysObjAttrVirtual', true],
		['sys_system', 'sys_core', 'SysObjNote', true],
		['sys_system', 'sys_core', 'SysObjOrg', true],
		['sys_system', 'sys_core', 'SysOrg', true],
		['sys_system', 'sys_core', 'SysSystem', true],

		// sys_migr
		['sys_system', 'sys_migr', 'SysMigr', true],
		['sys_system', 'sys_migr', 'SysMigrSourceColumn', true],
		['sys_system', 'sys_migr', 'SysMigrSourceTable', true],
		['sys_system', 'sys_migr', 'SysMigrTargetColumn', true],
		['sys_system', 'sys_migr', 'SysMigrTargetTable', true],

		// sys_rep
		['sys_system', 'sys_rep', 'SysAnalytic', true],
		['sys_system', 'sys_rep', 'SysAnalyticParm', true],
		['sys_system', 'sys_rep', 'SysAnalyticStatus', true],
		['sys_system', 'sys_rep', 'SysRep', true],
		['sys_system', 'sys_rep', 'SysRepEl', true],
		['sys_system', 'sys_rep', 'SysRepParm', true],
		['sys_system', 'sys_rep', 'SysRepUser', true],
		['sys_system', 'sys_rep', 'SysRepUserAnalytic', true],
		['sys_system', 'sys_rep', 'SysRepUserParm', true],

		// sys_user
		['sys_system', 'sys_user', 'SysApp', true],
		['sys_system', 'sys_user', 'SysAppHeader', true],
		['sys_system', 'sys_user', 'SysTask', true],
		['sys_system', 'sys_user', 'SysUser', true],
		['sys_system', 'sys_user', 'SysUserAction', true],
		['sys_system', 'sys_user', 'SysUserActionConfirm', true],
		['sys_system', 'sys_user', 'SysUserType', true],
		['sys_system', 'sys_user', 'SysUserPref', true]
	])

	init.addTrans('tablesBulk', [
		// customer resource ranager
		['sys_app_crm', 'app_crm', 'CrmClient', true]
	])

	init.addTrans('tablesBulk', [
		// Case Manager
		['sys_client_atlantic_impact', 'app_cm', 'CmClient', true],
		['sys_client_atlantic_impact', 'app_cm', 'CmClientServiceFlow', true],
		['sys_client_atlantic_impact', 'app_cm', 'CmCohort', true],
		['sys_client_atlantic_impact', 'app_cm', 'CmCohortAttd', true],
		['sys_client_atlantic_impact', 'app_cm', 'CmCohortDoc', true],
		['sys_client_atlantic_impact', 'app_cm', 'CmCourse', true],
		['sys_client_atlantic_impact', 'app_cm', 'CmCsfCohort', true],
		['sys_client_atlantic_impact', 'app_cm', 'CmCsfCohortAttd', true],
		['sys_client_atlantic_impact', 'app_cm', 'CmCsfDocument', true],
		['sys_client_atlantic_impact', 'app_cm', 'CmCsfEligibility', true],
		['sys_client_atlantic_impact', 'app_cm', 'CmCsfJobPlacement', true],
		['sys_client_atlantic_impact', 'app_cm', 'CmCsfNote', true],
		['sys_client_atlantic_impact', 'app_cm', 'CmCsfSchoolPlacement', true],
		['sys_client_atlantic_impact', 'app_cm', 'CmPartner', true],
		['sys_client_atlantic_impact', 'app_cm', 'CmProgram', true]
	])

	init.addTrans('tablesBulk', [
		// MOED
		['sys_client_baltimore_moed', 'org_client_baltimore', 'MoedDoc', true],
		['sys_client_baltimore_moed', 'org_client_baltimore', 'MoedMessage', true],
		['sys_client_baltimore_moed', 'org_client_baltimore', 'MoedPartDoc', true],
		['sys_client_baltimore_moed', 'org_client_baltimore', 'MoedPartNote', true],
		['sys_client_baltimore_moed', 'org_client_baltimore', 'MoedParticipant', true]
	])
}
