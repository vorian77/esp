import { State } from '$comps/app/types.appState.svelte'
import { FieldEmbedShell } from '$comps/form/fieldEmbed'
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
	getValueDisplay,
	MethodResult,
	Node,
	NodeIdActionAlt,
	NodeQueryOwnerType,
	NodeType,
	ParmsValues,
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
	TokenApiQueryDataTreeAccessType,
	TokenApiQuerySource,
	TokenApiQueryType,
	TokenAppDo,
	TokenAppDoQuery,
	TokenAppModalEmbedField,
	TokenAppNav,
	TokenAppNode,
	TokenAppRow,
	TokenAppStateTriggerAction,
	TokenAppTab,
	TokenAppUserActionConfirmType
} from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/nav/types.app.ts'

export class App {
	isMultiTree: boolean
	treeLevels: AppTree[] = $state([])
	treeLevelsIdxCurrent: number = -1
	constructor(obj: DataRecord = {}) {
		this.isMultiTree = booleanOrFalse(obj.isMultiTree)
	}

	async addLevelEmbedFieldModal(sm: State, token: TokenAppModalEmbedField): Promise<MethodResult> {
		const newTab = new AppLevelTab({
			dataObjId: token.dataObjSourceModal.sources.dataObjId,
			dataObjSource: token.dataObjSourceModal,
			label: 'modalEmbedField',
			treeLevelIdx: this.treeLevelsIdxCurrent
		})
		let result: MethodResult = await newTab.query(sm, token.queryType)
		if (result.error) return result
		this.levelAdd([newTab], true)
		return result
	}

