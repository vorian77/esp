import { PropDataType } from '$comps/dataObj/types.rawDataObj.svelte'
import {
	debug,
	type DataRecord,
	DataRow,
	getArray,
	getDataRecordKey,
	getValueData,
	getValueDisplay,
	isNumber,
	memberOfEnum,
	MethodResult,
	MethodResultError,
	ObjAttrAction,
	ObjAttrExpr,
	ParmsValuesType,
	required,
	strRequired,
	User,
	valueOrDefault
} from '$utils/types'
import {
	TokenApiQueryData,
	TokenApiQueryDataTreeAccessType,
	TokenApiQueryDataTreeLevel
} from '$utils/types.token'
import { QuerySource, QuerySourceRaw, QuerySourceType } from '$lib/queryClient/types.queryClient'
import { error } from '@sveltejs/kit'

const FILENAME = '$routes/api/db/dbGel/dbGelGetVal.ts'

export function evalExpr(obj: any): MethodResult {
	const clazz = 'evalExpr'
	obj = valueOrDefault(obj, {})
	let newExpr = strRequired(obj.expr, clazz, 'expr')

	let result: MethodResult = evalExprTokens(obj)
	if (result.error) return result
	const tokens: ExprToken[] = result.data

	// replace tokens with formatted values
	tokens.forEach((token) => {
		let result: MethodResult = token.replace(newExpr)
		if (result.error) return result
		newExpr = result.data
	})

	// special characters - EdgeDB backlink
	newExpr = newExpr.replace('##', '<')

	return new MethodResult(newExpr)
}

