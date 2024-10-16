import { sectionHeader, tables } from '$server/dbEdge/init/dbEdgeInit200Utilities10'

export async function initPreTable() {
	sectionHeader('Table')

	await tables([
		// default
		['sys_system_old', 'default', 'SysPerson', false],

		// sys_db
		['sys_system_old', 'sys_db', 'SysColumn', true],
		['sys_system_old', 'sys_db', 'SysTable', true],

		// sys_core
		['sys_system_old', 'sys_core', 'SysApp', true],
		['sys_system_old', 'sys_core', 'SysAppHeader', true],
		['sys_system_old', 'sys_core', 'SysCode', true],
		['sys_system_old', 'sys_core', 'SysCodeType', true],
		['sys_system_old', 'sys_core', 'SysDataObj', true],
		['sys_system_old', 'sys_core', 'SysDataObjActionField', true],
		['sys_system_old', 'sys_core', 'SysDataObjActionFieldGroup', true],
		['sys_system_old', 'sys_core', 'SysDataObjActionFieldGroupItem', true],
		['sys_system_old', 'sys_core', 'SysDataObjActionFieldConfirm', true],
		['sys_system_old', 'sys_core', 'SysDataObjActionFieldShow', true],
		['sys_system_old', 'sys_core', 'SysDataObjActionQuery', true],
		['sys_system_old', 'sys_core', 'SysDataObjActionQueryParm', true],
		['sys_system_old', 'sys_core', 'SysDataObjActionQueryTrigger', true],
		['sys_system_old', 'sys_core', 'SysDataObjColumn', true],
		['sys_system_old', 'sys_core', 'SysDataObjColumnItem', true],
		['sys_system_old', 'sys_core', 'SysDataObjColumnLink', true],
		['sys_system_old', 'sys_core', 'SysDataObjFieldEmbedListConfig', true],
		['sys_system_old', 'sys_core', 'SysDataObjFieldEmbedListEdit', true],
		['sys_system_old', 'sys_core', 'SysDataObjFieldEmbedListSelect', true],
		['sys_system_old', 'sys_core', 'SysDataObjFieldListItems', true],
		['sys_system_old', 'sys_core', 'SysDataObjFieldLink', true],
		['sys_system_old', 'sys_core', 'SysDataObjFieldLinkJoin', true],
		['sys_system_old', 'sys_core', 'SysDataObjTable', true],
		['sys_system_old', 'sys_core', 'SysNodeObj', true],
		['sys_system_old', 'sys_core', 'SysObj', true],
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
		['sys_system_old', 'sys_user', 'SysStaff', true],
		['sys_system_old', 'sys_user', 'SysUser', false],
		['sys_system_old', 'sys_user', 'SysUserType', false],
		['sys_system_old', 'sys_user', 'SysUserPref', false],
		['sys_system_old', 'sys_user', 'SysUserPrefType', false],
		['sys_system_old', 'sys_user', 'SysUserTypeResource', false],
		['sys_system_old', 'sys_user', 'SysUserTypeTag', false],
		['sys_system_old', 'sys_user', 'SysWidget', false]
	])

	await tables([
		// app_cm
		['sys_ai_old', 'app_cm', 'CmClient', true],
		['sys_ai_old', 'app_cm', 'CmClientServiceFlow', true],
		['sys_ai_old', 'app_cm', 'CmCohort', true],
		['sys_ai_old', 'app_cm', 'CmCohortAttd', true],
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
}
