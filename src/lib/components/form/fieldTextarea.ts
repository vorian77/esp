import { FieldDisplay } from '$comps/form/field'
import { RawDataObjPropDisplay } from '$comps/dataObj/types.rawDataObj'
import { valueOrDefault } from '$utils/utils'

export class FieldTextarea extends FieldDisplay {
	rows: number
	cols: number
	classProps: string

	constructor(obj: RawDataObjPropDisplay, index: number, isFirstVisible: boolean) {
		super(obj, index, isFirstVisible)
		obj = valueOrDefault(obj, {})
		this.rows = valueOrDefault(obj.height, 3)
		this.cols = valueOrDefault(obj.width, 0)
		this.classProps = valueOrDefault(obj.colDB.classProps, '')
	}
}
