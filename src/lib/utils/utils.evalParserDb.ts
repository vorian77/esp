import {
	debug,
	type DataRecord,
	EvalExprCustomComposite,
	getArray,
	getStrArrayFromString,
	recordKeyGet,
	isString,
	memberOfEnum,
	MethodResult,
	ObjAttrAction,
	ObjAttrExpr,
	ObjAttrTypeAccess,
	ParmsValuesType,
	PropDataType,
	required,
	strRequired,
	valueOrDefault
} from '$utils/types'
import { TokenApiQueryData, TokenApiQueryDataTreeAccessType } from '$utils/types.token'
import { QuerySource, QuerySourceRaw, QuerySourceType } from '$lib/queryClient/types.queryClient'
import { EvalParser, EvalParserToken, type EvalParserTokenParm } from '$utils/utils.evalParser'
import { error } from '@sveltejs/kit'

const FILENAME = '$routes/api/db/dbScriptEval.ts'

const DB_EDGE_NULL = '00000000-0000-0000-0000-000000000000'

export async function evalExpr(obj: any): Promise<MethodResult> {
	const clazz = 'evalExpr'
	obj = valueOrDefault(obj, {})
	let exprRaw = strRequired(obj.exprRaw, clazz, 'exprRaw')
	const evalExprContext = strRequired(obj.evalExprContext, clazz, 'evalExprContext')
	const queryData = valueOrDefault(obj.queryData, new TokenApiQueryData({}))
	const querySource = valueOrDefault(
		obj.querySource,
		new QuerySource(new QuerySourceRaw({ querySourceType: QuerySourceType.expr }))
	)
	let parser = new EvalParserDb({ evalExprContext, exprRaw, queryData })
	return await parser.getExprAsync()
}

class EvalParserDb extends EvalParser {
	evalExprContext: string
	queryData: TokenApiQueryData
	querySource: QuerySource
	constructor(obj: any) {
		const clazz = 'EvalParserDb'
		obj = valueOrDefault(obj, {})
		super(obj)
		this.evalExprContext = strRequired(obj.evalExprContext, clazz, 'evalExprContext')
		this.queryData = valueOrDefault(obj.queryData, new TokenApiQueryData({}))
		this.querySource = valueOrDefault(
			obj.querySource,
			new QuerySource(new QuerySourceRaw({ querySourceType: QuerySourceType.expr }))
		)
	}

	addToken(parm: EvalParserTokenParm): EvalParserToken {
		return new EvalParserTokenDb(parm)
	}

