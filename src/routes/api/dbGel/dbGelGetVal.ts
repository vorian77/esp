import { TokenApiQueryData } from '$utils/types.token'
import { PropDataSourceValue, PropDataType } from '$comps/dataObj/types.rawDataObj.svelte'
import {
	debug,
	type DataRecord,
	DataRow,
	getArray,
	getDataRecordKey,
	getDataRecordValueKey,
	isNumber,
	memberOfEnum,
	ParmsValuesType,
	strRequired
} from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = '$routes/api/dbGel/dbGelGetVal.ts'

export function evalExpr(
	expr: string,
	queryData: TokenApiQueryData,
	context: EvalExprContext | undefined = undefined
): string {
	const clazz = 'evalExpr'
	let newExpr = expr

	if (newExpr) {
		const tokens = evalExprTokens(expr, queryData, context)

		// replace
		tokens.forEach((token) => {
			newExpr = newExpr.replace(token.dataItem, token.valueFormatted)
		})

		// special characters - EdgeDB backlink
		newExpr = newExpr.replace('##', '<')
	}
	return newExpr
}

export class EvalExprContext {
	object: string
	task: string
	constructor(object: string, task: string) {
		this.object = object
		this.task = task
	}
}

export function evalExprTokens(
	expr: string,
	queryData: TokenApiQueryData,
	context: EvalExprContext | undefined = undefined
) {
	/*
		exprDataItem = <[source],[dataType],[sourceKey]>
		eg. (SELECT sys_user::getUser(<user,str,userName>))
	*/
	const clazz = 'evalExprTokens'
	const regex = /<([a-zA-Z].*?)>/g
	let exprItems = evalExprTokensItems(expr)
	let tokens: ExprToken[] = []

	exprItems.forEach((item) => {
		const exprParms = new ExprParms(expr, item, queryData, context)
		let valueRaw = getValRaw(exprParms)

		if (item.itemData) {
			const { dataType, valueDB } = getValDB(item.itemData.codeDataType, valueRaw)
			tokens.push(new ExprToken(item.dataItem, dataType, valueRaw, valueDB))
		} else if (item.itemFunction) {
			tokens.push(new ExprToken(item.dataItem, PropDataType.none, valueRaw, valueRaw.toString()))
		}
	})
	return tokens
}

export function evalExprTokensItems(expr: string) {
	/*
		exprDataItem = <[source],[dataType],[sourceKey]>
		eg. (SELECT sys_user::getUser(<user,str,userName>))
	*/
	const clazz = 'evalExprTokensItems'
	const regex = /<([a-zA-Z].*?)>/g

	let exprItems: ExprParmsItem[] = []
	const iter = expr.matchAll(regex)
	for (const match of iter) {
		const exprDataItem = match[0]
		const exprDataItemContent = match[1]
		const exprDataItemElements = exprDataItemContent.split(',')
		if (exprDataItemElements[0] in ExprSource || exprDataItemElements[0] in ExprSourceFunction) {
			exprItems.push(new ExprParmsItem(exprDataItem, exprDataItemElements))
		}
	}
	return exprItems
}

export function getValDB(codeDataType: PropDataType, valueRaw: any) {
	const clazz = 'getValDB'
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
			error(500, {
				file: FILENAME,
				function: clazz,
				message: `No case defined for dataType: (${codeDataType}).`
			})
	}

	return { dataType, valueDB }
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
export function getUUIDQuoted(valueRaw?: string) {
	return getValQuoted(getUUID(valueRaw))
}
export function getUUIDValues(valueRaw?: any) {
	let list = getArray(valueRaw)
	list = valueRaw.length > 0 ? list : [getUUID()]

	const rtn = list
		.map((v: string) => {
			return `<uuid>${getUUIDQuoted(v)}`
		})
		.join(',')
	return rtn
}

