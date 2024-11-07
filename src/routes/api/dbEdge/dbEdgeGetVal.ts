import { TokenApiQueryData } from '$utils/types.token'
import { PropDataSourceValue, PropDataType } from '$comps/dataObj/types.rawDataObj'
import { debug, type DataRecord, getArray, memberOfEnum, strRequired } from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = '$routes/api/dbEdge/dbEdgeGetVal.ts'

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
	let exprItems: ExprParmsItem[] = evalExprTokensItems(expr)
	let tokens: ExprToken[] = []

	exprItems.forEach((item) => {
		const exprParms = new ExprParms(expr, item, queryData, context)
		const valueRaw = getValRaw(exprParms)
		const { dataType, valueDB } = getValDB(exprParms.item.codeDataType, valueRaw)
		tokens.push(new ExprToken(item.dataItem, dataType, valueRaw, valueDB))
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
		if (exprDataItemElements.length === 3) {
			exprItems.push(new ExprParmsItem(exprDataItem, exprDataItemElements))
		}
	}
	return exprItems
}

export function getValDB(codeDataType: PropDataType, valueRaw: any) {
	const clazz = 'getValDB'
	let dataType = ''
	let valueDB: any

	if (codeDataType === PropDataType.json) {
		dataType = '<json>'
		valueDB = valueRaw ? getValQuoted(JSON.stringify(valueRaw)) : '{}'
	} else if (codeDataType === PropDataType.uuid) {
		dataType = '<uuid>'
		valueDB = `${getUUIDQuoted(valueRaw)}`
	} else if (codeDataType === PropDataType.uuidList) {
		dataType = '<uuid>'
		valueDB = getArray(valueRaw)
		valueDB =
			valueRaw.length > 0
				? `{${getArray(valueRaw).map((v: string) => getUUIDQuoted(v))}}`
				: `{${getUUIDQuoted()}}`
	} else if (codeDataType === PropDataType.bool) {
		dataType = '<bool>'
		valueDB = [undefined, null].includes(valueRaw) ? false : valueRaw
	} else {
		switch (codeDataType) {
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

			case PropDataType.link:
				dataType = 'link'
				valueDB = valueRaw ? valueRaw : '{}'
				break

			case PropDataType.str:
				dataType = '<str>'
				valueDB = getValQuoted(valueRaw)
				break

			default:
				error(500, {
					file: FILENAME,
					function: clazz,
					message: `No case defined for dataType: (${codeDataType}).`
				})
		}
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
	const sourceKey = strRequired(exprParms.item.key, `${FILENAME}.getValRaw`, 'sourceKey')
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

	switch (exprParms.item.codeDataSourceExpr) {
		case ExprSource.calc:
			switch (sourceKey) {
				case 'random10':
					return parseInt(Math.random().toFixed(10).replace('0.', ''))

				default:
					valueNotFound({})
			}

		case ExprSource.dataSaveDetail:
			if (exprParms.queryData?.dataTab?.rowsSave)
				return exprParms.queryData.dataTab.rowsSave.getDetailRecordValue(sourceKey)
			fError(`QueryData.dataSave not defined for sourceKey: ${sourceKey}`)

		case ExprSource.literal:
			return sourceKey

		case ExprSource.parms:
			return getValue(exprParms.queryData.getParms(), sourceKey)

		case ExprSource.record:
			return getValue(exprParms.queryData.record, sourceKey)

		case ExprSource.system:
			return getValue(exprParms.queryData.system, sourceKey)

		case ExprSource.tree:
			const items = sourceKey.split('.')
			let record: DataRecord | undefined = undefined
			let property = ''

			switch (items.length) {
				case 1:
					property = items[0]
					record = exprParms.queryData.tree.getRecord()
					break
				case 2:
					record = exprParms.queryData.tree.getRecord(items[0])
					property = items[1]
					break
				default:
					fError(`Invalid configuration of tree data token: ${sourceKey}`)
			}
			if (record) return getValue(record, property)

		case ExprSource.user:
			return getValue(exprParms.queryData.user, sourceKey)

		default:
			fError(`No case defined for source: ${exprParms.item.codeDataSourceExpr}`)
	}
	function getValue(data: DataRecord, key: string) {
		const result = getValueNested(data, key)
		return result ? result[1] : valueNotFound(data)
	}
	function getValueNested(data: DataRecord, key: string) {
		const tokens = key.split('.')
		let currentData = data
		for (let i = 0; i < tokens.length - 1; i++) {
			if (!currentData || !Object.hasOwn(currentData, tokens[i])) return false
			currentData = currentData[tokens[i]]
		}
		const idx = tokens.length - 1
		if (!currentData || !Object.hasOwn(currentData, tokens[idx])) return false
		return [true, currentData[tokens[idx]]]
	}
	function valueNotFound(data: DataRecord) {
		fError(`Value null or not found.`, data)
	}
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
	codeDataType: PropDataType
	dataItem: string
	key: string
	constructor(dataItem: string, exprItems: string[]) {
		const clazz = 'ExprParmsItem'
		this.codeDataSourceExpr = memberOfEnum(
			exprItems[0],
			clazz,
			'codeDataSourceExpr',
			'ExprSource',
			ExprSource
		)
		this.codeDataType = memberOfEnum(
			exprItems[1],
			clazz,
			'codeDataType',
			'PropDataType',
			PropDataType
		)
		this.dataItem = dataItem
		this.key = exprItems[2]
	}
}

enum ExprSource {
	calc = 'calc',
	dataSaveDetail = 'dataSaveDetail',
	env = 'env',
	literal = 'literal',
	parms = 'parms',
	preset = 'preset',
	record = 'record',
	system = 'system',
	tree = 'tree',
	user = 'user',
	userResource = 'userResource'
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
		this.valueFormatted = `${dataType}${valueDB}`
	}
}
