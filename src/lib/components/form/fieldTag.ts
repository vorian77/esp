import { Field, RawFieldProps } from '$comps/form/field'
import { strOptional, nbrRequired } from '$utils/utils'

export class FieldTag extends Field {
	constructor(props: RawFieldProps) {
		super(props)
		this.colDO.propName = `${this.colDO.propName}_${nbrRequired(props.propRaw.orderDefine, 'FieldTag', 'orderDefine')}`
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
