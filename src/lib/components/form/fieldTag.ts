import { Field, FieldColor, PropsFieldCreate } from '$comps/form/field.svelte'
import { strOptional, nbrRequired } from '$utils/utils'

export class FieldTag extends Field {
	constructor(props: PropsFieldCreate) {
		super(props)
		this.colDO.propName = `${this.colDO.propName}_${nbrRequired(props.propRaw.orderDefine, 'FieldTag', 'orderDefine')}`
	}
}

export class FieldTagDetails extends FieldTag {
	summary?: string
	constructor(props: PropsFieldCreate) {
		super(props)
		const clazz = 'FieldTagDetails'
		this.summary = strOptional(props.propRaw.headerAlt, clazz, 'summary')
	}
}

export class FieldTagRow extends FieldTag {
	constructor(props: PropsFieldCreate) {
		super(props)
	}
}

export class FieldTagSection extends FieldTag {
	fieldColor: FieldColor
	legend?: string
	constructor(props: PropsFieldCreate) {
		super(props)
		const clazz = 'FieldTagSection'
		this.fieldColor = new FieldColor(props.propRaw.codeColor, 'defaultBorder')
		this.legend = strOptional(props.propRaw.headerAlt, clazz, 'legend')
	}
}
