import {
	booleanOrFalse,
	memberOfEnum,
	nbrRequired,
	strRequired,
	valueOrDefault
} from '$utils/utils'
import { error } from '@sveltejs/kit'

const FILENAME = '/lib/components/nav/types.node.ts'

const DEFAULT_ICON = 'hamburger-menu'

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

export class DbNodeMenuApp {
	_codeIcon?: string
	_codeNodeType = NodeType.menu_app
	header: string
	id: string
	isHideRowManager = false
	name: string
	orderDefine: number
	constructor(obj: any) {
		const clazz = 'DbNodeProgram'
		obj = valueOrDefault(obj, {})
		this._codeIcon = valueOrDefault(obj._codeIcon, DEFAULT_ICON)
		this.header = strRequired(obj.header, clazz, 'header')
		this.id = strRequired(obj.id, clazz, 'id')
		this.name = strRequired(obj.name, clazz, 'name')
		this.orderDefine = nbrRequired(obj.orderDefine, clazz, 'orderDefine')
	}
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

export class Node {
	dataObjId?: string
	dataObjName?: string
	nodeObjName?: string
	header: string
	icon: string
	id: string
	isHideRowManager: boolean
	isMobileMode: boolean
	isRetrievePreset: boolean
	name: string
	page: string
	type: NodeType
	constructor(rawNode: RawNode) {
		const clazz = 'Node'
		this.dataObjId = rawNode.dataObjId
		this.dataObjName = rawNode.dataObjName
		this.header = rawNode.header
		this.icon = rawNode.icon
		this.id = rawNode.id
		this.isHideRowManager = booleanOrFalse(rawNode.isHideRowManager, 'isHideRowManager')
		this.isMobileMode = booleanOrFalse(rawNode.isMobileMode, 'isHideRowManager')
		this.isRetrievePreset = booleanOrFalse(rawNode.isRetrievePreset, 'isRetrievePreset')
		this.name = rawNode.name
		this.nodeObjName = rawNode.nodeObjName
		this.page = rawNode.page
		this.type = memberOfEnum(rawNode.type, clazz, 'type', 'NodeType', NodeType)
	}
}
export class NodeApp {
	dataObjId: string
	label: string
	id: string
	isHideRowManager: boolean
	constructor(obj: any) {
		const clazz = 'NodeApp'
		obj = valueOrDefault(obj, {})
		this.dataObjId = strRequired(obj.dataObjId, clazz, 'dataObjId')
		this.label = strRequired(obj.header, clazz, 'header')
		this.id = strRequired(obj.id, clazz, 'id')
		this.isHideRowManager = booleanOrFalse(obj.isHideRowManager, 'isHideRowManager')
	}
}
export class NodeNav extends Node {
	idxLeaf: number
	indent: number
	isCrumb: boolean = false
	isCurrent: boolean = false
	isOpen: boolean = false
	isRetrieved: boolean = false
	orderDefine: number
	parentId?: string
	constructor(dbNode: DbNode, parentId: string | undefined, idxLeaf: number, indent: number) {
		super(new RawNode(dbNode))
		this.idxLeaf = idxLeaf
		this.indent = indent
		this.orderDefine = dbNode.orderDefine
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
		this.headers = this.headers.sort((a, b) => a.orderDefine - b.orderDefine)
	}
	addApp(app: any) {
		let idx = this.headers.findIndex((h) => h.id === app.id)
		if (idx === -1) {
			idx = this.headers.push(new RawMenuHeader(app))
		} else {
			this.headers[idx].addNodes(app.nodes)
		}
	}
}

export class RawMenuHeader {
	header: string
	id: string
	name: string
	nodes: DbNode[] = []
	orderDefine: number
	constructor(obj: any) {
		const clazz = 'RawMenuHeader'
		obj = valueOrDefault(obj, {})
		this.header = strRequired(obj.appHeader.header, clazz, 'header')
		this.id = strRequired(obj.appHeader.id, clazz, 'id')
		this.name = strRequired(obj.appHeader.name, clazz, 'name')
		this.orderDefine = obj.appHeader.orderDefine
		this.addNodes(obj.nodes)
	}
	addNodes(nodes: DbNode[]) {
		this.nodes = [...this.nodes, ...nodes]
		this.nodes.sort((a, b) => a.orderDefine - b.orderDefine)
	}
}
