import { debug, memberOfEnum } from '$utils/types'

/** array.utils.js */

export function getArray(obj: any) {
	obj = obj != null && obj != undefined ? obj : []
	let arr = []
	if (Array.isArray(obj)) {
		arr = obj
	} else {
		arr = [obj]
	}
	return arr
}

export function arrayOfClass(clazz: any, objs: any, parm: any = undefined) {
	objs = getArray(objs)
	const arr = []
	for (const obj of objs) {
		parm ? arr.push(new clazz(obj, parm)) : arr.push(new clazz(obj))
	}
	return arr
}

export function arrayOfEnums(
	className: string,
	values: any,
	fieldName: string,
	enumName: string,
	enumObj: object
) {
	values = getArray(values)
	const enums = []
	for (const val of values) {
		try {
			const enumValue = memberOfEnum(val, className, fieldName, enumName, enumObj)
			enums.push(enumValue)
		} catch (e) {
			console.error('arrayOfEnums.error', e)
		}
	}
	return enums
}
