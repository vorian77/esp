import { State } from '$comps/app/types.state.svelte'
import { FieldEmbedShell } from '$comps/form/fieldEmbed.svelte'
import action from '$enhance/actions/actionsClassCustom'
import { QuerySourceRaw, QuerySourceType } from '$lib/queryClient/types.queryClient'
import { QueryManagerClient } from '$lib/queryClient/types.queryClientManager'
import { apiFetchFunction, ApiFunction } from '$routes/api/api'
import {
	booleanOrFalse,
	CodeAction,
	CodeActionClass,
	CodeActionType,
	DataObj,
	DataObjCardinality,
	DataObjData,
	type DataRecord,
	DataRecordStatus,
	DataRow,
	getArray,
	getValueDisplay,
	MethodResult,
	Node,
	NodeEmbed,
	NodeIdActionAlt,
	NodeObjComponent,
	NodeType,
	ParmsValuesFormList,
	type ParmsValuesFormListType,
	ParmsValuesType,
	required,
	strRequired,
	valueOrDefault
} from '$utils/types'
import {
	NavDestinationType,
	TokenApiDbDataObjSource,
	TokenApiId,
	TokenApiIds,
	TokenApiQueryData,
	TokenApiQueryDataTree,
	TokenApiQuerySource,
	TokenApiQueryType,
	TokenAppActionTrigger,
	TokenAppModalEmbedField,
	TokenAppNav,
	TokenAppNode,
	TokenAppRow,
	TokenAppStateTriggerAction,
	TokenAppTab
} from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/nav/types.app.ts'

export class App {
	isMultiTree: boolean
	appTrees: AppTree[] = $state([])
	appTreesIdxCurrent: number = -1
	info: string = ''
	systemIdQuerySource: string = ''
	constructor(obj: DataRecord = {}) {
		this.isMultiTree = booleanOrFalse(obj.isMultiTree)
	}

	getInfo() {
		console.log(`app.getInfo: ${this.info}`, {
			treeCount: this.appTrees.length,
			currTreeIdx: this.appTreesIdxCurrent,
			trees: this.appTrees.map((tree, idx) => {
				return {
					tree: {
						levels: tree.levels.length,
						tabs: tree.levels.map((level) => {
							return {
								tabsLength: level.tabs.length,
								tabIdxCurrent: level.tabIdxCurrent,
								tabs: level.tabs.map((tab, tabIdx) => {
									return {
										tabIdx,
										label: tab.node.label,
										dataObjId: tab.node.dataObjId,
										dataObj: tab.dataObj?.raw.name
									}
								})
							}
						})
					}
				}
			})
		})
	}

	async addLevelEmbedFieldModal(sm: State, token: TokenAppModalEmbedField): Promise<MethodResult> {
		const newTab = new AppLevelNode({
			...this.getLevelNodeParmsEmbed({
				_codeComponent: NodeObjComponent.FormDetail,
				_ownerId: '',
				dataObjId: token.dataObjSourceModal.sources.dataObjId,
				dataObjSource: token.dataObjSourceModal,
				treeIdx: this.appTreesIdxCurrent
			})
		})
		let result: MethodResult = await newTab.queryDataObj(sm, token.queryType)
		if (result.error) return result
		this.levelAdd([newTab], true)
		return result
	}

	async addLevelEmbedShellForm(fieldShell: FieldEmbedShell) {
		// build tabs
		let tabs: AppLevelNode[] = []
		// const levelIdx = 0
		// const EMBEB_FIELD_TYPES = [FieldEmbedListConfig, FieldEmbedListEdit, FieldEmbedListSelect]
		// for (let tabIdx = 0; tabIdx < fieldShell.fields.length; tabIdx++) {
		// 	const fieldEmbed = fieldShell.fields[tabIdx]
		// 	EMBEB_FIELD_TYPES.forEach((type) => {
		// 		if (fieldEmbed instanceof type) {
		// 			currLevel.tabs.push(
		// 				new AppLevelTab({
		// 					data: fieldEmbed?.dataObj?.objData,
		// 					dataObj: fieldEmbed?.dataObj,
		// 					isRetrieved: true,
		// 					label: fieldEmbed.colDO.label,
		// 					levelIdx,
		// 					tabIdx
		// 				})
		// 			)
		// 		}
		// 	})
		// }

		// let dm: DataManager = fieldShell.stateShell.dm
		// const recordId =
		// 	fieldShell.stateShell.dataObjState?.data.rowsRetrieved.getDetailRecordValue('id')

		// 	const dataObjForm = fieldShell.stateShell.dataObjState!
		// fieldShell.stateShell.objStatus = fieldShell.getStatus(dataObjForm, recordId)
		this.levelAdd(tabs)
		return fieldShell
	}

	async addTreeEmbedFieldModal(sm: State, token: TokenAppModalEmbedField): Promise<MethodResult> {
		const newTab = new AppLevelNode({
			...this.getLevelNodeParmsEmbed({
				_codeComponent: NodeObjComponent.FormList,
				_ownerId: '',
				dataObjId: token.dataObjSourceModal.sources.dataObjId,
				dataObjSource: token.dataObjSourceModal,
				treeIdx: this.appTrees.length
			})
		})
		let result = await newTab.queryDataObj(sm, token.queryType)
		if (result.error) return result
		newTab.dataObj?.parmsFormListSet(ParmsValuesType.listIdsSelected, token.listIdsSelected)
		this.treeAdd([newTab])
		return result
	}

	getLevel(levelIdx: number) {
		return this.getCurrTree()?.getLevel(levelIdx)
	}
	getLevelNodeParmsEmbed(parms: NodeEmbedParmsField) {
		const node = new NodeEmbed({
			_codeComponent: parms._codeComponent,
			dataObjId: parms.dataObjId
		})
		return { dataObjSource: parms.dataObjSource, node, treeIdx: parms.treeIdx }
	}

