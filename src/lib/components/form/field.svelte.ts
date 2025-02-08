import { State } from '$comps/app/types.appState.svelte'
import {
	booleanRequired,
	classOptional,
	DataManagerNode,
	DataObj,
	DataObjData,
	type DataRecord,
	required,
	strRequired
} from '$utils/types'
import { booleanOrDefault, memberOfEnum, memberOfEnumOrDefault, valueOrDefault } from '$utils/utils'
import {
	Validation,
	ValidationStatus,
	ValidationType,
	Validity,
	ValidityField,
	ValidityError,
	ValidityErrorLevel
} from '$comps/form/types.validation'
import {
	PropLinkItemsSource,
	RawDataObjPropDisplay,
	RawDataObjPropDisplayItemChange
} from '$comps/dataObj/types.rawDataObj.svelte'
import { IconProps } from '$comps/icon/types.icon'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/form/field.ts/'

export class Field {
	classType: FieldClassType = FieldClassType.regular
	colDO: RawDataObjPropDisplay
	fieldAccess: FieldAccess = $state(FieldAccess.hidden)
	fieldAlignment: FieldAlignment
	fieldElement: FieldElement
	iconProps?: IconProps
	isParmValue: boolean
	itemChanges: FieldItemChange[] = []
	linkItemsSource?: PropLinkItemsSource
	constructor(props: PropsFieldCreate) {
		const clazz = `Field: ${props.propRaw.propName}`
		const obj = valueOrDefault(props.propRaw, {})
		this.colDO = obj
		this.fieldAccess = memberOfEnumOrDefault(
			this.colDO.rawFieldAccess,
			clazz,
			'fieldAccess',
			'FieldAccess',
			FieldAccess,
			FieldAccess.hidden
		)
		this.fieldAlignment = memberOfEnumOrDefault(
			this.colDO.rawFieldAlignmentAlt || this.colDO.colDB.rawFieldAlignment,
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
		this.isParmValue = booleanOrDefault(obj.isParmValue, false)
		this.linkItemsSource = classOptional(PropLinkItemsSource, obj._linkItemsSource)
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

	async init(props: PropsFieldInit) {
		// used for async initialization
	}

	async processItemChanges(row: number, value: any, dmn: DataManagerNode) {
		for (let i = 0; i < this.itemChanges.length; i++) {
			const itemChange = this.itemChanges[i]
			switch (itemChange.codeValueTypeTrigger) {
				case FieldItemChangeTypeTrigger.any:
					return process(itemChange)

				case FieldItemChangeTypeTrigger.code:
					switch (itemChange.codeOp) {
						case FieldItemChangeOp.equal:
							if (value === itemChange.codeValueTrigger) await process(itemChange)
							break
						case FieldItemChangeOp.notEqual:
							if (value !== itemChange.codeValueTrigger) await process(itemChange)
							break
						default:
							error(500, {
								file: FILENAME,
								function: 'processItemChanges.code',
								message: `No case defined for FieldItemChangeOp: ${itemChange.codeOp}`
							})
					}
					break

				case FieldItemChangeTypeTrigger.notNull:
					if (![null, undefined].includes(value)) await process(itemChange)
					break

				case FieldItemChangeTypeTrigger.null:
					if ([null, undefined].includes(value)) await process(itemChange)
					break

				case FieldItemChangeTypeTrigger.scalar:
					if (itemChange.valueScalarTrigger) {
						switch (itemChange.codeOp) {
							case FieldItemChangeOp.equal:
								if (value === itemChange.valueScalarTrigger) await process(itemChange)
								break

							case FieldItemChangeOp.greaterThan:
								if (value > itemChange.valueScalarTrigger) await process(itemChange)
								break

							case FieldItemChangeOp.greaterThanOrEqual:
								if (value >= itemChange.valueScalarTrigger) await process(itemChange)
								break

							case FieldItemChangeOp.lessThan:
								if (value < itemChange.valueScalarTrigger) await process(itemChange)
								break

							case FieldItemChangeOp.lessThanOrEqual:
								if (value <= itemChange.valueScalarTrigger) await process(itemChange)
								break

							case FieldItemChangeOp.notEqual:
								if (value !== itemChange.valueScalarTrigger) await process(itemChange)
								break
							default:
								error(500, {
									file: FILENAME,
									function: 'processItemChanges.scalar',
									message: `No case defined for FieldItemChangeOp: ${itemChange.codeOp}`
								})
						}
					}
					break

				default:
					error(500, {
						file: FILENAME,
						function: 'processItemChanges',
						message: `No case defined for FieldItemChangeTypeTriggerInvalid: ${itemChange.codeValueTypeTrigger}`
					})
			}
		}
		async function process(itemChange: FieldItemChange) {
			if (itemChange.codeAccess) itemChange.field.fieldAccess = itemChange.codeAccess
			let newValue
			switch (itemChange.codeValueTypeTarget) {
				case FieldItemChangeTypeTarget.codeParm:
					// retrieve select
					// itemChange.fieldListItemsParmName

					if (itemChange.codeValueTarget) {
						await dmn.setFieldVal(row, itemChange.field, itemChange.codeValueTarget)
					}
					break
				case FieldItemChangeTypeTarget.none:
					const currValue = dmn.recordsDisplay[row][itemChange.field.colDO.propName]
					await dmn.setFieldVal(row, itemChange.field, currValue)
					break
				case FieldItemChangeTypeTarget.reset:
					await dmn.setFieldVal(row, itemChange.field, null)
					break
				case FieldItemChangeTypeTarget.scalar:
					await dmn.setFieldVal(row, itemChange.field, itemChange.valueScalarTarget)
					break
				default:
					error(500, {
						file: FILENAME,
						function: 'processItemChanges.process',
						message: `No case defined for FieldItemChangeTypeTarget: ${itemChange.codeValueTypeTarget}`
					})
			}
		}
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
		const colorError = '#ef4444'
		const colorPrimary = '#60a5fa'
		const colorSecondary = '#22c55e'
		const colors = [
			['amber', '#b45309'],
			['defaultBorder', '#e5e7eb'],
			['black', '#000000'],
			['blue', colorPrimary],
			['error', colorError],
			['gray', '#e5e7eb'],
			['green', colorSecondary],
			['orange', '#f97316'],
			['primary', colorPrimary],
			['purple', '#d8b4fe'],
			['red', colorError],
			['secondary', colorSecondary],
			['white', '#FFFFFF'],
			['yellow', '#fde047']
		]
		this.name = parmColor || defaultColor
		const idx = colors.findIndex((c) => c[0] === this.name)
		if (idx > -1) {
			this.color = colors[idx][1]
		} else {
			error(500, {
				file: FILENAME,
				function: 'FieldColor',
				message: `Invalid color: ${this.name}`
			})
		}
	}
}

export class FieldColumnItem {
	data: string
	display: string
	selected?: boolean
	constructor(data: string, display: string, selected: boolean | undefined = false) {
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

// <todo> 241217 - placing this in FieldEmbed causes a circular reference
export enum FieldEmbedType {
	listConfig = 'listConfig',
	listEdit = 'listEdit',
	listSelect = 'listSelect'
}

export class FieldItemChange {
	codeAccess: FieldAccess
	codeOp: FieldItemChangeOp
	codeValueTarget?: string
	codeValueTrigger?: string
	codeValueTypeTarget: FieldItemChangeTypeTarget
	codeValueTypeTrigger: FieldItemChangeTypeTrigger
	field: Field
	fieldListItemsParmName?: string
	valueScalarTarget?: string
	valueScalarTrigger?: string
	constructor(target: RawDataObjPropDisplayItemChange, fields: Field[]) {
		const clazz = 'FieldItemChange'
		this.codeAccess = memberOfEnum(
			target._codeAccess,
			clazz,
			'codeAccess',
			'FieldAccess',
			FieldAccess
		)
		this.codeOp = memberOfEnum(target._codeOp, clazz, 'codeOp', 'FieldTriggerOp', FieldItemChangeOp)
		this.codeValueTarget = target._codeValueTarget
		this.codeValueTrigger = target._codeValueTrigger
		this.codeValueTypeTarget = memberOfEnum(
			target._codeValueTypeTarget,
			clazz,
			'codeValueTypeTarget',
			'FieldTriggerValueTypeTarget',
			FieldItemChangeTypeTarget
		)
		this.codeValueTypeTrigger = memberOfEnum(
			target._codeValueTypeTrigger,
			clazz,
			'codeValueTypeTrigger',
			'FieldTriggerValueTypeTrigger',
			FieldItemChangeTypeTrigger
		)
		this.field = required(
			fields.find((f: Field) => {
				return f.colDO.propNameRaw === target._column
			}),
			clazz,
			'field'
		)
		this.fieldListItemsParmName = target.fieldListItemsParmName
		this.valueScalarTarget = target.valueScalarTarget
		this.valueScalarTrigger = target.valueScalarTrigger
	}
}

export enum FieldItemChangeOp {
	equal = 'equal',
	greaterThan = 'greaterThan',
	greaterThanOrEqual = 'greaterThanOrEqual',
	lessThan = 'lessThan',
	lessThanOrEqual = 'lessThanOrEqual',
	notEqual = 'notEqual'
}

export enum FieldItemChangeTypeTarget {
	codeParm = 'codeParm',
	none = 'none',
	reset = 'reset',
	scalar = 'scalar'
}

export enum FieldItemChangeTypeTrigger {
	any = 'any',
	code = 'code',
	notNull = 'notNull',
	null = 'null',
	scalar = 'scalar'
}

export class PropsFieldInit {
	dataObj: DataObj
	sm: State
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'PropsField'
		this.dataObj = required(obj.dataObj, clazz, 'dataObj')
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
