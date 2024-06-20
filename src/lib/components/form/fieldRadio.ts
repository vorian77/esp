import { FieldDisplay } from '$comps/form/field'
import { booleanOrFalse } from '$utils/types'
import { RawDataObjPropDisplay } from '$comps/dataObj/types.rawDataObj'

export class FieldRadio extends FieldDisplay {
	isDisplayBlock: boolean
	constructor(obj: RawDataObjPropDisplay, index: number, isFirstVisible: boolean) {
		const clazz = 'FieldRadio'
		super(obj, index, isFirstVisible)
		this.isDisplayBlock = booleanOrFalse(obj.isDisplayBlock, clazz)
	}
}
