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

const DEFAULT_ICON = 'application'

export type DbNode = {
	_codeIcon?: string
	_codeNodeType: string
	dataObjId?: string
	dataObjName?: string
	header: string
	id: string
	isHideRowManager: boolean
	isMobileMode?: boolean
	isRetrievePreset?: boolean
	name: string
	nodeObjName?: string
	orderDefine: number
	page?: string
}

export class RawNode {
	dataObjId?: string
	dataObjName?: string
	header: string
	icon: string
	id: string
	isHideRowManager: boolean
	isMobileMode: boolean
	isRetrievePreset: boolean
	name: string
	nodeObjName?: string
	page: string
	type: string
	constructor(dbNode: DbNode) {
		const clazz = 'RawNode'
		this.dataObjId = dbNode.dataObjId
		this.dataObjName = dbNode.dataObjName
		this.header = dbNode.header
		this.icon = valueOrDefault(dbNode._codeIcon, DEFAULT_ICON)
		this.id = dbNode.id
		this.isHideRowManager = booleanOrFalse(dbNode.isHideRowManager, 'isHideRowManager')
		this.isMobileMode = booleanOrFalse(dbNode.isMobileMode, 'isMobileMode')
		this.isRetrievePreset = booleanOrFalse(dbNode.isRetrievePreset, 'isRetrievePreset')
		this.name = dbNode.name
		this.nodeObjName = dbNode.nodeObjName
		this.page = valueOrDefault(dbNode.page, '/home')
		this.type = dbNode._codeNodeType
	}
}

export class NodeHeader {
	icon: string
	id: string
	label: string
	name: string
	orderDefine: number
	type: NodeType
	constructor(obj: any) {
		const clazz = 'NodeHeader'
		if (!(obj.header || obj.label)) {
			console.log('obj', obj)
		}
		if (!obj.name) {
			console.log('obj', obj)
		}
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
	isHideRowManager: boolean
	isMobileMode: boolean
	isRetrievePreset: boolean
	nodeObjName?: string
	page: string
	constructor(obj: any) {
		const clazz = 'Node'
		obj = valueOrDefault(obj, {})
		super(obj)
		this.dataObjId = obj.dataObjId
		this.dataObjIdChild = obj.dataObjIdChild
		this.dataObjName = obj.dataObjName
		this.isHideRowManager = booleanOrFalse(obj.isHideRowManager, 'isHideRowManager')
		this.isMobileMode = booleanOrFalse(obj.isMobileMode, 'isHideRowManager')
		this.isRetrievePreset = booleanOrFalse(obj.isRetrievePreset, 'isRetrievePreset')
		this.nodeObjName = obj.nodeObjName
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
	headers: RawMenuHeader[] = []
	constructor(apps: any) {
		const clazz = 'RawMenu'
		apps = valueOrDefault(apps, [])
		apps.forEach((app: any) => {
			this.addApp(app)
		})
		this.headers = this.headers.sort((a, b) => a.header.orderDefine - b.header.orderDefine)
	}
	addApp(app: any) {
		let idx = this.headers.findIndex((h) => h.header.id === app.appHeader.id)
		if (idx === -1) {
			idx = this.headers.push(new RawMenuHeader(app))
		} else {
			this.headers[idx].addNodes(app.nodes)
		}
	}
}

export class RawMenuHeader {
	header: NodeHeader
	nodes: Node[] = []
	constructor(obj: any) {
		const clazz = 'RawMenuHeader'
		obj = valueOrDefault(obj, {})
		this.header = new NodeHeader({ ...obj.appHeader, _codeNodeType: NodeType.menu_app })
		this.addNodes(obj.nodes)
	}
	addNodes(nodes: Node[]) {
		nodes = getArray(nodes)
		nodes.forEach((n) => {
			this.nodes.push(new Node(n))
		})
		this.nodes.sort((a, b) => a.orderDefine - b.orderDefine)
	}
}
