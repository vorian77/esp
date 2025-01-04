import { State } from '$comps/app/types.appState.svelte'
import { DataObjData, type DataRecord, Node, ParmsValues } from '$utils/types'
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
import { queryTypeDataObj } from '$comps/app/types.appQuery'
import {
	TokenApiQueryType,
	TokenAppModalReturnType,
	TokenAppModalSelect,
	TokenAppNode
} from '$utils/types.token'
import { FileStorage } from '$comps/form/fieldFile'
import { goto } from '$app/navigation'
import { error } from '@sveltejs/kit'

const FILENAME = '$utils/types.user.ts'

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

	async selectResource(sm: State, resourceType: UserTypeResourceType) {
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
				await sm.openModalSelect(
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
	codeRenderType: UserResourceTaskRenderType
	codeStatusObjName?: string
	data: DataRecord = {}
	dataObjPage?: DataObj
	description?: string
	exprShow?: string
	exprStatus?: string
	hasAltOpen: boolean
	isPinToDash: boolean
	isShow: boolean = true
	pageDataObjId?: string
	targetDataObjId?: string
	targetNodeObjId?: string
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
		this.codeRenderType = memberOfEnum(
			obj._codeRenderType,
			clazz,
			'codeRender',
			'UserResourceTaskRenderType',
			UserResourceTaskRenderType
		)
		this.codeStatusObjName = obj._codeStatusObjName
		this.description = obj.description
		this.exprShow = obj.exprShow
		this.exprStatus = obj.exprStatus
		this.hasAltOpen = booleanOrFalse(obj.hasAltOpen, 'hasAltOpen')
		this.isPinToDash = booleanOrFalse(obj.isPinToDash, 'isPinToDash')
		this.pageDataObjId = obj._pageDataObjId
		this.targetDataObjId = obj._targetDataObjId
		this.targetNodeObjId = obj._targetNodeObjId
	}

	getTokenNode(user: User | undefined) {
		return new TokenAppNode({
			node: new Node({
				_codeNodeType: this.targetDataObjId
					? 'program'
					: this.targetNodeObjId
						? 'object'
						: undefined,
				dataObjId: this.targetDataObjId,
				header: this.header,
				icon: this.codeIconName,
				id: this.id,
				isMobileMode: valueOrDefault(user?.isMobileOnly, false),
				name: this.name,
				nodeObjId: this.targetNodeObjId,
				page: '/home'
			})
		})
	}
	async loadPage(sm: State) {
		if (this.pageDataObjId) {
			this.dataObjPage = await queryTypeDataObj(
				sm,
				this.pageDataObjId,
				new DataObjData(),
				TokenApiQueryType.retrieve
			)
		}
	}

	setShow(isShow: boolean) {
		this.isShow = isShow
	}
}

export async function userSetId(userId: string) {
	const formData = new FormData()
	formData.set('session_id', userId)
	const responsePromise: Response = await fetch('/', {
		method: 'POST',
		body: formData
	})
	goto('/home')
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
export enum UserResourceTaskRenderType {
	button = 'button',
	page = 'page'
}

export enum UserTypeResourceType {
	app = 'app',
	report = 'report',
	subject = 'subject',
	system = 'system',
	task = 'task',
	widget = 'widget'
}

/*  
	<todo> 231130 - esp user record
	user_id: 170896,
		per_name_first: 'Phyllip',
		per_name_last: 'Hall',
		per_name_full: 'Phyllip Hall',
		initials: 'PH',
		org_id: 6761,
		user_type_list: '',
		user_types: [ 'student' ],
		header: 'Atlantic Impact Mobile',
		apps: [ '/home/cm' ],
		cm_ssr_disclosure: 1,
		cm_ssr_site: null,
		site: '',
		referral_id: -1,
		cm_ssr_submitted: null,
		status: 'Pending',
		time_stamp: '2023-11-30 07:53:29.205',
		root: '/home/cm',
	
		async function getUserESP() {
			const responsePromise = await dbESPAPI(HTMLMETHOD.GET, 'ws_cm_ssr_user', { userId })
			const response: ResponseBody = await responsePromise.json()
	
			if (!response.success) {
				throw error(500, {
					file: FILENAME,
					function: 'getUserESP',
					message: `Unable to retrieve user: ${userId}`
				})
			}
	
			// set user
			const user = response.data
	
			// array user types
			user.user_types = user.user_types.split(',')
	
			// apps
			if (user.apps === '') {
				throw error(500, {
					file: FILENAME,
					function: 'fetchUser',
					message: `No apps defined for user: ${user.per_name_full} id: ${user.user_id}`
				})
			}
			const appsList = user.apps.split(',')
			user.apps = appsList.map((app: string) => '/home/' + app)
			user.root = user.user_types.includes('admin') ? '/home' : user.apps[0]
	
	*/

// <todo> 231008 - need to figure out how to set global current user
// set global current user
// await dbExecute(`set global sys_user::currentUserId := <uuid>"${user.id}"`)
// set global currentUserId := <uuid>"9a2966ba-4e96-11ee-abc0-73f75479eb42";

// const q = `select global sys_user::currentUser { fullName }`
// const u = await dbSelectSingle(q)
// console.log('global user:', u)
// await getData('')
