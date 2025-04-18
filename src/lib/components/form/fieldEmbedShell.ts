import { Field, FieldClassType, PropsFieldInit, PropsFieldCreate } from '$comps/form/field.svelte'
import {
	FieldEmbed,
	FieldEmbedListConfig,
	FieldEmbedListEdit,
	FieldEmbedListSelect
} from '$comps/form/fieldEmbed'
import { CodeActionType, required } from '$utils/types'
import { StateSurfaceEmbedShell } from '$comps/app/types.appState.svelte'

export class FieldEmbedShell extends Field {
	classType: FieldClassType = FieldClassType.embedShell
	fields: FieldEmbed[] = []
	stateShell: StateSurfaceEmbedShell
	constructor(props: PropsFieldCreate) {
		const clazz = 'FieldEmbedShell'
		super(props)
		const dataObj = required(props.parms.dataObj, clazz, 'dataObj')

		this.stateShell = new StateSurfaceEmbedShell({
			action: CodeActionType.embedShell,
			dataObjState: dataObj,
			embedField: this
			// stateRoot: props.sm
		})
	}
	addField(field: FieldEmbed) {
		this.fields.push(field)
	}

	async init(props: PropsFieldInit) {
		const EMBED_FIELD_TYPES = [FieldEmbedListConfig, FieldEmbedListEdit, FieldEmbedListSelect]
		props.dataObj.fields.forEach((field) => {
			EMBED_FIELD_TYPES.forEach((type) => {
				if (field instanceof type) {
					this.addField(field)
				}
			})
		})
		await this.stateShell.app.addLevelEmbedShellForm(this)
	}
}
