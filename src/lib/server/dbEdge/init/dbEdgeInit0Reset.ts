import { ResetDb, sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'

export async function initReset() {
	sectionHeader('Reset')
	const reset = new ResetDb()

	reset.addStatement('delete sys_user::SysUserTypeResource')
	reset.addStatement('delete sys_user::SysUserType')

	// reset.addStatement(`UPDATE sys_user::SysUserType SET { userTypeResources := {} }`)

	reset.delTableRecords(`sys_core::SysNodeObj`)
	reset.delTableRecords('sys_user::SysWidget')

	// data object
	reset.addStatement(`UPDATE sys_core::SysDataObjColumn
	FILTER .id IN (SELECT sys_core::SysDataObj).columns.id
	SET { fieldEmbedListConfig := {}, fieldEmbedListEdit := {},fieldEmbedListSelect := {},fieldListItems := {} }`)

	reset.delTableRecords('sys_core::SysDataObjColumnItem')
	reset.delTableRecords('sys_core::SysDataObjColumnLink')
	reset.delTableRecords('sys_core::SysDataObjColumn')

	reset.delTableRecords('sys_core::SysDataObjFieldEmbedListConfig')
	reset.delTableRecords('sys_core::SysDataObjFieldEmbedListEdit')
	reset.delTableRecords('sys_core::SysDataObjFieldEmbedListSelect')

	reset.addStatement(`UPDATE sys_core::SysDataObj SET { tables := {} }`)
	reset.delTableRecords('sys_core::SysDataObjTable')
	reset.delTableRecords('sys_core::SysDataObj')

	// report
	reset.addStatement(`UPDATE sys_rep::SysRepParm SET { fieldListItems := {}, linkTable := {} }`)
	reset.addStatement(
		`UPDATE sys_rep::SysRep SET { analytics := {},  elements := {},  parms := {} }`
	)

	reset.delTableRecords('sys_rep::SysRepUserAnalytic')
	reset.delTableRecords('sys_rep::SysRepUserEl')
	reset.delTableRecords('sys_rep::SysRepUserParm')
	reset.delTableRecords('sys_rep::SysRepUser')

	reset.delTableRecords('sys_rep::SysAnalytic')
	reset.delTableRecords('sys_rep::SysRepParm')
	reset.delTableRecords('sys_rep::SysRepEl')
	reset.delTableRecords('sys_rep::SysRep')

	// other
	reset.delTableRecords('sys_core::SysDataObjActionQueryParm')
	reset.delTableRecords('sys_core::SysDataObjActionFieldGroupItem')
	reset.delTableRecords('sys_core::SysDataObjActionFieldGroup')
	reset.delTableRecords('sys_core::SysDataObjActionField')
	reset.delTableRecords('sys_core::SysDataObjFieldListItems')
	reset.delTableRecords('sys_migr::SysMigr')

	// db
	reset.addStatement(`UPDATE sys_db::SysTable SET { columns := {} }`)
	reset.delTableRecords('sys_db::SysTable')
	reset.delTableRecords('sys_db::SysColumn')

	await reset.execute()
}