	async evalTokenAsync(tokenRoot: EvalParserToken): Promise<MethodResult> {
		const clazz = 'EvalParserDb.evalToken'
		const token: EvalParserTokenDb = tokenRoot as EvalParserTokenDb

		let exprCompositeItem = [
			[
				`${EvalExprCustomComposite.evalCustomCompositeObjAttrMulti}`,
				`.ownerSys.id = <parms,uuid,systemIdQuerySource> AND .codeAttrType.name IN <parms,strList,itemsParmValueList>`
			],
			[
				`${EvalExprCustomComposite.evalCustomCompositeObjAttrSingle}`,
				`.ownerSys.id = <parms,uuid,systemIdQuerySource> AND .codeAttrType.name = <parms,str,itemsParmValue>`
			]
		].find((e: any) => e[0] === token.type)

		if (exprCompositeItem) {
			let parser = new EvalParserDb({
				evalExprContext: this.evalExprContext,
				exprRaw: exprCompositeItem[1],
				queryData: this.queryData
			})
			return await parser.getExprAsync()
		} else {
			let result: MethodResult = getItem(this, token)
			if (result.error) return result
			let item: ExprTokenItem = result.data
			result = item.getVal()
			if (result.error) return result
			let value: string = result.data
			return new MethodResult(value)
		}

		function getItem(parser: EvalParserDb, token: EvalParserTokenDb): MethodResult {
			let item: ExprTokenItem | undefined = undefined

			switch (token.type) {
				case ExprTokenItemType.attrsAccess:
					item = new ExprTokenItemAttrAccess({ data: parser.queryData.user, parser, token })
					break

				case ExprTokenItemType.attrsAction:
					item = new ExprTokenItemAttrAction({ data: parser.queryData.user, parser, token })
					break

				case ExprTokenItemType.function:
					item = new ExprTokenItemFunction({ parser, token })
					break

				case ExprTokenItemType.literal:
					item = new ExprTokenItemLiteral({ parser, token })
					break

				case ExprTokenItemType.parms:
					item = new ExprTokenItemParms({ data: parser.queryData.getParms(), parser, token })
					break

				case ExprTokenItemType.parmsFormList:
					item = new ExprTokenItemParms({
						data: parser.queryData.dataTab.parmsFormList.valueGetAll(),
						parser,
						token
					})
					break

				case ExprTokenItemType.record:
					item = new ExprTokenItemData({ data: parser.queryData.record, parser, token })
					break

				case ExprTokenItemType.system:
					item = new ExprTokenItemData({ data: parser.queryData.system, parser, token })
					break

				case ExprTokenItemType.tree:
					item = new ExprTokenItemTree({ parser, token })
					break

				case ExprTokenItemType.user:
					item = new ExprTokenItemData({ data: parser.queryData.user, parser, token })
					break
			}

			if (item) {
				return new MethodResult(item)
			} else {
				return new MethodResult({
					error: {
						file: FILENAME,
						function: 'getItem',
						msg: `No item created for token type: ${token.type}.`
					}
				})
			}
		}
	}

	async getExprAsync(): Promise<MethodResult> {
		let result: MethodResult = await super.getExprAsync()
		if (result.error) return result
		let newExpr: string = result.data

		// special characters - EdgeDB backlink
		newExpr = newExpr.replace('##', '<')

		return new MethodResult(newExpr)
	}

	isToken(tokenContent: string): boolean {
		const tokenType = tokenContent.split(',')[0]
		if (this.isTokenEnumMember(ExprTokenItemType, tokenType)) return true
		if (this.isTokenEnumMember(EvalExprCustomComposite, tokenType)) return true
		if (this.isTokenEnumMember(ExprTokenItemTypeFunction, tokenType)) return true
		return false
	}
}

class EvalParserTokenDb extends EvalParserToken {
	items: ExprTokenItem[] = []
	parms: string[]
	type: string
	constructor(obj: any) {
		const clazz = 'EvalParserTokenDb'
		obj = valueOrDefault(obj, {})
		super(obj)

		// derived
		const contentItems = this.content.split(',')
		this.parms = getArray(contentItems.slice(1))
		this.type = strRequired(contentItems[0], clazz, 'type')
	}
}

export class EvalValue {
	dataTypeDb: string
	value: any
	constructor(dataTypeDb: string, value: any) {
		const clazz = 'EvalValue'
		this.dataTypeDb = dataTypeDb
		this.value = value
	}
	getValueFormatted(): MethodResult {
		return new MethodResult(
			this.dataTypeDb === PropDataType.none ? this.value : `${this.dataTypeDb}${this.value}`
		)
	}
}

class ExprTokenItem {
	itemReplace?: ExprTokenItemReplace
	itemValue: ExprTokenItemValue
	notFoundType: ExprTokenItemValueNotFound = ExprTokenItemValueNotFound.error
	parser: EvalParserDb
	token: EvalParserTokenDb
	constructor(obj: any) {
		const clazz = 'ExprTokenItem'
		obj = valueOrDefault(obj, {})
		this.parser = required(obj.parser, clazz, 'parser')
		this.token = required(obj.token, clazz, 'token')

		// derived
		this.itemValue = this.setItemValue()
	}
	error(messages: DataRecord, data?: any) {
		const clazz = 'ExprElementItem.error'
		const errContentSystem = {
			context: this.parser.evalExprContext,
			data,
			elementRaw: this.token.raw,
			elementType: this.token.type
		}
		let msgSystem = messages.msgSystem || messages.msg || ''
		msgSystem += `\nEvaluate expression element error: ${JSON.stringify(errContentSystem, null, ' ')}`
		const msgUser = messages.msgUser || messages.msg || ''
		debug('ExprTokenItem', 'error', msgSystem)
		return new MethodResult({ error: { file: FILENAME, function: clazz, msgSystem, msgUser } })
	}

