import { dbGelQuery } from '$routes/api/db/dbGel/dbGel'
import { sectionHeader } from '$routes/api/db/dbGel/dbGel'
import { getDBObjectLinks } from '$routes/api/db/dbGel/dbGelQueries'
import { TokenApiId } from '$utils/types.token'
import {
	addDataObj,
	updateDataObjColumnCustomElementEmbedShellFields
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
	addObjAttr,
	addCode,
	addCodeAction,
	addCodeType,
	addEligibility,
	addNode,
	addTask,
	addUser,
	addUserType,
	updateDepdDataObjColumnItemChange,
	updateDepdDataObjQueryRider,
	updateDepdGridStylesDataObj,
	updateDepdNavDestinationUserAction,
	updateDepdNodeAction,
	updateDepdNodeChild,
	updateSystemNodesConfig
} from '$server/dbGel/init/dbGelInit200Utilities50Other'
import {
	MoedBulkCsf,
	MoedBulkDataDoc,
	MoedBulkDataMsg,
	MoedPBulkPart,
	MoedBulkDataUser
} from '$server/dbGel/init/dbGelInit200Utilities60OrgMOED'
import { addAnalytic, addReport } from '$server/dbGel/init/dbGelInit200Utilities40Rep'
import { valueOrDefault } from '$utils/utils.model'
import {
	booleanOrFalse,
	booleanRequired,
	type DataRecord,
	debug,
	getArray,
	memberOfEnum,
	strRequired
} from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/server/dbGel/init/types.init.ts'
const TokenExprFilterRecord = '<ExprFilterRecord>'
const isResetOnly = false

type Link = [string, string]
type Reset = [Function, Link]

let itemsExcludeList = [
	'sysCode',
	'sysCodeAction',
	'sysCodeType',
	'sysColumn',
	'sysDataObjActionGroup',
	'sysDataObjFieldListItems',
	'sysUserAction',
	'tableColumnsBulk',
	'tablesBulk'
]

