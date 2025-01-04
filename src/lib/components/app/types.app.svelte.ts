import {
	ContextKey,
	booleanOrFalse,
	DataManager,
	DataObj,
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
	TokenApiQueryType,
	TokenApiQuery,
	TokenAppIndex,
	TokenAppDataObjName,
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
import { queryTypeTab } from '$comps/app/types.appQuery'
import {
	State,
	StatePacket,
	StatePacketAction,
	StateSurfaceModal,
	StateTarget
} from '$comps/app/types.appState.svelte'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/nav/types.app.ts'

export class App {
	crumbs: Array<any> = []
	levels: Array<AppLevel> = $state([])
	constructor() {}

	async addLevelDataObj(sm: State, token: TokenAppDataObjName) {
		const newLevel = new AppLevel(
			[
				new AppLevelTab({
					dataObjId: await getDataObjId(token.dataObjName),
					levelIdx: 0,
					tabIdx: 0
				})
			],
			true
		)
		if (newLevel) {
			this.levels.push(newLevel)
			await queryTypeTab(sm, this.getCurrTab(), token.queryType)
		}
		return this
	}

	async addLevelEmbedField(sm: State, token: TokenApiQuery) {
		this.levels.push(
			new AppLevel([
				new AppLevelTab({
					data: token.queryData.dataTab,
					dataObjSource: token.dataObjSource
				})
			])
		)
		await queryTypeTab(sm, this.getCurrTab(), token.queryType)
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
					// currLevel.tabs.push(
					// 	new AppLevelTab({
					// 		data: fieldEmbed?.dataObj?.objData,
					// 		dataObj: fieldEmbed?.dataObj,
					// 		isRetrieved: true,
					// 		label: fieldEmbed.colDO.label,
					// 		levelIdx,
					// 		tabIdx
					// 	})
					// )
				}
			})
		}

		// let dm: DataManager = fieldShell.stateShell.dm
		// const recordId =
		// 	fieldShell.stateShell.dataObjState?.data.rowsRetrieved.getDetailRecordValue('id')

		// 	const dataObjForm = fieldShell.stateShell.dataObjState!
		// fieldShell.stateShell.objStatus = fieldShell.getStatus(dataObjForm, recordId)
		return fieldShell
	}

	async addLevelModalEmbedField(sm: State, token: TokenAppModalEmbedField) {
		// new level
		const newLevel = new AppLevel(
			[
				new AppLevelTab({
					dataObjId: token.dataObjSourceModal.sources.dataObjId,
					dataObjSource: token.dataObjSourceModal,
					isVirtual: true,
					label: 'modalEmbedField'
				})
			],
			true
		)
		if (newLevel) {
			this.levels.push(newLevel)
			await queryTypeTab(sm, this.getCurrTab(), token.queryType)
		}
		return this
	}

	async addLevelNode(sm: State, token: TokenAppNode) {
		// create root level
		this.levels.push(new AppLevel([new AppLevelTab(App.addLevelNodeParmsList(token.node))]))
		const currTab = this.getCurrTab()
		if (currTab) {
			await queryTypeTab(sm, currTab, TokenApiQueryType.retrieve)
		}
	}

	async addLevelNodeChildren(sm: State, token: TokenAppDo, queryType: TokenApiQueryType) {
		const clazz = 'addLevelNodeChildren'
		const currTab = this.getCurrTab()
		if (currTab) {
			currTab.dataObj = token.dataObj

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
						isProgramObject: nodeLevelRootDetail.type === NodeType.program_object,
						label: nodeLevelRootDetail.label
					}
					tabs.push(new AppLevelTab(nodeParms))

					// add children - lists
					rawNodes.children.forEach((n) => {
						tabs.push(new AppLevelTab(App.addLevelNodeParmsList(new Node(n))))
					})
					this.levels.push(new AppLevel(tabs))

					// retrieve data - new level root
					const currTab = this.getCurrTab()
					if (currTab) {
						await queryTypeTab(sm, currTab, queryType)
					}
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
		if (level && level.tabs.length > 0) return level.getCurrTab()
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
		if (parentLevel) {
			const currTab = parentLevel.getCurrTab()
			return currTab ? currTab.listRowStatus() : undefined
		}
	}

	async navBack(sm: State, backCnt: number) {
		for (let i = 0; i < backCnt; i++) {
			const currLevel = this.getCurrLevel()
			if (currLevel) {
				if (currLevel.tabIdxCurrent > 0) {
					currLevel.tabIdxSet(0, true)
				} else {
					this.popLevel(sm)
				}
			}
		}
		return this
	}
	async navCrumbs(sm: State, token: TokenAppIndex) {
		const backCnt = this.crumbs.length - 1 - token.index
		this.navBack(sm, backCnt)
		return this
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

	popLevel(sm: State) {
		this.levels.pop()
		if (this.levels.length === 0) {
			sm.change({
				confirmType: TokenAppDoActionConfirmType.statusChanged,
				target: StateTarget.dashboard
			})
		}
		return this
	}

	async rowUpdate(sm: State, token: TokenAppRow) {
		if (this.levels.length > 1) {
			const tabParent = this.getCurrTabParentTab()
			if (tabParent) {
				tabParent.listSetIdByAction(token.rowAction)
				await this.tabQueryDetailDataRow(sm, TokenApiQueryType.retrieve, tabParent.listGetDataRow())
			}
		}
		return this
	}
	async saveDetail(sm: State, packetAction: StatePacketAction, token: TokenAppDo) {
		const clazz = `${FILENAME}.saveDetail`
		const currTab = this.getCurrTab()
		if (currTab && currTab.dataObj && sm.dm) {
			currTab.dataObj.data = sm.dm.getDataSave()

			const tabParent = this.getCurrTabParentTab()
			if (tabParent && tabParent.dataObj) {
				switch (packetAction) {
					case StatePacketAction.doDetailDelete:
						if (currTab.dataObj.data.rowsRetrieved.getDetailRowStatusIs(DataRecordStatus.preset)) {
							if (!tabParent || !tabParent.listHasData()) {
								this.popLevel(sm)
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
								this.popLevel(sm)
							}
						}
						break

					case StatePacketAction.doDetailSave:
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
							message: `No case defined for StatePacketAction: ${packetAction}`
						})
				}
			} else {
				// no parent tab (orphan detail record)
				switch (packetAction) {
					case StatePacketAction.doDetailDelete:
						// <todo> - 241019 - this path must be tested - only example "My Account" which doesn't have Delete option
						if (!currTab.dataObj.data.rowsRetrieved.getDetailRowStatusIs(DataRecordStatus.preset)) {
							currTab.dataObj.data.rowsSave.setDetailRecordStatus(DataRecordStatus.delete)
							if (
								!(await this.tabQueryDetailData(sm, TokenApiQueryType.save, currTab.dataObj.data))
							)
								return this
						}
						this.popLevel(sm)
						break

					case StatePacketAction.doDetailSave:
						if (!(await this.tabQueryDetailData(sm, TokenApiQueryType.save, currTab.dataObj.data)))
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
