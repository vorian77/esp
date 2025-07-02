import { InitDb } from '$server/dbGel/init/types.init'

import { initAdminSysTools } from '$server/dbGel/init/dbGelInit60SysAdmin10Tools'
import { initAdminOrgCustomer } from '$server/dbGel/init/dbGelInit60SysAdmin20OrgCustomer'
import { initAdminOrgGlobal } from '$server/dbGel/init/dbGelInit60SysAdmin20OrgGlobal'
import { initAdminSysObj } from '$server/dbGel/init/dbGelInit60SysAdmin30SysObj'
import { initAdminSysObjBuild } from '$server/dbGel/init/dbGelInit60SysAdmin40SystemsBuild'

export function initSysAdmin(init: InitDb) {
	initAdminSysTools(init)
	initAdminOrgCustomer(init)
	initAdminOrgGlobal(init)
	initAdminSysObj(init)
	initAdminSysObjBuild(init)
}
