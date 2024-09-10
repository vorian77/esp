import { DataObj, DataObjSort, DataObjSortItem, type DataRecord } from '$utils/types'
import { PropSortDir } from '$comps/dataObj/types.rawDataObj'
import { Field } from '$comps/form/field'

export function recordsSearch(searchText: string, dataObj: DataObj, fieldsDisplayable: Field[]) {
	let records = recordsConcat(dataObj)

	const visibleFields = fieldsDisplayable.map((f) => f.colDO.propName)
	dataObj.dataRecordsDisplay = records.filter((record: DataRecord) => {
		let found = false
		for (const key in record) {
			if (visibleFields.includes(key)) {
				const value = record[key]
				if (value && value.toString().toLowerCase().includes(searchText.toLowerCase())) {
					found = true
					break
				}
			}
		}
		return found
	})

	dataObj.dataRecordsHidden = records.filter(
		(record) => !dataObj.dataRecordsDisplay.includes(record)
	)
}

function recordsConcat(dataObj: DataObj) {
	let records = recordsConcatList([], dataObj.dataRecordsDisplay)
	return recordsConcatList(records, dataObj.dataRecordsHidden)

	function recordsConcatList(recordsNew: DataRecord[], recordsOld: DataRecord[]) {
		recordsOld.forEach((record) => {
			if (-1 === recordsNew.findIndex((r) => r.id === record.id)) recordsNew.push(record)
		})
		return recordsNew
	}
}

export function recordsSelectAll(data: DataRecord[]) {
	return data.length === 0 ? false : data.every((r) => r.selected)
}

export function sortInit(fieldsDisplayable: Field[]) {
	let sortObj = new DataObjSort()
	let sortFields = fieldsDisplayable.filter(
		(f) => f.colDO.orderSort !== undefined && f.colDO.orderSort > -1
	)
	sortFields.sort((a, b) => a.colDO.orderSort! - b.colDO.orderSort!)
	sortFields.forEach((f) => {
		sortObj.addItem(f.colDO.propName, f.colDO.codeSortDir)
	})
	return sortObj
}

export function sortUser(sortObj: DataObjSort, recordsUser: DataRecord[]) {
	// adapted from: https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
	const fieldSorter = (sortItems: DataObjSortItem[]) => (a: any, b: any) =>
		sortItems
			.map((o) => {
				let dir = 1
				if (o.direction === PropSortDir.desc) dir = -1
				return a[o.fieldName] > b[o.fieldName] ? dir : a[o.fieldName] < b[o.fieldName] ? -dir : 0
			})
			.reduce((p, n) => (p ? p : n), 0)

	return recordsUser.sort(fieldSorter(sortObj.sortItems))
}
