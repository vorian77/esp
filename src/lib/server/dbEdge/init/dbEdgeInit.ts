import { InitDb } from '$server/dbEdge/init/types.init'

// system
import { initPreCode } from '$server/dbEdge/init/dbEdgeInit30PreCode'
import { initPreCodeAction } from '$server/dbEdge/init/dbEdgeInit30PreCodeAction'
import { initPreDataObj } from '$server/dbEdge/init/dbEdgeInit40PreDO'
import { initSysAdmin } from '$server/dbEdge/init/dbEdgeInit60SysAdmin'
import { initSysAuth } from '$server/dbEdge/init/dbEdgeInit60SysAdminAuth'
import { initSysRepUser } from '$server/dbEdge/init/dbEdgeInit60SysAdminRepUser'

// content
import { initContentCrm } from '$server/dbEdge/init/dbEdgeInit80ContentCrm'
import { initContentCrmRep } from '$server/dbEdge/init/dbEdgeInit80ContentCrmRep'

// content - Atlantic Impact
import { initContentAITraining } from '$server/dbEdge/init/dbEdgeInit80ContentAITraining'
import { initContentAIStudent } from '$server/dbEdge/init/dbEdgeInit80ContentAIStudent'
import { initContentAIRep } from '$server/dbEdge/init/dbEdgeInit80ContentAIRep'

// content - MOED
import { initContentMOEDCm } from '$server/dbEdge/init/dbEdgeInit80ContentMOEDCm'
import { initContentMOEDSsr } from '$server/dbEdge/init/dbEdgeInit80ContentMOEDSSR'
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
	initPreCode(initDb)
	initPreCodeAction(initDb)
	initPreDataObj(initDb)
	initSysAdmin(initDb)
	initSysAuth(initDb)
	initSysRepUser(initDb)

	// content - CRM
	initContentCrm(initDb)
	initContentCrmRep(initDb)

	// content - Atlantic Impact
	initContentAITraining(initDb)
	initContentAIStudent(initDb)
	initContentAIRep(initDb)

	// content - MOED
	initContentMOEDSsr(initDb)
	initContentMOEDCm(initDb)
	initContentMOEDRep(initDb)
}

export function initFeature(initDb: InitDb) {
	initContentMOEDSsr(initDb)
	initContentMOEDCm(initDb)
}
