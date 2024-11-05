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
	MoedCsfBulk,
	MoedParticipantsBulk,
	MoedStaffBulk
} from '$server/dbEdge/init/dbEdgeInit200Utilities60OrgMOED'
import { required, strRequired, valueOrDefault } from '$utils/utils.model'
import { type DataRecord, debug, getArray } from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/server/dbEdge/init/types.init.ts'

type Refn = [string, string]
type Reset = [Function, Refn]

const getArrayOfArray = (data: any[]) => {
	data = getArray(data)
	if (data.length === 0) return []
	if (Array.isArray(data[0])) return data
	return [data]
}

const exprRefnDeleteRecords = (reset: ResetDb, item: InitDbItem, refn: Refn, data: any[]) => {
	data.forEach((row) => {
		const refnObj = refn[0]
		const refnProp = refn[1]
		const expr = `DELETE ${refnObj} ${item.exprSourceFilter(row, refnProp)}`
		reset.addStatement(expr)
	})
}

const exprRefnRemoveSource = (reset: ResetDb, item: InitDbItem, refn: Refn, data: any[]) => {
	data.forEach((row) => {
		const exprFilterSource = item.exprSourceFilter(row)
		const refnObj = refn[0]
		const refnProp = refn[1]
		const expr = `UPDATE ${refnObj} ${item.exprSourceFilter(row, refnProp)} SET {${refnProp} := .${refnProp} EXCEPT (SELECT ${item.dbObject} ${exprFilterSource})}`
		reset.addStatement(expr)
	})
}

const exprRefnResetProp = (reset: ResetDb, item: InitDbItem, refn: Refn, data: any[]) => {
	data.forEach((row) => {
		const refnObj = refn[0]
		const refnProp = refn[1]
		const expr = `UPDATE ${refnObj} ${item.exprSourceFilter(row, refnProp)} SET {${refnProp} := {}}`
		reset.addStatement(expr)
	})
}

const exprSourceDeleteRecord = (reset: ResetDb, item: InitDbItem, refn: Refn, data: any[]) => {
	data.forEach((row) => {
		reset.addStatement(`DELETE ${item.dbObject} ${item.exprSourceFilter(row)}`)
	})
}

