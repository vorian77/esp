import { InitDb } from '$server/dbEdge/init/types.init'

import { initAdminOrgSys } from '$server/dbEdge/init/dbEdgeInit60SysAdmin10OrgSys'
import { initAdminOrgUser } from '$server/dbEdge/init/dbEdgeInit60SysAdmin15OrgUser'
import { initAdminSysConfig } from '$server/dbEdge/init/dbEdgeInit60SysAdmin20SysConfig'
import { initAdminSysObj } from '$server/dbEdge/init/dbEdgeInit60SysAdmin30SysObj'
import { initAdminSysMeta } from '$server/dbEdge/init/dbEdgeInit60SysAdmin40SysMeta'

export function initSysAdmin(init: InitDb) {
	initAdminOrgSys(init)
	initAdminOrgUser(init)
	initAdminSysConfig(init)
	initAdminSysObj(init)
	initAdminSysMeta(init)
}
