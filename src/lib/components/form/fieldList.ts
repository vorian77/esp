import { Field, PropsFieldCreate } from '$comps/form/field.svelte'

const COMPONENT = '/$comps/form/fieldList.ts/'

export class FieldList extends Field {
	constructor(props: PropsFieldCreate) {
		super(props)
	}
}
