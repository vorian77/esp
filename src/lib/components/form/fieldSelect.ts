import { FieldDisplay } from '$comps/form/field'
import { RawDataObjPropDisplay } from '$comps/dataObj/types.rawDataObj'

export class FieldSelect extends FieldDisplay {
	constructor(obj: RawDataObjPropDisplay, index: number, isFirstVisible: boolean) {
		super(obj, index, isFirstVisible)
	}
}
