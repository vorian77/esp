import { Field, FieldAccess, FieldColor, PropsFieldRaw } from '$comps/form/field'
import { memberOfEnum, required, strRequired, valueOrDefault } from '$utils/types'
import {
	PropNamePrefixType,
	RawDataObjPropDisplay,
	RawDataObjPropDisplayCustom
} from '$comps/dataObj/types.rawDataObj'
import { getEnhancement } from '$enhance/actions/_actions'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/form/fieldCustom.ts'

export class FieldCustom extends Field {
	constructor(props: PropsFieldRaw) {
		super(props)
		const propRaw = valueOrDefault(props.propRaw, {})
		const clazz = 'FieldCustom'
		this.colDO.propNamePrefixType = PropNamePrefixType.custom
		this.colDO.propNamePrefixTypeId = strRequired(
			propRaw?.orderDefine?.toString(),
			clazz,
			'orderDefine'
		)
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
	constructor(props: PropsFieldRaw) {
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
	async initEnhancement() {
		this.enhancement = await getEnhancement(this.method)
	}
}

export class FieldCustomActionButton extends FieldCustomAction {
	constructor(props: PropsFieldRaw) {
		const clazz = 'FieldCustomActionButton'
		super(props)
		const customCol = required(
			props.propRaw.customCol,
			clazz,
			'customCol'
		) as RawDataObjPropDisplayCustom
		this.colDO.fieldColor = required(customCol.customColCodeColor, clazz, 'fieldColor')
	}
}
export class FieldCustomActionLink extends FieldCustomAction {
	prefix?: string
	constructor(props: PropsFieldRaw) {
		const clazz = 'FieldCustomActionLink'
		super(props)
		const customCol = required(
			props.propRaw.customCol,
			clazz,
			'customCol'
		) as RawDataObjPropDisplayCustom
		this.prefix = customCol.customColPrefix
	}
}

export class FieldCustomHeader extends FieldCustom {
	isSubHeader?: boolean
	size?: string
	source?: string
	sourceKey?: string
	constructor(props: PropsFieldRaw) {
		const clazz = 'FieldCustomHeader'
		super(props)
		const customCol = required(
			props.propRaw.customCol,
			clazz,
			'customCol'
		) as RawDataObjPropDisplayCustom
		this.isSubHeader = customCol.customColIsSubHeader
		this.size = customCol.customColSize
		this.source = customCol.customColSource
		this.sourceKey = customCol.customColSourceKey
	}
}

export class FieldCustomText extends FieldCustom {
	align?: string
	constructor(props: PropsFieldRaw) {
		const clazz = 'FieldCustomText'
		super(props)
		const customCol = required(
			props.propRaw.customCol,
			clazz,
			'customCol'
		) as RawDataObjPropDisplayCustom
		this.align = customCol.customColAlign
	}
}