export class InitDb {
	items: InitDbItem[] = []
	reset: ResetDb = new ResetDb()
	constructor() {
		this.items.push(
			new InitDbItemObject({
				name: 'sysObjSubject',
				dbObject: 'sys_core::SysObjSubject',
				fCreate: addSubjectObj,
				fResets: [
					[exprRefnDeleteRecords, ['sys_user::SysUserTypeResource', 'resource']],
					[exprRefnResetProp, ['app_cm::CmClient', 'office']],
					[exprRefnResetProp, ['app_cm::CmCsfMsg', 'office']],
					[exprSourceDeleteRecord, []]
				],
				propId: ['name']
			})
		)
		this.items.push(
			new InitDbItemBulk({
				name: 'widgetsBulk',
				dbObject: 'sys_user::SysWidget',
				fCreate: widgetsBulk,
				fResets: [
					[exprRefnDeleteRecords, ['sys_user::SysUserTypeResource', 'resource']],
					[exprSourceDeleteRecord, []]
				],
				propId: ['name', 1]
			})
		)
		this.items.push(
			new InitDbItemBulk({
				name: 'MoedStaffBulk',
				dbObject: 'sys_user::SysStaff',
				fCreate: MoedStaffBulk,
				propId: [
					['person.firstName', 0],
					['person.lastName', 1]
				]
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysDataObj',
				dbObject: 'sys_core::SysDataObj',
				fCreate: addDataObj,
				fResets: [[exprSourceDeleteRecord, []]],
				propId: ['name']
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysNodeObjFooter',
				dbObject: 'sys_core::SysNodeObj',
				fCreate: addNodeFooter,
				fResets: [
					[exprRefnDeleteRecords, ['sys_user::SysUserTypeResource', 'resource']],
					[exprRefnRemoveSource, ['sys_user::SysUserType', 'resources_sys_footer']],
					[exprSourceDeleteRecord, []]
				],
				propId: ['name']
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysNodeObjProgramObj',
				dbObject: 'sys_core::SysNodeObj',
				fCreate: addNodeProgramObj,
				fResets: [
					[exprRefnResetProp, ['sys_core::SysNodeObj', 'parent']],
					[exprSourceDeleteRecord, []]
				],
				propId: ['name']
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysNodeObjProgram',
				dbObject: 'sys_core::SysNodeObj',
				fCreate: addNodeProgram,
				fResets: [
					[exprRefnRemoveSource, ['sys_core::SysApp', 'nodes']],
					[exprRefnResetProp, ['sys_core::SysNodeObj', 'parent']],
					[exprSourceDeleteRecord, []]
				],
				propId: ['name']
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysAppHeader',
				dbObject: 'sys_core::SysAppHeader',
				fCreate: addAppHeader,
				fResets: [exprSourceDeleteRecord, []],
				propId: ['name']
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysApp',
				dbObject: 'sys_core::SysApp',
				fCreate: addApp,
				fResets: [
					[exprRefnDeleteRecords, ['sys_user::SysUserTypeResource', 'resource']],
					[exprRefnRemoveSource, ['sys_user::SysUserType', 'resources_sys_app']],
					[exprSourceDeleteRecord, []]
				],
				propId: ['name']
			})
		)

		this.items.push(
			new InitDbItemObject({
				name: 'sysUserType',
				dbObject: 'sys_user::SysUserType',
				fCreate: addUserType,
				fResets: [
					[exprRefnRemoveSource, ['sys_user::SysUser', 'userTypes']],
					[exprSourceDeleteRecord, []]
				],
				propId: ['name']
			})
		)
		this.items.push(
			new InitDbItemBulk({
				name: 'userSystemsBulk',
				dbObject: 'sys_core::SysSystem',
				fCreate: userSystemsBulk,
				fResets: [exprRefnRemoveSource, ['sys_user::SysUser', 'systems']],
				propId: ['name', 1]
			})
		)
		this.items.push(
			new InitDbItemBulk({
				name: 'userUserTypeBulk',
				dbObject: 'sys_user::SysUserType',
				fCreate: userUserTypeBulk,
				fResets: [exprRefnRemoveSource, ['sys_user::SysUser', 'userTypes']],
				propId: ['name', 1]
			})
		)

		/* MOED demo */
		this.items.push(
			new InitDbItem({
				name: 'MoedParticipantsBulk',
				fCreate: MoedParticipantsBulk,
				resetStatements: `DELETE org_moed::MoedParticipant`
			})
		)
		this.items.push(
			new InitDbItem({
				name: 'MoedCsfBulk',
				fCreate: MoedCsfBulk,
				resetStatements: `DELETE app_cm::CmClientServiceFlow FILTER .client IN org_moed::MoedParticipant`
			})
		)
		this.items.push(
			new InitDbItem({
				name: 'MoedCmCsfData',
				resetStatements: 'DELETE app_cm::CmCsfData FILTER .csf.client IN org_moed::MoedParticipant'
			})
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

	async execute() {
		sectionHeader(`InitDB.reset...`)
		// reset
		for (let i: number = this.items.length - 1; i > -1; i--) {
			const item = this.items[i]
			sectionHeader(`RESETTING - ${item.name}`)
			for (let j: number = item.trans.length - 1; j > -1; j--) {
				const trans = item.trans[j]
				const data = getArray(trans[1])
				item.fResets.forEach((reset) => {
					const resetF = reset[0]
					const refn = reset[1]
					resetF(this.reset, item, refn, data)
				})
				item.resetStatements.forEach((stmt) => {
					this.reset.addStatement(stmt)
				})
			}
		}
		debug('types.init.execute', 'reset', this.reset.query)
		await this.reset.execute()
		sectionHeader(`InitDB.reset.complete.`)

		// create
		sectionHeader(`InitDB.create...`)
		for (let i: number = 0; i < this.items.length; i++) {
			const item = this.items[i]
			if (item.fCreate) {
				for (let j: number = 0; j < item.trans.length; j++) {
					const trans = item.trans[j]
					const data = trans[1]
					await item.fCreate(data)
				}
			}
		}
		sectionHeader(`InitDB.reset.complete.`)
	}
}
// type Refn = [dbObject, prop]
// type Reset = [Function, Refn[]]

export class InitDbItem {
	dbObject?: string
	fCreate?: Function
	fResets: Reset[] = []
	name: string
	resetStatements: string[] = []
	trans: [string, any][] = []
	constructor(obj: any) {
		const clazz = 'InitDbItem'
		obj = valueOrDefault(obj, clazz)
		this.dbObject = obj.dbObject
		this.fCreate = obj.fCreate
		this.fResets = getArrayOfArray(obj.fResets)
		this.name = obj.name
		this.resetStatements = getArray(obj.resetStatements)
	}
	addTrans(name: string, data: any) {
		this.trans.push([name, data])
	}
	exprSourceFilter(data: any, prefix: string = '') {}
}

export class InitDbItemBulk extends InitDbItem {
	propId: [string, number][] = []
	constructor(obj: any) {
		const clazz = 'InitDbItemBulk'
		super(obj)
		obj = valueOrDefault(obj, clazz)
		this.propId = getArrayOfArray(obj.propId)
	}
	exprSourceFilter(data: any[], prefix: string = '') {
		let filter = ''
		prefix = prefix ? `${prefix}.` : ''
		this.propId.forEach((p) => {
			if (filter) filter += ' AND '
			filter += `.${prefix}${p[0]} = '${data[p[1]]}'`
		})
		return `FILTER ${filter}`
	}
}

export class InitDbItemObject extends InitDbItem {
	propId: string[] = []
	constructor(obj: any) {
		const clazz = 'InitDbItemObject'
		super(obj)
		obj = valueOrDefault(obj, clazz)
		this.propId = getArrayOfArray(obj.propId)
	}
	exprSourceFilter(data: DataRecord, prefix: string = '') {
		let filter = ''
		prefix = prefix ? `${prefix}.` : ''
		this.propId.forEach((p) => {
			if (filter) filter += ' AND '
			filter += `.${prefix}${p} = '${data[p]}'`
		})
		return `FILTER ${filter}`
	}
}
