import { State } from '$comps/app/types.state.svelte'
import {
	NodeRenderPlatform,
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
	getDbExprRaw,
	memberOfEnum,
	MethodResult,
	NodeObjComponent,
	required,
	strRequired,
	UserParmItemType,
	valueOrDefault
} from '$utils/utils'
import { DataObj, ParmsValuesType } from '$utils/types'
import { TokenApiQueryType, TokenAppDoQuery, TokenAppNode } from '$utils/types.token'
import { clientQueryExpr } from '$lib/queryClient/types.queryClient'
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
	personId: string
	preferences: UserPrefType[]
	resources_app: any[] = []
	resources_tasks: UserResourceTasks
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
		this.personId = strRequired(obj._personId, clazz, 'personId')
		this.preferences = arrayOfEnums(
			clazz,
			getArray(obj._preferences.map((p: any) => p._codeType)),
			'preferences',
			'UserPrefType',
			UserPrefType
		)
		this.resources_app = obj._resources_app
		this.resources_tasks = new UserResourceTasks(obj)
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

export class UserResourceTaskItem extends UserResource {
	codeTaskStatusObjName?: string
	codeTaskType: UserResourceTaskItemType
	data: DataRecord = {}
	dataObjId?: string
	dataObjPage?: DataObj
	description?: string
	exprShow?: string
	exprStatus?: string
	exprWith: string
	hasAltOpen: boolean
	isHTMLPage: boolean
	isPinned: boolean = false
	noDataMsg?: string
	nodeObj?: Node
	ownerId: string
	refreshToggle: boolean = $state(false)
	constructor(obj: any) {
		super(obj)
		const clazz = 'UserResourceTaskItem'
		this.codeTaskStatusObjName = obj._codeTaskStatusObjName
		this.codeTaskType = memberOfEnum(
			obj._codeTaskTypeName,
			clazz,
			'codeTaskType',
			'UserResourceTaskItemType',
			UserResourceTaskItemType
		)
		this.dataObjId = obj._dataObjId
		this.description = obj.description
		this.exprShow = valueOrDefault(obj.exprShow, '')
		this.exprStatus = valueOrDefault(obj.exprStatus, '')
		this.exprWith = valueOrDefault(obj.exprWith, '')
		this.hasAltOpen = booleanOrFalse(obj.hasAltOpen)
		this.isHTMLPage = booleanOrFalse(obj._isHTMLPage)
		this.noDataMsg = obj.noDataMsg
		this.nodeObj = classOptional(Node, obj._nodeObj)
		this.ownerId = strRequired(obj._ownerId, clazz, 'ownerId')
	}
	async getDataDB(sm: State, exprCustom: string) {
		const evalExprContext = `${FILENAME}.getDataDB`
		const exprEval = getDbExprRaw(this.exprWith, exprCustom)
		return await clientQueryExpr(evalExprContext, exprEval, {}, sm)
	}

	async getShowDashboard(sm: State): Promise<MethodResult> {
		let isShow = false

		if (this.exprShow) {
			const result: MethodResult = await this.getDataDB(sm, this.exprShow)
			if (result.error) return result
			isShow = result.getResultRawListValue()
		} else {
			let result: MethodResult = sm.userParmGet(
				UserParmItemType.menuWidgetsPinned,
				UserParmItemType.menuWidgetsPinned
			)
			if (result.error) return result
			let taskIdsPinned: string[] = result.data
			isShow = taskIdsPinned.includes(this.id)
		}

		return new MethodResult(isShow)
	}
	async getStatus(sm: State): Promise<MethodResult> {
		let status = undefined
		if (!this.exprStatus) {
			status = undefined
		} else {
			const result: MethodResult = await this.getDataDB(sm, this.exprStatus)
			if (result.error) return result
			status = result.getResultRawList()
		}
		return new MethodResult(status)
	}

	getTokenNode(sm: State) {
		if (this.nodeObj) {
			return new TokenAppNode({ node: this.nodeObj })
		} else {
			return undefined
		}
	}

