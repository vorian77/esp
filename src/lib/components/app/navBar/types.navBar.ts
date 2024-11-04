import {
	booleanOrDefault,
	getArray,
	memberOfEnum,
	NodeType,
	RawMenu,
	strRequired,
	User,
	valueOrDefault
} from '$utils/types'

export class NavBarData {
	items: NavBarDataItem[] = []
	title: string = 'home'
	constructor() {}
	addApps(rawApps: any) {
		const rawMenu = new RawMenu(rawApps)
		rawMenu.apps.forEach((a) => {
			let app = new NavBarDataItem({
				codeIcon: a.header.icon,
				codeType: NodeType.program,
				label: a.header.label,
				name: a.header.name
			})
			app.addBranch(a.nodes)
			this.items.push(app)
			// console.log('NavBarData.addApps', { app })
		})
	}
	addPage(name: string, label: string, codeIcon: string) {
		this.items.push(new NavBarDataItem({ codeIcon, codeType: NodeType.page, name, label }))
	}
}

export class NavBarDataItem {
	active: boolean = false
	children: NavBarDataItem[] = []
	codeIcon: string
	codeType: NodeType
	indent: number = 0
	isChild: boolean = false
	label: string
	name: string
	constructor(obj: any) {
		const clazz = 'NavBarDataItem'
		obj = valueOrDefault(obj, {})
		this.codeIcon = strRequired(obj.codeIcon, clazz, 'codeIcon')
		this.codeType = memberOfEnum(obj.codeType, clazz, 'codeType', 'NodeType', NodeType)
		this.indent = valueOrDefault(obj.indent, 0)
		this.isChild = booleanOrDefault(obj.isChild, false)
		this.label = strRequired(obj.label, clazz, 'label')
		this.name = strRequired(obj.name, clazz, 'name')
	}
	addBranch(nodes: any) {
		getArray(nodes).forEach((n: any) => {
			this.children.push(
				new NavBarDataItem({
					codeIcon: n.icon,
					codeType: NodeType.program_object,
					indent: 1,
					isChild: true,
					label: n.label,
					name: n.name
				})
			)
		})
	}
}
