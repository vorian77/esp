import { Field, FieldAccess, FieldColor, PropsFieldCreate } from '$comps/form/field'
import { CodeAction, required, strRequired, valueOrDefault } from '$utils/types'
import { PropNamePrefixType, RawDataObjPropDisplayCustom } from '$comps/dataObj/types.rawDataObj'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/form/fieldCustom.ts'

export class FieldCustom extends Field {
	constructor(props: PropsFieldCreate) {
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
		this.colDO.label = customCol.customColLabel ? customCol.customColLabel : this.colDO.label
	}
}

export class FieldCustomAction extends FieldCustom {
	codeAction: CodeAction
	value: string
	constructor(props: PropsFieldCreate) {
		const clazz = 'FieldCustomAction'
		super(props)
		const customCol: RawDataObjPropDisplayCustom = required(
			props.propRaw.customCol,
			clazz,
			'customCol'
		)
		this.codeAction = required(customCol.codeAction, clazz, 'codeAction')
		this.value = valueOrDefault(customCol.customColActionValue, '')
	}
}

export class FieldCustomActionButton extends FieldCustomAction {
	fieldColor: FieldColor
	constructor(props: PropsFieldCreate) {
		const clazz = 'FieldCustomActionButton'
		super(props)
		const customCol = required(
			props.propRaw.customCol,
			clazz,
			'customCol'
		) as RawDataObjPropDisplayCustom
		this.fieldColor = new FieldColor(customCol.customColCodeColor || this.colDO.codeColor, 'blue')
	}
}
export class FieldCustomActionLink extends FieldCustomAction {
	prefix?: string
	constructor(props: PropsFieldCreate) {
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
	constructor(props: PropsFieldCreate) {
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
	constructor(props: PropsFieldCreate) {
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

export class FieldCustomHTML extends FieldCustom {
	rawHTML: string
	constructor(props: PropsFieldCreate) {
		const clazz = 'FieldCustomHTML'
		super(props)
		const customCol = required(
			props.propRaw.customCol,
			clazz,
			'customCol'
		) as RawDataObjPropDisplayCustom
		this.rawHTML = strRequired(customCol.customColRawHTML, clazz, 'rawHTML')
	}
}
