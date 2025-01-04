<script lang="ts">
	import {
		ContextKey,
		type DataObj,
		type DataObjData,
		ParmsValuesType,
		required,
		valueOrDefault
	} from '$utils/types'
	import { getContext } from 'svelte'
	import { AppLevelRowStatus } from '$comps/app/types.app.svelte'
	import { State, StateSurfaceModal } from '$comps/app/types.appState.svelte'
	import ContentFormDetailApp from '$comps/form/ContentFormDetailApp.svelte'
	import ContentFormDetailRepConfig from '$comps/form/ContentFormDetailRepConfig.svelte'
	import ContentFormListApp from '$comps/form/ContentFormListApp.svelte'
	import GridSelect from '$comps/grid/GridSelect.svelte'
	import DataObjActionsObj from '$comps/dataObj/DataObjActionsObj.svelte'
	import DataViewer from '$utils/DataViewer.svelte'
	import NavRow from '$comps/nav/NavRow.svelte'

	const FILENAME = '$comps/layout/LayoutContent.svelte'
	const comps: Record<string, any> = {
		FormDetail: ContentFormDetailApp,
		FormDetailRepConfig: ContentFormDetailRepConfig,
		FormList: ContentFormListApp,
		ModalSelect: GridSelect
	}

	let { parms }: DataRecord = $props()
	let sm: State = required(getContext(ContextKey.stateManager), FILENAME, 'sm')
	let dm: DataManager = $derived(sm.dm)

	let cancelForm: Function = getContext(ContextKey.cancelForm) || undefined

	let Component = $state(comps[parms.component])
	let dataObj: DataObj = $derived(dm.getDataObj(parms.dataObjId))

	// header parms
	let headerObj = $derived(
		sm.layoutHeader.headerText
			? sm.layoutHeader.headerText
			: sm.layoutHeader.isDataObj
				? dataObj?.raw?.header
				: ''
	)

	let headerObjSub = $derived(
		sm.layoutHeader.isDataObj ? (dataObj?.raw?.subHeader ? dataObj?.raw?.subHeader : '') : ''
	)
	let isDrawerClose = $derived(sm.layoutHeader.isDrawerClose)
	let rowStatus = $derived(sm.layoutHeader.isRowStatus ? sm.app.getRowStatus() : undefined)

	// header styling
	let classHeader = $derived(
		(dataObj && dataObj.actionsField.length > 0) || headerObj || headerObjSub || rowStatus
			? 'border p-4 '
			: ''
	)

	function cancel(event: MouseEvent) {
		if (cancelForm) cancelForm()
	}
</script>

<!-- <DataViewer header="rowStatus" data={rowStatus} /> -->

<div class="h-full max-h-full flex flex-col p-3 {headerObj ? 'border p-3 rounded-md' : ''}">
	{#if Component}
		{#if headerObj}
			<div class="mb-4">
				<div class="flex justify-between items-start">
					<h2 class="h2">{headerObj}</h2>
					<div>
						{#if sm.layoutHeader.isRowStatus}
							<NavRow />
						{/if}
						{#if sm.layoutHeader.isDrawerClose}
							<button
								type="button"
								class="btn-icon btn-icon-sm variant-filled-error"
								onclick={cancel}
							>
								X
							</button>
						{/if}
					</div>
				</div>
				{#if headerObjSub}
					<h4 class="mt-1 h4 text-gray-500">{headerObjSub}</h4>
				{/if}
			</div>
		{/if}

		<div class="h-full">
			<Component {parms} />
		</div>
	{/if}
</div>
