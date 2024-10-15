import { codes, codeTypes, sectionHeader } from '$server/dbEdge/init/dbEdgeInit200Utilities10'
import { initPreColumn } from '$server/dbEdge/init/dbEdgeInit40PreDOColumn'
import { initPreDataObjAction } from '$server/dbEdge/init/dbEdgeInit40PreDODataObjAction'
import { initPreDataObjActionGroups } from './dbEdgeInit40PreDODataObjActionGroup'
import { initPreDataObjFieldItem } from '$server/dbEdge/init/dbEdgeInit40PreDODataObjFieldItem'
import { initPreTable } from '$server/dbEdge/init/dbEdgeInit40PreDOTable'
import { initTableColumn } from '$server/dbEdge/init/dbEdgeInit40PreDOTableColumn'

import { initPreEmbedListConfig } from '$server/dbEdge/init/dbEdgeInit40PreDOEmbedListConfig'
import { initPreEmbedListSelect } from '$server/dbEdge/init/dbEdgeInit40PreDOEmbedListSelect'

export async function initPreDataObj() {
	sectionHeader('PreDataObj')
	await initPreColumn()
	await initPreTable()
	await initTableColumn()
	await initPreDataObjAction()
	await initPreDataObjActionGroups()
	await initPreDataObjFieldItem()
	await initPreEmbedListConfig()
	await initPreEmbedListSelect()
}
