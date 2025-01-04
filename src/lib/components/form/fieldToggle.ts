import { Field, FieldAccess, PropsFieldCreate } from '$comps/form/field'
import { valueOrDefault } from '$utils/types'

export class FieldToggle extends Field {
	presetTrue: boolean
	valueFalse: string
	valueShow: boolean
	valueTrue: string
	constructor(props: PropsFieldCreate) {
		super(props)
		const obj = valueOrDefault(props.propRaw, {})
		this.presetTrue = valueOrDefault(obj.colDB.togglePresetTrue, false)
		this.valueFalse = valueOrDefault(obj.colDB.toggleValueFalse, undefined)
		this.valueShow = valueOrDefault(obj.colDB.toggleValueShow, false)
		this.valueTrue = valueOrDefault(obj.colDB.toggleValueTrue, undefined)
	}
}
