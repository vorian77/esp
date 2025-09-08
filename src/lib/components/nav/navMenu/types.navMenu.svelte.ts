import {
	booleanOrDefault,
	CodeAction,
	CodeActionClass,
	CodeActionType,
	type DataRecord,
	EvalExprCustomComposite,
	getArray,
	isPlainObjectEmpty,
	memberOfEnum,
	memberOfEnumIfExists,
	MethodResult,
	Node,
	ParmsValuesType,
	RawMenu,
	required,
	User,
	UserParmItemSource,
	UserParmItemType,
	UserResourceTaskItem,
	valueOrDefault
} from '$utils/types'
import { State, StateNavLayout, StateParms } from '$comps/app/types.state.svelte'
import {
	Token,
	TokenApiId,
	TokenApiQueryData,
	TokenApiQueryType,
	TokenAppDoQuery,
	TokenAppNode,
	TokenAppStateTriggerAction,
	TokenAppUserActionConfirmType
} from '$utils/types.token'
import { apiFetchFunction, ApiFunction } from '$routes/api/api'
import { goto } from '$app/navigation'
import { evalExpr } from '$utils/utils.evalParserDb'
import { error } from '@sveltejs/kit'

const FILENAME = 'src/lib/components/navMenu/types.navMenu.ts'

export class NavMenuData {
	fadeIn = {
		delay: 300,
		duration: 200
	}
	fadeOut = {
		delay: 0,
		duration: 200
	}
	iconColor = '#daa520'
	idIndex = -1
	isOpen = $state(true)
	items: NavMenuDataComp[] = $state([])
	itemsNamed: NavMenuNamedItems = new NavMenuNamedItems()
	sm?: State
	width: number = $state(250)
	widthClosed = 70
	widthOpen = 250
	constructor() {
		const clazz = 'NavMenuData'
	}

	async activateLink(item: NavMenuDataCompItem): Promise<MethodResult> {
		const content = item.content
		let node
		if (this.sm && content) {
			switch (content.codeType) {
				case NavMenuContentType.functionAsync:
					await content.value(this)
					break

				case NavMenuContentType.dataObjDrawer:
					return await this.triggerAction(
						CodeActionClass.ct_sys_code_action_class_nav,
						CodeActionType.openNodeFreeDrawer,
						{ token: content.value as TokenAppDoQuery },
						{}
					)

				case NavMenuContentType.node:
					node = content.value as Node
					return await this.triggerAction(
						CodeActionClass.ct_sys_code_action_class_nav,
						CodeActionType.openNode,
						{ token: new TokenAppNode({ node }) },
						{ navLayout: StateNavLayout.layoutApp }
					)

				case NavMenuContentType.nodeFree:
					const tokenNodeFree = content.value as TokenApiId
					return await this.triggerAction(
						CodeActionClass.ct_sys_code_action_class_nav,
						CodeActionType.openNodeFreeApp,
						// CodeActionType.openNodeFreeDrawer,
						// CodeActionType.openNodeFreeModal,
						{ token: tokenNodeFree },
						{ navLayout: StateNavLayout.layoutApp }
					)

				case NavMenuContentType.nodeModal:
					return await this.sm.triggerAction(
						new TokenAppStateTriggerAction({
							codeAction: CodeAction.init(
								CodeActionClass.ct_sys_code_action_class_nav,
								CodeActionType.openNodeFreeModal
							),
							codeConfirmType: TokenAppUserActionConfirmType.statusChanged,
							data: { token: content.value as TokenApiId },
							stateParms: new StateParms({ navLayout: StateNavLayout.layoutApp })
						})
					)

				case NavMenuContentType.page:
					return await this.triggerAction(
						CodeActionClass.ct_sys_code_action_class_nav,
						CodeActionType.navPage,
						{ value: content.value },
						{}
					)

				case NavMenuContentType.task:
					const task: UserResourceTaskItem = content.value as UserResourceTaskItem
					const taskTokenNode = task.getTokenNode(this.sm)
					if (taskTokenNode) {
						return await this.triggerAction(
							CodeActionClass.ct_sys_code_action_class_nav,
							CodeActionType.openNode,
							{ token: taskTokenNode },
							{}
						)
					} else {
						await task.togglePinToDash(this.sm)
						const itemGroup = this.itemsNamed.find(
							NavMenuNamedItemType.groupWidgets
						) as NavMenuDataCompGroup
						if (itemGroup) {
							const itemTask = itemGroup.itemFindContent(task.name)
							if (itemTask) itemTask.toggleHighlighted()
						}
					}
					break

				default:
					return new MethodResult({
						error: {
							file: FILENAME,
							function: 'activateLink',
							msg: `No case defined for item type: ${content.codeType}`
						}
					})
			}
		}
		return new MethodResult()
	}