	getLevelNodeParmsNode(node: Node) {
		return {
			node: node,
			treeIdx: this.appTrees.length
		}
	}
	getCurrLevel() {
		return this.getCurrTree()?.getCurrLevel()
	}
	getCurrLevelActions() {
		return this.getCurrTree()?.getCurrLevelActions()
	}
	getCurrLevelsLength() {
		return this.getCurrTree()?.levels.length
	}

	getCurrTab() {
		return this.getCurrTree()?.getCurrTab()
	}
	getCurrTabParentLevel() {
		return this.getCurrTree()?.getCurrTabParentLevel()
	}
	getCurrTabParentTab() {
		return this.getCurrTree()?.getCurrTabParentTab()
	}
	getCurrTree() {
		return this.appTreesIdxCurrent >= 0 ? this.appTrees[this.appTreesIdxCurrent] : undefined
	}

	getDataTree(isDataTreePresetOffset: boolean = false): TokenApiQueryDataTree {
		const tree = this.getCurrTree()
		if (tree) {
			return tree.getDataTree(isDataTreePresetOffset)
		} else {
			return new TokenApiQueryDataTree()
		}
	}
	getRootTab() {
		return this.getCurrTree()?.getRootTab()
	}

	levelAdd(tabs: AppLevelNode[], isVirtual: boolean = false) {
		this.getCurrTree()?.levelAdd(tabs, isVirtual)
	}

	async navDestination(sm: State, token: TokenAppNav): Promise<MethodResult> {
		const currTree = this.getCurrTree()
		if (currTree) return await currTree.navDestination(sm, token)
		return new MethodResult({
			error: {
				file: FILENAME,
				function: 'App.navDestination',
				msg: `No current tree level`
			}
		})
	}

	navCrumbsList() {
		return this.getCurrTree()?.navCrumbsList()
	}

	async navRow(sm: State, token: TokenAppRow): Promise<MethodResult> {
		const currTree = this.getCurrTree()
		if (currTree) return currTree.navRow(sm, token, this)
		return new MethodResult({
			error: {
				file: FILENAME,
				function: 'App.navRow',
				msg: `No current tree level`
			}
		})
	}

	navRowStatus() {
		return this.getCurrTree()?.navRowStatus()
	}
	async navTab(sm: State, token: TokenAppTab): Promise<MethodResult> {
		const currTree = this.getCurrTree()
		if (currTree) return currTree.navTab(sm, token)
		return new MethodResult()
	}

	async saveDetail(sm: State, codeActionType: CodeActionType): Promise<MethodResult> {
		const level = this.getCurrTree()
		if (level) return level.saveDetail(sm, codeActionType)
		return new MethodResult({
			error: {
				file: FILENAME,
				function: 'App.saveDetail',
				msg: `No current tree level`
			}
		})
	}
	async saveList(sm: State): Promise<MethodResult> {
		const currTree = this.getCurrTree()
		if (currTree) return await currTree.saveList(sm)
		return new MethodResult({
			error: {
				file: FILENAME,
				function: 'App.saveList',
				msg: `No current tree level`
			}
		})
	}

	setSystemQuerySource(systemId?: string) {
		this.systemIdQuerySource = systemId || ''
	}

	setTreeIdxCurrent(treeIdx: number) {
		this.appTreesIdxCurrent = treeIdx
		return treeIdx
	}
	async tabDuplicate(sm: State, token: TokenAppActionTrigger) {
		await this.getCurrTree()?.tabDuplicate(sm, token)
	}

	async treeAdd(tabs: AppLevelNode[]) {
		const newLevel = new AppLevel(tabs)
		const newTree = new AppTree(newLevel)
		this.setTreeIdxCurrent(this.appTrees.push(newTree) - 1)
	}
	async treeNodeAdd(sm: State, token: TokenAppNode): Promise<MethodResult> {
		this.setSystemQuerySource(token.node.systemIdQuerySource)
		let newTab = new AppLevelNode({
			...this.getLevelNodeParmsNode(token.node)
		})
		let result: MethodResult = await newTab.queryTab(sm, TokenApiQueryType.retrieve)
		if (result.error) return result
		this.treeAdd([newTab])
		return result
	}

	async treeNodeChildren(
		sm: State,
		actionType: CodeActionType,
		dataObj: DataObj,
		queryType: TokenApiQueryType
	): Promise<MethodResult> {
		const clazz = 'treeNodeChildren'
		const currTree = this.getCurrTree()
		if (currTree) {
			const currTab = currTree.getCurrTab()
			if (currTab) {
				currTab.update(dataObj)
				if (queryType === TokenApiQueryType.preset) {
					currTab.parmsFormListSet(ParmsValuesType.listRecordIdCurrent, '')
				}

				// build tabs
				const currNode = currTab.node
				let result: MethodResult
				switch (currNode.codeNodeType) {
					case NodeType.nodeObjConfigList:
						result = await this.treeNodeChildrenTabsTypeNodeObjConfigList(sm, queryType, currTab)
						break
					case NodeType.nodeObjConfigSelect:
						result = await this.treeNodeChildrenTabsTypeNodeObjConfigSelect(
							sm,
							actionType,
							queryType,
							currTab
						)
						break

					default:
						result = await this.treeNodeChildrenTabsAddeBase(sm, actionType, queryType, currNode)
				}
				if (result.error) return result
				const tabs: AppLevelNode[] = result.data

				// use tabs to create new level
				currTree.levelAdd(tabs)
			}
		}

		return new MethodResult()
	}

