import { State } from '$comps/app/types.appState'
import {
	booleanRequired,
	DataObj,
	DataObjData,
	DataObjStatus,
	type DataRecord,
	FieldValue,
	required
} from '$utils/types'
import {
	booleanOrDefault,
	memberOfEnum,
	memberOfEnumOrDefault,
	nbrOptional,
	valueOrDefault
} from '$utils/utils'
import {
	Validation,
	ValidationStatus,
	ValidationType,
	Validity,
	ValidityField,
	ValidityError,
	ValidityErrorLevel
} from '$comps/form/types.validation'
import { RawDataObjPropDisplay } from '$comps/dataObj/types.rawDataObj'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/form/field.ts/'

export class Field {
	colDO: RawDataObjPropDisplay
	colorBackground: string
	fieldAccess: FieldAccess
	fieldAlignment: FieldAlignment
	fieldElement: FieldElement
	isFirstVisible: boolean
	isParmValue: boolean
	constructor(props: PropsFieldRaw) {
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
		this.isFirstVisible = props.isFirstVisible
		this.isParmValue = booleanOrDefault(obj.isParmValue, false)

		/* derived */
		this.colorBackground =
			this.fieldAccess === FieldAccess.required
				? 'bg-blue-100'
				: this.fieldAccess == FieldAccess.readonly
					? 'bg-gray-200'
					: 'bg-white'
	}
	getPropName() {
		return this.isParmValue ? 'parmValue' : this.colDO.propName
	}

	getStatus(dataObjForm: DataObj, recordId: string) {
		const status = new DataObjStatus()
		const propName = this.getPropName()

		// changed
		const isChanged = dataObjForm.dataFieldsChanged.valueGet(recordId, propName) || false
		status.setChanged(isChanged)

		// valid
		const validity = dataObjForm.dataFieldsValidity.valueGet(recordId, propName)
		status.setValid(validity === undefined || validity.error === ValidityError.none)

		return status
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

	async init(props: PropsField) {}

	modeReset() {}

	validate(row: number, value: any, missingDataErrorLevel: ValidityErrorLevel): Validation {
		if (this.colDO.colDB.isNonData) {
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

export class FieldColor {
	color: string
	name: string
	constructor(parmColor: string | undefined, defaultColor: string) {
		const colors = [
			['amber', '#b45309'],
			['black', '#000000'],
			['blue', '#60a5fa'],
			['gray', '#e5e7eb'],
			['green', '#22c55e'],
			['orange', '#f97316'],
			['purple', '#d8b4fe'],
			['red', '#ef4444'],
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
	password = 'password',
	parm = 'parm',
	percentage = 'percentage',
	radio = 'radio',
	select = 'select',
	tagRow = 'tagRow',
	tagSection = 'tagSection',
	tel = 'tel',
	text = 'text',
	textArea = 'textArea',
	toggle = 'toggle'
}

export class FieldItem {
	data: string
	display: string
	selected?: boolean
	constructor(data: any, display: string, selected: boolean | undefined = false) {
		this.display = display
		this.data = data
		this.selected = selected
	}
}

export enum FieldParmType {
	boolean = 'boolean',
	date = 'date',
	link = 'link',
	number = 'number',
	string = 'string'
}

export class FieldProps {
	component: string
	dataObj: DataObj
	dataObjData: DataObjData
	dataRecord: DataRecord
	field: Field
	fieldValue: any
	fSetVal: Function
	row: number
	state: State
	constructor(
		component: string,
		dataObj: DataObj,
		dataObjData: DataObjData,
		dataRecord: DataRecord,
		field: Field,
		fieldValue: any,
		fSetVal: Function,
		row: number,
		state: State
	) {
		this.component = component
		this.dataObj = dataObj
		this.dataObjData = dataObjData
		this.dataRecord = dataRecord
		this.field = field
		this.fieldValue = fieldValue
		this.row = row
		this.fSetVal = fSetVal
		this.state = state
	}
}

export class PropsField {
	dataObj: DataObj
	state: State
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'PropsField'
		this.dataObj = required(obj.dataObj, clazz, 'dataObj')
		this.state = required(obj.state, clazz, 'state')
	}
}

export class PropsFieldRaw extends PropsField {
	data: DataObjData
	fields: Field[]
	isFirstVisible: boolean
	propRaw: RawDataObjPropDisplay
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		super(obj)
		const clazz = 'PropsFieldRaw'
		this.data = required(obj.data, clazz, 'data')
		this.fields = required(obj.fields, clazz, 'fields')
		this.isFirstVisible = booleanRequired(obj.isFirstVisible, clazz, 'isFirstVisible')
		this.propRaw = required(obj.propRaw, clazz, 'propRaw')
	}
}
