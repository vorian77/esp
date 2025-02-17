import { dbEdgeQuery } from '$routes/api/dbEdge/dbEdge'
import { sectionHeader } from '$routes/api/dbEdge/dbEdge'
import { getDBObjectLinks } from '$routes/api/dbEdge/dbEdgeUtilities'
import { TokenApiId } from '$utils/types.token'
import {
	addDataObj,
	dataObjColumnItemChangeBulk,
	updateDataObjColumnCustomEmbedShellFields
} from '$server/dbEdge/init/dbEdgeInit200Utilities20DataObj'
import { addColumn, tableColumnsBulk } from '$server/dbEdge/init/dbEdgeInit200Utilities30DB'
import { tablesBulk, widgetsBulk } from '$server/dbEdge/init/dbEdgeInit200Utilities10'
import {
	addDataObjActionGroup,
	addDataObjFieldItems,
	addDataObjFieldEmbedListConfig,
	addDataObjFieldEmbedListEdit,
	addDataObjFieldEmbedListSelect,
	addUserAction
} from '$server/dbEdge/init/dbEdgeInit200Utilities20DataObj'
import {
	addApp,
	addAppHeader,
	addObjEntAttr,
	addCode,
	addCodeAction,
	addCodeType,
	addNode,
	addTask,
	addUser,
	addUserType
} from '$server/dbEdge/init/dbEdgeInit200Utilities50Other'
import {
	MoedBulkCsf,
	MoedBulkDataDoc,
	MoedBulkDataMsg,
	MoedPBulkPart
} from '$server/dbEdge/init/dbEdgeInit200Utilities60OrgMOED'
import { addAnalytic, addReport } from '$server/dbEdge/init/dbEdgeInit200Utilities40Rep'
import { required, valueOrDefault } from '$utils/utils.model'
import {
	arrayOfClass,
	booleanOrFalse,
	booleanRequired,
	type DataRecord,
	debug,
	getArray,
	memberOfEnum,
	ResponseBody,
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
				name: 'sysCodeType',
				dataMap: 'name',
				dbObject: 'sys_core::SysCodeType',
				fCreate: addCodeType,
				isResetByObjRecord: true
			})
		)

		this.items.push(
			new InitDbItemObject({
				name: 'sysCode',
				dataMap: [
					['name', 'name'],
					['codeType.name', 'codeType']
				],
				dbObject: 'sys_core::SysCode',
				fCreate: addCode,
				isResetByObjRecord: true
			})
		)

		this.items.push(
			new InitDbItemObject({
				name: 'sysCodeAction',
				dataMap: [
					['name', 'name'],
					['codeType.name', 'codeType']
				],
				dbObject: 'sys_core::SysCodeAction',
				fCreate: addCodeAction
			})
		)

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
				dataMap: [`.name = '[0]'`, 2],
				dbObject: 'sys_db::SysTable',
				fCreate: tablesBulk
			})
		)
		this.items.push(
			new InitDbItemBulk({
				name: 'tableColumnsBulk',
				dataMap: [`.name = '[0]'`, 0],
				dbObject: 'sys_db::SysTable',
				fCreate: tableColumnsBulk
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysUserAction',
				dataMap: 'name',
				dbObject: 'sys_user::SysUserAction',
				fCreate: addUserAction
			})
		)

		this.items.push(
			new InitDbItemObject({
				name: 'sysDataObjActionGroup',
				dataMap: 'name',
				dbObject: 'sys_core::SysDataObjActionGroup',
				fCreate: addDataObjActionGroup
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
				exprResetFull: `DELETE sys_core::SysDataObj FILTER .codeDataObjType.name IN {'taskPage', 'taskTarget'}`,
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
			new InitDbItemBulk({
				name: 'dataObjColumnItemChangeBulk',
				dataMap: [
					`.id IN (SELECT sys_core::SysDataObj FILTER .name = '[0]').columns.itemChanges.id`,
					0
				],
				dbObject: 'sys_core::SysDataObjColumnItemChange',
				fCreate: dataObjColumnItemChangeBulk
			})
		)

		this.items.push(
			new InitDbItem({
				name: 'updateDataObjColumnCustomEmbedShellFields',
				fCreate: updateDataObjColumnCustomEmbedShellFields
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
				dataMap: [`.name = '[0]'`, 1],
				dbObject: 'sys_user::SysWidget',
				fCreate: widgetsBulk
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'SysObjEntAttr',
				dataMap: 'name',
				dbObject: 'sys_core::SysObjEntAttr',
				fCreate: addObjEntAttr
				// isResetByObjRecord: true
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
				name: 'MoedPBulkPart',
				exprResets: `DELETE org_moed::MoedParticipant`,
				fCreate: MoedPBulkPart
			})
		)
		this.items.push(
			new InitDbItem({
				name: 'MoedBulkDataMsg',
				exprResets: `DELETE sys_core::SysMsg`,
				// exprResets: `DELETE sys_core::SysMsg FILTER .sender.person IN org_moed::MoedParticipant.person OR .recipients.person IN org_moed::MoedParticipant.person`,
				fCreate: MoedBulkDataMsg
			})
		)
		this.items.push(
			new InitDbItem({
				name: 'MoedBulkCsf',
				exprResets: `UPDATE default::SysPerson SET {attributes := (SELECT .attributes filter .obj.codeObjType.name != 'attr_moed_office')};
				DELETE app_cm::CmClientServiceFlow FILTER .client IN org_moed::MoedParticipant`,
				fCreate: MoedBulkCsf
			})
		)
		this.items.push(
			new InitDbItem({
				name: 'MoedBulkDataDoc',
				exprResets: `DELETE app_cm::CmCsfDocument FILTER .csf.client IN org_moed::MoedParticipant`,
				fCreate: MoedBulkDataDoc
			})
		)
		this.items.push(
			new InitDbItem({
				name: 'MoedBulkDataDelete',
				exprResets: 'DELETE app_cm::CmCsfData FILTER .csf.client IN org_moed::MoedParticipant'
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
				if (item.isResetByObjRecord) {
					this.executeResetTrans(item, false)
				} else if (item.exprResetFull) {
					this.reset.addStatement(item.exprResetFull)
				} else if (item.dbObject && !item.isExcludeResetByObj) {
					this.reset.addStatement(`DELETE ${item.dbObject}`)
				}
			} else {
				this.executeResetTrans(item, true)
			}
			if (this.reset.statements.length > 0) await this.reset.execute()
		}
		sectionHeader(`InitDB.reset.complete.`)
	}
	async executeResetTrans(item: InitDbItem, resetExprResets: boolean) {
		for (let j: number = item.trans.length - 1; j > -1; j--) {
			const trans = item.trans[j]
			const data = getArray(trans[1])

			// reset expressions
			if (resetExprResets) {
				item.exprResets.forEach((expr) => {
					this.reset.addStatement(expr)
				})
			}

			// source record
			if (item.dbObject && !item.isExcludeResetByObj) {
				data.forEach((row) => {
					this.reset.addStatement(`DELETE ${item.dbObject} ${item.exprSourceFilter(row)}`)
				})
			}
		}
	}
}
export class InitDbItem {
	dbObject?: string
	exprResetFull?: string
	exprResets: string[] = []
	fCreate?: Function
	isExcludeResetByObj: boolean = false
	isResetByObjRecord: boolean = false
	name: string
	trans: [string, any][] = []
	constructor(obj: any) {
		const clazz = 'InitDbItem'
		obj = valueOrDefault(obj, clazz)
		this.dbObject = obj.dbObject
		this.fCreate = obj.fCreate
		this.exprResetFull = obj.exprResetFull
		this.exprResets = getArray(obj.exprResets)
		this.isExcludeResetByObj = booleanOrFalse(obj.isExcludeResetByObj)
		this.isResetByObjRecord = booleanOrFalse(obj.isResetByObjRecord)
		this.name = obj.name
	}
	addTrans(name: string, data: any) {
		this.trans.push([name, data])
	}
	exprSourceFilter(data: any) {}
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
	exprSourceFilter(data: any[]) {
		let filter = ''
		this.dataMap.forEach((map, i) => {
			if (filter) filter += ' AND '
			filter += map[0].replace(`[${i}]`, data[map[1]])
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
	exprSourceFilter(data: DataRecord) {
		let filter = ''
		this.dataMap.forEach((map) => {
			if (filter) filter += ' AND '
			filter += `.${map[0]} = '${data[map[1]]}'`
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
