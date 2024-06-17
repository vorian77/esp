import { Field } from '$comps/form/field'
import { RawDataObjPropDisplay } from '$comps/dataObj/types.rawDataObj'
import { strOptional } from '$utils/utils'

export class FieldTag extends Field {
	constructor(obj: RawDataObjPropDisplay, index: number, isFirstVisible: boolean) {
		super(obj, index, isFirstVisible)
		this.colDO.propName = `${this.colDO.propName}_${index}`
	}
}

export class FieldTagRow extends FieldTag {
	constructor(obj: RawDataObjPropDisplay, index: number, isFirstVisible: boolean) {
		super(obj, index, isFirstVisible)
	}
}

export class FieldTagSection extends FieldTag {
	legend?: string
	constructor(obj: RawDataObjPropDisplay, index: number, isFirstVisible: boolean) {
		super(obj, index, isFirstVisible)
		const clazz = 'FieldTagSection'
		this.legend = strOptional(obj.headerAlt, clazz, 'headerAlt')
	}
}
