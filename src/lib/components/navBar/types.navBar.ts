import {
	booleanOrDefault,
	memberOfEnum,
	Node,
	RawMenu,
	required,
	User,
	UserResourceTask,
	valueOrDefault
} from '$utils/types'
import { State, StatePacket, StatePacketAction } from '$comps/app/types.appState'
import { TokenAppDoActionConfirmType, TokenAppNode } from '$utils/types.token'
import { adminDbReset } from '$utils/utils.sys'
import { error } from '@sveltejs/kit'

const FILENAME = 'src/lib/components/navBar/types.navBar.ts'

export class NavBarData {
	fadeIn = {
		delay: 300,
		duration: 200
	}
	fadeOut = {
		delay: 0,
		duration: 200
	}
	fUpdateNav: Function = (isItemActivate: boolean) => {}
	iconColor = '#daa520'
	idIndex = -1
	isOpen = true
	items: NavBarDataComp[] = []
	state: State
	width: any
	widthClosed = 70
	widthOpen = 250
	constructor(obj: any) {
		const clazz = 'NavBarData'
		obj = valueOrDefault(obj, {})
		this.fUpdateNav = required(obj.navBarUpdate, clazz, 'fUpdateNav')
		this.state = obj.state
		this.width = this.widthOpen

		if (this.state && this.state.user) {
			// org
			this.items.push(new NavBarDataCompOrg(this, { user: this.state.user }))

			// apps
			const rawMenu = new RawMenu(this.state.user.resources_sys_app)
			if (rawMenu.apps.length === 1) {
				const itemGroupSingleProgram = new NavBarDataCompGroup(this, {
					header: 'My Apps',
					hideHr: true
				})
				rawMenu.apps[0].nodes.forEach((n) => {
					itemGroupSingleProgram.addItem({
						content: new NavBarContent('node', n),
						icon: n.icon,
						isRoot: true,
						label: new NavBarLabel(n.label)
					})
				})
				this.items.push(itemGroupSingleProgram)
			} else {
				this.items.push(new NavBarDataCompApps(this, { rawMenu }))
			}

			// item - group - tasks - default
			const itemGroupTasks = new NavBarDataCompGroup(this, { header: 'My Tasks' })
			this.state.user.resources_sys_task_default
				.filter((r) => !this.state.user?.isMobileOnly && !r.codeStatusObjName)
				.forEach((r) => {
					itemGroupTasks.addItem({
						content: new NavBarContent('task', r),
						icon: r.codeIconName,
						label: new NavBarLabel(r.header!)
					})
				})
			this.items.push(itemGroupTasks)

			// user
			this.items.push(new NavBarDataCompUser(this, { user: this.state.user }))

			// item - group - default items
			const itemDefault = new NavBarDataCompGroup(this, {})
			// logout
			itemDefault.addItem(
				new NavBarDataCompItem(this, {
					content: new NavBarContent('page', '/'),
					icon: 'LogOut',
					isRoot: true,
					label: new NavBarLabel('Logout')
				})
			)
			this.items.push(itemDefault)
			// console.log('NavBarData.constructor', this)
		}
	}

