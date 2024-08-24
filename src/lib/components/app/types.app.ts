import {
	booleanOrFalse,
	DataObj,
	DataObjData,
	DataRecordStatus,
	ParmsValuesState,
	ParmsObjType,
	nbrRequired,
	Node,
	NodeApp,
	RawNode,
	ResponseBody,
	required,
	strRequired,
	valueOrDefault
} from '$utils/types'
import type { DataRecord, DbNode } from '$utils/types'
import { RawDataObj } from '$comps/dataObj/types.rawDataObj'
import { apiFetch, ApiFunction } from '$routes/api/api'
import {
	TokenApiDbDataObjSource,
	TokenApiQueryType,
	TokenApiQuery,
	TokenAppModalEmbedField,
	TokenAppModalEmbedShell,
	TokenAppDoActionFieldType,
	TokenAppRow,
	TokenAppTreeNode,
	TokenAppTreeNodeId,
	TokenAppCrumbs,
	TokenAppDo
} from '$utils/types.token'
import {
	FieldEmbedListConfig,
	FieldEmbedListEdit,
	FieldEmbedListSelect
} from '$comps/form/fieldEmbed'
import { query } from '$comps/app/types.appQuery'
import { State, StateSurfaceEmbedShell } from '$comps/app/types.appState'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/nav/types.app.ts'

export class App {
	crumbs: Array<any> = []
	levels: Array<AppLevel> = []
	constructor() {}