export function getValRaw(exprParms: ExprParms) {
	const clazz = `${FILENAME}.getValRaw`
	const fError = (errMsg: string, data?: any) => {
		const errContent = {
			errMsg,
			context: exprParms.context,
			item: exprParms.item,
			expr: exprParms.expr,
			data
		}
		debug(clazz, 'error: evalParms', errContent)
		error(500, {
			file: FILENAME,
			function: clazz,
			message: JSON.stringify(errContent, null, ' ')
		})
	}

	if (exprParms.item.itemData) {
		const sourceKey = strRequired(exprParms.item.itemData.key, `${FILENAME}.getValRaw`, 'sourceKey')
		const keyParms = exprParms.item.itemData.key.split('.')

		switch (exprParms.item.codeDataSourceExpr) {
			case ExprSource.dataSaveDetail:
				if (exprParms.queryData?.dataTab?.rowsSave && keyParms.length === 1) {
					return exprParms.queryData.dataTab.rowsSave.getDetailRecordValue(keyParms[0])
				} else {
					fError(`QueryData.getValRaw.dataSaveDetail - invalid keyParms: ${keyParms}`)
				}
			case ExprSource.literal:
				if (keyParms.length === 1) {
					return keyParms[0]
				} else {
					fError(`QueryData.getValRaw.literal - invalid keyParms: ${keyParms}`)
				}
			case ExprSource.parms:
				if (keyParms.length === 1) {
					return getValue(exprParms.queryData.getParms(), keyParms[0])
				} else {
					fError(`QueryData.getValRaw.parms - invalid keyParms: ${keyParms}`)
				}
			case ExprSource.record:
				if (keyParms.length === 1) {
					return getValue(exprParms.queryData.record, keyParms[0])
				} else {
					fError(`QueryData.getValRaw.record - invalid keyParms: ${keyParms}`)
				}
			case ExprSource.system:
				if (keyParms.length === 1) {
					return getValue(exprParms.queryData.system, keyParms[0])
				} else {
					fError(`QueryData.getValRaw.system - invalid keyParms: ${keyParms}`)
				}
			case ExprSource.tree:
				let dataRow: DataRow | undefined = undefined
				let property = ''
				switch (keyParms.length) {
					case 1:
						property = keyParms[0]
						dataRow = exprParms.queryData.tree.getDataRow()
						break
					case 2:
						dataRow = exprParms.queryData.tree.getDataRow(keyParms[0])
						property = keyParms[1]
						break

					default:
						if (keyParms[0] === ParmsValuesType.treeAncestorValue) {
							const levels = exprParms.queryData.tree.levels.map((level) => level.table)
							dataRow = exprParms.queryData.tree.getDataRowAncestor(parseInt(keyParms[1]))
							property = keyParms.slice(2).join('.')
							debug('getValRaw.tree', `levels: ${property}`, {
								levelIdx: keyParms[1],
								levels: JSON.stringify(levels),
								dataRow
							})
						} else {
							fError(`QueryData.getValRaw.system - invalid keyParms: ${keyParms}`)
						}
						break
				}
				return getValue(dataRow?.record, property)
			case ExprSource.user:
				return getValue(exprParms.queryData.user, sourceKey)
			default:
				fError(`No case defined for source: ${exprParms.item.codeDataSourceExpr}`)
		}
	} else if (exprParms.item.itemFunction) {
		const itemF = exprParms.item.itemFunction
		let value
		switch (itemF.type) {
			case ExprSourceFunction.fSysRandom10:
				return parseInt(Math.random().toFixed(10).replace('0.', ''))
			case ExprSourceFunction.fSysRate:
				if (itemF.parms.length === 2) {
					const numerator = itemF.parms[0]
					const denominator = parseFloat(itemF.parms[1])
					value = Math.round((denominator !== 0 ? parseFloat(numerator) / denominator : 0) * 100)
				}
				return value
			case ExprSourceFunction.fSysToday:
				return `<cal::local_date>'${new Date().toISOString().slice(0, 10)}'`
		}
		return valueNotFound({})
	}

	function getValue(data: DataRecord | undefined, key: string) {
		if (!data) return valueNotFound({})
		const result = getValueNested(data, key)
		return result ? result[1] : valueNotFound(data)
	}

	function getValueNested(data: DataRecord, key: string) {
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

	function valueNotFound(data: DataRecord) {
		switch (exprParms.item.codeDefault) {
			case ExprDefault.error:
				fError(`Value null or not found.`, data)
			case ExprDefault.undefined:
				return undefined
			default:
				error(500, {
					file: FILENAME,
					function: clazz,
					message: `No case defined for exprParms itemDefault: ${exprParms.item.codeDefault}`
				})
		}
	}
}

export enum ExprDefault {
	error = 'error',
	undefined = 'undefined'
}

class ExprParms {
	context?: EvalExprContext
	expr: string
	item: ExprParmsItem
	queryData: TokenApiQueryData
	constructor(
		expr: string,
		item: ExprParmsItem,
		queryData: TokenApiQueryData,
		context?: EvalExprContext
	) {
		const clazz = 'ExprParms'
		this.context = context
		this.expr = expr
		this.item = item
		this.queryData = queryData
	}
}

export class ExprParmsItem {
	codeDataSourceExpr: ExprSource
	codeDefault: ExprDefault
	dataItem: string
	itemData?: ExprParmsItemData
	itemFunction?: ExprParmsItemFunction
	constructor(dataItem: string, exprItems: string[]) {
		const clazz = 'ExprParmsItem'
		if (exprItems[0] in ExprSource) {
			this.codeDataSourceExpr = memberOfEnum(
				exprItems[0],
				clazz,
				'codeDataSourceExpr',
				'ExprSource',
				ExprSource
			)
			this.codeDefault =
				exprItems.length === 4
					? memberOfEnum(exprItems[3], clazz, 'codeDefault', 'ExprDefault', ExprDefault)
					: ExprDefault.error
			this.dataItem = dataItem
			this.itemData = new ExprParmsItemData(exprItems[1], exprItems[2])
		} else if (exprItems[0] in ExprSourceFunction) {
			this.codeDataSourceExpr = ExprSource.function
			this.dataItem = dataItem
			this.codeDefault = ExprDefault.error
			this.itemFunction = new ExprParmsItemFunction(exprItems[0], exprItems.slice(1))
		} else {
			error(500, {
				file: FILENAME,
				function: clazz,
				message: `No case defined for expr item soource expr: ${exprItems[0]}`
			})
		}
	}
}

export class ExprParmsItemData {
	codeDataType: PropDataType
	key: string
	constructor(codeDataType: string, key: string) {
		const clazz = 'ExprParmsItemData'
		this.codeDataType = memberOfEnum(
			codeDataType,
			clazz,
			'codeDataType',
			'PropDataType',
			PropDataType
		)
		this.key = strRequired(key, clazz, 'key')
	}
}
export class ExprParmsItemFunction {
	parms: string[]
	type: ExprSourceFunction
	constructor(type: string, parms: string[]) {
		const clazz = 'ExprParmsItemFunction'
		this.parms = parms
		this.type = memberOfEnum(type, clazz, 'type', 'ExprSourceFunction', ExprSourceFunction)
	}
}

enum ExprSource {
	dataSaveDetail = 'dataSaveDetail',
	env = 'env',
	function = 'function',
	literal = 'literal',
	parms = 'parms',
	preset = 'preset',
	record = 'record',
	system = 'system',
	tree = 'tree',
	user = 'user',
	userResource = 'userResource'
}

enum ExprSourceFunction {
	fSysRandom10 = 'fSysRandom10',
	fSysRate = 'fSysRate',
	fSysToday = 'fSysToday'
}

export class ExprToken {
	dataItem: string
	dataType: string
	valueRaw: any
	valueDB: any
	valueFormatted: string
	constructor(dataItem: string, dataType: string, valueRaw: any, valueDB: any) {
		this.dataItem = dataItem
		this.dataType = dataType
		this.valueRaw = valueRaw
		this.valueDB = valueDB
		this.valueFormatted = dataType === PropDataType.none ? valueRaw : `${dataType}${valueDB}`
	}
}
