import { codes, codeTypes, sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities10'
import { initPreColumn } from '$server/dbEdge/init/dbEdgeInit2ObjectsColumn'
import { initPreDataObjAction } from '$server/dbEdge/init/dbEdgeInit2ObjectsDataObjAction'
import { initPreDataObjActionGroups } from './dbEdgeInit2ObjectsDataObjActionGroup'
import { initPreDataObjFieldItem } from '$server/dbEdge/init/dbEdgeInit2ObjectsDataObjFieldItem'
import { initPreTable } from '$server/dbEdge/init/dbEdgeInit2ObjectsTable'
import { initTableColumn } from '$server/dbEdge/init/dbEdgeInit2ObjectsTableColumn'

import { initAdminSysEmbedListConfig } from '$server/dbEdge/init/dbEdgeInit2ObjectsEmbedListConfig'
import { initAdminSysEmbedListSelect } from '$server/dbEdge/init/dbEdgeInit2ObjectsEmbedListSelect'

export async function initObjects() {
	sectionHeader('Pre')
	await initPreColumn()
	await initPreTable()
	await initTableColumn()
	await initPreDataObjAction()
	await initPreDataObjActionGroups()
	await initPreDataObjFieldItem()
	await initAdminSysEmbedListConfig()
	await initAdminSysEmbedListSelect()
}
