import { Field, PropsFieldCreate } from '$comps/form/field.svelte'
import { valueOrDefault } from '$utils/utils'

export class FieldTextarea extends Field {
	rows: number
	cols: number
	classProps: string

	constructor(props: PropsFieldCreate) {
		super(props)
		const obj = valueOrDefault(props.propRaw, {})
		this.rows = valueOrDefault(obj.height, 3)
		this.cols = valueOrDefault(obj.width, 0)
		this.classProps = valueOrDefault(obj.colDB.classProps, '')
	}
}