	errorMethod(methodResult: MethodResult, data?: any): MethodResult {
		return this.error(
			{ msgSystem: methodResult?.error?.msgSystem, msgUser: methodResult?.error?.msgUser },
			data
		)
	}

	getVal(): MethodResult {
		let result: MethodResult = this.getValRaw()
		if (result.error) return result
		return this.getValFormatted(result.data)
	}

	getValFormatted(valRaw: any): MethodResult {
		let result: MethodResult = getValDb(this.itemValue.dataTypeProp, valRaw)
		if (result.error) return result
		const evalValue: EvalValue = result.data
		return evalValue.getValueFormatted()
	}

	getValRaw(): MethodResult {
		return new MethodResult()
	}

	getValRawValidate(
		data: DataRecord | undefined,
		parm: string,
		isAllowMissing: boolean
	): MethodResult {
		if (!data) return this.valueNotFound({})
		const keys = parm.split('.')
		if (keys.length === 0) return new MethodResult(this.valueNotFound(data))
		const result: [boolean, any] = this.getVaRawValidatelNested(data, keys, isAllowMissing)
		if (!result[0]) return this.valueNotFound(data)
		let rawValue = result[1]
		if (isString(rawValue) && rawValue.startsWith('preset_')) {
			rawValue = DB_EDGE_NULL
		}
		return new MethodResult(rawValue)
	}

	getVaRawValidatelNested(
		data: DataRecord,
		keys: string[],
		isAllowMissing: boolean
	): [boolean, any] {
		let currentData = data
		for (let i = 0; i < keys.length; i++) {
			const currKey = recordKeyGet(currentData, keys[i])
			if (!currKey) return isAllowMissing ? [true, ''] : [false, undefined]
			currentData = currentData[currKey]
		}
		return [true, currentData]
	}

	setItemValue() {
		return new ExprTokenItemValue(this.token.parms[0], this.token.parms.slice(1))
	}

	valueNotFound(data: DataRecord) {
		const clazz = 'ExprTokenItem.valueNotFound'
		switch (this.notFoundType) {
			case ExprTokenItemValueNotFound.error:
				return this.error({ msg: `Value null or not found.` }, data)
			case ExprTokenItemValueNotFound.undefined:
				return new MethodResult(undefined)
			default:
				return new MethodResult({
					error: {
						file: FILENAME,
						function: clazz,
						msg: `No case defined for ExprTokenItemValueNotFound: ${this.notFoundType}`
					}
				})
		}
	}
}

class ExprTokenItemAttrAccess extends ExprTokenItem {
	userData: DataRecord
	constructor(obj: any) {
		const clazz = 'ExprTokenItemAttrAccess'
		obj = valueOrDefault(obj, {})
		super(obj)
		this.userData = required(obj.data, clazz, 'data')
	}

