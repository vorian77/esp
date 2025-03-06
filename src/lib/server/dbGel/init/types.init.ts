import { dbGelQuery } from '$routes/api/dbGel/dbGel'
import { sectionHeader } from '$routes/api/dbGel/dbGel'
import { getDBObjectLinks } from '$routes/api/dbGel/dbGelUtilities'
import { TokenApiId } from '$utils/types.token'
import {
	addDataObj,
	updateDataObjColumnCustomEmbedShellFields
} from '$server/dbGel/init/dbGelInit200Utilities20DataObj'
import { addColumn, tableColumnsBulk } from '$server/dbGel/init/dbGelInit200Utilities30DB'
import { tablesBulk } from '$server/dbGel/init/dbGelInit200Utilities10'
import {
	addDataObjActionGroup,
	addDataObjFieldItems,
	addDataObjFieldEmbedListConfig,
	addDataObjFieldEmbedListEdit,
	addDataObjFieldEmbedListSelect,
	addUserAction
} from '$server/dbGel/init/dbGelInit200Utilities20DataObj'
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
	addUserType,
	updateDepdDataObjColumnItemChange,
	updateDepdNodeChildren
} from '$server/dbGel/init/dbGelInit200Utilities50Other'
import {
	MoedBulkCsf,
	MoedBulkDataDoc,
	MoedBulkDataMsg,
	MoedPBulkPart
} from '$server/dbGel/init/dbGelInit200Utilities60OrgMOED'
import { addAnalytic, addReport } from '$server/dbGel/init/dbGelInit200Utilities40Rep'
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

const FILENAME = '/server/dbGel/init/types.init.ts'
const TokenExprFilterRecord = '<ExprFilterRecord>'

type Link = [string, string]
type Reset = [Function, Link]