export class InitDb {
	isFullDbReset: boolean
	items: InitDbItem[] = []
	itemsExclude: string[]
	reset: ResetDb = new ResetDb()
	constructor(isFullDbReset: boolean = false) {
		this.isFullDbReset = isFullDbReset
		this.itemsExclude = this.isFullDbReset ? [] : itemsExcludeList

		this.addItem(
			new InitDbItemObject({
				name: 'sysCodeType',
				dataMap: 'name',
				deleteObj: 'sys_core::SysCodeType',
				fCreate: addCodeType,
				isResetByTransOnly: true
			})
		)

		this.addItem(
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

		this.addItem(
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
		this.addItem(
			new InitDbItemObject({
				name: 'sysEligibility',
				dataMap: [['name', 'name']],
				deleteObj: 'sys_core::SysEligibility',
				fCreate: addEligibility
			})
		)
		this.addItem(
			new InitDbItemObject({
				name: 'sysObjAttr',
				dataMap: [
					['codeAttrType.name', 'code'],
					['name', 'name'],
					['ownerSys.name', 'ownerSys']
				],
				deleteObj: 'sys_core::SysObjAttr',
				fCreate: addObjAttr,
				isResetByTransOnly: true
			})
		)

		this.addItem(
			new InitDbItemObject({
				name: 'sysColumn',
				dataMap: 'name',
				deleteObj: 'sys_db::SysColumn',
				fCreate: addColumn
			})
		)
		this.addItem(
			new InitDbItemBulk({
				name: 'tablesBulk',
				dataMap: ['.name', 2],
				deleteObj: 'sys_db::SysTable',
				fCreate: tablesBulk
			})
		)
		this.addItem(
			new InitDbItemBulk({
				name: 'tableColumnsBulk',
				dataMap: ['.name', 0],
				deleteObj: 'sys_db::SysTable',
				fCreate: tableColumnsBulk
			})
		)

		this.addItem(
			new InitDbItemObject({
				name: 'sysUserAction',
				dataMap: 'name',
				deleteObj: 'sys_user::SysUserAction',
				fCreate: addUserAction
			})
		)

		this.addItem(
			new InitDbItemObject({
				name: 'sysDataObjActionGroup',
				dataMap: 'name',
				deleteObj: 'sys_core::SysDataObjActionGroup',
				fCreate: addDataObjActionGroup
			})
		)

		this.addItem(
			new InitDbItemObject({
				name: 'sysDataObjFieldListItems',
				dataMap: 'name',
				deleteObj: 'sys_core::SysDataObjFieldListItems',
				fCreate: addDataObjFieldItems
			})
		)

		// embed
		this.addItem(
			new InitDbItemObject({
				name: 'sysDataObjEmbed',
				dataMap: 'name',
				deleteObj: 'sys_core::SysDataObj',
				deleteObjFilter: `.codeDataObjType.name = 'doEmbed'`,
				fCreate: addDataObj
			})
		)
		this.addItem(
			new InitDbItemObject({
				name: 'sysDataObjFieldEmbedListConfig',
				dataMap: 'name',
				deleteObj: 'sys_core::SysDataObjFieldEmbedListConfig',
				fCreate: addDataObjFieldEmbedListConfig
			})
		)
		this.addItem(
			new InitDbItemObject({
				name: 'sysDataObjFieldEmbedListEdit',
				dataMap: 'name',
				deleteObj: 'sys_core::SysDataObjFieldEmbedListEdit',
				fCreate: addDataObjFieldEmbedListEdit
			})
		)
		this.addItem(
			new InitDbItemObject({
				name: 'sysDataObjFieldEmbedListSelect',
				dataMap: 'name',
				deleteObj: 'sys_core::SysDataObjFieldEmbedListSelect',
				fCreate: addDataObjFieldEmbedListSelect
			})
		)

		this.addItem(
			new InitDbItemObject({
				name: 'sysDataObj',
				dataMap: 'name',
				deleteObj: 'sys_core::SysDataObj',
				deleteObjFilter: `.codeDataObjType.name IN {'doDefault'}`,
				fCreate: addDataObj
			})
		)

		this.addItem(
			new InitDbItem({
				name: 'updateDataObjColumnCustomElementEmbedShellFields',
				fCreate: updateDataObjColumnCustomElementEmbedShellFields
			})
		)

		this.addItem(
			new InitDbItemObject({
				name: 'sysNodeObj',
				dataMap: 'name',
				deleteObj: 'sys_core::SysNodeObj',
				fCreate: addNode
			})
		)

		this.addItem(
			new InitDbItemObject({
				altTrans: ['sysNodeObj'],
				name: 'updateDepdNodeAction',
				dataMap: 'name',
				fCreate: updateDepdNodeAction,
				updateObj: 'sys_core::SysNodeObj',
				updateObjFields: [['actions', '{}']]
			})
		)

		this.addItem(
			new InitDbItemObject({
				altTrans: ['sysNodeObj'],
				name: 'updateDepdNodeChild',
				dataMap: 'name',
				fCreate: updateDepdNodeChild,
				updateObj: 'sys_core::SysNodeObj',
				updateObjFields: [['children', '{}']]
			})
		)

		this.addItem(
			new InitDbItemObject({
				altTrans: ['sysDataObj', 'sysDataObjEmbed'],
				name: 'updateDepdDataObjColumnItemChange',
				dataMap: 'name',
				deleteObj: 'sys_core::SysDataObjColumnItemChange',
				deleteObjFilter: `.id IN (SELECT sys_core::SysDataObj FILTER ${TokenExprFilterRecord}).columns.itemChanges.id`,
				fCreate: updateDepdDataObjColumnItemChange
			})
		)

		this.addItem(
			new InitDbItemObject({
				altTrans: ['sysDataObj', 'sysDataObjEmbed'],
				name: 'updateDepdDataObjQueryRider',
				dataMap: 'name',
				deleteObj: 'sys_core::SysDataObjQueryRider',
				deleteObjFilter: `.id IN (SELECT sys_core::SysDataObj FILTER ${TokenExprFilterRecord}).queryRiders.id`,
				fCreate: updateDepdDataObjQueryRider
			})
		)

		this.addItem(
			new InitDbItemObject({
				altTrans: ['sysDataObj', 'sysDataObjEmbed'],
				name: 'updateDepdGridStylesDataObj',
				dataMap: 'name',
				deleteObj: 'sys_core::SysGridStyle',
				deleteObjFilter: `.id IN (SELECT sys_core::SysDataObj FILTER ${TokenExprFilterRecord}).gridStyles.id`,
				fCreate: updateDepdGridStylesDataObj
			})
		)

		this.addItem(
			new InitDbItemObject({
				altTrans: ['sysUserAction'],
				name: 'updateDepdNavDestinationUserAction',
				dataMap: 'name',
				fCreate: updateDepdNavDestinationUserAction,
				updateObj: 'sys_user::SysUserAction',
				updateObjFields: [['navDestination', '{}']]
			})
		)

		this.addItem(
			new InitDbItemObject({
				altTrans: ['sysSystem'],
				deleteObj: 'sys_core::SysNodeObjConfig',
				deleteObjFilter: `.id IN (SELECT sys_core::SysSystem FILTER ${TokenExprFilterRecord}).nodesConfig.id`,
				name: 'updateSystemNodesConfig',
				dataMap: 'name',
				fCreate: updateSystemNodesConfig
			})
		)

		this.addItem(
			new InitDbItemObject({
				name: 'sysTask',
				dataMap: 'name',
				deleteObj: 'sys_user::SysTask',
				fCreate: addTask
			})
		)

		this.addItem(
			new InitDbItemObject({
				name: 'sysAnalytic',
				dataMap: 'name',
				deleteObj: 'sys_rep::SysAnalytic',
				fCreate: addAnalytic
			})
		)
		this.addItem(
			new InitDbItemObject({
				name: 'sysRep',
				dataMap: 'name',
				deleteObj: 'sys_rep::SysRep',
				fCreate: addReport
			})
		)
		this.addItem(
			new InitDbItemObject({
				name: 'sysAppHeader',
				dataMap: 'name',
				deleteObj: 'sys_user::SysAppHeader',
				fCreate: addAppHeader
			})
		)
		this.addItem(
			new InitDbItemObject({
				name: 'sysApp',
				dataMap: 'name',
				deleteObj: 'sys_user::SysApp',
				fCreate: addApp
			})
		)

		this.addItem(
			new InitDbItemObject({
				name: 'sysUserType',
				dataMap: 'name',
				deleteObj: 'sys_user::SysUserType',
				fCreate: addUserType
			})
		)
		this.addItem(
			new InitDbItemObject({
				name: 'sysUser',
				dataMap: 'name',
				exprResets: `DELETE sys_user::SysUserParm`,
				fCreate: addUser
			})
		)

		/* MOED demo */
		this.addItem(
			new InitDbItem({
				name: 'MoedPBulkPart',
				exprResets: `DELETE org_client_baltimore::MoedParticipant`,
				fCreate: MoedPBulkPart
			})
		)
		this.addItem(
			new InitDbItem({
				name: 'MoedBulkDataUser',
				exprResets: `DELETE sys_user::SysUser FILTER .name LIKE 'MOED%'`,
				fCreate: MoedBulkDataUser
			})
		)
		this.addItem(
			new InitDbItem({
				name: 'MoedBulkDataMsg',
				exprResets: [`DELETE sys_core::SysMsg`],
				fCreate: MoedBulkDataMsg
			})
		)
		this.addItem(
			new InitDbItem({
				name: 'MoedBulkCsf',
				exprResets: [
					`DELETE app_cm::CmClientServiceFlow FILTER .client.ownerSys.name = 'sys_client_baltimore_moed'`
				],
				fCreate: MoedBulkCsf
			})
		)
		this.addItem(
			new InitDbItem({
				name: 'MoedBulkDataDoc',
				exprResets: `DELETE app_cm::CmCsfDocument FILTER .csf.client IN org_client_baltimore::MoedParticipant`,
				fCreate: MoedBulkDataDoc
			})
		)

		this.addItem(
			new InitDbItem({
				name: 'MoedBulkDataDelete',
				exprResets:
					'DELETE app_cm::CmCsfData FILTER .csf.client IN org_client_baltimore::MoedParticipant'
			})
		)
	}

	addItem(item: InitDbItem) {
		if (!this.itemsExclude.includes(item.name)) {
			this.items.push(item)
		}
	}

	addTrans(name: string, data: any) {
		if (!this.itemsExclude.includes(name)) {
			const item = this.items.find((i) => i.name === name)
			if (item) {
				item.addTrans(name, data)
			} else {
				error(500, {
					file: FILENAME,
					function: 'InitDB.addTrans',
					msg: `Unable to find DB initiator: ${name}`
				})
			}
		}
	}

	async execute() {
		debug('InitDb', 'execute')
		this.setAltTrans()
		await this.executeReset()
		if (!isResetOnly) await this.executeCreate()
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
