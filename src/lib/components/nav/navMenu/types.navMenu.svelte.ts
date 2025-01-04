import {
	booleanOrDefault,
	memberOfEnum,
	Node,
	RawMenu,
	required,
	User,
	UserResourceTask,
	UserResourceTaskRenderType,
	valueOrDefault
} from '$utils/types'
import {
	State,
	StatePacket,
	StatePacketAction,
	StateTarget
} from '$comps/app/types.appState.svelte'
import { TokenAppDoActionConfirmType, TokenAppNode } from '$utils/types.token'
import { adminDbReset } from '$utils/utils.sys.svelte'
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
	items: NavMenuDataComp[] = []
	sm: State
	width: any = $state()
	widthClosed = 70
	widthOpen = 250
	constructor(obj: any) {
		const clazz = 'NavMenuData'
		obj = valueOrDefault(obj, {})
		this.sm = obj.sm
		this.width = this.widthOpen

		if (this.sm && this.sm.user) {
			// org
			this.items.push(new NavMenuDataCompOrg(this, { user: this.sm.user }))

			// apps
			const rawMenu = new RawMenu(this.sm.user.resources_sys_app)
			if (rawMenu.apps.length === 1) {
				const itemGroupSingleProgram = new NavMenuDataCompGroup(this, {
					header: 'My Apps',
					hideHr: true
				})
				rawMenu.apps[0].nodes.forEach((n) => {
					itemGroupSingleProgram.addItem({
						content: new NavMenuContent(NavMenuContentType.node, n),
						icon: n.icon,
						isRoot: true,
						label: new NavMenuLabel(n.label)
					})
				})
				this.items.push(itemGroupSingleProgram)
			} else if (rawMenu.apps.length > 1) {
				this.items.push(new NavMenuDataCompApps(this, { rawMenu }))
			}

			// item - group - tasks - default
			const itemGroupTasks = new NavMenuDataCompGroup(this, { header: 'My Tasks' })
			this.sm.user.resources_sys_task_default
				.filter(
					(r) =>
						r.isShow &&
						!this.sm.user?.isMobileOnly &&
						!r.codeStatusObjName &&
						r.codeRenderType !== UserResourceTaskRenderType.page
				)
				.forEach((r) => {
					itemGroupTasks.addItem({
						content: new NavMenuContent(NavMenuContentType.task, r),
						icon: r.codeIconName,
						label: new NavMenuLabel(r.header!)
					})
				})
			this.items.push(itemGroupTasks)

			// user
			this.items.push(new NavMenuDataCompUser(this, { user: this.sm.user }))

			// item - group - default items
			const itemDefault = new NavMenuDataCompGroup(this, {})
			// logout
			itemDefault.addItem(
				new NavMenuDataCompItem(this, {
					content: new NavMenuContent(NavMenuContentType.page, '/'),
					icon: 'LogOut',
					isRoot: true,
					label: new NavMenuLabel('Logout')
				})
			)
			this.items.push(itemDefault)
		}
	}

	async activateLink(item: NavMenuDataCompItem) {
		const content = item.content
		let node
		if (content) {
			switch (content.codeType) {
				case NavMenuContentType.functionAsync:
					await content.value(this)
					break

				case NavMenuContentType.page:
					this.sm.change({
						confirmType: TokenAppDoActionConfirmType.statusChanged,
						page: content.value,
						target: StateTarget.page
					})
					break
				case NavMenuContentType.node:
					node = content.value as Node
					this.sm.change({
						confirmType: TokenAppDoActionConfirmType.statusChanged,
						// parmsState: { programId: this.getProgramId(node) },
						packet: new StatePacket({
							action: StatePacketAction.openNode,
							token: new TokenAppNode({ node })
						}),
						target: StateTarget.feature
					})
					break
				case NavMenuContentType.task:
					const task: UserResourceTask = content.value as UserResourceTask
					this.sm.change({
						confirmType: TokenAppDoActionConfirmType.statusChanged,
						packet: new StatePacket({
							action: StatePacketAction.openNode,
							token: task.getTokenNode(this.sm.user)
						}),
						target: StateTarget.feature
					})
					break
				default:
					error(500, {
						file: FILENAME,
						function: 'activateLink',
						message: `No case defined for item type: ${content.codeType}`
					})
			}
			if (this.isOpen) this.toggleOpen(true)
		}
	}

	getId() {
		this.idIndex++
		return this.idIndex
	}

	getItem(itemId: number): NavMenuDataComp | undefined {
		for (let i of this.items) {
			const item = i.getItem(itemId)
			if (item) return item
		}
		return undefined
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

	toggleOpen = (isItemActivate: boolean) => {
		this.isOpen = !this.isOpen
		this.width = this.isOpen ? this.widthOpen : this.widthClosed
	}
}

