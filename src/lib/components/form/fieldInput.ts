import {
	Validation,
	ValidationStatus,
	ValidationType,
	Validity,
	ValidityField,
	ValidityError,
	ValidityErrorLevel
} from '$comps/form/types.validation'
import { Field, FieldAccess, FieldElement, PropsFieldCreate } from '$comps/form/field.svelte'
import { RawDataObjPropDisplay } from '$comps/dataObj/types.rawDataObj.svelte'
import { valueOrDefault } from '$utils/utils'
import { required } from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = '$comps/form/fieldInput.ts'

export class FieldInput extends Field {
	inputMask: string
	inputTypeCurrent: string = ''
	matchColumn?: MatchColumn
	maxLength?: number
	maxValue?: number
	minLength?: number
	minValue?: number
	pattern?: string
	patternMsg?: string
	patternReplacement?: string
	placeHolder?: string
	spinStep?: string
	constructor(props: PropsFieldCreate) {
		const clazz = `FieldInput: ${props.propRaw.propNameKey}`
		super(props)
		const obj = valueOrDefault(props.propRaw, {})
		const fields: Field[] = required(props.parms.fields, clazz, 'fields')
		this.inputMask = obj.inputMaskAlt || obj.colDB.inputMask || ''
		this.inputTypeCurrent = this.fieldElement === FieldElement.textHide ? 'password' : 'text'
		this.matchColumn = initMatchColumn(obj.colDB.matchColumn, this, fields)
		this.maxLength = obj.colDB.maxLength
		this.maxValue = obj.colDB.maxValue
		this.minLength = obj.colDB.minLength
		this.minValue = obj.colDB.minValue
		this.pattern = obj.colDB.pattern
		this.patternMsg = obj.colDB.patternMsg
		this.patternReplacement = obj.colDB.patternReplacement
		this.placeHolder = obj.colDB.placeHolder
		this.spinStep = obj.colDB.spinStep

		// set field type defaults
		switch (this.fieldElement) {
			case FieldElement.email:
				if (!this.pattern) {
					this.pattern = '^[A-Za-z0-9+_.-]+@(.+)$'
				}
				break
			case FieldElement.tel:
				if (!this.pattern) {
					this.pattern = '^(1\\s?)?(\\d{3}|\\(\\d{3}\\))[\\s\\-]?\\d{3}[\\s\\-]?\\d{4}$'
					this.patternReplacement = '($1) $2-$3'
				}
				break
		}

		function initMatchColumn(
			parentMatchColumn: string | undefined,
			thisField: FieldInput,
			fields: Field[]
		) {
			if (!parentMatchColumn) {
				return undefined
			}
			const idxParent = fields.findIndex((f) => {
				return f.colDO.propNameKey === parentMatchColumn
			})
			if (idxParent > -1) {
				const field = fields[idxParent] as FieldInput
				const message =
					thisField.fieldAccess !== FieldAccess.hidden
						? `Fields "${field.colDO.label}" and "${thisField.colDO.label}" must match.`
						: ''

				// set parent
				field.matchColumn = new MatchColumn(thisField.getValueKey(), message)

				// return this field's match column
				return new MatchColumn(parentMatchColumn, message)
			} else {
				error(500, {
					file: FILENAME,
					function: 'FieldInput.initMatchColumn',
					msg: `For column: "${thisField.getValueKey()}", can not find parent matchColumn: "${parentMatchColumn}"`
				})
			}
		}
	}

	getPlaceholder(fieldAccess: FieldAccess) {
		let placeholder =
			fieldAccess !== FieldAccess.readonly
				? valueOrDefault(this.placeHolder, this.colDO.label ? 'Enter ' + this.colDO.label : '')
				: ''
		if (fieldAccess == FieldAccess.optional) placeholder += ' (optional)'
		return placeholder
	}

	validate(row: number, value: any, missingDataErrorLevel: ValidityErrorLevel) {
		// base validate
		let v = super.validate(row, value, missingDataErrorLevel)
		if ([ValidationStatus.valid, ValidationStatus.invalid].includes(v.status)) return v

		/* minLength */
		if (this.minLength || this.minLength === 0) {
			if (value.length < this.minLength) {
				return this.getValuationInvalid(
					ValidityError.minLength,
					ValidityErrorLevel.error,
					`"${this.colDO.label}" must be at least ${this.minLength} character(s). It is currently ${value.length} character(s).`
				)
			}
		}

		/* maxLength */
		if (this.maxLength || this.maxLength === 0) {
			if (value.length > this.maxLength) {
				return this.getValuationInvalid(
					ValidityError.maxLength,
					ValidityErrorLevel.error,
					`"${this.colDO.label}" cannot exceed ${this.maxLength} character(s). It is currently ${value.length} character(s).`
				)
			}
		}

		/* number */
		let nbrValue = Number(value)

		// minValue
		if (this.minValue || this.minValue === 0) {
			if (nbrValue < this.minValue) {
				return this.getValuationInvalid(
					ValidityError.minValue,
					ValidityErrorLevel.error,
					`"${this.colDO.label}" must be at least ${this.minValue}`
				)
			}
		}
		// maxValue
		if (this.maxValue || this.maxValue === 0) {
			if (nbrValue > this.maxValue) {
				return this.getValuationInvalid(
					ValidityError.maxValue,
					ValidityErrorLevel.error,
					`"${this.colDO.label}" cannot exceed ${this.maxValue}`
				)
			}
		}

		/* pattern */
		if (this.pattern) {
			const regex = new RegExp(this.pattern)
			if (!regex.test(value)) {
				const errorMsg =
					this.patternMsg || `The value you entered is not a valid "${this.colDO.label}"`
				return this.getValuationInvalid(ValidityError.pattern, ValidityErrorLevel.error, errorMsg)
			}
		}

		/* matchColumn */
		if (this.matchColumn) {
			// get matchColumn value
			const matchColumn = required(this.matchColumn, 'FieldInput.setValidatePost', 'matchColumn')
			const matchColumnValue = value[matchColumn.name]

			// compare values to set validiities
			let validity: Validity
			let validationStatus: ValidationStatus
			let data = undefined

			if (value == matchColumnValue) {
				//equal - fields are valid
				validity = new Validity()
				validationStatus = ValidationStatus.valid
				data = value
			} else {
				validationStatus = ValidationStatus.invalid
				if (!value || !matchColumnValue) {
					// one blank field - warning
					validity = new Validity(
						ValidityError.matchColumn,
						ValidityErrorLevel.warning,
						matchColumn.message
					)
				} else {
					// both entered and unequal - error
					validity = new Validity(
						ValidityError.matchColumn,
						ValidityErrorLevel.error,
						matchColumn.message
					)
				}
			}

			// set validiities
			let validityFields: [ValidityField] = [new ValidityField(this.getValueKey(), validity)]
			validityFields.push(new ValidityField(matchColumn.index, validity))
			return new Validation(ValidationType.field, validationStatus, validityFields)
		}

		// default
		return this.getValuationValid()
	}
}

class MatchColumn {
	propName: string
	message: string
	constructor(propName: string, message: string) {
		this.propName = propName
		this.message = message
	}
}
