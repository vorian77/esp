import { Field } from '$comps/form/field'
import { RawDataObjPropDisplay } from '$comps/dataObj/types.rawDataObj'
import { strOptional } from '$utils/utils'

export class FieldParm extends Field {
	constructor(obj: RawDataObjPropDisplay, isFirstVisible: boolean) {
		super(obj, isFirstVisible)
		// this.colDO.propName = `${this.colDO.propName}_${index}`
	}
}

// export class FieldTagRow extends FieldTag {
// 	constructor(obj: RawDataObjPropDisplay, isFirstVisible: boolean) {
// 		super(obj, isFirstVisible)
// 	}
// }

// export class FieldTagSection extends FieldTag {
// 	legend?: string
// 	constructor(obj: RawDataObjPropDisplay, isFirstVisible: boolean) {
// 		super(obj, isFirstVisible)
// 		const clazz = 'FieldTagSection'
// 		this.legend = strOptional(obj.headerAlt, clazz, 'headerAlt')
// 	}
// }
