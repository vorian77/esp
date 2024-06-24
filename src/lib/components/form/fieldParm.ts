import { Field, FieldAlignment, FieldProps, RawFieldProps } from '$comps/form/field'
import { RawDataObjPropDisplay } from '$comps/dataObj/types.rawDataObj'

export class FieldParm extends Field {
	constructor(props: RawFieldProps) {
		super(props)
	}
	getPropParm(fp: FieldProps) {
		const propParm = new RawDataObjPropDisplay({
			_column: {
				_codeAlignment: FieldAlignment.left,
				_codeDataType: fp.dataRecord.codeDataType,
				header: fp.dataRecord.header,
				isMultiSelect: fp.dataRecord.isMultiSelect,
				isNonData: false,
				placeHolder: ''
			},
			_codeAccess: fp.dataRecord.isRequired ? 'required' : 'optional',
			_codeFieldElement: fp.dataRecord.codeFieldElement,
			_hasItems: fp.dataRecord.fieldListItems.length > 0,
			_propName: fp.dataRecord.name,
			isDisplayBlock: true,
			orderDisplay: fp.dataRecord.orderDefine
		})
		// console.log('FieldParm.getPropParm', { dataRecord: fp.dataRecord, propParm })
		// return fp.dataObj.initField(propParm, false, [], {})
	}
}
