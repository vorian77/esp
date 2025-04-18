import {
	Field,
	FieldClassType,
	FieldAlignment,
	PropsFieldInit,
	PropsFieldCreate
} from '$comps/form/field.svelte'
import { RawDataObjPropDisplay } from '$comps/dataObj/types.rawDataObj.svelte'
import { ValidityErrorLevel } from '$comps/form/types.validation'
import { DataObj, type DataRecord, getDataRecordValueKey } from '$utils/types'
import { apiFetchFunction, ApiFunction } from '$routes/api/api'
import { TokenApiFetchError, TokenApiId } from '$utils/types.token'
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
			_codeAccess: getDataRecordValueKey(record, 'isRequired') ? 'required' : 'optional',
			_codeFieldElement: getDataRecordValueKey(record, 'codeFieldElement'),
			_column: {
				_codeAlignment: FieldAlignment.left,
				_codeDataType: getDataRecordValueKey(record, 'codeDataType'),
				header: getDataRecordValueKey(record, 'header'),
				isFormTag: false,
				isMultiSelect: getDataRecordValueKey(record, 'isMultiSelect'),
				placeHolder: ''
			},
			_hasItems: getDataRecordValueKey(record, '_hasItems'),
			_linkItemsSource: await getLinkItemsSource(getDataRecordValueKey(record, 'fieldListItems')),
			_propName: getDataRecordValueKey(record, 'name'),
			id: getDataRecordValueKey(record, 'id'),
			isDisplayable: true,
			isDisplayBlock: true,
			isParmValue: true,
			orderDefine: getDataRecordValueKey(record, 'orderDefine')
		}
		const propParm = new RawDataObjPropDisplay(propParmObj, [])
		const field: Field = await DataObj.fieldsCreateItem(props.sm, props.dataObj, propParm, fields)
		await field.linkItems?.retrieve(props.sm, record.parmValue)
		return field

		async function getLinkItemsSource(fieldListItemsName: string) {
			return await apiFetchFunction(
				ApiFunction.dbGelGetLinkItemsSource,
				new TokenApiFetchError(
					FILENAME,
					'getLinkItemsSource',
					`Error retrieving link items source id: ${fieldListItemsName}`
				),
				new TokenApiId(fieldListItemsName)
			)
		}
	}

	validate(row: number, value: any, missingDataErrorLevel: ValidityErrorLevel) {
		return this.parmFields[row].validate(row, value, missingDataErrorLevel)
	}
}
