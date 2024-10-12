import { sectionHeader, tables } from '$server/dbEdge/init/dbEdgeInitUtilities10'

export async function initPreTable() {
	sectionHeader('Table')

	await tables([
		['sys_app_sys', 'default', 'SysPerson', false],

		['sys_app_sys', 'sys_db', 'SysColumn', true],
		['sys_app_sys', 'sys_db', 'SysTable', true],

		['sys_app_sys', 'sys_core', 'SysCode', true],
		['sys_app_sys', 'sys_core', 'SysCodeType', true],
		['sys_app_sys', 'sys_core', 'SysDataObj', true],
		['sys_app_sys', 'sys_core', 'SysDataObjActionField', true],
		['sys_app_sys', 'sys_core', 'SysDataObjActionFieldGroup', true],
		['sys_app_sys', 'sys_core', 'SysDataObjActionFieldGroupItem', true],
		['sys_app_sys', 'sys_core', 'SysDataObjActionFieldConfirm', true],
		['sys_app_sys', 'sys_core', 'SysDataObjActionFieldShow', true],
		['sys_app_sys', 'sys_core', 'SysDataObjActionQuery', true],
		['sys_app_sys', 'sys_core', 'SysDataObjActionQueryParm', true],
		['sys_app_sys', 'sys_core', 'SysDataObjActionQueryTrigger', true],
		['sys_app_sys', 'sys_core', 'SysDataObjColumn', true],
		['sys_app_sys', 'sys_core', 'SysDataObjColumnItem', true],
		['sys_app_sys', 'sys_core', 'SysDataObjColumnLink', true],
		['sys_app_sys', 'sys_core', 'SysDataObjFieldEmbedListConfig', true],
		['sys_app_sys', 'sys_core', 'SysDataObjFieldEmbedListEdit', true],
		['sys_app_sys', 'sys_core', 'SysDataObjFieldEmbedListSelect', true],
		['sys_app_sys', 'sys_core', 'SysDataObjFieldListItems', true],
		['sys_app_sys', 'sys_core', 'SysDataObjFieldLink', true],
		['sys_app_sys', 'sys_core', 'SysDataObjFieldLinkJoin', true],
		['sys_app_sys', 'sys_core', 'SysDataObjTable', true],

		['sys_app_sys', 'sys_core', 'SysNodeObj', true],
		['sys_app_sys', 'sys_core', 'SysObj', true],
		['sys_app_sys', 'sys_core', 'SysOrg', true],
		['sys_app_sys', 'sys_core', 'SysSystem', true],

		// migration
		['sys_app_sys', 'sys_migr', 'SysMigr', true],
		['sys_app_sys', 'sys_migr', 'SysMigrSourceColumn', true],
		['sys_app_sys', 'sys_migr', 'SysMigrSourceTable', true],
		['sys_app_sys', 'sys_migr', 'SysMigrTargetColumn', true],
		['sys_app_sys', 'sys_migr', 'SysMigrTargetTable', true],

		['sys_app_sys', 'sys_user', 'SysStaff', true],
		['sys_app_sys', 'sys_user', 'SysUser', false],
		['sys_app_sys', 'sys_user', 'SysUserType', false],
		['sys_app_sys', 'sys_user', 'SysUserPref', false],
		['sys_app_sys', 'sys_user', 'SysUserPrefType', false],
		['sys_app_sys', 'sys_user', 'SysUserTypeResource', false],
		['sys_app_sys', 'sys_user', 'SysUserTypeTag', false],
		['sys_app_sys', 'sys_user', 'SysWidget', false]
	])

	await tables([
		// report
		['sys_app_sys_rep', 'sys_rep', 'SysAnalytic', true],
		['sys_app_sys_rep', 'sys_rep', 'SysAnalyticParm', true],
		['sys_app_sys_rep', 'sys_rep', 'SysAnalyticStatus', true],

		['sys_app_sys_rep', 'sys_rep', 'SysRep', true],
		['sys_app_sys_rep', 'sys_rep', 'SysRepEl', true],
		['sys_app_sys_rep', 'sys_rep', 'SysRepParm', true],
		['sys_app_sys_rep', 'sys_rep', 'SysRepUser', true],
		['sys_app_sys_rep', 'sys_rep', 'SysRepUserAnalytic', true],
		['sys_app_sys_rep', 'sys_rep', 'SysRepUserParm', true]
	])

	await tables([
		['sys_app_cm', 'app_cm', 'CmServiceFlow', true],
		['sys_app_cm', 'app_cm', 'CmClient', true],
		['sys_app_cm', 'app_cm', 'CmClientServiceFlow', true],
		['sys_app_cm', 'app_cm', 'CmCsfDocument', true],
		['sys_app_cm', 'app_cm', 'CmCsfJobPlacement', true],
		['sys_app_cm', 'app_cm', 'CmCsfSchoolPlacement', true],
		['sys_app_cm', 'app_cm', 'CmCsfNote', true],
		['sys_app_cm', 'app_cm', 'CmPartner', true]
	])

	await tables([
		['sys_app_cm_training', 'app_cm', 'CmCourse', true],
		['sys_app_cm_training', 'app_cm', 'CmCohort', true],
		['sys_app_cm_training', 'app_cm', 'CmCohortAttd', true],
		['sys_app_cm_training', 'app_cm', 'CmCsfCohort', true],
		['sys_app_cm_training', 'app_cm', 'CmCsfCohortAttd', true]
	])
}
