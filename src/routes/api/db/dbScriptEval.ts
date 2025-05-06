import { PropDataType } from '$comps/dataObj/types.rawDataObj.svelte'
import {
	debug,
	type DataRecord,
	DataRow,
	getArray,
	getDataRecordKey,
	memberOfEnum,
	MethodResult,
	ParmsValuesType,
	required,
	strRequired,
	User,
	valueOrDefault
} from '$utils/types'
import { TokenApiQueryData } from '$utils/types.token'
import { QuerySource, QuerySourceRaw, QuerySourceType } from '$lib/query/types.query'
import { error } from '@sveltejs/kit'

const FILENAME = '$routes/api/db/dbGel/dbGelGetVal.ts'

export function evalExpr(obj: any): MethodResult {
	const clazz = 'evalExpr'
	obj = valueOrDefault(obj, {})
	const expr = strRequired(obj.expr, clazz, 'expr')
	const evalExprContext = strRequired(obj.evalExprContext, clazz, 'evalExprContext')
	const queryData = valueOrDefault(obj.queryData, new TokenApiQueryData({}))
	const querySource = valueOrDefault(
		obj.querySource,
		new QuerySource(new QuerySourceRaw({ querySourceType: QuerySourceType.expr }))
	)
	let newExpr = expr

	if (newExpr) {
		let result: MethodResult = evalExprTokens({ expr, evalExprContext, queryData, querySource })
		if (result.error) return result
		let tokens: ExprElementToken[] = result.data

		// replace
		tokens.forEach((token) => {
			newExpr = newExpr.replace(token.elRaw, token.valueFormatted)
		})

		// special characters - EdgeDB backlink
		newExpr = newExpr.replace('##', '<')
	}

	return new MethodResult({ data: newExpr })
}

export function evalExprTokens(obj: any) {
	/*
    exprDataItem = <[source],[dataType],[sourceKey]>
    eg. (SELECT sys_user::getUser(<user,str,userName>))
  */
	const clazz = 'evalExprTokens'
	const regex = /<([a-zA-Z].*?)>/g
	obj = valueOrDefault(obj, {})
	const expr = strRequired(obj.expr, clazz, 'expr')
	const evalExprContext = strRequired(obj.evalExprContext, clazz, 'evalExprContext')
	const queryData = valueOrDefault(obj.queryData, new TokenApiQueryData({}))
	const querySource = valueOrDefault(
		obj.querySource,
		new QuerySource(new QuerySourceRaw({ querySourceType: QuerySourceType.expr }))
	)
	let result: MethodResult = evalExprTokensItems(expr, queryData, evalExprContext)
	if (result.error) return result
	const exprElements: ExprElementItem[] = result.data
	let tokens: ExprElementToken[] = []

	exprElements.forEach((item) => {
		const exprParms = new ExprElement({ evalExprContext, expr, item, queryData, querySource })
		let result: MethodResult = item.getToken()
		if (result.error) return result
		tokens.push(result.data)
	})

	return new MethodResult(tokens)
}

