import { InitDb } from '$server/dbGel/init/types.init'

// system
import { initPreCode } from '$server/dbGel/init/dbGelInit30PreCode'
import { initPreCodeAction } from '$server/dbGel/init/dbGelInit30PreCodeAction'
import { initPreDataObj } from '$server/dbGel/init/dbGelInit40PreDO'
import { initSysAdmin } from '$server/dbGel/init/dbGelInit60SysAdmin'
import { initSysAuth } from '$server/dbGel/init/dbGelInit60SysAdminAuth'
import { initSysRepUser } from '$server/dbGel/init/dbGelInit60SysAdminRepUser'

// content
import { initContentCrm } from '$server/dbGel/init/dbGelInit80ContentCrm'
import { initContentCrmRep } from '$server/dbGel/init/dbGelInit80ContentCrmRep'

// content - Atlantic Impact
import { initContentAITraining } from '$server/dbGel/init/dbGelInit80ContentAITraining'
import { initContentAIStudent } from '$server/dbGel/init/dbGelInit80ContentAIStudent'
import { initContentAIRep } from '$server/dbGel/init/dbGelInit80ContentAIRep'

// content - MOED
import { initContentMOEDCm } from '$server/dbGel/init/dbGelInit80ContentMOEDCm'
import { initContentMOEDCmAdvocate } from '$server/dbGel/init/dbGelInit80ContentMOEDCmAdvocate'
import { initContentMOEDSsr } from '$server/dbGel/init/dbGelInit80ContentMOEDSSR'
import { initContentMOEDRep } from '$server/dbGel/init/dbGelInit80ContentMOEDRep'

// user
import { initUser } from '$server/dbGel/init/dbGelInit1User'

const isResetFullDB = false

export async function dbInit() {
	let initDb = new InitDb(isResetFullDB)
	if (isResetFullDB) dbInitAll(initDb)
	if (!isResetFullDB) initFeature(initDb)
	initUser(initDb)
	await initDb.execute()
}

function dbInitAll(initDb: InitDb) {
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
	initContentMOEDCmAdvocate(initDb)
	initContentMOEDRep(initDb)
}

export function initFeature(initDb: InitDb) {
	initSysAdmin(initDb)
	// initContentMOEDSsr(initDb)
	// initContentMOEDCm(initDb)
	// initContentMOEDCmAdvocate(initDb)
}
