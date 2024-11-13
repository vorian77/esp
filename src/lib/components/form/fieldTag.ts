import { Field, PropsFieldRaw } from '$comps/form/field'
import { strOptional, nbrRequired } from '$utils/utils'

export class FieldTag extends Field {
	constructor(props: PropsFieldRaw) {
		super(props)
		this.colDO.propName = `${this.colDO.propName}_${nbrRequired(props.propRaw.orderDefine, 'FieldTag', 'orderDefine')}`
	}
}

export class FieldTagRow extends FieldTag {
	constructor(props: PropsFieldRaw) {
		super(props)
	}
}

export class FieldTagSection extends FieldTag {
	legend?: string
	constructor(props: PropsFieldRaw) {
		super(props)
		const clazz = 'FieldTagSection'
		this.legend = strOptional(props.propRaw.headerAlt, clazz, 'headerAlt')
	}
}
