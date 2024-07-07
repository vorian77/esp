import { Field, RawFieldProps } from '$comps/form/field'

export class FieldChips extends Field {
	constructor(props: RawFieldProps) {
		super(props)
	}
	static async init(props: RawFieldProps) {
		return new FieldChips(props)
	}
}
