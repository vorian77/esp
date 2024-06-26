import { Field, FieldAlignment, FieldElement, FieldProps, RawFieldProps } from '$comps/form/field'
import { RawDataObjPropDisplay } from '$comps/dataObj/types.rawDataObj'
import {
	DataObj,
	DataObjData,
	type DataRecord,
	DBTable,
	memberOfEnum,
	PropDataType,
	strOptional,
	strRequired
} from '$utils/types'

export class FieldParm extends Field {
	fieldParmItems: FieldParmItem[]
	constructor(props: RawFieldProps) {
		super(props)
		const clazz = 'FieldParm'
		this.fieldParmItems = this.initParmItems(props)
	}
	getParmField(fieldName: string) {
		return this.fieldParmItems.find((f) => f.name === fieldName)?.parmField
	}
	initParmItems(props: RawFieldProps) {
		let items: FieldParmItem[] = []
		props.data.dataRows.forEach((dataRow: DataRecord, index: number) => {
			items.push(
				new FieldParmItem(
					dataRow.record,
					items.map((item) => item.parmField),
					props.data
				)
			)
		})
		return items
	}
	async setDataItems(items: Record<string, any>) {
		Object.entries(items).forEach(([key, value]) => {
			const fieldKey = key.replace('_items_', '')
			const fieldIndex = this.fieldParmItems.findIndex((f) => f.name === fieldKey)
			if (fieldIndex > -1) {
				this.fieldParmItems[fieldIndex].parmField.colDO.items = value
			}
		})
	}
}

export class FieldParmItem {
	codeDataType: string
	codeFieldElement: string
	fieldListItems?: string
	fieldListItemsParmName?: string
	isMultiSelect: boolean
	linkTable?: DBTable
	name: string
	parmField: Field
	parmValue: any
	constructor(record: DataRecord, fields: Field[], data: DataObjData) {
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
		this.parmField = this.getParmField(record, fields, data)
		this.parmField.isParmValue = true
		this.parmValue = record.parmValue
	}
	getParmField(record: DataRecord, fields: Field[], data: DataObjData) {
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
			_hasItems: record.fieldListItems && record.fieldListItems.length > 0,
			_propName: record.name,
			isDisplayBlock: true,
			orderDisplay: record.orderDefine
		})
		return DataObj.initField(propParm, false, fields, data)
	}
}