	getValRaw(): MethodResult {
		const clazz = 'ExprTokenItemAttrAccess.getValRaw'

		// table
		const table = strRequired(this.itemValue.parms[0], clazz, 'tableName')

		// attrsAccessIds
		const attrAccessType = strRequired(this.itemValue.parms[1], clazz, 'attrAction')
		const attrsAccessIdsRaw =
			attrAccessType === ObjAttrTypeAccess.allow
				? this.userData.attrsAccessIdAllow
				: attrAccessType === ObjAttrTypeAccess.deny
					? this.userData.attrsAccessIdDeny
					: []
		const attrAccessIds = getStrArrayFromString(attrsAccessIdsRaw)

		// attrNames
		let attrNamesRaw = strRequired(this.itemValue.parms[2], clazz, 'attrNames')
		attrNamesRaw = attrNamesRaw.replace(/^\s*\[(.*)]\s*$/, '$1')
		const attrNames = getStrArrayFromString(attrNamesRaw.split(';'))

		let expr = `(SELECT ${table} FILTER .name IN {${attrNames}} AND .id IN <uuid>{${attrAccessIds}})`

		return new MethodResult(expr)
	}

	setItemValue() {
		return new ExprTokenItemValue(PropDataType.none, this.token.parms.slice(0))
	}
}

class ExprTokenItemAttrAction extends ExprTokenItem {
	userData: DataRecord
	constructor(obj: any) {
		const clazz = 'ExprTokenItemAttrAction'
		obj = valueOrDefault(obj, {})
		super(obj)
		this.userData = required(obj.data, clazz, 'data')
	}

	getValRaw(): MethodResult {
		const clazz = 'ExprTokenItemAttrAction.getValRaw'

		// Parse attrAction string into actionsConfiged
		const parseAttrAction = (attrActionStr: string): ExprTokenItemAttrActionConfigured[] => {
			// Remove surrounding brackets
			const cleanStr = attrActionStr.slice(1, -1).trim()

			// Split into entries using semicolon
			const entries = cleanStr
				.split(';')
				.map((entry) => entry.trim())
				.filter(Boolean)

			const result: ExprTokenItemAttrActionConfigured[] = entries.map((entry) => {
				const parts = entry.split('.').map((part) => part.trim())
				if (parts.length === 2) {
					const [attrAction, typeStr] = parts
					const typeLower = typeStr.toLowerCase()
					let typeEnum: ExprTokenItemAttrActionType

					switch (typeLower) {
						case 'object':
							typeEnum = ExprTokenItemAttrActionType.object
							break
						case 'user':
							typeEnum = ExprTokenItemAttrActionType.user
							break
						default:
							throw new Error(`Unknown type: ${typeStr}`)
					}

					return { attrAction, type: typeEnum }
				}
				// If format unexpectedly doesn't match, return null or throw error
				throw new Error(`Invalid entry format: ${entry}`)
			})

			return result
		}

		// Extract attrAction string
		const attrActionStr = strRequired(this.itemValue.parms[0], clazz, 'attrAction')

		// Parse actions config
		const actionsConfiged = parseAttrAction(attrActionStr)

		// Initialize filters
		let filterIds = ''
		let filterUser = ''
		let filterExpr = ''

		// Process each action configuration
		for (const ac of actionsConfiged) {
			switch (ac.type) {
				case ExprTokenItemAttrActionType.object:
					// Build object IDs filter
					const ids = this.userData.attrsAction
						.filter((a: ObjAttrAction) => a.codeAttrTypeAction === ac.attrAction)
						.reduce((expr: string, action: ObjAttrAction) => {
							if (expr) expr += ','
							return (expr += `"${action.id}"`)
						}, '')
					filterIds = filterIds ? `${filterIds},${ids}` : ids
					break

				case ExprTokenItemAttrActionType.user:
					// Build user filter
					const newFilterUser = `(SELECT sys_user::SysUser FILTER .userTypes.attrsAction.codeAttrTypeAction.name = '${ac.attrAction}').id`
					filterUser = filterUser ? `${filterUser} UNION ${newFilterUser}` : newFilterUser
					break

				default:
					// Handle unknown types
					return new MethodResult({
						error: {
							file: FILENAME,
							function: clazz,
							msgSystem: `No case defined for ExprTokenItemAttrActionConfigured.type: ${ac.type} - token: ${this.token.raw}.`,
							msgUser: `Unable to evaluate expression.`
						}
					})
			}

			// Filter attrsExpr where codeAttrTypeAction matches one of the attrAction names
			const relevantExprs = this.userData.attrsExpr
				.filter((a: ObjAttrAction) => a.codeAttrTypeAction === ac.attrAction)
				.reduce((expr: string, e: ObjAttrExpr) => {
					if (expr) expr += ' UNION '
					return `${expr} (${e.expr})`
				}, '')
			filterExpr = filterExpr ? `${filterExpr} UNION ${relevantExprs}` : relevantExprs
		}

		// Combine all filters
		filterIds = filterIds ? `<uuid>{${filterIds}}` : ''

		let expr = exprUnion(filterIds, filterUser)
		expr = exprUnion(expr, filterExpr)
		expr = expr || '<uuid>{}'

		return new MethodResult(expr)

		// Helper to union expressions
		function exprUnion(expr1: string, expr2: string): string {
			if (!expr1) return expr2
			if (!expr2) return expr1
			return `(${expr1} UNION ${expr2})`
		}
	}