function evalExprTokensItems(expr: string, queryData: TokenApiQueryData, evalExprContext: string) {
	const clazz = 'evalExprTokensItems'
	const regex = /<([a-zA-Z].*?)>/g

	let exprItems: ExprElementItem[] = []
	const iter = expr.matchAll(regex)
	for (const match of iter) {
		const elRaw = match[0]
		const elData = match[1]
		const elItems = elData.split(',')
		const elType = elItems[0]

		switch (elType) {
			case ExprElementType.attrsObjAccess:
				break
			case ExprElementType.attrsObjAction:
				exprItems.push(
					new ExprElementItemCustomAttrsObjAction({
						elRaw,
						elItems,
						evalExprContext,
						queryData,
						user: queryData.user
					})
				)
				break

			case ExprElementType.function:
				exprItems.push(
					new ExprElementItemBaseFunction({ elRaw, elItems, evalExprContext, queryData })
				)
				break

			case ExprElementType.literal:
				exprItems.push(
					new ExprElementItemBaseLiteral({ elRaw, elItems, evalExprContext, queryData })
				)
				break

			case ExprElementType.parms:
				exprItems.push(
					new ExprElementItemBaseData({
						data: queryData.getParms(),
						elRaw,
						elItems,
						evalExprContext,
						queryData
					})
				)
				break

			case ExprElementType.record:
				exprItems.push(
					new ExprElementItemBaseData({
						data: queryData.record,
						elRaw,
						elItems,
						evalExprContext,
						queryData
					})
				)
				break

			case ExprElementType.system:
				exprItems.push(
					new ExprElementItemBaseData({
						data: queryData.system,
						elRaw,
						elItems,
						evalExprContext,
						queryData
					})
				)
				break

			case ExprElementType.tree:
				exprItems.push(
					new ExprElementItemBaseTree({
						elRaw,
						elItems,
						evalExprContext,
						queryData
					})
				)
				break

			case ExprElementType.user:
				exprItems.push(
					new ExprElementItemBaseData({
						data: queryData.user,
						elRaw,
						elItems,
						evalExprContext,
						queryData
					})
				)
				break

			default:
			// return new MethodResult({
			// 	success: false,
			// 	error: {
			// 		file: FILENAME,
			// 		function: clazz,
			// 		msg: `No case defined for expression element type: ${elType}.`
			// 	}
			// })
		}
	}
	return new MethodResult(exprItems)
}