	async activateLinkByNamedItem(itemType: NavMenuNamedItemType) {
		const item: any = this.itemsNamed.find(itemType)
		if (item) item.navMenu.activateLink(item)
	}

	getId() {
		this.idIndex++
		return this.idIndex
	}

	getItemClassName(item: any) {
		return Object.getPrototypeOf(item).constructor.name
	}

	getAncestor(item: NavMenuDataCompItem, ancestorType: any) {
		let searchItem: any = item
		let bfound = false
		while (!bfound && searchItem.parent) {
			if (this.getItemClassName(searchItem.parent) === ancestorType.name) {
				return searchItem.parent
			} else {
				searchItem = searchItem.parent
			}
		}
	}

	async init(sm: State): Promise<MethodResult> {
		const clazz = 'NavMenuData.init'
		let result: MethodResult
		this.sm = sm
		this.items = []

		await this.sm.userParmItemsAdd(UserParmItemType.menuWidgetsPinned, [
			new UserParmItemSource(
				UserParmItemType.menuWidgetsPinned,
				(data: any) => {
					return isPlainObjectEmpty(data) ? [] : data
				},
				(data: any) => {
					return isPlainObjectEmpty(data) ? [] : data
				}
			)
		])

		if (this.sm && this.sm.user) {
			// org
			this.itemAdd(this.items, new NavMenuDataCompOrg(this, { user: this.sm.user }))

			// apps
			const rawMenu = new RawMenu(this.sm.user.resources_app)
			if (rawMenu.apps.length === 1) {
				const itemGroupSingleProgram = new NavMenuDataCompGroup(this, {
					header: 'My Apps',
					hideHr: true
				})
				rawMenu.apps[0].nodes.forEach((n) => {
					itemGroupSingleProgram.itemAdd({
						content: new NavMenuContent(NavMenuContentType.node, n),
						icon: n.icon,
						isRoot: true,
						label: new NavMenuLabel(n.label)
					})
				})
				this.itemAdd(this.items, itemGroupSingleProgram)
			} else if (rawMenu.apps.length > 1) {
				this.itemAdd(this.items, new NavMenuDataCompApps(this, { rawMenu }))
			}

			// item - group - My Tasks
			const itemGroupTasks = new NavMenuDataCompGroup(this, { header: 'My Tasks' })
			result = this.sm.user.resources_tasks.getTasksMenuTasks(this.sm)
			if (result.success) {
				let tasks: UserResourceTaskItem[] = getArray(result.data)
				tasks.forEach((task) => {
					itemGroupTasks.itemAdd({
						content: new NavMenuContent(NavMenuContentType.task, task),
						icon: task.codeIconName,
						isRoot: true,
						label: new NavMenuLabel(task.header!)
					})
				})
			}
			this.itemAdd(this.items, itemGroupTasks)

			// item - group - My Widgets
			const itemGroupWidgets = new NavMenuDataCompGroup(this, { header: 'My Widgets' })
			result = this.sm.user.resources_tasks.getTasksMenuWidgets(this.sm)
			if (result.success) {
				let tasks: UserResourceTaskItem[] = getArray(result.data)
				tasks.forEach((task) => {
					itemGroupWidgets.itemAdd({
						content: new NavMenuContent(NavMenuContentType.task, task),
						icon: task.codeIconName,
						isRoot: true,
						isHighlighted: task.isPinned,
						label: new NavMenuLabel(task.header!)
					})
				})
			}
			this.itemAddNamed(this.items, itemGroupWidgets, NavMenuNamedItemType.groupWidgets)

			// user
			this.itemAdd(this.items, new NavMenuDataCompUser(this, { user: this.sm.user }))

			// item - group - default items
			const itemDefault = new NavMenuDataCompGroup(this, {})

			// logout
			itemDefault.itemAdd(
				new NavMenuDataCompItem(this, {
					content: new NavMenuContent(NavMenuContentType.page, '/'),
					icon: 'LogOut',
					isRoot: true,
					label: new NavMenuLabel('Logout')
				})
			)
			this.itemAdd(this.items, itemDefault)
		}
		return new MethodResult()
	}

	itemAdd(items: NavMenuDataComp[], newItem: NavMenuDataComp) {
		const newItemIdx = items.push(newItem) - 1
		return items[newItemIdx]
	}

	itemAddNamed(items: NavMenuDataComp[], newItem: NavMenuDataComp, itemType: NavMenuNamedItemType) {
		const item = this.itemAdd(items, newItem)
		this.itemsNamed.add(itemType, item)
		return item
	}

