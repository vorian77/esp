import { DataObj } from '$utils/types'
import { Field, FieldColor } from '$comps/form/field'

const FILENAME = '$comps/form/types.fieldGroup.ts'

export function getDetailElements(dataObj: DataObj) {
	let newEls: DetailEl[] = []
	let currGroup: DetailElGroup | undefined
	dataObj.fields.forEach((field, idx) => {
		const propName = field.colDO.propNameRaw.toLowerCase()
		switch (propName) {
			case 'custom_details_end':
			case 'custom_row_end':
			case 'custom_section_end':
				currGroup = currGroup?.parent
				break

			case 'custom_details_start':
				addElGroup(new DetailElGroupDetails(field, currGroup))
				break

			case 'custom_row_start':
				addElGroup(new DetailElGroupRow(field, currGroup))
				break

			case 'custom_section_start':
				addElGroup(new DetailElGroupSection(field, currGroup))
				break

			default:
				addEl(new DetailElField(field, idx))
		}
	})
	return newEls

	function addElGroup(elGroup: DetailElGroup) {
		addEl(elGroup)
		currGroup = elGroup
	}

	function addEl(el: DetailEl) {
		if (currGroup) {
			currGroup.elements.push(el)
		} else {
			newEls.push(el)
		}
	}
}

export class DetailEl {
	field: Field
	elements: DetailEl[] = []
	constructor(field: Field) {
		this.field = field
	}
}

export class DetailElField extends DetailEl {
	idx: number
	constructor(field: Field, idx: number) {
		super(field)
		this.field = field
		this.idx = idx
	}
}

export class DetailElGroup extends DetailEl {
	label: string
	parent?: DetailElGroup
	constructor(field: Field, parent: DetailElGroup | undefined, label: string = '') {
		super(field)
		this.parent = parent
		this.label = label
	}
}

export class DetailElGroupDetails extends DetailElGroup {
	constructor(field: Field, parent: DetailElGroup | undefined) {
		super(field, parent, field.colDO.headerAlt)
	}
}

export class DetailElGroupRow extends DetailElGroup {
	constructor(field: Field, parent: DetailElGroup | undefined) {
		super(field, parent, '')
	}
}

export class DetailElGroupSection extends DetailElGroup {
	constructor(field: Field, parent: DetailElGroup | undefined) {
		super(field, parent, field.colDO.headerAlt)
	}
}