	async activateLink(item: NavBarDataCompItem) {
		const content = item.content
		let node
		if (content) {
			switch (content.codeType) {
				case NavBarContentType.functionAsync:
					await content.value(this)
					break

				case NavBarContentType.page:
					this.state.update({
						page: content.value,
						packet: new StatePacket({
							action: StatePacketAction.navCrumbs,
							confirmType: TokenAppDoActionConfirmType.objectChanged
						})
					})
					break
				case NavBarContentType.node:
					node = content.value as Node
					this.state.update({
						page: '/home',
						// parmsState: { programId: this.getProgramId(node) },
						nodeType: node.type,
						packet: new StatePacket({
							action: StatePacketAction.openNode,
							confirmType: TokenAppDoActionConfirmType.objectChanged,
							token: new TokenAppNode({ node })
						})
					})
					break
				case NavBarContentType.task:
					const task: UserResourceTask = content.value as UserResourceTask
					this.state.update({
						nodeType: '', // todo - 241125 - when this is removed the packet doesn't get to RootLayoutApp
						packet: new StatePacket({
							action: StatePacketAction.openNode,
							confirmType: TokenAppDoActionConfirmType.objectChanged,
							token: task.getTokenNode(this.state.user)
						})
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

	getItem(itemId: number): NavBarDataComp | undefined {
		for (let i of this.items) {
			const item = i.getItem(itemId)
			if (item) return item
		}
		return undefined
	}

	getItemClassName(item: any) {
		return Object.getPrototypeOf(item).constructor.name
	}

	getAncestor(item: NavBarDataCompItem, ancestorType: any) {
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
		this.fUpdateNav(isItemActivate)
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

export class NavBarContent {
	codeType: NavBarContentType
	value: any
	constructor(codeType: string, value: any) {
		const clazz = 'NavBarContent'
		this.codeType = memberOfEnum(
			codeType,
			clazz,
			'codeType',
			'NavBarDataCompItemType',
			NavBarContentType
		)
		this.value = value
	}
}
export enum NavBarContentType {
	functionAsync = 'functionAsync',
	functionNormal = 'functionNormal',
	info = 'info',
	page = 'page',
	node = 'node',
	nodeHeader = 'nodeHeader',
	task = 'task'
}

export class NavBarDataComp {
	content?: NavBarContent
	id: number
	navBar: NavBarData
	parent?: NavBarDataComp
	constructor(navBar: NavBarData, obj: any) {
		obj = valueOrDefault(obj, {})
		this.content = obj.content
		this.id = navBar.getId()
		this.navBar = navBar
		this.parent = obj.parent
	}
	getItem(itemId: number): NavBarDataComp | undefined {
		return itemId === this.id ? this : undefined
	}
}

export class NavBarDataCompApps extends NavBarDataComp {
	apps: NavBarDataCompAppsItem[] = []
	constructor(navBar: NavBarData, obj: any) {
		super(navBar, obj)
		const clazz = 'NavBarDataCompApps'
		obj = valueOrDefault(obj, {})
		const rawMenu: RawMenu = required(obj.rawMenu, clazz, 'rawMenu')
		rawMenu.apps.forEach((a) => {
			this.apps.push(new NavBarDataCompAppsItem(navBar, { ...a, parent: this }))
		})
	}
}

export class NavBarDataCompAppsItem extends NavBarDataComp {
	group: NavBarDataCompGroup
	constructor(navBar: NavBarData, obj: any) {
		super(navBar, obj)
		const clazz = 'NavBarDataCompAppsItem'
		obj = valueOrDefault(obj, {})
		this.group = new NavBarDataCompGroup(navBar, { ...obj, header: '', hideHr: true, parent: this })

		// header
		const header = this.group.addItem({
			...obj,
			content: new NavBarContent('nodeHeader', obj.header),
			hasChildren: true,
			icon: obj.header.icon,
			isRoot: true,
			parent: this,
			label: new NavBarLabel(obj.header.label),
			indent: 0
		})

		// children
		obj.nodes.forEach((n: any) =>
			this.group.addItem({
				...obj,
				content: new NavBarContent('node', n),
				parent: header,
				label: new NavBarLabel(n.label),
				indent: 1
			})
		)
	}
}

export class NavBarDataCompGroup extends NavBarDataComp {
	header?: string
	hideHr: boolean
	items: NavBarDataCompItem[] = []
	constructor(navBar: NavBarData, obj: any) {
		super(navBar, obj)
		const clazz = 'NavBarDataCompGroup'
		obj = valueOrDefault(obj, {})
		this.header = obj.header
		this.hideHr = booleanOrDefault(obj.hideHr, false)
		console.log('NavBarDataCompGroup.constructor', this)
	}
	addItem(obj: any) {
		this.items.push(
			new NavBarDataCompItem(this.navBar, {
				...obj,
				parent: obj.parent || this
			})
		)
		return this.items[this.items.length - 1]
	}
	activateLinkByLabel(labelText: string) {
		const item = this.items.find((i) => i.label.text === labelText)
		if (item) {
			this.navBar.activateLink(item)
		} else {
			error(500, {
				file: `${FILENAME}.NavBarDataCompGroup`,
				function: 'activateLink',
				message: `Item not found: ${labelText}`
			})
		}
	}
}

export class NavBarDataCompItem extends NavBarDataComp {
	hasChildren: boolean
	icon?: string
	indent: number
	isOpen: boolean
	isRoot: boolean
	label: NavBarLabel
	constructor(navBar: NavBarData, obj: any) {
		super(navBar, obj)
		const clazz = 'NavBarDataCompItem'
		obj = valueOrDefault(obj, {})
		this.hasChildren = booleanOrDefault(obj.hasChildren, false)
		this.icon = obj.icon
		this.indent = valueOrDefault(obj.indent, 0)
		this.isOpen = booleanOrDefault(obj.isOpen, false)
		this.isRoot = booleanOrDefault(obj.isRoot, false)
		this.label = required(obj.label, clazz, 'label')
	}
	async click() {
		if (this.hasChildren) {
			if (this.navBar.isOpen) {
				this.isOpen = !this.isOpen
				this.navBar.fUpdateNav()
			} else {
				if (!this.isOpen) this.isOpen = !this.isOpen
				this.navBar.toggleOpen(false)
			}
		} else {
			await this.navBar.activateLink(this)
		}
	}
}

export class NavBarDataCompOrg extends NavBarDataComp {
	user: User
	constructor(navBar: NavBarData, obj: any) {
		super(navBar, obj)
		const clazz = 'NavBarDataCompOrg'
		obj = valueOrDefault(obj, {})
		this.user = required(obj.user, clazz, 'user')
	}
}
export class NavBarDataCompUser extends NavBarDataComp {
	info: NavBarInfo[] = []
	items: NavBarDataCompGroup
	user: User
	constructor(navBar: NavBarData, obj: any) {
		super(navBar, obj)
		const clazz = 'NavBarDataCompUser'
		obj = valueOrDefault(obj, {})
		this.user = required(obj.user, clazz, 'user')

		// info
		if (this.user.orgIds.length > 1) {
			this.info.push(new NavBarInfo('Default Organization', this.user.org.name))
		}
		if (this.user.systemIds.length > 1) {
			this.info.push(new NavBarInfo('Default System', this.user.system.name))
		}

		// group - items
		this.items = new NavBarDataCompGroup(navBar, { hideHr: true })
		this.user.resources_sys_task_setting.forEach((r) => {
			this.addItem({
				content: new NavBarContent('task', r),
				icon: r.codeIconName,
				isRoot: true,
				label: new NavBarLabel(r.header!)
			})
		})
		this.addItem({
			content: new NavBarContent('functionAsync', this.myPreferences),
			icon: 'Settings2',
			isRoot: true,
			label: new NavBarLabel('My Preferences')
		})
		if (['user_sys', '2487985578'].includes(this.user.userName)) {
			this.addItem({
				content: new NavBarContent('functionAsync', this.adminResetDb),
				icon: 'RotateCcw',
				isRoot: true,
				label: new NavBarLabel('Admin - Reset DB')
			})
		}
	}
	addItem(obj: any) {
		this.items.addItem(obj)
	}
	async adminResetDb(navBar: NavBarData) {
		await adminDbReset(navBar.state)
		await navBar.state.resetUser(true)
	}

	async myPreferences(navBar: NavBarData) {
		await navBar.state.openModalDataObj('data_obj_auth_user_pref_type', async () => {
			await navBar.state.resetUser(true)
		})
	}
}

export class NavBarInfo {
	label: string
	value: string
	constructor(label: string, value: string) {
		this.label = label
		this.value = value
	}
}

export class NavBarLabel {
	text: string
	tooltip?: string
	constructor(text: string, tooltip?: string) {
		this.text = text
		this.tooltip = tooltip
	}
}
