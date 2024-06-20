import { Field } from '$comps/form/field'
import { RawDataObjPropDisplay } from '$comps/dataObj/types.rawDataObj'
import { strRequired, valueOrDefault } from '$utils/utils'
import { evalExpr } from '$routes/api/dbEdge/dbEdgeGetVal'
import { TokenApiQueryData } from '$utils/types.token'

const FILENAME = '$comps/Form/fieldFile.ts'

export class FieldFile extends Field {
	storageKeyExpr: string
	width: number
	constructor(obj: RawDataObjPropDisplay, isFirstVisible: boolean) {
		super(obj, isFirstVisible)
		obj = valueOrDefault(obj, {})
		this.storageKeyExpr = strRequired(obj.colDB.exprStorageKey, 'FieldFile', 'storageKeyExpr')
		this.width = valueOrDefault(obj.width, 300)
	}

	getKey() {
		return evalExpr(this.storageKeyExpr, new TokenApiQueryData({}))
	}
}
