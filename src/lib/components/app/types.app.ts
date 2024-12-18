import {
	booleanOrFalse,
	DataObj,
	DataObjData,
	DataRecordStatus,
	DataRow,
	Node,
	NodeType,
	ParmsValuesType,
	ResponseBody,
	strRequired,
	valueOrDefault
} from '$utils/types'
import type { DataRecord } from '$utils/types'
import { apiFetch, ApiFunction } from '$routes/api/api'
import {
	TokenApiDbDataObjSource,
	TokenApiBlobAction,
	TokenApiId,
	TokenApiQueryType,
	TokenApiQuery,
	TokenAppIndex,
	TokenAppDo,
	TokenAppDoActionConfirmType,
	TokenAppModalEmbedField,
	TokenAppNode,
	TokenAppRow,
	TokenAppTab
} from '$utils/types.token'
import {
	FieldEmbedListConfig,
	FieldEmbedListEdit,
	FieldEmbedListSelect
} from '$comps/form/fieldEmbed'
import { FieldEmbedShell } from '$comps/form/fieldEmbedShell'
import { query } from '$comps/app/types.appQuery'
import {
	State,
	StatePacket,
	StatePacketAction,
	StateSurfaceModalDataObj
} from '$comps/app/types.appState'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/nav/types.app.ts'

export class App {
	appSystemId?: string
	crumbs: Array<any> = []
	isMobileMode: boolean = false
	levels: Array<AppLevel> = []
	constructor() {}

	async addLevelEmbedField(state: State, token: TokenApiQuery) {
		this.levels.push(
			new AppLevel([
				new AppLevelTab({
					data: token.queryData.dataTab,
					dataObjSource: token.dataObjSource,
					levelIdx: 0,
					tabIdx: 0
				})
			])
		)
		await query(state, this.getCurrTab(), token.queryType)
	}

	async addLevelEmbedShell(fieldShell: FieldEmbedShell) {
		// add root level
		this.levels.push(new AppLevel([]))
		const currLevel = this.levels[0]
		currLevel.tabIdxSet(0)

		// build tabs
		const levelIdx = 0
		const EMBEB_FIELD_TYPES = [FieldEmbedListConfig, FieldEmbedListEdit, FieldEmbedListSelect]
		for (let tabIdx = 0; tabIdx < fieldShell.fields.length; tabIdx++) {
			const fieldEmbed = fieldShell.fields[tabIdx]
			EMBEB_FIELD_TYPES.forEach((type) => {
				if (fieldEmbed instanceof type) {
					currLevel.tabs.push(
						new AppLevelTab({
							data: fieldEmbed?.dataObj?.objData,
							dataObj: fieldEmbed?.dataObj,
							isRetrieved: true,
							label: fieldEmbed.colDO.label,
							levelIdx,
							tabIdx
						})
					)
				}
			})
		}

		const recordId =
			fieldShell.stateShell.dataObjState?.data.rowsRetrieved.getDetailRecordValue('id')
		const dataObjForm = fieldShell.stateShell.dataObjState!
		fieldShell.stateShell.objStatus = fieldShell.getStatus(dataObjForm, recordId)
		return fieldShell
	}
	async addLevelModalDataObj(state: StateSurfaceModalDataObj) {
		const newLevel = new AppLevel(
			[
				new AppLevelTab({
					dataObjId: await getDataObjId(state.dataObjName),
					levelIdx: 0,
					tabIdx: 0
				})
			],
			true
		)
		if (newLevel) {
			this.levels.push(newLevel)
			await query(state, this.getCurrTab(), TokenApiQueryType.retrieve)
		}
		return this
	}
	async addLevelModalEmbedField(state: State, token: TokenAppModalEmbedField) {
		// new level
		const newLevel = new AppLevel(
			[
				new AppLevelTab({
					dataObjSource: token.dataObjSourceModal,
					levelIdx: 0,
					tabIdx: 0
				})
			],
			true
		)
		if (newLevel) {
			this.levels.push(newLevel)
			await query(state, this.getCurrTab(), token.queryType)
		}
		return this
	}

