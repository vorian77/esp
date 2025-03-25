import { getArray } from '$utils/utils.array'
import { debug } from '$utils/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/utils/model.utils.ts'

export function booleanOrDefault(val: any, valDefault: boolean) {
	if (typeof val === 'boolean') {
		return val
	} else {
		return valDefault
	}
}

export function booleanOrFalse(val: any) {
	return typeof val === 'boolean' ? val : false
}

export function booleanRequired(val: any, clazz: string, fieldName: string) {
	if (typeof val === 'boolean') {
		return val
	} else {
		error(500, {
			file: FILENAME,
			function: `Class: ${clazz} - booleanRequired`,
			message: `No value supplied for field ${fieldName}.`
		})
	}
}

export function hasPropertyOf(clazz: any, obj: any) {
	const model = new clazz()
	const modelKeys = Object.keys(model)

	for (const key of modelKeys) {
		if (Object.hasOwn(obj, key)) {
			// true if target has a single property of clazz
			return true
		}
	}
	return false
}
export function isInstanceOf(clazz: any, obj: any) {
	const model = new clazz()
	const modelKeys = Object.keys(model)

	for (const key of modelKeys) {
		if (!Object.hasOwn(obj, key)) {
			// false if obj is missing any properties of clazz
			return false
		}
	}
	return true
}

export function memberOfEnum(
	val: string | undefined,
	className: string,
	fieldName: string,
	enumName: string,
	enumObj: object
) {
	if (!val) {
		error(500, {
			file: className,
			function: `memberOfEnum: ${enumName} - Field: ${fieldName}`,
			message: `No value supplied. Elements:${Object.values(enumObj).toString()}`
		})
	}
	for (const value of Object.values(enumObj)) {
		if (val.toLowerCase() == value.toLowerCase()) {
			return value
		}
	}
	error(500, {
		file: className,
		function: `memberOfEnum: ${enumName} - Field: ${fieldName} - Value: ${val}`,
		message: `Invalid enum value: ${val} enum: ${enumName} elements: ${Object.values(enumObj).toString()}`
	})
}
export function memberOfEnumOrDefault(
	val: string | undefined,
	className: string,
	fieldName: string,
	enumName: string,
	enumObj: object,
	defaultVal: any
) {
	if (!val) {
		return defaultVal
	}
	return memberOfEnum(val, className, fieldName, enumName, enumObj)
}
export function memberOfEnumIfExists(
	val: string | undefined,
	fieldName: string,
	className: string,
	enumName: string,
	enumObj: object
) {
	if (!val) {
		return undefined
	}
	return memberOfEnum(val, fieldName, className, enumName, enumObj)
}
export function memberOfEnumList(
	className: string,
	fieldName: string,
	vals: string[],
	enumName: string,
	enumObj: object
) {
	let list: any = []
	vals.forEach((val) => {
		list.push(memberOfEnum(val, className, fieldName, enumName, enumObj))
	})
	return list
}

export function nbrOptional(val: any, clazz: string, name: string) {
	return !isNaN(val) && typeof val === 'number' ? nbrRequired(val, clazz, name) : undefined
}
export function nbrOrDefault(val: any, defaultVal: number) {
	return !isNaN(val) && typeof val === 'number' ? val : defaultVal
}
export function nbrRequired(val: number | undefined, clazz: string, name: string) {
	if (typeof val === 'number') {
		return val
	} else {
		error(500, {
			file: FILENAME,
			function: clazz,
			message: `Required value: (${name}) - is undefined or has an invlid value: (${val}).`
		})
	}
}

export function classOptional(clazz: any, parms: any) {
	let parmFound = false
	if (parms) {
		for (let i = 0; i < Object.keys(parms).length; i++) {
			const value = Object.values(parms)[i]
			if (Array.isArray(value)) {
				if (value.length > 0) {
					parmFound = true
					break
				}
			} else {
				if (value !== undefined && value !== null) {
					parmFound = true
					break
				}
			}
		}
	}
	return parmFound ? new clazz(parms) : undefined
}

export function override(valOverride: any, valBase: any, clazz: string, fieldNameBase: string) {
	if (valOverride !== undefined && valOverride !== null) return valOverride
	if (valBase !== undefined && valBase !== null) return valBase
	error(500, {
		file: FILENAME,
		function: clazz,
		message: `No override or base value provided for field ${fieldNameBase}. ${valOverride} ${valBase}`
	})
}

export function required(val: any, clazz: any, valueName: string) {
	if (val !== undefined && val !== null) {
		return val
	} else {
		error(500, {
			file: FILENAME,
			function: clazz,
			message: `Value: ${valueName} - is required but is undefined or null.`
		})
	}
}
export function strAppend(currentVal: string, newVal: string, separator = ' ') {
	if (currentVal) {
		currentVal += separator
	}
	return currentVal + newVal
}
export function strLower(val: string) {
	if (val) {
		return val.toLowerCase()
	}
}
export function strOptional(val: string | null | undefined, className: string, field: string) {
	if (!val) {
		return undefined
	}
	return strRequired(val, className, field)
}
export function strRequired(val: string | null | undefined, className: string, field: string) {
	if (typeof val === 'string' && val !== null && val !== undefined) {
		return val
	} else {
		error(500, {
			file: className,
			function: 'strRequired',
			message: `Value: (${val}) for field: ${field} is invalid.`
		})
	}
}
export function strUpper(val: string) {
	if (val) {
		return val.toUpperCase()
	}
}
export function valueIfExists(val: any) {
	return val !== undefined ? val : undefined
}
export function valueOrDefault(val: any, defaultVal: any) {
	return [null, undefined].includes(val) ? defaultVal : val
}
