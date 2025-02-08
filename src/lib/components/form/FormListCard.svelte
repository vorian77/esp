<script lang="ts">
	import { State } from '$comps/app/types.appState.svelte'
	import {
		ContextKey,
		DataManager,
		DataObj,
		type DataRecord,
		ParmsValuesType,
		required
	} from '$utils/types'
	import { getContext } from 'svelte'
	import { Field, FieldAccess } from '$comps/form/field.svelte'
	import ListFilter from '$comps/form/ListFilter.svelte'
	import DataObjActionsObj from '$comps/dataObj/DataObjActionsObj.svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormListCard.svelte'

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)

	let dataObj: DataObj = $derived(dm.getDataObj(parms.dataObjId))
	let dataObjData = $derived(dataObj.data)
	let dataRecordsDisplay = $derived(dm.getRecordsDisplayList(parms.dataObjId))

	let fields = $derived.by(() => {
		const fieldsCore = dataObj.fields.filter(
			(f) => f.colDO.isDisplayable || f.colDO.propName === 'id'
		)
		return fieldsCore
	})

	let winH: number = $state()
	let elContent: any = $state()
	let contentH: number = $state()

	function handleResize() {
		let rect = elContent.getBoundingClientRect()
		contentH = winH - rect.top - 60
		if (contentH < 0) contentH = 0
	}

	async function onclick(record: DataRecord) {
		if (record) {
			const doa = dataObj.userActions[dataObj.actionsFieldListRowActionIdx]
			dataObj.data.parms.valueSet(ParmsValuesType.listIds, getListIds())
			dataObj.data.parms.valueSet(ParmsValuesType.listRecordIdCurrent, record.id)
			doa.action.trigger(sm, dataObj)
		}

		function getListIds() {
			return dataRecordsDisplay.map((rec) => rec.id)
		}
	}

	function filterList(filter: string) {
		dm.filterList(parms.dataObjId, filter)
	}
</script>

<svelte:window bind:innerHeight={winH} onresize={() => handleResize()} />

<div class="h-full flex flex-col">
	<ListFilter
		filter={''}
		fSetFilter={filterList}
		isHideFilter={false}
		rowCountFiltered={dm.getRecordsDisplayListCount(parms.dataObjId)}
		rowCountSelected={undefined}
	/>
	<div
		bind:this={elContent}
		class="mt-3 flex flex-col border rounded-lg"
		style="height: {contentH}px"
	>
		<div class="overflow-y-auto">
			{#each dataRecordsDisplay as rec, recIdx (rec.id)}
				<button
					class="w-full text-left p-4 border-b cursor-pointer hover:bg-gray-100"
					onclick={async () => onclick(rec)}
				>
					{#each fields as field, fieldIdx}
						{@const fieldName = field.colDO.propName}
						{@const isDisplayable = field.colDO.propName !== 'id'}
						{#if isDisplayable}
							<p>
								<span class="text-gray-400">{field.colDO.labelSide}:</span>
								{rec[fieldName]}
							</p>
						{/if}
					{/each}
				</button>
			{/each}
		</div>
	</div>
	<DataObjActionsObj {parms} />
</div>
