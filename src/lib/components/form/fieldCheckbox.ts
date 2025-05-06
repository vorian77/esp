import { Field, PropsFieldCreate } from '$comps/form/field.svelte'
import { ValidityErrorLevel } from '$comps/form/types.validation'

export class FieldCheckbox extends Field {
	constructor(props: PropsFieldCreate) {
		super(props)
	}
	validate(row: number, value: any, missingDataErrorLevel: ValidityErrorLevel) {
		if (typeof value === 'boolean' && !this.colDO.colDB.isMultiSelect) {
			return this.getValuationValid()
		}
		return super.validate(row, value, missingDataErrorLevel)
	}
}
