import { apiFetch, ApiFunction } from '$routes/api/api'
import { ResponseBody } from '$utils/types'
import { NodeNav, NodeType } from '$comps/app/types.node'
import type { DbNode, RawNode, User } from '$utils/types'
import { DataObjActionQuery } from '$comps/app/types.appQuery'
import { State, StatePacket, StatePacketAction } from '$comps/app/types.appState'
import {
	TokenAppDoActionConfirmType,
	TokenAppTreeNode,
	TokenAppTreeNodeId
} from '$utils/types.token'
import { localStorageStore } from '@skeletonlabs/skeleton'
import { goto } from '$app/navigation'
import { error } from '@sveltejs/kit'

const FILENAME = '/lib/components/nav/types.nav.ts'

export let appStoreNavTree = localStorageStore('appStoreNavTree', {})

export function setAppStoreNavTree(navTree: NavTree) {
	appStoreNavTree.set(navTree)
}

export class NavTree {
	currNode: NodeNav
	listTree: Array<NodeNav> = []
	constructor(navTree: any) {
		this.currNode = navTree.currNode
		this.listTree = navTree.listTree
	}
	static init(dbNodes: Array<DbNode>) {
		// root node
		const currNode = new NodeNav(
			{
				header: 'root',
				id: '+ROOT+',
				isHideRowManager: false,
				name: 'root',
				_codeNodeType: NodeType.treeRoot,
				orderDefine: 0
			},
			'root',
			-1
		)
		// root branch
		let listTree: Array<NodeNav> = this.addBranchNodes(currNode, 0, [currNode], dbNodes)

		// open root branch nodes
		listTree = listTree.map((n) => {
			n.isOpen = n.id !== currNode.id
			return n
		})

		return new NavTree({ currNode, listTree })
	}
	async addBranch(node: NodeNav) {
		this.listTree = NavTree.addBranchNodes(
			node,
			this.getNodeIdx(node),
			this.listTree,
			await getNodesBranch(node.id)
		)
	}
	static addBranchNodes(
		node: NodeNav,
		nodeIdx: number,
		listTree: Array<NodeNav>,
		dbNodes: Array<DbNode>
	) {
		const nodeId = node.id
		const nodeIndent = node.indent + 1
		node.isRetrieved = true

		dbNodes.forEach((n, i) => {
			listTree.splice(nodeIdx + i + 1, 0, new NodeNav(n, nodeId, nodeIndent))
		})
		return listTree
	}

	async changeNode(nodeNav: NodeNav, state: State, dispatch: Function) {
		if (this.isCurrentNode(nodeNav)) return

		await this.setCurrentNode(nodeNav)

		switch (nodeNav.type) {
			case NodeType.header:
			case NodeType.program:
				state.update({ page: '/home', nodeType: NodeType.home })
				break

			case NodeType.object:
			case NodeType.programObject:
				state.update({
					page: '/home',
					parmsValues: { programId: this.getProgramId(nodeNav) },
					nodeType: nodeNav.type,
					packet: new StatePacket({
						action: StatePacketAction.navTreeNode,
						confirmType: TokenAppDoActionConfirmType.objectChanged,
						token: new TokenAppTreeNode({ node: nodeNav })
						// callbacks: [() => dispatch('treeChanged')]
					})
				})
				break

			case NodeType.page:
				if (Object.hasOwn(nodeNav, 'page')) {
					state.update({ page: nodeNav.page })
					dispatch('treeChanged')
				}
				break

			case NodeType.treeRoot:
				break

			default:
				error(500, {
					file: FILENAME,
					function: 'NavTree.changeNode',
					message: `No case defined for NodeType: ${nodeNav.type}`
				})
		}
		setAppStoreNavTree(this)
	}

	getCurrentBranch() {
		let branch: Array<NodeNav> = []
		this.listTree.forEach((n) => {
			if (n.parentId === this.currNode.id) branch.push(n)
		})
		return branch
	}
	getNodeIdx(node: NodeNav) {
		for (let i = 0; i < this.listTree.length; i++) {
			if (this.listTree[i].id === node.id) return i
		}
		return -1
	}
	getParentNode(node: NodeNav) {
		return this.listTree.find((n) => n.id === node.parentId)
	}
	getProgramId(node: NodeNav | undefined): string | undefined {
		if (!node) return undefined
		if (node.type === NodeType.program) return node.id
		return this.getProgramId(this.getParentNode(node))
	}
	isCurrentNode(node: NodeNav) {
		return node.id === this.currNode.id
	}
	isRoot(node: NodeNav) {
		return node.id === '+ROOT+'
	}

	isRootLevel(node: NodeNav) {
		return node.parentId === '+ROOT+'
	}
	async setCurrentNode(currNode: NodeNav) {
		this.currNode = currNode

		if ([NodeType.header, NodeType.program].includes(currNode.type) && !currNode.isRetrieved) {
			await this.addBranch(this.currNode)
		}

		// preset
		let crumbIndentIdx
		this.listTree.forEach((n, i) => {
			n.isCrumb = false
			n.isOpen = this.isRootLevel(n) ? true : false
			if (n.id === currNode.id) {
				crumbIndentIdx = n.indent - 1
				n.isCrumb = true
				n.isCurrent = true
			} else {
				n.isCurrent = false
			}
		})

		const nodeIdx = this.getNodeIdx(currNode)
		if (nodeIdx > -1) {
			// set open - current node - up & crumbs
			let status = true
			for (let i = nodeIdx; i > -1; i--) {
				// set crumb
				if (!this.isRoot(this.listTree[i]) && this.listTree[i].indent === crumbIndentIdx) {
					this.listTree[i].isCrumb = true
					crumbIndentIdx--
				}

				// set open
				if (this.isRootLevel(this.listTree[i])) {
					status = false
				} else {
					this.listTree[i].isOpen = status
				}
			}

			// set open - children - down
			status = true
			for (let i = nodeIdx + 1; i < this.listTree.length; i++) {
				if (this.isRootLevel(this.listTree[i])) {
					status = false
				} else {
					this.listTree[i].isOpen = status
				}
			}
		}
	}
	async setCurrentParent() {
		const currNode = this.currNode
		for (let i = 0; i < this.listTree.length; i++) {
			if (this.listTree[i].id === currNode.parentId) {
				await this.setCurrentNode(this.listTree[i])
				setAppStoreNavTree(this)
				break
			}
		}
	}
}

export async function initNavTree(user: User) {
	let rawBranch: Array<DbNode> = user?.resource_programs ? user?.resource_programs : []

	// <todo> filter to single program for dev
	// rawBranch = rawBranch.filter((p: any) => {
	// 	return p.name === 'node_pgm_cm_staff_provider'
	// })

	// if user has access to only 1 program,
	// filter down to first group of navNodes
	// it's not necessary to display program/header node
	while (rawBranch && rawBranch.length === 1) {
		rawBranch = await getNodesBranch(rawBranch[0].id)
	}

	setAppStoreNavTree(NavTree.init(rawBranch))
}

async function getNodesBranch(nodeId: string) {
	const result: ResponseBody = await apiFetch(
		ApiFunction.dbEdgeGetNodesBranch,
		new TokenAppTreeNodeId({ nodeId })
	)
	if (result.success) {
		return result.data
	} else {
		error(500, {
			file: FILENAME,
			function: 'getNodesBranch',
			message: `Error retrieving nodes for nodeId: ${nodeId}`
		})
	}
}
