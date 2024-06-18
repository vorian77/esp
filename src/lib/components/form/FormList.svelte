<script lang="ts">
	import { State, StateMode, StateSurfaceModal, StateLayoutStyle } from '$comps/app/types.appState'
	import {
		DataObj,
		DataObjData,
		DataObjSort,
		DataObjSortItem,
		required,
		strRequired
	} from '$utils/types'
	import type { DataRecord } from '$utils/types'
	import { recordsFilter, recordsSelectAll, sortInit, sortUser } from '$comps/form/formList'
	import { Field } from '$comps/form/field'
	import { dndzone } from 'svelte-dnd-action'
	import { flip } from 'svelte/animate'
	import Header from '$comps/form/FormListHeader.svelte'
	import FormElement from '$comps/form/FormElement.svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormList.svelte'
	const animationDurationMs = 300
	let dataHeightPadding = '400' //  <todo> 240314 - calc specific padding
	let dataHeight = `max-height: calc(100vh - ${dataHeightPadding}px);`

	export let state: State
	export let dataObj: DataObj
	export let dataObjData: DataObjData

	let dragDisabled = false
	let listFilterText = ''
	let listSortObj: DataObjSort = new DataObjSort()
	let scrollToTop = () => {}

	let isSelect =
		state instanceof StateSurfaceModal && state.layoutStyle === StateLayoutStyle.overlayModalSelect
	let isSelectMulti = state instanceof StateSurfaceModal
	let isSelectMultiAll = false

	$: loadData(dataObjData)

	function loadData(data: DataObjData) {
		dataObj.objData = data
		state.objStatus.setValid(dataObj.preValidate())
		state = state

		// list edit status
		if (dataObj.raw.isListEdit) {
			const presetRows = dataObjData.dataRows.filter((row) => row.record.id.startsWith('preset_'))
			presetRows.forEach((row) => {
				dataObj.dataFieldsChanged.valueSet(row.record.id + '_new', -1, true)
			})
			state.objStatus.setChanged(dataObj.getStatusChanged())
		}

		// filter
		listFilterText = state.dataObjParms.parmGet(dataObj.raw.id, 'listFilterText') || ''
		onFilter(listFilterText)

		// sort
		listSortObj = state.dataObjParms.parmGet(dataObj.raw.id, 'listSortObj')
		if (!listSortObj) {
			listSortObj = sortInit(dataObj.fields)
			state.dataObjParms.parmSet(dataObj.raw.id, 'listSortObj', listSortObj)
		}
		dataObj.dataRecordsDisplay = sortUser(listSortObj, dataObj.dataRecordsDisplay)

		if (state instanceof StateSurfaceModal) {
			state.dataQuery.valueGetIdList().forEach((id) => onSelect(id))
		}
	}

	$: dragDisabled = !state.modeActive(StateMode.ReorderOn)

	$: if (state instanceof StateSurfaceModal) {
		const selectedRecords = dataObj.dataRecordsDisplay.filter((r) => r.selected)
		setMetaValue(
			'listRecordIdList',
			selectedRecords.map((r) => r.id)
		)
	}

	function onFilter(filterText: string) {
		dataObjData.syncFields(dataObj.dataRecordsDisplay, ['selected'])
		recordsFilter(filterText, dataObj, dataObj.fields)
		dataObj.dataRecordsDisplay = sortUser(listSortObj, dataObj.dataRecordsDisplay)
		isSelectMultiAll = recordsSelectAll(dataObj.dataRecordsDisplay)
		state.dataObjParms.parmSet(dataObj.raw.id, 'listFilterText', filterText)
	}

	function onReorder(e: any) {
		dataObj.dataRecordsDisplay = e.detail.items
	}
	function onReorderFinalize(e: any) {
		dataObj.dataRecordsDisplay = e.detail.items
		const listReorderColumn = dataObj.raw.listReorderColumn

		if (listReorderColumn) {
			let order = -1
			dataObj.dataRecordsDisplay.forEach((record: DataRecord) => {
				order++
				dataObj.valueSet(record.id, listReorderColumn, order)
			})

			state.objStatus.setChanged(dataObj.getStatusChanged())
			state = state
		}
	}
	function onReorderTransformDraggedElement(draggedEl, data, index) {
		draggedEl.innerHTML = `New order: ${(index + 1) * 10}`
	}

	async function onRowClick(record: DataRecord, field: Field) {
		const actions = dataObj.actionsField.filter((a) => a.isListRowAction)

		if (state.modeActive(StateMode.ReorderOn) || !actions) return

		if (actions.length > 1) {
			error(500, {
				file: FILENAME,
				function: 'FormList.onRowClick',
				message: `More than 1 List Row Action defined for Data Object: ${dataObj.raw.name} `
			})
		}

		state.dataQuery.dataSave({
			listRecordIdList: dataObj.dataRecordsDisplay.map((r: any) => r.id),
			listRecordIdCurrent: record.id
		})

		console.log('FormList.onRowClick:', { action: actions[0], record, field, state })

		actions[0].proxyExe({ dataObj, field, record, state })
	}

	function onSelect(id: string) {
		const row = dataObj.dataRecordsDisplay.findIndex((record) => record.id === id)
		if (row !== -1)
			dataObj.dataRecordsDisplay[row].selected = !dataObj.dataRecordsDisplay[row].selected

		if (!isSelectMulti) {
			dataObj.dataRecordsDisplay = dataObj.dataRecordsDisplay.map((r) => {
				r.selected = r.id === id ? r.selected : false
				return r
			})
		}
		isSelectMultiAll = recordsSelectAll(dataObj.dataRecordsDisplay)
	}
	function onSelectAll() {
		isSelectMultiAll = !isSelectMultiAll
		dataObj.dataRecordsDisplay = dataObj.dataRecordsDisplay.map((r) => {
			r.selected = isSelectMultiAll
			return r
		})
	}
	function onSort(newSortObj: DataObjSortItem) {
		listSortObj = new DataObjSort(newSortObj)
		dataObj.dataRecordsDisplay = sortUser(listSortObj, dataObj.dataRecordsDisplay)
		state.dataObjParms.parmSet(dataObj.raw.id, 'listSortObj', listSortObj)
	}

	function setMetaValue(key: string, value: any) {
		state.dataQuery.valueSet(key, value)
		state = state
	}
