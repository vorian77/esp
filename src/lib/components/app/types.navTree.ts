import { apiFetch, ApiFunction } from '$routes/api/api'
import { type DbNode, DbNodeMenuApp, NodeNav, NodeType } from '$comps/app/types.node'
import { RawMenu, required, ResponseBody, valueOrDefault } from '$utils/types'
import type { RawNode, User } from '$utils/types'
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
const ROOT_NODE_ID = '+ROOT+'

export let appStoreNavTree = localStorageStore('appStoreNavTree', {})

export function setAppStoreNavTree(navTree: NavTree) {
	appStoreNavTree.set(navTree)
}

export class NavTree {
	currNode: NodeNav
	listTree: NodeNav[] = []
	constructor(obj: any) {
		const clazz = 'NavTree'
		obj = valueOrDefault(obj, {})
		this.currNode = required(obj.currNode, clazz, 'currNode')
		this.listTree = required(obj.listTree, clazz, 'listTree')
	}
	static init(rawMenu: RawMenu) {
		// init tree
		const nodeNavRoot = new NodeNav(
			{
				header: ROOT_NODE_ID,
				id: ROOT_NODE_ID,
				isHideRowManager: false,
				name: ROOT_NODE_ID,
				_codeNodeType: NodeType.menu_root,
				orderDefine: 0
			},
			undefined,
			-1,
			-1
		)

		// build tree
		let listTree: NodeNav[] = [nodeNavRoot]

		if (rawMenu.headers.length === 1) {
			listTree = this.addBranchNodes(listTree, nodeNavRoot, rawMenu.headers[0].nodes)
		} else {
			rawMenu.headers.forEach((h, idx) => {
				// console.log('navTree.init:: ', h)
				let nodeNavProgram = listTree.find((n) => n.id === h.id)
				if (!nodeNavProgram) {
					const nodeDbProgram = new DbNodeMenuApp({
						header: h.header,
						id: h.id,
						name: h.name,
						orderDefine: idx
					})
					nodeNavProgram = new NodeNav(nodeDbProgram, nodeNavRoot.id, idx, 0)
					listTree.push(nodeNavProgram)
				}
				listTree = this.addBranchNodes(listTree, nodeNavProgram, h.nodes)
			})
		}

		// open root branch nodes
		listTree = listTree.map((n) => {
			const nodeParent = listTree.find((p) => p.id === n.parentId)
			n.isOpen =
				n.parentId === ROOT_NODE_ID ||
				(nodeParent?.parentId === ROOT_NODE_ID && nodeParent?.idxLeaf === 0)

			return n
		})
		return new NavTree({ currNode: nodeNavRoot, listTree })
	}

	static getNodeIdx(listTree: NodeNav[], node: NodeNav) {
		for (let i = 0; i < listTree.length; i++) {
			if (listTree[i].id === node.id) return i
		}
		return -1
	}
	async addBranch(node: NodeNav) {
		this.listTree = NavTree.addBranchNodes(this.listTree, node, await getNodesBranch(node.id))
	}
	static addBranchNodes(listTree: NodeNav[], nodeBranchParent: NodeNav, nodesBranch: DbNode[]) {
		const nodeId = nodeBranchParent.id
		const nodeIndent = nodeBranchParent.indent + 1
		const nodeBranchParentIdx = NavTree.getNodeIdx(listTree, nodeBranchParent)
		nodeBranchParent.isRetrieved = true

		const getInsertIdx = (listTree: NodeNav[], nodeBranchParentIdx: number, newNode: NodeNav) => {
			let insertIdx = nodeBranchParentIdx + 1
			while (insertIdx < listTree.length) {
				if (listTree[insertIdx].orderDefine > newNode.orderDefine) {
					break
				} else {
					insertIdx++
				}
			}
			return insertIdx
		}

		// insert nodes
		nodesBranch.forEach((n) => {
			if (-1 === listTree.findIndex((l) => l.id === n.id)) {
				const insertIdx = getInsertIdx(listTree, nodeBranchParentIdx, n)
				let newNode = new NodeNav(n, nodeId, insertIdx, nodeIndent)
				listTree.splice(insertIdx, 0, newNode)
			}
		})

		return listTree
	}

	async changeNode(nodeNav: NodeNav, state: State, dispatch: Function) {
		if (this.isCurrentNode(nodeNav)) return

		await this.setCurrentNode(nodeNav)

		switch (nodeNav.type) {
			case NodeType.menu_app:
			case NodeType.menu_header:
				state.update({ page: '/home', nodeType: NodeType.home })
				break

			case NodeType.object:
			case NodeType.program:
			case NodeType.program_object:
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

			case NodeType.menu_root:
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
		return node.id === ROOT_NODE_ID
	}

	isRootLevel(node: NodeNav) {
		return node.parentId === ROOT_NODE_ID
	}
	async setCurrentNode(currNode: NodeNav) {
		this.currNode = currNode

		if ([NodeType.menu_header].includes(currNode.type) && !currNode.isRetrieved) {
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

		const nodeIdx = NavTree.getNodeIdx(this.listTree, currNode)
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
	const rawMenu = new RawMenu(user.resources_sys_app)
	setAppStoreNavTree(NavTree.init(rawMenu))
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
