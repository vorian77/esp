import { Field, RawFieldProps } from '$comps/form/field'
import { valueOrDefault } from '$utils/utils'

export class FieldTextarea extends Field {
	rows: number
	cols: number
	classProps: string

	constructor(props: RawFieldProps) {
		super(props)
		const obj = valueOrDefault(props.propRaw, {})
		this.rows = valueOrDefault(obj.height, 3)
		this.cols = valueOrDefault(obj.width, 0)
		this.classProps = valueOrDefault(obj.colDB.classProps, '')
	}
	static async init(props: RawFieldProps) {
		return new FieldTextarea(props)
	}
}
