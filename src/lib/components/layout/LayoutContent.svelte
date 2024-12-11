<script lang="ts">
	import { AppLevelRowStatus } from '$comps/app/types.app'
	import { State, StateSurfaceModal } from '$comps/app/types.appState'
	import { valueOrDefault, type DataObj, type DataObjData, ParmsValuesType } from '$utils/types'
	import NavRow from '$comps/nav/NavRow.svelte'
	import ContentFormDetailApp from '$comps/form/ContentFormDetailApp.svelte'
	import ContentFormDetailRepConfig from '$comps/form/ContentFormDetailRepConfig.svelte'
	import ContentFormListApp from '$comps/form/ContentFormListApp.svelte'
	import GridSelect from '$comps/grid/GridSelect.svelte'
	import DataObjActionsObj from '$comps/dataObj/DataObjActionsObj.svelte'
	import { createEventDispatcher } from 'svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/layout/LayoutContent.svelte'
	const dispatch = createEventDispatcher()

	const comps: Record<string, any> = {
		FormDetail: ContentFormDetailApp,
		FormDetailRepConfig: ContentFormDetailRepConfig,
		FormList: ContentFormListApp,
		ModalSelect: GridSelect
	}

	export let state: State

	let classHeader = ''
	let currComponent: any
	let headerObj: string = ''
	let headerObjSub: string = ''
	let isDrawerClose: boolean = false
	let rowStatus: AppLevelRowStatus | undefined

	$: currComponent = comps[state?.props?.component]
	$: dataObj = state.props?.dataObj

	$: {
		// header parms
		headerObj = state.layoutHeader.headerText
			? state.layoutHeader.headerText
			: state.layoutHeader.isDataObj
				? dataObj?.raw?.header
				: ''
		headerObjSub = state.layoutHeader.isDataObj
			? dataObj?.raw?.subHeader
				? dataObj?.raw?.subHeader
				: ''
			: ''
		isDrawerClose = state.layoutHeader.isDrawerClose
		rowStatus = state.layoutHeader.isRowStatus ? state.app.getRowStatus() : undefined

		// header styling
		classHeader =
			(!state.app.isMobileMode && dataObj && dataObj.actionsField.length > 0) ||
			headerObj ||
			headerObjSub ||
			rowStatus
				? 'border-2 p-4 '
				: ''
	}

	function cancel(event: MouseEvent) {
		dispatch('formCancelled')
	}
</script>

{#if currComponent}
	<div
		id="layout-content"
		class="h-full max-h-full flex flex-col md:flex-row border-2 p-4 rounded-md"
	>
		<div class="grow">
			<svelte:component this={currComponent} bind:state on:formCancelled />
		</div>

		{#if dataObj && state?.props?.dataObjData}
			<DataObjActionsObj {state} on:formCancelled />
		{/if}
	</div>
{/if}

<!-- <DataViewer header="state" data={state.test} /> -->
