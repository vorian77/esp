import { State } from '$comps/app/types.appState'
import { ParmsValues } from '$utils/types'
import {
	arrayOfClasses,
	arrayOfEnums,
	booleanRequired,
	getArray,
	memberOfEnum,
	nbrOptional,
	nbrRequired,
	strRequired,
	valueOrDefault
} from '$utils/utils'
import { DataObj, ParmsValuesType } from '$utils/types'
import { TokenAppModalReturnType, TokenAppModalSelect } from '$utils/types.token'
import { FieldItem } from '$comps/form/field'
import { FileStorage } from '$comps/form/fieldFile'
import { error } from '@sveltejs/kit'

const FILENAME = '$utils/utils.user.ts'

export class User {
	avatar?: FileStorage
	firstName: string
	fullName: string = ''
	id: string
	initials: string = ''
	lastName: string
	org: { name: string; header: string } | undefined
	preferences: UserPrefs
	resources = new UserTypeResourceList()
	resources_sys_app: any[] = []
	resources_sys_footer: any[] = []
	systemIds: string[] = []
	userName: string

	// old
	cm_ssr_disclosure: number | undefined
	per_name_full: string = ''
	site: string = ''
	status: string = ''
	user_id: number | undefined

	constructor(obj: any) {
		// console.log('User.constructor.obj: ', obj)
		const clazz = 'User'
		this.avatar = obj.avatar
		this.firstName = strRequired(obj.firstName, clazz, 'firstName')
		this.fullName = strRequired(obj.fullName, clazz, 'fullName')
		this.id = strRequired(obj.id, clazz, 'id')
		this.lastName = strRequired(obj.lastName, clazz, 'lastName')
		this.org = obj.org ? { name: obj.org.name, header: obj.org.header } : undefined
		this.preferences = new UserPrefs(obj.preferences)
		this.resources_sys_app = obj.resources_sys_app
		this.resources_sys_footer = obj.resources_sys_footer
		this.userName = strRequired(obj.userName, clazz, 'userName')

		// derived
		this.initials = this.firstName.toUpperCase()[0] + this.lastName.toUpperCase()[0]
		this.resources.addResources(obj.resources_core)
		this.resources.addResources(obj.resources_subject)
		this.resources.addResources(
			obj.systems.map((s: any) => {
				return {
					_codeType: UserTypeResourceType.system,
					_resource: s
				}
			})
		)
		this.systemIds = this.resources
			.getResources(UserTypeResourceType.system)
			.map((s) => s.resource.id)
		// console.log('User.constructor', this)

		// old
		// this.cm_ssr_disclosure = nbrOptional(obj.cm_ssr_disclosure, 'cm_ssr_disclosure')
		// this.per_name_full = strRequired(obj.per_name_full, 'User', 'per_name_full')
		// this.site = strRequired(obj.site, 'User', 'site')
		// this.status = strRequired(obj.status, 'User', 'status')
		// this.user_id = nbrOptional(obj.user_id, 'User')
	}

	async getUserSelectedSystem(state: State, dataObj: DataObj, parmData: ParmsValues) {
		const systems = this.resources.getResources(UserTypeResourceType.system)
		const parmName = `user_selected_system`

		switch (systems.length) {
			case 0:
				alert(
					`Cannot proceed. You have not been assigned system resources. Please see your administrator.`
				)
				return false
			case 1:
				parmData.data[parmName] = this.systemIds[0]
				return true
			default:
				parmData.data[parmName] = this.systemIds[0]
				return true

				// const itemsList = resources.map((r) => {
				// 	return new FieldItem(r.idResource, r.header)
				// })
				// parmData.data[parmName] = resources[0].idResource
				// console.log('User.setUserSelectParms.parmSelect.multi', { parmName, resources, itemsList })
				await state.openModalSelect(
					new TokenAppModalSelect({
						fieldLabel: `System Record`,
						fModalClose: (returnType: TokenAppModalReturnType, returnData?: ParmsValues) => {
							// if (returnType === TokenAppModalReturnType.complete) {
							// 	const parms: ParmsValues = returnData.data || undefined
							// 	if (parms) {
							// 		const selectedIds = parms[ParmsValuesType.listRecordIdSelected]
							// 		console.log('User.setUserSelectParms.fModalClose', {
							// 			returnData: returnData.data,
							// 			selectedIds
							// 		})
							// 		// parmData.data[parmName] = resources[0].idResource
							// 	}
							// 	return false
							// } else {
							// 	return false
							// }
						},
						isMultiSelect: false,
						itemsCurrent: []
						// itemsList: resources.map((r) => {
						// 	return new FieldItem(r.idResource, r.header)
						// })
					})
				)
				// parmData.data[parmName] = resources[0].idResource
				return true
		}

		return true
	}

	// getResourcesSubject(type: string): UserTypeResource[] {
	// 	return this.resources.filter((r) => r.typeSubject === type) || []
	// }

	prefIsActive(prefType: UserPrefType): boolean {
		return this.preferences.isActive(prefType)
	}

	setName() {
		this.fullName = `${this.firstName} ${this.lastName}`
	}
}

export class UserPrefs {
	items: UserPrefItem[] = []
	constructor(obj: any) {
		this.items = arrayOfClasses(UserPrefItem, obj)
	}
	isActive(prefType: UserPrefType): boolean {
		const pref = this.items.find((i) => i.codeType === prefType)
		return pref ? pref.isActive : false
	}
}

class UserPrefItem {
	codeType: UserPrefType
	isActive: boolean
	constructor(obj: any) {
		const clazz = 'UserPref'
		this.codeType = memberOfEnum(obj._codeType, clazz, 'codeType', 'UserPrefType', UserPrefType)
		this.isActive = booleanRequired(obj.isActive, clazz, 'isActive')
	}
}

export enum UserPrefType {
	notifications_auto_retrieve = 'notifications_auto_retrieve',
	remember_list_settings = 'remember_list_settings',
	widget_quick_report = 'widget_quick_report'
}

export class UserTypeResourceList {
	resources: UserTypeResource[] = []
	constructor() {}
	addResources(obj: any) {
		obj = getArray(obj)
		obj.forEach((r: any) => {
			this.resources.push(new UserTypeResource(r))
		})
	}
	getResources(type: UserTypeResourceType): UserTypeResource[] {
		return this.resources.filter((r) => r.codeType === type)
	}
	hasResources(type: UserTypeResourceType, name: string): boolean {
		return this.resources.some((r) => r.codeType === type && r.resource.name === name)
	}
}

export class UserTypeResource {
	codeType: UserTypeResourceType
	resource: UserTypeResourceItem
	constructor(obj: any) {
		const clazz = 'UserTypeResource'
		this.codeType = memberOfEnum(
			obj._codeType,
			clazz,
			'_codeType',
			'UserTypeResourceType',
			UserTypeResourceType
		)
		this.resource = new UserTypeResourceItem(obj._resource)
	}
}

export class UserTypeResourceItem {
	codeTypeSubject?: string
	header?: string
	id: string
	name: string
	constructor(obj: any) {
		const clazz = 'UserTypeResourceItem'
		this.codeTypeSubject = obj?._codeType
		this.header = obj.header
		this.id = strRequired(obj.id, clazz, 'id')
		this.name = strRequired(obj.name, clazz, 'name')
	}
}

export enum UserTypeResourceType {
	app = 'app',
	footer = 'footer',
	report = 'report',
	subject = 'subject',
	system = 'system',
	widget = 'widget'
}
