import { InitDb } from '$server/dbGel/init/types.init'

export function initPreTable(init: InitDb) {
	init.addTrans('tablesBulk', [
		// default
		['sys_system_old', 'default', 'SysPerson', false],

		// sys_db
		['sys_system_old', 'sys_db', 'SysColumn', true],
		['sys_system_old', 'sys_db', 'SysTable', true],

		// sys_core
		['sys_system_old', 'sys_core', 'SysAttr', true],
		['sys_system_old', 'sys_core', 'SysCode', true],
		['sys_system_old', 'sys_core', 'SysCodeAction', true],
		['sys_system_old', 'sys_core', 'SysCodeType', true],
		['sys_system_old', 'sys_core', 'SysDataObj', true],
		['sys_system_old', 'sys_core', 'SysDataObjAction', true],
		['sys_system_old', 'sys_core', 'SysDataObjActionGroup', true],
		['sys_system_old', 'sys_core', 'SysDataObjColumn', true],
		['sys_system_old', 'sys_core', 'SysDataObjColumnItemChange', true],
		['sys_system_old', 'sys_core', 'SysDataObjColumnItemValue', true],
		['sys_system_old', 'sys_core', 'SysDataObjColumnLink', true],
		['sys_system_old', 'sys_core', 'SysDataObjFieldEmbedListConfig', true],
		['sys_system_old', 'sys_core', 'SysDataObjFieldEmbedListEdit', true],
		['sys_system_old', 'sys_core', 'SysDataObjFieldEmbedListSelect', true],
		['sys_system_old', 'sys_core', 'SysDataObjFieldListItems', true],
		['sys_system_old', 'sys_core', 'SysDataObjFieldListItemsProp', false],
		['sys_system_old', 'sys_core', 'SysDataObjFieldLink', true],
		['sys_system_old', 'sys_core', 'SysDataObjFieldLinkJoin', true],
		['sys_system_old', 'sys_core', 'SysDataObjQueryRider', true],
		['sys_system_old', 'sys_core', 'SysDataObjTable', true],
		['sys_system_old', 'sys_core', 'SysMsg', true],
		['sys_system_old', 'sys_core', 'SysNodeObj', true],
		['sys_system_old', 'sys_core', 'SysObj', true],
		['sys_system_old', 'sys_core', 'SysObjEnt', true],
		['sys_system_old', 'sys_core', 'SysObjEntAttr', true],
		['sys_system_old', 'sys_core', 'SysObjNote', true],
		['sys_system_old', 'sys_core', 'SysOrg', true],
		['sys_system_old', 'sys_core', 'SysSystem', true],

		// sys_migr
		['sys_system_old', 'sys_migr', 'SysMigr', true],
		['sys_system_old', 'sys_migr', 'SysMigrSourceColumn', true],
		['sys_system_old', 'sys_migr', 'SysMigrSourceTable', true],
		['sys_system_old', 'sys_migr', 'SysMigrTargetColumn', true],
		['sys_system_old', 'sys_migr', 'SysMigrTargetTable', true],

		// sys_rep
		['sys_system_old', 'sys_rep', 'SysAnalytic', true],
		['sys_system_old', 'sys_rep', 'SysAnalyticParm', true],
		['sys_system_old', 'sys_rep', 'SysAnalyticStatus', true],
		['sys_system_old', 'sys_rep', 'SysRep', true],
		['sys_system_old', 'sys_rep', 'SysRepEl', true],
		['sys_system_old', 'sys_rep', 'SysRepParm', true],
		['sys_system_old', 'sys_rep', 'SysRepUser', true],
		['sys_system_old', 'sys_rep', 'SysRepUserAnalytic', true],
		['sys_system_old', 'sys_rep', 'SysRepUserParm', true],

		// sys_user
		['sys_system_old', 'sys_user', 'SysApp', true],
		['sys_system_old', 'sys_user', 'SysAppHeader', true],
		['sys_system_old', 'sys_user', 'SysTask', true],
		['sys_system_old', 'sys_user', 'SysUser', true],
		['sys_system_old', 'sys_user', 'SysUserAction', true],
		['sys_system_old', 'sys_user', 'SysUserActionConfirm', true],
		['sys_system_old', 'sys_user', 'SysUserActionShow', true],
		['sys_system_old', 'sys_user', 'SysUserType', true],
		['sys_system_old', 'sys_user', 'SysUserPref', true],
		['sys_system_old', 'sys_user', 'SysUserPrefType', true],
		['sys_system_old', 'sys_user', 'SysUserTypeResource', false],
		['sys_system_old', 'sys_user', 'SysWidget', true]
	])

	init.addTrans('tablesBulk', [
		// customer resource ranager
		['sys_app_crm', 'app_crm', 'CrmClient', true]
	])

	init.addTrans('tablesBulk', [
		// Atlantic Impact
		['sys_ai_old', 'app_cm', 'CmClient', true],
		['sys_ai_old', 'app_cm', 'CmClientServiceFlow', true],
		['sys_ai_old', 'app_cm', 'CmCohort', true],
		['sys_ai_old', 'app_cm', 'CmCohortAttd', true],
		['sys_ai_old', 'app_cm', 'CmCohortDoc', true],
		['sys_ai_old', 'app_cm', 'CmCourse', true],
		['sys_ai_old', 'app_cm', 'CmCsfCohort', true],
		['sys_ai_old', 'app_cm', 'CmCsfCohortAttd', true],
		['sys_ai_old', 'app_cm', 'CmCsfDocument', true],
		['sys_ai_old', 'app_cm', 'CmCsfJobPlacement', true],
		['sys_ai_old', 'app_cm', 'CmCsfNote', true],
		['sys_ai_old', 'app_cm', 'CmCsfSchoolPlacement', true],
		['sys_ai_old', 'app_cm', 'CmPartner', true],
		['sys_ai_old', 'app_cm', 'CmServiceFlow', true]
	])

	init.addTrans('tablesBulk', [
		// MOED
		['sys_moed_old', 'org_moed', 'MoedDoc', true],
		['sys_moed_old', 'org_moed', 'MoedMessage', true],
		['sys_moed_old', 'org_moed', 'MoedPartDoc', true],
		['sys_moed_old', 'org_moed', 'MoedPartNote', true],
		['sys_moed_old', 'org_moed', 'MoedParticipant', true]
	])
}
