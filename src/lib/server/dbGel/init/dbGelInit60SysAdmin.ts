import { InitDb } from '$server/dbGel/init/types.init'

import { initAdminOrgSys } from '$server/dbGel/init/dbGelInit60SysAdmin10OrgSys'
import { initAdminOrgUser } from '$server/dbGel/init/dbGelInit60SysAdmin15OrgUser'
import { initAdminSysConfig } from '$server/dbGel/init/dbGelInit60SysAdmin20SysConfig'
import { initAdminSysObj } from '$server/dbGel/init/dbGelInit60SysAdmin30SysObj'
import { initAdminSysMeta } from '$server/dbGel/init/dbGelInit60SysAdmin40SysMeta'

export function initSysAdmin(init: InitDb) {
	initAdminOrgSys(init)
	initAdminOrgUser(init)
	initAdminSysConfig(init)
	initAdminSysObj(init)
	initAdminSysMeta(init)
}
