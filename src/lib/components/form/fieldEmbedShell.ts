import { Field, RawFieldProps } from '$comps/form/field'

export class FieldEmbedShell extends Field {
	constructor(props: RawFieldProps) {
		super(props)
	}
	static async init(props: RawFieldProps) {
		return new FieldEmbedShell(props)
	}
}
