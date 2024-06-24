import { Field, RawFieldProps } from '$comps/form/field'
import { Validation } from '$comps/form/types.validation'
import { type DataRecord } from '$utils/types'

export class FieldCheckbox extends Field {
	constructor(props: RawFieldProps) {
		super(props)

		this.setValidatePre(
			(fieldName: string, dataValue: any, dataRecord: DataRecord): Validation | undefined => {
				if (!this.colDO.colDB.isMultiSelect && [true, false].includes(dataValue)) {
					return this.getValuationValid(fieldName)
				}
				return undefined
			}
		)
	}
}
