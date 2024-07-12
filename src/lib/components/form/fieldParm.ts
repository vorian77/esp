import { Field, FieldAlignment, FieldElement, RawFieldProps } from '$comps/form/field'
import { RawDataObjPropDisplay } from '$comps/dataObj/types.rawDataObj'
import { ValidityErrorLevel } from '$comps/form/types.validation'
import {
	DataObj,
	DataObjData,
	type DataRecord,
	DBTable,
	memberOfEnum,
	PropDataType,
	ResponseBody,
	strOptional,
	strRequired
} from '$utils/types'
import { State } from '$comps/app/types.appState'
import { apiFetch, ApiFunction } from '$routes/api/api'
import { TokenApiQueryData } from '$utils/types.token'

export class FieldParm extends Field {
	fieldParmItems: FieldParmItem[] = []
	constructor(props: RawFieldProps) {
		super(props)
		const clazz = 'FieldParm'
		this.isParmValue = true
	}
	static async init(props: RawFieldProps) {
		const field = new FieldParm(props)
		field.fieldParmItems = await field.configParmItems(props)
		await field.configParmItemsData(props)
		return field
	}

	async configParmItems(props: RawFieldProps) {
		let items: FieldParmItem[] = []
		for (const dataRow of props.data.dataRows) {
			items.push(
				await FieldParmItem.init(
					props.state,
					dataRow.record,
					items.map((item) => item.parmField),
					props.data
				)
			)
		}
		return items
	}
	async configParmItemsData(props: RawFieldProps) {
		const repUserId = props.state.dataQuery.valueGet('listRecordIdParent')
		if (repUserId) {
			const result: ResponseBody = await apiFetch(
				ApiFunction.dbEdgeGetRepParmItems,
				new TokenApiQueryData({ parms: { repUserId } })
			)
			if (result.success) {
				const items: Record<string, any> = result.data
				Object.entries(items).forEach(([key, value]) => {
					const fieldKey = key.replace('_items_', '')
					const fieldIndex = this.fieldParmItems.findIndex((f) => f.name === fieldKey)
					if (fieldIndex > -1) {
						this.fieldParmItems[fieldIndex].parmField.colDO.items = value
					}
				})
			}
		}
	}

	getParmField(fieldName: string) {
		return this.fieldParmItems.find((f) => f.name === fieldName)?.parmField
	}
	validate(record: DataRecord, row: number, missingDataErrorLevel: ValidityErrorLevel) {
		return this.validateField(this.fieldParmItems[row].parmField, record, missingDataErrorLevel)
	}
}

export class FieldParmItem {
	codeDataType: PropDataType
	codeFieldElement: FieldElement
	fieldListItems?: string
	fieldListItemsParmName?: string
	isMultiSelect: boolean
	linkTable?: DBTable
	name: string
	parmField: Field
	private constructor(record: DataRecord, fields: Field[], data: DataObjData, parmField: Field) {
		const clazz = 'FieldParmItem'
		this.codeDataType = memberOfEnum(
			record.codeDataType,
			clazz,
			'codeDataType',
			'PropDataType',
			PropDataType
		)
		this.codeFieldElement = memberOfEnum(
			record.codeFieldElement,
			clazz,
			'codeFieldElement',
			'FieldElement',
			FieldElement
		)
		this.fieldListItems = strOptional(record.fieldListItems, clazz, 'fieldListItems')
		this.fieldListItemsParmName = strOptional(
			record.fieldListItemsParmName,
			clazz,
			'fieldListItemsParmName'
		)
		this.isMultiSelect = record.isMultiSelect
		this.linkTable = record._linkTable ? new DBTable(record._linkTable) : undefined
		this.name = strRequired(record.name, clazz, 'name')
		this.parmField = parmField
	}
	static async init(state: State, record: DataRecord, fields: Field[], data: DataObjData) {
		const propParm = new RawDataObjPropDisplay({
			_column: {
				_codeAlignment: FieldAlignment.left,
				_codeDataType: record.codeDataType,
				header: record.header,
				isMultiSelect: record.isMultiSelect,
				isNonData: false,
				placeHolder: ''
			},
			_codeAccess: record.isRequired ? 'required' : 'optional',
			_codeFieldElement: record.codeFieldElement,
			_hasItems: record._hasItems,
			_propName: record.name,
			isDisplayable: true,
			isDisplayBlock: true,
			isParmValue: true,
			orderDefine: record.orderDefine
		})
		const parmField = await DataObj.initField(state, propParm, false, fields, data)
		return new FieldParmItem(record, fields, data, parmField)
	}
}