	async addLevelNode(state: State, token: TokenAppNode) {
		this.isMobileMode = token.node.isMobileMode || false

		// create root level
		this.levels.push(new AppLevel([new AppLevelTab(App.addLevelNodeParmsList(token.node))]))
		const currTab = this.getCurrTab()
		if (currTab) {
			await query(state, currTab, TokenApiQueryType.retrieve)
		}
	}

	async addLevelNodeChildren(state: State, token: TokenAppDo, queryType: TokenApiQueryType) {
		const clazz = 'addLevelNodeChildren'
		const currTab = this.getCurrTab()
		if (currTab) {
			currTab.data = token.dataObj.objData
			currTab.data.parms.update(token.dataObj.data.parms.data)

			// new level
			const tabs: AppLevelTab[] = []
			const currLevel = this.getCurrLevel()
			if (currLevel) {
				const nodeIdParent = strRequired(currLevel.getCurrTab().nodeIdParent, clazz, 'nodeIdParent')
				const rawNodes: {
					root: any[]
					children: any[]
				} = await getNodesLevel(nodeIdParent)

				if (rawNodes.root.length === 1) {
					// add root - detail
					const nodeLevelRootDetail = new Node(rawNodes.root[0])
					let nodeParms: DataRecord = {
						dataObjId: nodeLevelRootDetail.dataObjId,
						// dataObjId: currTab.dataObjIdChild,
						isAlwaysRetrieveData: nodeLevelRootDetail.isAlwaysRetrieveData,
						isProgramObject: nodeLevelRootDetail.type === NodeType.program_object
					}
					tabs.push(new AppLevelTab(nodeParms))

					// add children - lists
					rawNodes.children.forEach((n) => {
						tabs.push(new AppLevelTab(App.addLevelNodeParmsList(new Node(n))))
					})
					this.levels.push(new AppLevel(tabs))
					await query(state, this.getCurrTab(), queryType)
				}
			}
			return this
		}
	}

	static addLevelNodeParmsList(node: Node) {
		return {
			dataObjId: node.dataObjId,
			dataObjIdChild: node.dataObjIdChild,
			isAlwaysRetrieveData: node.isAlwaysRetrieveData,
			isHideRowManager: node.isHideRowManager,
			label: node.label,
			nodeIdParent: node.id
		}
	}

	addTabModal(dataObjEmbed: DataObj) {
		if (this.levels.length > 0) {
			const idxLevel = this.levels.length - 1
			const idxTab = this.levels[idxLevel].tabs.length
			const newTab = new AppLevelTab({
				data: dataObjEmbed.data,
				dataObj: dataObjEmbed,
				isModal: true,
				levelIdx: idxTab,
				tabIdx: idxTab
			})
			this.levels[idxLevel].tabIdxRestoreVal = this.levels[idxLevel].tabIdxCurrent
			this.levels[idxLevel].tabIdxSet(idxTab)
			this.levels[idxLevel].tabs.push(newTab)
		}
	}

