import { Field, FieldAccess, FieldColor, RawFieldProps } from '$comps/form/field'
import { memberOfEnum, required, strRequired, valueOrDefault } from '$utils/types'
import { RawDataObjPropDisplay, RawDataObjPropDisplayCustom } from '$comps/dataObj/types.rawDataObj'
import { getEnhancement } from '$enhance/actions/_actions'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/form/fieldCustom.ts'

export class FieldCustom extends Field {
	constructor(props: RawFieldProps) {
		super(props)
		const propRaw = valueOrDefault(props.propRaw, {})
		const clazz = 'FieldCustom'
		this.colDO.propName +=
			'_' + strRequired(propRaw?.orderDefine?.toString(), clazz, 'orderDisplay')
		this.fieldAccess = FieldAccess.readonly
		const customCol = required(propRaw.customCol, clazz, 'customCol') as RawDataObjPropDisplayCustom
		this.colDO.label = strRequired(customCol.customColLabel, clazz, 'label')
	}
}

export class FieldCustomAction extends FieldCustom {
	enhancement: Function | undefined
	method: string
	type: string
	value: string
	constructor(props: RawFieldProps) {
		const clazz = 'FieldCustomAction'
		super(props)
		const customCol = required(
			props.propRaw.customCol,
			clazz,
			'customCol'
		) as RawDataObjPropDisplayCustom
		this.method = strRequired(customCol.customColActionMethod, clazz, 'method').toLowerCase()
		this.type = strRequired(customCol.customColActionType, clazz, 'type').toLowerCase()
		this.value = valueOrDefault(customCol.customColActionValue, '').toLowerCase()
	}
	static async init(props: RawFieldProps) {
		return new FieldCustomAction(props)
	}
	async initEnhancement() {
		this.enhancement = await getEnhancement(this.method)
	}
}

export class FieldCustomActionButton extends FieldCustomAction {
	constructor(props: RawFieldProps) {
		const clazz = 'FieldCustomActionButton'
		super(props)
		const customCol = required(
			props.propRaw.customCol,
			clazz,
			'customCol'
		) as RawDataObjPropDisplayCustom
		this.colDO.fieldColor = required(customCol.customColCodeColor, clazz, 'fieldColor')
	}
	static async init(props: RawFieldProps) {
		return new FieldCustomActionButton(props)
	}
}
export class FieldCustomActionLink extends FieldCustomAction {
	prefix?: string
	constructor(props: RawFieldProps) {
		const clazz = 'FieldCustomActionLink'
		super(props)
		const customCol = required(
			props.propRaw.customCol,
			clazz,
			'customCol'
		) as RawDataObjPropDisplayCustom
		this.prefix = customCol.customColPrefix
	}
	static async init(props: RawFieldProps) {
		return new FieldCustomActionLink(props)
	}
}

export class FieldCustomHeader extends FieldCustom {
	size?: string
	source?: string
	sourceKey?: string
	constructor(props: RawFieldProps) {
		const clazz = 'FieldCustomHeader'
		super(props)
		const customCol = required(
			props.propRaw.customCol,
			clazz,
			'customCol'
		) as RawDataObjPropDisplayCustom
		this.size = customCol.customColSize
		this.source = customCol.customColSource
		this.sourceKey = customCol.customColSourceKey
	}
	static async init(props: RawFieldProps) {
		return new FieldCustomHeader(props)
	}
}

export class FieldCustomText extends FieldCustom {
	align?: string
	constructor(props: RawFieldProps) {
		const clazz = 'FieldCustomText'
		super(props)
		const customCol = required(
			props.propRaw.customCol,
			clazz,
			'customCol'
		) as RawDataObjPropDisplayCustom
		this.align = customCol.customColAlign
	}
	static async init(props: RawFieldProps) {
		return new FieldCustomText(props)
	}
}
