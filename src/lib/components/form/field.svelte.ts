import { State } from '$comps/app/types.appState.svelte'
import {
	PropLinkItems,
	RawDataObjPropDisplay,
	RawDataObjPropDisplayItemChange
} from '$comps/dataObj/types.rawDataObj.svelte'
import {
	Validation,
	ValidationStatus,
	ValidationType,
	Validity,
	ValidityError,
	ValidityErrorLevel,
	ValidityField
} from '$comps/form/types.validation'
import { IconProps } from '$comps/icon/types.icon'
import {
	booleanOrDefault,
	classOptional,
	DataManagerNode,
	DataObjData,
	type DataRecord,
	debug,
	getArray,
	getColor,
	getValueData,
	memberOfEnum,
	memberOfEnumIfExists,
	memberOfEnumOrDefault,
	MethodResult,
	PropOp,
	required,
	valueOrDefault
} from '$utils/types'

const FILENAME = '/$comps/form/field.svelte.ts'

export class Field {
	classType: FieldClassType = FieldClassType.regular
	colDO: RawDataObjPropDisplay
	fieldAccess: FieldAccess = $state(FieldAccess.hidden)
	fieldAlignment: FieldAlignment
	fieldElement: FieldElement
	iconProps?: IconProps
	isParmValue: boolean
	itemChanges: FieldItemChange[] = []
	linkItems?: PropLinkItems
	constructor(props: PropsFieldCreate) {
		const clazz = `Field: ${props.propRaw.propName}`
		this.colDO = props.propRaw
		this.fieldAccess = memberOfEnumOrDefault(
			this.colDO.rawFieldAccess,
			clazz,
			'fieldAccess',
			'FieldAccess',
			FieldAccess,
			FieldAccess.hidden
		)
		this.fieldAlignment = memberOfEnumOrDefault(
			this.colDO.rawFieldAlignmentAlt || this.colDO?.colDB?.rawFieldAlignment,
			clazz,
			'fieldAlignment',
			'FieldAlignment',
			FieldAlignment,
			FieldAlignment.hidden
		)
		this.fieldElement = memberOfEnum(
			this.colDO.rawFieldElement || FieldElement.text,
			clazz,
			'fieldElement',
			'FieldElement',
			FieldElement
		)
		this.isParmValue = booleanOrDefault(props.propRaw.isParmValue, false)
		this.linkItems = classOptional(PropLinkItems, props.propRaw?.linkItemsSource?.raw)
	}

	getBackgroundColor(fieldAccess: FieldAccess) {
		return fieldAccess === FieldAccess.required
			? 'bg-blue-100'
			: fieldAccess == FieldAccess.readonly
				? 'bg-gray-200'
				: 'bg-white'
	}

	getPropName() {
		return this.isParmValue ? 'parmValue' : this.colDO.propName
	}

	getValuationInvalid(error: ValidityError, level: ValidityErrorLevel, message: string) {
		const propName = this.getPropName()
		return new Validation(ValidationType.field, ValidationStatus.invalid, [
			new ValidityField(propName, new Validity(error, level, message))
		])
	}
	getValuationNotInvalid() {
		const propName = this.getPropName()
		return new Validation(ValidationType.field, ValidationStatus.notInvalid, [
			new ValidityField(propName, new Validity())
		])
	}
	getValuationValid() {
		const propName = this.getPropName()
		return new Validation(ValidationType.field, ValidationStatus.valid, [
			new ValidityField(propName, new Validity())
		])
	}

	async init(props: PropsFieldInit): Promise<MethodResult> {
		// used for async initialization
		return new MethodResult()
	}

