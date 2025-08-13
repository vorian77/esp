import type { DataRecord } from '$utils/types'
import { DataRow, valueOrDefault } from '$utils/types'
import { error } from '@sveltejs/kit'
import { list } from '@vercel/blob'

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
}

export class ParmsValuesFormList extends ParmsValues {
	constructor(data: ParmsValuesFormListType) {
		data.listIds = data.listIds || []
		data.listIdsSelected = data.listIdsSelected || []
		data.listRecordIdCurrent = data.listRecordIdCurrent || ''
		super(data)
	}
	static load(parms: ParmsValues) {
		const newParms = new ParmsValuesFormList(parms.data as ParmsValuesFormListType)
		if (parms) newParms.data = parms.data
		return newParms
	}
}

export type ParmsValuesFormListType = {
	listIds?: string[]
	listIdsSelected?: string[]
	listRecordIdCurrent?: string
}

export enum ParmsValuesType {
	attributeAccessFilter = '<attributeAccessFilter>',
	columnDefs = 'columnDefs',
	customProgramOwnerId = 'customProgramOwnerId',
	embedDataObjId = 'embedDataObjId',
	embedFieldName = 'embedFieldName',
	embedParentId = 'embedParentId',
	fieldListItems = 'fieldListItems',
	isEmbedSaveWithParent = 'isEmbedSaveWithParent',
	isModalCloseOnEmptyList = 'isModalCloseOnEmptyList',
	isMultiSelect = 'isMultiSelect',
	itemsParmValue = 'itemsParmValue',
	itemsParmValueField = 'itemsParmValueField',
	itemsParmValueList = 'itemsParmValueList',
	listIds = 'listIds',
	listIdsSelected = 'listIdsSelected',
	listRecordIdCurrent = 'listRecordIdCurrent',
	listSortModel = 'listSortModel',
	modalDate = 'modalDate',
	parentRecordId = 'parentRecordId',
	rowData = 'rowData',
	selectListId = 'selectListId',
	selectListRecord = 'selectListRecord',
	systemIdQuerySource = 'systemIdQuerySource',
	tokenAppModalSelect = 'tokenAppModalSelect',
	treeAncestorValue = 'treeAncestorValue'
}
