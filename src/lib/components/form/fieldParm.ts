import { RawDataObjPropDisplay } from '$comps/dataObj/types.rawDataObj.svelte'
import {
	Field,
	FieldAlignment,
	FieldClassType,
	PropsFieldCreate,
	PropsFieldInit
} from '$comps/form/field.svelte'
import { ValidityErrorLevel } from '$comps/form/types.validation'
import { DbTableQueryGroup } from '$lib/queryClient/types.queryClient'
import { apiFetchFunction, ApiFunction } from '$routes/api/api'
import {
	DataObj,
	type DataRecord,
	getDataRecordValueKey,
	getDataRecordValueKeyData,
	getDataRecordValueKeyDisplay,
	MethodResult
} from '$utils/types'
import { TokenApiId } from '$utils/types.token'

const FILENAME = '$comps/form/fieldParm.ts/'

export class FieldParm extends Field {
	classType: FieldClassType = FieldClassType.parm
	parmFields: Field[] = []
	constructor(props: PropsFieldCreate) {
		super(props)
		const clazz = 'FieldParm'
		this.isParmValue = true
	}

	async init(props: PropsFieldInit): Promise<MethodResult> {
		for (const dataRow of props.data.rowsRetrieved.dataRows) {
			let result: MethodResult = await this.configParmItemsInit(
				props,
				dataRow.record,
				this.parmFields
			)
			if (result.error) return result
			const field: Field = result.data
			this.parmFields.push(field)
		}
		return new MethodResult()
	}

	async configParmItemsInit(
		propsFieldInit: PropsFieldInit,
		record: DataRecord,
		fields: Field[]
	): Promise<MethodResult> {
		const propParmObj = {
			_codeAccess: getDataRecordValueKey(record, 'isRequired') ? 'required' : 'optional',
			_codeFieldElement: getDataRecordValueKeyDisplay(record, 'codeFieldElement'),
			_column: {
				_codeAlignment: FieldAlignment.left,
				_codeDataType: getDataRecordValueKeyDisplay(record, 'codeDataType'),
				header: getDataRecordValueKey(record, 'header'),
				isFormTag: false,
				isMultiSelect: getDataRecordValueKey(record, 'isMultiSelect'),
				placeHolder: ''
			},
			_hasItems: getDataRecordValueKey(record, '_hasItems'),
			_linkItemsSource: await getLinkItemsSource(
				getDataRecordValueKeyData(record, 'fieldListItems')
			),
			_propName: getDataRecordValueKey(record, 'name'),
			id: getDataRecordValueKey(record, 'id'),
			isDisplayable: true,
			isDisplayBlock: true,
			isParmValue: true,
			orderDefine: getDataRecordValueKey(record, 'orderDefine')
		}
		const propParm = new RawDataObjPropDisplay(propParmObj, new DbTableQueryGroup([]))

		let result: MethodResult = await DataObj.fieldsCreateItem(propsFieldInit, propParm)
		if (result.error) return result
		const field: Field = result.data

		if (field.linkItems) {
			result = await field.linkItems.retrieve(propsFieldInit.sm, record.parmValue)
			if (result.error) return result
			record.parmValue = field.linkItems.getValueRaw(record.parmValue)
		}

		return new MethodResult(field)

		async function getLinkItemsSource(fieldListItemId: string) {
			if (!fieldListItemId) return undefined
			const result: MethodResult = await apiFetchFunction(
				ApiFunction.dbGelGetLinkItemsSource,
				new TokenApiId(fieldListItemId)
			)
			return result.data
		}
	}

	validate(row: number, value: any, missingDataErrorLevel: ValidityErrorLevel) {
		return this.parmFields[row].validate(row, value, missingDataErrorLevel)
	}
}
