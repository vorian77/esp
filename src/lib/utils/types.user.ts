import { State } from '$comps/app/types.appState'
import { type DataRecord, Node, ParmsValues } from '$utils/types'
import {
	arrayOfClass,
	booleanOrFalse,
	booleanRequired,
	classOptional,
	getArray,
	memberOfEnum,
	required,
	strRequired,
	valueOrDefault
} from '$utils/utils'
import { DataObj, ParmsValuesType } from '$utils/types'
import { TokenAppModalReturnType, TokenAppModalSelect, TokenAppNode } from '$utils/types.token'
import { FileStorage } from '$comps/form/fieldFile'
import { error } from '@sveltejs/kit'

const FILENAME = '$utils/utils.user.ts'

export class User {
	avatar?: FileStorage
	dbBranch: string
	firstName: string
	fullName: string = ''
	id: string
	initials: string = ''
	isMobileOnly: boolean
	lastName: string
	org: UserOrg
	orgIds: string[] = []
	preferences: UserPrefs
	resources = new UserTypeResourceList()
	resources_sys_app: any[] = []
	resources_sys_footer: any[] = []
	resources_sys_task_default: UserResourceTask[] = []
	resources_sys_task_setting: UserResourceTask[] = []
	system: UserResource
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
		this.avatar = classOptional(FileStorage, obj.avatar)
		this.dbBranch = required(obj.dbBranch, clazz, 'dbBranch')
		this.firstName = strRequired(obj.firstName, clazz, 'firstName')
		this.fullName = strRequired(obj.fullName, clazz, 'fullName')
		this.id = strRequired(obj.id, clazz, 'id')
		this.isMobileOnly = booleanOrFalse(obj.isMobileOnly, 'isMobileOnly')
		this.lastName = strRequired(obj.lastName, clazz, 'lastName')
		this.org = new UserOrg(obj.org)
		this.orgIds = obj.orgs.map((o: any) => o.id)
		this.preferences = new UserPrefs(obj.preferences)
		this.resources_sys_app = obj.resources_app
		this.resources_sys_footer = obj.resources_footer
		this.resources_sys_task_default = arrayOfClass(UserResourceTask, obj.resources_task_default)
		this.resources_sys_task_setting = arrayOfClass(UserResourceTask, obj.resources_task_setting)
		this.system = new UserResource(obj.system)
		this.systemIds = obj.systems.map((s: any) => s.id)
		this.userName = strRequired(obj.userName, clazz, 'userName')

		/* derived */
		this.initials = this.firstName.toUpperCase()[0] + this.lastName.toUpperCase()[0]
		this.resources.addResources(obj.resources_core)
		this.resources.addResources(obj.resources_subject)
		// console.log('User.constructor', this)

		// old
		// this.cm_ssr_disclosure = nbrOptional(obj.cm_ssr_disclosure, 'cm_ssr_disclosure')
		// this.per_name_full = strRequired(obj.per_name_full, 'User', 'per_name_full')
		// this.site = strRequired(obj.site, 'User', 'site')
		// this.status = strRequired(obj.status, 'User', 'status')
		// this.user_id = nbrOptional(obj.user_id, 'User')
	}

	async selectResource(state: State, resourceType: UserTypeResourceType) {
		const resources = this.resources.getResources(resourceType)
		switch (resources.length) {
			case 0:
				alert(
					`Cannot proceed. You have not been assigned any resources of type: ${resourceType}. Please see your administrator.`
				)
				return undefined
			case 1:
				return resources[0]

			default:
				// const itemsList = resources.map((r) => {
				// 	return new FieldItem(r.idResource, r.header)
				// })
				// parmData.data[parmName] = resources[0].idResource
				// console.log('User.setUserSelectParms.parmSelect.multi', { parmName, resources, itemsList })
				await state.openModalSelect(
					new TokenAppModalSelect({
						columnsDefs: undefined,
						fModalClose: (returnType: TokenAppModalReturnType, returnData?: ParmsValues) => {
							// if (returnType === TokenAppModalReturnType.complete) {
							// 	const parms: ParmsValues = returnData.data || undefined
							// 	if (parms) {
							// 		const selectedIds = parms[ParmsValuesType.listIdsSelected]
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
						gridColumnId: '',
						isMultiSelect: false,
						listIdsSelected: [],
						rowData: undefined,
						selectLabel: `System Record`
					})
				)
				// parmData.data[parmName] = resources[0].idResource
				return undefined
		}

		return undefined
	}

	prefIsActive(prefType: UserPrefType): boolean {
		return this.preferences.isActive(prefType)
	}

	setName() {
		this.fullName = `${this.firstName} ${this.lastName}`
	}
}