	openSet(newWidth: number) {
		if (this.sm) {
			this.width = newWidth
			if (this.sm.navMenuWidthValue.current !== newWidth) {
				this.sm.menuWidthToggle()
			}
			this.isOpen = this.width === this.widthOpen
		}
	}

	openToggle = () => {
		if (this.sm) {
			this.width = this.sm.menuWidthToggle()
			this.isOpen = this.width === this.widthOpen
		}
	}

	async triggerAction(
		actionClass: CodeActionClass,
		actionType: CodeActionType,
		dataAction: DataRecord,
		dataState: DataRecord
	): Promise<MethodResult> {
		dataState.navLayout = StateNavLayout.layoutApp
		if (this.sm) {
			return await this.sm.triggerAction(
				new TokenAppStateTriggerAction({
					codeAction: CodeAction.init(actionClass, actionType),
					codeConfirmType: TokenAppUserActionConfirmType.statusChanged,
					data: dataAction,
					stateParms: new StateParms(dataState)
				})
			)
		}
		return new MethodResult({
			error: {
				file: FILENAME,
				function: 'triggerAction',
				msg: 'State manager (sm) is not defined.'
			}
		})
	}
}

export class NavMenuContent {
	codeType: NavMenuContentType
	value: any
	constructor(codeType: string, value: any) {
		const clazz = 'NavMenuContent'
		this.codeType = memberOfEnum(
			codeType,
			clazz,
			'codeType',
			'NavMenuDataCompItemType',
			NavMenuContentType
		)
		this.value = value
	}
}
export enum NavMenuContentType {
	dataObjDrawer = 'dataObjDrawer',
	functionAsync = 'functionAsync',
	functionNormal = 'functionNormal',
	info = 'info',
	page = 'page',
	node = 'node',
	nodeFree = 'nodeFree',
	nodeHeader = 'nodeHeader',
	nodeModal = 'nodeModal',
	task = 'task'
}

export class NavMenuDataComp {
	content?: NavMenuContent
	id: number
	name?: NavMenuNamedItemType
	navMenu: NavMenuData
	parent?: NavMenuDataComp
	constructor(navMenu: NavMenuData, obj: any) {
		const clazz = 'NavMenuDataComp'
		obj = valueOrDefault(obj, {})
		this.content = obj.content
		this.id = navMenu.getId()
		this.name = memberOfEnumIfExists(
			obj.name,
			'name',
			clazz,
			'NavMenuItemType',
			NavMenuNamedItemType
		)
		this.navMenu = navMenu
		this.parent = obj.parent
	}
}

export class NavMenuDataCompApps extends NavMenuDataComp {
	apps: NavMenuDataCompAppsItem[] = []
	constructor(navMenu: NavMenuData, obj: any) {
		super(navMenu, obj)
		const clazz = 'NavMenuDataCompApps'
		obj = valueOrDefault(obj, {})
		const rawMenu: RawMenu = required(obj.rawMenu, clazz, 'rawMenu')
		rawMenu.apps.forEach((a) => {
			this.apps.push(new NavMenuDataCompAppsItem(navMenu, { ...a, parent: this }))
		})
	}
}

export class NavMenuDataCompAppsItem extends NavMenuDataComp {
	group: NavMenuDataCompGroup
	constructor(navMenu: NavMenuData, obj: any) {
		super(navMenu, obj)
		const clazz = 'NavMenuDataCompAppsItem'
		obj = valueOrDefault(obj, {})
		this.group = new NavMenuDataCompGroup(navMenu, {
			...obj,
			header: '',
			hideHr: true,
			parent: this
		})

		// header
		const header = this.group.itemAdd({
			...obj,
			content: new NavMenuContent(NavMenuContentType.nodeHeader, obj.header),
			hasChildren: true,
			icon: obj.header.icon,
			isRoot: true,
			parent: this,
			label: new NavMenuLabel(obj.header.label),
			indent: 0
		})

		// children
		obj.nodes.forEach((n: any) => {
			this.group.itemAdd({
				...obj,
				content: new NavMenuContent(NavMenuContentType.node, n),
				parent: header,
				label: new NavMenuLabel(n.label),
				indent: 1
			})
		})
	}
}

