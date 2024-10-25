import { createClient } from 'edgedb'
import e from '$lib/dbschema/edgeql-js'
import { EDGEDB_BRANCH, EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from '$env/static/private'

export const client = createClient({
	// branch: EDGEDB_BRANCH,
	instanceName: EDGEDB_INSTANCE,
	secretKey: EDGEDB_SECRET_KEY
})

export function booleanOrDefaultParm(val: any, valDefault: boolean) {
	return e.op(val, 'if', e.op('exists', val), 'else', valDefault)
}

export function booleanOrDefaultJSON(jsonObj: any, val: string, valDefault: boolean) {
	return e.cast(e.bool, e.op(e.cast(e.bool, e.json_get(jsonObj, val)), '??', valDefault))
}

export function sectionHeader(section: string) {
	console.log()
	console.log(`--- ${section} ---`)
}