	async treeNodeChildrenTabs(
		sm: State,
		queryType: TokenApiQueryType,
		nodeId: string
	): Promise<MethodResult> {
		const clazz = 'treeNodeChildrenTabs'
		let tabs: AppLevelNode[] = []

		// create root tab
		let result: MethodResult = await getNodeByNodeId(nodeId)
		if (result.error) return result
		const nodeLevelRoot = new Node(result.data)
		const newTab = new AppLevelNode(this.getLevelNodeParmsNode(nodeLevelRoot))

		result = await newTab.queryTab(sm, queryType)
		if (result.error) return result
		tabs.push(newTab)

		// add children - lists
		result = await getNodesChildren(nodeLevelRoot.id)
		if (result.error) return result
		const nodeLevelChildrenRaw: any[] = result.data
		if (nodeLevelChildrenRaw && nodeLevelChildrenRaw.length > 0) {
			if (newTab.dataObj?.raw.codeCardinality === DataObjCardinality.detail) {
				nodeLevelChildrenRaw.forEach((n) => {
					tabs.push(new AppLevelNode(this.getLevelNodeParmsNode(new Node(n))))
				})
			}
		}

		return new MethodResult(tabs)
	}

	async treeNodeChildrenTabsAddeBase(
		sm: State,
		actionType: CodeActionType,
		queryType: TokenApiQueryType,
		nodeParent: Node
	): Promise<MethodResult> {
		const nodeIdChild = nodeParent.getNodeIdAction(actionType, NodeIdActionAlt.firstChild)
		return this.treeNodeChildrenTabs(sm, queryType, nodeIdChild)
	}

	async treeNodeChildrenTabsTypeNodeObjConfigList(
		sm: State,
		queryType: TokenApiQueryType,
		currTab: AppLevelNode
	): Promise<MethodResult> {
		const clazz = 'addTreeNodeChildrenTabsTypeNodeObjConfigList'

		const listRow: DataRow = required(currTab.listGetDataRow(), clazz, 'listRow')
		const nodeIdChild = strRequired(listRow.getValue('link_nodeObj').data, clazz, 'nodeIdChild')
		const codeAttrTypeId = strRequired(
			listRow.getValue('link_codeAttrType').data,
			clazz,
			'codeAttrTypeId'
		)

		sm.parmsState.valueSet(ParmsValuesType.selectListId, codeAttrTypeId)
		return this.treeNodeChildrenTabs(sm, queryType, nodeIdChild)
	}

	async treeNodeChildrenTabsTypeNodeObjConfigSelect(
		sm: State,
		actionType: CodeActionType,
		queryType: TokenApiQueryType,
		currTab: AppLevelNode
	): Promise<MethodResult> {
		const clazz = 'treeNodeChildrenTabsTypeNodeObjConfigSelect'
		const nodeObjConfigRecord: DataRecord = required(
			sm.parmsState.valueGet(ParmsValuesType.selectListRecord),
			clazz,
			'nodeObjConfigRecord'
		)
		const nodeIdParent = strRequired(nodeObjConfigRecord._nodeObjId, clazz, 'nodeIdChild')

		let result: MethodResult = await getNodeByNodeId(nodeIdParent)
		if (result.error) return result
		const nodeParent = new Node(result.data)
		return this.treeNodeChildrenTabsAddeBase(sm, actionType, queryType, nodeParent)
	}

	virtualModalLevelAdd(dataObjEmbed: DataObj) {
		this.getCurrTree()?.virtualModalLevelAdd(dataObjEmbed, this.appTreesIdxCurrent)
	}
	virtualModalLevelRestore() {
		this.getCurrTree()?.virtualModalLevelRestore()
	}
}

export class AppLevel {
	isVirtual: boolean
	tabIdxCurrent: number
	tabIdxRestoreVal?: number
	tabs: AppLevelNode[] = $state([])
	constructor(tabs: AppLevelNode[], isVirtual: boolean = false) {
		this.isVirtual = isVirtual
		this.tabIdxCurrent = 0
		this.tabs = tabs
	}
	getCrumbLabel(tab: AppLevelNode, parentLevel: AppLevel | undefined = undefined) {
		const clazz = 'AppLevel.getCrumbLabel'
		const label = tab?.dataObj?.raw?.header || tab.node.label || 'unknown'
		if (!label) return ''
		const labelId = parentLevel ? parentLevel.getCurrTab().listCrumbLabelId() : ''
		return labelId ? labelId : label
	}
	getCurrTab() {
		return this.tabs[this.tabIdxCurrent]
	}
	getCurrTabRowCount() {
		return this.getCurrTab().dataObj?.data.rowsRetrieved.getRows().length || 0
	}

	resetTabs() {
		this.tabs.forEach((tab) => {
			tab.reset()
		})
	}

	tabIdxRestore() {
		if (this.tabIdxRestoreVal !== undefined && this.tabIdxRestoreVal > -1) {
			this.tabIdxSet(this.tabIdxRestoreVal)
			this.tabIdxRestoreVal = undefined
		}
	}
	tabIdxSet(newIdx: number, setTabSet: boolean = false) {
		this.tabIdxCurrent = newIdx
	}
	tabInList(tab: AppLevelNode) {
		return (
			this.tabs.findIndex((t) => {
				return t.node.dataObjId === tab.node.dataObjId
			}) > -1
		)
	}
}

export class AppLevelCrumb {
	label: string
	tabIdx: number
	constructor(tabIdx: number, label: string) {
		this.label = label
		this.tabIdx = tabIdx
	}
}

