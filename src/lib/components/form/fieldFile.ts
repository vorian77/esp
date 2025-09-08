import { Field, PropsFieldCreate } from '$comps/form/field.svelte'
import { strRequired, valueOrDefault } from '$utils/utils'
import { evalExpr } from '$utils/utils.evalParserDb'

const FILENAME = '$comps/Form/fieldFile.ts'

export class FieldFile extends Field {
	storageKeyExpr: string
	constructor(props: PropsFieldCreate) {
		super(props)
		const obj = valueOrDefault(props.propRaw, {})
		this.storageKeyExpr = strRequired(obj.colDB.exprStorageKey, 'FieldFile', 'storageKeyExpr')
	}
	async getKey() {
		return await evalExpr({ exprRaw: this.storageKeyExpr, evalExprContext: `${FILENAME}.getKey` })
	}
}

export class FieldFileData extends FieldFile {
	constructor(props: PropsFieldCreate) {
		super(props)
		const obj = valueOrDefault(props.propRaw, {})
	}
}

export class FieldFileImage extends FieldFile {
	width: number
	constructor(props: PropsFieldCreate) {
		super(props)
		const obj = valueOrDefault(props.propRaw, {})
		this.width = valueOrDefault(obj.width, 300)
	}
}
