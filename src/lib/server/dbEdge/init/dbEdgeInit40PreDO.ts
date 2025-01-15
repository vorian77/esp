import { InitDb } from '$server/dbEdge/init/types.init'

import { initPreColumn } from '$server/dbEdge/init/dbEdgeInit40PreDOColumn'
import { initPreDataObjActionGroup } from '$server/dbEdge/init/dbEdgeInit40PreDODataObjActionGroup'
import { initPreDataObjFieldItem } from '$server/dbEdge/init/dbEdgeInit40PreDODataObjFieldItem'
import { initPreTable } from '$server/dbEdge/init/dbEdgeInit40PreDOTable'
import { initTableColumn } from '$server/dbEdge/init/dbEdgeInit40PreDOTableColumn'
import { initPreEmbedListConfig } from '$server/dbEdge/init/dbEdgeInit40PreDOEmbedListConfig'
import { initPreEmbedListSelect } from '$server/dbEdge/init/dbEdgeInit40PreDOEmbedListSelect'
import { initPreUserAction } from '$server/dbEdge/init/dbEdgeInit40PreUserAction'

// old
import { initPreDataObjAction } from '$server/dbEdge/init/dbEdgeInit40PreDODataObjAction-Old'
import { initPreDataObjActionGroups } from './dbEdgeInit40PreDODataObjActionGroup-Old'

export function initPreDataObj(init: InitDb) {
	initPreColumn(init)
	initPreTable(init)
	initTableColumn(init)

	// new
	// initPreUserAction(init)
	// initPreDataObjActionGroup(init)

	// old
	initPreDataObjAction(init)
	initPreDataObjActionGroups(init)
	initPreDataObjFieldItem(init)

	initPreEmbedListConfig(init)
	initPreEmbedListSelect(init)
}
