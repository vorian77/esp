import { Field, FieldAlignment, PropsField, PropsFieldRaw } from '$comps/form/field'
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
	constructor(props: PropsFieldRaw) {
		super(props)
		const clazz = 'FieldParm'
		this.isParmValue = true
	}
	async init(props: PropsField) {
		this.parmFields = await this.configParmItems(props)
		await this.configParmItemsData(props)
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
			_column: {
				_codeAlignment: FieldAlignment.left,
				_codeDataType: props.dataObj.getDataVal(record, 'codeDataType'),
				header: props.dataObj.getDataVal(record, 'header'),
				isMultiSelect: props.dataObj.getDataVal(record, 'isMultiSelect'),
				isNonData: false,
				placeHolder: ''
			},
			_codeAccess: 'required',
			_codeFieldElement: props.dataObj.getDataVal(record, 'codeFieldElement'),
			_hasItems: props.dataObj.getDataVal(record, '_hasItems'),
			_propName: props.dataObj.getDataVal(record, 'name'),
			isDisplayable: true,
			isDisplayBlock: true,
			isParmValue: true,
			orderDefine: props.dataObj.getDataVal(record, 'orderDefine')
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

	async configParmItemsData(props: PropsField) {
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
					const fieldIndex = this.parmFields.findIndex((f) => key.endsWith(f.colDO.propNameRaw))
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
