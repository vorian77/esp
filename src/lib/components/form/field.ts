import { State } from '$comps/app/types.appState'
import { DataObj, DataObjData, type DataRecord, memberOfEnum, nbrRequired } from '$utils/types'
import { valueOrDefault } from '$utils/utils'
import {
	Validation,
	ValidationType,
	ValidationStatus,
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
	constructor(obj: RawDataObjPropDisplay, index: number, isFirstVisible: boolean) {
		const clazz = 'Field'
		obj = valueOrDefault(obj, {})
		this.colDO = obj
	}
}

export class FieldDisplay extends Field {
	colorBackground: string
	fieldAccess: FieldAccess
	fieldAlignment: FieldAlignment
	fieldElement: FieldElement
	fValidatePost?: Function
	fValidatePre?: Function
	isFirstVisible: boolean
	orderDisplay: number
	constructor(obj: RawDataObjPropDisplay, index: number, isFirstVisible: boolean) {
		super(obj, index, isFirstVisible)
		const clazz = 'FieldDisplay'
		obj = valueOrDefault(obj, {})
		this.fieldAccess = memberOfEnum(
			this.colDO.rawFieldAccess,
			clazz,
			'fieldAccess',
			'FieldAccess',
			FieldAccess
		)
		this.fieldAlignment = memberOfEnum(
			this.colDO.rawFieldAlignmentAlt || this.colDO.colDB.rawFieldAlignment,
			clazz,
			'fieldAlignment',
			'FieldAlignment',
			FieldAlignment
		)
		this.fieldElement = memberOfEnum(
			this.colDO.rawFieldElement,
			clazz,
			'fieldElement',
			'FieldElement',
			FieldElement
		)
		this.isFirstVisible = isFirstVisible
		this.orderDisplay = nbrRequired(this.colDO.orderDisplay, clazz, 'orderDisplay')

		/* derived */
		this.colorBackground =
			this.fieldAccess === FieldAccess.required
				? 'bg-blue-100'
				: this.fieldAccess == FieldAccess.readonly
					? 'bg-gray-200'
					: 'bg-white'
	}

	copyValue(value: any) {
		return structuredClone(value)
	}
	getValuationValid(index: number) {
		return new Validation(ValidationType.field, ValidationStatus.valid, [
			new ValidityField(index, new Validity())
		])
	}
	getValuationNotInvalid(index: number) {
		return new Validation(ValidationType.field, ValidationStatus.notInvalid, [
			new ValidityField(index, new Validity())
		])
	}
	getValuationMissingData(index: number) {
		return new Validation(ValidationType.field, ValidationStatus.invalid, [
			new ValidityField(
				index,
				new Validity(
					ValidityError.missingData,
					ValidityErrorLevel.warning,
					`"${this.colDO.label}" is required.`
				)
			)
		])
	}
	getValuationInvalid(
		index: number,
		error: ValidityError,
		level: ValidityErrorLevel,
		message: string
	) {
		return new Validation(ValidationType.field, ValidationStatus.invalid, [
			new ValidityField(index, new Validity(error, level, message))
		])
	}
	getValue(formData: FormData) {
		// overridden for FormElInpCheckbox
		return formData.get(this.colDO.propName)
	}

	setValidatePost(fValidate: Function) {
		this.fValidatePost = fValidate
	}
	setValidatePre(fValidate: Function) {
		this.fValidatePre = fValidate
	}
}

export enum FieldAccess {
	readonly = 'readonly',
	hidden = 'hidden',
	optional = 'optional',
	required = 'required'
}

export enum FieldAlignment {
	center = 'center',
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
	custom = 'custom',
	customActionButton = 'customActionButton',
	customActionLink = 'customActionLink',
	customHeader = 'customHeader',
	customText = 'customText',
	date = 'date',
	embedDetail = 'embedDetail',
	embedListConfig = 'embedListConfig',
	embedListEdit = 'embedListEdit',
	embedListSelect = 'embedListSelect',
	email = 'email',
	file = 'file',
	number = 'number',
	parm = 'parm',
	password = 'password',
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
	data: any
	display: any
	selected?: boolean
	constructor(data: any, display: any, selected: boolean | undefined = false) {
		this.data = data
		this.display = display
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
	dataObj: DataObj
	dataObjData: DataObjData
	dataRecord: DataRecord
	field: Field
	fieldValue: any
	row: number
	setFieldVal: Function
	state: State
	constructor(
		dataObj: DataObj,
		dataObjData: DataObjData,
		dataRecord: DataRecord,
		field: Field,
		fieldValue: any,
		row: number,
		setFieldVal: Function,
		state: State
	) {
		this.dataObj = dataObj
		this.dataObjData = dataObjData
		this.dataRecord = dataRecord
		this.field = field
		this.fieldValue = fieldValue
		this.row = row
		this.setFieldVal = setFieldVal
		this.state = state
	}
}
