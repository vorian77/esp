<script lang="ts">
	import { State } from '$comps/app/types.appState'
	import { DataObj, DataObjData, type DataRecord, ResponseBody, User } from '$utils/types'
	import { apiFetch, ApiFunction } from '$routes/api/api'
	import {
		TokenApiQuery,
		TokenApiQueryType,
		TokenApiQueryData,
		TokenApiUserPref,
		TokenApiDbDataObjSource,
		TokenAppDoActionConfirmType,
		TokenAppModalSelect,
		TokenAppModalReturnType
	} from '$utils/types.token'

	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/wizard/WizardSysRep.svelte'

	export let user: User

	class Table {
		items: TableItem[] = []
		constructor() {}
		addItem(label: string, value: string) {
			this.items.push(new TableItem(label, value))
		}
		addItemRecord(propName: string) {
			const label = getPropLabel(propName)
			const value = record[propName]
			this.addItem(label, value)
		}
	}
	class TableItem {
		label: string
		value: string
		constructor(label: string, value: string) {
			this.label = label
			this.value = value
		}
	}

	let dataObj: DataObj
	let record: DataRecord = {}
	let state = new State({})
	let table = new Table()

	const getPropLabel = (propName: string) => {
		const field = dataObj.fields.find((f) => f.colDO.propName === propName)
		return field ? field.colDO.label : propName
	}

	let promise = getData()

	async function getData() {
		const dataObjName = 'data_obj_ai_report_wizard_student_summary'
		const result: ResponseBody = await apiFetch(
			ApiFunction.dbEdgeProcessDataObj,
			new TokenApiQuery(
				TokenApiQueryType.retrieve,
				new TokenApiDbDataObjSource({ dataObjName }),
				new TokenApiQueryData({ record: {} })
			)
		)
		const dataResult = DataObjData.load(result.data.dataObjData)
		dataObj = await DataObj.init(state, dataResult)
		record = dataResult.rowsRetrieved.dataRows.map((row) => row.record)[0]

		dataObj.fields.forEach((field) => {
			table.addItemRecord(field.colDO.propName)
		})
	}
</script>

<div class=" p-2 border-4 bg-gray-300 min-h-60 flex flex-col items-center">
	<h1 class="text-center1 text-blue-400">Atlantic Impact - Quick Data Widget</h1>
	<div class="grid grid-cols-4 gap-4 p-4 border-2 border-gray-400 my-4 w-[90%] text-xs">
		{#await promise}
			<p>Loading report...</p>
		{:then}
			{#each table.items as item}
				<div class="p-1 border-2 border-gray-400 col-span-3">{item.label}</div>
				<div class="p-1 border-2 border-gray-400 text-right">{item.value}</div>
			{/each}
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	</div>
</div>
