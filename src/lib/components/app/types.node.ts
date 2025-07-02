import { PropLinkItems } from '$comps/dataObj/types.rawDataObj.svelte'
import {
	arrayOfClass,
	booleanOrFalse,
	classOptional,
	CodeActionType,
	getArray,
	memberOfEnum,
	memberOfEnumIfExists,
	memberOfEnumOrDefault,
	NodeObjComponent,
	strRequired,
	valueOrDefault
} from '$utils/utils'
import { TokenApiQueryType, TokenApiQueryTypeAlt } from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '/lib/components/nav/types.node.ts'

const DEFAULT_ICON = 'AppWindow'

export class NodeHeader {
	icon: string
	id: string
	label: string
	name: string
	orderDefine: number
	constructor(obj: any) {
		const clazz = 'NodeHeader'
		obj = valueOrDefault(obj, {})
		this.icon = valueOrDefault(obj._codeIcon, DEFAULT_ICON)
		this.id = strRequired(obj.id, clazz, 'id')
		this.label = strRequired(obj.header || obj.label || '', clazz, 'label')
		this.name = strRequired(obj.name, clazz, 'name')
		this.orderDefine = valueOrDefault(obj.orderDefine, 0)
	}
}

export class Node extends NodeHeader {
	actions: NodeAction[]
	children: string[]
	codeComponent: NodeObjComponent
	codeNodeType: NodeType
	codeQueryTypeAlt?: TokenApiQueryTypeAlt
	codeRenderPlatform: NodeRenderPlatform
	dataObjId: string
	isAlwaysRetrieveData: boolean
	isHideRowManager: boolean
	ownerId: string
	queryOwnerType?: NodeQueryOwnerType
	selectListItems?: PropLinkItems
	constructor(obj: any) {
		const clazz = 'Node'
		obj = valueOrDefault(obj, {})
		super(obj)
		this.actions = arrayOfClass(NodeAction, obj._actions)
		this.children = getArray(obj._children).map((c: any) => c._nodeObjId)
		this.codeComponent = memberOfEnum(
			obj._codeComponent,
			clazz,
			'codeComponent',
			'NodeObjComponent',
			NodeObjComponent
		)
		this.codeNodeType = memberOfEnum(obj._codeNodeType, clazz, 'codeNodeType', 'NodeType', NodeType)
		this.codeQueryTypeAlt = memberOfEnumIfExists(
			obj._codeQueryTypeAlt,
			'codeQueryTypeAlt',
			clazz,
			'TokenApiQueryTypeAlt',
			TokenApiQueryTypeAlt
		)
		this.codeRenderPlatform = memberOfEnumOrDefault(
			obj._codeRenderPlatform,
			clazz,
			'codeRenderPlatform',
			'NodeRenderPlatform',
			NodeRenderPlatform,
			NodeRenderPlatform.app
		)
		this.dataObjId = obj._dataObjId
		this.isAlwaysRetrieveData = booleanOrFalse(obj.isAlwaysRetrieveData)
		this.isHideRowManager = booleanOrFalse(obj.isHideRowManager)
		this.ownerId = strRequired(obj._ownerId, clazz, 'ownerId')
		this.queryOwnerType = memberOfEnumIfExists(
			obj._codeQueryOwnerType,
			'queryOwnerType',
			clazz,
			'NodeQueryOwnerType',
			NodeQueryOwnerType
		)
		this.selectListItems = classOptional(PropLinkItems, obj._selectListItems)
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
					msg: `No children defined for node: ${this.name}`
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

export class NodeEmbed extends Node {
	constructor(obj: any) {
		const clazz = 'NodeEmbed'
		obj = valueOrDefault(obj, {})
		obj._codeNodeType = NodeType.nodeEmbed
		obj._ownerId = 'myOwnerId'
		obj.id = 'nodeEmbedId'
		obj.name = 'nodeEmbedName'
		super(obj)
	}
}

export enum NodeQueryOwnerType {
	queryOwnerTypeOrgRecord = 'queryOwnerTypeOrgRecord',
	queryOwnerTypeSystemApp = 'queryOwnerTypeSystemApp',
	queryOwnerTypeSystemRecord = 'queryOwnerTypeSystemRecord',
	queryOwnerTypeSystemUser = 'queryOwnerTypeSystemUser'
}

export enum NodeRenderPlatform {
	app = 'app',
	drawerBottom = 'drawerBottom',
	modal = 'modal'
}

export enum NodeType {
	nodeApp = 'nodeApp',
	nodeAppObj = 'nodeAppObj',
	nodeEmbed = 'nodeEmbed',
	nodeFree = 'nodeFree',
	nodeObjConfigList = 'nodeObjConfigList',
	nodeObjConfigSelect = 'nodeObjConfigSelect',
	nodeTask = 'nodeTask'
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
		this.header = new NodeHeader({ ...obj._appHeader })
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