// getParentNode(nodeNav: NodeNav) {
// 	return this.listTree.find((n) => n.node.id === nodeNav.parentId)
// }
// getProgramId(nodeNav: NodeNav | undefined): string | undefined {
// 	if (!nodeNav) return undefined
// 	if (nodeNav.node.type === NodeType.program) return nodeNav.node.id
// 	return this.getProgramId(this.getParentNode(nodeNav))
// }

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
	functionAsync = 'functionAsync',
	functionNormal = 'functionNormal',
	info = 'info',
	page = 'page',
	node = 'node',
	nodeHeader = 'nodeHeader',
	task = 'task'
}

export class NavMenuDataComp {
	content?: NavMenuContent
	id: number
	navMenu: NavMenuData
	parent?: NavMenuDataComp
	constructor(navMenu: NavMenuData, obj: any) {
		obj = valueOrDefault(obj, {})
		this.content = obj.content
		this.id = navMenu.getId()
		this.navMenu = navMenu
		this.parent = obj.parent
	}
	getItem(itemId: number): NavMenuDataComp | undefined {
		return itemId === this.id ? this : undefined
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
		const header = this.group.addItem({
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
		obj.nodes.forEach((n: any) =>
			this.group.addItem({
				...obj,
				content: new NavMenuContent(NavMenuContentType.node, n),
				parent: header,
				label: new NavMenuLabel(n.label),
				indent: 1
			})
		)
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
	addItem(obj: any) {
		this.items.push(
			new NavMenuDataCompItem(this.navMenu, {
				...obj,
				parent: obj.parent || this
			})
		)
		return this.items[this.items.length - 1]
	}
	activateLinkByLabel(labelText: string) {
		const item = this.items.find((i) => i.label.text === labelText)
		if (item) {
			this.navMenu.activateLink(item)
		} else {
			error(500, {
				file: `${FILENAME}.NavMenuDataCompGroup`,
				function: 'activateLink',
				message: `Item not found: ${labelText}`
			})
		}
	}
}

export class NavMenuDataCompItem extends NavMenuDataComp {
	hasChildren: boolean
	icon?: string
	indent: number
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
		this.isOpen = booleanOrDefault(obj.isOpen, false)
		this.isRoot = booleanOrDefault(obj.isRoot, false)
		this.label = required(obj.label, clazz, 'label')
	}
	click = async () => {
		if (this.hasChildren) {
			if (this.navMenu.isOpen) {
				this.isOpen = !this.isOpen
			} else {
				if (!this.isOpen) this.isOpen = !this.isOpen
				this.navMenu.toggleOpen(false)
			}
		} else {
			await this.navMenu.activateLink(this)
		}
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
	user: User
	constructor(navMenu: NavMenuData, obj: any) {
		super(navMenu, obj)
		const clazz = 'NavMenuDataCompUser'
		obj = valueOrDefault(obj, {})
		this.user = required(obj.user, clazz, 'user')

		// info
		if (['user_sys', '2487985578'].includes(this.user.userName)) {
			this.info.push(new NavMenuInfo('dbBranch', this.user.dbBranch))
			this.info.push(new NavMenuInfo('Default Organization', this.user.org.name))
			this.info.push(new NavMenuInfo('Default System', this.user.system.name))
		}

		// group - items
		this.items = new NavMenuDataCompGroup(navMenu, { hideHr: true })
		this.user.resources_sys_task_setting.forEach((r) => {
			this.addItem({
				content: new NavMenuContent(NavMenuContentType.task, r),
				icon: r.codeIconName,
				isRoot: true,
				label: new NavMenuLabel(r.header!)
			})
		})
		this.addItem({
			content: new NavMenuContent(NavMenuContentType.functionAsync, this.myPreferences),
			icon: 'Settings2',
			isRoot: true,
			label: new NavMenuLabel('My Preferences')
		})
		if (['user_sys', '2487985578'].includes(this.user.userName)) {
			this.addItem({
				content: new NavMenuContent(NavMenuContentType.functionAsync, this.adminResetDb),
				icon: 'RotateCcw',
				isRoot: true,
				label: new NavMenuLabel('Admin - Reset DB')
			})
		}
	}
	addItem(obj: any) {
		this.items.addItem(obj)
	}
	async adminResetDb(navMenu: NavMenuData) {
		await adminDbReset(navMenu.sm)
		await navMenu.sm.resetUser(true)
	}

	async myPreferences(navMenu: NavMenuData) {
		await navMenu.sm.openModalDataObj('data_obj_auth_user_pref_type', async () => {
			await navMenu.sm.resetUser(true)
		})
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

export class NavMenuLabel {
	text: string
	tooltip?: string
	constructor(text: string, tooltip?: string) {
		this.text = text
		this.tooltip = tooltip
	}
}