export class NavMenuDataCompGroup extends NavMenuDataComp {
	header?: string
	hideHr: boolean
	items: NavMenuDataCompItem[] = []
	constructor(navMenu: NavMenuData, obj: any) {
		super(navMenu, obj)
		const clazz = 'NavMenuDataCompGroup'
		obj = valueOrDefault(obj, {})
		this.header = obj.header
		this.hideHr = booleanOrDefault(obj.hideHr, false)
	}
	itemAdd(obj: any) {
		return this.navMenu.itemAdd(
			this.items,
			new NavMenuDataCompItem(this.navMenu, {
				...obj,
				parent: obj.parent || this
			})
		)
	}
	itemFindContent(itemName: string): NavMenuDataCompItem | undefined {
		return this.items.find((i) => {
			return i.content?.value?.name === itemName
		})
	}
}

export class NavMenuDataCompItem extends NavMenuDataComp {
	hasChildren: boolean
	icon?: string
	indent: number
	isHighlighted: boolean = $state(false)
	isHidden: boolean
	isOpen: boolean = $state(false)
	isRoot: boolean
	label: NavMenuLabel
	constructor(navMenu: NavMenuData, obj: any) {
		super(navMenu, obj)
		const clazz = 'NavMenuDataCompItem'
		obj = valueOrDefault(obj, {})
		this.hasChildren = booleanOrDefault(obj.hasChildren, false)
		this.icon = obj.icon
		this.indent = valueOrDefault(obj.indent, 0)
		this.isHidden = booleanOrDefault(obj.isHidden, false)
		this.isHighlighted = booleanOrDefault(obj.isHighlighted, false)
		this.isOpen = booleanOrDefault(obj.isOpen, false)
		this.isRoot = booleanOrDefault(obj.isRoot, false)
		this.label = required(obj.label, clazz, 'label')
	}
	click = async (): Promise<MethodResult> => {
		if (this.hasChildren) {
			if (this.navMenu.isOpen) {
				this.isOpen = !this.isOpen
			} else {
				if (!this.isOpen) this.isOpen = !this.isOpen
				this.navMenu.openToggle()
			}
		} else {
			return await this.navMenu.activateLink(this)
		}
		return new MethodResult()
	}
	toggleHighlighted() {
		this.isHighlighted = !this.isHighlighted
	}
}

export class NavMenuDataCompOrg extends NavMenuDataComp {
	user: User
	constructor(navMenu: NavMenuData, obj: any) {
		super(navMenu, obj)
		const clazz = 'NavMenuDataCompOrg'
		obj = valueOrDefault(obj, {})
		this.user = required(obj.user, clazz, 'user')
	}
}
export class NavMenuDataCompUser extends NavMenuDataComp {
	info: NavMenuInfo[] = []
	items: NavMenuDataCompGroup
	constructor(navMenu: NavMenuData, obj: any) {
		super(navMenu, obj)
		const clazz = 'NavMenuDataCompUser'
		obj = valueOrDefault(obj, {})

		// group - items
		this.items = new NavMenuDataCompGroup(navMenu, { hideHr: true })

		this.itemAddNamed(
			{
				content: new NavMenuContent(
					NavMenuContentType.nodeFree,
					new TokenApiId('node_obj_task_sys_auth_my_account')
				),
				icon: 'settings2',
				isHidden: true,
				isRoot: true,
				label: new NavMenuLabel('My Account')
			},
			NavMenuNamedItemType.itemMyAccount
		)

		this.itemAdd({
			content: new NavMenuContent(
				NavMenuContentType.nodeFree,
				new TokenApiId('node_obj_auth_user_pref_list')
			),
			icon: 'settings2',
			isRoot: true,
			label: new NavMenuLabel('My Preferences')
		})

		// global - SysAdmin - features
		if (
			this.navMenu.sm &&
			this.navMenu.sm.user &&
			this.navMenu.sm.isDevMode &&
			['7347093451'].includes(this.navMenu.sm.user.name)
		) {
			const user = this.navMenu.sm.user
			// this.itemAdd({
			// 	content: new NavMenuContent(NavMenuContentType.functionAsync, this.adminDevTest),
			// 	icon: 'Database',
			// 	isRoot: true,
			// 	label: new NavMenuLabel('Dev - Test - Eval Expr')
			// })
			// this.itemAdd({
			// 	content: new NavMenuContent(
			// 		NavMenuContentType.nodeModal,
			// 		new TokenApiId('node_obj_app_crm_suggestion_detail_modal', TokenApiQueryType.preset)
			// 	),
			// 	icon: 'inbox',
			// 	isRoot: true,
			// 	label: new NavMenuLabel('Dev - Test - Suggestion')
			// })

			this.itemAdd({
				content: new NavMenuContent(
					NavMenuContentType.nodeModal,
					new TokenApiId('node_obj_app_api_list', TokenApiQueryType.retrieve)
				),
				icon: 'inbox',
				isRoot: true,
				label: new NavMenuLabel('Dev - API')
			})

			this.itemAdd({
				content: new NavMenuContent(NavMenuContentType.functionAsync, this.adminDbReset),
				icon: 'RotateCcw',
				isRoot: true,
				label: new NavMenuLabel('Admin - DB Reset')
			})

			this.info.push(new NavMenuInfo('dbBranch', user.dbBranch))
			this.info.push(new NavMenuInfo('System', user.system.name))
			this.info.push(new NavMenuInfo('Organization', user.system.orgName))
		}
	}
	itemAdd(obj: any) {
		return this.items.itemAdd(obj)
	}