export class AppLevelNode {
	dataObj?: DataObj = $state()
	dataObjSource: TokenApiDbDataObjSource
	isVirtual: boolean
	isRetrieved: boolean
	node: Node
	treeIdx: number
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'AppLevelNode'
		this.dataObj = obj.dataObj
		this.dataObjSource = obj.dataObjSource
		this.isRetrieved = booleanOrFalse(obj.isRetrieved)
		this.isVirtual = booleanOrFalse(obj.isVirtual)
		this.node = required(obj.node, clazz, 'node')
		this.treeIdx = required(obj.treeIdx, clazz, 'treeIdx')
	}

	detailGetDataRow(): DataRow | undefined {
		return this.dataObj?.data.rowsRetrieved.getDetailRow()
	}

	getCurrRecordValue(key: string) {
		if (this.dataObj) {
			if (this.dataObj.raw.codeCardinality === DataObjCardinality.list) {
				const idCurrent = this.parmsFormListGet(ParmsValuesType.listRecordIdCurrent)
				return this.dataObj.data.rowsRetrieved.getRowValueById(idCurrent, key)
			} else {
				return this.dataObj.data.rowsRetrieved.getDetailRecordValue(key)
			}
		}
		return undefined
	}

	hasDataObj() {
		const hasDatObj = !!(this.node.dataObjId || this.dataObj?.raw?.id)
		return hasDatObj
	}

	listCrumbLabelId() {
		let id = ''
		const crumbFieldNames: string[] = this.dataObj?.raw.crumbs ? this.dataObj?.raw.crumbs : []
		const idCurrent = this.parmsFormListGet(ParmsValuesType.listRecordIdCurrent)
		if (crumbFieldNames.length > 0 && idCurrent) {
			const dataRow = this.listGetDataRow()
			if (dataRow) {
				crumbFieldNames.forEach((f) => {
					const value = dataRow.getValue(f)
					if (value) {
						if (id) id += ' '
						id += getValueDisplay(value)
					}
				})
			}
		}
		return id ? `[${id}]` : ''
	}

	listGetDataRow() {
		const idCurrent = this.parmsFormListGet(ParmsValuesType.listRecordIdCurrent)
		const dataRows = this.listGetDataRows()
		const val =
			idCurrent && dataRows
				? dataRows.find((dataRow) => {
						return dataRow.record.id === idCurrent
					})
				: undefined
		return val
	}
	listGetDataRows(): DataRow[] | [] {
		let dataRows: DataRow[] = []
		const idList: string[] = this.parmsFormListGet(ParmsValuesType.listIds)
		if (idList) {
			idList.forEach((id) => {
				const dataRow = this.dataObj?.data.rowsRetrieved
					.getRows()
					.find((row) => row.record.id === id)
				if (dataRow) dataRows.push(dataRow)
			})
		}
		return dataRows
	}

	listGetRowIdx() {
		const idCurrent = this.parmsFormListGet(ParmsValuesType.listRecordIdCurrent)
		const dataRows = this.listGetDataRows()
		return idCurrent && dataRows
			? dataRows.findIndex((dataRow) => {
					return dataRow.record.id === idCurrent
				})
			: -1
	}
	listHasData() {
		return (
			this.dataObj?.data.rowsRetrieved.getRows().length &&
			this.dataObj?.data.rowsRetrieved.getRows().length > 0
		)
	}
	listRowStatus() {
		const idCurrent = this.parmsFormListGet(ParmsValuesType.listRecordIdCurrent)
		const listDataRows = this.listGetDataRows()
		if (listDataRows && idCurrent) {
			const rowIdx = listDataRows.findIndex((dataRow) => {
				return dataRow.record.id === idCurrent
			})
			if (rowIdx > -1) {
				return new AppLevelRowStatus(listDataRows.length, rowIdx)
			}
		}
	}
	listSetIdByAction(rowAction: AppRowActionType): MethodResult {
		const listDataRows = this.listGetDataRows()
		if (listDataRows) {
			const rowCount = listDataRows.length
			let rowIdx = this.listGetRowIdx()
			if (!rowCount || rowIdx < 0)
				return new MethodResult({
					error: {
						file: FILENAME,
						function: 'AppLevelTab.listSetIdByAction',
						msg: `Unable to determine current list row index for node: ${this.node.name}`
					}
				})

			switch (rowAction) {
				case AppRowActionType.first:
					rowIdx = 0
					break

				case AppRowActionType.left:
					rowIdx--
					break

				case AppRowActionType.right:
					rowIdx++
					break

				case AppRowActionType.last:
					rowIdx = rowCount - 1
					break

				default:
					error(500, {
						file: FILENAME,
						function: 'AppLevelTab.listSetIdByAction',
						msg: `No case defined for AppRowActionType: ${rowAction}`
					})
			}
			this.parmsFormListSet(ParmsValuesType.listRecordIdCurrent, listDataRows[rowIdx].record.id)
			return new MethodResult(rowIdx)
		}
		return new MethodResult({
			error: {
				file: FILENAME,
				function: 'AppLevelTab.listSetIdByAction',
				msg: `No listDataRows found for node: ${this.node.name}`
			}
		})
	}

	nodeIsDifferent(actionType: CodeActionType) {
		return this.node.id !== this.node.getNodeIdAction(actionType, NodeIdActionAlt.self)
	}

	async nodeRetrieve(actionType: CodeActionType): Promise<MethodResult> {
		return await getNodeByNodeId(this.node.getNodeIdAction(actionType, NodeIdActionAlt.self))
	}

	parmsFormList(): any {
		return this?.dataObj?.parmsFormList()
	}

	parmsFormListInit(parms: ParmsValuesFormListType) {
		this?.dataObj?.parmsFormListInit(parms)
	}

	parmsFormListGet(parm: ParmsValuesType): any {
		return this?.dataObj?.parmsFormListGet(parm)
	}

	parmsFormListSet(parm: ParmsValuesType, value: any) {
		this.dataObj?.parmsFormListSet(parm, value)
	}

	parmsFormListUpdate(listIds: string[], recordId: string, recordIdAlt: string = '') {
		this.parmsFormListInit({ listIds, listRecordIdCurrent: recordIdAlt ? recordIdAlt : recordId })
	}

	async query(sm: State, queryType: TokenApiQueryType): Promise<MethodResult> {
		let result: MethodResult = this.queryPre(sm, queryType)
		if (result.error) return result
		const tokenQuerySource: TokenApiQuerySource = result.data

		result = await this.queryExe(tokenQuerySource)
		if (result.error) alert(result.error.msgUser)
		return result
	}

	async queryDataObj(sm: State, queryType: TokenApiQueryType): Promise<MethodResult> {
		let result: MethodResult = await this.query(sm, queryType)
		if (result.error) return result
		const queryData: TokenApiQueryData = result.data

		// success
		let dataObjData: DataObjData = queryData.dataTab

		result = await DataObj.load(sm, dataObjData, queryType)
		if (result.error) return result
		this.dataObj = result.data as DataObj

		sm.triggerSave()

		return new MethodResult()
	}

	async queryExe(tokenQuerySource: TokenApiQuerySource): Promise<MethodResult> {
		const qmc = new QueryManagerClient(tokenQuerySource)
		if (qmc) {
			return await qmc.query()
		} else {
			return new MethodResult({
				error: {
					file: FILENAME,
					function: 'AppLevelTab.queryExe',
					msg: `Unable to create QueryManagerClient`
				}
			})
		}
	}

	queryPre(sm: State, queryType: TokenApiQueryType) {
		let evalExprContext = this.dataObj
			? this.dataObj?.raw.name
			: this.node.label
				? 'label: ' + this.node.label
				: this.node.dataObjId
					? 'id: ' + this.node.dataObjId
					: 'unknown'
		evalExprContext = 'dataObj-' + evalExprContext

		let result: MethodResult = this.queryPreData(sm, queryType, evalExprContext)
		if (result.error) return result

		const tokenQuerySource: TokenApiQuerySource = result.data
		return new MethodResult(tokenQuerySource)
	}

	queryPreData(sm: State, queryType: TokenApiQueryType, evalExprContext: string) {
		const isDataTreePresetOffset =
			queryType === TokenApiQueryType.preset &&
			this.node.codeComponent === NodeObjComponent.FormDetail
		const dataTree: TokenApiQueryDataTree = sm.getStateData(isDataTreePresetOffset)
		const rawQuerySource = this.dataObj ? this.dataObj.raw.rawQuerySource : new QuerySourceRaw({})

		sm.parmsState.valueSet(ParmsValuesType.systemIdQuerySource, sm.app.systemIdQuerySource)

		return new MethodResult(
			new TokenApiQuerySource({
				evalExprContext,
				queryType,
				sm,
				sourceQueryData: {
					dataTab: this?.dataObj ? this.dataObj.data : new DataObjData(),
					dataTree,
					node: this.node
				},
				sourceQuerySource: {
					...rawQuerySource,
					dataObjSource: this.queryPreDataSource(),
					querySourceType: QuerySourceType.dataObj
				}
			})
		)
	}

	queryPreDataSource() {
		let dataObjSource: TokenApiDbDataObjSource
		if (this.dataObjSource) {
			dataObjSource = this.dataObjSource
		} else {
			let sourceParms: DataRecord = {}
			sourceParms['dataObjId'] = strRequired(
				this.node.dataObjId ? this.node.dataObjId : this.dataObj?.raw?.id,
				`${FILENAME}.queryTypeTab.dataObjSource`,
				'dataObjId'
			)
			dataObjSource = new TokenApiDbDataObjSource(sourceParms)
			if (this.dataObj) {
				dataObjSource.updateReplacements({
					exprFilter: this?.dataObj?.raw?.rawQuerySource.exprFilter
				})
			}
		}

		return dataObjSource
	}

	async querySelectList(sm: State): Promise<MethodResult> {
		if (this.node.selectListItems) {
			let result: MethodResult = await this.node.selectListItems.retrieve(sm)
			if (result.error) return result
		}
		return new MethodResult()
	}

	async queryTab(sm: State, queryType: TokenApiQueryType): Promise<MethodResult> {
		if (this.node.dataObjId) {
			let result: MethodResult = await this.queryDataObj(sm, queryType)
			if (result.error) return result
		}
		if (this.node.selectListItems) {
			let result: MethodResult = await this.querySelectList(sm)
			if (result.error) return result
		}
		return new MethodResult()
	}

	reset() {
		this.isRetrieved = false
	}

	update(dataObj: DataObj) {
		this.dataObj = dataObj
	}
}

