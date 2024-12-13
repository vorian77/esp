import { Field, PropsField, PropsFieldRaw } from '$comps/form/field'
import {
	FieldEmbed,
	FieldEmbedListConfig,
	FieldEmbedListEdit,
	FieldEmbedListSelect
} from '$comps/form/fieldEmbed'
import { DataObj, DataObjStatus } from '$utils/types'
import { StatePacketAction, StateSurfaceEmbedShell } from '$comps/app/types.appState.svelte'

export class FieldEmbedShell extends Field {
	fields: FieldEmbed[] = []
	stateShell: StateSurfaceEmbedShell
	constructor(props: PropsFieldRaw) {
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
	async init(props: PropsField) {
		const EMBED_FIELD_TYPES = [FieldEmbedListConfig, FieldEmbedListEdit, FieldEmbedListSelect]
		props.dataObj.fields.forEach((field) => {
			EMBED_FIELD_TYPES.forEach((type) => {
				if (field instanceof type) {
					this.addField(field)
				}
			})
		})
		await this.stateShell.app.addLevelEmbedShell(this)
	}
}
