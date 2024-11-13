import { Field, PropsFieldRaw } from '$comps/form/field'

export class FieldSelect extends Field {
	constructor(props: PropsFieldRaw) {
		super(props)
	}
}

export class FieldSelectMulti extends FieldSelect {
	constructor(props: PropsFieldRaw) {
		super(props)
	}
}
