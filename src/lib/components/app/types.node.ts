import {
	booleanOrFalse,
	getArray,
	memberOfEnum,
	nbrRequired,
	strRequired,
	valueOrDefault
} from '$utils/utils'
import { error } from '@sveltejs/kit'

const FILENAME = '/lib/components/nav/types.node.ts'

const DEFAULT_ICON = 'AppWindow'

export class NodeHeader {
	icon: string
	id: string
	label: string
	name: string
	orderDefine: number
	type: NodeType
	constructor(obj: any) {
		const clazz = 'NodeHeader'
		obj = valueOrDefault(obj, {})
		this.icon = valueOrDefault(obj._codeIcon, DEFAULT_ICON)
		this.id = strRequired(obj.id, clazz, 'id')
		this.label = strRequired(obj.header || obj.label, clazz, 'label')
		this.name = strRequired(obj.name, clazz, 'name')
		this.orderDefine = valueOrDefault(obj.orderDefine, 0)
		this.type = memberOfEnum(obj._codeNodeType, clazz, 'type', 'NodeType', NodeType)
	}
}

export class Node extends NodeHeader {
	dataObjId?: string
	dataObjIdChild?: string
	dataObjName?: string
	isAlwaysRetrieveData: boolean
	isHideRowManager: boolean
	isMobileMode: boolean
	page: string
	constructor(obj: any) {
		const clazz = 'Node'
		obj = valueOrDefault(obj, {})
		super(obj)
		this.dataObjId = obj.dataObjId
		this.dataObjIdChild = obj.dataObjIdChild
		this.dataObjName = obj.dataObjName
		this.isAlwaysRetrieveData = booleanOrFalse(obj.isAlwaysRetrieveData, 'isAlwaysRetrieveData')
		this.isHideRowManager = booleanOrFalse(obj.isHideRowManager, 'isHideRowManager')
		this.isMobileMode = booleanOrFalse(obj.isMobileMode, 'isHideRowManager')
		this.page = valueOrDefault(obj.page, '/home')
	}
}

export class NodeNav {
	idxLeaf: number
	indent: number
	isCrumb: boolean = false
	isCurrent: boolean = false
	isOpen: boolean = false
	isRetrieved: boolean = false
	node: Node
	parentId?: string
	constructor(node: Node, parentId: string | undefined, idxLeaf: number, indent: number) {
		const clazz = 'NodeNav'
		this.idxLeaf = idxLeaf
		this.indent = indent
		this.node = node
		this.parentId = parentId
	}
}

export enum NodeType {
	home = 'home',
	menu_app = 'menu_app',
	menu_header = 'menu_header',
	menu_root = 'menu_root',
	object = 'object',
	page = 'page',
	program = 'program',
	program_object = 'program_object'
}

export class RawMenu {
	apps: RawMenuApp[] = []
	constructor(apps: any) {
		const clazz = 'RawMenu'
		getArray(apps).forEach((app: any) => {
			this.addApp(app)
		})
		this.apps = this.apps.sort((a, b) => a.header.orderDefine - b.header.orderDefine)
	}
	addApp(app: any) {
		let idx = this.apps.findIndex((h) => h.header.id === app.appHeader.id)
		if (idx === -1) {
			idx = this.apps.push(new RawMenuApp(app))
		} else {
			this.apps[idx].addNodes(app.nodes)
		}
	}
}

export class RawMenuApp {
	header: NodeHeader
	nodes: Node[] = []
	constructor(obj: any) {
		const clazz = 'RawMenuApp'
		obj = valueOrDefault(obj, {})
		this.header = new NodeHeader({ ...obj.appHeader, _codeNodeType: NodeType.menu_app })
		this.addNodes(obj.nodes)
	}
	addNodes(nodes: Node[]) {
		nodes = getArray(nodes)
		nodes.forEach((n) => {
			if (!this.nodes.find((e) => e.id === n.id)) this.nodes.push(new Node(n))
		})
		this.nodes.sort((a, b) => a.orderDefine - b.orderDefine)
	}
}
