<script lang="ts">
	import { AppLevelRowStatus } from '$comps/app/types.app'
	import { State, StateLayoutStyle, StateSurfaceModal } from '$comps/app/types.appState'
	import { valueOrDefault, type DataObj, type DataObjData } from '$utils/types'
	import NavRow from '$comps/app/NavRow.svelte'
	import FormListApp from '$comps/form/FormListApp.svelte'
	import FormDetailApp from '$comps/form/FormDetailApp.svelte'
	import FormDetailRepConfig from '$comps/form/FormDetailRepConfig.svelte'
	import DataObjActionsObj from '$comps/dataObj/DataObjActionsObj.svelte'
	import { createEventDispatcher } from 'svelte'
	import DataViewer from '$utils/DataViewer.svelte'

	const FILENAME = '$comps/Surface/LayoutContent.svelte'
	const dispatch = createEventDispatcher()

	const comps: Record<string, any> = {
		FormDetail: FormDetailApp,
		FormDetailRepConfig: FormDetailRepConfig,
		FormList: FormListApp
	}

	export let state: State
	export let dataObj: DataObj
	export let dataObjData: DataObjData

	let classContent = ''
	let currComponent: any
	let headerDialog: string = ''
	let headerObj: string = ''
	let headerObjSub: string = ''
	let isHeaderClose: boolean = false
	let rowStatus: AppLevelRowStatus | undefined

	$: currComponent = comps[dataObj.raw.codeComponent]

	$: {
		headerDialog = ''
		headerObj = ''
		headerObjSub = ''
		rowStatus = undefined

		switch (state.layoutStyle) {
			case StateLayoutStyle.overlayDrawerDetail:
				headerObj = dataObj.raw.header
				headerObjSub = valueOrDefault(dataObj.raw.subHeader, '')
				isHeaderClose = true
				break

			case StateLayoutStyle.overlayModalDetail:
				headerObj = dataObj.raw.header
				headerObjSub = valueOrDefault(dataObj.raw.subHeader, '')
				rowStatus = state.app.getRowStatus()
				break

			case StateLayoutStyle.overlayModalSelect:
				headerObj = dataObj.raw.header
				headerObjSub = valueOrDefault(dataObj.raw.subHeader, '')
				break

			case StateLayoutStyle.overlayModalWizard:
				if (state instanceof StateSurfaceModal) {
					headerDialog = state.headerDialog
				}
				headerObj = dataObj.raw.header
				headerObjSub = valueOrDefault(dataObj.raw.subHeader, '')
				break

			case StateLayoutStyle.embeddedField:
				break
		}
		classContent =
			dataObj.actionsField.length > 0 || headerDialog || headerObj || headerObjSub || rowStatus
				? 'border-2 p-4'
				: ''
	}

	function cancel(event: MouseEvent) {
		dispatch('formCancelled')
	}
</script>

{#if dataObj}
	{#if headerDialog}
		<div class="mb-4">
			<h1 class="h1">{headerDialog}</h1>
		</div>
	{/if}
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
							{#if isHeaderClose}
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

			<div class="flex flex-row gap-4">
				<div class="grow border-2 p-4">
					<svelte:component
						this={currComponent}
						bind:state
						{dataObj}
						{dataObjData}
						on:formCancelled
					/>
				</div>
				<div>
					<DataObjActionsObj {state} {dataObj} on:formCancelled />
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- <DataViewer header="headerDialog" data={{ headerDialog, headerObj }} /> -->
<!-- <DataViewer header="state" data={state.test} /> -->