	async loadPage(sm: State): Promise<MethodResult> {
		if (this.isHTMLPage && this.nodeObj) {
			const token = this.getTokenNode(sm)
			if (!token)
				return new MethodResult({
					error: {
						file: FILENAME,
						function: 'UserResourceTaskItem.loadPage',
						msg: `No nodeObj defined for task: ${this.name}`
					}
				})

			let result: MethodResult = await sm.app.treeNodeAdd(sm, token)
			if (result.error) return result

			this.setDataObjPage(sm.app.getCurrTab()?.dataObj)
			if (this.dataObjPage) await sm.dm.nodeAdd(this.dataObjPage)
		}
		return new MethodResult()
	}

	setDataObjPage(dataObj?: DataObj) {
		if (dataObj) this.dataObjPage = dataObj
	}

	async togglePinToDash(sm: State): Promise<MethodResult> {
		let result: MethodResult = sm.userParmGet(
			UserParmItemType.menuWidgetsPinned,
			UserParmItemType.menuWidgetsPinned
		)
		if (result.error) return result
		let taskIdsPinned: string[] = result.data

		if (taskIdsPinned.includes(this.id)) {
			taskIdsPinned = taskIdsPinned.filter((t) => t !== this.id)
		} else {
			taskIdsPinned.push(this.id)
		}

		sm.userParmSet(
			UserParmItemType.menuWidgetsPinned,
			UserParmItemType.menuWidgetsPinned,
			taskIdsPinned
		)
		await sm.userParmSave(UserParmItemType.menuWidgetsPinned)
		await sm.triggerActionDashboard()

		return new MethodResult()
	}

	toggleRefresh() {
		this.refreshToggle = !this.refreshToggle
	}
}

export enum UserResourceTaskItemType {
	taskAutomated = 'taskAutomated',
	taskManual = 'taskManual',
	taskWidget = 'taskWidget'
}

export class UserResourceTasks {
	tasks: UserResourceTaskItem[] = []
	constructor(obj: any) {
		const clazz = 'UserResourceTasks'
		this.tasks = arrayOfClass(UserResourceTaskItem, obj._resources_task)
	}
	async getTasksDashboard(sm: State): Promise<MethodResult> {
		let tasks: UserResourceTaskItem[] = []

		for (let i = 0; i < this.tasks.length; i++) {
			let task = this.tasks[i]
			let result: MethodResult = await task.getShowDashboard(sm)
			if (result.error) {
				console.error('getTasksDashboard.error:', result.error)
				return result
			}
			let isShow = result.data

			if (isShow) {
				if (task.isHTMLPage) {
					let result = await task.loadPage(sm)
					if (result.error) {
						console.error('getTasksDashboard.error:', result.error)
						return result
					}
				}

				let result: MethodResult = await task.getStatus(sm)
				if (result.error) {
					console.error('getTasksDashboard.error:', result.error)
					return result
				}
				task.data = result.data

				tasks.push(task)
			}
		}
		return new MethodResult(tasks)
	}

	getTasksMenuTasks(sm: State): MethodResult {
		let tasks: UserResourceTaskItem[] = []
		for (let i = 0; i < this.tasks.length; i++) {
			let task = this.tasks[i]
			if (task.codeTaskType === UserResourceTaskItemType.taskManual) tasks.push(task)
		}
		return new MethodResult(tasks)
	}

	getTasksMenuWidgets(sm: State): MethodResult {
		let tasks: UserResourceTaskItem[] = []

		// get tasks - pinned
		let result: MethodResult = sm.userParmGet(
			UserParmItemType.menuWidgetsPinned,
			UserParmItemType.menuWidgetsPinned
		)
		if (result.error) return result
		let taskIdsPinned: string[] = result.data
		// let taskIdsPinned: string[] = []

		for (let i = 0; i < this.tasks.length; i++) {
			let task = this.tasks[i]
			if (task.codeTaskType === UserResourceTaskItemType.taskWidget) {
				task.isPinned = taskIdsPinned.includes(task.id)
				tasks.push(task)
			}
		}
		return new MethodResult(tasks)
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
		this.logoMarginRight = valueOrDefault(obj.logoMarginRight, 0)
		this.logoWidth = valueOrDefault(obj.logoWidth, 50)
		this.name = strRequired(obj.name, clazz, 'name')
		this.orgName = strRequired(obj._orgName, clazz, 'orgName')
		this.urlLogo = obj.file?.url
	}
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