export function getValDb(codeDataType: PropDataType, valueRaw: any): MethodResult {
	const clazz = 'getValDb'
	let dataType = ''
	let valueDB: any

	switch (codeDataType) {
		case PropDataType.attribute:
			dataType = 'attribute'
			valueDB = valueRaw ? valueRaw : '{}'
			break

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

		case PropDataType.items:
			dataType = 'items'
			valueDB = valueRaw ? valueRaw : '{}'
			break

		case PropDataType.json:
			dataType = '<json>'
			valueDB = valueRaw ? getValQuoted(JSON.stringify(valueRaw)) : '{}'
			break

		case PropDataType.link:
			dataType = 'link'
			valueDB = valueRaw ? valueRaw : '{}'
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
				success: false,
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

// function getValRaw(exprParms: ExprElement): MethodResult {
// 	const clazz = `${FILENAME}.getValRaw`
// 	const fError = (errMsg: string, data?: any) => {
// 		const errContentSystem = {
// 			errMsg,
// 			context: exprParms.evalExprContext,
// 			item: exprParms.item,
// 			expr: exprParms.expr,
// 			data
// 		}
// 		const errContentUser = {
// 			errMsg,
// 			context: exprParms.evalExprContext
// 		}
// 		debug(clazz, 'error: evalParms', errContentSystem)
// 		return new MethodResult({
// 			success: false,
// 			error: {
// 				file: FILENAME,
// 				function: clazz,
// 				msgSystem: `Error in evalParms: ${JSON.stringify(errContentSystem, null, ' ')}`,
// 				mssgUser: `Error in evalParms: ${JSON.stringify(errContentUser, null, ' ')}`
// 			}
// 		})
// 	}

// 	if (exprParms.item.itemData) {
// 		const sourceKey = strRequired(exprParms.item.itemData.key, `${FILENAME}.getValRaw`, 'sourceKey')
// 		const keyParms = sourceKey.split('.')

// 		switch (exprParms.item.elType) {
// 			case ExprElementType.literal:
// 				if (keyParms.length === 1) {
// 					return new MethodResult(keyParms[0])
// 				} else {
// 					return fError(`QueryData.getValRaw.literal - invalid keyParms: ${keyParms}`)
// 				}
// 			case ExprElementType.parms:
// 				if (keyParms.length === 1) {
// 					return getValue(exprParms.queryData.getParms(), keyParms[0])
// 				} else {
// 					return fError(`QueryData.getValRaw.parms - invalid keyParms: ${keyParms}`)
// 				}
// 			case ExprElementType.record:
// 				if (keyParms.length === 1) {
// 					return getValue(exprParms.queryData.record, keyParms[0])
// 				} else {
// 					return fError(`QueryData.getValRaw.record - invalid keyParms: ${keyParms}`)
// 				}
// 			case ExprElementType.system:
// 				if (keyParms.length === 1) {
// 					return getValue(exprParms.queryData.system, keyParms[0])
// 				} else {
// 					return fError(`QueryData.getValRaw.system - invalid keyParms: ${keyParms}`)
// 				}
// 			case ExprElementType.tree:
// 				let dataRow: DataRow | undefined = undefined
// 				let property = ''
// 				switch (keyParms.length) {
// 					case 1:
// 						property = keyParms[0]
// 						dataRow = exprParms.queryData.dataTree.getDataRow()
// 						break
// 					case 2:
// 						dataRow = exprParms.queryData.dataTree.getDataRow(keyParms[0])
// 						property = keyParms[1]
// 						break

// 					default:
// 						if (keyParms[0] === ParmsValuesType.treeAncestorValue) {
// 							const levels = exprParms.queryData.dataTree.levels.map((level) => level.table)
// 							dataRow = exprParms.queryData.dataTree.getDataRowAncestor(parseInt(keyParms[1]))
// 							property = keyParms.slice(2).join('.')
// 						} else {
// 							return fError(`QueryData.getValRaw.system - invalid keyParms: ${keyParms}`)
// 						}
// 						break
// 				}
// 				return getValue(dataRow?.record, property)
// 			case ExprElementType.user:
// 				return getValue(exprParms.queryData.user, sourceKey)
// 			default:
// 				return fError(`No case defined for source: ${exprParms.item.elType}`)
// 		}
// 	} else if (exprParms.item.itemFunction) {
// 		const itemF = exprParms.item.itemFunction
// 		let value
// 		switch (itemF.type) {
// 			case ExprElementFunction.fSysRandom10:
// 				return new MethodResult(parseInt(Math.random().toFixed(10).replace('0.', '')))
// 			case ExprElementFunction.fSysRate:
// 				if (itemF.parms.length === 2) {
// 					const numerator = itemF.parms[0]
// 					const denominator = parseFloat(itemF.parms[1])
// 					value = Math.round((denominator !== 0 ? parseFloat(numerator) / denominator : 0) * 100)
// 				}
// 				return new MethodResult(value)
// 			case ExprElementFunction.fSysToday:
// 				return new MethodResult(`<cal::local_date>'${new Date().toISOString().slice(0, 10)}'`)
// 		}
// 		return valueNotFound({})
// 	} else {
// 		return new MethodResult({
// 			success: false,
// 			error: {
// 				file: FILENAME,
// 				function: clazz,
// 				msg: `No case defined for exprParms.item...`
// 			}
// 		})
// 	}

// 	function getValue(data: DataRecord | undefined, key: string) {
// 		if (!data) return valueNotFound({})
// 		const result = getValueNested(data, key)
// 		return result ? new MethodResult(result[1]) : valueNotFound(data)
// 	}

// 	function getValueNested(data: DataRecord, key: string) {
// 		const tokens = key.split('.')
// 		let currentData = data
// 		let i = 0
// 		while (i < tokens.length) {
// 			const currKey = getDataRecordKey(currentData, tokens[i])
// 			if (!currKey) return false
// 			if (currentData.hasOwnProperty(currKey)) {
// 				currentData = currentData[currKey]
// 			} else return false
// 			i++
// 		}
// 		return [true, currentData]
// 	}

// 	function valueNotFound(data: DataRecord) {
// 		switch (exprParms.item.elDefault) {
// 			case ExprElementDefault.error:
// 				return fError(`Value null or not found.`, data)
// 			case ExprElementDefault.undefined:
// 				return new MethodResult(undefined)
// 			default:
// 				return new MethodResult({
// 					success: false,
// 					error: {
// 						file: FILENAME,
// 						function: clazz,
// 						msg: `No case defined for exprParms itemDefault: ${exprParms.item.elDefault}`
// 					}
// 				})
// 		}
// 	}
// }

class ExprElement {
	evalExprContext: string
	expr: string
	item: ExprElementItem
	queryData: TokenApiQueryData
	querySource: QuerySource
	constructor(obj: any) {
		const clazz = 'ExprElement'
		obj = valueOrDefault(obj, {})
		this.evalExprContext = strRequired(obj.evalExprContext, clazz, 'evalExprContext')
		this.expr = strRequired(obj.expr, clazz, 'expr')
		this.item = required(obj.item, clazz, 'item')
		this.queryData = required(obj.queryData, clazz, 'queryData')
		this.querySource = required(obj.querySource, clazz, 'querySource')
	}
}

class ExprElementItem {
	elDefault: ExprElementDefault = ExprElementDefault.error
	elItems: string[]
	elRaw: string
	elType: ExprElementType
	evalExprContext: string
	queryData: TokenApiQueryData
	constructor(obj: any) {
		const clazz = 'ExprElementItem'
		obj = valueOrDefault(obj, {})
		this.elItems = required(obj.elItems, clazz, 'elItems')
		this.elRaw = strRequired(obj.elRaw, clazz, 'elRaw')
		this.elType = memberOfEnum(obj.elItems[0], clazz, 'elType', 'ExprElementType', ExprElementType)
		this.evalExprContext = strRequired(obj.evalExprContext, clazz, 'evalExprContext')
		this.queryData = required(obj.queryData, clazz, 'queryData')
	}
	error = (errMsg: string, data?: any) => {
		const clazz = 'ExprElementItem.error'
		const errContentSystem = {
			context: this.evalExprContext,
			data,
			elementRaw: this.elRaw,
			elementType: this.elType,
			errMsg
		}
		const errContentUser = {
			context: this.evalExprContext,
			errMsg
		}
		debug(clazz, 'error: evalElement', errContentSystem)
		return new MethodResult({
			success: false,
			error: {
				file: FILENAME,
				function: clazz,
				msgSystem: `Evaluate expression element error: ${JSON.stringify(errContentSystem, null, ' ')}`,
				mssgUser: `Evaluate expression element error: ${JSON.stringify(errContentUser, null, ' ')}`
			}
		})
	}
	getToken(): MethodResult {
		return new MethodResult()
	}
}

class ExprElementItemBase extends ExprElementItem {
	itemData: ExprParmsItemData = new ExprParmsItemData(PropDataType.none, '')
	constructor(obj: any) {
		const clazz = 'ExprElementItemData'
		obj = valueOrDefault(obj, {})
		super(obj)
		this.itemData = new ExprParmsItemData(this.elItems[1], this.elItems[2])
	}
	getToken(): MethodResult {
		let result: MethodResult = this.getValRaw()
		if (result.error) return result
		let valueRaw = result.data

		result = this.getValDb(valueRaw)
		if (result.error) return result
		const valueDb = result.data

		return new MethodResult(
			new ExprElementToken({
				elRaw: this.elRaw,
				dataType: this.itemData.dataTypeDb || this.itemData.dataTypeProp,
				valueDb,
				valueRaw
			})
		)
	}

	getValDb(valRaw: any): MethodResult {
		let result: MethodResult = getValDb(this.itemData.dataTypeProp, valRaw)
		if (result.error) return result
		this.itemData.setDataTypeDb(result.data.dataType)
		return new MethodResult(result.data.valueDB)
	}
	getValNested(data: DataRecord, key: string) {
		const tokens = key.split('.')
		let currentData = data
		let i = 0
		while (i < tokens.length) {
			const currKey = getDataRecordKey(currentData, tokens[i])
			if (!currKey) return false
			if (currentData.hasOwnProperty(currKey)) {
				currentData = currentData[currKey]
			} else return false
			i++
		}
		return [true, currentData]
	}
	getValRaw(): MethodResult {
		return new MethodResult()
	}
	getValRawValidate(data: DataRecord | undefined, key: string) {
		if (!data) return this.valueNotFound({})
		const result = this.getValNested(data, key)
		return result ? new MethodResult(result[1]) : this.valueNotFound(data)
	}
	valueNotFound(data: DataRecord) {
		const clazz = 'ExprElementItem.valueNotFound'
		switch (this.elDefault) {
			case ExprElementDefault.error:
				return this.error(`Value null or not found.`, data)
			case ExprElementDefault.undefined:
				return new MethodResult(undefined)
			default:
				return new MethodResult({
					success: false,
					error: {
						file: FILENAME,
						function: clazz,
						msg: `No case defined for ExprElementDefault: ${this.elDefault}`
					}
				})
		}
	}
}

class ExprElementItemBaseData extends ExprElementItemBase {
	data: DataRecord
	constructor(obj: any) {
		const clazz = 'ExprElementItemBaseData'
		obj = valueOrDefault(obj, {})
		super(obj)
		this.data = required(obj.data, clazz, 'data')
	}
	getValRaw(): MethodResult {
		if (this.itemData.parms.length === 1) {
			return this.getValRawValidate(this.data, this.itemData.parms[0])
		} else {
			return this.error(`Invalid itemData.parms: ${this.itemData.parms}`)
		}
	}
}

class ExprElementItemBaseFunction extends ExprElementItemBase {
	itemFunction: ExprParmsItemFunction
	constructor(obj: any) {
		const clazz = 'ExprElementItemBaseFunction'
		super(obj)
		this.itemData = new ExprParmsItemData(PropDataType.none, this.elItems[2])
		this.itemFunction = new ExprParmsItemFunction(this.elItems[1], this.elItems.slice(2))
	}
	getValDb(valRaw: any): MethodResult {
		return new MethodResult(valRaw.toString())
	}
	getValRaw(): MethodResult {
		const itemF = this.itemFunction
		let value
		switch (itemF.type) {
			case ExprElementFunction.fSysRandom10:
				return new MethodResult(parseInt(Math.random().toFixed(10).replace('0.', '')))
			case ExprElementFunction.fSysRate:
				if (itemF.parms.length === 2) {
					const numerator = itemF.parms[0]
					const denominator = parseFloat(itemF.parms[1])
					value = Math.round((denominator !== 0 ? parseFloat(numerator) / denominator : 0) * 100)
				}
				return new MethodResult(value)
			case ExprElementFunction.fSysToday:
				return new MethodResult(`<cal::local_date>'${new Date().toISOString().slice(0, 10)}'`)
		}
		return this.valueNotFound({})
	}
	initItemData(dataType: string, parms: string) {
		return new ExprParmsItemData(PropDataType.none, parms)
	}
}

class ExprElementItemBaseLiteral extends ExprElementItemBase {
	constructor(obj: any) {
		const clazz = 'ExprElementItemBaseLiteral'
		super(obj)
	}
	getValRaw(): MethodResult {
		if (this.itemData.parms.length === 1) {
			return new MethodResult(this.itemData.parms[0])
		} else {
			return this.error(`Invalid itemData.parms: ${this.itemData.parms}`)
		}
	}
}
class ExprElementItemBaseTree extends ExprElementItemBase {
	treeParms: string[]
	constructor(obj: any) {
		const clazz = 'ExprElementItemBaseTree'
		super(obj)
		let treeParmsRaw = strRequired(obj.elItems[2], clazz, 'treeParmsRaw')
		this.treeParms = treeParmsRaw.split('.')
	}
	getValRaw(): MethodResult {
		let dataRow: DataRow | undefined = undefined
		let property = ''
		switch (this.treeParms.length) {
			case 1:
				property = this.treeParms[0]
				dataRow = this.queryData.dataTree.getDataRow()
				break
			case 2:
				dataRow = this.queryData.dataTree.getDataRow(this.treeParms[0])
				property = this.treeParms[1]
				break
			default:
				if (this.treeParms[0] === ParmsValuesType.treeAncestorValue) {
					const levels = this.queryData.dataTree.levels.map((level) => level.table)
					dataRow = this.queryData.dataTree.getDataRowAncestor(parseInt(this.treeParms[1]))
					property = this.itemData.parms.slice(2).join('.')
				} else {
					return this.error(`Invalid treeParms: ${this.treeParms}`)
				}
		}
		return this.getValRawValidate(dataRow?.record, property)
	}
}

class ExprElementItemCustom extends ExprElementItem {
	constructor(obj: any) {
		const clazz = 'ExprElementItemCustom'
		obj = valueOrDefault(obj, {})
		super(obj)
	}
}

class ExprElementItemCustomAttrsObjAction extends ExprElementItemCustom {
	user: User
	constructor(obj: any) {
		const clazz = 'ExprElementItemCustomAttrsObjAction'
		obj = valueOrDefault(obj, {})
		super(obj)
		this.user = required(obj.user, clazz, 'data')
	}
	getToken(): MethodResult {
		debug('ExprElementItemCustomAttrsObjAction.getToken', 'user', this.elItems)
		const attrActionType = this.elItems[2]
		let valueDb = this.user.attrsObjAction
			.filter((a) => a.codeAttrActionType === attrActionType)
			.map((a) => `"${a.id}"`)
			.join(',')
		valueDb = `{${valueDb}}`
		return new MethodResult(
			new ExprElementToken({
				elRaw: this.elRaw,
				dataType: '<uuid>',
				valueDb,
				valueRaw: valueDb
			})
		)
	}
}

class ExprParmsItemData {
	dataTypeDb?: string
	dataTypeProp: PropDataType
	parms: string[]
	constructor(dataTypeProp: string, parms: string) {
		const clazz = 'ExprParmsItemData'
		this.dataTypeProp = memberOfEnum(
			dataTypeProp,
			clazz,
			'propDataType',
			'PropDataType',
			PropDataType
		)
		this.parms = parms.split(',')
	}
	setDataTypeDb(dataTypeDb: string) {
		this.dataTypeDb = dataTypeDb
	}
}
class ExprParmsItemFunction {
	parms: string[]
	type: ExprElementFunction
	constructor(type: string, parms: string[]) {
		const clazz = 'ExprParmsItemFunction'
		this.parms = parms
		this.type = memberOfEnum(type, clazz, 'type', 'ExprSourceFunction', ExprElementFunction)
	}
}

enum ExprElementDefault {
	error = 'error',
	undefined = 'undefined'
}

export class ExprElementToken {
	dataType: string
	elRaw: string
	valueDb: any
	valueFormatted: string
	valueRaw: any
	constructor(obj: any) {
		const clazz = 'ExprElementToken'
		obj = valueOrDefault(obj, {})
		this.dataType = strRequired(obj.dataType, clazz, 'dataTypeDb')
		this.elRaw = strRequired(obj.elRaw, clazz, 'elRaw')
		this.valueDb = required(obj.valueDb, clazz, 'valueDB')
		this.valueFormatted =
			this.dataType === PropDataType.none ? this.valueRaw : `${this.dataType}${this.valueDb}`
		this.valueRaw = required(obj.valueRaw, clazz, 'valueRaw')
	}
}

enum ExprElementType {
	attrsObjAccess = 'attrsObjAccess',
	attrsObjAction = 'attrsObjAction',
	function = 'function',
	literal = 'literal',
	parms = 'parms',
	record = 'record',
	system = 'system',
	tree = 'tree',
	user = 'user'
}

enum ExprElementFunction {
	fSysRandom10 = 'fSysRandom10',
	fSysRate = 'fSysRate',
	fSysToday = 'fSysToday'
}
