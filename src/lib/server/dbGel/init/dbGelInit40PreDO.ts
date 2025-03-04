import { InitDb } from '$server/dbGel/init/types.init'

import { initPreColumn } from '$server/dbGel/init/dbGelInit40PreDOColumn'
import { initPreDataObjActionGroup } from '$server/dbGel/init/dbGelInit40PreDODataObjActionGroup'
import { initPreDataObjFieldItem } from '$server/dbGel/init/dbGelInit40PreDODataObjFieldItem'
import { initPreTable } from '$server/dbGel/init/dbGelInit40PreDOTable'
import { initTableColumn } from '$server/dbGel/init/dbGelInit40PreDOTableColumn'
import { initPreEmbedListConfig } from '$server/dbGel/init/dbGelInit40PreDOEmbedListConfig'
import { initPreEmbedListSelect } from '$server/dbGel/init/dbGelInit40PreDOEmbedListSelect'
import { initPreUserAction } from '$server/dbGel/init/dbGelInit40PreUserAction'

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
