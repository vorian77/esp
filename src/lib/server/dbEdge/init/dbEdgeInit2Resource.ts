import { codes, codeTypes, sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { initPreColumn } from '$server/dbEdge/init/dbEdgeInit2ResourceColumn'
import { initPreDataObjAction } from '$server/dbEdge/init/dbEdgeInit2ResourceDataObjAction'
import { initPreDataObjActionGroups } from './dbEdgeInit2ResourceDataObjActionGroup'
import { initPreDataObjFieldItem } from '$server/dbEdge/init/dbEdgeInit2ResourceDataObjFieldItem'
import { initPreTable } from '$server/dbEdge/init/dbEdgeInit2ResourceTable'
import { initTableColumn } from '$server/dbEdge/init/dbEdgeInit2ResourceTableColumn'

export async function initResources() {
	sectionHeader('Pre')
	await initPreColumn()
	await initPreTable()
	await initTableColumn()
	await initPreDataObjAction()
	await initPreDataObjActionGroups()
	await initPreDataObjFieldItem()
}
