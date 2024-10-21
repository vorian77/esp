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
	resources_subject: UserTypeResource[] = []
	resources_sys_app: any[] = []
	resources_sys_footer: any[] = []
	resources_sys_widget: any[] = []
	resources_systems: any[] = []
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
		this.resources_subject = arrayOfClasses(UserTypeResource, obj.resources_subject)
		this.resources_sys_app = obj.resources_sys_app
		this.resources_sys_footer = obj.resources_sys_footer
		this.resources_sys_widget = obj.resources_sys_widget
		// this.resources_systems = arrayOfClasses(UserTypeResource, obj.systems)
		this.resources_systems = obj.systems
		this.systemIds = getArray(obj.systems).map((s) => s.id)
		console.log('User.constructor.resources_systems', {
			resource_systems: this.resources_systems,
			systemIds: this.systemIds
		})

		this.userName = strRequired(obj.userName, clazz, 'userName')

		// derived
		this.initials = this.firstName.toUpperCase()[0] + this.lastName.toUpperCase()[0]
		// console.log('User.constructor', this)

		// old
		// this.cm_ssr_disclosure = nbrOptional(obj.cm_ssr_disclosure, 'cm_ssr_disclosure')
		// this.per_name_full = strRequired(obj.per_name_full, 'User', 'per_name_full')
		// this.site = strRequired(obj.site, 'User', 'site')
		// this.status = strRequired(obj.status, 'User', 'status')
		// this.user_id = nbrOptional(obj.user_id, 'User')
	}

	async getUserSelectedSystem(state: State, dataObj: DataObj, parmData: ParmsValues) {
		console.log('User.getUserParmsSelected', {
			dataObj,
			parmData
		})
		const parmName = `user_selected_system`

		switch (this.resources_systems.length) {
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

	getResourcesSubject(
		resourceType: UserTypeResourceType,
		subjectType?: string
	): UserTypeResource[] {
		return this.resources_subject.filter((r) => r.codeType === resourceType) || []
	}

	prefIsActive(prefType: UserPrefType): boolean {
		return this.preferences.isActive(prefType)
	}

	setName() {
		this.fullName = `${this.firstName} ${this.lastName}`
	}

	setResourcesSystem(obj: any) {
		let resources: UserTypeResource[] = []
		getArray(obj).forEach((sys: { header: string; id: string; name: string }) => {
			resources.push(
				new UserTypeResource({
					_codeType: UserTypeResourceType.system,
					_resource: { header: sys.header, id: sys.id, name: sys.name }
				})
			)
		})
		return resources
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

export class UserTypeResource {
	codeType: UserTypeResourceType
	header?: string
	idResource: string
	idSubject?: string
	name: string
	constructor(obj: any) {
		const clazz = 'UserTypeResourceItem'
		this.codeType = memberOfEnum(
			obj._codeType,
			clazz,
			'codeType',
			'UserTypeResourceType',
			UserTypeResourceType
		)
		this.header = obj._resource.header
		this.idResource = strRequired(obj._resource.id, clazz, 'idResource')
		this.idSubject =
			this.codeType === UserTypeResourceType.subject
				? strRequired(obj.idSubject, clazz, 'idSubject')
				: undefined
		this.name = strRequired(obj._resource.name, clazz, 'name')
	}
}

export enum UserTypeResourceType {
	'app' = 'app',
	'intervention' = 'intervention',
	'report' = 'report',
	'subject' = 'subject',
	'system' = 'system',
	'widget' = 'widget'
}
