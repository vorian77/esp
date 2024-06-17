import { Field, FieldAccess } from '$comps/form/field'
import { RawDataObjPropDisplay } from '$comps/dataObj/types.rawDataObj'
import { valueOrDefault } from '$utils/types'

export class FieldToggle extends Field {
	presetTrue: boolean
	valueFalse: string
	valueShow: boolean
	valueTrue: string
	constructor(obj: RawDataObjPropDisplay, index: number, isFirstVisible: boolean) {
		super(obj, index, isFirstVisible)
		this.colDO.fieldAccess = FieldAccess.optional
		this.presetTrue = valueOrDefault(obj.colDB.togglePresetTrue, false)
		this.valueFalse = valueOrDefault(obj.colDB.toggleValueFalse, undefined)
		this.valueShow = valueOrDefault(obj.colDB.toggleValueShow, false)
		this.valueTrue = valueOrDefault(obj.colDB.toggleValueTrue, undefined)
	}
}
