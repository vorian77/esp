import { sectionHeader } from '$routes/api/dbEdge/dbEdge'
import { addDataObj } from '$server/dbEdge/init/dbEdgeInit200Utilities20DataObj'
import {
	ResetDb,
	userSystemsBulk,
	userUserTypeBulk,
	widgetsBulk
} from '$server/dbEdge/init/dbEdgeInit200Utilities10'
import {
	addApp,
	addAppHeader,
	addNodeFooter,
	addNodeProgram,
	addNodeProgramObj,
	addUserType,
	addSubjectObj
} from '$server/dbEdge/init/dbEdgeInit200Utilities50Other'
import {
	MOEDCSFBulk,
	MOEDParticipantsBulk,
	MOEDStaffBulk
} from '$server/dbEdge/init/dbEdgeInit200Utilities60OrgMOED'
import { required, strRequired, valueOrDefault } from '$utils/utils.model'
import { type DataRecord, debug, getArray } from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/server/dbEdge/init/types.init.ts'

export class InitDB {
	items: InitDBItem[] = []
	reset: ResetDb = new ResetDb()
	constructor() {
		// data
		this.initBulkStatement(
			'MOEDParticipantsBulk',
			MOEDParticipantsBulk,
			`DELETE org_moed::MoedParticipant`
		)
		this.initBulkStatement(
			'MOEDCSFBulk',
			MOEDCSFBulk,
			`DELETE app_cm::CmClientServiceFlow FILTER .client IN org_moed::MoedParticipant`
		)
		this.initResetStatement(
			'DELETE app_cm::CmCsfData FILTER .csf.client IN org_moed::MoedParticipant'
		)

		// resources - no self references
		this.initObject('sysObjSubject', addSubjectObj, 'sys_core::SysObjSubject', 'name')
		this.initBulkSingle('widgetsBulk', widgetsBulk, 'sys_user::SysWidget', ['name', 1])

		this.initBulkSingle('MOEDStaffBulk', MOEDStaffBulk, 'sys_user::SysStaff', [
			['person.firstName', 0],
			['person.lastName', 1]
		])

		// derived objects
		this.initObject('sysDataObj', addDataObj, 'sys_core::SysDataObj', 'name')

		this.initObject('sysNodeFooter', addNodeFooter, 'sys_core::SysNodeObj', 'name')
		this.initObject('sysNodeProgram', addNodeProgram, 'sys_core::SysNodeObj', 'name')
		this.initObject('sysNodeProgramObj', addNodeProgramObj, 'sys_core::SysNodeObj', 'name')

		this.initObject('sysAppHeader', addAppHeader, 'sys_core::SysAppHeader', 'name')
		this.initObject('sysApp', addApp, 'sys_core::SysApp', 'name')

		// users
		this.initObject('sysUserType', addUserType, 'sys_user::SysUserType', 'name', [
			'resources',
			'resources_sys_app',
			'resources_sys_footer',
			'tags'
		])

		this.initBulkMulti(
			'userSystemsBulk',
			userSystemsBulk,
			'sys_user::SysUser',
			['userName', 0],
			'systems'
		)
		this.initBulkMulti(
			'userUserTypeBulk',
			userUserTypeBulk,
			'sys_user::SysUser',
			['userName', 0],
			'userTypes'
		)
	}
	addTrans(name: string, data: any) {
		const item = this.items.find((i) => i.name === name)
		if (item) {
			item.addTrans(name, data)
		} else {
			error(500, {
				file: FILENAME,
				function: 'InitDB.addTrans',
				message: `Unable to find DB initiator: ${name}`
			})
		}
	}
	getArrayOfArray(data: any) {
		if (data.length === 0) return []
		if (Array.isArray(data[0])) return data
		return [data]
	}

