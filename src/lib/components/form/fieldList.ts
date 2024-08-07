import { Field, RawFieldProps } from '$comps/form/field'

const COMPONENT = '/$comps/form/fieldList.ts/'

export class FieldList extends Field {
	constructor(props: RawFieldProps) {
		super(props)
	}
	static async init(props: RawFieldProps) {
		return new FieldList(props)
	}
}
