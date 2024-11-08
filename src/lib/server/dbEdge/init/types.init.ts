import { sectionHeader } from '$routes/api/dbEdge/dbEdge'
import { getDBObjectLinks } from '$routes/api/dbEdge/dbEdgeUtilities'
import { TokenApiId, TokenApiIds } from '$utils/types.token'
import {
	addDataObj,
	updateDataObjColumnCustomEmbedShellFields
} from '$server/dbEdge/init/dbEdgeInit200Utilities20DataObj'
import { addColumn, tableColumnsBulk } from '$server/dbEdge/init/dbEdgeInit200Utilities30DB'
import {
	ResetDb,
	tablesBulk,
	userSystemsBulk,
	userUserTypeBulk,
	widgetsBulk
} from '$server/dbEdge/init/dbEdgeInit200Utilities10'
import {
	addDataObjActionField,
	addDataObjActionFieldGroup,
	addDataObjFieldItems,
	addDataObjFieldEmbedListConfig,
	addDataObjFieldEmbedListEdit,
	addDataObjFieldEmbedListSelect
} from '$server/dbEdge/init/dbEdgeInit200Utilities20DataObj'
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
import {
	addAnalytic,
	addReport,
	addReportUser
} from '$server/dbEdge/init/dbEdgeInit200Utilities40Rep'
import { required, valueOrDefault } from '$utils/utils.model'
import {
	arrayOfClasses,
	booleanOrFalse,
	booleanRequired,
	type DataRecord,
	debug,
	getArray,
	strRequired
} from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/server/dbEdge/init/types.init.ts'

type Link = [string, string]
type Reset = [Function, Link]

const getArrayOfArray = (data: any[]) => {
	data = getArray(data)
	if (data.length === 0) return []
	if (Array.isArray(data[0])) return data
	return [data]
}

const exprLinkMulti = (reset: ResetDb, item: InitDbItem, link: Link, data: any[]) => {
	data.forEach((row) => {
		const exprFilterSource = item.exprSourceFilter(row)
		const linkObj = link[0]
		const linkProp = link[1]
		const expr = `UPDATE ${linkObj} ${item.exprSourceFilter(row, linkProp)} SET {${linkProp} := .${linkProp} EXCEPT (SELECT ${item.dbObject} ${exprFilterSource})}`
		reset.addStatement(expr)
	})
}

const exprLinkScalarOptional = (reset: ResetDb, item: InitDbItem, link: Link, data: any[]) => {
	data.forEach((row) => {
		const linkObj = link[0]
		const linkProp = link[1]
		const expr = `UPDATE ${linkObj} ${item.exprSourceFilter(row, linkProp)} SET {${linkProp} := {}}`
		reset.addStatement(expr)
	})
}
const exprLinkScalarRqd = (reset: ResetDb, item: InitDbItem, link: Link, data: any[]) => {
	data.forEach((row) => {
		const linkObj = link[0]
		const linkProp = link[1]
		const expr = `DELETE ${linkObj} ${item.exprSourceFilter(row, linkProp)}`
		reset.addStatement(expr)
	})
}

