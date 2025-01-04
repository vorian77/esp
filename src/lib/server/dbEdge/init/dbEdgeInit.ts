import { InitDb } from '$server/dbEdge/init/types.init'

// system
import { initPreDataObj } from '$server/dbEdge/init/dbEdgeInit40PreDO'
import { initSysAdmin } from '$server/dbEdge/init/dbEdgeInit60SysAdmin'
import { initSysAuth } from '$server/dbEdge/init/dbEdgeInit60SysAdminAuth'
import { initSysRepUser } from '$server/dbEdge/init/dbEdgeInit60SysAdminRepUser'

// content
import { initContentAITraining } from '$server/dbEdge/init/dbEdgeInit80ContentAITraining'
import { initContentAIStudent } from '$server/dbEdge/init/dbEdgeInit80ContentAIStudent'
import { initContentAIRep } from '$server/dbEdge/init/dbEdgeInit80ContentAIRep'
import { initContentMOEDStudent } from '$server/dbEdge/init/dbEdgeInit80ContentMOED'
import { initContentMOEDRep } from '$server/dbEdge/init/dbEdgeInit80ContentMOEDRep'

// user
import { initUser } from '$server/dbEdge/init/dbEdgeInit1User'

const isResetFullDB = true

export async function dbEdgeInit() {
	let initDb = new InitDb(isResetFullDB)
	if (isResetFullDB) dbEdgeInitAll(initDb)
	if (!isResetFullDB) initFeature(initDb)
	initUser(initDb)
	await initDb.execute()
}

function dbEdgeInitAll(initDb: InitDb) {
	initPreDataObj(initDb)
	initSysAdmin(initDb)
	initSysAuth(initDb)
	initSysRepUser(initDb)

	// content - Atlantic Impact
	initContentAITraining(initDb)
	initContentAIStudent(initDb)
	initContentAIRep(initDb)

	// content - MOED
	initContentMOEDStudent(initDb)
	initContentMOEDRep(initDb)
}

export function initFeature(initDb: InitDb) {
	// initSysRepUser(initDb)
	// initContentAIRep(initDb)
	// initContentAIStudent(initDb)
	initContentMOEDStudent(initDb)
}
