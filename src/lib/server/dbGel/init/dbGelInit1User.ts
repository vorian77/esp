import { InitDb } from '$server/dbGel/init/types.init'

import { initUserAI } from '$server/dbGel/init/dbGelInit1UserAI'
import { initUserMOED } from '$server/dbGel/init/dbGelInit1UserMOED'
import { initUserSystem } from '$server/dbGel/init/dbGelInit1UserSystem'

export function initUser(init: InitDb) {
	initUserSystem(init)
	initUserAI(init)
	initUserMOED(init)
}
