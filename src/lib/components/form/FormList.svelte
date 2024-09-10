<script lang="ts">
	import { State, StateSurfaceModal, StateLayoutStyle } from '$comps/app/types.appState'
	import {
		DataObj,
		DataObjData,
		DataObjEmbedType,
		DataObjMode,
		DataObjSort,
		DataObjSortItem,
		ParmsObjType,
		ParmsUser,
		ParmsUserParmType,
		required,
		strRequired
	} from '$utils/types'
	import type { DataRecord } from '$utils/types'
	import { recordsSearch, recordsSelectAll, sortInit, sortUser } from '$comps/form/formList'
	import { Field } from '$comps/form/field'
	import { dndzone } from 'svelte-dnd-action'
	import { flip } from 'svelte/animate'
	import Header from '$comps/form/FormListHeader.svelte'
	import FormElement from '$comps/form/FormElement.svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'
	import AGGrid from '$comps/form/AgGridSvelte.svelte'

	const FILENAME = '$comps/form/FormList.svelte'
	const animationDurationMs = 300
	let dataHeightPadding = '400' //  <todo> 240314 - calc specific padding
	let dataHeight = `max-height: calc(100vh - ${dataHeightPadding}px);`

	export let state: State
	export let dataObj: DataObj
	export let dataObjData: DataObjData

	let listFilterText = ''
	let listSortObj: DataObjSort = new DataObjSort()
	let scrollToTop = () => {}
	let fieldsDisplayable: Field[] = []

	let isSelect =
		state instanceof StateSurfaceModal && state.layoutStyle === StateLayoutStyle.overlayModalSelect
	let isSelectMulti = state instanceof StateSurfaceModal
	let isSelectMultiAll = false

	$: load(dataObjData)

	function load(data: DataObjData) {
		if (!dataObj.isListEmbed) dataObj.objData = data

		if (isSelect) {
			const selectedRecords = state.parmsState.valueGet(ParmsObjType.listRecordIdSelected) || []
			dataObj.dataRecordsDisplay.forEach((record) => {
				record.selected = selectedRecords.includes(record.id)
			})
			isSelectMultiAll = recordsSelectAll(dataObj.dataRecordsDisplay)
		}

		fieldsDisplayable = dataObj.fields.filter((f) => f.colDO.isDisplayable)

		// listEdit
		if (dataObj.raw.isListEdit) {
			const presetRows = dataObj.data.rowsRetrieved
				.getRows()
				.filter((row) => row.record.id.startsWith('preset_'))
			presetRows.forEach((row) => {
				dataObj.dataFieldsChanged.valueSet(row.record.id + '_new', 'id', true)
			})
		}

		// filter
		listFilterText = state.parmsUser.parmGet(dataObj.raw.id, ParmsUserParmType.listSearchText) || ''
		// onFilter(listFilterText)

		// sort
		listSortObj = state.parmsUser.parmGet(dataObj.raw.id, ParmsUserParmType.listSortObj)
		if (!listSortObj) {
			listSortObj = sortInit(fieldsDisplayable)
			state.parmsUser.parmSet(dataObj.raw.id, ParmsUserParmType.listSortObj, listSortObj)
		}
		// dataObj.dataRecordsDisplay = sortUser(listSortObj, dataObj.dataRecordsDisplay)

		if (!dataObj.isListEmbed) {
			state.setDataObjState(dataObj)
			state = state.setStatus()
		}
	}

	function onFilter(filterText: string) {
		dataObjData.rowsRetrieved.syncFields(dataObj.dataRecordsDisplay, ['selected'])
		recordsSearch(filterText, dataObj, fieldsDisplayable)
		dataObj.dataRecordsDisplay = sortUser(listSortObj, dataObj.dataRecordsDisplay)
		isSelectMultiAll = recordsSelectAll(dataObj.dataRecordsDisplay)
		state.parmsUser.parmSet(dataObj.raw.id, ParmsUserParmType.listSearchText, filterText)
		dataObj.data.parmsState.valueSet(
			ParmsObjType.listRecordIdList,
			dataObj.dataRecordsDisplay.map((r: any) => r.id)
		)
	}

	function onReorder(e: any) {
		dataObj.dataRecordsDisplay = e.detail.items
	}
	function onReorderFinalize(e: any) {
		dataObj.dataRecordsDisplay = e.detail.items
		const listReorderColumn = dataObj.raw.listReorderColumn
		if (dataObj.raw.listReorderColumn) {
			const field = dataObj.fields.find((f) => f.colDO.propName === listReorderColumn)
			if (field) {
				dataObj.dataRecordsDisplay.forEach((record: DataRecord, row) => {
					dataObj = dataObj.setFieldVal(row, field, row)
				})
				state = state.setStatus()
			}
		}
	}
	function onReorderTransformDraggedElement(draggedEl, data, index) {
		draggedEl.innerHTML = `New order: ${(index + 1) * 10}`
	}

	async function onRowClick(record: DataRecord, field: Field) {
		if (dataObj.actionsFieldListRowActionIdx < 0 || dataObj.raw.isListEdit || isSelect) {
			return
		}

		const action = dataObj.actionsField[dataObj.actionsFieldListRowActionIdx]
		dataObj.data.parmsState.valueSet(ParmsObjType.listRecordIdCurrent, record.id)
		action.trigger(state, dataObj)
	}

	function onSelect(id: string) {
		const row = dataObj.dataRecordsDisplay.findIndex((record) => record.id === id)
		if (row > -1) {
			dataObj.dataRecordsDisplay[row].selected = !dataObj.dataRecordsDisplay[row].selected
		}
		if (!isSelectMulti) {
			dataObj.dataRecordsDisplay = dataObj.dataRecordsDisplay.map((r) => {
				r.selected = r.id === id ? r.selected : false
				return r
			})
		}
		isSelectMultiAll = recordsSelectAll(dataObj.dataRecordsDisplay)
		state.parmsState.valueSet(
			ParmsObjType.listRecordIdSelected,
			dataObj.dataRecordsDisplay.filter((r: any) => r.selected).map((r: any) => r.id)
		)
	}
	function onSelectAll() {
		isSelectMultiAll = !isSelectMultiAll
		dataObj.dataRecordsDisplay = dataObj.dataRecordsDisplay.map((r) => {
			r.selected = isSelectMultiAll
			return r
		})
		state.parmsState.valueSet(
			ParmsObjType.listRecordIdSelected,
			dataObj.dataRecordsDisplay.filter((r: any) => r.selected).map((r: any) => r.id)
		)
	}
	function onSort(newSortObj: DataObjSortItem) {
		listSortObj = new DataObjSort(newSortObj)
		dataObj.dataRecordsDisplay = sortUser(listSortObj, dataObj.dataRecordsDisplay)
		state.parmsUser.parmSet(dataObj.raw.id, ParmsUserParmType.listSortObj, listSortObj)
	}
	const isNewList = false
</script>

{#if isNewList}
	<AGGrid bind:state {dataObj} {dataObjData} on:formCancelled on:rowClick />
{:else}
	{#if !dataObj.raw.isListHideSearch}
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
			{#if isSelect}
				<span class="ml-0"
					>Selected: {dataObj.dataRecordsDisplay.filter((r) => r.selected).length}</span
				>
			{/if}
		</div>
	{/if}

	<div class="overflow-y-scroll" style={dataHeight}>
		<table id="formList" class="w-full">
			<thead>
				<tr>
					{#if fieldsDisplayable}
						{#if isSelect}
							<th class="selection">
								{#if isSelectMulti}
									<input
										type="checkbox"
										on:click={() => onSelectAll()}
										checked={isSelectMultiAll}
									/>
								{/if}
							</th>
						{/if}
						{#each fieldsDisplayable as field}
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
					dragDisabled: false
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
						{#each fieldsDisplayable as field}
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
{/if}

<!-- <DataViewer header="fieldsDisplayable" data={fieldsDisplayable.map((f) => f.colDO.propName)} /> -->

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
	/* tbody tr.active:hover {
		background: var(--primary-lighten-2);
	} */
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
