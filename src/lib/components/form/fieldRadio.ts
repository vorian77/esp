import { Field, RawFieldProps } from '$comps/form/field'
import { booleanOrFalse } from '$utils/types'

export class FieldRadio extends Field {
	isDisplayBlock: boolean
	constructor(props: RawFieldProps) {
		super(props)
		const clazz = 'FieldRadio'
		this.isDisplayBlock = booleanOrFalse(props.propRaw.isDisplayBlock, clazz)
	}
}