	async addLevelEmbedShell(state: StateSurfaceEmbedShell, token: TokenAppModalEmbedShell) {
		// add level
		this.levels.push(new AppLevel([]))
		const currLevel = this.levels[0]

		// build tabs
		const embeds = token.dataObjParent.fields.filter((f) =>
			token.fieldEmbedShell.colDO.fieldEmbedShellFields.includes(f.colDO.propName)
		)
		const levelIdx = 0
		for (let tabIdx = 0; tabIdx < embeds.length; tabIdx++) {
			const field = embeds[tabIdx]
			if (field instanceof FieldEmbedListEdit) {
				currLevel.tabs.push(
					new AppLevelTab({
						dataObjId: field.raw.dataObjEmbedId,
						label: field.colDO.label,
						levelIdx,
						tabIdx
					})
				)
				const currTab = currLevel.tabs[currLevel.tabs.length - 1]
				await query(state, currTab, TokenApiQueryType.retrieve, this)
				if (currTab.dataObj) token.fieldEmbedShell.addDataObjEmbed(currTab.dataObj)
			}
		}

		currLevel.tabIdxSet(0)
		return this
	}
	async addLevelModal(state: State, token: TokenAppModalEmbedField) {
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
			await query(state, this.getCurrTab(), token.queryType, this)
		}
		return this
	}
	async addLevelNode(state: State, token: TokenAppDo, queryType: TokenApiQueryType) {
		const currTab = this.getCurrTab()
		if (currTab) {
			currTab.data = token.dataObj.objData
			currTab.data.parmsState.parmsUpdate(token.dataObj.data.parmsState)
		}

		// new level
		const tabs: Array<AppLevelTab> = []
		const newLevelIdx = this.levels.length
		const currLevel = this.getCurrLevel()
		if (currLevel) {
			const rawNodes: {
				root: Array<DbNode>
				children: Array<DbNode>
			} = await getNodesLevel(currLevel.getCurrTab().nodeId)

			if (rawNodes.root.length === 1) {
				// add root
				tabs.push(
					new AppLevelTab(
						App.getTabParmsNode(newLevelIdx, 0, new Node(new RawNode(rawNodes.root[0])))
					)
				)
				// add children
				rawNodes.children.forEach((rawNode, idx) => {
					tabs.push(
						new AppLevelTab(
							App.getTabParmsNode(newLevelIdx, idx + 1, new Node(new RawNode(rawNode)))
						)
					)
				})
				this.levels.push(new AppLevel(tabs))
				await query(state, this.getCurrTab(), queryType, this)
			}
		}
		return this
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

	async back(backCnt: number) {
		for (let i = 0; i < backCnt; i++) {
			const currLevel = this.getCurrLevel()
			if (currLevel) {
				if (currLevel.tabIdxCurrent > 0) {
					currLevel.tabIdxSet(0, true)
				} else {
					this.levels.pop()
				}
			}
		}
		return this
	}
	async changeCrumbs(token: TokenAppCrumbs) {
		const crumbIdx = token.crumbIdx
		const backCnt = this.crumbs.length - 1 - crumbIdx
		this.back(backCnt)
		return this
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
	static getTabParmsNode(levelIdx: number, tabIdx: number, node: Node) {
		const nodeApp = new NodeApp(node)
		return {
			dataObjId: nodeApp.dataObjId,
			isHideRowManager: nodeApp.isHideRowManager,
			label: nodeApp.label,
			levelIdx,
			nodeId: nodeApp.id,
			tabIdx
		}
	}
	async initEmbeddedField(state: State, token: TokenApiQuery) {
		// get new level
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
		await query(state, this.getCurrTab(), token.queryType, this)
	}
	async initNode(state: State, token: TokenAppTreeNode) {
		const tabParms = App.getTabParmsNode(0, 0, token.node)
		this.levels.push(new AppLevel([new AppLevelTab(tabParms)]))
		await query(state, this.getCurrTab(), TokenApiQueryType.retrieve, this)
		const currTab = this.getCurrTab()
		if (currTab)
			currTab.data?.parmsState.valueSetList(
				ParmsObjType.listRecordIdList,
				currTab?.data?.rowsRetrieved.getRows()
			)
	}

	popLevel() {
		this.levels.pop()
		return this
	}
	async rowUpdate(state: State, token: TokenAppRow) {
		if (this.levels.length > 1) {
			const tabParent = this.getCurrTabParentTab()
			if (tabParent) {
				tabParent.listSetIdByAction(token.rowAction)
				await this.tabQueryDetailDataRecord(
					state,
					TokenApiQueryType.retrieve,
					tabParent.listGetDataRecord()
				)
			}
		}
		return this
	}
	async saveDetail(state: State, token: TokenAppDo) {
		const currTab = this.getCurrTab()
		if (currTab && currTab.data) {
			currTab.data = token.dataObj.objData
			currTab.data.parmsState.parmsUpdate(token.dataObj.data.parmsState)

			const tabParent = this.getCurrTabParentTab()
			if (tabParent && tabParent.data) {
				switch (token.actionType) {
					case TokenAppDoActionFieldType.detailDelete:
						if (currTab.data.rowsRetrieved.getDetailStatusRecordIs(DataRecordStatus.preset)) {
							if (!tabParent || !tabParent.listHasRecords()) {
								this.popLevel()
							} else {
								tabParent.data.parmsState.valueSet(
									ParmsObjType.listRecordIdCurrent,
									tabParent.data.parmsState.valueGet(ParmsObjType.listRecordIdList)[0]
								)
								await this.tabQueryDetailDataRecord(
									state,
									TokenApiQueryType.retrieve,
									tabParent.listGetDataRecord()
								)
							}
						} else {
							currTab.data.rowsSave.setDetailRecordStatus(DataRecordStatus.delete)
							let recordIdOld = currTab.data.rowsRetrieved.getDetailRecordValue('id')
							let recordIdNew = ''

							let idList = tabParent.data.parmsState.valueGet(ParmsObjType.listRecordIdList)
							if (idList.length > 1) {
								let idx = idList.findIndex((id: string) => id === recordIdOld)
								idx = idx === 0 ? 1 : idx - 1
								recordIdNew = idList[idx]

								if (!(await this.tabQueryDetailData(state, TokenApiQueryType.save, currTab.data)))
									return this
								await query(state, tabParent, TokenApiQueryType.retrieve, this)
								tabParent.data.parmsState.listUpdate(
									tabParent.data.rowsRetrieved.getRows(),
									recordIdOld,
									recordIdNew
								)
								await this.tabQueryDetailDataRecord(
									state,
									TokenApiQueryType.retrieve,
									tabParent.listGetDataRecord()
								)
							} else {
								if (!(await this.tabQueryDetailData(state, TokenApiQueryType.save, currTab.data)))
									return this
								await query(state, tabParent, TokenApiQueryType.retrieve, this)
								this.popLevel()
							}
						}
						break

					case TokenAppDoActionFieldType.detailSave:
						if (!(await this.tabQueryDetailData(state, TokenApiQueryType.save, currTab.data)))
							return this
						await query(state, tabParent, TokenApiQueryType.retrieve, this)
						tabParent.data.parmsState.listUpdate(
							tabParent.data.rowsRetrieved.getRows(),
							currTab.data.rowsRetrieved.getDetailRecordValue('id')
						)
						break
					default:
						error(500, {
							file: FILENAME,
							function: 'App.detailUpdate',
							message: `No case defined for TokenAppDoAction: ${token.actionType}`
						})
				}
			}
		}
		return this
	}
	async saveList(state: State, token: TokenAppDo) {
		const data = token.dataObj.objData
		const currTab = this.getCurrTab()
		if (currTab && currTab.dataObj) {
			currTab.data = data
			return await query(state, currTab, TokenApiQueryType.save, this)
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
			return await query(state, currTab, queryType, this)
		}
	}
	async tabQueryDetailDataRecord(
		state: State,
		queryType: TokenApiQueryType,
		dataRecord: DataRecord
	) {
		const currLevel = this.getCurrLevel()
		if (currLevel) {
			const currTab = currLevel.getCurrTab()
			if (currTab.data) {
				currTab.data.rowsRetrieved.setDetailRecord(dataRecord)
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
	tabSet: number = 0
	constructor(tabs: AppLevelTab[], isModal: boolean = false) {
		this.isModal = isModal
		this.tabIdxCurrent = 0
		this.tabs = tabs
	}
	getCrumbLabel(tabIdx: number, parentLevel: AppLevel | undefined = undefined) {
		const label = this.tabs[tabIdx].label
		const labelId = parentLevel ? parentLevel.getCurrTab().listCrumbLabelId() : ''
		return label + labelId
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
		if (setTabSet) this.tabSet = newIdx
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
	dataObjSource: TokenApiDbDataObjSource
	idx: number
	isHideRowManager: boolean
	isModal: boolean
	isRetrieved: boolean = false
	label: string
	levelIdx: number
	nodeId: string
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'AppLevelTab'
		this.data = valueOrDefault(obj.data, undefined)
		this.dataObj = valueOrDefault(obj.dataObj, undefined)
		this.dataObjId = valueOrDefault(obj.dataObjId, undefined)
		this.dataObjSource = valueOrDefault(obj.dataObjSource, undefined)
		this.idx = nbrRequired(obj.tabIdx, clazz, 'idx')
		this.isHideRowManager = booleanOrFalse(obj.isHideRowManager, 'isHideRowManager')
		this.isModal = booleanOrFalse(obj.isModal, 'isModal')
		this.label = valueOrDefault(obj.label, '')
		this.levelIdx = nbrRequired(obj.levelIdx, clazz, 'levelIdx')
		this.nodeId = valueOrDefault(obj.nodeId, '')

		// derived
		if (this.dataObj) this.dataObjId = this.dataObj.raw.id
	}
	getDataObjSource() {
		const dataObjSource = this.dataObjSource
			? this.dataObjSource
			: this.dataObjId
				? new TokenApiDbDataObjSource({ dataObjId: this.dataObjId })
				: error(500, {
						file: FILENAME,
						function: 'AppLevelTab.getDataObjSource - ' + this.dataObj?.raw?.name,
						message: `No dataObjSource or dataObjId defined`
					})

		dataObjSource.updateReplacements({
			exprFilter: this?.dataObj?.raw?.exprFilter
		})
		return dataObjSource
	}
	getTable() {
		return this.dataObj?.rootTable?.name
	}
	listCrumbLabelId() {
		let id = ''
		const crumbFieldNames: Array<string> = this.dataObj?.raw.crumbs ? this.dataObj.raw.crumbs : []
		const idCurrent = this.data?.parmsState.valueGet(ParmsObjType.listRecordIdCurrent)
		if (crumbFieldNames.length > 0 && idCurrent) {
			const record = this.listGetDataRecord()
			if (record) {
				crumbFieldNames.forEach((f) => {
					if (Object.hasOwn(record, f)) {
						if (record[f]) {
							if (id) id += ' '
							id += record[f]
						}
					}
				})
			}
		}
		return id ? ` [${id}]` : ''
	}

	listGetDataRecord() {
		const idCurrent = this.data?.parmsState.valueGet(ParmsObjType.listRecordIdCurrent)
		const records = this.listGetRecords()
		return idCurrent && records
			? records.find((row) => {
					return row.id === idCurrent
				}) || {}
			: {}
	}
	listGetRecords(): DataRecord[] {
		const idList: string[] = this.data?.parmsState.valueGet(ParmsObjType.listRecordIdList)
		return idList
			? idList.map((id) => {
					return (
						this?.data?.rowsRetrieved.getRows().find((row) => row.record.id === id)?.record || []
					)
				})
			: []
	}

	listGetRow() {
		const idCurrent = this.data?.parmsState.valueGet(ParmsObjType.listRecordIdCurrent)
		const records = this.listGetRecords()
		return idCurrent && records
			? records.findIndex((row) => {
					return row.id === idCurrent
				})
			: -1
	}
	listHasRecords() {
		return (
			this.data?.rowsRetrieved.getRows().length && this.data?.rowsRetrieved.getRows().length > 0
		)
	}
	listRowStatus() {
		const idCurrent = this.data?.parmsState.valueGet(ParmsObjType.listRecordIdCurrent)
		const listRecords = this.listGetRecords()
		if (listRecords && idCurrent) {
			const rowIdx = listRecords.findIndex((record) => {
				return record.id === idCurrent
			})
			if (rowIdx > -1) {
				return new AppLevelRowStatus(listRecords.length, rowIdx)
			}
		}
	}
	listSetIdByAction(rowAction: AppRowActionType) {
		const listRecords = this.listGetRecords()
		if (listRecords) {
			const rowCount = listRecords.length
			let rowIdx = this.listGetRow()
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
			this.data?.parmsState.valueSet(ParmsObjType.listRecordIdCurrent, listRecords[rowIdx].id)
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
		new TokenAppTreeNodeId(nodeId)
	)
	if (result.success) {
		return result.data
	} else {
		error(500, {
			file: FILENAME,
			function: 'getNodes',
			message: `Error retrieving nodes for nodeId: ${nodeId}`
		})
	}
}
