import { debug } from '$utils/types'

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

export function arrayOfClasses(clazz: any, objs: any, parm: any = undefined) {
	objs = getArray(objs)
	const arr = []
	for (const obj of objs) {
		parm ? arr.push(new clazz(obj, parm)) : arr.push(new clazz(obj))
	}
	return arr
}