	async processItemChanges(
		sm: State,
		row: number,
		triggerValueCurrent: any,
		dmn: DataManagerNode
	): Promise<MethodResult> {
		const clazz = 'Field.processItemChanges'

		triggerValueCurrent = getValueData(triggerValueCurrent)

		for (let i = 0; i < this.itemChanges.length; i++) {
			const itemChange = this.itemChanges[i]

			if (itemChange.retrieveParmKey) {
				sm.parmsState.valueSet(itemChange.retrieveParmKey, triggerValueCurrent)
			}

			const valueTriggerArray =
				itemChange.valueTriggerIdsAttribute.length > 0
					? itemChange.valueTriggerIdsAttribute
					: itemChange.valueTriggerIdsCode.length > 0
						? itemChange.valueTriggerIdsCode
						: getArray(itemChange.valueTargetScalar)

			switch (itemChange.codeOp) {
				case PropOp.any:
					return process(this, itemChange)

				case PropOp.equal:
					if (valueTriggerArray.includes(triggerValueCurrent)) {
						return await process(this, itemChange)
					}
					break

				case PropOp.notEqual:
					if (!valueTriggerArray.includes(triggerValueCurrent)) {
						return await process(this, itemChange)
					}
					break

				case PropOp.notNull:
					if (!['', null, undefined].includes(triggerValueCurrent)) {
						return await process(this, itemChange)
					}
					break

				case PropOp.null:
					if (['', null, undefined].includes(triggerValueCurrent)) {
						return await process(this, itemChange)
					}
					break

				default:
					const valueTriggerScalar = required(itemChange.valueTriggerScalar, clazz, 'valueScalar')
					switch (itemChange.codeOp) {
						case PropOp.greaterThan:
							if (triggerValueCurrent > valueTriggerScalar) {
								return await process(this, itemChange)
							}
							break

						case PropOp.greaterThanOrEqual:
							if (triggerValueCurrent >= valueTriggerScalar) {
								return await process(this, itemChange)
							}
							break

						case PropOp.lessThan:
							if (triggerValueCurrent < valueTriggerScalar) {
								return await process(this, itemChange)
							}
							break

						case PropOp.lessThanOrEqual:
							if (triggerValueCurrent <= valueTriggerScalar) {
								return await process(this, itemChange)
							}
							break

						default:
							return new MethodResult({
								error: {
									file: FILENAME,
									function: clazz,
									msg: `No case defined for PropOp: ${itemChange.codeOp}`
								}
							})
					}
			}
		}

		async function process(field: Field, itemChange: FieldItemChange): Promise<MethodResult> {
			for (let i = 0; i < itemChange.fields.length; i++) {
				const field = itemChange.fields[i]
				let result: MethodResult

				if (itemChange.codeAccess) field.fieldAccess = itemChange.codeAccess

				const targetCurrValue = dmn.recordsDisplay[row][field.colDO.propName]

				switch (itemChange.codeItemChangeAction) {
					case FieldItemChangeAction.none:
						break

					case FieldItemChangeAction.reset:
						await dmn.setFieldVal(row, field, null)
						break

					case FieldItemChangeAction.retrieveEmbed:
						break

					case FieldItemChangeAction.retrieveSelect:
						field.linkItems?.source.setParmValue(triggerValueCurrent)
						if (field.linkItems) {
							result = await field.linkItems.retrieve(sm)
							if (result.error) return result
						}
						break

					case FieldItemChangeAction.setScalar:
						await dmn.setFieldVal(row, field, itemChange.valueTargetScalar)
						break

					default:
						return new MethodResult({
							error: {
								file: FILENAME,
								function: clazz,
								msg: `No case defined for FieldItemChangeAction: ${itemChange.codeItemChangeAction}`
							}
						})
				}
			}
			return new MethodResult()
		}
		return new MethodResult()
	}

	setIconProps(obj: any) {
		this.iconProps = new IconProps(obj)
	}

	validate(row: number, value: any, missingDataErrorLevel: ValidityErrorLevel): Validation {
		// only validate displayable fields
		if (!this.colDO.isDisplay) {
			return this.getValuationValid()
		}

		// only validate access types that require validation
		if (![FieldAccess.required, FieldAccess.optional].includes(this.fieldAccess)) {
			return this.getValuationValid()
		}

		// optional & null/undefined
		if (
			this.fieldAccess === FieldAccess.optional &&
			([null, undefined, ''].includes(value) || (Array.isArray(value) && value.length === 0))
		) {
			return this.getValuationValid()
		}

		// required & missing data
		if ([null, undefined, ''].includes(value) || (Array.isArray(value) && value.length === 0)) {
			return this.getValuationInvalid(
				ValidityError.required,
				missingDataErrorLevel,
				`"${this.colDO.label}" is required.`
			)
		}

		// default
		return this.getValuationNotInvalid()
	}
}

export enum FieldAccess {
	readonly = 'readonly',
	hidden = 'hidden',
	none = 'none',
	optional = 'optional',
	required = 'required',
	shell = 'shell'
}

export enum FieldAlignment {
	center = 'center',
	hidden = 'hidden',
	justify = 'justify',
	left = 'left',
	right = 'right'
}

export enum FieldClassType {
	embed = 'embed',
	embedShell = 'embedShell',
	parm = 'parm',
	regular = 'regular'
}

export class FieldColor {
	color: string
	name: string
	constructor(parmColor: string | undefined, defaultColor: string) {
		this.name = parmColor || defaultColor
		this.color = getColor(this.name)
	}
}

