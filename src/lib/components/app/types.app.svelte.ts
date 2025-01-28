import {
	CodeAction,
	CodeActionClass,
	CodeActionType,
	ContextKey,
	booleanOrFalse,
	DataManager,
	DataObj,
	DataObjCardinality,
	DataObjData,
	type DataRecord,
	DataRecordStatus,
	DataRow,
	Node,
	NodeType,
	ParmsValuesType,
	required,
	ResponseBody,
	strRequired,
	valueOrDefault
} from '$utils/types'
import { apiFetch, ApiFunction } from '$routes/api/api'
import {
	TokenApiDbDataObjSource,
	TokenApiBlobAction,
	TokenApiId,
	TokenApiQuery,
	TokenApiQueryDataTree,
	TokenApiQueryType,
	TokenAppIndex,
	TokenAppDoQuery,
	TokenAppDo,
	TokenAppModalEmbedField,
	TokenAppNode,
	TokenAppRow,
	TokenAppStateTriggerAction,
	TokenAppTab,
	TokenAppUserActionConfirmType
} from '$utils/types.token'
import {
	FieldEmbedListConfig,
	FieldEmbedListEdit,
	FieldEmbedListSelect
} from '$comps/form/fieldEmbed'
import { FieldEmbedShell } from '$comps/form/fieldEmbedShell'
import { queryTypeTab } from '$comps/app/types.appQuery'
import { State } from '$comps/app/types.appState.svelte'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/nav/types.app.ts'

export class App {
	isMultiTree: boolean
	treeLevelIdxCurrent: number = -1
	treeLevels: AppTree[] = $state([])
	// treeLevels: AppTree[] = []
	constructor(obj: any = {}) {
		this.isMultiTree = booleanOrFalse(obj.isMultiTree, 'isMultiTree')
	}

	async addLevelEmbedField(sm: State, token: TokenApiQuery) {
		const newTab = new AppLevelTab({
			data: token.queryData.dataTab,
			dataObjSource: token.dataObjSource,
			treeLevelIdx: this.treeLevelIdxCurrent
		})
		await queryTypeTab(sm, newTab, token.queryType)
		this.levelAdd([newTab])
	}

