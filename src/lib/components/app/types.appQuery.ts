import { App, AppLevelTab } from '$comps/app/types.app'
import { State, StateSurfaceEmbedShell, StateSurfaceModalEmbed } from '$comps/app/types.appState'
import {
	arrayOfClasses,
	debug,
	DataObj,
	type DataRecord,
	DataObjCardinality,
	DataObjData,
	DataRecordStatus,
	getArray,
	memberOfEnum,
	ParmsValuesType,
	required,
	ResponseBody,
	strRequired,
	UserTypeResource,
	UserTypeResourceType,
	valueOrDefault
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
	queryType: TokenApiQueryType
) {
	const clazz = `${FILENAME}.query`

	if (!tab) return false
	let { dataTab, dataTree } = queryDataPre(state, tab, queryType)

	/* set parm - appSystemId */
	if (tab.isSystemRoot && queryType === TokenApiQueryType.preset && state.user) {
		const appSystemId = state.app.appSystemIdGet()
		if (!appSystemId) {
			const userSystemResource: UserTypeResource | undefined = await state.user.selectResource(
				state,
				UserTypeResourceType.system
			)
			if (userSystemResource) state.app.appSystemIdSet(userSystemResource.resource.id)
		}
		dataTab.parms.valueSet(ParmsValuesType.appSystemId, state.app.appSystemIdGet())
	}

	if (tab.isSystemRoot && queryType === TokenApiQueryType.retrieve) {
		dataTab.parms.valueSet(ParmsValuesType.isSystemRoot, true)
	}

	if (tab.isProgramObject) {
		dataTab.parms.valueSet(ParmsValuesType.appSystemId, state.app.appSystemIdGet())
	}

	// set other parms
	const queryData = new TokenApiQueryData({ dataTab, tree: dataTree })
	let table = tab.getTable() // table will be undefined prior to retrieve

	// query actions - pre
	if (tab.dataObj && dataTab.rowsSave.getRows().length > 0) {
		dataTab = await queryExecuteActions(
			state,
			tab.dataObj.actionsQueryFunctions,
			queryType,
			DataObjActionQueryTriggerTiming.pre,
			table,
			dataTab
		)
	}

	document.body.style.setProperty('cursor', 'wait', 'important')
	const result: ResponseBody = await queryExecute(tab.getDataObjSource(), queryType, queryData)
	document.body.style.setProperty('cursor', 'default')

	if (!result.success) {
		console.error('types.appQuery.query failed', result)
		return false
	}
	// successful
	let dataResult = DataObjData.load(result.data.dataObjData)
	// console.log('types.appQuery.dataResult:', {
	// 	dataResult,
	// 	rawDataObj: dataResult.rawDataObj
	// })
	tab.dataObj = await DataObj.init(state, dataResult)
	table = tab.getTable()

	// query actions - post
	if (tab.dataObj) {
		dataResult = await queryExecuteActions(
			state,
			tab.dataObj.actionsQueryFunctions,
			queryType,
			DataObjActionQueryTriggerTiming.post,
			table,
			dataResult
		)
		tab.data = dataResult
		tab.isRetrieved = !tab.isAlwaysRetrieveData
		if (
			tab.isSystemRoot &&
			tab.dataObj.raw.codeCardinality === DataObjCardinality.detail &&
			queryType === TokenApiQueryType.retrieve
		) {
			state.app.appSystemIdSet(
				strRequired(
					tab.data.rowsRetrieved.getDetailRecordValue(`_${ParmsValuesType.appSystemId}_`),
					clazz,
					'appSystemId'
				)
			)
		}
		if (tab.dataObj.raw.codeCardinality === DataObjCardinality.list) {
			tab.data.parms.valueSetList(ParmsValuesType.listIds, tab.data.rowsRetrieved.getRows())
		}
	}
	return true
}

function queryDataPre(state: State, tab: AppLevelTab, queryType: TokenApiQueryType) {
	const clazz = `${FILENAME}.queryDataPre`

	// dataTree
	const dataTree = queryDataPreTree(
		queryType,
		(state instanceof StateSurfaceEmbedShell || state instanceof StateSurfaceModalEmbed) &&
			state?.stateRoot?.app
			? state.stateRoot.app
			: state.app
	)

	// dataTab
	const dataTab = tab.data ? tab.data : new DataObjData()
	dataTab.parms.update(state.parmsState.valueGetAll())

	// embedParentId
	if (state instanceof StateSurfaceModalEmbed) {
		dataTab.parms.valueSet(ParmsValuesType.embedParentId, state.embedParentId)
	}

	state.parmsState.valueSet(ParmsValuesType.listRecordIdCurrent, dataTree.getValue('', 'id'))

	return { dataTree, dataTab }
}

function queryDataPreTree(queryType: TokenApiQueryType, app: App) {
	const clazz = `${FILENAME}.queryDataPreTree`
	let dataTree = new TokenApiQueryDataTree()
	let offset = 0

	switch (queryType) {
		case TokenApiQueryType.preset:
		case TokenApiQueryType.retrievePreset:
			offset = 2
			break
		case TokenApiQueryType.retrieve:
			offset = 1
			break
		case TokenApiQueryType.save:
			offset = 1
			break
		default:
			error(500, {
				file: FILENAME,
				function: clazz,
				message: `No case defined for queryType: ${queryType}`
			})
	}

	for (let i = 0; i < app.levels.length - offset; i++) {
		const level = app.levels[i]
		const currTab = level.getCurrTab()
		const dataObj = required(currTab.dataObj, clazz, 'currTab.dataObj')
		const table = required(dataObj.rootTable?.name, 'rootTable', 'DataObj')
		const record = currTab.listGetDataRecord()
		dataTree.upsertData(table, record)
	}
	return dataTree
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
			if (result.data && result.data.getDetailRowStatusIs(DataRecordStatus.delete)) {
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
	for (const f of actionsQueryFunctions) {
		data = await f.execute(
			f.actionsQuery.name,
			state,
			queryType,
			queryTiming,
			table,
			data,
			f.actionsQuery.parms
		)
	}
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
