import { debug, MethodResult, strRequired, valueOrDefault } from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = '$utils/utils.evalParser.ts'

export class EvalParser {
	exprRaw: string
	tokens: EvalParserToken[] = []
	constructor(obj: any) {
		const clazz = 'EvalParser'
		const regex = /<([a-zA-Z].*?)>/g
		obj = valueOrDefault(obj, {})
		this.exprRaw = strRequired(valueOrDefault(obj.exprRaw.trim(), ''), clazz, 'exprRaw')
		const iter = this.exprRaw.matchAll(regex)
		for (const match of iter) {
			const raw = match[0]
			const content = match[1]
			if (this.isToken(content)) {
				this.tokens.push(this.addToken({ content, raw }))
			}
		}
	}
	addToken(parm: EvalParserTokenParm): EvalParserToken {
		return new EvalParserToken(parm)
	}

	getExpr(): MethodResult {
		for (const token of this.tokens) {
			const result: MethodResult = this.evalToken(token)
			if (result.error) return result
			token.parse = result.data
		}
		return this.getExprReplace()
	}

	async getExprAsync(): Promise<MethodResult> {
		for (const token of this.tokens) {
			const result: MethodResult = await this.evalTokenAsync(token)
			if (result.error) return result
			token.parse = result.data
		}
		return this.getExprReplace()
	}

	getExprReplace(): MethodResult {
		let newExpr = this.exprRaw
		this.tokens.forEach((token) => {
			newExpr = newExpr.replace(token.raw, token.parse)
		})
		return new MethodResult(newExpr)
	}

	evalToken(tokenRoot: EvalParserToken): MethodResult {
		return new MethodResult()
	}

	async evalTokenAsync(tokenRoot: EvalParserToken): Promise<MethodResult> {
		return new MethodResult()
	}

	isToken(tokenContent: string): boolean {
		return true
	}
	isTokenEnumMember(enumObj: any, tokenType: string) {
		return Object.values(enumObj).includes(tokenType)
	}
}

export class EvalParserToken {
	content: string
	parse: string = ''
	raw: string
	constructor(obj: any) {
		const clazz = 'EvalParserToken'
		obj = valueOrDefault(obj, {})
		this.content = strRequired(obj.content, clazz, 'content')
		this.raw = strRequired(obj.raw, clazz, 'raw')
	}
}

export type EvalParserTokenParm = { content: string; raw: string }
