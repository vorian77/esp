import { State } from '$comps/app/types.state.svelte'
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
	DataManager,
	DataManagerNode,
	DataObjData,
	DataObjStatus,
	type DataRecord,
	DataRecordStatus,
	debug,
	getArray,
	getValueData,
	memberOfEnum,
	memberOfEnumIfExists,
	memberOfEnumOrDefault,
	MethodResult,
	PropDataType,
	PropOp,
	recordValueGet,
	required,
	valueOrDefault
} from '$utils/types'

const FILENAME = '/$comps/form/field.svelte.ts'

export class Field {
	altProcessInitItemChange?: (
		dmn: DataManagerNode,
		row: number,
		record: DataRecord
	) => Promise<void>
	altProcessItemChange?: (ici: FieldItemChangeManagerItem) => Promise<MethodResult>
	altProcessSetStatus?: (dmn: DataManagerNode, recordId: string, newStatus: DataObjStatus) => void
	altProcessSave?: (valueData: any) => any
	callbackSetFieldValue?: (
		dm: DataManager,
		dataObjId: string,
		row: number,
		field: Field
	) => Promise<void>
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
		const clazz = `Field: ${props.propRaw.propNameKey}`
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
		return (
			' ' +
			(fieldAccess === FieldAccess.required
				? 'bg-blue-100'
				: fieldAccess == FieldAccess.readonly
					? 'bg-gray-200'
					: 'bg-white')
		)
	}

	getPropName() {
		return this.isParmValue ? 'parmValue' : this.getValueKey()
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

	getValueKey() {
		return this.colDO.propNameKey
	}

	async initAsync(props: PropsFieldInit): Promise<MethodResult> {
		// used for async initialization
		return new MethodResult()
	}

	async processItemChange(ici: FieldItemChangeManagerItem): Promise<MethodResult> {
		const clazz = 'Field.processItemChange'

		let triggerValueCurrent = getValueData(ici.triggerValue)

		const itemChange = ici.itemChange

		if (itemChange.retrieveParmKey) {
			ici.sm.parmsState.valueSet(itemChange.retrieveParmKey, ici.triggerValue)
		}

		const valueTriggerArray =
			itemChange.valueTriggerIdsAttribute.length > 0
				? itemChange.valueTriggerIdsAttribute
				: itemChange.valueTriggerIdsCode.length > 0
					? itemChange.valueTriggerIdsCode
					: getArray(itemChange.valueTargetScalar)

		if (
			itemChange.codeItemChangeTriggerType === FieldItemChangeTriggerType.itemChangeTypeRecordStatus
		) {
			if (
				itemChange.codeItemChangeRecordStatus &&
				ici.dmn.dataObj.data.rowsRetrieved.getDetailRowStatusIs(
					itemChange.codeItemChangeRecordStatus
				)
			) {
				return process(this, itemChange)
			}
		} else if (
			itemChange.codeItemChangeTriggerType === FieldItemChangeTriggerType.itemChangeTypeOp
		) {
			switch (itemChange.codeOp) {
				case PropOp.any:
					return process(this, itemChange)

				case PropOp.equal:
					if (valueTriggerArray.includes(triggerValueCurrent)) {
						return await process(this, itemChange)
					}
					break

				case PropOp.false:
					if (triggerValueCurrent === false) {
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

				case PropOp.true:
					if (triggerValueCurrent === true) {
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
		} else {
			return new MethodResult({
				error: {
					file: FILENAME,
					function: clazz,
					msg: `No case defined for codeItemChangeTriggerType: ${itemChange.codeItemChangeTriggerType}`
				}
			})
		}

		async function process(
			fieldTrigger: Field,
			itemChange: FieldItemChange
		): Promise<MethodResult> {
			for (let i = 0; i < itemChange.fields.length; i++) {
				const field = itemChange.fields[i]
				let result: MethodResult

				if (itemChange.codeAccess) {
					field.fieldAccess = itemChange.codeAccess
				}

				const targetCurrValue = recordValueGet(ici.dmn.recordsDisplay[ici.row], field.getValueKey())

				if (field.altProcessItemChange) {
					field.altProcessItemChange(ici)
				} else {
					switch (itemChange.codeItemChangeAction) {
						case FieldItemChangeAction.none:
							break

						case FieldItemChangeAction.reset:
							await ici.dmn.setFieldValAsync(ici.row, field, null)
							break

						case FieldItemChangeAction.retrieveEmbed:
							break

						case FieldItemChangeAction.retrieveSelect:
							if (!ici.isRetrieve) await ici.dmn.setFieldValAsync(ici.row, field, null)
							field.linkItems?.source.setParmValue(triggerValueCurrent)
							if (field.linkItems) {
								result = await field.linkItems.retrieve(ici.sm)
								if (result.error) return result
							}
							break

						case FieldItemChangeAction.setScalar:
							let valueScalar: any
							switch (field.colDO.colDB.codeDataType) {
								case PropDataType.bool:
									valueScalar = itemChange.valueTargetScalar === 'true' ? true : false
									break

								case PropDataType.int16:
								case PropDataType.int32:
								case PropDataType.int64:
									valueScalar = Number(itemChange.valueTargetScalar)
									break

								case PropDataType.str:
									valueScalar = itemChange.valueTargetScalar
									break

								default:
									return new MethodResult({
										error: {
											file: FILENAME,
											function: clazz,
											msg: `No case defined for PropDataType: ${field.colDO.colDB.codeDataType}`
										}
									})
							}
							await ici.dmn.setFieldValAsync(ici.row, field, valueScalar)
							break

						case FieldItemChangeAction.setTargetValue:
							await ici.dmn.setFieldValAsync(ici.row, field, targetCurrValue)
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
	hexColor: string
	hexText: string
	name: string
	constructor(name: string, hexColor: string, hexText: string) {
		this.hexColor = hexColor
		this.hexText = hexText
		this.name = name
	}
}
export function getFieldColor(colorName: string): FieldColor {
	const colorError = '#ef4444'
	const colorPrimary = '#60a5fa'
	const colorSecondary = '#22c55e'
	const colors = [
		['amber', '#b45309', '#FFFFFF'],
		['defaultBorder', '#e5e7eb', '#FFFFFF'],
		['black', '#000000', '#FFFFFF'],
		['blue', colorPrimary, '#FFFFFF'],
		['error', colorError, '#FFFFFF'],
		['gray', '#e5e7eb', '#000000'],
		['green', colorSecondary, '#FFFFFF'],
		['orange', '#f97316', '#FFFFFF'],
		['primary', colorPrimary, '#FFFFFF'],
		['purple', '#d8b4fe', '#FFFFFF'],
		['red', colorError, '#FFFFFF'],
		['secondary', colorSecondary, '#FFFFFF'],
		['white', '#FFFFFF', '#000000'],
		['yellow', '#fde047', '#FFFFFF']
	]
	const idx = colors.findIndex((c) => c[0] === colorName)
	return idx > -1
		? new FieldColor(colors[idx][0], colors[idx][1], colors[idx][2])
		: getFieldColor('black')
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
	customImage = 'customImage',
	customText = 'customText',
	date = 'date',
	email = 'email',
	embedDetail = 'embedDetail',
	embedDetailEligibility = 'embedDetailEligibility',
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
	selectOwnerOrg = 'selectOwnerOrg',
	selectOwnerSys = 'selectOwnerSys',
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
	codeItemChangeRecordStatus?: DataRecordStatus
	codeItemChangeTriggerType: FieldItemChangeTriggerType
	codeItemChangeValueType?: FieldItemChangeValueType
	codeOp?: PropOp
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
		this.codeItemChangeRecordStatus = memberOfEnumIfExists(
			target._codeItemChangeRecordStatus,
			'codeItemChangeRecordStatus',
			clazz,
			'DataRecordStatus',
			DataRecordStatus
		)
		this.codeItemChangeTriggerType = memberOfEnum(
			target._codeItemChangeTriggerType,
			clazz,
			'codeItemChangeTriggerType',
			'FieldItemChangeTriggerType',
			FieldItemChangeTriggerType
		)
		this.codeItemChangeValueType = memberOfEnumIfExists(
			target._codeItemChangeValueType,
			'codeItemChangeValueType',
			clazz,
			'FieldItemChangeValueType',
			FieldItemChangeValueType
		)
		this.codeOp = memberOfEnumIfExists(target._codeOp, 'codeOp', clazz, 'PropOp', PropOp)
		target._columns.forEach((c) => {
			this.fields.push(
				required(
					fields.find((f: Field) => {
						return f.colDO.propName === c
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
	setScalar = 'setScalar',
	setTargetValue = 'setTargetValue'
}

export class FieldItemChangeManager {
	items: FieldItemChangeManagerItem[] = []
	constructor() {}
	async add(
		sm: State,
		dmn: DataManagerNode,
		field: Field,
		row: number,
		triggerValue: any,
		isRetrieve: boolean
	) {
		if (field.itemChanges.length > 0) {
			field.itemChanges.forEach((itemChange) => {
				this.items.push(
					new FieldItemChangeManagerItem(sm, dmn, row, field, itemChange, triggerValue, isRetrieve)
				)
			})
			return await this.process()
		}
		return new MethodResult()
	}
	async process(): Promise<MethodResult> {
		while (this.items.length > 0) {
			const item = this.items.shift()
			if (item) {
				const result = await item.field.processItemChange(item)
				if (result.error) return result
			}
		}
		return new MethodResult()
	}
}

export class FieldItemChangeManagerItem {
	sm: State
	dmn: DataManagerNode
	field: Field
	isRetrieve: boolean
	itemChange: FieldItemChange
	row: number
	triggerValue: any
	constructor(
		sm: State,
		dmn: DataManagerNode,
		row: number,
		field: Field,
		itemChange: FieldItemChange,
		triggerValue: any,
		isRetrieve: boolean
	) {
		this.dmn = dmn
		this.field = field
		this.isRetrieve = isRetrieve
		this.itemChange = itemChange
		this.row = row
		this.sm = sm
		this.triggerValue = triggerValue
	}
}

export enum FieldItemChangeTriggerType {
	itemChangeTypeOp = 'itemChangeTypeOp',
	itemChangeTypeRecordStatus = 'itemChangeTypeRecordStatus'
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
		this.data = valueOrDefault(obj.data, new DataObjData())
		this.fields = valueOrDefault(obj.fields, [])
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
