import { dbEdgeQuery } from '$routes/api/dbEdge/dbEdge'
import { sectionHeader } from '$routes/api/dbEdge/dbEdge'
import { getDBObjectLinks } from '$routes/api/dbEdge/dbEdgeUtilities'
import { TokenApiId, TokenApiIds } from '$utils/types.token'
import {
	addDataObj,
	updateDataObjColumnCustomEmbedShellFields
} from '$server/dbEdge/init/dbEdgeInit200Utilities20DataObj'
import { addColumn, tableColumnsBulk } from '$server/dbEdge/init/dbEdgeInit200Utilities30DB'
import { tablesBulk, widgetsBulk } from '$server/dbEdge/init/dbEdgeInit200Utilities10'
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
	addNode,
	addNodeFooter,
	addTask,
	addUser,
	addUserType,
	addSubjectObj
} from '$server/dbEdge/init/dbEdgeInit200Utilities50Other'
import {
	MoedCsfBulk,
	MoedParticipantsBulk
} from '$server/dbEdge/init/dbEdgeInit200Utilities60OrgMOED'
import { addAnalytic, addReport } from '$server/dbEdge/init/dbEdgeInit200Utilities40Rep'
import { required, valueOrDefault } from '$utils/utils.model'
import {
	arrayOfClasses,
	booleanOrFalse,
	booleanRequired,
	type DataRecord,
	debug,
	getArray,
	memberOfEnum,
	strRequired
} from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/server/dbEdge/init/types.init.ts'

type Link = [string, string]
type Reset = [Function, Link]

