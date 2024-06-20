import { FieldDisplay } from '$comps/form/field'
import { RawDataObjPropDisplay } from '$comps/dataObj/types.rawDataObj'
import { strRequired, valueOrDefault } from '$utils/utils'
import { evalExpr } from '$routes/api/dbEdge/dbEdgeGetVal'
import { TokenApiQueryData } from '$utils/types.token'

const FILENAME = '$comps/Form/fieldFile.ts'

export class FieldFile extends FieldDisplay {
	storageKeyExpr: string
	width: number
	constructor(obj: RawDataObjPropDisplay, index: number, isFirstVisible: boolean) {
		super(obj, index, isFirstVisible)
		obj = valueOrDefault(obj, {})
		this.storageKeyExpr = strRequired(obj.colDB.exprStorageKey, 'FieldFile', 'storageKeyExpr')
		this.width = valueOrDefault(obj.width, 300)
	}

	getKey() {
		return evalExpr(this.storageKeyExpr, new TokenApiQueryData({}))
	}
}
