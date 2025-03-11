import { App, AppLevelTab } from '$comps/app/types.app.svelte'
import { State } from '$comps/app/types.appState.svelte'
import {
	arrayOfClass,
	DataObj,
	type DataRecord,
	DataObjCardinality,
	DataObjData,
	DataObjQueryRiderTriggerTiming,
	DataRecordStatus,
	getArray,
	memberOfEnum,
	ParmsValuesType,
	required,
	ResponseBody,
	strRequired,
	valueOrDefault
} from '$utils/types'
import { apiFetchFunctionRaw, ApiFunction } from '$routes/api/api'
import {
	TokenApiDbDataObjSource,
	TokenApiQuery,
	TokenApiQueryType,
	TokenApiQueryData,
	TokenApiQueryDataTree
} from '$utils/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/app/types.appQuery.ts'

export function queryDataPre(
	sm: State,
	data: DataObjData | undefined,
	queryType: TokenApiQueryType
) {
	const clazz = `${FILENAME}.queryDataPre`

	// dataTree
	const dataTree = queryDataPreTree(queryType, sm.stateRoot ? sm.stateRoot.app : sm.app)

	// dataTab & parms
	const dataTab = data ? DataObjData.load(data) : new DataObjData()
	dataTab.parms.update(sm.parmsState.valueGetAll())
	dataTab.parms.update(sm.parmsTrans.valueGetAll())

	// default for fieldListItems itemChanges
	dataTab.parms.valueSetIfMissing(ParmsValuesType.itemsParmValue, '')

	sm.parmsState.valueSet(ParmsValuesType.listRecordIdCurrent, dataTree.getValue('', 'id'))

	return { dataTree, dataTab }
}

function queryDataPreTree(queryType: TokenApiQueryType, app: App) {
	const clazz = `${FILENAME}.queryDataPreTree`
	let offset = queryType === TokenApiQueryType.preset ? 1 : 0
	return app.getDataTree(offset)
}

export async function queryExecute(
	dataObjSource: TokenApiDbDataObjSource,
	queryType: TokenApiQueryType,
	queryData: TokenApiQueryData
) {
	const result: ResponseBody = await apiFetchFunctionRaw(
		ApiFunction.dbGelProcessDataObj,
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

export async function queryTypeBase(
	sm: State,
	dataObjSource: TokenApiDbDataObjSource,
	dataObjData: DataObjData | undefined,
	dataTree: TokenApiQueryDataTree,
	queryType: TokenApiQueryType
) {
	const clazz = `${FILENAME}.queryTypeBase`

	const queryData = new TokenApiQueryData({
		dataTab: dataObjData,
		tree: dataTree,
		user: sm.user
	})

	// retrieve data
	document.body.style.setProperty('cursor', 'wait', 'important')
	const result: ResponseBody = await queryExecute(dataObjSource, queryType, queryData)
	document.body.style.setProperty('cursor', 'default')

	if (!result.success) {
		error(500, {
			file: FILENAME,
			function: clazz,
			message: `Unable to complete query: ${queryType} - ${result.message}`
		})
	}

	// successful
	dataObjData = DataObjData.load(result.data.dataObjData)
	const dataObj = await DataObj.init(sm, dataObjData, queryType)

	if (dataObj && dataObj.raw.codeCardinality === DataObjCardinality.list) {
		dataObj.data.parms.valueSetList(ParmsValuesType.listIds, dataObj.data.rowsRetrieved.getRows())
	}

	return dataObj
}

export async function queryTypeDataObj(
	sm: State,
	dataObjId: string,
	dataObjData: DataObjData | undefined,
	queryType: TokenApiQueryType
) {
	const clazz = `${FILENAME}.queryTypeDataObj`

	let { dataTab, dataTree }: { dataTab: DataObjData; dataTree: TokenApiQueryDataTree } =
		queryDataPre(sm, dataObjData, queryType)

	let dataObjSource: TokenApiDbDataObjSource = new TokenApiDbDataObjSource({ dataObjId })

	return await queryTypeBase(sm, dataObjSource, dataTab, dataTree, queryType)
}

export async function queryTypeTab(
	sm: State,
	tab: AppLevelTab | undefined,
	queryType: TokenApiQueryType
) {
	const clazz = `${FILENAME}.queryTypeTab`

	if (!tab) return undefined

	let { dataTab, dataTree } = queryDataPre(sm, tab.dataObj?.data, queryType)

	// query actions - pre
	if (tab.dataObj) {
		dataTab = await tab.dataObj.queryRiders.execute(
			DataObjQueryRiderTriggerTiming.pre,
			queryType,
			sm,
			dataTab
		)
	}

	// dataObjSource
	let dataObjSource: TokenApiDbDataObjSource
	if (tab.dataObjSource) {
		dataObjSource = tab.dataObjSource
	} else {
		let sourceParms: DataRecord = {}
		sourceParms['dataObjId'] = strRequired(
			tab.dataObjId ? tab.dataObjId : tab.dataObj?.raw?.id,
			`${FILENAME}.quryTypeTab.dataObjSource`,
			'dataObjId'
		)
		dataObjSource = new TokenApiDbDataObjSource(sourceParms)
		if (tab.dataObj) {
			dataObjSource.updateReplacements({
				exprFilter: tab?.dataObj?.raw?.exprFilter
			})
		}
	}
	let dataObj = await queryTypeBase(sm, dataObjSource, dataTab, dataTree, queryType)

	// query post
	if (dataObj) {
		dataObj.setTreeLevelIdx(tab.treeLevelIdx)
		tab.isRetrieved = !tab.isAlwaysRetrieveData
		tab.dataObj = dataObj
		dataObj.data = await tab.dataObj.queryRiders.execute(
			DataObjQueryRiderTriggerTiming.post,
			queryType,
			sm,
			dataObj.data
		)
	}
	return dataObj
}
