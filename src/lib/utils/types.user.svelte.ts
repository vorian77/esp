import { State } from '$comps/app/types.appState.svelte'
import {
	DataObjRenderPlatform,
	type DataRecord,
	debug,
	Node,
	ObjAttrAccess,
	ObjAttrAction,
	ObjAttrExpr,
	ObjAttrVirtual
} from '$utils/types'
import {
	arrayOfClass,
	arrayOfEnums,
	booleanOrFalse,
	classOptional,
	FileStorage,
	getArray,
	memberOfEnum,
	MethodResult,
	NodeObjComponent,
	required,
	strRequired,
	valueOrDefault
} from '$utils/utils'
import { DataObj, ParmsValuesType } from '$utils/types'
import { TokenApiQueryType, TokenAppDoQuery, TokenAppNode } from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '$utils/types.user.ts'

export class User {
	attrsAccessIdAllow: string[] = []
	attrsAccessIdDeny: string[] = []
	attrsAction: ObjAttrAction[] = []
	attrsExpr: ObjAttrExpr[] = []
	avatar?: FileStorage
	dbBranch: string
	firstName: string
	fullName: string = ''
	id: string
	initials: string = ''
	lastName: string
	name: string
	orgIds: string[] = []
	personId: string
	preferences: UserPrefType[]
	resources_app: any[] = []
	resources_task: UserResourceTask[] = $state([])
	system: UserSystem
	systemIdCurrent: string
	systemIds: string[] = []

	// old
	cm_ssr_disclosure: number | undefined
	per_name_full: string = ''
	site: string = ''
	status: string = ''
	user_id: number | undefined

	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'User'
		this.attrsAccessIdAllow = getArray(obj._attrsAccessIdAllow)
		this.attrsAccessIdDeny = getArray(obj._attrsAccessIdDeny)
		this.attrsAction = arrayOfClass(ObjAttrAction, obj._attrsAction)
		this.attrsExpr = arrayOfClass(ObjAttrExpr, obj._attrsExpr)
		this.avatar = classOptional(FileStorage, obj.avatar)
		this.dbBranch = required(obj.dbBranch, clazz, 'dbBranch')
		this.firstName = strRequired(obj.firstName, clazz, 'firstName')
		this.fullName = strRequired(obj.fullName, clazz, 'fullName')
		this.id = strRequired(obj.id, clazz, 'id')
		this.lastName = strRequired(obj.lastName, clazz, 'lastName')
		this.name = strRequired(obj.name, clazz, 'name')
		this.orgIds = obj.orgs.map((o: any) => o.id)
		this.personId = strRequired(obj._personId, clazz, 'personId')
		this.preferences = arrayOfEnums(
			clazz,
			getArray(obj._preferences.map((p: any) => p._codeType)),
			'preferences',
			'UserPrefType',
			UserPrefType
		)
		this.resources_app = obj._resources_app
		this.resources_task = arrayOfClass(UserResourceTask, obj._resources_task)
		this.system = new UserSystem(obj._system)
		this.systemIdCurrent = strRequired(obj._system.id, clazz, 'systemIdCurrent')
		this.systemIds = obj.systems.map((s: any) => s.id)

		/* derived */
		this.initials = this.firstName.toUpperCase()[0] + this.lastName.toUpperCase()[0]

		// old
		// this.cm_ssr_disclosure = nbrOptional(obj.cm_ssr_disclosure, 'cm_ssr_disclosure')
		// this.per_name_full = strRequired(obj.per_name_full, 'User', 'per_name_full')
		// this.site = strRequired(obj.site, 'User', 'site')
		// this.status = strRequired(obj.status, 'User', 'status')
		// this.user_id = nbrOptional(obj.user_id, 'User')
	}

	prefIsActive(prefType: UserPrefType): boolean {
		return this.preferences.includes(prefType)
	}

	setName() {
		this.fullName = `${this.firstName} ${this.lastName}`
	}
	getTasksDash(fDashRefresh: Function) {
		this.resources_task.forEach((r) => {
			r.fDashRefresh = fDashRefresh
		})
		return this.resources_task.filter((task: UserResourceTask) => task.isPinToDash || task.exprShow)
	}
}

export enum UserPrefType {
	disable_notifications_offline = 'disable_notifications_offline',
	disable_remember_feature_settings = 'disable_remember_feature_settings'
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
		this.isGlobalResource = booleanOrFalse(obj.isGlobalResource)
		this.header = strRequired(obj.header, clazz, 'header')
		this.name = strRequired(obj.name, clazz, 'name')
	}
}

