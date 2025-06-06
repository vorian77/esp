import { ScriptGroup } from '$routes/api/db/dbScript'
import { MethodResult, strRequired } from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/$routes/api/db/dbGel/dbGelScript.ts'

export class ScriptGroupGel extends ScriptGroup {}

export class ScriptGroupGelExpr extends ScriptGroupGel {
	async queryPre(): Promise<MethodResult> {
		const clazz = `${FILENAME}.ScriptGroupGelExpr.queryPre`
		return await super.addScript({
			expr: strRequired(this.tokenQuery.querySourceRaw.exprCustom, clazz, 'expr')
		})
	}
}