	itemAddNamed(obj: any, itemType: NavMenuNamedItemType) {
		const newItem = this.itemAdd(obj)
		this.navMenu.itemsNamed.add(itemType, newItem)
		return newItem
	}

	async adminDbReset(navMenu: NavMenuData): Promise<MethodResult> {
		await apiFetchFunction(ApiFunction.dbGelInit)
		goto('/auth/login')
		return new MethodResult()
	}

	async adminDevTest(navMenu: NavMenuData): Promise<MethodResult> {
		if (navMenu.sm) {
			let queryData = new TokenApiQueryData({
				record: navMenu.sm.user,
				system: navMenu.sm.user,
				user: navMenu.sm.user
			})
			queryData.dataTab.parms.valueSet(ParmsValuesType.itemsParmValue, 'myParmValue')
			queryData.dataTab.parms.valueSet(
				ParmsValuesType.systemIdQuerySource,
				navMenu.sm.user?.systemIdCurrent
			)
			queryData.dataTab.parms.valueSet(ParmsValuesType.itemsParmValueList, [])

			let result: MethodResult = await evalExpr({
				evalExprContext: 'navMenuTest',
				exprRaw: `<attrsAccess,sys_core::SysObjAttr,allow,[app_sys_reporting;atutaa_moed_compliance_officer;task_moed_part_compliance_review]>.id`,
				// exprRaw: `(SELECT sys_core::SysObjAttr FILTER .id IN <attrsAction,[oaa_sys_msg_send_object.object; oaa_sys_msg_send_user.user]>)`,
				// exprRaw: `(SELECT sys_user::SysUser FILTER .id = <function,fSysRandom10>)`,
				// exprRaw: `(SELECT sys_user::SysUser FILTER .name = <literal,str,7347093451>)`,
				// exprRaw: `(SELECT sys_user::SysUser FILTER .name = <parms,str,itemsParmValue>)`,
				// exprRaw: `(SELECT sys_user::SysUser FILTER .id = <record,uuid,id>)`,
				// exprRaw: `(SELECT sys_user::SysUser FILTER .id = <system,uuid,id>)`,
				// exprRaw: `(SELECT sys_user::SysUser FILTER .id = <user,uuid,id>)`,
				// exprRaw: `(SELECT sys_core::SysObjAttr FILTER <${EvalExprCustomComposite.evalCustomCompositeObjAttrMulti}>)`,
				queryData
			})
			console.log('adminDevTest.evalExpr.result:', result)
			return result
		} else {
			return new MethodResult({
				error: {
					file: FILENAME,
					function: 'adminDevTest',
					msg: 'State manager (sm) is not defined.'
				}
			})
		}
	}
}

export class NavMenuInfo {
	label: string
	value: string
	constructor(label: string, value: string) {
		this.label = label
		this.value = value
	}
}

class NavMenuNamedItems {
	items: NavMenuNamedItem[] = []
	add(itemType: NavMenuNamedItemType, itemNew: NavMenuDataComp) {
		let itemOld = this.find(itemType)
		if (!itemOld) this.items.push(new NavMenuNamedItem(itemType, itemNew))
	}
	find(itemType: NavMenuNamedItemType): NavMenuDataComp | undefined {
		return this.items.find((i) => i.itemType === itemType)?.item
	}
}

class NavMenuNamedItem {
	item: NavMenuDataComp
	itemType: NavMenuNamedItemType
	constructor(itemType: NavMenuNamedItemType, item: NavMenuDataComp) {
		this.item = item
		this.itemType = itemType
	}
}

export enum NavMenuNamedItemType {
	groupWidgets = 'groupWidgets',
	itemMyAccount = 'itemMyAccount'
}

export class NavMenuLabel {
	text: string
	tooltip?: string
	constructor(text: string, tooltip?: string) {
		this.text = text
		this.tooltip = tooltip
	}
}

export class NavMenuSize {
	isOpen: boolean = false
	width: number = 0
	toggle() {
		this.isOpen = !this.isOpen
		this.width = this.isOpen ? 250 : 70
	}
}
