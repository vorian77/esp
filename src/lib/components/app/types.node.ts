import {
	arrayOfClass,
	booleanOrFalse,
	CodeActionType,
	getArray,
	memberOfEnum,
	memberOfEnumIfExists,
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
	actions: NodeAction[]
	children: string[]
	dataObjId: string
	isAlwaysRetrieveData: boolean
	isDynamicChildrenSystemParents: boolean
	isHideRowManager: boolean
	ownerId?: string
	queryOwnerType?: NodeQueryOwnerType
	constructor(obj: any) {
		const clazz = 'Node'
		obj = valueOrDefault(obj, {})
		super(obj)
		this.actions = arrayOfClass(NodeAction, obj._actions)
		this.children = getArray(obj._children).map((c: any) => c._nodeObjId)
		this.dataObjId = strRequired(obj._dataObjId || '', clazz, 'dataObjId')
		this.isAlwaysRetrieveData = booleanOrFalse(obj.isAlwaysRetrieveData)
		this.isDynamicChildrenSystemParents = booleanOrFalse(obj.isDynamicChildrenSystemParents)
		this.isHideRowManager = booleanOrFalse(obj.isHideRowManager)
		this.ownerId = strRequired(obj._ownerId, clazz, 'ownerId')
		this.queryOwnerType = memberOfEnumIfExists(
			obj._codeQueryOwnerType,
			'queryOwnerType',
			clazz,
			'NodeQueryOwnerType',
			NodeQueryOwnerType
		)
	}

	getNodeIdAction(actionType: CodeActionType, nodeIdActionAlt: NodeIdActionAlt): string {
		let nodeAction = this.actions.find((a) => a.actionType === actionType)
		if (nodeAction) return nodeAction.nodeObjId
		switch (nodeIdActionAlt) {
			case NodeIdActionAlt.firstChild:
				if (this.children.length > 0) return this.children[0]
				error(500, {
					file: FILENAME,
					function: 'Node.getNodeIdAction',
					msg: `No children defined node: ${this.name}`
				})
			case NodeIdActionAlt.self:
				return this.id
			default:
				error(500, {
					file: FILENAME,
					function: 'Node.getNodeIdAction',
					msg: `Invalid nodeIdActionAlt: ${nodeIdActionAlt}`
				})
		}
	}

	getNodeAction(actionType: CodeActionType) {
		let nodeAction = this.actions.find((a) => a.actionType === actionType)
		if (nodeAction) return nodeAction
		nodeAction = this.actions.find((a) => a.actionType === CodeActionType.default)
		if (nodeAction) return nodeAction
		error(500, {
			file: FILENAME,
			function: 'Node.getNodeAction',
			msg: `No default NodeAction defined for node name: ${this.name}`
		})
	}
}

export enum NodeIdActionAlt {
	firstChild = 'firstChild',
	self = 'self'
}

export class NodeAction {
	actionType: CodeActionType
	dataObjId: string
	nodeObjId: string
	constructor(obj: any) {
		const clazz = 'NodeAction'
		obj = valueOrDefault(obj, {})
		this.actionType = memberOfEnum(
			obj._codeAction,
			clazz,
			'actionType',
			'CodeActionType',
			CodeActionType
		)
		this.dataObjId = strRequired(obj._dataObjId, clazz, 'dataObjId')
		this.nodeObjId = strRequired(obj._nodeObjId, clazz, 'nodeObjId')
	}
}

export class NodeData {
	actionType: CodeActionType
	dataObjId?: string
	dataObjName?: string
	constructor(obj: any) {
		const clazz = 'NodeData'
		obj = valueOrDefault(obj, {})
		this.actionType = memberOfEnum(
			obj._actionType,
			clazz,
			'actionType',
			'CodeActionType',
			CodeActionType
		)
		this.dataObjId = obj._dataObjId
		this.dataObjName = obj._dataObjName
		strRequired(this.dataObjId || this.dataObjName, clazz, 'dataObjId or dataObjName')
	}
	getActionType() {
		alert('NodeData.actionType: ' + this.actionType)
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

export enum NodeQueryOwnerType {
	queryOwnerTypeOrgRecord = 'queryOwnerTypeOrgRecord',
	queryOwnerTypeSystemApp = 'queryOwnerTypeSystemApp',
	queryOwnerTypeSystemRecord = 'queryOwnerTypeSystemRecord',
	queryOwnerTypeSystemUser = 'queryOwnerTypeSystemUser'
}

export enum NodeType {
	home = 'home',
	menu_app = 'menu_app',
	menu_header = 'menu_header',
	menu_root = 'menu_root',
	object = 'object',
	page = 'page',
	program = 'program',
	program_object = 'program_object',
	system = 'system'
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
		let idx = this.apps.findIndex((h) => h.header.id === app._appHeader.id)
		if (idx === -1) {
			idx = this.apps.push(new RawMenuApp(app))
		} else {
			this.apps[idx].addNodes(app._nodes)
		}
	}
}

export class RawMenuApp {
	header: NodeHeader
	nodes: Node[] = []
	systemId: string
	constructor(obj: any) {
		const clazz = 'RawMenuApp'
		obj = valueOrDefault(obj, {})
		this.header = new NodeHeader({ ...obj._appHeader, _codeNodeType: NodeType.menu_app })
		this.systemId = strRequired(obj._ownerId, clazz, 'systemId')
		this.addNodes(obj._nodes)
	}
	addNodes(nodes: Node[]) {
		nodes = getArray(nodes)
		nodes.forEach((n) => {
			if (!this.nodes.find((e) => e.id === n.id))
				this.nodes.push(new Node({ ...n, systemId: this.systemId }))
		})
		this.nodes.sort((a, b) => a.orderDefine - b.orderDefine)
	}
}