export class AppLevelRowStatus {
	rowCount: number
	rowCurrentDisplay: number
	show: boolean = false
	status: string = ''
	constructor(rowCount: number, rowIdx: number) {
		this.rowCount = rowCount
		this.rowCurrentDisplay = rowIdx + 1
		if (this.rowCount > 1 && this.rowCurrentDisplay > 0) {
			this.status = '[' + this.rowCurrentDisplay + ' of ' + this.rowCount + ']'
			this.show = true
		}
	}
}

export class AppLevelRowStatusDialog extends AppLevelRowStatus {}

export enum AppRowActionType {
	first = 'first',
	left = 'left',
	right = 'right',
	last = 'last'
}

export async function getNodeByNodeId(nodeId: string) {
	return await apiFetchFunction(ApiFunction.dbGelGetNodeByNodeId, new TokenApiId(nodeId))
}

export async function getNodeByNodeName(nodeName: string) {
	return await apiFetchFunction(ApiFunction.dbGelGetNodeByNodeName, new TokenApiId(nodeName))
}

async function getNodesChildren(nodeId: string) {
	const result: MethodResult = await apiFetchFunction(
		ApiFunction.dbGelGetNodesChildren,
		new TokenApiId(nodeId)
	)
	if (result.error) return result
	const rawData: any = result.data
	const children: any[] = rawData._children.map((c: any) => {
		return c._node
	})
	return new MethodResult(children)
}

