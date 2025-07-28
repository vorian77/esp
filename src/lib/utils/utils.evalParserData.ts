import {
	debug,
	type DataRecord,
	MethodResult,
	recordValueGet,
	required,
	strRequired,
	valueOrDefault
} from '$utils/types'
import { EvalParser, EvalParserToken, type EvalParserTokenParm } from '$utils/utils.evalParser'
import { error } from '@sveltejs/kit'

const FILENAME = '$utils/utils.evalParserData.ts'

export function evalExprRecord(obj: any): MethodResult {
	let parser = new EvalParserData(obj)
	return parser.getExpr()
}

class EvalParserData extends EvalParser {
	evalExprContext: string
	data: DataRecord
	constructor(obj: any) {
		const clazz = 'EvalParserData'
		obj = valueOrDefault(obj, {})
		super(obj)
		this.evalExprContext = strRequired(obj.evalExprContext, clazz, 'evalExprContext')
		this.data = required(obj.data, clazz, 'data')
	}

	addToken(parm: EvalParserTokenParm): EvalParserToken {
		return new EvalParserToken(parm)
	}

	evalToken(tokenRoot: EvalParserToken): MethodResult {
		const clazz = 'EvalParserRecord.evalToken'
		const parms = tokenRoot.content.split(',')
		const type = parms[0]
		const dataType = parms[1]
		let key: string | undefined = undefined
		let value: any
		switch (type) {
			case 'record':
				key = parms[2]
				break

			case 'value':
				key = 'value'
				break

			default:
				return new MethodResult({
					error: {
						file: FILENAME,
						function: clazz,
						msgSystem: `context: ${this.evalExprContext} - invalid token: ${tokenRoot.content}`,
						msgUser: 'Unable to parse expression.'
					}
				})
		}
		value = recordValueGet(this.data, key)
		if (dataType === 'str') value = `'${value}'`
		return new MethodResult(value)
	}

	isToken(tokenContent: string): boolean {
		const tokenType = tokenContent.split(',')[0]
		return this.isTokenEnumMember(EvalParserDataType, tokenType)
	}
}

enum EvalParserDataType {
	record = 'record',
	value = 'value'
}