export class UserResourceTask extends UserResource {
	codeRenderType: UserResourceTaskRenderType
	codeStatusObjName?: string
	data: DataRecord = {}
	dataObjPage?: DataObj
	description?: string
	exprShow?: string
	exprStatus?: string
	exprWith?: string
	fDashRefresh?: Function
	hasAltOpen: boolean
	isPinToDash: boolean = $state(false)
	isRecreate: boolean = $state(false)
	isShow: boolean = $state(false)
	noDataMsg?: string
	ownerId: string
	pageDataObjId?: string
	targetDataObjId?: string
	targetDataObjOwnerId?: string
	targetNodeObj?: Node
	constructor(obj: any) {
		super(obj)
		const clazz = 'UserResourceTask'
		this.codeRenderType = memberOfEnum(
			obj._codeRenderType,
			clazz,
			'codeRender',
			'UserResourceTaskRenderType',
			UserResourceTaskRenderType
		)
		this.codeStatusObjName = obj._codeStatusObjName
		this.description = obj.description
		this.exprShow = valueOrDefault(obj.exprShow, '')
		this.exprStatus = valueOrDefault(obj.exprStatus, '')
		this.exprWith = valueOrDefault(obj.exprWith, '')
		this.fDashRefresh = obj._fDashRefresh
		this.hasAltOpen = booleanOrFalse(obj.hasAltOpen)
		this.isPinToDash = booleanOrFalse(obj.isPinToDash)
		this.noDataMsg = obj.noDataMsg
		this.ownerId = strRequired(obj._ownerId, clazz, 'ownerId')
		this.pageDataObjId = obj._pageDataObjId
		this.targetDataObjId = obj._targetDataObjId
		this.targetDataObjOwnerId = obj._targetDataObjOwnerId
		this.targetNodeObj = classOptional(Node, obj._targetNodeObj)
	}

	async getTokenNode(sm: State) {
		if (this.targetNodeObj) {
			sm.parmsState.valueSet(ParmsValuesType.queryOwnerSys, this.ownerId)
			return new TokenAppNode({
				node: this.targetNodeObj,
				queryType: TokenApiQueryType.retrieve,
				renderPlatform: DataObjRenderPlatform.app
			})
		} else if (this.targetDataObjId && this.targetDataObjOwnerId) {
			sm.parmsState.valueSet(ParmsValuesType.queryOwnerSys, this.targetDataObjOwnerId)
			const dataObjNode = new Node({
				_codeNodeType: 'program',
				_dataObjId: this.targetDataObjId,
				_ownerId: this.ownerId,
				header: this.header,
				icon: this.codeIconName,
				id: this.targetDataObjId,
				name: this.name
			})
			return new TokenAppNode({
				node: dataObjNode,
				queryType: TokenApiQueryType.autonomous,
				renderPlatform: DataObjRenderPlatform.app
			})
		} else {
			return undefined
		}
	}

	async loadPage(sm: State): Promise<MethodResult> {
		if (this.pageDataObjId) {
			const token = new TokenAppDoQuery({
				codeComponent: NodeObjComponent.FormDetail,
				dataObjId: this.pageDataObjId,
				queryType: TokenApiQueryType.retrieve
			})

			let result: MethodResult = await sm.app.addTreeDataObj(sm, token)
			if (result.error) return result

			this.dataObjPage = sm.app.getCurrTab()?.dataObj

			if (this.dataObjPage) {
				if (this.fDashRefresh) this.dataObjPage.setCallbackUserAction(this.fDashRefresh)
				sm.dm.nodeAdd(this.dataObjPage)
			}
		}
		return new MethodResult()
	}
	async togglePinToDash() {
		this.isPinToDash = !this.isPinToDash
		if (this.fDashRefresh) await this.fDashRefresh()
	}
	toggleRecreate() {
		this.isRecreate = !this.isRecreate
	}
	setShow(isShow: boolean) {
		this.isShow = isShow
	}
}

export class UserSystem {
	appName?: string
	id: string
	logoMarginRight: number
	logoWidth: number
	name: string
	orgName: string
	urlLogo?: string
	constructor(obj: any) {
		const clazz = 'UserOrg'
		this.appName = obj.appName
		this.id = strRequired(obj.id, clazz, 'id')
		this.logoMarginRight = required(obj.logoMarginRight, clazz, 'logoMarginRight')
		this.logoWidth = required(obj.logoWidth, clazz, 'logoWidth')
		this.name = strRequired(obj.name, clazz, 'name')
		this.orgName = strRequired(obj._orgName, clazz, 'orgName')
		this.urlLogo = obj.file?.url
	}
}

export enum UserResourceTaskRenderType {
	button = 'button',
	page = 'page'
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
			const response: MethodResult = await responsePromise.json()
	
			if (!response.success) {
				error(500, {
					file: FILENAME,
					function: 'getUserESP',
					msg: `Unable to retrieve user: ${userId}`
				})
			}
	
			// set user
			const user = response.data
	
			// array user types
			user.user_types = user.user_types.split(',')
	
			// apps
			if (user.apps === '') {
				error(500, {
					file: FILENAME,
					function: 'fetchUser',
					msg: `No apps defined for user: ${user.per_name_full} id: ${user.user_id}`
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