	async addLevelEmbedShell(fieldShell: FieldEmbedShell) {
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

	async addLevelModalEmbedField(sm: State, token: TokenAppModalEmbedField) {
		const newTab = new AppLevelTab({
			dataObjId: token.dataObjSourceModal.sources.dataObjId,
			dataObjSource: token.dataObjSourceModal,
			label: 'modalEmbedField',
			treeLevelIdx: this.treeLevelIdxCurrent
		})
		await queryTypeTab(sm, newTab, token.queryType)
		this.levelAdd([newTab], true)
	}

	async addTreeDataObj(sm: State, token: TokenAppDoQuery) {
		const newTab = new AppLevelTab({
			dataObjId: await token.getDataObjId(),
			treeLevelIdx: this.treeLevels.length
		})
		await queryTypeTab(sm, newTab, token.queryType)
		this.addTreeLevel([newTab])
	}

	async addTreeLevel(tabs: AppLevelTab[]) {
		const newLevel = new AppLevel(tabs)
		const newTree = new AppTree(newLevel)
		const treeLevelIdx = this.setTreeLevelIdxCurrent(this.treeLevels.push(newTree) - 1)
		return treeLevelIdx
	}

	async addTreeNode(sm: State, token: TokenAppNode) {
		let newTab = new AppLevelTab({
			...this.addTreeNodeParmsList(token.node, this.treeLevels.length)
		})
		await queryTypeTab(sm, newTab, TokenApiQueryType.retrieve)
		this.addTreeLevel([newTab])
	}

	async addTreeNodeChildren(sm: State, token: TokenAppDo, queryType: TokenApiQueryType) {
		const clazz = 'addLevelNodeChildren'
		const currTreeLevel = this.getCurrTreeLevel()
		if (currTreeLevel) {
			const currTab = currTreeLevel.getCurrTab()
			if (currTab) {
				currTab.dataObj = token.dataObj

				// new level
				const tabs: AppLevelTab[] = []
				const currLevel = currTreeLevel.getCurrLevel()
				if (currLevel) {
					const nodeIdParent = strRequired(
						currLevel.getCurrTab().nodeIdParent,
						clazz,
						'nodeIdParent'
					)
					const rawNodes: {
						root: any[]
						children: any[]
					} = await getNodesLevel(nodeIdParent)

					if (rawNodes.root.length === 1) {
						// create root tab - detail
						const nodeLevelRootDetail = new Node(rawNodes.root[0])
						let nodeParms: DataRecord = {
							dataObjId: nodeLevelRootDetail.dataObjId,
							// dataObjId: currTab.dataObjIdChild,
							isAlwaysRetrieveData: nodeLevelRootDetail.isAlwaysRetrieveData,
							isProgramObject: nodeLevelRootDetail.type === NodeType.program_object,
							label: nodeLevelRootDetail.label,
							treeLevelIdx: currTab.treeLevelIdx
						}
						let newTab = new AppLevelTab(nodeParms)
						await queryTypeTab(sm, newTab, queryType)
						tabs.push(newTab)

						// add children - lists
						rawNodes.children.forEach((n) => {
							tabs.push(
								new AppLevelTab(this.addTreeNodeParmsList(new Node(n), currTab.treeLevelIdx))
							)
						})

						// create new level with tabs
						currTreeLevel.levelAdd(tabs)
					}
				}
			}
		}
	}
	addTreeNodeParmsList(node: Node, treeLevelIdx: number) {
		return {
			dataObjId: node.dataObjId,
			dataObjIdChild: node.dataObjIdChild,
			isAlwaysRetrieveData: node.isAlwaysRetrieveData,
			isHideRowManager: node.isHideRowManager,
			label: node.label,
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
		return this.treeLevelIdxCurrent >= 0 ? this.treeLevels[this.treeLevelIdxCurrent] : undefined
	}
	getDataTree(offset: number) {
		const treeLevel = this.getCurrTreeLevel()
		if (treeLevel) {
			return treeLevel.getDataTree(offset)
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
	levelPop(sm: State) {
		this.getCurrTreeLevel()?.levelPop(sm)
	}
	async navBack(sm: State, backCnt: number) {
		await this.getCurrTreeLevel()?.navBack(sm, backCnt)
	}
	navCrumbsList() {
		return this.getCurrTreeLevel()?.navCrumbsList()
	}
	async navCrumbs(sm: State, token: TokenAppIndex) {
		this.getCurrTreeLevel()?.navCrumbs(sm, token)
	}
	navRowStatus() {
		return this.getCurrTreeLevel()?.navRowStatus()
	}
	async navTab(sm: State, token: TokenAppTab) {
		await this.getCurrTreeLevel()?.navTab(sm, token)
	}
	async rowUpdate(sm: State, token: TokenAppRow) {
		await this.getCurrTreeLevel()?.rowUpdate(sm, token)
	}

	async saveDetail(sm: State, codeActionType: CodeActionType, token: TokenAppDo) {
		return await this.getCurrTreeLevel()?.saveDetail(sm, codeActionType, token)
	}
	async saveList(sm: State) {
		await this.getCurrTreeLevel()?.saveList(sm)
	}

	setTreeLevelIdxCurrent(treeLevelIdx: number) {
		this.treeLevelIdxCurrent = treeLevelIdx
		return treeLevelIdx
	}
	async tabDuplicate(sm: State, token: TokenAppDo) {
		await this.getCurrTreeLevel()?.tabDuplicate(sm, token)
	}

	virtualModalLevelAdd(dataObjEmbed: DataObj) {
		this.getCurrTreeLevel()?.virtualModalLevelAdd(dataObjEmbed)
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
	getCrumbLabel(tabIdx: number, parentLevel: AppLevel | undefined = undefined) {
		const clazz = 'AppLevel.getCrumbLabel'
		const label = this.tabs[tabIdx]?.dataObj?.raw?.header || this.tabs[tabIdx].label || 'unknown'
		if (!label) return ''
		const labelId = parentLevel ? parentLevel.getCurrTab().listCrumbLabelId() : ''
		// return label + labelId
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
	isHideRowManager: boolean
	isVirtual: boolean
	isProgramObject: boolean
	isRetrieved: boolean
	label?: string
	nodeIdParent?: string
	treeLevelIdx: number
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'AppLevelTab'
		this.dataObj = obj.dataObj
		this.dataObjId = obj.dataObjId
		this.dataObjIdChild = obj.dataObjIdChild
		this.dataObjSource = obj.dataObjSource
		this.isAlwaysRetrieveData = booleanOrFalse(obj.isAlwaysRetrieveData, 'isAlwaysRetrieveData')
		this.isHideRowManager = booleanOrFalse(obj.isHideRowManager, 'isHideRowManager')
		this.isProgramObject = booleanOrFalse(obj.isProgramObject, 'isProgramObject')
		this.isRetrieved = booleanOrFalse(obj.isRetrieved, 'isRetrieved')
		this.isVirtual = booleanOrFalse(obj.isVirtual, 'isVirtual')
		this.label = obj.label
		this.nodeIdParent = obj.nodeIdParent
		this.treeLevelIdx = required(obj.treeLevelIdx, clazz, 'treeLevelIdx')
	}

	detailGetDataRow(): DataRow | undefined {
		return this.dataObj?.data.rowsRetrieved.getDetailRow()
	}
	listCrumbLabelId() {
		let id = ''
		const crumbFieldNames: Array<string> = this.dataObj?.raw.crumbs ? this.dataObj.raw.crumbs : []
		const idCurrent = this.dataObj?.data.parms.valueGet(ParmsValuesType.listRecordIdCurrent)
		if (crumbFieldNames.length > 0 && idCurrent) {
			const dataRow = this.listGetDataRow()
			if (dataRow) {
				crumbFieldNames.forEach((f) => {
					const value = dataRow.getValue(f)
					if (value) {
						if (id) id += ' '
						id += value
					}
				})
			}
		}
		return id ? `[${id}]` : ''
	}

	listGetDataRow() {
		const idCurrent = this.dataObj?.data.parms.valueGet(ParmsValuesType.listRecordIdCurrent)
		const dataRows = this.listGetDataRows()
		return idCurrent && dataRows
			? dataRows.find((dataRow) => {
					return dataRow.record.id === idCurrent
				})
			: undefined
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
						message: `No case defined for AppRowActionType: ${rowAction}`
					})
			}
			this.dataObj?.data.parms.valueSet(
				ParmsValuesType.listRecordIdCurrent,
				listDataRows[rowIdx].record.id
			)
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

async function getNodesLevel(nodeId: string) {
	const result: ResponseBody = await apiFetch(
		ApiFunction.dbEdgeGetNodesLevel,
		new TokenApiId(nodeId)
	)
	if (result.success) {
		return result.data
	} else {
		error(500, {
			file: FILENAME,
			function: 'getNodesLevel',
			message: `Error retrieving nodes for nodeId: ${nodeId}`
		})
	}
}

async function getBlobList() {
	const formData = new FormData()
	formData.set('fileAction', TokenApiBlobAction.list)
	const responsePromise: Response = await fetch('/api/vercel', {
		method: 'POST',
		body: formData
	})
	return await responsePromise.json()
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

	getDataTree(offset: number) {
		const clazz = 'getDataTree'
		let dataTree = new TokenApiQueryDataTree()
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
					const table = required(dataObjCurr.rootTable?.name, 'getDataTree', 'table')
					dataTree.upsertData(table, dataRow)
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
	levelPop(sm: State) {
		this.levels.pop()
		if (this.levels.length === 0) {
			sm.triggerAction(
				new TokenAppStateTriggerAction({
					codeAction: CodeAction.init(
						CodeActionClass.ct_sys_code_action_class_nav,
						CodeActionType.navHome
					),
					codeConfirmType: TokenAppUserActionConfirmType.statusChanged
				})
			)
		}
	}

	async navBack(sm: State, backCnt: number) {
		for (let i = 0; i < backCnt; i++) {
			const currLevel = this.getCurrLevel()
			if (currLevel) {
				if (currLevel.tabIdxCurrent > 0) {
					currLevel.tabIdxSet(0, true)
				} else {
					this.levelPop(sm)
				}
			}
		}
	}
	navCrumbsList() {
		this.crumbs = [new AppLevelCrumb(-1, 'Home')]
		this.levels.forEach((level, i) => {
			const parentLevel = i > 0 ? this.levels[i - 1] : undefined
			this.crumbs.push(new AppLevelCrumb(0, level.getCrumbLabel(0, parentLevel)))
			if (level.tabIdxCurrent > 0)
				this.crumbs.push(
					new AppLevelCrumb(level.tabIdxCurrent, level.getCrumbLabel(level.tabIdxCurrent))
				)
		})
		return this.crumbs
	}
	async navCrumbs(sm: State, token: TokenAppIndex) {
		const backCnt = this.crumbs.length - 1 - token.index
		this.navBack(sm, backCnt)
		return this
	}
	navRowStatus() {
		const parentLevel = this.getCurrTabParentLevel()
		if (parentLevel) {
			const currTab = parentLevel.getCurrTab()
			return currTab ? currTab.listRowStatus() : undefined
		}
	}
	async navTab(sm: State, token: TokenAppTab) {
		const currLevel = this.getCurrLevel()
		if (currLevel) {
			currLevel.tabIdxSet(token.index)
			const currTab = currLevel.getCurrTab()
			if (!currTab.isRetrieved) {
				await queryTypeTab(sm, currTab, TokenApiQueryType.retrieve)
			}
		}
	}

	async rowUpdate(sm: State, token: TokenAppRow) {
		const tabParent = this.getCurrTabParentTab()
		if (tabParent) {
			tabParent.listSetIdByAction(token.rowAction)
			await this.tabQueryDetailDataRow(sm, TokenApiQueryType.retrieve, tabParent.listGetDataRow())
		}
	}

	async saveDetail(sm: State, codeActionType: CodeActionType, token: TokenAppDo) {
		const clazz = `${FILENAME}.saveDetail`
		const currTab = this.getCurrTab()
		if (currTab && currTab.dataObj && sm.dm) {
			currTab.dataObj.data = sm.dm.getDataSave()
			const tabParent = this.getCurrTabParentTab()

			if (tabParent && tabParent.dataObj) {
				switch (codeActionType) {
					case CodeActionType.doDetailDelete:
						if (currTab.dataObj.data.rowsRetrieved.getDetailRowStatusIs(DataRecordStatus.preset)) {
							if (!tabParent || !tabParent.listHasData()) {
								this.levelPop(sm)
							} else {
								tabParent.dataObj.data.parms.valueSet(
									ParmsValuesType.listRecordIdCurrent,
									tabParent.dataObj.data.parms.valueGet(ParmsValuesType.listIds)[0]
								)
								await this.tabQueryDetailDataRow(
									sm,
									TokenApiQueryType.retrieve,
									tabParent.listGetDataRow()
								)
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

								if (
									!(await this.tabQueryDetailData(sm, TokenApiQueryType.save, currTab.dataObj.data))
								)
									return this
								await queryTypeTab(sm, tabParent, TokenApiQueryType.retrieve)
								tabParent.dataObj.data.parms.updateList(
									listIds.filter((id) => id !== recordIdOld),
									recordIdOld,
									recordIdNew
								)
								await this.tabQueryDetailDataRow(
									sm,
									TokenApiQueryType.retrieve,
									tabParent.listGetDataRow()
								)
							} else {
								if (
									!(await this.tabQueryDetailData(sm, TokenApiQueryType.save, currTab.dataObj.data))
								)
									return this
								await queryTypeTab(sm, tabParent, TokenApiQueryType.retrieve)
								this.levelPop(sm)
							}
						}
						break

					case CodeActionType.doDetailSave:
						if (!(await this.tabQueryDetailData(sm, TokenApiQueryType.save, currTab.dataObj.data)))
							return this

						// parent list
						const detailIdCurrent = currTab.dataObj.data.rowsRetrieved.getDetailRecordValue('id')
						let listIdsPre: string[] = tabParent.dataObj.data.parms.valueGet(
							ParmsValuesType.listIds
						)
						await queryTypeTab(sm, tabParent, TokenApiQueryType.retrieve)
						let listIdsPost: string[] = []
						tabParent.dataObj.data.parms.valueGet(ParmsValuesType.listIds).forEach((id: string) => {
							if (listIdsPre.includes(id) || id === detailIdCurrent) listIdsPost.push(id)
						})
						tabParent.dataObj.data.parms.updateList(
							listIdsPost,
							currTab.dataObj.data.rowsRetrieved.getDetailRecordValue('id')
						)
						break
					default:
						error(500, {
							file: FILENAME,
							function: 'App.detailUpdate',
							message: `No case defined for codeActionType: ${codeActionType}`
						})
				}
			} else {
				// no parent tab (orphan detail record)
				switch (codeActionType) {
					case CodeActionType.doDetailDelete:
						// <todo> - 241019 - this path must be tested - only example "My Account" which doesn't have Delete option
						if (!currTab.dataObj.data.rowsRetrieved.getDetailRowStatusIs(DataRecordStatus.preset)) {
							currTab.dataObj.data.rowsSave.setDetailRecordStatus(DataRecordStatus.delete)
							if (
								!(await this.tabQueryDetailData(sm, TokenApiQueryType.save, currTab.dataObj.data))
							)
								return this
						}
						this.levelPop(sm)
						break

					case CodeActionType.doDetailSave:
						if (!(await this.tabQueryDetailData(sm, TokenApiQueryType.save, currTab.dataObj.data)))
							return this
						break

					default:
						error(500, {
							file: FILENAME,
							function: 'App.detailUpdate',
							message: `No case defined for codeActionType: ${codeActionType}`
						})
				}
			}
		}
		return true
	}

	async saveList(sm: State) {
		const currTab = this.getCurrTab()
		if (currTab && currTab.dataObj && sm.dm) {
			currTab.dataObj.data = sm.dm.getDataSave()
			return await queryTypeTab(sm, currTab, TokenApiQueryType.save)
		}
	}

	async tabDuplicate(sm: State, token: TokenAppDo) {
		const currTab = this.getCurrTab()
		if (currTab) {
			currTab.dataObj = token.dataObj
			currTab.dataObj.data.rowsRetrieved.setDetailRecordStatus(DataRecordStatus.preset)
		}
		return this
	}

	async tabQueryDetailData(sm: State, queryType: TokenApiQueryType, data: DataObjData) {
		const currLevel = this.getCurrLevel()
		if (currLevel) {
			currLevel.resetTabs()
			const currTab = currLevel.getCurrTab()
			if (currTab.dataObj) {
				currTab.dataObj.data = data
				return await queryTypeTab(sm, currTab, queryType)
			}
		}
	}
	async tabQueryDetailDataRow(sm: State, queryType: TokenApiQueryType, dataRow?: DataRow) {
		const currLevel = this.getCurrLevel()
		if (currLevel) {
			const currTab = currLevel.getCurrTab()
			if (currTab.dataObj && dataRow) {
				currTab.dataObj.data.rowsRetrieved.setDetailDataRow(dataRow)
				return this.tabQueryDetailData(sm, queryType, currTab.dataObj.data)
			}
		}
	}

	virtualModalLevelAdd(dataObjEmbed: DataObj) {
		if (this.levels.length > 0) {
			const idxLevelCurr = this.levels.length - 1
			const idxTabNew = this.levels[idxLevelCurr].tabs.length
			const tabNew = new AppLevelTab({
				dataObj: dataObjEmbed,
				isVirtual: true,
				label: dataObjEmbed.raw.header
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
