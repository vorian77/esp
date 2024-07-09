import { sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities10'
import init10Core from '$server/dbEdge/init/dbEdgeInit3SysAdmin10Core'
import init20DataObj from '$server/dbEdge/init/dbEdgeInit3SysAdmin20DataObj'
import init30DataObjAction from '$server/dbEdge/init/dbEdgeInit3SysAdmin30DataObjAction'
import init40DataObjEmbed from '$server/dbEdge/init/dbEdgeInit3SysAdmin40DataObjEmbed'
import init50NodeObj from '$server/dbEdge/init/dbEdgeInit3SysAdmin50NodeObj'
import init60DB from '$server/dbEdge/init/dbEdgeInit3SysAdmin60DB'
import init70User from '$server/dbEdge/init/dbEdgeInit3SysAdmin70User'

export async function initAdminSys() {
	sectionHeader('SysAdmin')

	await init10Core()
	await init20DataObj()
	await init30DataObjAction()
	await init40DataObjEmbed()
	await init50NodeObj()
	await init60DB()
	await init70User()
}
