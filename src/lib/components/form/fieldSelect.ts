import { Field, RawFieldProps } from '$comps/form/field'

export class FieldSelect extends Field {
	constructor(props: RawFieldProps) {
		super(props)
	}
	static async init(props: RawFieldProps) {
		return new FieldSelect(props)
	}
}

export class FieldSelectMulti extends FieldSelect {
	constructor(props: RawFieldProps) {
		super(props)
	}
	static async init(props: RawFieldProps) {
		return new FieldSelectMulti(props)
	}
}
