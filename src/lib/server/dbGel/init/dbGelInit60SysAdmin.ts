import { InitDb } from '$server/dbGel/init/types.init'

import { initAdminOrg } from '$server/dbGel/init/dbGelInit60SysAdmin15Org'
import { initAdminSysConfig } from '$server/dbGel/init/dbGelInit60SysAdmin20SysConfig'
import { initAdminSysObj } from '$server/dbGel/init/dbGelInit60SysAdmin30SysObj'
import { initAdminSysMeta } from '$server/dbGel/init/dbGelInit60SysAdmin40SysMeta'
import { initAdminSysTools } from '$server/dbGel/init/dbGelInit60SysAdmin20SysTools'

export function initSysAdmin(init: InitDb) {
	initAdminOrg(init)
	initAdminSysConfig(init)
	initAdminSysObj(init)
	initAdminSysMeta(init)
	initAdminSysTools(init)
}
