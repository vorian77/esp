import { ResetDb } from '$server/dbEdge/init/dbEdgeInit200Utilities10'
import { sectionHeader } from '$routes/api/dbEdge/dbEdge'

import { widgets } from '$server/dbEdge/init/dbEdgeInit200Utilities10'
import { addDataObj } from '$server/dbEdge/init/dbEdgeInit200Utilities20DataObj'
import {
	addApp,
	addAppHeader,
	addNodeFooter,
	addNodeProgram,
	addNodeProgramObj,
	addUserType,
	addUserTypeResourceSubject
} from '$server/dbEdge/init/dbEdgeInit200Utilities50Other'

export class InitDB {
	objs: InitDbObj[] = []
	constructor() {}
	add(obj: InitDbObj) {
		this.objs.push(obj)
	}
	async execute() {
		// reset
		for (let i: number = this.objs.length - 1; i > -1; i--) {
			const feature = this.objs[i].feature
			sectionHeader(`RESETTING - ${feature}`)
			await this.objs[i].reset.execute()
			sectionHeader(`RESET Complete - ${feature}`)
		}

		// create
		for (let i: number = 0; i < this.objs.length; i++) {
			const feature = this.objs[i].feature
			sectionHeader(`CREATING - ${feature}`)
			await this.objs[i].fCreate()
			sectionHeader(`CREATE Complete - ${feature}`)
		}
	}
}

export class InitDbObj {
	fCreate: Function
	feature: string
	reset = new ResetDb()
	constructor(feature: string, fCreate: Function) {
		this.fCreate = fCreate
		this.feature = feature
	}
}

export class InitDbObjTypes {
	items: InitDbObjTypeItem[] = []
	constructor() {
		this.add('SysWidget', widgets)
		this.add('SysObjSubject', addUserTypeResourceSubject)

		this.add('SysDataObj', addDataObj)
		this.add('SysNodeObj')

		this.add('SysAppHeader')
		this.add('SysApp')

		this.add('UserType')

		this.add('UserUserType')
		this.add('UserSystems')

		// data
		// this.add('CmCsfData')
		// this.add('CmClientServiceFlow')
		// this.add('MoedParticipant')
	}
	add(table: string, f: Function = widgets) {
		this.items.push(new InitDbObjTypeItem(table, f, this.items.length))
	}
}

export class InitDbObjTypeItem {
	fCreate: Function
	table: string
	order: number
	constructor(table: string, f: Function, order: number) {
		this.fCreate = f
		this.table = table
		this.order = order
	}
}

// export async function initReset() {
// 	sectionHeader('Reset-User')
// 	// const reset = new ResetDb()
// 	reset.addStatement('delete sys_user::SysUserTypeResource')
// 	reset.addStatement('delete sys_user::SysUserType')
// 	reset.addStatement(
// 		`delete sys_core::SysNodeObj filter .name = 'node_obj_sys_admin_footer_home_test'`
// 	)
// 	reset.delTableRecords('sys_user::SysWidget')
// 	reset.delTableRecords('sys_core::SysApp')
// 	reset.delTableRecords('sys_core::SysAppHeader')

// 	reset.delTableRecords('sys_core::SysObjSubject')

// 	// await reset.execute()
// }
