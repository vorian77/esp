import { Field, PropsFieldCreate } from '$comps/form/field.svelte'
import { booleanOrFalse } from '$utils/types'

export class FieldRadio extends Field {
	isDisplayBlock: boolean
	constructor(props: PropsFieldCreate) {
		super(props)
		const clazz = 'FieldRadio'
		this.isDisplayBlock = booleanOrFalse(props.propRaw.isDisplayBlock)
	}
}
