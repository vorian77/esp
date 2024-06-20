import { Field } from '$comps/form/field'
import { RawDataObjPropDisplay } from '$comps/dataObj/types.rawDataObj'
import { strOptional, nbrRequired } from '$utils/utils'

export class FieldTag extends Field {
	constructor(obj: RawDataObjPropDisplay, isFirstVisible: boolean) {
		super(obj, isFirstVisible)
		const orderDisplay = nbrRequired(obj.orderDisplay, 'FieldTag', 'orderDisplay')
		this.colDO.propName = `${this.colDO.propName}_${orderDisplay}`
	}
}

export class FieldTagRow extends FieldTag {
	constructor(obj: RawDataObjPropDisplay, isFirstVisible: boolean) {
		super(obj, isFirstVisible)
	}
}

export class FieldTagSection extends FieldTag {
	legend?: string
	constructor(obj: RawDataObjPropDisplay, isFirstVisible: boolean) {
		super(obj, isFirstVisible)
		const clazz = 'FieldTagSection'
		this.legend = strOptional(obj.headerAlt, clazz, 'headerAlt')
	}
}
