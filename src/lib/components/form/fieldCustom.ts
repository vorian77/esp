import { Field, FieldAccess, FieldColor } from '$comps/form/field'
import { memberOfEnum, required, strRequired, valueOrDefault } from '$utils/types'
import { RawDataObjPropDisplay, RawDataObjPropDisplayCustom } from '$comps/dataObj/types.rawDataObj'
import { getEnhancement } from '$enhance/actions/_actions'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/form/fieldCustom.ts'

export class FieldCustom extends Field {
	constructor(propRaw: RawDataObjPropDisplay, isFirstVisible: boolean) {
		const clazz = 'FieldCustom'
		super(propRaw, isFirstVisible)
		this.colDO.propName +=
			'_' + strRequired(propRaw?.orderDisplay?.toString(), clazz, 'orderDisplay')
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
	constructor(propRaw: RawDataObjPropDisplay, isFirstVisible: boolean) {
		const clazz = 'FieldCustomAction'
		super(propRaw, isFirstVisible)
		const customCol = required(propRaw.customCol, clazz, 'customCol') as RawDataObjPropDisplayCustom
		this.method = strRequired(customCol.customColActionMethod, clazz, 'method').toLowerCase()
		this.type = strRequired(customCol.customColActionType, clazz, 'type').toLowerCase()
		this.value = valueOrDefault(customCol.customColActionValue, '').toLowerCase()
	}
	async initEnhancement() {
		this.enhancement = await getEnhancement(this.method)
	}
}

export class FieldCustomActionButton extends FieldCustomAction {
	constructor(propRaw: RawDataObjPropDisplay, isFirstVisible: boolean) {
		const clazz = 'FieldCustomActionButton'
		super(propRaw, isFirstVisible)
		const customCol = required(propRaw.customCol, clazz, 'customCol') as RawDataObjPropDisplayCustom
		this.colDO.fieldColor = required(customCol.customColCodeColor, clazz, 'fieldColor')
	}
}
export class FieldCustomActionLink extends FieldCustomAction {
	prefix?: string
	constructor(propRaw: RawDataObjPropDisplay, isFirstVisible: boolean) {
		const clazz = 'FieldCustomActionLink'
		super(propRaw, isFirstVisible)
		const customCol = required(propRaw.customCol, clazz, 'customCol') as RawDataObjPropDisplayCustom
		this.prefix = customCol.customColPrefix
	}
}

export class FieldCustomHeader extends FieldCustom {
	size?: string
	source?: string
	sourceKey?: string
	constructor(propRaw: RawDataObjPropDisplay, isFirstVisible: boolean) {
		const clazz = 'FieldCustomHeader'
		super(propRaw, isFirstVisible)
		const customCol = required(propRaw.customCol, clazz, 'customCol') as RawDataObjPropDisplayCustom
		this.size = customCol.customColSize
		this.source = customCol.customColSource
		this.sourceKey = customCol.customColSourceKey
	}
}

export class FieldCustomText extends FieldCustom {
	align?: string
	constructor(propRaw: RawDataObjPropDisplay, isFirstVisible: boolean) {
		const clazz = 'FieldCustomText'
		super(propRaw, isFirstVisible)
		const customCol = required(propRaw.customCol, clazz, 'customCol') as RawDataObjPropDisplayCustom
		this.align = customCol.customColAlign
	}
}
