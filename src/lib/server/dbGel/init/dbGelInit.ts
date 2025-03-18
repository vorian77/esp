import { InitDb } from '$server/dbGel/init/types.init'

// system
import { initPreCode } from '$server/dbGel/init/dbGelInit30PreCode'
import { initPreCodeAction } from '$server/dbGel/init/dbGelInit30PreCodeAction'
import { initPreDataObj } from '$server/dbGel/init/dbGelInit40PreDO'
import { initSysAdmin } from '$server/dbGel/init/dbGelInit60SysAdmin'
import { initSysAuth } from '$server/dbGel/init/dbGelInit60SysAdminAuth'
import { initSysRepUser } from '$server/dbGel/init/dbGelInit60SysAdminRepUser'

// content
import { initContentCm } from '$server/dbGel/init/dbGelInit80contentCm'
import { initContentCrm } from '$server/dbGel/init/dbGelInit80ContentCrm'
import { initContentCrmRep } from '$server/dbGel/init/dbGelInit80ContentCrmRep'

// content - Atlantic Impact
import { initContentAIRep } from '$server/dbGel/init/dbGelInit80ContentAIRep'
import { initContentAIStudent } from '$server/dbGel/init/dbGelInit80ContentAIStudent'
import { initContentAITask } from '$server/dbGel/init/dbGelInit80ContentAITask'
import { initContentAITraining } from '$server/dbGel/init/dbGelInit80ContentAITraining'

// content - MOED
import { initContentMOEDCm } from '$server/dbGel/init/dbGelInit80ContentMOEDCm'
import { initContentMOEDCmAdvocate } from '$server/dbGel/init/dbGelInit80ContentMOEDCmAdvocate'
import { initContentMOEDSsr } from '$server/dbGel/init/dbGelInit80ContentMOEDSSR'
import { initContentMOEDRep } from '$server/dbGel/init/dbGelInit80ContentMOEDRep'
import { initContentSys } from '$server/dbGel/init/dbGelInit80ContentSys'

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

	// content - system
	initContentSys(initDb)

	// content - CM
	initContentCm(initDb)

	// content - CRM
	initContentCrm(initDb)
	initContentCrmRep(initDb)

	// content - Atlantic Impact
	initContentAIRep(initDb)
	initContentAIStudent(initDb)
	initContentAITask(initDb)
	initContentAITraining(initDb)

	// content - MOED
	initContentMOEDSsr(initDb)
	initContentMOEDCm(initDb)
	initContentMOEDCmAdvocate(initDb)
	initContentMOEDRep(initDb)
}

export function initFeature(initDb: InitDb) {
	// initContentAIRep(initDb)
	// initContentAIStudent(initDb)
	// initContentAITraining(initDb)
	// initContentAITask(initDb)
	// initContentCm(initDb)
	// initContentSys(initDb)
	// initSysAdmin(initDb)
	initContentMOEDSsr(initDb)
	// initContentMOEDCm(initDb)
	initContentMOEDCmAdvocate(initDb)
}