export class InitDb {
	isFullDbReset: boolean = false
	items: InitDbItem[] = []
	reset: ResetDb = new ResetDb()
	constructor(isFullDbReset: boolean = false) {
		this.isFullDbReset = isFullDbReset

		this.items.push(
			new InitDbItemObject({
				name: 'sysColumn',
				dataMap: 'name',
				dbObject: 'sys_db::SysColumn',
				fCreate: addColumn
			})
		)
		this.items.push(
			new InitDbItemBulk({
				name: 'tablesBulk',
				dataMap: ['name', 2],
				dbObject: 'sys_db::SysTable',
				fCreate: tablesBulk
			})
		)
		this.items.push(
			new InitDbItemBulk({
				name: 'tableColumnsBulk',
				dataMap: ['name', 0],
				dbObject: 'sys_db::SysTable',
				fCreate: tableColumnsBulk
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysDataObjActionField',
				dataMap: 'name',
				dbObject: 'sys_core::SysDataObjActionField',
				fCreate: addDataObjActionField
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysDataObjActionFieldGroup',
				dataMap: 'name',
				dbObject: 'sys_core::SysDataObjActionFieldGroup',
				fCreate: addDataObjActionFieldGroup
			})
		)

		this.items.push(
			new InitDbItemObject({
				name: 'sysDataObjFieldListItems',
				dataMap: 'name',
				dbObject: 'sys_core::SysDataObjFieldListItems',
				fCreate: addDataObjFieldItems
			})
		)

		// embed
		this.items.push(
			new InitDbItemObject({
				name: 'sysDataObjEmbed',
				dataMap: 'name',
				dbObject: 'sys_core::SysDataObj',
				exprResetFull: `DELETE sys_core::SysDataObj FILTER .codeDataObjType.name = 'embed'`,
				fCreate: addDataObj
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysDataObjFieldEmbedListConfig',
				dataMap: 'name',
				dbObject: 'sys_core::SysDataObjFieldEmbedListConfig',
				fCreate: addDataObjFieldEmbedListConfig
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysDataObjFieldEmbedListEdit',
				dataMap: 'name',
				dbObject: 'sys_core::SysDataObjFieldEmbedListEdit',
				fCreate: addDataObjFieldEmbedListEdit
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysDataObjFieldEmbedListSelect',
				dataMap: 'name',
				dbObject: 'sys_core::SysDataObjFieldEmbedListSelect',
				fCreate: addDataObjFieldEmbedListSelect
			})
		)

		// task
		this.items.push(
			new InitDbItemObject({
				name: 'sysDataObjTask',
				dataMap: 'name',
				dbObject: 'sys_core::SysDataObj',
				exprResetFull: `DELETE sys_core::SysDataObj FILTER .codeDataObjType.name = 'task'`,
				fCreate: addDataObj
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysNodeObjTask',
				dataMap: 'name',
				dbObject: 'sys_core::SysNodeObj',
				exprResetFull: `DELETE sys_core::SysNodeObj FILTER .codeNavType.name = 'task'`,
				fCreate: addNode
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysTask',
				dataMap: 'name',
				dbObject: 'sys_user::SysTask',
				fCreate: addTask
			})
		)

		// dataobj - default
		this.items.push(
			new InitDbItemObject({
				name: 'sysDataObj',
				dataMap: 'name',
				dbObject: 'sys_core::SysDataObj',
				exprResetFull: `DELETE sys_core::SysDataObj FILTER .codeDataObjType.name IN {'default'}`,
				fCreate: addDataObj
			})
		)
		this.items.push(
			new InitDbItem({
				name: 'updateDataObjColumnCustomEmbedShellFields',
				fCreate: updateDataObjColumnCustomEmbedShellFields,
				isExcludeResetByObj: true
			})
		)

		this.items.push(
			new InitDbItemObject({
				name: 'sysAnalytic',
				dataMap: 'name',
				dbObject: 'sys_rep::SysAnalytic',
				fCreate: addAnalytic
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysRep',
				dataMap: 'name',
				dbObject: 'sys_rep::SysRep',
				fCreate: addReport
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysNodeObjFooter',
				dataMap: 'name',
				dbObject: 'sys_core::SysNodeObj',
				exprResetFull: `DELETE sys_core::SysNodeObj FILTER .codeNavType.name = 'footer'`,
				fCreate: addNodeFooter
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysNodeObjProgram',
				dataMap: 'name',
				dbObject: 'sys_core::SysNodeObj',
				exprResetFull: `DELETE sys_core::SysNodeObj FILTER .codeNodeType.name = 'program' AND .codeNavType.name = 'tree'`,
				fCreate: addNode
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysNodeObjProgramObj',
				dataMap: 'name',
				dbObject: 'sys_core::SysNodeObj',
				exprResetFull: `DELETE sys_core::SysNodeObj FILTER .codeNodeType.name = 'program_object' AND .codeNavType.name = 'tree'`,
				fCreate: addNode
			})
		)
		this.items.push(
			new InitDbItemBulk({
				name: 'widgetsBulk',
				dataMap: ['name', 1],
				dbObject: 'sys_user::SysWidget',
				fCreate: widgetsBulk
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysObjSubject',
				dataMap: 'name',
				dbObject: 'sys_core::SysObjSubject',
				fCreate: addSubjectObj
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysAppHeader',
				dataMap: 'name',
				dbObject: 'sys_core::SysAppHeader',
				fCreate: addAppHeader
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysApp',
				dataMap: 'name',
				dbObject: 'sys_core::SysApp',
				fCreate: addApp
			})
		)

		this.items.push(
			new InitDbItemObject({
				name: 'sysUserType',
				dataMap: 'name',
				dbObject: 'sys_user::SysUserType',
				fCreate: addUserType
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysUser',
				dataMap: 'userName',
				dbObject: 'sys_user::SysUser',
				fCreate: addUser,
				isExcludeResetByObj: true
			})
		)

		/* MOED demo */
		this.items.push(
			new InitDbItem({
				name: 'MoedParticipantsBulk',
				exprResets: `DELETE org_moed::MoedParticipant`,
				fCreate: MoedParticipantsBulk,
				isExcludeResetByObj: true
			})
		)
		this.items.push(
			new InitDbItem({
				name: 'MoedCsfBulk',
				exprResets: `DELETE app_cm::CmClientServiceFlow FILTER .client IN org_moed::MoedParticipant`,
				fCreate: MoedCsfBulk,
				isExcludeResetByObj: true
			})
		)
		this.items.push(
			new InitDbItem({
				name: 'MoedCmCsfDataBulk',
				exprResets: 'DELETE app_cm::CmCsfData FILTER .csf.client IN org_moed::MoedParticipant',
				isExcludeResetByObj: true
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
	}

	async executeReset() {
		sectionHeader(`InitDB.reset...`)
		// reset
		for (let i: number = this.items.length - 1; i > -1; i--) {
			const item = this.items[i]
			sectionHeader(`${i}. RESETTING - ${item.name}: ${item.trans.length} transactions`)
			if (this.isFullDbReset) {
				if (item.exprResets.length > 0) {
					item.exprResets.forEach((expr) => {
						this.reset.addStatement(expr)
					})
				}
				if (item.exprResetFull) {
					this.reset.addStatement(item.exprResetFull)
				} else if (item.dbObject && !item.isExcludeResetByObj) {
					this.reset.addStatement(`DELETE ${item.dbObject}`)
				}
			} else {
				for (let j: number = item.trans.length - 1; j > -1; j--) {
					const trans = item.trans[j]
					const data = getArray(trans[1])

					// reset expressions
					item.exprResets.forEach((expr) => {
						this.reset.addStatement(expr)
					})

					// source record
					if (!item.isExcludeResetByObj) {
						data.forEach((row) => {
							this.reset.addStatement(`DELETE ${item.dbObject} ${item.exprSourceFilter(row)}`)
						})
					}
				}
			}
			if (this.reset.statements.length > 0) await this.reset.execute()
		}

		sectionHeader(`InitDB.reset.complete.`)
	}
}
export class InitDbItem {
	dbObject?: string
	exprResetFull?: string
	exprResets: string[] = []
	fCreate?: Function
	isExcludeResetByObj: boolean = false
	name: string
	trans: [string, any][] = []
	constructor(obj: any) {
		const clazz = 'InitDbItem'
		obj = valueOrDefault(obj, clazz)
		this.dbObject = obj.dbObject
		this.fCreate = obj.fCreate
		this.exprResetFull = obj.exprResetFull
		this.exprResets = getArray(obj.exprResets)
		this.isExcludeResetByObj = booleanOrFalse(obj.isExcludeResetByObj, 'isExcludeResetByObj')
		this.name = obj.name
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
	cardinality: PropCardinality
	id: string
	linkObject: string
	linkProp: string
	linkPropType: string
	required: boolean
	constructor(obj: any) {
		const clazz = 'ObjectLink'
		obj = valueOrDefault(obj, {})
		this.cardinality = memberOfEnum(
			obj.cardinality,
			clazz,
			'cardinality',
			'PropCardinality',
			PropCardinality
		)
		strRequired(obj.cardinality, clazz, 'cardinality')
		this.id = strRequired(obj.id, clazz, 'id')
		this.linkObject = strRequired(obj.linkObject, clazz, 'linkObject')
		this.linkProp = strRequired(obj.linkProp, clazz, 'linkProp')
		this.linkPropType = strRequired(obj.linkPropType, clazz, 'linkPropType')
		this.required = booleanRequired(obj.required, clazz, 'required')
	}
}

enum PropCardinality {
	One = 'One',
	Many = 'Many'
}

export class ResetDb {
	query: string = ''
	statements: string[] = []
	constructor() {
		this.query = ''
	}
	addStatement(statement: string) {
		if (-1 === this.statements.findIndex((s: string) => s === statement)) {
			this.statements.push(statement)
		}
	}

	async execute() {
		sectionHeader('Execute DB Reset Transaction')

		this.statements.forEach((s: string) => {
			console.log(s)
			this.query += s + ';\n'
		})

		if (this.query) await dbEdgeQuery(this.query)
		this.statements = []
		this.query = ''
	}
}
