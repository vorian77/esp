import e from '$db/gel/edgeql-js'
import { createClient } from 'gel'
import { GEL_BRANCH, GEL_INSTANCE, GEL_SECRET_KEY } from '$env/static/private'
import { debug, MethodResult, type DataRecord } from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = 'routes/api/dbGel/dbGel.ts'

export const client = createClient({
	branch: GEL_BRANCH,
	instanceName: GEL_INSTANCE,
	secretKey: GEL_SECRET_KEY
})

export function booleanOrDefaultJSON(jsonObj: any, val: string, valDefault: boolean) {
	return e.cast(e.bool, e.op(e.cast(e.bool, e.json_get(jsonObj, val)), '??', valDefault))
}

export function valueOrDefaultParm(val: any, valDefault: any) {
	return e.op(val, 'if', e.op('exists', val), 'else', valDefault)
}

export async function dbGelQuery(dbExpr: string) {
	if (!dbExpr) return {}
	dbExpr = scrubScript(dbExpr)
	try {
		return await client.execute(dbExpr)
	} catch (e: any) {
		error(500, {
			file: FILENAME,
			function: 'dbGelQuery',
			msgSystem: `Unable to execute query - dbExpr: ${dbExpr} ${e.message}`,
			msgUser: `Unable to execute query.`
		})
	}
}

export async function queryJsonMultiple(dbExpr: string): Promise<MethodResult> {
	debug('queryJsonMultiple', 'dbExpr', dbExpr ? dbExpr : 'null/undefined script')
	let result: DataRecord = {}
	if (!dbExpr) {
		result = []
	} else {
		dbExpr = scrubScript(dbExpr)
		try {
			result = JSON.parse(await client.queryJSON(dbExpr))
		} catch (e: any) {
			result = {
				error: {
					file: FILENAME,
					function: 'queryJsonMultiple',
					msgSystem: `Unable to execute query - dbexpr: ${dbExpr} message: ${e.message}`,
					msgUser: `Unable to execute query.`
				}
			}
		}
	}
	return new MethodResult(result)
}

export async function queryJsonSingle(script: string): Promise<DataRecord> {
	if (!script) return {}
	script = scrubScript(script)
	try {
		return JSON.parse(await client.querySingleJSON(script))
	} catch (e: any) {
		error(500, {
			file: FILENAME,
			function: 'queryJsonSingle',
			msgSystem: `Unable to execute query: ${script} ${e.message}`,
			msgUser: `Unable to execute query.`
		})
	}
}

function scrubScript(script: string) {
	script = script.replace(/(\r\n|\n|\r)/gm, ' ')
	script = script.replace('  ', ' ')
	return script
}

export function sectionHeader(section: string, blankLine: boolean = false) {
	if (blankLine) console.log()
	console.log()
	console.log(`--- ${section} ---`)
}

export async function transaction(queries: Array<string>) {
	return await client.transaction(async (tx) => {
		for (const query of queries) {
			await tx.execute(query)
		}
	})
}