export class FieldColumnItem {
	data: string
	display: string
	selected: boolean
	constructor(data: string, display: string, selected: boolean = false) {
		this.data = data
		this.display = display
		this.selected = selected
	}
}

export interface FieldCustomRaw {
	_codeType: string
	actionMethod?: string
	actionType?: string
	actionValue?: string
	align?: string
	color?: string
	label: string
	prefix?: string
	size?: string
	source?: string
	sourceKey?: string
}

export enum FieldElement {
	checkbox = 'checkbox',
	chips = 'chips',
	currency = 'currency',
	custom = 'custom',
	customActionButton = 'customActionButton',
	customActionLink = 'customActionLink',
	customHeader = 'customHeader',
	customHTML = 'customHTML',
	customText = 'customText',
	date = 'date',
	email = 'email',
	embedDetail = 'embedDetail',
	embedListConfig = 'embedListConfig',
	embedListEdit = 'embedListEdit',
	embedListSelect = 'embedListSelect',
	embedShell = 'embedShell',
	file = 'file',
	hidden = 'hidden',
	number = 'number',
	parm = 'parm',
	percentage = 'percentage',
	radio = 'radio',
	select = 'select',
	tagDetails = 'tagDetails',
	tagRow = 'tagRow',
	tagSection = 'tagSection',
	tel = 'tel',
	text = 'text',
	textArea = 'textArea',
	textHide = 'textHide',
	toggle = 'toggle'
}

export class FieldItemChange {
	codeAccess?: FieldAccess
	codeItemChangeAction: FieldItemChangeAction
	codeItemChangeValueType?: FieldItemChangeValueType
	codeOp: PropOp
	fields: Field[] = []
	retrieveParmKey?: string
	valueTargetIdAttribute?: string
	valueTargetIdCode?: string
	valueTargetScalar?: string
	valueTriggerIdsAttribute: string[]
	valueTriggerIdsCode: string[]
	valueTriggerScalar?: string
	constructor(target: RawDataObjPropDisplayItemChange, fields: Field[]) {
		const clazz = 'FieldItemChange'
		this.codeAccess = memberOfEnumIfExists(
			target._codeAccess,
			'codeAccess',
			clazz,
			'FieldAccess',
			FieldAccess
		)
		this.codeItemChangeAction = memberOfEnum(
			target._codeItemChangeAction,
			clazz,
			'codeItemChangeAction',
			'FieldItemChangeAction',
			FieldItemChangeAction
		)
		this.codeItemChangeValueType = memberOfEnumIfExists(
			target._codeItemChangeValueType,
			'codeItemChangeValueType',
			clazz,
			'FieldItemChangeValueType',
			FieldItemChangeValueType
		)
		this.codeOp = memberOfEnum(target._codeOp, clazz, 'codeOp', 'PropOp', PropOp)
		target._columns.forEach((c) => {
			this.fields.push(
				required(
					fields.find((f: Field) => {
						return f.colDO.propNameRaw === c
					}),
					clazz,
					'field'
				)
			)
		})
		this.retrieveParmKey = target.retrieveParmKey
		this.valueTargetIdAttribute = target._valueTargetIdAttribute
		this.valueTargetIdCode = target._valueTargetIdCode
		this.valueTargetScalar = target.valueTargetScalar
		this.valueTriggerIdsAttribute = target._valueTriggerIdsAttribute
		this.valueTriggerIdsCode = target._valueTriggerIdsCode
		this.valueTriggerScalar = target.valueTriggerScalar
	}
}

export enum FieldItemChangeAction {
	none = 'none',
	reset = 'reset',
	retrieveEmbed = 'retrieveEmbed',
	retrieveSelect = 'retrieveSelect',
	setScalar = 'setScalar'
}

export enum FieldItemChangeValueType {
	attribute = 'attribute',
	code = 'code',
	scalar = 'scalar'
}

export class PropsFieldInit {
	data: DataObjData
	fields: Field[]
	sm: State
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'PropsField'
		this.data = required(obj.data, clazz, 'data')
		this.fields = required(obj.fields, clazz, 'fields')
		this.sm = required(obj.sm, clazz, 'sm')
	}
}

export class PropsFieldCreate {
	parms: DataRecord = {}
	propRaw: RawDataObjPropDisplay
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'PropsFieldCreate'
		this.propRaw = required(obj.propRaw, clazz, 'propRaw')
		Object.keys(obj).forEach((key) => {
			if (key !== 'propRaw') {
				this.parms[key] = obj[key]
			}
		})
	}
}
