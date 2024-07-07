import { Field, RawFieldProps } from '$comps/form/field'
import { strOptional, nbrRequired } from '$utils/utils'

export class FieldTag extends Field {
	constructor(props: RawFieldProps) {
		super(props)
		const orderDisplay = nbrRequired(props.propRaw.orderDisplay, 'FieldTag', 'orderDisplay')
		this.colDO.propName = `${this.colDO.propName}_${orderDisplay}`
	}
}

export class FieldTagRow extends FieldTag {
	constructor(props: RawFieldProps) {
		super(props)
	}
	static async init(props: RawFieldProps) {
		return new FieldTagRow(props)
	}
}

export class FieldTagSection extends FieldTag {
	legend?: string
	constructor(props: RawFieldProps) {
		super(props)
		const clazz = 'FieldTagSection'
		this.legend = strOptional(props.propRaw.headerAlt, clazz, 'headerAlt')
	}
	static async init(props: RawFieldProps) {
		return new FieldTagSection(props)
	}
}