export class InitDb {
	isFullDbReset: boolean = false
	items: InitDbItem[] = []
	reset: ResetDb = new ResetDb()
	constructor(isFullDbReset: boolean = false) {
		this.isFullDbReset = isFullDbReset
		this.items.push(
			new InitDbItemObject({
				name: 'sysObjSubject',
				dataMap: 'name',
				dbObject: 'sys_core::SysObjSubject',
				fCreate: addSubjectObj,
				fLinks: [
					[exprLinkScalarOptional, ['app_cm::CmClient', 'office']],
					[exprLinkScalarOptional, ['app_cm::CmCsfMsg', 'office']],
					[exprLinkScalarRqd, ['sys_user::SysUserTypeResource', 'resource']]
				]
			})
		)
		this.items.push(
			new InitDbItemBulk({
				name: 'widgetsBulk',
				dataMap: ['name', 1],
				dbObject: 'sys_user::SysWidget',
				fCreate: widgetsBulk,
				fLinks: [[exprLinkScalarRqd, ['sys_user::SysUserTypeResource', 'resource']]]
			})
		)
		this.items.push(
			new InitDbItemBulk({
				name: 'MoedStaffBulk',
				dataMap: [
					['person.firstName', 0],
					['person.lastName', 1]
				],
				dbObject: 'sys_user::SysStaff',
				fCreate: MoedStaffBulk,
				isExcludeDelete: true
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysColumn',
				dataMap: 'name',
				dbObject: 'sys_db::SysColumn',
				fCreate: addColumn,
				fLinks: [
					[exprLinkMulti, ['sys_db::SysTable', 'columns']],
					[exprLinkScalarOptional, ['sys_core::SysDataObj', 'listReorderColumn']],
					[exprLinkScalarOptional, ['sys_core::SysDataObj', 'parentColumn']],
					[exprLinkScalarOptional, ['sys_core::SysDataObjColumn', 'columnBacklink']],
					[exprLinkScalarOptional, ['sys_core::SysDataObjTable', 'columnParent']],
					[exprLinkScalarRqd, ['sys_core::SysDataObjColumn', 'column']],
					[exprLinkScalarRqd, ['sys_core::SysDataObjColumnLink', 'column']],
					[exprLinkScalarRqd, ['sys_migr::SysMigrTargetColumn', 'column']],
					[exprLinkScalarRqd, ['sys_rep::SysRepEl', 'column']]
				]
			})
		)
		this.items.push(
			new InitDbItemBulk({
				name: 'tablesBulk',
				dataMap: ['name', 2],
				dbObject: 'sys_db::SysTable',
				fCreate: tablesBulk,
				fLinks: [
					[exprLinkScalarOptional, ['sys_core::SysDataObj', 'parentTable']],
					[exprLinkScalarOptional, ['sys_core::SysDataObjColumn', 'linkTable']],
					[exprLinkScalarOptional, ['sys_core::SysDataObjFieldListItems', 'table']],
					[exprLinkScalarRqd, ['sys_core::SysDataObjTable', 'table']],
					[exprLinkScalarRqd, ['sys_migr::SysMigrTargetTable', 'table']],
					[exprLinkScalarRqd, ['sys_rep::SysRepParm', 'linkTable']]
				]
			})
		)
		this.items.push(
			new InitDbItemBulk({
				name: 'tableColumnsBulk',
				dataMap: ['name', 0],
				dbObject: 'sys_db::SysTable',
				fCreate: tableColumnsBulk,
				fLinks: [
					[exprLinkScalarOptional, ['sys_core::SysDataObj', 'parentTable']],
					[exprLinkScalarOptional, ['sys_core::SysDataObjColumn', 'linkTable']],
					[exprLinkScalarOptional, ['sys_core::SysDataObjFieldListItems', 'table']],
					[exprLinkScalarRqd, ['sys_core::SysDataObjTable', 'table']],
					[exprLinkScalarRqd, ['sys_migr::SysMigrTargetTable', 'table']],
					[exprLinkScalarRqd, ['sys_rep::SysRepParm', 'linkTable']]
				]
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysDataObjActionField',
				dataMap: 'name',
				dbObject: 'sys_core::SysDataObjActionField',
				fCreate: addDataObjActionField,
				fLinks: [[exprLinkScalarRqd, ['sys_core::SysDataObjActionFieldGroupItem', 'action']]]
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysDataObjActionFieldGroup',
				dataMap: 'name',
				dbObject: 'sys_core::SysDataObjActionFieldGroup',
				fCreate: addDataObjActionFieldGroup,
				fLinks: [
					[exprLinkScalarOptional, ['sys_core::SysDataObj', 'actionFieldGroup']],
					[
						exprLinkScalarRqd,
						['sys_core::SysDataObjFieldEmbedListConfig', 'actionFieldGroupModal']
					],
					[
						exprLinkScalarRqd,
						['sys_core::SysDataObjFieldEmbedListSelect', 'actionFieldGroupModal']
					],
					[exprLinkScalarRqd, ['sys_rep::SysRep', 'actionFieldGroup']]
				]
			})
		)

		this.items.push(
			new InitDbItemObject({
				name: 'sysDataObjFieldListItems',
				dataMap: 'name',
				dbObject: 'sys_core::SysDataObjFieldListItems',
				fCreate: addDataObjFieldItems,
				fLinks: [[exprLinkScalarOptional, ['sys_core::SysDataObjColumn', 'fieldListItems']]]
			})
		)

		this.items.push(
			new InitDbItemObject({
				name: 'sysDataObjEmbed',
				dataMap: 'name',
				dbObject: 'sys_core::SysDataObj',
				fCreate: addDataObj,
				fLinks: [
					[exprLinkScalarOptional, ['sys_core::SysNodeObj', 'dataObj']],
					[exprLinkScalarRqd, ['sys_core::SysDataObjFieldEmbedListConfig', 'dataObjEmbed']],
					[exprLinkScalarRqd, ['sys_core::SysDataObjFieldEmbedListConfig', 'dataObjModal']],
					[exprLinkScalarRqd, ['sys_core::SysDataObjFieldEmbedListEdit', 'dataObjEmbed']],
					[exprLinkScalarRqd, ['sys_core::SysDataObjFieldEmbedListSelect', 'dataObjList']]
				]
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysDataObjFieldEmbedListConfig',
				dataMap: 'name',
				dbObject: 'sys_core::SysDataObjFieldEmbedListConfig',
				fCreate: addDataObjFieldEmbedListConfig,
				fLinks: [[exprLinkScalarOptional, ['sys_core::SysDataObjColumn', 'fieldEmbedListConfig']]]
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysDataObjFieldEmbedListEdit',
				dataMap: 'name',
				dbObject: 'sys_core::SysDataObjFieldEmbedListEdit',
				fCreate: addDataObjFieldEmbedListEdit,
				fLinks: [[exprLinkScalarOptional, ['sys_core::SysDataObjColumn', 'fieldEmbedListEdit']]]
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysDataObjFieldEmbedListSelect',
				dataMap: 'name',
				dbObject: 'sys_core::SysDataObjFieldEmbedListSelect',
				fCreate: addDataObjFieldEmbedListSelect,
				fLinks: [[exprLinkScalarOptional, ['sys_core::SysDataObjColumn', 'fieldEmbedListSelect']]]
			})
		)

		this.items.push(
			new InitDbItemObject({
				name: 'sysDataObj',
				dataMap: 'name',
				dbObject: 'sys_core::SysDataObj',
				fCreate: addDataObj,
				fLinks: [
					[exprLinkScalarOptional, ['sys_core::SysNodeObj', 'dataObj']],
					[exprLinkScalarRqd, ['sys_core::SysDataObjFieldEmbedListConfig', 'dataObjEmbed']],
					[exprLinkScalarRqd, ['sys_core::SysDataObjFieldEmbedListConfig', 'dataObjModal']],
					[exprLinkScalarRqd, ['sys_core::SysDataObjFieldEmbedListEdit', 'dataObjEmbed']],
					[exprLinkScalarRqd, ['sys_core::SysDataObjFieldEmbedListSelect', 'dataObjList']]
				]
			})
		)
		this.items.push(
			new InitDbItem({
				name: 'updateDataObjColumnCustomEmbedShellFields',
				dataMap: 'dataObjName',
				dbObject: 'sys_core::SysDatObj',
				fCreate: updateDataObjColumnCustomEmbedShellFields,
				isExcludeDelete: true
			})
		)

		this.items.push(
			new InitDbItemObject({
				name: 'sysAnalytic',
				dataMap: 'name',
				dbObject: 'sys_rep::SysAnalytic',
				fCreate: addAnalytic,
				fLinks: [
					[exprLinkMulti, ['sys_rep::SysRep', 'analytics']],
					[exprLinkScalarRqd, ['sys_rep::SysRepUserAnalytic', 'analytic']]
				]
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysRep',
				dataMap: 'name',
				dbObject: 'sys_rep::SysRep',
				fCreate: addReport,
				fLinks: [
					[exprLinkScalarRqd, ['sys_rep::SysRepUser', 'report']],
					[exprLinkScalarRqd, ['sys_user::SysUserTypeResource', 'resource']]
				]
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysRepUser',
				dataMap: [
					['report.name', 'report'],
					['user.userName', 'user']
				],
				dbObject: 'sys_rep::SysRepUser',
				fCreate: addReportUser,
				fLinks: []
			})
		)

		this.items.push(
			new InitDbItemObject({
				name: 'sysNodeObjFooter',
				dataMap: 'name',
				dbObject: 'sys_core::SysNodeObj',
				fCreate: addNodeFooter,
				fLinks: [[exprLinkScalarRqd, ['sys_user::SysUserTypeResource', 'resource']]]
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysNodeObjProgram',
				dataMap: 'name',
				dbObject: 'sys_core::SysNodeObj',
				fCreate: addNodeProgram,
				fLinks: [
					[exprLinkMulti, ['sys_core::SysApp', 'nodes']],
					[exprLinkScalarOptional, ['sys_core::SysNodeObj', 'parent']]
				]
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysNodeObjProgramObj',
				dataMap: 'name',
				dbObject: 'sys_core::SysNodeObj',
				fCreate: addNodeProgramObj,
				fLinks: [[exprLinkScalarOptional, ['sys_core::SysNodeObj', 'parent']]]
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysAppHeader',
				dataMap: 'name',
				dbObject: 'sys_core::SysAppHeader',
				fCreate: addAppHeader,
				fLinks: []
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysApp',
				dataMap: 'name',
				dbObject: 'sys_core::SysApp',
				fCreate: addApp,
				fLinks: [[exprLinkScalarRqd, ['sys_user::SysUserTypeResource', 'resource']]]
			})
		)

		this.items.push(
			new InitDbItemObject({
				name: 'sysUserType',
				dataMap: 'name',
				dbObject: 'sys_user::SysUserType',
				fCreate: addUserType,
				fLinks: [[exprLinkMulti, ['sys_user::SysUser', 'userTypes']]]
			})
		)
		this.items.push(
			new InitDbItemBulk({
				name: 'userSystemsBulk',
				dataMap: ['name', 1],
				dbObject: 'sys_core::SysSystem',
				fCreate: userSystemsBulk,
				fLinks: [exprLinkMulti, ['sys_user::SysUser', 'systems']],
				isExcludeDelete: true
			})
		)
		this.items.push(
			new InitDbItemBulk({
				name: 'userUserTypeBulk',
				dataMap: ['name', 1],
				dbObject: 'sys_user::SysUserType',
				fCreate: userUserTypeBulk,
				fLinks: [exprLinkMulti, ['sys_user::SysUser', 'userTypes']]
			})
		)

		/* MOED demo */
		this.items.push(
			new InitDbItem({
				name: 'MoedParticipantsBulk',
				fCreate: MoedParticipantsBulk,
				isExcludeDelete: true,
				resetStatements: `DELETE org_moed::MoedParticipant`
			})
		)
		this.items.push(
			new InitDbItem({
				name: 'MoedCsfBulk',
				fCreate: MoedCsfBulk,
				isExcludeDelete: true,
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
		// await this.executeLinks()
		await this.executeReset()
		await this.executeCreate()
	}

	async executeCreate() {
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

	async executeLinks() {
		sectionHeader(`InitDB.links...`)
		this.items = this.items.filter((item) => item.name === 'sysObjSubject')
		for (let i: number = 0; i < this.items.length; i++) {
			const item = this.items[i]
			if (item instanceof InitDbItemObject && item.dbObject) {
				let links = arrayOfClasses(
					ObjectLink,
					await getDBObjectLinks(new TokenApiId(item.dbObject))
				)
				debug('executeLinks: ' + item.name, 'links', links)
			}
		}

		// const ids: string[] = this.items.filter((item) => item.dbObject).map((item) => item.dbObject)
		// const token = new TokenApiIds(['sys_core::SysDataObj', 'sys_core::SysDataObjColumn'])
	}

	async executeReset() {
		sectionHeader(`InitDB.reset...`)
		// reset
		for (let i: number = this.items.length - 1; i > -1; i--) {
			const item = this.items[i]
			sectionHeader(`RESETTING - ${item.name}: ${item.trans.length} transactions`)
			if (this.isFullDbReset) {
				if (item.dbObject && !item.isExcludeDelete) {
					this.reset.addStatement(`DELETE ${item.dbObject}`)
				}
			} else {
				for (let j: number = item.trans.length - 1; j > -1; j--) {
					const trans = item.trans[j]
					const data = getArray(trans[1])
					item.fLinks.forEach((reset) => {
						const resetF = reset[0]
						const link = reset[1]
						resetF(this.reset, item, link, data)
					})

					// source record
					if (!item.isExcludeDelete) {
						data.forEach((row) => {
							this.reset.addStatement(`DELETE ${item.dbObject} ${item.exprSourceFilter(row)}`)
						})
					}

					item.resetStatements.forEach((stmt) => {
						this.reset.addStatement(stmt)
					})
				}
			}
			if (this.reset.statements.length > 0) await this.reset.execute()
		}

		sectionHeader(`InitDB.reset.complete.`)
	}
}
export class InitDbItem {
	dbObject?: string
	fCreate?: Function
	isExcludeDelete: boolean = false
	fLinks: Reset[] = []
	name: string
	resetStatements: string[] = []
	trans: [string, any][] = []
	constructor(obj: any) {
		const clazz = 'InitDbItem'
		obj = valueOrDefault(obj, clazz)
		this.dbObject = obj.dbObject
		this.fCreate = obj.fCreate
		this.isExcludeDelete = booleanOrFalse(obj.isExcludeDelete, 'isExcludeDelete')
		this.name = obj.name
		this.resetStatements = getArray(obj.resetStatements)
	}
	addTrans(name: string, data: any) {
		this.trans.push([name, data])
	}
	exprSourceFilter(data: any, prefix: string = '') {}
}

class InitDbItemBulk extends InitDbItem {
	dataMap: [string, number][] // [dBObjKey, dataKey]
	constructor(obj: any) {
		const clazz = 'InitDbItemBulk'
		super(obj)
		obj = valueOrDefault(obj, clazz)
		this.dataMap =
			obj.dataMap.length === 2 &&
			typeof obj.dataMap[0] === 'string' &&
			typeof obj.dataMap[1] === 'number'
				? [obj.dataMap]
				: obj.dataMap
	}
	exprSourceFilter(data: any[], prefix: string = '') {
		let filter = ''
		prefix = prefix ? `${prefix}.` : ''
		this.dataMap.forEach((map) => {
			if (filter) filter += ' AND '
			filter += `.${prefix}${map[0]} = '${data[map[1]]}'`
		})
		return `FILTER ${filter}`
	}
}

class InitDbItemObject extends InitDbItem {
	dataMap: [string, string][] // [dBObjKey, dataKey]
	constructor(obj: any) {
		const clazz = 'InitDbItemObject'
		super(obj)
		obj = valueOrDefault(obj, clazz)
		this.dataMap = typeof obj.dataMap === 'string' ? [[obj.dataMap, obj.dataMap]] : obj.dataMap
	}
	exprSourceFilter(data: DataRecord, prefix: string = '') {
		let filter = ''
		prefix = prefix ? `${prefix}.` : ''
		this.dataMap.forEach((map) => {
			if (filter) filter += ' AND '
			filter += `.${prefix}${map[0]} = '${data[map[1]]}'`
		})
		return `FILTER ${filter}`
	}
}

class ObjectLink {
	cardinality: 'One' | 'Many'
	id: string
	linkObject: string
	linkProp: string
	linkPropType: string
	required: boolean
	constructor(obj: any) {
		const clazz = 'ObjectLink'
		obj = valueOrDefault(obj, {})
		this.cardinality = strRequired(obj.cardinality, clazz, 'cardinality')
		this.id = strRequired(obj.id, clazz, 'id')
		this.linkObject = strRequired(obj.linkObject, clazz, 'linkObject')
		this.linkProp = strRequired(obj.linkProp, clazz, 'linkProp')
		this.linkPropType = strRequired(obj.linkPropType, clazz, 'linkPropType')
		this.required = booleanRequired(obj.required, clazz, 'required')
	}
}