export class AppTree {
	crumbs: any[] = []
	levels: AppLevel[] = $state([])
	constructor(level: AppLevel) {
		this.levels.push(level)
	}

	getCurrLevel() {
		return this.levels[this.levels.length - 1]
	}
	getCurrLevelActions() {
		const level = this.getCurrLevel()
		const dataObj = level ? level.getCurrTab().dataObj : undefined
		return dataObj ? dataObj.userActions : []
	}
	getCurrTab() {
		const currLevel = this.getCurrLevel()
		if (currLevel) return currLevel.getCurrTab()
	}

	getDataTree(isDataTreePresetOffset: boolean = false): TokenApiQueryDataTree {
		const clazz = 'getDataTree'
		let dataTree = new TokenApiQueryDataTree()
		const offset = isDataTreePresetOffset ? 1 : 0
		const levelCnt = this.levels.length - offset

		for (let i = 0; i < this.levels.length - offset; i++) {
			const level = this.levels[i]
			const currTab = level.getCurrTab()
			if (currTab.dataObj) {
				const dataRow: DataRow | undefined =
					currTab.dataObj.raw.codeCardinality === DataObjCardinality.list
						? currTab.listGetDataRow()
						: currTab.detailGetDataRow()
				if (dataRow) {
					const tableRootName = required(
						currTab.dataObj.raw.tableGroup.getTableName(0),
						clazz,
						'tableRootName'
					)
					dataTree.addLevel(dataRow, currTab.dataObj.raw.id, tableRootName, currTab.node.name)
				}
			}
		}
		return dataTree
	}

	getLevel(levelIdx: number) {
		if (levelIdx === 0) {
			return this.levels[0]
		} else if (levelIdx < 0 || levelIdx >= this.levels.length) {
			return undefined
		} else {
			return this.levels[levelIdx]
		}
	}
	getCurrTabParentLevel() {
		return this.getLevel(this.levels.length - 2)
	}
	getCurrTabParentTab() {
		const level = this.getCurrTabParentLevel()
		return level ? level.getCurrTab() : undefined
	}
	getRootTab() {
		const level = this.getCurrLevel()
		return level ? level.tabs[0] : undefined
	}

	levelAdd(tabs: AppLevelNode[], isVirtual: boolean = false) {
		this.levels.push(new AppLevel(tabs, isVirtual))
	}

	async levelPop(sm: State): Promise<MethodResult> {
		this.levels.pop()
		if (this.levels.length === 0) {
			return await sm.triggerAction(
				new TokenAppStateTriggerAction({
					codeAction: CodeAction.init(
						CodeActionClass.ct_sys_code_action_class_nav,
						CodeActionType.navDestination
					),
					data: { token: new TokenAppNav({ _codeDestinationType: NavDestinationType.home }) }
				})
			)
		} else {
			const currLevel = this.getCurrLevel()
			if (currLevel) {
				await sm.triggerAction(
					new TokenAppStateTriggerAction({
						codeAction: CodeAction.init(
							CodeActionClass.ct_sys_code_action_class_nav,
							CodeActionType.navNode
						)
					})
				)
			}
			return new MethodResult()
		}
	}

	leveUpdate(tabs: AppLevelNode[]) {
		this.levels[this.levels.length - 1] = new AppLevel(tabs)
	}

	async navDestination(sm: State, token: TokenAppNav): Promise<MethodResult> {
		switch (token.codeDestinationType) {
			case NavDestinationType.back:
				return await this.navDestinationBack(sm, token)
			case NavDestinationType.nodeBack:
				return await this.navDestinationNodeBack(sm, token)
			default:
				return new MethodResult({
					error: {
						file: FILENAME,
						function: 'AppTree.navDestination',
						msg: `No case defined for NavDestinationType: ${token.codeDestinationType}`
					}
				})
		}
	}

	async navDestinationBack(sm: State, token: TokenAppNav): Promise<MethodResult> {
		for (let i = 0; i < token.backCount; i++) {
			const currLevel = this.getCurrLevel()
			if (currLevel) {
				if (currLevel.tabIdxCurrent > 0) {
					currLevel.tabIdxSet(0, true)
				} else {
					await this.levelPop(sm)
				}
			}
		}
		return new MethodResult()
	}

	async navDestinationNodeBack(sm: State, token: TokenAppNav): Promise<MethodResult> {
		const clazz = 'AppTree.navDestinationNodeBack'
		let levelIdx = this.levels.length - 1
		while (levelIdx > -1) {
			const currLevel = this.getCurrLevel()
			if (currLevel) {
				const currTab = currLevel.getCurrTab()
				const currNode = currTab.node
				if (currNode.name === token.nodeDestination) {
					currLevel.tabIdxSet(0, true)
					return new MethodResult()
				}
			}
			const result: MethodResult = await this.levelPop(sm)
			if (result.error) return result
			levelIdx--
		}
		return new MethodResult({
			error: {
				file: FILENAME,
				function: 'AppTree.navDestinationNodeBack',
				msg: `Node not in tree: ${token.nodeDestination}`
			}
		})
	}

	navCrumbsList() {
		this.crumbs = [new AppLevelCrumb(-1, 'Home')]
		this.levels.forEach((level, i) => {
			if (!level.isVirtual) {
				const parentLevel: AppLevel | undefined = i > 0 ? this.levels[i - 1] : undefined
				const tabRoot = level.tabs[0]
				this.crumbs.push(new AppLevelCrumb(0, level.getCrumbLabel(tabRoot, parentLevel)))
				if (level.tabIdxCurrent > 0) {
					const tabChild = level.tabs[level.tabIdxCurrent]
					if (!tabChild.isVirtual) {
						this.crumbs.push(new AppLevelCrumb(level.tabIdxCurrent, level.getCrumbLabel(tabChild)))
					}
				}
			}
		})
		return this.crumbs
	}

