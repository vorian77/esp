import { Field, RawFieldProps } from '$comps/form/field'
import { DataObj } from '$utils/types'

export class FieldEmbedShell extends Field {
	dataObjEmbed: DataObj[] = []
	constructor(props: RawFieldProps) {
		super(props)
	}
	addDataObjEmbed(dataObj: DataObj) {
		this.dataObjEmbed.push(dataObj)
	}
	static async init(props: RawFieldProps) {
		return new FieldEmbedShell(props)
	}
}
