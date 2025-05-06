import { Field, PropsFieldCreate } from '$comps/form/field.svelte'
import { strRequired, valueOrDefault } from '$utils/utils'
import { evalExpr } from '$routes/api/db/dbScriptEval'

const FILENAME = '$comps/Form/fieldFile.ts'

export class FieldFile extends Field {
	storageKeyExpr: string
	width: number
	constructor(props: PropsFieldCreate) {
		super(props)
		const obj = valueOrDefault(props.propRaw, {})
		this.storageKeyExpr = strRequired(obj.colDB.exprStorageKey, 'FieldFile', 'storageKeyExpr')
		this.width = valueOrDefault(obj.width, 300)
	}
	getKey() {
		return evalExpr({ expr: this.storageKeyExpr, evalExprContext: `${FILENAME}.getKey` })
	}
}
