import { sectionHeader } from '$server/dbEdge/init/dbEdgeInit200Utilities10'

import { initReset } from '$server/dbEdge/init/dbEdgeInit0Reset'
import { initCoreObjects } from '$server/dbEdge/init/dbEdgeInit20CoreObjects'
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

export async function dbEdgeInit() {
	// await dbEdgeInitFeature()
	await dbEdgeInitSystem()
}

async function dbEdgeInitFeature() {
	sectionHeader('Init Start')
	await initUser()
	sectionHeader('Init Complete')
}

async function dbEdgeInitSystem() {
	sectionHeader('Init Start')
	await initReset()
	await initCoreObjects()
	await initPreDataObj()

	await initSysCore()
	await initSysOther()

	await initFeatures()
	await initData()

	await initUser()
	sectionHeader('Init Complete')
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
	await initFeatMOED()
	// await initMigrationPerson()
}

export async function initData() {
	await initDataReports()
}
