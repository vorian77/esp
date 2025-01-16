import { InitDb } from '$server/dbEdge/init/types.init'

import { initPreColumn } from '$server/dbEdge/init/dbEdgeInit40PreDOColumn'
import { initPreDataObjActionGroup } from '$server/dbEdge/init/dbEdgeInit40PreDODataObjActionGroup'
import { initPreDataObjFieldItem } from '$server/dbEdge/init/dbEdgeInit40PreDODataObjFieldItem'
import { initPreTable } from '$server/dbEdge/init/dbEdgeInit40PreDOTable'
import { initTableColumn } from '$server/dbEdge/init/dbEdgeInit40PreDOTableColumn'
import { initPreEmbedListConfig } from '$server/dbEdge/init/dbEdgeInit40PreDOEmbedListConfig'
import { initPreEmbedListSelect } from '$server/dbEdge/init/dbEdgeInit40PreDOEmbedListSelect'
import { initPreUserAction } from '$server/dbEdge/init/dbEdgeInit40PreUserAction'

export function initPreDataObj(init: InitDb) {
	initPreColumn(init)
	initPreTable(init)
	initTableColumn(init)

	initPreUserAction(init)
	initPreDataObjActionGroup(init)

	initPreDataObjFieldItem(init)
	initPreEmbedListConfig(init)
	initPreEmbedListSelect(init)
}