export class UserOrg {
	appName?: string
	id: string
	logoMarginRight: number
	logoWidth: number
	name: string
	urlLogo?: string
	constructor(obj: any) {
		const clazz = 'UserOrg'
		this.appName = obj.appName
		this.id = strRequired(obj.id, clazz, 'id')
		this.logoMarginRight = required(obj.logoMarginRight, clazz, 'logoMarginRight')
		this.logoWidth = required(obj.logoWidth, clazz, 'logoWidth')
		this.name = strRequired(obj.name, clazz, 'name')
		this.urlLogo = strRequired(obj.file.url, clazz, 'file.url')
	}
}

export class UserPrefs {
	items: UserPrefItem[] = []
	constructor(obj: any) {
		this.items = arrayOfClass(UserPrefItem, obj)
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
	widget_quick_report = 'widget_quick_report',
	widget_quick_report_moed = 'widget_quick_report_moed'
}

export class UserResource {
	codeIconName?: string
	id: string
	isGlobalResource: boolean
	header: string
	name: string
	constructor(obj: any) {
		const clazz = 'UserResource'
		this.codeIconName = obj._codeIconName
		this.id = strRequired(obj.id, clazz, 'id')
		this.isGlobalResource = booleanOrFalse(obj.isGlobalResource, 'isGlobalResource')
		this.header = strRequired(obj.header, clazz, 'header')
		this.name = strRequired(obj.name, clazz, 'name')
	}
}

export class UserResourceTask extends UserResource {
	btnStyle?: string
	codeCategory: UserResourceTaskCategory
	codeStatusObjName?: string
	description?: string
	exprShow?: string
	exprStatus?: string
	hasAltOpen: boolean
	isPinToDash: boolean
	isShow: boolean = true
	sourceDataObjId?: string
	sourceNodeObjId?: string
	constructor(obj: any) {
		super(obj)
		const clazz = 'UserResourceTask'
		this.btnStyle = obj.btnStyle
		this.codeCategory = memberOfEnum(
			obj._codeCategory,
			clazz,
			'codeCategory',
			'UserResourceTaskCategory',
			UserResourceTaskCategory
		)
		this.codeStatusObjName = obj._codeStatusObjName
		this.description = obj.description
		this.exprShow = obj.exprShow
		this.exprStatus = obj.exprStatus
		this.hasAltOpen = booleanOrFalse(obj.hasAltOpen, 'hasAltOpen')
		this.isPinToDash = booleanOrFalse(obj.isPinToDash, 'isPinToDash')
		this.sourceDataObjId = obj._sourceDataObjId
		this.sourceNodeObjId = obj._sourceNodeObjId
	}

	getTokenNode(user: User | undefined) {
		return new TokenAppNode({
			node: new Node({
				_codeNodeType: this.sourceDataObjId
					? 'program'
					: this.sourceNodeObjId
						? 'object'
						: undefined,
				dataObjId: this.sourceDataObjId,
				header: this.header,
				icon: this.codeIconName,
				id: this.id,
				isMobileMode: valueOrDefault(user?.isMobileOnly, false),
				name: this.name,
				nodeObjId: this.sourceNodeObjId,
				page: '/home'
			})
		})
	}
	setShow(isShow: boolean) {
		this.isShow = isShow
	}
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
	hasResources(type: UserTypeResourceType, names: string | string[]): boolean {
		names = getArray(names)
		return this.resources.some((r) => r.codeType === type && names.includes(r.resource.name))
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
	icon?: string
	id: string
	name: string
	constructor(obj: any) {
		const clazz = 'UserTypeResourceItem'
		this.codeTypeSubject = obj?._codeType
		this.header = obj.header
		this.icon = obj._icon
		this.id = strRequired(obj.id, clazz, 'id')
		this.name = strRequired(obj.name, clazz, 'name')
	}
}

export enum UserResourceTaskCategory {
	default = 'default',
	record = 'record',
	setting = 'setting',
	tab = 'tab'
}

export enum UserTypeResourceType {
	app = 'app',
	footer = 'footer',
	report = 'report',
	subject = 'subject',
	system = 'system',
	task = 'task',
	widget = 'widget'
}
