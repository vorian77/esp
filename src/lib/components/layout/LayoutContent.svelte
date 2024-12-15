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
	import NavRow from '$comps/nav/NavRow.svelte'
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
	let dm: DataManager = required(getContext(ContextKey.dataManager), FILENAME, 'dataManager')
	let stateApp: State = required(getContext(ContextKey.stateApp), FILENAME, 'stateApp')

	let currComponent = $state(comps[parms.component])
	let dataObj: DataObj = $derived(dm.getDataObj(parms.dataObjId))

	// header parms
	let headerObj = $state(
		stateApp.layoutHeader.headerText
			? stateApp.layoutHeader.headerText
			: stateApp.layoutHeader.isDataObj
				? dataObj?.raw?.header
				: ''
	)

	let headerObjSub = $state(
		stateApp.layoutHeader.isDataObj ? (dataObj?.raw?.subHeader ? dataObj?.raw?.subHeader : '') : ''
	)
	let isDrawerClose = $state(stateApp.layoutHeader.isDrawerClose)
	let rowStatus = $state(stateApp.layoutHeader.isRowStatus ? state.app.getRowStatus() : undefined)

	// header styling
	let classHeader = $state(
		(dataObj && dataObj.actionsField.length > 0) || headerObj || headerObjSub || rowStatus
			? 'border-2 p-4 '
			: ''
	)
</script>

{#if currComponent}
	<div
		id="layout-content"
		class="h-full max-h-full flex flex-col md:flex-row border-2 p-4 rounded-md"
	>
		<div class="grow">
			<svelte:component this={currComponent} {parms} on:formCancelled />
		</div>

		{#if dataObj}
			<DataObjActionsObj {parms} on:formCancelled />
		{/if}
	</div>
{/if}

<!-- <DataViewer header="state" data={state.test} /> -->