	async navRow(sm: State, token: TokenAppRow, app: App): Promise<MethodResult> {
		const clazz = 'App.navRow'
		const tabParent = this.getCurrTabParentTab()
		if (tabParent) {
			let result: MethodResult = tabParent.listSetIdByAction(token.rowAction)
			if (result.error) return result

			if (tabParent.node.codeNodeType === NodeType.nodeObjConfigList) {
				result = await app.treeNodeChildrenTabsTypeNodeObjConfigList(
					sm,
					TokenApiQueryType.retrieve,
					tabParent
				)
				if (result.error) return result
				const tabs: AppLevelNode[] = result.data as AppLevelNode[]
				const currTree = app.getCurrTree()
				if (currTree) {
					currTree.leveUpdate(tabs)
					return new MethodResult()
				}
			} else {
				const currLevel = this.getCurrLevel()
				if (currLevel) {
					const currTab = currLevel.getCurrTab()
					if (currTab) {
						if (currTab.dataObj?.raw.codeCardinality === DataObjCardinality.detail) {
							const listDataRow = tabParent.listGetDataRow()
							return await this.tabQueryDetailDataRow(sm, TokenApiQueryType.retrieve, listDataRow)
						} else {
							return await currTab.queryTab(sm, TokenApiQueryType.retrieve)
						}
					}
				}
			}
		}
		return new MethodResult({
			error: {
				file: FILENAME,
				function: 'App.navRow',
				msg: `No parent tab`
			}
		})
	}

	navRowStatus() {
		const parentLevel = this.getCurrTabParentLevel()
		if (parentLevel) {
			const currTab = parentLevel.getCurrTab()
			return currTab ? currTab.listRowStatus() : undefined
		}
	}
	async navTab(sm: State, token: TokenAppTab): Promise<MethodResult> {
		const currLevel = this.getCurrLevel()
		if (currLevel) {
			currLevel.tabIdxSet(token.index)
			const currTab = currLevel.getCurrTab()
			if (!currTab.isRetrieved) {
				return await currTab.queryDataObj(sm, TokenApiQueryType.retrieve)
			}
		}
		return new MethodResult()
	}

	async saveDetail(sm: State, codeActionType: CodeActionType): Promise<MethodResult> {
		const clazz = `${FILENAME}.saveDetail`
		const currTab = this.getCurrTab()
		let result: MethodResult

		if (currTab && currTab.dataObj && sm.dm) {
			currTab.dataObj.data = sm.dm.getDataSave()
			let tabParent = this.getCurrTabParentTab()

			if (tabParent && tabParent.dataObj) {
				switch (codeActionType) {
					case CodeActionType.doDetailDelete:
						if (currTab.dataObj.data.rowsRetrieved.getDetailRowStatusIs(DataRecordStatus.preset)) {
							if (!tabParent || !tabParent.listHasData()) {
								result = await this.levelPop(sm)
								if (result.error) return result
							} else {
								tabParent.parmsFormListSet(
									ParmsValuesType.listRecordIdCurrent,
									tabParent.parmsFormListGet(ParmsValuesType.listIds)[0]
								)
								result = await this.tabQueryDetailDataRow(
									sm,
									TokenApiQueryType.retrieve,
									tabParent.listGetDataRow()
								)
								if (result.error) return result
							}
						} else {
							currTab.dataObj.data.rowsSave.setDetailRecordStatus(DataRecordStatus.delete)
							let recordIdOld = currTab.dataObj.data.rowsRetrieved.getDetailRecordValue('id')
							let recordIdNew = ''

							let listIds: string[] = tabParent.parmsFormListGet(ParmsValuesType.listIds)
							if (listIds.length > 1) {
								let idx = listIds.findIndex((id: string) => id === recordIdOld)
								idx = idx === 0 ? 1 : idx - 1
								recordIdNew = listIds[idx]

								result = await this.tabQueryDetailData(
									sm,
									TokenApiQueryType.save,
									currTab.dataObj.data
								)
								if (result.error) return result

								result = await tabParent.queryDataObj(sm, TokenApiQueryType.retrieve)
								if (result.error) return result

								tabParent.parmsFormListUpdate(
									listIds.filter((id) => id !== recordIdOld),
									recordIdOld,
									recordIdNew
								)

								result = await this.tabQueryDetailDataRow(
									sm,
									TokenApiQueryType.retrieve,
									tabParent.listGetDataRow()
								)
								if (result.error) return result
							} else {
								result = await this.tabQueryDetailData(
									sm,
									TokenApiQueryType.save,
									currTab.dataObj.data
								)
								if (result.error) return result

								result = await tabParent.queryDataObj(sm, TokenApiQueryType.retrieve)
								if (result.error) return result

								result = await this.levelPop(sm)
								if (result.error) return result
							}
						}
						break

					case CodeActionType.doDetailSave:
						result = await this.tabQueryDetailData(sm, TokenApiQueryType.save, currTab.dataObj.data)
						if (result.error) return result

						if (currTab.nodeIsDifferent(CodeActionType.doListDetailEdit)) {
							result = await currTab.nodeRetrieve(CodeActionType.doListDetailEdit)
							if (result.error) return result
							result = await this.tabQueryDetailData(
								sm,
								TokenApiQueryType.retrieve,
								currTab.dataObj.data
							)
							if (result.error) return result
						}

						// if parent list exists, retrieve
						tabParent = this.getCurrTabParentTab()
						const currLevel = this.getCurrLevel()
						if (
							tabParent?.dataObj?.raw.codeCardinality === DataObjCardinality.list &&
							currLevel?.tabIdxCurrent === 0
						) {
							let listIdsPre: string[] = tabParent.parmsFormListGet(ParmsValuesType.listIds)
							result = await tabParent.queryDataObj(sm, TokenApiQueryType.retrieve)
							if (result.error) return result

							// update parmsFormList
							const detailIdCurrent = currTab.dataObj.data.rowsRetrieved.getDetailRecordValue('id')
							const listIdsRetrieved = tabParent.parmsFormListGet(ParmsValuesType.listIds)
							const listIdsPost: string[] = listIdsRetrieved.reduce((acc: string[], id: string) => {
								if (listIdsPre.includes(id) || id === detailIdCurrent) acc.push(id)
								return acc
							}, [])
							tabParent.parmsFormListInit({
								listIds: listIdsPost,
								listRecordIdCurrent: detailIdCurrent
							})
						}
						break

					default:
						error(500, {
							file: FILENAME,
							function: 'App.detailUpdate',
							msg: `No case defined for codeActionType: ${codeActionType}`
						})
				}
			} else {
				// no parent tab (orphan detail record)
				switch (codeActionType) {
					case CodeActionType.doDetailDelete:
						// <todo> - 241019 - this path must be tested - only example "My Account" which doesn't have Delete option
						if (!currTab.dataObj.data.rowsRetrieved.getDetailRowStatusIs(DataRecordStatus.preset)) {
							currTab.dataObj.data.rowsSave.setDetailRecordStatus(DataRecordStatus.delete)
							result = await this.tabQueryDetailData(
								sm,
								TokenApiQueryType.save,
								currTab.dataObj.data
							)
							if (result.error) return result
						}

						result = await this.levelPop(sm)
						if (result.error) return result
						break

					case CodeActionType.doDetailSave:
						result = await this.tabQueryDetailData(sm, TokenApiQueryType.save, currTab.dataObj.data)
						if (result.error) return result
						break

					default:
						return new MethodResult({
							error: {
								file: FILENAME,
								function: 'App.detailUpdate',
								msg: `No case defined for codeActionType: ${codeActionType}`
							}
						})
				}
			}
		}
		return new MethodResult()
	}

