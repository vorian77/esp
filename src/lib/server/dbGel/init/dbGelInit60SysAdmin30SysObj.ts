import { InitDb } from '$server/dbGel/init/types.init'

import { initAdminSysObjApp } from '$server/dbGel/init/dbGelInit60SysAdmin30SysObjApp'
import { initAdminSysObjCode } from '$server/dbGel/init/dbGelInit60SysAdmin30SysObjCode'
import { initAdminSysObjDataObj } from '$server/dbGel/init/dbGelInit60SysAdmin30SysObjDataObj'
import { initAdminSysObjDataObjEmbed } from '$server/dbGel/init/dbGelInit60SysAdmin30SysObjDataObjEmbed'
import { initAdminSysObjDB } from '$server/dbGel/init/dbGelInit60SysAdmin30SysObjDB'
import { initAdminSysObjFieldItems } from '$server/dbGel/init/dbGelInit60SysAdmin30SysObjDataObjFieldItmes'
import { initAdminSysObjMigration } from '$server/dbGel/init/dbGelInit60SysAdmin30SysObjMigration'
import { initAdminSysObjNodeObj } from '$server/dbGel/init/dbGelInit60SysAdmin30SysObjNodeObj'
import { initAdminSysObjRep } from '$server/dbGel/init/dbGelInit60SysAdmin30SysObjRep'
import { initAdminSysObjRoot } from '$server/dbGel/init/dbGelInit60SysAdmin30SysObjRoot'
import { initAdminSysObjTask } from '$server/dbGel/init/dbGelInit60SysAdmin30SysObjTask'
import { initAdminSysObjUserAction } from '$server/dbGel/init/dbGelInit60SysAdmin30SysObjUserAction'

export function initAdminSysObj(init: InitDb) {
	initAdminSysObjApp(init)
	initAdminSysObjCode(init)
	initAdminSysObjDataObj(init)
	initAdminSysObjDataObjEmbed(init)
	initAdminSysObjDB(init)
	initAdminSysObjFieldItems(init)
	initAdminSysObjMigration(init)
	initAdminSysObjNodeObj(init)
	initAdminSysObjRep(init)
	initAdminSysObjRoot(init)
	initAdminSysObjTask(init)
	initAdminSysObjUserAction(init)
}
