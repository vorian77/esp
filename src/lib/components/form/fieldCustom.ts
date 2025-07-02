import { Field, FieldAccess, FieldColor, PropsFieldCreate } from '$comps/form/field.svelte'
import {
	CodeAction,
	FileStorage,
	memberOfEnum,
	memberOfEnumIfExists,
	NodeObjComponent,
	required,
	strRequired,
	valueOrDefault
} from '$utils/types'
import {
	PropNamePrefixType,
	RawDataObjPropDisplayCustom
} from '$comps/dataObj/types.rawDataObj.svelte'
import { UserAction } from '$comps/other/types.userAction.svelte'
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
	action: UserAction
	codeComponent?: NodeObjComponent
	value: string
	constructor(props: PropsFieldCreate) {
		const clazz = 'FieldCustomAction'
		super(props)
		const customCol: RawDataObjPropDisplayCustom = required(
			props.propRaw.customCol,
			clazz,
			'customCol'
		)
		this.action = required(customCol.action, clazz, 'action')
		this.codeComponent = memberOfEnumIfExists(
			customCol._customColCodeComponent,
			'codeComponent',
			clazz,
			'NodeObjComponent',
			NodeObjComponent
		)
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
		this.fieldColor = new FieldColor(this.colDO.codeColor, 'blue')
	}
}
export class FieldCustomActionLink extends FieldCustomAction {
	prefix: string
	constructor(props: PropsFieldCreate) {
		const clazz = 'FieldCustomActionLink'
		super(props)
		const customCol = required(
			props.propRaw.customCol,
			clazz,
			'customCol'
		) as RawDataObjPropDisplayCustom
		this.prefix = valueOrDefault(customCol.customColPrefix, '')
	}
}

export class FieldCustomHeader extends FieldCustom {
	isSubHeader: boolean
	size: string
	source: string
	sourceKey: string
	constructor(props: PropsFieldCreate) {
		const clazz = 'FieldCustomHeader'
		super(props)
		const customCol = required(
			props.propRaw.customCol,
			clazz,
			'customCol'
		) as RawDataObjPropDisplayCustom
		this.isSubHeader = valueOrDefault(customCol.customColIsSubHeader, false)
		this.size = valueOrDefault(customCol.customColSize, '')
		this.source = valueOrDefault(customCol.customColSource, '')
		this.sourceKey = valueOrDefault(customCol.customColSourceKey, '')
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

export class FieldCustomImage extends FieldCustom {
	align: string
	alt: string
	file?: FileStorage
	width: string
	constructor(props: PropsFieldCreate) {
		const clazz = 'FieldCustomImage'
		super(props)
		const customCol = required(
			props.propRaw.customCol,
			clazz,
			'customCol'
		) as RawDataObjPropDisplayCustom
		this.align = valueOrDefault(customCol.customColAlign, 'center')
		this.alt = valueOrDefault(customCol.customColLabel, 'image alt text')
		this.file = customCol.customColFile
		this.width = valueOrDefault(customCol.customColSize, '300')
	}
}

export class FieldCustomText extends FieldCustom {
	align: string
	constructor(props: PropsFieldCreate) {
		const clazz = 'FieldCustomText'
		super(props)
		const customCol = required(
			props.propRaw.customCol,
			clazz,
			'customCol'
		) as RawDataObjPropDisplayCustom
		this.align = valueOrDefault(customCol.customColAlign, '')
	}
}