	async saveList(sm: State): Promise<MethodResult> {
		const currTab = this.getCurrTab()
		if (currTab && currTab.dataObj && sm.dm) {
			currTab.dataObj.data = sm.dm.getDataSave()
			return await currTab.queryDataObj(sm, TokenApiQueryType.save)
		}
		return new MethodResult({
			error: {
				file: FILENAME,
				function: 'App.saveList',
				msg: `No current tab and dataObj`
			}
		})
	}

	async tabDuplicate(sm: State, token: TokenAppActionTrigger) {
		const currTab = this.getCurrTab()
		if (currTab) {
			currTab.dataObj = token.dataObj
			currTab.dataObj.data.rowsRetrieved.setDetailRecordStatus(DataRecordStatus.preset)
		}
		return this
	}

	async tabQueryDetailData(
		sm: State,
		queryType: TokenApiQueryType,
		data: DataObjData
	): Promise<MethodResult> {
		const currLevel = this.getCurrLevel()
		if (currLevel) {
			currLevel.resetTabs()
			const currTab = currLevel.getCurrTab()
			if (currTab.dataObj) {
				currTab.dataObj.data = data
				return await currTab.queryDataObj(sm, queryType)
			}
		}
		return new MethodResult({
			error: {
				file: FILENAME,
				function: 'App.tabQueryDetailData',
				msg: `No current level/tab`
			}
		})
	}

	async tabQueryDetailDataRow(
		sm: State,
		queryType: TokenApiQueryType,
		dataRow?: DataRow
	): Promise<MethodResult> {
		const currLevel = this.getCurrLevel()
		if (currLevel) {
			const currTab = currLevel.getCurrTab()
			if (currTab.dataObj && dataRow) {
				currTab.dataObj.data.rowsRetrieved.setDetailDataRow(dataRow)
				return this.tabQueryDetailData(sm, queryType, currTab.dataObj.data)
			}
		}
		return new MethodResult({
			error: {
				file: FILENAME,
				function: 'App.tabQueryDetailDataRow',
				msg: `No current level/tab/dataRow`
			}
		})
	}

	virtualModalLevelAdd(dataObjEmbed: DataObj, treeIdx: number) {
		if (this.levels.length > 0) {
			const idxLevelCurr = this.levels.length - 1
			const idxTabNew = this.levels[idxLevelCurr].tabs.length
			const tabNew = new AppLevelNode({
				node: new NodeEmbed({
					_codeComponent: NodeObjComponent.FormList,
					_ownerId: '',
					label: dataObjEmbed.raw.header
				}),
				dataObj: dataObjEmbed,
				isVirtual: true,
				treeIdx
			})
			this.levels[idxLevelCurr].tabIdxRestoreVal = this.levels[idxLevelCurr].tabIdxCurrent
			this.levels[idxLevelCurr].tabIdxSet(idxTabNew)
			this.levels[idxLevelCurr].tabs.push(tabNew)
		}
	}
	virtualModalLevelRestore() {
		this.levels = this.levels.filter((level) => !level.isVirtual)
		this.levels.forEach((level) => {
			level.tabs = level.tabs.filter((tab) => !tab.isVirtual)
		})
		const idxLevel = this.levels.length - 1
		if (idxLevel >= 0) this.levels[idxLevel].tabIdxRestore()
	}
}

interface NodeEmbedParms {
	_codeComponent: NodeObjComponent
	_ownerId: string
	dataObjSource: TokenApiDbDataObjSource
	treeIdx: number
}
interface NodeEmbedParmsField extends NodeEmbedParms {
	dataObjId: string
}
interface NodeEmbedParmsVirtual extends NodeEmbedParms {
	dataObj: DataObj
}
