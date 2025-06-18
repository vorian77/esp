import type { DataRecord } from '$utils/types'
import { DataRow, valueOrDefault } from '$utils/types'
import { error } from '@sveltejs/kit'

export class ParmsValues {
	data: DataRecord = {}
	constructor(data?: DataRecord) {
		this.data = valueOrDefault(data, {})
	}
	hasOwn(key: string) {
		return Object.hasOwn(this.data, key)
	}
	static load(parms: ParmsValues) {
		const newParms = new ParmsValues()
		if (parms) newParms.data = parms.data
		return newParms
	}
	reset() {
		this.data = {}
	}
	update(data: DataRecord | undefined) {
		data = data ? data : {}
		Object.entries(data).forEach(([key, value]) => {
			this.data[key] = value
		})
	}
	updateList(listIds: string[], recordId: string, recordIdAlt: string = '') {
		this.valueSet(ParmsValuesType.listIds, listIds)
		this.valueSet(ParmsValuesType.listRecordIdCurrent, recordIdAlt ? recordIdAlt : recordId)
	}
	valueExists(key: string) {
		return Object.hasOwn(this.data, key)
	}
	valueGet(key: string) {
		return this.data[key]
	}
	valueGetAll() {
		let newParms: DataRecord = {}
		Object.entries(this.data).forEach(([key, value]) => {
			newParms[key] = value
		})
		return newParms
	}
	valueSet(key: string, value: any) {
		this.data[key] = value
	}
	valueSetDefault(key: string, parms: DataRecord, defaultValue: any) {
		this.valueSet(key, Object.hasOwn(parms, key) ? parms[key] : defaultValue)
	}
	valueSetIfMissing(key: string, value: any) {
		if (!this.valueExists(key)) this.valueSet(key, value)
	}
	valueSetList(key: string, dataRows?: DataRow[]) {
		this.valueSet(key, dataRows ? dataRows.map((row) => row.record.id) : [])
	}
}

export enum ParmsValuesType {
	attributeAccessFilter = '<attributeAccessFilter>',
	columnDefs = 'columnDefs',
	customProgramOwnerId = 'customProgramOwnerId',
	embedFieldName = 'embedFieldName',
	embedParentId = 'embedParentId',
	fieldListItems = 'fieldListItems',
	isMultiSelect = 'isMultiSelect',
	itemsParmValue = 'itemsParmValue',
	itemsParmValueList = 'itemsParmValueList',
	listIds = 'listIds',
	listIdsSelected = 'listIdsSelected',
	listRecordIdCurrent = 'listRecordIdCurrent',
	listSortModel = 'listSortModel',
	parentRecordId = 'parentRecordId',
	queryOwnerOrg = 'queryOwnerOrg',
	queryOwnerSys = 'queryOwnerSys',
	rowData = 'rowData',
	selectLabel = 'selectLabel',
	selectListId = 'selectListId',
	selectListRecord = 'selectListRecord',
	treeAncestorValue = 'treeAncestorValue'
}
