import { InitDb } from '$server/dbEdge/init/types.init'

import { addDataObjActionField } from '$server/dbEdge/init/dbEdgeInit200Utilities20DataObj'

import { initReset } from '$server/dbEdge/init/dbEdgeInit0Reset'
import { initPreDataObj } from '$server/dbEdge/init/dbEdgeInit40PreDO'

// admin
import { initSysAdmin } from '$server/dbEdge/init/dbEdgeInit60SysAdmin'
import { initSysAuth } from '$server/dbEdge/init/dbEdgeInit60SysAdminAuth'
import { initSysAdminMigr } from '$server/dbEdge/init/dbEdgeInit60SysAdminMigration'
import { initSysAdminRep } from '$server/dbEdge/init/dbEdgeInit60SysAdminRep'
import { initSysRepUser } from '$server/dbEdge/init/dbEdgeInit60SysAdminRepRender'

// features
import { initFeatCMStudent } from '$server/dbEdge/init/dbEdgeInit80FeatStudent'
import { initFeatTraining } from '$server/dbEdge/init/dbEdgeInit80FeatCMTraining'
import { initFeatMOED } from '$server/dbEdge/init/dbEdgeInit80FeatMOED'

// data
import { initDataReports } from '$server/dbEdge/init/dbEdgeInit120DataRep'

// other
import { initUser } from '$server/dbEdge/init/dbEdgeInit1User'

export async function dbEdgeInit() {
	let initDb = new InitDb()
	dbEdgeInitAll(initDb)
	// initFeatures(initDb)
	initUser(initDb)
	await initDb.execute()
}

function dbEdgeInitAll(initDb: InitDb) {
	initPreDataObj(initDb)
	initSysCore(initDb)
	initSysOther(initDb)
	initFeatures(initDb)
	initData(initDb)
}

function initSysCore(initDb: InitDb) {
	initSysAdmin(initDb)
	initSysAdminMigr(initDb)
	initSysAdminRep(initDb)
}
function initSysOther(initDb: InitDb) {
	initSysAuth(initDb)
	initSysRepUser(initDb)
}

export function initFeatures(initDb: InitDb) {
	initFeatMOED(initDb)
	initFeatCMStudent(initDb)
	initFeatTraining(initDb)
}

export function initData(initDb: InitDb) {
	initDataReports(initDb)
}
