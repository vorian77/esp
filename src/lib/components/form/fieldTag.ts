import { Field, PropsFieldCreate } from '$comps/form/field'
import { strOptional, nbrRequired } from '$utils/utils'

export class FieldTag extends Field {
	constructor(props: PropsFieldCreate) {
		super(props)
		this.colDO.propName = `${this.colDO.propName}_${nbrRequired(props.propRaw.orderDefine, 'FieldTag', 'orderDefine')}`
	}
}

export class FieldTagRow extends FieldTag {
	constructor(props: PropsFieldCreate) {
		super(props)
	}
}

export class FieldTagSection extends FieldTag {
	legend?: string
	constructor(props: PropsFieldCreate) {
		super(props)
		const clazz = 'FieldTagSection'
		this.legend = strOptional(props.propRaw.headerAlt, clazz, 'headerAlt')
	}
}
