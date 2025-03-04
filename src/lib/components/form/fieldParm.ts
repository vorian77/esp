import {
	Field,
	FieldClassType,
	FieldAlignment,
	PropsFieldInit,
	PropsFieldCreate
} from '$comps/form/field.svelte'
import { RawDataObjPropDisplay } from '$comps/dataObj/types.rawDataObj.svelte'
import { ValidityErrorLevel } from '$comps/form/types.validation'
import { DataObj, ResponseBody, type DataRecord, getRecordValue } from '$utils/types'
import { apiFetch, ApiFunction } from '$routes/api/api'
import { TokenApiId } from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '$comps/form/fieldParm.ts/'

export class FieldParm extends Field {
	classType: FieldClassType = FieldClassType.parm
	parmFields: Field[] = []
	constructor(props: PropsFieldCreate) {
		super(props)
		const clazz = 'FieldParm'
		this.isParmValue = true
	}
	getField(row: number) {
		return this.parmFields[row]
	}

	async init(props: PropsFieldInit) {
		for (const dataRow of props.dataObj.data.rowsRetrieved.dataRows) {
			this.parmFields.push(await this.configParmItemsInit(props, dataRow.record, this.parmFields))
		}
	}

	async configParmItemsInit(props: PropsFieldInit, record: DataRecord, fields: Field[]) {
		const propParmObj = {
			_codeAccess: getRecordValue(record, 'isRequired') ? 'required' : 'optional',
			_codeFieldElement: getRecordValue(record, 'codeFieldElement'),
			_column: {
				_codeAlignment: FieldAlignment.left,
				_codeDataType: getRecordValue(record, 'codeDataType'),
				header: getRecordValue(record, 'header'),
				isFormTag: false,
				isMultiSelect: getRecordValue(record, 'isMultiSelect'),
				placeHolder: ''
			},
			_hasItems: getRecordValue(record, '_hasItems'),
			_linkItemsSource: await getLinkItemsSource(getRecordValue(record, 'fieldListItems')),
			_propName: getRecordValue(record, 'name'),
			id: getRecordValue(record, 'id'),
			isDisplayable: true,
			isDisplayBlock: true,
			isParmValue: true,
			orderDefine: getRecordValue(record, 'orderDefine')
		}
		const propParm = new RawDataObjPropDisplay(propParmObj, [])
		const field: Field = await DataObj.fieldsCreateItem(props.sm, props.dataObj, propParm, fields)
		await field.linkItems?.retrieve(props.sm, record.parmValue)
		return field

		async function getLinkItemsSource(fieldListItemsName: string) {
			const result: ResponseBody = await apiFetch(
				ApiFunction.dbGelGetLinkItemsSource,
				new TokenApiId(fieldListItemsName)
			)
			if (result.success) {
				return result.data
			} else {
				error(500, {
					file: FILENAME,
					function: 'getNodesLevel',
					message: `Error retrieving link items source id: ${fieldListItemsName}`
				})
			}
		}
	}

	validate(row: number, value: any, missingDataErrorLevel: ValidityErrorLevel) {
		return this.parmFields[row].validate(row, value, missingDataErrorLevel)
	}
}
