import {
	debug,
	type DataRecord,
	getArray,
	getDataRecordKey,
	getValueData,
	getValueDisplay,
	memberOfEnum,
	MethodResult,
	ObjAttrAction,
	ObjAttrExpr,
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
				`${ExprTokenItemTypeComposite.evalObjAttrMulti}`,
				`.owner.id = <parms,uuid,queryOwnerSys> AND .codeAttrType.name IN <parms,strList,itemsParmValueList>`
			],
			[
				`${ExprTokenItemTypeComposite.evalObjAttrSingle}`,
				`.owner.id = <parms,uuid,queryOwnerSys> AND .codeAttrType.name = <parms,str,itemsParmValue>`
			],
			[`${ExprTokenItemTypeComposite.exprQueryOwnerOrg}`, `.owner.id = <parms,uuid,queryOwnerOrg>`],
			[`${ExprTokenItemTypeComposite.exprQueryOwnerSys}`, `.owner.id = <parms,uuid,queryOwnerSys>`]
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
		if (this.isTokenEnumMember(ExprTokenItemTypeComposite, tokenType)) return true
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

	getValRawValidate(data: DataRecord | undefined, parm: string, isAllowMissing: boolean) {
		if (!data) return this.valueNotFound({})
		const keys = parm.split('.')
		if (keys.length === 0) return new MethodResult(this.valueNotFound(data))
		const result: [boolean, any] = this.getVaRawValidatelNested(data, keys, isAllowMissing)
		if (!result[0]) return this.valueNotFound(data)
		let rawValue = result[1]
		return new MethodResult(rawValue)
	}

	getVaRawValidatelNested(
		data: DataRecord,
		keys: string[],
		isAllowMissing: boolean
	): [boolean, any] {
		let currentData = data
		for (let i = 0; i < keys.length; i++) {
			const currKey = getDataRecordKey(currentData, keys[i])
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

class ExprTokenItemAttrAction extends ExprTokenItem {
	data: DataRecord
	constructor(obj: any) {
		const clazz = 'ExprTokenItemAttrAction'
		obj = valueOrDefault(obj, {})
		super(obj)
		this.data = required(obj.data, clazz, 'data')
	}
	getValRaw(): MethodResult {
		const clazz = 'ExprTokenItemAttrAction.getValRaw'
		const attrAction = strRequired(this.itemValue.parms[0], clazz, 'attrAction')
		const types: string[] = this.itemValue.parms.slice(1)[0].split(';')

		let filterIds = ''
		let filterUser = ''

		for (const type of types) {
			switch (type) {
				case ExprTokenItemAttrActionType.object:
					let ids = this.data.attrsAction
						.filter((a: ObjAttrAction) => a.codeAttrTypeAction === attrAction)
						.reduce((expr: string, action: ObjAttrAction) => {
							if (expr) expr += ','
							return (expr += `"${action.id}"`)
						}, '')
					filterIds = ids ? `<uuid>{${ids}}` : ''
					break

				case ExprTokenItemAttrActionType.user:
					filterUser = `(SELECT sys_user::SysUser FILTER .userTypes.attrsAction.codeAttrTypeAction.name = '${attrAction}').id`
					break

				default:
					return new MethodResult({
						error: {
							file: FILENAME,
							function: clazz,
							msgSystem: `No case defined for ExprTokenItemAttrActionType: ${type} - token: ${this.token.raw}.`,
							msgUser: `Unable to evaluate expression.`
						}
					})
			}
		}

		// actions derived from expressions
		let filterExpr = this.data.attrsExpr
			.filter((a: ObjAttrExpr) => a.codeAttrTypeAction === attrAction)
			.reduce((expr: string, action: ObjAttrExpr) => {
				if (expr) expr += ' UNION '
				return (expr += `(${action.expr})`)
			}, '')
		filterExpr = filterExpr ? `(${filterExpr})` : ''

		let expr = exprUnion(filterIds, filterUser)
		expr = exprUnion(expr, filterExpr)
		expr = expr ? `(${expr})` : '<uuid>{}'

		debug('ExprTokenItemAttrAction.expr', attrAction, expr)

		return new MethodResult(expr)

		function exprUnion(expr1: string, expr2: string): string {
			if (!expr1) return expr2
			if (!expr2) return expr1
			return `${expr1} UNION ${expr2}`
		}
	}
	setItemValue() {
		return new ExprTokenItemValue(PropDataType.none, this.token.parms.slice(0))
	}
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
		let dataRowRecord: DataRecord | undefined = undefined
		let property = ''
		let result: MethodResult
		switch (this.treeParms.length) {
			case 1:
				property = this.treeParms[0]
				result = this.parser.queryData.dataTree.getDataRowRecord(
					TokenApiQueryDataTreeAccessType.index,
					0
				)
				if (result.error) return this.errorMethod(result)
				dataRowRecord = result.data
				break
			case 2:
				result = this.parser.queryData.dataTree.getDataRowRecord(
					TokenApiQueryDataTreeAccessType.table,
					this.treeParms[0]
				)
				if (result.error) return this.errorMethod(result)
				dataRowRecord = result.data
				property = this.treeParms[1]
				break
			default:
				if (this.treeParms[0] === ParmsValuesType.treeAncestorValue) {
					let result: MethodResult
					const accessType = this.treeParms[1]
					const parms = this.treeParms[2]
					result = this.parser.queryData.dataTree.getDataRowRecord(accessType, parms)
					if (result.error) return this.errorMethod(result)
					dataRowRecord = result.data
					property = this.treeParms.slice(3).join('.')
				} else {
					return this.error({ msg: `Invalid treeParms: ${this.treeParms}` })
				}
		}
		return this.getValRawValidate(dataRowRecord, property, false)
	}
}

enum ExprTokenItemType {
	attrsAction = 'attrsAction',
	function = 'function',
	literal = 'literal',
	parms = 'parms',
	record = 'record',
	system = 'system',
	tree = 'tree',
	user = 'user'
}

enum ExprTokenItemTypeComposite {
	evalObjAttrMulti = `evalObjAttrMulti`,
	evalObjAttrSingle = `evalObjAttrSingle`,
	exprQueryOwnerOrg = `exprQueryOwnerOrg`,
	exprQueryOwnerSys = `exprQueryOwnerSys`
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
			dataType = 'link'
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
	return valueRaw ? valueRaw : '00000000-0000-0000-0000-000000000000'
}
function getUUIDQuoted(valueRaw?: string) {
	return getValQuoted(getUUID(valueRaw))
}
function getUUIDValues(valueRaw?: any) {
	let list = getArray(valueRaw)
	list = valueRaw.length > 0 ? list : [getUUID()]

	const rtn = list
		.map((v: string) => {
			return `<uuid>${getUUIDQuoted(v)}`
		})
		.join(',')
	return rtn
}
