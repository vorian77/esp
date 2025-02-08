import { Field, PropsFieldCreate } from '$comps/form/field.svelte'
import { ValidityError, ValidityErrorLevel } from '$comps/form/types.validation'
import { valueOrDefault } from '$utils/types'

export class FieldToggle extends Field {
	continueRequiresTrue: boolean = true
	presetTrue: boolean
	valueFalse: string
	valueShow: boolean
	valueTrue: string
	constructor(props: PropsFieldCreate) {
		super(props)
		const obj = valueOrDefault(props.propRaw, {})
		this.continueRequiresTrue = valueOrDefault(obj.colDB.toggleContinueRequiresTrue, false)
		this.presetTrue = valueOrDefault(obj.colDB.togglePresetTrue, false)
		this.valueFalse = valueOrDefault(obj.colDB.toggleValueFalse, false)
		this.valueShow = valueOrDefault(obj.colDB.toggleValueShow, false)
		this.valueTrue = valueOrDefault(obj.colDB.toggleValueTrue, true)
	}
	getValueBoolean(currValue: any) {
		return currValue === this.valueTrue ? true : false
	}
	toggle(currValue: any) {
		return currValue === this.valueTrue ? this.valueFalse : this.valueTrue
	}
	validate(row: number, value: any, missingDataErrorLevel: ValidityErrorLevel) {
		if (
			this.continueRequiresTrue &&
			([undefined, false].includes(value) || (this.valueTrue && value !== this.valueTrue))
		) {
			return this.getValuationInvalid(
				ValidityError.required,
				missingDataErrorLevel,
				`"${this.colDO.label}" must be selected to continue.`
			)
		}
		return super.validate(row, value, missingDataErrorLevel)
	}
}
