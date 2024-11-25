import {
	arrayOfClasses,
	booleanOrDefault,
	getArray,
	memberOfEnum,
	Node,
	NodeHeader,
	NodeType,
	RawMenu,
	required,
	strRequired,
	User,
	valueOrDefault
} from '$utils/types'
import {
	State,
	StateLayoutComponent,
	StatePacket,
	StatePacketAction
} from '$comps/app/types.appState'
import { TokenAppDo, TokenAppDoActionConfirmType, TokenAppNode } from '$utils/types.token'
import { goto } from '$app/navigation'
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
	fToggleOpen: Function
	fUpdateNav: Function
	iconColor = '#daa520'
	idIndex = -1
	isOpen = true
	items: NavBarDataComp[] = []
	state: State
	constructor(obj: any) {
		const clazz = 'NavBarData'
		obj = valueOrDefault(obj, {})
		this.fToggleOpen = required(obj.toggleOpen, clazz, 'fToggleOpen')
		this.fUpdateNav = required(obj.updateNav, clazz, 'fUpdateNav')
		this.state = obj.state

		if (this.state && this.state.user) {
			// org
			this.items.push(new NavBarDataCompOrg(this, { user: this.state.user }))

			// apps
			this.items.push(new NavBarDataCompApps(this, this.state.user.resources_sys_app))

			// group - tasks
			const groupTasks = new NavBarDataCompListGroup(this, {
				header: 'My Tasks'
			})
			this.items.push(groupTasks)

			// group - settings
			const groupSettings = new NavBarDataCompListGroup(this, {
				header: 'My Settings'
			})

			groupSettings.addItem({
				codeType: 'functionAsync',
				contentFunction: fMyPreferences,
				icon: 'RotateCcw',
				label: new NavBarLabel('My Preferences')
			})

			if (['user_sys', '2487985578'].includes(this.state.user.userName)) {
				groupSettings.addItem({
					codeType: 'functionAsync',
					contentFunction: fAdminResetDb,
					icon: 'Settings2',
					label: new NavBarLabel('Admin - Reset DB')
				})
			}
			this.items.push(groupSettings)

			// // list
			// const list = new NavBarDataCompList(this, {})
			// list.addItem({ codeType: 'node', icon: 'Activity', label: new NavBarLabel('Activity') })
			// list.addItem({ codeType: 'node', icon: 'Goal', label: new NavBarLabel('Goal') })
			// this.items.push(list)

			// link
			this.items.push(
				new NavBarDataCompItem(this, {
					codeType: 'page',
					contentPage: '/',
					icon: 'LogOut',
					label: new NavBarLabel('Logout')
				})
			)

			console.log('NavBarData.constructor', this)
		}
	}

	async activateLink(item: NavBarDataCompItem) {
		if (item.codeType === NavBarDataCompItemType.appHeader) {
			const apps = this.getAncestor(item, NavBarDataCompApps) as NavBarDataCompApps | undefined
			if (apps) {
				if (!this.isOpen) this.fToggleOpen()
				apps.toggleHeader(item)
				this.fUpdateNav()
			}
		} else {
			if (this.isOpen) this.fToggleOpen()
			switch (item.codeType) {
				case NavBarDataCompItemType.functionAsync:
					if (item.contentFunction) await item.contentFunction(this)
					break

				case NavBarDataCompItemType.page:
					this.state.update({
						page: item.contentPage,
						packet: new StatePacket({
							action: StatePacketAction.navCrumbs,
							confirmType: TokenAppDoActionConfirmType.objectChanged
						})
					})
					break
				case NavBarDataCompItemType.node:
					const node = required(item.contentNode, FILENAME, 'item.contentNode')
					console.log('NavBarData.activateLink', item)
					this.state.update({
						page: '/home',
						// parmsState: { programId: this.getProgramId(node) },
						nodeType: node.type,
						packet: new StatePacket({
							action: StatePacketAction.openNode,
							confirmType: TokenAppDoActionConfirmType.objectChanged,
							token: new TokenAppNode({ node })
							// callbacks: [() => dispatch('treeChanged')]
						})
					})
					break
				case NavBarDataCompItemType.task:
					console.log('NavBarData.activateLink', item)
					break
				default:
					error(500, {
						file: FILENAME,
						function: 'activateLink',
						message: `No case defined for item type: ${item.codeType}`
					})
			}
			console.log('NavBarData.activateLink', item)
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
}
const fAdminResetDb = async (navBar: NavBarData) => {
	await adminDbReset(navBar.state)
}

const fMyPreferences = async (navBar: NavBarData) => {
	await navBar.state.openModalDataObj('data_obj_auth_user_pref_type', async () => {
		await navBar.state.resetUser(true)
	})
}

// getParentNode(nodeNav: NodeNav) {
// 	return this.listTree.find((n) => n.node.id === nodeNav.parentId)
// }
// getProgramId(nodeNav: NodeNav | undefined): string | undefined {
// 	if (!nodeNav) return undefined
// 	if (nodeNav.node.type === NodeType.program) return nodeNav.node.id
// 	return this.getProgramId(this.getParentNode(nodeNav))
// }

export class NavBarLabel {
	text: string
	tooltip?: string
	constructor(text: string, tooltip?: string) {
		this.text = text
		this.tooltip = tooltip
	}
}

export class NavBarDataComp {
	contentFunction?: Function
	contentNode?: Node
	contentPage?: string
	id: number
	isActive: boolean
	isTop: boolean
	navBar: NavBarData
	parent?: NavBarDataComp
	constructor(navBar: NavBarData, obj: any) {
		obj = valueOrDefault(obj, {})
		this.contentFunction = obj.contentFunction
		this.contentNode = obj.contentNode
		this.contentPage = obj.contentPage
		this.id = navBar.getId()
		this.isActive = booleanOrDefault(obj.isActive, false)
		this.isTop = booleanOrDefault(obj.isTop, false)
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
		const rawMenu = new RawMenu(obj)
		rawMenu.apps.forEach((a) => {
			this.apps.push(new NavBarDataCompAppsItem(navBar, { ...a, parent: this }))
		})
	}
	toggleHeader(item: NavBarDataCompItem) {
		const currApp = this.apps.find((a) => item.id === a.header.id)
		if (currApp) {
			currApp.isOpen = !this.navBar.isOpen ? true : !currApp.isOpen
		}
	}
}

export class NavBarDataCompAppsItem extends NavBarDataComp {
	header: NavBarDataCompItem
	isOpen: boolean
	list: NavBarDataCompList
	constructor(navBar: NavBarData, obj: any) {
		super(navBar, obj)
		const clazz = 'NavBarDataCompAppsItem'
		obj = valueOrDefault(obj, {})
		this.header = new NavBarDataCompItem(navBar, {
			...obj,
			codeType: 'appHeader',
			contentNode: obj.header,
			icon: obj.header.icon,
			parent: this,
			label: new NavBarLabel(obj.header.label),
			indent: 0
		})
		this.isOpen = booleanOrDefault(obj.isOpen, false)
		this.list = new NavBarDataCompList(navBar, { ...obj, parent: this })
		obj.nodes.forEach((n: any) =>
			this.list.addItem({
				...obj,
				codeType: 'node',
				contentNode: n,
				parent: this.list,
				label: new NavBarLabel(n.label),
				indent: 1
			})
		)
	}
}

export class NavBarDataCompItem extends NavBarDataComp {
	codeType: NavBarDataCompItemType
	icon?: string
	indent: number
	label: NavBarLabel
	constructor(navBar: NavBarData, obj: any) {
		super(navBar, obj)
		const clazz = 'NavBarDataCompItem'
		obj = valueOrDefault(obj, {})
		this.codeType = memberOfEnum(
			obj.codeType,
			clazz,
			'codeType',
			'NavBarDataCompItemType',
			NavBarDataCompItemType
		)
		this.icon = obj.icon
		this.indent = valueOrDefault(obj.indent, 0)
		this.label = required(obj.label, clazz, 'label')
	}
}
export enum NavBarDataCompItemType {
	appHeader = 'appHeader',
	functionAsync = 'functionAsync',
	functionNormal = 'functionNormal',
	page = 'page',
	node = 'node',
	task = 'task'
}

export class NavBarDataCompList extends NavBarDataComp {
	items: NavBarDataCompItem[] = []
	constructor(navBar: NavBarData, obj: any) {
		super(navBar, obj)
		const clazz = 'NavBarDataCompList'
		obj = valueOrDefault(obj, {})
	}
	addItem(obj: any) {
		this.items.push(
			new NavBarDataCompItem(this.navBar, {
				...obj,
				parent: obj.parent || this
			})
		)
	}
}

export class NavBarDataCompListGroup extends NavBarDataCompList {
	header: string
	constructor(navBar: NavBarData, obj: any) {
		super(navBar, obj)
		const clazz = 'NavBarDataCompListGroup'
		obj = valueOrDefault(obj, {})
		this.header = strRequired(obj.header, clazz, 'header')
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

// unused
export class NavBarDataCompLink extends NavBarDataComp {
	codeObjType: 'dataObject' | 'nodeObject' | 'wizard' | 'page'
	name: string
	constructor(navBar: NavBarData, obj: any) {
		super(navBar, obj)
		const clazz = 'NavBarDataCompLink'
		obj = valueOrDefault(obj, {})
		this.codeObjType = required(obj.codeObjType, clazz, 'codeObjType')
		this.name = strRequired(obj.name, clazz, 'name')
	}
}