</script>

<!-- <DataViewer header="state.objStatus" data={state.objStatus} /> -->

<div class="w-full flex mb-6 justify-between">
	<button
		class="btn variant-filled-primary mr-4 {listFilterText === '' ? 'hidden' : ''}"
		on:click={() => {
			listFilterText = ''
			onFilter('')
		}}
	>
		Reset
	</button>
	<input
		class="w-full"
		type="text"
		id="formSearch"
		bind:value={listFilterText}
		on:keyup={() => onFilter(listFilterText)}
		placeholder="Search..."
	/>
	{#if dataObj.dataRecordsDisplay}
		<span class="ml-4">Rows: {dataObj.dataRecordsDisplay.length}</span>
	{/if}
</div>

<div class="overflow-y-scroll" style={dataHeight}>
	<table id="formList" class="w-full">
		<thead>
			<tr>
				{#if dataObj.fields}
					{#if isSelect}
						<th class="selection">
							{#if isSelectMulti}
								<input type="checkbox" on:click={() => onSelectAll()} checked={isSelectMultiAll} />
							{/if}
						</th>
					{/if}
					{#each dataObj.fields as field}
						<th><Header {field} sortObj={listSortObj} sortField={onSort} /></th>
					{/each}
				{/if}
			</tr>
		</thead>
		<tbody
			use:dndzone={{
				items: dataObj.dataRecordsDisplay,
				flipDurationMs: animationDurationMs,
				transformDraggedElement: onReorderTransformDraggedElement,
				dragDisabled
			}}
			on:consider={onReorder}
			on:finalize={onReorderFinalize}
		>
			{#each dataObj.dataRecordsDisplay as record, row (record.id)}
				<tr tabindex="0" animate:flip={{ duration: animationDurationMs }}>
					{#if isSelect}
						<td>
							<div class="p-2">
								<input
									type="checkbox"
									on:click={() => onSelect(record.id)}
									checked={record.selected}
								/>
							</div>
						</td>
					{/if}
					{#each dataObj.fields as field}
						<td
							on:click={async () => await onRowClick(record, field)}
							on:keyup={async () => await onRowClick(record, field)}
						>
							<FormElement bind:state {dataObj} {dataObjData} {field} {row} />
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<!-- <DataViewer header="dataObjData.dataRecords" data={dataObjData?.dataRows} /> -->

<style>
	#formSearch {
		border: 1px solid #f1f1f1;
	}
	thead {
		background-color: #f1f1f1;
		border: 1px solid #f1f1f1;
	}
	tbody td {
		border: 1px solid #f5f5f5;
		padding: 0px 0px;
	}
	tbody tr {
		transition: all, 0.2s;
	}
	tbody tr:hover {
		background: #f5f5f5;
	}
	tbody tr.active:hover {
		background: var(--primary-lighten-2);
	}
	td :global(b) {
		font-weight: normal;
		color: #bdbdbd;
		font-family: JetBrains;
		font-size: 11px;
	}
	.selection {
		width: 20px;
		padding: 8px;
	}
	tr:nth-child(even) {
		background-color: #97ed9e;
	}
</style>
