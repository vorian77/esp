import { TokenApiFetchMethod } from '$utils/types.token'
import { API_NINJAS_SECRET } from '$env/static/private'
import { getServerResponse } from '$utils/types'
import { MethodResult } from '$utils/types'

const FILENAME = '/routes/api/quote/+server.ts'

const CATEGORIES = ['inspirational', 'courage']
// const CATEGORIES = [
// 'amazing',
// 'art',
// 	'beauty',
// 	'best',
// 	'change',
// 	'courage',
// 	'dreams',
// 	'education',
// 	'equality',
// 	'experience',
// 	'failure',
// 	'faith',
// 	'family',
// 	'fear',
// 	'forgiveness',
// 	'friendship',
// 	'funny',
// 	'future',
// 	'great',
// 	'happiness',
// 	'history',
// 	'hope',
// 	'imagination',
// 	'inspirational',
// 	'intelligence',
// 	'knowledge',
// 	'leadership',
// 	'learning',
// 	'life',
// 	'success'
// ];

const COLORS = [
	'#edb879',
	'#1979a9',
	'#e07b39',
	'#042f66',
	'#3b79e1',
	'#4F46E5',
	'#0EA5E9',
	'#84cc16',
	'#EAB308',
	'#D41976',
	'#495a8f'
]

const DEFAULT_QUOTE = {
	quote:
		'If you accept the expectations of others, especially negative ones, then you never will change the outcome.',
	author: 'Michael Jordon',
	category: 'inspirational'
}

export async function GET() {
	const COLOR = { color: COLORS[Math.floor(Math.random() * COLORS.length)] }
	const CATEGORY_IDX = Math.floor(Math.random() * (CATEGORIES.length + 1))
	// const API = 'https://api.api-ninjas.com/v1/quotes?limit=1&category=' + CATEGORIES[CATEGORY_IDX]
	const API = 'https://api.api-ninjas.com/v1/quotes'
	let result = {}

	try {
		const responsePromise: Response = await fetch(API, {
			method: TokenApiFetchMethod.get,
			headers: {
				'X-API-KEY': API_NINJAS_SECRET,
				contentType: 'application/json'
			}
		})
		const responseResult = await responsePromise.json()
		const quote =
			Array.isArray(responseResult) && responseResult.length > 0 ? responseResult[0] : DEFAULT_QUOTE
		result = { ...quote, ...COLOR }
	} catch (error: any) {
		result = {
			error: {
				file: FILENAME,
				function: 'getQuote',
				msgSystem: `Unable to retrieve quote - api: ${API}`,
				msgUser: `Unable to retrieve quote.`
			}
		}
	}
	return getServerResponse(new MethodResult(result))
}
