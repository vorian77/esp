import { sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities10'

import { initReset } from '$server/dbEdge/init/dbEdgeInit0Reset'
import { initUser } from '$server/dbEdge/init/dbEdgeInit1User'
import { initResources } from '$server/dbEdge/init/dbEdgeInit2Resource'

// admin
import { initAdminSys } from '$server/dbEdge/init/dbEdgeInit3SysAdmin'
import { initAdminSysAuth } from '$server/dbEdge/init/dbEdgeInit3SysAdminAuth'
import { initAdminSysMigration } from '$server/dbEdge/init/dbEdgeInit3SysAdminMigration'
import { initAdminSysOrg } from '$server/dbEdge/init/dbEdgeInit3SysAdminOrg'
import { initAdminSysRep } from '$server/dbEdge/init/dbEdgeInit3SysAdminRep'
import { initAdminSysRepUser } from '$server/dbEdge/init/dbEdgeInit3SysAdminRepRender'

// features
import { initFeatCMStudent } from '$server/dbEdge/init/dbEdgeInit4FeatStudent'
import { initFeatTraining } from '$server/dbEdge/init/dbEdgeInit4FeatCMTraining'

// data
import { initDataReports } from '$server/dbEdge/init/dbEdgeInit6DataRep'

// other
import { initMigrationPerson } from '$server/dbEdge/init/dbEdgeInit5MigrPerson'

// export async function dbEdgeInit() {
// 	sectionHeader('Init Start')
// 	await initMigrationPerson()
// 	sectionHeader('Init Complete')
// }

export async function dbEdgeInit() {
	sectionHeader('Init Start')
	await initCore()
	await initAdmin()
	await initFeatures()
	await initData()
	sectionHeader('Init Complete')
}

async function initCore() {
	await initReset()
	await initUser()
	await initResources()
}

async function initAdmin() {
	await initAdminSys()
	await initAdminSysAuth()
	await initAdminSysMigration()
	await initAdminSysOrg()
	await initAdminSysRep()
	await initAdminSysRepUser()
}

export async function initFeatures() {
	await initFeatCMStudent()
	await initFeatTraining()
	// await initMigrationPerson()
}

export async function initData() {
	await initDataReports()
}
