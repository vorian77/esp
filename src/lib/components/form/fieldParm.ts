import { Field, FieldAlignment, PropsField, PropsFieldRaw } from '$comps/form/field'
import { RawDataObjPropDisplay } from '$comps/dataObj/types.rawDataObj'
import { ValidityErrorLevel } from '$comps/form/types.validation'
import { DataObj, type DataRecord, getRecordValue, ResponseBody } from '$utils/types'
import { apiFetch, ApiFunction } from '$routes/api/api'
import { TokenApiId } from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '$comps/form/fieldParm.ts/'

export class FieldParm extends Field {
	parmFields: Field[] = []
	constructor(props: PropsFieldRaw) {
		super(props)
		const clazz = 'FieldParm'
		this.isParmValue = true
	}
	async init(props: PropsField) {
		this.parmFields = await this.configParmItems(props)
	}

	async configParmItems(props: PropsField) {
		let fields: Field[] = []
		for (const dataRow of props.dataObj.data.rowsRetrieved.dataRows) {
			fields.push(await this.configParmItemsInit(props, dataRow.record, fields))
		}
		return fields
	}

	async configParmItemsInit(props: PropsField, record: DataRecord, fields: Field[]) {
		const propParmObj = {
			_codeAccess: 'required',
			_codeFieldElement: getRecordValue(record, 'codeFieldElement'),
			_column: {
				_codeAlignment: FieldAlignment.left,
				_codeDataType: getRecordValue(record, 'codeDataType'),
				header: getRecordValue(record, 'header'),
				isMultiSelect: getRecordValue(record, 'isMultiSelect'),
				isNonData: false,
				placeHolder: ''
			},
			_hasItems: getRecordValue(record, '_hasItems'),
			_propName: getRecordValue(record, 'name'),
			isDisplayable: true,
			isDisplayBlock: true,
			isParmValue: true,
			orderDefine: getRecordValue(record, 'orderDefine')
		}
		const propParm = new RawDataObjPropDisplay(propParmObj, [])
		return DataObj.fieldsCreateItem(
			props.state,
			propParm,
			false,
			fields,
			props.dataObj,
			props.dataObj.data
		)
	}

	getStatus(dataObjForm: DataObj, recordId: string) {
		const row = dataObjForm.dataRecordsDisplay.findIndex((r) => r.id === recordId)
		if (row > -1) {
			return this.parmFields[row].getStatus(dataObjForm, recordId)
		} else {
			error(500, {
				file: FILENAME,
				function: 'getStatus',
				message: `Unable to find row for recordId: ${recordId} for FieldParm: ${this.colDO.propName}`
			})
		}
	}

	validate(row: number, value: any, missingDataErrorLevel: ValidityErrorLevel) {
		return this.parmFields[row].validate(row, value, missingDataErrorLevel)
	}
}
