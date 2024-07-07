import { Field, RawFieldProps } from '$comps/form/field'
import { ValidityErrorLevel } from '$comps/form/types.validation'
import { type DataRecord } from '$utils/types'

export class FieldCheckbox extends Field {
	constructor(props: RawFieldProps) {
		super(props)
	}
	static async init(props: RawFieldProps) {
		return new FieldCheckbox(props)
	}
	validate(record: DataRecord, row: number, missingDataErrorLevel: ValidityErrorLevel) {
		const value = record[this.colDO.propName]
		if (typeof value === 'boolean' && !this.colDO.colDB.isMultiSelect) {
			return this.getValuationValid()
		}
		return super.validate(record, row, missingDataErrorLevel)
	}
}
