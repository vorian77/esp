import {
	DataObj,
	DataObjActionField,
	DataObjSort,
	DataObjSortItem,
	type DataRecord
} from '$utils/types'
import { PropSortDir } from '$comps/dataObj/types.rawDataObj'
import { Field } from '$comps/form/field'

export function recordsFilter(filterText: string, dataObj: DataObj, fields: Field[]) {
	let records = dataObj.dataRecordsDisplay.concat(dataObj.dataRecordsHidden)

	// filter - filter text
	const visibleFields = fields.map((f) => f.colDO.propName)
	dataObj.dataRecordsDisplay = records.filter((record: DataRecord) => {
		let found = false
		for (const key in record) {
			if (visibleFields.includes(key)) {
				const value = record[key]
				if (value && value.toString().toLowerCase().includes(filterText.toLowerCase())) {
					found = true
					break
				}
			}
		}
		return found
	})

	// filter non-displayable records
	const orderDisplay = 'orderDisplay'
	const orderDisplayFieldIndex = fields.findIndex((f) => f.colDO.propName === orderDisplay)
	if (orderDisplayFieldIndex > -1) {
		dataObj.dataRecordsDisplay = dataObj.dataRecordsDisplay.filter(
			(record) => typeof record[orderDisplay] === 'number' && record[orderDisplay] > -1
		)
	}

	// set filtered list
	dataObj.dataRecordsHidden = records.filter(
		(record) => !dataObj.dataRecordsDisplay.includes(record)
	)
}

export function recordsSelectAll(data: DataRecord[]) {
	return data.length === 0 ? false : data.every((r) => r.selected)
}

export function sortInit(fields: Field[]) {
	let sortObj = new DataObjSort()
	let sortFields = fields.filter((f) => f.colDO.orderSort !== undefined && f.colDO.orderSort > -1)
	sortFields.sort((a, b) => a.colDO.orderSort! - b.colDO.orderSort!)
	sortFields.forEach((f) => {
		sortObj.addItem(f.colDO.propName, f.colDO.codeSortDir)
	})
	return sortObj
}

export function sortUser(sortObj: DataObjSort, recordsUser: DataRecord[]) {
	// adapted from: https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
	const fieldSorter = (fields: { name: string; dir: PropSortDir }[]) => (a: any, b: any) =>
		fields
			.map((o) => {
				let dir = 1
				if (o.dir === PropSortDir.desc) dir = -1
				return a[o.name] > b[o.name] ? dir : a[o.name] < b[o.name] ? -dir : 0
			})
			.reduce((p, n) => (p ? p : n), 0)

	return recordsUser.sort(
		fieldSorter(
			sortObj.sortItems.map((item: DataObjSortItem) => {
				return { name: item.fieldName, dir: item.direction }
			})
		)
	)
}
