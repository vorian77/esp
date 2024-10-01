<script lang="ts">
	import { AppLevelRowStatus } from '$comps/app/types.app'
	import { State, StateSurfaceModal } from '$comps/app/types.appState'
	import { valueOrDefault, type DataObj, type DataObjData, ParmsValuesType } from '$utils/types'
	import NavRow from '$comps/app/NavRow.svelte'
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
	export let component: string
	export let dataObj: DataObj
	export let dataObjData: DataObjData

	let classContent = ''
	let currComponent: any
	let headerObj: string = ''
	let headerObjSub: string = ''
	let isDrawerClose: boolean = false
	let rowStatus: AppLevelRowStatus | undefined

	$: currComponent = comps[component]

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
		classContent =
			(dataObj && dataObj.actionsField.length > 0) || headerObj || headerObjSub || rowStatus
				? 'border-2 p-4 '
				: ''
	}

	function cancel(event: MouseEvent) {
		dispatch('formCancelled')
	}
</script>

{#if currComponent}
	<div class={classContent}>
		<div>
			<div>
				{#if headerObj}
					<div class="mb-4">
						<div class="flex justify-between items-start">
							<h2 class="h2">{headerObj}</h2>
							<div class="mr-0">
								<NavRow {state} {rowStatus} />
							</div>
							{#if isDrawerClose}
								<button
									type="button"
									class="btn-icon btn-icon-sm variant-filled-error"
									on:click={cancel}>X</button
								>
							{/if}
						</div>
						{#if headerObjSub}
							<h4 class="mt-1 h4 text-gray-500">{headerObjSub}</h4>
						{/if}
					</div>
				{/if}
			</div>

			<div class="flex flex-row">
				<div class="grow border-2 p-4">
					<svelte:component
						this={currComponent}
						{component}
						bind:state
						{dataObj}
						{dataObjData}
						on:formCancelled
					/>
				</div>
				{#if dataObj && dataObjData}
					<div>
						<DataObjActionsObj {state} {dataObj} on:formCancelled />
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<!-- <DataViewer header="state" data={state.test} /> -->
