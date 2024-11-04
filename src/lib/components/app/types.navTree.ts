import { apiFetch, ApiFunction } from '$routes/api/api'
import { Node, NodeNav, NodeType } from '$comps/app/types.node'
import { RawMenu, required, ResponseBody, valueOrDefault } from '$utils/types'
import { User } from '$utils/types'
import { DataObjActionQuery } from '$comps/app/types.appQuery'
import { State, StatePacket, StatePacketAction } from '$comps/app/types.appState'
import { TokenApiId, TokenAppDoActionConfirmType, TokenAppNode } from '$utils/types.token'
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
		const nodeNavRoot = new NodeNav(
			new Node({
				_codeNodeType: NodeType.menu_root,
				id: ROOT_NODE_ID,
				label: ROOT_NODE_ID,
				name: ROOT_NODE_ID,
				orderDefine: 0
			}),
			undefined,
			-1,
			-1
		)

		// build tree
		let listTree: NodeNav[] = [nodeNavRoot]

		if (rawMenu.apps.length === 1) {
			listTree = this.addBranchNodes(listTree, nodeNavRoot, rawMenu.apps[0].nodes)
		} else {
			rawMenu.apps.forEach((h, idx) => {
				let nodeNavProgram = listTree.find((n) => n.node.id === h.header.id)
				if (!nodeNavProgram) {
					nodeNavProgram = new NodeNav(
						new Node({ ...h.header, _codeNodeType: h.header.type }),
						nodeNavRoot.node.id,
						idx,
						0
					)
					listTree.push(nodeNavProgram)
				}
				listTree = this.addBranchNodes(listTree, nodeNavProgram, h.nodes)
			})
		}

		// open root branch nodes
		listTree = listTree.map((n) => {
			const nodeParent = listTree.find((p) => p.node.id === n.parentId)
			n.isOpen =
				n.parentId === ROOT_NODE_ID ||
				(nodeParent?.parentId === ROOT_NODE_ID && nodeParent?.idxLeaf === 0)
			return n
		})
		return new NavTree({ currNode: nodeNavRoot, listTree })
	}

	static getNodeIdx(listTree: NodeNav[], nodeNav: NodeNav) {
		for (let i = 0; i < listTree.length; i++) {
			if (listTree[i].node.id === nodeNav.node.id) return i
		}
		return -1
	}
	async addBranch(nodeNav: NodeNav) {
		this.listTree = NavTree.addBranchNodes(
			this.listTree,
			nodeNav,
			await getNodesBranch(nodeNav.node.id)
		)
	}
	static addBranchNodes(listTree: NodeNav[], nodeBranchParent: NodeNav, nodesBranch: Node[]) {
		const nodeId = nodeBranchParent.node.id
		const nodeIndent = nodeBranchParent.indent + 1
		const nodeBranchParentIdx = NavTree.getNodeIdx(listTree, nodeBranchParent)
		nodeBranchParent.isRetrieved = true

		const getInsertIdx = (listTree: NodeNav[], nodeBranchParentIdx: number, newNode: Node) => {
			let insertIdx = nodeBranchParentIdx + 1
			while (insertIdx < listTree.length) {
				if (listTree[insertIdx].node.orderDefine > newNode.orderDefine) {
					break
				} else {
					insertIdx++
				}
			}
			return insertIdx
		}

		// insert nodes
		nodesBranch.forEach((n) => {
			if (-1 === listTree.findIndex((l) => l.node.id === n.id)) {
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

		switch (nodeNav.node.type) {
			case NodeType.menu_app:
			case NodeType.menu_header:
				state.update({ page: '/home', nodeType: NodeType.home })
				break

			case NodeType.object:
			case NodeType.program:
			case NodeType.program_object:
				state.update({
					page: '/home',
					parmsState: { programId: this.getProgramId(nodeNav) },
					nodeType: nodeNav.node.type,
					packet: new StatePacket({
						action: StatePacketAction.openNode,
						confirmType: TokenAppDoActionConfirmType.objectChanged,
						token: new TokenAppNode({ node: nodeNav.node })
						// callbacks: [() => dispatch('treeChanged')]
					})
				})
				break

			case NodeType.page:
				if (Object.hasOwn(nodeNav, 'page')) {
					state.update({ page: nodeNav.node.page })
					dispatch('treeChanged')
				}
				break

			case NodeType.menu_root:
				break

			default:
				error(500, {
					file: FILENAME,
					function: 'NavTree.changeNode',
					message: `No case defined for NodeType: ${nodeNav.node.type}`
				})
		}
		setAppStoreNavTree(this)
	}

	getCurrentBranch() {
		let branch: NodeNav[] = []
		this.listTree.forEach((n) => {
			if (n.parentId === this.currNode.node.id) branch.push(n)
		})
		return branch
	}
	getParentNode(nodeNav: NodeNav) {
		return this.listTree.find((n) => n.node.id === nodeNav.parentId)
	}
	getProgramId(nodeNav: NodeNav | undefined): string | undefined {
		if (!nodeNav) return undefined
		if (nodeNav.node.type === NodeType.program) return nodeNav.node.id
		return this.getProgramId(this.getParentNode(nodeNav))
	}
	isCurrentNode(nodeNav: NodeNav) {
		return nodeNav.node.id === this.currNode.node.id
	}
	isRoot(nodeNav: NodeNav) {
		return nodeNav.node.id === ROOT_NODE_ID
	}

	isRootLevel(nodeNav: NodeNav) {
		return nodeNav.parentId === ROOT_NODE_ID
	}
	async setCurrentNode(currNodeNav: NodeNav) {
		this.currNode = currNodeNav

		if ([NodeType.menu_header].includes(currNodeNav.node.type) && !currNodeNav.isRetrieved) {
			await this.addBranch(this.currNode)
		}

		// preset
		let crumbIndentIdx
		this.listTree.forEach((n, i) => {
			n.isCrumb = false
			n.isOpen = this.isRootLevel(n) ? true : false
			if (n.node.id === currNodeNav.node.id) {
				crumbIndentIdx = n.indent - 1
				n.isCrumb = true
				n.isCurrent = true
			} else {
				n.isCurrent = false
			}
		})

		const nodeIdx = NavTree.getNodeIdx(this.listTree, currNodeNav)
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
			if (this.listTree[i].node.id === currNode.parentId) {
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
		new TokenApiId(nodeId)
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
