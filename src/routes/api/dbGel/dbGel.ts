import e from '$db/gel/edgeql-js'
import { createClient } from 'gel'
import { EDGEDB_BRANCH, EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from '$env/static/private'
import { error } from '@sveltejs/kit'

const FILENAME = 'routes/api/dbGel/dbGel.ts'

export const client = createClient({
	branch: EDGEDB_BRANCH,
	instanceName: EDGEDB_INSTANCE,
	secretKey: EDGEDB_SECRET_KEY
})

export function booleanOrDefaultJSON(jsonObj: any, val: string, valDefault: boolean) {
	return e.cast(e.bool, e.op(e.cast(e.bool, e.json_get(jsonObj, val)), '??', valDefault))
}

export function valueOrDefaultParm(val: any, valDefault: any) {
	return e.op(val, 'if', e.op('exists', val), 'else', valDefault)
}

export async function dbGelQuery(script: string) {
	if (!script) return {}
	script = scrubScript(script)
	try {
		return await client.execute(script)
	} catch (e: any) {
		error(500, {
			file: FILENAME,
			function: 'query',
			message: `Unable to execute query: ${script} ${e.message}`
		})
	}
}

export async function dbGelTransactions(scripts: string[]) {}

export async function queryJsonMultiple(script: string): Promise<RawDataList> {
	if (!script) return []
	script = scrubScript(script)
	try {
		return JSON.parse(await client.queryJSON(script))
	} catch (e: any) {
		error(500, {
			file: FILENAME,
			function: 'queryJsonMultiple',
			message: `Unable to execute query: ${script} ${e.message}`
		})
	}
}

export async function queryJsonSingle(script: string): Promise<RawDataRow> {
	if (!script) return {}
	script = scrubScript(script)
	try {
		return JSON.parse(await client.querySingleJSON(script))
	} catch (e: any) {
		error(500, {
			file: FILENAME,
			function: 'queryJsonSingle',
			message: `Unable to execute query: ${script} ${e.message}`
		})
	}
}

type RawDataRow = Record<string, any>
export type RawDataList = RawDataRow[]

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