	getCrumbsList() {
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
	getLevel(levelIdx?: number) {
		if (levelIdx === 0) {
			return this.levels[0]
		} else if (!levelIdx || levelIdx > this.levels.length - 1) {
			return undefined
		} else {
			return this.levels[levelIdx]
		}
	}
	getCurrLevel() {
		return this.getLevel(this.levels.length - 1)
	}
	getCurrLevelActions() {
		const level = this.getCurrLevel()
		const dataObj = level ? level.getCurrTab().dataObj : undefined
		return dataObj ? dataObj.actionsField : []
	}
	getCurrTab() {
		const level = this.getCurrLevel()
		return level ? level.getCurrTab() : undefined
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

	getRowStatus() {
		const parentLevel = this.getCurrTabParentLevel()
		if (parentLevel) return parentLevel.getCurrTab().listRowStatus()
	}

	async navBack(state: State, backCnt: number) {
		for (let i = 0; i < backCnt; i++) {
			const currLevel = this.getCurrLevel()
			if (currLevel) {
				if (currLevel.tabIdxCurrent > 0) {
					currLevel.tabIdxSet(0, true)
				} else {
					this.popLevel(state)
				}
			}
		}
		return this
	}
	async navCrumbs(state: State, token: TokenAppIndex) {
		const backCnt = this.crumbs.length - 1 - token.index
		this.navBack(state, backCnt)
		return this
	}
	async navTab(state: State, token: TokenAppTab) {
		const currLevel = this.getCurrLevel()
		if (currLevel) {
			currLevel.tabIdxSet(token.index)
			const currTab = currLevel.getCurrTab()
			if (!currTab.isRetrieved) {
				await query(state, currTab, TokenApiQueryType.retrieve)
			}
		}
	}

	popLevel(state: State) {
		this.levels.pop()
		if (this.levels.length === 0) {
			state.update({
				page: '/home',
				nodeType: NodeType.home,
				packet: new StatePacket({
					action: StatePacketAction.navBarOpen,
					confirmType: TokenAppDoActionConfirmType.objectChanged
				})
			})
		}
		return this
	}
	async rowUpdate(state: State, token: TokenAppRow) {
		if (this.levels.length > 1) {
			const tabParent = this.getCurrTabParentTab()
			if (tabParent) {
				tabParent.listSetIdByAction(token.rowAction)
				await this.tabQueryDetailDataRow(
					state,
					TokenApiQueryType.retrieve,
					tabParent.listGetDataRow()
				)
			}
		}
		return this
	}
	async saveDetail(state: State, packetAction: StatePacketAction, token: TokenAppDo) {
		const currTab = this.getCurrTab()
		if (currTab && currTab.data) {
			currTab.data = token.dataObj.objData
			currTab.data.parms.update(token.dataObj.data.parms.data)

			const tabParent = this.getCurrTabParentTab()
			if (tabParent && tabParent.data) {
				switch (packetAction) {
					case StatePacketAction.doDetailDelete:
						if (currTab.data.rowsRetrieved.getDetailRowStatusIs(DataRecordStatus.preset)) {
							if (!tabParent || !tabParent.listHasData()) {
								this.popLevel(state)
							} else {
								tabParent.data.parms.valueSet(
									ParmsValuesType.listRecordIdCurrent,
									tabParent.data.parms.valueGet(ParmsValuesType.listIds)[0]
								)
								await this.tabQueryDetailDataRow(
									state,
									TokenApiQueryType.retrieve,
									tabParent.listGetDataRow()
								)
							}
						} else {
							currTab.data.rowsSave.setDetailRecordStatus(DataRecordStatus.delete)
							let recordIdOld = currTab.data.rowsRetrieved.getDetailRecordValue('id')
							let recordIdNew = ''

							let listIds: string[] = tabParent.data.parms.valueGet(ParmsValuesType.listIds)
							if (listIds.length > 1) {
								let idx = listIds.findIndex((id: string) => id === recordIdOld)
								idx = idx === 0 ? 1 : idx - 1
								recordIdNew = listIds[idx]

								if (!(await this.tabQueryDetailData(state, TokenApiQueryType.save, currTab.data)))
									return this
								await query(state, tabParent, TokenApiQueryType.retrieve)
								tabParent.data.parms.updateList(
									listIds.filter((id) => id !== recordIdOld),
									recordIdOld,
									recordIdNew
								)
								await this.tabQueryDetailDataRow(
									state,
									TokenApiQueryType.retrieve,
									tabParent.listGetDataRow()
								)
							} else {
								if (!(await this.tabQueryDetailData(state, TokenApiQueryType.save, currTab.data)))
									return this
								await query(state, tabParent, TokenApiQueryType.retrieve)
								this.popLevel(state)
							}
						}
						break

					case StatePacketAction.doDetailSave:
						if (!(await this.tabQueryDetailData(state, TokenApiQueryType.save, currTab.data)))
							return this

						// parent list
						const detailIdCurrent = currTab.data.rowsRetrieved.getDetailRecordValue('id')
						let listIdsPre: string[] = tabParent.data.parms.valueGet(ParmsValuesType.listIds)
						await query(state, tabParent, TokenApiQueryType.retrieve)
						let listIdsPost: string[] = []
						tabParent.data.parms.valueGet(ParmsValuesType.listIds).forEach((id: string) => {
							if (listIdsPre.includes(id) || id === detailIdCurrent) listIdsPost.push(id)
						})
						tabParent.data.parms.updateList(
							listIdsPost,
							currTab.data.rowsRetrieved.getDetailRecordValue('id')
						)
						break
					default:
						error(500, {
							file: FILENAME,
							function: 'App.detailUpdate',
							message: `No case defined for StatePacketAction: ${packetAction}`
						})
				}
			} else {
				// no parent tab (orphan detail record)
				switch (packetAction) {
					case StatePacketAction.doDetailDelete:
						// <todo> - 241019 - this path must be tested - only example "My Account" which doesn't have Delete option
						if (!currTab.data.rowsRetrieved.getDetailRowStatusIs(DataRecordStatus.preset)) {
							currTab.data.rowsSave.setDetailRecordStatus(DataRecordStatus.delete)
							if (!(await this.tabQueryDetailData(state, TokenApiQueryType.save, currTab.data)))
								return this
						}
						this.popLevel(state)
						break

					case StatePacketAction.doDetailSave:
						if (!(await this.tabQueryDetailData(state, TokenApiQueryType.save, currTab.data)))
							return this
						break

					default:
						error(500, {
							file: FILENAME,
							function: 'App.detailUpdate',
							message: `No case defined for StatePacketAction: ${packetAction}`
						})
				}
			}
		}
		return true
	}
	async saveList(state: State, token: TokenAppDo) {
		const data = token.dataObj.objData
		const currTab = this.getCurrTab()
		if (currTab && currTab.dataObj) {
			currTab.data = data
			return await query(state, currTab, TokenApiQueryType.save)
		}
	}
	async tabDuplicate(state: State, token: TokenAppDo) {
		const data = token.dataObj.objData
		const currTab = this.getCurrTab()
		if (currTab) {
			currTab.data = data
			if (currTab.data) currTab.data.rowsRetrieved.setDetailRecordStatus(DataRecordStatus.preset)
		}
		return this
	}
	async tabQueryDetailData(state: State, queryType: TokenApiQueryType, data: DataObjData) {
		const currLevel = this.getCurrLevel()
		if (currLevel) {
			currLevel.resetTabs()
			const currTab = currLevel.getCurrTab()
			currTab.data = data
			return await query(state, currTab, queryType)
		}
	}
	async tabQueryDetailDataRow(state: State, queryType: TokenApiQueryType, dataRow?: DataRow) {
		const currLevel = this.getCurrLevel()
		if (currLevel) {
			const currTab = currLevel.getCurrTab()
			if (currTab.data && dataRow) {
				currTab.data.rowsRetrieved.setDetailDataRow(dataRow)
				return this.tabQueryDetailData(state, queryType, currTab.data)
			}
		}
	}
}

export class AppLevel {
	isModal: boolean
	tabIdxCurrent: number
	tabIdxRestoreVal?: number
	tabs: AppLevelTab[] = []
	constructor(tabs: AppLevelTab[], isModal: boolean = false) {
		this.isModal = isModal
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
		return this.getCurrTab().data?.rowsRetrieved.getRows().length || 0
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
	data?: DataObjData
	dataObj?: DataObj
	dataObjId?: string
	dataObjIdChild?: string
	dataObjSource: TokenApiDbDataObjSource
	isAlwaysRetrieveData: boolean
	isHideRowManager: boolean
	isModal: boolean
	isProgramObject: boolean
	isRetrieved: boolean
	label?: string
	nodeIdParent?: string
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'AppLevelTab'
		this.data = obj.data
		this.dataObj = obj.dataObj
		this.dataObjId = obj.dataObjId
		this.dataObjIdChild = obj.dataObjIdChild
		this.dataObjSource = obj.dataObjSource
		this.isAlwaysRetrieveData = booleanOrFalse(obj.isAlwaysRetrieveData, 'isAlwaysRetrieveData')
		this.isHideRowManager = booleanOrFalse(obj.isHideRowManager, 'isHideRowManager')
		this.isProgramObject = booleanOrFalse(obj.isProgramObject, 'isProgramObject')
		this.isRetrieved = booleanOrFalse(obj.isRetrieved, 'isRetrieved')
		this.isModal = booleanOrFalse(obj.isModal, 'isModal')
		this.label = obj.label
		this.nodeIdParent = obj.nodeIdParent
	}
	getDataObjSource() {
		if (this.dataObjSource) {
			return this.dataObjSource
		} else {
			let sourceParms: DataRecord = {}
			sourceParms['dataObjId'] = strRequired(
				this.dataObjId ? this.dataObjId : this.dataObj?.raw?.id,
				'AppLevelTab.getDataObjSource',
				'dataObjId'
			)
			let dataObjSource = new TokenApiDbDataObjSource(sourceParms)
			if (this.dataObj) {
				dataObjSource.updateReplacements({
					exprFilter: this?.dataObj?.raw?.exprFilter
				})
			}
			return dataObjSource
		}
	}

	getTable() {
		return this.dataObj?.rootTable?.name
	}
	listCrumbLabelId() {
		let id = ''
		const crumbFieldNames: Array<string> = this.dataObj?.raw.crumbs ? this.dataObj.raw.crumbs : []
		const idCurrent = this.data?.parms.valueGet(ParmsValuesType.listRecordIdCurrent)
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
		const idCurrent = this.data?.parms.valueGet(ParmsValuesType.listRecordIdCurrent)
		const dataRows = this.listGetDataRows()
		return idCurrent && dataRows
			? dataRows.find((dataRow) => {
					return dataRow.record.id === idCurrent
				})
			: undefined
	}
	listGetDataRows(): DataRow[] | [] {
		const idList: string[] = this.data?.parms.valueGet(ParmsValuesType.listIds)
		let dataRows: DataRow[] = []
		idList.forEach((id) => {
			const dataRow = this.data?.rowsRetrieved.getRows().find((row) => row.record.id === id)
			if (dataRow) dataRows.push(dataRow)
		})
		return dataRows
	}

	listGetRowIdx() {
		const idCurrent = this.data?.parms.valueGet(ParmsValuesType.listRecordIdCurrent)
		const dataRows = this.listGetDataRows()
		return idCurrent && dataRows
			? dataRows.findIndex((dataRow) => {
					return dataRow.record.id === idCurrent
				})
			: -1
	}
	listHasData() {
		return (
			this.data?.rowsRetrieved.getRows().length && this.data?.rowsRetrieved.getRows().length > 0
		)
	}
	listRowStatus() {
		const idCurrent = this.data?.parms.valueGet(ParmsValuesType.listRecordIdCurrent)
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
			this.data?.parms.valueSet(ParmsValuesType.listRecordIdCurrent, listDataRows[rowIdx].record.id)
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

async function getDataObjId(dataObjName: string) {
	const result: ResponseBody = await apiFetch(
		ApiFunction.dbEdgeGetDataObjId,
		new TokenApiId(dataObjName)
	)
	if (result.success) {
		return result.data.id
	} else {
		error(500, {
			file: FILENAME,
			function: 'getDataObjId',
			message: `Error retrieving dataObj for dataObjName: ${dataObjName}`
		})
	}
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
