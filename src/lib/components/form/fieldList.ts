import { Field } from '$comps/form/field'
import { valueOrDefault } from '$utils/utils'
import { RawDataObjPropDisplay } from '$comps/dataObj/types.rawDataObj'

const COMPONENT = '/$comps/form/fieldList.ts/'

export class FieldList extends Field {
	constructor(obj: RawDataObjPropDisplay, index: number, isFirstVisible: boolean) {
		super(obj, index, isFirstVisible)
		obj = valueOrDefault(obj, {})
	}
}