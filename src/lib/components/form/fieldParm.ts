import { Field, FieldAlignment, RawFieldProps } from '$comps/form/field'
import { RawDataObjPropDisplay } from '$comps/dataObj/types.rawDataObj'
import { ValidityErrorLevel } from '$comps/form/types.validation'
import {
	DataObj,
	type DataItems,
	DataObjData,
	type DataRecord,
	ParmsValuesType,
	ResponseBody
} from '$utils/types'
import { apiFetch, ApiFunction } from '$routes/api/api'
import { TokenApiQueryData } from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '$comps/form/fieldParm.ts/'

export class FieldParm extends Field {
	parmFields: Field[] = []
	constructor(props: RawFieldProps) {
		super(props)
		const clazz = 'FieldParm'
		this.isParmValue = true
	}
	static async init(props: RawFieldProps) {
		const field = new FieldParm(props)
		field.parmFields = await field.configParmItems(props)
		await field.configParmItemsData(props)
		return field
	}

	async configParmItems(props: RawFieldProps) {
		let fields: Field[] = []
		for (const dataRow of props.data.rowsRetrieved.dataRows) {
			fields.push(await this.configParmItemsInit(props, dataRow.record, fields))
		}
		return fields
	}

	async configParmItemsInit(props: RawFieldProps, record: DataRecord, fields: Field[]) {
		const propParm = new RawDataObjPropDisplay({
			_column: {
				_codeAlignment: FieldAlignment.left,
				_codeDataType: record.codeDataType,
				header: record.header,
				isMultiSelect: record.isMultiSelect,
				isNonData: false,
				placeHolder: ''
			},
			_codeAccess: 'required',
			_codeFieldElement: record.codeFieldElement,
			_hasItems: record._hasItems,
			_propName: record.name,
			isDisplayable: true,
			isDisplayBlock: true,
			isParmValue: true,
			orderDefine: record.orderDefine
		})
		return await DataObj.initField(props.state, propParm, false, fields, props.dataObj, props.data)
	}

	async configParmItemsData(props: RawFieldProps) {
		const listRecordIdCurrent = props.state.parmsState.valueGet(ParmsValuesType.listRecordIdCurrent)
		if (listRecordIdCurrent) {
			const dataTab = new DataObjData()
			dataTab.parms.valueSet('listRecordIdCurrent', listRecordIdCurrent)
			const result: ResponseBody = await apiFetch(
				ApiFunction.dbEdgeGetRepParmItems,
				new TokenApiQueryData({ dataTab })
			)
			if (result.success) {
				const items: DataItems = result.data
				Object.entries(items).forEach(([key, value]) => {
					const fieldKey = key.replace('_items_', '')
					const fieldIndex = this.parmFields.findIndex((f) => f.colDO.propName === fieldKey)
					if (fieldIndex > -1) {
						this.parmFields[fieldIndex].colDO.items = value
					}
				})
			}
		}
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
