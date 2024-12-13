<script lang="ts">
	import { AppLevelRowStatus } from '$comps/app/types.app'
	import { State, StateProps, StateSurfaceModal } from '$comps/app/types.appState.svelte'
	import { valueOrDefault, type DataObj, type DataObjData, ParmsValuesType } from '$utils/types'
	import NavRow from '$comps/nav/NavRow.svelte'
	import ContentFormDetailApp from '$comps/form/ContentFormDetailApp.svelte'
	import ContentFormDetailRepConfig from '$comps/form/ContentFormDetailRepConfig.svelte'
	import ContentFormListApp from '$comps/form/ContentFormListApp.svelte'
	import GridSelect from '$comps/grid/GridSelect.svelte'
	import DataObjActionsObj from '$comps/dataObj/DataObjActionsObj.svelte'
	import { createEventDispatcher } from 'svelte'
	import { ContextKey } from '$utils/utils.sys.svelte'

	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/layout/LayoutContent.svelte'
	const dispatch = createEventDispatcher()

	const comps: Record<string, any> = {
		FormDetail: ContentFormDetailApp,
		FormDetailRepConfig: ContentFormDetailRepConfig,
		FormList: ContentFormListApp,
		ModalSelect: GridSelect
	}

	let { stateProps = $bindable() }: StateProps = $props()

	let currComponent = $state(comps[stateProps.component])
	let dataObj = $derived(stateProps.dataObj)

	// header parms
	let headerObj = $state(
		stateProps.state.layoutHeader.headerText
			? stateProps.state.layoutHeader.headerText
			: stateProps.state.layoutHeader.isDataObj
				? dataObj?.raw?.header
				: ''
	)

	let headerObjSub = $state(
		stateProps.state.layoutHeader.isDataObj
			? dataObj?.raw?.subHeader
				? dataObj?.raw?.subHeader
				: ''
			: ''
	)
	let isDrawerClose = $state(stateProps.state.layoutHeader.isDrawerClose)
	let rowStatus = $state(
		stateProps.state.layoutHeader.isRowStatus ? state.app.getRowStatus() : undefined
	)

	// header styling
	let classHeader = $state(
		(!stateProps.state.app.isMobileMode && dataObj && dataObj.actionsField.length > 0) ||
			headerObj ||
			headerObjSub ||
			rowStatus
			? 'border-2 p-4 '
			: ''
	)

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
			<svelte:component this={currComponent} bind:stateProps on:formCancelled />
		</div>

		{#if dataObj && stateProps.dataObjData}
			<DataObjActionsObj bind:stateProps on:formCancelled />
		{/if}
	</div>
{/if}

<!-- <DataViewer header="state" data={state.test} /> -->
