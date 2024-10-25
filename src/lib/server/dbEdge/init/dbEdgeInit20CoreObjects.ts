import { sectionHeader } from '$routes/api/dbEdge/dbEdge'
import { addOrg } from '$server/dbEdge/init/dbEdgeInit200Utilities50Other'
import { addSystem } from '$server/dbEdge/init/dbEdgeInit200Utilities10'

export async function initCoreObjects() {
	sectionHeader('Core Objects')
	await initOrganizations()
	await initSystems()
}

async function initOrganizations() {
	sectionHeader('Organization-Records')
	// await addOrg({ name: 'org_system_old' })
	// await addOrg({ name: 'org_ai_old' })
	// await addOrg({ name: 'org_moed_old' })
}

async function initSystems() {
	sectionHeader('System-Records')
	// await addSystem({
	// 	header: 'sys_ai_old',
	// 	name: 'sys_ai_old',
	// 	owner: 'org_ai_old'
	// })
	// await addSystem({
	// 	header: 'sys_moed_old',
	// 	name: 'sys_moed_old',
	// 	owner: 'org_moed_old'
	// })
	// await addSystem({
	// 	header: 'sys_system_old',
	// 	name: 'sys_system_old',
	// 	owner: 'org_system_old'
	// })
}
