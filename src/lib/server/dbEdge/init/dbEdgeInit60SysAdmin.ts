import { InitDb } from '$server/dbEdge/init/types.init'

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

export function initSysAdmin(init: InitDb) {
	initAdminOrg(init)
	initAdminConfig(init)
	initAdminObjs(init)
	initSysAdminSystemMeta(init)
	initAdminApp(init)
	initAdminCode(init)
	initAdminDataObj(init)
	initAdminDataObjAction(init)
	initAdminDataObjEmbed(init)
	initAdminNodeObj(init)
	initAdminDB(init)
	initAdminUser(init)
}
