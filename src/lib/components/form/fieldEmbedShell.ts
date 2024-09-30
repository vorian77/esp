import { Field, RawFieldProps } from '$comps/form/field'
import {
	FieldEmbed,
	FieldEmbedListConfig,
	FieldEmbedListEdit,
	FieldEmbedListSelect
} from '$comps/form/fieldEmbed'
import { DataObj, DataObjStatus } from '$utils/types'
import { StatePacketAction, StateSurfaceEmbedShell } from '$comps/app/types.appState'
import action from '$enhance/actions/actionAuth'

export class FieldEmbedShell extends Field {
	fields: FieldEmbed[] = []
	stateShell: StateSurfaceEmbedShell
	constructor(props: RawFieldProps) {
		super(props)
		this.stateShell = new StateSurfaceEmbedShell({
			action: StatePacketAction.embedShell,
			dataObjState: props.dataObj,
			embedField: this,
			stateRoot: props.state
		})
	}
	addField(field: FieldEmbed) {
		this.fields.push(field)
	}
	getStatus(dataObjForm: DataObj, recordId: string) {
		let newStatus = new DataObjStatus()
		this.fields.forEach((field) => {
			const statusField = field.getStatus(dataObjForm, recordId)
			newStatus = newStatus.update(statusField)
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
