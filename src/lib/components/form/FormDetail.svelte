<script lang="ts">
	import { ContextKey, DataManager, DataObj, type DataRecord, required } from '$utils/types'
	import { getContext } from 'svelte'
	import { Field, FieldAccess } from '$comps/form/field'
	import FormElement from '$comps/form/FormElement.svelte'
	import FormDetailEl from '$comps/form/FormDetailEl.svelte'
	import DataObjActionsObj from '$comps/dataObj/DataObjActionsObj.svelte'
	import { getDetailElements, DetailEl } from '$comps/form/types.detailElement'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/form/FormDetail.svelte'

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)

	let dataObj: DataObj = $derived(dm.getDataObj(parms.dataObjId))
	let elements: DetailEl[] = $state(getDetailElements(dataObj))

	let dataRecord: DataRecord = $derived(dm.getRecordsDisplayRow(parms.dataObjId, 0))
	let actions: DataObjActionsObj

	let isFixedHeight = $derived(parms.isFixedHeight || false)
	let elContent: any = $state()
	let contentH: number = $state()

	let name = 'phyl'

	$effect(() => {
		handleResize()
	})

	function handleResize() {
		const parentHeight = elContent ? elContent.parentElement.offsetHeight : undefined
		contentH = isFixedHeight ? '100%' : Math.round(parentHeight * 0.99) + 'px'
	}
</script>

<!-- <DataViewer header="status.node" data={dm.getStatusNode(parms.dataObjId)} /> -->

<svelte:window onresize={() => handleResize()} />

<div
	bind:this={elContent}
	class="h-full w-full flex flex-col sm:flex-row"
	style="height: {contentH}"
>
	<div class="flex-grow overflow-y-auto rounded-md p-3 border">
		{#each elements as el}
			<FormDetailEl {parms} {dataObj} {el} />
		{/each}
	</div>

	<DataObjActionsObj bind:this={actions} {parms} />
</div>
