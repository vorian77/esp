import { Field, RawFieldProps } from '$comps/form/field'
import {
	FieldEmbed,
	FieldEmbedListConfig,
	FieldEmbedListEdit,
	FieldEmbedListSelect
} from '$comps/form/fieldEmbed'
import { DataObj, DataObjStatus } from '$utils/types'
import { StateSurfaceEmbedShell } from '$comps/app/types.appState'

export class FieldEmbedShell extends Field {
	fields: FieldEmbed[] = []
	stateShell: StateSurfaceEmbedShell
	constructor(props: RawFieldProps) {
		super(props)
		this.stateShell = new StateSurfaceEmbedShell({
			dataObjState: props.dataObj,
			embedField: this,
			stateRoot: props.state
		})
	}
	addField(field: FieldEmbed) {
		this.fields.push(field)
	}
	getStatus(dataObjForm: DataObj, recordId: string) {
		return this.getStatusShell()
	}
	getStatusShell() {
		let newStatus = new DataObjStatus()
		this.fields.forEach((field) => {
			if (field instanceof FieldEmbedListEdit) {
				const statusField = field.getStatusListEdit()
				newStatus = newStatus.update(statusField)
			}
		})
		return newStatus
	}
	static async init(props: RawFieldProps) {
		const EMBED_FIELD_TYPES = [FieldEmbedListConfig, FieldEmbedListEdit, FieldEmbedListSelect]
		const fieldShell = new FieldEmbedShell(props)
		props.fields.forEach((field) => {
			EMBED_FIELD_TYPES.forEach((type) => {
				if (field instanceof type) {
					fieldShell.addField(field)
				}
			})
		})
		return await fieldShell.stateShell.app.addLevelEmbedShell(fieldShell)
	}
}