	initBulkMulti(
		name: string,
		createF: Function,
		dbObject: string,
		propIdsBulk: [string, number] | [string, number][],
		resetMultiProps: string | string[]
	) {
		const clazz = 'InitDB.initArrayMulti'
		this.items.push(
			new InitDBItem({
				createF: required(createF, clazz, 'createF'),
				dbObject: strRequired(dbObject, clazz, 'dbObject'),
				name: strRequired(name, clazz, 'name'),
				propIdsBulk: this.getArrayOfArray(propIdsBulk),
				reset: this.reset,
				resetF: this.resetBulkMulti,
				resetMultiProps: getArray(resetMultiProps)
			})
		)
	}
	initBulkSingle(
		name: string,
		createF: Function,
		dbObject: string,
		propIdsBulk: [string, number] | [string, number][]
	) {
		const clazz = 'InitDB.initArraySingle'
		this.items.push(
			new InitDBItem({
				createF: required(createF, clazz, 'createF'),
				dbObject: strRequired(dbObject, clazz, 'dbObject'),
				name: strRequired(name, clazz, 'name'),
				propIdsBulk: this.getArrayOfArray(propIdsBulk),
				reset: this.reset,
				resetF: this.resetBulkSingle
			})
		)
	}
	initBulkStatement(name: string, createF: Function, resetExpr: string) {
		const clazz = 'InitDB.initArrayStatement'
		this.items.push(
			new InitDBItem({
				createF: required(createF, clazz, 'createF'),
				name: strRequired(name, clazz, 'name'),
				reset: this.reset,
				resetExpr,
				resetF: this.resetStatement
			})
		)
	}
	initObject(
		name: string,
		createF: Function,
		dbObject: string,
		propIdsObject: string | string[],
		resetMultiProps: string | string[] = []
	) {
		const clazz = 'InitDB.initObject'
		this.items.push(
			new InitDBItem({
				createF: required(createF, clazz, 'createF'),
				dbObject,
				name: strRequired(name, clazz, 'name'),
				propIdsObject: this.getArrayOfArray(propIdsObject),
				reset: this.reset,
				resetF: this.resetObjSingle,
				resetMultiProps: getArray(resetMultiProps)
			})
		)
	}
	initResetStatement(resetExpr: string) {
		const clazz = 'InitDB.initResetStatement'
		this.items.push(
			new InitDBItem({
				reset: this.reset,
				resetExpr: strRequired(resetExpr, clazz, 'resetExpr'),
				resetF: this.resetStatement
			})
		)
	}

	async execute() {
		sectionHeader(`InitDB.reset...`)
		// reset
		// for (let i: number = this.items.length - 1; i > -1; i--) {
		// 	const item = this.items[i]
		// 	sectionHeader(`RESETTING - ${item.name}`)
		// 	for (let j: number = item.trans.length - 1; j > -1; j--) {
		// 		const t = item.trans[j]
		// 		item.resetF(item, t.data)
		// 	}
		// }
		// await this.reset.execute()
		// sectionHeader(`InitDB.reset.complete.`)

		// create
		sectionHeader(`InitDB.create...`)
		for (let i: number = 0; i < this.items.length; i++) {
			const item = this.items[i]
			item.trans.forEach((t) => {
				if (item.createF) item.createF(t.data)
			})
		}
		sectionHeader(`InitDB.reset.complete.`)
	}
	resetBulkMulti(item: InitDBItem, data: string[][]) {
		data.forEach((d) => {
			let filter = ''
			item.propIdsBulk.forEach((p) => {
				if (filter) filter += ' AND '
				filter += `.${p[0]} = '${d[p[1]]}'`
			})
			this.reset.addStatement(
				`UPDATE ${item.dbObject} FILTER ${filter} SET {${item.resetMultiProps} := {}}`
			)
		})
	}
	resetBulkSingle(item: InitDBItem, data: string[][]) {
		data.forEach((d) => {
			let filter = ''
			item.propIdsBulk.forEach((p) => {
				if (filter) filter += ' AND '
				filter += `.${p[0]} = '${d[p[1]]}'`
			})
			this.reset.addStatement(`DELETE ${item.dbObject} FILTER ${filter}`)
		})
	}
	resetObjSingle(item: InitDBItem, data: DataRecord) {
		let filter = ''
		item.propIdsObject.forEach((p) => {
			if (filter) filter += ' AND '
			filter += `.${p} = '${data[p]}'`
		})

		// multi props of parent record
		let props = ''
		item.resetMultiProps?.forEach((prop) => {
			if (props) props += ','
			props += `${prop} := {}`
		})
		if (props) this.reset.addStatement(`UPDATE ${item.dbObject} FILTER ${filter} SET {${props}}`)

		// parent record
		this.reset.addStatement(`DELETE ${item.dbObject} FILTER ${filter}`)
	}
	resetStatement(item: InitDBItem, data: string[][]) {
		this.reset.addStatement(item.resetExpr!)
	}
}

export class InitDBItem {
	createF?: Function
	dbObject?: string
	name?: string
	resetF: Function
	propIdsBulk: [string, number][] = []
	propIdsObject: string[] = []
	reset: ResetDb
	resetExpr?: string
	resetMultiProps?: string[]
	trans: { name: string; data: any }[] = []
	constructor(obj: any) {
		const clazz = 'InitDBItem'
		obj = valueOrDefault(obj, clazz)
		this.createF = obj.createF
		this.dbObject = obj.dbObject
		this.name = obj.name
		this.reset = required(obj.reset, clazz, 'reset')
		this.resetF = required(obj.resetF, clazz, 'resetF')
		this.propIdsBulk = valueOrDefault(obj.propIdsBulk, [])
		this.propIdsObject = valueOrDefault(obj.propIdsObject, [])
		this.resetExpr = obj.resetExpr
		this.resetMultiProps = obj.resetMultiProps
	}
	addTrans(name: string, data: any) {
		this.trans.push({ name, data })
	}
}

// export class InitDbObj {
// 	fCreate: Function
// 	feature: string
// 	reset = new ResetDb()
// 	constructor(feature: string, fCreate: Function) {
// 		this.fCreate = fCreate
// 		this.feature = feature
// 	}
// }

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