	setItemValue() {
		return new ExprTokenItemValue(PropDataType.none, this.token.parms.slice(0))
	}
}

type ExprTokenItemAttrActionConfigured = {
	attrAction: string
	type: ExprTokenItemAttrActionType
}

enum ExprTokenItemAttrActionType {
	object = 'object',
	user = 'user'
}

class ExprTokenItemData extends ExprTokenItem {
	data: DataRecord
	constructor(obj: any) {
		const clazz = 'ExprTokenItemData'
		obj = valueOrDefault(obj, {})
		super(obj)
		this.data = required(obj.data, clazz, 'data')
	}
	getValRaw(): MethodResult {
		if (this.itemValue.parms.length === 1) {
			return this.getValRawValidate(this.data, this.itemValue.parms[0], false)
		} else {
			return this.error({ msg: `Invalid itemData.parms: ${this.itemValue.parms}` }, this.data)
		}
	}
}

class ExprTokenItemFunction extends ExprTokenItem {
	functionParms: string[]
	functionType: ExprTokenItemTypeFunction
	constructor(obj: any) {
		const clazz = 'ExprTokenItemFunction'
		super(obj)
		this.functionParms = this.token.parms.slice(1)
		this.functionType = memberOfEnum(
			obj.token.parms[0],
			clazz,
			'functionType',
			'ExprTokenItemTypeFunction',
			ExprTokenItemTypeFunction
		)
		this.notFoundType = ExprTokenItemValueNotFound.undefined
	}

	getValRaw(): MethodResult {
		let value
		switch (this.functionType) {
			case ExprTokenItemTypeFunction.fSysRandom10:
				return new MethodResult(parseInt(Math.random().toFixed(10).replace('0.', '')))
			case ExprTokenItemTypeFunction.fSysRate:
				if (this.functionParms.length === 2) {
					const numerator = this.functionParms[0]
					const denominator = parseFloat(this.functionParms[1])
					value = Math.round((denominator !== 0 ? parseFloat(numerator) / denominator : 0) * 100)
				}
				return new MethodResult(value)
			case ExprTokenItemTypeFunction.fSysToday:
				return new MethodResult(`<cal::local_date>'${new Date().toISOString().slice(0, 10)}'`)
		}
	}
	setItemValue() {
		return new ExprTokenItemValue(PropDataType.none, this.token.parms.slice(1))
	}
}

class ExprTokenItemLiteral extends ExprTokenItem {
	constructor(obj: any) {
		const clazz = 'ExprTokenItemLiteral'
		super(obj)
	}
	getValRaw(): MethodResult {
		if (this.itemValue.parms.length === 1) {
			return new MethodResult(this.itemValue.parms[0])
		} else {
			return this.error({ msg: `Invalid itemData.parms: ${this.itemValue.parms}` })
		}
	}
}

