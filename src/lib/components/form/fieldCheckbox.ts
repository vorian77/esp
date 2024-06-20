import { FieldDisplay } from '$comps/form/field'
import { Validation } from '$comps/form/types.validation'
import { type DataRecord } from '$utils/types'
import { RawDataObjPropDisplay } from '$comps/dataObj/types.rawDataObj'

export class FieldCheckbox extends FieldDisplay {
	constructor(obj: RawDataObjPropDisplay, index: number, isFirstVisible: boolean) {
		super(obj, index, isFirstVisible)

		this.setValidatePre((dataValue: any, dataRecord: DataRecord): Validation | undefined => {
			if (!this.colDO.colDB.isMultiSelect && [true, false].includes(dataValue)) {
				return this.getValuationValid(this.orderDisplay)
			}
			return undefined
		})
	}
}