	async addLevelEmbedShellForm(fieldShell: FieldEmbedShell) {
		// build tabs
		let tabs: AppLevelTab[] = []
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

	async addTree(tabs: AppLevelTab[]) {
		const newLevel = new AppLevel(tabs)
		const newTree = new AppTree(newLevel)
		this.setTreeLevelIdxCurrent(this.treeLevels.push(newTree) - 1)
	}

	async addTreeDataObj(sm: State, token: TokenAppDoQuery): Promise<MethodResult> {
		const newTab = new AppLevelTab({
			dataObjId: await token.getDataObjId(),
			treeLevelIdx: this.treeLevels.length
		})
		let result: MethodResult = await newTab.query(sm, token.queryType)
		if (result.error) return result
		this.addTree([newTab])
		return result
	}

	async addTreeEmbedFieldModal(sm: State, token: TokenAppModalEmbedField): Promise<MethodResult> {
		const newTab = new AppLevelTab({
			dataObjId: token.dataObjSourceModal.sources.dataObjId,
			dataObjSource: token.dataObjSourceModal,
			label: 'modalEmbedField',
			treeLevelIdx: this.treeLevels.length
		})
		let result = await newTab.query(sm, token.queryType)
		if (result.error) return result
		this.addTree([newTab])
		return result
	}

	async addTreeNode(sm: State, token: TokenAppNode): Promise<MethodResult> {
		let newTab = new AppLevelTab({
			...this.addTreeNodeParmsList(token.node, false)
		})
		let result: MethodResult = await newTab.query(sm, token.queryType)
		if (result.error) return result
		this.addTree([newTab])
		return result
	}

	async addTreeNodeChildren(
		sm: State,
		token: TokenAppDo,
		queryType: TokenApiQueryType
	): Promise<MethodResult> {
		const clazz = 'addTreeNodeChildren'
		const currTreeLevel = this.getCurrTreeLevel()
		let result: MethodResult

		if (currTreeLevel) {
			const currTab = currTreeLevel.getCurrTab()
			if (currTab) {
				currTab.dataObj = token.dataObj

				if (queryType === TokenApiQueryType.preset) {
					currTab.dataObj.data.parms.valueSet(ParmsValuesType.listRecordIdCurrent, '')
				}

				// new level
				const tabs: AppLevelTab[] = []
				const nodeParent: Node = required(currTab.node, clazz, 'node')
				const nodeIdChild = nodeParent.getNodeIdAction(token.actionType, NodeIdActionAlt.firstChild)
				const nodeLevelRoot = new Node(await getNode(nodeIdChild))

				if (nodeLevelRoot) {
					// create root tab
					let nodeParms: DataRecord = {
						dataObjId: nodeLevelRoot.dataObjId,
						isAlwaysRetrieveData: nodeLevelRoot.isAlwaysRetrieveData,
						isProgramObject: nodeLevelRoot.type === NodeType.program_object,
						label: nodeLevelRoot.label,
						node: nodeLevelRoot,
						nodeIdParent: nodeLevelRoot.id,
						treeLevelIdx: currTab.treeLevelIdx
					}
					let newTab = new AppLevelTab(nodeParms)
					result = await newTab.query(sm, queryType)
					if (result.error) return result

					tabs.push(newTab)

					// add children - lists
					const nodeLevelChildrenRaw: any[] = await getNodesChildren(nodeLevelRoot.children)
					if (nodeLevelChildrenRaw && nodeLevelChildrenRaw.length > 0) {
						if (newTab.dataObj?.raw.codeCardinality === DataObjCardinality.detail) {
							nodeLevelChildrenRaw.forEach((n) => {
								tabs.push(new AppLevelTab(this.addTreeNodeParmsList(new Node(n), false)))
							})
						}
					}

					// create new level with tabs
					currTreeLevel.levelAdd(tabs)
					await this.addTreeNodeChildrenDynamic()
				}
			}
		}
		return new MethodResult()
	}

	async addTreeNodeChildrenDynamic() {
		const currTreeLevel = this.getCurrTreeLevel()
		if (currTreeLevel) {
			const tabParent = currTreeLevel.getCurrTabParentTab()
			if (tabParent && tabParent.node && tabParent.node.isDynamicChildrenSystemParents) {
				const listDataRow = tabParent.listGetDataRow()
				const systemId = listDataRow?.getValue('id') || ''

				const result: MethodResult = await apiFetchFunction(
					ApiFunction.dbGelGetNodesSystemParents,
					new TokenApiId(systemId)
				)
				const entitySystmesNodes: any[] = result.data

				const dynamicTabs: AppLevelTab[] = entitySystmesNodes.reduce((acc, n) => {
					acc.push(new AppLevelTab(this.addTreeNodeParmsList(new Node(n), true)))
					return acc
				}, [])

				const currLevel = currTreeLevel.getCurrLevel()
				currLevel.setDynamicTabs(dynamicTabs)
			}
		}
	}

	addTreeNodeParmsList(node: Node, isDynamic: boolean) {
		return {
			dataObjId: node.dataObjId,
			isAlwaysRetrieveData: node.isAlwaysRetrieveData,
			isDynamic,
			isHideRowManager: node.isHideRowManager,
			label: node.label,
			node: node,
			nodeIdParent: node.id,
			treeLevelIdx: this.treeLevels.length
		}
	}

	getLevel(levelIdx: number) {
		return this.getCurrTreeLevel()?.getLevel(levelIdx)
	}
	getCurrLevel() {
		return this.getCurrTreeLevel()?.getCurrLevel()
	}
	getCurrLevelActions() {
		return this.getCurrTreeLevel()?.getCurrLevelActions()
	}
	getCurrLevelsLength() {
		return this.getCurrTreeLevel()?.levels.length
	}

	getCurrTab() {
		return this.getCurrTreeLevel()?.getCurrTab()
	}
	getCurrTabParentLevel() {
		return this.getCurrTreeLevel()?.getCurrTabParentLevel()
	}
	getCurrTabParentTab() {
		return this.getCurrTreeLevel()?.getCurrTabParentTab()
	}
	getCurrTreeLevel() {
		return this.treeLevelsIdxCurrent >= 0 ? this.treeLevels[this.treeLevelsIdxCurrent] : undefined
	}

	getDataTree(queryType: TokenApiQueryType) {
		const treeLevel = this.getCurrTreeLevel()
		if (treeLevel) {
			return treeLevel.getDataTree(queryType)
		} else {
			return new TokenApiQueryDataTree()
		}
	}
	getRootTab() {
		return this.getCurrTreeLevel()?.getRootTab()
	}

	levelAdd(tabs: AppLevelTab[], isVirtual: boolean = false) {
		this.getCurrTreeLevel()?.levelAdd(tabs, isVirtual)
	}

	async navDestination(sm: State, token: TokenAppNav): Promise<MethodResult> {
		const currTreeLevel = this.getCurrTreeLevel()
		if (currTreeLevel) return await currTreeLevel.navDestination(sm, token)
		return new MethodResult({
			error: {
				file: FILENAME,
				function: 'App.navDestination',
				msg: `No current tree level`
			}
		})
	}

	navCrumbsList() {
		return this.getCurrTreeLevel()?.navCrumbsList()
	}

	async navRow(sm: State, token: TokenAppRow): Promise<MethodResult> {
		const currTreeLevel = this.getCurrTreeLevel()
		if (currTreeLevel) return currTreeLevel.navRow(sm, token, this)
		return new MethodResult({
			error: {
				file: FILENAME,
				function: 'App.navRow',
				msg: `No current tree level`
			}
		})
	}

	navRowStatus() {
		return this.getCurrTreeLevel()?.navRowStatus()
	}
	async navTab(sm: State, token: TokenAppTab): Promise<MethodResult> {
		const currTreeLevel = this.getCurrTreeLevel()
		if (currTreeLevel) return currTreeLevel.navTab(sm, token)
		return new MethodResult()
	}

	async saveDetail(sm: State, codeActionType: CodeActionType): Promise<MethodResult> {
		const level = this.getCurrTreeLevel()
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
		const currTreeLevel = this.getCurrTreeLevel()
		if (currTreeLevel) return await currTreeLevel.saveList(sm)
		return new MethodResult({
			error: {
				file: FILENAME,
				function: 'App.saveList',
				msg: `No current tree level`
			}
		})
	}

	setTreeLevelIdxCurrent(treeLevelIdx: number) {
		this.treeLevelsIdxCurrent = treeLevelIdx
		return treeLevelIdx
	}
	async tabDuplicate(sm: State, token: TokenAppDo) {
		await this.getCurrTreeLevel()?.tabDuplicate(sm, token)
	}

	virtualModalLevelAdd(dataObjEmbed: DataObj) {
		this.getCurrTreeLevel()?.virtualModalLevelAdd(dataObjEmbed, this.treeLevelsIdxCurrent)
	}
	virtualModalLevelRestore() {
		this.getCurrTreeLevel()?.virtualModalLevelRestore()
	}
}

export class AppLevel {
	isVirtual: boolean
	tabIdxCurrent: number
	tabIdxRestoreVal?: number
	tabs: AppLevelTab[] = $state([])
	constructor(tabs: AppLevelTab[], isVirtual: boolean = false) {
		this.isVirtual = isVirtual
		this.tabIdxCurrent = 0
		this.tabs = tabs
	}
	getCrumbLabel(tab: AppLevelTab, parentLevel: AppLevel | undefined = undefined) {
		const clazz = 'AppLevel.getCrumbLabel'
		const label = tab?.dataObj?.raw?.header || tab.label || 'unknown'
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

	setDynamicTabs(dynamicTabs: AppLevelTab[]) {
		const currTab = this.getCurrTab()
		if (
			currTab &&
			currTab.isDynamic &&
			-1 === dynamicTabs.findIndex((tab) => tab.dataObjId === currTab.dataObjId)
		) {
			this.tabIdxCurrent = 0
		}
		this.tabs = [
			...this.tabs.filter((tab) => {
				return !tab.isDynamic
			}),
			...dynamicTabs
		]
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
	tabInList(tab: AppLevelTab) {
		return (
			this.tabs.findIndex((t) => {
				return t.dataObjId === tab.dataObjId
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

export class AppLevelTab {
	dataObj?: DataObj = $state()
	dataObjId?: string
	dataObjIdChild?: string
	dataObjSource: TokenApiDbDataObjSource
	isAlwaysRetrieveData: boolean
	isDynamic: boolean
	isHideRowManager: boolean
	isVirtual: boolean
	isProgramObject: boolean
	isRetrieved: boolean
	label?: string
	node?: Node
	nodeIdParent?: string
	treeLevelIdx: number
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'AppLevelTab'
		this.dataObj = obj.dataObj
		this.dataObjId = obj.dataObjId
		this.dataObjIdChild = obj.dataObjIdChild
		this.dataObjSource = obj.dataObjSource
		this.isAlwaysRetrieveData = booleanOrFalse(obj.isAlwaysRetrieveData)
		this.isDynamic = booleanOrFalse(obj.isDynamic)
		this.isHideRowManager = booleanOrFalse(obj.isHideRowManager)
		this.isProgramObject = booleanOrFalse(obj.isProgramObject)
		this.isRetrieved = booleanOrFalse(obj.isRetrieved)
		this.isVirtual = booleanOrFalse(obj.isVirtual)
		this.label = obj.label
		this.node = obj.node
		this.nodeIdParent = obj.nodeIdParent
		this.treeLevelIdx = required(obj.treeLevelIdx, clazz, 'treeLevelIdx')
	}

	detailGetDataRow(): DataRow | undefined {
		return this.dataObj?.data.rowsRetrieved.getDetailRow()
	}

	getCurrRecordValue(key: string) {
		if (this.dataObj) {
			if (this.dataObj.raw.codeCardinality === DataObjCardinality.list) {
				const listRowIdx = this.listGetRowIdx()
				return this.dataObj.data.rowsRetrieved.getRowValue(listRowIdx, key)
			} else {
				return this.dataObj.data.rowsRetrieved.getDetailRecordValue(key)
			}
		}
		return undefined
	}

	listCrumbLabelId() {
		let id = ''
		const crumbFieldNames: string[] = this.dataObj?.raw.crumbs ? this.dataObj?.raw.crumbs : []
		const idCurrent = this.dataObj?.data.parms.valueGet(ParmsValuesType.listRecordIdCurrent)
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
		const idCurrent = this.dataObj?.data.parms.valueGet(ParmsValuesType.listRecordIdCurrent)
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
		const idList: string[] = this.dataObj?.data.parms.valueGet(ParmsValuesType.listIds)
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
		const idCurrent = this.dataObj?.data.parms.valueGet(ParmsValuesType.listRecordIdCurrent)
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
		const idCurrent = this.dataObj?.data.parms.valueGet(ParmsValuesType.listRecordIdCurrent)
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
	listSetIdByAction(rowAction: AppRowActionType) {
		const listDataRows = this.listGetDataRows()
		if (listDataRows) {
			const rowCount = listDataRows.length
			let rowIdx = this.listGetRowIdx()
			if (!rowCount || rowIdx < 0) return

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
			this.dataObj?.data.parms.valueSet(
				ParmsValuesType.listRecordIdCurrent,
				listDataRows[rowIdx].record.id
			)
		}
	}

	nodeIsDifferent(actionType: CodeActionType) {
		return this.node
			? this.node.id !== this.node.getNodeIdAction(actionType, NodeIdActionAlt.self)
			: false
	}

	async nodeRetrieve(actionType: CodeActionType) {
		if (this.node) {
			this.node = await getNode(this.node.getNodeIdAction(actionType, NodeIdActionAlt.self))
			error(500, {
				file: FILENAME,
				function: 'AppLevelTab.nodeRetrieve',
				msg: `No node defined for tab: ${this.label}`
			})
		}
	}

	async query(sm: State, queryType: TokenApiQueryType): Promise<MethodResult> {
		let result: MethodResult = this.queryPre(sm, queryType)
		if (result.error) return result
		const tokenQuerySource: TokenApiQuerySource = result.data

		result = await this.queryExe(tokenQuerySource)
		if (result.error) alert(result.error.msgUser)
		return result
	}

	async queryExe(tokenQuerySource: TokenApiQuerySource): Promise<MethodResult> {
		let result: MethodResult
		const qmc = new QueryManagerClient(tokenQuerySource)
		if (qmc) {
			result = await qmc.query()
			if (result.error) return result
		} else {
			return new MethodResult({
				error: {
					file: FILENAME,
					function: 'AppLevelTab.queryExe',
					msg: `Unable to create QueryManagerClient`
				}
			})
		}

		// successful
		const queryData: TokenApiQueryData = result.data
		result = DataObjData.load(queryData.dataTab)
		if (result.error) return result
		let dataObjData: DataObjData = result.data as DataObjData

		result = await DataObj.init(tokenQuerySource.sm, dataObjData, tokenQuerySource.queryType)
		if (result.error) return result
		this.dataObj = result.data as DataObj

		if (this.dataObj && this.dataObj.raw.codeCardinality === DataObjCardinality.list) {
			this.dataObj.data.parms.reset()
			this.dataObj.data.parms.valueSetList(
				ParmsValuesType.listIds,
				this.dataObj.data.rowsRetrieved.getRows()
			)
		}
		return new MethodResult()
	}

	queryPre(sm: State, queryType: TokenApiQueryType) {
		let evalExprContext = this.dataObj
			? this.dataObj?.raw.name
			: this.label
				? 'label: ' + this.label
				: this.dataObjId
					? 'id: ' + this.dataObjId
					: 'unknown'
		evalExprContext = 'dataObj-' + evalExprContext

		let result: MethodResult = this.queryPreData(sm, queryType, evalExprContext)
		if (result.error) return result

		const tokenQuerySource: TokenApiQuerySource = result.data
		return new MethodResult(tokenQuerySource)
	}

	queryPreData(sm: State, queryType: TokenApiQueryType, evalExprContext: string) {
		// dataTree
		const dataTree: TokenApiQueryDataTree = sm.app.getDataTree(queryType)
		sm.parmsState.valueSet(
			ParmsValuesType.listRecordIdCurrent,
			dataTree.getValue('id', TokenApiQueryDataTreeAccessType.index, 0)
		)

		if (this.dataObj?.data) this.queryPreOwnerId(sm, this.dataObj.data.parms)
		const rawQuerySource = this.dataObj ? this.dataObj.raw.rawQuerySource : new QuerySourceRaw({})

		return new MethodResult(
			new TokenApiQuerySource({
				evalExprContext,
				queryType,
				sm,
				sourceQueryData: {
					dataTab: this?.dataObj ? this.dataObj.data : new DataObjData(),
					dataTree
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
				this.dataObjId ? this.dataObjId : this.dataObj?.raw?.id,
				`${FILENAME}.quryTypeTab.dataObjSource`,
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

	queryPreOwnerId(sm: State, parms: ParmsValues) {
		const smSource = sm.stateRoot || sm
		const treeLevel = smSource.app.getCurrTreeLevel()
		if (treeLevel && treeLevel.levels.length > 0) {
			const rootTab = treeLevel.levels[0].getCurrTab()
			if (rootTab && rootTab.node) {
				if (rootTab.node.queryOwnerType === NodeQueryOwnerType.queryOwnerTypeOrgRecord) {
					parms.valueSet(ParmsValuesType.queryOwnerOrg, rootTab.getCurrRecordValue('id'))
				} else if (
					rootTab.node.queryOwnerType === NodeQueryOwnerType.queryOwnerTypeSystemApp &&
					rootTab.node.ownerId
				) {
					parms.valueSet(ParmsValuesType.queryOwnerSys, rootTab.node.ownerId)
				} else if (rootTab.node.queryOwnerType === NodeQueryOwnerType.queryOwnerTypeSystemRecord) {
					parms.valueSet(ParmsValuesType.queryOwnerSys, rootTab.getCurrRecordValue('id'))
				} else if (
					rootTab.node.queryOwnerType === NodeQueryOwnerType.queryOwnerTypeSystemUser &&
					smSource?.user?.systemIdCurrent
				) {
					parms.valueSet(ParmsValuesType.queryOwnerSys, smSource.user.systemIdCurrent)
				} else if (smSource?.user?.systemIdCurrent) {
					parms.valueSet(ParmsValuesType.queryOwnerSys, rootTab.node.ownerId)
				}
			}
		}
	}

	reset() {
		this.isRetrieved = false
	}
}

export enum AppRowActionType {
	first = 'first',
	left = 'left',
	right = 'right',
	last = 'last'
}

async function getNode(nodeId: string) {
	const result: MethodResult = await apiFetchFunction(
		ApiFunction.dbGelGetNode,
		new TokenApiId(nodeId)
	)
	return result.data
}

async function getNodesChildren(nodeIdList: string[]) {
	const result: MethodResult = await apiFetchFunction(
		ApiFunction.dbGelGetNodesChildren,
		new TokenApiIds(nodeIdList)
	)
	return result.data
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

	getDataTree(queryType: TokenApiQueryType) {
		const clazz = 'getDataTree'
		let dataTree = new TokenApiQueryDataTree()
		const offset = queryType === TokenApiQueryType.preset ? 1 : 0
		const levelCnt = this.levels.length - offset

		for (let i = 0; i < this.levels.length - offset; i++) {
			const level = this.levels[i]
			const currTab = level.getCurrTab()
			let dataObjCurr: DataObj | undefined = currTab.dataObj
			if (dataObjCurr) {
				const dataRow: DataRow | undefined =
					dataObjCurr.raw.codeCardinality === DataObjCardinality.list
						? currTab.listGetDataRow()
						: currTab.detailGetDataRow()
				if (dataRow) {
					const tableRootName = required(
						dataObjCurr.raw.tableGroup.getTableName(0),
						clazz,
						'tableRootName'
					)
					dataTree.addLevel(dataRow, tableRootName, currTab.node?.name)
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

	levelAdd(tabs: AppLevelTab[], isVirtual: boolean = false) {
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
					codeConfirmType: TokenAppUserActionConfirmType.statusChanged,
					data: {
						token: new TokenAppNav({ _codeDestinationType: NavDestinationType.home })
					}
				})
			)
		} else {
			const currLevel = this.getCurrLevel()
			if (currLevel) {
				const currTab = currLevel.getCurrTab()
				const nodeName = currTab.node?.name
				if (nodeName) {
					await sm.triggerAction(
						new TokenAppStateTriggerAction({
							codeAction: CodeAction.init(
								CodeActionClass.ct_sys_code_action_class_nav,
								CodeActionType.navNode
							)
						})
					)
				}
			}

			return new MethodResult()
		}
	}

	async navDestination(sm: State, token: TokenAppNav): Promise<MethodResult> {
		switch (token.codeDestinationType) {
			case NavDestinationType.back:
				return await this.navDestinationBack(sm, token)
			case NavDestinationType.nodeBack:
				return await this.navDestinationNodeBack(sm, token)
			case NavDestinationType.nodeForward:
				return await this.navDestinationNodeForward(sm, token)
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
					// return await this.levelPop(sm)
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
				const currNode = required(currTab.node, clazz, 'currTab.node')
				if (currNode) {
					if (currNode.name === token.nodeDestination) {
						currLevel.tabIdxSet(0, true)
						return new MethodResult()
					}
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

	async navDestinationNodeForward(sm: State, token: TokenAppNav): Promise<MethodResult> {
		return new MethodResult({
			error: {
				file: FILENAME,
				function: 'AppTree.navDestinationNodeForward',
				msg: `Feature not yet implemented`
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
		const tabParent = this.getCurrTabParentTab()
		if (tabParent) {
			tabParent.listSetIdByAction(token.rowAction)
			if (tabParent.node?.isDynamicChildrenSystemParents) {
				const tabCurrent = this.getCurrTab()
				if (tabCurrent) {
					await app.addTreeNodeChildrenDynamic()
					const currLevel = this.getCurrLevel()
					if (currLevel) {
						if (!currLevel.tabInList(tabCurrent)) {
							return await this.levelPop(sm)
						}
					}
				}
			}

			const currLevel = this.getCurrLevel()
			if (currLevel) {
				const currTab = currLevel.getCurrTab()
				if (currTab.dataObj?.raw.codeCardinality === DataObjCardinality.detail) {
					const listDataRow = tabParent.listGetDataRow()
					return await this.tabQueryDetailDataRow(sm, TokenApiQueryType.retrieve, listDataRow)
				} else {
					return await currTab.query(sm, TokenApiQueryType.retrieve)
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
				return await currTab.query(sm, TokenApiQueryType.retrieve)
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
								tabParent.dataObj.data.parms.valueSet(
									ParmsValuesType.listRecordIdCurrent,
									tabParent.dataObj.data.parms.valueGet(ParmsValuesType.listIds)[0]
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

							let listIds: string[] = tabParent.dataObj.data.parms.valueGet(ParmsValuesType.listIds)
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

								result = await tabParent.query(sm, TokenApiQueryType.retrieve)
								if (result.error) return result

								tabParent.dataObj.data.parms.updateList(
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

								result = await tabParent.query(sm, TokenApiQueryType.retrieve)
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
							await currTab.nodeRetrieve(CodeActionType.doListDetailEdit)
							result = await this.tabQueryDetailData(
								sm,
								TokenApiQueryType.retrieve,
								currTab.dataObj.data
							)
							if (result.error) return result
						}

						// if parent list exists, retrieve
						tabParent = this.getCurrTabParentTab()
						if (tabParent?.dataObj?.raw.codeCardinality === DataObjCardinality.list) {
							const detailIdCurrent = currTab.dataObj.data.rowsRetrieved.getDetailRecordValue('id')
							let listIdsPre: string[] = tabParent.dataObj.data.parms.valueGet(
								ParmsValuesType.listIds
							)
							result = await tabParent.query(sm, TokenApiQueryType.retrieve)
							if (result.error) return result

							// set list record id
							tabParent.dataObj.data.parms.valueSet(
								ParmsValuesType.listRecordIdCurrent,
								detailIdCurrent
							)

							// set list ids
							let listIdsPost: string[] = []
							tabParent.dataObj.data.parms
								.valueGet(ParmsValuesType.listIds)
								.forEach((id: string) => {
									if (listIdsPre.includes(id) || id === detailIdCurrent) listIdsPost.push(id)
								})
							tabParent.dataObj.data.parms.updateList(
								listIdsPost,
								currTab.dataObj.data.rowsRetrieved.getDetailRecordValue('id')
							)
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
			return await currTab.query(sm, TokenApiQueryType.save)
		}
		return new MethodResult({
			error: {
				file: FILENAME,
				function: 'App.saveList',
				msg: `No current tab and dataObj`
			}
		})
	}

	async tabDuplicate(sm: State, token: TokenAppDo) {
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
				return await currTab.query(sm, queryType)
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

	virtualModalLevelAdd(dataObjEmbed: DataObj, treeLevelIdx: number) {
		if (this.levels.length > 0) {
			const idxLevelCurr = this.levels.length - 1
			const idxTabNew = this.levels[idxLevelCurr].tabs.length
			const tabNew = new AppLevelTab({
				dataObj: dataObjEmbed,
				isVirtual: true,
				label: dataObjEmbed.raw.header,
				treeLevelIdx
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
