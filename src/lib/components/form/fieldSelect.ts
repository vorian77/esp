import { Field, PropsFieldCreate } from '$comps/form/field.svelte'

export class FieldSelect extends Field {
	constructor(props: PropsFieldCreate) {
		super(props)
	}
}

export class FieldSelectMulti extends FieldSelect {
	constructor(props: PropsFieldCreate) {
		super(props)
	}
}