class ExprTokenItemParms extends ExprTokenItem {
	data: DataRecord
	constructor(obj: any) {
		const clazz = 'ExprTokenItemParms'
		obj = valueOrDefault(obj, {})
		super(obj)
		this.data = required(obj.data, clazz, 'data')
	}
	getValRaw(): MethodResult {
		if (this.itemValue.parms.length === 1) {
			const key = this.itemValue.parms[0]
			return this.getValRawValidate(this.data, key, true)
		} else {
			return this.error({ msg: `Invalid itemData.parms: ${this.itemValue.parms}` }, this.data)
		}
	}
}

class ExprTokenItemReplace {
	dataType: string
	valueDb: any
	valueRaw: any
	constructor(obj: any) {
		const clazz = 'ExprTokenItemReplace'
		obj = valueOrDefault(obj, {})
		this.dataType = strRequired(obj.dataType, clazz, 'dataTypeDb')
		this.valueDb = required(obj.valueDb, clazz, 'valueDB')
		this.valueRaw = required(obj.valueRaw, clazz, 'valueRaw')
	}
	getValueFormatted() {
		return this.dataType === PropDataType.none ? this.valueRaw : `${this.dataType}${this.valueDb}`
	}
}

class ExprTokenItemTree extends ExprTokenItem {
	treeParms: string[]
	constructor(obj: any) {
		const clazz = 'ExprTokenItemTree'
		super(obj)
		this.treeParms = this.token.parms[1].split('.')
	}
	getValRaw(): MethodResult {
		let property = ''
		let dataType: PropDataType = this.itemValue.dataTypeProp
		switch (this.treeParms.length) {
			case 1:
				// property in bottom level
				property = this.treeParms[0]
				if (property === '[optional]id') {
					property = 'id'
				}
				return this.getValueRawRecord(TokenApiQueryDataTreeAccessType.index, 0, property, dataType)

			case 2:
				const table: string = this.treeParms[0] // table
				property = this.treeParms[1] // table.property
				return this.getValueRawRecord(
					TokenApiQueryDataTreeAccessType.table,
					table,
					property,
					dataType
				)

			default:
				if (this.treeParms[0] === ParmsValuesType.treeAncestorValue) {
					const accessType = this.treeParms[1]
					const parms = this.treeParms[2]
					property = this.treeParms.slice(3).join('.')
					return this.getValueRawRecord(accessType, parms, property, dataType)
				} else {
					return this.error({ msg: `Invalid treeParms: ${this.treeParms}` })
				}
		}
	}

	getValueRawRecord(
		accessType: string = TokenApiQueryDataTreeAccessType.index,
		parm: string | number = 0,
		property: string,
		dataType: PropDataType
	): MethodResult {
		const parseParm = (parm: string | number): ExprTokenItemParm => {
			if (typeof parm === 'string') {
				const match = parm.match(/^\[(.*?)\](.*)$/)
				if (match) {
					const modifier = valueOrDefault(match[1], ExprTokenItemParmModifier.none)
					const value = match[2]
					return { modifier, value }
				}
			}
			return { modifier: ExprTokenItemParmModifier.none, value: parm }
		}

		const parmParsed: ExprTokenItemParm = parseParm(parm)
		let result: MethodResult = this.parser.queryData.dataTree.getDataRow(
			accessType,
			parmParsed.value
		)
		if (result.error) {
			switch (parmParsed.modifier) {
				case ExprTokenItemParmModifier.optional:
					result = getValDb(dataType, undefined)
					if (result.error) return result
					const valueRaw = result.data.value
					return new MethodResult(valueRaw)

				default:
					return result
			}
		} else {
			let dataRowRecord: DataRecord = result.data.record
			return this.getValRawValidate(dataRowRecord, property, false)
		}
	}
}

type ExprTokenItemParm = { modifier: ExprTokenItemParmModifier; value: string | number }

export enum ExprTokenItemParmModifier {
	none = 'none',
	optional = 'optional'
}

