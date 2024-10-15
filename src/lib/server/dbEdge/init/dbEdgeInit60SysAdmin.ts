import { sectionHeader } from '$server/dbEdge/init/dbEdgeInit200Utilities10'

import { initAdminOrg } from '$server/dbEdge/init/dbEdgeInit60SysAdmin10Org'
import { initAdminConfig } from '$server/dbEdge/init/dbEdgeInit60SysAdmin20Config'
import { initAdminObjs } from '$server/dbEdge/init/dbEdgeInit60SysAdmin30Objs'
import { initSysAdminSystemMeta } from '$server/dbEdge/init/dbEdgeInit60SysAdmin40Meta'
import { initAdminApp } from '$server/dbEdge/init/dbEdgeInit60SysAdmin50App'
import { initAdminCode } from '$server/dbEdge/init/dbEdgeInit60SysAdmin60Code'
import { initAdminDataObj } from '$server/dbEdge/init/dbEdgeInit60SysAdmin70DataObj'
import { initAdminDataObjAction } from '$server/dbEdge/init/dbEdgeInit60SysAdmin80DataObjAction'
import { initAdminDataObjEmbed } from '$server/dbEdge/init/dbEdgeInit60SysAdmin90DataObjEmbed'
import { initAdminNodeObj } from '$server/dbEdge/init/dbEdgeInit60SysAdmin100NodeObj'
import { initAdminDB } from '$server/dbEdge/init/dbEdgeInit60SysAdmin110DB'
import { initAdminUser } from '$server/dbEdge/init/dbEdgeInit60SysAdmin120User'

export async function initSysAdmin() {
	sectionHeader('SysAdmin')
	await initAdminOrg()
	await initAdminConfig()
	await initAdminObjs()
	await initSysAdminSystemMeta()
	await initAdminApp()
	await initAdminCode()
	await initAdminDataObj()
	await initAdminDataObjAction()
	await initAdminDataObjEmbed()
	await initAdminNodeObj()
	await initAdminDB()
	await initAdminUser()
}