export function evalExprTokens(obj: any) {
	const clazz = 'evalExprTokens'
	const regex = /<([a-zA-Z].*?)>/g
	let tokens: ExprToken[] = []

	obj = valueOrDefault(obj, {})
	const evalExprContext = strRequired(obj.evalExprContext, clazz, 'evalExprContext')
	const expr = strRequired(obj.expr, clazz, 'expr')
	const queryData = valueOrDefault(obj.queryData, new TokenApiQueryData({}))
	const querySource = valueOrDefault(
		obj.querySource,
		new QuerySource(new QuerySourceRaw({ querySourceType: QuerySourceType.expr }))
	)

	//  build raw tokens
	const exprTokenRawList = new RawExprTokenList(expr)

	//  build token objects
	exprTokenRawList.tokens.forEach((tokenRaw) => {
		let token = new ExprToken({
			evalExprContext,
			queryData,
			querySource,
			tokenRaw
		})

		let result: MethodResult = token.setReplace()
		if (result.error) return result
		tokens.push(token)
	})

	return new MethodResult(tokens)
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

	return new MethodResult({ dataType, valueDB })
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

export class ExprToken {
	evalExprContext: string
	exprComposite: string
	items: ExprTokenItem[] = []
	queryData: TokenApiQueryData
	querySource: QuerySource
	tokenRaw: RawExprToken
	constructor(obj: any) {
		const clazz = 'ExprToken'
		obj = valueOrDefault(obj, {})
		this.evalExprContext = strRequired(obj.evalExprContext, clazz, 'evalExprContext')
		this.queryData = required(obj.queryData, clazz, 'queryData')
		this.querySource = required(obj.querySource, clazz, 'querySource')
		this.tokenRaw = required(obj.tokenRaw, clazz, 'tokenRaw')

		// derived
		this.exprComposite = this.tokenRaw.token
		this.getItem(this.tokenRaw)
	}

	getItem(exprTokenRaw: RawExprToken) {
		const clazz = 'ExprToken.getItem'
		let exprCompositeItem = [
			[
				`${ExprTokenTypeComposite.evalObjAttrMulti}`,
				`.owner.id = <parms,uuid,queryOwnerSys> AND .codeAttrType.name IN <parms,strList,itemsParmValueList>`
			],
			[
				`${ExprTokenTypeComposite.evalObjAttrSingle}`,
				`.owner.id = <parms,uuid,queryOwnerSys> AND .codeAttrType.name = <parms,str,itemsParmValue>`
			],
			[`${ExprTokenTypeComposite.exprQueryOwnerOrg}`, `.owner.id = <parms,uuid,queryOwnerOrg>`],
			[`${ExprTokenTypeComposite.exprQueryOwnerSys}`, `.owner.id = <parms,uuid,queryOwnerSys>`]
		].find((e: any) => e[0] === exprTokenRaw.tokenType)

		if (exprCompositeItem) {
			this.exprComposite = exprCompositeItem[1]
			const exprTokenRawList = new RawExprTokenList(this.exprComposite)
			exprTokenRawList.tokens.forEach((token) => {
				this.getItem(token)
			})
		} else {
			switch (exprTokenRaw.tokenType) {
				case ExprTokenTypeItem.attrsAction:
					this.items.push(
						new ExprTokenItemAttrAction({
							data: this.queryData.user,
							evalExprContext: this.evalExprContext,
							exprTokenRaw,
							queryData: this.queryData
						})
					)
					break

				case ExprTokenTypeItem.function:
					this.items.push(
						new ExprTokenItemFunction({
							evalExprContext: this.evalExprContext,
							exprTokenRaw,
							queryData: this.queryData
						})
					)
					break

				case ExprTokenTypeItem.literal:
					this.items.push(
						new ExprTokenItemLiteral({
							evalExprContext: this.evalExprContext,
							exprTokenRaw,
							queryData: this.queryData
						})
					)
					break

				case ExprTokenTypeItem.parms:
					this.items.push(
						new ExprTokenItemData({
							data: this.queryData.getParms(),
							evalExprContext: this.evalExprContext,
							exprTokenRaw,
							queryData: this.queryData
						})
					)
					break

				case ExprTokenTypeItem.record:
					this.items.push(
						new ExprTokenItemData({
							data: this.queryData.record,
							evalExprContext: this.evalExprContext,
							exprTokenRaw,
							queryData: this.queryData
						})
					)
					break

				case ExprTokenTypeItem.system:
					this.items.push(
						new ExprTokenItemData({
							data: this.queryData.system,
							evalExprContext: this.evalExprContext,
							exprTokenRaw,
							queryData: this.queryData
						})
					)
					break

				case ExprTokenTypeItem.tree:
					this.items.push(
						new ExprTokenItemTree({
							evalExprContext: this.evalExprContext,
							exprTokenRaw,
							queryData: this.queryData
						})
					)
					break

				case ExprTokenTypeItem.user:
					this.items.push(
						new ExprTokenItemData({
							data: this.queryData.user,
							evalExprContext: this.evalExprContext,
							exprTokenRaw,
							queryData: this.queryData
						})
					)
					break
			}
		}
	}

	replace(expr: string): MethodResult {
		let exprReplace = this.exprComposite
		this.items.forEach((item) => {
			if (item.itemReplace) {
				exprReplace = exprReplace.replace(
					item.exprTokenRaw.token,
					item.itemReplace.getValueFormatted()
				)
			}
		})
		return new MethodResult(expr.replace(this.tokenRaw.token, exprReplace))
	}

	setReplace(): MethodResult {
		let result: MethodResult = new MethodResult()
		this.items.forEach((item) => {
			result = item.setItemReplace()
			if (result.error) return result
		})
		return new MethodResult()
	}
}

class ExprTokenItem {
	elDefault: ExprTokenItemDefault = ExprTokenItemDefault.error
	exprTokenRaw: RawExprToken
	evalExprContext: string
	itemReplace?: ExprTokenItemReplace
	itemValue: ExprTokenItemValue
	queryData: TokenApiQueryData
	constructor(obj: any) {
		const clazz = 'ExprTokenItem'
		obj = valueOrDefault(obj, {})
		this.exprTokenRaw = required(obj.exprTokenRaw, clazz, 'exprTokenRaw')
		this.evalExprContext = strRequired(obj.evalExprContext, clazz, 'evalExprContext')
		this.queryData = required(obj.queryData, clazz, 'queryData')

		// derived
		this.itemValue = this.setItemValue()
	}
	error(messages: DataRecord, data?: any) {
		const clazz = 'ExprElementItem.error'
		const errContentSystem = {
			context: this.evalExprContext,
			data,
			elementRaw: this.exprTokenRaw.token,
			elementType: this.exprTokenRaw.tokenType
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

	getValDb(valRaw: any): MethodResult {
		let result: MethodResult = getValDb(this.itemValue.dataTypeProp, valRaw)
		if (result.error) return result
		this.itemValue.setDataTypeDb(result.data.dataType)
		return new MethodResult(result.data.valueDB)
	}

	getValNested(data: DataRecord, key: string): [boolean, any] {
		const tokens = key.split('.')
		let currentData = data
		let i = 0
		while (i < tokens.length) {
			const currKey = getDataRecordKey(currentData, tokens[i])
			if (!currKey) return [false, undefined]
			if (currentData.hasOwnProperty(currKey)) {
				currentData = currentData[currKey]
			} else return [false, undefined]
			i++
		}
		return [true, currentData]
	}

	getValRaw(): MethodResult {
		return new MethodResult()
	}

	getValRawValidate(data: DataRecord | undefined, key: string) {
		if (!data) return this.valueNotFound({})
		const parms = key.split('.')
		if (parms.length === 0) return new MethodResult(this.valueNotFound(data))
		const result: [boolean, any] = this.getValNested(data, parms[0])
		if (!result[0]) return this.valueNotFound(data)
		let rawValue = result[1]
		if (parms.length === 2) {
			rawValue =
				parms[1] === 'data'
					? getValueData(rawValue)
					: parms[1] === 'display'
						? getValueDisplay(rawValue)
						: result
		}
		return new MethodResult(rawValue)
	}

	setItemReplace(): MethodResult {
		let result: MethodResult = this.getValRaw()
		if (result.error) return result
		let valueRaw = result.data

		result = this.getValDb(valueRaw)
		if (result.error) return result
		const valueDb = result.data

		this.itemReplace = new ExprTokenItemReplace({
			dataType: this.itemValue.dataTypeDb || this.itemValue.dataTypeProp,
			valueDb,
			valueRaw
		})

		return new MethodResult()
	}

	setItemValue() {
		return new ExprTokenItemValue(this.exprTokenRaw.parms[0], this.exprTokenRaw.parms.slice(1))
	}

	valueNotFound(data: DataRecord) {
		const clazz = 'ExprElementItem.valueNotFound'
		switch (this.elDefault) {
			case ExprTokenItemDefault.error:
				return this.error({ msg: `Value null or not found.` }, data)
			case ExprTokenItemDefault.undefined:
				return new MethodResult(undefined)
			default:
				return new MethodResult({
					error: {
						file: FILENAME,
						function: clazz,
						msg: `No case defined for ExprElementDefault: ${this.elDefault}`
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
		const clazz = 'ExprTokenItemAttrExpr.getValRaw'
		const attrAction = strRequired(this.itemValue.parms[0], clazz, 'attrAction')

		// user's actions
		let ids = this.data.attrsAction
			.filter((a: ObjAttrAction) => a.codeAttrTypeAction === attrAction)
			.reduce((expr: string, action: ObjAttrAction) => {
				if (expr) expr += ','
				return (expr += `"${action.id}"`)
			}, '')
		ids = ids ? `<uuid>{${ids}}` : ''

		// actions derived from expressions
		let exprs = this.data.attrsExpr
			.filter((a: ObjAttrExpr) => a.codeAttrTypeAction === attrAction)
			.reduce((expr: string, action: ObjAttrExpr) => {
				if (expr) expr += ' UNION '
				return (expr += `(${action.expr})`)
			}, '')
		exprs = exprs ? `(${exprs})` : ''

		const expr = ids && exprs ? `(${ids} UNION ${exprs})` : ids ? ids : exprs ? exprs : '<uuid>{}'

		return new MethodResult(expr)
	}
	setItemValue() {
		return new ExprTokenItemValue(PropDataType.none, this.exprTokenRaw.parms.slice(0))
	}
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
			return this.getValRawValidate(this.data, this.itemValue.parms[0])
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
		this.functionParms = this.exprTokenRaw.parms.slice(1)
		this.functionType = memberOfEnum(
			obj.exprTokenRaw.parms[0],
			clazz,
			'functionType',
			'ExprTokenItemTypeFunction',
			ExprTokenItemTypeFunction
		)
		this.elDefault = ExprTokenItemDefault.undefined
	}
	getValDb(valRaw: any): MethodResult {
		return new MethodResult(valRaw.toString())
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
		return new ExprTokenItemValue(PropDataType.none, this.exprTokenRaw.parms.slice(1))
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
class ExprTokenItemTree extends ExprTokenItem {
	treeParms: string[]
	constructor(obj: any) {
		const clazz = 'ExprTokenItemTree'
		super(obj)
		this.treeParms = this.exprTokenRaw.parms[1].split('.')
	}
	getValRaw(): MethodResult {
		let dataRowRecord: DataRecord | undefined = undefined
		let property = ''
		let result: MethodResult
		switch (this.treeParms.length) {
			case 1:
				property = this.treeParms[0]
				result = this.queryData.dataTree.getDataRowRecord(TokenApiQueryDataTreeAccessType.index, 0)
				if (result.error) return this.errorMethod(result)
				dataRowRecord = result.data
				break
			case 2:
				result = this.queryData.dataTree.getDataRowRecord(
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

					result = this.queryData.dataTree.getDataRowRecord(accessType, parms)
					if (result.error) return this.errorMethod(result)
					dataRowRecord = result.data
					property = this.treeParms.slice(3).join('.')
				} else {
					return this.error({ msg: `Invalid treeParms: ${this.treeParms}` })
				}
		}
		return this.getValRawValidate(dataRowRecord, property)
	}
}

class ExprTokenItemValue {
	dataTypeDb?: string
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
	setDataTypeDb(dataTypeDb: string) {
		this.dataTypeDb = dataTypeDb
	}
}

enum ExprTokenItemDefault {
	error = 'error',
	undefined = 'undefined'
}

export class ExprTokenItemReplace {
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

enum ExprTokenTypeComposite {
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

enum ExprTokenTypeItem {
	attrsAction = 'attrsAction',
	function = 'function',
	literal = 'literal',
	parms = 'parms',
	record = 'record',
	system = 'system',
	tree = 'tree',
	user = 'user'
}

class RawExprToken {
	parms: string[]
	token: string
	tokenData: string
	tokenType: string
	constructor(obj: any) {
		const clazz = 'RawExprToken'
		obj = valueOrDefault(obj, {})
		this.token = strRequired(obj.token, clazz, 'token')
		this.tokenData = strRequired(obj.tokenData, clazz, 'tokenData')
		this.tokenType = strRequired(obj.tokenType, clazz, 'tokenType')

		// derived
		this.parms = this.tokenData.split(',').slice(1)
	}
}

class RawExprTokenList {
	tokens: RawExprToken[] = []
	constructor(exprRaw: string) {
		const clazz = 'RawExprTokenList'
		const regex = /<([a-zA-Z].*?)>/g
		exprRaw = valueOrDefault(exprRaw, '')
		/*
    exprDataItem = <[source],[dataType],[sourceKey]>
    eg. (SELECT sys_user::getUser(<user,str,name>))
  */
		const iter = exprRaw.matchAll(regex)
		for (const match of iter) {
			const token = match[0]
			const tokenData = match[1]
			const tokenType = tokenData.split(',')[0]
			if (this.isExprTokenType(tokenType)) {
				this.tokens.push(new RawExprToken({ token, tokenData, tokenType }))
			}
		}
	}
	isExprTokenType(tokenType: string) {
		const isExprTokenTypeEnum = (enumObj: any, tokenType: string) => {
			return Object.values(enumObj).includes(tokenType)
		}
		if (isExprTokenTypeEnum(ExprTokenTypeComposite, tokenType)) return true
		if (isExprTokenTypeEnum(ExprTokenItemTypeFunction, tokenType)) return true
		if (isExprTokenTypeEnum(ExprTokenTypeItem, tokenType)) return true
		return false
	}
}
