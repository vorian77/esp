import { arrayOfEnums, nbrOptional, nbrRequired, strRequired, valueOrDefault } from '$utils/utils'
import { FileStorage } from '$comps/form/fieldFile'
import { error } from '@sveltejs/kit'

const FILENAME = '$utils/utils.user.ts'

export class User {
	avatar?: FileStorage
	user: any
	firstName: string
	fullName: string = ''
	id: string
	initials: string = ''
	lastName: string
	org: { name: string; header: string } | undefined
	preferences: any[] = []
	resource_footer: any[] = []
	resource_programs: any[] = []
	resource_widgets: any[] = []
	userName: string

	// old
	cm_ssr_disclosure: number | undefined
	per_name_full: string
	site: string
	status: string
	user_id: number | undefined

	constructor(obj: any) {
		console.log('User.constructor', obj)
		const clazz = 'User'
		this.user = valueOrDefault(obj, {})
		this.avatar = obj.avatar
		this.firstName = strRequired(obj.firstName, clazz, 'firstName')
		this.fullName = strRequired(obj.fullName, clazz, 'fullName')
		this.id = strRequired(obj.id, clazz, 'id')
		this.lastName = strRequired(obj.lastName, clazz, 'lastName')
		this.org = obj.org ? { name: obj.org.name, header: obj.org.header } : undefined
		this.preferences = obj.preferences
		// arrayOfEnums(
		// 	clazz,
		// 	obj.preferences.map((p: any) => p._codeType),
		// 	'preferences',
		// 	'UserPrefType',
		// 	UserPrefType
		// )
		this.resource_footer = obj.resource_footer
		this.resource_programs = obj.resource_programs
		this.resource_widgets = obj.resource_widgets
		this.userName = strRequired(obj.userName, clazz, 'userName')

		// derived
		this.initials = this.firstName.toUpperCase()[0] + this.lastName.toUpperCase()[0]

		// old
		// this.cm_ssr_disclosure = nbrOptional(obj.cm_ssr_disclosure, 'cm_ssr_disclosure')
		// this.per_name_full = strRequired(obj.per_name_full, 'User', 'per_name_full')
		// this.site = strRequired(obj.site, 'User', 'site')
		// this.status = strRequired(obj.status, 'User', 'status')
		// this.user_id = nbrOptional(obj.user_id, 'User')
	}

	hasResourceWidget(resource: string): boolean {
		if (!this.user.resource_widgets) {
			return false
		}
		return undefined !== this.user.resource_widgets.find((r: any) => r.name === resource)
	}
	setName() {
		this.fullName = `${this.firstName} ${this.lastName}`
	}
}

export enum UserPrefType {
	notifications_auto_retrieve = 'notifications_auto_retrieve',
	remember_list_settings = 'remember_list_settings'
}

// export function arrayOfEnums(
// 	className: string,
// 	values: string[],
// 	fieldName: string,
// 	enumName: string,
// 	enumObj: object
// ) {
