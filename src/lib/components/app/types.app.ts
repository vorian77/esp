import {
	DataObj,
	DataObjData,
	DataRecordStatus,
	MetaData,
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
import { State } from '$comps/app/types.appState'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/nav/types.app.ts'

export class App {
	crumbs: Array<any> = []
	levels: Array<AppLevel> = []
	constructor() {}

	async addLevelEmbedShell(state: State, token: TokenAppModalEmbedShell) {
		const embeds = token.dataObjParent.fields.filter((f) =>
			token.fieldEmbedShell.colDO.fieldEmbedShellFields.includes(f.colDO.propName)
		)

		// build tabls
		const levelIdx = 0
		const tabs: AppLevelTab[] = []
		embeds.forEach((field, tabIdx) => {
			let dataObjId = ''
			if (field instanceof FieldEmbedListEdit) {
				dataObjId = field.raw.dataObjEmbedId
			}
			tabs.push(
				new AppLevelTab({
					data: undefined,
					dataObjSource: new TokenApiDbDataObjSource({ dataObjId }),
					label: field.colDO.label,
					levelIdx,
					parms: state.dataQuery.valueGetAll(),
					tabIdx
				})
			)
		})

		// build level
		this.levels.push(new AppLevel(tabs))
		await query(state, this.getCurrTab(), TokenApiQueryType.retrieve, this)

		// return
		return this
	}
	async addLevelModal(state: State, token: TokenAppModalEmbedField) {
		// current tab
		const currTab = this.getCurrTab()
		if (currTab) currTab.metaData.initLevel(state.dataQuery.valueGetAll())

		// new level
		const newLevel = new AppLevel([
			new AppLevelTab({
				dataObjSource: token.dataObjSourceModal,
				levelIdx: 0,
				tabIdx: 0
			})
		])
		if (newLevel) {
			// set data obj parent
			this.levels.push(newLevel)
			await query(state, this.getCurrTab(), token.queryType, this)
		}
		return this
	}
	async addLevelNode(state: State, queryType: TokenApiQueryType) {
		const currTab = this.getCurrTab()
		if (currTab && currTab.data) {
			// current tab
			currTab.metaData.initLevel(state.dataQuery.valueGetAll())

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
		}
		return this
	}

	async back(backCnt: number) {
		for (let i = 0; i < backCnt; i++) {
			const currLevel = this.getCurrLevel()
			if (currLevel) {
				if (currLevel.currTabIdx > 0) {
					currLevel.setTabIdx(0, true)
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
			if (level.currTabIdx > 0)
				this.crumbs.push(new AppLevelCrumb(level.currTabIdx, level.getCrumbLabel(level.currTabIdx)))
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
	getParms() {
		let parms: DataRecord = {}
		this.levels.forEach((level, idx) => {
			level.tabs[level.currTabIdx].metaData.listSetParms(parms)
			Object.entries(level.tabs[level.currTabIdx].parms).forEach(([key, value]) => {
				if (!Object.keys(parms).includes(key)) parms[key] = value
			})
		})
		return parms
	}
	getRowStatus() {
		const parentLevel = this.getCurrTabParentLevel()
		if (parentLevel) return parentLevel.getCurrTab().listRowStatus()
	}
	async initEmbeddedField(state: State, token: TokenApiQuery) {
		// get new level
		this.levels.push(
			new AppLevel([
				new AppLevelTab({
					data: token.queryData.dataObjData,
					dataObjSource: token.dataObjSource,
					levelIdx: 0,
					parms: state.dataQuery.valueGetAll(),
					tabIdx: 0
				})
			])
		)
		await query(state, this.getCurrTab(), token.queryType, this)
	}
	async initModal(state: State, dataObjSource: TokenApiDbDataObjSource) {
		this.levels.push(
			new AppLevel([
				new AppLevelTab({
					dataObjSource,
					levelIdx: 0,
					parms: state.dataQuery.valueGetAll(),
					tabIdx: 0
				})
			])
		)
		await query(state, this.getCurrTab(), TokenApiQueryType.retrieve, this)
	}
	async initNode(state: State, token: TokenAppTreeNode) {
		const nodeApp = new NodeApp(token.node)
		const tabParms = App.getTabParmsNode(0, 0, token.node)
		this.levels.push(new AppLevel([new AppLevelTab(tabParms)]))
		await query(state, this.getCurrTab(), TokenApiQueryType.retrieve, this)
		const currTab = this.getCurrTab()
		if (currTab) currTab.metaData.valueSetList(currTab?.data?.dataRows)
	}
	static getTabParmsNode(levelIdx: number, tabIdx: number, node: Node) {
		const nodeApp = new NodeApp(node)
		return {
			data: undefined,
			dataObjSource: new TokenApiDbDataObjSource({ dataObjId: nodeApp.dataObjId }),
			label: nodeApp.label,
			levelIdx,
			nodeId: nodeApp.id,
			tabIdx
		}
	}
	popLevel() {
		this.levels.pop()
		return this
	}
	async rowUpdate(state: State, rowAction: AppRowActionType) {
		if (this.levels.length > 1) {
			const tabParent = this.getCurrTabParentTab()
			if (tabParent) {
				tabParent.listSetIdByAction(rowAction)
				await this.saveDetailRecord(state, TokenApiQueryType.retrieve, tabParent.listGetData())
			}
		}
		return this
	}
	async saveDetail(state: State, token: TokenAppDo) {
		const currTab = this.getCurrTab()
		if (currTab && currTab.data) {
			const data = token.dataObj.objData
			const currRecord = data.getDetailRecord()
			const tabParent = this.getCurrTabParentTab()

			switch (token.actionType) {
				case TokenAppDoActionFieldType.detailDelete:
					if (currTab.data.getDetailStatusRecordIs(DataRecordStatus.preset)) {
						if (!tabParent || !tabParent.listHasRecords()) {
							this.popLevel()
						} else {
							tabParent.metaData.valueSetId(tabParent.metaData.valueGetIdList()[0])
							await this.saveDetailRecord(
								state,
								TokenApiQueryType.retrieve,
								tabParent.listGetData()
							)
						}
					} else {
						currTab.detailSetRowStatus(DataRecordStatus.delete)
						let recordIdOld = currTab.data.getDetailRecordValue('id')
						let recordIdNew = ''

						if (tabParent) {
							let idList = tabParent.metaData.valueGetIdList()
							if (idList.length > 1) {
								let idx = idList.findIndex((id: string) => id === recordIdOld)
								idx = idx === 0 ? 1 : idx - 1
								recordIdNew = idList[idx]

								if (!(await this.saveDetailRecord(state, TokenApiQueryType.save, currRecord)))
									return this
								await query(state, tabParent, TokenApiQueryType.retrieve, this)
								tabParent.metaData.listUpdate(tabParent?.data?.dataRows, recordIdOld, recordIdNew)
								await this.saveDetailRecord(
									state,
									TokenApiQueryType.retrieve,
									tabParent.listGetData()
								)
							} else {
								if (!(await this.saveDetailRecord(state, TokenApiQueryType.save, currRecord)))
									return this
								await query(state, tabParent, TokenApiQueryType.retrieve, this)
								this.popLevel()
							}
						}
					}
					break

				case TokenAppDoActionFieldType.detailSave:
					if (!(await this.saveDetailRecord(state, TokenApiQueryType.save, currRecord))) return this
					if (tabParent) {
						await query(state, tabParent, TokenApiQueryType.retrieve, this)
						tabParent.metaData.listUpdate(
							tabParent?.data?.dataRows,
							currTab.data.getDetailRecordValue('id')
						)
					}
					break
				default:
					error(500, {
						file: FILENAME,
						function: 'App.detailUpdate',
						message: `No case defined for TokenAppDoAction: ${token.actionType}`
					})
			}
		}
		return this
	}
	async saveDetailRecord(state: State, queryType: TokenApiQueryType, dataRecord: DataRecord) {
		const currLevel = this.getCurrLevel()
		if (currLevel) {
			currLevel.resetTabs()
			const currTab = currLevel.getCurrTab()
			currTab.detailSetData(dataRecord)
			return await query(state, currTab, queryType, this)
		}
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
			if (currTab.data) currTab.data.setDetailRecordStatus(DataRecordStatus.preset)
		}
		return this
	}
}

export class AppLevel {
	currTabIdx: number
	tabs: AppLevelTab[] = []
	tabSet: number = 0
	constructor(tabs: AppLevelTab[]) {
		this.currTabIdx = 0
		this.tabs = tabs
	}
	getCrumbLabel(tabIdx: number, parentLevel: AppLevel | undefined = undefined) {
		const label = this.tabs[tabIdx].label
		const labelId = parentLevel ? parentLevel.getCurrTab().listCrumbLabelId() : ''
		return label + labelId
	}
	getCurrTab() {
		return this.tabs[this.currTabIdx]
	}
	getCurrTabRowCount() {
		return this.getCurrTab().data?.dataRows.length || 0
	}

	resetTabs() {
		this.tabs.forEach((tab) => {
			tab.reset()
		})
	}
	setTabIdx(newIdx: number, setTabSet: boolean = false) {
		this.currTabIdx = newIdx
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
	dataObjSource: TokenApiDbDataObjSource
	idx: number
	isRetrieved: boolean = false
	label: string
	levelIdx: number
	metaData: MetaData = new MetaData()
	nodeId: string
	parms: DataRecord = {}
	rawDataObj?: RawDataObj
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'AppLevelTab'
		this.data = valueOrDefault(obj.data, undefined)
		this.dataObjSource = required(obj.dataObjSource, clazz, 'dataObjSource')
		this.idx = nbrRequired(obj.tabIdx, clazz, 'idx')
		this.label = valueOrDefault(obj.label, '')
		this.levelIdx = nbrRequired(obj.levelIdx, clazz, 'levelIdx')
		this.metaData.init(obj.parms)
		this.nodeId = valueOrDefault(obj.nodeId, '')
		this.parms = valueOrDefault(obj.parms, {})
	}
	detailGetData() {
		return this.data ? this.data.getDetailRecord() : {}
	}
	detailSetData(data: DataRecord) {
		if (this.data) this.data.setDetailRecord(data)
	}

	detailSetRowStatus(newStatus: DataRecordStatus) {
		this.data?.setDetailRecordStatus(newStatus)
	}

	getTable() {
		return this.dataObj?.rootTable?.name
	}

	listCrumbLabelId() {
		let id = ''
		const crumbFieldNames: Array<string> = this.dataObj?.raw.crumbs ? this.dataObj.raw.crumbs : []
		const idCurrent = this.metaData.valueGetId()
		if (crumbFieldNames.length > 0 && idCurrent) {
			const dataRow = this.listGetData()
			if (dataRow) {
				crumbFieldNames.forEach((f) => {
					if (Object.hasOwn(dataRow, f)) {
						if (dataRow[f]) {
							if (id) id += ' '
							id += dataRow[f]
						}
					}
				})
			}
		}
		return id ? ` [${id}]` : ''
	}

	listGetData() {
		const idCurrent = this.metaData.valueGetId()
		const records = this.listGetRecords()
		return records && idCurrent
			? records.find((row) => {
					return row.id === idCurrent
				}) || {}
			: {}
	}
	listGetRecords(): DataRecord[] {
		const idList: string[] = this.metaData.valueGetIdList()
		return idList
			? idList.map((id) => {
					return this?.data?.dataRows.find((row) => row.record.id === id)?.record || []
				})
			: []
	}

	listGetRow() {
		const idCurrent = this.metaData.valueGetId()
		const records = this.listGetRecords()
		return idCurrent && records
			? records.findIndex((row) => {
					return row.id === idCurrent
				})
			: -1
	}
	listHasRecords() {
		return this.data?.dataRows.length && this.data?.dataRows.length > 0
	}
	listRowStatus() {
		const idCurrent = this.metaData.valueGetId()
		const listRecords = this.listGetRecords()
		if (listRecords && idCurrent) {
			const rowIdx = listRecords.findIndex((record) => {
				return record.id === idCurrent
			})
			if (rowIdx > -1) return new AppLevelRowStatus(listRecords.length, rowIdx)
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
			this.metaData.valueSetId(listRecords[rowIdx].id)
		}
	}
	reset() {
		this.isRetrieved = false
	}
	updateDataObjSource() {
		return this.dataObjSource.updateSources({ rawDataObj: this.rawDataObj })
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