enum ExprTokenItemType {
	attrsAccess = 'attrsAccess',
	attrsAction = 'attrsAction',
	function = 'function',
	literal = 'literal',
	parms = 'parms',
	parmsFormList = 'parmsFormList',
	record = 'record',
	system = 'system',
	tree = 'tree',
	user = 'user'
}

enum ExprTokenItemTypeFunction {
	fSysRandom10 = 'fSysRandom10',
	fSysRate = 'fSysRate',
	fSysToday = 'fSysToday'
}

class ExprTokenItemValue {
	dataTypeProp: PropDataType
	parms: string[]
	constructor(dataTypeProp: string, parms: string[]) {
		const clazz = 'ExprTokenItemValue'
		this.dataTypeProp = memberOfEnum(
			dataTypeProp,
			clazz,
			'propDataType',
			'PropDataType',
			PropDataType
		)
		this.parms = parms
	}
}

enum ExprTokenItemValueNotFound {
	error = 'error',
	undefined = 'undefined'
}

export function getValDb(codeDataType: PropDataType, valueRaw: any): MethodResult {
	const clazz = 'getValDb'
	let dataType = ''
	let valueDB: any

	switch (codeDataType) {
		case PropDataType.bool:
			dataType = '<bool>'
			valueDB = [undefined, null].includes(valueRaw) ? false : valueRaw
			break

		case PropDataType.date:
			dataType = '<cal::local_date>'
			valueDB = getValQuoted(valueRaw)
			break

		case PropDataType.datetime:
			dataType = '<datetime>'
			valueDB = `DATETIME(${getValQuoted(valueRaw)})`
			break

		case PropDataType.float64:
			dataType = '<float64>'
			valueDB = valueRaw
			break

		case PropDataType.int16:
			dataType = '<int16>'
			valueDB = valueRaw
			break

		case PropDataType.int32:
			dataType = '<int32>'
			valueDB = valueRaw
			break

		case PropDataType.int64:
			dataType = '<int64>'
			valueDB = valueRaw
			break

		case PropDataType.json:
			dataType = '<json>'
			valueDB = valueRaw ? getValQuoted(JSON.stringify(valueRaw)) : '{}'
			break

		case PropDataType.link:
			dataType = codeDataType
			valueDB = valueRaw ? valueRaw : '{}'
			break

		case PropDataType.none:
			dataType = 'none'
			valueDB = valueRaw
			break

		case PropDataType.str:
			dataType = '<str>'
			valueDB = getValQuoted(valueRaw)
			break

		case PropDataType.strList:
			dataType = '<str>'
			valueDB =
				valueRaw.length > 0
					? `{${getArray(valueRaw).map((v: string) => getValQuoted(v))}}`
					: getValQuoted('')
			if (!valueDB) valueDB = '{}'
			break

		case PropDataType.uuid:
			dataType = '<uuid>'
			valueDB = `${getUUIDQuoted(valueRaw)}`
			break

		case PropDataType.uuidList:
			dataType = '<uuid>'
			valueDB = getArray(valueRaw)
			valueDB =
				valueRaw.length > 0
					? `{${getArray(valueRaw).map((v: string) => getUUIDQuoted(v))}}`
					: getUUIDQuoted('')

			break

		default:
			return new MethodResult({
				error: {
					file: FILENAME,
					function: clazz,
					msg: `No case defined for dataType: (${codeDataType}).`
				}
			})
	}

	return new MethodResult(new EvalValue(dataType, valueDB))
}

function getValQuoted(val: string) {
	return !val ||
		(val.startsWith("'") && val.endsWith("'")) ||
		(val.startsWith('"') && val.endsWith('"'))
		? val
		: `'${val}'`
}

export function getUUID(valueRaw?: string) {
	return valueRaw ? valueRaw : DB_EDGE_NULL
}
function getUUIDQuoted(valueRaw?: string) {
	return getValQuoted(getUUID(valueRaw))
}
