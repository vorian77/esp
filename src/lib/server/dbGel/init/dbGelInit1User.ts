import { InitDb } from '$server/dbGel/init/types.init'

import { initUserAI } from '$server/dbGel/init/dbGelInit1UserAI'
import { initUserMOED } from '$server/dbGel/init/dbGelInit1UserMOED'
import { initUserSystem } from '$server/dbGel/init/dbGelInit1UserSystem'

export function initUser(init: InitDb) {
	initObjAttr(init)
	initUserSystem(init)
	initUserAI(init)
	initUserMOED(init)
}

function initObjAttr(init: InitDb) {
	init.addTrans('sysObjAttr', {
		code: 'at_user_type_attr_access',
		header: 'Admin-Global',
		name: 'atutaa_sys_admin_global',
		ownerSys: 'sys_system'
	})
	init.addTrans('sysObjAttr', {
		code: 'at_user_type_attr_access',
		header: 'Admin-Organization',
		name: 'atutaa_sys_admin_org',
		ownerSys: 'sys_system'
	})
}
