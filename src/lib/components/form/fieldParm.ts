import {
	Field,
	FieldClassType,
	FieldAlignment,
	PropsFieldInit,
	PropsFieldCreate
} from '$comps/form/field'
import { RawDataObjPropDisplay } from '$comps/dataObj/types.rawDataObj'
import { ValidityErrorLevel } from '$comps/form/types.validation'
import {
	DataObj,
	DataObjData,
	type DataRecord,
	getRecordValue,
	ParmsValuesType,
	ResponseBody,
	valueOrDefault
} from '$utils/types'
import { apiFetch, ApiFunction } from '$routes/api/api'
import { TokenApiQueryData } from '$utils/types.token'
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
				isMultiSelect: getRecordValue(record, 'isMultiSelect'),
				isNonData: false,
				placeHolder: ''
			},
			_hasItems: getRecordValue(record, '_hasItems'),
			_linkItemsSource: await getFieldListItems({
				fieldListItems: getRecordValue(record, 'fieldListItems'),
				fieldListItemsParmName: getRecordValue(record, 'fieldListItemsParmName'),
				user: props.sm.user
			}),
			_propName: getRecordValue(record, 'name'),
			id: getRecordValue(record, 'id'),
			isDisplayable: true,
			isDisplayBlock: true,
			isParmValue: true,
			orderDefine: getRecordValue(record, 'orderDefine')
		}
		const propParm = new RawDataObjPropDisplay(propParmObj, [])
		return DataObj.fieldsCreateItem(props.sm, props.dataObj, propParm, fields)
	}

	validate(row: number, value: any, missingDataErrorLevel: ValidityErrorLevel) {
		return this.parmFields[row].validate(row, value, missingDataErrorLevel)
	}
}

async function getFieldListItems(obj: any) {
	obj = valueOrDefault(obj, {})
	if (!obj.fieldListItems) return undefined

	// parms
	const dataTab = new DataObjData()
	dataTab.parms.valueSet(ParmsValuesType.fieldListItems, obj.fieldListItems)
	dataTab.parms.valueSet(ParmsValuesType.itemsParmName, obj.fieldListItemsParmName)

	const result: ResponseBody = await apiFetch(
		ApiFunction.dbEdgeGetFieldListItems,
		new TokenApiQueryData({ dataTab, user: obj.user })
	)
	if (result.success) {
		return result.data.data
	} else {
		error(500, {
			file: FILENAME,
			function: 'getLinkItemsSource',
			message: `Error retrieving LinkItemsSource: ${obj.fieldListItems}`
		})
	}
}
