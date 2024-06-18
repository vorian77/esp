import { App, AppLevelTab } from '$comps/app/types.app'
import { State } from '$comps/app/types.appState'
import {
	debug,
	DataObj,
	type DataRecord,
	DataObjCardinality,
	DataObjData,
	DataRecordStatus,
	getArray,
	memberOfEnum,
	ResponseBody,
	strRequired,
	valueOrDefault,
	arrayOfClasses
} from '$utils/types'
import { apiFetch, ApiFunction } from '$routes/api/api'
import {
	TokenApiDbDataObjSource,
	TokenApiQuery,
	TokenApiQueryType,
	TokenApiQueryData,
	TokenApiQueryDataTree
} from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/app/types.appQuery.ts'

export async function query(
	state: State,
	tab: AppLevelTab | undefined,
	queryType: TokenApiQueryType,
	app: App | undefined = undefined
) {
	if (!tab) return false
	let { dataTree, dataSave, parms } = queryDataPre(queryType, app)
	const queryData = new TokenApiQueryData({ dataSave, parms, tree: dataTree })
	let table = tab.getTable() // table will be undefined prior to retrieve

	// query actions - pre
	if (dataSave && tab.dataObj) {
		dataSave = await queryExecuteActions(
			state,
			tab.dataObj.actionsQueryFunctions,
			queryType,
			DataObjActionQueryTriggerTiming.pre,
			table,
			dataSave
		)
	}

	const result: ResponseBody = await queryExecute(tab.updateDataObjSource(), queryType, queryData)
	if (!result.success) return false

	// successful
	const dataResult = DataObjData.load(result.data.dataObjData)

	if (!tab.rawDataObj || tab.rawDataObj.isAlwaysRetrieveDataObject) {
		tab.rawDataObj = result.data.rawDataObj
		tab.dataObj = await DataObj.init(state, result.data.rawDataObj)
		table = tab.getTable()
	}

	if (tab.dataObj) {
		// query actions - post
		await queryExecuteActions(
			state,
			tab.dataObj.actionsQueryFunctions,
			queryType,
			DataObjActionQueryTriggerTiming.post,
			table,
			dataResult
		)

		tab.data = dataResult

		tab.isRetrieved =
			!tab.dataObj.raw.isAlwaysRetrieveData && !tab.dataObj.raw.isAlwaysRetrieveDataObject

		if (tab.dataObj.raw.codeCardinality === DataObjCardinality.list) {
			tab.metaData.valueSetList(tab.data.dataRows)
		}
	}

	return true
}

function queryDataPre(queryType: TokenApiQueryType, app: App | undefined = undefined) {
	let dataTree = new TokenApiQueryDataTree()
	let dataSave: DataObjData | undefined = undefined
	let parms: DataRecord = {}

	if (app) {
		let offset = 0
		switch (queryType) {
			case TokenApiQueryType.preset:
				offset = 2
				break
			case TokenApiQueryType.retrieve:
				offset = 1
				break
			case TokenApiQueryType.save:
				offset = 1
				const currTab = app.getCurrTab()
				if (currTab) dataSave = currTab?.data
				break
			default:
				error(500, {
					file: FILENAME,
					function: 'queryDataPre',
					message: `No case defined for queryType: ${queryType}`
				})
		}

		for (let i = 0; i < app.levels.length - offset; i++) {
			const level = app.levels[i]
			const currTab = level.getCurrTab()
			const dataObj = currTab.dataObj
			if (dataObj) {
				const table = dataObj.rootTable?.name
				const record =
					dataObj.raw.codeCardinality === DataObjCardinality.list
						? currTab.listGetData()
						: currTab.detailGetData()
				dataTree.upsertData(table, record)
			}
		}

		// parms
		parms = app.getParms()

		// listRecordIdParent
		const levelCount = app.levels.length
		const levelGrandParent = levelCount - 1 > 0 ? app.levels[levelCount - 3] : undefined
		if (levelGrandParent) {
			const tab = levelGrandParent.getCurrTab()
			if (tab && tab.dataObj?.raw.codeCardinality === DataObjCardinality.list) {
				parms['listRecordIdParent'] = tab.listGetData().id
			}
		}
	}
	return { dataTree, dataSave, parms }
}

