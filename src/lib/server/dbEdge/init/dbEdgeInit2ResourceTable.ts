import { sectionHeader, tables } from '$server/dbEdge/init/dbEdgeInitUtilities1'

export async function initPreTable() {
	sectionHeader('Table')

	await tables([
		['app_sys', 'default', 'SysPerson', false],
		['app_sys', 'default', 'SysPersonTest', false],

		['app_sys', 'sys_db', 'SysColumn', true],
		['app_sys', 'sys_db', 'SysTable', true],

		['app_sys', 'sys_core', 'SysResource', false],
		['app_sys', 'sys_core', 'SysCode', true],
		['app_sys', 'sys_core', 'SysCodeType', true],
		['app_sys', 'sys_core', 'SysDataObj', true],
		['app_sys', 'sys_core', 'SysDataObjActionField', true],
		['app_sys', 'sys_core', 'SysDataObjActionFieldGroup', true],
		['app_sys', 'sys_core', 'SysDataObjActionFieldGroupItem', true],
		['app_sys', 'sys_core', 'SysDataObjActionFieldConfirm', true],
		['app_sys', 'sys_core', 'SysDataObjActionFieldShow', true],
		['app_sys', 'sys_core', 'SysDataObjActionQuery', true],
		['app_sys', 'sys_core', 'SysDataObjActionQueryParm', true],
		['app_sys', 'sys_core', 'SysDataObjActionQueryTrigger', true],
		['app_sys', 'sys_core', 'SysDataObjColumn', true],
		['app_sys', 'sys_core', 'SysDataObjColumnItem', true],
		['app_sys', 'sys_core', 'SysDataObjColumnLink', true],
		['app_sys', 'sys_core', 'SysDataObjFieldEmbedListConfig', true],
		['app_sys', 'sys_core', 'SysDataObjFieldEmbedListEdit', true],
		['app_sys', 'sys_core', 'SysDataObjFieldEmbedListSelect', true],
		['app_sys', 'sys_core', 'SysDataObjFieldListItems', true],
		['app_sys', 'sys_core', 'SysDataObjFieldLink', true],
		['app_sys', 'sys_core', 'SysDataObjFieldLinkJoin', true],
		['app_sys', 'sys_core', 'SysDataObjTable', true],

		['app_sys', 'sys_core', 'SysNodeObj', true],
		['app_sys', 'sys_core', 'SysObj', true],
		['app_sys', 'sys_core', 'SysOrg', true],

		// migration
		['app_sys', 'sys_migr', 'SysMigr', true],
		['app_sys', 'sys_migr', 'SysMigrSourceColumn', true],
		['app_sys', 'sys_migr', 'SysMigrSourceTable', true],
		['app_sys', 'sys_migr', 'SysMigrTargetColumn', true],
		['app_sys', 'sys_migr', 'SysMigrTargetTable', true],

		['app_sys', 'sys_user', 'SysStaff', true],
		['app_sys', 'sys_user', 'SysUser', false],
		['app_sys', 'sys_user', 'SysUserType', false],
		['app_sys', 'sys_user', 'SysUserTypeResource', false],
		['app_sys', 'sys_user', 'SysUserTypeTag', false],
		['app_sys', 'sys_user', 'SysWidget', false]
	])

	await tables([
		// report
		['app_sys_rep', 'sys_rep', 'SysAnalytic', true],
		['app_sys_rep', 'sys_rep', 'SysAnalyticParm', true],
		['app_sys_rep', 'sys_rep', 'SysAnalyticStatus', true],

		['app_sys_rep', 'sys_rep', 'SysRep', true],
		['app_sys_rep', 'sys_rep', 'SysRepEl', true],
		['app_sys_rep', 'sys_rep', 'SysRepParm', true],
		['app_sys_rep', 'sys_rep', 'SysRepUser', true],
		['app_sys_rep', 'sys_rep', 'SysRepUserAnalytic', true],
		['app_sys_rep', 'sys_rep', 'SysRepUserEl', true],
		['app_sys_rep', 'sys_rep', 'SysRepUserParm', true]
	])

	await tables([
		['app_cm', 'app_cm', 'CmServiceFlow', true],
		['app_cm', 'app_cm', 'CmClient', true],
		['app_cm', 'app_cm', 'CmClientServiceFlow', true],
		['app_cm', 'app_cm', 'CmCsfDocument', true],
		['app_cm', 'app_cm', 'CmCsfJobPlacement', true],
		['app_cm', 'app_cm', 'CmCsfNote', true]
	])

	await tables([
		['app_cm_training', 'app_cm', 'CmCourse', true],
		['app_cm_training', 'app_cm', 'CmCohort', true],
		['app_cm_training', 'app_cm', 'CmCohortAttd', true],
		['app_cm_training', 'app_cm', 'CmCsfCohort', true],
		['app_cm_training', 'app_cm', 'CmCsfCohortAttd', true]
	])
}
