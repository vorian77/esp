import { InitDb } from '$server/dbEdge/init/types.init'

import { initAdminOrgSys } from '$server/dbEdge/init/dbEdgeInit60SysAdmin10OrgSys'
import { initAdminOrgUser } from '$server/dbEdge/init/dbEdgeInit60SysAdmin15OrgUser'
import { initAdminSysConfig } from '$server/dbEdge/init/dbEdgeInit60SysAdmin20Config'
import { initAdminSysObj } from '$server/dbEdge/init/dbEdgeInit60SysAdmin30Objs'
import { initAdminSysMeta } from '$server/dbEdge/init/dbEdgeInit60SysAdmin40Meta'
import { initAdminApp } from '$server/dbEdge/init/dbEdgeInit60SysAdmin50App'
import { initAdminCode } from '$server/dbEdge/init/dbEdgeInit60SysAdmin60Code'
import { initAdminDataObj } from '$server/dbEdge/init/dbEdgeInit60SysAdmin70DataObj'
import { initAdminDataObjAction } from '$server/dbEdge/init/dbEdgeInit60SysAdmin80DataObjAction'
import { initAdminDataObjEmbed } from '$server/dbEdge/init/dbEdgeInit60SysAdmin90DataObjEmbed'
import { initAdminNodeObj } from '$server/dbEdge/init/dbEdgeInit60SysAdmin100NodeObj'
import { initAdminDB } from '$server/dbEdge/init/dbEdgeInit60SysAdmin110DB'
import { initAdminUser } from '$server/dbEdge/init/dbEdgeInit60SysAdmin120User'

export function initSysAdmin(init: InitDb) {
	initAdminOrgSys(init)
	initAdminOrgUser(init)
	initAdminSysConfig(init)
	initAdminSysObj(init)
	initAdminSysMeta(init)
	initAdminApp(init)
	initAdminCode(init)
	initAdminDataObj(init)
	initAdminDataObjAction(init)
	initAdminDataObjEmbed(init)
	initAdminNodeObj(init)
	initAdminDB(init)
	initAdminUser(init)
}