export async function queryExecute(
	dataObjSource: TokenApiDbDataObjSource,
	queryType: TokenApiQueryType,
	queryData: TokenApiQueryData
) {
	const result: ResponseBody = await apiFetch(
		ApiFunction.dbEdgeProcessDataObj,
		new TokenApiQuery(queryType, dataObjSource, queryData)
	)
	if (!result.success) {
		let errMsg = result.message
		if (result.message.toLowerCase().includes('invalid query')) {
			if (result.data && result.data.getDetailStatusRecordIs(DataRecordStatus.delete)) {
				errMsg = 'Unable to delete this record.'
				if (result.message.toLowerCase().includes('still referenced in link')) {
					let parts = result.message.split('::')
					let table = parts[parts.length - 1]
					table = table.split(' ')[0]
					errMsg += ` It is referenced in record(s) of child table: ${table}.\n\nThe child table record(s) must be deleted before the parent table record can be deleted.`
				}
			}
			alert(errMsg)
		}
	}
	return result
}

async function queryExecuteActions(
	state: State,
	actionsQueryFunctions: DataObjActionQueryFunction[],
	queryType: TokenApiQueryType,
	queryTiming: DataObjActionQueryTriggerTiming,
	table: string | undefined,
	data: DataObjData
) {
	actionsQueryFunctions.forEach(async (f) => {
		data = await f.execute(
			f.actionsQuery.name,
			state,
			queryType,
			queryTiming,
			table,
			data,
			f.actionsQuery.parms
		)
	})
	return data
}

export class DataObjActionQuery {
	name: string
	parms: DataRecord = {}
	triggers: DataObjActionQueryTrigger[] = []
	constructor(obj: any) {
		const clazz = 'DataObjActionQuery'
		obj = valueOrDefault(obj, {})
		this.name = strRequired(obj.name, clazz, 'name')
		this.parms = this.initParms(obj._parms)
		this.triggers = arrayOfClasses(DataObjActionQueryTrigger, obj._triggers)
	}
	initParms(parms: DataRecord[]) {
		let newParms: DataRecord = {}
		parms = getArray(parms)
		parms.forEach((parm) => {
			const key = parm.key
			const value = parm.value
			newParms[key] = value
		})
		return newParms
	}
}

export class DataObjActionQueryFunction {
	actionsQuery: DataObjActionQuery
	funct: Function
	constructor(actionQuery: DataObjActionQuery, qaFunction: Function) {
		const clazz = 'DataObjActionQueryFunction'
		this.actionsQuery = actionQuery
		this.funct = qaFunction
	}
	activate(timing: DataObjActionQueryTriggerTiming, type: TokenApiQueryType) {
		return (
			this.actionsQuery.triggers.findIndex(
				(trigger) => trigger.timing === timing && trigger.type === type
			) > -1
		)
	}
	async execute(
		queryActionName: string,
		state: State,
		queryType: TokenApiQueryType,
		queryTiming: DataObjActionQueryTriggerTiming,
		table: string | undefined,
		data: DataObjData,
		parms: DataRecord
	): Promise<DataObjData> {
		if (!this.activate(queryTiming, queryType)) return data
		return this.funct(queryActionName, state, queryType, queryTiming, table, data, parms)
	}
}

export class DataObjActionQueryTrigger {
	type: TokenApiQueryType
	timing: DataObjActionQueryTriggerTiming
	constructor(obj: any) {
		const clazz = 'DataObjActionQueryTrigger'
		this.type = memberOfEnum(
			obj._codeQueryType,
			clazz,
			'type',
			'TokenApiQueryType',
			TokenApiQueryType
		)
		this.timing = memberOfEnum(
			obj._codeTriggerTiming,
			clazz,
			'timing',
			'DataObjActionQueryTriggerTiming',
			DataObjActionQueryTriggerTiming
		)
	}
}

export enum DataObjActionQueryTriggerTiming {
	post = 'post',
	pre = 'pre'
}