export class InitDb {
	isFullDbReset: boolean
	items: InitDbItem[] = []
	reset: ResetDb = new ResetDb()
	constructor(isFullDbReset: boolean = false) {
		this.isFullDbReset = isFullDbReset

		this.items.push(
			new InitDbItemObject({
				name: 'sysCodeType',
				dataMap: 'name',
				deleteObj: 'sys_core::SysCodeType',
				fCreate: addCodeType,
				isResetByTransOnly: true
			})
		)

		this.items.push(
			new InitDbItemObject({
				name: 'sysCode',
				dataMap: [
					['name', 'name'],
					['codeType.name', 'codeType']
				],
				deleteObj: 'sys_core::SysCode',
				fCreate: addCode,
				isResetByTransOnly: true
			})
		)

		this.items.push(
			new InitDbItemObject({
				name: 'sysCodeAction',
				dataMap: [
					['name', 'name'],
					['codeType.name', 'codeType']
				],
				deleteObj: 'sys_core::SysCodeAction',
				fCreate: addCodeAction
			})
		)

		this.items.push(
			new InitDbItemObject({
				name: 'sysColumn',
				dataMap: 'name',
				deleteObj: 'sys_db::SysColumn',
				fCreate: addColumn
			})
		)
		this.items.push(
			new InitDbItemBulk({
				name: 'tablesBulk',
				dataMap: ['.name', 2],
				deleteObj: 'sys_db::SysTable',
				fCreate: tablesBulk
			})
		)
		this.items.push(
			new InitDbItemBulk({
				name: 'tableColumnsBulk',
				dataMap: ['.name', 0],
				deleteObj: 'sys_db::SysTable',
				fCreate: tableColumnsBulk
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysUserAction',
				dataMap: 'name',
				deleteObj: 'sys_user::SysUserAction',
				fCreate: addUserAction
			})
		)

		this.items.push(
			new InitDbItemObject({
				name: 'sysDataObjActionGroup',
				dataMap: 'name',
				deleteObj: 'sys_core::SysDataObjActionGroup',
				fCreate: addDataObjActionGroup
			})
		)

		this.items.push(
			new InitDbItemObject({
				name: 'sysDataObjFieldListItems',
				dataMap: 'name',
				deleteObj: 'sys_core::SysDataObjFieldListItems',
				fCreate: addDataObjFieldItems
			})
		)

		// embed
		this.items.push(
			new InitDbItemObject({
				name: 'sysDataObjEmbed',
				dataMap: 'name',
				deleteObj: 'sys_core::SysDataObj',
				deleteObjFilter: `.codeDataObjType.name = 'embed'`,
				fCreate: addDataObj
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysDataObjFieldEmbedListConfig',
				dataMap: 'name',
				deleteObj: 'sys_core::SysDataObjFieldEmbedListConfig',
				fCreate: addDataObjFieldEmbedListConfig
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysDataObjFieldEmbedListEdit',
				dataMap: 'name',
				deleteObj: 'sys_core::SysDataObjFieldEmbedListEdit',
				fCreate: addDataObjFieldEmbedListEdit
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysDataObjFieldEmbedListSelect',
				dataMap: 'name',
				deleteObj: 'sys_core::SysDataObjFieldEmbedListSelect',
				fCreate: addDataObjFieldEmbedListSelect
			})
		)

		this.items.push(
			new InitDbItemObject({
				name: 'sysDataObjTask',
				dataMap: 'name',
				deleteObj: 'sys_core::SysDataObj',
				deleteObjFilter: `.codeDataObjType.name IN {'taskPage', 'taskTarget'}`,
				fCreate: addDataObj
			})
		)

		this.items.push(
			new InitDbItemObject({
				name: 'sysDataObj',
				dataMap: 'name',
				deleteObj: 'sys_core::SysDataObj',
				deleteObjFilter: `.codeDataObjType.name IN {'default'}`,
				fCreate: addDataObj
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
				name: 'sysNodeObjProgramObj',
				dataMap: 'name',
				deleteObj: 'sys_core::SysNodeObj',
				deleteObjFilter: `.codeNodeType.name = 'program_object' AND .codeNavType.name = 'tree'`,
				fCreate: addNode
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysNodeObjProgram',
				dataMap: 'name',
				deleteObj: 'sys_core::SysNodeObj',
				deleteObjFilter: `.codeNodeType.name = 'program' AND .codeNavType.name = 'tree'`,
				fCreate: addNode
			})
		)

		this.items.push(
			new InitDbItemObject({
				name: 'sysNodeObjTask',
				dataMap: 'name',
				deleteObj: 'sys_core::SysNodeObj',
				deleteObjFilter: `.codeNavType.name = 'task'`,
				fCreate: addNode
			})
		)

		this.items.push(
			new InitDbItemObject({
				altTrans: ['sysDataObj', 'sysDataObjEmbed', 'sysDataObjTask'],
				name: 'sysDataObjColumnItemChange',
				dataMap: 'name',
				deleteObj: 'sys_core::SysDataObjColumnItemChange',
				deleteObjFilter: `.id IN (SELECT sys_core::SysDataObj FILTER ${TokenExprFilterRecord}).columns.itemChanges.id`,
				fCreate: updateDepdDataObjColumnItemChange
			})
		)

		this.items.push(
			new InitDbItemObject({
				altTrans: ['sysNodeObjProgramObj', 'sysNodeObjProgram', 'sysNodeObjTask'],
				name: 'sysNodeObjTaskChildren',
				dataMap: 'name',
				fCreate: updateDepdNodeChildren,
				updateObj: 'sys_core::SysNodeObj',
				updateObjFields: [['children', '{}']]
			})
		)

		this.items.push(
			new InitDbItemObject({
				name: 'sysTask',
				dataMap: 'name',
				deleteObj: 'sys_user::SysTask',
				fCreate: addTask
			})
		)

		this.items.push(
			new InitDbItemObject({
				name: 'sysAnalytic',
				dataMap: 'name',
				deleteObj: 'sys_rep::SysAnalytic',
				fCreate: addAnalytic
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysRep',
				dataMap: 'name',
				deleteObj: 'sys_rep::SysRep',
				fCreate: addReport
			})
		)

		this.items.push(
			new InitDbItemObject({
				name: 'SysObjEntAttr',
				dataMap: [
					['name', 'name'],
					['owner.name', 'owner']
				],
				deleteObj: 'sys_core::SysObjEntAttr',
				fCreate: addObjEntAttr,
				isResetByTransOnly: true,
				updateObj: 'sys_core::ObjRoot',
				updateObjBypassRecordFilter: true,
				updateObjFields: [
					[
						'attributes',
						`.attributes EXCEPT (SELECT sys_core::SysAttr FILTER .obj = (SELECT sys_core::SysObjEntAttr FILTER ${TokenExprFilterRecord}))`
					]
				]
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysAppHeader',
				dataMap: 'name',
				deleteObj: 'sys_user::SysAppHeader',
				fCreate: addAppHeader
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysApp',
				dataMap: 'name',
				deleteObj: 'sys_user::SysApp',
				fCreate: addApp
			})
		)

		this.items.push(
			new InitDbItemObject({
				name: 'sysUserType',
				dataMap: 'name',
				deleteObj: 'sys_user::SysUserType',
				fCreate: addUserType
			})
		)
		this.items.push(
			new InitDbItemObject({
				name: 'sysUser',
				dataMap: 'userName',
				fCreate: addUser
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
				exprResets: `DELETE sys_core::SysMsg FILTER .sender IN org_moed::MoedParticipant.person UNION .recipients IN org_moed::MoedParticipant.person`,
				fCreate: MoedBulkDataMsg
			})
		)
		this.items.push(
			new InitDbItem({
				name: 'MoedBulkCsf',
				exprResets: [
					`DELETE app_cm::CmClientServiceFlow FILTER .client IN org_moed::MoedParticipant`
				],
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
		debug('InitDb', 'execute')
		this.setAltTrans()
		await this.executeReset()
		await this.executeCreate()
	}

	async executeCreate() {
		sectionHeader(`InitDB.create...`, true)
		for (let i: number = 0; i < this.items.length; i++) {
			const item = this.items[i]
			sectionHeader(`${i}. Creating - ${item.name}`, true)
			await this.executCreateItem(item)
		}
		sectionHeader(`InitDB.create.finish.`)
	}

	async executCreateItem(item: InitDbItem) {
		if (item.fCreate) {
			for (let j: number = 0; j < item.trans.length; j++) {
				const trans = item.trans[j]
				const data = trans[1]
				await item.fCreate(data)
			}
		}
	}

	async executeReset() {
		sectionHeader(`InitDB.reset...`, true)
		for (let i: number = this.items.length - 1; i > -1; i--) {
			const item = this.items[i]
			sectionHeader(`${i}. Resetting - ${item.name}: ${item.trans.length} transactions`)

			if (this.isFullDbReset) {
				item.getExprResets(this.reset)

				if (item.isResetByTransOnly) {
					this.executeResetTrans(item, false)
				} else {
					item.addExprReset(this.reset)
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
			const data: DataRecord[] = getArray(trans[1])

			// reset expressions
			if (resetExprResets) item.getExprResets(this.reset)

			// source record
			data.forEach((record) => {
				item.addExprReset(this.reset, record)
			})
		}
	}

	setAltTrans() {
		this.items.forEach((item) => {
			item.altTrans.forEach((altTrans) => {
				const altItem = this.items.find((i) => i.name === altTrans)
				if (altItem) item.trans = [...item.trans, ...altItem.trans]
			})
		})
	}
}

export class InitDbItem {
	altTrans: string[]
	deleteObj?: string
	deleteObjFilter?: string
	exprResets: string[] = []
	fCreate?: Function
	isResetByTransOnly: boolean = false
	name: string
	trans: [string, any][] = []
	updateObj?: string
	updateObjBypassRecordFilter: boolean
	updateObjFields?: [string, string][]
	constructor(obj: any) {
		const clazz = 'InitDbItem'
		obj = valueOrDefault(obj, clazz)
		this.altTrans = getArray(obj.altTrans)
		this.deleteObj = obj.deleteObj
		this.deleteObjFilter = obj.deleteObjFilter
		this.fCreate = obj.fCreate
		this.exprResets = getArray(obj.exprResets)
		this.isResetByTransOnly = booleanOrFalse(obj.isResetByTransOnly)
		this.name = obj.name
		this.updateObj = obj.updateObj
		this.updateObjBypassRecordFilter = valueOrDefault(obj.updateObjBypassRecordFilter, false)
		this.updateObjFields = valueOrDefault(obj.updateObjFields, [])
	}
	addTrans(name: string, data: any) {
		this.trans.push([name, data])
	}

	addExprReset(reset: ResetDb, record: DataRecord | undefined = undefined) {
		reset.addStatement(this.getExprUpdate(record))
		reset.addStatement(this.getExprDelete(record))
	}

	getExprDelete(record: DataRecord | undefined = undefined) {
		let expr = ''
		if (this.deleteObj) {
			expr = `DELETE ${this.deleteObj}`
			const filter = this.getExprFilter({ filterCustom: this.deleteObjFilter, record })
			if (filter) expr += ` ${filter}`
		}
		return expr
	}

	getExprFilter(parms: { filterCustom: string | undefined; record: DataRecord | undefined }) {
		let filter = ''

		if (parms.filterCustom && parms.filterCustom.includes(TokenExprFilterRecord)) {
			if (parms.record) {
				filter = parms.filterCustom.replace(
					TokenExprFilterRecord,
					this.getExprFilterRecord(parms.record)
				)
			}
		} else {
			const filterRecord = this.getExprFilterRecord(parms.record)

			if (filterRecord && parms.filterCustom) {
				filter = `${filterRecord} AND ${parms.filterCustom}`
			} else if (filterRecord) {
				filter = filterRecord
			} else if (parms.filterCustom) {
				filter = parms.filterCustom
			}
		}

		return filter ? `FILTER ${filter}` : ''
	}

	getExprFilterRecord(record: DataRecord | undefined = undefined): string {
		return ''
	}

	getExprResets(reset: ResetDb) {
		this.exprResets.forEach((er) => {
			reset.addStatement(er)
		})
	}

	getExprUpdate(record: DataRecord | undefined = undefined) {
		let expr = ''
		if (this.updateObj && this.updateObjFields && this.updateObjFields.length > 0) {
			expr = `UPDATE ${this.updateObj}`

			// filter
			if (!this.updateObjBypassRecordFilter) {
				const filter = this.getExprFilter({ filterCustom: undefined, record })
				if (filter) expr += ` ${filter}`
			}

			// set
			let exprSet = ''
			this.updateObjFields.forEach((f) => {
				const field = f[0]
				let value = f[1]
				if (value.includes(TokenExprFilterRecord) && record) {
					value = value.replace(TokenExprFilterRecord, this.getExprFilterRecord(record))
				}
				if (exprSet) exprSet += ', '
				exprSet += `${field} := ${value}`
			})
			expr += ` SET { ${exprSet} }`
		}
		return expr
	}
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
	getExprFilterRecord(record: DataRecord | undefined = undefined): string {
		let filter = ''
		if (record) {
			this.dataMap.forEach((map, i) => {
				if (filter) filter += ' AND '
				filter += `${map[0]} = '${record[map[1]]}'`
			})
		}
		return filter
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
	getExprFilterRecord(record: DataRecord | undefined = undefined): string {
		let filter = ''
		if (record) {
			this.dataMap.forEach((map) => {
				if (filter) filter += ' AND '
				filter += `.${map[0]} = '${record[map[1]]}'`
			})
		}
		return filter
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
		if (statement && -1 === this.statements.findIndex((s: string) => s === statement)) {
			this.statements.push(statement)
		}
	}

	async execute() {
		sectionHeader('Execute DB Reset Transaction', true)

		this.statements.forEach((s: string) => {
			this.query += s + ';\n'
		})

		console.log(this.query)

		if (this.query) await dbGelQuery(this.query)
		this.statements = []
		this.query = ''
	}
}
