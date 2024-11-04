import { InitDB } from '$server/dbEdge/init/types.init'
import { sectionHeader } from '$routes/api/dbEdge/dbEdge'

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
import { initMigrationPerson } from '$server/dbEdge/init/dbEdgeInit100MigrPerson'
import { initUser } from '$server/dbEdge/init/dbEdgeInit1User'
import { initUserResource } from '$server/dbEdge/init/dbEdgeInit1UserResources'

export async function dbEdgeInit() {
	let initDb = new InitDB()

	// await dbEdgeInitSystem()
	await dbEdgeInitFeature(initDb)
	await initDb.execute()
}

async function dbEdgeInitFeature(initDb: InitDB) {
	// initFeatMOED(initDb)
	initUserResource(initDb)
	initUser(initDb)
}

async function dbEdgeInitSystem() {
	await initReset()
	await initPreDataObj()

	await initSysCore()
	await initSysOther()

	await initFeatures()
	await initData()
}

async function initSysCore() {
	await initSysAdmin()
	await initSysAdminMigr()
	await initSysAdminRep()
}
async function initSysOther() {
	await initSysAuth()
	await initSysRepUser()
}

export async function initFeatures() {
	await initFeatCMStudent()
	await initFeatTraining()
	// await initFeatMOED()
	// await initMigrationPerson()
}

export async function initData() {
	await initDataReports()
}
