import { State } from '$comps/app/types.appState.svelte'
import { apiFetch, ApiFunction } from '$routes/api/api'
import { TokenApiUserId } from '$utils/types.token'

export async function adminDbReset(state: State) {
	// <todo> - 240125
	const userId = state.user!.id
	return await apiFetch(ApiFunction.dbEdgeInit, new TokenApiUserId(userId))
}

export function capitalizeFirstLetter(text: string) {
	return text.charAt(0).toUpperCase() + text.slice(1)
}

export enum ContextKey {
	cancelForm = 'cancelForm',
	dashboardReset = 'dashboardReset',
	dataManager = 'dataManager',
	stateApp = 'stateApp',
	test = 'test'
}

export class TestState {
	data = new TestData()
	value = $state(0)
	constructor() {}
	increment = () => {
		this.value++
	}
}

export class TestData {
	value: number = $state(0)
	constructor() {}
	increment = () => {
		this.value++
	}
}

export async function encrypt(text: string) {
	// let salt = bcrypt.genSaltSync(10)
	// let hash = bcrypt.hashSync(text, salt)
	// return hash
	return text
}

export enum FileProcessingMode {
	delete = 'delete',
	none = 'none',
	storage = 'storage',
	upload = 'upload'
}

export const isNumber = (value: any) => {
	if ([null, undefined, ''].includes(value)) return false
	return typeof value === 'number' || !isNaN(value)
}

export function valueHasChanged(vSource: any, vCurrent: any): boolean {
	if (typeof vSource == 'boolean' || typeof vCurrent === 'boolean') {
		return noVal(vSource) ? true : vSource !== vCurrent
	} else if (noVal(vSource)) {
		return !noVal(vCurrent)
	} else if (noVal(vCurrent)) {
		return !noVal(vSource)
	} else if (Array.isArray(vSource) || Array.isArray(vCurrent)) {
		if (!Array.isArray(vSource) || !Array.isArray(vCurrent)) return true
		return vSource.sort().toString() !== vCurrent.sort().toString()
	} else if (typeof vSource === 'object' || typeof vCurrent === 'object') {
		if (typeof vSource !== 'object' || typeof vCurrent !== 'object') return true
		if (Object.entries(vSource).length !== Object.entries(vCurrent).length) return true
		for (const [key, value] of Object.entries(vSource)) {
			if (!Object.hasOwn(vCurrent, key)) return true
			if (valueHasChanged(value, vCurrent[key])) return true
		}
		return false
	} else {
		return vCurrent.toString() !== vSource.toString()
	}

	function noVal(value: any) {
		return [undefined, null, ''].includes(value) || (Array.isArray(value) && value.length === 0)
	}
}

export enum ToastType {
	error = 'error',
	success = 'success',
	warning = 'warning'
}
