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

	const FILENAME = '$comps/layout/LayoutContent.svelte'
	const comps: Record<string, any> = {
		FormDetail: ContentFormDetailApp,
		FormDetailRepConfig: ContentFormDetailRepConfig,
		FormList: ContentFormListApp,
		ModalSelect: GridSelect
	}

	let { parms }: DataRecord = $props()
	let stateApp: State = required(getContext(ContextKey.stateApp), FILENAME, 'stateApp')
	let dm: DataManager = required(getContext(ContextKey.dataManager), FILENAME, 'dataManager')
	let cancelForm: Function = getContext(ContextKey.cancelForm) || undefined

	let Component = $state(comps[parms.component])
	let dataObj: DataObj = $derived(dm.getDataObj(parms.dataObjId))

	// header parms
	let headerObj = $derived(
		stateApp.layoutHeader.headerText
			? stateApp.layoutHeader.headerText
			: stateApp.layoutHeader.isDataObj
				? dataObj?.raw?.header
				: ''
	)

	let headerObjSub = $derived(
		stateApp.layoutHeader.isDataObj ? (dataObj?.raw?.subHeader ? dataObj?.raw?.subHeader : '') : ''
	)
	let isDrawerClose = $derived(stateApp.layoutHeader.isDrawerClose)
	let rowStatus = $derived(
		stateApp.layoutHeader.isRowStatus ? stateApp.app.getRowStatus() : undefined
	)

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

<DataViewer header="rowStatus" data={rowStatus} />

{#if Component}
	{#if headerObj}
		<div class="mb-4">
			<div class="flex justify-between items-start">
				<h2 class="h2">{headerObj}</h2>
				<div class="mr-0"></div>
				{#if stateApp.layoutHeader.isDrawerClose}
					<button type="button" class="btn-icon btn-icon-sm variant-filled-error" onclick={cancel}>
						X
					</button>
				{/if}
			</div>
			{#if headerObjSub}
				<h4 class="mt-1 h4 text-gray-500">{headerObjSub}</h4>
			{/if}
		</div>
	{/if}

	<div
		id="layout-content"
		class="h-full max-h-full flex flex-col sm:flex-row border p-4 rounded-md"
	>
		<div class="grow">
			<Component {parms} />
		</div>

		{#if dataObj}
			<DataObjActionsObj {parms} />
		{/if}
	</div>
{/if}
