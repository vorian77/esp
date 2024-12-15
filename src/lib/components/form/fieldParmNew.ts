import { Field, FieldAlignment, PropsField, PropsFieldRaw } from '$comps/form/field'
// import { PropLinkItemsSource, RawDataObjPropDisplay } from '$comps/dataObj/types.rawDataObj'
// import { ValidityErrorLevel } from '$comps/form/types.validation'
// import {
// 	DataObj,
// 	DataObjData,
// 	type DataRecord,
// 	getRecordValue,
// 	ParmsValuesType,
// 	ResponseBody,
// 	valueOrDefault
// } from '$utils/types'
// import { apiFetch, ApiFunction } from '$routes/api/api'
// import { TokenApiQueryData } from '$utils/types.token'
// import { DataManagerNode } from '$comps/dataObj/types.dataManager.svelte'
// import { error } from '@sveltejs/kit'

const FILENAME = '$comps/form/fieldParm.ts/'

export class FieldParm extends Field {
	constructor(props: PropsFieldRaw) {
		super(props)
	}
}
export class FieldJunk extends Field {
	constructor(props: PropsFieldRaw) {
		super(props)
	}
}

// export class FieldParm extends Field {
// 	parmFields: Field[] = []
// 	constructor(props: PropsFieldRaw) {
// 		super(props)
// 		const clazz = 'FieldParm'
// 		this.isParmValue = true
// 	}
// 	async init(props: PropsField) {
// 		for (const dataRow of props.dataObj.data.rowsRetrieved.dataRows) {
// 			// this.parmFields.push(await this.configParmItemsInit(props, dataRow.record, this.parmFields))
// 		}
// 	}

// 	async configParmItemsInit(props: PropsField, record: DataRecord, fields: Field[]) {
// 		const propParmObj = {
// 			_codeAccess: getRecordValue(record, 'isRequired') ? 'required' : 'optional',
// 			_codeFieldElement: getRecordValue(record, 'codeFieldElement'),
// 			_column: {
// 				_codeAlignment: FieldAlignment.left,
// 				_codeDataType: getRecordValue(record, 'codeDataType'),
// 				header: getRecordValue(record, 'header'),
// 				isMultiSelect: getRecordValue(record, 'isMultiSelect'),
// 				isNonData: false,
// 				placeHolder: ''
// 			},
// 			_hasItems: getRecordValue(record, '_hasItems'),
// 			_linkItemsSource: await getFieldListItems({
// 				fieldListItems: getRecordValue(record, 'fieldListItems'),
// 				fieldListItemsParmName: getRecordValue(record, 'fieldListItemsParmName')
// 			}),
// 			_propName: getRecordValue(record, 'name'),
// 			isDisplayable: true,
// 			isDisplayBlock: true,
// 			isParmValue: true,
// 			orderDefine: getRecordValue(record, 'orderDefine')
// 		}
// 		const propParm = new RawDataObjPropDisplay(propParmObj, [])
// 		return DataObj.fieldsCreateItem(
// 			props.state,
// 			propParm,
// 			false,
// 			fields,
// 			props.dataObj,
// 			props.dataObj.data
// 		)
// 	}

// 	getStatus(node: DataManagerNode, recordId: string) {
// 		const row = node.recordsDisplay.findIndex((r) => r.id === recordId)
// 		if (row > -1) {
// 			return this.parmFields[row].getStatus(node, recordId)
// 		} else {
// 			error(500, {
// 				file: FILENAME,
// 				function: 'getStatus',
// 				message: `Unable to find row for recordId: ${recordId} for FieldParm: ${this.colDO.propName}`
// 			})
// 		}
// 	}

// 	validate(row: number, value: any, missingDataErrorLevel: ValidityErrorLevel) {
// 		return this.parmFields[row].validate(row, value, missingDataErrorLevel)
// 	}
// }

// async function getFieldListItems(obj: any) {
// 	obj = valueOrDefault(obj, {})
// 	if (!obj.fieldListItems) return undefined

// 	// parms
// 	const dataTab = new DataObjData()
// 	dataTab.parms.valueSet(ParmsValuesType.fieldListItems, obj.fieldListItems)
// 	dataTab.parms.valueSet(ParmsValuesType.itemsParmName, obj.fieldListItemsParmName)

// 	const result: ResponseBody = await apiFetch(
// 		ApiFunction.dbEdgeGetFieldListItems,
// 		new TokenApiQueryData({ dataTab })
// 	)
// 	if (result.success) {
// 		return result.data.data
// 	} else {
// 		error(500, {
// 			file: FILENAME,
// 			function: 'getLinkItemsSource',
// 			message: `Error retrieving LinkItemsSource: ${obj.fieldListItems}`
// 		})
// 	}
// }
